import argparse
import datetime
import logging
import os
import os.path
import sys
import urllib
import urllib2
import xml.etree.cElementTree as ET

import log

_BASE_PARAMETERS = {
  'mediaRss': 'true',
  'client': 'reader-feed-archive'
}

_ATOM_NS = 'http://www.w3.org/2005/Atom'
_READER_NS = 'http://www.google.com/schemas/reader/atom/'

ET.register_namespace('gr', _READER_NS)
ET.register_namespace('atom', _ATOM_NS)
ET.register_namespace('idx', 'urn:atom-extension:indexing')
ET.register_namespace('media', 'http://search.yahoo.com/mrss/')

def main():
  log.init()
  parser = argparse.ArgumentParser(
      description='Fetch archived feed data from Google Reader')
  # Which feeds to fetch data for
  feed_group = parser.add_mutually_exclusive_group()
  feed_group.add_argument('feed_urls', metavar='feed_url', nargs='*',
                          default=[],
                          help='Feed URL to fetch archived data for')
  feed_group.add_argument('--opml_file', default='',
                          help='OPML file listing feed URLs to fetch archived '
                          'data for')

  # Output options
  parser.add_argument('--output_directory', default='./',
                      help='Directory where to place feed archive data. Use '
                            '"-" to output archive data to stdout.')
  # Fetching options
  parser.add_argument('--chunk_size', type=int, default=1000,
                      help='Number of items to request per Google Reader API '
                           'call (higher is more efficient)')
  parser.add_argument('--max_items', type=int, default=0,
                      help='Maxmium number of items to fetch per feed (0 for '
                           'no limit)')
  parser.add_argument('--oldest_item_timestamp_sec', type=int, default=0,
                      help='Timestamp (in seconds since the epoch) of the '
                           'oldest item that should be returned (0 for no '
                           'timestamp restriction)')
  parser.add_argument('--newest_item_timestamp_sec', type=int, default=0,
                      help='Timestamp (in seconds since the epoch) of the '
                           'newest item that should be returned (0 for no '
                           'timestamp restriction)')

  args = parser.parse_args()
  if args.opml_file:
    feed_urls = extract_feed_urls_from_opml_file(args.opml_file)
  else:
    feed_urls = args.feed_urls
  init_base_parameters(args)

  logging.info('Fetching archived data for %d feed%s',
      len(feed_urls), len(feed_urls) == 1 and '' or 's')

  for feed_url in feed_urls:
    if args.output_directory != '-':
      output_path = get_output_path(args.output_directory, feed_url)
    else:
      output_path = None
    fetch_feed(feed_url, args.max_items, output_path)

def extract_feed_urls_from_opml_file(opml_file_path):
  tree = ET.parse(opml_file_path)
  feed_urls = []
  seen_feed_urls = set()
  for outline in tree.iter(tag='outline'):
    if 'xmlUrl' in outline.attrib:
      feed_url = outline.attrib['xmlUrl']
      if feed_url in seen_feed_urls:
        continue
      feed_urls.append(feed_url)
      seen_feed_urls.add(feed_url)
  return feed_urls

def init_base_parameters(args):
  _BASE_PARAMETERS['n'] = args.chunk_size
  if args.oldest_item_timestamp_sec:
    _BASE_PARAMETERS['ot'] = args.oldest_item_timestamp_sec
  if args.newest_item_timestamp_sec:
    _BASE_PARAMETERS['nt'] = args.newest_item_timestamp_sec

def get_output_path(base_path, feed_url):
  file_name = feed_url
  if file_name.startswith('http://'):
    file_name = file_name[7:]
  if file_name.startswith('https://'):
    file_name = file_name[8:]
  for c in [os.sep, '/', ':', '?']:
    file_name = file_name.replace(c, '-')
  return os.path.join(base_path, file_name)



def fetch_feed(feed_url, max_items, output_path):
  continuation_token = None
  combined_feed = None
  total_entries = 0
  while True:
    parameters = _BASE_PARAMETERS.copy()
    if continuation_token:
      parameters['c'] = continuation_token
    reader_url = (
      'http://www.google.com/reader/public/atom/hifi/feed/%s?%s' %
      (urllib.quote(feed_url), urllib.urlencode(parameters)))
    logging.debug('Fetching %s', reader_url)
    request = urllib2.Request(reader_url)
    response = urllib2.urlopen(request)
    response_tree = ET.parse(response)
    response_root = response_tree.getroot()
    entries = response_root.findall('{%s}entry' % _ATOM_NS)
    oldest_message = ''
    if entries:
      last_crawl_timestamp_msec = \
          entries[-1].attrib['{%s}crawl-timestamp-msec' % _READER_NS]
      last_crawl_timestamp = datetime.datetime.utcfromtimestamp(
          float(last_crawl_timestamp_msec)/1000)
      oldest_message = ' (oldest is from %s)' % last_crawl_timestamp
    logging.info('Loaded %d items%s', len(entries), oldest_message)
    if combined_feed:
      combined_feed.extend(entries)
    else:
      combined_feed = response_root

    total_entries += len(entries)
    if max_items and total_entries >= max_items:
      break

    continuation_element = response_root.find(
        '{%s}continuation' % _READER_NS)
    if continuation_element is not None:
      # TODO: explain
      response_root.remove(continuation_element)
      continuation_token = continuation_element.text
    else:
      break
  combined_feed_tree = ET.ElementTree(combined_feed)

  if output_path:
    output_file = open(output_path, 'w')
    logging.info('Writing %d items to %s' % (total_entries, output_path))
  else:
    output_file = sys.stdout
    logging.info('Writing %d items to stdout' % total_entries)
  combined_feed_tree.write(
      output_file,
      xml_declaration=True,
      encoding='utf-8')
  if output_path:
    output_file.close()

if __name__ == '__main__':
    main()
