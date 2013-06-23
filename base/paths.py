import base64
import hashlib
import os.path
import re

def ensure_exists(directory_path):
  if os.path.exists(directory_path):
    return
  os.makedirs(directory_path)

def normalize(path):
  return os.path.abspath(os.path.expanduser(path))

_ESCAPE_CHARACTERS_RE = re.compile(r'([/:?&]+|%20)')
_TRIM_TRAILING_DASHES_RE = re.compile(r'-+$')

def url_to_file_name(url, query_params={}, post_params={}):
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

