var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
System.register("FakeXMLHttpRequest", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FakeXMLHttpRequest, ReadyState;
    return {
        setters: [],
        execute: function () {
            FakeXMLHttpRequest = class FakeXMLHttpRequest {
                constructor() {
                    this.readyState_ = ReadyState.UNSENT;
                    this.status_ = 0;
                    this.responseText_ = null;
                }
                static setHandlerFn(handlerFn) {
                    FakeXMLHttpRequest.handlerFn_ = handlerFn;
                }
                open(method, url, async = true) {
                    this.url_ = url;
                    this.async_ = async;
                    this.setReadyState_(ReadyState.OPENED);
                }
                send(body) {
                    this.body_ = body;
                    if (this.async_) {
                        setTimeout(() => this.handle_(), 0);
                    }
                    else {
                        this.handle_();
                    }
                }
                set onreadystatechange(handler) {
                    this.readyStateChangeHandler_ = handler;
                }
                get readyState() {
                    return this.readyState_;
                }
                get responseText() {
                    return this.responseText_;
                }
                get status() {
                    return this.status_;
                }
                get statusText() {
                    switch (this.status_) {
                        case 0:
                            return "Offline";
                        case 200:
                            return "OK";
                        case 404:
                            return "Not Found";
                        case 500:
                            return "Internal Server Error";
                        default:
                            return "Unknown";
                    }
                }
                handle_() {
                    if (!this.url_) {
                        throw new Error("send() called before open()");
                    }
                    if (!FakeXMLHttpRequest.handlerFn_) {
                        throw new Error("no handler function is set");
                    }
                    const url = new URL(this.url_, location.href);
                    const { responseText, status } = FakeXMLHttpRequest.handlerFn_(url, this.body_);
                    this.responseText_ = responseText;
                    this.status_ = status;
                    this.setReadyState_(ReadyState.DONE);
                }
                setReadyState_(readyState) {
                    this.readyState_ = readyState;
                    if (this.readyStateChangeHandler_) {
                        this.readyStateChangeHandler_.call(this);
                    }
                }
                setRequestHeader() { }
                getResponseHeader(name) {
                    return null;
                }
            };
            exports_1("default", FakeXMLHttpRequest);
            (function (ReadyState) {
                ReadyState[ReadyState["UNSENT"] = 0] = "UNSENT";
                ReadyState[ReadyState["OPENED"] = 1] = "OPENED";
                ReadyState[ReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
                ReadyState[ReadyState["LOADING"] = 3] = "LOADING";
                ReadyState[ReadyState["DONE"] = 4] = "DONE";
            })(ReadyState || (ReadyState = {}));
        }
    };
});
System.register("Handler", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Handler, ApiHandler;
    return {
        setters: [],
        execute: function () {
            Handler = class Handler {
                constructor(url, urlPathMatchResult, body) {
                    this.url = url;
                    this.urlPathMatchResult = urlPathMatchResult;
                    let paramsString = url.search;
                    if (body) {
                        paramsString += "&" + body;
                    }
                    this.params = new URLSearchParams(paramsString);
                }
            };
            exports_2("Handler", Handler);
            ApiHandler = class ApiHandler extends Handler {
                handle() {
                    const { responseJson, status } = this.handleApi();
                    return {
                        responseText: responseJson
                            ? JSON.stringify(responseJson, undefined, 2)
                            : "",
                        status,
                    };
                }
            };
            exports_2("ApiHandler", ApiHandler);
        }
    };
});
System.register("cannedData", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function getCannedData() {
        return _CANNED_FEED_DATA;
    }
    exports_3("default", getCannedData);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("preferences", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Preferences, preferences;
    return {
        setters: [],
        execute: function () {
            Preferences = class Preferences {
                constructor() {
                    this.data_ = {
                        "item-actions": JSON.stringify({
                            "plusone-action": true,
                            "share-action": false,
                            "email-action": false,
                            "tags-action": true,
                        }),
                        "show-oldest-interrupt": "false",
                        "read-items-visible": "true",
                        "start-page": "home",
                        "show-scroll-help": "false",
                        "show-search-clarification": "false",
                        "show-blogger-following-intro": "false",
                    };
                }
                get(key) {
                    return this.data_[key];
                }
                set(key, value) {
                    this.data_[key] = value;
                }
                toJson() {
                    return Object.keys(this.data_).map(key => ({
                        id: key,
                        value: this.data_[key],
                    }));
                }
            };
            exports_4("Preferences", Preferences);
            preferences = new Preferences();
            exports_4("default", preferences);
        }
    };
});
System.register("overview", ["cannedData"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function htmlEscape(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    function htmlStrip(str) {
        return str
            .replace(/<[^>]*>?/gi, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&");
    }
    function renderStreamItem(streamId) {
        const streamJson = cannedData_1.default()[streamId];
        const title = streamJson["title"];
        const item = streamJson["items"][0];
        return `
<div class="overview-segment overview-stream" id="${streamId}">
    <div class="overview-header">
      <span class="title">
        <a class="sub-link" href="" id="overview-${streamId}">
          ${htmlEscape(title)}
        </a>
      </span>
    </div>
    <div class="overview-metadata" dir="ltr">
      <p class="link item-title overview-item-link" id="${item["id"]}">
        ${item["title"]}
         <br><span class="unread">${new Date(item["published"] * 1000).toLocaleDateString()}</span>
      </p>
      <p class="item-snippet overview-item-link" id="${item["id"]}">
        ${htmlEscape(htmlStrip(item["content"]["content"]).substring(0, 160))}&hellip;
      </p>
    </div>
  </div>
`;
    }
    function renderOverviewPage() {
        return `
<div id="home">
  <div id="sections-header">
    <div class="contents">
      <div class="lhn-nav-button-container"></div>
      <div class="overview-section-header">
        A look at what's <strike>new</strike> was in Reader
      </div>
      <div class="settings-button-container"></div>
      <div class="clear"></div>
    </div>
  </div>
  <div id="sections-holder">
    <div id="sections">
      <div id="right-section">
        <div class="overview-section">
          <div class="section" id="recent-activity">

          </div>
          <div id="tips">
            <div class="section-header">
              Tips and tricks
            </div>
            <div id="tips-body">
              <p class="promo-image-text">
                All of the keyboard shortcuts that you were used to in Reader
                still work. <b>g-a</b> still takes to the "All items" view,
                <b>j</b> and <b>k</b> still take you through items, etc.
              </p>
              <p class="promo-image-text">
                And if you need a refresher, <b>shift-/</b> (i.e. <b>?</b>) still
                shows you a cheat sheet with all the shortcuts.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="left-section">
        <div class="overview-section">
          <div id="overview">
            <div class="section-header">
              Some items of interest
            </div>

            ${renderStreamItem("feed/http://googlereader.blogspot.com/atom.xml")}

            ${renderStreamItem("feed/http://feeds.feedburner.com/PersistentInfo")}

          </div>
        </div>
      </div>
    </div>
    <div id="overview-footer">
      <div id="footer">
        <div id="viewer-links"></div>
        <a target="_blank" href="http://googlereader.blogspot.com/"><b>Google Reader Blog</b></a>
        -
        <a href="https://www.google.com/reader/play/?hl=en" target="_new">Reader Play</a>
        -
        <a target="_blank" href="http://www.google.com/support/forum/p/reader">Discuss</a>
        -
        <a target="_blank" href="http://www.google.com/intl/en/privacy.html">Privacy Policy</a>
        -
        <a target="_blank" href="http://www.google.com/support/reader/?hl=en">Help</a>
        <div class="copyright">
          &copy;2013 Google
        </div>
      </div>
    </div>
  </div>
</div>
`;
    }
    exports_5("default", renderOverviewPage);
    var cannedData_1;
    return {
        setters: [
            function (cannedData_1_1) {
                cannedData_1 = cannedData_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("streamPreferences", ["preferences"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var preferences_1, StreamPreferences, streamPreferences;
    return {
        setters: [
            function (preferences_1_1) {
                preferences_1 = preferences_1_1;
            }
        ],
        execute: function () {
            StreamPreferences = class StreamPreferences {
                constructor() {
                    this.data_ = new Map();
                }
                get(streamId) {
                    let preferences = this.data_.get(streamId);
                    if (!preferences) {
                        preferences = new preferences_1.Preferences();
                        this.data_.set(streamId, preferences);
                    }
                    return preferences;
                }
            };
            streamPreferences = new StreamPreferences();
            exports_6("default", streamPreferences);
        }
    };
});
System.register("sortIds", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function generateSortId() {
        return s4() + s4();
    }
    exports_7("generateSortId", generateSortId);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("subscriptions", ["sortIds", "cannedData"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var sortIds_1, cannedData_2, Subscription, Subscriptions, subscriptions;
    return {
        setters: [
            function (sortIds_1_1) {
                sortIds_1 = sortIds_1_1;
            },
            function (cannedData_2_1) {
                cannedData_2 = cannedData_2_1;
            }
        ],
        execute: function () {
            Subscription = class Subscription {
                constructor(streamId, title, htmlUrl) {
                    this.streamId = streamId;
                    this.title = title;
                    this.htmlUrl = htmlUrl;
                    this.sortId = sortIds_1.generateSortId();
                    this.firstItemMsec = 0;
                }
                toJson() {
                    return {
                        id: this.streamId,
                        title: this.title,
                        sortid: this.sortId,
                        firstitemmsec: this.firstItemMsec,
                        categories: [],
                        htmlUrl: this.htmlUrl,
                    };
                }
            };
            Subscriptions = class Subscriptions {
                constructor() {
                    this.subscriptions_ = [];
                }
                all() {
                    return this.subscriptions_;
                }
                add(subscription) {
                    this.subscriptions_.push(subscription);
                }
                streamIds() {
                    return this.subscriptions_.map(s => s.streamId);
                }
            };
            subscriptions = new Subscriptions();
            for (const streamId in cannedData_2.default()) {
                const cannedStreamData = cannedData_2.default()[streamId];
                subscriptions.add(new Subscription(cannedStreamData["id"], cannedStreamData["title"], cannedStreamData["htmlUrl"]));
            }
            exports_8("default", subscriptions);
        }
    };
});
System.register("tags", ["sortIds"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var sortIds_2, Tag, Tags, tags;
    return {
        setters: [
            function (sortIds_2_1) {
                sortIds_2 = sortIds_2_1;
            }
        ],
        execute: function () {
            Tag = class Tag {
                constructor(streamId) {
                    this.streamId = streamId;
                    this.sortId = sortIds_2.generateSortId();
                }
                toJson() {
                    return {
                        id: this.streamId,
                        sortid: this.sortId,
                    };
                }
            };
            Tags = class Tags {
                constructor() {
                    this.data_ = new Map();
                    const stateTag = name => new Tag(`user/-/state/com.google/${name}`);
                    const labelTag = name => new Tag(`user/-/label/${name}`);
                    this.add(stateTag("reading-list"));
                    this.add(stateTag("starred"));
                    this.add(stateTag("read"));
                    this.add(stateTag("kept-unread"));
                    this.add(labelTag("Reader Team"));
                }
                streamIds() {
                    return Array.from(this.data_.values()).map(tag => tag.streamId);
                }
                add(tag) {
                    this.data_.set(tag.streamId, tag);
                }
                remove(tag) {
                    this.data_.delete(tag.streamId);
                }
                all() {
                    return Array.from(this.data_.values());
                }
            };
            tags = new Tags();
            exports_9("default", tags);
        }
    };
});
System.register("handlers", ["Handler", "cannedData", "preferences", "overview", "streamPreferences", "subscriptions", "tags"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function Path(pathPattern) {
        return function (handlerConstuctor) {
            if (typeof pathPattern === "string") {
                handlersByPath.set(pathPattern, handlerConstuctor);
            }
            else {
                handlersByRegExp.set(pathPattern, handlerConstuctor);
            }
        };
    }
    var Handler_1, cannedData_3, preferences_2, overview_1, streamPreferences_1, subscriptions_1, tags_1, handlersByPath, handlersByRegExp, OverviewHandler, PreferenceListHandler, PreferenceSetHandler, StreamPreferenceListHandler, UnreadCountHandler, RecommendationListHandler, TagListHandler, SubscriptionListHandler, StreamContentsHandler, handlerFn;
    return {
        setters: [
            function (Handler_1_1) {
                Handler_1 = Handler_1_1;
            },
            function (cannedData_3_1) {
                cannedData_3 = cannedData_3_1;
            },
            function (preferences_2_1) {
                preferences_2 = preferences_2_1;
            },
            function (overview_1_1) {
                overview_1 = overview_1_1;
            },
            function (streamPreferences_1_1) {
                streamPreferences_1 = streamPreferences_1_1;
            },
            function (subscriptions_1_1) {
                subscriptions_1 = subscriptions_1_1;
            },
            function (tags_1_1) {
                tags_1 = tags_1_1;
            }
        ],
        execute: function () {
            handlersByPath = new Map();
            handlersByRegExp = new Map();
            OverviewHandler = class OverviewHandler extends Handler_1.Handler {
                handle() {
                    return {
                        responseText: overview_1.default(),
                        status: 200,
                    };
                }
            };
            OverviewHandler = __decorate([
                Path("/reader/overview")
            ], OverviewHandler);
            exports_10("OverviewHandler", OverviewHandler);
            PreferenceListHandler = class PreferenceListHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const responseJson = {
                        prefs: preferences_2.default.toJson(),
                    };
                    return { responseJson };
                }
            };
            PreferenceListHandler = __decorate([
                Path("/reader/api/0/preference/list")
            ], PreferenceListHandler);
            exports_10("PreferenceListHandler", PreferenceListHandler);
            PreferenceSetHandler = class PreferenceSetHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const key = this.params.get("k");
                    const value = this.params.get("v");
                    if (key === null || value === null) {
                        return { status: 400 };
                    }
                    preferences_2.default.set(key, value);
                    return { responseJson: "OK" };
                }
            };
            PreferenceSetHandler = __decorate([
                Path("/reader/api/0/preference/set")
            ], PreferenceSetHandler);
            exports_10("PreferenceSetHandler", PreferenceSetHandler);
            StreamPreferenceListHandler = class StreamPreferenceListHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const streamIds = tags_1.default.streamIds().concat(subscriptions_1.default.streamIds());
                    const streamPreferencesJson = {};
                    streamIds.forEach(streamId => {
                        streamPreferencesJson[streamId] = streamPreferences_1.default
                            .get(streamId)
                            .toJson();
                    });
                    const responseJson = {
                        streamprefs: streamPreferencesJson,
                    };
                    return { responseJson };
                }
            };
            StreamPreferenceListHandler = __decorate([
                Path("/reader/api/0/preference/stream/list")
            ], StreamPreferenceListHandler);
            exports_10("StreamPreferenceListHandler", StreamPreferenceListHandler);
            UnreadCountHandler = class UnreadCountHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const responseJson = {
                        max: 1000000,
                        unreadcounts: [],
                    };
                    return { responseJson };
                }
            };
            UnreadCountHandler = __decorate([
                Path("/reader/api/0/unread-count")
            ], UnreadCountHandler);
            exports_10("UnreadCountHandler", UnreadCountHandler);
            RecommendationListHandler = class RecommendationListHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const responseJson = {
                        recs: [],
                    };
                    return { responseJson };
                }
            };
            RecommendationListHandler = __decorate([
                Path("/reader/api/0/recommendation/list")
            ], RecommendationListHandler);
            exports_10("RecommendationListHandler", RecommendationListHandler);
            TagListHandler = class TagListHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const responseJson = {
                        tags: tags_1.default.all().map(tag => tag.toJson()),
                    };
                    return { responseJson };
                }
            };
            TagListHandler = __decorate([
                Path("/reader/api/0/tag/list")
            ], TagListHandler);
            exports_10("TagListHandler", TagListHandler);
            SubscriptionListHandler = class SubscriptionListHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const responseJson = {
                        subscriptions: subscriptions_1.default.all().map(s => s.toJson()),
                    };
                    return { responseJson };
                }
            };
            SubscriptionListHandler = __decorate([
                Path("/reader/api/0/subscription/list")
            ], SubscriptionListHandler);
            exports_10("SubscriptionListHandler", SubscriptionListHandler);
            StreamContentsHandler = class StreamContentsHandler extends Handler_1.ApiHandler {
                handleApi() {
                    const streamId = decodeURIComponent(this.urlPathMatchResult[1]);
                    const streamJson = cannedData_3.default()[streamId];
                    if (streamJson) {
                        return { responseJson: streamJson };
                    }
                    return { responseJson: "", status: 404 };
                }
            };
            StreamContentsHandler = __decorate([
                Path(new RegExp("/reader/api/0/stream/contents/(.+)"))
            ], StreamContentsHandler);
            exports_10("StreamContentsHandler", StreamContentsHandler);
            exports_10("handlerFn", handlerFn = (url, body) => {
                let handlerConstructor = handlersByPath.get(url.pathname);
                let handlerPathMatchResult;
                if (handlerConstructor) {
                    handlerPathMatchResult = [url.pathname];
                }
                else {
                    for (let [pathRexp, pathHandlerConstructor] of handlersByRegExp) {
                        const result = pathRexp.exec(url.pathname);
                        if (result) {
                            handlerConstructor = pathHandlerConstructor;
                            handlerPathMatchResult = result;
                            break;
                        }
                    }
                }
                if (handlerConstructor && handlerPathMatchResult) {
                    const handler = new handlerConstructor(url, handlerPathMatchResult, body);
                    const { responseText, status } = handler.handle();
                    return { responseText, status: status !== undefined ? status : 200 };
                }
                console.warn(`Unhandled path: ${url.pathname}`);
                return { responseText: "", status: 404 };
            });
        }
    };
});
System.register("main", ["FakeXMLHttpRequest", "handlers"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var FakeXMLHttpRequest_1, handlers_1;
    return {
        setters: [
            function (FakeXMLHttpRequest_1_1) {
                FakeXMLHttpRequest_1 = FakeXMLHttpRequest_1_1;
            },
            function (handlers_1_1) {
                handlers_1 = handlers_1_1;
            }
        ],
        execute: function () {
            FakeXMLHttpRequest_1.default.setHandlerFn(handlers_1.handlerFn);
            window["XMLHttpRequest"] = FakeXMLHttpRequest_1.default;
        }
    };
});
