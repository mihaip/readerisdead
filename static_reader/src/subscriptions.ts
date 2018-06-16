import {generateSortId} from "./sortIds";
import getCannedData from "./cannedData";

class Subscription {
    public streamId: string;
    public title: string;
    public htmlUrl: string;
    public sortId: string;
    public firstItemMsec: number;

    constructor(streamId: string, title: string, htmlUrl: string) {
        this.streamId = streamId;
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

for (const streamId in getCannedData()) {
    const cannedStreamData = getCannedData()[streamId];
    subscriptions.add(
        new Subscription(
            cannedStreamData["id"],
            cannedStreamData["title"],
            cannedStreamData["htmlUrl"]
        )
    );
}

export default subscriptions;
