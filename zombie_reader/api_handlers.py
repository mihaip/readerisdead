import json
import logging
import os.path
import urllib

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
          'count': len(stream.item_refs),
        } for stream_id, stream in
            web.config.reader_streams_by_stream_id.iteritems()
      ]
    })


class StreamContents(ApiHandler):
  def GET(self, stream_id):
    stream_id = urllib.unquote_plus(stream_id)
    stream = web.config.reader_streams_by_stream_id.get(stream_id)
    if not stream:
      return web.notfound('Stream ID %s was not archived' % stream_id)
    input = web.input(n=20, c=0, r='d')
    count = int(input.n)
    continuation = int(input.c)
    ranking = input.r
    item_refs = stream.item_refs
    if ranking == 'o':
        item_refs = list(reversed(item_refs))
    item_refs = item_refs[continuation:continuation + count]
    item_refs_by_item_id = {i.item_id: i for i in item_refs}

    item_entries = []
    for item_ref in item_refs:
      item_id = item_ref.item_id
      item_body_path = base.paths.item_id_to_file_path(
          os.path.join(web.config.reader_archive_directory, 'items'), item_id)
      if os.path.exists(item_body_path):
        with open(item_body_path) as item_body_file:
          feed = base.atom.parse(item_body_file)
          found_entry = False
          for entry in feed.entries:
            if entry.item_id == item_id:
              item_entries.append(entry)
              found_entry = True
              break
          if not found_entry:
            logging.warning('Did not find item entry for %s', item_id)
      else:
        logging.warning('No item body file entry for %s', item_id)

    response_json = {
      'direction': 'ltr',
      'id': stream_id,
      'title': '', # TODO
      'items': [
        {
          'id': e.item_id.atom_form,
          'crawlTimeMsec': str(int(
              item_refs_by_item_id[e.item_id].timestamp_usec/1000)),
          'timestampUsec': str(item_refs_by_item_id[e.item_id].timestamp_usec),
          'published': 0, # TODO
          'updated': 0, # TODO
          'title': e.title,
          'content': {
            # Unfortunately Atom output did not appear to contain writing
            # direction.
            'direction': 'ltr',
            'content': e.content,
          },
          'categories': [], # TODO
          'origin': {
            'streamId': e.origin.stream_id,
            'title': e.origin.title,
            'htmlUrl': e.origin.html_url,
          },
          'annotations': [], # TODO
          'comments': [],
          'likingUsers': [],
        } for e in item_entries
      ],
    }

    if continuation + count < len(stream.item_refs):
      response_json['continuation'] = continuation + count

    return json.dumps(response_json)
