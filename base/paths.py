import base64
import hashlib
import os.path
import re

import base.api

def ensure_exists(directory_path):
  if os.path.exists(directory_path):
    return
  os.makedirs(directory_path)

def normalize(path):
  return os.path.abspath(os.path.expanduser(path))

_ESCAPE_CHARACTERS_RE = re.compile(r'([/:?&]+|%20)')
_STREAM_ID_DISALLOWED_CHARACTERS_RE = re.compile(r'([^A-Za-z0-9\-._/ :?&]+)')
_TRIM_TRAILING_DASHES_RE = re.compile(r'-+$')

def url_to_file_name(url, query_params=None, post_params=None):
  file_name = url
  if file_name.startswith('http://'):
    file_name = file_name[7:]
  if file_name.startswith('https://'):
    file_name = file_name[8:]
  file_name = _ESCAPE_CHARACTERS_RE.sub('-', file_name)
  file_name = _TRIM_TRAILING_DASHES_RE.sub('', file_name)

  signature_data = []

  if len(file_name) > 64:
    signature_data.append(file_name[64:])
    file_name = file_name[:64]
  if query_params:
    signature_data.append(str(query_params))
  if post_params:
    signature_data.append(str(post_params))

  if signature_data:
    signature = hashlib.md5('-'.join(signature_data)).digest()
    signature = base64.urlsafe_b64encode(signature)
    signature = re.sub(r'=+$', '', signature)
    file_name += '-' + signature

  return file_name

def stream_id_to_file_name(stream_id):
  if stream_id.startswith(base.api.FEED_STREAM_ID_PREFIX):
    feed_url = stream_id[len(base.api.FEED_STREAM_ID_PREFIX):]
    if "?" in feed_url:
      feed_url, query_params = feed_url.split("?", 1)
    else:
      query_params = None
    return "%s-%s" % (url_to_file_name(base.api.FEED_STREAM_ID_PREFIX),
      url_to_file_name(feed_url, query_params))

  # Replace non-ASCII characters with dashes, but keep track of them, so that a
  # unique filename can still be generated for each
  disallowed_character_data = []
  for d in _STREAM_ID_DISALLOWED_CHARACTERS_RE.findall(stream_id):
    disallowed_character_data.append(d)
  stream_id = _STREAM_ID_DISALLOWED_CHARACTERS_RE.sub('-', stream_id)
  return url_to_file_name(stream_id, query_params=disallowed_character_data)


def item_id_to_file_path(items_directory, item_id):
  item_file_name = item_id.compact_form()
  # Keep number of files per directory reasonable.
  return os.path.join(
      items_directory, item_file_name[0:2], item_file_name[2:4])
