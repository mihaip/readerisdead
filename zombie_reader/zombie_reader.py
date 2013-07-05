import argparse
import json
import logging
import os.path
import socket
import sys
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

    # Stubbed-out handlers
    '/reader/logging', 'StubbedOut',
    '/reader/js-load-error', 'StubbedOut',
)
render = web.template.render('zombie_reader/templates/')

class RedirectToMain:
  def GET(self):
    raise web.redirect('/reader/view/')

class Main:
  def GET(self):
    return render.main()

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

  streams_by_stream_id = {}
  streams_directory = os.path.join(archive_directory, 'streams')
  stream_file_names = os.listdir(streams_directory)
  logging.info('Loading item refs for %d streams', len(stream_file_names))
  for i, stream_file_name in enumerate(stream_file_names):
    with open(os.path.join(streams_directory, stream_file_name)) as stream_file:
      stream_json = json.load(stream_file)
      stream = base.api.Stream.from_json(stream_json)
      streams_by_stream_id[stream.stream_id] = stream
      if i % 25 == 1:
        logging.info('  %d/%d streams loaded', i, len(stream_file_names))
  web.config.streams_by_stream_id = streams_by_stream_id
  logging.info('Loaded item refs from %d streams', len(streams_by_stream_id))

  app = web.application(urls, globals())

  homepage_url = 'http://%s:%d/reader/view/' % (socket.gethostname(), args.port)
  logging.info('Serving at %s', homepage_url)
  if not args.disable_launch_in_browser:
    webbrowser.open_new_tab(homepage_url)

  _run_app(app, args.port)

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
        web.httpserver.server.stop()
        web.httpserver.server = None

if __name__ == '__main__':
  main()
