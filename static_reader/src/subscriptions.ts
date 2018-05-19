import {generateSortId} from "./sortIds";

class Subscription {
    public streamId: string;
    public title: string;
    public htmlUrl: string;
    public sortId: string;
    public firstItemMsec: number;

    constructor(feedUrl: string, title: string, htmlUrl: string) {
        this.streamId = `feed/${feedUrl}`;
        this.title = title;
        this.htmlUrl = htmlUrl;
        this.sortId = generateSortId();
        this.firstItemMsec = 0;
    }

    toJson(): Object {
        return {
            id: this.streamId,
            title: this.title,
            sortid: this.sortId,
            firstitemmsec: this.firstItemMsec,
            categories: [],
            htmlUrl: this.htmlUrl,
        };
    }
}

class Subscriptions {
    private subscriptions_: Subscription[];

    constructor() {
        this.subscriptions_ = [];
    }

    all(): Subscription[] {
        return this.subscriptions_;
    }

    add(subscription: Subscription) {
        this.subscriptions_.push(subscription);
    }

    streamIds(): string[] {
        return this.subscriptions_.map(s => s.streamId);
    }
}

const subscriptions = new Subscriptions();

subscriptions.add(
    new Subscription(
        "http://googlereader.blogspot.com/atom.xml",
        "The Official Google Reader Blog",
        "http://googlereader.blogspot.com/"
    )
);

export default subscriptions;
