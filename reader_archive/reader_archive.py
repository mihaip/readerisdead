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
  parser.add_argument('--comments_chunk_size', type=int, default=250,
                      help='Number of items per request for fetching comments '
                           'on shared items (higher is more efficient)')
  parser.add_argument('--max_streams', type=int, default=0,
                      help='Maxmium number of streams to archive (0 for no'
                           'limit, only mean to be used for development)')
  parser.add_argument('--parallelism', type=int, default=10,
                      help='Number of requests to make in parallel.')


  # Miscellaneous.
  parser.add_argument('--additional_item_refs_file_path', default='',
                      help='Path to JSON file listing additional tag item refs '
                           'to fetch')

  args = parser.parse_args()

  output_directory = base.paths.normalize(args.output_directory)
  base.paths.ensure_exists(output_directory)
  def output_sub_directory(name):
    directory_path = os.path.join(output_directory, name)
    base.paths.ensure_exists(directory_path)
    return directory_path
  api_responses_directory = output_sub_directory('_raw_data')
  streams_directory = output_sub_directory('streams')
  data_directory = output_sub_directory('data')
  items_directory = output_sub_directory('items')
  comments_directory = output_sub_directory('comments')

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
    if not item_refs:
      logging.error('  Could not load item refs from %s', stream_id)
      return
    fetched_stream_ids[0] += 1
    logging.info('  Loaded %s item refs from %s, %d streams left.',
        '{:,}'.format(len(item_refs)),
        stream_id,
        len(stream_ids) - fetched_stream_ids[0])
  item_refs_responses = base.worker.do_work(
      lambda: FetchItemRefsWorker(api, args.stream_items_chunk_size),
      stream_ids,
      args.parallelism,
      report_progress=report_item_refs_progress)

  if args.additional_item_refs_file_path:
    _load_additional_item_refs(
        base.paths.normalize(args.additional_item_refs_file_path),
        stream_ids,
        item_refs_responses,
        user_info.user_id)

  item_ids = set()
  known_item_ids_in_compact_form = set()
  item_refs_total = 0
  for stream_id, item_refs in itertools.izip(stream_ids, item_refs_responses):
    item_ids.update([item_ref.item_id for item_ref in item_refs])
    item_refs_total += len(item_refs)

    stream = base.api.Stream(stream_id=stream_id, item_refs=item_refs)
    stream_file_name = base.paths.stream_id_to_file_name(stream_id) + '.json'
    stream_file_path = os.path.join(streams_directory, stream_file_name)
    with open(stream_file_path, 'w') as stream_file:
      stream_file.write(json.dumps(stream.to_json()))

  item_ids = list(item_ids)
  logging.info('%s unique items refs (%s total), getting item bodies:',
      '{:,}'.format(len(item_ids)),
      '{:,}'.format(item_refs_total))

  # We have two different chunking goals:
  # - Fetch items in large-ish chunks (ideally 250), to minimize HTTP request
  #   overhead per item
  # - Write items in small-ish chunks (ideally around 10) per file, since having
  #   a file per item is too annoying to deal with from a file-system
  #   perspective. We also need the chunking into files to be deterministic, so
  #   that from an item ID we know what file to look for it in.
  # We therefore first chunk the IDs by file path, and then group those chunks
  # into ID chunks that we fetch.
  # We write the file chunks immediately after fetching to decrease the
  # in-memory working set of the script.
  item_ids_by_path = {}
  for item_id in item_ids:
    item_id_file_path = base.paths.item_id_to_file_path(
        items_directory, item_id)
    item_ids_by_path.setdefault(item_id_file_path, list()).append(item_id)

  current_item_ids_chunk = []
  item_ids_chunks = [current_item_ids_chunk]
  for item_ids_for_file_path in item_ids_by_path.values():
    if len(current_item_ids_chunk) + len(item_ids_for_file_path) > \
          args.item_bodies_chunk_size:
      current_item_ids_chunk = []
      item_ids_chunks.append(current_item_ids_chunk)
    current_item_ids_chunk.extend(item_ids_for_file_path)

  item_bodies_to_fetch = len(item_ids)
  fetched_item_bodies = [0]
  def report_item_bodies_progress(_, count):
    if count is None:
      return
    fetched_item_bodies[0] += count
    logging.info('  Fetched %s/%s item bodies',
        '{:,}'.format(fetched_item_bodies[0]),
        '{:,}'.format(item_bodies_to_fetch))
  base.worker.do_work(
      lambda: FetchWriteItemBodiesWorker(api, items_directory),
      item_ids_chunks,
      args.parallelism,
      report_progress=report_item_bodies_progress)

  broadcast_stream_ids = [
      stream_id for stream_id in stream_ids
      if stream_id.startswith('user/') and
          stream_id.endswith('/state/com.google/broadcast')
  ]
  logging.info(
      'Fetching comments from %d shared item streams.',
      len(broadcast_stream_ids))
  encoded_sharers = api.fetch_encoded_sharers()
  remaining_broadcast_stream_ids = [len(broadcast_stream_ids)]
  def report_comments_progress(_, comments_by_item_id):
    if comments_by_item_id is None:
      return
    remaining_broadcast_stream_ids[0] -= 1
    logging.info('  Fetched %s comments, %s shared items streams left.',
        '{:,}'.format(len(comments_by_item_id)),
        '{:,}'.format(remaining_broadcast_stream_ids[0]))
  all_comments = {}
  comments_for_broadcast_streams = base.worker.do_work(
      lambda: FetchCommentsWorker(
          api, encoded_sharers, args.comments_chunk_size),
      broadcast_stream_ids,
      args.parallelism,
      report_progress=report_comments_progress)
  total_comment_count = 0
  for comments_for_broadcast_stream in comments_for_broadcast_streams:
    for item_id, comments in comments_for_broadcast_stream.items():
      total_comment_count += len(comments)
      all_comments.setdefault(item_id, list()).extend(comments)

  logging.info('Writing %s comments from %s items.',
      '{:,}'.format(total_comment_count),
      '{:,}'.format(len(all_comments)))
  for item_id, comments in all_comments.items():
    item_comments_file_path = base.paths.item_id_to_file_path(
        comments_directory, item_id)
    base.paths.ensure_exists(os.path.dirname(item_comments_file_path))
    with open(item_comments_file_path, 'w') as item_comments_file:
      item_comments_file.write(json.dumps({
        "item_id": item_id.to_json(),
        "comments": [c.to_json() for c in comments]
      }))

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
    with open(file_path, 'w') as file:
      file.write(json.dumps([i.to_json() for i in items]))

  stream_ids = set()

  tags = api.fetch_tags()
  tag_stream_ids = set([t.stream_id for t in tags])
  for system_tag in base.tag_helper.TagHelper(user_id).system_tags():
    if system_tag.stream_id not in tag_stream_ids:
      tags.append(system_tag)
      tag_stream_ids.add(system_tag.stream_id)
  stream_ids.update([tag.stream_id for tag in tags])
  save_items(tags, 'tags.json')

  subscriptions = api.fetch_subscriptions()
  stream_ids.update([sub.stream_id for sub in subscriptions])
  save_items(subscriptions, 'subscriptions.json');

  friends = api.fetch_friends()
  stream_ids.update([
      f.stream_id for f in friends if f.stream_id and f.is_following])
  save_items(friends, 'friends.json');

  stream_ids = list(stream_ids)
  # Start the fetch with user streams, since those tend to have more items and
  # are thus the long pole.
  stream_ids.sort(reverse=True)
  return stream_ids

def _load_additional_item_refs(
    additional_item_refs_file_path, stream_ids, item_refs_responses, user_id):
  logging.info('Adding additional item refs.')
  compact_item_ids_by_stream_id = {}
  item_refs_responses_by_stream_id = {}
  for stream_id, item_refs in itertools.izip(stream_ids, item_refs_responses):
    compact_item_ids_by_stream_id[stream_id] = set(
      item_ref.item_id.compact_form() for item_ref in item_refs)
    item_refs_responses_by_stream_id[stream_id] = item_refs

  # The JSON file stores item IDs in hex, but with a leading 0x. Additionally,
  # timestamps are in microseconds, but they're stored as strings.
  def item_ref_from_json(item_ref_json):
      return base.api.ItemRef(
        item_id=base.api.item_id_from_compact_form(item_ref_json['id'][2:]),
        timestamp_usec=int(item_ref_json['timestampUsec']))

  with open(additional_item_refs_file_path) as additional_item_refs_file:
    additional_item_refs = json.load(additional_item_refs_file)
    for stream_id, item_refs_json in additional_item_refs.iteritems():
      if not stream_id.startswith('user/%s/' % user_id) or \
          'state/com.google/touch' in stream_id:
        # Ignore tags from other users and those added by
        # https://github.com/mihaip/google-reader-touch
        continue
      if stream_id not in item_refs_responses_by_stream_id:
        logging.info('  Stream %s (%s items) is new.',
          stream_id, '{:,}'.format(len(item_refs_json)))
        stream_ids.append(stream_id)
        item_refs_responses.append(
            [item_ref_from_json(i) for i in item_refs_json])
      else:
        new_item_refs = []
        known_item_ids = compact_item_ids_by_stream_id[stream_id]
        for item_ref_json in item_refs_json:
          if item_ref_json['id'][2:] not in known_item_ids:
            new_item_refs.append(item_ref_from_json(item_ref_json))
        logging.info('  Got an additional %s item refs for %s',
            '{:,}'.format(len(new_item_refs)), stream_id)
        item_refs_responses_by_stream_id[stream_id].extend(new_item_refs)

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

class FetchWriteItemBodiesWorker(base.worker.Worker):
  def __init__(self, api, items_directory):
    self._api = api
    self._items_directory = items_directory

  def work(self, item_ids):
    if not item_ids:
      return 0

    item_bodies_by_id = self._fetch_item_bodies(item_ids)
    if not item_bodies_by_id:
      return 0

    item_bodies_by_file_path = self._group_item_bodies(
      item_bodies_by_id.values())
    for file_path, item_bodies in item_bodies_by_file_path.items():
      self._write_item_bodies(file_path, item_bodies)
    return len(item_bodies_by_id)

  def _fetch_item_bodies(self, item_ids):
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

  def _group_item_bodies(self, item_bodies):
    item_bodies_by_path = {}
    for entry in item_bodies:
      item_id_file_path = base.paths.item_id_to_file_path(
          self._items_directory, entry.item_id)
      item_bodies_by_path.setdefault(item_id_file_path, list()).append(entry)
    return item_bodies_by_path

  def _write_item_bodies(self, file_path, item_bodies):
    base.paths.ensure_exists(os.path.dirname(file_path))
    feed_element = ET.Element('{%s}feed' % base.atom.ATOM_NS)
    for entry in item_bodies:
      feed_element.append(entry.element)

    with open(file_path, 'w') as items_file:
        ET.ElementTree(feed_element).write(
            items_file,
            xml_declaration=True,
            encoding='utf-8')

class FetchCommentsWorker(base.worker.Worker):
  def __init__(self, api, encoded_sharers, chunk_size):
    self._api = api
    self._encoded_sharers = encoded_sharers
    self._chunk_size = chunk_size

  def work(self, broadcast_stream_id):
    result = {}
    continuation_token = None
    while True:
      comments_by_item_id, continuation_token = self._api.fetch_comments(
          broadcast_stream_id,
          encoded_sharers=self._encoded_sharers,
          count=self._chunk_size,
          continuation_token=continuation_token)
      result.update(comments_by_item_id)
      if not continuation_token:
        break
    return result

if __name__ == '__main__':
    main()

