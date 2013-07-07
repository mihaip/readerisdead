import base.api

class TagHelper(object):
  def __init__(self, user_id):
    self._user_id = user_id

  def system_tags(self):
    return [
      # Item state tags
      self.state_tag('broadcast'),
      self.state_tag('starred'),
      self.state_tag('like'),
      self.state_tag('dislike'),
      self.state_tag('read'),
      self.state_tag('kept-unread'),
      self.state_tag('muted'),
      self.state_tag('skimmed'),
      self.state_tag('itemrecs/en'),
      self.state_tag('tracking-body-link-used'),
      self.state_tag('tracking-emailed'),
      self.state_tag('tracking-item-link-used'),
      self.state_tag('tracking-kept-unread'),
      self.state_tag('tracking-custom-item-link'),
      self.state_tag('tracking-mobile-read'),
      self.state_tag('tracking-explore-read'),
      self.state_tag('tracking-igoogle-module-read'),

      # Note-in-Reader
      self._source_tag('post'),
      self._source_tag('link'),
      self.state_tag('created'),

      # Subscription level tags
      self.state_tag('reading-list'),
      self.state_tag('broadcast-friends'),
      self._user_tag('state', 'com.blogger', 'blogger-following'),
    ]

  def state_tag(self, state):
    return self._internal_tag('state', state)

  def _source_tag(self, source):
    return self._internal_tag('source', source)

  def _internal_tag(self, type, name):
    return self._user_tag(type, 'com.google', name)

  def _user_tag(self, *args):
    return base.api.Tag(
        stream_id='user/%s/%s' % (self._user_id, '/'.join(args)),
        sort_id=None)

