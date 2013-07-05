import collections
import logging
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

def parse(xml_text_or_file):
  if hasattr(xml_text_or_file, 'read'):
    feed_element = ET.parse(xml_text_or_file)
  else:
    feed_element = ET.fromstring(xml_text_or_file)
  entry_elements = feed_element.findall('{%s}entry' % ATOM_NS)
  entries = []
  for entry_element in entry_elements:
    item_id = base.api.item_id_from_atom_form(
        entry_element.find('{%s}id' % ATOM_NS).text)
    title = entry_element.find('{%s}title' % ATOM_NS).text

    content_element = entry_element.find('{%s}content' % ATOM_NS)
    if content_element is None:
      content_element = entry_element.find('{%s}summary' % ATOM_NS)
    content = content_element.text if content_element is not None else ''

    source_element = entry_element.find('{%s}source' % ATOM_NS)
    source_link_element = source_element.find('{%s}link' % ATOM_NS)
    origin_html_url = source_link_element.attrib['href'] \
        if source_link_element is not None else None
    origin = Origin(
      stream_id=source_element.attrib['{%s}stream-id' % READER_NS],
      title=source_element.find('{%s}title' % ATOM_NS).text,
      html_url=origin_html_url,
    )

    entries.append(Entry(
      item_id=item_id,
      title=title,
      content=content,
      element=entry_element,
      origin=origin,
    ))
  return Feed(entries=entries)

Feed = collections.namedtuple('Feed', ['entries'])

Entry = collections.namedtuple('Entry', [
    # Extracted attributes
    'item_id',
    'title',
    'content',
    'origin',

    # ElementTree element
    'element'])

Origin = collections.namedtuple('Origin', ['stream_id', 'title', 'html_url'])
