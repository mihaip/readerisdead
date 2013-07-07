import logging
import os.path
import posixpath
import time
import urllib

import third_party.web as web

class LogMiddleware:
  """WSGI middleware for logging the HTTP requests. Based on web.httpserver.
  LogMiddleware, but simplified for our needs."""
  def __init__(self, app):
    self._app = app

  def __call__(self, environ, start_response):
    start_time = time.time()
    def logging_start_response(status, response_headers, *args):
        out = start_response(status, response_headers, *args)
        server_time = time.time() - start_time
        self._log(status, server_time, environ)
        return out

    return self._app(environ, logging_start_response)

  def _log(self, status, server_time, environ):
    req = environ.get('PATH_INFO', '_')
    if environ.get('QUERY_STRING'):
      req += '?%s' % environ['QUERY_STRING']
    method = environ.get('REQUEST_METHOD', '-')

    logging.debug('%s %s - %s (%gms)', method, req, status, server_time * 1000)

class StaticMiddleware:
  """WSGI middleware for serving static files. Based on web.httpserver.
  StaticMiddleware, but allows the prefix and on-disk directory to be
  different."""
  def __init__(self, app, url_path_prefix, static_directory):
    self._app = app
    self._url_path_prefix = url_path_prefix
    self._static_directory = static_directory

  def __call__(self, environ, start_response):
    path = environ.get('PATH_INFO', '')
    path = self._normalize_path(path)

    if path.startswith(self._url_path_prefix):
      return _StaticApp(
          environ,
          start_response,
          self._url_path_prefix,
          self._static_directory)
    else:
      return self._app(environ, start_response)

  def _normalize_path(self, path):
    normalized_path = posixpath.normpath(urllib.unquote(path))
    if path.endswith("/"):
      normalized_path += "/"
    return normalized_path

class _StaticApp(web.httpserver.StaticApp):
  def __init__(
        self, environ, start_response, url_path_prefix, static_directory):
    web.httpserver.StaticApp.__init__(self, environ, start_response)
    self._url_path_prefix = url_path_prefix
    self._static_directory = static_directory

  def translate_path(self, path):
    static_file_path = os.path.abspath(os.path.join(
        self._static_directory, path[len(self._url_path_prefix):]))
    if static_file_path.startswith(self._static_directory):
      return static_file_path

    return None
