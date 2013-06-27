import argparse
import logging
import os.path
import socket
import sys
import SimpleHTTPServer
import SocketServer

import base.paths
import base.log

static_directory = os.path.abspath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "static"))
archive_directory = None

_STATIC_PATH_PREFIX = '/static/'
_ARCHIVE_PATH_PREFIX = '/archive/'

def main():
  global archive_directory
  base.log.init()

  parser = argparse.ArgumentParser(
      description='HTTP server that allows the browsing of an archive of a'
                  'Google Reader account')

  parser.add_argument('archive_directory',
                      help='Directory to load archive data from.')
  parser.add_argument('--port', type=int, default=8071,
                      help='Port that the HTTP server will run on.')

  args = parser.parse_args()

  archive_directory = base.paths.normalize(args.archive_directory)
  if not os.path.exists(archive_directory):
    logging.error("Could not find archive directory %s", archive_directory)
    syst.exit(1)

  httpd = SocketServer.TCPServer(("", args.port), Handler)

  logging.info("Serving at http://%s:%d/", socket.gethostname(), args.port)
  httpd.serve_forever()

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
  def translate_path(self, path):
    if path == '/':
      return os.path.join(static_directory, "index.html")

    if path.startswith(_STATIC_PATH_PREFIX):
      static_file_path = os.path.abspath(
          os.path.join(static_directory, path[len(_STATIC_PATH_PREFIX):]))
      if static_file_path.startswith(static_directory):
        return static_file_path

    if path.startswith(_ARCHIVE_PATH_PREFIX):
      archive_file_path = os.path.abspath(
          os.path.join(archive_directory, path[len(_ARCHIVE_PATH_PREFIX):]))
      if archive_file_path.startswith(archive_directory):
        return archive_file_path

    # Fallthrough
    return os.path.join(static_directory, "404.html")

if __name__ == '__main__':
    main()
