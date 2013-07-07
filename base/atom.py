import calendar
import collections
import logging
import time
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

    author_name = None
    author_element = entry_element.find('{%s}author' % ATOM_NS)
    if author_element is not None:
      author_name_element = author_element.find('{%s}name' % ATOM_NS)
      if author_name_element is not None:
        author_name = author_name_element.text

    links = []
    link_elements = entry_element.findall('{%s}link' % ATOM_NS)
    for link_element in link_elements:
      a = link_element.attrib
      links.append(Link(
         relation=a.get('rel'),
         href=a.get('href'),
         type=a.get('type'),
         title=a.get('title'),
         length=a.get('length'),
      ))

    # Dates
    crawl_time_msec = int(
        entry_element.attrib['{%s}crawl-timestamp-msec' % READER_NS])
    def parse_iso_8601(s):
      return int(calendar.timegm(time.strptime(s, '%Y-%m-%dT%H:%M:%SZ')))
    published_element = entry_element.find('{%s}published' % ATOM_NS)
    published_sec = parse_iso_8601(published_element.text) \
        if published_element is not None else crawl_time_msec/1000
    updated_element = entry_element.find('{%s}updated' % ATOM_NS)
    updated_sec = parse_iso_8601(updated_element.text) \
        if updated_element is not None else crawl_time_msec/1000

    annotations = []
    annotation_elements = entry_element.findall('{%s}annotation' % READER_NS)
    for annotation_element in annotation_elements:
      content_element = annotation_element.find('{%s}content' % ATOM_NS)
      author_element = annotation_element.find('{%s}author' % ATOM_NS)
      author_name_element = author_element.find('{%s}name' % ATOM_NS)
      author_attrib = author_element.attrib
      annotations.append(Annotation(
        content=content_element.text,
        author_name=author_name_element.text,
        author_user_id=author_attrib['{%s}user-id' % READER_NS],
        author_profile_id=author_attrib['{%s}profile-id' % READER_NS],
      ))

    entries.append(Entry(
      item_id=item_id,
      title=title,
      content=content,
      element=entry_element,
      origin=origin,
      links=links,
      published_sec=published_sec,
      updated_sec=updated_sec,
      annotations=annotations,
      author_name=author_name,
    ))
  return Feed(entries=entries)

Feed = collections.namedtuple('Feed', ['entries'])

Entry = collections.namedtuple('Entry', [
    # Extracted attributes
    'item_id',
    'title',
    'content',
    'origin',
    'links',
    'published_sec',
    'updated_sec',
    'annotations',
    'author_name',

    # ElementTree element
    'element'])

Origin = collections.namedtuple('Origin', ['stream_id', 'title', 'html_url'])

Link = collections.namedtuple('Link',
    ['relation', 'href', 'type', 'title', 'length'])

Annotation = collections.namedtuple('Annotation',
    ['content', 'author_name', 'author_user_id', 'author_profile_id'])
