import collections
import json
import urllib2

class Api(object):
  def __init__(self, auth_token):
    self._auth_token = auth_token

  def fetch_user_info(self):
    user_info_json = self._fetch_json('GET', 'user-info')
    return UserInfo(user_info_json['userId'], user_info_json['userEmail'])

  def fetch_tags(self):
    tags_json = self._fetch_json('GET', 'tag/list')
    return [t['id'] for t in tags_json['tags']]

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


UserInfo = collections.namedtuple('UserInfo', ['id', 'email'])
