import collections
import xml.etree.cElementTree as ET

import base.api

ATOM_NS = 'http://www.w3.org/2005/Atom'
READER_NS = 'http://www.google.com/schemas/reader/atom/'

def init():
  ET.register_namespace('gr', READER_NS)
  ET.register_namespace('atom', ATOM_NS)
  ET.register_namespace('coop', 'http://www.google.com/coop/namespace')
  ET.register_namespace('gd', 'http://schemas.google.com/g/2005')
  ET.register_namespace('idx', 'urn:atom-extension:indexing')
  ET.register_namespace('media', 'http://search.yahoo.com/mrss/')
  ET.register_namespace('thr', 'http://purl.org/syndication/thread/1.0')

def parse(xml_text):
  feed_element = ET.fromstring(xml_text)
  entry_elements = feed_element.findall('{%s}entry' % ATOM_NS)
  entries = []
  for entry_element in entry_elements:
    item_id = base.api.item_id_from_atom_form(
        entry_element.find('{%s}id' % ATOM_NS).text)
    entries.append(Entry(item_id=item_id))
  return Feed(entries=entries)

Feed = collections.namedtuple('Feed', ['entries'])

Entry = collections.namedtuple('Entry', ['item_id'])
