import json
import logging
import os.path

import third_party.web as web

import base.api

class ApiHandler:
  def _read_json_data_file(self, data_file_name):
    data_path = os.path.join(
        web.config.reader_archive_directory, 'data', data_file_name)
    with open(data_path) as data_file:
      return json.load(data_file)


class SubscriptionList(ApiHandler):
  def GET(self):
    subscriptions_json = self._read_json_data_file('subscriptions.json')
    subscriptions = [
        base.api.Subscription.from_json(s) for s in subscriptions_json]

    return json.dumps({
      "subscriptions": [
        {
          "id": s.stream_id,
          "title": s.title,
          "categories": [
            {
              "id": si,
              "label": si[si.rfind('/') + 1:],
            } for si in s.insert_stream_ids
          ],
          "sortid": s.sort_id,
          "firstitemmsec": str(int(s.first_item_usec/1000)),
          "htmlUrl": s.html_url,
        } for s in subscriptions
      ]
    })


class TagList(ApiHandler):
  def GET(self):
    tags_json = self._read_json_data_file('tags.json')
    tags = [base.api.Tag.from_json(t) for t in tags_json]

    return json.dumps({
      "tags": [
        {
          "id": t.stream_id,
          "sortid": t.sort_id,
        } for t in tags
      ]
    })
