import feedparser
import json
import os.path
import time
import uuid
import xml.sax.saxutils

def crawl_feed_url(feed_url):
    print "  Crawling %s..." % (feed_url)

    stream_id = "feed/%s" % feed_url
    feed = feedparser.parse(feed_url)
    crawl_time_sec = time.time()
    crawl_time_msec = time.time() * 1000

    feed_json = {
        "id": stream_id,
        "title": feed.feed.title,
        "htmlUrl": feed.feed.link,
        "updated": crawl_time_sec,
        "items": [],
    }

    origin_json = {
        "title": feed.feed.title,
        "htmlUrl": feed.feed.link,
        "streamId": stream_id,
    }

    for entry in feed.entries:
        id = str(uuid.uuid4()).replace("-", "")[:16]
        def to_html(d):
            if not d:
                return ""
            if d.type in ["text/html", "application/xhtml+xml"]:
                return d.value
            return xml.sax.saxutils.escape(d.value)

        content = None
        if "content" in entry:
            content = entry.content[0]
        elif "summary_detail" in entry:
            content = entry.summary_detail
        elif "summary_" in entry:
            content = entry.summary

        item_json = {
            "origin": origin_json,
            "published": time.mktime(entry.published_parsed),
            "updated": time.mktime(entry.updated_parsed),
            "author": entry.author_detail.name if "author_detail" in entry else "",
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
                time.mktime(entry.published_parsed) * 1000000),
            "content": {
                "content": to_html(content),
                "direction": "ltr",
            },
            "crawlTimeMsec": json.dumps(int(crawl_time_msec)),
            "annotations": [],
            "likingUsers": [],
        }
        feed_json["items"].append(item_json)

    print "  ...crawled with %d items" % (len(feed.entries))

    return stream_id, feed_json

_CANNED_FEED_URLS = {
    "Reader Team": [
        "http://googlereader.blogspot.com/atom.xml",
        "http://feeds.feedburner.com/PersistentInfo",
        "http://feeds.feedburner.com/xenomachina",
        # "http://www.footbag.org/index2/index.rss", # Not parseable
        # "http://feeds.feedburner.com/furycom", # Not a feed
        "http://massless.org/index.html%3Ffeed=rss2",
        "http://blog.shellen.com/feeds/posts/default",
        "http://www.blogger.com/feeds/6616843/posts/default",
    ],
    # From http://techland.time.com/2013/08/05/the-25-best-bloggers-2013-edition
    "Party Like it's 2013": [
        "http://feeds.feedburner.com/WorldWarIIToday",
        "http://feeds.feedburner.com/marginalrevolution/feed",
        "https://www.101cookbooks.com/feed",
        "https://www.schneier.com/blog/atom.xml",
        "http://surisburnbook.tumblr.com/rss",
        "http://www.askthepilot.com/feed/",
        "http://beerlabelsinmotion.tumblr.com/rss",
    ],
}
_CANNED_DATA_OUTPUT_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../reader/canned-data.js"))

print "Crawling feeds..."

canned_feed_json = {}
canned_folder_json = {}
for folder, feed_urls in _CANNED_FEED_URLS.iteritems():
    stream_ids = []
    for feed_url in feed_urls:
        stream_id, feed_json = crawl_feed_url(feed_url)
        canned_feed_json[stream_id] = feed_json
        stream_ids.append(stream_id)
    canned_folder_json[folder] = stream_ids

with open(_CANNED_DATA_OUTPUT_PATH, "w") as o:
    o.write("const _CANNED_FOLDER_DATA = %s;\n" % json.dumps(
        canned_folder_json, indent=4))
    o.write("const _CANNED_FEED_DATA = %s;\n" % json.dumps(
        canned_feed_json, indent=4))

print "Wrote canned data to: %s" % _CANNED_DATA_OUTPUT_PATH
