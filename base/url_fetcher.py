import urllib
import urllib2

class UrlFetcher(object):
  def fetch(self, url, post_data=None):
    raise NotImplementedError()

class DirectUrlFetcher(UrlFetcher):
  def fetch(self, url, post_data=None):
    request = urllib2.Request(url)
    response = urllib2.urlopen(request, data=post_data)
    response_text = response.read()
    response.close()
    return response_text

class ClientLoginUrlFetcher(UrlFetcher):
  def __init__(self, account, password):
    account = account or raw_input('Google Account username: ')
    password = password or getpass.getpass('Password: ')
    credentials_data = urllib.urlencode({
      'Email': account,
      'Passwd': password,
      'service': 'reader',
      'accountType': 'GOOGLE',
    })
    try:
      auth_response = urllib2.urlopen(
          'https://www.google.com/accounts/ClientLogin', credentials_data)
    except urllib2.HTTPError, e:
      logging.error(
          'Error response while fetching authentication token: %s %s',
          e.code, e.message)
      return None
    self._auth_token = None
    for line in auth_response.readlines():
      key, value = line.strip().split('=', 1)
      if key == 'Auth':
        self._auth_token = value
        break
    auth_response.close()
    assert self._auth_token

  def fetch(self, url, post_data=None):
    request = urllib2.Request(
        url, headers={'Authorization': 'GoogleLogin auth=%s' % self._auth_token})
    response = urllib2.urlopen(request, data=post_data)
    response_text = response.read()
    response.close()
    return response_text
