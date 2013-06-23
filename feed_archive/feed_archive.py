import argparse
import datetime
import logging
import os.path
import sys
import threading
import urllib
import urllib2
import urlparse
import xml.etree.cElementTree as ET
import Queue

import base.log
import base.paths

_BASE_PARAMETERS = {
  'client': 'reader-feed-archive'
}

_ATOM_NS = 'http://www.w3.org/2005/Atom'
_READER_NS = 'http://www.google.com/schemas/reader/atom/'

ET.register_namespace('gr', _READER_NS)
ET.register_namespace('atom', _ATOM_NS)
ET.register_namespace('idx', 'urn:atom-extension:indexing')
ET.register_namespace('media', 'http://search.yahoo.com/mrss/')

_READER_SHARED_TAG_FEED_URL_PATH_PREFIX = '/reader/public/atom/'

def main():
  base.log.init()
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
  parser.add_argument('--parallelism', type=int, default=10,
                      help='number of feeds to fetch in parallel.')

  args = parser.parse_args()
  if args.opml_file:
    feed_urls = extract_feed_urls_from_opml_file(
      base.paths.normalize(args.opml_file))
  else:
    feed_urls = args.feed_urls
  init_base_parameters(args)
  output_directory = args.output_directory
  if output_directory != '-':
    output_directory = base.paths.normalize(output_directory)
    base.paths.ensure_exists(output_directory)

  logging.info('Fetching archived data for %d feed%s',
      len(feed_urls), len(feed_urls) == 1 and '' or 's')

  request_queue = Queue.Queue()
  response_queue = Queue.Queue()
  for i in xrange(args.parallelism):
    thread = FeedFetchThread(request_queue, response_queue)
    thread.start()

  for feed_url in feed_urls:
    if output_directory != '-':
      output_path = get_output_path(output_directory, feed_url)
    else:
      output_path = None
    request_queue.put(
      FeedFetchRequest(feed_url, args.max_items, output_path))

  success_count = 0
  failures = []

  for i in xrange(len(feed_urls)):
    response = response_queue.get()
    if response.is_success:
      success_count += 1
    else:
      failures.append(response.feed_url)
    response_queue.task_done()

  logging.info('Fetched data for %d feeds', success_count)
  if failures:
    logging.warning('Could not fetch %d feeds:', len(failures))
    for feed_url in failures:
      logging.warning('  %s', feed_url)


class FeedFetchThread(threading.Thread):
  def __init__(self, request_queue, response_queue):
    threading.Thread.__init__(self)
    self._request_queue = request_queue
    self._response_queue = response_queue
    self.daemon = True

  def run(self):
    while True:
      request = self._request_queue.get()
      response = FeedFetchResponse(request.feed_url, is_success=True)
      def fetch(media_rss=True, hifi=True):
        fetch_feed(
            request.feed_url,
            request.max_items,
            request.output_path,
            media_rss=media_rss,
            hifi=hifi)

      try:
        try:
          try:
            fetch()
          except urllib2.HTTPError, e:
            # Reader's MediaRSS reconstruction code appears to have a bug for
            # some feeds (it causes an exception to be thrown), so we retry with
            # MediaRSS turned off before giving up.
            if e.code == 500:
              logging.warn(('500 response when fetching %s, '
                'retrying with MediaRSS turned off') % request.feed_url)
              fetch(media_rss=False)
            else:
              response.is_success = False
          except ET.ParseError, e:
              logging.warn(('XML parse error when fetching %s, '
                'retrying with MediaRSS turned off') % request.feed_url)
              fetch(media_rss=False)
        except ET.ParseError, e:
              logging.warn(('XML parse error when fetching %s, retrying with '
                  'MediaRSS and high-fidelity turned off') % request.feed_url)
              fetch(media_rss=False, hifi=False)
      except:
        logging.error(
            'Exception when fetching %s', request.feed_url, exc_info=True)
        response.is_success = False
      finally:
        self._request_queue.task_done()
        self._response_queue.put(response)

class FeedFetchRequest(object):
  def __init__(self, feed_url, max_items, output_path):
    self.feed_url = feed_url
    self.max_items = max_items
    self.output_path = output_path

class FeedFetchResponse(object):
  def __init__(self, feed_url, is_success):
    self.feed_url = feed_url
    self.is_success = is_success

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
  file_name = base.paths.url_to_file_name(feed_url)
  return os.path.join(base_path, file_name)

def get_stream_id(feed_url):
  try:
    parsed = urlparse.urlparse(feed_url)
    # If the feed is generated by Reader itself, turn it into the underlying
    # stream ID.
    if parsed.hostname.startswith('www.google.') and \
        parsed.path.startswith(_READER_SHARED_TAG_FEED_URL_PATH_PREFIX):
      reader_url_prefix = '%s://%s%s' % (
        parsed.scheme, parsed.hostname, _READER_SHARED_TAG_FEED_URL_PATH_PREFIX)
      return feed_url[len(reader_url_prefix):]
  except:
    # Ignore malformed URLs
    pass
  return 'feed/%s' % feed_url

def fetch_feed(feed_url, max_items, output_path, media_rss=True, hifi=True):
  continuation_token = None
  combined_feed = None
  total_entries = 0
  while True:
    parameters = _BASE_PARAMETERS.copy()
    if continuation_token:
      parameters['c'] = continuation_token
    if media_rss:
      parameters['mediaRss'] = 'true'
    stream_id = get_stream_id(feed_url)
    reader_url = (
      'http://www.google.com/reader/public/atom/%s%s?%s' %
      ('hifi/' if hifi else '', urllib.quote(stream_id),
          urllib.urlencode(parameters)))
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
