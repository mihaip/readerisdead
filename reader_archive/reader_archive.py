import argparse
import getpass
import itertools
import json
import logging
import os.path
import urllib
import urllib2
import sys
import xml.etree.cElementTree as ET

import base.api
import base.atom
import base.log
import base.tag_helper
import base.worker

def main():
  base.log.init()
  base.atom.init()

  parser = argparse.ArgumentParser(
      description='Comprehensive archive of a Google Reader account')

  # Credentials
  parser.add_argument('--account', default='',
                      help='Google Account to save the archive for. Omit to '
                          'specify via standard input')
  parser.add_argument('--password', default='',
                      help='Password for the account. Omit to specify via '
                          'standard input')

  # Output options
  parser.add_argument('--output_directory', default='./',
                      help='Directory where to place archive data.')

  # Fetching options
  parser.add_argument('--stream_items_chunk_size', type=int, default=10000,
                      help='Number of items refs to request per stream items '
                           'API call (higher is more efficient)')
  parser.add_argument('--item_bodies_chunk_size', type=int, default=250,
                      help='Number of items refs per request for fetching their '
                           'bodies (higher is more efficient)')
  parser.add_argument('--max_streams', type=int, default=0,
                      help='Maxmium number of streams to archive (0 for no'
                           'limit, only mean to be used for development)')
  parser.add_argument('--parallelism', type=int, default=10,
                      help='Number of requests to make in parallel.')

  args = parser.parse_args()

  output_directory = base.paths.normalize(args.output_directory)
  base.paths.ensure_exists(output_directory)
  api_responses_directory = os.path.join(output_directory, '_raw_data')
  streams_directory = os.path.join(output_directory, 'streams')
  base.paths.ensure_exists(streams_directory)
  data_directory = os.path.join(output_directory, 'data')
  base.paths.ensure_exists(data_directory)

  auth_token = _get_auth_token(args.account, args.password)

  if not auth_token:
    logging.error('Could not fetch authentication token.')
    sys.exit(1)

  api = base.api.Api(auth_token, cache_directory=api_responses_directory)

  user_info = api.fetch_user_info()
  logging.info(
    'Created API instance for %s (%s)', user_info.user_id, user_info.email)

  logging.info('Gathering streams to fetch')
  stream_ids = _get_stream_ids(api, user_info.user_id, data_directory)
  if args.max_streams and len(stream_ids) > args.max_streams:
    stream_ids = stream_ids[:args.max_streams]
  logging.info('%d streams to fetch, gathering item refs:', len(stream_ids))

  fetched_stream_ids = [0]
  def report_item_refs_progress(stream_id, item_refs):
    fetched_stream_ids[0] += 1
    logging.info("  Loaded %s item refs from %s, %d streams left.",
        "{:,}".format(len(item_refs)),
        stream_id,
        len(stream_ids) - fetched_stream_ids[0])
  item_refs_responses = base.worker.do_work(
      lambda: FetchItemRefsWorker(api, args.stream_items_chunk_size),
      stream_ids,
      args.parallelism,
      report_progress=report_item_refs_progress)

  item_ids = set()
  item_refs_total = 0
  for stream_id, item_refs in itertools.izip(stream_ids, item_refs_responses):
    item_ids.update([item_ref.item_id for item_ref in item_refs])
    item_refs_total += len(item_refs)

    stream = base.api.Stream(stream_id=stream_id, item_refs=item_refs)
    stream_file_name = base.paths.stream_id_to_file_name(stream_id) + ".json"
    stream_file_path = os.path.join(streams_directory, stream_file_name)
    with open(stream_file_path, 'w') as stream_file:
      stream_file.write(json.dumps(stream.to_json()))

  item_ids = list(item_ids)
  logging.info('%d unique items refs (%d total), getting item bodies:',
      len(item_ids), item_refs_total)

  item_bodies_to_fetch = len(item_ids)
  fetched_item_bodies = [0]

  item_ids_chunks = []
  while item_ids:
    item_ids_chunks.append(item_ids[:args.item_bodies_chunk_size])
    item_ids = item_ids[args.item_bodies_chunk_size:]

  def report_item_bodies_progress(item_ids_chunk, item_bodies):
    if item_bodies:
      fetched_item_bodies[0] += len(item_bodies)
      logging.info("  Fetched %s/%s item bodies",
          "{:,}".format(fetched_item_bodies[0]),
          "{:,}".format(item_bodies_to_fetch))
  item_bodies_chunks = base.worker.do_work(
      lambda: FetchItemBodiesWorker(api),
      item_ids_chunks,
      args.parallelism,
      report_progress=report_item_bodies_progress)


def _get_auth_token(account, password):
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

def _get_stream_ids(api, user_id, data_directory):
  def save_items(items, file_name):
    file_path = os.path.join(data_directory, file_name)
    with open(file_path, "w") as file:
      file.write(json.dumps([i.to_json() for i in items]))

  stream_ids = set()

  tags = api.fetch_tags()
  tag_stream_ids = set([t.stream_id for t in tags])
  for system_tag in base.tag_helper.TagHelper(user_id).system_tags():
    if system_tag.stream_id not in tag_stream_ids:
      tags.append(system_tag)
      tag_stream_ids.add(system_tag.stream_id)
  stream_ids.update([tag.stream_id for tag in tags])
  save_items(tags, "tags.json")

  subscriptions = api.fetch_subscriptions()
  stream_ids.update([sub.stream_id for sub in subscriptions])
  save_items(subscriptions, "subscriptions.json");

  friends = api.fetch_friends()
  stream_ids.update([
      f.stream_id for f in friends if f.stream_id and f.is_following])
  save_items(friends, "friends.json");

  stream_ids = list(stream_ids)
  # Start the fetch with user streams, since those tend to have more items and
  # are thus the long pole.
  stream_ids.sort(reverse=True)
  return stream_ids

class FetchItemRefsWorker(base.worker.Worker):
  def __init__(self, api, chunk_size):
    self._api = api
    self._chunk_size = chunk_size

  def work(self, stream_id):
    result = []
    continuation_token = None
    while True:
      item_refs, continuation_token = self._api.fetch_item_refs(
          stream_id,
          count=self._chunk_size,
          continuation_token=continuation_token)
      result.extend(item_refs)
      if not continuation_token:
        break
    return result

class FetchItemBodiesWorker(base.worker.Worker):
  def __init__(self, api):
    self._api = api

  def work(self, item_ids):
    def fetch(hifi=True):
      result = self._api.fetch_item_bodies(
              item_ids,
              format='atom-hifi' if hifi else 'atom',
              # Turn off authentication in order to make the request cheaper/
              # faster. Item bodies are not ACLed, we already have per-user tags
              # via the stream item ref fetches, and will be fetching comments
              # for shared items separately.
              authenticated=False)
      return result

    try:
      try:
        return fetch()
      except urllib2.HTTPError, e:
        if e.code == 500:
          logging.warn('  500 response when fetching items, retrying with '
              'high-fidelity output turned off')
          return fetch(hifi=False)
        else:
          logging.error('  HTTP exception when fetching items', exc_info=True)
          return None
      except ET.ParseError, e:
          logging.warn('  XML parse error when fetching items, retrying with '
              'high-fidelity turned off')
          return fetch(hifi=False)
    except:
      logging.error('  Exception when fetching items', exc_info=True)
      return None

if __name__ == '__main__':
    main()

