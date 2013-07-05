import json
import logging
import os.path

import third_party.web as web

import base.api

class SubscriptionList:
  def GET(self):
    subscriptions_path = os.path.join(
        web.config.reader_archive_directory, 'data', 'subscriptions.json')
    with open(subscriptions_path) as subscriptions_file:
      subscriptions_json = json.load(subscriptions_file)
      subscriptions = [
          base.api.Subscription.from_json(s) for s in subscriptions_json]

      response_json = {
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
      }

      return json.dumps(response_json)
