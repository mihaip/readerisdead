class TagHelper(object):
  def __init__(self, user_id):
    self._user_id = user_id

  def system_tags(self):
    return [
      # Item state tags
      self._state_tag('broadcast'),
      self._state_tag('starred'),
      self._state_tag('like'),
      self._state_tag('dislike'),
      self._state_tag('read'),
      self._state_tag('kept-unread'),
      self._state_tag('tracking-body-link-used'),
      self._state_tag('tracking-emailed'),
      self._state_tag('tracking-item-link-used'),
      self._state_tag('tracking-kept-unread'),
      self._state_tag('tracking-custom-item-link'),
      self._state_tag('tracking-mobile-read'),

      # Note-in-Reader
      self._source_tag('post'),
      self._source_tag('link'),
      self._state_tag('created'),

      # Subscription level tags
      self._state_tag('reading-list'),
      self._state_tag('broadcast-friends'),
      self._user_tag('state', 'com.blogger', 'blogger-following'),
    ]

  def _state_tag(self, state):
    return self._internal_tag('state', state)

  def _source_tag(self, source):
    return self._internal_tag('source', source)

  def _internal_tag(self, type, name):
    return self._user_tag(type, 'com.google', name)

  def _user_tag(self, *args):
    return 'user/%s/%s' % (self._user_id, '/'.join(args))

