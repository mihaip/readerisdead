import collections
import json
import logging
import re
import urllib
import urllib2

import base.cache
import base.paths
import base.url_fetcher

FEED_STREAM_ID_PREFIX = 'feed/'
EXPLORE_STREAM_ID = 'pop/topic/top/language/en'

_ITEM_ID_ATOM_FORM_PREFIX = 'tag:google.com,2005:reader/item/'

# The explore stream lists a bunch of item IDs that can't be found, ignore them
# instead of worrying people.
not_found_items_ids_to_ignore = set()

class Api(object):
  def __init__(self,
      authenticated_url_fetcher, http_retry_count=None, cache_directory=None):
    self._direct_url_fetcher = base.url_fetcher.DirectUrlFetcher()
    self._authenticated_url_fetcher = authenticated_url_fetcher
    if http_retry_count > 1:
      self._direct_url_fetcher = base.url_fetcher.RetryingUrlFetcher(
          http_retry_count, self._direct_url_fetcher)
      self._authenticated_url_fetcher = base.url_fetcher.RetryingUrlFetcher(
          http_retry_count, self._authenticated_url_fetcher)

    self._cache = \
      base.cache.DirectoryCache(cache_directory) if cache_directory else None

  def fetch_user_info(self):
    user_info_json = self._fetch_json('user-info')
    return UserInfo(
      user_id=user_info_json['userId'],
      email=user_info_json['userEmail'],
      profile_id=user_info_json['userProfileId'],
      user_name=user_info_json['userName'],
      public_user_name=user_info_json.get('publicUserName'),
      is_blogger_user=user_info_json['isBloggerUser'],
      signup_time_sec=user_info_json['signupTimeSec'],
      is_multi_login_enabled=user_info_json['isMultiLoginEnabled'])

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

  def fetch_encoded_sharers(self):
    friends_json = self._fetch_json('friend/list', {'lookup': 'ALL'})
    return friends_json.get('encodedSharersList', '')

  def fetch_sharing_groups(self):
    sharing_groups_json = self._fetch_json('friend/groups')
    result = []
    for sharing_group_json in sharing_groups_json['sharingGroups']:
      result.append(SharingGroup(
        group_id=sharing_group_json['groupId'],
        is_read_only=sharing_group_json['isReadOnly'],
        name=sharing_group_json['name'],
        is_sharing=sharing_group_json['isSharing'],
      ))
    return result

  def fetch_sharing_acl(self):
    sharing_acl_json = self._fetch_json('friend/acl')
    return SharingAcl(
        type=sharing_acl_json['type'],
        member_user_ids=sharing_acl_json['memberId'],
        is_editing_disabled=sharing_acl_json['isEditingDisabled'])

  def fetch_bundles(self):
    bundles_json = self._fetch_json('list-user-bundle')
    result = []
    for bundle_json in bundles_json['bundles']:
      feeds = []
      for feed_json in bundle_json['feeds']:
        feeds.append(BundleFeed(
            stream_id=feed_json['id'], title=feed_json['title']))
      result.append(Bundle(
        bundle_id=bundle_json['id'],
        title=bundle_json['title'],
        description=bundle_json.get('description'),
        subscriber_count=bundle_json['subscriberCount'],
        feeds=feeds))
    return result

  def fetch_recommendations(self, count=20):
    recommendations_json = self._fetch_json(
        'recommendation/list', {'n': count})
    result = []
    for recommendation_json in recommendations_json['recs']:
      result.append(Recommendation(
          stream_id=recommendation_json['streamId'],
          title=recommendation_json['title']))
    return result

  def fetch_preferences(self):
    prefs_json = self._fetch_json('preference/list')
    result = {}
    for pref_json in prefs_json['prefs']:
      result[pref_json['id']] = pref_json['value']
    return result

  def fetch_stream_preferences(self):
    prefs_json = self._fetch_json('preference/stream/list')
    result = {}
    for stream_id, stream_prefs_json in prefs_json['streamprefs'].iteritems():
      stream_prefs = {}
      for pref_json in stream_prefs_json:
        stream_prefs[pref_json['id']] = pref_json['value']
      result[stream_id] = stream_prefs
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

  def fetch_comments(
      self, stream_id, encoded_sharers, count=10, continuation_token=None):
    query_params = {
      'comments': 'true',
      'sharers': encoded_sharers,
      'n': count,
    }
    if continuation_token:
      query_params['c'] = continuation_token
    stream_contents_json = self._fetch_json(
        'stream/contents/%s' % urllib.quote(stream_id),
        query_params)
    result = {}
    for item_json in stream_contents_json['items']:
      comments_json = item_json.get('comments', [])
      if not comments_json:
          continue
      item_id = item_id_from_atom_form(item_json['id'])
      comments = []
      for comment_json in comments_json:
        comments.append(Comment(
          comment_id=comment_json['id'],
          plain_content=comment_json['plainContent'],
          html_content=comment_json['htmlContent'],
          author_name=comment_json.get('author'),
          author_user_id=comment_json['userId'],
          author_profile_id=comment_json['profileId'],
          venue_stream_id=comment_json['venueStreamId'],
          created_time_usec=comment_json['createdTime'] * 1000000,
          modified_time_usec=comment_json['modifiedTime'] * 1000000,
          is_spam=comment_json['isSpam'],
        ))
      result[item_id] = comments
    return result, stream_contents_json.get('continuation')

  def fetch_item_bodies(
      self, item_ids, format='json', media_rss=False, authenticated=True):
    query_params = {
        'output': format,
        # Don't render annotations inline (so that the item body is left alone).
        # Instead we'll parse them from the <gr:annotation> namespaced entry.
        'ann': 'false',
        # Likes are public data, and thus work even if we don't use
        # authentication.
        'likes': 'true',
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
      if item_id not in result and item_id not in not_found_items_ids_to_ignore:
        logging.warning(
            'Requested item id %s (%s), but it was not found in the result',
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
      def encode(s):
        return isinstance(s, unicode) and s.encode('utf-8') or s

      encoded_params = {}
      for key, value in params.items():
        if isinstance(value, list):
          value = [encode(v) for v in value]
        else:
          value = encode(value)
        encoded_params[encode(key)] = value
      return urllib.urlencode(encoded_params, doseq=True)

    request_url = '%s?%s' % (url, urlencode(query_params))
    url_fetcher = self._authenticated_url_fetcher if authenticated \
        else self._direct_url_fetcher
    response_text = url_fetcher.fetch(
        request_url,
        post_data=urlencode(post_params) if post_params else None)
    if self._cache:
      self._cache.set(cache_key, response_text)
    return response_text

class Tag(collections.namedtuple('Tag', ['stream_id', 'sort_id'])):
  def to_json(self):
    return self._asdict()

  @staticmethod
  def from_json(tag_json):
    return Tag(**tag_json)

class Subscription(collections.namedtuple(
    'Subscription',
    ['stream_id', 'title', 'sort_id', 'first_item_usec', 'html_url',
    'insert_stream_ids'])):
  def to_json(self):
    return self._asdict()

  @staticmethod
  def from_json(subscription_json):
    return Subscription(**subscription_json)

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

  @staticmethod
  def from_json(friend_json):
    return Friend(**friend_json)


class Website(collections.namedtuple('Website', ['title', 'url'])):
  def to_json(self):
    return self._asdict()

class SharingGroup(collections.namedtuple('SharingGroup',
    ['group_id', 'is_read_only', 'name', 'is_sharing'])):
  def to_json(self):
    return self._asdict()

class SharingAcl(collections.namedtuple('SharingAcl',
    ['type', 'member_user_ids', 'is_editing_disabled'])):
  def to_json(self):
    return self._asdict()

class Bundle(collections.namedtuple('Bundle',
    ['bundle_id', 'title', 'description', 'subscriber_count', 'feeds'])):
  def to_json(self):
    result = self._asdict()
    result['feeds'] = [f.to_json() for f in self.feeds]
    return result

class BundleFeed(collections.namedtuple('BundleFeed', ['stream_id', 'title'])):
  def to_json(self):
    return self._asdict()

class Recommendation(collections.namedtuple('Recommendation',
    ['stream_id', 'title'])):
  def to_json(self):
    return self._asdict()

  @staticmethod
  def from_json(recommendation_json):
    return Recommendation(**recommendation_json)

class Comment(collections.namedtuple(
    'Comment',
    [
      'comment_id',
      'plain_content',
      'html_content',
      'author_name',
      'author_user_id',
      'author_profile_id',
      'venue_stream_id',
      'created_time_usec',
      'modified_time_usec',
      'is_spam',
    ])):
  def to_json(self):
    return self._asdict()

  @staticmethod
  def from_json(comment_json):
    return Comment(**comment_json)

class UserInfo(collections.namedtuple(
    'UserInfo',
    [
      'user_id',
      'email',
      'profile_id',
      'user_name',
      'public_user_name',
      'is_blogger_user',
      'signup_time_sec',
      'is_multi_login_enabled'
    ])):
  def to_json(self):
    return self._asdict()

  @staticmethod
  def from_json(user_info_json):
    return UserInfo(**user_info_json)

class ItemRef(collections.namedtuple('ItemRef', ['item_id', 'timestamp_usec'])):
  def to_json(self):
    return {
      'item_id': self.item_id.to_json(),
      'timestamp_usec': self.timestamp_usec,
    }

class Stream(collections.namedtuple('Stream', ['stream_id', 'item_refs'])):
  def to_json(self):
    return {
      'stream_id': self.stream_id,
      'item_refs': {
        item_ref.item_id.to_json() : item_ref.timestamp_usec
            for item_ref in self.item_refs
      },
    }

  @staticmethod
  def from_json(stream_json):
    item_refs = [
      ItemRef(
          item_id=ItemId.from_json(item_id_json),
          timestamp_usec=timestamp_usec
      ) for item_id_json, timestamp_usec
      in stream_json['item_refs'].iteritems()
    ]
    item_refs = sorted(item_refs, key=lambda i: i.timestamp_usec, reverse=True)
    return Stream(stream_id=stream_json['stream_id'], item_refs=item_refs)

class ItemId(collections.namedtuple('ItemId', ['int_form'])):
  def to_json(self):
    return self.compact_form()

  def compact_form(self):
    compact_form = hex(self.int_form)[2:]
    if compact_form.endswith('L'):
      compact_form = compact_form[:-1]
    compact_form = (16 - len(compact_form)) * '0' + compact_form
    return compact_form

  # See https://code.google.com/p/google-reader-api/wiki/ItemId for the two forms
  # item IDs.
  @property
  def decimal_form(self):
    if self.int_form > 1 << 63:
      return str(self.int_form - (1 << 64))
    else:
      return str(self.int_form)

  @property
  def atom_form(self):
    return _ITEM_ID_ATOM_FORM_PREFIX + self.compact_form()

  @staticmethod
  def from_json(item_id_json):
    return item_id_from_compact_form(item_id_json)

def item_id_from_decimal_form(decimal_form):
  int_form = int(decimal_form)
  if int_form < 0:
    int_form += 1 << 64
  return ItemId(int_form=int_form)

def item_id_from_atom_form(atom_form):
  return item_id_from_compact_form(atom_form[len(_ITEM_ID_ATOM_FORM_PREFIX):])

def item_id_from_compact_form(compact_form):
  return ItemId(int_form=int(compact_form, 16))

def item_id_from_any_form(form):
  if form.startswith(_ITEM_ID_ATOM_FORM_PREFIX):
    return item_id_from_atom_form(form)

  if form.startswith('0x'):
    return item_id_from_compact_form(form[2:])

  if re.match('^[0-9a-f]+$', form, re.I):
    return item_id_from_compact_form(form)

  if re.match('^-?[0-9]+$', form):
    return item_id_from_decimal_form(form)

  return None

_TEST_DATA = [
  ('tag:google.com,2005:reader/item/5d0cfa30041d4348', '6705009029382226760'),
  ('tag:google.com,2005:reader/item/024025978b5e50d2', '162170919393841362'),
  ('tag:google.com,2005:reader/item/fb115bd6d34a8e9f', '-355401917359550817'),
]

def _test_ids():
  for atom_form, decimal_form in _TEST_DATA:
    item_id = item_id_from_decimal_form(decimal_form)
    assert item_id.atom_form == atom_form, \
        '%s != %s' % (item_id.atom_form, atom_form)
    item_id = item_id_from_atom_form(atom_form)
    assert item_id.decimal_form == decimal_form, \
        '%s != %s' % (item_id.decimal_form, decimal_form)
