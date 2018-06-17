import getCannedData from "./cannedData";

function htmlEscape(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function htmlStrip(str: string): string {
    return str
        .replace(/<[^>]*>?/gi, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}

function renderStreamItem(streamId: string): string {
    const streamJson = getCannedData()[streamId];
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
         <br><span class="unread">${new Date(
             item["published"] * 1000
         ).toLocaleDateString()}</span>
      </p>
      <p class="item-snippet overview-item-link" id="${item["id"]}">
        ${htmlEscape(
            htmlStrip(item["content"]["content"]).substring(0, 160)
        )}&hellip;
      </p>
    </div>
  </div>
`;
}

export default function renderOverviewPage(): string {
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

            ${renderStreamItem(
                "feed/http://googlereader.blogspot.com/atom.xml"
            )}

            ${renderStreamItem(
                "feed/http://feeds.feedburner.com/PersistentInfo"
            )}

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
