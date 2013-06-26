import collections
import json
import logging
import urllib
import urllib2

import base.cache
import base.paths

FEED_STREAM_ID_PREFIX = "feed/"

_ITEM_ID_ATOM_FORM_PREFIX = "tag:google.com,2005:reader/item/"

class Api(object):
  def __init__(self, auth_token, cache_directory=None):
    self._auth_token = auth_token
    self._cache = \
      base.cache.DirectoryCache(cache_directory) if cache_directory else None

  def fetch_user_info(self):
    user_info_json = self._fetch_json('user-info')
    return UserInfo(
      user_id=user_info_json['userId'],
      email=user_info_json['userEmail'])

  def fetch_tags(self):
    tags_json = self._fetch_json('tag/list')
    result = []
    for tag_json in tags_json['tags']:
      result.append(Tag(
        stream_id=tag_json['id'],
        sort_id=tag_json['sortid']
      ))
    return result

  def fetch_subscriptions(self):
    subscriptions_json = self._fetch_json('subscription/list')
    result = []
    for subscription_json in subscriptions_json['subscriptions']:
      insert_stream_ids = []
      for category_json in subscription_json.get('categories', []):
        insert_stream_ids.append(category_json['id'])
      result.append(Subscription(
        stream_id=subscription_json['id'],
        sort_id=subscription_json['sortid'],
        title=subscription_json.get('title'),
        first_item_usec=int(subscription_json.get('firstitemmsec', 0)) * 1000,
        html_url=subscription_json.get('htmlUrl'),
        insert_stream_ids=insert_stream_ids,
      ))
    return result

  def fetch_friends(self):
    friends_json = self._fetch_json('friend/list', {'lookup': 'ALL'})
    result = []
    for friend_json in friends_json['friends']:
      flags = friend_json.get('flags', 0)
      types = friend_json.get('types', [])
      websites=[
        Website(w['title'], w['url']) for w in friend_json.get('websites', [])]
      result.append(Friend(
        stream_id=friend_json.get('stream'),

        user_ids=friend_json.get('userIds', []),
        profile_ids=friend_json.get('profileIds', []),
        contact_id=friend_json['contactId'],
        group_ids=friend_json.get('groupIds', []),

        display_name=friend_json['displayName'],
        given_name=friend_json['givenName'],
        occupation=friend_json.get('occupation'),
        websites=websites,
        location=friend_json.get('location'),
        photo_url=friend_json.get('photoUrl'),
        email_addresses=friend_json.get('emailAddresses', []),

        is_current_user= flags & 1 << 0 != 0,
        is_hidden=       flags & 1 << 1 != 0,
        is_new=          flags & 1 << 2 != 0,
        uses_reader=     flags & 1 << 3 != 0,
        is_blocked=      flags & 1 << 4 != 0,
        has_profile=     flags & 1 << 5 != 0,
        is_ignored=      flags & 1 << 6 != 0,
        is_new_follower= flags & 1 << 7 != 0,
        is_anonymous=    flags & 1 << 8 != 0,
        has_shared_items=flags & 1 << 9 != 0,

        is_follower=          0 in types,
        is_following=         1 in types,
        is_contact=           3 in types,
        is_pending_following= 4 in types,
        is_pending_follower=  5 in types,
        is_allowed_following= 6 in types,
        is_allowed_commenting=7 in types,
      ))
    return result

  def fetch_item_refs(self, stream_id, count=10, continuation_token=None):
    query_params = {'s': stream_id, 'n': count}
    if continuation_token:
      query_params['c'] = continuation_token
    item_refs_json = self._fetch_json(
        'stream/items/ids',
        query_params,
        authenticated=not stream_id.startswith(FEED_STREAM_ID_PREFIX))
    result = []
    for item_ref_json in item_refs_json['itemRefs']:
      result.append(ItemRef(
        item_id=item_id_from_decimal_form(item_ref_json['id']),
        timestamp_usec=int(item_ref_json['timestampUsec'])
      ))
    return result, item_refs_json.get('continuation')

  def fetch_item_bodies(
      self, item_ids, format='json', media_rss=False, authenticated=True):
    query_params = {
        'output': format,
        # Don't render annotations inline (so that the item body is left alone).
        # Instead we'll parse them from the <gr:annotation> namespaced entry.
        'ann': 'false'
      }
    if media_rss:
      query_params['mediaRss'] = 'true'
    post_params = {'i': [i.decimal_form for i in item_ids]}

    result_text = self._fetch(
        'stream/items/contents',
        query_params,
        post_params,
        authenticated=authenticated)

    result = {}
    if format.startswith('atom'):
      feed = base.atom.parse(result_text)
      for entry in feed.entries:
        result[entry.item_id] = entry
    else:
      item_bodies_json = json.loads(result_text)
      for item_body_json in item_bodies_json['items']:
        # TODO: parse the JSON
        item_id = item_id_from_atom_form(item_body_json['id'])
        result[item_id] = item_body_json

    for item_id in item_ids:
      if item_id not in result:
        logging.warning(
            "Requested item id %s/%s, but it was not found in the result",
            item_id.atom_form, item_id.decimal_form)

    return result

  def _fetch_json(
      self,
      api_path,
      query_params={},
      post_params={},
      authenticated=True):
    query_params = dict(query_params)
    query_params['output'] = 'json'
    response_text = self._fetch(
        api_path, query_params, post_params, authenticated)
    return json.loads(response_text)

  def _fetch(self,
      api_path,
      query_params={},
      post_params={},
      authenticated=True):
    url = 'https://www.google.com/reader/api/0/%s' % api_path

    if self._cache:
      cache_key = base.paths.url_to_file_name(url, query_params, post_params)
      cache_value = self._cache.get(cache_key)
      if cache_value:
        return cache_value

    def urlencode(params):
      return urllib.urlencode(params, doseq=True)

    request_url = '%s?%s' % (url, urlencode(query_params))
    request = urllib2.Request(
        request_url,
        headers=self._auth_headers() if authenticated else {})
    try:
      response = urllib2.urlopen(
          request,
          data=urlencode(post_params) if post_params else None)
    except urllib2.HTTPError, e:
      if e.code >= 400 and e.code < 500:
        # Log 400s, since they're usually programmer error, and the response
        # indicates how to fix it.
        logging.error(
            "HTTP status %d when requesting %s. Error response body:\n%s",
            e.code, request_url, e.read())
      raise

    response_text = response.read()
    response.close()
    if self._cache:
      self._cache.set(cache_key, response_text)
    return response_text

  def _auth_headers(self):
    return {'Authorization': 'GoogleLogin auth=%s' % self._auth_token}

class Tag(collections.namedtuple('Tag', ['stream_id', 'sort_id'])):
  def to_json(self):
    return self._asdict()

class Subscription(collections.namedtuple(
    'Subscription',
    ['stream_id', 'title', 'sort_id', 'first_item_usec', 'html_url',
    'insert_stream_ids'])):
  def to_json(self):
    return self._asdict()

class Friend(collections.namedtuple(
    'Friend',
    [
      # Shared items stream
      'stream_id',

      # Ids
      'user_ids', 'profile_ids', 'contact_id', 'group_ids',

      # Profile data
      'display_name', 'given_name', 'occupation', 'websites', 'location',
      'photo_url', 'email_addresses',

      # Flags
      'is_current_user', # Represents the requesting user.
      'is_hidden', # User has hidden this person from the broadcast-friends stream.
      'is_new', # Person is a new addition to the user's list of followed people.
      'uses_reader', # Person uses reader
      'is_blocked', # User has blocked this person.
      'has_profile', #  Person has created a Google Profile
      'is_ignored', # Person has requested to follow the user, but the user has ignored the request.
      'is_new_follower', # Person has just begun to follow the user.
      'is_anonymous', # Person doesn't have a display name set.
      'has_shared_items', # Person has shared items in reader

      'is_follower', # Person is following the user.
      'is_following', # The user is following this person.
      'is_contact', # This person is in the user's contacts list.
      'is_pending_following', # The user is attempting to follow this person.
      'is_pending_follower', # This person is attempting to follow this user.
      'is_allowed_following', # The user is allowed to follow this person.
      'is_allowed_commenting', # The user is allowed to comment on this person's shared items
    ])):
  def to_json(self):
    result = self._asdict()
    result['websites'] = [w.to_json() for w in self.websites]
    return result

class Website(collections.namedtuple('Website', ['title', 'url'])):
  def to_json(self):
    return self._asdict()

UserInfo = collections.namedtuple('UserInfo', ['user_id', 'email'])

class ItemRef(collections.namedtuple('ItemRef', ['item_id', 'timestamp_usec'])):
  def to_json(self):
    return {
      "item_id": self.item_id.to_json(),
      "timestamp_usec": self.timestamp_usec,
    }

class Stream(collections.namedtuple('Stream', ['stream_id', 'item_refs'])):
  def to_json(self):
    return {
      "stream_id": self.stream_id,
      "item_refs": {
        item_ref.item_id.to_json() : item_ref.timestamp_usec
            for item_ref in self.item_refs
      },
    }

# See https://code.google.com/p/google-reader-api/wiki/ItemId for the two forms
# item IDs.
class ItemId(collections.namedtuple('ItemId', ['decimal_form', 'atom_form'])):
  def to_json(self):
    return self.compact_form()

  def compact_form(self):
    return self.atom_form[len(_ITEM_ID_ATOM_FORM_PREFIX):]

def item_id_from_decimal_form(decimal_form):
  int_form = int(decimal_form)
  if int_form < 0:
    int_form += 1 << 64
  hex_form = hex(int_form)[2:]
  if hex_form.endswith('L'):
    hex_form = hex_form[:-1]
  atom_form = _ITEM_ID_ATOM_FORM_PREFIX + (16 - len(hex_form)) * '0' + hex_form
  return ItemId(decimal_form=decimal_form, atom_form=atom_form)

def item_id_from_atom_form(atom_form):
  hex_form = atom_form[len(_ITEM_ID_ATOM_FORM_PREFIX):]
  int_form = int(hex_form, 16)
  if int_form > 1 << 63:
    decimal_form = str(int_form - (1 << 64))
  else:
    decimal_form = str(int_form)
  return ItemId(decimal_form=decimal_form, atom_form=atom_form)

_TEST_DATA = [
  ("tag:google.com,2005:reader/item/5d0cfa30041d4348", "6705009029382226760"),
  ("tag:google.com,2005:reader/item/024025978b5e50d2", "162170919393841362"),
  ("tag:google.com,2005:reader/item/fb115bd6d34a8e9f", "-355401917359550817"),
]

def _test_ids():
  for atom_form, decimal_form in _TEST_DATA:
    item_id = item_id_from_decimal_form(decimal_form)
    assert item_id.atom_form == atom_form, \
        "%s != %s" % (item_id.atom_form, atom_form)
    item_id = item_id_from_atom_form(atom_form)
    assert item_id.decimal_form == decimal_form, \
        "%s != %s" % (item_id.decimal_form, decimal_form)
