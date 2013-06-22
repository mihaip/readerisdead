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

UserInfo = collections.namedtuple('UserInfo', ['user_id', 'email'])
