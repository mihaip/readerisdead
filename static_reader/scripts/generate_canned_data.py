import feedparser
import json
import os.path
import time
import uuid
import xml.sax.saxutils

_CANNED_FEED_URLS = [
    "http://googlereader.blogspot.com/atom.xml",
]
_CANNED_DATA_OUTPUT_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../reader/canned-data.js"))

print "Crawling %d feeds..." % len(_CANNED_FEED_URLS)

canned_data_json = {}
for feed_url in _CANNED_FEED_URLS:
    stream_id = "feed/%s" % feed_url
    feed = feedparser.parse(feed_url)
    crawl_time_msec = time.time() * 1000

    feed_json = {"items": []}
    canned_data_json[stream_id] = feed_json

    origin_json = {
        "title": feed.feed.title,
        "htmlUrl": feed.feed.link,
        "streamId": stream_id,
    }

    for entry in feed.entries:
        id = str(uuid.uuid4()).replace("-", "")[:16]
        def to_html(d):
            if d.type in ["text/html", "application/xhtml+xml"]:
                return d.value
            return xml.sax.saxutils.escape(d.value)

        item_json = {
            "origin": origin_json,
            "published": time.mktime(entry.published_parsed),
            "updated": time.mktime(entry.updated_parsed),
            "author": entry.author_detail.name,
            "id": "tag:google.com,2005:reader/item/%s" % id,
            "categories": [],
            "title": to_html(entry.title_detail),
            "alternate": [
                {
                    "href": entry.link,
                    "type": "text/html",
                }
            ],
            "timestampUsec": json.dumps(
                time.mktime(entry.updated_parsed) * 1000000),
            "content": {
                "content": to_html(entry.content[0]),
                "direction": "ltr",
            },
            "crawlTimeMsec": json.dumps(int(crawl_time_msec)),
            "annotations": [],
            "likingUsers": [],
        }
        feed_json["items"].append(item_json)

with open(_CANNED_DATA_OUTPUT_PATH, "w") as o:
    o.write("const _CANNED_FEED_DATA = %s;\n" % json.dumps(
        canned_data_json, indent=4))

print "Wrote canned data to: %s" % _CANNED_DATA_OUTPUT_PATH
