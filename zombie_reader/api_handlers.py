import itertools
import json
import logging
import os.path
import urllib
import xml.etree.cElementTree as ET

import third_party.web as web

import base.api
import base.atom
import base.paths

class ApiHandler:
  def _read_json_data_file(self, data_file_name):
    data_path = os.path.join(
        web.config.reader_archive_directory, 'data', data_file_name)
    with open(data_path) as data_file:
      return json.load(data_file)

class ItemContentsHandler(ApiHandler):
  def _fetch_render_item_refs(self, stream_id, item_refs, continuation):
    item_entries = []
    for item_ref in item_refs:
      item_entry = base.atom.load_item_entry(
          web.config.reader_archive_directory, item_ref.item_id)
      if item_entry:
        item_entries.append(item_entry)

    item_refs_by_item_id = {i.item_id: i for i in item_refs}
    stream_ids_by_item_id = web.config.reader_stream_ids_by_item_id
    friends_by_stream_id = web.config.reader_friends_by_stream_id

    items_json = []
    for e in item_entries:
      item_stream_ids = stream_ids_by_item_id.get(e.item_id.int_form, [])
      timestamp_usec = item_refs_by_item_id[e.item_id].timestamp_usec
      if not timestamp_usec:
        # We don't have timestamps in the item ref when doing a separate item
        # contents request.
        timestamp_usec = e.crawl_time_msec * 1000
      item_json = {
        'id': e.item_id.atom_form,
        'crawlTimeMsec': str(int(timestamp_usec/1000)),
        'timestampUsec': str(timestamp_usec),
        'published': e.published_sec,
        'updated': e.updated_sec,
        'title': e.title,
        'content': {
          # Unfortunately Atom output did not appear to contain writing
          # direction.
          'direction': 'ltr',
          'content': e.content,
        },
        'categories': item_stream_ids,
        'origin': {
          'streamId': e.origin.stream_id,
          'title': e.origin.title,
          'htmlUrl': e.origin.html_url,
        },
        'annotations': [
          {
            'content': a.content,
            'author': a.author_name,
            'userId': a.author_user_id,
            'profileId': a.author_profile_id,
          } for a in e.annotations
        ],
        # We have comment data, but the Reader JS can't show it, so there's no
        # point in outputting it.
        'comments': [],
        # Ditto for likers
        'likingUsers': [],
        # Prevents the keep unread item action from showing up.
        'isReadStateLocked': True,
      }

      vias_json = []
      for item_stream_id in item_stream_ids:
        if item_stream_id in friends_by_stream_id:
          friend = friends_by_stream_id[item_stream_id]
          if friend.is_current_user:
            continue
          vias_json.append({
            'href': 'http://www.google.com/reader/public/atom/%s' % item_stream_id,
            'title': '%s\'s shared items' % friend.display_name,
          })
      if vias_json:
        item_json['via'] = vias_json

      for link in e.links:
        if not link.relation:
          continue
        link_json = {}
        if link.href:
          link_json['href'] = link.href
        if link.type:
          link_json['type'] = link.type
        if link.title:
          link_json['title'] = link.title
        if link.length:
          link_json['length'] = link.length
        if link_json:
          item_json.setdefault(link.relation, []).append(link_json)

      if e.author_name:
        item_json['author'] = e.author_name

      items_json.append(item_json)

    response_json = {
      'direction': 'ltr',
      'id': stream_id,
      'title': '', # TODO
      'items': items_json,
    }

    if stream_id in friends_by_stream_id:
      response_json['author'] = friends_by_stream_id[stream_id].display_name
    if continuation:
      response_json['continuation'] = continuation

    return json.dumps(response_json)

class SubscriptionList(ApiHandler):
  def GET(self):
    subscriptions_json = self._read_json_data_file('subscriptions.json')
    subscriptions = [
        base.api.Subscription.from_json(s) for s in subscriptions_json]

    return json.dumps({
      'subscriptions': [
        {
          'id': s.stream_id,
          'title': s.title,
          'categories': [
            {
              'id': si,
              'label': si[si.rfind('/') + 1:],
            } for si in s.insert_stream_ids
          ],
          'sortid': s.sort_id,
          'firstitemmsec': str(int(s.first_item_usec/1000)),
          'htmlUrl': s.html_url,
        } for s in subscriptions
      ]
    })


class TagList(ApiHandler):
  def GET(self):
    tags_json = self._read_json_data_file('tags.json')
    tags = [base.api.Tag.from_json(t) for t in tags_json]

    return json.dumps({
      'tags': [
        {
          'id': t.stream_id,
          'sortid': t.sort_id,
        } for t in tags
      ]
    })


class RecommendationList(ApiHandler):
  def GET(self):
    try:
      recommendations_json = self._read_json_data_file('recommendations.json')
    except:
      logging.warning('Could not load preferences, using empty list',
          exc_info=True)
      recommendations_json = []

    recommendations = [
        base.api.Recommendation.from_json(r) for r in recommendations_json]
    count = int(web.input(n=4).n)
    if count < len(recommendations):
      recommendations = recommendations[:count]

    return json.dumps({
      'recs': [
        {
          'streamId': r.stream_id,
          'title': r.title,
          'snippet': '',
          'impressionTime': 0,
        } for r in recommendations
      ]
    })


class PreferenceList(ApiHandler):
  def GET(self):
    try:
      preferences_json = self._read_json_data_file('preferences.json')
    except:
      logging.warning('Could not load preferences, using defaults',
          exc_info=True)
      preferences_json = {}

    # Disable G+ share and email actions, since they won't work. Abdulla: your
    # feature finally gets some use!
    preferences_json['item-actions'] = json.dumps({
      'plusone-action': True,
      'share-action': False,
      'email-action': False,
      'tags-action': True
    })

    # Oldest first is no longer limited to the last 30 days, don't show the
    # interruption that warns about that.
    preferences_json['show-oldest-interrupt'] = 'false'

    # We want to show all archived items by default.
    preferences_json['read-items-visible'] = 'true'

    # Always start with the overview page, since that shows some explanatory
    # text.
    preferences_json['start-page'] = 'home'

    # Turn off more "helpful" interruptions.
    preferences_json['show-scroll-help'] = 'false'
    preferences_json['show-search-clarification'] = 'false'
    preferences_json['show-blogger-following-intro'] = 'false'

    if 'lhn-prefs' in preferences_json:
      # Make sure that we show all unread counts for the LHN sections, since
      # they're not really unread counts anymore.
      lhn_prefs = json.loads(preferences_json['lhn-prefs'])
      for section_json in lhn_prefs.values():
        section_json['suc'] = 'true'
      # Collapse the recommendations/explore section by default, it's not really
      # the user's data.
      if 'recommendations' in lhn_prefs:
        lhn_prefs['recommendations']['ism'] = 'true'
      preferences_json['lhn-prefs'] = json.dumps(lhn_prefs)

    return json.dumps({
      'prefs': [
        {
          'id': id,
          'value': value,
        } for id, value in preferences_json.iteritems()
      ]
    })


class StreamPreferenceList(ApiHandler):
  def GET(self):
    try:
      stream_preferences_json = self._read_json_data_file(
          'stream-preferences.json')
    except:
      logging.warning('Could not load stream preferences, using defaults',
          exc_info=True)
      stream_preferences_json = {}

    return json.dumps({
      'streamprefs': {
        stream_id: [
          {
            'id': id,
            'value': value,
          } for id, value in prefs.iteritems()
        ] for stream_id, prefs in stream_preferences_json.iteritems()
      }
    })


class UnreadCount(ApiHandler):
  def GET(self):
    return json.dumps({
      'max': 1000000,
      'unreadcounts': [
        {
          'id': stream_id,
          'count': len(stream_items[0]),
        } for stream_id, stream_items in
            web.config.reader_stream_items_by_stream_id.iteritems()
      ]
    })


class StreamContents(ItemContentsHandler):
  def GET(self, stream_id):
    stream_id = urllib.unquote_plus(stream_id)
    input = web.input(n=20, c=0, r='d')
    count = int(input.n)
    continuation = int(input.c)
    ranking = input.r

    # The read and starred items stream don't display a sorting UI, so they'll
    # always be requested in the newest-first order. We instead support
    # generating a URL that will include the desired sorting in the stream ID
    if stream_id.endswith('-oldest-first'):
      stream_id = stream_id[:-13]
      ranking = 'o'

    if stream_id.startswith('user/-/'):
      stream_id = 'user/' + web.config.reader_user_info.user_id + stream_id[6:]

    stream_items = web.config.reader_stream_items_by_stream_id.get(stream_id)
    if not stream_items:
      return web.notfound('Stream ID %s was not archived' % stream_id)

    item_refs = []
    if ranking != 'o':
      start_index = continuation
      end_index = continuation + count
    else:
      start_index = -continuation - count
      end_index = -continuation if continuation else None
    chunk_stream_item_ids = stream_items[0][start_index:end_index]
    chunk_stream_item_timestamps = stream_items[1][start_index:end_index]
    if ranking == 'o':
      chunk_stream_item_ids = tuple(reversed(chunk_stream_item_ids))
      chunk_stream_item_timestamps = tuple(reversed(chunk_stream_item_timestamps))

    for item_id_int_form, timestamp_usec in itertools.izip(
        chunk_stream_item_ids, chunk_stream_item_timestamps):
      item_id = base.api.ItemId(int_form=item_id_int_form)
      item_refs.append(
          base.api.ItemRef(item_id=item_id, timestamp_usec=timestamp_usec))

    next_continuation = continuation + count \
        if continuation + count < len(stream_items[0]) else None
    return self._fetch_render_item_refs(stream_id, item_refs, next_continuation)

class StreamItemsIds(ApiHandler):
  def GET(self):
    input = web.input(r='d')
    stream_id = input.s
    count = int(input.n)
    ranking = input.r

    stream_items = web.config.reader_stream_items_by_stream_id.get(stream_id)
    if not stream_items:
      return web.notfound('Stream ID %s was not archived' % stream_id)

    item_refs = [
      base.api.ItemRef(base.api.ItemId(item_id_int_form), timestamp_usec)
      for item_id_int_form, timestamp_usec in itertools.izip(*stream_items)
    ]

    return json.dumps({
      'itemRefs': [
        {
          'id': item_ref.item_id.decimal_form,
          'timestampUsec': item_ref.timestamp_usec,
          'directStreamIds': [],
        } for item_ref in item_refs
      ]
    })

class StreamItemsContents(ItemContentsHandler):
  def POST(self):
    input = web.input(i=[])

    item_refs = []
    for item_id_decimal_form in input.i:
      item_refs.append(base.api.ItemRef(
          base.api.item_id_from_decimal_form(item_id_decimal_form),
          timestamp_usec=0))

    return self._fetch_render_item_refs(input.rs, item_refs, continuation=None)
