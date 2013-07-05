import argparse
import logging
import os.path
import socket
import sys
import webbrowser
import third_party.web as web

import base.paths
import base.log
import base.middleware

_READER_STATIC_PATH_PREFIX = '/reader/ui/'
_STATIC_DIRECTORY = os.path.abspath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "static"))

urls = (
    '/', 'Index',
    '/reader/view/', 'Main',
    '/reader/logging', 'Logging',
    '/reader/overview', 'Overview',
)
render = web.template.render('zombie_reader/templates/')

class Index:
  def GET(self):
    raise web.redirect('/reader/view/')

class Main:
  def GET(self):
    return render.main()

class Overview:
  def GET(self):
    return render.overview()

class Logging:
  def POST(self):
    # No-op handler, just avoids a 404
    return ""

def main():
  base.log.init()

  parser = argparse.ArgumentParser(
      description='Reanimated Google Reader\'s corpse to allow the Reader UI '
                  'to be used to browse a reader_archive-generated directory')

  parser.add_argument('archive_directory',
                      help='Directory to load archive data from.')
  parser.add_argument('--port', type=int, default=8074,
                      help='Port that the HTTP server will run on.')

  args = parser.parse_args()

  archive_directory = base.paths.normalize(args.archive_directory)
  if not os.path.exists(archive_directory):
    logging.error("Could not find archive directory %s", archive_directory)
    syst.exit(1)

  app = web.application(urls, globals())

  homepage_url = "http://%s:%d/" % (socket.gethostname(), args.port)
  logging.info("Serving at %s", homepage_url)
  webbrowser.open_new_tab(homepage_url)

  _run_app(app, args.port)

def _run_app(app, port):
    func = app.wsgifunc()
    func = base.middleware.StaticMiddleware(
        func,
        url_path_prefix=_READER_STATIC_PATH_PREFIX,
        static_directory=_STATIC_DIRECTORY)
    func = base.middleware.LogMiddleware(func)

    web.httpserver.server = web.httpserver.WSGIServer(("0.0.0.0", port), func)

    try:
        web.httpserver.server.start()
    except (KeyboardInterrupt, SystemExit):
        web.httpserver.server.stop()
        web.httpserver.server = None

if __name__ == "__main__":
  main()
