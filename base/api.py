import collections
import json
import urllib2

class Api(object):
  def __init__(self, auth_token):
    self._auth_token = auth_token

  def fetch_user_info(self):
    user_info_json = self._fetch_json('GET', 'user-info')
    return UserInfo(
      user_id=user_info_json['userId'],
      email=user_info_json['userEmail'])

  def fetch_tags(self):
    tags_json = self._fetch_json('GET', 'tag/list')
    result = []
    for tag_json in tags_json['tags']:
      result.append(Tag(
        stream_id=tag_json['id'],
        sort_id=tag_json['sortid']
      ))
    return result

  def fetch_subscriptions(self):
    subscriptions_json = self._fetch_json('GET', 'subscription/list')
    result = []
    for subscription_json in subscriptions_json['subscriptions']:
      insert_stream_ids = []
      for category_json in subscription_json.get('categories', []):
        insert_stream_ids.append(category_json['id'])
      result.append(Subscription(
        stream_id=subscription_json['id'],
        sort_id=subscription_json['sortid'],
        title=subscription_json.get('title'),
        first_item_usec=subscription_json.get('firstitemmsec', 0),
        html_url=subscription_json.get('htmlUrl'),
        insert_stream_ids=insert_stream_ids,
      ))
    return result

  def fetch_friends(self):
    friends_json = self._fetch_json('GET', 'friend/list')
    result = []
    for friend_json in friends_json['friends']:
      flags = friend_json.get("flags", 0)
      types = friend_json.get("types", [])
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

        is_current_user=flags & 1 << 0,
        is_hidden=flags & 1 << 1,
        is_new=flags & 1 << 2,
        uses_reader=flags & 1 << 3,
        is_follower=0 in types,
        is_following=1 in types,
        is_invite=2 in types,
        is_contact=3 in types,
      ))
    return result

  def _fetch_json(self, http_method, api_path):
    request = urllib2.Request(
        'https://www.google.com/reader/api/0/%s?output=json' % api_path,
        headers=self._auth_headers())
    response = urllib2.urlopen(request)
    response_text = response.read()
    response.close()
    return json.loads(response_text)

  def _auth_headers(self):
    return {'Authorization': 'GoogleLogin auth=%s' % self._auth_token}

Tag = collections.namedtuple(
  'Tag',
  ['stream_id', 'sort_id'])

Subscription = collections.namedtuple(
  'Subscription',
  ['stream_id', 'title', 'sort_id', 'first_item_usec', 'html_url',
  'insert_stream_ids'])

Friend = collections.namedtuple(
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
    'is_current_user', 'is_hidden', 'is_new', 'uses_reader',
    'is_follower', 'is_following', 'is_invite', 'is_contact',
  ])

Website = collections.namedtuple('Website', ['title', 'url'])

UserInfo = collections.namedtuple('UserInfo', ['user_id', 'email'])
