import argparse
import getpass
import logging
import urllib
import urllib2
import sys

import base.api
import base.log
import base.tag_helper

def main():
  base.log.init()

  parser = argparse.ArgumentParser(
      description='Comprehensive archive a Google Reader account')

  # Credentials
  parser.add_argument('--account', default='',
                      help='Google Account to save the archive for. Omit to '
                          'specify via standard input')
  parser.add_argument('--password', default='',
                      help='Password for the account. Omit to specify via '
                          'standard input')
  args = parser.parse_args()

  auth_token = get_auth_token(args.account, args.password)

  if not auth_token:
    logging.error('Could not fetch authentication token.')
    sys.exit(1)

  api = base.api.Api(auth_token)

  user_info = api.fetch_user_info()
  logging.info(
    'Created API instance for %s (%s)', user_info.user_id, user_info.email)

  tag_helper = base.tag_helper.TagHelper(user_info.user_id)
  stream_ids = set(tag_helper.system_tags())
  stream_ids.update([tag.stream_id for tag in api.fetch_tags()])
  stream_ids.update([sub.stream_id for sub in api.fetch_subscriptions()])
  stream_ids.update([f.stream_id for f in api.fetch_friends() if f.stream_id])
  logging.info('%d streams to fetch', len(stream_ids))

def get_auth_token(account, password):
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
  auth_token = None
  for line in auth_response.readlines():
    key, value = line.strip().split('=', 1)
    if key == 'Auth':
      auth_token = value
      break
  auth_response.close()
  assert auth_token
  return auth_token

if __name__ == '__main__':
    main()

