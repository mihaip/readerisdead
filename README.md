# readerisdead.com

A collection of tools to help with the [impending Google Reader shutdown](http://googlereader.blogspot.com/2013/03/powering-down-google-reader.html).

## feed-archive

_Saves feed data from Google Reader's feed archive._

Google Reader has (for the most part) a copy of all blog posts and other feed items published since its launch in late 2005 (assuming that at least one Reader user subscribed to the feed). This makes it an invaluable resource for sites [that](http://whytheluckystiff.net/) [disappear](http://www.diveintomark.org/), can serve as a [backup mechanism](http://wordpress.org/support/topic/whole-tables-gone-missing-from-db-hacked#post-1326219) and enables [tools](http://www.streamspigot.com/feed-playback/) to be created.

Presumably access do this data is also going away come July 2013, and thus this tool can be used to get one last shot at archiving feeds you might want to refer to later.

The easiest way to use it is get the [OPML file](http://www.google.com/reader/subscriptions/export) with all your Reader subscriptions, and run it like so:

```
bin/feed-archive \
    --opml_file=~/Downloads/feeds.opml \
    --output_directory=~/Downloads/feed-archive
```

The destination specified by `--output_directory` will be populated with one file per feed, named after its URL. The file contains all items that Reader ever saw in that feed, in the [Atom](http://www.ietf.org/rfc/rfc4287) format. Google Reader normally omits unknown (namespaced) elements in its API output, but in the script makes an attempt to use [high-fidelity mode](https://groups.google.com/forum/?fromgroups#!topic/fougrapi/Rab23a9jhzc) to reconstruct the original data as much as possible.

If you have specific feeds you'd like to save the archive for, instead of `--opml_file` you can also pass in feed URLs as command line arguments:

```
bin/feed-archive \
    --output_directory=~/Downloads/feed-archive \
    http://googlereader.blogspot.com/atom.xml \
    http://persistent.info/atom.xml \
    ...
```

The tool supports additional arguments for controlling how many items are fetched, see `bin/feed-archive --help` for more information.
