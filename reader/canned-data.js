const _CANNED_FOLDER_DATA = {
    "Party Like it's 2013": [
        "feed/http://feeds.feedburner.com/WorldWarIIToday", 
        "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
        "feed/https://www.101cookbooks.com/feed", 
        "feed/https://www.schneier.com/blog/atom.xml", 
        "feed/http://surisburnbook.tumblr.com/rss", 
        "feed/http://www.askthepilot.com/feed/", 
        "feed/http://beerlabelsinmotion.tumblr.com/rss"
    ], 
    "Reader Team": [
        "feed/http://googlereader.blogspot.com/atom.xml", 
        "feed/http://feeds.feedburner.com/PersistentInfo", 
        "feed/http://feeds.feedburner.com/xenomachina", 
        "feed/http://massless.org/index.html%3Ffeed=rss2", 
        "feed/http://blog.shellen.com/feeds/posts/default", 
        "feed/http://www.blogger.com/feeds/6616843/posts/default"
    ]
};
const _CANNED_FEED_DATA = {
    "feed/http://feeds.feedburner.com/PersistentInfo": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1530544540.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/55b333301df448fe", 
                "categories": [], 
                "title": "Google Reader: A Time Capsule from 5 Years Ago", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/AOHABjjsOsw/google-reader-time-capsule-from-5-years.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530544260000000.0", 
                "content": {
                    "content": "<p><img alt=\"Google Reader\" height=\"300\" src=\"http://persistent.info/images/static-reader@2x.png\" style=\"float: right; border: solid 1px #ccc; margin-left: 5px;\" width=\"472\" />It's now been 5 years since Google Reader was <a href=\"http://googlereader.blogspot.com/2013/07/a-final-farewell.html\">shut down</a>. As a time capsule of that bygone era, I've resurrected <a href=\"http://readerisdead.com/\">readerisdead.com</a> to host a snapshot of what Reader was like in its final moments \u2014 visit <a href=\"http://readerisdead.com/reader/\">http://readerisdead.com/reader/</a> to see a mostly-working Reader user interface.</p>\n\n<p>Before you get too excited, realize that it is populated with canned data only, and that there is no persistence. On the other hand, the fact that it is an entirely static site means that it is much more likely to keep working indefinitely. I was inspired by the <a href=\"http://archive.org/about/faqs.php#1042\">work</a> that Internet Archive has done with getting old software running in a browser \u2014 Prince of Persia (which I spent hundreds of hours trying to beat) is only <a href=\"https://archive.org/details/msdos_Prince_of_Persia_1990\">a click away</a>. It seemed unfortunate that something of much more recent vintage was not accessible at all.</p>\n\n<p>Right before the shutdown I had saved a copy of Reader's static assets (JavaScript, CSS, images, etc.) and used it to <a href=\"http://blog.persistent.info/2013/07/using-google-readers-reanimated-corpse.html\">build a tool</a> for viewing archived data. However, that required a separate server component and was showing private data. It occurred to me that I could instead achieve much of the same effect directly in the browser: the JavaScript was fetching all data via <code>XMLHttpRequest</code>, so it should just be a matter of intercepting all those requests. I initially considered doing this via <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API\">Service Worker</a>, but I realized that even a simple monkeypatch of the built-in object would work, since I didn't need anything to work offline.</p>\n\n<p>The resulting code is in the<a href=\"https://github.com/mihaip/readerisdead/tree/master/static_reader/src\"> <code>static_reader</code> directory</a> of the <a href=\"https://github.com/mihaip/readerisdead\">readerisdead</a> project. It definitely felt strange mixing this modern JavaScript code (written in TypeScript, with a bit of <code>async</code>/<code>await</code>) with Reader's 2011-vintage script. However, it all worked out, without too many surprises. Coming back to the Reader core structures (tags, streams, preferences, etc.) felt very familiar, but there were also some embarrassing moments (why did we serve timestamps as seconds, milliseconds, and microseconds, <a href=\"https://github.com/mihaip/readerisdead/blob/0e35cf26e88f27e0a07432182757c1ce230f6936/static_reader/scripts/generate_canned_data.py#L49-L67\">all within the same structure</a>?).</p>\n\n<p>As for myself, I still use <a href=\"https://newsblur.com/\">NewsBlur</a> every day, and have <a href=\"https://github.com/samuelclay/newsblur/commits?author=mihaip\">even contributed a few patches to it</a>. The main thing that's changed is that I first read Twitter content in it (using pretty much <a href=\"http://blog.persistent.info/2012/08/how-i-consume-twitter.html\">the same setup</a> I described a while back), with a few other sites that I've <a href=\"https://newsblur.com/faq#intelligence_scroll\">trained</a> as being important also getting read consistently. Everything else I read much more opportunistically, as opposed to my completionist tendencies of years past. This may just be a reflection of the decreased amount of time that I have for reading content online in general.</p>\n\n<p>NewsBlur has a paid tier, which makes me reasonably confident that it'll be around for years to come. It went from 587 paid users <a href=\"https://web.archive.org/web/20130301000000/http://www.newsblur.com:80/\">right before</a> the Reader shutdown announcement to <a href=\"https://web.archive.org/web/20130704092827/http://www.newsblur.com:80/\">8,424 shortly after</a> to <a href=\"https://web.archive.org/web/20180701000000/http://newsblur.com/\">5,345 now</a>. While not the kind of up-and-to-right curve that would make a VC happy, it should hopefully be a sustainable level for the one person (hi <a href=\"https://twitter.com/samuelclay\">Samuel</a>!) to keep working on it, <a href=\"https://blog.pinboard.in/2017/07/eight_years_of_victory/\">Pinboard-style</a>.</p>\n\n<p>Looking at the other feed readers that sprung up (or got a big boost in usage) in the wake of Reader's shutdown, they all still seem to be around: <a href=\"https://feedly.com/\">Feedly</a>,  <a href=\"https://theoldreader.com/\">The Old Reader</a>, <a href=\"https://feedwrangler.net/\">FeedWrangler</a>, <a href=\"https://feedbin.com/\">Feedbin</a>, <a href=\"http://www.inoreader.com/\">Innoreader</a>, <a href=\"http://reederapp.com/\">Reeder</a>, and so on. One of the more notable exceptions is <a href=\"https://techcrunch.com/2018/03/14/alas-digg-reader-is-shutting-down-at-the-end-of-march/\">Digg Reader</a>, which itself was shut down earlier this year. But there are also new projects springing up like <a href=\"https://ranchero.com/evergreen/\">Evergreen</a> and <a href=\"https://elytra.app/\">Elytra</a> and so I'm cautiously optimistic about the feed reading space.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/AOHABjjsOsw\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1530544260.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1517452179.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/a25c795d0f064965", 
                "categories": [], 
                "title": "Efficiently Loading Inlined JSON Data", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/rY8JFQSMukY/efficiently-loading-inlined-json-data.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1517452140000000.0", 
                "content": {
                    "content": "<p>I wrote up a <a href=\"https://quipblog.com/efficiently-loading-inlined-json-data-911960b0ac0a\">post on the Quip blog</a> about more efficiently embedding JSON data in HTML responses. The tl;dr is that moving it out of a JavaScript <code>&lt;script&gt;</code> tag and parsing it separately with <code>JSON.parse</code> can significantly reduce the parse time for large data sizes.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/rY8JFQSMukY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1517452140.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1501113729.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/d91ed4117d624d0b", 
                "categories": [], 
                "title": "Understanding WebKit behavior via lldb", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/J5rGze1uZiY/understanding-webkit-behavior-lldb.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1501106400000000.0", 
                "content": {
                    "content": "<p>I recently ran into some puzzling WebKit scrolling behavior: child iframes mysteriously causing the main window to get scrolled. This was in the context of a Quip feature still under development, but I've recreated <a href=\"http://persistent.info/web-experiments/frame-scrolling/host.html\">a simple test case</a> for it, to make it easier to follow along. There are two buttons on the page, both of which dynamically create and append an <code>&lt;iframe&gt;</code> element to the page. They convey parameters to the frame via the fragment part of the URL; one button has no parameters and the other does, but they otherwise load the same content. The mysterious behavior that I was seeing was that the code path <i>without</i> parameters was causing the main window to scroll down (such that the iframe is at the top of the visible area).</p>\n\n<p>With such a reduced test case it may already be obvious what's going on, but things were much less clear at the time that I encountered this. There were many possible causes since we had made a major frame-related infrastructure change when this started to happen. The only pattern was that it only seemed to affect WebKit-based browsers (i.e. Safari and especially our Mac app). After flailing for a while, I realized what I wanted most of all was a breakpoint. Specifically, if I could break in whatever function implemented page scrolling, then I could see what the trigger was. Some quick <a href=\"https://en.wikipedia.org/wiki/Monkey_patch\">monkey-patching</a> of the <code>scrollTop</code> window property showed that the scrolling was not directly initiated by JavaScript (indeed the bug could be reproduced entirely without JavaScript by inlining the iframe HTML directly). Therefore such a breakpoint needed to be on the native side (in WebKit itself) via <code><a href=\"https://lldb.llvm.org\">lldb</a></code>.</p>\n\n<p>The first task was to attach a debugger to WebKit. It's been a few <a href=\"http://blog.persistent.info/2010/09/new-toy.html\">years</a> since I've <a href=\"https://webkit.org/building-webkit/\">built it</a> from source, and I didn't relish having to wait for the long checkout and build process. Unfortunately, <code>lldb</code> doesn't seem to want to be attached to Safari, presumably because <a href=\"https://en.wikipedia.org/wiki/System_Integrity_Protection\">System Integrity Protection</a> (SIP) disallows debugging of system applications. Fortunately, <a href=\"https://webkit.org/downloads/#nightly\">nightly builds</a> of WebKit are not protected by SIP, and they exhibited the same problem. To figure out which process to attach to (web content runs in a separate process from the main application), <a href=\"https://webkit.org/debugging-webkit/#debugging-webprocess\">Apple's documentation</a> revealed the helpful debug option to show process IDs in page title. Thus I was able to attach to the process rendering the problematic page:</p>\n\n<pre class=\"prettyprint\">\n$ lldb\n(lldb) process attach --pid 15079\nProcess 15079 stopped\n...\n</pre>\n\n<p>The next thing to figure out was what function to break in. Looking at the <a href=\"https://github.com/WebKit/webkit/blob/933086c8c2e6330df4e72e3b77ddc3c322e45f65/Source/WebCore/dom/Element.cpp#L644-L688\">implementations</a> of scrolling DOM APIs it looked like they all ended up calling <code>WebCore::RenderObject::scrollRectToVisible</code>, so that seemed like a promising choke point.</p>\n\n<pre class=\"prettyprint\">\n(lldb) breakpoint set -M scrollRectToVisible\nBreakpoint 1: 2 locations.\n</pre>\n\n<p>(the output says that two breakpoints are set, since it also matches <code>WebCore::RenderLayer::scrollRectToVisible</code>, but that turned out to be a <a href=\"https://www.youtube.com/watch?v=wCsO56kWwTc\">happy accident</a>)</p>\n\n<p>After using <code>continue</code> command to resume execution and reproducing the problem, I was very happy to see that my breakpoint was immediately triggered. I could then get the stack trace that I was after:</p>\n\n<pre class=\"prettyprint\">\n(lldb) bt\n* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.2\n  * frame #0: 0x000000010753eda0 WebCore`WebCore::RenderObject::scrollRectToVisible(WebCore::SelectionRevealMode, WebCore::LayoutRect const&, bool, WebCore::ScrollAlignment const&, WebCore::ScrollAlignment const&)\n    frame #1: 0x0000000106b5da64 WebCore`WebCore::FrameView::scrollToAnchor() + 292\n    frame #2: 0x0000000106b55832 WebCore`WebCore::FrameView::performPostLayoutTasks() + 386\n    frame #3: 0x0000000106b59959 WebCore`WebCore::FrameView::layout(bool) + 4009\n    frame #4: 0x0000000106b5d878 WebCore`WebCore::FrameView::scrollToAnchor(WTF::String const&) + 360\n    frame #5: 0x0000000106b5d659 WebCore`WebCore::FrameView::scrollToFragment(WebCore::URL const&) + 57\n    frame #6: 0x0000000106b39c80 WebCore`WebCore::FrameLoader::scrollToFragmentWithParentBoundary(WebCore::URL const&, bool) + 176\n    frame #7: 0x0000000106b389c8 WebCore`WebCore::FrameLoader::finishedParsing() + 120\n    frame #8: 0x00000001069d3e0a WebCore`WebCore::Document::finishedParsing() + 266\n    frame #9: 0x0000000106bfb322 WebCore`WebCore::HTMLDocumentParser::prepareToStopParsing() + 162\n    frame #10: 0x0000000106bfc1b3 WebCore`WebCore::HTMLDocumentParser::finish() + 211\n    ...\n</pre>\n\n<p>It looked like WebKit had decided to scroll to an anchor, which was surprising, since I wasn't expecting any named anchors in the document. After reading through the <a href=\"https://github.com/WebKit/webkit/blob/067125261e67ee892492df7b15fab0b703c4b233/Source/WebCore/page/FrameView.cpp#L2439-L2441\">source of <code>WebCore::FrameView::scrollToAnchor</code></a> I finally understood what was happening:</p>\n\n<pre class=\"prettyprint\">\n// Implement the rule that \"\" and \"top\" both mean top of page as in other browsers.\nif (!anchorElement && !(name.isEmpty() || equalLettersIgnoringASCIICase(name, \"top\")))\n    return false;\n</pre>\n\n<p>As a side effect of the infrastructure change, the frame no longer had any parameters in the fragment part of the URL, but the code that was generating the URLs would always append a <code>#</code>. This empty fragment identifier would thus be marked as requesting a scroll to the top of the document. Once execution continued, we would end up in the previously-mentioned <code>WebCore::RenderLayer::scrollRectToVisible</code> method, which <a href=\"https://github.com/WebKit/webkit/blob/9068ea54b26b723d9d8eb3f1e8800dbe42027d4d/Source/WebCore/rendering/RenderLayer.cpp#L2558-L2593\">recurses</a> into the parent frame, thus scrolling the whole document.</p>\n\n<pre class=\"prettyprint\">\n(lldb) bt\n* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1\n  * frame #0: 0x00000001074e0f80 WebCore`WebCore::RenderLayer::scrollRectToVisible(WebCore::SelectionRevealMode, WebCore::LayoutRect const&, bool, WebCore::ScrollAlignment const&, WebCore::ScrollAlignment const&)\n    frame #1: 0x00000001074e143d WebCore`WebCore::RenderLayer::scrollRectToVisible(WebCore::SelectionRevealMode, WebCore::LayoutRect const&, bool, WebCore::ScrollAlignment const&, WebCore::ScrollAlignment const&) + 1213\n    frame #2: 0x00000001074e143d WebCore`WebCore::RenderLayer::scrollRectToVisible(WebCore::SelectionRevealMode, WebCore::LayoutRect const&, bool, WebCore::ScrollAlignment const&, WebCore::ScrollAlignment const&) + 1213\n    frame #3: 0x000000010753ee55 WebCore`WebCore::RenderObject::scrollRectToVisible(WebCore::SelectionRevealMode, WebCore::LayoutRect const&, bool, WebCore::ScrollAlignment const&, WebCore::ScrollAlignment const&) + 181\n    frame #4: 0x0000000106b5da64 WebCore`WebCore::FrameView::scrollToAnchor() + 292\n    frame #5: 0x0000000106b55832 WebCore`WebCore::FrameView::performPostLayoutTasks()\n    ...\n</pre>\n\n<p>The fix was then trivial (remove the <code>#</code> if no parameters are needed), but it would have taken me much longer to find if I had treated the browser as a black box. As a bonus, <a href=\"https://github.com/WebKit/webkit/blob/ec9f01f3989585eb493f74c154e621c70c4314cf/Source/WebCore/loader/FrameLoader.cpp#L2925\">reading</a> through the WebKit source also introduced me to the <a href=\"https://www.contextis.com/resources/blog/framesniffing-against-sharepoint-and-linkedin/\">\u201cframesniffing\u201d attack</a>. The guards against this attack explained why the Mac app was most affected. There the main frame is loaded using a <code>file:///</code> URL and based on WebKit's heuristics it can access any other origin, allowing the anchor scroll request to cross frame/origin boundary.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/J5rGze1uZiY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1501106400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1484262018.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/b06cb4e59a624d8f", 
                "categories": [], 
                "title": "Disabling the click delay in UIWebView", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/9MTE08ua15Y/disabling-click-delay-in-uiwebview.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1484262000000000.0", 
                "content": {
                    "content": "<p>Historically, one of the differences that made hybrid mobile apps feel a bit \u201coff\u201d was that there would be lag when handling taps on UI elements with a straightforward <code>click</code> event handler. Libraries such as <a href=\"https://github.com/ftlabs/fastclick\">Fastclick</a> were created to mitigate this by using raw touch events to immediately trigger the event handlers. Though they worked for basic uses, they added JavaScript execution overhead for touch events, which leads to <a href=\"https://plus.google.com/+RickByers/posts/cmzrtyBYPQc\">jank</a>.</p>\n\n<p>More recently, both <a href=\"https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away\">Chrome on Android</a> and <a href=\"https://webkit.org/blog/5610/more-responsive-tapping-on-ios/\">Safari on iOS</a> have removed this limitation for pages that are not scalable. That was the fundamental reason why there was a delay for single taps \u2014 there was no way to know if the user was trying to do a double-tap gesture or a single tap, so the browser would have to wait after the first tap to see if another came.</p>\n\n<p>I assumed that this would apply to web views embedded within apps, but I was disappointed to see that Quip's behavior did not improve on iOS 9.3 or 10.0 (we have our own Fastclick-like wrapper for most event handlers, but it didn't apply to checkboxes, and those continued to be laggy). Some more research turned up that the improvement <a href=\"https://github.com/ftlabs/fastclick/issues/450#issuecomment-223121717\">did not apply to <code>UIWebView</code></a> (the older mechanism for embedding web views in iOS apps \u2014 <code>WKWebView</code> is more modern but still has some limitations and thus Quip has not migrated to it).</p>\n\n<p>The <a href=\"https://webkit.org/blog/5610/more-responsive-tapping-on-ios/\">WebKit blog post</a> about the improvements included some links to the <a href=\"https://bugs.webkit.org/show_bug.cgi?id=149968\">associated</a> <a href=\"https://bugs.webkit.org/show_bug.cgi?id=150604\">tracking</a> <a href=\"https://bugs.webkit.org/show_bug.cgi?id=149854\">bugs</a> (as previously mentioned, <code>WKWebView</code> <a href=\"http://blog.persistent.info/2014/07/the-modern-webkit-api-is-open-source.html\">is entirely open source</a>, which continues to be nice). <a href=\"https://trac.webkit.org/changeset/191072/trunk/Source/WebKit2/UIProcess/ios/WKContentViewInteraction.mm\">Digging</a> into one of the associated commits, it looked like this was a matter of tweaking the interaction between multiple <code>UIGestureRecognizer</code> instances. Normally the one that handles single taps must wait for the one that handles double taps to fail before triggering its action. Since the double tap one takes 350 milliseconds to determine if a tap is followed by another, it needs that long to fail for single taps. The change that Apple made was to disable this second gesture recognizer for non-scalable pages.</p>\n\n<p><code>UIWebView</code> is not open source, but I reasoned that its implementation must be similar. To verify this, I added a small code snippet to dump all gesture recognizers for its view hierarchy (triggered with <code>[self dumpGestureRecognizers:uiWebView level:0]</code>:</p>\n\n<pre class=\"prettyprint\">-(void)dumpGestureRecognizers:(UIView *)view level:(int)level {\n    NSMutableString *prefix = [NSMutableString new];\n    for (int i = 0; i &lt; level; i++) {\n        [prefix appendString:@\"  \"];\n    }\n    NSLog(@\"%@ view: %@\", prefix, view);\n    if (view.gestureRecognizers.count) {\n        NSLog(@\"%@ gestureRecognizers\", prefix);\n        for (UIGestureRecognizer *gestureRecognizer in view.gestureRecognizers) {\n            NSLog(@\"%@   %@\", prefix, gestureRecognizer);\n        }\n    }\n    for (UIView *subview in view.subviews) {\n        [self dumpGestureRecognizers:subview level:level + 1];\n    }\n}</pre>\n\n<p>This showed that the <code>UIWebView</code> contains a <code>UIScrollView</code> which in turn contains a <code>UIWebBrowserView</code>. That view has a few gesture recognizers, the most interesting being a <code>UITapGestureRecognizer</code> that requires a single touch and tap and has as the action a <code>_singleTapRecognized</code> selector. Sure enough, it requires the failure of another gesture recognizer that accepts two taps (it has the action set to <code>_doubleTapRecognized</code>, which further makes its purpose clear).</p>\n\n<pre class=\"prettyprint\">&lt;UITapGestureRecognizer: 0x6180001a72a0; \n\u00a0\u00a0 \u00a0state = Possible; \n\u00a0\u00a0 \u00a0view = &lt;UIWebBrowserView 0x7f844a00aa00&gt;; \n\u00a0\u00a0 \u00a0target= &lt;(action=_singleTapRecognized:, target=&lt;UIWebBrowserView 0x7f844a00aa00&gt;)&gt;; \n\u00a0\u00a0 \u00a0must-fail = {\n\u00a0\u00a0 \u00a0 \u00a0 \u00a0&lt;UITapGestureRecognizer: 0x6180001a7d20; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0state = Possible; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0view = &lt;UIWebBrowserView 0x7f844a00aa00&gt;; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0target= &lt;(action=_doubleTapRecognized:, target=&lt;UIWebBrowserView 0x7f844a00aa00&gt;)&gt;; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0numberOfTapsRequired = 2&gt;,\n\u00a0\u00a0 \u00a0 \u00a0 \u00a0&lt;UITapGestureRecognizer: 0x6180001a8180; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0state = Possible; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0view = &lt;UIWebBrowserView 0x7f844a00aa00&gt;; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0target= &lt;(action=_twoFingerDoubleTapRecognized:, target=&lt;UIWebBrowserView 0x7f844a00aa00&gt;)&gt;; \n\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0numberOfTapsRequired = 2; numberOfTouchesRequired = 2&gt;\n\u00a0\u00a0 \u00a0}&gt;</pre>\n\n<p>As an experiment, I then added a snippet to disable this double-tap recognizer:</p>\n\n<pre class=\"prettyprint\">for (UIView* view in webView.scrollView.subviews) {\n    if ([view.class.description equalsString:@\"UIWebBrowserView\"]) {\n        for (UIGestureRecognizer *gestureRecognizer in view.gestureRecognizers) {\n            if ([gestureRecognizer isKindOfClass:UITapGestureRecognizer.class]) {\n                UITapGestureRecognizer *tapRecognizer = (UITapGestureRecognizer *) gestureRecognizer;\n                if (tapRecognizer.numberOfTapsRequired == 2 &amp;&amp; tapRecognizer.numberOfTouchesRequired == 1) {\n                    tapRecognizer.enabled = NO;\n                    break;\n                }\n            }\n        }\n        break;\n    }\n}</pre>\n\n<p>Once I did that, <code>click</code> events were immediately dispatched, with minimal delay. I've created a <a href=\"https://github.com/mihaip/web-experiments/tree/master/uiwebview-click-delay\">simple testbed</a> that shows the difference between a regular <code>UIWebView</code>, a <code>WKWebView</code> and a \u201chacked\u201d <code>UIWebView</code> with the gesture recognizer. Though the <code>WKWebView</code> is still a couple of milliseconds faster, things are much better.</p>\n\n<p style=\"text-align: center;\"><img alt=\"Touch delay in various web views\" height=\"408\" src=\"http://persistent.info/images/uiwebview-click-delay.gif\" style=\"border: solid 1px #999; border-right-width: 0;\" width=\"375\" /></p>\n\n<p>Note that <code>UIWebBrowserView</code> is a private class, so having a reference to it may lead to App Store rejection. You may want to look for alternative ways to detect the gesture recognizer. Quip has been running with this hack for a couple of months with no ill effects. My only regret that is that I didn't think of this sooner, we (and other hybrid apps) could have had lag-free clicks for years.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/9MTE08ua15Y\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1484262000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1480467609.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/5f80973c893d4575", 
                "categories": [], 
                "title": "Perils of Measuring Long Intervals with Performance.now()", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/YQgzN8H9zeI/performance-now-sleep.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1480467600000000.0", 
                "content": {
                    "content": "<p>I recently ran into an interesting quirk when using <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Performance/now\"><code>Performance.now()</code></a> to measure long-ish intervals in <a href=\"https://quip.com/\">Quip</a>'s web app. Since it does not seem to be broadly known, I thought I would document it.</p>\n\n<p>To mitigate the possibility of self-induced DDoS attacks, I recently added duplicate request detection to Quip's model layer data loading mechanism. Since we pretty aggressively cache loaded data, repeated requests for the same objects would indicate that something is going wrong. I therefore added a client-side check for the exact same request being issued within 60 seconds of the first occurrence. If it triggered, it would send a diagnostic report to our error tracking system.</p>\n\n<p>This turned up some legitimate bugs (e.g. two independent code paths racing to trigger loads) as well as some false positives (e.g. retries of requests that failed should be allowed). After pushing the fixes and tweaks to the detection system, I was left with a few puzzling reports. The report claimed that a duplicate request had occurred within a very short interval, but based on other events it looked like the requests had been several minutes (or even hours) apart.</p>\n\n<p>When I looked at the reports more carefully, I saw that the long time interval was always bracketed by a disconnect and reconnect of the Web Socket that we use for sending real-time updates. I hypothesized that this may have been a laptop whose lid was closed and later re-opened. Taking a look at how I measured elapsed time between requests, I saw that this was computing the delta between to high-resolution timestamps returned by  <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Performance/now\"><code>Performance.now()</code></a>. I was then able to reproduce this scenario locally by comparing wall-clock elapsed time with high resolution elapsed time while my computer was asleep (to see it in action, see<a href=\"http://persistent.info/web-experiments/performance-now-sleep/\"> this simple test bed</a>). I initially did this in Chrome, but Safari and Firefox seem to have the same behavior.</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Performance.now() behavior across sleep intervals\" height=\"80\" src=\"http://persistent.info/images/performance-now-sleep.gif\" style=\"border: solid 1px #ccc; padding: 5px;\" width=\"323\" />\n</p>\n\n<p>The fix was switch to using <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now\"><code>Date.now()</code></a>, which otherwise worked equally well for this use-case. We didn't actually need the high-resolution guarantees of <code>Performance.now()</code> \u2014  the reason why it was used in the first place is because the code already had a timestamp with it in place that was used for measuring load request-to-response time. The same code runs in on our desktop app (where load times can be sub-millisecond) and so the high resolution was needed for that use case.</p>\n\n<p>I am definitely not the first to run into this; I have found a few off-hand mentions of this behavior. For example, see <a href=\"http://stackoverflow.com/questions/29700256/is-performance-now-in-web-workers-reliable#comment54792192_29717633\">this Stack Overflow comment</a> and <a href=\"https://groups.google.com/d/msg/elm-dev/RU2ZZqDFOwU/AWx9YW7pCwAJ\">this post on elm-dev</a>. Curiously, neither the currently published version of the <a href=\"https://www.w3.org/TR/hr-time/\">time specification</a> nor <a href=\"https://w3c.github.io/hr-time/\">the latest draft</a> seem to indicate that this may be a possibility. Per the spec, <code>Peformance.now()</code> is supposed to return the difference between the time of the call and the <a href=\"https://w3c.github.io/hr-time/#time-origin\">time origin</a>, and presumably the origin is fixed.</p>\n\n<p>As to the specifics of why this happens, I spelunked through Chrome's codebase a bit. The <a href=\"https://chromium.googlesource.com/chromium/src/+/aee80e88c92958c951dc21309f31a64724dbb856/third_party/WebKit/Source/core/timing/PerformanceBase.cpp#527\"><code>Performance.now</code> implementation</a> calls <a href=\"https://chromium.googlesource.com/chromium/src/+/aee80e88c92958c951dc21309f31a64724dbb856/third_party/WebKit/Source/wtf/CurrentTime.cpp#48\"><code>monotonicallyIncreasingTime</code></a> which uses <a href=\"https://chromium.googlesource.com/chromium/src/+/aee80e88c92958c951dc21309f31a64724dbb856/base/time/time_posix.cc#356\"><code>base::TimeTicks::Now</code></a> which uses the <a href=\"http://pubs.opengroup.org/onlinepubs/009695399/functions/clock_getres.html\"><code>CLOCK_MONOTONIC</code> POSIX clock</a>. I wasn't able to find any specific gotchas about macOS's implementation of that clock, but Apple does have a <a href=\"https://developer.apple.com/library/content/technotes/tn2169/_index.html#//apple_ref/doc/uid/DTS40013172-CH1-TNTAG10000\">tech note</a> that says that \u201ctimers are not accurate across a sleep and wake cycle of the hardware\u201d so this is not a surprise at that low level. Within the Chrome project it is also <a href=\"https://bugs.chromium.org/p/chromium/issues/detail?id=172754#c3\">known</a> that <code>base::TimeTicks</code> is unreliable across sleep intervals. Though it's common to think of the browser environment as being very high level and abstracted away from the hardware and operating system, small nuances such as this one do sometimes leak through.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/YQgzN8H9zeI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1480467600.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1455754503.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/dc2bb0e1404f4a0d", 
                "categories": [], 
                "title": "Avoiding Incremental Rendering in Hybrid Desktop Apps", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/8n4B6OzURVs/avoiding-incremental-rendering-in.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1455754500000000.0", 
                "content": {
                    "content": "<p>I previously described how adding <a href=\"http://blog.persistent.info/2016/01/multiple-windows-in-hybrid-react.html\">native popovers and modal dialogs</a> to <a href=\"https://quip.com/\">Quip</a>\u2019s hybrid <a href=\"https://quip.com/blog/desktop\">desktop apps</a> helped them to blend in and avoid the \u201cuncanny valley\u201d of web-based apps that don\u2019t quite feel right. Another area that we focused on was the experience of creating a new window, especially during application startup. This is the first impression for a user, and thus informs how they will perceive the rest of the app.</p>\n\n<p>In theory launching should be fast \u2014 not much happens when a new window is created:</p>\n<ol>\n<li>An <code>NSWindow</code> is instantiated.</li>\n<li>A <code>WebView</code> is added to the window.</li>\n<li>The web view is directed to load the HTML file from the app\u2019s bundle. That file serves as the \u201cshell\u201d for the HTML, JavaScript and CSS that are used for the UI.</li>\n<li>Once a signal from the JS that it has been initialized is received, the native side instructs it to render the desktop (or other initial object, when restoring the previous application state).</li>\n</ol>\n\n<p>Here\u2019s a short screen recording showing the application launch sequence for a small account:</p>\n\n<p style=\"text-align: center;\"><video controls=\"controls\" poster=\"http://persistent.info/images/quip-new-window/new-window-poster.png\" preload=\"metadata\" src=\"http://persistent.info/images/quip-new-window/new-window-janky.mp4\" width=\"1003\"></video></p>\n\n<p>End-to-end it doesn\u2019t feel too slow, but there\u2019s a lot of flashing and incremental rendering of the UI, which definitely feels \u201cwebby\u201d as opposed to native. To make it a bit easier to understand what is going on, here\u2019s a version that has been slowed down\u00b9 by a factor of 3:</p>\n\n<p style=\"text-align: center;\"><video controls=\"controls\" poster=\"http://persistent.info/images/quip-new-window/new-window-poster.png\" preload=\"metadata\" src=\"http://persistent.info/images/quip-new-window/new-window-janky-slow.mp4\" width=\"1003\"></video></p>\n\n<p>The visual progression can be broken down into 4 stages:</p>\n\n<ol>\n<li>Blank window appears</li>\n<li>Basic app \u201cchrome\u201d appears (without any user data)</li>\n<li>Data and images begin to appear</li>\n<li>Rendering is complete</li>\n</ol>\n\n<p>In a native app, none of the intermediate stages are visible, thus they have much of a \u201csnappy\u201d feeling when creating a new window. Incremental rendering is normally desirable on the web if waiting on resources that require a network round-trip. In this case the overall time is short enough that intermediate states which only appear for a few frames (such as the one shown below) are distracting rather than giving a sense of progress.</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Intermediate state\" height=\"532\" src=\"http://persistent.info/images/quip-new-window/intermediate-state.jpeg\" width=\"964\" />\n</p>\n\n<p>To avoid showing an entirely blank window (stage 1), instead of showing the window immediately, we modified the new window sequence to keep the window hidden until the  <code>ReactDOM.render()</code> call for the application\u2019s root view finished. This does mean   that there is a slightly longer delay between the app being launched and the window appearing. However, since other things are happening (dock icon bouncing, menu bar changing), and the delay is on the order one to two hundred milliseconds, it's not noticeable.</p>\n\n<p>The initial rendered view was very empty since it didn\u2019t have any of the data for the user\u2019s desktop or inbox. On the web we \u201cseed\u201d this data in the initial HTML response to avoid the extra network round-trip to fetch it. We had assumed that loading data from the local database is so fast that such an optimization was unnecessary, and instead it could be loaded on demand like everything else. It was indeed quite fast, but it still took tens of milliseconds, which led to frames that appeared incomplete. Once we added the same \u201cseeding\u201d capability to the desktop app (the request to render the initial object also included all the data necessary for the view), almost everything appeared at once, skipping over most of stage 3.</p>\n\n<p>The reason why I said <i>almost</i> everything appeared at once is because some images were still taking a few extra frames to show up. The odd part was that these images were local static assets, and thus should have been readily available (e.g. the folder and sidebar icons in the screenshot above). Further, we inline the images as <code>data:</code> URIs into our main stylesheet (an optimization originally meant for the website, but carried over to the desktop app since it didn\u2019t seem like it would hurt). Thus loading of the images should not involve any more I/O once the stylesheet was loaded and parsed. Evidently that was not the case \u2014 even when using <code>data:</code> URIs there was an asynchronous \u201cfetch\u201d and decompress step for rendering the image.</p>\n\n<p>When experimenting with creating additional windows, we noticed that in those cases the images do appear instantaneously. We thus concluded that they must still end up in WebKit\u2019s <a href=\"https://trac.webkit.org/wiki/MemoryCache\">memory cache</a>. We wanted to simulate this behavior for even the first window, and in the absence of an explicit cache hinting API, we added a \u201ccache warmer\u201d to invoke early on during application startup. It creates a <code>WebView</code> and loads a simple static HTML file that references our stylesheet and has dummy markup corresponding to our most common views. The view doesn\u2019t need to be added to a window or otherwise shown, and it gets disposed of 10 seconds after startup.</p>\n\n<p>Once all those changes are implemented <a href=\"http://persistent.info/images/quip-new-window/new-window.mp4\">no incremental rendering is visible</a> (<a href=\"http://persistent.info/images/quip-new-window/new-window-slow.mp4\">slowed down version</a>). None of modifications that were necessary were particularly complex, but they do show the extra attention to detail that is necessary to get a hybrid web app to feel more native.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>During development I often end up taking screen recordings and then stepping through them frame-by-frame to get a better understanding of the rendering sequence. I usually use <a href=\"http://www.telestream.net/screenflow/overview.htm\">ScreenFlow</a>, but QuickTime Player can <a href=\"https://support.apple.com/en-us/HT201066#screen\">do this too</a>.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/8n4B6OzURVs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1455754500.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1453853281.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/60ac36ae3ff54940", 
                "categories": [], 
                "title": "Grafting Local Static Resources onto Production", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/qYbr7fEn9n4/static-resource-grafting.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1453853280000000.0", 
                "content": {
                    "content": "<b>tl;dr:</b> Using the <a href=\"https://developer.chrome.com/extensions/webRequest\"><code>webRequest</code></a> Chrome extension API it is possible to \u201cgraft\u201d development/localhost JavaScript and CSS assets on a production web service, thus allowing rapid debugging iteration against real production data sets. Demo <a href=\"http://persistent.info/web-experiments/static-resource-grafting/site/\">site</a> and <a href=\"https://github.com/mihaip/web-experiments/tree/master/static-resource-grafting/extension\">extension</a>.</p>\n\n<p>During the summer of 2015 I was investigating an annoying bug in Quip where our message list would not stay \u201cbottom-anchored\u201d in some circumstances\u00b9. Unfortunately I was only able to trigger it on our live production site, not on my local development setup. Though Chrome\u2019s developer tools are quite nice, I did not have the necessary ability to rapidly iterate on the code in order to further investigate the bug. I had in the past pushed alternate builds our staging site to debug such production-only issues, but that would still take several minutes to see the results of every change.</p>\n\n<p>My next thought was that I could instead try to reproduce the bug in our soon-to-be-released desktop app. The app can use local (minimally processed) JavaScript while running against production data. Unfortunately the bug did not manifest itself in our Mac app. I chalked this up to rendering engine differences (the bug was only visible in Chrome, and our Mac app uses a  WebKit-backed <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Classes/WebView_Class/\"><code>WebView</code></a>). I then tried our Windows app (which uses the same rendering engine as Chrome via the <a href=\"https://bitbucket.org/chromiumembedded/cef\">Chromium Embedded Framework</a>), but it didn\u2019t happen there it either. I was forced to conclude that the bug was due to some specific behavior in our website when running against production data, not something in the shared React-based UI.</p>\n\n<p>As I was wishing for a way to use JavaScript and CSS from my laptop with production data (for security reasons my local Quip server cannot connect to the production databases) I remembered that Gmail used to have exactly such a mode. As I recall it, you could start a local <del>Caribou</del>Gmail server, go to your (work) Gmail instance and append a special URL parameter that would cause the JavaScript from the local server to be requested instead\u00b2. With most of Gmail\u2019s behavior being driven by the client-side JavaScript (with the server serving as an API endpoint) this meant that it was possible to try out pretty complex changes on your own data without having to \u201cdeploy\u201d them.</p>\n\n<p>I considered adding this mode to Quip, but that seemed scary, security-wise, since it was effectively intentional <a href=\"https://en.wikipedia.org/wiki/Cross-site_scripting\">cross-site scripting</a>. It also would have meant waiting for the next day\u2019s production push (and I wanted to solve the problem as soon as possible). However, it then occurred to me that I didn\u2019t actually need to have the server change it behavior; I could instead write a Chrome extension which (via the <a href=\"https://developer.chrome.com/extensions/webRequest\"><code>webRequest</code></a> API) would \u201cgraft\u201d the local JavaScript and CSS files from my local server onto the production site when loaded in my browser.</p>\n\n<p>I had hoped that the extension could modify the HTML that is initially served and replace the JavaScript and CSS URLs, but it turns out the <code>webRequest</code> API <a href=\"https://code.google.com/p/chromium/issues/detail?id=104058\">cannot modify the HTTP response body</a>. What did work was to intercept the JavaScript and CSS requests before they were sent to our CDN and <a href=\"https://developer.chrome.com/extensions/webRequest#property-BlockingResponse-redirectUrl\">redirect</a> them to paths on my local server. Chrome would initially flag this as being insecure (since we use HTTPS in production, and the redirected URLs were over plain HTTP), but it is possible to convince it to <a href=\"http://superuser.com/questions/487748/how-to-allow-chrome-browser-to-load-insecure-content\">load the resources anyway</a>.</p>\n\n<p>Once I had the necessary tooling and ability to iterate quickly, fixing the bug that prompted all this was pretty straightforward (it was caused by the \u201cmount point\u201d system that we used to incrementally migrate our website to React, but that\u2019s a whole other blog post). Since then it\u2019s come in handy in debugging other hard-to-recreate problems, and for measuring JavaScript performance against more realistic data. It did briefly break when we added a <a href=\"https://en.wikipedia.org/wiki/Content_Security_Policy\">Content Security Policy</a> (CSP) \u2014 since we were loading scripts from an unknown domain the browser was correctly blocking the \u201cgrafted\u201d response. However, the <code>webRequest</code> API also allows the extension to edit the response headers, thus it was straightforward to have it <a href=\"https://github.com/mihaip/web-experiments/blob/4bb7fe0b5c3b8af735d93e38795584463d45e95d/static-resource-grafting/extension/background.js#L18-L38\">intercept</a> the main HTML page request and strip the CSP header.</p>\n\n<p>The extension that I wrote to accomplish this is very barebones and hardcodes a bunch of Quip-specific logic and URLs, thus is not easily shared. However, I have recreated a simplified version of it and put it in my <a href=\"https://github.com/mihaip/web-experiments/tree/master/static-resource-grafting/extension\">web experiments repository</a>. There is also a <a href=\"http://persistent.info/web-experiments/static-resource-grafting/site/\">demo site</a> that it can be applied to.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>Yet more developer time spent faking something that should be a built-in capability, further confirming <a href=\"https://twitter.com/btaylor/status/611572699412873216\">Bret\u2019s observation</a>.</li>\n<li>For a bit more history: back in 2005 I was using <a href=\"http://www.greasespot.net/\">Greasemonkey</a> to <a href=\"http://blog.persistent.info/2005/03/adding-persistent-searches-to-gmail.html\">hack</a> <a href=\"http://blog.persistent.info/2005/08/gmail-conversation-preview-bubbles.html\">Gmail</a> <a href=\"http://blog.persistent.info/2005/12/greasemonkey-christmas.html\">left</a> <a href=\"http://blog.persistent.info/2006/10/google-reader-redux.html\">and</a> <a href=\"http://blog.persistent.info/2007/11/macros-for-new-version-of-gmail.html\">right</a>. When I talked to the Gmail team about this approach (versus working in my 20% time to add those features to Gmail directly) I rationalized it as \u201cGreasemonkey lets me do UI experiments on the real email in my account with minimal lag, instead of needing to wait for code reviews and production pushes.\u201d Darick Tong (a Gmail engineer) took this feedback to heart and added the custom JavaScript mode. Unfortunately by that point I had mostly moved on from Gmail hacking (Reader was keeping me plenty busy, JavaScript-wise), so I never got to actually use it.</li>\n</ol>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/qYbr7fEn9n4\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1453853280.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1452124820.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/4bf070c3d9ae4669", 
                "categories": [], 
                "title": "Multiple Windows in Hybrid React Desktop Apps", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/ShcyhMDg3OI/multiple-windows-in-hybrid-react.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1452124800000000.0", 
                "content": {
                    "content": "<p><a href=\"https://quip.com/\">Quip</a>\u2019s <a href=\"https://quip.com/blog/desktop\">desktop apps</a> are hybrid apps: both the Windows and Mac apps are composed of a web React-based UI talking to our<a href=\"https://medium.com/@btaylor/react-with-c-building-the-quip-mac-and-windows-apps-c63155c1531b\"> C++ Syncer library</a>, along with some platform-specific glue code. While this allows us to support two additional platforms with <a href=\"http://www.theeffectiveengineer.com/blog/how-to-successfully-build-great-products-with-small-teams\">a small team</a> we knew that architecting the apps in this way would run the risk of not \u201cfitting in\u201d with other Mac OS X or Windows applications.</p>\n\n<p>To see if we could mitigate this problem, we started to enumerate what makes an app feel like \u201cjust a web view.\u201d There were obvious things like responsiveness, working offline, and using platform conventions (e.g. a menu bar on the Mac). After thinking about it more, we also observed that native apps often have multiple windows, whereas web apps are bound to a single browser tab. This wasn\u2019t just a matter of multiple windows showing Quip documents (something that did not seem too difficult to accomplish), but also all of the child windows that a native app would have (especially <a href=\"https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsView.html#//apple_ref/doc/uid/20000957-CH52-SW2\">popovers</a> and <a href=\"https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/WindowDialogs.html#//apple_ref/doc/uid/20000957-CH43-SW2\">sheets</a> on Mac OS X). </p>\n\n<p>\n<a href=\"http://persistent.info/images/safari-popover.png\"><img alt=\"Quip popover on the web site\" height=\"185\" src=\"http://persistent.info/images/safari-popover.png\" style=\"float: left; padding: 0 0 5px 5px; border: 0;\" width=\"269\" /></a> We did have equivalents in our React \u201cparts\u201d library that we used in our website, but visually they didn\u2019t match the native versions, and they felt very much bound by the enclosing rectangle of the web view. This was especially apparent with popovers that were triggered near the edge of the web view; one would expect them to \u201cspill out\u201d of the window but instead they would awkwardly position themselves \u201cinward\u201d to avoid getting clipped by the edges. This triggered an \u201c<a href=\"http://blog.codinghorror.com/avoiding-the-uncanny-valley-of-user-interface/\">uncanny valley</a>\u201d effect where the illusion of a native app would be broken.</p>\n\n<p>All of this was very much on my mind about a year ago as I was building up the foundations of our desktop apps. Though seemingly just a \u201cpolish\u201d kind of  detail, it seemed like supporting child windows would require some design trade-offs that would be easier to make early on, rather than retrofit later. My first thought was that we should define all of the popover and dialog content in a very declarative manner, thus allowing to later change how they were rendered. For modal dialogs this worked pretty well, since their content tended to be pretty simple. </p>\n\n<p>For example, a deletion confirmation dialog would be represented as:</p>\n\n<pre class=\"prettyprint\">\nparts.spec.newPanel()\n    .addSection(parts.spec.newTitleSection(_(\"Delete Chat Room\")))\n    .addSection(parts.spec.newSection()\n        .addMessage(_(\"If you delete this chat room, you will\u2026\")))\n    .addSection(parts.spec.newSection()\n        .addDefaultButton(_(\"Hide\"), function() {\n            ...\n        })\n        .addButton(_(\"Delete for all %(count)s people\", {\"count\": count}), function() {\n            ...\n        })\n        .addCancelButton(_(\"Cancel\"), function() {}))\n</pre>\n\n<p>It was then a pretty straightforward mapping to generate an <code><a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/ApplicationKit/Classes/NSAlert_Class/\">NSAlert</a></code> instance that would fit right in on a Mac app (we support multiple modal dialog \u201crunners\u201d: one that creates a React version and another that passes it off to the platform native code).</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Native alert dialog\" height=\"134\" src=\"http://persistent.info/images/native-alert.png\" width=\"517\" />\n</p>\n\n<p>However, once we began to implement more and more popovers, the sheer variety of the kinds of controls used within them became apparent.</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Popovers used in Quip\" height=\"298\" src=\"http://persistent.info/images/quip-popovers.png\" width=\"841\" />\n</p>\n\n<p>In addition to all these widgets popovers also often had custom validation logic (e.g. the \u201cCreate\u201d button in the \u201cNew Folder\u201d popovers is grayed out while the title is empty) and dynamic updates (rows representing users show presence). A declarative system would need to be quite complex in order to support all of these concepts. Furthermore, implementing each control multiple times was going to slow down development significantly, and the benefits seemed minimal (for example there are no platform conventions to follow for how to show a user row \u2014 that is a Quip-specific concept).</p>\n\n<p>Since we already had a separation between the content of popovers and their frames (indeed, any React-based popover could be shown in a modal dialog instead), I wondered if it was possible to show the contents in a separate web view contained within an <code>NSPopover</code> instead. That way the frame would be native, and it could be positioned outside the main web view, but we would not have to re-implement all of our widgets.</p>\n\n<p>To see if such an approach was feasible, I needed to answer two questions: \u201cCould React render into another window?\u201d and \u201cCould we create another web view that was visible in the main window's JavaScript context?\u201d</p>\n\n<p>The reason why I wanted React to render into another window from the child was that this way all JavaScript execution would still happen in a single window, which would make this code path much more similar to regular popover rendering. To test this out, I tried something along these lines (in the web version of the app):</p>\n\n<pre class=\"prettyprint\">\nvar otherWindow = window.open();\nvar container = otherWidow.document.createElement(\"div\");\notherWindow.document.body.append(container);\nReactDOM.render(&lt;parts.PanelContents .../&gt;, container);\n</pre>\n\n<p>To my pleasant surprise this worked (see a simple test harness <a href=\"http://persistent.info/web-experiments/react-multiple-windows/web/\">here</a>), including event handlers (that would be invoked for events in the child window, but the handler would run in the parent window). It turned out that the React team had added support for rendering into other windows quite early, though <a href=\"https://github.com/facebook/react/commit/647731e399fc824c02fdf851d91ce4477958e7fe\">they had iframes in mind</a>. The only (in retrospect obvious) gotcha was that the child window also needed to have the stylesheet <a href=\"https://github.com/mihaip/web-experiments/blob/c0688e3adf47cc5f8d39c9c3b16010c8b3ed64f1/react-multiple-windows/web/main.js#L50-L51\">injected</a> into it.</p>\n\n<p>I then turned to the second question \u2014 was it possible to intercept the <code>window.open()</code> call when running in the native app and create a popover instead? Since the call seemingly did nothing, I assumed that it was up to the application to handle it. After going through the <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Classes/WebView_Class/#//apple_ref/doc/uid/20001903-SW21\">6 delegates</a> that <code>WebView</code> supports I came across the <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Protocols/WebUIDelegate_Protocol/index.html#//apple_ref/occ/instm/NSObject/webView:createWebViewWithRequest:\"><code>webView:createWebViewWithRequest:</code></a> method of <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Protocols/WebUIDelegate_Protocol/index.html#//apple_ref/doc/uid/TP40003838\"><code>WebUIDelegate</code></a>. That was indeed invoked for <code>window.open</code> calls, and it was up to the application to create the child  <code>WebView</code> and put it somewhere in the view hierarchy. Thus it was a matter of creating the view, a view controller to own it, and setting that as the <code>contentViewController</code> of a <code>NSPopover</code> that was also created then. I\u2019ve created a <a href=\"https://github.com/mihaip/web-experiments/tree/master/react-multiple-windows/mac\">simple Xcode project</a> that shows all of the pieces working together.</p>\n\n<p>Once I had determined that there were no fundamental roadblocks, a bunch more supporting code was necessary (e.g. for passing around the popover anchor bounds and content size to the native side and for notifying the JS side that a popover was dismissed), but no more showstopper issues appeared. The same \u201crunner\u201d concept was used to allow popovers to be shown in a React frame on the web but a native frame on the Mac (Windows does not have a native popover container window and we have not yet implemented a custom version there).</p>\n\n<p><a href=\"http://persistent.info/images/native-popover.png\"><img alt=\"Quip popover on the web site\" height=\"185\" src=\"http://persistent.info/images/native-popover.png\" style=\"float: right; padding: 0 5px 5px 0; border: 0;\" width=\"282\" /></a>\nAs I was wrapping up, I was reminded of a <a href=\"https://www.youtube.com/watch?v=A5-aXfSt-RA&amp;t=696\">Chrome tech talk</a> that I had watched in early 2010 when I was first joining the Chrome team. A surprising amount of time (i.e. greater than 0 in a 30 minute overview talk) was spent discussing the implementation details of <code>&lt;select&gt;</code> popup menu rendering. I hadn\u2019t really thought of select menus as being a particularly tricky part of HTML to implement, but the fact that they extend outside of the main window led to extra layers in the class hierarchy (<a href=\"https://www.chromium.org/developers/design-documents/displaying-a-web-page-in-chrome#TOC-The-render-process\"><code>RenderWidget</code> vs. <code>RenderView</code></a>) as well as other complexity. Just as most web developers don\u2019t really think about <code>&lt;select&gt;</code> as being all that special, I\u2019m sure most of our users don\u2019t think twice about our popovers sticking out outside of the main window. However, every time I open one I think of all of the things that had to be wired up for it appear the way it does and I smile a little bit.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/ShcyhMDg3OI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1452124800.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1439441596.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/431878cb774f4e09", 
                "categories": [], 
                "title": "WKWebView Communication Latency Revisited", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/ce3bGBDh_E8/wkwebview-communication-latency.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1439441220000000.0", 
                "content": {
                    "content": "<p>Earlier this year I <a href=\"http://blog.persistent.info/2015/01/wkwebview-communication-latency.html\">posted about <code>WKWebView</code> communication latency</a> and how it\u2019s not quite as good as <code>UIWebView</code> (when using <code>WKScriptMessageHandler</code>, the officially sanctioned mechanism). There have a been a few developments in this area, so an update seems warranted.</p>\n\n<p>Things appear to be promising for iOS 9: In late June Mark Lam <a href=\"http://trac.webkit.org/changeset/186010\">fixed</a> <code>ScriptMessageHandlerDelegate::didPostMessage</code> to reuse <code>JSContext</code> instances across calls. Now that I had an Apple engineer to <del>bug</del> appeal to, I <a href=\"https://bugs.webkit.org/show_bug.cgi?id=146416\">filed a bug</a> asking for same fix to be applied to <code>[WKWebView evaluateJavaScript:completionHandler:]</code>, to help with execution round trips. Mark kindly <a href=\"http://trac.webkit.org/changeset/186229\">obliged</a>, and the fix was picked up (merged?) for iOS 9 beta 4.</p>\n\n<p>Earlier, in April, <a href=\"http://jobs.graffitilabs.com/about.html\">Ted Suzman</a> emailed me to ask if I\u2019d considered modifying <code>document.title</code> to send data from the JS side (since it\u2019s mirrored on the native side as the <code>title</code> property on the <code>WKWebView</code>, which can be observed via <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html\">KVO</a>). I <a href=\"https://github.com/mihaip/web-experiments/commit/b7ad1910ca9453e899b7d9c356fedd0559e2885f\">implemented</a> this approach and it seemed to work quite well. Ted also suggested trying <code>location.replace</code> (instead setting <code>location.hash</code>), which (though it should be equivalent) ends up being slightly faster for both <code>UIWebView</code> and <code>WKWebView</code> (<a href=\"https://github.com/mihaip/web-experiments/commit/111094a62776cb51bdb4ace3d6c992cadeb8105b\">implementation</a>).</p>\n\n<p>Ted\u2019s messages got me thinking about other <code>WKWebView</code> properties that could be manipulated from the JS side, and so I took a closer look at the delegate protocols. The <code>webView:runJavaScriptAlertPanelWithMessage:initiatedByFrame:completionHandler:</code> method on <a href=\"https://developer.apple.com/library/ios/documentation/WebKit/Reference/WKUIDelegate_Ref/index.html\"><code>WKUIDelegate</code></a> caught my eye. We don\u2019t use <code>window.alert()</code> in Quip, but this seemed like it would provide a way of getting a string from JS to native with minimal overhead (as <a href=\"http://blog.persistent.info/2015/01/wkwebview-communication-latency.html\">previously mentioned</a>, Quip encodes all JS \u2194 native communications as strings already, so we don\u2019t want the web view to do any other serialization for us). Better yet <code>webView:runJavaScriptTextInputPanelWithPrompt:defaultText:initiatedByFrame:completionHandler:</code> (which maps to <code>window.prompt()</code>) allows the native side to return a value to the JS side. I <a href=\"https://github.com/mihaip/web-experiments/commit/7be638ad971780a53d5a035143d5525d388725c3\">implemented</a> these two approaches too.</p>\n\n<p>Here are the results from testing the various communication mechanisms using <a href=\"https://github.com/mihaip/web-experiments/tree/master/webview-communication\">my test bed</a>. Tests were run on iPad Air 2\u2019s, one running iOS 8.4 and another running iOS 9.0 beta 5</p>\n\n<table frame=\"box\" rules=\"all\">\n  <thead>\n    <tr>\n      <th>Method/OS</th>\n      <th>iOS 8.4</th>\n      <th>iOS 9.0 beta 5</th>\n    </tr>\n    <tr>\n      <td colspan=\"3\"><b><code>UIWebView</code></b></td>\n    </tr>\n    <tr>\n      <td><code>location.hash</code></td>\n      <td>0.26</td>\n      <td>0.28</td>\n    </tr>\n    <tr>\n      <td><code>location.replace</code></td>\n      <td>0.18</td>\n      <td>0.18</td>\n    </tr>\n    <tr>\n      <td colspan=\"3\"><b><code>WKWebView</code></b></td>\n    </tr>\n    <tr>\n      <td><code>WKScriptMessageHandler</code></td>\n      <td>2.94</td>\n      <td>0.63</td>\n    </tr>\n    <tr>\n      <td><code>location.hash</code></td>\n      <td>0.69</td>\n      <td>0.58</td>\n    </tr>\n    <tr>\n      <td><code>location.replace</code></td>\n      <td>0.46</td>\n      <td>0.51</td>\n    </tr>\n    <tr>\n      <td><code>document.title</code></td>\n      <td>0.57</td>\n      <td>0.63</td>\n    </tr>\n    <tr>\n      <td><code>window.alert()</code></td>\n      <td>0.42</td>\n      <td>0.46</td>\n    </tr>\n    <tr>\n      <td><code>window.prompt()</code></td>\n      <td>0.37</td>\n      <td>0.45</td>\n    </tr>\n    <tr>\n      <td colspan=\"3\"><b>JS execution round-trip</b></td>\n    </tr>\n    <tr>\n      <td><code>UIWebView</code></td>\n      <td>0.17</td>\n      <td>0.16</td>\n    </tr>\n    <tr>\n      <td><code>WKWebView</code></td>\n      <td>2.60</td>\n      <td>0.39</td>\n    </tr>\n  </tbody>\n</table>\n\n<p>Quip is still using <code>UIWebView</code> since we\u2019re still supporting iOS 7 (and supporting both web views did not seem like it would be worth the complexity). However, once iOS 9 is released we will most likely drop iOS 7 support, so it\u2019s good to know that switching to <code>WKWebView</code> will not pose an unreasonable latency burden (though it remains to be seen if the selective swizzling and subview spelunking that we do will carry over).</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/ce3bGBDh_E8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1439441220.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1437704929.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/f52660717891434b", 
                "categories": [], 
                "title": "Teaching the Closure Compiler About React", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/hzYOqkGwSZ8/teaching-closure-compiler-about-react.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1431399960000000.0", 
                "content": {
                    "content": "<p><b>tl;dr:</b> <a href=\"https://github.com/mihaip/react-closure-compiler\">react-closure-compiler</a> is a project that contains a custom Closure Compiler pass that understands React concepts like components, elements and mixins. It allows you to get type-aware checks within your components and compile React itself alongside your code with full minification.</p>\n\n<p>Late last year, <a href=\"https://quip.com/\">Quip</a> started a gradual migration to <a href=\"http://facebook.github.io/react/\">React</a> for our web UI (incidentally <a href=\"https://quip.com/blog/chat-rooms\">the chat features</a> that were launched recently represent the first major functionality to be done entirely using React). When I started my research into the feasibility of using React, one of my questions was \u201cDoes it work with the <a href=\"https://developers.google.com/closure/compiler/\">Closure Compiler</a>?\u201d At Quip we rely heavily on it not just for minification, but also for <a href=\"https://developers.google.com/closure/compiler/docs/js-for-compiler\">type annotations</a> to make refactorings less scary and code more self-documenting\u00b9, and for its many warnings to prevent other gotchas in JavaScript development. The tidbits that I found were encouraging, though a bit sparse:</p>\n\n<ul>\n<li>An <a href=\"https://github.com/steida/react-externs\">externs</a> file with type declarations for most of React's API\u00b2</li>\n<li>A <a href=\"http://www.quora.com/Pete-Hunt/Posts/React-Convincing-the-Boss\">Quora post</a> by <a href=\"https://github.com/petehunt\">Pete Hunt</a> (a React core contributor) describing React as \u201cclosure compiler compatible\u201d</li>\n<li>React's <a href=\"https://facebook.github.io/react/docs/more-about-refs.html\">documentation about refs</a> mentions making sure to quote refs annotated via string attributes\u00b3</li>\n</ul>\n\n<p>In general I got the impression that it was certainly possible to use React with the Closure Compiler, but that not a lot of people were, and thus I would be off the beaten path\u2074.</p>\n\n<p>My first attempt was to add <a href=\"https://fb.me/react-0.13.3.js\">react.js</a> (the unminified version) as source input along with a simple \u201chello world\u201d component\u2075. The rationale behind doing it this way was that, if React was to be a core library, it should be included in the main JavaScript bundle that we serve to our users, instead of being a separate file. It also wouldn't need an externs file, since the compiler was aware of it. Finally, since it was going to be minified with the rest of our code, I could use the non-minified version as the input, and get better error messages. I was then greeted by hundreds of errors and warnings which broadly fell into three categories:</p>\n\n<ol>\n<li>\u201cillegal use of unknown JSDoc tag <code>providesModule</code>\u201d and similar warnings about JSDoc tags that the React source uses that the Closure Compiler didn't understand</li>\n<li>\u201cvariable <code>React</code> is undeclared\u201d indicating that the Closure compiler did not realize what symbols <code>react.js</code> exported, most likely because the module wrapper that it uses is a bit convoluted, and thus it's not obvious that the exported symbols are in the global scope</li>\n<li>\u201cdangerous use of the global <code>this</code> object\u201d within my component methods, since the Closure Compiler did not realize that the functions within the spec passed to <code>React.createClass</code> were going to be run as methods on the component instance.</li>\n</ol>\n\n<p>Since I was still in a prototyping stage with React, I looked into the most minimal set of changes I could do to deal with these issues. For 2, adding the <a href=\"https://github.com/steida/react-externs\">externs</a> file to our list helped, since the compiler now knew that there was a <code>React</code> symbol and its many properties. This did seem somewhat wrong, since the React source was not actually external, and it was in fact safe to (globally) rename <code>createClass</code> and other methods, but it did quieten those errors. For 1 and 3 I wrote a small custom <a href=\"https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/WarningsGuard.java\">warnings guard</a> that ignored all \u201cerrors\u201d in the React source itself and the \u201cdangerous use of global <code>this</code>\u201d <a href=\"https://github.com/google/closure-compiler/blob/cc491f7d79e55f4e25ec0a484a7ce4e222d47c4e/src/com/google/javascript/jscomp/DiagnosticGroups.java#L98l-L100\">warning</a> in <code>.jsx</code> files.</p>\n\n<p>Once I did all that, the code compiled, and appeared to run fine with all the other warnings and optimizations that we had. However, a few days later, as I was working on a more complex component, I ran into another error. Given:</p>\n\n<pre class=\"prettyprint\">\nvar Comp = React.createClass({\n    render: function() {...},\n    someComponentMethod: function() {...}\n});\nvar compInstance = React.render(React.createElement(Comp), ...);\ncompInstance.someComponentMethod();\n</pre>\n\n<p>I was told that <code>someComponentMethod</code> was not a known property on <code>compInstance</code> (which was of type <code>React.ReactComponent</code> \u2014 per the externs file). This once again boiled down to the compiler not understanding that the <code>React.createClass</code> construct (i.e. that it defined a type). It looked like I had two options for dealing with this:</p>\n\n<ol>\n<li>Add a <code>@suppress {missingProperties}</code> annotation at the callsite, so that the compiler wouldn't complain about the property that it didn't know about</li>\n<li>Add a <code>@lends {React.ReactComponent.prototype}</code> annotation to the class spec, so that the compiler would know that <code>someComponentMethod</code> was indeed a method on components (this seemed to be the approach taken by <a href=\"https://facebook.github.io/react/blog/2013/08/05/community-roundup-6.html#react-integration-with-este\">some other code</a> I came across). </li>\n</ol>\n\n<p>The main problem with 2 is that it then told the compiler that <i>all</i> component instances had a <code>someComponentMethod</code> method, which was not true. However, it seemed like the best option, so I added it and kept writing more components.</p>\n\n<p>After a few more weeks, when more engineers started to write React code, these limitations started to chafe a bit. There was both the problem of having to teach others about how to handle sometimes cryptic error messages (<code>@lends</code> is not a frequently-encountered JSDoc tag), as well as genuine bugs that were missed because the compiler did not have a good enough understanding of the code patterns to flag them. Additionally, the externs file didn't quite match with the latest <a href=\"https://facebook.github.io/react/docs/glossary.html\">terminology</a> (e.g.  <code>React.render</code>'s signature had it both taking and returning a <code>ReactComponent</code>). Finally, the use of an externs file meant that none of the React API calls were getting renamed, which was adding some bloat to our JavaScript.</p>\n\n<p>After thinking about these limitations for a while, I began to explore the possibility of creating a custom Closure Compiler pass that would teach it about components, mixins, and other React concepts. It already had a <a href=\"https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/ClosureRewriteClass.java\">custom pass</a> that remapped <a href=\"https://github.com/google/closure-library/blob/021ed5b313da392a7139d0d3cf7011999ac8b672/closure/goog/base.js#L2366-L2547\"><code>goog.defineClass</code></a> calls to class definitions, so teaching it about <code>React.createClass</code> didn't seem like too much of a stretch.</p>\n\n<p>Fast forward a few weeks (and a baby) later, and <a href=\"https://github.com/mihaip/react-closure-compiler\">react-closure-compiler</a> is a GitHub project that implements this <a href=\"https://github.com/mihaip/react-closure-compiler/blob/master/src/info/persistent/react/jscomp/ReactCompilerPass.java\">custom pass</a>. It takes constructs of the form:</p>\n\n<pre class=\"prettyprint\">\nvar Comp = React.createClass({\n    render: function() {...},\n    someComponentMethod: function() {...}\n});\n</pre>\n\n<p>And transforms it to (before any of the normal compiler checks or type information was extracted):</p>\n\n<pre class=\"prettyprint\">\n/**\n * @interface\n * @extends {ReactComponent}\n */\nfunction CompInterface() {}\nCompInterface.prototype = {\n    render: function() {},\n    otherMethod: function() {}\n};\n/** @typedef {CompInterface} */\nvar Comp = React.createClass({\n    /** @this {Comp} */\n    render: function() {...},\n    /** @this {Comp} */\n    otherMethod: function() {...}\n});\n/** @typedef {ReactElement.&lt;Comp&gt;} */\nvar CompElement;\n</pre>\n\n<p>Things of note in the transformed code:</p>\n\n<ul>\n<li>The <code>CompInterface</code> type is necessary in order to teach the compiler about all the methods that are present on the component. Having it as an <code>@interface</code> means that no extra code ends up being generated (and the existing code is left untouched). The methods in the interface are just stubs \u2014 they have the same parameters (and JSDoc is copied over, if any), but the body is empty.</li>\n<li>The <code>@typedef</code> is added to the component variable so that user-authored code can treat that as the type (the interface is an implementation detail). </li>\n<li>The <code>@this</code> annotations that are automatically added to all component methods means that the compiler understands that those functions do not run in the global scope.</li>\n<li>The <code>CompElement</code> <code>@typedef</code> is designed to make adding types to elements for that component less verbose.</li>\n</ul>\n\n<p>A bit more formally, these are the types that the compiler knows about given the <code>Comp</code> definition:</p>\n\n<ul>\n<li><code>ReactClass.&lt;Comp&gt;</code>, for the class definition</li>\n<li><code>ReactElement.&lt;Comp&gt;</code> for an element created from that definition (via JSX or <code>React.createElement()</code>)</li>\n<li><code>Comp</code> for rendered instances of this component (this is subclass of <code>ReactComponent</code>).</li>\n</ul>\n\n<p>This means that, for example, you can use <code>{Comp}</code> to as a <code>@return</code>, <code>@param</code> or <code>@type</code> annotation for functions that operate on <i>rendered</i> instances of <code>Comp</code>. Additionally, <code>React.render</code> invocations on JSX tags or explicit <code>React.createElement</code> calls are automatically annotated with the correct type.</p>\n\n<p>To teach the compiler about the React API, I ended up having a <a href=\"https://github.com/mihaip/react-closure-compiler/blob/master/src/info/persistent/react/jscomp/types.js\"><code>types.js</code></a> file with the full API definition (teaching the compiler how to parse the module boilerplate seemed too complex, and in any case the React code does not have type annotations for everything). For the actual type hierarchy, in addition to looking at the terminology in the React source itself, I also drew on the <a href=\"https://github.com/borisyankov/DefinitelyTyped/blob/master/react/react.d.ts\">TypeScript</a> and <a href=\"https://github.com/facebook/flow/blob/master/lib/react.js\">Flow</a> type definitions for React. Note that this is <i>not</i> an externs file, it's <a href=\"https://github.com/mihaip/react-closure-compiler/blob/9e50de2922b394b4c719245d48b671ccb7900b53/src/info/persistent/react/jscomp/ReactCompilerPass.java#L166-L268\">injected</a> into the React source itself (since it's inert, it does not result in any output changes). This means that all React API calls can be renamed (with the exception of <code>React.createElement</code>, which cannot be renamed due to the collision with the <code>createElement</code> DOM API that's in <a href=\"https://github.com/google/closure-compiler/blob/cc491f7d79e55f4e25ec0a484a7ce4e222d47c4e/externs/w3c_dom1.js#L387-L400\">another externs file</a>).</p>\n\n<p>Having done the basics, I then turned to mixins (one of the reasons why we're not using ES6 class syntax for components). I ended up requiring that mixins be wrapped in a <code>React.createMixin(...)</code> call, which was <a href=\"https://github.com/facebook/react/commit/295ef0063b933e13b2ddd541c108b386b35b648b\">introduced</a> with React 0.13 (though it's not documented). This means that it's possible to cheaply understand <code>mixins: [SomeMixin]</code> declarations in the compiler pass without having to do more complex source analysis.</p>\n\n<p>The <a href=\"https://github.com/mihaip/react-closure-compiler#readme\">README</a> covers more of the uses and gotchas, but the summary is that Quip itself is using this compiler pass to pre-process all our client-side code. The process of converting our 400+ components (from the externs type annotations) took a couple of days (which included tweaks to the pass itself, as well as fixing a few bugs that the extra checks uncovered).</p>\n\n<p>The nice thing about having custom code in the compiler is that it provides an easy point to inject more React-specific behavior. For example, we're heavy users of <code>propTypes</code>, but they're only useful when using the non-minified version of React \u2014 <code>propTypes</code> are not checked in minified production builds. The compiler pass can thus <a href=\"https://github.com/mihaip/react-closure-compiler/commit/1ef985ed663df508471b87629289765a9337e94b\">strip</a> them if compiling with the minified version.</p>\n\n<p><a href=\"http://flowtype.org/\">Flow</a> was the obvious alternative to consider if we wanted static type checking that was React-aware. I also more recently came across <a href=\"http://asana.github.io/typed-react/\">Typed React</a>. However, extending the Closure Compiler allows us to benefit from the hundreds of other (non-React) source files that have Closure Compiler type annotations. Additionally, the compiler is not just a checker, it is also a minifier, and some <a href=\"https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/DisambiguateProperties.java\">minification</a> <a href=\"https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/AmbiguateProperties.java\">passes</a> rely on type information, thus it is beneficial to have type information accessible to the compiler. One discovery that I made while working on this project is that the compiler has a <a href=\"https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/ConvertDeclaredTypesToJSDoc.java\">pass that converts type expressions</a> to JSDoc, and generally seems to have some understanding of type expressions that (at least superficially) resemble Flow's and TypeScript's. It would be nice to have one type annotated codebase that all three toolchains could be run on, but I think that's a significant undertaking at this point.</p>\n\n<p>If you use React and the Closure Compiler together, please give <a href=\"https://github.com/mihaip/react-closure-compiler\">the pass</a> <a href=\"https://github.com/mihaip/react-closure-compiler#building\">a try</a> (it integrates with <a href=\"http://plovr.com/\">Plovr</a> <a href=\"https://github.com/mihaip/react-closure-compiler/blob/master/demo/plovr-config.js\">easily</a>, and can otherwise <a href=\"https://github.com/mihaip/react-closure-compiler#building\">be registered programatically</a>) and <a href=\"https://github.com/mihaip/react-closure-compiler/issues\">let me know</a> how it works out for you.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>I continue to find doing large-scale refactorings less scary in our client-side code than ones in our server-side Python code, despite better test coverage in the latter environment.</li>\n<li>I ended up <a href=\"https://github.com/steida/react-externs/commits/master?author=mihaip\">contributing to it a bit</a>, as we started to use less common React APIs.</li>\n<li>Spelunking through React's codebase that I did much later turned up <a href=\"https://github.com/facebook/react/blob/master/src/shared/vendor/key-mirror/keyOf.js\"><code>keyOf</code></a> and many other indicators that React was definitely developed with unquoted property renaming minification in mind.</li>\n<li>Indeed the original creator of the React externs file <a href=\"https://github.com/steida/react-externs/pull/21#issuecomment-84217723\">has indicated</a> that he's no longer using the combination of React/Closure Compiler.</li>\n<li>Which used JSX, but that was not of interest to the Closure Compiler: it was transformed to plain JavaScript before the compiler saw it.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/hzYOqkGwSZ8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1431399960.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1442547177.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/658a74aec4544362", 
                "categories": [], 
                "title": "WKWebView Communication Latency", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/xShiyoAABNU/wkwebview-communication-latency.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1420585320000000.0", 
                "content": {
                    "content": "<p>One of the many exciting things about the <a href=\"https://developer.apple.com/videos/wwdc/2014/?id=206\">modern WebKit API</a> is that it has an officially sanctioned communication mechanism for doing JavaScript-to-native communication. <a href=\"http://blog.persistent.info/2013/10/a-faster-uiwebview-communication.html\">Hacks</a> should no longer be necessary to get data back out of the <code>WKWebView</code>. It is a simple matter of registering a <a href=\"https://developer.apple.com/library/ios/documentation/WebKit/Reference/WKScriptMessageHandler_Ref/index.html\"><code>WKScriptMessageHandler</code></a> on the native side and then invoking it with <code>window.webkit.messageHandlers.<i>&lt;handler name&gt;</i>.postMessage</code> on the JS side.</p>\n\n<p>After a heads-up from <a href=\"https://twitter.com/jordwalke\">Jordan</a> that messaging latency with the new web view was not that great, I  <a href=\"https://github.com/mihaip/web-experiments/commit/cfce3ae9d68b76348bd88457b88943cb55570de5\">extended</a> the test bed I had developed to measure <code>UIWebView</code> communication mechanisms to also measure this setup. I got results that mirrored Jordan's experiences \u2014 on an iPad mini 2 (A7), <code>UIWebView</code>'s best officially supported communication mechanism (changing <code>location.hash</code>\u00b9) took 0.44ms, while the same round trip on a <code>WKWebView</code> took 3.63ms. I was expecting somewhat higher latency, since there is a cross-process IPC involved now, but not this much higher.</p>\n\n<p>Curious as to what was going on, I pointed a profiler at the test harness, and got the following results.</p>\n\n<pre class=\"prettyprint\">\n<b>Running Time</b>         <b>Symbol Name</b>\n4147.0ms   94.1%     Main Thread\n                         <i>10 stack frames elided</i>\n2165.0ms   49.1%             IPC::Connection::dispatchOneMessage()\n2164.0ms   49.1%              IPC::Connection::dispatchMessage(\u2026)\n2161.0ms   49.0%               WebKit::WebProcessProxy::didReceiveMessage(\u2026)\n2160.0ms   49.0%                IPC::MessageReceiverMap::dispatchMessage(\u2026)\n2137.0ms   48.4%                 void IPC::handleMessage&lt;\u2026&gt;\n2137.0ms   48.4%                  WebKit::WebUserContentControllerProxy::didPostMessage(\u2026)\n2132.0ms   48.3%                   ScriptMessageHandlerDelegate::didPostMessage(\u2026)\n1274.0ms   28.9%                    -[JSContext initWithVirtualMachine:]\n 769.0ms   17.4%                    -[JSContext init]\n 30.0ms     0.6%                 -[BenchmarkViewController userContentController:didReceiveScriptMessage:]\n 16.0ms     0.3%                 -[JSValue toObject]\n</pre>\n\n<p>It looks like nearly half the time is spent in <a href=\"http://trac.webkit.org/browser/trunk/Source/JavaScriptCore/API/JSContext.mm\"><code>JSContext</code></a>\u00b2 initializers. As previously mentioned, the WKWebView API <a href=\"http://blog.persistent.info/2014/07/the-modern-webkit-api-is-open-source.html\">is open source</a>, so it's actually possible to read the source and see what's going on. If we look at the <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit2/UIProcess/API/Cocoa/WKUserContentController.mm?rev=169684#L106\"><code>ScriptMessageHandlerDelegate::didPostMessage</code> source</a> we can see that indeed for every <code>postMessage()</code> call on the JS side a new <code>JSContext</code> is initialized to own the deserialized value. </p>\n\n<p>Even when not doing any <code>postMessage</code> calls on the JS side, and just <a href=\"https://github.com/mihaip/web-experiments/commit/f678aac4a7fdd3d7b4ea4ce457e2723c9a645504\">measuring</a> <code>WKWebView</code>'s <a href=\"https://developer.apple.com/library/ios/documentation/WebKit/Reference/WKWebView_Ref/index.html#//apple_ref/occ/instm/WKWebView/evaluateJavaScript:completionHandler:\"><code>evaluateJavaScript:completionHandler:</code></a> latency, there was still lots of time spent in <code>JSContext</code> initialization. This turned out to be because the completion handler also results in a <code>JSContext</code> <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit2/UIProcess/API/Cocoa/WKWebView.mm?rev=177692#L613\">being created</a> in order to own the deserialized value. Thankfully this only happens if a completion handler is specified and there is a result, in other cases the function <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit2/UIProcess/API/Cocoa/WKWebView.mm?rev=177692#L587\">exits early</a>.</p>\n\n<p>After thinking about this some more, it occurred to me that the old <code>location.hash</code> mechanism could still work with a <code>WKWebView</code>. By adding a <a href=\"https://developer.apple.com/library/ios/documentation/WebKit/Reference/WKNavigationDelegate_Ref/index.html\"><code>WKNavigationDelegate</code></a> to the web view, it's possible to observe location changes on the native side. I <a href=\"https://github.com/mihaip/web-experiments/commit/43a6fcf1b5e91e1cdca8e11d56eb71ab7e18c615\">implemented</a> this approach and was pleasantly surprised to see that it took 0.95ms. This was almost 4x faster than the officially sanctioned mechanism (albeit still about twice as slow as the equivalent on a <code>UIWebView</code>, but that is presumably explained by the  IPC overhead).</p>\n\n<p>I then wondered if using <code>location.hash</code> to communicate in both directions (changing the location on the native side, listening for <code>hashchange</code> events on the JS side) would be be even better (to bypass more of the JS execution machinery), but <a href=\"https://github.com/mihaip/web-experiments/commit/3df9ddd9a1a168d90c8acb3673872133959c46c7\">that approach</a> ended up being slower (for both <code>UIWebView</code> and <code>WKWebView</code>) since it involved more delegate invocations.</p>\n\n<p>Putting all this together, here are the results (in milliseconds, averaged over 100 round trips) using these mechanisms on various devices (all running iOS 8.1) using my <a href=\"https://github.com/mihaip/web-experiments/tree/master/webview-communication\">test bed</a>. </p>\n\n<table frame=\"box\" rules=\"all\">\n  <thead>\n    <tr>\n      <th>Method/Device</th>\n      <th>iPhone 5 (A6)</th>\n      <th>iPad mini 2 (A7)</th>\n      <th>iPhone 6 (A8)</th>\n      <th>Simulator (Core i7)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td colspan=\"5\"><b><code>UIWebView</code></b></td>\n    </tr>\n    <tr>\n      <td><code>location.hash</code></td>\n      <td>0.63</td>\n      <td>0.44</td>\n      <td>0.37</td>\n      <td>0.15</td>\n    </tr>\n    <tr>\n      <td colspan=\"5\"><b><code>WKWebView</code></b></td>\n    </tr>\n    <tr>\n      <td>\n        <code>WKScriptMessageHandler</code></td>\n        <td>6.97</td>\n        <td>3.63</td>\n        <td>3.03</td>\n        <td>2.75</td>\n    </tr>\n    <tr>\n      <td><code>location.hash</code></td>\n      <td>1.3</td>\n      <td>0.95</td>\n      <td>0.77</td>\n      <td>0.32</td>\n    </tr>\n  </tbody>\n</table>\n\n<p>I <a href=\"http://openradar.appspot.com/17956460\">reported</a> this performance problem to Apple last summer (while iOS 8 was still in beta), but I haven't seen activity in this area. Ideally there would be a way to skip over JS value deserialization altogether, for cases where the client doesn't actually benefit from the built-in parsing that is done. Specifically, Quip uses Protocol Buffer-encoded messages to have richer (and typed) data passed back and forth between the native and JS side, and so, as far as the JS runtime is concerned, they're all strings anyway.</p>\n\n<p>Separately, it is a good question as to why I'm making such a big fuss over the overhead of one millisecond (or three) per call. Quip continues to be a \u201chybrid\u201d app, with the editing experience implemented in a web view (a <code>UIWebView</code>  for now). With the launch of <a href=\"https://quip.com/blog/spreadsheets\">spreadsheets</a> we now have <a href=\"http://www.quora.com/Quip/How-did-Quip-implement-the-spreadsheet-feature\">even more</a> native \u2194 web communication, and in some cases we notify the web view of touch events continuously while <code>UIScrollView</code>s are scrolled (for custom behavior\u00b3). When trying to hit 60 frames per second, spending 3 milliseconds of your 16 millisecond budget on pure overhead feels wasteful.</p>\n\n<p><b>Update on 06/29/2015:</b> Mark Lam <a href=\"http://trac.webkit.org/changeset/186010\">recently</a> fixed <code>ScriptMessageHandlerDelegate::didPostMessage</code> to reuse <code>JSContext</code> instances across calls, which fixes one of the two performance problems that this post covers. I've filed <a href=\"http://webkit.org/b/146416\">another bug</a> to track the remaining issue with <code>evaluateJavaScript:completionHandler:</code>.</p>\n\n<p><b>Update on 08/12/2015:</b> The other bug has been fixed too, and both fixes are live in iOS 9. I have also discovered additional alternative mechanisms that perform better. See <a href=\"http://blog.persistent.info/2015/08/wkwebview-communication-latency.html\">my more recent post</a> about the current state of things.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>Astute observers will remark that <a href=\"http://blog.persistent.info/2013/10/a-faster-uiwebview-communication.html\">my blog post</a> used to recommend either changing <code>location.hash</code> or using the <code>click()</code> method on an anchor node. I have since discovered that <code>click()</code> results in a forced layout recalculation (<a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit/mac/WebCoreSupport/WebFrameLoaderClient.mm?rev=177484#L1541\">via hit testing</a>) as part of dispatching the event. I have since updated the post to recommend <code>location.hash</code>.</li>\n<li>I find it a bit odd that <code>JavaScriptCore</code> is not part of Apple's web-accessible documentation set. Even their own release notes announcing the framework <a href=\"https://developer.apple.com/library/ios/documentation/Miscellaneous/Conceptual/iPhoneOSTechOverview/CoreServicesLayer/CoreServicesLayer.html#//apple_ref/doc/uid/TP40007898-CH10-SW35\">say</a> \u201cfor information about the classes of this framework, see the header files.\u201d </li>\n<li>This involved yet more spelunking into <code>UIWebView</code> internals, something I will hopefully be posting about soon.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/xShiyoAABNU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1420585320.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1418860803.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/30bce97c05824187", 
                "categories": [], 
                "title": "RetroGit", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/_ewyG6nKufA/retrogit.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1418860800000000.0", 
                "content": {
                    "content": "<div style=\"float: right; margin-left: 10px; border: solid 1px #ccc; padding: 5px;\">\n<a href=\"https://www.retrogit.com/static/images/screenshot.png\" id=\"screenshot\">\n    <img alt=\"RetroGit Screenshot\" height=\"260\" src=\"https://www.retrogit.com/static/images/screenshot-thumbnail.png\" width=\"206\" />\n  </a>\n</div>\n  \n<p><b>tl;dr: </b><a href=\"https://www.retrogit.com/\">RetroGit</a> is a simple tool that sends you a daily (or weekly) digest of your GitHub commits from years past. Use it as a nostalgia trip or to remind you of TODOs that you never quite got around to cleaning up. Think of it as <a href=\"http://timehop.com/\">Timehop</a> for your codebase.</p>\n\n<p>It's now been a bit more than two years since I've joined <a href=\"https://quip.com/\">Quip</a>. I recall a sense of liberation the first few months as we were working in a very small, very new codebase. Compared with the much older and larger projects at Google, experimentation was expected, technical debt was non-existent, and in any case it seemed quite likely that almost everything would be rewritten before any real users saw it\u00b9. It was also possible to skim every commit and generally have a sense that you could keep the whole project in your head.</p>\n\n<p>As time passed, more and more code was written, prototypes were replaced with \u201cproductionized\u201d systems and whole new areas that I was less familiar with (e.g. Android) were added. After about a year, I started to have the experience, familiar to any developer working on a large codebase for a while, of running <code>blame</code> on a file and being surprised by seeing my own name next to <a href=\"https://twitter.com/iamdevloper/status/494944260702363648\">foreign-looking</a> lines of code.</p>\n\n<p>Generally, it seemed like the codebase was still manageable when working in a single area. Problems with keeping it all in my head appeared when doing context switches: working on tables for a month, switching to <a href=\"https://quip.com/blog/like-button-comments\">annotations</a> for a couple of months, and then trying to get back into tables. By that point tables had been \u201cswapped out\u201d and it all felt a bit alien. Extrapolating from that, it seemed like coming back to a module a year later would effectively mean starting from scratch.</p>\n\n<p> I wondered if I could build a tool to help me keep more of the codebase \u201cpaged in\u201d. I've been a fan of <a href=\"http://timehop.com/\">Timehop</a> for a while, back to the days when they were known as <a href=\"https://web.archive.org/web/20110225223047/http://blog.foursquare.com/2011/02/22/stop-hacker-time\">4SquareAnd7YearsAgo</a>. Besides the nostalgia factor, it did seem like periodic reminders of places I've gone to helped to keep those memories fresher. Since Quip <a href=\"https://github.com/quip\">uses GitHub</a> for our codebase (and I had also migrated all my projects there a couple of years ago), it seemed like it would be possible to build a Timehop-like service for my past commits via <a href=\"https://developer.github.com/v3/\">their API</a>.</p>\n\n<p>I had also wanted to try building something with Go\u00b2, and this seemed like a good fit. Between <a href=\"https://github.com/google/go-github\">go-github</a> and <a href=\"https://code.google.com/p/goauth2/\">goauth2</a>, the \u201cboring\u201d bits would be taken care of. App Engine's Go runtime also made it easy to deploy my code, and it didn't seem like this would be a very resource-intensive app (<a href=\"http://www.informationweek.com/cloud/platform-as-a-service/google-app-engine-price-hike-stuns-developers-/d/d-id/1099933\">famous last words</a>).</p>\n\n<p>I <a href=\"https://github.com/mihaip/retrogit/compare/560a330833cb4749ebb960ec9225923505899e06...22ef0540aa803ebd12f6e2c43454829cc20d4d25\">started experimenting</a> over Fourth of July weekend, and by working on it for a few hours a week I had it emailing me my daily digests <a href=\"https://github.com/mihaip/retrogit/commit/649bbd8fd953994052d1e3e132629aa29c49fa80\">by the end of the month</a>. At this point I ran into what <a href=\"http://akdotcom.com/\">Akshay</a> <a href=\"http://techwalla.blogspot.com/2006/12/one-year-of-partychat.html\">described</a> as the \u201ceh, it works well enough\u201d trough, where it was harder to find the motivation to clean up the site so that others could use it too. But eventually it did reach a \u201c1.0\u201d state, including <a href=\"https://github.com/mihaip/retrogit/commit/9aaa8326e07d828f211da36b5edc2c7edebf995b\">a name change</a>, ending up with <a href=\"https://www.retrogit.com/\">RetroGit</a>.</p>\n\n<p>The <a href=\"https://github.com/mihaip/retrogit\">code</a> ended up being quite straightforward, though I'm sure I have quite a ways to go before writing idiomatic Go.  The site employs a design similar to <a href=\"http://www.streamspigot.com/tweet-digest/\">Tweet Digest</a>, where it doesn't store any data beyond an OAuth token, and instead just makes the necessary API calls on the fly to get the commits from years past. The GitHub API behaved as advertised \u2014 the only tricky bit was how to handle the my aforementioned migrated repositories. Their creation dates were 2011-2012, but they had commits going back <a href=\"https://github.com/mihaip/gmail-greasemonkey/commit/d1847b27aa0b0de7620c9d6c9251ada2543b3968\">much further</a>. I didn't want to \u201cprobe\u201d the interval going back indefinitely, just in case there were commits from that year \u2014 in theory someone could import some <a href=\"http://cvsweb.openbsd.org/cgi-bin/cvsweb/src/usr.bin/head/head.c?rev=1.18&amp;content-type=text%2Fx-cvsweb-markup\">very old</a> repositories into GitHub\u00b3. I <a href=\"http://stackoverflow.com/q/25112141/343108\">ended up</a> using the <a href=\"https://developer.github.com/v3/repos/statistics/#contributors\">statistics endpoint</a> to determine when the first commit for a user was in a repository, and persisting that as a <a href=\"https://github.com/mihaip/retrogit/blob/master/app/repos.go\">\u201cvintage\u201d</a> timestamp.</p>\n\n<p>I'm not entirely happy with the visual design \u2014 I like the general \u201cretro\u201d theme, but I think executing it well is a bit beyond my Photoshop abilities. The punch card graphic is based on this \u201c<a href=\"http://ferretronix.com/march/computer_cards/4tran_statement.jpg\">Fortran statement</a>\u201d card from <a href=\"http://ferretronix.com/march/computer_cards/\">this collection</a>. <a href=\"https://www.myfonts.com/WhatTheFont/\">WhatTheFont!</a> identified the header font as <a href=\"http://www.fonts.com/font/itc/itc-blair/medium\">ITC Blair Medium</a>. Hopefully the styling within the emails is restrained enough that it won't affect readability. Relatedly, this was my first project where I had to generate HTML email, and I escaped with most of my sanity intact, though some things were still <a href=\"https://github.com/mihaip/retrogit/commit/ff360bc60524b5710f65c5fde8e98396457cf41a\">annoying</a>. I found the CSS compatibility tables from <a href=\"http://templates.mailchimp.com/resources/email-client-css-support/\">MailChimp</a> and <a href=\"https://www.campaignmonitor.com/css/\">Campaign Monitor</a>, though I'm happy that I don't have care too much about more \u201cmass market\u201d clients (sorry Outlook users).</p>\n\n<p>As to whether or not RetroGit is achieving its intended goal of helping me keep more of the Quip codebase in my head, it's hard to say for sure. One definite effect is that I pay more attention to commit messages, since I know I'll be seeing them a year from now. They're not quite <a href=\"https://twitter.com/kateho/status/497903146937880576\">link bait</a>, but I do think that going beyond things like \u201cFixes #787\u201d to also include a one-line summary in the message is helpful. In theory the issue has more details as to what was broken, but they can end up being re-opened, fixes re-attempted, etc. so it's nice to capture the context of a commit better. I've also been reminded of some <a href=\"https://twitter.com/zadr/status/423031627984302080\">old TODOs</a> and done some commenting cleanups when it became apparent a year later that things could have been explained better.</p>\n\n<p>If you'd like to try it yourself, all <a href=\"https://www.retrogit.com/\">the site</a> needs is for you to sign in with your GitHub account. There is <a href=\"https://www.retrogit.com/faq\">an FAQ</a> for the security conscious, and for the paranoid running your own instance on App Engine should be quite easy \u2014 the <a href=\"https://github.com/mihaip/retrogit/blob/master/README.md\">README</a> covers the minimal setup necessary.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>It took me a while to stop having hangups about not choosing the most optimal/scalable solution for all problems. I  didn't skew towards \u201cover-engineered\u201d solutions at Google, but somehow enough of the \u201cwill it scale\u201d sentiment did seep in.</li>\n<li>My <a href=\"https://github.com/mihaip/streamspigot/tree/master/birdpinger\">last attempt</a> was pre-Go 1.0, and was too small to really \u201cstick\u201d.</li>\n<li>Now that Go itself has <a href=\"https://github.com/golang\">migrated to GitHub</a>, the Gophers could use this to get reminders of <a href=\"https://github.com/golang/go/commit/7d7c6a97f815e9279d08cfaea7d5efb5e90695a8\">where they started</a>.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/_ewyG6nKufA\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1418860800.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1419344074.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/20286c3e5394462e", 
                "categories": [], 
                "title": "HTML Munging My Way To a React.js Conf Ticket", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/2sNupwfvivo/html-munging-my-way-to-reactjs-conf.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1418451600000000.0", 
                "content": {
                    "content": "<p>Like <a href=\"http://facebook.github.io/react/blog/2014/11/24/react-js-conf-updates.html\">many others</a>, I was excited to see that Facebook is putting on a <a href=\"http://conf.reactjs.com/\">conference</a> for the <a href=\"http://reactjs.com/\">React</a> community. Tickets were being released in three waves, and so for the last three Fridays I have been trying to get one. The first Friday I did not even manage to see an order form. The next week I got as far as choosing a quantity, before being told that tickets were sold out when pushing the \u201cSubmit\u201d button.</p>\n\n<p>Today was going to be my last chance, so I enlisted some coworkers to the cause \u2014 if any of them managed to get an order form the plan was that I would come by their desk and fill it out with my details. At 12 o'clock I struck out, but <a href=\"http://backchannel.org/\">Bret</a> and <a href=\"http://facebook.com/caseymrm\">Casey</a> both managed to run the gauntlet and make it to the order screen. However, once I tried to submit I was greeted with:</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"React.js Conf Order Failure\" height=\"689\" src=\"http://persistent.info/images/react-conf.png\" style=\"border: solid 1px #ccc;\" width=\"664\" /><br />\n</p>\n\n<p>Based on Twitter, I was <a href=\"https://twitter.com/EvNowAndForever/status/543496556880465921\">not</a> <a href=\"https://twitter.com/bryanhelmig/status/543497533247741954\">the</a> <a href=\"https://twitter.com/ls_n/status/540962327810408448\">only one</a>. Looking at the Dev Tools console showed that a bunch of URLs were failing to load from <a href=\"http://aws.amazon.com/cloudfront/\">CloudFront</a>, with pathnames like <code>custom-tickets.js</code> and <code>custom-tickets.css</code>. I assumed that some supporting resources were missing, hence the form was not entirely populated\u00b9. After checking that those URL didn't load while tethered to my phone (in case our office network was banned for DDoS-like behavior), I decided to spelunk through the code and see if I could inject the missing form fields by hand. I found some promising-looking JavaScript of the form:</p>\n\n<pre class=\"prettyprint\">\nsubmitPaymentForm({\n    number: $('.card-number').val(),\n    cvc: $('.card-cvc').val(),\n    exp_month: $('.card-expiry-month').val(),\n    exp_year: $('.card-expiry-year').val(),\n    name: $('.cardholder-name').val(),\n    address_zip: $('.card-zipcode').val()\n});</pre>\n\n<p>I therefore injected some DOM nodes with the appropriate class names and values and tried resubmitting. Unfortunately, I got the same error message. When I looked at the <code>submitPaymentForm</code> implementation, I could see that the input parameter was not actually used:</p>\n\n<pre class=\"prettyprint\">\nfunction submitPaymentForm(fields) {\n    var $form = $(\"#billing-info-form\");\n    warnLeave = false;\n    $form.get(0).submit();\n}</pre>\n\n<p>I looked at the form fields that had loaded, and they had complex names like <code>order[TicketOrder][email]</code>. It seemed like it would be difficult to guess the names of the missing ones (I checked the network request and they were not being submitted at all). I then had the idea of finding another <a href=\"https://splashthat.com/\">Splash</a> event order form, and seeing if I could get the valid form fields from there. I eventually ended up on the ticket page for a <a href=\"http://photayvideoreleaseparty.splashthat.com/\">music video release party</a> that had a working credit card form. Excited, I copied the form fields into the React order page that I still had up, filled them out, and pressed \u201cSubmit\u201d. There was a small bump where it thought that the expiration date field was required and not provided, but I bypassed that client-side check and got a promising-looking spinner that indicated that the order was being processed.</p>\n\n<p>I was all set to be done, when the confirmation page finally loaded, and instead of being for the React conference, it was for the video release party. Evidently starting the order in a second tab had clobbered the some kind of cookie or other client-side state from the React tab. I had thus burned the order page on Bret's computer. However, Case had been dutifully keeping the session on his computer alive, so I switched to that one. There I went through the same process, but opened the \u201cdonor\u201d order page in a Chrome incognito window. With bated breath I pressed the order button, and was relieved to see a confirmation page for React, and this email to arrive shortly after:</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"React.js Conf Order Success?\" height=\"35\" src=\"http://persistent.info/images/react-conf-ticket.png\" style=\"border: solid 1px #ccc;\" width=\"858\" /><br />\n</p>\n\n<p>Possibly not quite as epic was <a href=\"http://blog.persistent.info/2014/03/saving-day-for-few-veronica-mars-fans.html\">my last attempt</a> at working around broken service providers, but it still made for an exciting excuse to be late for lunch. And if anyone wants to go a music video release party tonight in Brooklyn, I have a ticket\u00b2.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>I now see that other Splash order forms have the same network error, so it may have been a red herring.</li>\n<li>Amusingly enough, I appeared to have bought the last pre-sale ticket there \u2014 they are sold out too.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/2sNupwfvivo\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1418451600.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1409703581.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/bb140362a7c74527", 
                "categories": [], 
                "title": "Two Hard Things", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/5jeKENhNCXg/two-hard-things.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1409703540000000.0", 
                "content": {
                    "content": "<p>Inspired by Phil Karlton's (<a href=\"http://skeptics.stackexchange.com/questions/19836/has-phil-karlton-ever-said-there-are-only-two-hard-things-in-computer-science\">possibly apocryphal</a>) <a href=\"http://martinfowler.com/bliki/TwoHardThings.html\">Two Hard Things</a>, here's what I struggle with on a regular basis:</p>\n\n<ol>\n<li>Getting information X from system A to system B without violating the N layers of abstraction in between.</li>\n<li>Naming X such that the name is concise, unique (i.e. greppable) and has the right connotations to someone new to the codebase (or myself, a year later).</li>\n</ol>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/5jeKENhNCXg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1409703540.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1407196620.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/04aaef9683cf4e80", 
                "categories": [], 
                "title": "Gmail's HTML Tag Whitelist", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/kWBhI1lJCU0/gmails-html-tag-whitelist.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1407196620000000.0", 
                "content": {
                    "content": "<p>I couldn't find a comprehensive list of the HTML tags that Gmail's sanitizer allows through, so I <a href=\"https://quip.com/aO0pAZO9m9SG\">wrote one up</a>.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/kWBhI1lJCU0\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1407196620.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1406013029.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/badd417ea6c743ec", 
                "categories": [], 
                "title": "The Modern WebKit API is Open Source", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/EddwpHjpYY0/the-modern-webkit-api-is-open-source.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1405636020000000.0", 
                "content": {
                    "content": "<p>When doing web development (or really any development on a complex enough platform), sometimes the best course of action for understanding puzzling behavior is to <a href=\"http://blog.persistent.info/2013/09/quip-back-to-app-development.html\">read the source</a>. It's therefore been fortunate that Chrome/Blink, WebKit (though not Safari) and Firefox/Gecko are all open source (and often the source is <a href=\"https://code.google.com/p/chromium/codesearch\">easily</a> <a href=\"http://mxr.mozilla.org/mozilla-central/search\">searchable</a> <a href=\"http://blog.persistent.info/2013/04/source-quicklinks.html\">too</a>).</p>\n\n<p>One of exceptions has been mobile WebKit when accessed via a <code>UIWebView</code> on iOS. Though it's based on the same components (WebCore, JavaScriptCore, WebKit API layer) as its desktop counterpart, there is enough mobile-specific behavior (e.g. interaction with auto-complete and the on-screen keyboard) that source access would come in handy. Apple would periodically do code dumps on <a href=\"http://opensource.apple.com/\">opensource.apple.com</a>, but those only included the WebCore and JavaScriptCore components\u00b9 and in any case there hasn't been one since <a href=\"http://opensource.apple.com/release/ios-613/\">iOS 6.1</a>.</p>\n\n<p>At WWDC, as part of iOS 8, Apple <a href=\"https://developer.apple.com/videos/wwdc/2014/?id=206\">announced a modern WebKit API</a> that would be unified between the Mac and iOS. Much of the (positive) <a href=\"http://daringfireball.net/linked/2014/06/09/ios-8-webkit\">reaction</a> has been about the new API giving third-party apps access to faster, JITed, JavaScript execution. However, just as important to me is the fact that implementation of the new API is <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit2/UIProcess/API/Cocoa\">open source</a>.</p>\n\n<p>Besides browsing around the source tree, it's also possible to track its development more closely, via an <a href=\"http://trac.webkit.org/log/trunk/Source/WebKit2/UIProcess/API/Cocoa?format=rss&amp;limit=100&amp;mode=stop_on_copy\">RSS feed of commits</a>. However, there are no guarantees that just because something is available in the trunk repository that it will also be available on the (presumed) branch that iOS 8 is being worked on. For example, <code>[WKWebView evaluateJavaScript:completionHandler:]</code> was added on <a href=\"http://trac.webkit.org/changeset/169765\">June 10</a>, but it didn't show up in iOS 8 until beta 3, released on July 7 (beta 2 was released on June 17). More recent changes, such as the ability to <a href=\"http://trac.webkit.org/changeset/170495\">control selection granularity</a> (added on June 26) have yet to show up. There don't seem to be any (header) changes\u00b2 that live purely in the iOS 8 SDK, so I'm inclined to believe that (at least at this stage) there's not much on-branch development, which is encouraging.</p>\n\n<p>Many thanks to <a href=\"https://twitter.com/andersca\">Anders</a>, <a href=\"https://twitter.com/awfulben\">Benjamin</a>, <a href=\"https://www.webkit.org/blog/69/mitz-pettel-is-a-webkit-reviewer/\">Mitz</a> and all the other Apple engineers for doing all in the open.</p>\n\n<p><strong>Update on July 21, 2014:</strong> The selection granularity API has shown up in beta 4, which was released today.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>IANAL, but my understanding is that WebCore and JavaScriptCore are <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/LICENSE-LGPL-2.1?format=txt\">LGPL-licensed</a> (due to its KHTML heritage) and so modifications in shipping software have to distributed as source, while WebKit is <a href=\"http://trac.webkit.org/export/171172/trunk/Source/WebKit/LICENSE\">BSD-licensed</a>, and therefore doesn't have that requirement.</li>\n<li>Modulo some <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit2/mac/rewrite-availability-macros.sh\">munging</a> done as part of the release process.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/EddwpHjpYY0\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1405636020.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1405132147.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/0ed2cffc78704d29", 
                "categories": [], 
                "title": "Using ASan with iOS Applications", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/b8G0sEoTFjY/using-asan-with-ios-applications.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1405132140000000.0", 
                "content": {
                    "content": "<p>I've written up a <a href=\"https://quip.com/pqu1A6PrunOS\">quick guide</a> for getting ASan (<a href=\"https://code.google.com/p/address-sanitizer/wiki/AddressSanitizer\">Address Sanitizer</a>) working with iOS apps. This is the kind of thing I would have put directly into this blog in the past, but:</p>\n\n<ol>\n<li>Blogger's editor is not pleasant to use \u2014 I usually end up editing the HTML directly, especially for posts with code blocks. Not that Quip doesn't have bugs, but at least they're <i>our</i> bugs.</li>\n<li>Quip has <a href=\"https://quip.com/blog/quip-20\">public sharing</a> now, so in theory that doc should be just as accessible (and indexable) as a regular post.</li>\n</ol>\n\n<p>However, I still like the idea of this blog being a centralized repository of everything that I've written, hence this \"stub\" post.</p><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/b8G0sEoTFjY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1405132140.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1403052708.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/35fd23879c0746d8", 
                "categories": [], 
                "title": "Adding Keyboard Shortcuts For Inspecting iOS Apps and Web Pages in Safari", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/tiQ7IGAJeQQ/adding-keyboard-shortcuts-for.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1403052660000000.0", 
                "content": {
                    "content": "<p>Back in iOS 6 Apple added the ability to remotely inspect pages in mobile Safari and UIWebViews. While I'm very grateful for that capability, the fact that it's buried in a submenu in Safari's \u201cDevelop\u201d menu means that I have to navigate a maze with a mouse every time I relaunch the app. I decided to investigate adding a way of triggering the inspector via a keyboard shortcut.</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"iPhone Simulator menu\" height=\"146\" src=\"http://persistent.info/images/safari-inspect-menu.png\" style=\"border: solid 1px #ccc;\" width=\"472\" /><br />\n<i>The target</i>\n</p>\n\n<p>My first thought was that I could add a keyboard shortcut via OS X's <a href=\"http://support.apple.com/kb/PH13916\">built-in support</a>. After all, \u201cmobile.html\u201d is just another menu item. Something like:</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"iPhone Simulator menu\" height=\"323\" src=\"http://persistent.info/images/safari-keyboard-shortcuts.png\" style=\"border: solid 1px #ccc;\" width=\"603\" /><br />\n<i>If only it were so easy</i>\n</p>\n\n<p>Unfortunately, while that worked if I opened the \u201cDevelop\u201d menu at least once, it didn't on a cold start of Safari. I'm guessing that the contents of the menu are generated dynamically (and lazily), and thus there isn't a \u201cmobile.html\u201d item initially for the keyboard shortcut system to hook into.</p>\n\n<p>Inspired by <a href=\"https://gist.github.com/tofias/8510931\">a similar BBEdit script</a>, I then decided to experiment with AppleScript and the System Events UI automation framework. After cursing at AppleScript for a while (can't wait for <a href=\"https://developer.apple.com/videos/wwdc/2014/?id=306\">JavaScript for Automation</a>), I ended up with:</p>\n\n<pre>\ntell <i>application</i> \"Safari\" to <b>activate</b>\ntell <i>application</i> \"System Events\" to \u00ac\n    <b>click</b> <i>menu item</i> \"mobile.html\" of <i>menu</i> \u00ac\n        \"iPhone Simulator\" of <i>menu item</i> \"iPhone Simulator\" of <i>menu</i> \u00ac\n        \"Develop\" of <i>menu bar item</i> \"Develop\" of <i>menu bar</i> 1 of <i>process</i> \"Safari\"\n</pre>\n\n<p>That seemed to work reliably, now it was just a matter of binding it to a keyboard shortcut. There apps like <a href=\"http://www.red-sweater.com/fastscripts/\">FastScripts</a> that provide this capability, but to make the script more portable, I wanted a way that didn't depend on third-party software. It turned out that <a href=\"http://en.wikipedia.org/wiki/Automator_(software)\">Automator</a> can be used to do this, albeit in a somewhat convoluted fashion:</p>\n\n<ol>\n<li>Launch Automator</li>\n<li>Create a new \u201cService\u201d workflow</li>\n<li>Add a \u201cRun AppleScript\u201d action\u00b9</li>\n<li>Change the setting at the top of the window to \u201cService receives no input in any application\u201c</li>\n<li>Replace the <code>(* Your script goes here *)</code> placeholder with the script above (your workflow should end up looking <a href=\"http://persistent.info/images/inspect-simulator-automator.png\">like this</a>)</li>\n<li>Save the service as \u201cInspect Simulator\u201d</li>\n</ol>\n\n<p>I wanted to attach a keyboard shortcut to this service when either Safari or the simulator were running, but not in other apps. I therefore then went to the \u201cApp Shortcuts\u201d keyboard preferences pane (pictured above) and added shortcuts for that menu item in both apps (to add shortcuts for the simulator, you need to select the \u201cOther\u2026\u201d option in the menu and select it from <code>/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone Simulator.app</code>).</p>\n\n<p>One final gotcha is that the first time the script is run in either app, you will get a \u201cThe action 'Run AppleScript' encountered an error.\u201d dialog. Immediately behind that dialog is another, saying \u201c'Safari.app' would like to control this computer using accessibility features.\u201d You'll need to open the Security & Privacy preferences pane and enable Safari (and the simulator's) accessibility permissions.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>Not be confused with the \u201cExecute AppleScript\u201d action, which is a Remote Desktop one \u2014 I did that and was puzzled by the \u201cno computers\u201d error message for a good while.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/tiQ7IGAJeQQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1403052660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1400538602.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/af352c34365f4403", 
                "categories": [], 
                "title": "Per-Package Method Counts for Android's DEX Format", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/TfOIG5b9XvA/per-package-method-counts-for-androids.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1400538600000000.0", 
                "content": {
                    "content": "<p><a href=\"https://quip.com/\">Quip</a>'s <a href=\"https://play.google.com/store/apps/details?id=com.quip.quip\">Android app</a> recently ran into the Android DEX/Dalvik 64K method limit. We suspected that this was due to code generated by the <a href=\"https://code.google.com/p/protobuf/\">Protocol Buffer</a> compiler\u00b9, but we wanted to get more specific numbers, to both understand the situation better and track our progress. As a starting point, we figured per-package method counts would give us what we needed.</p>\n\n<p>The Android SDK ships with a <code><a href=\"https://android.googlesource.com/platform/dalvik.git/+/master/dexdump/DexDump.cpp\">dexdump</a></code> tool that disassembles .dex (or .apk files) and dumps certain information out of it. Running it with the <code>-f</code> flag generated a <code>method_ids_size</code> line that showed that we were indeed precariously close to the limit. The script supports an <a href=\"http://androidxref.com/4.4.2_r2/xref/dalvik/dexdump/DexDump.cpp#55\">XML output</a> and <a href=\"http://androidxref.com/4.4.2_r2/xref/dalvik/dexdump/DexDump.cpp#1352\">per-class output of methods</a>, so it seemed like a straightforward task to group methods and classes by package. However, once I actually processed its output, I got a much lower number than expected (when I did a sanity check to add up all the per-package counts). It turned out that the XML output is <a href=\"http://androidxref.com/4.4.2_r2/xref/dalvik/dexdump/DexDump.cpp#1880\">hardcoded</a> to only output public classes and methods.</p>\n\n<p>I then held my nose and rewrote the script to instead parse <code>dexdump</code>'s text format. Unfortunately, even then there was some undercounting \u2014 not as significant, but I was missing a few thousand methods. I looked at the counts for a few classes, and nothing seemed to be missing, so this was perplexing. After some more <a href=\"http://stackoverflow.com/a/21492160/343108\">digging</a>, it turned out that the limit counts referenced methods too, not just those defined in the DEX file. Therefore iterating over the methods defined in each class was missing most of the <code>android.*</code> methods that we were calling.</p>\n\n<p><a href=\"https://twitter.com/moh\">Mohammad</a> then pointed me at <a href=\"http://stackoverflow.com/a/17098651/343108\">a script</a> that used the <a href=\"https://code.google.com/p/smali/\">smali/baksmali</a> assembler/disassembler to generate per-package counts. However, when I ran it, it seemed to <b>over</b>count. Looking into it a bit more, it looked like the script disassembled the .apk, re-assembled it to generate a .dex per package, and then ran <code>dexdump</code> on each one. However, this meant that referenced methods were counted by each package that used them, thus the overall count would include them more than once.</p>\n\n<p>I briefly considered modifying <code>dexdump</code> to extract the information that I needed, but it didn't seem like a fun codebase to work in; besides being in C++ it had lots of <a href=\"http://androidxref.com/4.4.2_r2/xref/dalvik/dexdump/DexDump.cpp#33\">dependencies</a> into the rest of the Android tree. Looking around for other DEX format parses turned up <a href=\"https://github.com/JesusFreke/smali/tree/master/dexlib2/src/main/java/org/jf/dexlib2\">smali's</a>, <a href=\"https://github.com/poliva/dexinfo\">dexinfo</a>, <a href=\"https://code.google.com/p/dexinsight/\">dexinsight</a>, <a href=\"https://github.com/rchiossi/dexterity\">dexterity</a>, <a href=\"https://github.com/rchiossi/dexlib\">dexlib</a> and a few others. All seemed to require a bit more effort to build and understand than I was willing to put in late on a Friday night. However, after browsing around through the Android tree more, I came across the <a href=\"https://android.googlesource.com/platform/dalvik.git/+/master/tools/dexdeps/\">dexdeps</a> tool\u00b2. It is designed for separating referenced and defined methods (and classes), but its <a href=\"https://android.googlesource.com/platform/dalvik.git/+/master/tools/dexdeps/src/com/android/dexdeps/DexData.java\">DEX file parser</a> looked simple enough to modify to extract the data that I was interested in. Better yet, it had no other dependencies, and looked straightforward to build.</p>\n\n<p>Sure enough, it was pretty easy to <a href=\"https://github.com/mihaip/dex-method-counts/commit/adbec36c03d2add90ab6b12e8e0de867391b378e\">modify it</a> to create a per-package method counting tool. After a few more commits, I ended up with a <a href=\"https://github.com/mihaip/dex-method-counts\">dex-method-counts</a> tool that can be pointed at an APK (or DEX file) and provide a package hierarchy tree-view of defined and referenced method counts. The <code><a href=\"https://github.com/mihaip/dex-method-counts#readme\">README</a></code> has a few more details, including a few flags that I've found useful when looking at protocol buffer compiler-generated code.</p>\n\n<p>As for how we solved our actual method count limit problem, we've so far managed to stave off doom by refactoring our .proto files to include fewer messages in our Java build (we were picking up some that were for other platform or server use only). That is, nothing <a href=\"https://www.facebook.com/notes/facebook-engineering/under-the-hood-dalvik-patch-for-facebook-for-android/10151345597798920\">too crazy</a> yet.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>For others in this situation, Square's <a href=\"https://github.com/square/wire\">Wire</a> library may be an alternative.</li>\n<li>Somewhat amusingly, this is not the only Java-based DEX parser in the Android source tree, there is also <a href=\"https://android.googlesource.com/platform/cts/+/master/tools/dex-tools/README.txt\">dex-tools</a> in the <a href=\"https://source.android.com/compatibility/cts-intro.html\">Compatibility Test Suite</a> area.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/TfOIG5b9XvA\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1400538600.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1398305380.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/47f356964c234243", 
                "categories": [], 
                "title": "Getting ALL your data out of Quip", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/riCzrGGGwHQ/getting-all-your-data-out-of-quip.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1398305340000000.0", 
                "content": {
                    "content": "<p>No, <a href=\"http://quip.com/\">Quip</a> is not shutting down. But we did just launch an <a href=\"https://quip.com/api/\">API</a>, so I thought I would take my experience with doing <a href=\"http://blog.persistent.info/2013/06/getting-all-your-data-out-of-google.html\">data export</a> to write a <a href=\"https://github.com/quip/quip-api/tree/master/samples/baqup\">backup tool</a> that exports as much data as can be obtained via the API into a local folder. It's missing a few things (images most notably), but you do end up with a folder with all your documents (rendered to HTML) and conversations.</p>\n\n<p>The tool is one of the <a href=\"https://github.com/quip/quip-api/tree/master/samples\">samples</a>\u00b9 in our <a href=\"https://github.com/quip/quip-api/\">API repository</a>, feel free to give it a spin. Pull requests are also welcome.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>The <a href=\"https://github.com/quip/quip-api/tree/master/samples/webhooks\">Webhook</a> one is also mine. Party like it's 2009!</li>\n</ol>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/riCzrGGGwHQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1398305340.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1394973513.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/decc227c410b4fa0", 
                "categories": [], 
                "title": "Saving The Day For (A Few) Veronica Mars Fans", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/7Xg_LhWHv8g/saving-day-for-few-veronica-mars-fans.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1394941680000000.0", 
                "content": {
                    "content": "<p>Yesterday was the release day of the <a href=\"http://en.wikipedia.org/wiki/Veronica_Mars_(film)\">Veronica Mars movie</a>. As a <a href=\"https://www.kickstarter.com/projects/559914737/the-veronica-mars-movie-project\">Kickstarter</a> backer, <a href=\"http://bouncinginthekitchen.com/\">Ann</a> got a digital copy of the movie. For reasons that I'm sure were not entirely technical, <a href=\"https://www.kickstarter.com/projects/559914737/the-veronica-mars-movie-project/posts/777894\">it was only available via Flixster</a>/<a href=\"http://www.flixster.com/ultraviolet/\">UltraViolet</a>\u00b9, so getting access to it involved registering for a new account and jumping through some hoops.</p>\n\n<p>To actually download the movie for offline viewing, Flixster said it needed a \u201cFlixster Desktop\u201d client app. It was served as a ~29 MB .zip file, so it seemed like a straightforward download. I noticed that I was only getting ~ 30K/second download speeds, but I wasn't in a hurry, so I let it run. The download finished, but with only a ~21MB file that was malformed when I tried to expand it. I figured the WiFi of the hotel that we were staying at was somehow messing with the connection, so I tried again while tethered to my phone. I was still getting similarly slow download speeds, and the \u201ccompleted\u201d download was still too small. Since 30K/second was definitely under the expected tethered LTE throughput, I began to suspect Flixster's servers as the root cause. It certainly seemed plausible given that the file was served from <a href=\"http://desktop.flixster.com/mac/FlixsterDesktop.zip\">desktop.flixster.com</a>, which did not seem like a CDN domain\u00b2. I guess <a href=\"https://www.kickstarter.com/projects/559914737/the-veronica-mars-movie-project/posts/775284\">~60,000 fans</a> were enough to DDoS it; from reading <a href=\"http://www.reddit.com/r/veronicamars/comments/20fk07/is_anyone_else_having_trouble_expanding_the/\">a Reddit thread</a>, it seemed like I was not the only one.</p>\n\n<p>The truncated downloads were of slightly different sizes, but it seemed like they finished in similar amounts of time, so I decided to be more scientific and timed the next attempt. It finished in exactly 10 minutes. My hypothesis was now that Flixster's server (or some intermediary) was terminating connections after 10 minutes, regardless of what was being transferred or what state it was in.</p>\n\n<p>Chrome's download manager has a Pause/Resume link, so my next thought was to use it to break up the download into two smaller chunks. After getting the first 10 MB, I paused the download, disconnected the laptop from WiFi (to make sure the connection would not be reused) and then reconnected and tried resuming. Unfortunately, the download never restarted. I did a <code>HEAD</code> request on the file, and since the response headers did not include an <code>Accept-Ranges</code> header, I assumed that the server just didn't support resumable downloads, and that this path was a dead end.</p>\n\n<p>After spending a few minutes trying to find a mirror of the app on <a href=\"http://www.of4shared.com/view-zip/U9s0mgtQ/FlixsterDesktop.html\" rel=\"nofollow\">sketchy download sites</a>, a vague memory of Chrome's download manager <a href=\"https://code.google.com/p/chromium/issues/detail?id=7648\">not actually supporting HTTP range requests</a> came to me. I did some quick tests with curl and saw that if I issued requests with <code>--range</code> parameters I got different results back. So it seemed like despite the lack of <code>Accept-Ranges</code> headers, the server (Apache fronted by Varnish) did in fact support range requests\u00b3.</p>\n\n<p>I therefore downloaded the file in two chunks by using <code>--range 0-10000000</code> and <code>--range 10000000-</code> and concatenated them with <code>cat</code>. Somewhat surprisingly, the resulting zip file was well-formed and expanded correctly. I put a copy of the file in my Dropbox account and shared it on the Reddit thread, it seemed to have <a href=\"http://www.reddit.com/r/veronicamars/comments/20fk07/is_anyone_else_having_trouble_expanding_the/cg2u67d\">helped a few others</a>.</p>\n\n<p>Of course, by the end of all this, I was more excited about having successfully downloaded the client app than getting or watching the movie itself\u2074.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>As opposed to say, iTunes or Amazon.</li>\n<li>Now that I check the download page a day later, it seems to be served from <a href=\"http://static.flixstercdn.com/mac/FlixsterDesktop.zip\">static.flixstercdn.com</a>, so I guess Flixster realized what was going on and fixed the problem.</li>\n<li>A closer reading of <a href=\"http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.5\">section 14.5</a> of the HTTP 1.1 spec showed that servers MAY respond with <code>Accept-Ranges: bytes</code>, but are not required to.</li>\n<li>Downloading the actual movie worked fine, I assume it was distributed over a CDN and thus wasn't quite so easily overwhelmed. </li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/7Xg_LhWHv8g\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1394941680.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1401978766.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/076d7e7358cb4652", 
                "categories": [], 
                "title": "Finding Messages Explicitly Marked as Spam in Gmail", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/QnNRy1LQ5Pg/finding-messages-explicitly-marked-as.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1391210160000000.0", 
                "content": {
                    "content": "<p><b>tl;dr:</b> Search Gmail for \u201c<code>is:spam -label:^os</code>\u201d to find messages that you manually marked as spam (as opposed to ones that Gmail automatically marked for you).</p>\n\n<p>Gmail recently <a href=\"http://www.theverge.com/2014/1/28/5355818/gmail-bug-made-some-users-accidentally-delete-emails\">had a bug</a> where some emails were accidentally moved to the trash or marked as spam. Google \u201cencouraged\u201d users that might have been affected to check their trash and spam folders for any messages that didn't belong. Since I get a lot of spam (one of the perks of having <a href=\"https://www.google.com/search?q=mihai%40mscape.com\">the same email address</a> since 1996), I didn't relish the thought of going through thousands of messages to see if any of them were mislabeled\u00b9.</p>\n\n<p>I figured that Gmail must keep track of which messages were explicitly marked as spam by the user versus one that it automatically classifies (though I get a lot of spam, almost all of it is caught by Gmail's filters). Gmail (<a href=\"https://github.com/mihaip/readerisdead/blob/master/base/tag_helper.py#L7\">like Google Reader</a>) keeps track of per-message state via internal system labels. For example, others have discovered that Gmail's <a href=\"http://googlesystem.blogspot.com/2013/04/new-gmail-smart-labels.html\">Smart Labels</a> are represented as <code>^smartlabel_<i>type</i></code> labels while <a href=\"http://googlesystem.blogspot.com/2008/07/gmail-superstars.html\">Superstars</a> uses names like <code>^ss_sy</code>. Indeed, if you try to use a caret in a label name, Gmail says that it is not allowed.</p>\n\n<p>It therefore seemed like a reasonable assumption that there was a system label that would tell us how a message came to be marked as spam. The problem was to figure out what it was called.</p>\n\n<p>Thinking back to Reader (where all label operations went through an edit-tag HTTP API call, which listed the labels to added or removed), I figured I would see what the request was when marking a message as spam. Unfortunately, it looked like Gmail's requests were of slightly higher abstraction level, where marking a message as spam would send a request with an act=sp parameter (while marking as read uses act=rd, and so on).</p>\n\n<p>I then figured I should look at HTTP response when loading the spam folder. There appeared to be a bunch of system label names associated with each message. One that I explicitly marked as spam had the labels:</p>\n\n<p><code>\"^a\", \"^ad_1391126400000\", \"^all\", \"^bsm\",\" ^clu_group\", \"^clu_unim\", \"^cob-processed-gmr\", \"^cob_pevent\", \"^oc_group\", \"^os_group\", \"^s\", \"^smartlabel_group\", \"^u\"</code></p>\n\n<p>Meanwhile, another that had been automatically marked as spam used:</p>\n\n<p><code>\"^ad_1391126400000\", \"^all\",\" ^bsm\", \"^clu_notification\", \"^cob-processed-gmr\", \"^oc_notification\", \"^os\", \"^os_notification\", \"^s\", \"^smartlabel_notification\", \"^u\u201d</code></p>\n\n<p><code>^s</code> was present on all of them, and indeed doing a search for <code>label:^s</code> shows all spam messages (and the UI rewrites the search to <code>in:spam</code>). Others could also be puzzled out based on name, for example <code>^u</code> is for unread messages. The more mysterious ones like <code>^cob_pevent</code> I figured I could ignore\u00b2.</p>\n\n<p>After looking at a bunch of messages, both automatically and manually marked as spam, <code>^os</code> stood out. It only seemed to be present on messages that Gmail itself had decided were spam. Doing the search <code>is:spam -label:^os</code> seemed to show only messages that I had marked as spam. Indeed, each of the messages in the result displayed the header: \"Why is this message in Spam? You clicked 'Report spam' for this message.\" Thus I was able to go through the much shorter list and see if any where mistakenly marked (they weren't).</p>\n\n<p>Seeing the plethora of labels that were present on all messages, I got curious what other internal labels there were. Between examining HTTP responses, looking through Gmail's JavaScript for strings that start with <code>^</code> and <a href=\"https://gist.github.com/mihaip/8727429\">a simple dictionary attack</a> for two-letter names, here's some others that I've found (those that are marked as \u201cunknown\u201d are ones that match some messages in my account, but with no apparent pattern):</p>\n\n<ul>\n<li><code>^a</code>: archived conversations</li>\n<li><code>^b</code>: chat transcripts (equivalent to <code>is:chat</code>, presumably the \u201cb\u201d is for \u201cBuzz\u201d, Google Talk's codename)</li>\n<li><code>^f</code>: sent messages (equivalent to <code>is:sent</code>)</li>\n<li><code>^g</code>: muted conversations (equivalent to <code>is:muted</code>, the \u201cg\u201d is most likely for \u201cignore\u201d)</li>\n<li><code>^i</code>: inbox (equivalent to <code>in:inbox</code>)</li>\n<li><code>^k</code>: trashed messages (equivalent to <code>in:trash</code>, unclear why \u201ck\u201d is the abbreviation)</li>\n<li><code>^o</code>: unknown</li>\n<li><code>^p</code>: messages that were marked as phishing attempts</li>\n<li><code>^r</code>: drafts (equivalent to <code>is:draft</code>)</li>\n<li><code>^s</code>: spam (equivalent to <code>is:spam</code>)</li>\n<li><code>^t</code>: starred messages (equivalent to <code>is:starred</code>, the \u201ct\u201d is most likely for \u201cto do\u201d)</li>\n<li><code>^u</code>: unread messages (equivalent to <code>is:unread</code>)</li>\n<li><code>^ac</code>: Google Buzz messages (equivalent to <code>is:buzz</code>)</li>\n<li><code>^act</code>: Google Buzz messages (unclear how it's different from <code>^ac</code>)</li>\n<li><code>^af</code>: unknown</li>\n<li><code>^bc</code>: unknown subset of chat transcripts</li>\n<li><code>^p_cc</code>: another unknown subset of chat transcripts</li>\n<li><code>^fs</code>: unknown</li>\n<li><code>^ia</code>: unknown</li>\n<li><code>^ii</code>: unknown</li>\n<li><code>^im</code>: unknown</li>\n<li><code>^iim</code>: Priority Inbox (based on <a href=\"https://developers.google.com/gmail/android/com/google/android/gm/contentprovider/GmailContract.Labels.LabelCanonicalNames#CANONICAL_NAME_PRIORITY_INBOX\">Android's documentation</a>)</li>\n<li><code>^mf</code>: unknown</li>\n<li><code>^np</code>: unknown</li>\n<li><code>^ns</code>: unknown</li>\n<li><code>^bsm</code>: unknown</li>\n<li><code>^op</code>: messages that were automatically marked as phishing attempts</li>\n<li><code>^os</code>: messages that were automatically marked as spam</li>\n<li><code>^vm</code>: Google Voice voicemails (equivalent to <code>is:voicemail</code>)</li>\n<li><code>^pop</code>: unknown, seems to match some (very old messages) that I imported via POP</li>\n<li><code>^ss_sy</code>, <code>^ss_so</code>, <code>^ss_sr</code>, <code>^ss_sp</code>, <code>^ss_sb</code>, <code>^ss_sg</code>, <code>^ss_cr</code>, <code>^ss_co</code>, <code>^ss_cy</code>, <code>^ss_cg</code>, <code>^ss_cb</code>, <code>^ss_cp</code>: Superstar stars</li>\n<li><code>^sl_root</code>, <code>^smartlabel_promo</code>, <code>_receipt</code>, <code>_travel</code>, <code>_event</code>, <code>_group</code>, <code>_newsletter</code>, <code>_notification</code>, <code>_personal</code>, <code>_social</code>, <code>_receipt</code> and <code>_finance</code>: Smart Labels</li>\n<li><code>^io_im</code>: important messages (equivalent to is:important)</li>\n<li><code>^io_imc1</code> through <code>^io_imc5</code>, <code>^io_lr</code>: unknown, possibly more degrees of importance (\u201cInfo Overload\u201d was the project that resulted in the importance filtering)</li>\n<li><code>^clu_unim</code>: unknown, possibly unimportant messages</li>\n<li><code>^unsub</code> and <code>^hunsub</code>: messages where an unsubscribe link has been detected (when marking one as spam, the \u201cIn addition to marking this message as spam, you can unsubscribe...\u201d dialog appears). <code>^unsub</code> seems to be for messages where there's an unsubscribe link you have to click while <code>^hunsub</code> is for ones where Gmail offers to unsubscribe on your behalf.</li>\n<li><code>^cff</code>: sender is in a Google+ circle (equivalent to <code>has:circle</code>)</li>\n<li><code>^sps</code>: unknown (no matches in my account, but it was referenced in the JavaScript next to <code>^p</code>, if I had to guess I would say it's something related to <a href=\"http://www.wired.com/threatlevel/2011/06/gmail-hack/\">spear phishing</a>)</li>\n<li><code>^p_esnotif</code>: Google+ notifications (\"es\" presumably being \"Emerald Sea\", <a href=\"http://www.wired.com/business/2011/06/inside-google-plus-social/\">Google+'s code name</a>)</li>\n</ul>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>Of course, in deciding to automate this task, I <a href=\"https://xkcd.com/1319/\">doomed myself</a> to spend more time that I would have if I'd just gone through the messages by hand.</li>\n<li>It's somewhat interesting to see how features that were developed later (like Smart Labels \u2014 <code>^smartlabel_group</code>) use longer system label names than ones of medium age (like Superstars \u2014 <code>^ss_sy</code>) which are in turn longer than the original system labels (<code>^u</code> for unread, etc.). Bytes <a href=\"http://googlepress.blogspot.com/2004/04/google-gets-message-launches-gmail.html\">10 years ago</a> were clearly more precious.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/QnNRy1LQ5Pg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1391210160.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1419344342.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/c6177d2dfb1f492d", 
                "categories": [], 
                "title": "JavaScript Array Sorting Performance Puzzler", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/-cRdfOphXf8/javascript-array-sorting-performance.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1390264200000000.0", 
                "content": {
                    "content": "<p>I recently fixed a small performance problem in <a href=\"https://quip.com/\">Quip</a>. Since it ended up being yet another tidbit in my mile-long list of factoids that are necessary to keep in your head when doing web development, I thought I would write up the process.</p>\n\n<p>To implement search-as-you-type for contacts, documents, etc., Quip maintains a sorted array of index terms. Occasionally, this index needs to be updated on the client (for example, when a new contact is added). I noticed that the index updates were taking longer than expected, to the point where they were impacting typing latency if they happened at the wrong time.</p>\n\n<p>As initially implemented the index update involving making the additions and modifications to the array, and then re-sorting it. It was the sort operation that was taking a while: up to a few hundred milliseconds in the case of an index with 10,000 terms. Given that in the grand scheme of things that is not a very big array and the sort was pure computation (with no need to touch the DOM or otherwise do anything expensive) that was surprising.</p>\n\n<p>To be a bit more specific, the array that was being re-sorted was of the form:</p>\n<pre class=\"prettyprint\">[\n    [\"termA\", [\"id1\", \"id2\", ...],\n    [\"termB\", [\"id7\", \"id9\", ...],\n    ...\n]</pre>\n\n<p>I've created <a href=\"http://jsperf.com/array-sorting-puzzler\">a jsPerf test case</a> that simulates it (<code>array1</code> in the setup code). On my machine that test runs at 4.23 runs/second, which works out to 236ms, which lines up well with that I was seeing within the Quip codebase.</p>\n\n<p>My first guess was that the fact that the array was nearly in sorted order already was somehow triggering some pathological behavior in v8's sort implementation. I tested this guess by shuffling the array (<code>array</code> in the jsPerf test case), but sorting time was not affected. From <a href=\"https://code.google.com/p/v8/source/browse/trunk/src/array.js#945\">reading the source</a> this makes sense \u2014 for large arrays v8 uses Quicksort where the pivot point is picked as the median of the first, middle and last elements, thus it should still have O(N log N) running time regardless of the input's ordering.</p>\n\n<p>I then wondered if the fact that the array members were arrays themselves was a factor. I created a simplified test case (<code>array3</code> in the jsPerf test case) where the term was used as the array member directly, instead of being the first element in a sub-array. This resulted in significantly higher speeds (163 runs/second or 6.1ms). That was a bit surprising, since the effective thing being compared should have been the same (the terms were all unique, thus the list of IDs should not be a factor in the sorting).</p>\n\n<p>I then decided to <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description\">read the documentation</a> a bit more carefully, which said \u201cIf [a comparator] is not supplied, elements are sorted by converting them to strings and comparing strings in lexicographic order.\u201d\u00b9 Though that behavior did result in a correct sort order, it did mean that each comparison involved the stringification of each of the sub-arrays, which meant a lot of needless memory allocations and computations.</p>\n\n<p>Changing the sort to use a very simple comparator (<code>function (a, b) { return a[0] &lt; b[0] ? -1 : (a[0] &gt; b[0] ? 1 : 0); }</code>, see \u201c<code>array1</code> with comparator\u201d on jsPerf) resulted in 302 runs/second, or 3.3ms. This was more inline with my expectations. Mystery solved.</p>\n\n<p>Though as it turned out, in Quip's specific case, this optimization ended up not being needed, since I removed the need for the re-sorting altogether. It was instead more efficient to do an in-place modification or insertion in the right spot into the array. The correct index can be determined via binary search (i.e. O(log N)) and the insertion may involve O(N) operations to move the other array elements around, but that's still better than then O(N log N) of the re-sort.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>This default behavior also explains the <a href=\"https://twitter.com/iamdevloper/status/421279034124013568\">seemingly non-intuitive result</a> when sorting an array of numbers without a comparator.</li>\n</ol>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/-cRdfOphXf8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1390264200.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1420555343.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/1f38357915b7433e", 
                "categories": [], 
                "title": "A Faster UIWebView Communication Mechanism", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/3IgpMSUAdqw/a-faster-uiwebview-communication.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1382148060000000.0", 
                "content": {
                    "content": "<p><b>tl;dr: </b>Use <code>location.hash</code> (instead of <code>location.href</code> or the <code>src</code> attribute of iframes) to do fast synthetic navigations that trigger a <code>UIWebViewDelegate</code>'s <code>webView:shouldStartLoadWithRequest:navigationType:</code> method.</p>\n\n<p>As <a href=\"http://blog.persistent.info/2013/10/programmatically-accepting-keyboard.html\">previously mentioned</a>, <a href=\"https://quip.com\">Quip</a>'s editor on iOS is implemented using a <code>UIWebView</code> that wraps a <code>contentEditable</code> area. The editor needs to communicate with the containing native layer for both big (document data in and out) and small (update toolbar state, accept or dismiss auto-corrections, etc.) things. While <code>UIWebView</code> provides an officially sanctioned mechanism for getting data into it (<a href=\"https://developer.apple.com/library/ios/documentation/uikit/reference/UIWebView_Class/Reference/Reference.html#//apple_ref/occ/instm/UIWebView/stringByEvaluatingJavaScriptFromString:\"><code>stringByEvaluatingJavaScriptFromString</code></a>\u00b9), there is no counterpart for getting data out. The most commonly used <a href=\"http://stackoverflow.com/a/1662762/343108\">workaround</a> is to have the JavaScript code trigger a navigation to a synthetic URL that encodes the data, intercept it via the <a href=\"https://developer.apple.com/library/ios/documentation/uikit/reference/UIWebViewDelegate_Protocol/Reference/Reference.html#//apple_ref/occ/intfm/UIWebViewDelegate/webView:shouldStartLoadWithRequest:navigationType:\"><code>webView:shouldStartLoadWithRequest:navigationType:</code></a> delegate method and then extract the data out of the request's URL\u00b2.</p>\n\n<p>The workaround did allow us to communicate back to the native Objective-C code, but it seemed to be higher latency than I would expect, especially on lower-end devices like the iPhone 4 (where it was several milliseconds). I decided to poke around and see what happened between the synthetic URL navigation happening and the delegate method being invoked. Getting a stack from the native side didn't prove helpful, since the delegate method was invoked via <a href=\"https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/Classes/NSInvocation_Class/Reference/Reference.html\"><code>NSInvocation</code></a> with not much else on the stack beyond the event loop scaffolding. However, that did provide a hint that the delegate method was being invoked after some spins of the event loop, which perhaps explained the delays.</p>\n\n<p>On the JavaScript side, we were triggering the navigation by setting the <code>location.href</code> property. By starting at the <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/page/Location.cpp#L146\">WebKit implementation of that setter</a>, we end up in <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/page/DOMWindow.cpp#L1753\"><code>DOMWindow::setLocation</code></a>, which in turn uses <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/loader/NavigationScheduler.cpp#L340\"><code>NavigationScheduler::scheduleLocationChange</code></a>\u00b3. As the name \u201cscheduler\u201d suggests, this class requests navigations to happen sometime in the future. In the case of explicit location changes, <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/loader/NavigationScheduler.cpp#L168\">a delay of 0</a> is used. However, 0 doesn't mean \u201cimmediately\u201d: a timer is still installed, and WebKit waits for it to fire. That involves at least one spin of the event loop, which may be a few milliseconds on a low-end device.</p>\n\n<p>I decided to look through the WebKit source to see if there were other JavaScript-accessible ways to trigger navigations that didn't go through <code>NavigationScheduler</code>. Some searching turned up the <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/html/HTMLAnchorElement.cpp#L523\"><code>HTMLAnchorElement::handleClick</code></a> method, which invoked <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/loader/FrameLoader.cpp#L302\"><code>FrameLoader::urlSelected</code></a> directly (<code>FrameLoader</code> being the main entrypoint into WebKit's URL loading). In turn, the anchor <code>handleClick</code> method can be directly invoked from the JavaScript side by dispatching a <code>click</code> event (most easily done via the <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.click\"><code>click()</code></a> method). Thus it seemed like an alternate approach would be to create a dummy link node, set its <code>href</code> attribute to the synthetic URL, and simulate a click on it. More work than just setting the <code>location.href</code> property, but perhaps it would be faster since it would avoid spinning the event loop.</p>\n\n<p>Once I got that all hooked up, I could indeed see that everything was now running slightly faster, and synchronously too \u2014 here's a stack trace showing native-to-JS-to-native communication:</p>\n\n<pre>\n #0: TestBed`-[BenchmarkViewController endIteration:]\n #1: TestBed`-[BenchmarkViewController webView:shouldStartLoadWithRequest:navigationType:]\n #2: UIKit`-[UIWebView webView:decidePolicyForNavigationAction:request:frame:decisionListener:]\n...\n#17: WebCore`WebCore::FrameLoader::urlSelected(...)\n...\n#23: WebCore`WebCore::jsHTMLElementPrototypeFunctionClick(...)\n#24: 0x15e8990f\n#25: JavaScriptCore`JSC::Interpreter::execute(...)\n...\n#35: UIKit`-[UIWebView stringByEvaluatingJavaScriptFromString:]\n#36: TestBed`-[BenchmarkViewController startIteration]\n...\n</pre>\n\n<p>More recently, I took a more systematic approach in evaluating this and other communication mechanisms. I created <a href=\"https://github.com/mihaip/web-experiments/tree/master/webview-communication\">a simple test bed</a> and gathered timings (measured in milliseconds) from a few devices (all running iOS 7):</p>\n\n<table frame=\"box\" rules=\"all\">\n  <thead>\n    <tr>\n      <th>Method/Device</th>\n      <th>iPhone 4<br />A4</th>\n      <th>iPad Mini<br />A5</th>\n      <th>iPhone 5<br />A6</th>\n      <th>iPhone 5s<br />A7</th>\n      <th>Simulator<br />2.7 GHz Core i7</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><b>location.href</b></td>\n      <td>3.88</td>\n      <td>2.01</td>\n      <td>1.31</td>\n      <td>0.84</td>\n      <td>0.22</td>\n    </tr>\n    <tr>\n      <td><b>&lt;a&gt; click</b></td>\n      <td>1.50</td>\n      <td>0.87</td>\n      <td>0.58</td>\n      <td>0.40</td>\n      <td>0.13</td>\n    </tr>\n    <tr style=\"color: #2384d1;\">\n      <td><b>location.hash</b></td>\n      <td>1.42</td>\n      <td>0.86</td>\n      <td>0.55</td>\n      <td>0.39</td>\n      <td>0.13</td>\n    </tr>\n    <tr>\n      <td><b>frame.src</b></td>\n      <td>3.52</td>\n      <td>1.86</td>\n      <td>1.16</td>\n      <td>0.87</td>\n      <td>0.29</td>\n    </tr>\n    <tr>\n      <td><b>XHR sync</b></td>\n      <td>8.66</td>\n      <td>3.25</td>\n      <td>2.19</td>\n      <td>1.34</td>\n      <td>0.45</td>\n    </tr>\n    <tr>\n      <td><b>XHR async</b></td>\n      <td>6.38</td>\n      <td>2.32</td>\n      <td>1.62</td>\n      <td>1.00</td>\n      <td>0.33</td>\n    </tr>\n    <tr>\n      <td><b>document.cookie</b></td>\n      <td>2.89</td>\n      <td>1.22</td>\n      <td>0.78</td>\n      <td>0.55</td>\n      <td>0.16</td>\n    </tr>\n    <tr style=\"color: #d18423;\">\n      <td><b>JavaScriptCore</b></td>\n      <td>0.33</td>\n      <td>0.18</td>\n      <td>0.14</td>\n      <td>0.09</td>\n      <td>0.03</td>\n    </tr>\n  </tbody>\n</table>\n\n<p>The mechanisms are as follows:</p>\n\n<ul>\n<li><b>location.href</b>: Setting the <code>location.href</code> property to a synthetic URL.</li>\n<li><b>&lt;a&gt; click</b>: Simulating clicking on an anchor node that has the synthetic URL set as its <code>href</code> attribute.</li>\n<li><b>location.hash</b>: Setting the <code>location.hash</code> property to a the data encoded as a fragment. The reason why it's faster than replacing the whole URL is because same-page navigations are <a href=\"http://trac.webkit.org/browser/trunk/Source/WebCore/loader/NavigationScheduler.cpp#L351\">executed immediately</a> instead of being scheduled (thanks to <a href=\"https://twitter.com/wkiefer/status/391277512027672576\">Will Kiefer</a> for telling me about this). In practice this turns out to be even faster than <code>&lt;a&gt; click</code> since the latter fires a click event, which results in <a href=\"http://trac.webkit.org/browser/trunk/Source/WebKit/mac/WebCoreSupport/WebFrameLoaderClient.mm?rev=177484#L1541\">a hit target being computed</a>, which forces layout.</li>\n<li><b>frame.src:</b> Setting the <code>src</code> property of a newly-created iframe. Based on examining the <code>chrome.js</code> file inside the <a href=\"http://www.google.com/intl/en/chrome/browser/mobile/ios.html\">Chrome for iOS</a> <code>.ipa</code>, this is the approach that it uses to communicate: it creates an iframe with a <code>chromeInvoke://...</code> <code>src</code> and appends it to the body (and immediately removes it). This approach does also trigger the navigation synchronously, but since it modifies the DOM the layout is invalidated, so repeated invocations end up being slower.</li>\n<li><b>XHR sync/async:</b> <code>XMLHttpRequest</code>s that load a synthetic URL, either synchronously or asynchronously; on the native side, the load is intercepted via a <a href=\"https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/Classes/NSURLProtocol_Class/Reference/Reference.html\"><code>NSURLProtocol</code></a> subclass. This is the approach that <a href=\"http://cordova.apache.org/\">Apache Cordova</a>/<a href=\"http://phonegap.com/\">PhoneGap</a> prefers: it <a href=\"https://github.com/apache/cordova-ios/blob/82d16e52698836923033832e8abcb5da410f14c3/CordovaLib/cordova.js#L952\">sends an <code>XMLHttpRequest</code></a> that is intercepted via <a href=\"https://github.com/apache/cordova-ios/blob/82d16e52698836923033832e8abcb5da410f14c3/CordovaLib/Classes/CDVURLProtocol.m#L154\"><code>CDVURLProtocol</code></a>.This also ends up being slower because the <code>NSURLProtocol</code> methods are invoked on a separate thread and it has to jump back to the main thread to invoke the endpoint methods.</li>\n<li><b>document.cookie: </b>Having the JavaScript side set a cookie and then being notified of that change via <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSHTTPCookieStorage_Class/Reference/Reference.html#NSHTTPCookieManagerCookiesChangedNotification\"><code>NSHTTPCookieManagerCookiesChangedNotification</code></a>. I'm not aware of anyone using this approach, but the idea came to me when I thought to look for other properties (besides the URL) that change in a web view which could be observed on the native side. Unfortunately the notification is triggered asynchronously, which explains why it's still not as fast as the simulated click.</li>\n<li><b>JavaScriptCore: </b> Direct communication via a <code>JSContext</code> using <a href=\"https://github.com/TomSwift/UIWebView-TS_JavaScriptContext\">Nick Hodapp's mechanim</a>. Note that this approach involves adding a category on <code>NSObject</code> to implement a <a href=\"https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Webkit/Protocols/WebFrameLoadDelegate_Protocol/Reference/Reference.html\"><code>WebFrameLoadDelegate</code></a> protocol method that is not present on iOS. Though the approach degrades gracefully (if Apple ever provides an implementation for that method, their implementation will be used), it still relies on enough internals and \"private\" APIs that it doesn't seem like a good idea to ship an app that uses it. This result is only presented to show the performance possibilities if a more direct mechanism were officially exposed.</li>\n</ul>\n\n<p>My tests show the <code>location.hash</code> and synthetic click approaches consistently beating <code>location.href</code> (and all other mechanisms), and on low-end devices they're more than twice as fast. One might think that a few milliseconds would not matter, but when responding to user input and doing several such calls, the savings can add up\u2074.</p>\n\n<p>Quip has been using the <code>location.hash</code> mechanism for more than a year, and so far with no ill effects. There a few things to keep in mind though:</p>\n<ul>\n<li>Repeatedly setting <code>location.href</code> in the same spin of the event loop results in only the final navigation happening. Since the  <code>location.hash</code> changes (and synthetic clicks) are processed immediately, they will all result in the delegate being invoked. This is generally desirable, but you may have to check for reentrancy since <code>stringByEvaluatingJavaScriptFromString</code> is synchronous too.</li>\n<li>For synthetic clicks, changing the <code>href</code> attribute of the anchor node would normally invalidate the layout of the page. However, you can avoid this by not adding the node to the document when creating it.</li>\n<li>Additionally, not having the anchor node in the document also avoids triggering any global <code>click</code> event handlers that you have have registered.</li></ul>\n\n<p>I was very excited when iOS 7 shipped public access to the <a href=\"http://blog.bignerdranch.com/3784-javascriptcore-and-ios-7/\"><code>JavaScriptCore</code> framework</a>. My hope was that this would finally allow something like Android's <a href=\"http://developer.android.com/guide/webapps/webview.html#BindingJavaScript\"><code>@JavaScriptInterface</code> mechanism</a>, which allows easy exposure of arbitrary native methods to JavaScript. However, <code>JavaScriptCore</code> is only usable in standalone JavaScript VMs; it cannot (officially\u2075) be pointed at a <code>UIWebView</code>'s. Thus it looks like we'll be stuck with hacks such as this one for another year.</p>\n\n<p><strong>Update on 1/12/2014:</strong> Thanks to a <a href=\"https://github.com/mihaip/web-experiments/pull/1\">pull request</a> from <a href=\"https://github.com/fe9lix\">Felix Raab</a>, the post was updated showing the performance of direct communication via <code>JavaScriptCore</code>.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>I used to think that this method name was preposterously long. Now that I've been exposed to Objective-C (and Apple's style) more, I find it perfectly reasonable (and the names that I choose for my own code have also gotten longer too). Relatedly, I do like Apple's consistency for <code>will*</code> vs. <code>did*</code> in delegate method names, and I've started to adopt that for JavaScript too.</li>\n<li>There are also more exotic approaches possible, for example LinkedIn experimented with WebSockets and is (was?) using <a href=\"http://arstechnica.com/information-technology/2012/10/a-behind-the-scenes-look-at-linkedins-mobile-engineering/2/\">a local HTTP server</a>.</li>\n<li>Somewhat coincidentally, <code>NavigationScheduler</code> is where I made one of my <a href=\"http://trac.webkit.org/changeset/64408\">first WebKit contributions</a>. Though back then it was <a href=\"http://trac.webkit.org/changeset/69039\">known as <code>RedirectScheduler</code></a>.</li>\n<li>As Brad Fitzpatrick <a href=\"https://plus.google.com/111567061469336027617/posts/UWNUsiqT6Dd\">pointed out on Google+</a>, a millisecond is still a long time for what is effectively two function calls. The most overhead appears to come from evaluating the JS snippet passed to <code>stringByEvaluatingJavaScriptFromString</code>, followed by constructing the HTTP request that is passed to <code>webView:shouldStartLoadWithRequest:navigationType:</code>.</li>\n<li>In addition to <a href=\"https://github.com/TomSwift/UIWebView-TS_JavaScriptContext\">implementing a <code>WebFrameLoadDelegate</code> method</a>, another way of getting at a <code>JSContext</code> is <a href=\"http://blog.impathic.com/post/64171814244/true-javascript-uiwebview-integration-in-ios7\">via KVO to look up a private property</a>. The latter is in some ways more direct and straightforward, but it seems even more likely to run afoul of App Store review guidelines.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/3IgpMSUAdqw\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1382148060.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/PersistentInfo", 
                    "htmlUrl": "http://blog.persistent.info/", 
                    "title": "persistent.info"
                }, 
                "updated": 1419344394.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/cfb0de9115e148d3", 
                "categories": [], 
                "title": "Programmatically accepting keyboard auto-corrections on iOS", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/PersistentInfo/~3/niBT-AF6GwE/programmatically-accepting-keyboard.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1381193640000000.0", 
                "content": {
                    "content": "<p><b>tl;dr:</b> To programatically accept keyboard auto-corrections on iOS, call <code>reloadInputViews</code> on the first (current) <code>UIResponder</code>.</p>\n\n<p><a href=\"https://quip.com/\">Quip</a>'s document editor is implemented via <a href=\"http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#editing-0\"><code>contentEditable</code></a>. This is true not just for the desktop web version, but also for the iOS and Android apps. So far, this has been a good way of getting basic editing behavior from the browser for \u201cfree\u201d on all platforms while also having enough control to customize it for Quip's specific needs.</p>\n\n<p>One area where mobile editing behavior differs from the desktop is in the interaction with the auto-correction mechanisms that on-screen keyboards have. Normally auto-corrections are transparent to web content, but Quip needs to override the behavior of some key events, most notably for the return key. Since the return key also accepts the auto-correction, we needed a way to accept the auto-correction without actually letting the key event be processed by the <code>contentEditable</code> layer or the browser in general\u00b9.</p>\n\n<p><a href=\"http://www.kevgibbs.com/\">Kevin</a> did some research into programmatically accepting auto-corrections, and it turned out that this could be done by<a href=\"http://stackoverflow.com/questions/4611525/execute-current-uitextfield-autocorrect-suggestion-when-another-button-is-presse\"> temporarily swapping the <code>firstResponder</code></a>. He implemented this (though most of the editor is in JavaScript, we do judiciously punch holes\u00b2 to native side where needed) and all was well.</p>\n\n<p>However, a few months later, when we started to test Quip with the iOS 7 betas, we noticed that accepting auto-corrections no longer worked. Kevin went once more unto the breach. He observed that the next/previous form element buttons that iOS places above web keyboards (that we normally hide) also had the side-effect of accepting auto-corrections. He thus implemented an alternate mechanism on iOS 7 that simulated advancing to a dummy form elements and the going back.</p>\n\n<p>Once the initial iOS 7 release was out the door and we had some time to regroup (and I had a <a href=\"http://twitter.com/CaltrainGrump\">train ride</a> that I could dedicate to this), I thought I would look more into this problem, to see if I could understand what was happening better. The goal was to stop having two divergent code paths, and ideally find a mechanism with fewer side effects (switching the <code>firstResponder</code> resulted in the keyboard being detached from the <code>UIWebView</code>, which would sometimes affect its scroll offset).</p>\n\n<p>The first step was to better understand how the iOS 6 and 7 mechanisms worked. Stepping through them with a debugger seemed tedious, but I guessed that a <a href=\"https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/Classes/NSNotificationCenter_Class/Reference/Reference.html\">notification</a> would be sent as part of the accept happening. I therefore added a listener that logged all notifications:</p>\n\n<pre class=\"prettyprint\">\n[NSNotificationCenter.defaultCenter addObserverForName:nil\n                                                object:nil\n                                                 queue:nil\n                                            usingBlock:^(NSNotification *notification) {\n    NSLog(@\"notification: %@, info: %@\", notification.name, notification.userInfo);\n}];\n</pre>\n\n<p>This logged a lot of other unrelated notifications, but there was something that looked promising:</p>\n\n<pre class=\"prettyprint\">\nnotification: UIViewAnimationDidCommitNotification, info: {\n    delegate = \"&lt;UIKeyboardImpl: 0xea33dd0; frame = (0 0; 320 216); opaque = NO; layer = &lt;CALayer: 0xea2bd80&gt;&gt;\";\n    name = UIKeyboardAutocorrection;\n}\n</pre>\n\n<p>This looks like a (private) notification that is sent when the <a href=\"https://developer.apple.com/library/ios/documentation/windowsviews/conceptual/viewpg_iphoneos/animatingviews/animatingviews.html\">animation</a> that shows the auto-correction is being committed. Since committing of animations happens synchronously, whatever triggered the accept must still be on the stack. I therefore changed the listener to be more specific:</p>\n\n<pre class=\"prettyprint\">\n[NSNotificationCenter.defaultCenter addObserverForName:@\"UIViewAnimationDidCommitNotification\"\n                                                object:nil\n                                                 queue:nil\n                                            usingBlock:^(NSNotification *notification) {\n    if (notification.userInfo && [@\"UIKeyboardAutocorrection\" isEqualToString:notification.userInfo[@\"name\"]]) {\n        NSLog(@\"commited auto-correction animation\");\n    }\n}];\n</pre>\n\n<p>The log statement isn't that interesting in and of itself, but I used it as a place to add a breakpoint to it that <a href=\"http://stackoverflow.com/a/9517311/343108\">logs the callstack</a>\u00b3. Now I could see how accepting auto-corrections on iOS 6 worked (where we made a dummy <code>UITextView</code> become the first responder). That had a stack of the form:</p>\n\n<pre>\n....\n#11: UIKit`-[UIKeyboardImpl acceptAutocorrection] + 141\n#12: UIKit`-[UIKeyboardImpl setDelegate:force:] + 377\n#13: UIKit`-[UIKeyboardImpl setDelegate:] + 48\n#14: UIKit`-[UIPeripheralHost(UIKitInternal) _reloadInputViewsForResponder:] + 609\n#15: UIKit`-[UIResponder(UIResponderInputViewAdditions) reloadInputViews] + 175\n#16: UIKit`-[UIResponder(Internal) _windowBecameKey] + 110\n#17: UIKit`-[UIWindow _makeKeyWindowIgnoringOldKeyWindow:] + 343\n<span style=\"color: #2384d1;\">#18: UIKit`-[UIWindow makeKeyWindow] + 41</span>\n#19: UIKit`+[UIWindow _pushKeyWindow:] + 83\n#20: UIKit`-[UIResponder becomeFirstResponder] + 683\n#21: UIKit`-[UITextView becomeFirstResponder] + 385\n...\n</pre>\n\n<p>Whereas on iOS 7, where we accepted it by hijacking the next/previous form control accessory buttons the path was:</p>\n\n<pre>\n...\n#12: UIKit`-[UIKeyboardImpl acceptAutocorrection] + 197\n#13: UIKit`-[UIKeyboardImpl setDelegate:force:] + 534\n#14: UIKit`-[UIKeyboardImpl setDelegate:] + 48\n#15: UIKit`-[UIPeripheralHost(UIKitInternal) _reloadInputViewsForResponder:] + 374\n<span style=\"color: #2384d1;\">#16: UIKit`-[UIResponder(UIResponderInputViewAdditions) reloadInputViews] + 287</span>\n#17: UIKit`-[UIWebBrowserView assistFormNode:] + 265\n#18: UIKit`-[UIWebBrowserView accessoryTab:] + 110\n#19: UIKit`-[UIWebFormAccessory _nextTapped:] + 50\n...\n</pre>\n\n<p><code>UIKeyboardImpl</code>'s <code>acceptAutocorrection</code> was the holy grail, but as a private API it may not be used \u2014 what I was looking for in these stack traces was a publicly callable method. A close reading (see the frames highlighted in blue) showed that there were (at least) two different triggers for accepting the auto-correction:</p>\n\n<ol>\n<li>The \"key\" <code>UIWindow</code> changing (the key window is the one that's receiving keyboard events)</li>\n<li>The <a href=\"https://developer.apple.com/library/ios/documentation/uikit/reference/UIResponder_Class/Reference/Reference.html#//apple_ref/occ/instm/UIResponder/reloadInputViews\"><code>UIResponder.reloadInputViews</code></a> method (input (accessory) views are <a href=\"https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/InputViews/InputViews.html\">additions</a> to the keyboard)</li>\n</ol>\n\n<p>It therefore seemed worthwhile to try to trigger either one more directly. Looking at the <code>UIApplication.sharedApplication.windows</code> list, I saw that there were two windows (in addition to the main window, there was another of type <code>UITextEffectsWindow</code>, another private class). I could therefore simulate the key window changing by switching between them:</p>\n\n<pre class=\"prettyprint\">\nUIWindow *keyWindow = UIApplication.sharedApplication.keyWindow;\nUIWindow *otherWindow = nil;\nfor (UIWindow *window in UIApplication.sharedApplication.windows) {\n    if (window != keyWindow) {\n        otherWindow = window;\n        break;\n    }\n}\nif (otherWindow) {\n    [keyWindow resignKeyWindow];\n    [otherWindow makeKeyWindow];\n    [keyWindow makeKeyWindow];\n}\n</pre>\n\n<p>That worked! But there was also the other approach to investigate. To call <code>reloadInputViews</code>, I needed to find the current first responder (it's not necessarily the <code>UIWebView</code> itself). I accomplished that by <a href=\"http://stackoverflow.com/a/8772487/343108\">walking through the view hierarchy</a> to find it. Sure enough, the first responder was a (private) <code>UIWebBrowserView</code> class and calling <code>reloadInputViews</code> on it accepted the correction.</p>\n\n<p>Of the two approaches, the <code>reloadInputViews</code> approach seemed preferable, since it relied the least on undocumented behavior. The other approach assumed that there is always another <code>UIWindow</code> present, which doesn't necessarily seem safe, especially since the <a href=\"https://developer.apple.com/library/ios/documentation/uikit/reference/UIWindow_Class/UIWindowClassReference/UIWindowClassReference.html\">documentation</a> says \"an app has only one window\" (it also cautions against invoking <code>resignKeyWindow</code> directly). Now that I knew what to search for, I could also see that <code>reloadInputViews</code> seems to have worked since at least <a href=\"http://stackoverflow.com/a/7874749/343108\">the iOS 5 days</a>. Finally, it also had the advantage of not causing any spurious scrolling due to the <code>UIWebView</code> (temporarily) losing the keyboard.</p>\n\n<p>As you can see, I'm still learning my way around iOS programming. I'm finding that what takes the longest to learn is not the framework itself\u2074. Rather, it's all of the various tricks and tools that are needed to debug perplexing or confusing behavior. I don't see any shortcuts for gaining that knowledge. Even if someone were to hand me a giant list of all UIKit gotchas, I wouldn't understand most of them, or I wouldn't be able to recall and apply them at the right time. I didn't learn web front end developement by just reading through a <a href=\"http://quirksmode.org\">big list of browser quirks</a>, and that's <a href=\"http://norvig.com/21-days.html\">not how programming works </a>in general.</p>\n\n<ol class=\"footnotes\" style=\"border-top: solid 1px #aaa; padding-top: 3px;\">\n<li>If the behavior that <code>contentEditable</code> provides is not exactly what we want, we generally prefer to bypass it altogether and inplement it ourselves, instead of letting <code>contentEditable</code> do its thing and then patching things up. The patching is brittle, especially across browsers.</li>\n<li>See <a href=\"http://blog.persistent.info/2013/10/a-faster-uiwebview-communication.html\">this post</a> on our JavaScript-to-native communication mechanism.</li>\n<li><a href=\"http://sparkinspector.com/\">Spark Inspector</a> has fancy-looking notification tracing support, but I haven't tried it yet.</li>\n<li>When I do need to browse around UIKit (or any other documentation set), <a href=\"http://kapeli.com/dash\">Dash</a> has proven indispensable.</li>\n</ol><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/PersistentInfo/~4/niBT-AF6GwE\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314866", 
                "published": 1381193640.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://blog.persistent.info/", 
        "updated": 1530516314.866484, 
        "id": "feed/http://feeds.feedburner.com/PersistentInfo", 
        "title": "persistent.info"
    }, 
    "feed/http://www.blogger.com/feeds/6616843/posts/default": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1247231723.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/330b559715194e3a", 
                "categories": [], 
                "title": "Industrial Breakfast Robots", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2009/07/industrial-breakfast-robots.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1247230020000000.0", 
                "content": {
                    "content": "My mental model of how manufacturing works is basically the <a href=\"http://www.youtube.com/watch?v=HMU-wXsgyR8\">Sesame Street video of a crayon factory</a>, with everything queued up just so, and feeding one at a time into the next step of the process.  Thanks to advances in computer vision and robotics, modern manufacturing can look a lot more disorganized since it's apparently easier to make robots that can tolerate variations in their input than to keep everything perfect throughout the pipeline.  Here's a video of robots toiling in some sort of breakfast factory:<br /><br />It's especially cool that the sausage-aligning robot (at 0:30) doesn't need to line things up parallel to the conveyor because the next robot is also capable of picking up the whole set at different angles.<p>One more video, of a series of robots stacking pancakes.  They don't appear to be following any particular pattern as they grab pancakes from the conveyor, but by the end of the line of robots nearly all the pancakes are neatly stacked.<br /><p>[via <a href=\"http://singularityhub.com/2009/07/09/the-flexpicker-industrial-robot-built-for-speed-video/\">Singularity Hub</a>]", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1247230020.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1216738648.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/f9e7f1a8e51041a7", 
                "categories": [], 
                "title": "Predictably Irrational", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2008/07/predictably-irrational.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1216736280000000.0", 
                "content": {
                    "content": "I really enjoyed <a href=\"http://youtube.com/watch?v=VZv--sm9XXU\">this talk by Dan Ariely</a> (author of <a href=\"http://www.amazon.com/gp/product/006135323X/ref=cm_cr_pr_product_top\">Predictably Irrational</a>).  The most interesting part to me starts at the 25:30 mark, where he discusses how an unattractive third option can influence people's choices between two better options.  The example he uses is a subscription offer from the Economist:  <ul><li>Online-only subscription for $59</li><li>Print-only subscription for $125</li><li>Print and online subscription for $125</li></ul>Since the print and web combination is the same price as the print subscription alone, no one chose the print-only option.  However, when the print-only option was present 84% opted for the print/web combination, compared to only 32% when that option was removed.   It's counterintuitive, but I've noticed myself doing the same thing.  When you're making objective comparisions between different kinds of apples, it's tempting to leave oranges out of the picture entirely.<br /><br />[via <a href=\"http://www.rezab.com/2008/07/authors-at-google.html\">Reza</a>]", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1216736280.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1210268198.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/a553c18a7df44200", 
                "categories": [], 
                "title": "FriendFork", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2008/05/friendfork.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1210267740000000.0", 
                "content": {
                    "content": "I've been playing with <a href=\"http://appengine.google.com\">Google App Engine</a> and I've created a little app to make the experience of using <a href=\"http://friendfeed.com\">FriendFeed</a> with <a href=\"http://www.google.com/reader\">Google Reader</a> a little nicer.  This app, called <a href=\"http://friendfork.appspot.com\">FriendFork</a>, lets you create separate feeds for different groups of friends, so you have a little more fine-grained control over them in Reader, as well as providing a little integration with Reader's shared items.<br /><br />The app can be found at <a href=\"http://friendfork.appspot.com\">http://friendfork.appspot.com</a>.  I've created <a href=\"http://friendfork.blogspot.com\">a separate blog for FriendFork-related announcements</a> (the spliced \"me\" feed linked from this page includes both this blog and the FriendFork one)", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1210267740.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1205162076.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/3a71afaf0f7243d0", 
                "categories": [], 
                "title": "Muscle memory and a broken keyboard", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2008/03/muscle-memory-and-broken-keyboard.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1205159640000000.0", 
                "content": {
                    "content": "Last week I moved to a new office, and in the process somehow the left <code>alt</code> key on my keyboard got broken.  The right <code>alt</code> key still works, but my brain isn't compatible with it.  Whenever I would try to use a keyboard shortcut that would normally use the left <code>alt</code> key, I'd accidentally type the mirror-image version.  I'd hit <code>alt-backslash</code> instead of <code>alt-tab</code>, and in emacs I'd mix up <code>M-d</code> and <code>M-k</code> or <code>M-space</code> and <code>M-backspace</code>.<br /><br />Some of you may be noticing that space and backspace aren't mirror images on your keyboard.  The keyboard in question is a <a href=\"http://kinesis-ergo.com/contoured.htm\">Kinesis contoured keyboard</a>, which moves several keys to more convenient (but apparently more vulnerable) thumb-accessible positions.  I highly recommend it for anyone concerned about <a href=\"http://en.wikipedia.org/wiki/Emacs_pinky#Emacs_Pinky\">Emacs Pinky</a>.  <br /><br />Now that I've moved the <code>ctrl</code> and <code>alt</code> keys to my thumbs, I think it might be nice to do something about the <code>shift</code> keys (especially since I've never been able to break myself of the bad habit of typing capital letters one-handed).  For my replacement keyboard I traded up to the \"Pro\" model which includes a foot pedal that can be used as a <code>shift</code> key.  (This possibility came up at a recent lunchtime discussion about keyboards in which I uttered the completely ridiculous sentence \"I need a memory upgrade for my keyboard so it can work with a foot pedal.\")  I'm not sure I'd have any better luck training myself to use a foot pedal than I have training myself to use normal <code>shift</code> keys properly, but it's an interesting idea.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1205159640.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1189781855.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/147365d2ed4747b2", 
                "categories": [], 
                "title": "A tale of two shooters", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/09/tale-of-two-shooters.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1189778880000000.0", 
                "content": {
                    "content": "<a href=\"http://mbostock.blogspot.com/2007/09/whats-to-like.html\">Mike Bostock writes</a>:<br /><br /><blockquote>I just played Metroid Prime 3 for thirty minutes, and now have a crippling pain in my right hand from mashing the A button. Not to worry, I can still type, especially when livid enough to rant; I'll type through the pain for this.</blockquote><br /><br />Amen.  I'm a little more positive than Mike (I lasted longer than him before getting frustrated), but my enjoyment of <i>Metroid Prime 3</i> is still limited by my tolerance of the terrible ergonomics of the Wiimote as a first-person-shooter controller.  I loved the original <i>Metroid Prime</i>, and liked <i>Metroid Prime 2</i>, but when I'm thinking \"your save points are too far apart\" because I cannot physically endure the controller any longer, there's a problem.  (Unlike Mike, I think the problem has less to do with repeatedly mashing the A button and more to do with holding the wiimote on a target while mashing the A button, but either way it's a poor design).  <br /><br />I admit that part of my problem is that after an hour I thought \"'normal' mode is too easy, I'll try 'veteran'\".  I have since switched back to 'normal' mode from 'veteran', and when/if I catch up with my previous saved game I'll see how that turned out.  <br /><br />My experience with <i>Metroid Prime 3</i> has really put my experience with the other hot first-person-shooter of the moment, <i>Bioshock</i> in perspective.  When I finished <i>Bioshock</i>, I thought it was too easy and it wasn't as good as my memories of <i>System Shock 2</i>.  So I reinstalled and replayed <i>System Shock 2</i>.  After that experience, I decided that <i>Bioshock</i> was close to the right difficulty, and even <i>System Shock 2</i> wasn't as good as my memories of <i>System Shock 2</i>.  <i>SS2</i>'s story still holds together a little better than <i>Bioshock</i>'s under close scrutiny, but of all the games I've mentioned in this post, <i>Bioshock</i> is the one I'm most likely to play again.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1189778880.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1176476172.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/116445dd14234646", 
                "categories": [], 
                "title": "Remap Macbook Pro Enter key to Expos\u00e9", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/04/remap-macbook-pro-enter-key-to-expos.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1176473280000000.0", 
                "content": {
                    "content": "Apple's laptop keyboards have an \"Enter\" key to the right of the space bar and command key (it's different from the \"Return\" key which is in the usual place).  I have no idea what it's supposed to be useful for, but since it's so easy to reach from the touchpad, I like to assign it to the Expos\u00e9 function.  You can reassign the Expos\u00e9 hotkeys in System Preferences, but it limits you to the F-keys.  <a href=\"http://www.macosxhints.com/article.php?story=20031216101103267\">This tip</a> explains how to assign Expos\u00e9 to other keys, but it doesn't work for the Enter key on a Macbook Pro because the keycode has apparently changed.  I used <a href=\"http://softwares.bajram.com/utilities/#Full_Key_Codes\">Full Key Codes</a> to determine that the correct keycode for the Enter key on a Macbook Pro is 76 (it was 52 on the G4 Powerbooks).<br /><br />I assign \"Expose all windows\" to Enter, and \"Expose desktop\" to Command-Enter (I don't use \"Expose application windows\", so I left it on the default, F10).  If you want to use this setup, you can save <a href=\"http://eclectic-mayhem.com/stuff/com.apple.symbolichotkeys.plist\">my configuration file</a> to <code>~/Library/Preferences</code>. <br /><br />If you try to edit this file yourself, be aware that there's some incorrect information in the tip linked to above (it's corrected in a later comment).  Here's my summary of the process:<ul><li>Go to the Dashboard/Expos\u00e9 System Preferences pane and touch every hotkey setting to ensure that the file is created.</li><li>Open <code>~/Library/Preferences/com.apple.symbolichotkeys.plist</code>.  You can either use Property List Editor (included with Xcode, I think) or any text editor (it's xml).</li><li>The sections within this file are numbered, and they're in a strange order:<ul><li>32: Expose all windows (default F9)</li><li>33: Expose application windows (default F10)</li><li>34: Slow motion expose all windows (default Shift-F9)</li><li>35: Slow motion expose application windows (default Shift-F10)</li><li>36: Expose desktop (default F11)</li><li>37: Slow motion expose desktop (default Shift-F11)</li></ul></li><li>There are three parameters in each section.<ul><li>The first is always -1 as far as I can tell; I don't know what it does.</li><li>The second is the keycode (F9=101, F10=109, F11=103, Enter=52 for Powerbooks and 76 for Macbook Pros.  Use <a href=\"http://softwares.bajram.com/utilities/#Full_Key_Codes\">Full Key Codes</a> to find codes for other keys).</li><li>The third is the modifier key: None=0, Shift=131072, Control=262144, Option=524288, Command=1048576.  You can add these numbers together for multiple modifiers (for example, 1179648 is Shift+Command)</li></ul></li><li>After you've edited this file, save it and log out.  Once you've done this, don't touch anything in the Dashboard/Expos\u00e9 preferences, or you might lose your customizations.</li></ul>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1176473280.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1174306870.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/921ce2206d6f4a9d", 
                "categories": [], 
                "title": "Updated Gmail search bookmark script", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/03/updated-gmail-search-bookmark-script.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1174306080000000.0", 
                "content": {
                    "content": "Recently, Gmail changed the URLs they use for non-gmail.com domains (i.e. <a href=\"http://www.google.com/a/\">Google Apps</a>).  This change meant that my <a href=\"http://eclectic-mayhem.com/stuff/gmail-search-bookmarks.html\">Gmail search bookmarks</a> were reloading the page more often than they should (which slows things down and interferes with Gmail's chat features).  I've fixed it now, so if you use my <a href=\"http://eclectic-mayhem.com/stuff/gmail-search-bookmarks.html\">Gmail search bookmark script</a> with a customized domain, you should recreate your bookmarks to pick up the change.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1174306080.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1172946102.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/3364311d412244d6", 
                "categories": [], 
                "title": "Happy Birthday, Dr. Seuss", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/03/happy-birthday-dr-seuss.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1172891280000000.0", 
                "content": {
                    "content": "I grew up reading <a href=\"http://en.wikipedia.org/wiki/Dr_Seuss\">Dr. Seuss</a>.  I especially liked the elaborate machines like the ones in The Sneetches.  Years later, when I was learning about computers and programming, I would visualize computers working like some sort of Seussian contraption.  The longer I've been in the software business, the more appropriate the analogy seems.  The Star-On and Star-Off machines started out as small boxes and expanded via an outgrowth of components that never quite fit together correctly.  Sylvester McMonkey <s>McAfee</s> McBean also pioneers the business model of fixing problems with software by <a href=\"http://www.pcpro.co.uk/news/106448\">selling more software</a>.<br /><br />The animated version of the Sneetches is difficult to find on DVD, but it's available <a href=\"http://www.youtube.com/view_play_list?p=50F355ED61063929\">on Youtube</a>:<br /><br />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1172891280.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1172507113.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/b5294ca56e324039", 
                "categories": [], 
                "title": "Wii-view", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/02/wii-view.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1172506980000000.0", 
                "content": {
                    "content": "I've had my Wii for a little over a month now, and thanks to Gamefly, I've been able to sample a number of games for it.  I think the system has a lot of potential, but it will be a while before developers really take advantage of the system, and the best games for the Wii will almost certainly be very different from the best games for other systems.<br /><br />Wii Sports is the best Wii game I've played so far.   Zelda may be a better game overall, but it's not really a <span style=\"font-style: italic;\">Wii</span> game - it's a conventional game that happens to be available on the Wii.  Going through the motions in Wii Sports is a lot of fun, and shows once again that having the right controller can make or break a game.  It's unclear how well the software is actually modeling your actions, since random motions are often rendered as well-formed swings in the game, but Wii Sports demonstrates that the underlying model doesn't have to be perfect to be fun.<br /><br />The controller is really three devices in one - a conventional controller with a joystick and buttons, a pointing device (using the sensor bar), and a motion sensor (using the accelerometers in the the two parts of the controller).  The trouble is that these modes don't work together all that well - you can't really wave the wiimote around and hold the pointer on the screen (although Rayman's \"point with the remote and act with the nunchuck\" pattern works fairly well), and no matter how you hold the controller some of the buttons are going to be awkward to reach.  The relative lack of easily-reachable buttons is the biggest problem for games designed with other systems in mind - developers have to use motions like \"shake the nunchuck\" to accommodate the variety of actions found in many games.  This hidden-button syndrome doesn't really add anything to the games and probably makes them less approachable to novice gamers than they would be on a more conventional system (in contrast to Wii Sports, which is the epitome of approachability).<br /><br />My biggest disappointment in the controls has been the pointer mode.  It takes a steady hand to, for example, pick a letter from the on-screen qwerty keyboard and press the button without moving the pointer, and I find the hand position required to keep the pointer on the screen to be very uncomfortable.  I've put the sensor bar on top of my TV but configured the Wii to think it's below the screen.  This way I'm always aming into the space above the screen, which I find to be a more natural hand position.  Playing this way isn't as weird as it sounds.  You already have to watch the on-screen cursor instead of the angle of the remote (since there's no calibration for the size of your screen), so you don't really notice the added vertical offset.<br /><br />I had hoped that the pointer mode would mean that the Wii could accommodate the kinds of games that are still at their best on PCs with a mouse and keyboard (primarily real-time strategy and first-person shooters), but now I'm not so sure.  The control scheme used in Red Steel is worse than the usual two-joystick approach in my opinion.  To turn your character, you have to position the cursor near the edge of the screen and leave it there while your character turns.  It's like having a mouse you can't pick up when it reaches the edge of the pad.  The Rayman-on-Rails plunger-shooting levels were a lot more fun because you could focus on aiming and shooting; movement was out of your control. <br /><br />Taking movement out of the player's control is a recurring theme in the Wii's best moments.  Wii Sports Tennis removes tennis video games from their Pong-based roots by making the challenge not about putting your player in front of the ball (the game moves for you), but just about making each shot (which mostly means timing).  Conventional games have used most of their control \"bandwidth\" for controlling character movement (often using two analog sticks for position and orientation), while the actions you take once you're in position are abstracted behind simple button presses.  The Wii turns that around, with the potential for richer and more immersive control of your actions, but less control of movement (at least in comparison).  This is a relatively unexplored area of game design, although some of the best games I've played recently fall into the \"actions, not movement\" category:  Guitar Hero and Trauma Center (DS).  Now that the Wii has become a commercial success, I'm hopeful that we'll see some interesting new ideas for it.<br /><br />Quick comments on the games I've tried:<br /><ul><li>Wii Sports - Simple and fun; the best reason to own a Wii.</li><li>Zelda - Excellent as usual, but doesn't break any new ground.</li><li>Elebits - Katamari Damacy meets the Half-Life 2 gravity gun, although it's not quite as awesome as that sounds.  The controls can be frustrating when you're doing anything but flinging objects around the room.<br /></li><li>Warioware - By far the most varied use of the wiimote.  Slightly less frantic and unpredictable than other games in the series since it has to tell you how to hold the wiimote in each round.<br /></li><li>Rayman Raving Rabbids - Great sense of style and humor. <br /></li><li>Excite Truck - It's no Mario Kart, but it's enjoyable as long as you don't care about realism in your racing games.<br /></li><li>Red Steel - It's an OK game, but I got really frustrated with the controls.<br /></li></ul>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1172506980.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1168438012.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/615c1618abd74f52", 
                "categories": [], 
                "title": "Grey Legoo", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2007/01/grey-legoo.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1168437480000000.0", 
                "content": {
                    "content": "Legos don't need humans to reproduce anymore - check out this <a href=\"http://www.makezine.com/blog/archive/2007/01/lego_car_factor.html?CMP=OTC-0D6B48984890\">automated Lego car factory</a>.  Of course, this <a href=\"http://www.makezine.com/blog/archive/2007/01/lego_duck_facto.html\">Lego duck assembly line</a> still has a long way to go before it catches up with the <a href=\"http://www.youtube.com/watch?v=8hl5MJHDi9k&amp;eurl\">old-fashioned duck factory</a>.  [via <a href=\"http://xenomachina.com\">Laurence</a> and <a href=\"http://www.zefrank.com/zesblog/archives/2007/01/i_cant_help_it.html\">zefrank</a>]", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1168437480.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1159802168.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/00550d58988047ce", 
                "categories": [], 
                "title": "Gmail search bookmarks", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2006/10/gmail-search-bookmarks.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1159800420000000.0", 
                "content": {
                    "content": "I've found a few Gmail searches to be very valuble in my email management. The main search I use is [(label:inbox label:unread) OR label:star] - that is, unread items from my inbox plus all my starred items.  This search turns gmail's read/archive pattern on its head - once I've read a message, it disappears from view unless I take explicit action to save it (i.e. star it).  This works well for my mail, since I receive a lot of mail that doesn't need any response.<br /><p><br />Of course, [(label:inbox label:unread) OR label:star], or even its shortened form [(l:^i l:^u)|l:^t] is too much to type all the time.  <a href=\"http://persistent.info\">Mihai</a> has <a href=\"http://persistent.info/archives/2005/03/01/gmail-searches\">a greasemonkey script</a> that can add links for your favorite searches below the labels box, but it slows things down (or at least it used to), and it's a two-step process to perform your saved search when you're not already in gmail.<br /><p><br />I've written <a href=\"http://eclectic-mayhem.com/stuff/gmail-search-bookmarks.html\">a simple tool to generate bookmarks that will perform gmail searches</a>.  These bookmarks will work even if you're not currently in gmail, but if you're already in gmail it will use your current session instead of reloading everything.  I've been using these bookmarks for a while now and I'm happy with them, so I figured it's time to share them with the world.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1159800420.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1157357705.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/a6c1b712331c428b", 
                "categories": [], 
                "title": "Daily WTF for other industries?", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2006/09/daily-wtf-for-other-industries.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1157357040000000.0", 
                "content": {
                    "content": "<a href=\"http://www.thedailywtf.com\">The Daily WTF</a> is a showcase for shockingly bad code and computer systems, all claimed to be found \"in the wild\".  It's a fun read if you have both the right sense of humor and the appropriate background to understand what's going on.  I wonder if there are similar websites out there for other industries.  It's kind of scary to think that there might be, for example, doctors so bad that other doctors have websites devoted to mocking their work.<br /><br />Maybe the reason is in the low barrier to entry to so much computer work.  It's easy to transition from amateur to \"professional\" with minimal training.  Maybe the equivalent to the Daily WTF is the story that a couple of mechanics are probably telling about me right now (or, as they probably call me, \"that kid who broke something changing a flat tire and had to get his car towed in\").", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1157357040.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1150813018.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/c6186b604fcc44d4", 
                "categories": [], 
                "title": "Useful obscure firefox extension (Mac)", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2006/06/useful-obscure-firefox-extension-mac.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1150811700000000.0", 
                "content": {
                    "content": "In Firefox on the Mac, whenever you press Cmd-N to open a new window, it tries to place the new window slightly below the current window (so you can see both titlebars), even if that puts the bottom of the new window off-screen (<a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=218214\">bug 218214</a>).  It only seems to happen with Firefox, and only on the Mac version.  This is especially annoying since Apple's fondness for widescreen displays makes vertical space even more precious.  It turns out there's a workaround: <a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=218214#c24\">this extension</a> (<a href=\"https://bugzilla.mozilla.org/attachment.cgi?id=194620&amp;action=view\">direct link to <code>onscreen-0.1.xpi</code></a>) will move all new windows as necessary to fit on the screen.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1150811700.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1145378112.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/1dd8f2caa3004956", 
                "categories": [], 
                "title": "Linkblog and new feeds", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2006/04/linkblog-and-new-feeds.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1145376360000000.0", 
                "content": {
                    "content": "I've set up a <a href=\"http://www.google.com/reader/view/user/06885818428051431563/label/linkblog\">linkblog</a> using <a href=\"http://www.google.com/reader/view/\">Google Reader</a>'s <a href=\"http://googlereader.blogspot.com/2006/03/reader-learns-to-share.html\">sharing feature</a>.   It's actually been visible on <a href=\"http://eclectic-mayhem.com\">http://eclectic-mayhem.com</a> for a few weeks now, but those of you who read this blog in a feed reader wouldn't have noticed.  For those of you who are unfamiliar with linkblogs, it's a lightweight way (one click) for me to publish things I find interesting without writing up a full blog post. <br /><br />Using the links in the \"Feeds\" section of the right-hand column, you can subscribe to <a href=\"http://www.google.com/reader/view/feed/http://www.eclectic-mayhem.com/blog/atom.xml\">this blog</a>, the <a href=\"http://www.google.com/reader/view/user/06885818428051431563/label/linkblog\">linkblog</a>, or <a href=\"http://www.google.com/reader/view/user/06885818428051431563/label/me\">a combination of the two</a> using Google Reader or another feed reader.  If you subscribe to the combined feed, you'll also automatically get any other feeds I may create in the future (like photo feeds, etc).  Note that I've moved the linkblog feed (the old address ends with \"/starred\", the new one ends with \"/linkblog\") - if you've already subscribed to it under the old location, you should update your links.  The new arrangement allows me some more flexibility for possible future changes.<br /><br />In case you're curious about how exactly to do this, here's what I did.  First, I made my starred items in Google Reader:  Under the \"Share\" tab, check the \"Shared\" box next to \"My starred items\".  There are a couple of links in the \"Tell your friends\" section.  Copy the orange one (looks like http://www.google.com/reader/ public/atom/ user/[20-digit-number]/ state/com.google/starred)<br />and paste it into the search box at the top of the page.  Now you can subscribe to your starred items and apply another label to it (for example, you might label your starred items \"linkblog\" or \"me\").  You can subscribe to your own blog and give it the same label to create a spliced feed containing both your blog and your starred items (this is my \"me\" label).  You can then make that label public and put links to it on your blog (or the clip you see on the sidebar of this page).", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1145376360.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1140957182.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/2606872540194b68", 
                "categories": [], 
                "title": "Pin-pen merger", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2006/02/pin-pen-merger.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1140956820000000.0", 
                "content": {
                    "content": "<a href=\"http://www.eurekalert.org/pub_releases/2006-02/ru-bpo022406.php\">Brain processing of speech sounds is different in some southern English speakers.</a><br /><br />So this is why no one in California understands me when I say my name.  See also <a href=\"http://en.wikipedia.org/wiki/Pin-pen_merger#Pin-pen_merger\">this Wikipedia article</a>.  Via <a href=\"http://del.icio.us/amitp\">amitp</a>.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1140956820.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1135779787.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/95925658a3134c07", 
                "categories": [], 
                "title": "The Internet in a nutshell, part 2", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/12/internet-in-nutshell-part-2.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1135778880000000.0", 
                "content": {
                    "content": "<a href=\"http://starwars.wikicities.com/wiki/Wookieepedia\">Wookieepedia</a>:  a wiki site set up by Star Wars fans \"when wikipedia users began to complain of the overabundance of minutiae related to <i>Star Wars\" </i>on Wikipedia.  (via <a href=\"http://www.nedbatchelder.com/blog/200512.html#e20051216T071401\">Ned Batchelder</a>)<br /><br />My original Internet in a nutshell comment predates this blog, so I'll repeat it here:  An image from <a href=\"http://come.to/evilbert\">Bert Is Evil</a>, a site self-conciously created to qualify for Internet Underground's \"Weird Wide Web\" column is <a href=\"http://www.snopes.com/rumors/bert.htm\">included in a pro-bin-Laden poster</a> because the image ranked highly in a Google Images search for <a href=\"http://images.google.com/images?q=bin%20laden&amp;sa=N&amp;tab=wi\">[bin laden]</a>.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1135778880.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1133968336.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/949ab631eebf4133", 
                "categories": [], 
                "title": "Filling code in Emacs", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/12/filling-code-in-emacs.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1133967360000000.0", 
                "content": {
                    "content": "My friend <a href=\"http://snarfed.org\">Ryan</a> has writen a neat addition for Emacs:  <a href=\"http://snarfed.org/space/fillcode\">fillcode-mode</a> lets you word-wrap code just like M-q already does for text.  It knows how to indent parenthesized expressions, break lines at commas, etc.  It's not perfect, but it gets the common cases right and sure beats fixing up the indentation by hand when you change a function signature.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1133967360.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1133791945.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/dac4eb299db5470f", 
                "categories": [], 
                "title": "Fighting with Civilization IV's copy protection", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/12/fighting-with-civilization-ivs-copy.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1133788440000000.0", 
                "content": {
                    "content": "(Note: if you're looking for information about how to get an illegal copy of Civilization 4, you won't find it here)<br /><br />After downloading the <a href=\"http://www.civfanatics.com/news2/comments.php?id=589\">Civilization 4 demo</a>, I went out and purchased the game. Once I got it installed, I found that I immediately got a blue screen of death whenever I tried to start the game. The <a href=\"http://www.eclectic-mayhem.com/blog/2004/02/windows-crash-reporter.html\">windows crash reporter</a> was no help this time, but since the demo worked fine I suspected some sort of attempted copy protection. As it turns out I had an old version of the Safedisc copy protection software on my system (<code>c:\\windows\\system32\\drivers\\secdrv.sys</code>, dated 2002), that I think may have been broken by Windows XP SP2. Civ4 apparently won't install its version of Safedisc when it sees another version already installed. Macrovision publishes an <a href=\"http://www.macrovision.com/products/safedisc/downloads.shtml\">update to Safedisc</a>, although it's not easy to find on their site. Unfortunately, attempting to install the update directly triggers another BSOD in the old version. The procedure for upgrading looks something like this:<br /><ol>   <li>Go to Device Manager and turn on \"Show Hidden Devices\".</li>   <li>Under \"Non-Plug and Play Drivers\", find \"Secdrv\" and double-click it.<br /> </li>   <li>On the \"Driver\" tab, change \"Startup Type\" to \"Disabled\".</li>   <li>Reboot.</li>   <li>Run the Safedisc update installer. You'll get an \"error 101\" because the driver is disabled, but the installation still works as far as I can tell.</li>   <li>Go back to Device Manager, change \"Startup Type\" back to \"Automatic\" and reboot.</li> </ol> Now I try the game again. The CD spins up and I see the splash screen this time, which says \"Loading\" even though it really means \"Please wait while we waste your time and verify that you still have this otherwise-unneded CD\". A dialog pops up and says \"Please insert the correct CD and try again\", with a link to the official support website. The website says the CDs are mislabelled - the CDs say \"Disc 1/Install\" and \"Disc 2/Play\", but you're actually supposed to use Disc 1 to play. Oops.<br /><br />I swap discs and try again. Same message. Some searching reveals that Safedisc tries to detect CD emulators like Daemon Tools and Alcohol 120% and refuse to start if it sees them (of course, now that it's caught a pirate red-handed, it doesn't want to give you any hints about how to evade the protection, so it just says \"please insert the correct cd\"). I've never used either of those programs, and I'm pretty sure I don't have anything like them installed (If I did, I'd probably be using it, since I can see plenty of non-piratical uses for such a piece of software). The solution is a little program called <a href=\"http://www.dvhardware.net/software/3116\">sd4hide</a>, which temporarily removes a few registry keys that Safedisc looks for. The registry keys it removes in my case are entries in the SCSI section of the registry, entries for my hard drive and DVD drive. I have no idea what they're doing there (both drives are IDE) or why SCSI would be taken as evidence of piracy (does no one use SCSI drives anymore?), but it did the trick, and now I'm able to play the game.<br /><br />It's things like this that make me about ready to give up on PC gaming.  The consoles may be closed systems with their own copy-protection schemes, but at least I know that up front, and the games still work.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1133788440.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1127049336.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/42a919379a9f46e3", 
                "categories": [], 
                "title": "Project timelines", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/09/project-timelines.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1127049240000000.0", 
                "content": {
                    "content": "Don Knuth <a href=\"http://lists.w3.org/Archives/Public/www-validator/2005Sep/0052.html\">has a different perspective</a> from virtually everyone else in computer science: <blockquote>\"I don't want to delay The Art of Computer Programming by an unnecessary week; I've been working on it for 43 years and I have 20 more years of work to do\"</blockquote> (via <a href=\"http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=76608c5d-f71a-440e-be87-165fa8b6f2f0\">Dare Obasanjo</a>)", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1127049240.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1114868365.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/276f347048d04dd0", 
                "categories": [], 
                "title": "Desktop Reversal", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/04/desktop-reversal.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1114867080000000.0", 
                "content": {
                    "content": "Ever since Windows 95, I've hated the concept of the desktop \"folder\".  This was partly due to flaws in Microsoft's implementation, but mostly because the whole concept seemed broken to me.  The desktop is too awkward to access (because you have to minimize other windows instead of simply switching to another window) and lacks a unifying purpose.  Mac OS X Panther softened my resistance somewhat - Expose solves the access problem, and on the Mac it's generally easier to keep a clean desktop (As a rule I don't use the desktop on my powerbook for long-term storage of anything.  Right now my desktop is completely blank).<br /><p><br />Now enter Tiger and Dashboard - a hidden \"layer\" of widgets that can be brought to the forefront via a hotkey or an icon in the dock.  This works the way I always wished the desktop worked in Windows.  But now, I find myself wishing that the Dashboard widgets showed up on the desktop, so I could see them under my active windows and didn't need a third hotkey (after mapping the bottom-row enter key to expose all windows and command-enter to expose desktop).  It's almost there - you can <a href=\"http://www.macosxhints.com/article.php?story=20050422172929402\">drag widgets from the Dashboard layer</a> to your main screen, but they always display on top of other windows.  Hopefully some enterprising hacker will figure out how to turn off the \"always on top\" bit (an \"always on bottom\" bit would be nice, but not necessary).", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1114867080.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1113700433.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/16527ab695514510", 
                "categories": [], 
                "title": "Yarrr!", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/04/yarrr.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1113700380000000.0", 
                "content": {
                    "content": "<a href=\"http://www.newsobserver.com/news/wake/raleigh/story/2310935p-8689263c.html\">\"To the delight of some and the horror of others, The Pirate Captain was elected N.C. State University student body president Wednesday in a landslide.\"</a>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1113700380.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1107004852.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/74e38a5716eb41d7", 
                "categories": [], 
                "title": "World of Warcraft and \"Pattern-Breaking\"", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2005/01/world-of-warcraft-and-pattern-breaking.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1107004800000000.0", 
                "content": {
                    "content": "Damion Schubert <a href=\"http://booboo.phpwebhosting.com/~ubiq/index.php?p=205\">nails</a> the reason I'm enjoying World of Warcraft more than other MMO games.  \n<br /><blockquote>What the WoW quest engine does right is that it convinces you that quests are the best way to advance in the game, and then lets you have 20 of them at a time.</blockquote>\n<br />Efficiency is a funny thing in games.  Most people don't care about the most \"efficient\" way to progress through a single-player game, and those who prefer to take their time are in no way impacted by the fact that some people see it as a race.  Online, however, the drive for efficiency can be contagious.  When you can't make progress solo, you're often stuck in the few areas that have a critical mass of people.  There was a lot of fun to be had in Everquest, but you wouldn't know it from the way most people played, killing legions of identical monsters in whichever zone was the hotspot for their level.  It was just too hard to find people with whom to explore the rest of the game world.  What WoW gets right is that you're never really tempted to take the \"less fun\" path because it's more efficient.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1107004800.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1100744512.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/86ee5e8c6e374463", 
                "categories": [], 
                "title": "Tivo's new ads", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2004/11/tivos-new-ads.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1100742420000000.0", 
                "content": {
                    "content": "Tivo is taking <a href=\"http://www.pvrblog.com/pvr/2004/11/tivo_to_add_ban.html\">some</a> <a href=\"http://www.nelson.monkey.org/%7Enelson/weblog/guestblog/marc/tivo-ads.html\">heat</a> for their <a href=\"http://www.latimes.com/news/local/la-et-tivo17nov17,0,927837.story?coll=la-home-headline\">upcoming addition of ads</a> that will be displayed while you fast-forward through commercials. While it is a little upsetting that they're making an unwanted change to the existing service (leading to the possibility that they will disable the 30-second skip command to force people to fast-foward through commercials in the traditional way to see these ads), I don't think it will be a big deal. As far as I can tell it's just an extension of the \"press thumbs up to record\" overlay they're already doing for TV-show ads. The ads will only be there when there's already an ad on your screen that you're fast-forwarding through, but this one will be legible.\n<br />\n<br />This could even be a good thing for users. These new ads are potentially individually targetable and measurable (with a remote-control \"clickthrough\"). If it works out well (and admittedly that's a big \"if\"), ads like these can replace the more intrusive TV ads just like Google's and Overture's targeted text ads are replacing banners. I'd be happy to have a few ads on my screen while fast-forwarding if it meant that the Tivo knew when the commercial ended and would resume normal playback automatically.\n<br />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1100742420.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1099319643.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/716a7eeed9674b92", 
                "categories": [], 
                "title": "Sophomore evicted for fliers urging girls to lose weight", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2004/10/sophomore-evicted-for-fliers-urging.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1099319640000000.0", 
                "content": {
                    "content": "<a href=\"http://www.boston.com/news/local/new_hampshire/articles/2004/10/30/sophomore_evicted_for_fliers_urging_girls_to_lose_weight/\">Sophomore evicted for fliers urging girls to lose weight</a> - \"Timothy Garneau, 20, of Berlin, said he posted the fliers as a joke because he was tired of waiting so long for the elevator. Garneau lived on the seventh floor of Stoke Hall.\"  As a former resident of an 11th-floor dorm room, I can sympathize with this guy's plight, and think that kicking him out of the dorm for this joke is absurd.  I think he's going about it in the wrong way, though.  Guys are much easier to shame into taking the stairs (I had friends on the 5th floor who would sometimes take the elveator up to 7 and then walk down two flights of stairs to preserve their dignity), and chasing them away has the added benefit of improving the male/female ratio in the elevators ;-).", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1099319640.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
                    "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
                    "title": "Eclectic Mayhem"
                }, 
                "updated": 1100746727.0, 
                "author": "Ben Darnell", 
                "id": "tag:google.com,2005:reader/item/b7c2d024fd7e41ac", 
                "categories": [], 
                "title": "Free-market flu?", 
                "alternate": [
                    {
                        "href": "http://www.eclectic-mayhem.com/blog/2004/10/free-market-flu.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1099315980000000.0", 
                "content": {
                    "content": "This <a href=\"http://www.washingtonpost.com/wp-dyn/articles/A14657-2004Oct31.html\">Washington Post column</a> claims that \"The reason there's not enough flu vaccine to go around this year is that Americans have decided, consciously or not, that they don't want the government to get too deeply involved in health care.\" The rest of the article, however, could just as easily be used to argue that the shortage is the result of too much governmental involvement:<ul><li>Changing flu vaccine production to faster, more modern techniques (like those used for other vaccines) would require lengthy and expensive FDA approval.</li><li>The government buys about 20% of the vaccine supply for military and other uses, but it refuses to pay market prices</li></ul>In fact, the solution proposed at the end of the article includes a significant move towards a freer market (the government would pay market prices for its 20%). The free market can break down in a variety of ways when it comes to health care (the New Yorker has a good <a href=\"http://www.newyorker.com/printable/?critics/041025crat_atlarge\">analysis  of market forces and prescription drugs</a>), but this year's flu vaccine doesn't look like one of them.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516316484", 
                "published": 1099315980.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://www.eclectic-mayhem.com/blog/", 
        "updated": 1530516316.484759, 
        "id": "feed/http://www.blogger.com/feeds/6616843/posts/default", 
        "title": "Eclectic Mayhem"
    }, 
    "feed/http://googlereader.blogspot.com/atom.xml": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1373976971.0, 
                "author": "Unknown", 
                "id": "tag:google.com,2005:reader/item/461784e7ecd34114", 
                "categories": [], 
                "title": "A final farewell", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/Qye2K3UmfMM/a-final-farewell.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1372779180000000.0", 
                "content": {
                    "content": "<div dir=\"ltr\" style=\"text-align: left;\">\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: transparent; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: transparent; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Thank you for stopping by.</span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: white; font-family: Arial; line-height: 1.15; vertical-align: baseline; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: white; font-family: Arial; line-height: 1.15; vertical-align: baseline; white-space: pre-wrap;\">Today, we</span><a href=\"http://googleblog.blogspot.com.au/2013/03/a-second-spring-of-cleaning.html\" style=\"line-height: 1.15; text-decoration: none;\"><span style=\"background-color: white; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"> </span><span style=\"background-color: white; font-family: Arial; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;\">powered down</span></a><span style=\"background-color: white; font-family: Arial; line-height: 1.15; vertical-align: baseline; white-space: pre-wrap;\"> Google Reader. We understand you may not agree with this decision, but we hope you'll come to love </span><a href=\"http://alternativeto.net/software/google-reader/\" style=\"line-height: 1.15; text-decoration: none;\"><span style=\"background-color: white; font-family: Arial; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;\">these alternatives</span></a><span style=\"background-color: white; font-family: Arial; line-height: 1.15; vertical-align: baseline; white-space: pre-wrap;\"> as much as you loved Reader.</span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: white; font-family: Arial; line-height: 1.15; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"background-color: white; font-family: Arial; line-height: 1.15; white-space: pre-wrap;\">Sincerely,</span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.15; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.15; white-space: pre-wrap;\">The Google Reader Team</span></div>\n<div style=\"line-height: 1.15; margin-bottom: 0pt; margin-top: 0pt; text-align: left;\">\n<span style=\"font-family: Arial; font-weight: bold; line-height: 1.5151515873995693; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><b>Frequently-asked questions:</b></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><b>1. What will happen to my Google Reader data?</b></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><b><br /></b></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial, Helvetica, sans-serif;\"><span style=\"line-height: 1.5151515873995693; vertical-align: baseline; white-space: pre-wrap;\">All Google Reader subscription data (eg. lists of people that you follow, items you have starred, notes you have created, etc.) will be systematically deleted from Google servers. </span></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><b>2. Will there be any way to retrieve my subscription data from Google in the future?</b></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.6666667461395264; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.6666667461395264; white-space: pre-wrap;\">Note -- all subscription data will be permanently, and irrevocably deleted. Google will not be able to recover any Google Reader subscription data for any user after July 15, 2013.</span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><b>3. Why was Google Reader discontinued?</b></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.5151515873995693; white-space: pre-wrap;\"><br /></span></div>\n<div style=\"text-align: left;\">\n<span style=\"font-family: Arial; line-height: 1.6666667461395264; vertical-align: baseline; white-space: pre-wrap;\">Please refer to our </span><a href=\"http://googleblog.blogspot.com.au/2013/03/a-second-spring-of-cleaning.html\" style=\"font-family: Arial; line-height: 1.6666667461395264; text-decoration: none; white-space: pre-wrap;\"><span style=\"text-decoration: underline; vertical-align: baseline;\">blog post</span></a><span style=\"font-family: Arial; line-height: 1.6666667461395264; vertical-align: baseline; white-space: pre-wrap;\"> for more information.</span></div>\n<div style=\"line-height: 1.3640625; margin-bottom: 11pt; margin-top: 11pt; text-align: left;\">\n<span style=\"background-color: transparent; font-family: Arial; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"></span></div>\n</div>\n<div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=Qye2K3UmfMM:4vQ6RAZgX60:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=Qye2K3UmfMM:4vQ6RAZgX60:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=Qye2K3UmfMM:4vQ6RAZgX60:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=Qye2K3UmfMM:4vQ6RAZgX60:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/Qye2K3UmfMM\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1372779180.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1363329049.0, 
                "author": "Unknown", 
                "id": "tag:google.com,2005:reader/item/3c8b7570216f4532", 
                "categories": [], 
                "title": "Powering Down Google Reader", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/STDucdofCmU/powering-down-google-reader.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1363244760000000.0", 
                "content": {
                    "content": "<div dir=\"ltr\" style=\"text-align: left;\">\n<b style=\"font-weight: normal;\"><span style=\"font-family: Arial; font-size: 15px; vertical-align: baseline; white-space: pre-wrap;\"><br /></span></b>\n<b style=\"font-weight: normal;\"><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">Posted by Alan Green, Software Engineer</span></b><br />\n<b style=\"font-weight: normal;\"><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"><br /></span></b><b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\"></b>\n<br />\n<div dir=\"ltr\" style=\"margin-bottom: 0pt; margin-top: 0pt;\">\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\"><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">We have just announced on the <a href=\"http://googleblog.blogspot.com/2013/03/a-second-spring-of-cleaning.html\">Official Google Blog</a></span><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"> that we will soon retire Google Reader (the actual date is July 1, 2013). We know Reader has a devoted following who will be very sad to see it go. We\u2019re sad too. </span></b></div>\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\"><br /><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"></span></b>\n<br />\n<div dir=\"ltr\" style=\"margin-bottom: 0pt; margin-top: 0pt;\">\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\"><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">There are two simple reasons for this: usage of Google Reader has declined, and as a company we\u2019re pouring all of our energy into fewer products. We think that kind of focus will make for a better user experience.</span></b></div>\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\">\n<br /><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"></span></b><br />\n<div dir=\"ltr\" style=\"margin-bottom: 0pt; margin-top: 0pt;\">\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\"><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">To ensure a smooth transition, we\u2019re providing a three-month sunset period so you have sufficient time to find an alternative feed-reading solution. If you want to retain your Reader data, including subscriptions, you can do so through </span><span style=\"color: #1155cc; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"><a href=\"https://www.google.com/takeout/?pli=1#custom:reader\">Google Takeout</a></span><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">.</span></b></div>\n<b id=\"internal-source-marker_0.05398527625948191\" style=\"font-weight: normal;\">\n<br /><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\"></span><span style=\"font-family: Arial; vertical-align: baseline; white-space: pre-wrap;\">Thank you again for using Reader as your RSS platform.</span></b></div>\n<div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=STDucdofCmU:b01-heecptU:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=STDucdofCmU:b01-heecptU:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=STDucdofCmU:b01-heecptU:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=STDucdofCmU:b01-heecptU:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/STDucdofCmU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1363244760.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1373459789.0, 
                "author": "Unknown", 
                "id": "tag:google.com,2005:reader/item/0c62da47ff844114", 
                "categories": [], 
                "title": "New in Reader: a fresh design, and Google+ sharing", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/N_RZ8z2Fap4/new-in-reader-fresh-design-and-google.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1320123300000000.0", 
                "content": {
                    "content": "<div dir=\"ltr\" style=\"text-align: left;\">\nPosted by Alan Green, Software Engineer<br />\n<br />\nToday we're rolling out the new Reader design, and the Google+ features that we mentioned <a href=\"http://googlereader.blogspot.com/2011/10/upcoming-changes-to-reader-new-look-new.html\">just over a week ago</a>. Before the day's over, all Reader users will be able to enjoy the following improvements:<br />\n<ul>\n<li>A new look and feel that's cleaner, faster, and nicer to look at.</li>\n</ul>\n<div class=\"separator\" style=\"clear: both; text-align: center;\">\n</div>\n<div class=\"separator\" style=\"clear: both; text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/-w870M3tidIU/UdzkKXs7vtI/AAAAAAAAAWk/fRm0aqtPyFE/s800/greader_1000.png\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" height=\"182\" src=\"http://3.bp.blogspot.com/-w870M3tidIU/UdzkKXs7vtI/AAAAAAAAAWk/fRm0aqtPyFE/s400/greader_1000.png\" width=\"400\" /></a></div>\n<div>\n<ul>\n<li>The ability to +1 a feed item (replacing \"Like\"), with an option to then share it with your circles on Google+ (replacing \"Share\" and \"Share with Note\").</li>\n</ul>\n<div class=\"separator\" style=\"clear: both; text-align: center;\">\n<a href=\"http://4.bp.blogspot.com/-0ioPfrxNhLA/UdzjjFB-CaI/AAAAAAAAAWI/oT3VSNh2Ih0/s800/Screen%2520shot%25202011-10-28%2520at%25202.01.30%2520PM.png\" style=\"margin-left: 1em; margin-right: 1em;\"><img border=\"0\" height=\"234\" src=\"http://4.bp.blogspot.com/-0ioPfrxNhLA/UdzjjFB-CaI/AAAAAAAAAWI/oT3VSNh2Ih0/s320/Screen%2520shot%25202011-10-28%2520at%25202.01.30%2520PM.png\" width=\"320\" /></a></div>\n<br />\nIntegrating with Google+ also helps us streamline Reader overall. So starting today we'll be turning off friending, following, shared items and comments in favor of similar Google+ functionality.</div>\n<div>\n<br />\nWe hope you'll like the new Reader (and Google+) as much as we do, but we understand that some of you may not. Retiring Reader's sharing features wasn't a decision that we made lightly, but in the end, it helps us focus on fewer areas, and build an even better experience across all of Google.<br />\n<br />\nIf you decide to stay, then please do send us your feedback on today's set of improvements. Google+ is still in its early days, after all, and we're constantly working on improvements. If, however, you decide that the product is no longer for you, then please do take advantage of Reader's <a href=\"http://www.google.com/reader/settings?display=import\">subscription export feature</a>. Regardless where you go, we want to make sure you can take your data with you.<br />\n<br />\nUpdates to Google Reader on the web are rolling out gradually and should reach all users by end of day. A new Android application will follow soon. If you have questions about today\u2019s announcements, please <a href=\"http://www.google.com/support/reader/?hl=en\">check out our Help Center</a>.</div>\n</div>\n<div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=N_RZ8z2Fap4:o3wcciFCgaY:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=N_RZ8z2Fap4:o3wcciFCgaY:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=N_RZ8z2Fap4:o3wcciFCgaY:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=N_RZ8z2Fap4:o3wcciFCgaY:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/N_RZ8z2Fap4\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1320123300.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1319197499.0, 
                "author": "Unknown", 
                "id": "tag:google.com,2005:reader/item/1ac23076eba34765", 
                "categories": [], 
                "title": "Upcoming changes to Reader: a new look, new Google+ features, and some clean-up", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/Tp7pXa_i4HU/upcoming-changes-to-reader-new-look-new.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1319158800000000.0", 
                "content": {
                    "content": "Posted by Alan Green, Software Engineer<br />\n<br />\nIn the next week, we\u2019ll be making some highly requested changes to Google Reader. First, we\u2019re going to introduce a brand new design (<a href=\"http://googleblog.blogspot.com/2011/06/evolving-google-design-and-experience.html\">like many of Google\u2019s other products</a>) that we hope you love. Second, we\u2019re going to bring Reader and <a href=\"http://www.google.com/+\">Google+</a> closer together, so you can share the best of your feeds with just the right circles.<br />\n<br />\nAs a result of these changes, we also think it's important to clean things up a bit. Many of Reader's social features will soon be available via Google+, so in a week's time we'll be retiring things like friending, following and shared link blogs inside of Reader.<br />\n<br />\nWe think the end result is better than what's available today, and you can sign up for Google+ right now to start prepping Reader-specific circles. We recognize, however, that some of you may feel like the product is no longer for you. That's why we will also be extending Reader's subscription export feature to include the following items. Your data belongs to you, after all, and we want to make sure you can take it with you. <br />\n<ul>\n<li>Your subscriptions </li>\n<li>Your shared items </li>\n<li>Your friends </li>\n<li>Your likes </li>\n<li>Your starred items </li>\n</ul>\nLike always, the new Google Reader will be a great place to read and share your feeds. And in addition to Google+, you'll still be able to share to almost any service using <a href=\"http://www.google.com/reader/settings?display=item-links\">Send To</a>. We're looking forward to launching the new features very soon.<div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=Tp7pXa_i4HU:FLLca4C4P9c:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=Tp7pXa_i4HU:FLLca4C4P9c:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=Tp7pXa_i4HU:FLLca4C4P9c:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=Tp7pXa_i4HU:FLLca4C4P9c:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/Tp7pXa_i4HU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1319158800.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349156.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/99d021ec1de84caa", 
                "categories": [], 
                "title": "Updates to the Google Reader app for Android", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/zczBlDN6gEQ/updates-to-google-reader-app-for.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1297923000000000.0", 
                "content": {
                    "content": "Posted by Brian Shih, Product Manager\n\n<p>Today we\u2019re excited to announce some updates to the official Google Reader app for Android. Over the last couple of months, we\u2019ve added some of your most-requested features:</p>\n\n<ul>\n<li>Unread count widget - choose any feed, label, person, or \u201call items\u201d and get the unread count on your home screen. Clicking on the widget takes you to straight to that stream.</li>\n<li>News ticker widget - if you prefer a bit more information, you can add a larger size widget that cycles through items on any stream you want in Reader. Clicking any headline will take you to the article, while clicking the folder will take you to that stream.</li>\n\n<a href=\"http://2.bp.blogspot.com/-A_LGkmDXcJI/TVwjhrkxQPI/AAAAAAAAAhw/JC-bRwIDEuU/s1600/widgets2.png\"><img alt=\"That is a lot of widgets\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5574369500317434098\" src=\"http://2.bp.blogspot.com/-A_LGkmDXcJI/TVwjhrkxQPI/AAAAAAAAAhw/JC-bRwIDEuU/s400/widgets2.png\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 240px; height: 400px;\" /></a>\n\n<li>Mark previous as read - if you\u2019ve used the mobile version of Reader before and missed this feature, it\u2019s now back! As you scroll down your reading list, hit \u201cMark previous as read\u201d at any time to only mark things above the screen as read.</li>\n\n<a href=\"http://1.bp.blogspot.com/-hgIu2M-lKAo/TVwjwyPvUhI/AAAAAAAAAh4/5VXRVmtACrE/s1600/markprevious.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5574369759806312978\" src=\"http://1.bp.blogspot.com/-hgIu2M-lKAo/TVwjwyPvUhI/AAAAAAAAAh4/5VXRVmtACrE/s400/markprevious.png\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 240px; height: 400px;\" /></a>\n</ul>\n<p>In addition to these new features, thanks to 20%-ers Alexey Retunski and Anton Vayvod\u2019s support, we now have an official Russian translation as well.</p>\n\n<p>We hope you enjoy the updates - give it a try! You can <a href=\"https://market.android.com/details?id=com.google.android.apps.reader\">download the app</a> in all countries from the Android Market. The Google Reader app is available for devices running Android 1.6 or higher, with widget functionality available for devices on Android 2.2+.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=zczBlDN6gEQ:n2QnsBPGvb0:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=zczBlDN6gEQ:n2QnsBPGvb0:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=zczBlDN6gEQ:n2QnsBPGvb0:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=zczBlDN6gEQ:n2QnsBPGvb0:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/zczBlDN6gEQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1297923000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349306.0, 
                "author": "Arif Siddiquee", 
                "id": "tag:google.com,2005:reader/item/47013bae4fee43cb", 
                "categories": [], 
                "title": "More control over comments on shared items", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/tdVDysyIqqs/more-control-over-comments-on-shared.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1296178320000000.0", 
                "content": {
                    "content": "Posted by Arif Siddiquee, Software Engineer\n\n<p><img alt=\"Options menu\" height=\"94\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/TUCwicQvF6I/AAAAAAAAKj4/j5XQcimye0A/s400/options-menu.png\" style=\"float: right; padding-left: 5px;\" width=\"230\" />As some of you have <a href=\"http://www.google.com/buzz/beaufort.francois/6eQ4E8XnZ2M\">noticed</a>, we've recently enhanced Reader's commenting abilities, via an \"Options\" menu that is present for all conversations about shared items. You can now get a link to the equivalent conversation in Google Buzz, which is handy for passing around a funny thread. If it's your shared item, you can disable comments entirely, if for example the conversation was about a topic whose time has passed.</p>\n\n<p>Additionally, you can now moderate comments within Reader. If the conversation is on an item that you shared, you have the option to remove comments directly. For all conversations, you can report comments as spam.</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Comment moderation\" height=\"293\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/TUC1JkL2mWI/AAAAAAAAKkQ/5LDhPz85W94/s1600/comment-moderation.png\" style=\"border: solid 1px #ccc; padding: 5px;\" width=\"511\" />\n</p>\n\n<p>We hope these changes will help you keep an elevated level of <a href=\"http://en.wikipedia.org/wiki/Dialogue_Concerning_the_Two_Chief_World_Systems\">discourse</a> about shared items. As always, if you have any questions or comments about these new features, please head over to <a href=\"http://www.google.com/support/forum/p/reader\">our help forums</a>, or send us a message on <a href=\"http://twitter.com/googlereader\">Twitter</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=tdVDysyIqqs:NV2c_gdvrDQ:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=tdVDysyIqqs:NV2c_gdvrDQ:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=tdVDysyIqqs:NV2c_gdvrDQ:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=tdVDysyIqqs:NV2c_gdvrDQ:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/tdVDysyIqqs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1296178320.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349395.0, 
                "author": "Peter Baldwin", 
                "id": "tag:google.com,2005:reader/item/94655b3c606c47fd", 
                "categories": [], 
                "title": "The Android Google Reader app is here!", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/ZGYHzR2OZZs/android-google-reader-app-is-here.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1291265400000000.0", 
                "content": {
                    "content": "Posted by Peter Baldwin, Software Engineer\n\n<p>It\u2019s been a long time coming, but the official Google Reader app for Android is finally here. Let\u2019s jump into the features, shall we?</p>\n\n<p>The app supports all the basics you\u2019d expect like unread counts, friends, sharing, liking, and starring, but it also has a whole lot more, including:</p>\n\n<ul>\n<li>Multiple accounts</li>\n<li>Synced preferences</li>\n<li>Full subscription features (subscribe and search from your phone)</li>\n<li>Search</li>\n</ul>\n\n<p style=\"text-align: center;\">\n<img alt=\"Google Reader Android app screenshot\" height=\"320\" src=\"http://1.bp.blogspot.com/_UymlGMFE2rA/TPQwxJ8i_vI/AAAAAAAAAF4/1xTNVdHoabM/s320/reader-border.png\" width=\"214\" /></p>\n\n<p>A couple harder to discover features we\u2019d like to highlight:</p>\n<ul>\n<li>Volume-key navigation: if you enable this in the settings, you can navigate by using your phone\u2019s volume keys for next and previous</li><li>Long-press on a folder or subscription to bring up a contextual menu that lets you rename, unsubscribe or change folders</li>\n<li>If you hit the menu key on an individual item, you can use the \u201csend\u201d feature which integrates with other apps on your phone to send the item using any 3rd party app</li>\n</ul>\n\n<p style=\"text-align: center;\"><img alt=\"Send menu screenshot\" height=\"320\" src=\"http://3.bp.blogspot.com/_UymlGMFE2rA/TPQw6r9ygDI/AAAAAAAAAGA/AuAbHtZTNc0/s320/send-resized.png\" width=\"202\" /></p>\n\n<p>We\u2019re really excited to make the first version of the app available today, and we hope you\u2019ll try it out and let us know what you think on <a href=\"http://twitter.com/googlereader\">Twitter</a> or <a href=\"http://www.google.com/support/forum/p/reader?hl=en&amp;utm_source=HC&amp;utm_medium=leftnav&amp;utm_campaign=reader\">our help forums</a>.</p>\n\n<p><b>Update:</b> Here's a link to the app on Android Market. It should run on Donut and higher.</p>\n\n<p style=\"text-align: center;\"><img alt=\"QR code with Market link\" height=\"230\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/TPaz2lF2ePI/AAAAAAAAAe0/yU7KundRBGU/s320/chart.png\" width=\"230\" /></p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=ZGYHzR2OZZs:3eqIzyG-0qU:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=ZGYHzR2OZZs:3eqIzyG-0qU:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=ZGYHzR2OZZs:3eqIzyG-0qU:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=ZGYHzR2OZZs:3eqIzyG-0qU:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/ZGYHzR2OZZs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1291265400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349410.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/869807f9fb0443ae", 
                "categories": [], 
                "title": "Welcome, Google Apps users!", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/R01FV-zY_5Q/welcome-google-apps-users.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1290224640000000.0", 
                "content": {
                    "content": "Posted by Brian Shih, Product Manager\n\n<p>Google Apps recently <a href=\"http://googleenterprise.blogspot.com/2010/11/ten-times-more-applications-for-google.html\">launched an improvement</a> that made dozens of exciting Google services available to Google Apps users for the first time. As part of this launch, Google Reader is now available to our Google Apps users for free with their Apps accounts.</p>\n\n<p>Google Apps is Google\u2019s suite of cloud-based messaging and collaboration apps used by over 30 million users in small businesses, large enterprises, educational institutions, government agencies, and non-profit organizations around the world. If your organization hasn\u2019t <a href=\"http://www.google.com/apps/intl/en/business/gogoogle.html#utm_campaign=launch&amp;utm_medium=blog&amp;utm_source=en-blog-na-us-gaplusfollow-crosspost&amp;utm_term=reader\">gone Google</a> yet you can learn more about how to lower IT costs and improve productivity and collaboration at <a href=\"http://www.google.com/apps/index.html#utm_campaign=launch&amp;utm_medium=blog&amp;utm_source=en-blog-na-us-gaplusfollow-crosspost&amp;utm_term=reader\">google.com/apps</a>.</p>\n\n<p>For those Reader users who have a Google Apps account, if your administrator has already transitioned your organization to the new infrastructure, you can now use Google Reader by signing into Reader as normal with your existing Apps account.</p>\n\n<p>For more details, read the <a href=\"http://googleenterprise.blogspot.com/2010/11/now-available-with-google-apps-google.html\">complete post on the Google Enterprise blog</a> and follow all the <a href=\"http://googleenterprise.blogspot.com/search/label/%23moregoogleapps\">updates on other newly available services for Google Apps users</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=R01FV-zY_5Q:8odsqppdbe8:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=R01FV-zY_5Q:8odsqppdbe8:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=R01FV-zY_5Q:8odsqppdbe8:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=R01FV-zY_5Q:8odsqppdbe8:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/R01FV-zY_5Q\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1290224640.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349430.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/25f4e9884f394bf6", 
                "categories": [], 
                "title": "Turning off the track changes feature", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/gy-j9KrIb0c/turning-off-track-changes-feature.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1285221780000000.0", 
                "content": {
                    "content": "Posted by Brian Shih, Product Manager\n\n<p>As of September 30th, we\u2019ll be turning off <a href=\"http://googlereader.blogspot.com/2010/01/follow-changes-to-any-website.html\">track changes</a> in Reader. While this isn\u2019t a widely used feature, we wanted to let you know in advance so you can set up a suitable alternative (such as <a href=\"http://page2rss.com/\">http://page2rss.com</a>). Your previous updates will not go away, but you will stop receiving new updates from any custom feeds you have set up.</p>\n\n<p>We apologize for any inconvenience this causes -- and as always, please feel free to visit our <a href=\"http://www.google.com/support/forum/p/reader?hl=en\">help forum</a> if you have any questions.</p><p>\n</p><p><b>Update</b>: You can use the Page2RSS transition tool to convert your feeds here: <a href=\"http://grtransition.page2rss.com/\">http://grtransition.page2rss.com/</a></p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=gy-j9KrIb0c:XnBHU8g9hF0:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=gy-j9KrIb0c:XnBHU8g9hF0:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=gy-j9KrIb0c:XnBHU8g9hF0:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=gy-j9KrIb0c:XnBHU8g9hF0:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/gy-j9KrIb0c\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1285221780.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349457.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/b1256df3c3964a34", 
                "categories": [], 
                "title": "A welcome and a look back", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/rK6RuJdZzig/welcome-and-look-back.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1284437520000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p>The Reader team was saddened to hear that <a href=\"http://blog.ask.com/2010/09/bloglines-update.html\">Bloglines</a> will be shutting its doors on October 1. Bloglines was a pioneer in the feed reading space, and for Web 2.0 in general.</p>\n\n<p>We know that nothing will be quite like Bloglines in the hearts of its users, but if you're looking for another online feed reader, we encourage you to give Reader a shot. All you need is a <a href=\"https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.google.com%2Freader%2Fview%2F&amp;hl=en&amp;service=reader\">Google account</a> (you already have one if you use Gmail) -- and here's <a href=\"http://www.youtube.com/watch?v=o1d-b8wzzMY&amp;feature=channel_page\">a video</a> to help you get started. It's also very easy to bring your Bloglines subscriptions over, you just have to <a href=\"http://www.bloglines.com/images/instruction.PNG\">export them</a> from Bloglines and <a href=\"http://www.google.com/reader/settings?display=import\">import them</a> into Reader.</p>\n\n<p>Since Reader's fifth anniversary is also approaching (though it feels like yesterday, Reader was <a href=\"http://googleblog.blogspot.com/2005/10/feed-world.html\">launched on October 7, 2005</a>), we thought it might be a good time to reflect on how Reader has grown over the past few years. While we were busy <a href=\"http://googlereader.blogspot.com/2006/09/something-looks-different.html\">redesigning</a> (<a href=\"http://googlereader.blogspot.com/2008/12/square-is-new-round.html\">twice!</a>), making friends with <a href=\"http://googlereader.blogspot.com/2010/02/readers-get-your-buzz-on.html\">Buzz</a> and <a href=\"http://googlereader.blogspot.com/2008/10/igoogle-launches-reader-integration.html\">iGoogle</a>, <a href=\"http://googlereader.blogspot.com/2008/11/is-your-web-truly-world-wide.html\">translating</a>, <a href=\"http://googlereader.blogspot.com/2007/09/breaking-up-isnt-hard-to-do.html\">breaking up</a>, <a href=\"http://googlereader.blogspot.com/2009/03/google-reader-is-your-new-watercooler.html\">gossiping</a> and <a href=\"http://googlereader.blogspot.com/2010/03/and-now-for-something-completely.html\">playing</a>, more and more people picked up the Reader habit. Here's a graph of Reader users over time (where \"user\" is defined as someone who has used Reader at least once a week):</p>\n\n<p style=\"text-align: center;\">\n<img height=\"365\" src=\"http://1.bp.blogspot.com/_QriD2y6VZ-Y/TI5pXxHVeII/AAAAAAAAIVM/OPPAEi_ljc4/s640/reader-7da.png\" width=\"480\" />\n</p>\n\n<p>And as we found out this past April, Reader users sure do like to <a href=\"http://googlereader.blogspot.com/2010/04/veritable-boatload-of-read-items.html\">read lots of items</a>. Here's another graph, this time of the number of items read per day.</p>\n\n<p style=\"text-align: center;\">\n<img height=\"365\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/TI5pYj1ACqI/AAAAAAAAIVQ/QSvj8_v_n14/s640/reader-readitems.png\" width=\"480\" />\n</p>\n\n<p>To all our users, new and old, thanks for making a great 5 years!</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=rK6RuJdZzig:Fb0eo1W_i7s:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=rK6RuJdZzig:Fb0eo1W_i7s:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=rK6RuJdZzig:Fb0eo1W_i7s:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=rK6RuJdZzig:Fb0eo1W_i7s:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/rK6RuJdZzig\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1284437520.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349559.0, 
                "author": "Arif Siddiquee", 
                "id": "tag:google.com,2005:reader/item/4d37164b7c194269", 
                "categories": [], 
                "title": "Fullscreen and more!", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/8Yu3n1PdZq8/fullscreen-and-more.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1282892760000000.0", 
                "content": {
                    "content": "Posted by Arif Siddiquee, Software Engineer\n\n<p>As Google Reader is all about reading, we thought we should give our users a chance to maximize their screen space whenever possible... thus fullscreen mode was born. You can toggle the fullscreen mode through the 'f' key. Additionally, you can use 'shift + u' to show and hide the navigation panel so you can easily change what you're reading without leaving fullscreen mode.<br /><br />\n<a href=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/THgxqVSM3HI/AAAAAAAAAdU/wo3QmZ8NCyQ/s1600/Screen+shot+2010-08-27+at+2.43.41+PM.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5510208747425553522\" src=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/THgxqVSM3HI/AAAAAAAAAdU/wo3QmZ8NCyQ/s400/Screen+shot+2010-08-27+at+2.43.41+PM.png\" style=\"cursor: hand; cursor: pointer; display: block; height: 312px; margin: 0px auto 10px; text-align: center; width: 400px;\" /></a></p>\n\n<p>Eagle-eyed viewers might have also noticed we've added a new category to <a href=\"http://www.google.com/reader/view/#trends-page\">the trends page</a>: clicked trends - now you can see which sources you click on the most.<br />\nAnd finally, something many of you have asked for before...we now show you your lifetime read item count. That's right. Every. Single.* Item.**<br /><br />\n<a href=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/THgwN-xFpfI/AAAAAAAAAdM/MIRgFJTWSQU/s1600/Screen+shot+2010-08-27+at+2.37.19+PM.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5510207160833123826\" src=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/THgwN-xFpfI/AAAAAAAAAdM/MIRgFJTWSQU/s400/Screen+shot+2010-08-27+at+2.37.19+PM.png\" style=\"cursor: hand; cursor: pointer; display: block; height: 96px; margin: 0px auto 10px; text-align: center; width: 400px;\" /></a></p>\n\n<p>*Only things you've scrolled by, or clicked on - doesn't count mark all as read.<br />\n**Okay, that's not quite accurate - once you hit around 300K (which we know some of you are already over) we stop counting for performance reasons. Consider that \"beating the game\".</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=8Yu3n1PdZq8:o6hZnnbLXaU:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=8Yu3n1PdZq8:o6hZnnbLXaU:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=8Yu3n1PdZq8:o6hZnnbLXaU:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=8Yu3n1PdZq8:o6hZnnbLXaU:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/8Yu3n1PdZq8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1282892760.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349628.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/5ed159ffb5cd45c0", 
                "categories": [], 
                "title": "Folder and tag renaming", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/6xE-SP3R0d0/folder-and-tag-renaming.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1275464340000000.0", 
                "content": {
                    "content": "Posted by Wiktor Gworek, 20% task force (Krakow, Poland)\n\n<p>Last year we <a href=\"http://googlereader.blogspot.com/2009/09/calling-all-ideas.html\">announced</a> that we wanted to hear <a href=\"http://productideas.appspot.com/#16/e=22493\">your wish list for features</a> in Google Reader, and one of most highly requested features was the ability to rename folders and tags. Today we are rolling out this feature with <a href=\"http://googlereader.blogspot.com/2010/05/little-bit-of-polish.html\">a little bit of Polish</a> help from Krakow.</p>\n\n<p>You can rename folders and tags on <a href=\"http://www.google.com/reader/settings?display=edit-labels\">the settings page</a>:</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/TAVxZhjRJeI/AAAAAAAAAaM/gpY2UbsGHXw/s1600/index.001.png\"><img alt=\"Renaming on the settings page\" border=\"0\" height=\"176\" src=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/TAVxZhjRJeI/AAAAAAAAAaM/gpY2UbsGHXw/s400/index.001.png\" width=\"400\" /></a>\n</p>\n\n<p>And you can also edit these names right from the contextual menu in your subscription list.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/TAVxgQKUixI/AAAAAAAAAaU/WEuWd9yefFs/s1600/index.002.png\"><img alt=\"Renaming from contextual menu\" border=\"0\" height=\"274\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/TAVxgQKUixI/AAAAAAAAAaU/WEuWd9yefFs/s400/index.002.png\" width=\"400\" /></a>\n</p>\n\n<p>Also, as we announced <a href=\"http://googlereader.blogspot.com/2010/05/spring-cleaning-comments-offline-and.html\">last week</a>, today we\u2019ve disabled offline access through Gears, and phased out support for older browsers.</p>\n\n<p>As always, if you have any questions or comments, please head over to <a href=\"http://www.google.com/support/forum/p/reader\">our help forums</a>, or send us a message on <a href=\"http://twitter.com/googlereader\">Twitter</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=6xE-SP3R0d0:lnZkIc-UUys:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=6xE-SP3R0d0:lnZkIc-UUys:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=6xE-SP3R0d0:lnZkIc-UUys:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=6xE-SP3R0d0:lnZkIc-UUys:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/6xE-SP3R0d0\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1275464340.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349642.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/f9178cd572f74117", 
                "categories": [], 
                "title": "Spring Cleaning: Comments, offline, and older browser support", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/XsO7Vk2CB3s/spring-cleaning-comments-offline-and.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1274764140000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p>Springtime is a great opportunity to clean up, take care of loose ends, and generally spruce things up. Since we still have a few weeks of spring <a href=\"http://www.erh.noaa.gov/cle/climate/info/seasons.html\">left</a>, the Reader team is taking this opportunity to clean things up a bit.</p>\n\n<p><b>Simplifying comments</b></p>\n\n<p>Ever since we <a href=\"http://googlereader.blogspot.com/2009/03/google-reader-is-your-new-watercooler.html\">launched</a> support for comments on shared items, one of the most frequent points of confusion has been \"who can comment on my shared items?\" (or rather, \"why can't I comment on my friends' shared items?\"). Up until now, someone had to be in a designated sharing group to be able to comment on a post, even if you were sharing publicly. To make things a lot simpler, we've made it so that if you can see a shared item, you can comment on it.</p>\n\n<p>For those of you who are sharing publicly, the next time you log in to Reader you'll get a choice between continuing to share publicly and allowing anyone to comment on your shared items, or switching to protected sharing:</p>\n\n<p style=\"text-align: center;\">\n<img alt=\"Comments dialog\" height=\"250\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/S_qlWajx-MI/AAAAAAAAH_E/ZwOgnjpbT8o/s640/comments.png\" width=\"462\" />\n</p>\n\n<p>Nothing will change for users who already had their shared items protected, since visibility and commenting for their shared items was already consistent. Keep in mind that you can always update who can view and comment on your shared items on the <a href=\"http://www.google.com/reader/view/#friends-manager-page\">sharing settings</a> page.</p>\n\n<p><b>Phasing out support for older browsers</b></p>\n\n<p>Reader is joining <a href=\"http://googledocs.blogspot.com/2010/01/web-browser-support-for-docs-and-sites.html\">Docs</a> (and many other sites) in removing support for older browsers, notably Internet Explorer 6, Firefox 1.0 and 2.0, Safari 2.0 and 3.0, and Chrome 1.0, 2.0. and 3.0. Reader is a cutting edge web application, and this will allow us to spend our time improving Reader instead of fixing issues with antiquated browsers. Starting on June 1, users of older browsers will begin to see a notification encouraging them to upgrade to any of Reader\u2019s <a href=\"http://www.google.com/support/reader/bin/answer.py?answer=182666\">supported browsers</a>.</p>\n\n<p><b>Discontinuing offline access via Gears</b></p>\n\n<p>We launched <a href=\"http://googlereader.blogspot.com/2007/05/oh-sam-i-am-can-i-read-it-on-tram.html\">offline support</a> three years ago, but only a minority of Reader users actively use it today. Because supporting offline access requires a large ongoing engineering effort, and because Gears itself is being <a href=\"http://gearsblog.blogspot.com/2010/02/hello-html5.html\">surpassed by HTML5</a>, we've decided to remove offline support in Reader starting on June 1.</p>\n\n<p>Of course, we know that offline access is important to some of you, and with the wide range of third party clients that sync with Google Reader, you don\u2019t need to give it up. Depending on your operating system, we recommend taking a look at:</p>\n\n<ul>\n<li><a href=\"http://www.newsgator.com/individuals/netnewswire/\">NetNewsWire</a> (Mac OS X)</li>\n<li><a href=\"http://www.newsgator.com/Individuals/FeedDemon/Default.aspx\">FeedDemon</a> (Windows)</li>\n<li><a href=\"http://liferea.sourceforge.net/\">Liferea</a> (Linux)</li>\n</ul>\n\n<p>Each of these alternatives will sync your subscriptions and read state with Reader, and continue to provide offline access to your feeds. For more information, please see our <a href=\"http://www.google.com/support/reader/bin/answer.py?answer=182658\">help center</a>.</p>\n\n<p>We realize that removing features and support <a href=\"http://inessential.com/2008/07/22/more_about_deleting_features\">is</a> <a href=\"http://www.marco.org/595644480\">not</a> <a href=\"http://blogs.adobe.com/jnack/2008/10/subtractive_sof.html\">easy</a>, but with this spring cleaning done, we've laid the groundwork for more Reader improvements down the line. We apologize for any inconvenience, and if you have any questions please head over to our <a href=\"http://www.google.com/support/forum/p/reader\">forum</a>, or message us on <a href=\"http://twitter.com/googlereader\">Twitter</a>.\n</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=XsO7Vk2CB3s:gDrrVr-8LqM:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=XsO7Vk2CB3s:gDrrVr-8LqM:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=XsO7Vk2CB3s:gDrrVr-8LqM:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=XsO7Vk2CB3s:gDrrVr-8LqM:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/XsO7Vk2CB3s\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1274764140.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349659.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/8656662a55b3473e", 
                "categories": [], 
                "title": "A little bit of polish", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/DUB9FbT7fdA/little-bit-of-polish.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1273289640000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p>Jak <a href=\"http://translate.google.com/translate?u=http://googlereader.blogspot.com/2009/01/what-we-did-on-our-winter-break.html&amp;hl=en&amp;langpair=auto|pl&amp;tbb=1&amp;ie=UTF-8\">wielokrotnie</a> <a href=\"http://translate.google.com/translate?u=http://googlereader.blogspot.com/2009/05/latest-round-of-reader-improvements.html&amp;hl=en&amp;langpair=auto|pl&amp;tbb=1&amp;ie=UTF-8\">robili\u015bmy</a> <a href=\"http://translate.google.com/translate?u=http://googlereader.blogspot.com/2009/08/flurry-of-features-for-feed-readers.html&amp;hl=en&amp;langpair=auto|pl&amp;tbb=1&amp;ie=UTF-8\">w</a> <a href=\"http://translate.google.com/translate?u=http://googlereader.blogspot.com/2008/03/one-more-step.html&amp;hl=en&amp;langpair=auto|pl&amp;tbb=1&amp;ie=UTF-8\">przesz\u0142o\u015bci</a>, ekipa Google Reader po\u015bwi\u0119ci\u0142a czas pomi\u0119dzy wypuszczaniem wiekszych projekt\u00f3w na prac\u0119 nad ma\u0142ymi usprawnieniami i napraw\u0119 istniej\u0105cych b\u0142\u0119d\u00f3w.</p>\n\n<p style=\"font-style: italic;\">Oh wait, not that kind of Polish, <a href=\"http://www.flickr.com/photos/masterofmadness/3770570509/\">this kind</a> of polish.</p>\n\n<p>As we've often <a href=\"http://googlereader.blogspot.com/2009/01/what-we-did-on-our-winter-break.html\">done</a> <a href=\"http://googlereader.blogspot.com/2009/05/latest-round-of-reader-improvements.html\">in</a> <a href=\"http://googlereader.blogspot.com/2009/08/flurry-of-features-for-feed-readers.html\">the</a> <a href=\"http://googlereader.blogspot.com/2008/03/one-more-step.html\">past</a>, the Reader team has taken the time between major releases to work on small features and bug fixes. Here's a round-up of the changes we've made over the past month:</p>\n\n<p>We've added support for the HTML5 <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> tags, so that when you come across <a href=\"http://vimeo.com/4366695\">an awesome video</a> you can <a href=\"http://www.google.com/reader/item/tag:google.com,2005:reader/item/3fdf429d35e50dff\">share it</a> in such a way that your mobile device-using friends can see it too.</p>\n\n<p><img alt=\"Not interested command\" border=\"0\" height=\"20\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/S-Q5r6iZRSI/AAAAAAAAHxs/pXlyFr_nLd0/s1600/not-interested.png\" style=\"float: right; padding: 5px;\" width=\"199\" />\nWe realize that our <a href=\"http://googlereader.blogspot.com/2010/02/may-we-recommend.html\">recommended items</a> may not always hit the spot (though who wouldn't like <a href=\"http://feedproxy.google.com/~r/lovelylisting/~3/K803QDR_jzc/\">a water slide in their house</a>). There is now a \"Not interested\" link at the bottom of recommended items, so that you can both hide that item and provide signals to our algorithms about the kinds of things you like and dislike.</p>\n\n<p><img alt=\"New version banner\" height=\"21\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/S-RGYFMJNLI/AAAAAAAAHxw/XekGDE3hTGw/s640/update.png\" style=\"float: right; padding: 5px;\" width=\"342\" />Reader is the kind of application that people keep open in a tab all day. While it's flattering that our users are so dedicated, we want to make sure that they don't miss out on any new features and bug fixes that we release. We've therefore added a small banner that appears whenever we release a new version. If you're in the middle of something, you can ignore it (and it'll go away for a while), but if not, newest and shinier things are just a click away. Incidentally, today we built the 500th version of Reader; over the 5 years that we've worked on Reader, that works out to almost two builds a week.</p>\n\n<p>A few improvements to <a href=\"http://www.google.com/reader/play\">Reader Play</a>: When you hit space (or shift-space), you're now automatically moved between posts, and for posts with multiple images, cycled through each image. We've also added made Play more configurable by letting you change the URL used:\n<ul>\n<li>If you add a <code>welcome=0</code> query parameter, the welcome screen is skipped, even for new and signed-out users.</li>\n<li>An <code>autoplay=1</code> query parameter can be used to start moving through posts automatically.</li>\n<li>A <code>#feed/<i>&lt;URL&gt;</i></code> fragment allows you to display a specific feed.</li>\n</ul>\n\n<p>You can combine all these to make <a href=\"http://www.google.com/reader/play/?welcome=0&amp;autoplay=1#feed/http://feeds.feedburner.com/seekingfocus\">automatically playing slideshows</a> of your favorite photoblogs.</p>\n\n<p>Finally, we've done a few other small things, like the <a href=\"http://www.google.com/reader/view/#overview-page\">Home</a> view loading faster, and the <a href=\"http://googlereader.blogspot.com/2009/08/flurry-of-features-for-feed-readers.html\">Send to</a> functionality being less susceptible to being stymied by popup blockers when used with services such as Twitter.</p>\n\n<p>The way we prioritized these tweaks and fixes was based on <a href=\"http://www.google.com/support/forum/p/reader\">forum</a> and <a href=\"http://twitter.com/googlereader\">Twitter</a> feedback, so please keep it coming.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=DUB9FbT7fdA:cgFtz6ol9Eg:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=DUB9FbT7fdA:cgFtz6ol9Eg:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=DUB9FbT7fdA:cgFtz6ol9Eg:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=DUB9FbT7fdA:cgFtz6ol9Eg:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/DUB9FbT7fdA\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1273289640.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349783.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/8010a1dbe23c48bf", 
                "categories": [], 
                "title": "A veritable boatload of read items", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/2AhKUObVxQw/veritable-boatload-of-read-items.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1270869000000000.0", 
                "content": {
                    "content": "Posted by Brian Shih, Product Manager\n\n<p>Wow. Who knew your hunger for points and badges was so insatiable? While <a href=\"http://www.google.com/googlereader/reader-advantage.html\">ReaderAdvantage&#x2122;</a> was a joke, we actually ordered and are distributing Reader badges as part of the joke. Unfortunately, so many people ordered them that we ran through our stockpile a mere 27 minutes after we <a href=\"http://googlereader.blogspot.com/2010/04/google-reader-gives-back.html\">announced the program</a>. Which got us to thinking... just how much do our users read?</p>\n<p>\nA few stats about the badge submissions:\n<ul>\n<li>13% of people who requested a badge ended up way over our \u201cTotally Sweet\u201d threshold of 314,159 items read... </li>\n<li>25% of you were Platinum (133,700 read items or more).</li>\n<li>Even more amazing, four people had read over one million lifetime items. </li>\n<li>One person had read more than two million items. (Holy cow.)</li>\n</ul>\n</p>\n\n<a href=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/S79vy2azrPI/AAAAAAAAAUU/xVzw_fqpRj0/s1600/Picture+1.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5458204192788425970\" src=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/S79vy2azrPI/AAAAAAAAAUU/xVzw_fqpRj0/s400/Picture+1.png\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 400px; height: 275px;\" /></a>\n\n<p>For comparison, the average Reader user reads about 105 items a day, which isn\u2019t bad unless you want to get to the Totally Sweet level of over 314,159 lifetime read items - at that rate it\u2019s going to take you over 8 years to get there. And if you\u2019re aiming to join the (recently founded) One Million Club, we\u2019re talking over 26 years. So, uh, time to start reading?</p>\n\n<p>While we were at it, we took a look at what users are starring, sharing, and liking the most. While many of the most-starred items are reference posts, collections of tips, or tutorials from our friends over at <a href=\"http://lifehacker.com/\">Lifehacker</a>, the most starred item lately is actually <a href=\"http://blogs.suntimes.com/scanners/2010/03/generic_movie.html\">this hilarious video</a>. That same video also shows up near the top of the latest and most liked or shared items, along with a collection of <a href=\"http://www.todayandtomorrow.net/2010/03/11/horsetail-firefall/\">interesting images</a>, <a href=\"http://designyoutrust.com/2010/03/08/tree-railing/\">designs</a>, and <a href=\"http://ffffound.com/image/3b66e92ebfe6bf8ec98611545ee34ff7986fefa5\">bizarrely useless machines</a>. It\u2019s clear that the crowd is onto something here, so if you\u2019re not getting these items in your current feeds, maybe it\u2019s time to check out <a href=\"http://www.google.com/reader/play/\">Reader Play</a> or the Recommended items section in Reader.</p>\n\n<p>P.S. We\u2019re shipping the badges soon. Really.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=2AhKUObVxQw:YbleJ5yVJGg:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=2AhKUObVxQw:YbleJ5yVJGg:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=2AhKUObVxQw:YbleJ5yVJGg:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=2AhKUObVxQw:YbleJ5yVJGg:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/2AhKUObVxQw\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1270869000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349801.0, 
                "author": "Zach Yeskel", 
                "id": "tag:google.com,2005:reader/item/27269ce922b94beb", 
                "categories": [], 
                "title": "Google Reader gives back", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/_AKTkdqqosE/google-reader-gives-back.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1270163760000000.0", 
                "content": {
                    "content": "Posted by Zach Yeskel, Product Marketing Manager\n\n<p>At the recent SXSW <a href=\"http://buzz.blogger.com/2010/03/sxsw-2010-blogger-google-reader-party.html\">conference</a>, we handed out free Google Reader T-shirts to people based on <a href=\"http://img294.yfrog.com/i/mi6.jpg/\">how many Reader items</a> they'd ever read... in their whole life. We knew that free shirts would be a hit, but we learned something much more important: a lot of people have read a lot of items. (At an average of thirty seconds per item, the most prolific readers had spent more than 180 full days of their lives perusing stuff on Reader &mdash; what Blogger <a href=\"http://buzz.blogger.com/2010/03/saving-one-million-hours-per-week.html\">gives</a>, Reader takes away)</p>\n\n<p>After the conference, several of us felt like shirts didn't seem like enough of a reward for all the valuable hours people have spent trolling through so many feeds. One thing led to another, we did a few calculations, drank a few too many cups of coffee, and today we're happy to announce Google Reader's first rewards program: <a href=\"http://www.google.com/googlereader/reader-advantage.html\">ReaderAdvantage\u2122</a>. </p>\n\n<p>The ReaderAdvantage\u2122 program is simple. You get one point for each item you read. The more you read, the more you get. Then you can trade in your points for cool stuff. And because we believe in a little friendly competition, there are four levels of ReaderAdvantage\u2122 status:</p>\n\n<ul>\n<li>Novice: 999 points</li>\n<li>Gold: 25,000 points</li>\n<li>Platinum: 133,700 points</li>\n<li>Totally Sweet: 314,159 points</li>\n</ul>\n\n<p>We considered inventing a secret ReaderAdvantage\u2122 handshake, but instead we created embroidered badges to ensure that members can easily identify their compatriots.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/_IzPv6nN_aWE/S7S0oj5ekvI/AAAAAAAAADE/G8VWiN44Wl4/s1600/reader-advantage-badge.jpg\"><img alt=\"Get your badge on\" border=\"0\" height=\"183\" src=\"http://3.bp.blogspot.com/_IzPv6nN_aWE/S7S0oj5ekvI/AAAAAAAAADE/G8VWiN44Wl4/s320/reader-advantage-badge.jpg\" title=\"Get your badge on!\" width=\"274\" /></a></p>\n\n<p>If you use Google Reader, there's no reason not to join. Visit the <a href=\"http://www.google.com/googlereader/reader-advantage.html\">ReaderAdvantage\u2122 site</a> to read all the details and enroll today. As always, please send us your thoughts and feedback in <a href=\"http://www.google.com/support/forum/p/reader?hl=en\">our forum</a> or <a href=\"http://twitter.com/googlereader\">on Twitter</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=_AKTkdqqosE:Pdoj8rvjGUQ:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=_AKTkdqqosE:Pdoj8rvjGUQ:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=_AKTkdqqosE:Pdoj8rvjGUQ:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=_AKTkdqqosE:Pdoj8rvjGUQ:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/_AKTkdqqosE\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1270163760.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349811.0, 
                "author": "Arif Siddiquee", 
                "id": "tag:google.com,2005:reader/item/ae5dc43a2eaf4a91", 
                "categories": [], 
                "title": "More Reader features in your pocket", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/hzP_aiV5abQ/more-reader-features-in-your-pocket.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1268881440000000.0", 
                "content": {
                    "content": "Posted by Arif Siddiquee, Software Engineer\n\n<table>\n<tr>\n<td style=\"padding: 0 5px;\">\n<img alt=\"Mobile menu\" border=\"0\" height=\"281\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/S6AQ9t8TN6I/AAAAAAAAHIc/AbSQNhgW0Ec/s320/menu-options.png\" width=\"179\" />\n</td>\n<td style=\"padding: 0 5px;\">\n<img alt=\"New item header\" border=\"0\" height=\"213\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/S6ARBCXlKXI/AAAAAAAAHIk/mXK-3N-LorE/s320/mobile-header.png\" width=\"320\" />\n</td>\n</tr>\n</table>\n\n<p>The more eagle-eyed Reader users have noticed a few tweaks being made to Reader's mobile interface over the past few days:</p>\n<ul>\n<li>We've brought over a few more features from the desktop version of Reader: <a href=\"http://googlereader.blogspot.com/2009/10/reading-gets-personal-with-popular.html\">magic ranking</a> and <a href=\"http://googlereader.blogspot.com/2007/09/we-found-it.html\">search</a>. Both can be found in the option drop-down menu.</li>\n<li>For better consistency with the desktop version, we've made the titles of items be links to the original page</li>\n<li>The top of each item now has \"collapse\" and \"next item\" links. This way there's always a consistent space for your thumb to hit so you can advance to the next item.</li>\n</ul>\n\n<p>Since we know the best mobile content is short and sweet, we're going to leave you with that. Feel free to get in touch with us <a href=\"http://twitter.com/googlereader\">on Twitter</a> or <a href=\"http://www.google.com/support/forum/p/reader\">on our help group</a> with feedback on these changes.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=hzP_aiV5abQ:4LeRH6fi4v8:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=hzP_aiV5abQ:4LeRH6fi4v8:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=hzP_aiV5abQ:4LeRH6fi4v8:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=hzP_aiV5abQ:4LeRH6fi4v8:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/hzP_aiV5abQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1268881440.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349863.0, 
                "author": "Unknown", 
                "id": "tag:google.com,2005:reader/item/44a585d2685f4131", 
                "categories": [], 
                "title": "\u200bAnd now for something completely different", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/YtQl2uDkfXg/and-now-for-something-completely.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1268284380000000.0", 
                "content": {
                    "content": "Posted by Garrett Wu, Software Engineer\n\n<p>Since I've been working on Google Reader, I've told a lot of my friends about how great it is. And while some of them try Reader and find it really useful, many of them aren\u2019t interested in taking the time to get Reader set up. That\u2019s why today, I\u2019m happy to announce an experimental product from the Google Reader team that makes the best stuff in Reader more accessible for everyone, while giving Reader users a new way to view their feeds. It\u2019s called Google Reader Play, and it\u2019s a new way to browse interesting stuff on the web that\u2019s easy to use and personalized to the things you like. Best of all, there\u2019s no set-up required: visit <a href=\"http://www.google.com/reader/play\">google.com/reader/play</a> to give it a try.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S5f2JFEjPkI/AAAAAAAAARs/ujaRKLEKt7Y/s1600-h/play-image-2.png\"><img alt=\"Google Reader Play screenshot\" border=\"0\" height=\"279\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S5f2JFEjPkI/AAAAAAAAARs/ujaRKLEKt7Y/s400/play-image-2.png\" width=\"400\" /></a></p>\n\n<p>In Google Reader Play, items are presented one at a time, and each item is big and full-screen. After you've read an item, just click the next arrow to move to the next one, or click any item on the filmstrip below to fast-forward. Of course, you can click the title or image of any item to go to the original version. And since so much of the good stuff online is visual, we automatically enlarge images and auto-play videos full-screen.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S5f2QdvS1dI/AAAAAAAAAR0/geNdKp5AUzo/s1600-h/play-video.png\"><img alt=\"Google Reader Play video screenshot\" border=\"0\" height=\"278\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S5f2QdvS1dI/AAAAAAAAAR0/geNdKp5AUzo/s400/play-video.png\" width=\"400\" /></a></p>\n\n<p>Reader Play adapts to your tastes -- as you browse, you can let us know which stuff you enjoy by clicking the \"like\" button, and we'll use that info to show you more items we think you'll like. If you want, you can also choose categories, and we'll personalize your stream to only show you stuff from those categories. And you don't even need a Google account to use Reader Play. Of course, if you want to star, like, or share items, we'll ask you to sign in to your Google account. Since Reader and Reader Play share the same infrastructure, any actions you take in one will be reflected in the other.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/S5f2ZZJUnaI/AAAAAAAAAR8/38gE7NMejuo/s1600-h/stars-etc.png\"><img alt=\"Google Reader Play actions\" border=\"0\" height=\"129\" src=\"http://3.bp.blogspot.com/_O3jT2uzrsQE/S5f2ZZJUnaI/AAAAAAAAAR8/38gE7NMejuo/s400/stars-etc.png\" width=\"300\" /></a></p>\n\n<p>You might be wondering where we find all the awesome stuff in Reader Play. It uses the same technology as the <a href=\"http://www.google.com/support/reader/bin/answer.py?hl=en&amp;answer=164681\">Recommended Items</a> feed in Reader to identify and aggregate the most interesting items on the web. If you sign in, Reader Play will also be personalized with items that people you\u2019re following have shared in Google Reader, and items similar to ones you\u2019ve previously liked, starred, or shared.</p>\n\n<p>Since Reader Play is an experiment, it\u2019s launching in <a href=\"http://labs.google.com/\">Google Labs</a> for now. To be clear, Reader Play isn't intended to replace Google Reader: both Google Reader and Reader Play are about finding and reading interesting stuff online. In essense, Reader Play is a different view of Reader. It's designed to be a fun and easy way to browse interesting items, while Reader is a highly customizable way to organize your feeds, keep track of what you've read, and much more. In Reader, you can switch to this view by clicking \"View in Reader Play\" from the feed settings menu.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/S5gJ6d-Tt7I/AAAAAAAAHH4/nIgVbukfi70/s1600-h/play-folder.png\"><img alt=\"View in Reader Play command\" height=\"174\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/S5gJ6d-Tt7I/AAAAAAAAHH4/nIgVbukfi70/s320/play-folder.png\" style=\"border: solid 1px #ccc; padding: 5px;\" width=\"320\" /></a></p>\n\n<p><a href=\"http://www.google.com/reader/play\">Try Reader Play</a> today and let us know what you think. Send us feedback in <a href=\"http://www.google.com/support/forum/p/reader\">our forum</a> or on <a href=\"http://twitter.com/googlereader\">Twitter</a>, and check out our <a href=\"http://www.google.com/support/reader/bin/answer.py?answer=176734\">help article</a> for more info.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=YtQl2uDkfXg:MLY8dZO-EIM:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=YtQl2uDkfXg:MLY8dZO-EIM:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=YtQl2uDkfXg:MLY8dZO-EIM:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=YtQl2uDkfXg:MLY8dZO-EIM:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/YtQl2uDkfXg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1268284380.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349873.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/7b0fc225cc474ca2", 
                "categories": [], 
                "title": "May we recommend...", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/_vH9YFpR5YM/may-we-recommend.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1266572460000000.0", 
                "content": {
                    "content": "Posted by Laurence Gonsalves, Software Engineer\n\n\u200b<p>Long time readers of our blog will note that we occasionally throw in links to <a href=\"http://www.boingboing.net/2010/02/11/whisky-toothpaste.html\">crazy</a>, <a href=\"http://www.thedieline.com/blog/2010/02/cups-as-art.html\">interesting</a>, and <a href=\"http://www.designboom.com/weblog/cat/10/view/9069/lego-big-mac.html\">fun</a> items in our posts. You may be wondering, \u201cHow can I find such interesting content to share?\u201d Today we\u2019re launching two new features that are designed to help you do just that:</p>\n\n<ul>\n<li>Recommended items get personal - When we launched <a href=\"http://googlereader.blogspot.com/2009/10/reading-gets-personal-with-popular.html\">Popular items</a> many of you wanted to see even more personalized recommendations. With the latest round of improvements, we\u2019ve started inserting items selected just for you inside the Recommended items section. This is great if you\u2019ve got interests that are less mainstream. If you love <a href=\"http://www.engadget.com/2010/02/15/lego-cubestormer-robot-solves-rubiks-cube-in-sub-12-second-whir/\">Lego robots</a>, for example, then you should start to notice more of them in your Recommended items.\n\n<p style=\"text-align: center;\">\n<a href=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S32q2DpufmI/AAAAAAAAAQc/5Pzwm0sEwaw/s1600-h/Picture+2.png\"><img alt=\"Recommended items\" border=\"0\" height=\"167\" src=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S32q2DpufmI/AAAAAAAAAQc/5Pzwm0sEwaw/s400/Picture+2.png\" width=\"258\" /></a>\n</p>\n\n</li> \n<li>Even more related feeds - If you\u2019ve ever discovered a cool blog on, say, underwater basket-weaving and wanted to find more on the same topic, we\u2019ve added a few easy ways to find related feeds. Hover over any of your subscriptions, click the menu and check out \u201cMore like this...\u201d to see related feeds.  \n\n<p style=\"text-align: center;\">\n<a href=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/S33hgMuHioI/AAAAAAAAHEc/PC6y8Bj1vqs/s1600-h/related-feeds.png\"><img alt=\"Related feeds menu\" border=\"0\" height=\"250\" src=\"http://3.bp.blogspot.com/_QriD2y6VZ-Y/S33hgMuHioI/AAAAAAAAHEc/PC6y8Bj1vqs/s400/related-feeds.png\" width=\"400\" /></a>\n</p>\n\nWe\u2019ll also show you related feeds when looking at the preview of any feed.\n\n<p style=\"text-align: center;\">\n<a href=\"http://1.bp.blogspot.com/_QriD2y6VZ-Y/S33iUDnF3rI/AAAAAAAAHEk/FkjxObye33w/s1600-h/kanye.png\"><img alt=\"Related feeds in preview mode\" border=\"0\" height=\"123\" src=\"http://1.bp.blogspot.com/_QriD2y6VZ-Y/S33iUDnF3rI/AAAAAAAAHEk/FkjxObye33w/s400/kanye.png\" width=\"400\" /></a>\n</p>\n\n</li>\n</ul>\n\n<p>We hope these new features will help you find more content that interests you, whether that\u2019s LOLcats or cooking.</p>\n\n<p>As always, feel free to come visit <a href=\"http://www.google.com/url?q=http%3A%2F%2Fwww.google.com%2Fsupport%2Fforum%2Fp%2Freader%3Fhl%3Den&amp;sa=D\">our help forums</a> or <a href=\"http://twitter.com/googlereader\">Twitter</a> to leave us some feedback.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=_vH9YFpR5YM:OQ5UE5vj3bA:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=_vH9YFpR5YM:OQ5UE5vj3bA:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=_vH9YFpR5YM:OQ5UE5vj3bA:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=_vH9YFpR5YM:OQ5UE5vj3bA:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/_vH9YFpR5YM\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1266572460.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349884.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/f819dfacd6254d62", 
                "categories": [], 
                "title": "Readers: Get your Buzz on", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/dBHc0CQ2dMI/readers-get-your-buzz-on.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1265770920000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p>We know that many people like Reader because it makes it so easy to share interesting stuff with a wide group of friends. That's why, over the past year, we've added a number of features to help you share the content you find most interesting: <a href=\"http://googlereader.blogspot.com/2009/03/google-reader-is-your-new-watercooler.html\">comments</a>, <a href=\"http://googlereader.blogspot.com/2009/07/following-liking-and-people-searching.html\">following, people search, liking</a>, and \"<a href=\"http://googlereader.blogspot.com/2009/08/flurry-of-features-for-feed-readers.html\">send to.</a>\"\n\n<p>However, even with all these great features, sharing has been mostly limited to the subset of your friends who use Google Reader. While many people use Reader, we know that even more use Gmail. That's why today, we're thrilled to announce that with the <a href=\"http://gmailblog.blogspot.com/2010/02/google-buzz-in-gmail.html\">launch of Google Buzz</a>, the <a href=\"http://pillarboxpost.wordpress.com/2010/01/29/looking-into-the-past/\">awesome</a> <a href=\"http://joannecasey.blogspot.com/2010/02/how-to-store-and-organise-cats.html\">items</a> <a href=\"http://www.engadget.com/2010/02/06/eco-shocker-turbine-light-concept-uses-wind-to-light-highways/\">you</a> <a href=\"http://www.waze.com/blog/the-19-most-complex-and-dangerous-roads-in-the-world/\">share</a> in Reader can also be shared with all your friends who use Gmail with Google Buzz.</p>\n\n<p style=\"text-align: center;\">\n<a href=\"http://2.bp.blogspot.com/_QriD2y6VZ-Y/S3D8yzG0DaI/AAAAAAAAHCY/LR3OxI5NYyg/s1600-h/buzz-reader.png\"><img alt=\"\" border=\"0\" height=\"392\" src=\"http://2.bp.blogspot.com/_QriD2y6VZ-Y/S3D8yzG0DaI/AAAAAAAAHCY/LR3OxI5NYyg/s400/buzz-reader.png\" title=\"CSBC &gt;&gt; Dolphins\" width=\"400\" /></a><br />\n<span style=\"color: #666; font-style: italic;\">A shared item in Reader (background) and Buzz (foreground)</span>\n</p>\n\n<p>Getting started with Google Buzz is easy. Just head over to Gmail and you'll be able to link up your Google Reader account with just a few clicks. Then, anything you share in Reader will automatically be posted to Buzz. Comments are even shared between both products, so you can view and participate in the conversation wherever you'd prefer.</p>\n\n<p>And don't worry, you don't have another list of friends or followers to manage. The people you follow in Reader are the same people you follow in Buzz \u2013 those you've already chosen to follow in Reader, plus the people you email and chat with the most in Gmail.</p>\n\n<p>Check out the video below, explaining everything you can do with Google Buzz!</p>\n\n<p style=\"text-align: center;\"></p>\n\n<p>Head to our <a href=\"http://www.google.com/support/reader/bin/answer.py?hl=en&amp;answer=83000\">help center</a> for more details about the Buzz integration in Reader, or leave us feedback in <a href=\"http://www.google.com/support/forum/p/reader\">our forum</a>, <a href=\"http://twitter.com/googlereader\">on Twitter</a> or even using <a href=\"https://mail.google.com/mail/#buzz/search/%23googlereader\">Buzz itself</a>.</p>\n\n<p>P.S. Keep in mind that Google Buzz is rolling out gradually, it might be a few days before you get it for your account.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=dBHc0CQ2dMI:KzwCdOZ5rE0:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=dBHc0CQ2dMI:KzwCdOZ5rE0:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=dBHc0CQ2dMI:KzwCdOZ5rE0:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=dBHc0CQ2dMI:KzwCdOZ5rE0:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/dBHc0CQ2dMI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1265770920.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321349892.0, 
                "author": "Brian Shih", 
                "id": "tag:google.com,2005:reader/item/b5f7332419574e14", 
                "categories": [], 
                "title": "Follow changes to any website", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/yrlPr3qiGtg/follow-changes-to-any-website.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1264485660000000.0", 
                "content": {
                    "content": "<i>At Google we're always looking for ways to take advantage of work being done in other parts of the organization. So when a team approached us with a way to follow changes from websites without feeds, we jumped at the opportunity. Post by Liza Ma, Product Manager.</i>\n\n<p>Feeds make it easy to follow updates to all kinds of webpages, from blogs to news sites to Craigslist queries, but unfortunately not all pages on the web have feeds. Today we're rolling out a change in Google Reader that lets you create a custom feed to track changes on pages that don't have their own feed. </p>\n\n<p>These custom feeds are most useful if you want to be alerted whenever a specific page has been updated. For example, if you wanted to follow Google.org's latest products, just type \"http://www.google.org/products.html\" into Reader's \"Add a subscription\" field. Click \"create a feed\", and Reader will periodically visit the page and publish any significant changes it finds as items in a custom feed created just for that page.</p>\n\n<a href=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/S137k49N3DI/AAAAAAAAAQE/OGRTVm0gkj0/s1600-h/Picture+11.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5430773336861695026\" src=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/S137k49N3DI/AAAAAAAAAQE/OGRTVm0gkj0/s400/Picture+11.png\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 400px; height: 73px;\" /></a>\n\n\n<p>Here are some more example feeds for sites without feeds that you could follow:\n<ul>\n<li><a href=\"http://www1.macys.com/catalog/index.ognc?CategoryID=27416&amp;PageID=117753556101860&amp;kw=Special%20Offers\">Macy's - special offers</a> [<a href=\"http://www.google.com/reader/view/#stream/webfeed%2F8765363390147717237\">view in Reader</a>]</li>\n<li><a href=\"http://www.cs.nyu.edu/\">NYU Computer Science homepage</a> [<a href=\"http://www.google.com/reader/view/#stream/webfeed%2F12825487959154103617\">view in Reader</a>]</li>\n<li><a href=\"http://zillow.com/\">Zillow.com homepage</a>  [<a href=\"http://www.google.com/reader/view/#stream/webfeed%2F7213111791824341699\">view in Reader</a>]</li>\n</ul>\n\n<p>We provide short snippets of page changes to help you quickly decide if the page is worth revisiting and we're working on improving the quality of these snippets. If you don't want Google to crawl or create feeds for a specific site, site owners can <a href=\"http://www.google.com/support/reader/bin/answer.py?hl=en&amp;answer=172963\">opt-out</a>.</p>\n\n<p>If you have a feed-less page you've been dying to follow, sign in to Google Reader and try it out for yourself. As always, if you have any feedback, please visit our <a href=\"http://www.google.com/support/forum/p/reader?hl=en\">official help forums</a> or our <a href=\"http://twitter.com/googlereader\">Twitter account</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=yrlPr3qiGtg:EOFfGDTie4A:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=yrlPr3qiGtg:EOFfGDTie4A:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=yrlPr3qiGtg:EOFfGDTie4A:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=yrlPr3qiGtg:EOFfGDTie4A:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/yrlPr3qiGtg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1264485660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321350003.0, 
                "author": "Arif Siddiquee", 
                "id": "tag:google.com,2005:reader/item/a18876a509f942b0", 
                "categories": [], 
                "title": "\u200bA new year, new mobile features, and more!", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/zvZivwLRXSs/new-year-new-mobile-features-and-more.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1262761080000000.0", 
                "content": {
                    "content": "Posted by Arif Siddiquee, Software Engineer\n\n\u200b<p>We know that many of you like to take Reader with you wherever you go, so today we are updating our mobile interface by adding a few new features along with a new streamlined look. </p>\n\n<p>New mobile features include support for \"liking\", tagging, and sorting feeds by oldest/newest. These are all features that were previously only available on the web interface, and we\u2019ve worked to get them into the mobile version as quickly as possible.</p>\n\n<p>As far as streamlining goes, we\u2019ve made a few improvements to give you more features with less clutter. First, we redesigned the bottom action bar to include a \u201cMore\u201d link, revealing additional options (with the most common actions selected by default).</p>\n<br />\n<a href=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S0O-z9uhOtI/AAAAAAAAAPg/or_A0QhIL84/s1600-h/photo+(3).jpg\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5423388176236493522\" src=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S0O-z9uhOtI/AAAAAAAAAPg/or_A0QhIL84/s400/photo+(3).jpg\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 340px; height: 245px;\" /></a>\n<br />\n<p>We\u2019ve also updated the main header to be consistent with other Google mobile applications, specifically Gmail, Calendar, and Latitude. And we\u2019ve added an option drop-down in place of the old secondary tool bar, to give you a little more space for your feed items. We hope this also reduces those accidental \u201cmark as read\u201d accidents that happen on occasion.</p>\n<br />\n<a href=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S0OznzvI7WI/AAAAAAAAAPY/f3gN1LOOD74/s1600-h/photo+(1).jpg\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5423375872768404834\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/S0OznzvI7WI/AAAAAAAAAPY/f3gN1LOOD74/s400/photo+(1).jpg\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 320px; height: 285px;\" /></a>\n<br />\n<p>On Reader's web interface, we've made it easier to find people who are sharing stuff similar to you. Take a peek at the new people recommendations (in the \u201c<a href=\"http://www.google.com/reader/view/#directory-page/2\">Recomended sources</a>\u201d section on the web interface) to find folks with shared items we think you\u2019ll enjoy. It's a nifty way to discover new feeds and people that you might not have discovered otherwise.</p>\n<br />\n<a href=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S0O_ELGYB5I/AAAAAAAAAPo/jwy7CMatO3o/s1600-h/Picture+9.png\"><img alt=\"\" border=\"0\" id=\"BLOGGER_PHOTO_ID_5423388454704121746\" src=\"http://2.bp.blogspot.com/_O3jT2uzrsQE/S0O_ELGYB5I/AAAAAAAAAPo/jwy7CMatO3o/s400/Picture+9.png\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 261px; height: 169px;\" /></a>\n<br />\n<p>As always, we listen to your feedback and use it to improve Reader. If there are specific features you miss on the mobile version of Google Reader, head over to our <a href=\"http://productideas.appspot.com/#15/e=22493&amp;t=3b4de\">Product Ideas page</a> and leave us a note. We love all kinds of feedback through our <a href=\"http://www.google.com/support/forum/p/reader?hl=en\">official help forums</a> and our <a href=\"http://twitter.com/googlereader\">Twitter</a> account.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=zvZivwLRXSs:BHVAcuraiSI:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=zvZivwLRXSs:BHVAcuraiSI:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=zvZivwLRXSs:BHVAcuraiSI:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=zvZivwLRXSs:BHVAcuraiSI:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/zvZivwLRXSs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1262761080.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321350013.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/18e79475096c4fc3", 
                "categories": [], 
                "title": "Take your Reader wherever Google Chrome goes", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/igov1IWURrc/take-your-reader-wherever-google-chrome.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1260321000000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p>\n<a href=\"http://1.bp.blogspot.com/_QriD2y6VZ-Y/Sx5g-RAP1LI/AAAAAAAAGhU/bgvwj9teZrQ/s1600-h/reader-notifier.png\"><img alt=\"Google Reader Notifier\" border=\"0\" height=\"133\" src=\"http://1.bp.blogspot.com/_QriD2y6VZ-Y/Sx5g-RAP1LI/AAAAAAAAGhU/bgvwj9teZrQ/s640/reader-notifier.png\" width=\"203\" /></a>\nThe <a href=\"http://www.google.com/chrome\">Google Chrome</a> team is <a href=\"http://chrome.blogspot.com/2009/12/google-chrome-for-holidays-mac-linux.html\">launching</a> beta support for extensions today, and we thought we'd take a shot at writing a Reader extension. The <a href=\"https://chrome.google.com/extensions/detail/apflmjolhbonpkbkooiamcnenbmbjcbf\">Google Reader Notifier</a> displays the number of unread items in your Reader account in Google Chrome's toolbar. When clicked, the toolbar icon displays a popup preview of the latest items in your account. This way, you can keep an eye on your Reader account wherever on the web you are.\n</p>\n\n<p>Let us know how you like the extension (and what other features you'd like to see in it) by adding a review on <a href=\"https://chrome.google.com/extensions/detail/apflmjolhbonpkbkooiamcnenbmbjcbf\">its page</a> in the <a href=\"https://chrome.google.com/extensions\">extension gallery</a>.</p>\n\n<p>Note that extensions are currently available only for the <a href=\"http://www.google.com/landing/chrome/beta/\">beta channel</a> of Google Chrome for Windows and Linux, so you'll want to make sure you're running one of those browsers before you <a href=\"https://chrome.google.com/extensions/detail/apflmjolhbonpkbkooiamcnenbmbjcbf\">install</a> the extension.</p>\n\n<p><a href=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/Sx5fixzcDKI/AAAAAAAAGhM/HMvYo7tqDcw/s1600-h/rss-extension.png\" style=\"clear: left; float: left; margin-right: 5px;\"><img alt=\"RSS subscribe extension\" border=\"0\" height=\"150\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/Sx5fixzcDKI/AAAAAAAAGhM/HMvYo7tqDcw/s200/rss-extension.png\" width=\"200\" /></a>\nReader users may want to try the <a href=\"https://chrome.google.com/extensions/detail/nlbjncdgjeocebhnmkbbbdekmmmcbfjd\">RSS subscription extension</a> too. It adds previewing and one-click subscribe support for any RSS or Atom feed that you happen to come across. And feel free to <a href=\"https://chrome.google.com/extensions/\">browse</a> or <a href=\"https://chrome.google.com/extensions/search?q=google+reader\">search</a> for other handy extensions.</p>\n\n<p>And if you're a developer itching to write your own extension, you'll want to check out <a href=\"http://code.google.com/chrome/extensions/\">the extensive documentation</a> and <a href=\"http://code.google.com/chrome/extensions/samples.html\">code samples</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=igov1IWURrc:wYYYORIT5jQ:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=igov1IWURrc:wYYYORIT5jQ:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=igov1IWURrc:wYYYORIT5jQ:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=igov1IWURrc:wYYYORIT5jQ:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/igov1IWURrc\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1260321000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321350039.0, 
                "author": "Mihai Parparita", 
                "id": "tag:google.com,2005:reader/item/422c8f1935204486", 
                "categories": [], 
                "title": "Let your subscriptions' personality come through", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/CD_rIGYCmFs/let-your-subscriptions-personality-come.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1259115180000000.0", 
                "content": {
                    "content": "Posted by Mihai Parparita, Software Engineer\n\n<p><img alt=\"Favicons menu screenshot\" height=\"347\" src=\"http://4.bp.blogspot.com/_QriD2y6VZ-Y/SwveolYgfvI/AAAAAAAAGgg/etzf1lw3N-U/s640/favicons.png\" style=\"border: solid 1px #eee; float: right; margin-left: 5px;\" width=\"267\" />We <a href=\"http://twitter.com/googlereader/status/4306878194\">recently</a> asked you for your ideas (and votes) on how to make Reader better. One of the more popular suggestions was <a href=\"http://productideas.appspot.com/#11/e=22493&amp;t=agxwcm9kdWN0aWRlYXNyLwsSCERvcnlVc2VyIiF1YWQ3Njk4NzQ2OGJiNGRkNTRiNTllOWFlODgyYjkyMTgM\">adding favicon support for subscriptions</a>, so today we're introducing just that (thanks to <a href=\"http://googleblog.blogspot.com/2006/05/googles-20-percent-time-in-action.html\">20%-er</a> Shreyas Desai).</p>\n\n<p>We realize that not everyone wants their subscription list to turn into a multi-colored  extravaganza, so we've made it into a setting that you can access from your subscriptions menu.</p>\n\n<p>Be on the lookout for <a href=\"http://productideas.appspot.com/#15/e=22493&amp;t=22494&amp;v=27\">more ideas</a> being implemented, and feel free to let us know how you like this feature <a href=\"http://twitter.com/googlereader\">on Twitter</a> or <a href=\"http://www.google.com/support/forum/p/reader\">in our help forum</a>.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=CD_rIGYCmFs:hvNqEpapjkA:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=CD_rIGYCmFs:hvNqEpapjkA:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=CD_rIGYCmFs:hvNqEpapjkA:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=CD_rIGYCmFs:hvNqEpapjkA:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/CD_rIGYCmFs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1259115180.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://googlereader.blogspot.com/atom.xml", 
                    "htmlUrl": "http://googlereader.blogspot.com/", 
                    "title": "Official Google Reader Blog"
                }, 
                "updated": 1321350181.0, 
                "author": "Beverly Yang", 
                "id": "tag:google.com,2005:reader/item/00f33ab80fc9441f", 
                "categories": [], 
                "title": "Reading gets personal with Popular items and Personalized ranking", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/blogspot/dtKx/~3/uDJo0ohRQMQ/reading-gets-personal-with-popular.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1256279340000000.0", 
                "content": {
                    "content": "Posted by Beverly Yang, Software Engineer\n\n<p><i>(Cross-posted with the <a href=\"http://googleblog.blogspot.com/2009/10/reading-gets-personal-with-popular.html\">Official Google Blog</a>)</i></p>\n\n<p>Today, we're launching two changes to Google Reader to help you discover more interesting content faster. Just as the <a href=\"http://googleblog.blogspot.com/2005/06/search-gets-personal.html\">launch of Personalized Search</a> improved search results based on your search history, these changes use your Reader Trends to improve your reading experience.</p>\n\n<ul>\n<li><b>Explore section</b> - We're always trying to help you discover new stuff in Reader, and today we're introducing \"Popular items\" and \"Recommended sources\", two ways to find interesting content from all over the Internet. We use algorithms to find top-rising images, videos and pages from anywhere (not just your subscriptions), collect them in the new <a href=\"http://www.google.com/reader/view/#stream/pop%2Ftopic%2Ftop%2Flanguage%2Fen\">Popular items</a> section and order them by what we think you'll like best. Now you don't have to be embarrassed about missing that hilarious video everyone is talking about &mdash; it should show up in your \"Popular items\" feed automatically. And to make it easier to find interesting feeds, we're moving <a href=\"http://googlereader.blogspot.com/2007/11/attack-of-interns-recommendations-and.html\">recommendations</a> into the new Explore section and giving it a new name &mdash; \"Recommended sources.\" Like always, it uses your <a href=\"http://www.google.com/reader/view/#trends-page\">Reader Trends</a> and <a href=\"http://www.google.com/history/\">Web History</a> (if you're opted into Web History) to generate a list of feeds we think you might like.\n<p style=\"text-align: center;\"><a href=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/SuBpHvrIIvI/AAAAAAAAAOs/1atDtAFjMas/s1600-h/explore.png\"><img alt=\"Explore section\" border=\"0\" height=\"168\" src=\"http://1.bp.blogspot.com/_O3jT2uzrsQE/SuBpHvrIIvI/AAAAAAAAAOs/1atDtAFjMas/s400/explore.png\" width=\"260\" /></a></p>\n</li>\n<li><b>Personalized ranking</b> - Only have a 10 minute coffee break and want to see the best items first? All feeds now have a new sort option called \"magic\" that re-orders items in the feed based on your personal usage, and overall activity in Reader, instead of default chronological order. Click \"Sort by magic\" under the \"Feed settings\" menu of your feed (or folder) to switch to personalized ranking. Unlike the old \"auto\" ranking, this new ranking is personalized for you, and gets better with time as we learn what you like best \u2014 the more you \"like\" and \"share\" stuff, the better your magic sort will be. Give it a try on a high-volume feed folder or <a href=\"http://www.google.com/reader/view/user/-/state/com.google/reading-list\">All items</a> and see for yourself!\n<p style=\"text-align: center;\">\n<a href=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/SuBpPXdY4xI/AAAAAAAAAO0/thg0e3fGi6s/s1600-h/ranking.png\"><img alt=\"Magic sorting\" border=\"0\" height=\"134\" src=\"http://4.bp.blogspot.com/_O3jT2uzrsQE/SuBpPXdY4xI/AAAAAAAAAO0/thg0e3fGi6s/s400/ranking.png\" width=\"191\" /></a></p>\n</li>\n</ul>\n<p>The goal of personalization at Google remains the same as ever: to help you find the best content on the web. We hope these new features help you do just that \u2014 go <a href=\"http://www.google.com/reader/view/#stream/pop/explore\">Explore</a> for yourself.</p>\n\n<p>Finally, we'd love to hear your feedback \u2014 share your thoughts on <a href=\"http://www.google.com/support/forum/p/reader?hl=en\">our help group</a>, <a href=\"http://twitter.com/googlereader\">Twitter</a> or the Reader section of <a href=\"http://getsatisfaction.com/google_reader\">Get Satisfaction</a>, a third party support community.</p><div class=\"feedflare\">\n<a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=uDJo0ohRQMQ:KMdYwIOReHA:V_sGLiPBpWU\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=uDJo0ohRQMQ:KMdYwIOReHA:V_sGLiPBpWU\" /></a> <a href=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?a=uDJo0ohRQMQ:KMdYwIOReHA:-BTjWOF_DHI\"><img border=\"0\" src=\"http://feeds.feedburner.com/~ff/blogspot/dtKx?i=uDJo0ohRQMQ:KMdYwIOReHA:-BTjWOF_DHI\" /></a>\n</div><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/blogspot/dtKx/~4/uDJo0ohRQMQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516314518", 
                "published": 1256279340.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://googlereader.blogspot.com/", 
        "updated": 1530516314.518379, 
        "id": "feed/http://googlereader.blogspot.com/atom.xml", 
        "title": "Official Google Reader Blog"
    }, 
    "feed/https://www.101cookbooks.com/feed": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1530485881.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/f578084660f24db0", 
                "categories": [], 
                "title": "Classic Macaroni Salad", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/classic-macaroni-salad/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530485881000000.0", 
                "content": {
                    "content": "<p>This is a fresh take on classic macaroni salad, inspired by my dad. If you invite him to a picnic, barbecue, housewarming, or block party this time of year, odds are good he&#8217;ll show up with a macaroni salad. He&#8217;ll wheel it around in a cooler and when the time is right, he&#8217;ll flip the top and pull a cornflower blue bowl from the ice. The bowl is what I notice first, ceramic with a flower detail on the inside rim, it&#8217;s part of a set of three my grandma left when she died a few years back. The one he uses is medium-sized, and makes its appearance with plastic wrap across the top, secured with a rubber band.\u00a0<img alt=\"Classic Macaroni Salad Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/classic-macaroni-salad-recipe-1.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\nI&#8217;ve had my dad&#8217;s macaroni salad twice in the last ten days, and thought I&#8217;d share my take the classic. There are a couple of tricks I keep up my sleeve. I&#8217;ll also offer up some tips and considerations to play around with depending on who you might be sharing your salad with. For example, there&#8217;s no reason you can&#8217;t whip up a vegan version if needed. Or, let&#8217;s say you have a gluten-free friend, you can make a quick swap using chickpea pasta elbows, no problem. I&#8217;ll note tweaks down below and in the recipe headnotes!<br />\n<img alt=\"Classic Macaroni Salad Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/classic-macaroni-salad-recipe-2.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>A Few Nutritious Tweaks</h2>\n<p><span style=\"text-decoration: underline;\">The mayo</span>: Most classic macaroni salads are <em>not-very-good-for-you</em> mayo bombs. I&#8217;ve tried to offer up a few alternative ideas here, ways you can maintain all the things you love about macaroni salad, and make it more healthful as well. For example, this recipe calls for mayo. You can use classic, commercial mayo, but I also link to a simple vegan mayo I like to use here instead, it brings the spirit of a mayo-based salad with a fraction of the calories, fat, and it&#8217;s vegan. </p>\n<p><span style=\"text-decoration: underline;\">The pasta</span>: You can experiment with different elbow macaroni. I often use whole wheat elbow macaroni. I also really like chickpea based elbow macaroni (like <a href=\"https://www.eatbanza.com/products/banza-chickpea-elbows\">this one</a>), and I&#8217;m seeing it in an increasing number of stores. The later is a great option for mixed-crowd parties or households avoiding gluten.<img alt=\"Classic Macaroni Salad Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/classic-macaroni-salad-recipe-3.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<img alt=\"Classic Macaroni Salad Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/classic-macaroni-salad-recipe-4.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Seasoning is Key</h2>\n<p>The last thing I&#8217;ll add here is this. You really need to taste and adjust as you toss this salad. I&#8217;ve shared general amounts, but keep adding pepper, or lemon juice, or salt until the flavors really pop off the pasta. It&#8217;ll happen. Under-season and you end up with a flat-tasting salad. :/</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/classic-macaroni-salad/\" rel=\"nofollow\">Classic Macaroni Salad</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1530485881.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1530395425.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/a4ce66c517cd4b04", 
                "categories": [], 
                "title": "Simple Red Fruit Salad", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/red-fruit-salad-recipe/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530395425000000.0", 
                "content": {
                    "content": "<p>A favorite red fruit salad, and arguably <em>so much</em> better than old-school fruit salad! It&#8217;s perfect as spring rounds the bend into summer. A simple, seasonal fruit salad made with plump strawberries, sweet cherries, lemon zest, and coriander brown sugar. Five ingredients. So good.<br />\n<img alt=\"Simple Red Fruit Salad with Strawberries, Cherries, Lemon, and Brown Sugar\" border=\"0\" src=\"https://images.101cookbooks.com/best-red-fruit-salad-1.jpg\" width=\"620\" /><br />\nAnd when I say simple, I&#8217;m not kidding. For a bit of something special, I ground a bit of brown sugar with coriander seeds to add to the fruit, liking the way the coriander&#8217;s citrusy, green notes played off the flavor of the strawberries and cherries. Just a little tweak, but enough to bring a hint of unexpectedness to a bowl of radiant, seasonal fruit. If you&#8217;re stuck on traditional fruit salad, consider making the jump to a red fruit salad!</p>\n<p><img alt=\"Simple Red Fruit Salad with Strawberries, Cherries, Lemon, and Brown Sugar\" border=\"0\" src=\"https://images.101cookbooks.com/red_fruit_salad_2.jpg\" width=\"620\" /><img alt=\"Fruit Salad\" border=\"0\" src=\"https://images.101cookbooks.com/red_fruit_salad_3.jpg\" width=\"620\" /><br />\nI first started making this fruit salad in the early days of the QUITOKEETO project, when a lot of it was happening at the house. Laugh/ cry. Friends would stop by and just shake their heads.\u00a0The towers of boxes, the tape guns, the bins of items we&#8217;d sourced\u00a0&#8211; it was all a bit much. We did <em>many</em> shipments from the dining room and kitchen island, and I thought you might like a look at the process. But, in the midst of it all, we would always try to break for a quick lunch.\u00a0 This ruby-hued beauty came out of one of those lunches.</p>\n<p><img alt=\"Simple Red Fruit Salad with Strawberries, Cherries, Lemon, and Brown Sugar\" border=\"0\" src=\"https://images.101cookbooks.com/red_fruit_salad_5.jpg\" width=\"620\" /><img alt=\"Simple Red Fruit Salad with Strawberries, Cherries, Lemon, and Brown Sugar\" border=\"0\" src=\"https://images.101cookbooks.com/red_fruit_salad_6.jpg\" width=\"620\" /><img alt=\"Simple Red Fruit Salad with Strawberries, Cherries, Lemon, and Brown Sugar\" border=\"0\" src=\"https://images.101cookbooks.com/red_fruit_salad_7.jpg\" width=\"620\" /></p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/red-fruit-salad-recipe/\" rel=\"nofollow\">Simple Red Fruit Salad</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1530395425.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1530224144.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/d70f3f7347d14343", 
                "categories": [], 
                "title": "Spicy Rainbow Chopped Salad with Peanuts", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/spicy-rainbow-chopped-salad/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530224144000000.0", 
                "content": {
                    "content": "<p>The base of this rainbow hued chopped salad is a new-to-me, homemade, <a href=\"https://www.101cookbooks.com/archives/night-market-allpurpose-curry-paste-recipe.html\">red curry paste</a>. I can&#8217;t stop using it, and it was the perfect back note to this salad situation, where every bite is a flavor explosion. The curry paste went in the dressing. Once you&#8217;ve made the dressing, blood oranges, crispy shallots, peanuts, radicchio, herbs, brown rice, scallions, and tofu are tossed with it. I&#8217;ll be honest, this isn&#8217;t the most weeknight-friendly recipe (here&#8217;s a link if you&#8217;re looking for the <a href=\"https://www.101cookbooks.com/archives/17-of-the-easiest-dinners-on-101-cookbooks-recipe.html\">easiest dinners</a>, or <a href=\"https://www.101cookbooks.com/quick_recipes/\">quick recipes</a> in general), but it&#8217;s so good, you&#8217;ll want to give it a try at some point when you aren&#8217;t crunched for time.</p>\n<p>I&#8217;m posting the <a href=\"https://www.101cookbooks.com/archives/night-market-allpurpose-curry-paste-recipe.html\">red curry paste</a> I used on its own page, it&#8217;s the A.P.C.P. &#8211; All-Purpose Curry Paste from <a href=\"http://www.nightmarketsong.com/welcome/\">Kris Yenbamroong</a>&#8216;s <a href=\"http://amzn.to/2DuMGiY\">Night + Market</a> Cookbook. If you&#8217;re inclined to make your own curry pastes, you&#8217;re going to want to take this one for a spin. I love it, and have been using it in everything lately &#8211; curry pots, this salad, spring rolls, chopped salad, etc. Enjoy!</p>\n<p><img alt=\"Spicy Rainbow Chop Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-h2.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chopped Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-2.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chopped Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-3.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chopped Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-4.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chopped Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-5.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chopped Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-6.jpg?w=620&amp;auto=format\" /></p>\n<p><img alt=\"Spicy Rainbow Chop Salad with Peanuts\" border=\"0\" src=\"https://images.101cookbooks.com/Spicy-Rainbow-Chop-Salad-7.jpg?w=620&amp;auto=format\" /></p>\n<p>I noticed a lot of you are using the <a href=\"https://www.101cookbooks.com/archives/winter-green-miso-paste-and-ten-ways-to-use-it-recipe.html\">winter green miso paste</a> and <a href=\"https://www.101cookbooks.com/archives/lemongrass-turmeric-curry-paste-recipe.html\">lemongrass turmeric paste</a> from my site, &amp; this should round out your collection!</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/spicy-rainbow-chopped-salad/\" rel=\"nofollow\">Spicy Rainbow Chopped Salad with Peanuts</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1530224144.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1530139371.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/e7b0ec86f1894233", 
                "categories": [], 
                "title": "One Bowl Banana Bread", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/one-bowl-banana-bread/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530139371000000.0", 
                "content": {
                    "content": "<p>Give this banana bread recipe a go! It&#8217;s perfect if you&#8217;re craving classic banana bread flavor and texture, but want as little mess, drama, and equipment as possible. It&#8217;s the laziest, best, one-bowl banana bread I know. Still with big pay-off. The promise? No mixer, a single bowl, classic flavor, and a moist and tender crumb. If you have three ripe bananas on hand, chances are good you have the rest of the ingredients as well. Let&#8217;s do this!</p>\n<p><img alt=\"One Bowl Banana Bread Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/one-bowl-banana-bread-2.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>A Better Banana Bread Recipe</h2>\n<p>What you&#8217;ll get here is a straight-ahead banana bread, or as straight-forward as I get. I like my baked goods to have rustic wholesomeness to them, which is why you see a portion of whole wheat flour and brown sugar here. Consequently, it makes your banana bread more nutritious, extra special, and delicious (when compared to versions with white sugar and white flour).</p>\n<p><img alt=\"One Bowl Banana Bread Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/one-bowl-banana-bread-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Inspiration</h2>\n<p>This particular banana bread recipe evolved into its current lazy-day state from <a href=\"http://www.101cookbooks.com/archives/lemony-olive-oil-banana-bread-recipe.html\">this Melissa Clark gem</a>. I skipped any add-ins for simplicity&#8217;s sake here, and would recommend a banana-only first pass. That said, you can absolutely add ingredients like toasted nuts, chocolate chunks, citrus zests, herbs, toasted coconut, glazes, etc!</p>\n<h2>Watch: One Bowl Banana Bread Video</h2>\n<div></div>\n<p>Also(!), if you like this, I&#8217;d be willing to bet you&#8217;ll also like these banana-packed <a href=\"https://www.101cookbooks.com/archives/buttermilk-berry-muffins-recipe.html\">Buttermilk Berry Muffins</a>.</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/one-bowl-banana-bread/\" rel=\"nofollow\">One Bowl Banana Bread</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1530139371.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1530049226.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/2f2ce7b3cb1a445b", 
                "categories": [], 
                "title": "An Incredible No Bake Chocolate Cake", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/no-bake-chocolate-cake-recipe/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530049226000000.0", 
                "content": {
                    "content": "<p>I suspect this will be the easiest chocolate cake you&#8217;ll ever make. And it&#8217;s always a <em>huge</em> hit. It&#8217;s the sort of easy dessert that is perfect for summer (and entertaining!) because you don&#8217;t need to heat your oven.\u00a0I think of it as a no bake chocolate cake, you wouldn&#8217;t be far off calling it a slice-able truffle. Or, imagine an espresso-spiked, velvety, chocolate mousse you were able to cut into beautiful wedges. Sounds incredible, right? If you have ten minutes,\u00a0 some dark chocolate, cream, and something to infuse the cream with, you&#8217;re in business. I also have some non-dairy variations as well.<br />\n<img alt=\"The Ultimate No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no-bake-chocolate-cake-1.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>When this Sort of Chocolate Cake is Perfect</h2>\n<p>This is the sort of thing I&#8217;ll throw together if we&#8217;re having friends over for dinner and I run out of steam on the dessert front. It&#8217;s less trouble to make than it is to go out and buy something. A small slice really goes the distance. It&#8217;s <em>intense</em>, it&#8217;s hardcore chocolate. Paired with a touch of whipped cream (or whipped coconut cream) it&#8217;s a total crowd-pleaser. I infused the cream used in the cake with espresso adn allspice in this version, but you could play it straight. Or take it in any direction you&#8217;re inclined &#8211; there are dozens of great suggestions in the comments.<br />\n<img alt=\"The Ultimate No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no-bake-chocolate-cake-2.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Choosing the Right Pan</h2>\n<p>This is a small but mighty chocolate cake. The choice of pan warrants a mention. You end up with with ~ <strong>two cups of batter</strong>, and for the most part you can pour that into any small-ish, parchment-lined cake pan you like. The parchment is important if you ever want to get the cake out of the pan. For this cake, I used a little loaf pan I like, but I&#8217;ve done this in small spring-form pans, and on occasion little tart pans. Just keep in mind, a bigger pan will mean a thinner slice. A small loaf pan like this yields a deeper slice, and so on. It&#8217;s hard to screw up &#8211; I mean, it&#8217;s a slice-able truffle cake. In the lead photo I&#8217;ve used a 6-inch springform pan. In the shot below, I&#8217;ve used a small loaf pan.</p>\n<p><span style=\"text-decoration: underline;\">In a pinch</span> &#8211; a number of you have mentioned that you simply pour the chocolate mixture into individual muffin tins, or dessert cups, allow it to set, and served this way. Brilliant! Less cake like, but I suspect no one will complain. \ud83d\ude09</p>\n<p><img alt=\"The Ultimate No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no-bake-chocolate-cake-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Variations</h2>\n<p>If you want to avoid heavy cream, there are a number of substitutions that work well. I love using cashew cream in place of the heavy cream called for in the recipe. Make cashew cream by combining 1 part cashew nuts + 1 part water and process in a high speed blender until silky smooth. No need to strain. Coconut milk also works nicely as a substitution.</p>\n<p><img alt=\"The Ultimate No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no-bake-chocolate-cake-4.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Finishing Touches</h2>\n<p>I like to bring a bit of extra flavor (and some pretty) with a dusting of cocoa powder, a few dried rose petals, and a sprinkling of cacao nibs. Others like to finish things of with a few berries. Generally speaking, if it pairs nicely with chocolate, go for it. A few toasted nuts, or crumbled cookies wouldn&#8217;t be unwelcome.<br />\n<img alt=\"The Ultimate No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no-bake-chocolate-cake-5.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Choosing the Right Chocolate</h2>\n<p>Because this cake is all about the chocolate, you don&#8217;t want to skimp on quality. I&#8217;ve been using <a href=\"https://www.guittard.com/our-chocolate/detail/bake_bittersweet-chocolate-wafers\">Guittard Organic 74% Bittersweet Chocolate Wafers</a> for this cake. It works beautifully. I often use it straight, meaning, without the added espresso or allspice noted in the recipe. So it&#8217;s just the beautiful chocolate notes coming through. San Francisco family-run chocolate represent! But, any good chocolate between 70% &#8211; 80% will work.\u00a0</p>\n<p><img alt=\"No Bake Chocolate Cake\" border=\"0\" src=\"https://images.101cookbooks.com/no_bake_chocolate_cake_recipe_3.jpg\" width=\"620\" /></p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/no-bake-chocolate-cake-recipe/\" rel=\"nofollow\">An Incredible No Bake Chocolate Cake</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1530049226.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529879904.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/ac754cf4874d4236", 
                "categories": [], 
                "title": "11 All-Star Ways to Cook Corn on the Cob", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/cook-corn-on-the-cob/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529879904000000.0", 
                "content": {
                    "content": "<p>Corn season &#8211; it&#8217;s officially on! It&#8217;s the season to eat outside. And, it&#8217;s the season to eat with your hands &#8211; especially corn on the cob. What follows here is a round-up of corn-centric ideas to inspire you this summer.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-recipes.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Corn on the Cob Basics</h2>\n<ul>\n<li>These recipes are all about celebrating corn &#8211; shopping for the freshest corn, still in husk, makes a difference!</li>\n<li>If you shuck the corn before grilling, keep an eye on it, it can get dried out. Try grilling in the husk to keep in steam.</li>\n<li>If you boil the corn in a large pot, definitely shuck it before. Salt the water, boil for 3-5 minutes.</li>\n<li>After cooking, if you want to get the corn off the cob to use in salads, sides and more, <a href=\"https://www.youtube.com/watch?v=P9qANbNK_SE\">check out this method</a> using a bundt pan (video -jump to :25 sec).</li>\n<li>If you cook a lot of corn and remove it from the cob with the above method, try freezing it for future recipes!</li>\n<li>Used cobs can be cleaned, placed in a stock pot and simmered to make a corn stock. Use the stock to bump up the flavor in corn-centric dishes (polenta, risotto, chowder).</li>\n</ul>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-cornkale.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>1.\u00a0<a href=\"https://thealmondeater.com/2016/06/grilled-corn-kale-salad/\">Grilled Corn Kale Salad</a>\u00a0(The Almond Eater)\u00a0</strong>\u00a0Throw a few chickpeas in this hearty kale salad, and call it a main. Probably couldn\u2019t resist tossing a few cherry tomatoes while I was at it.<br />\n<img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-chilaquiles.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>2.\u00a0<a href=\"https://bojongourmet.com/2015/07/baked-green-chilaquiles-with-sweet-corn-zucchini-tomatillo/\">Baked Green Chilaquiles with Sweet Corn</a> \u00a0(Bojon Gourmet)\u00a0</strong>\u00a0A stunner from Alanna &#8211; love the idea of making these beautiful chilaquiles with any leftover grilled corn.<br />\n<img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-chickpeabowl.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>3.\u00a0<a href=\"https://www.bonappetit.com/recipe/corn-and-chickpea-bowl-with-miso-jalapeno-tahini\">Corn &amp; Chickpea Bowl with Miso-Jalape\u00f1o Tahini</a>\u00a0(Bon Appetit)\u00a0</strong>If I could only have one salad this summer, this might be it. Chickpeas, avocado, herbs, summer corn, and an herby miso-tahini dressing &#8211; fresh, bright, and satisfying! A perfect, summery, one-bowl meal.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-harissa.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>4.\u00a0<a href=\"https://www.seriouseats.com/recipes/2013/07/grilled-corn-harissa-mint-recipe.html\">Grilled Corn With Harissa and Mint Recipe</a>\u00a0(Serious Eats)\u00a0</strong>\u00a0This might be the most flavor-forward of all the options here, with a strong combination of harissa and cumin.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/coconut_corn_salad_recipe.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>5.\u00a0<a href=\"https://www.101cookbooks.com/archives/coconut-corn-salad-recipe.html\">Coconut Corn Salad</a>\u00a0(101 Cookbooks)\u00a0</strong>Five ears of corn, shaved in quick fashion, saut\u00e9ed in a bit of butter. Tricked out beyond that with thyme, red onions, toasted almonds and coconut. So good!</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-indian.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>6.\u00a0<a href=\"http://lapetitchef.in/2016/01/indian-corn-on-the-cob.html\">Indian Corn on the Cob</a>\u00a0(La Petit Chef)\u00a0</strong> Apparently corn on the cob is an Indian street food <i>thing</i> and here&#8217;s a delicious looking version, with chaat masala as a flavor.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-elotesalad.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>7.\u00a0<a href=\"https://thekitchenpaper.com/elote-farro-tomato-salad-mexican-street-corn-salad/\">Elote Farro Tomato Salad</a>\u00a0(the Kitchen Paper)\u00a0</strong>\u00a0This recipe takes the classic Mexican elite grilled corn, adds farro and turns it into a delicious salad.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/green_curry_broth_recipe.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>8.\u00a0<a href=\"https://www.101cookbooks.com/archives/green-curry-broth-recipe.html\">Green Curry Broth with Summer Corn</a>\u00a0(101 Cookbooks)\u00a0</strong>A thin green curry broth, fragrant with garlic, lemongrass, and ginger. Punctuated with fresh corn. There&#8217;s heat from serrano chiles, and zings of tanginess on account of the fresh lime juice. Spicy and summer in the best way.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-burritobowls.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>9.\u00a0<a href=\"http://laurencariscooks.com/sofritas-style-burrito-bowls-with-tofu-lime-rice-and-grilled-corn/\">Sofritas Style Burrito Bowls with Tofu, Lime Rice and Grilled Corn</a>\u00a0(Lauren Caris Cooks)\u00a0</strong>\u00a0No one loves a good hippie lunch bowl more than me, and this one fits the bill. Love the grilled corn punctuation.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-sriracha.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>10.\u00a0<a href=\"https://minimalistbaker.com/grilled-corn-sriracha-aioli/\">Grilled Corn with Sriracha Aioli</a>\u00a0(Minimalist Baker)\u00a0</strong> Another vegan masterpiece from MB &#8211; this recipe focuses on the vegan aioli, which looks amazing and flavorful.</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/corn-on-the-cob-goals-cilantrolime2.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\n<strong>11.\u00a0<a href=\"https://www.blissfulbasil.com/grilled-cilantro-lime-paprika-corn-on-the-cob/\">Grilled Cilantro, Lime and Paprika Corn on the Cob</a>\u00a0(Blissful Basil)\u00a0</strong> Corn on the cob plus lime is a prety classic combination at this point, this vegan version uses coconut oil as an alternative to butter.\u00a0</p>\n<p><img alt=\"11 All-Star Ways to Cook Corn on the Cob\" border=\"0\" src=\"https://images.101cookbooks.com/cooking-corn-on-the-cob-v.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/cook-corn-on-the-cob/\" rel=\"nofollow\">11 All-Star Ways to Cook Corn on the Cob</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529879904.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529793966.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/c5fc9b939b2f409f", 
                "categories": [], 
                "title": "An Amazing Vegetarian Paella", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/vegetarian-paella/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529793966000000.0", 
                "content": {
                    "content": "<p>Let&#8217;s make paella! You can absolutely do it, and for this veg-centric, California-inspired take on the Spanish classic, you don&#8217;t need a special pan. Many paellas feature various meats and seafoods, but vegetarian paella can be a revelation. This version is <em>fully</em>\u00a0loaded with a rainbow of seasonal vegetables cooked into a saffron and paprika-scented rice based dream.\u00a0</p>\n<p>Once you have the technique down, the adaptations can be endless. Paella is a great way to use up random seasonal vegetables in your crisper, and leftovers are A-plus. And I&#8217;m going to tell you how it can be week-night friendly. Really!<br />\n<img alt=\"An Amazing Vegetarian Paella Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/vegetarian-paella-recipe-2.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>You Don&#8217;t Need a Special Paella Pan</h2>\n<p>If you have a traditional paella pan, great! Use it. That said, don&#8217;t let the lack of a special pan foil your paella endeavors. I&#8217;ve successfully cooked paella in copper pans (a favorite), as well as stainless steel, and cast iron. Use what you have, the wider the better. I&#8217;m including instructions for two different sized pans in the recipe, please reference the head notes.\u00a0</p>\n<h2>How to Make Paella Weeknight Friendly</h2>\n<p>Paella can be a great, realistic go-to weeknight recipe if you do one thing. Keep\u00a0<a href=\"https://www.101cookbooks.com/sofrito/\">this sofrito</a> on hand. Have some ready in the refrigerator, keep back up in the freezer. If you have a bit of saffron and paprika around, with some broth, rice, and seasonal vegetables, you&#8217;re ready to make paella. And it&#8217;s quite simple.</p>\n<p><img alt=\"An Amazing Vegetarian Paella Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/vegetarian-paella-recipe-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>The Best Rice For Paella</h2>\n<p>Choosing the right rice for paella is key. Ideally, you want a short-grain, stubby paella rice, something like <a href=\"https://amzn.to/2K8hKZV\">this</a>, or <a href=\"https://amzn.to/2K4Fdv4\">this</a>. Look for Bomba. Paella rices are celebrated for being able to absorb more water (or broth) than other rices, while maintaining structure. This translates to a paella with definition between grains &#8211; no mushy rice. I also love <a href=\"https://www.mercurynews.com/2012/08/27/paella-rice-bomba-vs-arborio/\">this article about choosing rice for paella</a> with Russ Moore (of <a href=\"http://www.caminorestaurant.com/\">Camino</a> in Oakland, CA). He uses a well-rinsed, local, Japanese short-grain varietal, and his paella is <em>beautiful</em>. If you do experiment with non-paella rice varietals, you&#8217;ll need to play around a bit and adjust the liquids.</p>\n<h2>Can I Use Brown Rice?</h2>\n<p>I&#8217;ve tried. I&#8217;ve tested 100% brown rice paella, and blends. Here&#8217;s the problem. Brown rice takes a lot longer to cook comparatively. So, the way paella comes together is the following. You get all your ingredients in the pan, stir once, and then leave it alone. This is half the battle when it comes to achieving a golden-crusted bottom (desirable!), see below. When you use brown rice, you end up with overcooked vegetables, because you need to cook it so long. My advice? Stick with tradition and use a short-grain paella rice.</p>\n<h2>The Trick to Achieving Socarrat Magic</h2>\n<p>Today&#8217;s recipe focuses on paella made indoors, in a modern kitchen. That said, many paella are cooked grilled, over open flame. One of the things you hope to achieve in either scenario is <em><strong>socarrat</strong></em> &#8211; that golden crusted rice bottom. The skill, of course, coming from just the right amount of toastiness &#8211; not too little, not burned. If you&#8217;re brave, give your paella a moment or so on a burner, after removing from the oven, to\u00a0 increase your likelihood of some good socarrat! Takes some practice.</p>\n<h2>How to Make Vegetarian Paella Awesome</h2>\n<p>Here&#8217;s the deal, you need to load up on seasonal vegetables. Experiment! There are so many ingredients that are fair game here. I like ingredients with a bit of structure, that can handle some cooking time. Asparagus (thicker stem vs. skinny), baby artichokes, summer squash, fava beans, cherry tomatoes, peas, etc.</p>\n<h2>Paella Verde Variation</h2>\n<p>A green version of the paella you see pictured here is fantastic. Simply stir in 1/4 pound of well chopped spinach or kale with the other vegetables.</p>\n<p>This recent paella bender was inspired by a beautiful paella birthday dinner cooked by my friend <a href=\"https://www.instagram.com/bevensen/\">Bonni Evensen</a>. You can see pics in <a href=\"https://www.instagram.com/heidijswanson/\">my Instagram feed</a> \ud83d\ude42</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/vegetarian-paella/\" rel=\"nofollow\">An Amazing Vegetarian Paella</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529793966.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529749325.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/0c055f513a7047ea", 
                "categories": [], 
                "title": "The Best Sofrito to Use in Your Next Paella", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/sofrito/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529749325000000.0", 
                "content": {
                    "content": "<p class=\"p1\">There are a lot of reasons to keep a stash of sofrito on hand, but I&#8217;m going to focus on one. Having great sofrito means you&#8217;re on the fast track to great <a href=\"https://www.101cookbooks.com/vegetarian-paella/\">paella</a>. Sofrito is the base magic. Keep it on hand in your refrigerator. Keep it in your freezer. It is the building block of many Spanish, Caribbean, Puerto Rican, Italian, and Latin American dishes, and it is much loved for good reason. It adds complexity and dimension to each dish you couldn&#8217;t achieve otherwise, and the variations are infinite.<br />\n<img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/sofrito-recipe-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p class=\"p1\">Here&#8217;s the deal. I&#8217;m going to argue that you need an hour to make great sofrito. Don\u2019t let anyone tell you any different. Or, allow me to rephrase. You need an hour to make the style of sofrito that makes <a href=\"https://www.101cookbooks.com/vegetarian-paella/\">a paella like this one</a>\u00a0really wonderful. It requires time, because it is the long gentle saut\u00e9 that brings out the sweetness of the onions. It&#8217;s the long simmer that brings together the layered flavors of tomato, rosemary, garlic, and green bell pepper. I&#8217;ve tried quick versions, and I&#8217;ve taken shortcuts when pressed for time &#8211; the resulting paella, just isn&#8217;t as good.</p>\n<h2 class=\"p1\">Other Uses for Sofrito</h2>\n<p class=\"p1\">You can use sofrito as more than a cooking base. It&#8217;s delicious in its own right! It can have an unctuous jammy consistency perfect spread across a slab of hearty garlic toast, or dolloped as a finishing touch on a bowl of risotto. It&#8217;s great as the base for quick dressings that you can use to toss things like grilled asparagus, or broiled broccoli, or roasted cauliflower. Once you have a jar on hand, it becomes the essence of fast flavor, and your best weeknight friend.</p>\n<h2><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/sofrito-recipe-2.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\nStoring Sofrito</h2>\n<p class=\"p1\">My main advice &#8211; double the recipe. This means you should have enough sofrito for four rounds of paella. Cook, and then, after cooling, freeze half of your sofrito for later use. Use the other fresh, unfrozen half within the week.</p>\n<h2>Fresh Tomatoes or Canned?</h2>\n<p>You can use either! I&#8217;ve included amounts for both in the recipe below. If I have a glut of summer tomatoes, I use those. If canned tomatoes are more convenient, they work wonderfully as well. Go ahead and experiment. I find the fresh tomatoes put off more liquid, but work nicely.</p>\n<h2 class=\"p1\">Special Equipment</h2>\n<p class=\"p1\">I like to avoid when possible special equipment when possible, and this is one of those cases. Many sofrito recipes have you run the cooked tomato mixture through a food mill or processor, both steps I avoid. I&#8217;ve found that grating the tomatoes on a box grater is a bit more work up front, but results in a consistency I like without any special equipment.</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/sofrito/\" rel=\"nofollow\">The Best Sofrito to Use in Your Next Paella</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529749325.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529704822.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/ca43fcab7ea94e4b", 
                "categories": [], 
                "title": "Eleven Slushie Cocktails to Make This Summer", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/slushie-cocktails/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529704822000000.0", 
                "content": {
                    "content": "<p>The slushie cocktails I bookmarked last summer, for this summer. I think it&#8217;s best that we stop at eleven here \ud83d\ude09 It&#8217;s my personal slushie list, inspired by some of my favorite cocktail maestros.</p>\n<p><strong>1. <a href=\"http://www.seriouseats.com/recipes/2016/08/frozen-mezcal-paloma-cocktail-slushie-grapefruit-recipe.html\">Frozen Mezcal Palomas</a> &#8211; <em>(Serious Eats)</em></strong><br />\nNumber one on my list. From Julia Turshen&#8217;s much-loved <a href=\"http://www.juliaturshen.com/smallvictories\">Small Victories</a> cookbook, you know these are going to be hard to beat. <a href=\"http://www.seriouseats.com/recipes/2016/08/frozen-mezcal-paloma-cocktail-slushie-grapefruit-recipe.html\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/frozen-paloma-slushie.jpg\" width=\"620\" /></p>\n<p>2. <a href=\"http://punchdrink.com/recipes/frozen-sgroppino/\">Frozen Sgroppino</a> &#8211; <em>(PUNCH)</em><br />\nVodka + Limoncello + Lemon Sorbet + Prosecco &#8211; preferably enjoyed in the sun somewhere on the Italian coast. <a href=\"http://punchdrink.com/recipes/frozen-sgroppino/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/Frozen-Sgroppino-Alta-Linea-Punch-drink.jpg\" width=\"620\" /></p>\n<p>3. <a href=\"https://www.buzzfeed.com/riemcclenny/impress-your-friends-with-this-color-changing-frozen-mojito\">Color-Changing Frozen Mojito</a> &#8211; <em>(Buzzfeed)</em><br />\nHave to admit, I&#8217;m intrigued by this one. Red cabbage is infused into boiling water to create blue simple syrup. When the acid in the lime juice hits it, color shift! I think it&#8217;s in the <em>Tasty</em> cookbook, and you can see it play out in the video. <a href=\"https://www.buzzfeed.com/riemcclenny/impress-your-friends-with-this-color-changing-frozen-mojito\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/color-change-slushie.jpg\" width=\"620\" /></p>\n<p>4. <a href=\"http://heatherchristo.com/2014/06/04/mango-coconut-and-orange-vodka-crush/\">Mango Coconut and Orange Vodka Crush</a> &#8211; <em>(Heather Christo)</em><br />\nFresh Mango and coconut milk, offset with orange and lime juices, and vodka. <a href=\"http://heatherchristo.com/2014/06/04/mango-coconut-and-orange-vodka-crush/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/orange-vodka-crush.jpg\" width=\"620\" /></p>\n<p>5. <a href=\"http://punchdrink.com/articles/friesling-new-frose-summer-frozen-cocktail-recipe-riesling/\">Friesling</a> &#8211; <em>(PUNCH)</em><br />\nA case for swapping switching out your ros\u00e9 habit. Some good guidelines and recommendations here. <a href=\"http://punchdrink.com/articles/friesling-new-frose-summer-frozen-cocktail-recipe-riesling/\">Recipes in right-hand column on this page.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/Friesling-Frozen-Riesling-Wine-Cocktail.jpg\" width=\"620\" /></p>\n<p>6. <a href=\"https://www.quitokeeto.com/pages/cucumber-gin-slush\">Cucumber Gin Slush</a> &#8211; <em>(QUITOKEETO)</em><br />\nA go-to this summer. This one should go in the slushie cocktail hall of fame. I love the refreshing cucumber, gin, and limoncello trifecta. <a href=\"https://www.quitokeeto.com/pages/cucumber-gin-slush\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/cucumber-gin-slush-recipe.jpg\" width=\"620\" /></p>\n<p>7. <a href=\"https://www.dessertfortwo.com/peach-wine-slushies/\">Peach Wine Slushes</a> &#8211; <em>(Dessert for Two)</em><br />\nA simple as it gets, in the best way &#8211; fruity white wine + frozen peaches. <a href=\"https://www.dessertfortwo.com/peach-wine-slushies/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/PeachWineSlushy-dessertfortwo.jpg\" width=\"620\" /></p>\n<p>8. <a href=\"https://www.saltandlavender.com/cherry-moscato-slush/\">Cherry Moscato Slush</a> &#8211; <em>(Salt &amp; Lavender)</em><br />\nI always stock up on frozen cherries (because I&#8217;m usually too lazy to pit them). Pair those with a bottle of moscato and a spike of lime, and this is where you&#8217;re at. Contender for best-looking slushie cocktail.\u00a0<a href=\"https://www.saltandlavender.com/cherry-moscato-slush/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/cherrymoscatoslush2.jpg\" width=\"620\" /></p>\n<p>9. <a href=\"http://hostthetoast.com/strawberry-dragon-fruit-margaritas/\">Strawberry Dragonfruit Margarita</a> &#8211; <em>(Host The Toast)</em><br />\nIn addition to frozen cherries, I always stock up on frozen dragonfruit puree when I come across it. I can imagine a version of this using the puree being A+! <a href=\"http://hostthetoast.com/strawberry-dragon-fruit-margaritas/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/Dragonfruit-Strawberry-Margaritas-hosttoast.jpg\" width=\"620\" /></p>\n<p>10. <a href=\"http://www.thekitchn.com/recipe-frozen-negroni-228682\">Frozen Blood Orange Negroni</a> &#8211; <em>(The Kitchn)</em><br />\nThe classic Negroni is equal parts gin, Campari, and sweet vermouth. Here it meets the blender and gets rounded out with fresh blood orange juice. Yes, please. <a href=\"http://www.thekitchn.com/recipe-frozen-negroni-228682\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/frozen-negroni-kitchn.jpg\" width=\"620\" /></p>\n<p>11. <a href=\"https://smittenkitchen.com/2014/07/bourbon-slush-punch/\">Bourbon Slush Punch</a> &#8211; <em>(Smitten Kitchen)</em><br />\nFinishing strong. Literally. Smitten Kitchen meets <i>Garden &amp; Gun</i>. This one looks a tad dangerous. <a href=\"https://smittenkitchen.com/2014/07/bourbon-slush-punch/\">Get the recipe here.</a></p>\n<p><img alt=\"Eleven Slushie Cocktails to Make This Summer\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/bourbon-slush-punch-smitten.jpg\" width=\"620\" /></p>\n<p>Also, just in case you want to get serious and roll out your own slushie machine, you&#8217;re going to want to read this. Straight talk from the master: <a href=\"http://www.jeffreymorgenthaler.com/2016/how-to-use-a-slushie-machine/\">How to use a slushie machine</a>. And, <a href=\"http://www.bonappetit.com/test-kitchen/cooking-tips/article/frozen-cocktails-effed-it-up\">here&#8217;s a little tip sheet</a> on Bon App\u00e9tit related to crafting your own frozen drinks. Lastly! I also love (and make a lot of) weeknight non-alcohol cocktails, let me know if you&#8217;d like me to do a list of those. Enjoy!</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/slushie-cocktails/\" rel=\"nofollow\">Eleven Slushie Cocktails to Make This Summer</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529704822.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529618151.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/2b1f14380e8e425f", 
                "categories": [], 
                "title": "How to Make Pesto like an Italian Grandmother", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/pesto-recipe/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529618151000000.0", 
                "content": {
                    "content": "<p>If you&#8217;ve ever tasted pesto in Italy you know that the pesto here in the United States just isn&#8217;t the same. I received a lesson in how to make pesto from a real Italian grandmother last week and now I understand the difference and what makes this pesto recipe so special.<br />\n<img alt=\"How to Make Pesto like an Italian Grandmother\" border=\"0\" src=\"https://images.101cookbooks.com/how-to-make-pesto-1.jpg?w=620&amp;auto=format\" /></p>\n<p>My friend Francesca makes the trip from her small town near the pesto-epicenter of Genoa, Italy to San Francisco once or twice a year &#8211; this time (lucky for us) she brought her mom and two-year old son Mattia. Her mom makes a beautiful pesto (and perfectly light, potato <a href=\"https://www.101cookbooks.com/archives/how-to-make-gnocchi-like-an-italian-grandmother-recipe.html\">gnocchi</a> to go along with it) and offered to show me and my friend Jen how it is done. I have to say, it was a complete game-changer. If you love pesto, you really have to try this. Her technique results in an <em>incredibly</em> special pesto.<br />\n<img alt=\"How to Make Pesto like an Italian Grandmother\" border=\"0\" src=\"https://images.101cookbooks.com/how-to-make-pesto-3.jpg?w=620&amp;auto=format\" /></p>\n<h2>Chop by hand or blender?</h2>\n<p>Most of the pesto you encounter here in the U.S. is different for a few reasons. First off, most of what you see is made by machine, usually a food processor or hand blender. This holds true even if it is homemade. Don&#8217;t get me wrong, it usually tastes good, but because the ingredients aren&#8217;t hand chopped you end up with an texture that is more like like a moist paste and there little to no definition between ingredients.</p>\n<p>During my lesson I quickly began to realize chopping all the ingredients by hand and not blending them is key because this prevents the ingredients from becoming a completely homogenized emulsion or paste. When you dress a pasta with a pesto that has been hand chopped the minuscule flecks of basil will separate from the olive oil in places, you get definition between ingredients, and bright flavors pop in a way they don&#8217;t when they&#8217;ve been blended into one.<br />\n<img alt=\"How to Make Pesto like an Italian Grandmother\" border=\"0\" src=\"https://images.101cookbooks.com/how-to-make-pesto-2.jpg?w=620&amp;auto=format\" /></p>\n<h2>Choosing the right basil</h2>\n<p>Another thing, Genovese pesto is famous in part because it is often made with young, small basil leaves. For us non-Italians it is easy to find Genovese basil in stores and at farmer&#8217;s markets particularly in the summer, but chances are it wasn&#8217;t picked young. I wouldn&#8217;t worry about it too much, simply by hand chopping all your ingredients, you will see a major shift in personality of your pesto. If you grow your own basil, I&#8217;m envious.<br />\n<img alt=\"How to Make Pesto like an Italian Grandmother\" border=\"0\" src=\"https://images.101cookbooks.com/how-to-make-pesto-4.jpg?w=620&amp;auto=format\" /></p>\n<p>If you&#8217;re serious about making good pesto, using this technique, get a good, sharp (preferably large, single blade) mezzaluna, or a good knife &#8211; you&#8217;ll need it. Chopping the ingredients will take twenty minutes or so. Whatever you use to chop, make sure it has a sharp blade or the basil will turn dark. Once you chop your ingredients, you&#8217;ll form them into a cake, pictured above. You add olive oil to this cake, and it&#8217;s magic &#8211; below.\u00a0</p>\n<p><img alt=\"How to Make Pesto like an Italian Grandmother\" border=\"0\" src=\"https://images.101cookbooks.com/how-to-make-pesto-5.jpg?w=620&amp;auto=format\" /></p>\n<h2>How to Store Pesto</h2>\n<p>Store any pesto you might use in the next day or two, refrigerated, under a thin film of olive oil. You can also freeze it in snack-sized baggies. Thaw and toss whatever gnocchi or pasta you like with it.</p>\n<p>Let me know if you try this and what you think! Use your beautiful fresh pesto with this <a href=\"https://www.101cookbooks.com/archives/how-to-make-gnocchi-like-an-italian-grandmother-recipe.html\">gnocchi recipe</a>. Tutto bene!</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/pesto-recipe/\" rel=\"nofollow\">How to Make Pesto like an Italian Grandmother</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529618151.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529466474.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/a1de49990c654bd6", 
                "categories": [], 
                "title": "Fruit Salad with Thai Herbs", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/archives/fruit-salad-with-thai-herbs-recipe.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529466474000000.0", 
                "content": {
                    "content": "<p>We&#8217;re ramping up to peak summer fruit season, aka fruit salad season, here in San Francisco. I stocked up at the weekend market, <em>and</em> had a bonus windfall thanks to <a href=\"http://www.hungryghostfoodandtravel.com/\">this thoughtful lady</a>. It is fruit madness in the refrigerator. I&#8217;m looking at tiny black raspberries, the sweetest blueberries, cherries, peaches, nectarines, strawberries, and pluots. No complaints. <br />\n<img alt=\"Fruit Salad with Thai Herbs\" border=\"0\" src=\"https://www.101cookbooks.com/mt-static/images/food/fruit-salad-thai-herbs-2.jpg\" width=\"620\" /><br />\nThose of you who have been reading for a while know I love a quick fruit salad, particularly if it has a little wink, or twist, or surprise. One of my past favorites is <a href=\"http://www.101cookbooks.com/archives/red-fruit-salad-recipe.html\">this version</a> made with plump strawberries, sweet cherries, lemon zest, and coriander brown sugar. Today I decided to throw together a new version using lemongrass, lemon and lime juices, and plenty of mint. Toasted walnuts added a bit of crunch. Give it a try, the honey-lemongrass dressing with mint works not only in this summer version, but with other fruit combinations as well.</p>\n<p>If you live in a more tropical environment, I imagine a pineapple and mango version would be incredible. Enjoy! -h</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/archives/fruit-salad-with-thai-herbs-recipe.html\" rel=\"nofollow\">Fruit Salad with Thai Herbs</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529466474.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529275116.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/0f96b6ec77784543", 
                "categories": [], 
                "title": "Sunset Coconut Goji Nectar", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/archives/sunset-coconut-goji-nectar.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529275116000000.0", 
                "content": {
                    "content": "<p>If I owned a brunch spot, this quencher would be on the menu. I posted some photos to my\u00a0<a href=\"https://www.instagram.com/heidijswanson/\">Instagram Stories</a> last week, and wanted to follow up with the recipe. What you see here is a vibrant morning elixir made with homemade goji nectar, coconut water, and a boost of whatever citrus you have on hand. In this case I used blood orange juice. Add a splash of tequila (later in the day), and you&#8217;ve got a nice cocktail on your hands. \ud83d\ude09<br />\n<img alt=\"Sunset Coconut Goji Nectar\" border=\"0\" src=\"https://images.101cookbooks.com/goji-nectar-4.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\nGoji berries are celebrated for being rich in nutrients, beta-carotene and lycopene. High in anti-oxidants. I like their tartness, and primarily use them as an accent in salads, and grain bowls, or on top of open-faced sandwiches. I also like to make goji tea, and goji nectar on occasion, and that is the base of what you see here.\u00a0<br />\n<img alt=\"Sunset Coconut Goji Nectar\" border=\"0\" src=\"https://images.101cookbooks.com/goji-nectar-1.jpg?w=620&amp;auto=format\" width=\"620\" /><br />\nThe only wildcard you should know about relates to timing. You&#8217;re going to want to soak your goji berries ahead of time &#8211; for a few hours at least, or overnight. After blending, your goji nectar base will keep for a few days, so you can use it in smoothies, cocktails, chia bowls, or whatever else you can dream up.\u00a0</p>\n<p><img alt=\"Sunset Coconut Goji Nectar\" border=\"0\" src=\"https://images.101cookbooks.com/goji-nectar-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/archives/sunset-coconut-goji-nectar.html\" rel=\"nofollow\">Sunset Coconut Goji Nectar</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529275116.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529218964.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/10c35c0c1e614fe1", 
                "categories": [], 
                "title": "How to Make Simple Vegan Mayo", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/how-to-make-simple-vegan-mayo/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529218964000000.0", 
                "content": {
                    "content": "<p class=\"p1\">I\u2019ve made vegan mayo a hundred different ways. That said, I\u2019ve settled into a recipe I really like &#8211; particularly this time of year. You can can swap it directly with the traditional mayo in your favorite your favorite potato salads, macaroni salads. Or, slather it on your go-to sandwiches. One the mayo-ish spectrum, this version is arguably more aioli in spirit, when compared to commercial bright-white mayo. Either way, it makes everything you toss with it better than if you scooped it from a jar. Promise.<br />\n<img alt=\"How to Make Simple Vegan Mayonnaise\" border=\"0\" src=\"https://images.101cookbooks.com/simple-vegan-mayo-1.jpg?w=620&amp;auto=format\" /></p>\n<h2>The Strategy: How to Make Vegan Mayo</h2>\n<p class=\"p1\">We\u2019re going to use the liquid from a can of chickpeas (aquafaba) and whip it into the base. J.Kenji Lopez-Alt does a nice version <a href=\"https://www.seriouseats.com/recipes/2016/03/easy-vegan-mayo-aquafaba-recipe-vegan-experience.html\">here</a>. Similarly, my take uses all the aquafaba from a can of chickpeas, chickpeas (for more body), and a fraction of the oil used in most mayo. We&#8217;re going to make a vegan mayo that maintains the beautiful glossy, emulsified texture signature to mayo, but without relying on so much oil to create the base.\u00a0</p>\n<h2>Why Even Bother Using Vegan Mayo?</h2>\n<p>Having an easy vegan mayo recipe on hand is great if you know you&#8217;re bringing a dish to a picnic or potluck. Increasingly, you&#8217;ll find a mixed crowd of vegans, vegetarians, people trying to eat whole-food plant based, etc.\u00a0 I like to make potluck meals that everyone can enjoy, and having this up your sleeve makes adapting recipes quite simple.\u00a0A lot of popular potluck and family-style meals call for mayo or mayonnaise as ingredient (potato salad, coleslaw, macaroni salad). You can use this recipe in place of store-bought mayo. Quite honestly, I think it tastes so much better! Less gloopy, and not as much of that too strong mayo flavor thing that you get from the commercial stuff.</p>\n<h2 class=\"p1\">Important Tips</h2>\n<p class=\"p1\">&#8211; An immersion blender aka hand-blender is your secret weapon here. You can make this mayo in a high-speed blender, but everything really comes together beautifully when you use a hand blender.</p>\n<p class=\"p1\">&#8211; The container you make this mayo in matters. You want to choose a tall jar or bowl, not too much wider than the head of an immersion blender. Have a look at the bowl in the lead photo &#8211; it&#8217;s probably too wide. Tall Weck jars work great.</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/how-to-make-simple-vegan-mayo/\" rel=\"nofollow\">How to Make Simple Vegan Mayo</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529218964.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529184200.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/85fc1c3010144f59", 
                "categories": [], 
                "title": "The Perfect Healthy Granola (Low Oil &amp; Naturally Sweetened)", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/archives/perfect-healthy-granola.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529184200000000.0", 
                "content": {
                    "content": "<p class=\"p1\">There are a few different granola camps. This one falls squarely in the great, everyday, healthy granola category. Instead of the <em>cookies masquerading as granola</em> camp. It is my new favorite thing, and I\u2019ve had it on my counter for weeks now. Give it a go!</p>\n<p class=\"p1\">Midnight black and deeply chocolate-flavored with dark black cocoa and cocoa nibs, this granola is packed with heart-healthy oats and seeds. Naturally sweetened, clumpy, and crunchy, the recipe calls for just a small splash of olive oil, and leverages a secret ingredient to bring it all together.</p>\n<p><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-1.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2 class=\"p1\">Is Homemade Granola Bad for You?</h2>\n<p class=\"p1\">This is a question I get asked a lot. The short answer is, many granolas have a lot of sugar in them. And, many granolas have a lot of unnecessary added fat or oils. We\u2019re essentially talking about cookies in clumpy form, which, I think we can all agree is delicious. As the foundation for your daily breakfast? Laugh / cry. My hope is today\u2019s recipe will be a nice alternative.</p>\n<h2 class=\"p1\">My Healthy Granola Inspiration</h2>\n<p class=\"p1\">In Los Angeles last month, I <em>finally</em> made it to beautiful <a href=\"http://botanicarestaurant.com/\">Botanica</a>. After dinner, Emily Fiffer, one of the inspiring owners, sent us home with a tote of treats for our long drive back to San Francisco. Included was a jar of Botanica\u2019s Cacao Coconut Granola. In short, it was a (serious) granola revelation &#8211; crunchy, clumpy, deeply chocolate flavored, short ingredient list. The Botanica granola was the jumping off point for this recipe, and if you want to take that recipe for a spin as well, <a href=\"http://botanicamag.com/recipes/cacao-coconut-granola-aka-new-school-cocoa-puffs/\">you can find it here</a>.</p>\n<p class=\"p1\">The main tweaks? I used whipped aquafaba (the liquid in a can of chickpeas) as the binder, allowing me to scale back the added oil by a good chunk. Black cacao gives you that midnight chocolate flavor reminiscent of Oreo cookies, but regular cocoa powder is also great! And, I dial back the sweetness a shade.</p>\n<p><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-2.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>\nThe Magic of Aquafaba</h2>\n<p>Have a look below. What you&#8217;re seeing is aquafaba. If you have a can of chickpeas, you have enough aquafaba for this recipe (the liquid in the can). It is whipped into peaks, and the other granola ingredients are folded in. It&#8217;s a fantastic medium for granola acting as a binder, helping to deliver that clumpy magic everyone loves. Aquafaba behaves much like whipped egg whites, but by making granola with aquafaba you can do a version that can be enjoyed by a wider range of people, including vegans and people trying to work more whole food plant-based meals into their diet. And now I&#8217;m itching to remake this <a href=\"https://www.101cookbooks.com/archives/rose-petal-granola-recipe.html\">rose petal granola</a> using this technique!</p>\n<p><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-3.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-6.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<h2>Serving Ideas</h2>\n<p>If you&#8217;re going for healthy granola, you&#8217;re going to want to opt for healthful toppings. I like this granola served over yogurt, with a side of whatever seasonal fruit looks good. You can see it pictured here alongside sliced bananas and strawberries. There is a sprinkling of goji berries and rose petals as well. It&#8217;s also good in a simple bowl of mylk or milk &#8211; I like almond or oat.<br />\n<img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-4.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p><img alt=\"The Perfect Healthy Granola Recipe\" border=\"0\" src=\"https://images.101cookbooks.com/healthy-granola-recipe-5.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/archives/perfect-healthy-granola.html\" rel=\"nofollow\">The Perfect Healthy Granola (Low Oil &#038; Naturally Sweetened)</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529184200.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.101cookbooks.com/feed", 
                    "htmlUrl": "https://www.101cookbooks.com", 
                    "title": "101 Cookbooks"
                }, 
                "updated": 1529014842.0, 
                "author": "Heidi Swanson", 
                "id": "tag:google.com,2005:reader/item/7b83e42879854cbd", 
                "categories": [], 
                "title": "Garlic Lime Lettuce Wraps", 
                "alternate": [
                    {
                        "href": "https://www.101cookbooks.com/archives/garlic-lime-lettuce-wraps-recipe.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529014842000000.0", 
                "content": {
                    "content": "<p>Lettuce wraps are a fave around here (and a nice change from <a href=\"https://www.101cookbooks.com/archives/smashed-sweet-potato-tacos-recipe.html\">taco night</a>). This has become a favorite weeknight meal. Ginger and garlic tempeh rice, folded into lime-spiked lettuce wraps with lots of herbs, cucumber, and carrots. It&#8217;s a one-pan meal that comes together in no time!</p>\n<p><img alt=\"Garlic Lime Lettuce Wraps\" border=\"0\" src=\"https://images.101cookbooks.com/lettuce-wraps.jpg?w=620&amp;auto=format\" width=\"620\" /></p>\n<p>A couple of tips related to this recipe. If you find a tempeh brand you like, buy it in multiples. It freezes really well. And, I like to make this with brown rice that I&#8217;ve blended with other grains &#8211; like a little bit of millet, and quinoa. But, brown jasmine rice on it&#8217;s own is also A+!</p>\n<p>Continue reading <a href=\"https://www.101cookbooks.com/archives/garlic-lime-lettuce-wraps-recipe.html\" rel=\"nofollow\">Garlic Lime Lettuce Wraps</a> on <a href=\"https://www.101cookbooks.com\" rel=\"nofollow\">101 Cookbooks</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312293", 
                "published": 1529014842.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "https://www.101cookbooks.com", 
        "updated": 1530516312.293617, 
        "id": "feed/https://www.101cookbooks.com/feed", 
        "title": "101 Cookbooks"
    }, 
    "feed/http://massless.org/index.html%3Ffeed=rss2": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1320361753.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/408bbfd9958247d8", 
                "categories": [], 
                "title": "Dreams, discernment, and Google Reader", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=174", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1320361753000000.0", 
                "content": {
                    "content": "<p>There\u2019s been some interesting critical discussions of some design and product changes within Google Reader recently and I\u2019ve kind of stayed out of it since I\u2019m heads down on making big changes elsewhere. But I grabbed a few minutes, and I\u2019d like to share a few notes I\u2019ve written about it\u2026<br />&nbsp;</p>\n<ul>\n<li>If Reader continues being understaffed, absorbed, or is eliminated then the internal culture at Google will adjust to <strong>a newly perceived lack of opportunity for building things that are treasured</strong>. No one knows what effect this will <em>actually</em> have, though. The response could be tiny.<br />&nbsp;</li>\n<li>Technology will route around the diminishment or disappearance of Reader. Even if this means something other than feeds are being used.<br />&nbsp;</li>\n<li><strong>It&#8217;s a tough call.</strong> Google&#8217;s leaders may be right to weaken or abandon Reader. I feel more people should acknowledge this.<br />&nbsp;</li>\n<li>However, <strong>saying \u201cno\u201d to projects doesn\u2019t make you Steve Jobs if you say no to inspiring things.</strong> It&#8217;s the discernment that&#8217;s meaningful, not the refusal. Anyone can point their thumb to the ground.<br />&nbsp;</li>\n<li>The shareable social object of subscribe-able items makes Reader&#8217;s network unique and the answer to why change is painful for many of its users is because no obvious alternative network exists with <em>exactly</em> that object. The social object of Google+ is&#8230;nearly anything and its diffuse model is harder to evaluate or appreciate. The value of a social network seems to\u00a0map proportionally to the perceived value of its main object. (Examples: sharing best-of-web links on Metafilter or sharing hi-res photos on Flickr or sharing video art on Vimeo or sharing statuses on Twitter/Facebook or sharing questions on Quora.) If you want a community with stronger ties, provide more definition to your social object.<br />&nbsp;</li>\n<li><strong>Reader exhibits the best unpaid representation I&#8217;ve yet seen of a consumer&#8217;s relationship to a content producer.</strong> You pay for HBO? That&#8217;s a strong signal. Consuming free stuff? Reader&#8217;s model was a dream. Even better than Netflix. You get affinity (which has clear monetary value) for free, and a tracked pattern of behavior for the act of iterating over differently sourced items &#8211; and a mechanism for distributing that quickly to an ostensible audience which didn&#8217;t include social guilt or gameification &#8211; along with an extensible, scalable platform available via commonly used web technologies &#8211; all of which would be an amazing opportunity for the right product visionary.<br />&nbsp;</li>\n<li>Reader is (was?) for information junkies; not just tech nerds. This market <em>totally exists</em> and is weirdly under-served (and is possibly affluent).<br />&nbsp;</li>\n<li>The language for decisions based on deferred value is all about sight, which I find beautiful (and apt for these discussions). People are asking if Google is seeing the forest for the trees. I\u2019d offer that Google is viewing this particular act-of-seeing as a distraction.<br />&nbsp;</li>\n<li>Reader will be an interesting footnote in tech history. That&#8217;s neat and that&#8217;s enough for me; wasn&#8217;t it fun that we were able to test if it worked?<br />&nbsp;</li>\n<li>Google is choosing to define itself by making excellent products in obvious markets that serve hundreds of millions of people. This is good. A great company with evident self-consciousness that even attempts to consider ethical consequences at that scale is awesome. But <strong>this is a perfect way to avoid the risk of creating entirely new markets</strong> which often go through a painful <em>not-yet-serving-hundreds-of-millions</em> period and which require a dream, some dreamers, and not-at-all-measurable luck. Seemingly Google+ could be viewed as starting a new market, but I&#8217;d argue that it mainly stands a chance of improving on the value unlocked by <em>other</em> social networks, which is healthy and a good thing, but which doesn&#8217;t require an investigation into <em>why</em> it&#8217;s valuable. That&#8217;s self-evident in a Facebook world. Things like Reader still need a business wizard to help make sense of the value there.<br />&nbsp;</li>\n<li>If Google is planning on deprecating Reader then <strong>its leaders are deliberately choosing to not defend decisions that fans or users will find indefensible</strong>. This would say a lot about how they would communicate to the marketplace for social apps and about how they&#8217;d be leading their workforce. If this is actually occurring and you\u2019re internal to Google \u2013 it&#8217;s ok, I can imagine you\u2019d be feeling that these decisions are being made obtusely \u201c<em>just because</em>\u201d or since \u201c<em>we need to limit our scope to whatever we can cognitively or technically handle</em>\u201d or such but I\u2019d offer that maybe it&#8217;s needed for driving focus for a large team? I suppose sacrificing pet projects, public responsibility, and transparency could be worth it if the end is a remarkable dream fulfilled. <em>But what if the thing you\u2019re driving everyone toward isn\u2019t the iPod but is instead the Zune?</em> So just make sure it&#8217;s not <em>that</em>.<br />&nbsp;</li>\n<li>The following sentence is unfair but it&#8217;s a kind of myth and fog that has been drifting into view about &#8216;em: Google seems to be choosing efforts like SketchUp over Reader. I doubt there&#8217;s a common calculus, but it\u2019s now harder for Google&#8217;s users to really know how important it is that many millions of people are using a product every day when Google is deciding its evolution and fate.<br />&nbsp;</li>\n</ul>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1320361753.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1309215658.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/79d5c7664bdb4fe1", 
                "categories": [], 
                "title": "Bad advice blues", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=166", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1309215658000000.0", 
                "content": {
                    "content": "<p>It&#8217;s not a good idea to take advice from people who need you to fail in order for them to succeed.</p>\n<p>e.g. The real estate developer looking to expand might forecast dropping prices, which benefits them if you wait to buy as it leaves more inventory available. In other words, they&#8217;re helped by suppressing any talent and luck you may have in completing the task that could impede them.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1309215658.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1303021768.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/05782e894e8640fa", 
                "categories": [], 
                "title": "War machines.", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=150", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1303021768000000.0", 
                "content": {
                    "content": "<p>It&#8217;s not worth framing enemies in business. Because if you gear a workforce up for fighting a foe you get a war mentality which, like a robot in a sci-fi narrative, eventually turns on clients or users of that business. I know it seems counter-intuitive, but I keep seeing this and I think it&#8217;s because war is like liquid, it finds every opportunity to expand.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1303021768.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1302726755.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/1cc8e029275a4f98", 
                "categories": [], 
                "title": "Eulogy", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=63", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1302726755000000.0", 
                "content": {
                    "content": "<p><em>for my father</em></p>\n<p>He&#8217;d have missed some of these latest days<br />\nour family re-joined<br />\nold stories re-told<br />\nbut told longer this time<br />\nas if they grew like rings on trees every year.</p>\n<div style=\"display: none;\">And in the fashion of teachers everywhere<br />\nI feel compelled to ask you<br />\nto raise your hand (and keep it raised) if you were related to Chuck<br />\nor if you weren&#8217;t related but if he ever smiled at you<br />\nor if you ever made anyone else feel at home anywhere<br />\nor if you ever laughed at anything ever.<br />\nAnd to also ask you to look around a little because, if Dad were here today,<br />\nthe people who hands are raised are<br />\nthe people he would make feel welcome<br />\nwhose day he&#8217;d prefer to brighten<br />\nwhose hopes he&#8217;d like to lift<br />\nwhose laugh he&#8217;d try to earn<br />\nand who would likely come to love him sometime during their long, long first conversation.</p>\n<p><small>Ok, i&#8217;ve asked too much for my stunt. please go ahead and lower your hands.</small>\n</div>\n<p>Dad would tell me things in confidence<br />\nabout so many people<br />\nabout his brothers and sister, his parents, his wife, his daughter,<br />\nhis grandchildren, his colleagues,<br />\nabout the many people who touched his life -<br />\nHe would say such gracious and beautiful things about all of you<br />\nand his candidness is all the more remarkable<br />\nfor its being entirely accurate.<br />\nAll of you are a part of my parents&#8217; gift to me<br />\nand I&#8217;m grateful to consider you<br />\nmy friends and family.</p>\n<p>And this is where I should hear my dad&#8217;s voice<br />\nthis is his place, talking to all of you<br />\nnot mine.<br />\nIt was his gift, sharing and relating,<br />\nI can only pretend to do it &#8211;<br />\nnevertheless my father deserves my real voice today<br />\nnot the one I adopted to get dates or fit in<br />\nbut the mewling, nerdy, know-it-all one<br />\nthat&#8217;s actually more about he and I given its provenance from his selflessness.<br />\nSo I&#8217;ll use *it* hoping maybe I can still conjure his<br />\nloving presence<br />\nsince I can&#8217;t hold him.</p>\n<p>Especially now<br />\nI sometimes feel more like my dad than myself.<br />\nI lazily believed I contained only lonely possibility<br />\nbut listening carefully I hear a gulf mostly filled with his beautiful echoes.<br />\nI carry Dad&#8217;s cadence, a sing-song <em>&#8220;welllll now, Mary&#8221;</em><br />\nis my preamble now.<br />\nHis whistle, used as the transition between dialogues<br />\nas if air were filled with fuel for music<br />\nwhich he would combust easily into playful flickerings,<br />\nthis whistle I&#8217;ve adopted<br />\nless his talent.</p>\n<p>You know, hearing him in my own voice got harder as<br />\nDad and I spoke of death more often<br />\nnearer to today&#8217;s memorial.<br />\nHe cried sometimes,<br />\nhis agility devolved by medicine or maybe<br />\nillness,<br />\nor ministrations,<br />\nor misfortune,<br />\nor loneliness,<br />\nor maybe even joy and wouldn&#8217;t we be so lucky if that were true.<br />\nAnd my last words about death to him (just hours before he died)<br />\n<blockquote>&#8220;I&#8217;d rather not risk my father who can still use words like &#8216;elicit&#8217;&#8221;</p></blockquote>\n<p>laid perpendicularly to his last words about it<br />\n<blockquote>&#8220;well, son, if that was the last Blazers game i&#8217;ll see, it was a good one&#8221;</p>\n<p><small><em>(And it was &#8211; they came back from an four point deficit with 32 seconds on the clock to a series of teeth-gritting plays that led to a wildly improbable last-second lob &#8211; if you didn&#8217;t see it you missed an actual thing.)</em></small></p></blockquote>\n<p>The game was a barn-burner<br />\nfor a man familiar with farms<br />\nbut while we talked this deep, terrible hole was being burned open beneath us.<br />\nI thought him fatalistic<br />\nand Dad instead gained another opportunity<br />\nto teach me about hubris.</p>\n<p>He&#8217;s gone</p>\n<p>and now i think my heart might be a different shape<br />\nit feels odd in my chest<br />\nlike it gained right angles</p>\n<p>I need him here. I&#8217;m very selfish. I need him to see the rest. And he deserved a longer life; he earned it.</p>\n<p>And I know he&#8217;d hate this struggle we have<br />\ncoping with his passing,<br />\nso I&#8217;ve been re-reading this prose I found,<br />\nlike a koan.<br />\nIt&#8217;s a small part of a poem by Wendell Berry<br />\nand if I read it maybe it&#8217;ll actually cast some easement here<br />\nbut you have to imagine you&#8217;ve laid your head<br />\non my Dad&#8217;s chest<br />\nand he&#8217;s reading it to you after some bullies in school<br />\nstole your bicycle.</p>\n<blockquote><p>&#8220;But do not let your ignorance<br />\nOf my spirit&#8217;s whereabouts dismay<br />\nYou, or overwhelm your thoughts.<br />\nBe careful not to say<br />\nAnything too final. Whatever<br />\nIs unsure is possible, and life is bigger<br />\nThan flesh. Beyond reach of thought<br />\nLet imagination figure<br />\nYour hope. That will be generous<br />\nTo me and to yourselves.&#8221;</p></blockquote>\n<p>Our taste in poems and other deft art was similar and precise<br />\nas wide in variance as a hairline crack in a glacier,<br />\napt, since we both liked art with a bit of peril<br />\nas if to say<br />\nthis experience might tip you from <em>this-you</em> to the next<br />\nchanging you to something unrecognizable to yourself<br />\nbut better, more true to the universe as it is now.</p>\n<p>Especially one day,<br />\nDad, after watching a TV special about a man dying of cancer,<br />\none of the talking wounded specials,<br />\nsuggested that <em>&#8220;well son, it&#8217;s a story that&#8217;s almost enough to make a guy tell the truth for the rest of his life.&#8221;</em><br />\nThese seemingly small moments of brave sharing<br />\nwould nearly burst my heart with sharp joy<br />\nand now my lives may always have to measure the reach<br />\nof this father-friend<br />\nwho liked to show me the shape I would become<br />\nrather than cutting my edges so I could fit a preferred cast more to his liking<br />\nsince it seemed what he liked best was to recognize native clay<br />\nsolid in its mystery<br />\nand observe how its wonder was synecdoche for the indescribable majesty of<br />\nits being observed by someone.</p>\n<p>Hard to believe<br />\nhe will no longer age<br />\nas I continue changing<br />\ngrowing strange to whatever I once was.</p>\n<p>But he&#8217;s growing still<br />\nas something like light in me and my family<br />\nand as I feel tossed lightly and dropped suddenly<br />\nliving as we all do<br />\nlike a dinghy in a vast sea<br />\nI know there&#8217;s a point<br />\nI can steer toward<br />\nsince his life will be <a href=\"http://www.facebook.com/album.php?fbid=10150151529361188&#038;id=500011187&#038;aid=286601\">my lighthouse</a><br />\nso that I&#8217;ll always know how to go home.</p>\n<p><img src=\"http://massless.org/_imgs/2011/chuck.jpg\" style=\"border: 1px solid #ccc; padding: 5px; margin: 30px 0 0; display: block;\" /><br />\n<em style=\"margin: 0 0 30px; display: block;\">Charles Adelbert Wetherell III, 1941-2011</em></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1302726755.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1286111311.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/bdfe848dfa2246ba", 
                "categories": [], 
                "title": "The Social Network might be about socialness in work.", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=35", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1286111311000000.0", 
                "content": {
                    "content": "<p>The Social Network was potboilery fun: crisp, witty, and beautiful. Fun especially if you&#8217;re building web technology as the film pointed a sliver of mirror at our heart&#8217;s toil during the &#8220;wget&#8221; scene.</p>\n<p>Some are upset about the movie&#8217;s historical fuzziness or purported message. Lessig, for one, is sad about <a href=\"http://www.tnr.com/article/books-and-arts/78081/sorkin-zuckerberg-the-social-network\">what the movie didn&#8217;t address</a>. To his point, yeah, a movie about the magic of the Internet would be one I&#8217;d watch. But, look, since no part of the movie attempts to describe the Internet&#8217;s role in disintermediation and its lowering barriers of entry, it seems beside the point to say they makers of the film <em>missed</em> something and more accurate to say they were trying to explore <em>something else entirely</em>.</p>\n<p>Of course, it&#8217;s not cut and dried what message, if any, was being explored. We can&#8217;t just trust <a href=\"http://tvtropes.org/pmwiki/pmwiki.php/Main/WordOfGod\">Word of God</a>. Who knows what exactly the film wanted us to think, but it&#8217;s fun to guess what it <em>might</em> be trying to have us think. Maybe it&#8217;s this&#8230;?</p>\n<p>If the thing that prevented the creation of billion-dollar businesses was labor, technology, and capital + a great idea, what now happens when the costs of creation and maintenance become low enough that the only thing left to prevent massive, global success is the great idea?</p>\n<p>I like that the movie explores possible changes in (business) tactics and their ethical quandaries. What happens if the value of an idea and the time-to-market suddenly matter even more than they did? If the technical know-how becomes easier to acquire, markets might reward those who are even better at idea prevention, execution suppression, and other techniques used to smother competitive incubations particularly as performed via social/personal relationships.</p>\n<p>To be clear, I don&#8217;t know if that&#8217;s where we&#8217;re at. Seriously, <strong>I don&#8217;t</strong>. Fiction can make beautiful delusions seems like facts and the movie is highly dramatized (read: it ain&#8217;t true) but I sure like that it has me thinking about these things.</p>\n<p><small>(Something else I&#8217;m thinking about: why didn&#8217;t the Saverin character take a cab or call Mark when waiting at the airport? I like that this helps suggest how he may have often failed to take the initiative in his own life where Facebook was concerned.)</small></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1286111311.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://massless.org/index.html%3Ffeed=rss2", 
                    "htmlUrl": "http://massless.org", 
                    "title": "massless"
                }, 
                "updated": 1280754372.0, 
                "author": "chris", 
                "id": "tag:google.com,2005:reader/item/3ca4a2ae42234e4c", 
                "categories": [], 
                "title": "Channeling Carrell.", 
                "alternate": [
                    {
                        "href": "http://massless.org/?p=29", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1280754372000000.0", 
                "content": {
                    "content": "<p>Recently I was lucky enough to have <a href=\"http://twitter.com/ded\">Dustin Diaz</a> spend his valuable time helping me update some promo photos. During the session I think I boasted that I could mimic the &#8220;Andy Stitzer&#8221; smile. \u00a0He took me up on that.</p>\n<p><a href=\"http://massless.org/wp-content/uploads/2010/08/virgin.jpg\"><img alt=\"\" class=\"alignnone size-medium wp-image-30\" height=\"300\" src=\"http://massless.org/wp-content/uploads/2010/08/virgin-213x300.jpg\" title=\"virgin\" width=\"213\" /></a></p>\n<p>(the original, for reference)</p>\n<p><img alt=\"\" class=\"alignnone\" height=\"299\" src=\"http://upload.wikimedia.org/wikipedia/en/thumb/4/43/40-Year-OldVirginMoviePoster.jpg/200px-40-Year-OldVirginMoviePoster.jpg\" width=\"200\" /></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315638", 
                "published": 1280754372.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://massless.org", 
        "updated": 1530516315.638845, 
        "id": "feed/http://massless.org/index.html%3Ffeed=rss2", 
        "title": "massless"
    }, 
    "feed/https://www.schneier.com/blog/atom.xml": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1530335147.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/ef9ac6eb90a44bbc", 
                "categories": [], 
                "title": "Friday Squid Blogging: Fried Squid with Turmeric", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/friday_squid_bl_631.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530335147000000.0", 
                "content": {
                    "content": "<p>Good-looking <a href=\"https://www.straitstimes.com/lifestyle/food/make-your-own-crispy-calamari-for-an-addictive-treat\">recipe</a>.</p>\n\n<p>As usual, you can also use this squid post to talk about the security stories in the news that I haven't covered.</p>\n\n<p>Read my blog posting guidelines <a href=\"https://www.schneier.com/blog/archives/2017/03/commenting_poli.html\">here</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1530335147.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1530312250.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/91797f796b1e4dc6", 
                "categories": [], 
                "title": "Conservation of Threat", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/conservation_of.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530312250000000.0", 
                "content": {
                    "content": "<p>Here's some interesting research about how we perceive threats. Basically, as the environment becomes safer we basically manufacture new threats. From an <a href=\"https://theconversation.com/why-your-brain-never-runs-out-of-problems-to-find-98990\">essay</a> about the research:</p>\n\n<blockquote><p>To study how concepts change when they become less common, we brought volunteers into <a href=\"http://wjh-www.harvard.edu/%7Edtg/gilbert.htm\">our laboratory</a> and gave them a simple task \u00ad-- to look at a series of computer-generated faces and decide which ones seem \"threatening.\" The faces had been <a href=\"http://dx.doi.org/10.1037/a0032335\">carefully designed by researchers</a> to range from very intimidating to very harmless.\n\n<p>As we showed people fewer and fewer threatening faces over time, we found that they expanded their definition of \"threatening\" to include a wider range of faces. In other words, when they ran out of threatening faces to find, they started calling faces threatening that they used to call harmless. Rather than being a consistent category, what people considered \"threats\" depended on how many threats they had seen lately.</p></blockquote>\n\n<p>This has a lot of implications in security systems where humans have to make judgments about threat and risk: TSA agents, police noticing \"suspicious\" activities, \"see something say something\" campaigns, and so on.</p>\n\n<p>The academic <a href=\"http://science.sciencemag.org/content/360/6396/1465\">paper</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1530312250.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1530214160.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/79e25318191342df", 
                "categories": [], 
                "title": "Manipulative Social Media Practices", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/manipulative_so.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530214160000000.0", 
                "content": {
                    "content": "<p>The Norwegian Consumer Council <a href=\"https://www.forbrukerradet.no/side/facebook-and-google-manipulate-users-into-sharing-personal-data/\">just published</a> an <a href=\"https://fil.forbrukerradet.no/wp-content/uploads/2018/06/2018-06-27-deceived-by-design-final.pdf\">excellent report</a> on the deceptive practices tech companies use to trick people into giving up their privacy.</p>\n\n<p>From the executive summary:</p>\n\n<blockquote><p>Facebook and Google have privacy intrusive defaults, where users who want the privacy friendly option have to go through a significantly longer process. They even obscure some of these settings so that the user cannot know that the more privacy intrusive option was preselected.\n\n<p>The popups from Facebook, Google and Windows 10 have design, symbols and wording that nudge users away from the privacy friendly choices. Choices are worded to compel users to make certain choices, while key information is omitted or downplayed. None of them lets the user freely postpone decisions.  Also, Facebook and Google threaten users with loss of functionality or deletion of the user account if the user does not choose the privacy intrusive option.</p>\n\n<p>[...]</p>\n\n<p>The combination of privacy intrusive defaults and the use of dark patterns, nudge users of Facebook and Google, and to a lesser degree Windows 10, toward the least privacy friendly options to a degree that we consider unethical. We question whether this is in accordance with the principles of data protection by default and data protection by design, and if consent given under these circumstances can be said to be explicit, informed and freely given.</p></blockquote>\n\n<p>I am a big fan of the Norwegian Consumer Council. They've published some <a href=\"https://www.forbrukerradet.no/siste-nytt/connected-toys-violate-consumer-laws/\">excellent</a> <a href=\"https://www.forbrukerradet.no/side/significant-security-flaws-in-smartwatches-for-children/\">research</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1530214160.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1530128669.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/605ac0401c0a4840", 
                "categories": [], 
                "title": "IEEE Statement on Strong Encryption vs. Backdoors", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/ieee_statement_.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530128669000000.0", 
                "content": {
                    "content": "<p>The IEEE <a href=\"http://globalpolicy.ieee.org/new-ieee-position-statement-supports-strong-encryption-for-confidentiality-and-data-integrity/\">came out</a> in favor of strong encryption:</p>\n\n<blockquote><p>IEEE supports the use of unfettered strong encryption to protect confidentiality and integrity of data and communications. We oppose efforts by governments to restrict the use of strong encryption and/or to mandate exceptional access mechanisms such as \"backdoors\" or \"key escrow schemes\" in order to facilitate government access to encrypted data. Governments have legitimate law enforcement and national security interests. IEEE believes that mandating the intentional creation of backdoors or escrow schemes -- no matter how well intentioned -- does not serve those interests well and will lead to the creation of vulnerabilities that would result in unforeseen effects as well as some predictable negative consequences </p></blockquote>\n\n<p>The full statement is <a href=\"http://globalpolicy.ieee.org/wp-content/uploads/2018/06/IEEE18006.pdf\">here</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1530128669.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1530052683.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/653282db91d34d2f", 
                "categories": [], 
                "title": "Bypassing Passcodes in iOS", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/bypassing_passc.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530052683000000.0", 
                "content": {
                    "content": "<p>Last week, a <a href=\"https://www.zdnet.com/article/a-hacker-figured-out-how-to-brute-force-an-iphone-passcode/\">story</a> was going around explaining how to brute-force an iOS password. Basically, the trick was to plug the phone into an external keyboard and trying every PIN at once:</p>\n\n<blockquote><p>We reported Friday on Hickey's findings, which claimed to be able to send all combinations of a user's possible passcode in one go, by enumerating each code from 0000 to 9999, and concatenating the results in one string with no spaces. He explained that because this doesn't give the software any breaks, the keyboard input routine takes priority over the device's data-erasing feature. </p></blockquote>\n\n<p>I didn't write about it, because it seemed too good to be true. A few days later, Apple pushed back on the findings -- and it seems that it doesn't work.</p>\n\n<p>This isn't to say that no one can break into an iPhone. We know that companies like <a href=\"https://www.forbes.com/sites/thomasbrewster/2018/02/26/government-can-access-any-apple-iphone-cellebrite\">Cellebrite</a> and <a href=\"https://blog.malwarebytes.com/security-world/2018/03/graykey-iphone-unlocker-poses-serious-security-concerns/\">Grayshift</a> are renting/selling iPhone unlock tools to law enforcement -- which means governments and criminals can do the same thing -- and that Apple is releasing a <a href=\"https://www.zdnet.com/article/ios-feature-will-make-it-tougher-for-cops-to-unlock-your-iphone/\">new</a> <a href=\"https://motherboard.vice.com/en_us/article/ne95pg/apple-iphone-unlocking-tool-graykey-cat-and-mouse-game\">feature</a> called \"restricted mode\" that may make those hacks obsolete.</p>\n\n<p>Grayshift is <a href=\"https://motherboard.vice.com/en_us/article/ne95pg/apple-iphone-unlocking-tool-graykey-cat-and-mouse-game\">claiming</a> that its technology will still work.</p>\n\n<blockquote><p>Former Apple security engineer Braden Thomas, who now works for a company called Grayshift, warned customers who had bought his GrayKey iPhone unlocking tool that iOS 11.3 would make it a bit harder for cops to get evidence and data out of seized iPhones. A change in the beta didn't break GrayKey, but would require cops to use GrayKey on phones within a week of them being last unlocked.\n\n<p>\"Starting with iOS 11.3, iOS saves the last time a device has been unlocked (either with biometrics or passcode) or was connected to an accessory or computer. If a full seven days (168 hours) elapse [sic] since the last time iOS saved one of these events, the Lightning port is entirely disabled,\" Thomas wrote in a blog post published in a customer-only portal, which Motherboard obtained. \"You cannot use it to sync or to connect to accessories. It is basically just a charging port at this point. This is termed USB Restricted Mode and it affects all devices that support iOS 11.3.\"</p></blockquote>\n\n<p>Whether that's real or marketing, we don't know.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1530052683.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1529949605.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/73d76b53ffd447d6", 
                "categories": [], 
                "title": "Secure Speculative Execution", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/secure_speculat.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529949605000000.0", 
                "content": {
                    "content": "<p>We're starting to see research into designing speculative execution systems that avoid Spectre- and Meltdown-like security problems. Here's <a href=\"https://arxiv.org/pdf/1806.05179.pdf\">one</a>.</p>\n\n<p>I don't know if this particular design secure. My guess is that we're going to see several iterations of design and attack before we settle on something that works. But it's good to see the research results emerge.</p>\n\n<p>News <a href=\"https://betanews.com/2018/06/16/safespec-meltdown-spectre-fix/amp/\">article</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1529949605.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1529730453.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/fc35e6d7bd654c5d", 
                "categories": [], 
                "title": "Friday Squid Blogging: Capturing the Giant Squid on Video", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/friday_squid_bl_629.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529730453000000.0", 
                "content": {
                    "content": "<p>In this 2013 TED talk, oceanographer Edith Widder <a href=\"https://www.ted.com/talks/edith_widder_how_we_found_the_giant_squid\">explains</a> how her team captured the giant squid on video.</p>\n\n<p>As usual, you can also use this squid post to talk about the security stories in the news that I haven't covered.</p>\n\n<p>Read my blog posting guidelines <a href=\"https://www.schneier.com/blog/archives/2017/03/commenting_poli.html\">here</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1529730453.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1529719132.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/5aca75ae92634b2c", 
                "categories": [], 
                "title": "The Effects of Iran's Telegram Ban", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/the_effects_of_4.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529719132000000.0", 
                "content": {
                    "content": "<p>The Center for Human Rights in Iran has released a <a href=\"https://www.iranhumanrights.org/wp-content/uploads/Closing-the-gates-3-online.pdf\">report</a> outlining the effect's of that country's ban on Telegram, a secure messaging app used by about half of the country.</p>\n\n<blockquote><p>The ban will disrupt the most important, uncensored platform for information and communication in Iran, one that is used extensively by activists, independent and citizen journalists, dissidents and international media. It will also impact electoral politics in Iran, as centrist, reformist and other relatively moderate political groups that are allowed to participate in Iran's elections have been heavily and successfully using Telegram to promote their candidates and electoral lists during elections. State-controlled domestic apps and media will not provide these groups with such a platform, even as they continue to do so for conservative and hardline political forces in the country, significantly aiding the latter.</p></blockquote>\n\n<p>From a Wired <a href=\"https://www.wired.com/story/iran-telegram-ban/\">article</a>:</p>\n\n<blockquote><p>Researchers found that the ban has had broad effects, hindering and chilling individual speech, forcing political campaigns to turn to state-sponsored media tools, limiting journalists and activists, curtailing international interactions, and eroding businesses that grew their infrastructure and reach off of Telegram.</p></blockquote>\n\n<p>It's interesting that the analysis doesn't really center around the security properties of Telegram, but more around its ubiquity as a messaging platform in the country.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1529719132.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1529693528.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/34dfa82b7d874231", 
                "categories": [], 
                "title": "Domain Name Stealing at Gunpoint", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/domain_name_ste.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529693528000000.0", 
                "content": {
                    "content": "<p>I missed this story when it came around <a href=\"https://www.theregister.co.uk/2017/07/21/domain_name_transfers/\">last year</a>: someone tried to steal a domain name at gunpoint. He was <a href=\"https://motherboard.vice.com/en_us/article/pavwj8/armed-robbery-domain-website-gunpoint-doitforstate\">just</a> <a href=\"https://www.engadget.com/2018/06/17/prison-sentence-for-armed-web-domain-robbery-attempt/\">sentenced</a> to 20 years in jail.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1529693528.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/https://www.schneier.com/blog/atom.xml", 
                    "htmlUrl": "https://www.schneier.com/blog/", 
                    "title": "Schneier on Security"
                }, 
                "updated": 1529657135.0, 
                "author": "Bruce Schneier", 
                "id": "tag:google.com,2005:reader/item/bef1a456c0af4227", 
                "categories": [], 
                "title": "Algeria Shut Down the Internet to Prevent Students from Cheating on Exams", 
                "alternate": [
                    {
                        "href": "https://www.schneier.com/blog/archives/2018/06/algeria_shut_do.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529611749000000.0", 
                "content": {
                    "content": "<p>Algeria <a href=\"https://www.theguardian.com/world/2018/jun/21/algeria-shuts-internet-prevent-cheating-school-exams\">shut the Internet down</a> nationwide to prevent high-school students from cheating on their exams.</p>\n\n<p>The solution in New South Wales, Australia was to <a href=\"http://mobile.abc.net.au/news/2018-06-21/ban-on-smartphones-in-nsw-schools-on-the-cards/9893186\">ban smartphones</a>.</p>\n\n<p>EDITED TO ADD (6/22): Slashdot <a href=\"https://news.slashdot.org/story/18/06/21/2142245/algeria-shuts-off-entire-countrys-internet-to-stop-students-from-cheating\">thread</a>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312533", 
                "published": 1529611749.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "https://www.schneier.com/blog/", 
        "updated": 1530516312.533331, 
        "id": "feed/https://www.schneier.com/blog/atom.xml", 
        "title": "Schneier on Security"
    }, 
    "feed/http://feeds.feedburner.com/WorldWarIIToday": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530532844.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/e1c902e5f0134a0c", 
                "categories": [], 
                "title": "The Germans crack down on ordinary Poles", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/gmThxFJGeAQ/2nd-july-1943-the-germans-crack-down-on-ordinary-poles", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530532844000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/2nd-july-1943-the-germans-crack-down-on-ordinary-poles\" title=\"The Germans crack down on ordinary Poles\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"205\" src=\"http://ww2today.com/wp-content/uploads/2013/07/Bundesarchiv_Bild_137-055840_Polen_Galiziendeutsche_Umsiedler-295x205.jpg\" width=\"295\" /></a></div>2nd July 1943: The Germans crack down on ordinary PolesA large group of women stood on both sides of the street, cursing the Germans and crying. Seeing this I was reminded of the Jews marching prior to their liquidation. Everything looked the same, except for one thing: the big difference was attitude. The Jews marched in complete resignation, guarded only by a few gendarmes. Here these marching men showed hatred toward Germans and were being guarded by hundreds of soldiers carrying machine guns.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/gmThxFJGeAQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530532844.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530446408.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/e8206147a1f94b91", 
                "categories": [], 
                "title": "Hitler sets out objectives for \u2018Citadel\u2019", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/1U2n8J029c8/1st-july-1943-hitler-sets-out-objectives-for-citadel", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530446408000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/1st-july-1943-hitler-sets-out-objectives-for-citadel\" title=\"Hitler sets out objectives for &#039;Citadel&#039;\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"206\" src=\"http://ww2today.com/wp-content/uploads/2013/07/Bundesarchiv_Bild_146-1971-016-25_Waffenvorf\u00fchrung_Keitel_Hitler_Speer-295x206.jpg\" width=\"295\" /></a></div>1st July 1943: Hitler sets out objectives for 'Citadel'\nWhat\u2019s at stake ?\u00a0 Germany needs the conquered territory, or she will not exist for long.\u00a0 She must win hegemony over Europe.\u00a0 Where we are \u2014 we stay.\u00a0 Soldiers must see this, otherwise they\u2019ll regard their sacrifices as in vain.\u00a0 Balkans must not be lost whatever happens ;\u00a0 our most vital raw materials for war are there.\u00a0 The Italians have pulled out of Greece and been replaced by Germans.\u00a0 Feel safer since then.\u00a0 Crete is firmly in our hands ;\u00a0 thus we prevent enemy from getting air bases.\u00a0<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/1U2n8J029c8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530446408.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530360017.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/6d8a3cac75584aef", 
                "categories": [], 
                "title": "The SS report that Galicia, Poland is judenfrei", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/AuYw6Y620lo/30th-june-1943-the-ss-report-that-galicia-poland-is-judenfrei", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530360017000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/30th-june-1943-the-ss-report-that-galicia-poland-is-judenfrei\" title=\"The SS report that Galicia, Poland is &lt;em&gt;judenfrei&lt;/em&gt;\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"354\" src=\"http://ww2today.com/wp-content/uploads/2013/06/Lublin-ghetto-jews-295x354.jpg\" width=\"295\" /></a></div>30th June 1943: The SS report that Galicia, Poland is <em>judenfrei</em>There were also other immense difficulties during the Aktionen as the Jews tried to avoid evacuation by all possible means. They not only tried to escape, and concealed themselves in the most improbable places, drainage canals, chimneys, even in sewage pits, etc. They barricaded themselves in catacombs of passages, in cellars made into bunkers, in holes in the earth, in cunningly contrived hiding places, in attics and sheds, inside furniture, etc. As the number of Jews still remaining decreased their resistance became the greater. They used weapons of all types for their defense, and in particular those of Italian origin.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/AuYw6Y620lo\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530360017.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530273621.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/d5e027e102274487", 
                "categories": [], 
                "title": "A hot day for the SS sadists in Treblinka", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/67k2EPfM_bI/29th-june-1943-a-hot-day-for-the-ss-sadists-in-treblinka", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530273621000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/29th-june-1943-a-hot-day-for-the-ss-sadists-in-treblinka\" title=\"A hot day for the SS sadists in Treblinka\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"410\" src=\"http://ww2today.com/wp-content/uploads/2013/06/Belsen-child-figure-295x410.jpg\" width=\"295\" /></a></div>29th June 1943: A hot day for the SS sadists in TreblinkaIvan is about twenty years old and looks like a giant healthy horse. He is pleased when he has an opportunity to let off his energy on the workers. From time to time he feels the urge to take a sharp knife, detain a worker who is running past and cut off his ear. The blood spurts, the worker screams, but he must keep running with his litter. Ivan waits calmly until the worker runs back and orders him to put the litter down. He then tells him to strip and go over to the pit, where he shoots him.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/67k2EPfM_bI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530273621.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530187208.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/8e8bf21784fc47fd", 
                "categories": [], 
                "title": "A USAAF bomber crew waits for an Op.", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/PSeO3kx15Bk/28th-june-1943-a-usaaf-bomber-crew-waits-for-an-op", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530187208000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/28th-june-1943-a-usaaf-bomber-crew-waits-for-an-op\" title=\"A USAAF bomber crew waits for an Op.\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"225\" src=\"http://ww2today.com/wp-content/uploads/2013/06/Consolidated-liberator-takes-off-295x225.jpg\" width=\"295\" /></a></div>28th June 1943: A USAAF bomber crew waits for an Op.They sip the at, tasteless beer. One of them says, \u201cI saw a paper from home at the Red Cross in London.\" It is quiet. The others look at him across their glasses. A mixed group of pilots and ATS girls at the other end of the pub have started a song. It is astonishing how many of the songs are American. \u201cYou\u2019d Be So Nice to Come Home to,\u201d they sing. And the beat of the song is subtly changed. It has become an English song. The waist gunner raises his voice to be heard over the singing. \u201cIt seems to me that we are afraid to announce our losses. It seems almost as if the War Department was afraid that the country couldn't take it. I never saw anything the country couldn\u2019t take.\"<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/PSeO3kx15Bk\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530187208.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530100810.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/26fc67c0dc00439e", 
                "categories": [], 
                "title": "The Commandos receive their battle orders", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/vr6hhMF0VoY/27th-june-1943-the-commandos-receive-their-orders", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530100810000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/27th-june-1943-the-commandos-receive-their-orders\" title=\"The Commandos receive their battle orders\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"270\" src=\"http://ww2today.com/wp-content/uploads/2013/06/commando-training-295x270.jpg\" width=\"295\" /></a></div>27th June 1943: The Commandos receive their battle ordersThe announcement gave a keener edge to our sensibility. We knew the worst at last. This expedition was not the gigantic hoax which we had been almost tempted to believe it; it was not a fantasy but a reality, that rose upright through the spume of fear and expectation like a gaunt rock from the ocean bed.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/vr6hhMF0VoY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530100810.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1530014400.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/3ac8635f7de0492d", 
                "categories": [], 
                "title": "Cholera and Japanese savagery on the Railway of Death", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/9l326JqxixI/26th-june-1943-cholera-and-japanese-savagery-on-the-railway-of-death", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530014400000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/26th-june-1943-cholera-and-japanese-savagery-on-the-railway-of-death\" title=\"Cholera and Japanese savagery on the Railway of Death\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"221\" src=\"http://ww2today.com/wp-content/uploads/2013/06/Railway-of-Death-web-295x221.jpg\" width=\"295\" /></a></div>26th June 1943: Cholera and Japanese savagery on the Railway of DeathA cholera death in the British camp today along with 3 others. Their state is pitiable but then, Oh Lord! hygiene is a menace to us who live alongside them. No. 2 rock clearing party left today at 0700 hours in darkness and no doubt will not be back until late tonight, poor devils. So the pace increases. Imagine those poor ill, exhausted wretches having to be got up, fed, issued with lunch rice and got away in black darkness after counts, etc. and to drag their way into camp again in the dark some fourteen hours hence.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/9l326JqxixI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1530014400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1529928040.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/d34f0b04732e4c22", 
                "categories": [], 
                "title": "Guyanian navigator blasted into the sky over Holland", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/9WK5pO1Vhcw/25th-june-1943-guyanian-navigator-blasted-into-the-sky-over-holland", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529928040000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/25th-june-1943-guyanian-navigator-blasted-into-the-sky-over-holland\" title=\"Guyanian navigator blasted into the sky over Holland\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"224\" src=\"http://ww2today.com/wp-content/uploads/2013/06/lancaster-in-flight-295x224.jpg\" width=\"295\" /></a></div>25th June 1943: Bomber navigator blasted into the sky over HollandThe German fired a long volley and a jet of tracer spat out towards us. Addison, from his tail turret, returned fire immediately. The fighter climbed a little and veered off to the right, bringing him into the field of fire of the mid-upper gunner, Sergeant Geoffrey Wallis, who immediately opened fire. Everything was happening very fast. All hell had broken loose.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/9WK5pO1Vhcw\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1529928040.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1529841608.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/25d6d1bcea8944a8", 
                "categories": [], 
                "title": "Australian Lancaster crew bale out over Belgium", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/1wroIb6Bbw4/24th-june-1943-australian-lancaster-crew-bale-out-over-belgium", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529841608000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/24th-june-1943-australian-lancaster-crew-bale-out-over-belgium\" title=\"Australian Lancaster crew bale out over Belgium\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"244\" src=\"http://ww2today.com/wp-content/uploads/2013/06/lancaster-295x244.jpg\" width=\"295\" /></a></div>24th June 1943: Australian Lancaster crew bale out over BelgiumWe could see Wuppertal, ablaze, in front of us and still ten miles away. Dozens of searchlights speared skywards around the familiar box barrage of exploding anti-aircraft shells. Green and red target indicators confirmed the presence of our Pathfinder force. Heavy bombers were as thick as flies, thankfully all going in somewhat the same direction.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/1wroIb6Bbw4\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1529841608.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
                    "htmlUrl": "http://ww2today.com", 
                    "title": "World War II Today"
                }, 
                "updated": 1529755580.0, 
                "author": "Editor", 
                "id": "tag:google.com,2005:reader/item/3e8fa3f8cc674033", 
                "categories": [], 
                "title": "A Soviet infantryman prepares for battle", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/WorldWarIIToday/~3/4gCb6VphVLQ/23rd-june-1943-a-soviet-infantryman-prepares-for-battle", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529755580000000.0", 
                "content": {
                    "content": "<div><a href=\"http://ww2today.com/23rd-june-1943-a-soviet-infantryman-prepares-for-battle\" title=\"A Soviet infantryman prepares for battle\"><img alt=\"\" class=\"attachment-post-thumbnail size-post-thumbnail wp-post-image\" height=\"173\" src=\"http://ww2today.com/wp-content/uploads/2013/06/Sd.Kfz_.184-Ferdinand-b-295x173.jpg\" width=\"295\" /></a></div>23rd June 1943: A Soviet infantryman prepares for battleWe veterans explained to the greenhorns the particular weaknesses of Tigers, Ferdinands, Panthers, and so on. You should always act in pairs. The enemy tank must ride over you, over your trench, then one soldier fires at the accompanying infantrymen, while the other throws the bottle or grenade. Because of the intensive exercises involving tanks, we realized that very soon we\u2019d be taking part in some heavy fighting between large armoured forces.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/WorldWarIIToday/~4/4gCb6VphVLQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311507", 
                "published": 1529755580.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://ww2today.com", 
        "updated": 1530516311.50737, 
        "id": "feed/http://feeds.feedburner.com/WorldWarIIToday", 
        "title": "World War II Today"
    }, 
    "feed/http://surisburnbook.tumblr.com/rss": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1486702921.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/a3f4be3dd6cd4b68", 
                "categories": [], 
                "title": "everythingthatgoespop:\nBreaking News:\n\nGeorge and Amal Clooney...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/157031457190", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1486702921000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/e137e754b34ff2a38491d096c7104f02/tumblr_ol4kkj4yHP1tomnd9o1_500.jpg\" /><br /><br /><p><a class=\"tumblr_blog\" href=\"http://everythingthatgoespop.tumblr.com/post/157031032769/breaking-news-george-and-amal-clooney-are\" target=\"_blank\">everythingthatgoespop</a>:</p><blockquote>\n<p>Breaking News:</p>\n\n<p>George and Amal Clooney are expecting twins!\u2764\ud83d\udc76\ud83c\udffb</p>\n</blockquote>\n<p>2017 taketh away (civil liberties), but 2017 also giveth (celebrity twins).</p><p>(Just popping back in to say AAAAAAAAAAAMAL. And BEYONCE.)\u00a0</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1486702921.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1464152422.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/895f84b593ef455b", 
                "categories": [], 
                "title": "Seriously, though. If I go away, who\u2019s going to tell Blue Ivy...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/144873113824", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1464152422000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/309923b4f811fb4e308198fb2b2c17b0/tumblr_o7o6y8ENpB1qmik36o1_500.jpg\" /><br /><br /><p>Seriously, though. If I go away, who\u2019s going to tell Blue Ivy that she DOESN\u2019T NEED TO HANG OUT WITH APPLE MARTIN JUST TO BE NICE? Because come on. You are better than that.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1464152422.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1464141623.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/00cc101e79c44f21", 
                "categories": [], 
                "title": "North West has learned to be insufferable, and that is a real...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/144865611238", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1464141623000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/28d51ca36bf7398d9a64c2d89400073b/tumblr_o7o6o2Zj3E1qmik36o1_500.jpg\" /><br /><br /><p>North West has learned to be insufferable, and that is a real tragedy for the world.</p><p>Penelope Disick is still salvageable, maybe.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1464141623.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1464130820.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/2ddff9b73cc840da", 
                "categories": [], 
                "title": "Hey, y\u2019all. Allie here. I know it\u2019s been quiet around these parts lately, and I wanted to tell you...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/144859070684", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1464130820000000.0", 
                "content": {
                    "content": "<p>Hey, y\u2019all. Allie here. I know it\u2019s been quiet around these parts lately, and I wanted to tell you what\u2019s going on. (Spoiler alert: All good stuff.)</p><p>When I started this blog almost five (FIVE!) years ago, I thought if I was really lucky, it might end up as one of those great Tumblrs that makes everyone laugh for two weeks before closing up shop. I thought if I was even luckier, the Cruises (then still married and very litigious) would say <i>ummm &hellip; how about no? </i>and dramatically shut me down.</p><p>Instead, this blog and the people who read it changed everything for me. I got a book deal, I got a foot in the door, and a\u00a0\u201ctoo ridiculous to even consider\u201d dream became a real goal, then became my damn day job.</p><p>Yesterday was my first day on the writing staff at <i>Notorious</i>, the TV series I co-created. You\u2019ll be able to watch it Thursdays this fall on ABC, after <i>Grey\u2019s Anatomy. </i>(That\u2019s a real, true sentence I just wrote!)</p><p>We\u2019ve been working on the pilot nonstop for the last several months, which is where I\u2019ve been, and it doesn\u2019t look like that\u2019s going to change any time soon. But it feels weird and wrong to just abandon this blog, because I really would be nowhere near here if not for sweet, sophisticated Suri. If not for you people, reading and reblogging and telling your friends.</p><p>So let\u2019s go out with a bang, shall we? Let\u2019s spend the rest of the week discussing the famous children of famous celebrities. Let\u2019s put our best, most blatantly offensive thoughts out there.\u00a0</p><p>Because yeah, Prince George is starting to look like he might be a vampire.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1464130820.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1459224813.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/0f308d42ec67407f", 
                "categories": [], 
                "title": "These two become more and more exhausting with each passing...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/141855808053", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1459224813000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/0cf5283c7cc50e54205e90ffd8c765c9/tumblr_o4rei5Wqyx1qmik36o1_500.png\" /><br /><br /><p>These two become more and more exhausting with each passing holiday.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1459224813.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1459213731.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/6a02ec070d354157", 
                "categories": [], 
                "title": "I WENT TO A BASKETBALL GAME AND I DIDN\u2019T DIE, VOMIT, OR...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/141846876835", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1459213731000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/7c7f1a176b0cc76dae365f8b008fa5f5/tumblr_o4rearjVuY1qmik36o1_500.jpg\" /><br /><br /><p>I WENT TO A BASKETBALL GAME AND I DIDN\u2019T DIE, VOMIT, OR KILL SOMEONE.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1459213731.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1457736249.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/cfed5fed4c124270", 
                "categories": [], 
                "title": "I mean, I love America and everything, but I would elect Malia...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/140856331815", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1457736249000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/a601beb46bf4658cc87beb2df5b4791b/tumblr_o3vq9mk5Vb1qmik36o1_500.jpg\" /><br /><br /><p>I mean, I love America and everything, but I would elect Malia Obama to a queenship if that were an option.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1457736249.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1457475932.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/b3f7d82ea66949ba", 
                "categories": [], 
                "title": "Brooklyn Beckham recently turned 17, in case you wanted a...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/140687323300", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1457475932000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/adcaf4ca4d6dfb0c0bbd64e7a0e3a906/tumblr_o3q5eltsFS1qmik36o1_500.png\" /><br /><br /><p>Brooklyn Beckham recently turned 17, in case you wanted a reminder of how quickly time passes and how good Victoria looks regardless.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1457475932.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1457407803.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/821f7125db124d59", 
                "categories": [], 
                "title": "Blue Ivy was unimpressed by the Super Bowl. I think we all could...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/140642068955", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1457407803000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/2a0f8a7f3c266988fddcd2071d1039f9/tumblr_o3oou4bITd1qmik36o1_500.jpg\" /><br /><br /><p>Blue Ivy was unimpressed by the Super Bowl. I think we all could have assumed as much. Clearly she has more sophisticated taste.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1457407803.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1457390449.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/70dadc89486b4484", 
                "categories": [], 
                "title": "Prince George is planning something. I can just tell.", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/140629719865", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1457390449000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/fb52536cfd8eabfc420d1e2079a83fbe/tumblr_o3obg1Z1YM1qmik36o1_500.jpg\" /><br /><br /><p>Prince George is planning something. I can just tell.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1457390449.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1456187142.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/6f6bd5efeaa84be8", 
                "categories": [], 
                "title": "There\u2019s nothing more sweetly sad than a baby who has no idea...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/139794118155", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1456187142000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/aedc13572b78734d9175e950e58f80ea/tumblr_o2yiyuC4FV1qmik36o1_500.jpg\" /><br /><br /><p>There\u2019s nothing more sweetly sad than a baby who has no idea what he\u2019s in for.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1456187142.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1455750341.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/d4605810393843d3", 
                "categories": [], 
                "title": "Misery, part 4,526. Another volume in the life of North West the...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/139485931570", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1455750341000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/45267a98b32c87ba73730e7b09f974d0/tumblr_o2p4biHBK91u4q057o1_500.jpg\" /><br /><br /><p>Misery, part 4,526. Another volume in the life of North West the Person.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1455750341.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1455668634.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/3497c7dfac484022", 
                "categories": [], 
                "title": "ilovevictoriabeckham:\n\nx\n\n\nLook, it\u2019s your semi-annual photo of...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/139427687840", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1455668634000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/8b73d6ad6eacde51b9d9a7a67c613ab4/tumblr_o2jo5i4bLF1st000oo1_500.jpg\" /><br /><br /><p><a class=\"tumblr_blog\" href=\"http://ilovevictoriabeckham.tumblr.com/post/139297159689\" target=\"_blank\">ilovevictoriabeckham</a>:</p>\n<blockquote>\n<p><a href=\"https://twitter.com/BazaarBrideIn/status/698897489491922944\" target=\"_blank\"><i>x</i></a></p>\n</blockquote>\n\n<p>Look, it\u2019s your semi-annual photo of the Beckhams at Victoria\u2019s fashion show. Are you surprised they still look like ten million bucks? Because I\u2019m not.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1455668634.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1455590006.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/008e50f63a754195", 
                "categories": [], 
                "title": "If this is, as Tyra said, the\u00a0\u201chappiest Valentine\u2019s Day of her...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/139368984370", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1455590006000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/c06d3323e7954bb7000ce35ffc8c2e12/tumblr_o2lq7qtIzS1qmik36o1_500.jpg\" /><br /><br /><p>If this is, as Tyra said, the\u00a0\u201chappiest Valentine\u2019s Day of her life,\u201d what in the world was her saddest?</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1455590006.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1454977018.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/aa4eeab17d1f489b", 
                "categories": [], 
                "title": "This photo was the only real point of having the Super Bowl in...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/138930402455", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1454977018000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/c23fc59f6015c4ea97cbc1973dac4680/tumblr_o28l8aUdH11qmik36o1_500.jpg\" /><br /><br /><p>This photo was the only real point of having the Super Bowl in the first place.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1454977018.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1454543261.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/6467f49bb5924070", 
                "categories": [], 
                "title": "Just when you think there\u2019s no one on earth with a more...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/138609606730", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1454543261000000.0", 
                "content": {
                    "content": "<br /><br /><p>Just when you think there\u2019s no one on earth with a more embarrassing life than mine \u2026 stay strong, Caroline Cruz.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1454543261.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1454393236.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/f03a91983044471c", 
                "categories": [], 
                "title": "susieqnessfashion:\n\nKiernan Shipka in Erdem\n\n at the 2016 SAG...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/138502414770", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1454393236000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/760c83c9970df54ca5ba9907c9740c11/tumblr_o1vnbsgdQm1rqsb22o1_500.jpg\" /><br /><br /><p><a class=\"tumblr_blog\" href=\"http://susieqnessfashion.tumblr.com/post/138484747217\" target=\"_blank\">susieqnessfashion</a>:</p>\n<blockquote>\n<p>Kiernan Shipka in Erdem\n\n at the 2016 SAG Awards\n\n</p>\n</blockquote>\n\n<p>Her dress has pockets. She has my undying loyalty.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1454393236.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1453859293.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/98597e89246343eb", 
                "categories": [], 
                "title": "Peyton Manning\u2019s son Marshall isn\u2019t quite as commanding a...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/138095382295", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1453859293000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/58c830289ab81d2c97f7dac0397bb125/tumblr_o1hhybxF3V1qh6f21o1_500.jpg\" /><br /><br /><p>Peyton Manning\u2019s son Marshall isn\u2019t quite as commanding a presence at press conferences as Riley Curry. But who is, honestly?<br /></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1453859293.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1453768595.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/65805b29c84147d3", 
                "categories": [], 
                "title": "Alena Dreft Jonas looks exactly as happy as a baby should when...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/138026382570", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1453768595000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/ae0bc0e2d5229acab78562450da0d975/tumblr_o1ioszkWp71qmik36o1_500.jpg\" /><br /><br /><p>Alena Dreft Jonas looks exactly as happy as a baby should when she\u2019s\u00a0about to be pushed unwillingly down a New Jersey hill. Just do it for the Instagram, Alena.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1453768595.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://surisburnbook.tumblr.com/rss", 
                    "htmlUrl": "http://surisburnbook.tumblr.com/", 
                    "title": "Suri's Burn Book"
                }, 
                "updated": 1453253806.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/c7019d60ebdc4ac1", 
                "categories": [], 
                "title": "Violet Affleck is a businesswoman who takes her work seriously,...", 
                "alternate": [
                    {
                        "href": "http://surisburnbook.tumblr.com/post/137629316955", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1453253806000000.0", 
                "content": {
                    "content": "<img src=\"https://78.media.tumblr.com/10e8bd463faf5f82c2f49d81575d52a2/tumblr_o17gez4jPE1ruk3udo1_500.jpg\" /><br /> <br /><img src=\"https://78.media.tumblr.com/4252e6e96536b0fd9a08cd3fab0598c1/tumblr_o17gez4jPE1ruk3udo2_500.jpg\" /><br /> <br /><img src=\"https://78.media.tumblr.com/bfec2c797cbfcd3793151a8e399366d0/tumblr_o17gez4jPE1ruk3udo3_500.jpg\" /><br /> <br /><p>Violet Affleck is a businesswoman who takes her work seriously, even while walking to school. Violet Affleck has kind of perfected the walk-and-email. But Violet Affleck also (still) wears huge socks, mismatched shoes, and at least three different identifiable patterns, so\u2026<br /></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516312770", 
                "published": 1453253806.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://surisburnbook.tumblr.com/", 
        "updated": 1530516312.77051, 
        "id": "feed/http://surisburnbook.tumblr.com/rss", 
        "title": "Suri's Burn Book"
    }, 
    "feed/http://blog.shellen.com/feeds/posts/default": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1330610145.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/03a1cee4f191481e", 
                "categories": [], 
                "title": "Post-erity", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2012/02/post-erity.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1330610100000000.0", 
                "content": {
                    "content": "Tonight while looking for my personal blog post about the sale of Thing Labs to AOL I realized... I never posted it. There it sat in the drafts on Blogger. I must have been a little busy that day. In any case, I just back-dated it and posted it like it was a page ripped from one notebook and Scotch-taped back in where it belonged. All is right with the world.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1330610100.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1302493198.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/decadbda8f2a476a", 
                "categories": [], 
                "title": "Build a new model", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2011/04/build-new-model.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1302492660000000.0", 
                "content": {
                    "content": "<blockquote>You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.</blockquote> - <a href=\"http://en.wikipedia.org/wiki/Buckminster_Fuller\">R. Buckminster Fuller</a>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1302492660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1330609872.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/a5e2fc51a0cc4f0f", 
                "categories": [], 
                "title": "Thing Labs joins AOL", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/09/thing-labs-joins-aol.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1285764360000000.0", 
                "content": {
                    "content": "<p>I'm incredibly happy to share with you today that my company Thing Labs is merging with AOL. Thing Labs has come a long way in the last two years, and we've built products I love and a team I'm proud to work with daily. AOL has recognized this, and we agree that there are a lot of great things we can do together. My collaborator and business partner <a href=\"http://massless.org\">Chris Wetherell</a> and I will be heading up product development for AIM, Lifestream and other consumer products. Don't worry: <a href=\"http://brizzly.com\">Brizzly</a> will live on.  I want to thank those who had a hand in making this deal happen, and my team at Thing Labs for building great products and just generally being great people. For more information about what the future holds, see our post about the merger on <a href=\"http://blog.thinglabs.com/post/1205976398/thing-labs-merging-with-aol\">the Thing Labs blog</a> or check out the <a href=\"http://corp.aol.com/2010/09/28/aol-acquires-social-software-start-up-thing-labs-inc/\">announcement from AOL</a>.</p><b>Coverage</b><br />\n<ul><li><a href=\"http://blog.louisgray.com/2010/09/aol-youve-got-brizzly-and-theyve-got.html\">Louis Gray</a></li>\n<li><a href=\"http://techcrunch.com/2010/09/28/aol-thing-labs/\">Techcrunch</a></li>\n<li><a href=\"http://mashable.com/2010/09/28/aol-thing-labs-brizzly/\">Mashable</a></li>\n<li><a href=\"http://paidcontent.org/article/419-aols-wild-acquisition-day-concludes-with-thing-labs-maker-of-brizzly-/\">PaidContent</a></li>\n<li><a href=\"http://online.wsj.com/article/SB10001424052748703882404575519831320838198.html?mod=WSJ_Tech_LEADTop\">Wall Street Journal</a></li>\n<li><a href=\"http://venturebeat.com/2010/09/28/aol-snaps-up-brizzly-creator-thing-labs-web-video-company-5min/\">Venturebeat</a></li>\n</ul>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1285764360.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1282909547.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/49465c6c8804451e", 
                "categories": [], 
                "title": "We still miss you Mike", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/08/we-still-miss-you-mike.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1282903320000000.0", 
                "content": {
                    "content": "<p><i>Five years ago today, my father-in-law <a href=\"http://blog.shellen.com/2005/08/mike-fitzpatrick-i-love-ya-man.asp\">Michael J. Fitzpatrick</a> passed away suddenly. It was a shock then and sometimes it's still hard to believe he's gone. I was asked to say a few words at his wake and I've hung onto them since and now, here they are. I don't expect anyone outside the family to read all of this, but if you do - he was quite a guy and I wish you could have known him too.</i></p>\n<p>August 2005\n\n<br />In 1991, almost 15 years ago I fell in love with a beautiful young redhead named Allison. Her family attended Saint Joseph's Church and I remain thankful for their faith. It turns out Allison came from a long line of Irish Catholics named Fitzpatrick. I think I met Mr. Fitzpatrick after our second date. He wasn't the typical father of three daughters. There was no shotgun, no stern look, just a handshake and a smile. However, he was still Mr. Fitzpatrick to me. Over the next few weeks as I spent more and more time with Allison, Mike took an interest in me. Where was I going to school? Where did I work? What did I want to do? Who were my parents? Where were they from? Soon it came to light that my mother was from Oakland just like Mike. Not only that but Mike knew of my uncle, Ron Tomsic, who was a famous Stanford and Olympic basketball player during the 50's. Mike grabbed my arm, 'THE Ron Tomsic. Fremont High. Ron Tomsic! Boy, he was something!' I assured him it was one and the same. The connection certainly impressed him and I hadn't done a thing other than being born into basketball friendly genes. I knew I was on the road to becoming family. Over the years, Mike continued to ask about Ron and was excited that he would be attending our wedding a few years later.</p><p>That enthusiasm was a familiar story with Mike. He was a generous man and his success was your success. Not only that but, your success was his success as well! Mike had a win-win situation on his hands on a daily basis. His children all speak of Mike as the champion of the underdog, someone who was always hoping that the local Mom and Pop coffee shop was going to outsell Starbucks. That perhaps - his children should give the kid with the funny hair in science class some slack. Another great example, he was a proud supporter of Saint Mary's College Football. God bless 'em.</p><p>Mike read many biographies and considered himself a student of human nature. He especially loved stories about triumph over adversity. It made him an engaging conversationalist and a very encouraging man to be in the presence of. Mike made me feel like I could accomplish anything. When I told him I was going to join a small business, he was right there with an encouraging word and sage advice. When I talked of selling the business to Google, he wanted every detail. I often drew from that well of enthusiasm and will continue to remind myself that Mike believed in me and helped shape the kind of father & friend I am today.</p><p>There was a rarely a time when I was in the position to help Mike. He was a strong man, a successful man, and I - a young man. There was one time however, when I came to his aid. We were on vacation in Maui. The Fitzpatricks allowed me to tag along the summer after Allison and I graduated from Saint Mary's. Jeannine, Allison, Mike and I drove up the coast past Lahaina to a beautiful protected lagoon to do a little snorkeling. After spending a little time in the water, Allison and Jeannine were looking at green fish thru their masks and I was enjoying the warm water. Mike suddenly, let out a loud, \"Um, JASON. I need a little help.' Mike was stung by a Portugese man-of-war. It had wrapped a tentacle around his left hand around his watch. My lifeguard training kicked in and I removed the tentacles from his watch and helped him in to the shore and quickly got him to the car. A few doses of Benadryl later and Mike was good as new. I don't know that I did much but the Portugese man-of-war quickly turned into a stingray, and then a shark, as the years wore on. He was happy to make me feel like I had saved his life that day in the Hawaiian islands.</p><p>I think my lasting memory of Mike will be of a man that was successful in all matters. He was successful in business, successful in being a loving father and a fantastic grandfather to Miles, Emma and Drew. Even though he was successful by anyone's yardstick he didn't care much for other people's measurements. To Mike the journey was the destination. He took pride in making sure you were along for the ride whether it was a bike ride in Solvang, or a walk down the beach. Life was an adventure and every day was a gift from God.</p><p>Mike, I would love to have another conversation, another bike ride, another concert in the park with you but somehow you were even successful in death, knowing that your big heart was so full of love and pride for your family will leave us with happy memories and life lessons until we meet again. God bless.</p>\n<p>\n<img src=\"http://lh5.ggpht.com/_arQMNg6BEiE/RW84RjxH-ZI/AAAAAAAACUg/D0kfW6Jw7y4/s800/solvang_2002%20036.jpg\" width=\"500\" /><br /> Mike in Solvang, CA in November 2002 during our annual family bike ride</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1282903320.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1273674029.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/11e51c2b4d8b49db", 
                "categories": [], 
                "title": "blog.shellen.com", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/05/blogshellencom.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1273673700000000.0", 
                "content": {
                    "content": "After 10 years of using Blogger to post via FTP to my own server, I'm now using Blogger to post to... well Blogger. I'm going to give it a whirl and see how it goes. If you are reading this then you shouldn't need to change your feed. You are already living in the future. Wheeeee! The very subtle change is that I'm posting to blog.shellen.com instead of just shellen.com now.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1273673700.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1269957632.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/dc1bead341f34fd1", 
                "categories": [], 
                "title": "Charles in charge", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/03/charles-in-charge.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1269956460000000.0", 
                "content": {
                    "content": "<p><a href=\"http://www.flickr.com/photos/shellen/4475755430/\" title=\"Uncle Jason and Charlie by jasonshellen, on Flickr\"><img alt=\"Uncle Jason and Charlie\" height=\"357\" src=\"http://farm5.static.flickr.com/4072/4475755430_05b93408ea.jpg\" width=\"500\" /></a></p>\n<p>Today my youngest brother <a href=\"http://twitter.com/gshellen\">Grant</a> and his wife <a href=\"http://twitter.com/hshellen\">Heather</a> welcomed a beautiful baby boy to the world. Meet Charles Andersen Shellen. You can call him Charlie.  I know this photo isn't my best look but I may have shed a tear or two holding my baby bro's baby.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1269956460.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1267458965.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/c75d19c08f294bca", 
                "categories": [], 
                "title": "February lost", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/02/february-lost.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1267458780000000.0", 
                "content": {
                    "content": "One day I'll tell you the story of February 2010. Not now of course, that would spoil all the fun.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1267458780.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1490166643.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/07a24705aff641ce", 
                "categories": [], 
                "title": "A reminder: the title sets the tone", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/01/reminder-title-sets-tone.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1264496940000000.0", 
                "content": {
                    "content": "<br />\n<br />\nA <a href=\"https://brianhilmers.com/projects/art/\">Brian Hilmers</a> creation</div>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1264496940.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1263450527.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/819e4d8c83bf4766", 
                "categories": [], 
                "title": "Kaiser meet social media", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/01/kaiser-meet-social-media.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1263450180000000.0", 
                "content": {
                    "content": "<p>My medical provider <a href=\"http://kp.org\">Kaiser Permanente</a> just sent an email update on their H1N1 flu vaccine availability with the helpful sounding subject line: <b>H1N1 vaccine now available to all Kaiser Permanente members</b>. Previously, they would only give vaccines to the most high risk groups, mainly based on age. Inside this email was a link to their website and a phone number (1-800-KP-FLU-11) to call to find out where the next flu clinic would be. Let's put aside for a minute that Kaiser has my zip code and could have sent along the location and schedule. However, clicking the link just gave the same phone number. Kaiser it's 2010, you have my location and a website - you could really stand to use your website to <b>disseminate relevant information</b>.</p><p>Moving on, I gave up and called the flu clinic hotline number. After using the voice prompt system (it got my local facility on the second try), it played recorded information from December 7, 2009 that all vaccinations have been centralized at another location and that I would need to call another number! This is getting silly Kaiser. I suggest getting a blog or Twitter account so you could really get information out there. Here's an example of what life looks like in the future:</p>\n<h3>Kaiser members in the Walnut Creek area</h3><p>If you are looking for the Kaiser flu clinic in Walnut Creek, California - you can call the Kaiser Martinez Campus flu hotline at (925.372.1615) however, last night the recording stated:</p>\n<p>As of Monday, January 4th - Seasonal & H1N1 vaccinations are available for all members.\n<ul>\n<li>No appointment is needed, just drop in at the <a href=\"https://members.kaiserpermanente.org/kpweb/facilitydir/facility.do?id=100354&amp;rop=MRN\">Martinez campus</a>\n<li>Available on the 1st floor of the Ensenada Building</li>\n<li>Shots are available Tues, Wed and Thursdays </li>\n<li>between 9 - Noon & between 1:30 until 4:30 pm (or when supplies are depleted)</li>\n<li>Bring your member ID</li>\n<li>Wear a short sleeve shirt</li>\n</ul>\n</p><p>There you go Kaiser and that took me 5 minutes and I don't work for you. You can't swing a stethoscope without hitting a social media consultant who can help, I bet you could start doing this in no time. I'll be waiting, patiently.</p>\n<p><img border=\"0\" src=\"http://www.shellen.com/art/stethoscope-wikimedia-20100113-142024.png\" /><br /><i>\"It only hurts when I breathe in...or out.\"</i></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1263450180.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1262827019.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/476523957e8d45d0", 
                "categories": [], 
                "title": "A small feed related note", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/01/small-feed-related-note.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1262826300000000.0", 
                "content": {
                    "content": "<p>If you are reading this in a feed reader then you are probably subscribed to my Feedburner-ized feed of shellen dot com, which is cool, but as of today I decided to stop blending in my Flickr photos. I still like Flickr, I still take photos <a href=\"http://www.flickr.com/photos/shellen/4249640495/\">like this recent one of my old Sony Sports Walkman</a>, but it's mucking up some other things l've been using like <a href=\"http://friendfeed.com/shellen\">Friendfeed</a> and <a href=\"http://shellen.tumblr.com\">Tumblr</a> with duplicate posts. If you still want to subscribe to my photos you can add this <a href=\"http://api.flickr.com/services/feeds/photos_public.gne?id=34427465855@N01&amp;lang=en-us&amp;format=rss_200\">link to my Flickr stream</a> or <a href=\"http://www.google.com/ig/addtoreader?et=4b44c416fFTGyBsE&amp;source=atgs&amp;feedurl=http://api.flickr.com/services/feeds/photos_public.gne%3Fid%3D34427465855%40N01%26lang%3Den-us%26format%3Drss_20&amp;feedtitle=Uploads+from+jasonshellen&amp;url=http://www.google.com/ig/add%3Fsource%3Datgs%26feedurl%3Dhttp%253A//api.flickr.com/services/feeds/photos_public.gne%253Fid%253D34427465855%40N01%2526lang%253Den-us%2526format%253Drss_20\">use this link if you use Google Reader</a>. Thanks!</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1262826300.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1262794064.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/00ff7033a10f4a8c", 
                "categories": [], 
                "title": "Video-enabled digital SLRs go hip-hop", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/01/video-enabled-digital-slrs-go-hip-hop.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1262793660000000.0", 
                "content": {
                    "content": "<p>I knew that after buying a fancy new camera, the <a href=\"http://www.dpreview.com/reviews/canoneos50d/\">Canon 50D</a>, that Canon would release one with HD video soon. True to form, just a few months after I made my purchase Canon released the <a href=\"http://www.dpreview.com/reviews/canoneos5dmarkii/\">Canon 5D Mark II</a>. I wasn't too sad, after all the camera was $1000 <span style=\"font-style: italic;\">more</span> than the one I had purchased. However, Canon announced another HD video enabled SLR for $1000 <span style=\"font-style: italic;\">under</span> what I had paid for the 50D, the <a href=\"http://www.dpreview.com/reviews/canoneos500d/\">EOS Digital Rebel TSi</a>. As an early technology adopter this is not an uncommon occurrence for me, but I did end up on the unfortunate end of what appears to be a new era in digital photography and video technology. For the record, the Canon 50D is still a <a href=\"http://www.flickr.com/cameras/canon/eos_50d/\">stellar still photo camera</a>, but I see a video SLR swap in the future, perhaps the even newer 7D. Here's the <a href=\"http://www.dpreview.com/reviews/compare_post.asp?method=sidebyside&amp;cameras=canon_eos5dmkii,canon_eos7d,canon_eos50d,canon_eos500d&amp;show=all\">side-by-side comparison on DPReview</a> of all mentioned cameras.</p><p>...</p><p>Soon after the first of the HD video SLR's came out, <a href=\"http://blogs.smugmug.com/don/2008/11/30/first-1080p-video-from-canons-new-5d-mkii-amazing/\">stunning videos</a> began to <a href=\"http://www.usa.canon.com/dlc/controller?act=GetArticleAct&amp;articleID=2326\">surface</a> making full use of the great lenses available to still photographers. You had to wonder when they would make the next leap and see some real world professional usage. Today while watching a <a href=\"http://www.youtube.com/watch?v=JHOh-nHGr6I\">behind the scenes video</a> about the making of the new <a href=\"http://www.vevo.com/watch/young-money/bed-rock/USCMV0900033\">Young Money - Bedrock video</a>, I noticed that this video seems to use almost entirely video SLRs.<br /><a href=\"http://www.youtube.com/watch?v=JHOh-nHGr6I#t=0m12s\"><img src=\"http://www.shellen.com/art/bedrock-slrs-3-20100105-233423.png\" /></a><br />\n<a href=\"http://www.youtube.com/watch?v=JHOh-nHGr6I#t=1m50s\"><img src=\"http://www.shellen.com/art/bedrock-video-slr1-20100105-221249.png\" width=\"450\" /></a><p>As pictured above, video SLRs pop-up all over the video. I would love to find out more about why they were chosen and how well it worked towards the end result. I know it's a hip-hop video and not high art or Avatar, but it marks an interesting milestone in my book in terms of great technology becoming more affordable for aspiring auteurs. Below is the entire behind the scenes video showing the video SLRs in action.<br />\n</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1262793660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1262435077.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/5adac50e628e48f8", 
                "categories": [], 
                "title": "A robin among the persimmons", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2010/01/robin-among-persimmons.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1262435040000000.0", 
                "content": {
                    "content": "<div style=\"text-align: center; margin: 0px auto 10px;\"><a href=\"http://www.shellen.com/uploaded_images/IMG_6812-774947.JPG\"><img alt=\"\" border=\"0\" src=\"http://www.shellen.com/uploaded_images/IMG_6812-774936.JPG\" /></a>&nbsp;</div>\n\nI took this photo outside our house the other day. This photo is also part of a test I'm doing. I uploaded the photo here with Picasa for Mac's BlogThis plug-in but I also uploaded it to <a href=\"http://www.flickr.com/photos/shellen/4235387457/\">Flickr</a> and <a href=\"http://brizzly.com/pic/XFM\">Brizzly</a>. So far, Brizzly is the easiest upload but I suspect that the compression used will make the photo look best on Flickr. I'll keep you posted on the results.<div style=\"clear: both; text-align: CENTER;\"><a href=\"http://picasa.google.com/blogger/\" target=\"ext\"><img align=\"middle\" alt=\"Posted by Picasa\" border=\"0\" src=\"http://photos1.blogger.com/pbp.gif\" /></a></div>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1262435040.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1262356248.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/1ec52b366b4d46d8", 
                "categories": [], 
                "title": "More something or other in 2010", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/12/more-something-or-other-in-2010.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1262355660000000.0", 
                "content": {
                    "content": "Counting this post, I blogged 11 times this year. I couldn't even manage a measly post a month. It wasn't for lack of things going on. I mostly hated the format of my blog and my whole media workflow. Photos on Flickr (and now <a href=\"http://brizzly.com/pic/t/shellen\">Brizzly</a>), status and jokes on Twitter (synced to Facebook), videos on YouTube, everything on Friendfeed, Reader and Tumblr. It's a mess. It's a mess I hope to sort out in 2010 but it's neither here nor there. I did give <a href=\"http://shellen.com\">shellen.com</a> a little makeover so maybe I'll stop hating it so much. A big help along the way, I'm using <a href=\"http://www.typekit.com\">Typekit</a> to give it a fresh new feel. Instead of an empty promise to blog more in 2010 maybe I should just plan to sort out this mess for you, me and everyone. Happy New Year and happy new media!", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1262355660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1493330875.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/ac8c08a60b014947", 
                "categories": [], 
                "title": "My 11-year old self would die", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/09/my-11-year-old-self-would-die.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1254400440000000.0", 
                "content": {
                    "content": "Last week I had a <a alt=\"http://brizzly.com/pic/5AQ\" href=\"https://goo.gl/photos/CEXXGga8k4cyuKpt6\">little misunderstanding</a> with <a href=\"http://www.techcrunch.com/2009/09/23/mallory-from-family-ties-could-be-a-harbinger-of-whats-to-come-with-twitter-retweets/\">Justine Bateman</a>. Today, <a href=\"http://twitter.com/Alyssa_Milano/\">Alyssa Milano</a> gave out <a href=\"http://twitter.com/Alyssa_Milano/status/4508817635\">invites to Brizzly</a> to her followers on Twitter. Life is getting more surreal by the day. I'm angling for some sort of slap fight with Nicole Eggert next week.", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1254400440.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1251816713.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/3d5ef4b4b9504f4c", 
                "categories": [], 
                "title": "Happy 10th birthday Blogger", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/08/happy-10th-birthday-blogger.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1251816660000000.0", 
                "content": {
                    "content": "<p><img src=\"http://lh5.ggpht.com/_arQMNg6BEiE/SpzCxawnRQI/AAAAAAAAXlA/ZWemCstsBhE/s400/IMG_6477.JPG\" />\n<br /><small>photo: Jason Shellen</small>\n</p>\n<p>Many happy returns. I'm glad you came along when you did. My life wouldn't have been the same without you. Thanks to <a href=\"http://www.evhead.com\">Ev</a>, <a href=\"http://www.megnut.com\">Meg</a>, <a href=\"http://www.onfocus.com\">Paul</a>, <a href=\"http://www.haughey.com\">Matt</a> and <a href=\"http://www.powazek.com\">Derek</a> for dreaming up such a fun playground for me personally and professionally. Thanks to those who helped power the <b>[b]</b> during the hard times and for those keeping it real over at Google. You know who you are. </p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1251816660.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1247293576.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/9c8e610504ff4436", 
                "categories": [], 
                "title": "Brizzly: Coming soon from Thing Labs", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/07/brizzly-coming-soon-from-thing-labs.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1247292000000000.0", 
                "content": {
                    "content": "<p><a href=\"http://www.brizzly.com\"><img border=\"0\" src=\"http://www.shellen.com/art/brizzly-shellen.png\" title=\"Brizzly\" /></a></p><p>A few hours ago I gave a preview of the web app that we have been working on at <a href=\"http://www.thinglabs.com\">Thing Labs</a>. It's called <a href=\"http://www.brizzly.com\">Brizzly</a> and it's a fun, new way to use Twitter. Brizzly lets you do all the things you love on Twitter plus a bit more. We are still working on it and most notably the user interface isn't final, but <a href=\"http://www.techcrunch.com/2009/07/10/brizzly-a-twitter-reader-from-the-people-who-brought-you-google-reader/\">Techcrunch wrote up a little piece about Brizzly</a> and *cringe* has a video of my demo (which I haven't watched). The team at Thing Labs has been working really hard to get it ready for use, but the conference came up a little before we were ready to release to the world. Never fear, go to <a href=\"http://www.brizzly.com\">Brizzly.com</a> and enter your info if you would like an invite and we'll send you one when we are ready. Also, how cute is the bear wearing a bird suit (if I don't say so myself)?</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1247292000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1243863239.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/8d040a329bb6462c", 
                "categories": [], 
                "title": "Plinky in today's New York Times Magazine", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/05/plinky-in-todays-new-york-times.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1243862400000000.0", 
                "content": {
                    "content": "<p><a href=\"http://www.nytimes.com/2009/05/31/magazine/31wwln-consumed-t.html?_r=1\"><img alt=\"\" border=\"0\" src=\"http://1.bp.blogspot.com/_6j8JmS-344I/SiB1QajpFTI/AAAAAAAAKeU/Gynt4AuH1Tg/s400/nyt-magazine-plinky-20090529-152832.jpg\" style=\"display: block; margin: 0px auto 10px; text-align: center; cursor: pointer; cursor: hand; width: 400px; height: 230px;\" /></a><br /><small>Illustration by Peter Arkle</small></p>\n<p>I had the pleasure of being quoted in the NYT Magazine today in an <a href=\"http://www.nytimes.com/2009/05/31/magazine/31wwln-consumed-t.html?_r=1\">article about Plinky</a>. The article speaks for itself and I thought <a href=\"http://www.murketing.com\">Rob Walker</a> did a nice job. One thing I've been meaning to write about more is what's coming next for Plinky. The article touches on this:</p><blockquote>\"Shellen says his company has more projects in the works that are \u201ccentered on conversation\u201d but for the moment has been learning more about what sorts of prompts are effective.\"</blockquote><p>More on this soon, I promise.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1243862400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1238836465.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/02426d27a2444af8", 
                "categories": [], 
                "title": "Biz Stone on the Colbert Report!", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/04/biz-stone-on-colbert-report.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1238836380000000.0", 
                "content": {
                    "content": "<p>Last night my old friend <a href=\"http://www.twitter.com/biz\">Biz Stone</a> appeared on the <a href=\"http://www.colbertnation.com/the-colbert-report-videos/223487/april-02-2009/biz-stone\">Stephen Colbert Show on Comedy Central</a>. I'm stoked for Biz and the whole Twitter team. Their mainstream media mentions and appearances don't seem to be slowing down. Evan Williams was on <a href=\"http://video.google.com/videoplay?docid=2209695345825335173&amp;hl=en\">Charlie Rose</a> and they were profiled <a href=\"http://www.youtube.com/watch?v=nfnoWk3x2RU\">on Nightline</a>. If you didn't catch Colbert live last night you can see the full clip embedded below.</p><p>I've been friends with Biz for a while now but we not met in real life back in 2001. However, that didn't stop us from <a href=\"http://www.shellen.com/2001/10/enemy-mine-while-i-have-never-met-biz.asp\">becoming arch-nemeses</a>, cordially of course. All the same time, I really wasn't too sure about a guy who referred to himself as \"genius\" and his <a href=\"http://www.bizstone.com/2001/10/it-seems-as-though-i-may-have-to.html\">smart aleck</a> style of writing wasn't helping things. In 2003 when we finally met at a blogging conference I found out that he is actually one of the nicest guys around. We had to end our pretend feud. We were able to hire him onto the Blogger team at Google in October 2003 which Biz of course wrote up jokingly as an <a href=\"http://www.bizstone.com/2003/10/google-acquires-genius-labs.html\">acquisition of Genius Labs</a>. After spending years working with Biz I can't help but read anything he writes in classic Biz Stone-style. I'm glad the rest of America gets a glimpse into the kind of fun Biz brings to any project.</p><br />Clip courtesy of <a href=\"http://www.comedycentral.com/colbertreport/full-episodes\">Comedy Central</a>.</p><p>While we are getting truthy, a minor correction to a <a href=\"http://www.techcrunch.com/2009/04/02/sources-google-in-late-stage-talks-to-buy-twitter/\">Techcrunch post</a> about a rumored sale of Twitter to Google. Michael Arrington writes:</p>\n<blockquote>...it\u2019s a brilliant deal for Google - the value of Twitter is only going to go up over time. And it will be Twitter founders Evan Williams and Biz Stone\u2019s second sale to Google - they sold Blogger to them just five years ago.</blockquote><p>It's would be Ev's second sale (if it were true) however, as mentioned above, Biz was brought on in late 2003 and wasn't part of the <a href=\"http://evhead.com/2003/02/bloogleplications.asp\">Ev, Steve, Rudy, Jason, Jason and Jason team</a>. It is interesting to note that one Jason, Rudy and Steve are at Twitter though. Go (old) team!</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1238836380.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1245757201.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/a175141c2d374a8c", 
                "categories": [], 
                "title": "A little free product development advice", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/04/little-free-product-development-advice.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1238598000000000.0", 
                "content": {
                    "content": "<p>As a former Google product manager and current entrepreneur, people often email me to ask for advice in a number of areas. One of the recurring variants is a request that goes something like this:<br /><br />\"<span style=\"font-style: italic;\">I have an idea for a site or service. It's going to be bigger than the disco ball! I don't really know how this technology stuff works but maybe I could tell you my idea?</span>\" What comes next is usually a variation of \"<span style=\"font-style: italic;\">...and then you could help me build it, sell it, promote it, show me how it's done or something else?</span>\"<br /><br />Still other email are from small start-up founders who want to know what the secret trick is to building a great product or to take a look at their new creations.<br /><br />First of all, it's flattering that people like the products I've helped build enough to seek me out. As a busy CEO of a venture-backed start-up I unfortunately don't always have a lot of spare time to dig in and help out, so here are a few of my fundamental thoughts on entrepreneurship, building products and how I can help.<br /><br /><span class=\"Apple-style-span\" style=\"font-weight: bold;\">I'm not a technical person</span><br /><br />Surprise, neither am I. In fact, I've never taken a single Computer Science or Business Administration class. I received a BA in Fine Arts from a small liberal arts college. I thought I was going to go on to Cal Arts to study animation and work for Disney or Pixar, but the web came along and my plans changed. To this day, I'm at my best when I am behind the drivers seat in Photoshop or Illustrator sketching out new product ideas or at the whiteboard designing rough sketches of future web applications. As long as you can communicate with technical people, you'll be in fine shape.<br /><br /><span class=\"Apple-style-span\" style=\"font-weight: bold;\">Execution is underrated</span><br /><br />I have a belief that ideas come down to execution. Great ideas are a dime a dozen but in the end the one's that emerge successful are the one's that have persevered and made something special.<br /><br />The same idea in the hands of different people have many different outcomes. For example: for every Google there are 50 search companies that ended disastrously. Google executed well and refined and refined a core idea that wasn't necessarily unique. Some ideas when executed well take off and others fail to capture the imagination.<br /><br /><span style=\"font-weight: bold;\">If you think it's interesting, make a demo</span><br style=\"font-weight: bold;\" /><br />If someone came to me and said, \"Here's my great idea, but I want to<br />be paid for it if it's good.\" I would probably shoo them away -<br />implement your idea, even as a simple demo you have 10x more<br />likelihood of being taken seriously. Venture capital or even angel money is rarely given to people who don't have a working demo. Product managers and engineers at top software companies usually need a demo to continue development and receive support from their superiors. If you can't code, make friends.<br /><br /><span style=\"font-weight: bold;\">Version: Perfect</span><br /><br />No one ships something perfect right out the gate. If you are doing it right, there is a good chance you will throw away most of the code every 6 - 18 months. Hell, sometimes you'll throw away the first product. Premature optimization is usually the main stumbling block of any small team. Go fast and learn from mistakes.<br /><br /><span style=\"font-weight: bold;\">The competition</span><br /><br />Aim high. Don't think of your competition as the other guys in a garage, aim at someone who doesn't know you are coming and potentially someone who wouldn't see it coming until it's too late. Don't worry about the other guys doing similar things unless they are doing 100% the same thing. Have a long term vision and imagine what wild success would look like if your service or product takes off.<br /><br /><span style=\"font-weight: bold;\">You are what you read</span><br /><br />If you aren't already reading <a href=\"http://www.paulgraham.com/\">Paul Graham</a> or <a href=\"http://www.joelonsoftware.com/\">Joel on Software</a> then I highly recommend subscribing. Paul works with many start-ups and Joel is an old hand at software development. You are not creating a product in a vacuum, many other people have been down this path, learn from the masters of the craft. Half (or more) of my pearls of wisdom here are borrowed, stolen or filtered from what I've read somewhere else. Entrepreneurship-by-osmosis has served me well. If you are looking for more folks to read, my <a href=\"http://www.google.com/reader/shared/user%2F10963671381103576324%2Flabel%2Ffounders\">Founders list</a> from Google Reader has some eclectic folks who might get you motivated. Get reading!<br /><br style=\"font-weight: bold;\" /><span style=\"font-weight: bold;\">Good to great</span><br /><br />If you are a good engineer but think you need to acquire product management or business skills for your new idea to succeed, I might offer a few suggestions. I think you probably have a better chance of becoming great at something you already do than adequate at something you don't currently do. I'm not saying you shouldn't have a familiarity with many different aspects of building products, but experience has taught me that going from good to great is more rewarding.<br /><br /><span style=\"font-weight: bold;\">Secrets</span><br style=\"font-weight: bold;\" /><br />Keep your idea a secret if you want, but most good ideas usually have my friends and family members scratching their heads about why I would want to build such a thing in the first place. Your idea will take far more than a slip of the tongue to kill it than someone overhearing it. Be careful of overly valuing secrecy.<br /><br /><span style=\"font-weight: bold;\">How can I help</span><br /><br />I probably can't help you if you send over an email that says \"Do you want to hear my idea?\" I don't have a single friend who doesn't love to hear a good idea. Will I keep your idea a secret? Sure, but as I've said before the idea isn't necessarily the interesting part, it's what you do with it. If I haven't dissuaded you, my email address is jason at shellen.com.<br /><br />All this free advice is worth exactly what you paid for it, but it's served me well over the past few years and might help you too. It's grounded in observations,\u00a0 my own successes, spectacular failures, and even things I'm still learning on a daily basis. Now go make something great (that real people want to use too)!</p><!-- img src=\"http://www.drafty.com/proxy/stats?id=90\" style=\"border: 0; width: 1px; height: 1px;\" / -->", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1238598000.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1234446463.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/4a0df6109e0d4069", 
                "categories": [], 
                "title": "The doctor ordered \"Back to the Future II\" and bedrest", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/02/doctor-ordered-to-future-ii-and-bedrest.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1234445640000000.0", 
                "content": {
                    "content": "<p>I've been sick with a cold. Not any cold, but some super human cold to end all colds. I'm finally feeling better and I've ingested my share of ibuprofen, Sudafed, codeine cough syrup, Tylenol PM, pho, hot tea, home-made soup (thanks Allie), but mostly a bunch of movies. My eyes have been hurting so a lot of the time I just listened to the movies.</p><p>Since last Friday I've re-watched (or listened to): Mission Impossible 3, Wedding Crashers, Singles, Batman Begins and watched for the first time: Hitch, Step Brothers, Indiana Jones and the Kingdom of the Crystal Skull, and Nick and Nora's Infinite Playlist. The re-watches were all good to great, the first timers - almost every last one of them horrible. I've learned that when you are sick, go with what you know.</p><p>Sequels in general make for great movie watching when you are sick, because plot details don't matter as much and the fact that it's not as good as the original won't matter as much. Plus you have probably already seen it a few times so you can doze off for periods of time and the story still makes sense.</p><p><a href=\"http://www.amazon.com/gp/search?ie=UTF8&amp;keywords=Back+to+the+Future+2&amp;tag=plinky09-20&amp;search-alias=dvd\" title=\"Grab this movie from Amazon\"><img align=\"left\" alt=\"\" src=\"http://ecx.images-amazon.com/images/I/51ZHI6dGLCL._SS250_.jpg\" /></a>I recommend Back to the Future II or BTTF II as we true fans call it. It's not as good as the first but definitely better than the old West flying train piece of junk that came out after it. Lot's of Biff getting his just desserts and Marty's girlfriend gets upgraded from nameless actress to Elisabeth Shue between BTTF 1 and 2. Not bad! Other things to love about this one mainly appear in the future, Nike self-lacing shoes, Mattel Hover Boards, hover cars, 3-D advertising and a fax machine in every room of the home.</p><p>For my money what's better than a movie about the future when being sick essentially puts you in a wormhole to next week anyway.</p><p>Try to avoid tense movies like MI3 or The Dark Night, I learned my lesson the hard way. Other recommended sequels would include: Empire Strikes Back or Return of the Jedi.</p>\n<p>Roads? Where you're going you don't need roads... Motrin maybe but no roads.</p><p class=\"plinky_badge_rid:2759\" style=\"clear: both; margin: 0; padding: 0; margin-top: 10px; font-size: 13px; font-family: Georgia; line-height: 24px;\">  <a href=\"http://www.plinky.com/mini/reroute/2759\"><img src=\"http://www.plinky.com/proxy/badge?id=2759\" style=\"border: 0; padding-right: 4px; vertical-align: middle;\" /></a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1234445640.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1233707481.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/2cf828fb8d4848ad", 
                "categories": [], 
                "title": "America needs Jon Stewart", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/02/america-needs-jon-stewart.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1233707460000000.0", 
                "content": {
                    "content": "<p>President Obama has had his chance at picking a Cabinet and he's done a fine job so far. It's hard to pick from a crop of only real human beings so any fictitious characters are noted with an asterisk, but that doesn't mean they wouldn't be great.</p><br /><p><strong>Jon Stewart</strong><br />Secretary of State\n\nNow maybe this one is too easy, but he does have a great sense of what's askew in America and could deliver bad news with a humorous delivery. Also his Bush impression kills me.</p><br /><p><strong>Clair Huxtable*</strong><br />Attorney General\n\nYou remember Clair? She was the Mom on The Cosby Show but she was also a whip smart lawyer. Do you think she would let any of this crazy &quot;Is it torture? It's not torture&quot; stuff slide? Would there be any doubt that she would get to the bottom of who leaked an American spies name to the press?  When Theo and Walter decide to listen to a recording of &quot;Macbeth&quot; instead of reading the book, who would set them straight? Clair Huxtable that's who.</p><br /><p><strong>Gavin Newsom</strong><br />Secretary of Looking Fabulous\n\nCurrently Mayor of SF but that head of hair is too good to waste on one city. If there were any younger Kennedy men around that wanted anything to do with politics then Gavin might have competition. This does require creating a Department of Looking Fabulous, but with the success of all these make-over shows - I think America could get behind it. </p><br /><p><strong>Tina Fey</strong><br />Chief of Staff\n\nSmart, known for keeping her co-workers productive and funny. Is there anything she can't do? I think she would also be motivated to make sure she never needs to resurrect the Palin impersonation.</p><br /><p><strong>Iron Man / Tony Stark *</strong><br />Secretary of Defense.\n\nTechnically I don't think the Iron Man suit would fit into a Hermann Miller chair in the briefing room. Of course this is America and we could probably get a government contractor to whip something up to the tune of $500K that would work for Tony/IronMan to use while be-suited. On second thought, let's just make him stand at meetings.</p><br /><p class=\"plinky_badge_rid:1941\" style=\"clear: both; margin: 0; padding: 0; margin-top: 10px; font-size: 13px; font-family: Georgia; line-height: 24px;\">  <a href=\"http://www.plinky.com/mini/reroute/1941\">    <img src=\"http://www.plinky.com/proxy/badge?id=1941\" style=\"border: 0; padding-right: 4px; vertical-align: middle;\" />  </a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1233707460.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1232763615.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/05c37ca247d44ff6", 
                "categories": [], 
                "title": "My hip-hop posse would include Zach Galifianakis", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/01/my-hip-hop-posse-would-include-zach.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1232763600000000.0", 
                "content": {
                    "content": "<p>My sons Drew and Miles and Allison are my real posse but if I were a famous rapper with loads of spare time to terrorize restaurants and act badly at retail clothing stores this would be the crew to hit the town with.</p><br /><p><strong>Zach Galifianakis</strong><br />Every posse needs someone making the boss laugh. Have you seen the Kanye West video for &quot;<a href=\"http://www.youtube.com/watch?v=2x0TumWdlhk\" rel=\"nofollow\">Can't Tell Me Nothing?</a>&quot; with Zach? The guy is all hip hop.</p><br /><p><strong>Mike &quot;Money&quot; Brandt</strong><br />Aside from every crew needing a &quot;Mike&quot; (get one if you don't have one), he's got mad b-boy skillz from the early 90's. An old friend from back in the day on the mean streets of Fremont, CA. Former-basketball player, perfect for all occasions.</p><br /><p><strong>Taylor &quot;Lil Bro&quot; Shellen</strong><br />Isn't there some sort of law that every posse needs a least one sibling? Plus Taylor is in better shape than I and could escort haters to the door. I think anything past 3 in a posse starts to get weird so I think that's the list.</p><br /><p><strong></strong><br /></p><br /><p class=\"plinky_badge_rid:499\" style=\"clear: both; margin: 0; padding: 0; margin-top: 10px; font-size: 13px; font-family: Georgia; line-height: 24px;\">  <a href=\"http://www.plinky.com/mini/reroute/499\">    <img src=\"http://www.plinky.com/proxy/badge?id=499\" style=\"border: 0; padding-right: 4px; vertical-align: middle;\" />  </a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1232763600.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1232720594.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/23c510237c0f4f3f", 
                "categories": [], 
                "title": "Plinky is live!", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/01/plinky-is-live.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1232720280000000.0", 
                "content": {
                    "content": "<p>It feels like I've been up for about a week straight but we launched <a href=\"http://www.plinky.com\">Plinky</a> today. Much more on that tomorrow for now, go and give it a spin!</p>\n<a href=\"http://www.plinky.com\"><img border=\"0\" src=\"http://www.shellen.com/art/plinky_logo_400px-20090122-222124.png\" /></a>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1232720280.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1231482630.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/733bb9c5a6dd43c6", 
                "categories": [], 
                "title": "Well I wouldn't say I \"missed\" work", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2009/01/well-i-wouldnt-say-i-missed-work.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1231482600000000.0", 
                "content": {
                    "content": "<p>I'm featured in an article on CNN today called: <a href=\"http://www.cnn.com/2009/LIVING/worklife/01/08/jumping.ship/index.html\">They left the corporate cocoon to blossom</a>. The article is about people like <a href=\"http://www.ninebyblue.com/blog/\">Vanessa Fox</a> and I who left cushy gigs at big companies to strike out on our own. Highly recommended reading *ahem*.</p><p>A couple points of clarification about the article:\n<ul><li>CNN must have some sort of editorial policy against outbound links, you can sign up to be notified of our pending launch at <a href=\"http://www.plinky.com\">Plinky.com</a></li>\n<li>The article states that I was \"complacent\" at Google. I would probably use the word \"restless\".</li>\n<li>Start-up life isn't for everyone and I certainly wouldn't advise foolishly quitting a perfectly good job because it was my preference to do so. This downturn isn't going to be easy on anyone, least of all small businesses.</li>\n<li>That said, it does feel a lot more like you are living your own life when you have a hand in your own fate. Don't let the economy keep a good idea down. I feel a flurry of motivational quips coming on: \"Where there is a will there's a way\", \"Just do it\", \"If you like it then you shoulda put a ring on it\". The last one snuck in there and might not apply.</li>\n</ul></p><p>For all of you who have been waiting for Plinky... it's just around the corner. More on that soon.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1231482600.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://blog.shellen.com/feeds/posts/default", 
                    "htmlUrl": "http://blog.shellen.com/", 
                    "title": "SHELLEN"
                }, 
                "updated": 1230613937.0, 
                "author": "Jason", 
                "id": "tag:google.com,2005:reader/item/2098aa2a638c4f03", 
                "categories": [], 
                "title": "A simple theory", 
                "alternate": [
                    {
                        "href": "http://blog.shellen.com/2008/12/simple-theory.asp", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1230613860000000.0", 
                "content": {
                    "content": "<p>Ivor Tossell's interesting theory on the differences between Facebook and Twitter in <a href=\"http://www.theglobeandmail.com/servlet/story/RTGAM.20081225.wwebtossell1226/BNStory/Technology/home\">The Globe and Mail</a>:</p>\n<blockquote>\"Facebook is about people you used to know; Twitter is about people you'd like to know better.\"</blockquote><p>This seems to hold true in my experience, how about you?</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315948", 
                "published": 1230613860.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://blog.shellen.com/", 
        "updated": 1530516315.948108, 
        "id": "feed/http://blog.shellen.com/feeds/posts/default", 
        "title": "SHELLEN"
    }, 
    "feed/http://beerlabelsinmotion.tumblr.com/rss": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1529559995.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/1f4f37b1736a40ab", 
                "categories": [], 
                "title": "Ghost in the Machine is brewed by @parishbrewingco. Photo credit...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/175086880978", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1529559995000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BkQxKOnlprY/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-06-20T21:45:57+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Jun 20, 2018 at 2:45pm PDT</time></p></div></blockquote>\n<br /><br /><p>Ghost in the Machine is brewed by @parishbrewingco. Photo credit to @thealerunner for his excellent photo of the glass and bottle because this beer isn\u2019t distributed to Boston. This has been a highly requested label over the years, I can\u2019t wait to try the beer soon. Summer of Ghost\u2026 here I come!<br />\n\u2022<br />\nCheck out Brenton\u2019s blog at TheAleRunner.com where he writes about craft beer in South Louisiana.<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #ghostinthemachine #thealerunner #ipa #Louisianacraftbeer #Louisiana #doubleipa</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1529559995.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1528452523.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/ce3d0a5e39ec4989", 
                "categories": [], 
                "title": "I\u2019ll never forget my first Arrogant Bastard Ale\u2026 The...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/174679401078", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1528452523000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bjvu9QKllyE/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-06-08T02:07:47+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Jun 7, 2018 at 7:07pm PDT</time></p></div></blockquote>\n<br /><br /><p>I\u2019ll never forget my first Arrogant Bastard Ale\u2026 The bottle said I wouldn\u2019t like it, that I\u2019d be too scared to try it and suggested that I turn back to fizzy yellow beer before it was too late. Boy, were they wrong!\ud83c\udf7b\ud83d\ude08@ArrogantBastard<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #stonebrewing #ArrogantBastard #notworthy</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1528452523.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1527915785.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/ce0b14aff74e43b3", 
                "categories": [], 
                "title": "I\u2019ll be riding into summer like a lizard on a longboard! Birch...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/174477244188", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1527915785000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bjfwy1wlPYR/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-06-01T21:02:44+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Jun 1, 2018 at 2:02pm PDT</time></p></div></blockquote>\n<br /><br /><p>I\u2019ll be riding into summer like a lizard on a longboard! Birch Ave Blonde is brewed by @fossilcovebrew<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #fossilcovebrewery #birchaveblonde #longboard #lizard #summer #animation</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1527915785.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1524715644.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/4cdd090ff4664a05", 
                "categories": [], 
                "title": "Happy World Penguin Day! Pipsqueak Penguin is a pale ale brewed...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/173300895558", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1524715644000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BiAZbY8F9Zs/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-04-25T20:07:04+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Apr 25, 2018 at 1:07pm PDT</time></p></div></blockquote>\n<br /><br /><p>Happy World Penguin Day! Pipsqueak Penguin is a pale ale brewed by @trilliumbrewing and is part of their Small Bird Series. \ud83d\udc27 \ud83c\udf7b<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #trillium #penguin #pipsqueakpenguin #paleale #smallbirdseries #worldpenguinday #worldpenguinday2018</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1524715644.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1524295780.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/f417d400e20d43e2", 
                "categories": [], 
                "title": "Happy 4/20! Look what I found! This dank @lagunitasbeer only...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/173141086708", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1524295780000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bhz4qcbFSfE/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-04-20T23:29:17+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Apr 20, 2018 at 4:29pm PDT</time></p></div></blockquote>\n<br /><br /><p>Happy 4/20! Look what I found! This dank @lagunitasbeer only shows up once a year to celebrate 4/20 and it really is the \u201cDankest and Hoppiest Beer\u201d brewed by Lagunitas. Smoke \u2018em if you got 'em and go find this beer before it\u2019s gone forever! #repost but still good!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #DIPA #lagunitas #California #craftnotcrap #IPA #lagunitasbeer #66impala #thewaldos #pointreyes #420 #420holidaze #waldosspecialale #cabeer</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1524295780.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1524200544.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/cd3e94c8a5454ffa", 
                "categories": [], 
                "title": "Time for #throwbackthursday ! Who remembers this beer? This is...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/173105594438", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1524200544000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BhxCTwcFsk0/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-04-19T21:01:58+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Apr 19, 2018 at 2:01pm PDT</time></p></div></blockquote>\n<br /><br /><p>Time for #throwbackthursday ! Who remembers this beer? This is one of my first animations I ever made but I never shared it on Instagram. Bitter American is no longer brewed by @21stamendment but was replaced with the new session ale, Down To Earth, which you can find animated on my page. The monkey is safe \u2019n sound!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #21stamendment #bitteramerican #monkey #chimp #space #astronaut #sessionale #sessionbeer #bitteramerican #downtoearth</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1524200544.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1522819849.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/316b070d2f0b48b1", 
                "categories": [], 
                "title": "Pink Boots is a collaboration brew between @exhibitabrewing and...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/172566543733", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1522819849000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BhH5VhklfPk/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-04-03T21:30:10+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Apr 3, 2018 at 2:30pm PDT</time></p></div></blockquote>\n<br /><br /><p>Pink Boots is a collaboration brew between @exhibitabrewing and @pinkbootssociety in honor of International Women\u2019s Day #PBB2018 <br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #exhibitabrewing #internationalwomansday #pinkbootssociety @valleymalt #collaboration #beer #craftbeer #hoppywheatbeer</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1522819849.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1522314078.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/0334dd7e586e42f7", 
                "categories": [], 
                "title": "I collaborated with the talented @thecraftdiaries to create this...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/172361162798", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1522314078000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bg40jnVlNSD/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-03-29T01:01:12+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Mar 28, 2018 at 6:01pm PDT</time></p></div></blockquote>\n<br /><br /><p>I collaborated with the talented @thecraftdiaries to create this fun monster animation for something a bit different. Originally \u2018Monster Mash Brewery\u2019, Aftermath Double IPA is brewed by @kaijubeer. Be sure to follow @thecraftdiaries, his artwork is amazing!!! When I stumbled across his account, I thought, \u201cthis is so well executed, I haven\u2019t seen anything like this in a beer blog before.\u201d His illustrations playfully bring beer labels to life outside of their bottles and cans and into the \u201creal\u201d world. <br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #kaijubeer #beeroftheday #thecraftdiaries</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1522314078.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1520581491.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/3e0e0717692447d6", 
                "categories": [], 
                "title": "Tartastic Raspberry Lime Ale is brewed by @newbelgium and...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/171673636148", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1520581491000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BgFMQYsnvcD/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-03-08T23:44:44+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Mar 8, 2018 at 3:44pm PST</time></p></div></blockquote>\n<br /><br /><p>Tartastic Raspberry Lime Ale is brewed by @newbelgium and features raspberry and lime purees for a delicious sweet-tart sip.<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #newbelgium #raspberrylimeale #tartastic #employeeownedbeer #force4good</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1520581491.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1520417343.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/b80057dfcc114d3b", 
                "categories": [], 
                "title": "Hop Bullet is a new spring seasonal IPA brewed by @sierranevada....", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/171609534493", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1520417343000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BgATJdiFXN8/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-03-07T02:08:57+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Mar 6, 2018 at 6:08pm PST</time></p></div></blockquote>\n<br /><br /><p>Hop Bullet is a new spring seasonal IPA brewed by @sierranevada. This brew is a double-barreled blast of Magnum hops and lupulin dust that highlights the West Coast hop style.<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #sierranevada #hopbullet #doubleipa</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1520417343.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1519196516.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/c8773cad77e24e82", 
                "categories": [], 
                "title": "Rupture IPA is brewed by @odellbrewing in Colorado. The can...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/171105805458", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1519196516000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bfb6l1PFVsQ/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2018-02-20T23:01:22+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Feb 20, 2018 at 3:01pm PST</time></p></div></blockquote>\n<br /><br /><p>Rupture IPA is brewed by @odellbrewing in Colorado. The can design is inspired by the machine that grinds up the whole hops to \u201crupture\u201d the lupulin, giving this beer a really hop forward and bright citrusy flavor.<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #odell #rupture #IPA #colorado #odellbrewing</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1519196516.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1514776040.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/7b79b170cfe84034", 
                "categories": [], 
                "title": "My best liked posts from 2017. Thank you everyone for a great...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/169157824838", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1514776040000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BdYLQN4lqA6/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-12-31T19:07:11+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Dec 31, 2017 at 11:07am PST</time></p></div></blockquote>\n<br /><br /><p>My best liked posts from 2017. Thank you everyone for a great year! Here\u2019s to plenty more animations in 2018! \ud83c\udf7b </p>\n\n<p>@sierranevada @brownsbrewingco @butternutsbeer @rarbrew @sevenstills @warhorsebrewing @breweryommegang </p>\n\n<p>\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #2017bestnine #best2017 #sierranevada #brownsbrewingco #butternutsbeer #rarbrew #sevenstills #warhorsebrewing #breweryommegang</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1514776040.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1514423389.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/245ea8e00c6f4482", 
                "categories": [], 
                "title": "Hey - do you also do wine labels? -Steph Prange @ Naked Winery", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/169003437443", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1514423389000000.0", 
                "content": {
                    "content": "<p>I\u2019ve never done a wine label but I\u2019ve done Spirit labels before. Nothing is stopping me other than I usually don\u2019t drink wine or spirits</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1514423389.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1513916180.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/d3ccb441c97f41ce", 
                "categories": [], 
                "title": "Merry Christmas! Santa\u2019s Private Reserve is a Belgian Dark Ale...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/168795338278", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1513916180000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bc-ikyCFjO-/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-12-21T20:14:38+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Dec 21, 2017 at 12:14pm PST</time></p></div></blockquote>\n<br /><br /><p>Merry Christmas! Santa\u2019s Private Reserve is a Belgian Dark Ale with cherries & raspberries brew by @rogueales. I\u2019m not usually a fan of belgian dark ales but the cherries and raspberries in this was really damn good. The label description reads, \u201cdedicated to the those on the naughty list\u201d and if that\u2019s the case\u2026 then I don\u2019t want to be good!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #santasreserve #belgiandarkale #christmas</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1513916180.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1513759607.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/a5c2a29e45e94f14", 
                "categories": [], 
                "title": "Groomer is a\u00a0M\u00e4rzen brewed by the oldest microbrewery operating...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/168733180898", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1513759607000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bc54b_0F6kj/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-12-20T00:45:51+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Dec 19, 2017 at 4:45pm PST</time></p></div></blockquote>\n<br /><br /><p>Groomer is a\u00a0M\u00e4rzen brewed by the oldest microbrewery operating in Montana, @bayernbrewing. This was a simple beer but it had a great subtle roasty note to the end of each sip that made it stand out.<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #skiing #groomer #mountain #germany #winter #bavarian</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1513759607.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1511593065.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/3aa992aef8304b40", 
                "categories": [], 
                "title": "Happy Thanksgiving! 1620 is a New England Style IPA brewed by...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/167847851893", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1511593065000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Bb5UGe6l202/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-11-24T22:57:22+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Nov 24, 2017 at 2:57pm PST</time></p></div></blockquote>\n<br /><br /><p>Happy Thanksgiving! 1620 is a New England Style IPA brewed by @ipswichalebrew in Massachusetts. The Pilgrims landed the Mayflower in 1620 at Plymouth Harbor and it\u2019s a shame they didn\u2019t have this beer to celebrate with\u2026. but I\u2019m guessing arriving safe from England was probably good enough for them! #oldworldproblems<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #1620 #pilgrims #mayflower #thanksgiving #massachusetts #ipswichale</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1511593065.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1510900637.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/f7afb0039b114b43", 
                "categories": [], 
                "title": "Gnomegeddon is a blonde ale brewed by @breweryommegang in...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/167567589628", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1510900637000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BbkrRRSFPiC/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-11-16T22:36:33+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Nov 16, 2017 at 2:36pm PST</time></p></div></blockquote>\n<br /><br /><p>Gnomegeddon is a blonde ale brewed by @breweryommegang in Cooperstown, NY. The second fermentation with brettanomyces gives this beer that classic barnyard funk. <br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #gnomegeddon #gnome #drstrangelove #ommegang</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1510900637.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1509502636.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/0fffb1179b7d47c2", 
                "categories": [], 
                "title": "Happy Halloween! \ud83d\udc7b \ud83c\udf83 Get hoppy with these spooky skeleton...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/166987354538", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1509502636000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/Ba7A1jAFl8d/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-10-31T18:16:39+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Oct 31, 2017 at 11:16am PDT</time></p></div></blockquote>\n<br /><br /><p>Happy Halloween! \ud83d\udc7b \ud83c\udf83 Get hoppy with these spooky skeleton bunnies in @offshootbeerco Shaken Cream IPA brewed with lactose, peaches, and vanilla. Yum!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #halloween #offshootbeerco #bruery #skeleton #bunny #hop</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1509502636.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1509073804.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/833941f6cd7a47e9", 
                "categories": [], 
                "title": "Sour Wench Blackberry Ale is a fruity Berliner Weisse-style by...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/166822077028", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1509073804000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BYobTtKFS5w/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-09-04T19:57:57+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Sep 4, 2017 at 12:57pm PDT</time></p></div></blockquote>\n<br /><br /><p>Sour Wench Blackberry Ale is a fruity Berliner Weisse-style by @ballastpointbrewing. Let this skeleton introduce you to the world of sour beers with this very approachable and fruity blackberry brew. Oh, and Happy Labor Day!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #berlinerweisse #ballastpoint #sourwench #skeleton #blackberry #laborday</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1509073804.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
                    "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
                    "title": "Beer Labels in Motion"
                }, 
                "updated": 1509073804.0, 
                "author": "", 
                "id": "tag:google.com,2005:reader/item/c98e14beaa7e4167", 
                "categories": [], 
                "title": "Narwhal is an Imperial Stout brewed by @sierranevada. Plenty of...", 
                "alternate": [
                    {
                        "href": "http://beerlabelsinmotion.tumblr.com/post/166822076658", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1509073804000000.0", 
                "content": {
                    "content": "<blockquote class=\"instagram-media\"><div style=\"padding: 8px;\"> <div style=\"line-height: 0; margin-top: 40px; padding: 50.0% 0; text-align: center; width: 100%;\"> <div></div></div><p style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin-bottom: 0; margin-top: 8px; overflow: hidden; padding: 8px 0 7px; text-align: center; white-space: nowrap;\"><a href=\"https://www.instagram.com/p/BaKWd2Ll0vo/\" style=\"color: #c9c8cd; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: normal; line-height: 17px; text-decoration: none;\" target=\"_blank\">A post shared by Trevor Carmick (@beerlabelsinmotion)</a> on <time datetime=\"2017-10-12T20:44:50+00:00\" style=\"font-family: Arial,sans-serif; font-size: 14px; line-height: 17px;\">Oct 12, 2017 at 1:44pm PDT</time></p></div></blockquote>\n<br /><br /><p>Narwhal is an Imperial Stout brewed by @sierranevada. Plenty of espresso and cocoa flavors to be found in this boozy beer!<br />\n\u2022<br />\n\u2022<br />\n\u2022<br />\n#Beerlabelsinmotion #blim #instabeer #brewstagram #craftbeer #beerlabel #beergeek #ilovebeer #beerporn #aftereffects #narwhal #imperialstout #sierranevada</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313949", 
                "published": 1509073804.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://beerlabelsinmotion.tumblr.com/", 
        "updated": 1530516313.949807, 
        "id": "feed/http://beerlabelsinmotion.tumblr.com/rss", 
        "title": "Beer Labels in Motion"
    }, 
    "feed/http://feeds.feedburner.com/marginalrevolution/feed": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530536244.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/a07f897ad6b94a8d", 
                "categories": [], 
                "title": "Civility in politics queries", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/04QrklCxyJY/civility-politics-queries.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530536244000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>Gregory I. emails me:</p>\n<ul>\n<li><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">Can being &#8220;uncivil&#8221; be useful for advancing aims we should agree with as moral in contemporary America? Elsewhere or &#8220;else-when&#8221; perhaps?</span></li>\n<li><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">If yes, then where and how to be &#8220;uncivil&#8221; effectively?</span></li>\n<li><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">Is engaging in aggressive or what can be read as aggressive social media posting sometimes good, contrary to what we&#8217;re usually counseled? (&#8220;Aggressive&#8221; here not including threats, but stating views in forthright ways with facts, arguments and yes even possibly profanity).</span></li>\n<li><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">Could more exposure to &#8220;uncivil&#8221; behavior be or be made beneficial overall, primarily by making us all realize we should be more suspicious of our feelings of offense?\u00a0</span></li>\n<li><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">Have\u00a0</span><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">&#8220;political correc</span><span style=\"color: #1d2129; font-family: arial,Helvetica,sans-serif; font-size: small;\">tness&#8221; and what Cass Sunstein called &#8220;patriotic correctness&#8221; (thank you for this article recommendation on MR) really moved what should be in civil discourse into conversations that can now almost always be counted on being characterized as &#8220;uncivil&#8221; and thus require us to be rude to address them?</span></li>\n</ul>\n<p>I&#8217;ll take them by number.</p>\n<p>#1: In the past, not being civil has at times led to the eventual de-platforming of disliked adversaries.\u00a0 For instance, the tactics of 1960s radicals did indeed draw the attention of the American public to various norms, which eventually the American public decided to find mostly unacceptable.\u00a0 It is much harder today to be a mainstream representative of racism, outright chauvinism, the Vietnam War, napalm, and so on, with some obvious exceptions.\u00a0 Not all of the <a href=\"http://spartacus-educational.com/USASbrown.htm\" rel=\"noopener\" target=\"_blank\">opponents of slavery</a> were civil either, at least not always.</p>\n<p>But today?\u00a0 We&#8217;ve already seen big swings toward Trumpism and other forms of backlash, and many of those forces are courting incivility as a noxious brew, fit for their recipes of divisiveness.\u00a0 And the Left is picking more issues that, whatever you think of them, don&#8217;t have as much upside with the American public, such as say <a href=\"https://marginalrevolution.com/marginalrevolution/2016/04/bathrooms-and-transgender-rights.html\" rel=\"noopener\" target=\"_blank\">bathrooms in North Carolina</a> or the abolition of all profit.\u00a0 The Left is a lot &#8220;less cool&#8221; than it likes to think, which militates in favor of civility, if for no other than tactical reasons.\u00a0 Plus civility is a virtue in its own right, at least at the relevant margin.</p>\n<p>#2: If you are looking to be uncivil, look for an issue where history is clearly on your side (predictively as well as normatively), and to that issue devote uncivil people who aren&#8217;t much good for anything else, as these days reputations are more permanent than before.\u00a0 Pick issues that just aren&#8217;t getting good attention at all, or in other words shy away from the hot button items in your Twitter feed.\u00a0 Your choice should seem counterintuitive to a fair number of the people you know, including those on your side.</p>\n<p>#3: Social media are almost the worst possible venue for being uncivil.\u00a0 It&#8217;s like pissing into the ocean, and furthermore you often encourage a stronger reaction from the other side.\u00a0 &#8220;Mobilizing a posse&#8221; on social media may or may not be effective, but I view that as distinct from being uncivil <em>per se</em>.\u00a0 Being pointed and specific is often the best way to drum up the posse, and in turn some of the posse members, for better or worse, will end up being uncivil.\u00a0 If you are reading <strong>MR</strong> in the first place, very likely there is a better role for you in all of this than being a marginal, uncivil posse member.\u00a0 Calling for uncivility is in a fundamental way expressing your own low expectations for those you are advising.</p>\n<p>But the worst?\u00a0 Driving a public figure out of a restaurant may seem like fun, but in fact they don&#8217;t know at which point you are planning on stopping.\u00a0 You&#8217;re coming pretty close to threatening them with violent aggression, and there are very very few situations where such actions will end up improving the world as a whole.\u00a0 There is no better venue for politeness than commerce.</p>\n<p>#4: When people are uncivil, and organized into groups too, they are stupider.\u00a0 You too.\u00a0 That is perhaps the biggest reason to avoid uncivility, no matter how much you think your chosen exception will lead to beneficial outcomes.\u00a0 Can you not find beneficial paths of influence which do not involve making people stupider?\u00a0 If not, what does that say about you?</p>\n<p>#5: Both the left and the right are major offenders when it comes to both incivility and political correctness in the bad sense.\u00a0 I don&#8217;t quite follow every part of this question, but in closing I&#8217;ll suggest some simple rules of thumb for proper civility:</p>\n<p>a. Don&#8217;t say anything on-line that you wouldn&#8217;t say to a person face-to-face.\u00a0 (And I really do hope this constrains you.)</p>\n<p>b. Don&#8217;t ever think that an analogy with Nazis justifies your behavior, even if it is your behavior toward&#8230;Nazis.</p>\n<p>c. Don&#8217;t lose your cool.\u00a0 Always trying to sound more intelligent than those you are arguing against is not a terrible starting point.</p>\n<p>d.\u00a0Don&#8217;t deploy what I call &#8220;loose adjectives,&#8221; the most common one being &#8220;stupid,&#8221; another being &#8220;dangerous.&#8221;\u00a0 You probably write with too many adjectives anyway.</p>\n<p>e. Criticize the idea, not the person.\u00a0 Don&#8217;t presume you have such a wonderful sense of the motives of those you disagree with.</p>\n<p>f. <a href=\"http://revisionisthistory.com/episodes/27-malcolm-gladwell-s-12-rules-for-life\" rel=\"noopener\" target=\"_blank\">Learn how to learn from those who offend you</a>.</p>\n<p>g. Reexamine your writings and try to roughly measure the ratio of positive sentiments to negative sentiments.\u00a0 If that number is not ten to one or higher, reassess what you are doing.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/07/civility-politics-queries.html\" rel=\"nofollow\">Civility in politics queries</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/04QrklCxyJY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530536244.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530501739.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/e439cf8090b549ca", 
                "categories": [], 
                "title": "Sentences to ponder", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/7d63knWlbhQ/sentences-to-ponder-100.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530501739000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><blockquote><p>Overall, global activity is growing at 4.4 per cent, about 0.6 per cent above trend, and a full percentage point higher than a couple of months ago.</p></blockquote>\n<p>That is <a href=\"https://www.ft.com/content/78dbfa26-7ac1-11e8-bc55-50daf11b720d\" rel=\"noopener\" target=\"_blank\">from Gavyn Davies at the FT</a>.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/07/sentences-to-ponder-100.html\" rel=\"nofollow\">Sentences to ponder</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/7d63knWlbhQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530501739.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530492185.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/4b11d1de01e94066", 
                "categories": [], 
                "title": "What should I ask Michael Pollan?", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/Gg131DpYZ7c/ask-michael-pollan.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530492185000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>I will be doing a Conversation with Tyler with him, no associated public event.\u00a0 Here is <a href=\"https://michaelpollan.com/\" rel=\"noopener\" target=\"_blank\">his home page</a>, and <a href=\"https://michaelpollan.com/about/\" rel=\"noopener\" target=\"_blank\">the About section</a>.\u00a0 Here is <a href=\"https://en.wikipedia.org/wiki/Michael_Pollan\" rel=\"noopener\" target=\"_blank\">Wikipedia on Pollan</a>.\u00a0 Here is <a href=\"https://www.vox.com/science-and-health/2018/5/21/17339488/psychedelics-mental-health-michael-pollan-lsd-psilocybin\" rel=\"noopener\" target=\"_blank\">a Sean Iling Vox interview with Pollan</a>, on his recent work on LSD and other psychedelics, and his most recent book is\u00a0<span class=\"a-size-large\" id=\"productTitle\"><a href=\"https://www.amazon.com/Change-Your-Mind-Consciousness-Transcendence/dp/1594204225/ref=sr_1_1?ie=UTF8&amp;qid=1530463241&amp;sr=8-1&amp;keywords=michael+pollan/marginalrevol-20\" rel=\"noopener\" target=\"_blank\">How to Change Your Mind: What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence</a>.\u00a0\u00a0Pollan is perhaps best known for his books on food, cooking, and food supply chains.\u00a0</span></p>\n<p>So what should I ask him?</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/07/ask-michael-pollan.html\" rel=\"nofollow\">What should I ask Michael Pollan?</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/Gg131DpYZ7c\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530492185.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530480774.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/14973fdd7c0c4c80", 
                "categories": [], 
                "title": "Sunday assorted links", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/21ktiFwh8LI/sunday-assorted-links-169.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530480774000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>1. <a href=\"http://bair.berkeley.edu/blog/2018/06/28/daml/\" rel=\"noopener\" target=\"_blank\">One-shot imitation through watching videos</a>?</p>\n<p>2. <a href=\"http://www.nybooks.com/articles/2018/07/19/supreme-court-tipping-scales/\" rel=\"noopener\" target=\"_blank\">Good Noah Feldman piece on what will happen when SCOTUS has its first stable conservative majority since the New Deal</a>.</p>\n<p>3. <a href=\"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2938780\" rel=\"noopener\" target=\"_blank\">When do Nigerian terrorists attack more</a>?</p>\n<p>4. <a href=\"https://twitter.com/bansisharma/status/1012281473368580097\" rel=\"noopener\" target=\"_blank\">Which presidents are overridden the most by the Supreme Court</a>?\u00a0 Trump vs. Obama?\u00a0 Recommended, disturbing.</p>\n<p>5. <a href=\"http://blogs.harvard.edu/philg/2018/06/30/americans-cant-afford-the-helicopters-that-they-want/\" rel=\"noopener\" target=\"_blank\">How much should we spend on medical evacuation helicopters</a>?</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/07/sunday-assorted-links-169.html\" rel=\"nofollow\">Sunday assorted links</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/21ktiFwh8LI\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530480774.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530446679.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/976871ef80e541a9", 
                "categories": [], 
                "title": "Which cities have people-watching street cafes?", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/b1012zq2kh8/cities-people-watching-street-cafes.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530446679000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>D. asks me that question, citing Morocco, BA, and Paris.\u00a0 Here are a few factors militating in favor of such cafes:</p>\n<p>1. The weather should be reasonable.\u00a0 This militates in favor of Mediterranean climates, with Paris eking through nonetheless.\u00a0 It hurts much of Asia.</p>\n<p>2. The broad highways and thoroughfares should be removed from where the cafes might go.\u00a0 This factor harms Los Angeles, which otherwise has excellent weather, and helps La Jolla.\u00a0 Note that BA and some of the larger Moroccan cities were designed and built up around the same time, based on broadly European models, and to fit early 20th century technologies.</p>\n<p>3. Street crime must be acceptably low.\u00a0 Bye bye Brazil.</p>\n<p>4. Pollution should be fairly low, otherwise sitting outside is unpleasant.\u00a0 This harm many Indian and Chinese cities.</p>\n<p>5. Streets must not be too steep.\u00a0 Sorry La Paz, and yes here at <strong>MR</strong> we adjust steepness coefficients by altitude.</p>\n<p>6. Skyscrapers must not be too plentiful.\u00a0 This harms Manhattan, because the sunlight is mostly blocked.</p>\n<p>7. Explicit or implicit marginal tax rates on labor should be relatively high.\u00a0 Another boost for the Mediterranean.\u00a0 And is cafe culture therefore correlated with smoking culture?</p>\n<p>7b. Explicit or implicit land rents should be &#8220;low enough.&#8221;\u00a0 After all, they have to be willing to let you sit there all day.\u00a0 Just try that in midtown Manhattan.</p>\n<p>8. The cities should have mixed-use neighborhoods, well-connected to each other by foot, conducive to many diverse groups of people walking through.\u00a0 This hurts many parts of the United States and also some parts of Latin America.\u00a0 It is a big gain for Paris.</p>\n<p>9. The city dwellers need some tradition of &#8220;being alone,&#8221; so that these individuals use the cafe to connect to the outside.\u00a0 You will note that in many parts of Italy, the people-watching street cafe is outcompeted by the &#8220;stationary street conference, five guys who know each other really well yelling at each other about who knows what?&#8221;\u00a0 They never get around to that cafe chair.\u00a0 So the city needs some degree of anonymity, but not too much.\u00a0 This harms some of the more traditional societies found around the Mediterranean.\u00a0 On the other side of the distribution, too strong a tradition of television-watching hurts cafe life too.</p>\n<p><span style=\"font-size: 1rem;\">10. Another competitor to the people-watching street cafe is the z</span><span class=\"st\" style=\"font-size: 1rem;\">\u00f3calo</span><span style=\"font-size: 1rem;\"> town square tradition of Mexico.\u00a0 I myself prefer the centralization of the z</span><span class=\"st\" style=\"font-size: 1rem;\">\u00f3calo (though admittedly it does not scale well fractally)</span><span style=\"font-size: 1rem;\">.\u00a0 So the city also has to fail in providing just the right kind of parks and park benches and focality in its very center.\u00a0 Surprise, surprise, but dysfunctional local public goods are by no means unheard of around the Mediterranean, Paris too, BA, and cities such as Casablanca.</span></p>\n<p>What else?</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/07/cities-people-watching-street-cafes.html\" rel=\"nofollow\">Which cities have people-watching street cafes?</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/b1012zq2kh8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530446679.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530407021.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/34a181ff0fdf4944", 
                "categories": [], 
                "title": "The important thinkers of the future will be religious thinkers, installment #1637", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/32RbK3CH_7I/important-thinkers-future-will-religious-thinkers-installment-1637.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530407021000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>&#8220;<a href=\"https://www.americamagazine.org/politics-society/2018/06/27/alexandria-ocasio-cortez-her-catholic-faith-and-urgency-criminal\" rel=\"noopener\" target=\"_blank\">Alexandria Ocasio-Cortez on her Catholic faith and the urgency of a criminal justice reform</a>&#8221;</p>\n<p>From her:</p>\n<blockquote><p>By nature, a society that forgives and rehabilitates its people is a society that forgives and transforms itself. That takes a radical kind of love, a secret of which is given in the Lord\u2019s Prayer:\u00a0<em>Forgive us our trespasses, as we forgive those who trespass against us.</em></p>\n<p>And let us not forget the guiding principle of \u201cthe least among us\u201d found in Matthew: that we are compelled to care for the hungry, thirsty, homeless, naked, sick and, yes\u2014the imprisoned.</p></blockquote>\n<p>For the pointer I thank Nick C.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/important-thinkers-future-will-religious-thinkers-installment-1637.html\" rel=\"nofollow\">The important thinkers of the future will be religious thinkers, installment #1637</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/32RbK3CH_7I\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530407021.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530386703.0, 
                "author": "Alex Tabarrok", 
                "id": "tag:google.com,2005:reader/item/2f99df19c7324f67", 
                "categories": [], 
                "title": "Why Sexism and Racism Never Diminish\u2013Even When Everyone Becomes Less Sexist and Racist", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/pTArbTYL3eE/sexism-racism-never-diminishes-even-everyone-becomes-less-sexist-racist.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530386703000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>The idea that concepts depend on their reference class isn&#8217;t new. A short basketball player is tall and a poor American is rich. One might have thought, however, that a blue dot is a blue dot. Blue can be defined by wavelength so unlike a relative concept like short or rich there is some objective reality behind blue even if the boundaries are vague. Nevertheless, in a <a href=\"http://science.sciencemag.org/content/360/6396/1465/tab-pdf\">thought-provoking new paper</a> in Science the all-star team of Levari, Gilbert, Wilson, Sievers, Amodio and Wheatley show that what we identify as blue expands as the prevalence of blue decreases.</p>\n<p>In the figure below, for example, the authors ask respondents to identify a dot as blue or purple. The figure on the left shows that as the objective shading increases from very purple to very blue more people identify the dot as blue, just as one would expect. (The initial and final 200 trials indicate that there is no tendency for changes over time.) In the figure at right, however, blue dots were made less prevalent in the final 200 trials and, after the decrease in the prevalence, the tendency to identify a dot as blue increases dramatically. In the decreasing prevalence condition on the right, a dot that previously was previously identified as blue only 25% of the time now becomes identified as blue 50% of the time! (Read upwards from the horizontal axis and compare the yellow and blue prediction lines).<img alt=\"\" class=\"wp-image-73937 alignright\" height=\"389\" src=\"http://marginalrevolution.com/wp-content/uploads/2018/06/Prevalence-1.png\" width=\"763\" /></p>\n<p>Clever. But so what? What the authors then go on to show, however, is that the same phenomena happens with complex concepts for which we arguably would like to have a consistent and constant identification.</p>\n<blockquote><p>Are people susceptible to prevalence-induced concept change? To answer this question, we showed participants in seven studies a series of stimuli and asked them to determine whether each stimulus was or was not an instance of a concept. The concepts ranged from simple (\u201cIs this dot blue?\u201d) to complex (\u201cIs this research proposal ethical?\u201d). After participants did this for a while, we changed the prevalence of the concept\u2019s instances and then measured whether the concept had expanded\u2014that is, whether it had come to include instances that it had previously excluded.</p>\n<p>&#8230;When blue dots became rare, purple dots began to look blue; when threatening faces became rare, neutral faces began to appear threatening; and when unethical research proposals became rare, ambiguous research proposals began to seem unethical. This happened even when the change in the prevalence of instances was abrupt, even when participants were explicitly told that the prevalence of instances would change, and even when participants were instructed and paid to ignore these changes.</p></blockquote>\n<p>Assuming the result replicates (the authors have 7 studies which appear to me to be independent, although each study is fairly small in size (20-100) and drawn from Harvard undergrads) it has many implications.</p>\n<blockquote><p>&#8230;<span class=\"fontstyle0\">in 1960, Webster</span><span class=\"fontstyle2\">\u2019</span><span class=\"fontstyle0\">s dictionary defined </span><span class=\"fontstyle2\">\u201c</span><span class=\"fontstyle0\">aggression</span><span class=\"fontstyle2\">\u201d </span><span class=\"fontstyle0\">as </span><span class=\"fontstyle2\">\u201c</span><span class=\"fontstyle0\">an unprovoked attack or invasion,</span><span class=\"fontstyle2\">\u201d </span><span class=\"fontstyle0\">but today that concept can include behaviors such as making insufficient eye contact or asking people where they are from</span><span class=\"fontstyle0\">. Many other concepts, such as abuse, bullying, mental disorder, trauma, addiction, and prejudice, have expanded of late as well</span><span class=\"fontstyle0\">.\u00a0</span></p>\n<p>&#8230; Many organizations and institutions are dedicated to identifying and reducing the prevalence of social problems, from unethical research to unwar<img alt=\"\" class=\"alignright size-full wp-image-73939\" height=\"423\" src=\"http://marginalrevolution.com/wp-content/uploads/2018/06/RossmanTwitter.png\" width=\"637\" />ranted aggressions. But our studies suggest that even well-meaning agents may sometimes fail to recognize the success of their own efforts, simply because they view each new instance in the decreasingly problematic context that they themselves have brought about. Although modern societies have made extraordinary progress in solving a wide range of social problems, from poverty and illiteracy to violence and infant mortality, the majority of people believe that the world is getting worse. The fact that concepts grow larger when their instances grow smaller may be one source of that pessimism.</p></blockquote>\n<p>The paper also gives us a way of thinking more clearly about shifts in the\u00a0<a href=\"https://en.wikipedia.org/wiki/Overton_window\">Overton window</a>. When strong sexism declines, for example, the Overton window shrinks on one end and expands on the other so that what was once not considered sexism at all (e.g. &#8220;men and women have different preferences which might <a href=\"https://quillette.com/2018/06/19/why-women-dont-code/\">explain job choice</a>&#8220;) now becomes violently\u00a0<a href=\"https://twitter.com/clairlemon/status/1011819850946101254\">sexist</a>.</p>\n<p>Nicholas Christakis and the fearless Gabriel Rossman point out on twitter (see at right) that it works the other way as well. Namely, the presence of extremes can help others near the middle by widening the set of issues that can be discussed or studied without fear of opprobrium.</p>\n<p>But why shouldn&#8217;t our standards change over time? Most of the people in the 1850s who thought slavery was an abomination would have rejected the idea of inter-racial marriage. Wife beating wasn&#8217;t considered a violent crime in just the very recent past. What racism and sexism mean has changed over time. Are these examples of concept creep or progress? I&#8217;d argue progress but the blue dot experiment of Levari et al. suggests that if even objective concepts morph under prevalence inducement then subjective concepts surely will. The issue then is not to prevent progress but to recognize it and not be fooled into thinking that progress hasn&#8217;t been made just because our identifications have changed.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/sexism-racism-never-diminishes-even-everyone-becomes-less-sexist-racist.html\" rel=\"nofollow\">Why Sexism and Racism Never Diminish&#8211;Even When Everyone Becomes Less Sexist and Racist</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/pTArbTYL3eE\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530386703.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530369838.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/3468148717b24283", 
                "categories": [], 
                "title": "The economies (?) of scope that are Scotland", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/5phzkXukPgs/economies-scope-scotland.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530369838000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p><a href=\"https://www.nytimes.com/2018/06/28/books/open-book-wigtown-bookstore.html?hp&amp;action=click&amp;pgtype=Homepage&amp;clickSource=story-heading&amp;module=mini-moth&amp;region=top-stories-below&amp;WT.nav=top-stories-below\" rel=\"noopener\" target=\"_blank\">A bookstore in the village of Wigtown, Scotland, allows people to run the shop while renting an apartment upstairs</a>. (NYT)</p>\n<p>It is difficult to excerpt from that article, but it contributes ever so slightly to our understanding of &#8220;the cost disease.&#8221;</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/economies-scope-scotland.html\" rel=\"nofollow\">The economies (?) of scope that are Scotland</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/5phzkXukPgs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530369838.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530362122.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/244c2452666b4e54", 
                "categories": [], 
                "title": "The resurgence of China pessimism", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/kfpqHNQsxys/resurgence-china-pessimism.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530362122000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>Agree or not, it has returned.\u00a0 Here is <a href=\"https://foreignpolicy.com/2018/06/27/the-belt-and-road-bubble-is-starting-to-burst/\" rel=\"noopener\" target=\"_blank\">David G. Landry from Foreign Policy</a>:</p>\n<blockquote><p>A recent <span class=\"fp-red\">Foreign Policy</span>\u00a0<a href=\"https://foreignpolicy.com/2017/10/17/its-no-accident-that-chinas-tycoons-are-bad-investors/\">piece</a>\u00a0points out that individuals and firms have made up an increasingly large share of China\u2019s total foreign asset purchases in recent years, from 12 percent in 2011 to nearly 40 percent in 2017, as the People\u2019s Bank of China\u2019s share of total foreign direct investment shrank. It turns out that these new investors are poor asset judges. As their share of China\u2019s portfolio grew, its aggregate returns dwindled. In 2016, the total return on Chinese foreign investment was 0.4 percent, which is dramatically lower than the 4 percent earned by foreign reserves.</p></blockquote>\n<p>And <a href=\"https://www.ft.com/content/e957a6da-7a9c-11e8-bc55-50daf11b720d\" rel=\"noopener\" target=\"_blank\">Gabriel Wildau at the FT</a>:</p>\n<blockquote><p>&#8230;fixed-asset investment \u2014 a core driver of Chinese growth that includes spending on new buildings, machinery and infrastructure \u2014 grew at its slowest annual pace since at least 1995 through the first five months of this year. Retail sales, an indicator of consumer demand, also increased at their slowest pace since 2003. China\u2019s currency, meanwhile, hit a six-month low against the dollar this week, while the Shanghai Composite index, the country\u2019s key stock market index, dropped 10 per cent in June. Last weekend, the People\u2019s Bank of China cut the reserve requirement ratio, the amount of cash that banks must hold in reserve at the central bank, freeing up Rmb700bn ($106bn) for new lending and investment. The PBoC insists that monetary policy remains \u201cprudent\u201d but the cut to the RRR is the latest in a series of \u201c subtle easing\u201d moves in recent months, including other forms of cash injection into the financial system.</p>\n<p>&#8230;much of the recent slowdown is perceived to be the result of Beijing\u2019s policies. A sharp fall in infrastructure spending by local governments led the drop in fixed-asset investment, as the central government reined in runaway borrowing by local governments.</p></blockquote>\n<p>One way or another, you will be hearing more about this.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/resurgence-china-pessimism.html\" rel=\"nofollow\">The resurgence of China pessimism</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/kfpqHNQsxys\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530362122.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530316964.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/70bfe6ee0b664adc", 
                "categories": [], 
                "title": "Friday assorted links", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/8Ck3qStAV_I/friday-assorted-links-164.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530316964000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>1. <a href=\"https://www.denverpost.com/2018/06/24/marijuana-addiction-rising/\" rel=\"noopener\" target=\"_blank\">Marijuana addiction is real and rising</a>.</p>\n<p>2. <a href=\"http://psycnet.apa.org/fulltext/2018-30694-001.pdf\" rel=\"noopener\" target=\"_blank\">Yes, some peoople are especially good judges of personality</a>.</p>\n<p>3. <a href=\"https://www.nature.com/articles/d41586-018-05492-4\" rel=\"noopener\" target=\"_blank\">Divining the mysteries of the Indian monsoon</a>.</p>\n<p>4. <a href=\"https://qz.com/1316012/norway-and-sweden-are-locked-in-a-spat-over-border-crossing-reindeer/\" rel=\"noopener\" target=\"_blank\">Norway Sweden reindeer externalities nationalism</a>.</p>\n<p>5. <a href=\"https://medium.com/tradecraft-traction/a-startup-jobseekers-guide-for-moving-to-san-francisco-d79458b05330\" rel=\"noopener\" target=\"_blank\">A claim that moving to San Francisco is still somewhat affordable</a>.\u00a0 Roommates are underrated!</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/friday-assorted-links-164.html\" rel=\"nofollow\">Friday assorted links</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/8Ck3qStAV_I\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530316964.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530300408.0, 
                "author": "Alex Tabarrok", 
                "id": "tag:google.com,2005:reader/item/4614a0a0358a4116", 
                "categories": [], 
                "title": "The Ex-Post Dead Are Not Ex-Ante Hopeless", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/wPnQlejXGxE/ex-post-dead-not-ex-ante-hopeless.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530300408000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>It&#8217;s well known that a large faction of medical spending occurs in the last 12 months of life but does this mean that the money spent was fruitless? Be careful as there is a big selection effect&#8211;we don&#8217;t see the people we spent money on who didn&#8217;t die. A <a href=\"http://science.sciencemag.org/content/360/6396/1462\">new paper</a>\u00a0in Science by\u00a0<span class=\"name\">Einav,\u00a0</span><a class=\"xref-award\" href=\"http://science.sciencemag.org/content/360/6396/1462#award-group-3\" id=\"xref-award-group-3-1\"></a><span class=\"name\">Finkelstein,\u00a0</span><a class=\"xref-award\" href=\"http://science.sciencemag.org/content/360/6396/1462#award-group-2\" id=\"xref-award-group-2-1\"></a><span class=\"name\">Mullainathan and\u00a0</span><span class=\"name\">Obermeyer\u00a0</span>finds that most spending is <em>not</em> on people who are predicted to die within the next 12 months.</p>\n<blockquote><p>That one-quarter of Medicare spending in the United States occurs in the last year of life is commonly interpreted as waste. But this interpretation presumes knowledge of who will die and when. Here we analyze how spending is distributed by predicted mortality, based on a machine-learning model of annual mortality risk built using Medicare claims. Death is highly unpredictable. Less than 5% of spending is accounted for by individuals with predicted mortality above 50%. The simple fact that we spend more on the sick\u2014both on those who recover and those who die\u2014accounts for 30 to 50% of the concentration of spending on the dead. Our results suggest that spending on the ex post dead does not necessarily mean that we spend on the ex ante \u201chopeless.</p>\n<p>&#8230;\u201dEven if we zoom in further on the subsample of individuals who enter the hospital with metastatic cancer&#8230;we find that only 12% of decedents have an annual predicted mortality of more than 80%.</p></blockquote>\n<p>Thus, we aren&#8217;t spending on people for whom there is no hope but it doesn&#8217;t follow that it&#8217;s the spending that creates the hope. What we really want to know is who will live or die <em>conditional on the spending.\u00a0</em>And to that issue this paper does not speak.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/ex-post-dead-not-ex-ante-hopeless.html\" rel=\"nofollow\">The Ex-Post Dead Are Not Ex-Ante Hopeless</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/wPnQlejXGxE\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530300408.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530279535.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/5634c6bcb46f48e5", 
                "categories": [], 
                "title": "Tyrone on polarization, polarization is good polarization is gone", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/gxPTVqczP4U/tyrone-polarization-polarization-good-polarization-gone.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530279535000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>For a few years now, a number of you have been asking me where <a href=\"https://marginalrevolution.com/?s=tyrone\" rel=\"noopener\" target=\"_blank\">Tyrone, my evil twin brother</a>, has gone.\u00a0 The truth is a sad one: I have had to put him away, because in these especially fractious times his particular brand of malfeasance is less funny than before.\u00a0 His wisecracks cut too close to the bone, and so many matters on <strong>MR</strong> have become more somber &#8212; no more dating advice either!</p>\n<p>Nonetheless, is there a stable equilibrium to be had?\u00a0 If Tyrone receives little or no surplus, he becomes all the more&#8230;unruly.\u00a0 And so, risking punishment, he snuck out this message to Alex T., and I agreed to print it, for fear that further transmissions would occur (I do respect the Laffer Curve, and at an optimal punishment level I still can get away with some editing of his words).\u00a0 Here is the ridiculous nonsense that Tyrone reports this time around, and you can see he is gaming the message to encourage his own liberation:</p>\n<p><strong>Tyrone</strong>:</p>\n<p>Tyler and his media friends keep on reporting that political polarization has gone up.\u00a0 But that&#8217;s wrong: it has radically fallen.\u00a0 Just look at economic issues.\u00a0 As of 2011, many Republicans were for some ostensible Tea Party version of economic liberty, or at least they pretended to be.\u00a0 Now <em>both</em> parties are very bad on economic issues.\u00a0 For instance, you&#8217;ll find protectionist ideas all over the political spectrum.</p>\n<p>The wonderful thing about polarization was this: it forced people who didn&#8217;t really believe in economic liberty to act as if they did.\u00a0 The resulting gridlock was better than letting people&#8217;s real instincts come out.</p>\n<p>Trump of course used to be a Democrat, and our president himself draws bad ideas from both sides of the aisle.\u00a0 Which party again was campaigning against NAFTA?\u00a0 What is they say?: <em>Look into trade as an issue. and you see a man&#8217;s soul</em>.</p>\n<p>What about abortion, that (supposedly) most polarizing of issues?\u00a0\u00a0As <a href=\"https://twitter.com/mattyglesias/status/1012322293941526528\" rel=\"noopener\" target=\"_blank\">Matt Yglesias noted</a>:</p>\n<blockquote><p>About a third of Republicans are pro-choice and about a third of Democrats are pro-life.</p></blockquote>\n<p>Yes that is a real difference, but it hardly sounds like two worldviews, standing irrevocably cleaved and apart.\u00a0 And a lot of those positions are in actuality <a href=\"https://www.vox.com/2018/2/2/16965240/abortion-decision-statistics-opinions\" rel=\"noopener\" target=\"_blank\">fairly nuanced in their details</a>.</p>\n<p><a href=\"https://www.vanderbilt.edu/csdi/includes/Workingpaper2_2108.pdf\" rel=\"noopener\" target=\"_blank\">According to Larry M. Bartels</a>, about a quarter of the Democrats on cultural issues stand closer to the Republican party than to the average position of their own party.\u00a0 And talking through the poll data on Christian black women &#8212; often Democrats but on average not exactly &#8220;progressives&#8221; &#8212; would require a lengthy missive of its own.</p>\n<p>Nor do I see either party speaking up for free speech on campus, except in the most opportunistic terms.\u00a0\u00a0Republicans are <a href=\"https://www.nytimes.com/2018/06/14/us/politics/campus-speech-protests.html\" rel=\"noopener\" target=\"_blank\">pushing bills</a> to crack down on left-wing protests against conservative talks, while the left is trying to limit those same conservative talks.\u00a0 Distinction without a difference, your Tyrone says, and he should know.\u00a0 I yearn for the &#8220;good ol&#8217; days&#8221; when the New Left was for free speech and the conservatives were largely more skeptical.\u00a0 At least <em>someone</em> was for it, and in an oppositional kind of way.</p>\n<p>Contrary to standard reports, <a href=\"https://marginalrevolution.com/marginalrevolution/2018/05/the-cultural-divide.html\" rel=\"noopener\" target=\"_blank\">the urban-rural divide has not really been growing</a>.</p>\n<p>&#8220;<a href=\"http://www.themoneyillusion.com/nationalism-vs-cultural-appropriation/\" rel=\"noopener\" target=\"_blank\">Is the view that Asian-Americans have the wrong personality a Steve Bannon idea, or is it a Harvard idea?</a>&#8221;</p>\n<p>Trump wants to change various governmental rules and norms to cement his own power, such as dumping the filibuster and perhaps reinterpreting the emoluments clause and expanding executive authority of trade and immigration.\u00a0 Democrats talk of dumping the electoral college or, right now, bringing back <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/asylum-rights-misguided.html\" rel=\"noopener\" target=\"_blank\">FDR&#8217;s &#8220;court-packing&#8221; plan</a>.</p>\n<p>It is widely granted that <a href=\"https://www.nytimes.com/2018/06/26/opinion/political-parties-climate.html?action=click&amp;pgtype=Homepage&amp;clickSource=story-heading&amp;module=opinion-c-col-left-region&amp;region=opinion-c-col-left-region&amp;WT.nav=opinion-c-col-left-region\" rel=\"noopener\" target=\"_blank\">traditional political parties are blowing up</a> (NYT).\u00a0 Plenty of people wanted Trump and Sanders to run together as a ticket.\u00a0 And in just about every European country, immigration and terrorism poll as the major issues, neither of those being the traditional territory for previous polarization.</p>\n<p>The thing is, when people really believe in something, they end up polarized.\u00a0 Of course they don&#8217;t agree on everything, and so polarization ensues along the dimensions of difference.\u00a0 Less polarization is a symptom of believing in less more generally, and don&#8217;t confuse the resulting obnoxious fractiousness with greater polarization.\u00a0 Instead, it is a sign that ideas are no longer ruling the day.\u00a0 And indeed, religious participation is down in America and the secularization thesis is finally beginning to bite.\u00a0 Polarization, however unpleasant it may have felt at the time, meant order.</p>\n<p><strong>Tyler again</strong>:</p>\n<p>What can I say people? Tyrone now <em>opposed</em> to obnoxious fractiousness?\u00a0 In spite of his periodically reasonable tone this time around, don&#8217;t believe it for a moment &#8212; he hasn&#8217;t changed.\u00a0 Nor is polarization down.\u00a0\u00a0Polarization between Tyler and Tyrone clearly has <em>gone up</em> as of late, thus his enforced silence.\u00a0 <em>Tyler</em> believes in free speech, and he knows that\u00a0<em>freedom</em> <em>from harm</em> for others requires the silence of Tyrone.\u00a0 And so is freedom realized, and to thunderous applause.</p>\n<p>Who knows when you will hear from Tyrone again?\u00a0 Maybe I&#8217;ll let him do a restaurant review instead.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/tyrone-polarization-polarization-good-polarization-gone.html\" rel=\"nofollow\">Tyrone on polarization, polarization is good polarization is gone</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/gxPTVqczP4U\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530279535.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530275184.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/348c600eb4c34105", 
                "categories": [], 
                "title": "How many places do you visit anyway?", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/gYm9V2MceGU/many-places-visit-anyway.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530275184000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><blockquote><p>The study, titled &#8220;Evidence for a conserved quantity in human mobility&#8217; is published in\u00a0<i>Nature Human Behaviour</i>\u00a0is based on analyses of 40,000 people&#8217;s mobile traces collected in four different datasets.</p>\n<p>It is also the first of its kind to investigate people&#8217;s mobility over time and study how their behavior changes.</p>\n<p>Behind the project are Dr. Laura Alessandretti and Dr. Andrea Baronchelli, researchers in the Department of Mathematics at City, University of London, together with Professor Sune Lehmann from DTU Technical University of Denmark and the research team from Sony Mobile Communications.</p>\n<p>&#8220;We first analysed the traces of about 1000 university students. The dataset showed that the students returned to a limited number of places, even though the places changed over time. I expected to see a difference in the behavior of students and a wide section of the population. But that was not the case. The result was the same when we scaled up the project to 40,000 people of different habits and gender from all over the world. It was not expected in advance. It came as a surprise,&#8221; says Dr. Alessandretti.</p>\n<p><b>Old places disappear</b></p>\n<p>The study showed that people are constantly exploring new places. They move to a new home, find a new favorite restaurant, find a new bar, or start going to another gym, etc. However, the number of regularly visited places is constantly 25 in a given period. If a new place is added to the list, one of the places disappears.</p>\n<p>The pattern is the same when the researchers divide the locations into categories based on how often and how long time they spend at the location.</p>\n<p>&#8220;People are constantly balancing their curiosity and laziness&#8230;</p></blockquote>\n<p>That is <a href=\"https://m.phys.org/news/2018-06-life-people.html\" rel=\"noopener\" target=\"_blank\">by John Stevenson</a>, via K., here is <a href=\"https://www.nature.com/articles/s41562-018-0364-x\" rel=\"noopener\" target=\"_blank\">the original research</a> by Laura Andressetti et.al.\u00a0 On this question I retain an open mind.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/many-places-visit-anyway.html\" rel=\"nofollow\">How many places do you visit anyway?</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/gYm9V2MceGU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530275184.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530236371.0, 
                "author": "Tyler Cowen", 
                "id": "tag:google.com,2005:reader/item/9ac49faecdd8450a", 
                "categories": [], 
                "title": "Thursday assorted links", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/rPTXMFWdQd8/thursday-assorted-links-164.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530236371000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>1. <a href=\"https://www.theatlantic.com/technology/archive/2018/06/exclamation-point-inflation/563774/?utm_source=feed\" rel=\"noopener\" target=\"_blank\">Exclamation mark inflation</a>.</p>\n<p>2. &#8220;<a href=\"http://www.iasc-culture.org/THR/THR_article_2018_Summer_Lagerfeld.php\" rel=\"noopener\" target=\"_blank\">There is nothing a contrarian crowd hates more than a real contrarian, a person who breaks ranks with the group.</a>&#8221;</p>\n<p>3. <a href=\"https://www.nytimes.com/2018/06/11/science/lightning-paintings-photographs.html\" rel=\"noopener\" target=\"_blank\">How accurately do paintings depict lightning</a>? (NYT)</p>\n<p>4. &#8220;<a href=\"https://www.nationalreview.com/2018/06/spanish-inquisition-courts-were-moderate-for-their-time/\" rel=\"noopener\" target=\"_blank\">I <em>expected</em> a kind of Spanish Inquisition!</a>&#8221;\u00a0 At least at the time.</p>\n<p>5. &#8220;<a href=\"https://medium.com/@mrambaranolm/anglo-saxon-studies-academia-and-white-supremacy-17c87b360bf3\" rel=\"noopener\" target=\"_blank\">Today I am one of the only active Anglo-Saxonists of color in the native-English speaking world.</a>&#8221;</p>\n<p>6. <a href=\"https://www.insidehighered.com/news/2018/06/28/france-considers-plan-create-university-mit?utm_source=Inside+Higher+Ed&amp;utm_campaign=341a4ecbf9-DNU_COPY_01&amp;utm_medium=email&amp;utm_term=0_1fcbc04421-341a4ecbf9-197603613&amp;mc_cid=341a4ecbf9&amp;mc_eid=495c6bd417\" rel=\"noopener\" target=\"_blank\">Can France build its own MIT</a>?</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/thursday-assorted-links-164.html\" rel=\"nofollow\">Thursday assorted links</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/rPTXMFWdQd8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530236371.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
                    "htmlUrl": "http://marginalrevolution.com", 
                    "title": "Marginal REVOLUTION"
                }, 
                "updated": 1530235557.0, 
                "author": "Alex Tabarrok", 
                "id": "tag:google.com,2005:reader/item/46003a3a36774aae", 
                "categories": [], 
                "title": "The 8th Amendment Case Against Civil Asset Forfeiture", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/marginalrevolution/feed/~3/VfRFi3pBaR8/8th-amendment-case-civil-asset-forfeiture.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1530235557000000.0", 
                "content": {
                    "content": "<div class=\"pf-content\"><p>The Supreme Court has agreed to look at whether the 8th Amendment clause forbidding &#8220;excessive fines&#8221; <a href=\"http://ij.org/press-release/supreme-court-will-hear-case-on-whether-the-50-states-must-comply-with-u-s-constitutions-excessive-fines-clause/\">applies against the states</a>.</p>\n<p>The case in question involves the controversial practice of civil asset forfeiture. Tyson Timbs was convicted and served time and paid fines for selling a small amount of drugs to an undercover officer. The state also launched a civil asset forfeiture case <a href=\"http://ij.org/press-release/supreme-court-will-hear-case-on-whether-the-50-states-must-comply-with-u-s-constitutions-excessive-fines-clause/\">against his car:</a></p>\n<blockquote><p>&#8230;But the trial court ruled against the government. Because taking Tyson\u2019s car would be \u201cgrossly disproportionate\u201d to his offense\u2014for which Tyson had already been punished\u2014the trial court held that the forfeiture would violate the Excessive Fines Clause of the Eighth Amendment. The Indiana Court of Appeals agreed. Tyson suffered from drug addiction, the court noted, but his only record of dealing was selling a small amount of drugs to undercover police. The court also noted the \u201cfinancial burdens\u201d that Tyson had already faced when he pleaded guilty. Taking his car on top of all that would violate the Eighth Amendment.</p>\n<p>Then the Indiana Supreme Court stepped in. Breaking with at least 14 other state high courts, the Indiana Supreme Court ruled that the Eighth Amendment provides no protection at all against fines and forfeitures imposed by the states.</p>\n<p>&#8230;\u201cThis case is about more than just a truck,\u201d said Wesley Hottot, an attorney with the Institute for Justice. \u201cThe Excessive Fines Clause is a critical check on the government\u2019s power to punish people and take their property. Without it, state and local law enforcement could confiscate everything a person owns based on a minor crime or\u2014using civil forfeiture\u2014no crime at all.\u201d</p></blockquote>\n<p>The case has potentially very wide application, far beyond civil asset forfeiture, because municipal governments desperate for revenue are criminalizing and <a href=\"http://www.foxnews.com/politics/2018/05/31/georgia-city-sued-by-fed-up-residents-over-ridiculous-fines-for-chipped-paint-driveway-cracks.html?mc_cid=78e7729292&amp;mc_eid=28d73e8f52\">fining minor infractions</a> (see also my posts on <a href=\"https://marginalrevolution.com/marginalrevolution/2014/08/ferguson-and-the-debtors-prison.html\">Ferguson, MO</a> and <a href=\"https://marginalrevolution.com/marginalrevolution/2015/03/the-ferguson-kleptocracy.html\">here</a>)</p>\n<blockquote>\n<p class=\"speakable\">Hilda Brucker went down to the municipal court in October 2016 after receiving a phone call. She hadn\u2019t received a formal summons or known of any wrongdoing; instead, she thought she needed to clear a ticket.</p>\n<p class=\"speakable\">But when she arrived at the Doraville, Georgia, courthouse, Brucker said she was placed before a judge and prosecutor who accused her of violating city code &#8212; because of cracks in her driveway.</p>\n<p>She was fined $100 and sentenced to six months criminal probation, even though this was the first time she was made aware her driveway was considered a problem.</p>\n<p>&#8230;About 25 percent of Doraville\u2019s operating budget is reliant on fees and fines, according to IJ, a nonprofit law firm.\u00a0From August 2016 to August 2017, it raked in about $3.8 million in fines, according to IJ&#8217;s lawsuit.</p>\n<p>\u201cIt\u2019s unconstitutional because it creates a financial incentive for the city government \u2026 to ticket people,\u201d <a href=\"http://ij.org/staff/joshua-house/\" rel=\"noopener\" target=\"_blank\">Josh House</a>, an IJ attorney on the case, told Fox News. He said people in the town were being \u201cpunished\u201d for the condition of their property by having to \u201cfund the Doraville city government.\u201d</p></blockquote>\n<p>The <a href=\"http://ij.org/\">Institute for Justice</a> is doing great work.</p>\n</div><p>The post <a href=\"http://marginalrevolution.com/marginalrevolution/2018/06/8th-amendment-case-civil-asset-forfeiture.html\" rel=\"nofollow\">The 8th Amendment Case Against Civil Asset Forfeiture</a> appeared first on <a href=\"http://marginalrevolution.com\" rel=\"nofollow\">Marginal REVOLUTION</a>.</p>\n<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/marginalrevolution/feed/~4/VfRFi3pBaR8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516311681", 
                "published": 1530235557.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://marginalrevolution.com", 
        "updated": 1530516311.681403, 
        "id": "feed/http://feeds.feedburner.com/marginalrevolution/feed", 
        "title": "Marginal REVOLUTION"
    }, 
    "feed/http://www.askthepilot.com/feed/": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1528660852.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/363dc1cd7a274e5e", 
                "categories": [], 
                "title": "The (New) Book is Here", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/cockpitconfidential/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1528660852000000.0", 
                "content": {
                    "content": "<p><a href=\"http://www.askthepilot.com/wp-content/uploads/2010/03/BookWithMap1.jpg\"><img alt=\"\" class=\"aligncenter size-full wp-image-5594\" height=\"410\" src=\"http://www.askthepilot.com/wp-content/uploads/2010/03/BookWithMap1.jpg\" title=\"Book With Map\" width=\"460\" /></a></p>\n<p>&nbsp;</p>\n<p style=\"text-align: center;\"><strong>Patrick Smith and Sourcebooks are proud to announce publication of the second edition of<br />\n<em>Cockpit Confidential: Everything You Need to Know About Air Travel.<br />\nQuestions, Answers &amp; Reflections</em></strong></p>\n<p style=\"text-align: center;\">NOW A NEW YORK TIMES BESTSELLER</p>\n<p>&nbsp;</p>\n<p style=\"text-align: center;\"><em>&#8220;Brilliant is the word that applies. A book to be savored and passed to friends.&#8221;</em></p>\n<p style=\"text-align: center;\"><em> &#8212; William Langeweische, Vanity Fair</em></p>\n<p>A wry, thoughtful, and at times provocative look into the confounding world of commercial air travel, this is the ideal take-along for frequent flyers, nervous passengers, world travelers, and anybody yearning for an enlightened, behind-the-scenes look at the strange and misunderstood business of commercial aviation. More than just a book about flying, its subject is everything and everything about the grand theater of air travel, from airport architecture to terrorism to the colors and cultures of the world&#8217;s airlines.</p>\n<p>Patrick Smith has been called the thinking man&#8217;s pilot. For the better part of a decade, his <em>Ask the Pilot</em> column at Salon.com was a singular and remarkable sensation: an aviation column, for heaven&#8217;s sake, that could offer up trenchant analysis of an air disaster one day, then the next day stride fearlessly into politics, culture, or even rock music, and somehow tie it all together. <em>Cockpit Confidential</em> features the best of that material, refreshed and adapted into a seven-chapter volume of FAQs, essays and personal memoir. Whether it&#8217;s the nuts and bolts of cockpit operation or a hilarious critique of airline logos and color schemes, <em> Cockpit Confidential</em> is smart, funny, and brimming with useful information.</p>\n<p style=\"text-align: center;\"><em>&#8220;Nobody covers the airline experience like Patrick Smith. And, he\u2019&#8217;s a damned good writer.&#8221;</em><br />\n<em> &#8212; Clive Irving, Cond\u00e9 Nast Traveler</em></p>\n<p>&nbsp;</p>\n<p>\u2022 How planes fly, and a revealing look at the men and women who fly them<br />\n\u2022 Straight talk on turbulence, pilot training, and safety<br />\n\u2022 The real story on congestion, delays, and the dysfunction of the modern airport<br />\n\u2022 The myths and misconceptions of cabin air and cockpit automation<br />\n\u2022 Terrorism in perspective and a candid look at security<br />\n\u2022 Airfares, seating woes, and the pitfalls of airline customer service<br />\n\u2022 The colors and cultures of the airlines we love to hate<br />\n\u2022 The yin and yang of global travel<br />\n\u2022 Gratuitous references to 80s-era indie rock bands</p>\n<p style=\"text-align: center;\"><em>&#8220;Cockpit Confidential is the document that belongs in the seat pocket in front of you.&#8221;</em><br />\n<em> &#8212; David Pogue, New York Times correspondent and television host.</em></p>\n<p>The original version of <em>Cockpit Confidential</em> was published in 2013. Suffice it to say the world of air travel has seen major changes since then. All seven chapters have been updated, revised, and in some cases totally rewritten. Approximately 20 percent of the text is all-new. Look for the copy with the &#8220;Revised &amp; Updated&#8221; seal in the upper left corner.</p>\n<p><img alt=\"\" class=\"aligncenter size-full wp-image-13090\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2013/07/CC-with-Revised-and-Updated-Seal-1.jpg\" width=\"300\" /></p>\n<p style=\"text-align: center;\">Available at booksellers everywhere&#8230;</p>\n<p style=\"text-align: center;\"><strong>IN THE U.S.</strong></p>\n<p style=\"text-align: center;\"><a href=\"https://www.amazon.com/Cockpit-Confidential-Everything-Questions-Reflections/dp/1492663964/\">ORDER HERE FROM AMAZON</a></p>\n<p style=\"text-align: center;\"><strong>IN CANADA</strong></p>\n<p style=\"text-align: center;\"><a href=\"http://www.amazon.ca/Cockpit-Confidential-Everything-Questions-Reflections/dp/1402280912/ref=sr_1_1?ie=UTF8&amp;qid=1381796854&amp;sr=8-1&amp;keywords=cockpit+confidential\">ORDER HERE FROM AMAZON CANADA</a></p>\n<p style=\"text-align: center;\"><strong>IN THE U.K. AND IRELAND</strong></p>\n<p style=\"text-align: center;\"><a href=\"http://www.amazon.co.uk/Cockpit-Confidential-Questions-Answers-Reflections/dp/1402280912/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1381790881&amp;sr=1-1&amp;keywords=ask+the+pilot\">ORDER HERE FROM AMAZON.UK</a></p>\n<p style=\"text-align: center;\"><strong>IN AUSTRALIA</strong></p>\n<p style=\"text-align: center;\"><a href=\"http://www.booktopia.com.au/cockpit-confidential-patrick-smith/prod9781402280917.html\">ORDER HERE FROM BOOKTOPIA</a></p>\n<p style=\"text-align: center;\"><strong>IN INDIA</strong></p>\n<p style=\"text-align: center;\"><a href=\"http://www.flipkart.com/cockpit-confidential-everything-you-need-know-air-travel-questions-answers-reflections/p/itmdenmfybyuep7t?pid=9781402280917&amp;otracker=from-search&amp;srno=t_1&amp;query=Cockpit+confidential&amp;ref=1cd69dcb-2ecd-4352-abb2-e4904a0e0df0\">ORDER HERE FROM FLIPKART</a></p>\n<p>&nbsp;</p>\n<p><a href=\"http://www.askthepilot.com/wp-content/uploads/2014/01/Book-with-Passport.jpg\"><img alt=\"Book with Passport (wide version)\" class=\"aligncenter size-full wp-image-7158\" height=\"300\" src=\"http://www.askthepilot.com/wp-content/uploads/2014/01/Book-with-Passport.jpg\" width=\"450\" /></a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1528660852.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1528424482.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/de8217a4574e4493", 
                "categories": [], 
                "title": "Q&amp;A With the Pilot", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/questions-4/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1528424482000000.0", 
                "content": {
                    "content": "<h4>June 7, 2018</h4>\n<p>AN OLD-TIMEY QUESTIONS AND ANSWERS SESSION.</p>\n<p>Eons ago, in 2002, a column called <em>Ask the Pilot</em>, hosted by yours truly, started running in the online magazine <a href=\"http://www.salon.com\">Salon</a>, in which I fielded reader-submitted questions about air travel. (United Airlines later stole my name and began running a stripped-down version of the same thing in its inflight magazine.) It&#8217;s a good idea, I think, to touch back now and then on the format that got this venerable enterprise started. It&#8217;s <em>Ask the Pilot</em> classic, if you will. </p>\n<p>&nbsp;</p>\n<p><strong><em>Q: Why is engine power cut back shortly after taking off? Takeoff is the scariest part of flying to me, and suddenly, only seconds after leaving the ground, it feels like the plane is falling.</em></strong></p>\n<p>Planes routinely use more thrust than is necessary to take off, and the output of the engines is routinely drawn back to what we call &#8220;climb thrust&#8221; or &#8220;climb power&#8221; after reaching a thousand feet or so. This saves wear and tear on the engines, reduces noise on the ground, and keeps the jet from overspeeding (there are speed limits, yes, varying with altitude or the departure procedure). The sounds and sensations of this cutback are sometimes quite noticeable, but trust me the plane is <em>not</em> descending, or even decelerating.  It&#8217;s simply not climbing as sharply, and the rate of acceleration is reduced.</p>\n<p><strong><em>Q: Sometimes while a plane is accelerating for takeoff, there&#8217;s a repetitive, rhythmic thumping from below: bang-bang-bang-bang, all the way down the runway like we&#8217;re hitting a string of potholes. A friend tells me this is an indication of flat spots on a plane&#8217;s tire, or a tire that isn&#8217;t inflated properly.</em></strong></p>\n<p>Another good reason to ignore your friends. What you&#8217;re hearing is the plane&#8217;s forward landing gear &#8212; its nose tires &#8212; hitting the recessed lights along the runway centerline. These centerline lights are inlaid flush with the pavement, but they&#8217;re not <em>that</em> flush and almost always you can feel them.  One technique is to track a few feet off-center. The takeoff roll is seldom perfectly straight, however &#8212; especially during strong crosswinds &#8212; and so the bumps might start and stop, start and stop.   </p>\n<p><strong><em>Q: I understand that a plane&#8217;s control wheel or side-stick is used for turns during flight, but what about on the ground? Is this same method used to guide a plane along taxiways, like the steering wheel in a car?</em></strong></p>\n<p>The main control wheel or side-stick links only to the ailerons and has no function on the ground. Instead, steering is controlled mainly through use of a tiller &#8212; a steering wheel-like device that is side-mounted near the pilot&#8217;s knee and connected to the forward (nose) landing gear. \u00a0On some planes only the captain&#8217;s side has a tiller; other planes have them on both sides. The rudder pedals also have limited control over the nose gear. Pedal steering is used during takeoff, and after landing until the plane has reached a safe taxi speed. The plane I fly has a tiller only on the captain&#8217;s side. After one of my extremely smooth landings I can easily maneuver the jet clear of the runway using the pedals. The captain then takes over with the tiller. </p>\n<p><strong><em>Q: On the ground, can a plane move backwards under its own power?</em> </strong></p>\n<p>A plane&#8217;s wheels are equipped with highly sophisticated brakes and anti-skid technology, but they are not geared or directly driven like the wheels of an automobile &#8212; such hardware would be heavy, complicated, expensive, and then only of marginal use. The tires roll free; the plane moves only in the direction that engine thrust tells it to move. Thus, give it enough reverse thrust, and sure, a plane can be made to roll backwards. For reasons of both cost and safety, however, this is almost never done. Instead, a tug is used.  </p>\n<p>American Airlines was among a few carriers that once authorized so-called &#8220;powerbacks&#8221; for its MD-80 series planes. The MD-80 was a good choice for this, as its engines are aft-mounted and high off the ground, keeping jet blast clear of people and equipment.  Still, while it saved a little time and reduced wear and tear on the nose-gear struts, it wasn&#8217;t worth the ruckus and added fuel costs. Also, directional control is difficult and braking has to be managed carefully. Rolling backwards, a tail-heavy plane is liable to tip on its rear end if the brakes are applied forcefully enough.</p>\n<p>There\u2019s usually a small team of dudes or dudettes that pushes the plane from the gate. One of these people is connected to the cockpit via a headset. The apron or ground controllers will sometimes give complicated pushback instructions &#8212; and/or they will change them in the middle of the push &#8212; so the pilots needs to let the ground team know where, exactly, to maneuver the plane. The ground team lets the pilots know when its safe to start the engines, and then verifies that the tug has been safely disconnected from the landing gear.</p>\n<p><img alt=\"\" class=\"aligncenter size-full wp-image-13065\" height=\"375\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/06/Nose-On.jpg\" width=\"510\" /></p>\n<p><img alt=\"\" class=\"aligncenter size-full wp-image-13066\" height=\"375\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/06/Undercarriage.jpg\" width=\"510\" /></p>\n<p><strong><em>Q: I was reading about a 747 that lost all four engines after flying through volcanic ash over the Pacific several years ago. That got me thinking.  If a 747 or other large plane is forced to glide, how far can it travel, and how much control would the pilots have?</em></strong></p>\n<p>Well, from 30,000 feet you could figure on a hundred miles worth of glide, give or take.  Failure of all engines is, to be clear, a full-blown emergency, yet there&#8217;s no more a prospect of instant calamity than taking your foot off the accelerator when coasting downhill in a car.\u00a0The car keeps going and a plane will too.\u00a0In fact the power-off performance of a large jet is better than that of a light Piper or Cessna.\u00a0It needs to glide at a considerably higher speed, but the ratio of distance covered to altitude lost &#8212; close to a 20:1 ratio &#8212; is almost double.</p>\n<p>While it may surprise you, it&#8217;s perfectly routine for jets to descend at what a pilot would call idle thrust, i.e. with the engines run back to a zero-power condition.\u00a0They&#8217;re still operating powering the various systems, but providing very little push &#8212; not a lot different from switching them off entirely.\u00a0You&#8217;ve been gliding on almost every flight without knowing it.</p>\n<p>As for control capability, that depends on the aircraft type.  An airplane&#8217;s internal systems are powered hydraulically, electrically, or pneumatically, and they react differently to power failures. Multiple engine loss will render many components inoperative, but no aircraft will tumble from the sky. They all can glide. On some aircraft, multiple engine failure causes a small wind turbine automatically deploy into the slipstream to help provide control authority.</p>\n<p>Total engine loss is about as probable as a flight attendant volunteering to give you a shoe-shine, though it has happened:</p>\n<p>Southern Airways flight 242  (1977)<br />\nSevere hail and water ingestion. Fatalities: 72</p>\n<p>United flight 173  (1978)<br />\nFuel exhaustion/negligent fuel management. Fatalities: 10</p>\n<p>British Airways flight 009  (1982)<br />\nVolcanic ash.  Fatalities:  0</p>\n<p>Air Canada flight 143  (1983)<br />\nHuman error and fuel exhaustion. Fatalities: 0</p>\n<p>TACA Flight 110  (1988)<br />\nSevere rain ingestion. Fatalities: 0</p>\n<p>KLM flight 867  (1989)<br />\nVolcanic ash.  Fatalities: 0</p>\n<p>Varig flight 254  (1989)<br />\nCrew error and fuel exhaustion. Fatalities: 13</p>\n<p>SAS flight 751  (1991)<br />\nSevere ice ingestion. Fatalities: 0</p>\n<p>Ethiopian Airlines flight 961  (1996)<br />\nHijacking and fuel exhaustion. Fatalities: 125</p>\n<p>Hapag-Lloyd Flight 3378  (2000)<br />\nCrew error, mechanical problem, fuel exhaustion. Fatalities: 0</p>\n<p>Air Transat flight 236  (2001)<br />\nMechanical problem and fuel exhaustion. Fatalities: 0</p>\n<p>British Airways flight 38  (2008)<br />\nFuel system problem. Fatalities: 0</p>\n<p>US Airways flight 1549  (2009)<br />\nMultiple bird strike. Fatalities: 0</p>\n<p>LaMia flight 2933 (2016)<br />\nFuel exhaustion/negligent fuel management. Fatalities: 71</p>\n<p>That might seem like a pretty long list, but in the grand scheme of things such events are exceptionally rare. And notice all those zeroes. (The Ethiopian incident in 1996 would have had a much better outcome had the hijackers and pilots not been wresting for control at the time of impact.)</p>\n<p>The British Airways incident in 1982 occurred after an encounter with an unforecast ash cloud from Indonesia&#8217;s Mount Galunggung. The crew managed to re-start three of the engines, then pulled off a nighttime, non-precision localizer approach into Jakarta even though the ash had scraped up the windscreen to the point where visibility was almost nil. Captain Brian Moody, in one of aviation&#8217;s all-time greatest quotes, described the landing as, &#8220;a bit like negotiating one&#8217;s way up a badger&#8217;s arse.&#8221;</p>\n<p><strong><em>Q: What do you think of this great idea: The plane should have a video camera aimed through the cockpit windshield, with the view wired into the seatback video screens letting passengers see what the pilot sees.</em></strong></p>\n<p>What I think is that this already exists. Many airlines &#8212; alas most of them outside the United States &#8212; display one or more camera views on the seatback screens.  Often there are multiple angles, and passengers can click between them. \u00a0There are cameras showing what the pilots see, others that point straight down. Sometimes there&#8217;s one aimed backwards, off the tail, providing an unusual, some would say harrowing view of the ground falling away during takeoff. It depends on the aircraft and airline. You&#8217;ll typically find this on the A330, A340, A380 and 777. \u00a0\u00a0</p>\n<p>For a while in the 1970s, American Airlines had a camera mounted on the aft cockpit wall of its DC-10s. \u00a0The view was projected onto the bulkhead movie screen and passengers could watch the pilots doing their thing during takeoffs and landings. The footage could be grainy and washed out, but it was, for its time, quite a novelty.</p>\n<p><img alt=\"\" class=\"aligncenter size-full wp-image-13067\" height=\"375\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/06/Tail-Camera-A380.jpg\" width=\"510\" /></p>\n<p><strong><em>Q: Why can&#8217;t video cameras be embedded at various places on the exterior of the aircraft as a means for the pilots to evaluate the condition of the aircraft?</em></strong> </p>\n<p>There are a lot of little things in aviation that could, or should, be standard, but aren\u2019t for reasons that almost nobody can fathom. Things in aviation progress glacially, and are generally about ten generations behind whatever the rest of technology (and common sense) is doing.\u00a0But, to be fair, it\u2019s also because merely seeing something doesn\u2019t necessarily tell you how or if it&#8217;s working properly. \u00a0Because a set of landing gear is visibly extended does not mean that it&#8217;s locked in place or otherwise is fully operational. In a lot of ways, the gauges and status screens in the cockpit are <em>more</em> valuable than what some poor-quality video might show. All of that said, some newer planes <em>do</em> have exterior cameras that can be used to assess the condition of landing gear, wingtip clearance and whatnot. \u00a0</p>\n<p>&nbsp;</p>\n<p>EMAIL YOUR QUESTIONS TO patricksmith@askthepilot.com</p>\n<p>&nbsp;</p>\n<p><em>Related Stories:</em></p>\n<p><a href=\"http://www.askthepilot.com/questions/\">Q&#038;A WITH THE PILOT, VOLUME 1</a></p>\n<p><a href=\"http://www.askthepilot.com/questions-2/\">Q&#038;A WITH THE PILOT, VOLUME 2</a></p>\n<p><a href=\"http://www.askthepilot.com/questions-3/\">Q&#038;A WITH THE PILOT, VOLUME 3</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1528424482.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1526431620.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/5668c74e1a6e4221", 
                "categories": [], 
                "title": "Broken Glass", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/windows-windows/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1526431620000000.0", 
                "content": {
                    "content": "<h4>Update: June 8, 2018</h4>\n<p>I ALWAYS ASK for a window seat. Maybe I should rethink this, judging from recent events?</p>\n<p>On April 17th, a passenger on a Southwest Airlines 737 was killed after being partially ejected through a blown-out cabin window. Two weeks later, the window on another Southwest 737 cracked during flight, causing the crew to make a precautionary landing in Cleveland. Two weeks after that, one of the cockpit windscreens on an Airbus A319 operated by China&#8217;s Sichuan Airlines separated during flight, sucking the first officer part-way through the breach.</p>\n<p>The first incident resulted from an uncontained engine failure. Parts from the left engine cowling struck the fuselage. The other two appear to be spontaneous failures from a cause yet unknown: fatigue, improper installation or repair, or who knows what. The investigations are ongoing. In the second case, the window cracked but did not fail. The jet remained pressurized and nobody was hurt. The Sichuan Airlines pilot suffered only minor injuries.</p>\n<p>So, you&#8217;re thinking, three window-related emergencies in two weeks, doesn&#8217;t that have to mean something?</p>\n<p>The answer is no, not really. These incidents are what they are, in and of themselves, and don&#8217;t have much to do with one other. It&#8217;s coincidence. And, when you have fifty thousand or so commercial flights taking off and landing every day of the week, weird things are sometimes going to happen. The fatality aboard Southwest flight 1380 was certainly tragic, and the other two incidents could have been a lot worse, but we should consider ourselves fortunate to be talking about broken windows and not the <a href=\"http://www.askthepilot.com/safest-year-ever/\">types of catastrophes we used to see</a> five, ten, or a dozen times every year, with hundreds of people killed at a time.</p>\n<p>Statistically, flying is safer than ever. Yet the ubiquity of today&#8217;s media, spread across multiple platforms, means that even small mishaps have a way of becoming huge stories.</p>\n<p>One small caveat is that if any airline needs to pay extra close attention to wear and tear on its aircraft and their components, it&#8217;s probably Southwest.  The carrier&#8217;s 737s fly primarily short haul routes, and on average they perform more takeoffs and landings &#8212; or &#8220;cycles&#8221; as they&#8217;re called in the business &#8212; than the 737s at most other airlines. High-cycle planes endure more stress. Southwest realizes this, of course. Its maintenance programs are structured accordingly, and what happened in April may have nothing to do with the number of cycles on those planes.</p>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>\n<p style=\"text-align: center;\"><strong><em>WISDOME OF THE WINDOW</em></strong></p>\n<p>The interior frames around cabin windows will sometimes come loose. I once had the entire frame fall from the sidewall onto my lap. If this happens, don&#8217;t panic. Those frames are purely superficial. Calmly summon a flight attendant and show him or her the problem. The frame will be written up and repaired at the next airport.</p>\n<p>One reason an airplane&#8217;s cabin windows are small, and round, is to better withstand and disperse the forces of pressurization. (The portholes of Concorde, you may have noticed, were quite tiny. Cruising at 60,000 feet, well above most civil transports, they were subject to an unusually high inside-outside pressure differential.) Additionally their size and shape are best to assimilate the bending and flexing of a fuselage in flight. For the same reasons, the windows are normally installed along the flattest portion of a fuselage. This is why they&#8217;re sometimes aligned in a less-than-optimum viewing position.</p>\n<p>Cockpit windscreens, meanwhile, are astonishingly strong. I once saw a video demonstration of one being repeatedly struck full-force with a sledgehammer, barely budging with each blow. The glass is multi-paned, bank-teller thick, and bolstered by high-strength frames, resilient against the forces of pressurization, hail, and the occasional bird strike. For added guard against the latter, they&#8217;re heated to increase flexibility.</p>\n<p>That hardly matters, of course, if they&#8217;re installed wrong. What happened the other day aboard Sichuan Airlines was, in fact, the second such incident that I&#8217;m aware of. In 1990, the captain of a British Airways BAC One-Eleven <a href=\"https://en.wikipedia.org/wiki/British_Airways_Flight_5390\">was nearly killed</a> when a portion of the cockpit glass gave way.</p>\n<p>Passengers are asked to raise their window shades for takeoff and landing. This makes it easier for the flight attendants to assess any exterior hazards &#8212; fire, debris, etc. &#8212; that might interfere with an emergency evacuation. It also helps you remain oriented if there\u2019s a sudden impact, rolling, or tumbling. (Dimming the cabin lights is part of the same strategy.) This rule isn&#8217;t always enforced, and more and more I see passengers slamming down their shades the moment they take their seats, and leaving them like that for the entire flight. Something about this really bothers me &#8212; not the safety aspects so much as the person&#8217;s complete lack of curiosity about what&#8217;s going on outside. There&#8217;s something downright hostile about it.  </p>\n<p>When I&#8217;m at work, my office, so to speak, always comes with a view. Even when riding as a passenger, however, I prefer a window to an aisle. At least to me, there&#8217;s something instinctively comforting about sitting at the window &#8212; a desire for orientation. Which way am I going? Has the sun risen or set yet? For us lovers of air travel, of course, there&#8217;s a romantic aspect to it as well. What I observe through the glass extends beyond the planeride to the journey in whole &#8212; no less a sensory moment, potentially, than what I might experience sightseeing later on. Flying to Istanbul, I remember the sight of the ship-clogged Bosporus from 10,000 feet as vividly as standing before the city&#8217;s famous mosques or the Hagia Sofia. My first airplane ride &#8212; an American Airlines 727 &#8212; was a hop from Boston to Washington in the spring of 1974. What I remember most clearly, even more than the double servings of sandwiches and cheesecake, was the view: Manhattan from 30,000 feet; the snaky brown marshlands of Chesapeake Bay; the landmarks of D.C. as we banked along the Potomac.</p>\n<p>To recycle one of my favorite air travel tidbits: Look closely at the exterior of an Air India jet and you&#8217;ll notice how each cabin window is meticulously outlined with the little Taj Mahalian arch. This is one of those instances where aviation transcends mere transportation and pays its respects to the greater realms of history, culture, tradition &#8212; whatever you might call it.</p>\n<p>The old Caravelle, a French-built jetliner of the 1960s, had triangular windows; still rounded at the corners, but distinctly three-sided. The Douglas DC-8 was another exception. Not only were its windows squared-off, but uniquely oversized, with almost twice the glass of your standard Boeing or Airbus. I recall flying a DC-8 to Jamaica in 1982, and marveling at the TV-sized view of towering gray storm clouds.</p>\n<p>On a typical wide body jet, only maybe a third of all passengers will be lucky enough, if indeed that&#8217;s the operative word, to be stationed at a window. In a nine-abreast block, only two of the seats come with a view. If flying has lost the ability to touch our hearts and minds, perhaps that&#8217;s why: there&#8217;s nothing to <em>see</em> anymore. Boeing, for its part, seems to have rediscovered the fact that some of us relish looking outside. The windows <a href=\"http://www.askthepilot.com/787/\">on the 787</a>, you might notice, are about thirty percent bigger than usual.</p>\n<p>At the other extreme, Emirates president Tim Clark recently stated that it&#8217;s only a matter of time before the windowless airplane is here. Clark points out that a fuselage sans portholes wouldn&#8217;t need as much structural support, and could be built with lighter materials. Virtual windows, augmented with camera views, could take their place. How much of this is a genuinely practical idea versus yet another example of our infatuation with technology and a need to distance ourselves from reality, I can&#8217;t say.  </p>\n<p>At the other extreme, Emirates president Tim Clark recently stated that it&#8217;s only a matter of time before the windowless airplane is here. Clark points out that a fuselage sans portholes wouldn&#8217;t need as much structural support, and could be built with lighter materials. Virtual windows, augmented with camera views, would meanwhile take their place. Sir Timothy has a lot of pull in this business, now that his company is the largest international carrier on earth. If we wants a windowless Boeing or a windowless Airbus, he just might get one. Still, how much of this is a genuinely practical idea versus yet another example of our infatuation with technology and a desire to distance ourselves from reality, I can&#8217;t say.  </p>\n<div class=\"wp-caption alignright\" id=\"attachment_13019\" style=\"width: 520px;\"><img alt=\"\" class=\"size-large wp-image-13019\" height=\"340\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/05/Camera-View-A380-1024x739.jpg\" width=\"510\" /><p class=\"wp-caption-text\">Author&#8217;s photo.</p></div>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1526431620.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1525130135.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/7a28492697e5479f", 
                "categories": [], 
                "title": "A Trip to Bhutan", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/bhutan/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1525130135000000.0", 
                "content": {
                    "content": "<p><img alt=\"\" class=\"aligncenter size-large wp-image-12962\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-A319-Boarding-1024x683.jpg\" width=\"540\" /></p>\n<p><em>All text and photos by Patrick Smith.</em></p>\n<h4>April 30, 2018</h4>\n<p>&#8220;Bhutan? Never heard of it.&#8221; This I heard over and over again during the weeks leading up to the trip. So, presuming you need an introduction, Bhutan is a small Himalayan kingdom nestled between Tibet and India. &#8220;It&#8217;s near Nepal,&#8221; is how I explained it most of the time. This is true, though it doesn&#8217;t actually border that country, a small sliver of India rising up to separate the two.</p>\n<p>Our route to Bhutan, encompassing just over 29 hours of flying, went like this: Boston-San Francisco-Dubai-Bangkok-Paro. It was Emirates to Bangkok, and then the little-known Drukair onward to Bhutan. (If you&#8217;re traveling to this part of the world, Bangkok, Southeast Asia&#8217;s megahub, is the best jumping off point.)</p>\n<p><strong>Boston to Bangkok:</strong></p>\n<p>You&#8217;ll notice some backtracking in that itinerary on the front end, between Boston and San Francisco. This was done for no other reason than to maximize the flight time with Emirates. I had a bucket full of miles to cash in, and the Emirates flight from SFO to Dubai was the longest flight from the U.S. with upgrade seats available. If flying six hours in the wrong direction, with an overnight stay at the SFO Marriott, sounds insane, you&#8217;ve probably never flown first class on the Emirates A380: the onboard showers, the fully enclosed suites with your own private closet, the <em>two</em> onboard bars, the caviar and Dom Perignon. And so on.</p>\n<p>I&#8217;m not claiming that Emirates competes on a level playing field with other carriers. We&#8217;ll save that controversy for later. In the meantime, if like me your favorite guilty pleasure in life is sampling the world&#8217;s luxury airline cabins, the experience is tough to beat.</p>\n<p><img alt=\"\" class=\"aligncenter size-full wp-image-12946\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Emirates-Suite-3K.jpg\" width=\"520\" /></p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12999\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12999\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Emriates-Aft-Lounge-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">An unusually quiet moment in the aft lounge.</p></div>\n<p><strong>Bangkok to Paro:</strong></p>\n<p>We airline geeks have lists; airlines that we hope to someday fly on. Drukair, the government-run carrier of Bhutan, was on my list for years, so it was especially exciting to finally be walking up the airstairs and onto a Drukair A319 at Bangkok&#8217;s Suvarnabhumi Airport. The carrier also goes by the name Royal Bhutan Airlines, but the local name has more character. The &#8220;Druk&#8221; (dragon) prefix is a popular trade name in Bhutan, and you&#8217;ll see it on banks, hotels, restaurants &#8212; and the national airline.</p>\n<p>Drukair&#8217;s network, centered at Paro airport in the western part of Bhutan, extends to Bangkok, Singapore, Delhi and Mumbai. For years the company was operating the four-engine British Aerospace 146, but has since upgraded to the more modern Airbus A319. The Airbus has good high-altitude, short-runway performance, which is important when your hub airport sits at 7,300 feet with a stubby, 6,400-foot runway. It&#8217;s pretty unusual when an airport&#8217;s elevation exceeds the length of its longest runway!</p>\n<p>I&#8217;d splurged for business class, which on Drukair is a four-abreast, four-row cabin. The seats are the old-fashioned, semi-recliner types; a bit blandly upholstered and perhaps not cleaned as often as they should be. I was appalled when I lifted the center armrest console and discovered a verifiable dune of peanut crumbs and dust. That aside, the experience was perfectly pleasant. The food was tasty and the cabin crew attentive. The menus, stitched with a Bhutanese cloth design, were simple but very pretty.</p>\n<p>This was a one-stop flight, with a half-hour layover in Gauhati (Guwahati), India. This was the first time in my life that I boarded an international flight headed to a city that, prior to showing up at the airport, I had never heard of before. I&#8217;m very good at geography, which made it all the more mystifying. I stared up at the check-in monitor for a few seconds &#8212; Gauhati? &#8212; wondering vaguely where I was and where I might be going. I&#8217;d later discover that Gauhati has a population of almost a million people. I guess that&#8217;s India for you.</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12952\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12952\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-Menu-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Drukair business class menu.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12953\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12953\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-Meal-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Drukair business class breakfast, fruit course.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12975\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12975\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-Lavatory-Box-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Sometimes it&#8217;s the little things. Like this lavatory display.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12951\" style=\"width: 380px;\"><img alt=\"\" class=\"size-large wp-image-12951\" height=\"530\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-A319-With-Hillside-683x1024.jpg\" width=\"370\" /><p class=\"wp-caption-text\">Not your typical airport topography.</p></div>\n<p>During the descent into Paro they played traditional Bhutanese music over the PA. This was an evocative touch, adding a certain exotic-ness to the arrival, especially once the mountains came into view. The initial descent had been through a heavy overcast, occluding that view of Everest I&#8217;d been dying to catch, but suddenly the rainclouds gave way to an almost fairy tale panorama of jutting emerald peaks. The lower we got, the more exhilarating it got. The landing gear clunked down at what felt like 15,000 feet, and suddenly we were doing hairpin turns in sheer mountain valleys, with 17,000-foot summits on three sides.</p>\n<p>Yeah, I&#8217;d read about the arrival into Paro and watched a couple of videos, but that doesn&#8217;t prepare you for the visceral thrill of it. Especially that last, <em>very</em> low-altitude turn toward the numbers of runway 33. The expressway visual at LaGuardia has <em>nothing</em> on the landing at Paro. This was the closest I&#8217;ve ever come to being truly white-knuckled on a commercial airplane.</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12982\" style=\"width: 370px;\"><img alt=\"\" class=\"size-large wp-image-12982\" height=\"510\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-Window-View-1-1-706x1024.jpg\" width=\"360\" /><p class=\"wp-caption-text\">Himalayan High. Arrival into Paro.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12977\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12977\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-Window-View-2-1-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">The expressway visual this ain&#8217;t.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12978\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12978\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Drukair-A319-Looking-Aft-1-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Drukair has four A319s in its fleet.</p></div>\n<p>Only two scheduled carriers operate into Paro &#8212; Drukair&#8217;s privately owned competitor, the unexcitedly (and confusingly) named Bhutan Airlines is the other &#8212; and only a few dozen pilots are qualified to fly there. Frankly, this is how it should be. I&#8217;d be quite uncomfortable flying into Paro with any crew that wasn&#8217;t intimately familiar with the local terrain and its complex arrival and departure patterns.</p>\n<p>(So, to be clear, there&#8217;s Drukair, a.k.a Royal Bhutan Airlines, and the privately held Bhutan Airlines. If the names aren&#8217;t confusing enough, they both fly A319s, in similar paint schemes, on overlapping routes.)</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_13007\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-13007\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Bhutan-Airlines-A319-1-1024x684.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Only two airlines have scheduled service to Paro. Bhutan Airlines is Drukair&#8217;s competitor.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12963\" style=\"width: 540px;\"><img alt=\"\" class=\"size-large wp-image-12963\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Paro-Airport-Overlook-1024x683.jpg\" width=\"530\" /><p class=\"wp-caption-text\">Part airport at dusk. Nearby peaks approach 17,000 feet, and Mt. Everest is only a short hop away.</p></div>\n<p>In addition to the dirty seat consoles, two more gripes against Drukair: First, the carrier&#8217;s business class lounge in Paro is located <em>outside</em> security and immigration. I imagine this is due to space constraints; the airport is very small. Just the same, nobody wants to relax in a lounge, <em>then</em> have to get their passport stamped and stand in a security line.</p>\n<p>And speaking of lines, during check-in, the queue for business class was extraordinarily slow, to the point where virtually all of the economy passengers were able to check in ahead of us. When I attempted to use the economy line, which by that point was empty, I was rudely sent back to the business line and forced to wait another fifteen minutes. Several agents on the economy side now sat behind their podiums with nothing to do, yet refused to check us in.</p>\n<p>Paro&#8217;s arrival and departure halls are crowded and noisy (departure in particular), but they&#8217;re charming in that way of certain small airports. The architecture is in the style of a traditional Bhutanese home, and the decor riffs heavily on the artwork and ornate craftsmanship seen in the country&#8217;s many temples, monasteries and dzongs (fortresses).</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12983\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12983\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Paro-Terminal-Exterior-1-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">The terminal at Paro, with mural of the beloved royal family.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12958\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12958\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Paro-Terminal-Interior-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Arrivals hall, Bhutan style.</p></div>\n<p><strong>In country:</strong></p>\n<p>&#8220;Life is suffering.&#8221; That&#8217;s the first of the Four Pillars of Buddhism, which is somewhat ironic when you discover that Bhutan, in addition to being perhaps the most intensely Buddhist country on earth (prayer flags cover the Bhutan landscape from end to end, like a sort of heavenly confetti), is also one of the most content. This is the country that invented the Gross National Happiness index, and which frequently tops those &#8220;world&#8217;s happiest countries&#8221; lists.</p>\n<p>And for a poor nation in an isolated area, little Bhutan seems to have its act together in ways that few developing nations ever do. As Lonely Planet puts it: &#8220;Bhutan is one of the few places on earth where compassion is favored over capitalism. Issues of sustainable development, education and health care, and environmental and cultural preservation&#8230;are at the forefront of policy making.&#8221; The people of Bhutan are happy <em>and</em> comparatively well educated; healthcare is decent and universal. The roads are in good condition, mobile phone service is everywhere, and 98 percent of citizens, even in remote locations, have clean drinking water &#8212; an astonishing statistic, as anyone who has traveled in the developing world will acknowledge.</p>\n<p>Granted, these things are comparatively easy for a country with fewer than a million people. An honest, uncorrupt government and a Buddhism-based sense of civic responsibility doesn\u2019t hurt.</p>\n<p>The Bhutanese government is also acutely concerned about the effects of climate change. The swelling and potential bursting of glacial lakes, for one, threatens to destroy some of the country&#8217;s most historic sites. Doing its part, Bhutan currently the only carbon-negative country in the world. It has banned the of chemical fertilizers and no longer imports food that was grown with them. Thus almost all of the country&#8217;s produce is organic.</p>\n<p>In nearly a week in the country, I never saw a person smoking. Turns out the import or public use of tobacco products is against the law. As are western-style commercial billboards and advertising. There are, for now, no global consumer chains anywhere in Bhutan. No Starbucks, no KFC, no Ikea.</p>\n<p>And bring your Tums, or your Prilosec. Pretty much all Bhutanese food, even breakfast, is centered on the chili pepper.</p>\n<p>It was all the more surprising, meanwhile, once in the country, after so many friends and acquaintances of mine seemed to have no idea what or where Bhutan was, to encounter so many Americans. Only India, which shares the country&#8217;s southern and western borders, sends more tourists. Americans accents were everywhere: in the temples, dzongs, hotels and restaurants. In an age when many Americans seem aggressively incurious, this was encouraging.</p>\n<p>Short of turning this into a full-on travelogue, here are a few of the better pictures from the trip. Sightseeing highlights were the beautiful Punakha Valley, and, it hardly needs saying, the thousand-foot climb to the breathtaking Taktshang Goemba &#8212; the famous Tiger&#8217;s Nest Monastery.</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12967\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12967\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Paro-Temple-Prayer-Wheels-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Prayer wheels at the 7th-century Kyichu Lhakhang temple.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12966\" style=\"width: 360px;\"><img alt=\"\" class=\"size-large wp-image-12966\" height=\"520\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Tigers-Nest-1-683x1024.jpg\" width=\"350\" /><p class=\"wp-caption-text\">Taktshang Goemga: the Tiger&#8217;s Nest.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12968\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12968\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Mountain-Pass-Pagodas-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Pagodas at the Duchu La mountain pass.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12970\" style=\"width: 370px;\"><img alt=\"\" class=\"size-large wp-image-12970\" height=\"530\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Punakha-Monks-683x1024.jpg\" width=\"360\" /><p class=\"wp-caption-text\">Monks climbing the stairs at the Punakha Dzong.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12971\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12971\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Sunset-From-Nunnery-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Sunset over Punakha Valley</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12987\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12987\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Prayers-Temple-Thimpu-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">At the temple in Thimpu.</p></div>\n<p><img alt=\"\" class=\"size-large wp-image-12972 aligncenter\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Prayer-Wheels-and-Wall-1024x683.jpg\" width=\"520\" /></p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12986\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12986\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Roadside-Shrine-Prayer-Flags-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Prayer flags mark the countryside like a heavenly confetti.</p></div>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12974\" style=\"width: 530px;\"><img alt=\"\" class=\"size-large wp-image-12974\" height=\"350\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Punakha-Dzong-Me-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">At the Punakha Dzong.</p></div>\n<p>&nbsp;</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12991\" style=\"width: 210px;\"><img alt=\"\" class=\"size-full wp-image-12991\" height=\"240\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/04/Bhutan-Swallowtail.png\" width=\"200\" /><p class=\"wp-caption-text\">Book your tour with Bhutan Swallowtail</p></div>\n<p>&nbsp;</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1525130135.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1524035005.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/ffb426f29dc247df", 
                "categories": [], 
                "title": "Passenger Killed Aboard Southwest Flight", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/southwest-engine-incident/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1524035005000000.0", 
                "content": {
                    "content": "<br />\n<h4>UPDATE: April 26, 2018</h4>\n<p>UNCONTAINED ENGINE FAILURE is the term you&#8217;ve been hearing, and it aptly describes what befell Southwest Airlines flight 1380 on on a flight from New York&#8217;s La Guardia Airport to Dallas on April 17th.   </p>\n<p>Basically, a jet engine can fail one of two ways. The first and more innocuous way is that it simply shuts down and ceases producing thrust. This is more or less akin to switching off the ignition in your car. Of course, all commercial jetliners have at least two engines, and can fly just fine should this happen. In fact, per certification requirements, should an engine quit even at takeoff speed while still on the runway, a plane still has enough power to become airborne and climb safely away &#8212; a performance buffer that all pilots are intimately familiar with; the so-called &#8220;V-1 cut&#8221; being a maneuver we practice regularly in the simulator.</p>\n<p>More dangerous is the uncontained engine failure. As the name implies, this type of failure involves the high-velocity ejection of an engine&#8217;s internal components. The moving parts of a jet engine consist of a series of shafts and discs &#8212; fans, compressors, and turbines &#8212; spinning at tremendous speeds.  Should any of this machinery fracture or otherwise come apart, whether from an unseen crack or some immediate trauma, the extreme centrifugal forces can send bits of metal straight through the cowling and into the airframe, potentially penetrating the cabin or even the fuel tanks.  </p>\n<p>Luckily this almost never happens. Aircraft engines are incredibly reliable, and unconfined failures are among the rarest type of malfunction. But when they do happen, the results can be deadly &#8212; as was the case aboard the Southwest 737. One passenger, a 43 year-old woman from New Mexico, was killed and several others were injured after shrapnel pierced the cabin and caused a window to blow out. The crew made an emergency landing in Philadelphia.  </p>\n<p>Two years ago, an uncontained engine failure on an American Airlines 767 touched off a fire that destroyed the aircraft on the runway. A similar incident involving a British Airways 777 occurred <a href=\"http://www.askthepilot.com/emergency-etiquette/\">in Las Vegas in 2015.</a>  And in 2010, shrapnel from a failed engine caused a cascade of dangerous system failures aboard Qantas flight QF32, an Airbus A380 flying between Singapore and Sydney. </p>\n<p>Nobody was killed in those accidents, but two passengers died in 1996 when an engine turbine disc on a Delta Air Lines MD-88 came apart on a runway in Pensacola, Florida. And, most infamous of all, over a hundred people died in 1989 when United Airlines flight 232 crashed in Sioux City, Iowa, after a fractured engine disc took out all of the widebody DC-10&#8217;s hydraulic systems (a disaster due more to a design flaw in the hydraulics system than fault of the engine, but still).</p>\n<p>Maybe that all sounds scary &#8212; and the media, predictably, is going cuckoo over Southwest. But we&#8217;re talking about a small handful of fatalities over more than a quarter of a century. The death of the passenger on Southwest 1380 is the first fatality involving a U.S. major air carrier since 2005, when a Southwest 737 slid from a snowy runway in Chicago and collided with a car, killing a young boy. </p>\n<p>The fuselage breach also caused the cabin to rapidly decompress. No doubt you&#8217;ve seen the photos of passengers with the plastic oxygen masks clamped to their heads. But although the noise, the masks, and the whole sudden-ness of it was, I&#8217;m sure, a scary moment for those on board, this would have been a perfectly manageable secondary problem. </p>\n<p>Some decompressions are more hazardous than others. Bombs, for example, can cause an entire fuselage to tear apart in seconds. Large-scale structural failure, like the fuselage burst of an Aloha Airlines 737 in 1988, can be similarly disastrous. But those are rare occurrences. The vast majority of decompressions are harmless. Even sudden decompressions &#8212; such as when engine parts tear through a window, as apparently happened on Tuesday &#8212; are pretty easy to deal with. The pilots don their oxygen masks and initiate a rapid descent to a safer altitude (normally ten-thousand feet). Passengers, meanwhile, have ample supplemental oxygen if need be. An emergency descent might feel very abrupt, but it&#8217;s well within the capabilities of the airplane.  </p>\n<p>The crew of flight 1380 was essentially dealing with three situations at once: a failed engine, a decompression, and serious injuries to multiple passengers. Compound emergencies are never fun, and the pilots certainly had their hands full. But none of this required any seat-of-the-pants <a href=\"http://www.askthepilot.com/sully-upon-hudson/\">heroics,</a> and despite what you&#8217;ve seen online or on TV, the plane was never in any danger of crashing. What to do, and how to do it, would have been pretty straightforward. Put a thousand pilots in that situation and you&#8217;d likely have the same outcome each time. They did exactly what they were trained to do, and what they were <em>expected</em> to do.</p>\n<p>And on that note, please be wary of passenger accounts cited in the media. Claims that the jet was in &#8220;free fall,&#8221; was &#8220;diving toward the ground,&#8221; or was in any way out of control are simply untrue. I don&#8217;t blame anybody on the plane for being frightened, but passenger accounts in situations like this &#8212; more specifically, the way they are packaged and presented by the media &#8212; are notoriously inaccurate and prone to exaggeration, almost to the point of being totally unreliable.  </p>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>\n<p><strong>Some follow-up FAQs&#8230;</strong></p>\n<p><em>Q: I fail to understand how a passenger wearing a seat belt could have been sucked through the window. </em> </p>\n<p>It&#8217;s gruesome to think about, but even with your belt on, it\u2019s still possible to be at least partly ejected. The windows are low, and on smaller jets like a 737, you are positioned very close to them. A person&#8217;s body can stretch quite a bit, and if the decompression is powerful enough, the head and shoulders (and maybe an arm) could easily be forced through the opening.  </p>\n<p><em>Q: I&#8217;m curious why they landed in Philadelphia. The flight was very close to Harrisburg, Pennsylvania, when the problem happened. There is a decent- sized airport at Harrisburg, so why continue all the way to Philadelphia?</em></p>\n<p>From Harrisburg to Philadelphia is less than a hundred nautical miles. In aviation terms that\u2019s nothing.  And don\u2019t forget, they needed to descend several thousand feet. They could lose that altitude by spiraling down over Harrisburg, or they could lose it en route to Philadelphia, just a few minutes further away. Meanwhile, PHL has better emergency equipment, better passenger handling facilities, full-time Southwest staff, etc. If the plane had been on fire, sure, the objective would\u2019ve been to get on the ground immediately, regardless of anything else.   But this wasn\u2019t that dire an emergency \u2014 injuries to the passengers notwithstanding.</p>\n<p><em>Q: The 737 has wing-mounted engines. Does this accident imply that planes with aft-mounted engines are safer?</em></p>\n<p>No, not necessarily. In the story above I reference the two people killed when the engine of an MD-88 came apart. That\u2019s a plane with aft-mounted engines. Even with this type of configuration, the last few rows of seats are often adjacent to or behind the engines&#8217; fan and compressor sections (this is one of the reasons it&#8217;s so damn noisy sitting in the back rows on these planes). And although the engines are further from the fuel tanks, they&#8217;re closer to the rudder, horizontal stabilizers, elevators, and other important components. It was the tail engine that broke apart on that United DC-10 in 1989, and there were a couple of disasters involving Soviet-built planes with aft-mounted engines (an IL-62 and a Tu-154, I believe) in which uncontained engine failures fatally damaged the tail section.  </p>\n<p>&nbsp;</p>\n<p>Related Stories:<br />\n<a href=\"http://www.askthepilot.com/safest-year-ever/ \u200e\">THE SAFEST YEAR IN AVIATION HISTORY</a><br />\n<a href=\"http://www.askthepilot.com/sully-upon-hudson/\">HEROICS AND HYPE: A LOOK AT THE MOVIE &#8220;SULLY&#8221;</a></p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1524035005.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1523755062.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/05e84571ed4c433e", 
                "categories": [], 
                "title": "Rummaging Through the Seat Pocket of the Mind", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/miscellaneous-musings-2/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1523755062000000.0", 
                "content": {
                    "content": "<h4>April 13, 2018</h4>\n<p>I AM AMAZED that more people aren&#8217;t injured, or even killed, during boarding or deplaning, as passengers stow or remove their luggage from the overhead bins. The act of hoisting, and then lowering heavy items from a position well above shoulder level is simply dangerous for those seated below. Aisle seats always make me nervous, as some man or woman hovers above me, one hand clutching a mobile phone and the other hand swinging a fifty-pound roller bag inches from my head. </p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>One of the surprisingly pleasant things about the Bob Hope Airport in Burbank, California, is that aircraft are boarded the old-fashioned way, using a drive-up staircase.  There\u2019s something dramatic about stepping onto a jet this way: the ground-level approach along the tarmac, followed by the slow ascent.  The effect is similar to watching the opening credits of a film \u2013 it\u2019s a sort of formal introduction to the journey.  And to the aircraft itself.  The standard boarding technique makes the plane itself feel almost irrelevant; you\u2019re merely transitting from one annoying interior space (terminal) to another (cabin).  This is much more impressive, and allows you to appreciate how physically impressive a jetliner really is.</p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>The most alarming trend to strike air travel in the past half-century is not suicide hijackings, surly service, or overzealous pat-downs from the TSA.  No, the most troubling thing about flying, and perhaps humanity in general, is Sudoku, this generation\u2019s answer to crossword puzzles. Sudoku originated in Switzerland, but was popularized in Japan. Need you be reminded that things &#8220;popular in Japan&#8221; include meat-flavored ice cream, carrying womens\u2019 panties around in your wallet, and indoor fishing. </p>\n<p>I\u2019m not saying the game isn\u2019t challenging. But so is solving quadratic equations, or sword-swallowing. That doesn\u2019t mean we should all be doing it. Maybe one of the reasons people enjoy Sudoku is because it requires a lot of thinking, but only from a small and highly specialized corner of the mind. It\u2019s very egalitarian, in a way, because it\u2019s an entirely left-brain exercise with a single and absolute solution. (I think back again, as I often do, to my favorite movie of the 1980s, Terry Gilliam\u2019s \u201cBrazil.\u201d  Mind-numbed citizens of Gilliam\u2019s sick dystopia entertained themselves with a small, toy-like device that dropped a pendant onto a board, randomly indicating a result of \u201cyes,\u201d or \u201cno.\u201d)  More to the point, you can be a failure at Sudoku without guilt. Crossword puzzles make you feel bad about yourself, for not knowing the capital of Canada or forgetting the name of a Shakespeare play. Sudoku is numbers, and for most of us there\u2019s little shame in being lousy at numbers.  </p>\n<p>Am I being too harsh?  Judging from the immense piles of Sudoku books in airport newsstands &#8212; at last count, they have outsold the Bible, along with every dictionary and cookbook ever published &#8212; I\u2019ve just alienated myself from every airline passenger on earth, along with 95 percent of my readership. Try not to hate me.  </p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>\n<p>Here\u2019s a question: why does no American carrier fly to Poland? Surely a route from New York or, especially, Chicago, would be popular. United and American both have hubs at O&#8217;Hare, and Chicago has the country&#8217;s largest population of Polish-Americans.  Polish carrier LOT has been serving both ORD and JFK for decades, and I can\u2019t imagine there isn\u2019t room for another contender. </p>\n<p>Then again, does an ethnic connection, by itself, justify service between two countries? Granted there are plenty of Polish-Americans, but maybe there wouldn&#8217;t be enough of the high-end business traffic that airlines need to survive in international markets.</p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>The second pleasant thing about Bob Hope Airport in Burbank, California, is the name: Bob Hope Airport. Not that I ever had much of an opinion, one way or the other, about the famous noodle-nosed comedian, but if American airport names need anything, it\u2019s a bit of personality.</p>\n<p>And by personality I do not mean the likes of &#8220;Houston George Bush Intercontinental&#8221; or &#8220;Hartsfield-Jackson Atlanta International Airport.&#8221;  Under no circumstances should an airport name be more than three words long. </p>\n<p>Similarly, I remain uncomfortable with the renaming of Washington National and Newark airports. Reagan National? Plain old \u201cNational\u201d was the perfect moniker for the diminutive, domestic-only airport of Washington, D.C. If nothing else, there should be a strict no-presidents rule, up to and including switching New York-JFK back to its original name, Idlewild.</p>\n<p>Then we have the pseudo-patriotic puffery of &#8220;Newark Liberty International.&#8221; The change was made after the 2001 terrorist attacks just across the Hudson, and is yet more fulfillment of our nation&#8217;s hunger for heartstring gibberish. I suggest, instead, &#8220;Hudson River International.&#8221; </p>\n<p>Do we even need the &#8220;international&#8221; suffix anymore? Pretty much every big-city airport has international service these days, even it&#8217;s just a flight or two to Canada or Mexico. The label doesn&#8217;t mean what it did in, say, the 1950s, so how about we get rid of it?</p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>Wait, time out, stop the press. I&#8217;ve just been told that Bob Hope Airport is no longer Bob Hope Airport. It&#8217;s now called Hollywood Burbank Airport. That takes a lot of the color out of it. Couldn&#8217;t leave well enough alone.  </p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>Music: Am I the only person who can&#8217;t stand Elvis Costello?</p>\n<p>Now, dissing Elvis Costello is in many ways the musical equivalent of dissing the Lockheed Constellation or the DC-3. &#8220;Serious&#8221; rock fans just won&#8217;t have it. I&#8217;m sorry, but for as long as I&#8217;ve been listening to music, the sound of Costello&#8217;s voice instantly causes my toes to curl and my blood to boil. These were the songs heard at college dorm parties in 1986, their adenoidal choruses and pinched little couplets slobbered over by teenage girls who&#8217;d had a few too many wine coolers. Moreover, I find it nauseating the way his songwriting skills are spoken of with such pompous reverence, at the expense of other post-punk Brits whose lyrical cleverness could run circles around Costello&#8217;s. Take the early and mid-career work of Billy Bragg for example. (Bragg&#8217;s proletarian garage-folk and prickly love songs weren&#8217;t just smarter, they had <em>balls</em>.) Or, to the north a bit, try the sweet and sour poetry of Roddy Frame, of the long-forgotten Scottish band Aztec Camera.  </p>\n<p>\u201cOliver\u2019s Army\u201d is one a few songs of Costello&#8217;s that I don\u2019t mind. &#8220;Radio, Radio,&#8221; is another one, along with, of course, \u201c(What\u2019s So Funny About) Peace Love and Understanding.\u201d The latter was written by Nick Lowe, not by Costello. There\u2019s a story, maybe apocryphal, about Lowe not realizing that he was in line for a huge amount of royalties after that song became so popular. One day he goes out to his mailbox, and there\u2019s a check for a million dollars. Nick Lowe\u2019s greatest hits collection, <em>Basher</em>, is a terrific album. The song \u201cI Love the Sound of Breaking Glass\u201d is one of my favorites.  </p>\n<h3 style=\"text-align: center;\">&#8230;&#8230;&#8230;.</h3>\n<p>Don&#8217;t get me started on Sonic Youth.   </p>\n<p>And I don&#8217;t like bacon, either. </p>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>\n<p>Related Story:</p>\n<p><a href=\"http://www.askthepilot.com/miscellaneous-musings-1/\">MISCELLANEOUS MUSINGS ON AIR TRAVEL, VOLUME 1</a></p>\n<p>&nbsp;</p>\n<p>Note: Portions of this post appeared originally in the magazine <em><a href=\"http://www.salon.com\">Salon</a></em>.</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1523755062.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1521122854.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/fee01f0c85e1499d", 
                "categories": [], 
                "title": "Pets on a Plane", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/pets-on-a-plane/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1521122854000000.0", 
                "content": {
                    "content": "<p><img alt=\"\" class=\"aligncenter size-full wp-image-11930\" height=\"320\" src=\"http://www.askthepilot.com/wp-content/uploads/2017/05/Kennels.png\" width=\"480\" /></p>\n<h4>March 15, 2018</h4>\n<p>UNITED AIRLINES is back in the news again. And when airlines are in the news, it&#8217;s almost never for a good reason. </p>\n<p>As the headlines have it, United&#8217;s brutish handling of its <a href=\"http://www.askthepilot.com/passenger-forcibly-removed/\">human customers</a> seems to be outdone only by the way it treats pets. First we had the demise of Simon, the giant rabbit who perished aboard one of United&#8217;s London-to-Chicago flights last year. Then, a week ago, on a United flight between Houston and LaGuardia, a flight attendant demanded that an exit-row passenger put her ten-month-old French bulldog in an overhead bin, where it subsequently died either from suffocation or stress. And stop the press: a day after formally apologizing for the overhead bin incident, United accidentally shipped a German shepherd to Tokyo instead of to Kansas City.  </p>\n<p>In the case of the bulldog puppy, I can\u2019t imagine the flight attendant thought the dog would be harmed, but still it was a terrible decision. So what&#8217;s going on here? Is there something endemically dysfunctional at United that&#8217;s leading to screw-ups like these? </p>\n<p>I&#8217;m not sure. United&#8217;s record <a href=\"https://www.marketwatch.com/story/united-airlines-had-the-most-animal-deaths-on-domestic-flights-last-year-2017-04-26\">does compare poorly</a> against the other biggest airlines. United recorded 18 animal deaths in 2017, out of around 75,000 that were carried. On the other hand, the numbers overall are small, which makes comparisons like this tricky. Each of the nation&#8217;s major carriers operate thousands of flights every day of the week. Unfortunate (and avoidable) as these accidents are, they&#8217;re bound to happen, and the numbers, through little more than chance, can paint one airline as guiltier than another. The media, meanwhile, both the social kind and the kind that used to matter, is out for blood, and pity the airline &#8212; particularly the one whose name begins with U &#8212; that so much as looks crossly at a customer&#8217;s doggie or kitty.</p>\n<p>Unless of course that doggie or kitty &#8212; or pot-bellied pig, or iguana, or llama (yes) &#8212; is playing dress-up and posing as an &#8220;emotional support animal.&#8221; Yeah, the whole faux service animal thing has been simmering for some time now, and the airlines &#8212; most of them &#8212; are finally cracking down. The timing is bad here, maybe, as the new policies, together with the death of the bulldog puppy and the wayward shepherd, could make you think that airlines are decidedly hostile to pets. Which they are not.</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_11929\" style=\"width: 572px;\"><img alt=\"\" class=\"size-full wp-image-11929\" height=\"280\" src=\"http://www.askthepilot.com/wp-content/uploads/2017/05/Simon-the-Rabbit.png\" width=\"440\" /><p class=\"wp-caption-text\">RIP Simon, the Giant Rabbit.</p></div>\n<p>I&#8217;m not gonna get too deep into the service animal thing. As an animal lover, I&#8217;m of the mind that we should have <em>more</em> animals &#8212; and perhaps fewer passengers &#8212; on our planes. Also, and despite my protests, my mother once attempted to have her beloved miniature greyhound dubiously certified in this manner. </p>\n<p>&#8220;I cannot ship him below deck!&#8221; she insisted. &#8220;There&#8217;s no heat or oxygen down there!&#8221;</p>\n<p>That, incidentally, is false. Which brings us to the real point of this post, which is to give some comfort to those people who are anxious about shipping their pets in the freight compartment. I can understand how tempting it is to want your critter with you right there in the cabin (though no, not in the overhead locker, unless perhaps it&#8217;s a python or a bat), but fear not the lower holds. </p>\n<p>A lot of people are under the impression that the underfloor spaces are freezing and unpressurized. Not true. At 35,000 feet the outside temperature is about 60 degrees below zero and there isn\u2019t enough oxygen to breathe. That\u2019s worse than economy, and transporting animals in these conditions would rightfully displease their owners and animal rights groups. So, yes, the underfloor holds are always pressurized and heated. On most planes there&#8217;s a particular zone designated for animals. This tends to be the zone with the warmest and most consistent temperature. Maintaining a steady, comfortable temperature while aloft is relatively easy, but it can be tricky on the ground in hot weather, and for this reason some airlines embargo pets during the summer months.</p>\n<p>Of the two million or so animals carried in the United States each year, a small number perish, whether due to stress or mishandling. How well a pet endures the experience depends a good deal on the individual animal&#8217;s health and temperament. If your dog or cat (or rabbit or macaw) is elderly, ill, or easily stressed or spooked, perhaps sending him or her through multiple time zones in a noisy and confined space isn&#8217;t the smartest idea. My best advice is to consult with a veterinarian.</p>\n<p>The flight crew is always told when animals are aboard. Passengers are known to send handwritten notes to the cockpit asking that we take special care, but this isn\u2019t really necessary, and, in any case, there&#8217;s not a lot we can do. There\u2019s no access between the main deck and the lower holds, so we can&#8217;t carry treats to your friend below.</p>\n<p>Someday, maybe, I&#8217;ll share the story about the time I carried a pet hedgehog onto a flight to Cleveland.</p>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1521122854.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1518749278.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/d122fe6ccb164f72", 
                "categories": [], 
                "title": "Big Planes On Short Routes?  What a Concept.", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/big-planes-short-haul/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1518749278000000.0", 
                "content": {
                    "content": "<h4>February 15, 2018</h4>\n<p>IT&#8217;S WEIRD, when you think about it. More people are flying than ever before, but they&#8217;re doing so in smaller and smaller planes. In the United States, the average commercial jet holds about a third fewer passengers than it did thirty years ago.  </p>\n<p>When I was a kid, widebody planes were the norm on many domestic flights. Coast-to-coast trips were <em>always</em> on DC-10s, L-1011s or 747s. Even on shorter trips, 250 or 300-seaters were common. I grew up in Boston (where I live still), and American Airlines flew DC-10s between here and Chicago, Los Angeles, and Bermuda; Eastern used L-1011s to Orlando; Delta L-1011s would take you to Bermuda, Atlanta, and Miami. Northwest used DC-10s between Boston and Minneapolis, Detroit, and at one point Washington, D.C. The first Airbus, the A300, was a widebody plane designed specifically for short and medium-haul routes. Eastern operated the A300 on its famous Shuttle between Boston, New York and Washington: a 250-seater on a half-hour flight.</p>\n<p>Nowadays, on pretty much all of these routes, you&#8217;ll find yourself on a much smaller A319, A320, or in many cases a regional jet. The Boeing 737, a plane conceived in the 1960s for flights of around 300 miles, is used on routes to Hawaii, South America, and even to Europe.</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12811\" style=\"width: 757px;\"><img alt=\"\" class=\"size-full wp-image-12811\" height=\"330\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/02/Eastern-A300.png\" width=\"520\" /><p class=\"wp-caption-text\">Big plane, small route. An Eastern A300 in the early 1980s.</p></div>\n<p>What&#8217;s happened is three things. First, aircraft and engine technology has advanced to the point where smaller jets with limited capacity can be profitable even on long segments. And many of these planes are operated by low-paying regional carriers, to whom the airlines have outsourced much of their domestic flying. Second, the U.S. airline industry has fragmented. There are more airlines flying between more cities. Probably the biggest factor, though, is the way airlines have come to use <em>frequency</em> as a selling point. In a lot of ways, frequency of flights has become the holy grail of airline marketing. Why offer three daily nonstops to LAX using 300-seat planes, when you can offer <em>six</em> flights using 150-seat planes? And so here we are: there are city-pairs all across America connected by a dozen, fifteen, or even twenty flights a day &#8212; all in narrow-body jets carrying fewer than 200 people.   </p>\n<p>One obvious downside to this evolution (devolution is maybe the better word), is a decrease in cabin comfort. An overbooked 737 starts to feel <em>very</em> claustrophobic after that third or fourth hour. But worse, it&#8217;s clogged up our airspace and airports. Sure, there are more flights to more cities. There also are more delays.</p>\n<p>At no time is the peril of this strategy more exposed than when the weather goes bad. In years past, snow or thunderstorms meant moderate delays and perhaps a cancellation or two. When I flew regional planes in the early 1990s, I remember trudging to work through six inches of fresh snow, and departing <em>on time</em>. These days, a half inch of powder or a line of cumulonimbus brings the entire system to its knees. This is especially so in the northeastern United States, a.k.a. the &#8220;Northeast Corridor,&#8221; which is so packed with planes that delays are common even on clear days. There&#8217;s no slack, no logistical breathing room. Add a little rain, ice or snow, and everything snaps. One day last winter, it took me <em>ten hours</em> to fly from Boston to New York &#8212; nine of them spent either waiting in the terminal, as flights were cancelled and departure times progressively rolled back, or sitting in endless de-icing and taxiway queues.</p>\n<p>Five of the country&#8217;s seven most delay-prone airports are in the Northeast, and three of these (LGA, BOS and DCA) have among the highest concentrations of regional jets.</p>\n<p>Airlines don&#8217;t sell frequency so much as they sell the promise, or the illusion of it. Under optimum circumstances, it works for both the industry and its customers. But when the weather doesn&#8217;t cooperate, it can be a disaster. The question for the consumer is this: would you prefer ten flights a day that <em>might</em> arrive on time, or five flights a day that <em>will</em> arrive on time?</p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12812\" style=\"width: 750px;\"><img alt=\"\" class=\"size-full wp-image-12812\" height=\"310\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/02/AA-DC-10s-LGA.png\" width=\"510\" /><p class=\"wp-caption-text\">Once upon a time: DC-10s at La Guardia Airport.</p></div>\n<p>We hear a lot about the need to upgrade and modernize our air travel control system. Indeed we should. But although this will help the problem, it&#8217;s not going to solve it. This isn&#8217;t merely airspace issue; it&#8217;s just as much an <em>airports</em> issue. At the end of the proverbial day, there are only so many planes that can take off or land on a runway in a given amount of time, and when the weather closes in that number shrinks. Short of building new runway, or whole new airports, the only real solution is for airlines to better rationalize their schedules and capacity models.   </p>\n<p>And things might be, if only grudgingly for now, trending that way. Carriers are starting to wean themselves away from their berserk obsession with regional jets, and are at least paying lip service to the idea of decreasing frequencies and increasing aircraft size. Several times in the past month, stories <a href=\"https://www.inc.com/chris-matyszczyk/in-an-eye-opening-move-this-world-famous-airline-wants-to-introduce-bigger-planes-on-shorter-routes.html\">like this one</a> have popped into the news. </p>\n<p>Frankly, they have little choice. We&#8217;re at a breaking point, and a strategy of flooding the skies with more and more small jets is simply unsustainable. </p>\n<p>We could follow the example, maybe, of airlines overseas. Widebodies like the 777 and A330 remain very common on short-haul flights within Asia, while Emirates flies many of its A380s on high-density routes around the Middle East.  </p>\n<div style=\"margin: 10px auto 20px auto; padding: 0px; width: 490px; height: auto;\"><br />\n&lt;&gt;<br />\n&lt;&gt;\n</div>\n<p>&nbsp;</p>\n<h4>FOLLOW-UP:</h4>\n<p>Several people have written in voicing their support for high-speed rail as a means of reducing delays. &#8220;Here in California,&#8221; says one reader, &#8220;Completion of the proposed high-speed rail link between Los Angeles and San Francisco would help cut air traffic congestion at both LAX and SFO.&#8221;  Better investment in rail is perhaps a good idea, but not for this reason. It is unlikely to have any measurable effect on air traffic. Airlines would likely respond not by cutting flights, but by further reducing aircraft size. </p>\n<p>Here in the Northeast, in 2000, Amtrak introduced its \u201cAcela Express,\u201d a quasi high-speed service connecting Boston, New York, and Washington. It quickly became popular with students, businesspeople, and tourists. Yet eighteen years later the number of flights between those same cities is relatively unchanged. Shuttle flights still depart every hour, just as they always have, The only difference is, the planes are smaller. In addition, you now have far <em>more</em> flights to JFK and Newark: JetBlue, Delta, American and United all have multiple daily departures. In 1990 there might have been a half dozen daily flights from BOS to JFK or EWR. Today there are probably twenty.  </p>\n<p>And remember, too, that a substantial percentage of passengers are <em>connecting</em> at these airports. People flying into JFK, for instance &#8212; or SFO or LAX &#8212; are often continuing onward to Europe, Asia, or elsewhere.  </p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1518749278.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1515565320.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/47c68470a8804786", 
                "categories": [], 
                "title": "Dear Airlines: Please Don\u2019t Take Away Our Video Screens!", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/seatback-video/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1515565320000000.0", 
                "content": {
                    "content": "<div class=\"wp-caption aligncenter\" id=\"attachment_12733\" style=\"width: 693px;\"><img alt=\"\" class=\"size-large wp-image-12733\" height=\"510\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/01/KoreanEconomy-copy-683x1024.jpg\" width=\"360\" /><p class=\"wp-caption-text\">Korean Air seat-back video.  &nbsp; Author&#8217;s photo.</p></div>\n<h4>January 9, 2018</h4>\n<p>FOR TWO DECADES NOW, seat-back video has been the standard for inflight entertainment. Passengers the world over have grown accustomed to watching movies and shows on the screen in front of them. As well they should; it&#8217;s a fantastic amenity. I\u2019ll go so far as to say that it\u2019s the single greatest advent in onboard service in the past fifty years. Onboard comfort is all about the art of distraction, and nothing is a better distraction than being able to binge-watch your favorite TV series or catch a few films.  </p>\n<p>We\u2019ve come a long way. Flyers of a certain age will remember \u201cthe in flight movie,\u201d projected onto a scratched-up bulkhead screen. For the sound, you&#8217;d plug a bulky, stethoscope-style headset into the armrest. The picture was always blurry and the audio sounded like it was being transmitted from a submarine. Which usually was fine, because they rarely showed anything you wanted to watch in the first place. Today, passengers can choose between dozens or even hundreds of on-demand options. You can start, stop, pause, rewind\u2026. In first or business class, with oversized screens and noise-reduction headsets, you essentially have your own personal theater. Indeed, one of my favorite guilty pleasures in life is sitting in an airline seat with a meal and a glass of wine, watching something fun on my screen.</p>\n<p>Yet the days of the seat-back screen might be numbered. One of the big airline stories making the rounds of late describes how carriers are planning to do away with them. The future of inflight entertainment, we are told, is turning instead to wi-fi streaming, whereby passengers can stream shows and movies directly onto their own laptops, tablets or mobile phones. </p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12732\" style=\"width: 1034px;\"><img alt=\"\" class=\"size-large wp-image-12732\" height=\"370\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/01/Emirates-ICE-1024x768.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Emirates first class suite. &nbsp;  Author&#8217;s photo.</p></div>\n<p>And, we keep hearing, this isn&#8217;t just something the airlines want. Supposedly it&#8217;s what their customers want as well. People find the seat-back screens old-fashioned, or uncool &#8212; or something. They want streaming video instead.</p>\n<p>I&#8217;m not buying it. Carriers might <em>wish</em> this were the case, but count me among those who don\u2019t believe it. I suspect the media is simply repeating unchecked what airlines are telling them. I don\u2019t believe it because it doesn\u2019t make sense: With a seat-back screen, you plug in your earphones and go. There are no power issues, no extra cords or wires, and the space in front of you is kept clear for eating, drinking, or whatever. Watching with your own device is a lot more cumbersome. There are the sign-on and streaming settings to configure, for starters. Then, once you\u2019re watching, you&#8217;ve got battery drain to deal with, and/or you\u2019ll need to hook a power cord into an AC outlet, provided your seat has one. Also, tablet and smartphone screens are often smaller than the seat-back kind. And, if you&#8217;re in economy class, you\u2019ll be using up pretty <em>all</em> of the available tray-table space, making it impossible to enjoy a meal while you\u2019re watching.  </p>\n<p>Not to mention the recline hazard: Any time you\u2019ve got your laptop propped on your tray, you run the risk of it being crushed when the person in front of you comes hauling back without warning, jamming the screen between the tray and the seat-back (see photo below).</p>\n<p>Sure, in-seat systems are heavy and expensive &#8212; upwards of $10,000 per seat. But <em>all</em> airplane components are expensive, and the typical screen, over the course of its lifespan, will have entertained thousands of passengers. They&#8217;re reliable, convenient, and just so downright <em>useful</em>.</p>\n<p>And I haven&#8217;t mentioned the moving map displays, the exterior camera views, etc., that are strangely fun to watch.   </p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_3959\" style=\"width: 919px;\"><img alt=\"\" class=\"size-full wp-image-3959\" height=\"345\" src=\"http://www.askthepilot.com/wp-content/uploads/2012/09/Pinch-Point.jpg\" width=\"490\" /><p class=\"wp-caption-text\">Hazardous viewing on China Airlines. &nbsp; Author&#8217;s photo.</p></div>\n<p>Now, I have to confess, I sometimes switch off my screen and watch something pre-downloaded on my Macbook instead. I don\u2019t <em>like</em> doing this, for the reasons I just listed, but once in a while there just isn\u2019t anything in the carrier\u2019s library that I want to see. Thus the big caveat in my argument is that an airline needs a decent IFE system to begin with &#8212; one that\u2019s easy to navigate, has a wide-enough variety to pick from, and has the hardware (i.e. a big enough screen) to go with it. To that last point, the tiny four or five-inch screens that some airlines have stuck with simply don&#8217;t do the trick. </p>\n<p>There\u2019s a lot of variation here. My sampling is by no means comprehensive, but I\u2019ve flown a good number of carriers and I have my favorites:</p>\n<p>For sheer volume, from blockbusters to Bollywood to documentaries to pop music, nothing comes close to Emirates&#8217; &#8220;ICE&#8221; system (the letters stand for information, communications, and entertainment). Rest assured you&#8217;ll find <em>something</em> to watch or listen to, and the screens in all cabins are huge. The trouble with the Emirates system, however, is that it\u2019s maybe <em>too</em> big for its own good. The ICE guide &#8212; a booklet in your seat pocket &#8212; is thicker than a novel and confusingly organized; sifting through it all &#8212; there are thousands of channels, including many Chinese, Arabic, Hindi and Urdu movies that seem a bit superfluous &#8212; can be taxing.  </p>\n<p>Other airlines have lots to pick from but a clunky user interface. Qatar Airways\u2019 IFE, for example, is appallingly tedious to navigate. Still others have decent usability but limited choices.</p>\n<p>My vote for the best all-around system? Delta Air Lines. Theirs is a Panasonic-based platform that is both user-friendly and packed with movies and shows. The layout and navigation functions are the cleanest and most intuitive I\u2019ve seen, and there&#8217;s a more than ample, eclectic selection of films and shows. (The one catch is that when clicking into either the TV or movie sections, the default screen shows only the newest additions. Look for the drop-down menu that allows you to access the entire \u201cA-to-Z\u201d archive.)  Over the past few years I\u2019ve flown with Emirates, Qatar, Singapore, Cathay Pacific, Korean Air, Thai, and a dozen or so others. Delta\u2019s system beats all of them.</p>\n<p>I should note that Delta also has an onboard streaming option called &#8220;Delta Studio,&#8221; offering much of the same content, at no cost. If that&#8217;s your thing, have at it. I&#8217;ll keep watching it seat-back style. </p>\n<p>Whichever airline we&#8217;re talking about, the idea of fumbling around with a computer or an iPad, with wires all over the place and all my personal space taken up, is <em>not</em> a welcome change. </p>\n<div class=\"wp-caption aligncenter\" id=\"attachment_12734\" style=\"width: 1034px;\"><img alt=\"\" class=\"size-large wp-image-12734\" height=\"335\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/01/Delta-Video-1024x683.jpg\" width=\"520\" /><p class=\"wp-caption-text\">Moving map on Delta&#8217;s outstanding IFE. &nbsp; Author&#8217;s photo.</p></div>\n<p>&nbsp;</p>\n<h4>Update: January 12, 2018</h4>\n<p>Based on the comments section, my opinions on this matter seem to be in the minority. But I&#8217;m not backing down. </p>\n<p>I was on a long-haul overnight flight just yesterday. After takeoff, as the cabin crew prepared to come around with the meal service, I turned on my screen, plugged in the noise reduction headset, adjusted the channels and volume with the hand-set, and settled in. A few minutes later I had my soup, my appetizers, and my meal there in front of me while I watched five straight John Oliver episodes that I hadn&#8217;t seen before. It was all just perfect.   </p>\n<p>Then I imagined, instead, trying to have this same experience using my own device. The thought of having to futz around with my computer made me anxious just thinking about it.  Not to mention, it would have been impossible in the first place, because, even in business class, there is simply not enough room. I could enjoy my shows <em>or</em> I could enjoy my meal, but not both. Right away you&#8217;ve sucked away a huge amount of the pleasure &#8212; the whole point of sitting in a premium cabin and savoring the luxury of it.  </p>\n<p>And why should the onus be on the passenger to worry about battery charging, lugging around wireless headphones, and so on, when for two decades the airlines have been supplying the hardware?  And what of the millions of people who don&#8217;t have tablets or laptops, and/or who resent having to carry them onto a plane in order to enjoy something that heretofore was already there and hard-wired in? I&#8217;m still not getting this. Why would a passenger choose to voluntarily make the inflight entertainment experience <em>more</em> cumbersome and <em>more</em> of a pain in the ass?</p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1515565320.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://www.askthepilot.com/feed/", 
                    "htmlUrl": "http://www.askthepilot.com", 
                    "title": "AskThePilot.com"
                }, 
                "updated": 1515013710.0, 
                "author": "Patrick", 
                "id": "tag:google.com,2005:reader/item/77a26c246e7a458b", 
                "categories": [], 
                "title": "2017: The Safest Year in Aviation History", 
                "alternate": [
                    {
                        "href": "http://www.askthepilot.com/safest-year-ever/", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1515013710000000.0", 
                "content": {
                    "content": "<h4>January 3, 2018</h4>\n<p>One. Of the more than two billion people who flew commercially last year worldwide, that&#8217;s the number who were killed in airline accidents. One person. That unfortunate soul was a passenger on board an ATR turboprop that crashed after takeoff in Canada in December. Twenty-four others on the plane survived.</p>\n<p>Thus 2017 becomes the safest year in the history of civil aviation.  </p>\n<p>It was 2013 that held that honor previously, but the fact is that flying has become <em>so</em> safe that year-over-year comparisons are increasingly academic. Instead of playing the same game every January, it&#8217;s better to look from a wider, more macro perspective. What we see is a trend that began about thirty years ago, and has since reached the point where air safety, as we know it, and what we now <em>expect</em> of it, has been radically transformed.</p>\n<p>It&#8217;s a little like global warming: the entire paradigm has shifted, with every year squeaking just ahead of the previous one as the new record-breaker. Disasters still occur from time to time (see Malaysia Airlines), and there are ups and downs of statistical correction. But the safety bar, so to speak, is in a totally different place.</p>\n<p>There are so many intriguing ways to quantify this. And while this is a global story that airlines the world over can be proud of, here are four statistics that Americans, in particular, can savor:</p>\n<p>1. The last fatal airliner accident on U.S. soil was the Asiana Airlines crash landing in San Francisco in 2013. Three teenage girls were killed in that incident, one of whom was struck by a rescue vehicle. </p>\n<p>2. The last fatal accident involving a U.S. carrier of any kind was the Colgan Air (Continental Connection) tragedy outside Buffalo, in 2009, in which fifty people were killed. </p>\n<p>3. The last fatality involving a U.S. major carrier was a Southwest Airlines mishap in Chicago in 2005, in which a 737 slid from a snowy runway and collided with a car, killing a young boy. </p>\n<p>4. And perhaps the most remarkable stat of them all is this one: the last fatal accident involving one of the &#8220;big three&#8221; U.S. majors &#8212; that&#8217;s American, United, and Delta &#8212; was, &#8212; wait for it now &#8212; the crash of American flight 587 in November, 2001. That&#8217;s right, sixteen years ago. Not all that long ago, the idea that our biggest airlines, each of which records thousands of departures every day of the week, could, combined, go the better part of two decades without a single crash, would have been unthinkable. This is arguably the most impressive accomplishment in American aviation history.</p>\n<p>It wasn&#8217;t always like this.</p>\n<p>In decades past, one or two crashes every year involving one or more of the mainline U.S. carriers was considered normal, even expected. And in other regions of the globe the numbers could be staggering. </p>\n<p>Consider for a moment the year 1985. During that one year, 27 major crashes around the world resulted in the deaths of almost 2,400 people! These included the Air-India bombing over the North Atlantic, with 329 casualties, and, two months later, the crash of Japan Airlines flight 123 outside Tokyo, with 520 dead. These, the second and fifth-most deadly accidents in aviation history, happened 49 days apart! Also in &#8217;85 were the Arrow Air disaster in Newfoundland that killed 240 U.S. servicemen, the infamous British Airtours 737 fire, and the crash of an L-1011 in Dallas that killed 137.</p>\n<p>And we&#8217;re still not finished. 1985 was also the year of the <a href=\"http://www.askthepilot.com/twa-847/\">TWA flight 847 hijacking</a>.</p>\n<p>Sure, that was an unusually bad twelve months, but it wasn&#8217;t entirely out of synch with how things used to be.</p>\n<p>When I was in sixth grade, in the late 1970s, I started keeping newspaper clippings of plane crashes. Whenever there was an accident, anywhere in the world, I would snip the related articles from the paper and put them into a shirt box. By the end of junior high, that box was jammed full. Six, nine, ten, even a dozen catastrophes every year had been the norm.</p>\n<p><a href=\"https://upgradedpoints.com/10-best-US-aviation-events-2018/\"><img alt=\"\" class=\"aligncenter size-full wp-image-12778\" height=\"65\" src=\"http://www.askthepilot.com/wp-content/uploads/2018/01/UpgradePoints.png\" width=\"400\" /></a><br />\nThe big question is, how did we get here?  </p>\n<p>No, it has nothing to do with Donald Trump, who this week shocked absolutely nobody by taking credit for the good news in a typically preposterous Twitter message. &#8220;Since taking office I have been very strict on commercial aviation,&#8221; Trump tweeted. Whatever policies or measures he&#8217;s referring to, they exist only in his imagination and are better left unexplored. In typical fashion, instead of congratulating the thousands of professionals who helped make this happen, he congratulated <em>himself</em>, having done virtually nothing.  </p>\n<p>There are three very <em>real</em> things, on the other hand, we can thank, all of which precede Trump&#8217;s presidency:</p>\n<p>The first is better crew training: the advent of crew resource management (CRM), for example, and substantial enhancements to cockpit culture, hierarchy and oversight. </p>\n<p>Almost as critical has been a raft of improved aircraft technologies: things like TCAS, enhanced GPWS, windshear detection, cargo fire suppression, and so on. </p>\n<p>And thirdly &#8212; and naive as this will sound to some &#8212; we&#8217;ve had the collaborative efforts between air carriers, regulators, and organizations like ICAO, ALPA, and other advocacy groups. These people and organizations, often with very conflicting missions and priorities, have, for the most part figured out a way to work <em>together</em>. The specifics here are varied and expansive, from the standardization of runway markings and air traffic control protocols to substance abuse programs. In the U.S., the FAA finally got smart and tightened the hiring standards for regional pilots, and, in a move that was long overdue, strengthened flight, rest and duty time restrictions. </p>\n<p>And, okay, <a href=\"http://www.askthepilot.com/questionanswers/sully-and-heroics/\">we&#8217;ve been lucky, too.</a> I\u2019ve been knocking on wood since the first paragraph. And a dearth of headline tragedies does not mean we should rest on our laurels. Complacency is about the worst response we could have. Air safety is all about being proactive &#8212; even a little cynical. We need to keep this going.  </p>\n<p>A quarter century ago, as air travel was beginning to grow rapidly, and the number of aircraft was expected to double or even triple (it since has, and may do so again in our lifetimes), experts warned of a tipping point. Unless certain deficiencies were addressed, we were told, disasters would become epidemic. Some of the scarier analyses were predicting a major crash occurring <em>every week</em> by the early 2000s. Fortunately they <em>were</em> addressed, and the end result is that we\u2019ve effectively engineered away what used to be the most common causes of crashes.</p>\n<p>Indeed the global-ness of this trend has been maybe its most notable aspect. It&#8217;s one thing that planes aren&#8217;t crashing in North America or Europe, but they&#8217;re not crashing anywhere, really. Not in India or China, where aviation has been growing exponentially and where the highest levels of concern were. Not in Asia, not in Africa, not in South America.  Are all these regions <em>equally</em> safe? Of course not. But they&#8217;re all safe.  </p>\n<p>It&#8217;s a little ironic, too, for a couple of reasons:</p>\n<p>For one, surfing the Web or clicking on the television, you almost wouldn&#8217;t know that any of this has happened.  On the contrary, the media&#8217;s habit &#8212; and by media I&#8217;m referring to both commercial and social media &#8212; of over-hyping and over-dramatizing even the most minor malfunction or precautionary landing, has <a href=\"https://upgradedpoints.com/how-to-overcome-your-fear-of-flying/\">convinced many people</a> that accidents are in fact happening more frequently, and that flying has become more dangerous, when exactly the opposite is true.</p>\n<p>And then we have people&#8217;s attitudes toward flying in general. It&#8217;s hard to overestimate the levels of hate and contempt people have for the airlines, and while a lot of that sentiment is well-earned, let&#8217;s take a minute to acknowledge the enormous strides they&#8217;ve made when comes to what is arguably the most important metric of them all.  </p>\n<p>Say what you want about flying; there&#8217;s no denying that it&#8217;s become vastly safer. And this new normal is something we can all, well, live with.</p>\n<p> &nbsp;<br />\n &nbsp; </p>\n<p>Asterisks:</p>\n<p>On the very last day of 2017, in Costa Rica, twelve people died in the crash of a chartered, single-engine Cessna belonging to the company Nature Air. And, last January in Kyrgyzstan, 39 people were killed in the crash of a 747 freighter.  </p>", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516313614", 
                "published": 1515013710.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://www.askthepilot.com", 
        "updated": 1530516313.614903, 
        "id": "feed/http://www.askthepilot.com/feed/", 
        "title": "AskThePilot.com"
    }, 
    "feed/http://feeds.feedburner.com/xenomachina": {
        "items": [
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1328946929.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/9488f93b36584e39", 
                "categories": [], 
                "title": "Multi-diff with Vim and Git", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/YnRI5rq17xM/multi-diff-with-vim-andor-git.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1328942520000000.0", 
                "content": {
                    "content": "<p>I just pushed some stuff to <a href=\"https://github.com/xenomachina/public/\">github</a> that you may find useful if you're either a git user, a vim user, or (best of all) both.\n\n<h4>git-multidiff</h4>\n\n<p>For git users, there's <code>git-multidiff</code>, which works kind of like <code>git difftool</code>, except that it invokes your tool of choice once on the entire set of files, instead of once for each pair. This is handy if you have a diff tool that'll let you view multiple diffs simultaneously.\n\n<p>Full installation instructions are in a comment at the top of the file, but it basically consists of putting <a href=\"https://raw.github.com/xenomachina/public/master/bin/git-multidiff\"><code>git-multidiff</code></a> and <a href=\"https://raw.github.com/xenomachina/public/master/bin/_git-multidiff-helper\"><code>_git-multidiff-helper</code></a> in your path and adding an entry to your <code>.gitconfig</code>. Note that it requires Python (I've tested it with 2.7.2).\n\n<h4>tab-multi-diff.vim</h4>\n\n<p>Speaking of \u201cdiff tools that'll let you view multiple diffs simultaneously\u201d, that's what <code>tab-multi-diff.vim</code> is for. It lets you do a \u201cvimdiff\u201d on multiple pairs of files, with each pair in a separate tab.\n\n<p>To install it, just save <a href=\"https://raw.github.com/xenomachina/public/master/vim/plugin/tab-multi-diff.vim\"><code>tab-multi-diff.vim</code></a> in your vim plugins directory (typically <code>~/.vim/plugin/</code>).\n\n<p>To use it, you can invoke vim (or gvim) with a command like:\n\n<pre class=\"code\">\ngvim -c 'silent call TabMultiDiff()' old-foo foo old-bar bar\n</pre>\n\n<p>Thats obviously kind of long, so you probably want to wrap it in a shell script. My script for doing this is <a href=\"https://raw.github.com/xenomachina/public/master/bin/vd\"><code>vd</code></a> (which also depends on <a href=\"https://raw.github.com/xenomachina/public/master/bin/v\"><code>v</code></a>).  Note that that it imposes some of my personal preferences, so you may only want to use it as a starting point.\n\n<h4>Using Them Together</h4>\n\n<p>To use <code>git-multidiff</code> and <code>tab-multi-diff.vim</code> together I have the following in my <code>.gitconfig</code>:\n\n<pre class=\"code\">\n[multidiff]\n  tool = vd -f\n</pre>\n\n<p>Note that the <code>tool</code> option for <code>multidiff</code> is a command line prefix, not a \u201ctool name\u201d as it is for <code>git difftool</code>. That\u2019s why it\u2019s possible to include a flag. The <code>-f</code> flag shown here is to prevent backgrounding. (It's always seemed weird to me that <code>git difftool</code> has this extra layer of indirection.)<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/YnRI5rq17xM\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1328942520.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1323135213.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/b2f9dc57824641db", 
                "categories": [], 
                "title": "A Sufficiently Advanced Violin", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/EQHgq7Vr-Zo/sufficiently-advanced-violin.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1323069120000000.0", 
                "content": {
                    "content": "<p>The reactions to the recent story about <a href=\"http://www.rsna.org/Media/rsna/RSNA11_newsrelease_target.cfm?id=562\">CT\nscans being used to recreate a Stradivarius violin</a> are interesting.\nFor example, in the comments on <a href=\"http://www.engadget.com/2011/11/30/stradivarius-violin-recreated-from-cat-scan-sounds-amazingly-s/\">Engadget</a> there's\na lot of denial that it could sound as good as the original, as well as\npeople saying it won't sound as good in 300 years. I have to wonder if\nthe latter even matters. If we can cheaply create a clone of a\n307-year-old Stradivarius, you can just make a new one when it stops\nsounding good. And who knows if a 600-year-old Stradivarius will\nactually sound good?\n\n<p><img alt=\"Photograph of CNC machine carving the front plate of the Betts violin reproduction.\" border=\"0\" src=\"http://xenomachina.com/images/cnc-violin.jpg\" />\n\n\n<p><a href=\"http://www.musicianscentre.com/blog/2011/12/napster-for-music-shops/\">Musicians\nCentre has an interesting take</a>: \u201cWhy do we have to keep going back\nand trying to replicate the past when it comes to instruments?\u201d\n\n<p>I agree, but I don't think the scanned Stradivarius has to be just about <em>replicating</em>\nthe past. If we are able to scan instruments that sound good and produce\nreplicas, that means we can experiment with modifications to the design,\nand iterate to produce better instruments. Without having any way to\nmeasure what makes a Stradivarius \u201cgood\u201d means iteration is hard, and\nyou end up with people talking about trees that don\u2019t exist anymore or a\nmysterious fungus that can\u2019t be replicated.\n\n<p>That said, improvements will most likely have to overcome a\nsubjectivity problem. On a large scale there are objective ways of\ndetermining that one violin is better than another, but at a finer scale\nthings might not be so clear cut. Assuming you could make a violin that\nsounds slightly better than even the best Stradivarius by some objective\nmeasure, would it just end up sounding weird to people who are used to\nthe real thing?<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/EQHgq7Vr-Zo\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1323069120.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1306764900.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/fd4b3649f19446ee", 
                "categories": [], 
                "title": "PSA: Netflix for Android spontaneous deactivation fix", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/Ob7YjxGSZAQ/psa-netflix-for-android-spontaneous.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1306763940000000.0", 
                "content": {
                    "content": "<p>Today Netflix on my Android phone (a Nexus One) started giving me this error:\n\n<blockquote>It looks like Netflix has been deactivated on this device. It could be an issue with your account or perhaps your device was deactivated on netflix.com. (2004)</blockquote>\n\n<p>Netflix only lets you have 6 devices activated per account, so at first I thought I might be bumping into the limit, but it turned out that that wasn't my problem.\n\n<p>The thing that eventually worked was to clear all data for the Netflix app. To do this:\n\n<ol>\n<li>Go to the home screen.\n<li>Press the menu button.\n<li>Select \"Manage apps\" (or \"Settings\", then \"Applications\", then \"Manage applications\" on older versions of Android).\n<li>Select the \"Downloaded\" tab.\n<li>Select the Netflix app.\n<li>Click on \"Clear data\".\n</ol>\n\n<p>The next time you open the Netflix app you'll need to sign in again, but then it should be working correctly.\n\n<p>I talked to Netflix customer support about this issue and apparently they had a ton of devices spontaneously deactivate in the last day or so. It sounded like they either don't really understand the cause, or just didn't want to share the details. Based on the fix it seems like some sort of authentication token either got corrupted or had the server-side rug pulled out from under it. Clearing the app data seems to force it to get a fresh token.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/Ob7YjxGSZAQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1306763940.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1324711865.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/ef9f8a4834b74107", 
                "categories": [], 
                "title": "Android's 2D Canvas Rendering Pipeline", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/pKCBEtiBHaM/androids-2d-canvas-rendering-pipeline.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1305005400000000.0", 
                "content": {
                    "content": "<p>This is a conceptual overview of how Android's 2D Canvas\n  rendering pipeline works. Since Android's Canvas API is mostly a\n  pretty thin veneer on top of Skia it should also serve as a\n  reasonable overview of Skia's operation, though I've only looked\n  at Skia code that's reachable from Android's SDK, and when the Skia\n  and Android terminology differ (which is rare, modulo\n  \u201c<code>Sk</code>\u201d prefixes and capitalization) I've used the\n  Android terminology.</p>\n\n  <h5>How and Why I Wrote This</h5>\n\n  <p>I wrote this overview because I've been doing some Android\n  development recently, and I was getting frustrated by the fact\n  that the documentation for <code>android.graphics</code>,\n  particularly when it comes to all of the things that can be set in a\n  <code>Paint</code> object, is extremely sparse. I Googled, and\n  <a href=\"http://stackoverflow.com/questions/5762727/how-do-the-pieces-of-androids-2d-canvas-drawing-pipeline-fit-together\">\n  I asked a question on Stack Overflow</a> but I couldn't find\n  anything that explained this stuff to my satisfaction.</p>\n\n  <p>This overview is based on reading what little documentation\n  exists (often \u201cbetween the lines\u201d), doing lots of experiments to\n  see how fringe cases work, poring over the code, and doing even\n  more experiments to verify that I was reading the code correctly.\n  I started writing it as notes for myself, but I figured others\n  might benefit as well so I decided to post it here.</p>\n\n  <h5>Caveats</h5>\n\n  <p>I say this is a \u201cconceptual\u201d overview because it does not\n  always explain the actual implementation. The implementation is\n  riddled with special cases that attempt to avoid doing work that\n  isn't necessary. (I remember hearing some quote along the lines\n  of \u201cthe fastest way to do something is to not do it at all\u201d.)\n  Understanding the implementation details of all of these special\n  cases is unnecessary to understanding the actual end-result, so\n  I've focused on the most general path through the pipeline. I\n  actually avoided looking at the details of a lot of the\n  special-case code, so if this code contains behavioral\n  inconsistencies I won't have seen them.</p>\n\n  <p>Also, there are cases, particularly in the Shading and\n  Transfer sections, where the algorithm described here is far less\n  efficient but easier to visualize (and, I hope, understand) than\n  the actual implementation. For example, I describe Shading as a\n  separate phase that produces an image containing the source\n  colors and Transfer as a phase producing an image with\n  intermediate colors. In reality these two \u201cphases\u201d are\n  interleaved such that only a small set (often just one) of the\n  pixels from each of these virtual images actually \u201cexists\u201d at any\n  instant in time. There is also short-circuiting in this code\n  such that the source and intermediate colors aren't computed at\n  all for pixels where the mask is fully transparent (<code>0x00</code>).</p>\n\n  <p>This does mean that this overview can't give one an entirely\n  accurate understanding of the performance (speed and/or memory)\n  of various operations in the pipeline. For that it would be better\n  to performing experiments and profile.</p>\n\n  <p>Also keep in mind that because this is documenting what is\n  arguably \u201cundocumented behavior\u201d it's hard to say how much of\n  what is described here is stuff that's guaranteed versus\n  implementation detail, or even outright bugs. I've used some\n  judgement in determining where to put the boundaries between\n  phases (all of that optimization blurs the lines) based on what I\n  think is a \u201creasonable API\u201d and I've also tried to point out when\n  I think a particular behavior I've discovered looks more like a\n  bug than a feature to rely on.</p>\n\n  <p>There are still a number of cases where I'd like to do some\n  more experimentation to verify that my reading of the code is\n  correct and I've tried to indicate those below.</p>\n  <hr />\n  <h5>Entering the Pipeline</h5>\n\n  <p>The pipeline is invoked each time a\n  <code>Canvas.draw<var>Something</var></code> method that takes a\n  <code>Paint</code> object is called.</p>\n\n  <p>Most of these drawing operations start at the first phase,\n  Path Generation. There are two exceptions, however:</p>\n\n  <ol>\n    <li>\n      <p><code>drawPaint</code> skips Path Generation entirely and\n      Rasterization consists of producing a solid opaque mask.</p>\n    </li>\n\n    <li>\n      <p><code>drawBitmap</code> has different behavior depending\n      on the supplied <code>Bitmap</code>'s configuration.</p>\n\n      <p>In the case of an <code>ALPHA_8</code> <code>Bitmap</code>,\n      Path Generation and Rasterization are both skipped and the\n      supplied <code>Bitmap</code> is used as the mask.</p>\n\n      <p>For other <code>Bitmap</code> configurations the\n      <code>Shader</code> is temporarily replaced with a\n      <code>BitmapShader</code> in <code>CLAMP</code> mode. This means\n      that setting a <code>Shader</code> to be used with a\n      <code>drawBitmap</code> call with a non-<code>ALPHA_8</code>\n      <code>Bitmap</code> is pointless. The pipeline is then executed\n      as though <code>drawRect</code> had been called with a rectangle\n      equal to the bounding box of the <code>Bitmap</code>.</p>\n\n      <p>According to Romain Guy, this behavior is intentional.</p>\n    </li>\n  </ol>\n\n\n  <h5>Overall Structure</h5>\n\n  <div class=\"figure\">\n    \n      <img src=\"http://www.xenomachina.com/android-canvas-pipeline.png\" />\n    \n    <p>The overall structure of the pipeline.  This diagram is available\n    in <a href=\"http://www.xenomachina.com/android-canvas-pipeline.svg.gz\">Gzipped SVG</a> or <a href=\"http://www.xenomachina.com/android-canvas-pipeline.pdf\">PDF</a> formats for use as a\n    quick reference card.\n  </div>\n\n  <p>At the top of the diagram are the two main inputs to the pipeline:\n  the parameters to the draw method that was called (really multiple\n  inputs) and the \u201cdestination\u201d image &mdash; the <code>Bitmap</code>\n  connected to the <code>Canvas</code>.\n\n  <p>There are four main phases in the pipeline. The details of these\n  will be covered below. While there are exceptions, all of the phases\n  (mostly) follow this pattern: There are two or more sub-phases, the first of\n  which computes an intermediate result, while the later ones \u201cmassage\u201d\n  this intermediate result. These later sub-phases often default to\n  the identity function. ie: they usually leave the intermediate result\n  alone unless explicitly told to do otherwise by setting properties on\n  the <code>Paint</code>.\n\n  <h5>Path Generation</h5>\n\n  <p>The output of the first phase is a <code>Path</code>.</p>\n\n  <p>This phase has three sub-phases:</p>\n\n  <ol>\n    <li>\n      <p>An initial <code>Path</code> is constructed based on the\n      <code>draw*</code> method that was called. In the case of\n      <code>drawPath</code>, this is simply the <code>Path</code>\n      supplied by the client. In the case of <code>drawOval</code>\n      or <code>drawRect</code>, the output is a <code>Path</code>\n      containing the corresponding primitive.</p>\n    </li>\n\n    <li>\n      <p>If the <code>Paint</code> has a <code>PathEffect</code>,\n      it is used to produce a new path based on the inital\n      <code>Path</code>. The <code>PathEffect</code> is essentially\n      a function that takes a <code>Path</code> as its input and\n      returns a <code>Path</code>.\n\n      <p>If no <code>PathEffect</code> is set then the initial\n      <code>Path</code> is passed on to the next phase unmodified. That\n      is, the default <code>PathEffect</code> is the identity\n      function.</p>\n\n      <p><code>PathEffect</code> implementations include\n      <code>CornerPathEffect</code>, which rounds the corners of the\n      <code>Path</code>, and <code>DashPathEffect</code> which converts\n      the <code>Path</code> into a series of \u201cdashes\u201d.</p>\n\n      <p>One interesting quirk: if the <code>Paint</code> object's style\n      is <code>FILL_AND_STROKE</code> the <code>PathEffect</code> is\n      \u201clied to\u201d and told that it's <code>FILL</code>. This matters\n      because <code>PathEffect</code> implementations may alter their\n      behavior depending on settings in the <code>Paint</code>. For\n      example, <code>DashPathEffect</code> won't do anything if it is\n      told the style is <code>FILL</code>.</p>\n    </li>\n\n    <li>\n      The final sub-phase is \u201cstroking\u201d. If the <code>Paint.Style</code>\n      is <code>Path</code> this does nothing to the <code>Path</code>.\n      If the style is <code>STROKE</code> then a new \u201cstroked\u201d\n      <code>Path</code> is generated. This stroked <code>Path</code> is\n      a <code>Path</code> that encloses the boundary of the input\n      <code>Path</code>, respecting the various stroke properties of the\n      <code>Paint</code> (<code>strokeCap</code>,\n      <code>strokeJoin</code>, <code>strokeMiter</code>,\n      <code>strokeWidth</code>). The idea is that later phases of the pipeline will\n      always fill the Path they are given, and so the stroking process\n      converts Paths into their filled equivalents. If the style is\n      <code>FILL_AND_STROKE</code> the result <code>Path</code> is the stroked\n      <code>Path</code> concatenated to the original <code>Path</code>.\n    </li>\n  </ol>\n\n  <p>The method <code>Paint.getFillPath()</code> can be used to run\n  the later sub-phases of this phase on a <code>Path</code> object. As\n  far as I can tell this is the only significant part of the pipeline\n  that can be run in isolation.</p>\n\n  <!-- TODO: Paint attrs used here -->\n\n  <h5>Rasterization</h5>\n\n  <p>Rasterization is the process of determining the set of pixels that\n  will be drawn to. This is accomplished by generating a \u201cmask\u201d, which\n  is a alpha-channel image. Opaque (<code>0xFF</code>) pixels on this\n  mask indicate areas we want to draw to at \u201cfull strength\u201d, transparent\n  (<code>0x00</code>) areas are areas we don't want to draw to at all,\n  and partially transparent areas will be drawn to at\n  \u201cpartial strength\u201d. This is explained more at the end of the final\n  phase. (When visualizing this process I find that it helps to think of\n  opaque as white and transparent as black.)\n\n  </p>\n\n  <p>Rasterization has two completely different behaviors depending\n  on whether a <code>Rasterizer</code> has been set on the\n  <code>Paint</code>.</p>\n\n  <p>If no <code>Rasterizer</code> has been set then the default\n  rasterization process is used:</p>\n\n  <ol>\n    <li>The <code>Path</code> is scan-converted based on parameters\n    from the <code>Paint</code> (eg: the <code>style</code>\n    property) and the <code>Path</code> (eg: the\n    <code>fillType</code> property) to produce an initial\n    mask.\n\n  <p>Pixels \u201cinside\u201d the <code>Path</code> will become opaque, those \u201c\n  outside\u201d will be left transparent, and those on the boundary may\n  become partially transparent (for anti-aliasing). The mask will end up\n  containing an opaque silhouette of the object.</p>\n\n  <p>The <code>Path</code> object's <code>fillType</code>\n  determines the rule used to determine which pixels are inside\n  versus outside. See <a href=\"http://en.wikipedia.org/wiki/Nonzero-rule\">Wikipedia's article\n  on the non-zero winding rule</a> for a good explanation if these\n  different rules.</p>\n  </li>\n\n    <li>If there is a <code>MaskFilter</code> set, then the initial\n    mask is transformed by the <code>MaskFilter</code>. The\n    <code>MaskFilter</code> is essentially a function that takes a\n    mask (an <code>ALPHA_8</code> <code>Bitmap</code>) as input and\n    returns a mask as output. For example, a\n    <code>BlurMaskFilter</code> will blur the mask image.\n\n  <p>If no <code>MaskFilter</code> is set then the initial mask is\n  passed on to the next phase unmodified. That is, the default\n  <code>MaskFilter</code> is the identity function.</p></li>\n  </ol>\n\n  <p>If a <code>Rasterizer</code> <em>is</em> set on the\n  <code>Paint</code> then, instead of the above two steps, the\n  <code>Rasterizer</code> creates the mask from the\n  <code>Path</code>. The <code>MaskFilter</code> is <em>not</em>\n  invoked after the <code>Rasterizer</code>. (This seems like a\n  bug, but I've verified this behavior experimentally. Romain Guy agreed\n  that this is probably a bug.)</p>\n\n  <p>The only <code>Rasterizer</code> implementation in Android is\n  <code>LayerRasterizer</code>. <code>LayerRasterizer</code> makes it\n  possible\n  to create multiple \u201clayers\u201d, each with its own\n  <code>Paint</code> and offset (translation). This means that when\n  <var>n</var> <code>LayerRasterizer</code> layers are present\n  there are <span class=\"math\"><var>n</var> + 1</span> <code>Paint</code> objects in use: the\n  \u201ctop-level\u201d <code>Paint</code> (passed to the draw* method) and\n  an additional <var>n</var> <code>Paint</code> objects, one for\n  each Layer.</p>\n\n  <p><code>LayerRasterizer</code> takes the <code>Path</code> and\n  for each layer runs the <code>Path</code> through the pipeline of\n  that layer's <code>Paint</code> starting at the\n  <code>PathEffects</code> step and rendering to the mask. This has\n  some interesting consequences:</p>\n\n  <ul>\n    <li>\n      <p>Each layer can have its own <code>PathEffect</code>. These\n      are applied to the <code>Path</code> that was generated by\n      the top-level <code>PathEffect</code> (if one was set). So if\n      the <code>PathEffect</code> of the top-level's\n      <code>Paint</code> is set to a <code>CornerPathEffect</code> and\n      a layer's <code>PathEffect</code> set to\n      <code>DashPathEffect</code> that layer will render a dashed\n      shape with rounded corners.</p>\n    </li>\n\n    <li>\n      <p>Each layer can have its own <code>Rasterizer</code>.\n      Recursive rasterization is recursive.</p>\n    </li>\n\n    <li>\n      <p>Each layer can have its own <code>MaskFilter</code>. This\n      <code>MaskFilter</code> applies to a separate mask in the\n      sub-pipeline. Remember, the entire pipeline is being run\n      again. For example, if there are two layers and one has a\n      <code>BlurMaskFilter</code> the output of the other layer\n      will <em>not</em> be blurred regardless of the order of the\n      layers.</p>\n    </li>\n\n    <li>\n      <p>The destination <code>Bitmap</code> of this sub-pipeline\n      is an alpha bitmap, so only the alpha-channel component of\n      the Shading and Transfer phases have any relevance.</p>\n    </li>\n  </ul>\n\n  <p>Also note that <code>LayerRasterizer</code> does not make use of\n  the <code>MaskFilter</code> in the top-level <code>Paint</code>. Since\n  the top-level <code>MaskFilter</code> is not invoked after invoking\n  the <code>Rasterizer</code>, there is no point in setting a\n  <code>MaskFilter</code> on a <code>Paint</code> if the\n  <code>Rasterizer</code> has been set to a\n  <code>LayerRasterizer</code>. (Perhaps other <code>Rasterizer</code>\n  implementations could make use of the top-level\n  <code>MaskFilter</code>, but <code>LayerRasterizer</code> is the only\n  implementation included with Android.)</p>\n\n  <!-- TODO: Paint attrs used here -->\n\n  <h5>Shading</h5>\n\n  <p>Shading is the process of determining the \u201csource colors\u201d for\n  each pixel. A color (can) consist of alpha, red, green, and blue\n  components (ARGB for short) each of which ranges\n  from 0 to 1. (In reality these are typically represented as bytes from\n  <code>0x00</code> to <code>0xFF</code>.)</p>\n\n  <p>At a high level, the output of the <code>Shader</code> can be\n  thought of as a virtual image containing the source colors: the \u201csource\u201d image.\n  The actual implementation doesn't use a <code>Bitmap</code>, but rather\n  uses a function that maps from\n  <code>(x,y)</code> to an ARGB color (the \u201csource color\u201d) for\n  the given pixel, and this function is only called for coordinates\n  where the corresponding pixal may be altered by the source color. This\n  is really just an optimization, however.</p>\n\n  <p>Like the previous phases, Shading also has two sub-phases:</p>\n\n  <ol>\n    <li>\n      <p>An initial \u201csource\u201d image is generated by the\n      <code>Shader</code>. If no <code>Shader</code> has been set\n      it's as if a <code>Shader</code> that produced a single solid\n      color (the Paint's Color) was used.</p>\n\n      <p>The <code>Shader</code> does not get the mask, the\n      <code>Path</code>, or the destination image as inputs. </p>\n    </li>\n\n    <li>\n      <p>If a <code>ColorFilter</code> has been set then the colors\n      in the source color image are transformed by this\n      <code>ColorFilter</code>.</p>\n\n      <p>The only input to the <code>ColorFilter</code> during the\n      pipeline are ARGB colors. The <code>ColorFilter</code> does not\n      get the mask, the <code>Path</code>, the destination image, or the\n      coordinates of the pixel whose color it is transforming, as inputs.</p>\n    </li>\n  </ol>\n\n  <!-- TODO: Paint attrs used here -->\n\n  <h5>Transfer</h5>\n\n  <p>Transfer is the process of actually transferring color to the\n  destination <code>Bitmap</code>. The transfer phase has the\n  following inputs:</p>\n\n  <ul>\n    <li>\n      <p>The mask generated by Rasterization.</p>\n    </li>\n\n    <li>\n      <p>The \u201csource color\u201d for each pixel as determined by\n      Shading.</p>\n    </li>\n\n    <li>\n      <p>The destination bitmap, which tells us the \u201cdestination\n      color\u201d for each pixel.</p>\n    </li>\n\n    <li>\n      <p>The transfer mode (<code>XferMode</code>).</p>\n    </li>\n  </ul>\n\n  <p>Once again, there are two sub-phases:</p>\n\n  <ol>\n    <li>\n      An intermediate image is generated from the source image and\n      destination image. For each each (x,y) coordinate the corresponding\n      source and destination colors are passed to a function determined by\n      the <code>XferMode</code>. This function takes the source color and\n      destination color and returns the color for the intermediate image's\n      pixel at (x,y).</li>\n\n      <p>Note that the mask is <em>not</em> used in this sub-phase. In\n      particular, the source-alpha comes from the <code>Shader</code>, and\n      the destination alpha comes from the destination image.</p>\n\n      <p>If an <code>XferMode</code> hasn't been set on the\n      <code>Paint</code> then the behavior is as though it was set to\n      <code>PorterDuffXferMode(SRC_OVER)</code>.</p>\n    </li>\n\n    <li>\n      <p>The second sub-phase takes the intermediate image, the\n      destination image, and the mask as inputs and modifies the\n      destination image. It does <em>not</em> use the\n      <code>XferMode</code>.</p>\n\n      <p>The intermediate image is blended with the destination image\n      through the mask. Blending means that each pixel in the\n      destination image will become a weighted average (or equivalently,\n      linear interpolation) of that pixel's original color and the\n      corresponding pixel in the intermediate image. The opacity of the\n      corresponding mask pixel is the weight of the intermediate color,\n      and its transparency is the weight of the original destination\n      color.\n\n      <p>In other words, a pixel that is transparent (<code>0x00</code>)\n      in the mask will be left unaltered in the destination, a pixel\n      that is opaque (<code>0xFF</code>) in the mask will completely\n      overwritten by the corresponding pixel in the intermediate image,\n      and pixels that are partially transparent will result in a\n      destination pixel color that is proportionately between its\n      original color and the color of the corresponding intermediate\n      image pixel.\n    </li>\n  </ol>\n\n  <p>This is the final phase. The pipeline is now complete.\n\n<h5>More on Porter Duff Transfer Modes</h5>\n  <p>The most commonly used transfer modes are instances of\n  <code>PorterDuffXferMode</code>. The behavior of a\n  <code>PorterDuffXferMode</code> is determined by its\n  <code>PorterDuff.Mode</code>. The documentation for each\n  <code>PorterDuff.Mode</code> (except <code>OVERLAY</code>) shows\n  the function that is applied to the source and destination colors\n  to obtain the intermediate color. For example,\n  <code>SRC_OVER</code> is documented as:\n  <pre class=\"code\">[Sa + (1 - Sa)*Da, Rc = Sc + (1 - Sa)*Dc]</pre>\n\n  <p>This means:</p>\n\n<pre class=\"code\">\nRa = Sa + (1 - Sa) * Da\nRr = Sr + (1 - Sa) * Dr\nRg = Sg + (1 - Sa) * Dg\nRb = Sb + (1 - Sa) * Db\n</pre>\n\n  <p>Where <code>R<var>x</var></code>, <code>S<var>x</var></code>, and\n  <code>D<var>x</var></code> are the intermediate (result), source and\n  destination values of the <var>x</var> color component.</p>\n\n  <p>Some additional notes on the <code>PorterDuff.Mode</code>\n  documentation:</p>\n\n  <ul>\n    <li>\n      <p>The documentation uses \u201c<code>Sc</code>\u201d and\n      \u201c<code>Dc</code>\u201d rather than describing each red, green, and\n      blue component separately. This is because Porter Duff\n      transfer modes always treat the non-alpha channels the same\n      way and each of these channels is unaffected by all other\n      channels except for alpha.</p>\n    </li>\n\n    <li>\n      <p><code>SRC_OVER</code> and <code>DST_OVER</code> are the\n      only two modes that have the left hand side of this equation,\n      \u201c<code>Rc</code>\u201d, in their documentation. I'm guessing this\n      inconsistency is a copy-and-paste error.</p>\n    </li>\n\n    <li>\n      <p>The alpha channel is always unaffected by non-alpha\n      channels. That is, <code>Ra</code> is always a function of\n      only <code>Sa</code> and <code>Da</code>.</p>\n    </li>\n\n    <li>\n      <p>The documentation for <code>ADD</code> refers to a\n      \u201c<code>Saturate</code>\u201d function. This is just clamping to\n      the range [0,1]. (I don't know why they use such an odd name\n      for clamping, especially \u201csaturation\u201d usually refers to an\n      entirely unrelated concept when talking about colors.)</p>\n    </li>\n\n    <li>\n      <p>The definition of many of these modes, including\n      <code>OVERLAY</code>, can be found in the <a href=\"http://www.w3.org/TR/2011/WD-SVGCompositing-20110315/#comp-op-property\">SVG Compositing Specification</a>.\n      The Skia code actually links to (an older version of) this\n      document. It has some good diagrams, too.</p>\n    </li>\n  </ul>\n\n\n  <!-- TODO: Paint attrs used here -->\n\n  <h5>References</h5>\n  <ul>\n    <li><a href=\"http://developer.android.com/reference/android/graphics/package-summary.html\">The <code>android.graphics</code> documentation</a>.\n    <li><a href=\"http://stackoverflow.com/questions/4560265/android-edit-bitmap-channels/4632210#4632210\">This answer to \u201cAndroid Edit Bitmap Channels\u201d on Stack Overflow</a>. Seeing this answer motivated me to learn more about how the pipeline actually works.\n    <li><a href=\"http://android.git.kernel.org/?p=platform/frameworks/base.git;a=tree;f=graphics;hb=HEAD\">The Android codebase</a>. Since the documentation was so sparse and there didn't seem to be much information I looked to the source. My initial look stopped short when I realized everything was just a wrapper around \u201cnative\u201d code.\n    <li><a href=\"http://code.google.com/p/skia/wiki/\">Skia documentation</a>, particularly <a href=\"http://code.google.com/p/skia/wiki/SkPaint\"><code>SkPaint</code></a>. Skia is the vast bulk of \u201cnative\u201d (C++) code involved.\n    <li><a href=\"http://stackoverflow.com/questions/5762727/how-do-the-pieces-of-androids-2d-canvas-drawing-pipeline-fit-together\">\u201cStack Overflow: How do the pieces of Android's (2D) Canvas drawing pipeline fit together?\u201d</a>, a question I asked on Stack Overflow. One member of the Android team actually responded, but didn't really provide the details I was looking for.\n    <li><a href=\"http://code.google.com/p/skia/source/browse/#svn%2Ftrunk\">The Skia codebase</a>. The code for <code><a href=\"http://code.google.com/p/skia/source/browse/trunk/src/core/SkCanvas.cpp\">SkCanvas</a>::drawPath</code> is a good place to start.\n    <li><a href=\"http://www.w3.org/TR/2009/WD-SVGCompositing-20090430/#comp-op-property\">SVG Compositing Specification: W3C Working Draft 30 April 2009</a>. This document is mentioned in the Skia code.\n    <li><a href=\"http://www.w3.org/TR/2011/WD-SVGCompositing-20110315/#comp-op-property\"> SVG Compositing Specification: W3C Working Draft 15 March 2011</a>. This document supercedes the one mentioned in the Skia code. I believe the relevant bits still apply, but there's more detailed explanation and some good diagrams.\n  </ul><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/pKCBEtiBHaM\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1305005400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1300594175.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/e5acad51d5204c1d", 
                "categories": [], 
                "title": "What's good for the Twitter is good for the Apple", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/qEwE9u7Lazo/whats-good-for-twitter-is-good-for.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1300586700000000.0", 
                "content": {
                    "content": "<p>A lot of people have been <a href=\"http://gigaom.com/2011/03/12/why-twitter-should-think-twice-about-bulldozing-the-ecosystem/\">talking about Twitter's recent stance on third-party apps</a>. I think <a href=\"http://radar.oreilly.com/2011/03/twitter-developers.html\">Mike Loukides of O'Reilly really hits the nail on the head</a>:\n\n<blockquote>\n...you can't tell people where (or how) to innovate, and where not to. Innovation just doesn't work that way. The best way to prevent \"think big\" innovation from happening is to cut off the small ideas.\n</blockquote>\n\n<p>Even <a href=\"http://daringfireball.net/linked/2011/03/16/ingram-twitter\">John Gruber, unabashed Apple fanboy, agrees</a>:\n\n<blockquote>\nIt\u2019s not that I think Twitter is wrong in any moral sense to do whatever they want with their own API \u2014 it\u2019s that I think they\u2019d be foolish to do anything that dampens the diverse ecosystem of client software that has evolved around Twitter. They\u2019re acting against their own self-interest, but apparently don\u2019t realize it.\n</blockquote>\n\n<p>Whether it's \"moral\" or not is open to debate. There does, however, seem to be general consensus that the changes in Twitter's policies are bad for developers, bad for users and in the long term bad for Twitter.\n\n<p>The general form of the argument, which I wholeheartedly agree with, goes like this:\n<ol>\n<li>Artificially restricting developers hurts innovation. (See Loukides's quote, above.)\n<li>Hurting innovation hurts users.\n<li>Hurting users hurts the platform creator.\n</ol>\n\n<p>These can be long term things, which makes them hard to measure. You can't just change your policy and see the effects overnight. For example, it might have taken years before a particular sort of ground-breaking third-party product would appear on a restriction-free platform, so in the short term having restrictions that forbid its existence might not appear to have significant detrimental effects. Likewise, most users won't miss the utility of a product they don't know exists, or even can exist. It generally takes a competing, less restricted, platform to come along before people really start to realize what they're missing. This is further slowed down by network effects.\n\n<p>What's interesting is that this exact same chain of reasoning also applies to Apple and their App Store policies. Just as Twitter API clients should not \"compete\" with the official Twitter clients, apps for iOS are not allowed to compete with Apple products (or even other established iOS apps, to a degree). The iOS policies are actually far more restrictive on innovation than Twitter's policies, as the iOS policies largely forbid using Apple's APIs in any way that Steve Jobs didn't already imagine. \"Think Different\", indeed. (As an aside, I think Gruber is at least partially aware of the similarity, or he wouldn't have so carefully prefaced his statement with \"It\u2019s not that I think Twitter is wrong in any moral sense\".)\n\n<p>The parallels run even deeper. Even people who have come out in Twitter's defense on this issue often point out that Twitter's platform was in many ways built by the Twitter community (hash-tags and at-replies were being used by users before Twitter even had special support for them) and the large variety of Twitter clients also contributed to Twitter's success. For Twitter to suddenly institute draconian policies seems like a betrayal to some.\n\n<p>If Twitter betrayed their users by being open at first and then closing up once they achieved popularity then Apple is just as guilty. Apple's trick was to stretch things out over a much longer time frame. Historically, Apple hardware was touted as being quite open. The Apple IIe was easily hackable both in a software and hardware sense. Apple's products weren't marketed as the \"computer for the rest of us\" just because they were easier or prettier than the competition, but also because they purportedly made it easier to create all sorts of things, including visual art, music and even computer programs. (I say \"purportedly\" because the Amiga and Atari ST were arguably just as good if not better when it came to certain sorts of creative work.) Remember Hypercard? A third-party equivalent to HyperCard wouldn't even be allowed given the current iOS App Store policies.\n\n<p>One last thing to note is <a href=\"https://groups.google.com/group/twitter-development-talk/browse_thread/thread/c82cd59c7a87216a\">Twitter's stated reason for the policy change</a>: \n\n<blockquote>\nIf there are too many ways to use Twitter that are inconsistent with one another, we risk diffusing the user experience.\n</blockquote>\n\n<p>Hmmm, sounds like they're worried about \"fragmentation\".<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/qEwE9u7Lazo\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1300586700.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1292731767.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/b5544e11e661411e", 
                "categories": [], 
                "title": "PayPal stupidity", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/44TG_Nql7vA/paypal-stupidity.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1292723580000000.0", 
                "content": {
                    "content": "<p>It seems that every year, while doing my Christmas shopping for relatives in Canada, I discover another major e-commerce site that doesn't understand that billing addresses and shipping addresses aren't necessarily in the same country.\n\n<p>This year I was surprised to discover that PayPal, who you would think would have a clue, doesn't let you set a shipping address outside of your account's country. I was attempting to order an item from a Canadian website to be shipped to a Canadian address but because my PayPal account is a US account it will only let me create US shipping addresses.\n\n<p>This issue isn't unknown to  PayPal, either, as evidenced by the <a href=\"https://www.paypal-community.com/t5/How-to-use-PayPal/adding-a-shipping-address-in-canada/td-p/150\">\"adding a shipping address in canada\"</a> and the <a href=\"https://www.paypal-community.com/t5/My-account-settings/How-do-I-use-a-foreign-address/td-p/38056\">\"How do I use a foreign address?\"</a> threads on the PayPal's Community Help forums. This appears to be the official response:\n\n<blockquote>It is not possible to add an foreign address to your PayPal account within PayPal. You can open a new account with your Canadian address and Canadian financial information.\n</blockquote>\n\n<p>Given that this appeared to be my only available  option  I decided to try and set up a Canadian PayPal account.  This required that I come up with a new e-mail address for the account, since PayPal uses a single namespace for all accounts (arguably the right thing to do, but it doesn't interact well with the boneheaded policy of requiring a separate account for each  country). Luckily I have an unlimited supply of  e-mail addresses.\n\nThe sign-up process then wants you to enter banking or credit card information. Of course, they are restricted to the country that you have selected, in my case Canada. I do not have a Canadian bank account or credit card (anymore). I was about to give up, but then I realized that I could just click on \u201cmy account\u201d and bypass this step entirely. To complete my purchase I then:\n\n<ol>\n<li> Attempted to purchase with the merchant. This was just to find out the exact amount I was going to  be charged.\n<li> Transferred funds from my US PayPal account to my Canadian PayPal account by \u201csending money\u201d to myself. Having a second browser open was useful for this step. Thankfully, I was able to choose which currency to use in my US PayPal account so I didn't need to do any currency conversions by hand.\n<li> Waited several minutes for the funds to show up in my Canadian PayPal account.\n<li> Actually purchased the item from the merchant.\n</ol>\n\n<p>A few minutes (!)  after purchasing the item PayPal actually called me on the phone. They wanted to make sure that I \"still had control of my account\", referring to the new account I had just created. I told him I did, and then I mentioned the annoyance of having to create a second account just so I could ship to another country.   They confirmed that what I did was basically the only option, and said the reason for this is to make sure that each account complies with the laws of the country that it is  associated with. This seems bogus. I could <em>maybe</em> understand only allowing banking information from a single country per account, but there's no good reason to put the same restriction on shipping information. PayPal does nothing with the shipping information except pass it along to the seller.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/44TG_Nql7vA\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1292723580.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1284105068.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/05e35a65ccc94bb1", 
                "categories": [], 
                "title": "iOS Developer Agreement: Too Little Too Late", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/p9ABXoEZaUg/ios-developer-agreement-too-little-too.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1284086220000000.0", 
                "content": {
                    "content": "<p>It looks like Apple might be regaining some of their sanity given the\nrecent update to the iOS  developer agreement.\n\n<h5>Compilers</h5>\n\n<p>Section 3.3.1 has been updated to only restrict the use of private\nAPIs. This is a perfectly reasonable restriction. The clause which\nstated that \u201capplications must be originally written in Objective-C\u201d (in\nmy mind, the most offensive part of the iOS developer agreement) has\nbeen removed. I'm very glad to see it's gone.\n\n<h5>Interpreters</h5>\n\n<p>They also updated section 3.3.2, the \u201cno interpreters\u201d section. The\nlanguage has changed but the meaning apparently hasn't:\n\n<blockquote>\nAn Application may not download or install executable code. Interpreted\ncode may only be used in an Application if all scripts, code and\ninterpreters are packaged in the Application and not downloaded. The\nonly exception to the foregoing is scripts and code downloaded and run\nby Apple\u2019s built-in WebKit framework.\n</blockquote>\n\n<p>The old version of this rule was confusing and unclear, and the new\nversion, despite being less verbose, still leaves a lot open to\ninterpretation. For starters,  what does \u201cinstall\u201d mean in this context?\nIf the user of the app manually constructs the executable code, is that\nallowed or not?\n\n<p>The definition of \u201cexecutable code\u201d isn't entirely clear either. My\ninclination is to assume that this means a Turing complete language, but\none could argue that there are even non-Turing complete languages that\ncount as \u201cexecutable code\u201d. For example, I wonder if an iOS port of the\nclassic 8-bit educational game <a href=\"http://en.wikipedia.org/wiki/Rocky's_Boots\"> Rocky's Boots</a>\nwould run afoul of this rule. In the game you would construct machines\nout of various bits including Boolean logic gates and then use these\nmachines to solve various puzzles. \u201cRunning\u201d the machines in the game\nrequires the interpreting of executable code.\n\n<p>Either way, the restrictions imposed by this section probably don't\naffect as many developers as the old 3.3.1 restrictions did. However, in\nsome ways this rule is actually worse. The old 3.3.1 only restricted how\none could build apps but it didn't really limit the types of apps that\none could build. The no interpreters rule, however, actually makes it\nimpossible to implement several classes of useful software on the iOS\nplatform, including:\n\n<ul>\n<li> Web browsers that interpret JavaScript on the client.\n<li> Emulators of legacy platforms, like 8-bit computers or old game consoles, that allow the user to run their existing software (e.g.: game ROMs, etc.).\n<li> Educational development tools like <a href=\"http://computinged.wordpress.com/2010/04/15/apple-removes-scratch-from-ipadiphoneitouch/\">Scratch</a>.\n<li> Mathematics software like Mathematica or Maple.\n<li> Electronic circuit simulators.\n<li> PostScript or TeX viewers (both are Turing complete languages).\n</ul>\n\nApple implies that the reason for this rule is \u201csecurity\u201d:\n\n<blockquote>\nIn particular, we are relaxing all restrictions on the development tools\nused to create iOS apps, as long as the resulting apps do not download\nany code. This should give developers the flexibility they want,\n<strong>while preserving the security we need</strong>. [emphasis mine]\n</blockquote>\n\n\n<p>It's a pretty sad to see Apple is falling back on \u201csecurity\u201d as an\nexcuse for limiting what customers can do with the products that they\npurchased. This is the same thing Sony did a few months ago when they\nremoved \u201cinstall other OS\u201d  (an advertised feature) from the PlayStation\n3. In Sony's case the security issue had to do with their DRM. In other\nwords, it wasn't a customer's security they were concerned for, but\ntheir profit's. One has to wonder if Apple has similar motives.  An\ninterpreter acts as a sandbox, so un-trusted code execution there is\ngenerally not as big a deal as arbitrary native code execution, as might\nresult from <a href=\"http://digdog.tumblr.com/post/894317027/jailbreak-with-pdf-flatedecode-filter\">a\nbuffer overflow or similar bug in native code</a>.  Last I checked,\nApple wasn't prohibiting string manipulation in native apps.\n\n<h5>Analytics</h5> <p>Like 3.3.1, section 3.3.9, the privacy and\nanalytics section, has also changed for the better. The language that\nspecifically forbade Google's AdMob is gone, meaning developers can\ndecide which advertising platform to use.\n\n<h5>Why?</h5>\n\n<p>Apple says in their announcement:\n\n<blockquote>\nWe have listened to our developers and taken much of their feedback to\nheart. Based on their input, today we are making some important changes\nto our iOS Developer Program license in sections 3.3.1, 3.3.2 and 3.3.9\nto relax some restrictions we put in place earlier this year.\n</blockquote>\n\n<p>Apple clearly didn't anticipate the backlash that would be caused by\n3.3.1 when the \u201coriginally in Objective-C\u201d clause was added. Not only\nwere developers angered by that rule, but since its addition, people\nhave been looking much more closely at what's in the developer\nagreement. Apple doesn't want this scrutiny as it brings to light\nalready existing ridiculous rules, like 3.3.2, and makes people more\nlikely to question Apple's motives when new rules are introduced, like\n3.3.9. It also made many developers (and tech savvy users) who liked\nApple (myself included) re-evaluate whether this was really a company\nthey wanted to purchase products from or develop for.\n\n<p>I think there's also a possibility that the recent changes to 3.3.9 were made in order to avoid legal  issues.\n\n<p>Neither of these are really great reasons for Apple to change their\nbehavior. I think Steve Jobs preferred the older set of rules, but it\nbecame clear that developers, and potentially even the law, wouldn't\nstand for them.\n\n<h5>To iOS or not to iOS</h5>\n\n<p>The current developer agreement is a lot closer in meaning to the\npre-iPad developer agreement. Back when the iPad came out I had\nconsidered getting one so that I could experiment with  developing for\niOS. I gave up on that plan when the \u201coriginally in Objective-C\u201d rule\nwas added. So now that the rules are pretty much back where they were,\nam I going to get an iOS device?\n\n<p>Probably not. Apple has lost my trust, and in order to win it back\nthey'll have to do more than just change things back to the way they\nwere. For starters, I'd like to see them make a rule for themselves that\nthe developer agreement will apply not just to third-party developers,\nbut also to Apple's own iOS apps. For existing Apple apps that violate\nthe rules they can then choose to revise the agreement for everyone, fix\nthe app, remove the app. Apple already has an advantage over\nthird-party developers, so for them to impose rules whose only apparent\npurpose is to strengthen Apple's advantage over third-party developers\nis reprehensible.  I'm looking at you Safari.\n\n<p>Better yet would be to make it possible for people to distribute native\niOS apps without going through the App Store. I'd care a lot less about\nthe App Store policies are if there were other ways to get apps on\niDevices. I'm fine with this being a setting users need to enable (as it\nis on Android devices), but requiring that the user \"jailbreak\" their\ndevice to get such basic functionality is not acceptable.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/p9ABXoEZaUg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1284086220.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1271405934.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/ed6c2554987b4a11", 
                "categories": [], 
                "title": "Steve Jobs and iPhone Developer Agreement Section 3.3.1", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/PzqqZthnmIg/steve-jobs-and-iphone-developer.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1271212860000000.0", 
                "content": {
                    "content": "<p>On reading <a href=\"http://www.taoeffect.com/blog/2010/04/steve-jobs-response-on-section-3-3-1/\">Steve Jobs\u2019s response on Section 3.3.1</a>, there are two things that struck me:\n\n<p>First, like <a href=\"http://daringfireball.net/2010/04/why_apple_changed_section_331\">John Gruber</a>, he doesn't seem to understand the implications of the new text in section 3.3.1. In particular, it says:\n\n<blockquote>\nApplications must be originally written in Objective-C, C, C++, or JavaScript as executed by the iPhone OS WebKit engine...\n</blockquote>\n\n<p><strong>This does not prohibit the use of cross-platform toolkits</strong>, which is what he seems to think it does. There are many cross platform toolkits that are written in C and C++. What it does prevent (as I mentioned in <a href=\"http://www.xenomachina.com/2010/04/iquality.html\">my post yesterday</a>) is using other <em>languages</em>, something Jobs's argument completely ignores. That he wouldn't understand what the the text of this section actually means is pretty disturbing.\n\n<p>The other thing that struck me is his reason for wanting to keep cross-platform toolkits off of the iPhone OS. He's afraid that cross platform toolkits will make it easier to write apps that exist on both iPhone OS and competing platforms, and that <strong>if the same apps exist on other platforms people won't have a reason to purchase iPhone OS products</strong>. This suggests a lack of faith in the technology of the iPhone OS platform.\n\n<p>With the changes Apple has made to section 3.3.1 they are setting a very bad precedent. People have complained about the behavior of other platform owners in the past, including IBM, Microsoft, and the various game console manufacturers, for imposing all sorts of nasty restrictions on developers, but none of them have ever gone as far as to forbid the use of either toolkits or source-to-source translation. That Apple would do this suggests to me both a lack of respect for developers (and hence, a failure to understand that without third party developers a platform is basically worthless), and also a lack of faith in their own platform's merits.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/PzqqZthnmIg\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1271212860.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1271126915.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/7eae0aed16c14f3b", 
                "categories": [], 
                "title": "iQuality\u2122", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/rhpp-oxzwvk/iquality.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1271123100000000.0", 
                "content": {
                    "content": "<p>iPhone/iPad app developers:\n<ul>\n<li>Pay $99 for the privilege to improve Apple's platform by developing new apps for it.</li>\n<li>Have only one option for distributing their software, which involves paying Apple 30% of their revenue.</li>\n<li>Risk having their apps disapproved after the app has already been developed. Reasons for disapproval include:\n<ul>\n<li><a href=\"http://techcrunch.com/2009/07/27/apple-is-growing-rotten-to-the-core-and-its-likely-atts-fault/\">Having functionality that overlaps with existing or future Apple products.</a></li>\n<li><a href=\"http://www.joystiq.com/2009/09/08/iphone-commodore-64-app-removed-from-app-store/\">Including an interpreter of any sort as part of the app.</a></li>\n</ul>\n<p>Note that initial approval doesn't mean you won't <a href=\"http://www.mobilecrunch.com/2009/08/03/apple-bans-app-stores-3rd-most-prolific-developer/\">get pulled from the App Store later on because Apple decided to change the rules</a>.</p>\n</li>\n<li>And now, due to Apple's recent changes to section 3.3.1 of the iPhone developer agreement, developers must use an Apple prescribed programming language: Objective-C, C or C++. This new rule means that <a href=\"http://lambda-the-ultimate.org/node/3905\">you can't even use a compiler that emits one of the allowed languages</a>.</li>\n</ul>\n<p><img align=\"right\" alt=\"\" border=\"0\" src=\"http://xenomachina.com/images/JobsSealOfQuality.png\" />Apple apologists often claim that these hurdles improve the user experience by acting as a sort of quality control. Sometimes a comparison to the \"<a href=\"http://en.wikipedia.org/wiki/Nintendo\">Nintendo Seal of Quality</a>\" is made.</p>\n<p>The Nintendo Seal of Quality was developed by Nintendo in the 80's as a response to the \"<a href=\"http://en.wikipedia.org/wiki/North_American_video_game_crash_of_1983\">video game crash</a>\" that happened earlier that decade. One of the reasons for the crash was a glut of crappy games that made people wary of buying games in general, and eventually lead to the (albeit, prolonged) death of Atari and much of the video game industry at the time.</p>\n<p>A recent example of this sort of argument was <a href=\"http://daringfireball.net/2010/04/why_apple_changed_section_331\">John Gruber's Daring Fireball post on the change to section 3.3.1 of the iPhone developer agreement</a>. In it he says:</p>\n<blockquote>On the one side, this rule should be good for quality. Cross-platform software toolkits have never \u2014 ever \u2014 produced top-notch native apps for Apple platforms. Not for the classic Mac OS, not for Mac OS X, and not for iPhone OS. Such apps generally have been downright crummy.\n<p>...</p>\n<p>The iPhone OS Kindle app is excellent, a worthy rival in terms of experience to Apple\u2019s own iBooks. The Mac Kindle app is a turd that doesn\u2019t look, feel, or behave like a real Mac app. The iPhone OS Kindle app is a native iPhone app, written in Cocoa Touch. The Mac Kindle app was produced using the cross-platform Qt toolkit.</p>\n</blockquote>\n<p>There are a few serious flaws with his reasoning here.</p>\n<p>First of all, there's the question of whether cross-platform toolkits have ever produced top-notch native apps for Apple platforms. (The \"for Apple platforms\" qualifier here seems superfluous to me, but I'll let it go.) He claims that they never have, but I doubt that he has actually performed a exhaustive survey of software for Apple platforms to determine this.</p>\n<p>Virtually all software with a graphical user interface that exists on more than one platform makes use of some sort of cross-platform toolkit. While it's easy to spot a badly ported application, applications that have been ported properly are indistinguishable from ones that were written \"natively\". It wouldn't surprise me at all if a number of the \"top-notch apps\" Gruber uses actually do use a cross-platform toolkit without his knowledge.</p>\n<p>In fact, Firefox is built using <a href=\"https://developer.mozilla.org/en/XPCOM\">XPCOM</a>, a cross-platform toolkit (the \"XP\" actually stands of \"cross-platform\"). One could even argue that <a href=\"http://webkit.org/\">WebKit</a> is a cross-platform toolkit as well (though it's specific to HTML rendering, rather than being a general GUI toolkit). So if Gruber is right then none of Safari, Google Chrome, or Firefox are \"top-notch native apps\".</p>\n<p>But for the sake of argument, let's say Gruber is right and that cross-platform toolkits really have never produced top-notch native apps for any Apple platform. It doesn't matter, because the \"cross-platform toolkits\" argument is a complete red herring. Take a close look at the text of section 3.3.1:</p>\n<blockquote>Applications must be originally written in Objective-C, C, C++, or JavaScript as executed by the iPhone OS WebKit engine, and only code written in C, C++, and Objective-C may compile and directly link against the Documented APIs (e.g., Applications that link to Documented APIs through an intermediary translation or compatibility layer or tool are prohibited).</blockquote>\n<p><strong>There's no talk about toolkits here &mdash; it's talking about <em>languages</em></strong>. There is nothing about this rule that prevents you from using a cross-platform toolkit <em>provided that it's in Objective-C, C, or C++</em>. Qt is a C++ toolkit, so if it weren't for the fact that it relies on a pre-processor (which is unusual for cross-platform GUI toolkits) then there's nothing about section 3.3.1 that says you couldn't port a QT app, like the Kindle application, to the iPhone OS.</p>\n<p>Some of the things section 3.3.1 actually <em>will</em> prevent are:</p>\n<ul>\n<li>Writing apps in other languages that teams may be more proficient in (Lisp, OCaml, Erlang, Scala, Python, Ruby, Java C#) <em>even if C, C++ or Objective-C is used as an intermediate step</em>.</li>\n<li>Hand-coding inner loops in assembly code (a common practice in games).</li>\n<li>Using domain-specific languages for specific tasks. For example:\n<ul>\n<li>Using Lex, YACC, <a href=\"http://www.antlr.org/\">ANTLR</a> or any other compile time parser generator. (for example: to produce a parser for parsing data fetched from the web)</li>\n<li>Using a compile-time template engine. (for example: to generate HTML for emails)</li>\n<li>Using <a href=\"http://www.gnu.org/software/gperf/\">gperf</a> for perfect hashing.</li>\n</ul>\n</li>\n<li>Using code transformation tools. For example:\n<ul>\n<li>Internationalization tools that perform build-time string extraction and reinsertion.</li>\n<li>Macro processors like <a href=\"http://en.wikipedia.org/wiki/M4_%28computer_language%29\">m4</a>.</li>\n</ul>\n</li>\n<li>Using existing libraries written in other languages. For example, many numerical libraries are written in Fortran.</li>\n</ul>\n<p>As a software engineer, I'd be very surprised if any of the above had a correlation with lower quality applications. On the contrary, it tends to be the more proficient software developers that use a wider variety of tools, including ones like those listed above. (Luckily, actually identifying apps that violate this policy would be very hard, if not impossible, without the source code. If it weren't for this fact, we'd likely see a number of existing apps get pulled off of the store.)</p>\n<p>Other App Store policies have similar problems. For example, it seems extremely unlikely that containing an interpreter is positively correlated with low quality. Instead, the no interpreters rule locks out a certain class of app. You cannot have a <a href=\"http://tsdgeos.blogspot.com/2008/02/postscript-is-turing-complete.html\">PostScript</a> or <a href=\"http://en.wikipedia.org/wiki/TeX\">TeX</a> viewer without an interpreter, for example. Emulators for old machines are also affected. (Technically an emulator <em>is</em> an interpreter, though Apple seems to allow emulators as long as they don't let the user supply new code to be emulated/interpreted.) Even Safari runs afoul of this rule given that it includes a JavaScript interpreter, but of course Apple doesn't need to follow their own rules.</p>\n<p>But never mind what I think. Even if the intent behind these policies was to keep low quality apps out of the App Store (which is hard to believe) the fact that the App Store is full of crappy apps is evidence enough that they've failed in this regard. These policies don't work to keep low quality apps out. The various high profile examples of apps that have been either disallowed, left in review limbo or lobotomized also speak strongly against the notion that Apple's policies have anything to do with improving things for their users.</p>\n<p>So to sum up:</p>\n<ul>\n<li>Many of Apple's policies don't appear to have been designed to improve quality.</li>\n<li>If they were designed to improve quality, the large number of garbage apps on the App Store make it clear that they aren't really working.</li>\n</ul><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/rhpp-oxzwvk\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1271123100.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1252825824.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/4ed690b4217948cf", 
                "categories": [], 
                "title": "AT&amp;T Wireless: getting off to a bad start", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/GwOB5hzMzHQ/at-wireless-getting-off-to-bad-start.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1252822320000000.0", 
                "content": {
                    "content": "<p>I have an unlocked Android (G1) phone. Miranda would like an iPhone, so we've decided to switch to AT&amp;T. She can get her iPhone and I'll put a SIM card into my Android phone.  (I'm okay with 3G not working on the Android.)\n\n<p>My initial thought was to get a free phone from AT&amp;T,  But then it occurred to me that this would use up my phone subsidy for two years. I tried adding a second line to a family plan on AT&amp;T's website and then removing the phone, but it wouldn't let me complete the order.  I decided to chat with their customer support. Here's the conversation I just had with them:\n\n<blockquote>\n<br />\u25b6Thank you for your patience! An AT&amp;T sales representative will be with you shortly.\n<br />\u25b6You are now chatting with Tiffany, an AT&amp;T sales representative.\n<br /><b>Tiffany</b>: Hello, Laurence.\n<br /><b>Tiffany</b>: Welcome to AT&amp;T online Sales support.  How may I assist you with placing your order today?\n<br /><b>Laurence</b>: I want to get a family plan with 2 lines, but only want one phone, as I already have an unlocked GSM phone that I would like to use.\n<br /><b>Laurence</b>: Is there a way to do that?\n<br /><b>Tiffany</b>: I will be glad to assist you.\n<br /><b>Tiffany</b>: You may order a free phone so that you can  get the SIM Card from that phone.\n<br /><b>Laurence</b>: Im thinking about if the phone I'm using breaks or something, I'd probably rather get a better phone than just using the free phone. By getting the free phone I'm essentially locking myself out of a subsidized phone for 2 years though, right?\n<br /><b>Laurence</b>: (It also seems like a waste to get a phone I'll never actually use.)\n<br /><b>Tiffany</b>: If you would like, you may purchase a SIM Card in the store for $25, but once you sign the contract, it will be 2 years before a upgrade discount is given.\n<br /><b>Laurence</b>: I have to wait 2 years to get a subsidized phone even if I don't get any phone to begin with?\n<br /><b>Tiffany</b>: Yes, since the terms are for two years.\n<br /><b>Laurence</b>: So there isn't any way to get the contract, but hold off on getting a phone until later unless I want to either wait 2 years, or pay the full, unsubsidized, price?\n<br /><b>Tiffany</b>: You may set the line up online as a individual plan, then when the phone arrives, you may merge the lines in the store as a family plan and inquire on later getting a phone at a discounted price if you are not purchasing a phone at the time.\n<br /><b>Laurence</b>: I'm a bit confused.\n<br /><b>Laurence</b>: Let's pretend I was just getting an individual plan.\n<br /><b>Laurence</b>: Is there a way I could get an individual plan with just a SIM card (no phone), and then a few months later get a phone at the same price as if I'd gotten it when I got the plan?\n<br /><b>Tiffany</b>: The SIM Card will provide you with service, the service is for two years, it is not necessarily the phone, it is the contract that you are agreeing to which determines your discounts on the phones.\n<br /><b>Tiffany</b>: You term will still be 2 years, making it that amount of time to upgrade to a new phone for a discount.\n<br /><b>Laurence</b>: I understand that. I'm just surprised that I have to use the discount at the beginning of the contract or I lose it.\n<br /><b>Tiffany</b>: I do understand.\n<br /><b>Tiffany</b>: I do recommend that you visit your local AT&amp;T Store to inquire on the procedure of using it at a later time.\n<br /><b>Laurence</b>: Ok, I'll try that. Thanks.\n<br /><b>Tiffany</b>: It was my pleasure, may I be of further assistance today?\n<br /><b>Laurence</b>: No, that's all I wanted to ask about.\n</blockquote>\n\n<p>The part that's especially ridiculous to me is that AT&amp;T is essentially forcing me to waste <em>their</em> money. If they would let me save my subsidized phone discount for later, chances are I wouldn't even use it. Instead they're telling me I <em>have</em> to use it now, which means I definitely will and on a phone that I'm not even going to use. I don't even want to think about what that $25 charge for a SIM card that Tiffany mentioned is about.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/GwOB5hzMzHQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1252822320.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1216860738.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/5cfa9ca1e3b44998", 
                "categories": [], 
                "title": "GXP Now Open Source", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/Nqz_mdvHUQU/gxp-now-open-source.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1216859400000000.0", 
                "content": {
                    "content": "<a href=\"http://gxp.googlecode.com/\">Google XML Pages (GXP)</a> is now open source! See  <a href=\"http://google-opensource.blogspot.com/2008/07/google-xml-pages-functional-markup.html\">the announcement on the Google Open Source Blog</a> for more info.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/Nqz_mdvHUQU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1216859400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1216647448.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/337274d087d94127", 
                "categories": [], 
                "title": "Speaking at OSCON 2008", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/NFlUS6La504/speaking-at-oscon-2008.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1216437060000000.0", 
                "content": {
                    "content": "<a href=\"http://conferences.oreilly.com/oscon\">\n<img align=\"right\" alt=\"OSCON 2008\" border=\"0\" height=\"125\" src=\"http://assets.en.oreilly.com/1/event/12/oscon2008_banner_125x125.gif\" title=\"OSCON 2008\" width=\"125\" />\n</a>\nI'll be speaking at O'Reilly's Open Source Convention (OSCON) next week about <a href=\"http://en.oreilly.com/oscon2008/public/schedule/detail/3501\">Google XML Pages</a>. GXP is an XML-based templating system that I originally built almost 7 years ago, and have been working on (mostly 20%-time) since then. It's hard to believe, but it's finally being open-sourced.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/NFlUS6La504\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1216437060.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1204246940.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/f7923afa00ac4f39", 
                "categories": [], 
                "title": "UI Design in Sunshine", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/1El4RmqGbgY/ui-design-in-sunshine.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1204245360000000.0", 
                "content": {
                    "content": "<p>I just saw <a href=\"http://www.imdb.com/title/tt0448134/\">Sunshine</a>, and while going through the extras I was pleasantly surprised by this short video about the design of the user interfaces on board the ship in the movie. The whole video is pretty interesting, but the part that made me literally laugh out loud starts just after 1:47.\n\n<p align=\"center\"><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/1El4RmqGbgY\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1204245360.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1201013326.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/950f86fbe6634864", 
                "categories": [], 
                "title": "Flickr Photo Page Bookmarklet", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/oBb6tdm4EEQ/flickr-photo-page-bookmarklet.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1201007760000000.0", 
                "content": {
                    "content": "<p>Occasionally I come across images that are hosted by <a href=\"http://www.flickr.com/\">Flickr</a>, but which don't have a link back to the photo page on Flickr. This seems to be especially common on message boards and image bookmarking sites like <a href=\"http://ffffound.com/\">FFFFound</a>. Being able to get to the Flickr photo page is nice for a number of reasons: you can see other photos by the same author, see the metadata, notes, comments, others sizes, etc.\n\n<p>A Flickr photo URL looks something like this:\n\n<pre class=\"code\">  http://farm2.static.flickr.com/1407/1085850486_23589455e2.jpg</pre>\n\n<p>Flickr <a href=\"http://www.flickr.com/services/api/misc.urls.html\">has some nice documentation for their URLs</a>. The URL above is of the form <code>http://farm<var>farm-id</var>.static.flickr.com/<var>server-id</var>/<var>id</var>_<var>secret</var>.jpg</code>, so the photo ID is 1085850486 and the \"secret\" is 23589455e2. It's possible to find the photo page by using <a href=\"http://www.flickr.com/services/api/explore/?method=flickr.photos.getInfo\">Flicker's API call  \"flickr.photos.getInfo\"</a>, which returns XML containing the photo ID. That's tedious, and won't work in a bookmarklet.\n\n<p>Some more searching turned up the <code>http://flickr.com/photo.gne?id=<var>id</var></code> URL. I can't find any official documentation for this, only <a href=\"http://www.flickr.com/help/forum/41252/\">some posts in the Flick help forums</a>. It appears to work though, and it wasn't too hard to turn it into a bookmarklet.\n\n<p>To install the bookmarklet, just drag the following link to your bookmarks or toolbar.\n\n<p><a href=\"\">[Flickr photo page]</a>\n\n<p>To use the bookmarklet, first make sure that the photo is the only thing open in the browser tab/window. In other words, the URL in the address bar should be for the .jpg hosted on flickr.com. If the photo is embedded in a page you'll generally need to select \"View Image\" (or equivalent) from the context menu. (FFFFound is an exception: it caches the images, so you'll instead need to click on the image to be taken to the original) One you're on the image, just click the bookmarklet to be sent to the Flickr photo page.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/oBb6tdm4EEQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1201007760.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1184249796.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/9932e6458ea04be3", 
                "categories": [], 
                "title": "Rant: Bad Internationalization", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/wZxs84EmBNs/bad-internationalization.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1184249340000000.0", 
                "content": {
                    "content": "<p>A lot of websites don't seem to \"get\" the fact that the Internet is <em>international</em>. I'm not talking about things like being translated into multiple languages or outputting content in UTF-8 (in this post). What really annoys me are sites that seem to actually go out of their way to make life difficult for international users and/or customers.\n\n<p>Credit cards have the nice property that they work internationally. If someone accepts Visa or Mastercard they'll normally accept those cards no matter what country the cards originate in or what currency the account is in. Currency conversion is handled automatically by the credit card issuing bank. A number of websites seem to be incapable of dealing with this properly, however.\n\n<h2>Air Canada</h2>\n<p>An example I recently encountered is Air Canada's website. I was going to purchase some plane tickets for some family in Canada. After going through the ordeal of finding flights that met the various constraints I got to the payment page. I then entered my credit card number and most of my billing address only to find that \"United States\" wasn't in the country selector. \"Is it listed as America? USA?\" I thought to myself. Nope. It just wasn't there.\n\n<p>After a few minutes of trying to figure out what was up I noticed a paragraph in the sidebar that helpfully pointed out that the United States, as well as a handful of other countries, had been <em>intentionally left out of the available options</em> based on the country selection I had (apparently) made when I first visited the site. The only rationale I can think of for this is that it's a way to charge customers in different countries different prices. Blech.\n\n<h2>Dell</h2>\n<p>Another incident happened back around Christmas. I was going to order a present for my father, who lives in Canada, from Dell. I first tried using <code>dell.com</code>, but it wouldn't let me ship to Canada. I then tried <code>dell.ca</code>, but the billing page had the country field hard-coded to Canada. My US-based credit card wasn't going to work.\n\n<p>After failing with both websites, I decided to try and get in touch with a human. \"I'll just call the number on <code>dell.ca</code>\", I thought. The number is 1-800-WWW-DELL (phone over HTTP?), and it's the same number on <code>dell.com</code>. Calling the number from the US connected me to Dell US, not Dell Canada, and they wouldn't ship to Canada. I asked if they could connect me to Dell Canada, and the sales person suggested that I just have the present delivered to myself, in California, and then I could ship it to Canada myself.\n\n<p>This idea is all kinds of terrible because it would mean more work on my part, be more expensive, take longer for the gift to arrive, and it'll also mean that the recipient would have have to pay GST -- not a very nice Christmas present. (GST is a tax applied to items as they cross into Canada.) By ordering from Dell Canada I could pay the GST, rather than the recipient having to pay it, the shipping would be direct (and presumably from a warehouse in Canada), and would be included in the price.\n\n<p>Eventually I was able to convince the Dell US salesperson to give me a real phone number for Dell Canada sales, and I was able to order the gift. Still, this would've been far less painless if <code>dell.ca</code> just let me choose the billing country for my credit card. Better yet, <code>dell.com</code> should allow shipping to Canada by forwarding my order to Dell Canada for me.\n\n<p>With the Dell example I think the reason for this screwup was less malice, more oversight/ignorance/stupidity. However, in some ways it's even more sad that even Dell, a company known for being relatively 'net savvy, can't seem to get this right.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/wZxs84EmBNs\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1184249340.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1184245957.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/3e8b0f081870434e", 
                "categories": [], 
                "title": "Voodoo Electronics", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/lz7AJjIy0-M/im-interested-in-robotics-but-building.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1180926300000000.0", 
                "content": {
                    "content": "<p>I'm interested in robotics, but building robots requires three things: mechanics, electronics and software. (I'm intentionally ignoring BEAM here -- I'm not interested in building software-free robots.) I know software, and I feel like I have an okay grasp of mechanical systems. I don't know enough about electronics, though.\n\n<p>My understanding of electronics is that there are basically three\ntypes of electronics:\n\n<ul>\n  <li>AC electronics. Not especially relevant to building robots.\n  <li>DC digital electronics. This part I feel like I pretty much understand. It's based on boolean logic, and so a lot of my software knowledge is applicable. The only extra bits are pretty simple:\n    <ul>\n      <li>you're dealing with high versus low rather than true/false, so you need to come up with a mapping convention for each circuit and stick with it.\n      <li>many components (like ICs) also need power. Just get a power source that's the right voltage and enough current, and this should be okay.\n      <li>there are a few different \"families\" of digital components. Stick with one for any one circuit.\n    </ul>\n  <li>DC analog electronics. This has two main parts. The first part is the \"simple bits\": things like Ohm's law which <em>every single electronics tutorial</em> feels the need to tell you about. The second part is what I've come to call \"voodoo electronics\" -- the parts that every electronics tutorial I've ever seen simply hand-waves away.\n</ul>\n\n<p>A recent example of \"voodoo electronics\" that I encountered was in <a href=\"http://makezine.com/10/\">the most recent issue of Make</a>. This issue had a number of electronics tutorials. Some of these were very helpful, like <a href=\"http://makezine.com/10/workbench/\">Your Electronics Workbench</a>. The article on the 555 timer chip, however, <a href=\"http://makezine.com/10/littlechip/\">The Biggest Little Chip</a>, suffered from the voodoo electronic problem. The article contained the following schematic:\n\n<p align=\"center\"><img alt=\"Figure 2 from &quot;The Biggest Little Chip&quot;\" src=\"http://feeds.feedburner.com/images/555-voodoo-schematic.png\" title=\"R3 = magic, C2 = more magic\" /></p>\n\n<p>It then went on to explain the purpose of each of the various components one by one. The explanations were a bit terse, but reasonable. Eventually, the entire circuit had been explained except for R3 and C2. Here's how the article explained their purpose:\n\n<blockquote>\nR3 protects the LED from excessive current, while C2 protects the 555 timer from random noise.\n</blockquote>\n\n<p>\"Excessive current\"? \"Random electronic noise\"? How am I supposed to design my own circuits without understanding how to both predict when these problems will exist and how to devise a defense against them? So far I have yet to see a single electronics tutorial that explains these things.\n\n<p>I ran into the same thing when I found some schematics for a stepper motor controller on the web. All of the schematics made sense to me, except a mysterious zener diode which was there (according to the documentation) \"to absorb reverse EMF\". No more explanation was given.\n\n<p>Are there any electronics tutorials out there that actually explain how to predict when part of a circuit will be susceptible to \"random electronic noise\", \"excessive current\", or \"reverse EMF\" and how to build protection against them, or is my only hope to take a full-fledged course in electrical engineering?\n\n<h3>Update</h3>\n<p>After posting this I realized that I could just post a comment on <i>Make</i>'s website. The author of the 555 article posted a <a href=\"http://makezine.com/10/littlechip/#msg2214\">very helpful response</a>. Now I just need to figure out what that zener diode in that stepper motor controller was for.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/lz7AJjIy0-M\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1180926300.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1178072247.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/ea8b31b8e9844466", 
                "categories": [], 
                "title": "Copyright Law and the King", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/ll9xmTJLwm4/copyright-law-and-king.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1178071800000000.0", 
                "content": {
                    "content": "<p>From the U.S. Copyright Office's <a href=\"http://www.copyright.gov/help/faq/faq-protect.html\">What Does Copyright Protect?</a> page:\n<blockquote><b>How do I protect my sighting of Elvis?</b><br />\nCopyright law does not protect sightings. However, copyright law will protect your photo (or other depiction) of your sighting of Elvis. Just send it to us with a Form VA application and the filing fee. No one can lawfully use your photo of your sighting, although someone else may file his own photo of his sighting. Copyright law protects the original photograph, not the subject of the photograph.</blockquote><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/ll9xmTJLwm4\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1178071800.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1178535145.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/cba429e7623c46f5", 
                "categories": [], 
                "title": "Easier Links with Google AJAX Search API", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/V2zShzUlLV4/easier-links-with-google-ajax-search.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1173601260000000.0", 
                "content": {
                    "content": "<p>Ever get annoyed by the complexity of adding links in blog or message board posts? Sure, it isn't rocket science, but between getting the angle brackets, quotes and start and end tags balanced correctly <em>and</em> getting the URL right, adding links is a pain.\n\n<p>This weekend I did some playing around with the <a href=\"http://code.google.com/apis/ajaxsearch/\">Google AJAX Search API</a> and made a nifty bookmarklet for creating links in textareas. I've only tested it with Firefox (various combinations of 1.5 and 2.0 on Linux, Windows and Mac), and it only works with plain old multi-line textareas (not 1-line text fields or rich/\"wysiwyg\" text controls). Aside from those caveats, it seems to work pretty well.\n\n<p>Installation is easy: just drag this link to your bookmark toolbar: <a href=\"\">[linkify]</a> Note that if you're reading this in a feed reader you'll probably need to visit my site for this step, as feed readers usually strip out JavaScript. (Readlings: no smirking.)\n\n<p>Here's how to use it:\n\n<ol>\n<li>Go to some page that has a textarea. The comments area on most blogs should work. The Blogger posting form in \"Edit Html\" mode also works.\n<li>Type some text in the textarea.\n<li>Select the part you'd like to turn into a link.\n<li>Activate the bookmarklet. This will bring up a search pane on the right side of your browser window.\n<p><img alt=\"screen shot\" src=\"http://xenomachina.com/images/searchpop-screenshot.png\" />\n<p>The search query defaults to the text you'd highlighted. You can edit the query if necessary.\n<li>Click on \"create link\" next to the search result. The popup will disappear, and the text you selected earlier (in the textarea) will be replaced with a link. The link's text will be the original selected text, and its href will be the URL of the search result you picked.\n</ol>\n\n<p>Thanks to <a href=\"http://www.massless.org/\">Chris Wetherell</a> for telling me about <a href=\"http://tagneto.blogspot.com/2006/06/cross-domain-frame-communication-with.html\">inter-frame communication with URL fragments</a>, which turned out to be handy.\n\n<h3>Update</h3>\n<p>I've been told that the bookmarklet works in Opera, but not in Safari. I'll look into the Safari issue.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/V2zShzUlLV4\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1173601260.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1168525150.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/eb8eb5c8573d41f4", 
                "categories": [], 
                "title": "Intellectual Tug-O-War", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/f0Lg3EH_NxQ/intellectual-property-extremists.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1168495140000000.0", 
                "content": {
                    "content": "<p>Why is it that almost all of the online debate about intellectual\nproperty is between extremists? On the one hand we have Richard\nStallman, Cory Doctorow and piracy apologists. On the\nother hand we have the RIAA, MPAA and Microsoft/Apple\nastroturfers. I tend to disagree with both of these groups because both\nof them go too far -- just in opposite directions.\n\n<p>The most recent example of this is the <a href=\"http://badvista.fsf.org/blog/analysis-of-microsofts-suicide-note-part-1\">Analysis\nof Microsoft's Suicide Note</a> page. It's on fsf.org, so of course it's no\nsurprise that most of the comments are from free-software groupies. The only\nexceptions are a few posts from \"sreiser\". I actually agree with some of\nhis points, but I strongly disagree with:7\n\n<blockquote>by affording basic intellectual property protection within\nthe operating system, they [Microsoft] are doing great service towards\ncultivating a more responsible public</blockquote>\n\n<p>The responses are, of course, equally extreme, but diametrically\nopposite. For example:\n\n<blockquote>...private piracy, on the other hand, does not cause a real\nharm to the manufacturer, due to its nature. By private piracy I refer\nto those people who download a certain product from Internet or\notherwise make unauthorized copies of it only for self use. This is, of\ncourse, still illegal (although there are legal holes in many countries\nthan enable it), but even so it requires a closer look: most of 'private\npirates' (most probably more that 99%) copy the product just because\nthey cannot afford buying it. So, if you disable such user from doing\nthat, this won't make him/her to buy that product, since cannot afford\nit. Instead that user won't use the product at all.</blockquote>\n\n<p>I don't agree with either of these quoted bits. On the one hand, if\nI'm buying an operating system, that operating system should serve\n<em>me</em>, not the content providers. If there was somehow some sort\nof DRM that didn't cause any harm, then I'd be okay with it, but not\ncausing any harm means:\n<ul>\n<li>It shouldn't make my machine slower.\n<li>It shouldn't make my machine run hotter.\n<li>It shouldn't increase the cost of the operating system or computer.\n<li>It shouldn't increase the liklihood of bugs.\n<li>It shouldn't make any legitimate tasks that I might want to\nperform more difficult. This includes fair-use tasks like backing up my\nmedia, moving it between my machines, burning it to a CD so I can listen\nto it in my car, etc.\n</ul>Since no such DRM exists (or can exist, given the fuzziness of what is fair use) it's better to do without.\n\n<p>On the other hand, the \"private piracy doen't hurt anyone\" argument\nsimply doesn't hold water.  There generally isn't a black and white\ndistinction between what one can afford and what one cannot. Can the\ntypical teenager afford to buy thousands of CDs? Probably not. Can they afford\nto buy tens or even hundreds of CDs? For most American teenagers the\nanswer is probably yes. So is it okay for someone to buy as many CDs as\nthey can afford, and then to pirate the rest of their music?\n\n<p>Even if you did consider such an absurd situation to be morally\njustified, I argue that it would rarely happen. Once someone accepts\npiracy as a legitimate option they'll pirate whenever the percieved\nbenefit minus cost outweighs that of purchasing. Given that many people's\nwants expand to exceed their means, and that physical goods are\nnotoriously hard to pirate, people who have taken this path will not\npurchase media even if they can afford it. Worse, this sort of behavior\ncan spread to those well outside of the \"can't afford it\" group because\nit lowers the social stigma of pirating, while at the same time\ndecreasing the percieved value of the purchased product.\n\n<p>One of the craziest things I've experienced when trying to talk with these extremeists is that they generally see me as being on the opposite side of the spectrum from them. The anti-copyright crowd, upon hearing that I think content creators should be able to use copyright in order to get compensation for their work will invariably accuse me of being against open source/\"free\" software. I actually like open source (I'm typing this on my Ubuntu box) and I've even contributed to some projects. I think of \"open source\" as a feature though, not a moral imperative. While I prefer my software to be open source, I don't consider the developers of non-open-source software to be infidels.\n\n<p>Likewise, members of the the pro-DRM camp, upon hearing that I dislike DRM, will generally accuse me of being a software pirate. I just don't want fair use to be harmed. The \"don't even talk about circumvention\" bits in the DMCA are also frighteningly similar to <a href=\"http://en.wikipedia.org/wiki/Thoughtcrime\">thoughtcrime</a>.\n\n<p>Am I really the only one here in the middle? In the end, I'm inclined to side with the \"information wants to be free\" crowd, but mostly because they seem to be on the losing side of the tug-of-war.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/f0Lg3EH_NxQ\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1168495140.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1165673018.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/c946c97b6d2a47ae", 
                "categories": [], 
                "title": "Book: On The Edge", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/3_kkCo5nx94/book-on-edge.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1165671060000000.0", 
                "content": {
                    "content": "<a href=\"http://www.commodorebook.com/\"><img align=\"left\" alt=\"\" border=\"0\" src=\"http://feeds.feedburner.com/images/on-the-edge-cover.jpg\" /></a><p>I recently finished reading\n<a href=\"http://www.commodorebook.com/\"><cite>On the Edge: The\nSpectacular Rise and Fall of Commodore</cite></a>. I had a string of\nCommodore computers from the time I was 8 up until I was in university,\nso it was great to find out more about the history behind these\nmachines.\n\n<p>One thing that comes to mind when I think about the Commodore\nmachines I had is how there was so little hardware abstraction. In\nmodern PCs you rarely talk directly to the hardware. Instead there are\nhigh level languages and APIs piled on top of APIs. I'm not saying that\nhaving little hardware abstraction was unique to the Commodore machines.\nIt was probably actually very common in other machines of that era as\nwell, since the machines were so underpowered (by today's standards)\nthat you couldn't really afford the extra overhead imposed by layers of\nabstraction. However, as far as I can tell, the Commodore machines tended to \nhave even less hardware\nabstraction than their contemporaries.\n\n<p>I think a large part of\nthis had to do with Commodore's habit of using custom chips in almost\nevery machine since the <a href=\"http://en.wikipedia.org/wiki/VIC-20\">VIC-20</a>, which was\nactually named after the <a href=\"http://en.wikipedia.org/wiki/MOS_Technology_VIC\">VIC</a> chip the\nmachine was based around. In the <a href=\"http://en.wikipedia.org/wiki/Commodore_64\">Commodore 64</a> there\nwere the <a href=\"http://en.wikipedia.org/wiki/VIC-II\">VIC-II</a> and <a href=\"http://en.wikipedia.org/wiki/6581\">SID</a> chips.  On the <a href=\"http://en.wikipedia.org/wiki/Amiga\">Amiga</a>, there was of course\nthe <a href=\"http://en.wikipedia.org/wiki/Original_Amiga_chipset\">famous\nAmiga custom chipset</a>.\n\n<p>This hardware-centric philosophy permeated the system software as\nwell. I remember programming on the Commodore 64 in <a href=\"http://en.wikipedia.org/wiki/BASIC_2.0\">BASIC 2.0</a>, which\nprovided <em>absolutely no high-level support for sound or graphics\nwhatsoever</em>. This was on the machine that arguably had some of the\nbest sound and graphics capabilities for its time. On the C64 everything\nhad to be done in <a href=\"http://en.wikipedia.org/wiki/PEEK_and_POKE\"><code>PEEK</code>s and\n<code>POKE</code>s</a>. Even on the Amiga, which had a \"real\" operating\nsystem, many hardware details would still peek (or is that poke?)\nthrough, and applications frequently took advantage of hardware features\nthat were unique to the Amiga.\n\n<p>From reading <cite>On the Edge</cite> I think I have a better\nunderstanding of why the Commodore machines were like this. A big factor\nin this seems to be that the Commodore 64 and the Amiga development\nteams included chip designers. The C64 pretty much started with the\nVIC-II and SID chips, and the rest of the computer was built around\nthem.  This sort of makes sense, since Commodore was one of the only\ncomputer makers of that era to have its <a href=\"http://en.wikipedia.org/wiki/MOS_Technology\">own chip fab</a>.\n(According to the book, this was because <a href=\"http://en.wikipedia.org/wiki/Jack_Tramiel\">Jack Tramiel</a>,\nCommodore's founder, was  obsessed with \"vertical integration\".)\nLikewise, the Amiga's design centered around its own custom chips\nlargely because it was originally going to be a game machine. It\neven sounds like one of the reasons Amiga was willing to be bought by\nCommodore had to do with Commodore owning a chip fab.\n\n<p>The book talks about both the engineering and the marketing behind\nthe Commodore machines. As a software engineer I'm obviously really\ninterested in the engineering stories, but some of the marketing stories\nare also fascinating, especially given Commodore's notoriously bad\nmarketing in its later years.\n\n<p>Here's a bit about Commodore's marketing tactics in 1983:\n\n<blockquote>\nCommodore instigated a strange offer that literally removed the\ncompetition from homes. ... \"Send in any sort of computing device and\nyou can get $100 off your Commodore 64.\" ...\n\n<p>Commodore employees speculated that the offer actually increased\nsales of <a href=\"http://en.wikipedia.org/wiki/Timex_Sinclair\">Timex-Sinclair</a>\ncomputers. Customers sometimes purchased $50 Timex-Sinclair computers\njust to take advantage of the $100 rebate offer. The excess Sinclair\ncomputers became a running joke within the halls of Commodore. \"We had\nall these Sinclairs,\" says <a href=\"http://en.wikipedia.org/wiki/Bil_Herd\">Bil Herd</a>. \"I started\nusing them as doorstops.\" </blockquote>\n\nWhat's especially interesting is how these stories can sometimes\nintersect in surprising ways. During the development of the <a href=\"http://en.wikipedia.org/wiki/Commodore_128\">Commodore 128</a>\nthere was difficulty getting the C64's <a href=\"http://en.wikipedia.org/wiki/CP/M\">CP/M</a> and Magic Voice\ncartridges to work on the C128 prototype:\n\n<blockquote>\nTo fix the problem, Herd required the C128 to start at memory address\nzero, but the 8502 started elsewhere. \"One night, everybody left and it\nwas broken,\" says Herd. \"During the night, I said, 'I have no way to fix\nthis, unless we startup by not starting at that address.' I said, 'Hey,\nVon. The Z80 chip starts from zero, doesn't it?' He said, 'Yup.' I said,\n'Cool. I need somebody wire wrapping tonight.'\"\n\n<p>The hour was too late to purchase a Z80 chip, so Herd looked\nelsewhere. \"Everybody had doorstops that were actually Sinclairs,\" he\nrecalls. \"I went and tore open my doorstop because we didn't own a Z80\nchip in the place.\"\n</blockquote>\n\n<p>The Z80 in the C128 literally originated in a doorstop!\n\n<p>If, like me, you grew up with Commodore computers, or if you're just\ninterested in the history of personal computers in general, then I\nhighly recommend reading\n<a href=\"http://www.commodorebook.com/\"><cite>On the Edge</cite></a>.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/3_kkCo5nx94\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1165671060.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1163587289.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/0ead0afe689d4c87", 
                "categories": [], 
                "title": "Fubars for sale", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/lBpLbpRniho/fubars-for-sale.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1163587080000000.0", 
                "content": {
                    "content": "<p>I looks like <a href=\"http://www.amazon.com/gp/product/B000FCGS0Y/ref=cm_gift_gg_B000FCGS0Y/002-2284732-5596012\">fubars </a> really exist. This review cracked me up:\n\n<blockquote>... if all you want to do is knock down some walls or kill some enemies, this is the way to go.</blockquote><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/lBpLbpRniho\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1163587080.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1163668450.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/88d5e70b4ee94a7b", 
                "categories": [], 
                "title": "Scala Programming Language", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/zXLi-Y6zeUM/scala-programming-language.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1163001360000000.0", 
                "content": {
                    "content": "<p>Today I went to <a href=\"http://video.google.com/videoplay?docid=553859542692229789\">a talk on the Scala\nProgramming Language</a>. According to its creators, <a href=\"http://scala.epfl.ch/\">Scala</a>\n\"smoothly integrates features of object-oriented and functional\nlanguages\". It's also got static type checking, and from the little bit\nI've seen so far the type system seems fairly powerful. These are all\nthings I've wanted in a language for quite some time.\n\n<p>The languages that I use at work, mostly Java and Python, are\nnormally classified as \"object-oriented\". Python does have a bit of a\nfunctional flavor to it as well, but it seems that most people think of\nfunctional and object-oriented styles of programming as almost\ncompletely disjoint. I've been finding that I've been gradually moving\nto an ever more \"functional style\" of object-oriented programming, even\nwhen programming in Java, so I was happy to see a language designed to\nintegrate the two styles.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/zXLi-Y6zeUM\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1163001360.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1156986670.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/ff754dbc23dd4dce", 
                "categories": [], 
                "title": "Nerds versus geeks", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/Ds9ms_d08qU/nerds-versus-geeks.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1156986180000000.0", 
                "content": {
                    "content": "<p>Ask Yahoo recently had a post titled \"<a href=\"http://ask.yahoo.com/20060818.html\">What's the difference between a nerd, a geek, and a dork?</a>. Their definitions of nerd and geek are pretty consistent with the ones I've become used to since living in the SF Bay Area, but they aren't consistent with the way these terms were used when I was growing up.\n\n<p>In my high school a geek was someone who was unpopular while a nerd was someone who was unpopular but smart. I remember when I first started reading <a href=\"http://slashdot.org/\">Slashdot</a>, shortly after I moved to the Bay Area, I was really surprised at their use of the word \"geek\". \"Geeks don't know how to use computers\", I thought, \"they're too busy <a href=\"http://www.kli.org/\">learning to speak Klingon</a> or <a href=\"http://www.cerado.com/web20quiz.htm\">memorizing the names of Star Wars characters</a>\". Sure, there are  certain things that both geeks and nerds tend to be interested in, like science fiction, comic books and role playing games, but nerds are the ones who know how to do \"useful\" things. I became even more surprised when I learned that many slashdotters seemed to use an inverted set of definitions for geek and nerd.\n\n<p><a href=\"http://en.wikipedia.org/wiki/Nerd#Differences_from_geek\">Wikipedia has a bit of an explanation</a>:\n\n<blockquote>Pundits and observers dispute the relationship of the terms \"nerd\" and \"geek\" to one another. Some view the geek as a less technically skilled nerd. Others view the exact opposite.</blockquote>\n\n<p>They also reference <a href=\"http://www.catandgirl.com/view.php?loc=94\">an excellent <cite>Cat and Girl</cite></a> comic which, incidentally, defines nerd and geek in a way that's consistent with the definitions I grew up with.\n\n<p>It sounds like the definitions of these two terms are regional. The Wikipedia page suggests that this may be an east-coast versus west-coast thing: on the east coast people think nerds are smart, while on the west coast people think geeks are smart.  That's certainly consistent with my experience, as I grew up in Ontario. It would be interesting if someone made a map-poll like the <a href=\"http://www.popvssoda.com/\">Pop vs. Soda Page</a>. <a href=\"http://www.lazyweb.org/\">LazyWeb</a>, don't fail me now!<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/Ds9ms_d08qU\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1156986180.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1155894038.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/3bce31e274794549", 
                "categories": [], 
                "title": "Top 10 Java Classes I Love to Hate", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/gZXWTodu7Ms/top-10-java-classes-i-love-to-hate.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1155893400000000.0", 
                "content": {
                    "content": "<p>I haven't posted here in months. What better way is there to end a blogging dry spell than a good rant?\n<p>Here are ten Java classes in the standard API that annoy me whenever I have to deal with them, in no particular order:\n<dl>\n<dt><code>java.io.File</code>\n<dd>An abstract file representation... or is it? It exposes system specific things like the <code>File.separator</code> and <code>File.pathSeparator</code>, yet it doesn't understand what \".\" and \"..\" do unless you canonicalize the <code>File</code> object. It's also tied to the system's filesystem. This means you generally need to build an abstraction layer on top of <code>File</code>. Finally, <code>File.lastModified()</code> returns a <code>long</code>. Why not a <code>Date</code>? (<code>lastModified()</code> used to be measured in arbitrary units from some arbitrary time. Not very useful if you want to be able to communicate the last modified time to the user or even another program. This was later fixed to be measured in milliseconds since the epoch.)\n<dt><code>java.io.Serializable</code>\n<dd>First, it's a marker interface. Marker interfaces are generally a bad smell. They're a good sign that someone was being lazy, or not thinking very carefully about the problem they were trying to solve. In the case of <code>Serialization</code> it's especially bad because there are methods that probably should be in the interface: <code>writeObject()</code>, <code>readObject()</code> and <code>getSerialVersionUID</code>. Instead, reflection is used to find methods that have \"magic names\". A definite no-no in my book.\n<p>Of course, even that wouldn't fix the bigger issue which is that Java's serialization (like Python's pickling) is a very fragile mechanism for persisting objects which relies on the internal state of objects rather than on their public interfaces.\n<dt><code>java.lang.Cloneable</code>\n<dd>Like <code>Serializable</code>, <code>Cloneable</code> is a marker interface. It's even easier to see what's wrong with <code>Clonable</code>, though. Where's the <code>clone()</code> method? The docs mention its absence. That doesn't stop it from being a bug.\n\n<dt><code>java.text.MessageFormat</code>\n<dd>Overcomplicated. It defines a whole programming language for messages. This is great in theory, but it's not something you could actually give to translators. Hint: most translators are not computer programmers. Even if you manage to find a translator that can deal with the craziness of <code>MessageFormat</code> chances are they don't know <em>every</em> language you want to translate into.\n\n<dt><code>java.text.SimpleDateFormat</code>\n<dd>Almost every time I see this class used I see the same bug in the code that uses it. <code>SimpleDateFormat.format()</code> is not reentrant and is not thread safe. Beyond that, <code>DateFormat</code> has one of the most bizarre APIs ever. It has a <code>setCalendar</code> method, but what does setting the \"calendar\" do? Why, it lets you get it back with <code>getCalendar</code>! It also lets you stomp on some of format's internal state if you call it concurrently, but presumably it isn't meant for that.\n\n<dt><code>java.util.Calendar</code>\n<dd>What <em>isn't</em> wrong with this class? Well, I guess it isn't a marker interface, at least.\n\n<p>An instance of the <code>Calendar</code> class represents what? The answer should be \"a calendar\", but in fact an instance of this class represents a <em>date</em>. A mutable date whose mutators follow the rules of a particular calendar. Truly bizarre.\n\n<dt><code>java.util.Date</code>\n<dd>Date isn't so bad. It has two main sins: First, Date objects are mutable. Second, somehow it made someone feel the urge to write Calendar.\n\n<dt><code>java.util.Locale</code>\n<dd>Here's a <a href=\"http://www.answers.com/locale\">dictionary definition for \"locale\"</a>:\n<blockquote>\n<b>lo\u00b7cale</b> (l\u014d-k\u0103l')\n<br /> <i>n.</i><ol><li> A place, especially with reference to a particular event: <i>the locale of a crime.</i></li><li> The scene or setting, as of a novel.</li></ol>\n</blockquote>\n\n<p>Some of the constants in <code>Locale</code> fit this definition, and clearly represent \"places\":\n\n<pre class=\"code\">\nstatic public final Locale CHINA = new Locale(\"zh\",\"CN\",\"\");\nstatic public final Locale FRANCE = new Locale(\"fr\",\"FR\",\"\");\nstatic public final Locale GERMANY = new Locale(\"de\",\"DE\",\"\");\n</pre>\n\n<p>Others, not so much:\n\n<pre class=\"code\">\nstatic public final Locale CHINESE = new Locale(\"zh\",\"\",\"\");\nstatic public final Locale FRENCH = new Locale(\"fr\",\"\",\"\");\nstatic public final Locale GERMAN = new Locale(\"de\",\"\",\"\");\n</pre>\n\n<p>This is a pretty clear example of a common problem I've noticed with internationalization: a lot of people seem to confuse <strong>location</strong> with <strong>language</strong>. Is it <em>because of</em> the Locale class, or is the <code>Locale</code> class merely another victim of some sort of mass-hysteria? I don't know. In any case, the class probably should've been called <em>language</em> since it's obviously based on <a href=\"http://rfc.net/rfc1766.html\">RFC1766: Tags for the Identification of <strong>Languages</strong></a>.\n\n<dt><code>java.util.Stack</code>\n<dd><code>Stack</code> is mostly annoying because it used up a good name. I occasionally want a stack, but I never want a stack that extends <code>Vector</code>. At least <code>Vector</code> and <code>Hashtable</code> had the decency to not use the only good names for what they do, but what else do you call a <code>Stack</code>? A LIFO? Java 1.6 will actually add <code>Deque</code> which can be used as a stack, but the interface is a lot \"fatter\" than than I'd like for the cases where I really just want a stack.\n\n<dt><code>java.util.WeakHashMap</code>\n<dd>Good idea, poor execution. First, the name is ambiguous. Weak what? Weak keys? Weak values? It turns out that it's weak keys, but it would be nice if the name said as much. It would also be nice if there was a weak value version so that people were more aware that they had to make a decision, as the two types of \"weakness\" are not interchangeable. You typically want weak keys when you're trying to \"annotate\" existing objects, but don't want the annotations to outlive the objects. You typically want weak values when you're trying to implement a weak cache keyed by something that's \"recreatable\" (typically \"value objects\", like Strings or numbers).\n\n<p>Since it is a weak key hashmap it should actually be a weak key identity hashmap. It isn't, though. <code>WeakHashMap</code> uses <code>Object.equals()</code> despite the fact that weak references operate on identity.\n</dl><img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/gZXWTodu7Ms\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1155893400.0, 
                "annotations": [], 
                "likingUsers": []
            }, 
            {
                "origin": {
                    "streamId": "feed/http://feeds.feedburner.com/xenomachina", 
                    "htmlUrl": "http://www.xenomachina.com/", 
                    "title": "Xenomachina"
                }, 
                "updated": 1150011675.0, 
                "author": "Laurence", 
                "id": "tag:google.com,2005:reader/item/a49a4ebcca3d4def", 
                "categories": [], 
                "title": "Amazing Spaghetti", 
                "alternate": [
                    {
                        "href": "http://feedproxy.google.com/~r/xenomachina/~3/O5Xk7zuKcC8/amazing-spaghetti.html", 
                        "type": "text/html"
                    }
                ], 
                "timestampUsec": "1149120900000000.0", 
                "content": {
                    "content": "<a href=\"http://www.atariarchives.org/basicgames/\"><img align=\"right\" alt=\"\" border=\"0\" src=\"http://xenomachina.com/images/basic-computer-games-cover.gif\" /></a><p>On <a href=\"http://www.gadgetopia.com/post/2386\">Gadgetopia</a> I read that \"Someone scanned in all the pages from the classic book <cite>BASIC Computer Games</cite>\". I remember back in elementary school and high school I used to get magazines and books from the library with program listings.\n\n<p>I rarely ever actually typed in the listings, though -- I was too lazy for that. Instead, I'd often try to figure out how the code worked. My favorites were the listings that also had an explanation of how the program worked. Then I'd typically ignore the listing entirely and just try to write a program based on the description. I remember writing a fractal landscape generator in BASIC 7.0 for the <a href=\"http://en.wikipedia.org/wiki/Commodore_128\">Commodore 128</a> based on an article in <a href=\"http://en.wikipedia.org/wiki/Compute_magazine\">Compute!</a> which had a listing for an IBM PC <a href=\"http://en.wikipedia.org/wiki/Fractal_landscape\">fractal landscape</a> generator.<a href=\"http://www.atarimagazines.com/compute/index/#issue85\"><img align=\"left\" border=\"0\" src=\"http://xenomachina.com/images/compute-june1987-cover-small.jpg\" /></a>\n\n<p>Anyway, back to <cite>BASIC Computer Games</cite>: Looking at the scanned cover, I felt like I remembered this book. I remember borrowing it from the public library back in high school and being surprised by the seemingly ancient version of BASIC that it was using. I don't know if it was actually an \"ancient version of BASIC\", that's just what it seemed like to me at the time. The book <em>was</em> published in 1978, well before the <a href=\"http://en.wikipedia.org/wiki/Commodore_64\">Commodore 64</a>, my first computer, even existed.\n\n<p>There was one program in the book that really intriguied me: a random maze generator called \"Amazing\". By the time I got my hands on the book my programming language of choice was <a href=\"http://en.wikipedia.org/wiki/Turbo_Pascal\">Turbo Pascal</a>, so I decided to try and port \"Amazing\". I never actually succeeded because Turbo Pascal is <a href=\"http://en.wikipedia.org/wiki/Structured_programming\">structured</a>, while \"Amazing\" made copious use of spaghetti like <code><a href=\"http://en.wikipedia.org/wiki/GOTO\">GOTO</a></code>s.\n\n<p>The first thing I did when I found out about the scan of the book today was to check if this really was the maze generator I remembered. I remembered that the program had lots of \"<code>GOTO 1000</code>\" statements, and that line 1000 was itself a <code>GOTO</code> statement (making the program worthy of <a href=\"http://thedailywtf.com/\">TheDailyWTF</a>, IMHO). Sure enough, if you check <a href=\"http://www.atariarchives.org/basicgames/showpage.php?page=3\">the listing of Amazing</a> you can see that spaghetti I was up against.\n\n<p>The funny part is that the program listing is only about 150 lines long, which is actually pretty short. I think I'll take another crack at translating the program, though this time I'll probably use <a href=\"http://python.org/\">Python</a> rather than Turbo Pascal.<img alt=\"\" height=\"1\" src=\"http://feeds.feedburner.com/~r/xenomachina/~4/O5Xk7zuKcC8\" width=\"1\" />", 
                    "direction": "ltr"
                }, 
                "crawlTimeMsec": "1530516315342", 
                "published": 1149120900.0, 
                "annotations": [], 
                "likingUsers": []
            }
        ], 
        "htmlUrl": "http://www.xenomachina.com/", 
        "updated": 1530516315.34223, 
        "id": "feed/http://feeds.feedburner.com/xenomachina", 
        "title": "Xenomachina"
    }
};
