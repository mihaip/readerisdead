import datetime
import logging
import sys
import urllib
import urllib2
import xml.etree.cElementTree as ET

import log

_BASE_PARAMETERS = {
    'mediaRss': 'true',
    'client': 'reader-feed-archive',
    'n': 1000
}

_MAX_FETCHES = 1000

_ATOM_NS = 'http://www.w3.org/2005/Atom'
_READER_NS = 'http://www.google.com/schemas/reader/atom/'

ET.register_namespace('gr', _READER_NS)
ET.register_namespace('atom', _ATOM_NS)
ET.register_namespace('idx', 'urn:atom-extension:indexing')
ET.register_namespace('media', 'http://search.yahoo.com/mrss/')


# params
# - oldest timestamp
# - newest timestamps
# - entries per chunk
# - max number of total items
# - retry attempts

def fetch_feed(feed_url):
    continuation_token = None
    combined_feed = None
    fetches = 0
    while True:
        parameters = _BASE_PARAMETERS.copy()
        if continuation_token:
            parameters['c'] = continuation_token
        reader_url = (
            'http://www.google.com/reader/public/atom/hifi/feed/%s?%s' %
            (urllib.quote(feed_url), urllib.urlencode(parameters)))
        logging.debug("Fetching %s", reader_url)
        request = urllib2.Request(reader_url)
        response = urllib2.urlopen(request)
        response_tree = ET.parse(response)
        response_root = response_tree.getroot()
        entries = response_root.findall('{%s}entry' % _ATOM_NS)
        oldest_message = ""
        if entries:
            last_crawl_timestamp_msec = \
                entries[-1].attrib['{%s}crawl-timestamp-msec' % _READER_NS]
            last_crawl_timestamp = datetime.datetime.utcfromtimestamp(
                float(last_crawl_timestamp_msec)/1000)
            oldest_message = " (oldest is from %s)" % last_crawl_timestamp
        logging.info("Loaded %d entries%s", len(entries), oldest_message)
        if combined_feed:
            combined_feed.extend(entries)
        else:
            combined_feed = response_root
        continuation_element = response_root.find(
            '{%s}continuation' % _READER_NS)
        if continuation_element is not None:
            # TODO: explain
            response_root.remove(continuation_element)
            continuation_token = continuation_element.text
        else:
            break
        fetches += 1
        if fetches > _MAX_FETCHES:
            break
    combined_feed_tree = ET.ElementTree(combined_feed)
    combined_feed_tree.write(
        sys.stdout,
        xml_declaration=True,
        encoding='utf-8')

log.init()

fetch_feed('http://feeds.guardian.co.uk/theguardian/world/rss')

logging.root.setLevel(logging.DEBUG)
