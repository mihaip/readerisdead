import argparse
import json
import logging
import operator
import os.path
import socket
import sys
import time
import webbrowser

import third_party.web as web

import api_handlers
import base.api
import base.log
import base.middleware
import base.paths

_READER_STATIC_PATH_PREFIX = '/reader/ui/'
_STATIC_DIRECTORY = os.path.abspath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 'static'))

urls = (
    '/', 'RedirectToMain',
    '/reader/view', 'RedirectToMain',
    '/reader/view/', 'Main',

    # HTML handlers
    '/reader/overview', 'Overview',

    # API handlers
    '/reader/api/0/subscription/list', 'api_handlers.SubscriptionList',
    '/reader/api/0/tag/list', 'api_handlers.TagList',
    '/reader/api/0/recommendation/list', 'api_handlers.RecommendationList',
    '/reader/api/0/preference/list', 'api_handlers.PreferenceList',
    '/reader/api/0/preference/stream/list', 'api_handlers.StreamPreferenceList',
    '/reader/api/0/unread-count', 'api_handlers.UnreadCount',
    '/reader/api/0/stream/contents/(.+)', 'api_handlers.StreamContents',

    # Stubbed-out handlers
    '/reader/logging', 'StubbedOut',
    '/reader/js-load-error', 'StubbedOut',
    '/reader/api/0/edit-tag', 'StubbedOut',
    '/reader/api/0/preference/stream/set', 'StubbedOut',
    '/reader/api/0/preference/stream/set', 'StubbedOut',
    '/reader/api/0/preference/set', 'StubbedOut',
    '/reader/api/0/token', 'StubbedOut',
)
render = web.template.render(
    'zombie_reader/templates/',
    globals={
      'js_escape': json.dumps,
    })

class RedirectToMain:
  def GET(self):
    raise web.redirect('/reader/view/')

class Main:
  def GET(self):
    return render.main(user_info=web.config.reader_user_info)

class Overview:
  def GET(self):
    return render.overview()

class StubbedOut:
  '''No-op handler, just avoids a 404.'''
  def GET(self):
    return ''

  def POST(self):
    return ''

def main():
  base.log.init()

  parser = argparse.ArgumentParser(
      description='Reanimated Google Reader\'s corpse to allow the Reader UI '
                  'to be used to browse a reader_archive-generated directory')

  parser.add_argument('archive_directory',
                      help='Directory to load archive data from.')
  parser.add_argument('--port', type=int, default=8074,
                      help='Port that the HTTP server will run on.')
  parser.add_argument('--disable_launch_in_browser' ,action='store_true',
                      help='Don\'t open the server in the local browser. Mainly '
                            'meant for use during development')

  args = parser.parse_args()

  archive_directory = base.paths.normalize(args.archive_directory)
  if not os.path.exists(archive_directory):
    logging.error('Could not find archive directory %s', archive_directory)
    syst.exit(1)
  web.config.reader_archive_directory = archive_directory

  _load_archive_data(archive_directory)

  app = web.application(urls, globals())

  homepage_url = 'http://%s:%d/reader/view/' % (socket.gethostname(), args.port)
  logging.info('Serving at %s', homepage_url)
  if not args.disable_launch_in_browser:
    webbrowser.open_new_tab(homepage_url)

  _run_app(app, args.port)

def _load_archive_data(archive_directory):
  _load_user_info(archive_directory)
  user_info = web.config.reader_user_info
  logging.info('Loading archive for %s', user_info.email or user_info.user_name)
  _load_streams(archive_directory)

def _load_streams(archive_directory):
  stream_items_by_stream_id = {}
  stream_ids_by_item_id = {}
  streams_directory = os.path.join(archive_directory, 'streams')
  stream_file_names = os.listdir(streams_directory)
  logging.info('Loading item refs for %d streams', len(stream_file_names))
  start_time = time.time()
  for i, stream_file_name in enumerate(stream_file_names):
    with open(os.path.join(streams_directory, stream_file_name)) as stream_file:
      stream_json = json.load(stream_file)
      stream_id = stream_json['stream_id']
      stream_items = tuple(
          (timestamp_usec, int(item_id_json, 16))
          for item_id_json, timestamp_usec
              in stream_json['item_refs'].iteritems()
      )
      stream_items = sorted(
          stream_items, key=operator.itemgetter(0), reverse=True)

      # We store the timestamps and item IDs in parallel tuples to reduce the
      # overhead of having a tuple per item.
      stream_items_by_stream_id[stream_id] = (
          tuple(si[1] for si in stream_items),
          tuple(si[0] for si in stream_items)
      )
      # Don't care about non-user streams (for labeling as categories), or
      # about the reading-list stream (applied to most items, not used by the
      # UI).
      if stream_id.startswith('user/') and \
          not stream_id.endswith('/reading-list'):
        for _, item_id_int_form in stream_items:
          stream_ids_by_item_id.setdefault(
              item_id_int_form, []).append(stream_id)
      if i % 25 == 0:
        logging.debug('  %d/%d streams loaded', i + 1, len(stream_file_names))
  web.config.reader_stream_items_by_stream_id= stream_items_by_stream_id
  web.config.reader_stream_ids_by_item_id = stream_ids_by_item_id
  logging.info('Loaded item refs from %d streams in %g seconds',
      len(stream_items_by_stream_id), time.time() - start_time)

def _load_user_info(archive_directory):
  def _data_json(file_name):
    file_path = os.path.join(archive_directory, 'data', file_name)
    with open(file_path) as data_file:
      return json.load(data_file)

  try:
      web.config.reader_user_info = \
          base.api.UserInfo.from_json(_data_json('user-info.json'))
      return
  except:
    pass

  # Synthesize a UserInfo object for the archives created before
  # b7993c5f91c1856d98d4dd702d09424e099b47a7.
  user_id = None
  email = None
  profile_id = None
  user_name = None
  public_user_name = None
  is_blogger_user = False
  signup_time_sec = 0
  is_multi_login_enabled = False

  tags = [base.api.Tag.from_json(t) for t in _data_json('tags.json')]
  for tag in tags:
    stream_id = tag.stream_id
    stream_id_pieces = tag.stream_id.split('/', 2)
    if len(stream_id_pieces) == 3 and \
        stream_id_pieces[0] == 'user' and \
        stream_id_pieces[2] == 'state/com.google/reading-list':
      user_id = stream_id_pieces[1]

  friends = [base.api.Friend.from_json(t) for t in _data_json('friends.json')]
  for friend in friends:
    if friend.is_current_user:
      if friend.email_addresses:
        email = friend.email_addresses[0]
      for i, friend_user_id in enumerate(friend.user_ids):
        if friend_user_id == user_id:
          profile_id = friend.profile_ids[i]
          break
      user_name = friend.given_name
      break

  web.config.reader_user_info = base.api.UserInfo(
      user_id=user_id, email=email, profile_id=profile_id, user_name=user_name,
      public_user_name=public_user_name, is_blogger_user=is_blogger_user,
      signup_time_sec=signup_time_sec,
      is_multi_login_enabled=is_multi_login_enabled)


def _run_app(app, port):
    func = app.wsgifunc()
    func = base.middleware.StaticMiddleware(
        func,
        url_path_prefix=_READER_STATIC_PATH_PREFIX,
        static_directory=_STATIC_DIRECTORY)
    func = base.middleware.LogMiddleware(func)

    web.httpserver.server = web.httpserver.WSGIServer(('0.0.0.0', port), func)

    try:
        web.httpserver.server.start()
    except (KeyboardInterrupt, SystemExit):
        logging.info('Shutting down the server')
        web.httpserver.server.stop()
        web.httpserver.server = None

if __name__ == '__main__':
  main()
