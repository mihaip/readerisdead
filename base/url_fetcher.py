import getpass
import json
import logging
import sys
import time
import urllib
import urllib2
import webbrowser

class UrlFetcher(object):
  def fetch(self, url, post_data=None):
    raise NotImplementedError()

class RetryingUrlFetcher(UrlFetcher):
  def __init__(self, retry_count, url_fetcher):
    self._retry_count = retry_count
    self._url_fetcher = url_fetcher

  def fetch(self, url, post_data=None):
    for i in xrange(0, self._retry_count):
      try:
        return self._url_fetcher.fetch(url, post_data)
      except urllib2.URLError as e:
        if i == self._retry_count - 1:
          raise
        else:
          logging.info("Ignoring URL error %s, %d retries remaining.",
              e, self._retry_count - i - 1)

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
    if not account:
      logging.critical("Username was not provided.")
      sys.exit(1)
    password = password or getpass.getpass('Password: ')
    if not password:
      logging.critical("Password was not provided.")
      sys.exit(1)

    self._auth_token = None
    credentials_data = urllib.urlencode({
      'Email': account,
      'Passwd': password,
      'service': 'reader',
      'accountType': 'GOOGLE',
    })
    try:
      auth_response = urllib2.urlopen(
          'https://www.google.com/accounts/ClientLogin', credentials_data)
      for line in auth_response.readlines():
        key, value = line.strip().split('=', 1)
        if key == 'Auth':
          self._auth_token = value
          break
      auth_response.close()
    except urllib2.HTTPError as e:
      logging.error(
          'Error response while fetching authentication token: %s %s',
          e.code, e.message)
    assert self._auth_token

  def fetch(self, url, post_data=None):
    request = urllib2.Request(
        url, headers={'Authorization': 'GoogleLogin auth=%s' % self._auth_token})
    response = urllib2.urlopen(request, data=post_data)
    response_text = response.read()
    response.close()
    return response_text

_OAUTH_CLIENT_ID = '710067677727.apps.googleusercontent.com'
_OAUTH_CLIENT_SECRET = '3152N3ORUhdIgYX4LwCcs9Ix'

class OAuthUrlFetcher(UrlFetcher):
  def __init__(self, refresh_token):
    if refresh_token:
      self._refresh_token = refresh_token
      self._fetch_access_token()
    else:
      self._request_authorization()

  def fetch(self, url, post_data=None):
    if time.time() > self._access_token_expiration_time:
      logging.info("Access token has expired, requesting a new one.")
      self._fetch_access_token()

    request = urllib2.Request(
        url, headers={'Authorization': 'Bearer %s' % self._access_token})
    response = urllib2.urlopen(request, data=post_data)
    response_text = response.read()
    response.close()
    return response_text

  def _request_authorization(self):
    query_params = {
      'response_type': 'code',
      'client_id': _OAUTH_CLIENT_ID,
      'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob',
      'scope': 'https://www.google.com/reader/api'
    }
    initial_url = 'https://accounts.google.com/o/oauth2/auth?%s' % \
        urllib.urlencode(query_params)

    logging.info("Opening the OAuth authorization page...")
    logging.info("If you do not see a browser tab appear, you should open the "
        "following URL:\n%s\n", initial_url)
    webbrowser.open_new_tab(initial_url)

    logging.info("Once you complete the approval, you will be given a code. "
        "Please copy and paste it below and press return.")
    authorization_code = raw_input('Authorization code: ')
    if not authorization_code:
      logging.critical("Authorization code was not provided.")
      sys.exit(1)

    token_request = \
        urllib2.Request('https://accounts.google.com/o/oauth2/token')
    token_response = urllib2.urlopen(token_request, data=urllib.urlencode({
      'code': authorization_code,
      'client_id': _OAUTH_CLIENT_ID,
      'client_secret': _OAUTH_CLIENT_SECRET,
      'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob',
      'grant_type': 'authorization_code',
    }))

    token_response_json = json.load(token_response)
    token_response.close()

    self._refresh_token = token_response_json['refresh_token']
    self._access_token = token_response_json['access_token']
    self._access_token_expiration_time = \
        time.time() + token_response_json['expires_in'] - 60

    logging.info('If you\'d like to use the tool again without having to go '
        'through OAuth authorization, you can add the following flag to the '
        'invocation:\n\n  --oauth_refresh_token="%s"', self._refresh_token)

  def _fetch_access_token(self):
    token_request = \
        urllib2.Request('https://accounts.google.com/o/oauth2/token')
    token_response = urllib2.urlopen(token_request, data=urllib.urlencode({
      'refresh_token': self._refresh_token,
      'client_id': _OAUTH_CLIENT_ID,
      'client_secret': _OAUTH_CLIENT_SECRET,
      'grant_type': 'refresh_token',
    }))

    token_response_json = json.load(token_response)
    token_response.close()

    self._access_token = token_response_json['access_token']
    self._access_token_expiration_time = \
        time.time() + token_response_json['expires_in'] - 60

