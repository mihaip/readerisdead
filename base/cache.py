import os
import os.path

import base.paths

class DirectoryCache(object):
  def __init__(self, directory):
    self._directory = directory
    base.paths.ensure_exists(directory)

  def get(self, key):
    path = self._path(key)
    if not os.path.exists(path):
      return None
    with open(path, "r") as file:
      return file.read()

  def set(self, key, value):
    with open(self._path(key), "w") as file:
      file.write(value)

  def _path(self, key):
    return os.path.join(self._directory, key)
