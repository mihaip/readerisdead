import {generateSortId} from "./sortIds";
import {
    getCannedStreamIds,
    getCannedStreamData,
    getCannedStreamFolders,
} from "./cannedData";

class Subscription {
    public streamId: string;
    public title: string;
    public htmlUrl: string;
    public sortId: string;
    public firstItemMsec: number;
    public folders: string[];

    constructor(streamId: string, title: string, htmlUrl: string) {
        this.streamId = streamId;
        this.title = title;
        this.htmlUrl = htmlUrl;
        this.sortId = generateSortId();
        this.firstItemMsec = 0;
        this.folders = [];
    }

    addFolder(folder: string): void {
        this.folders.push(folder);
    }

    toJson(): Object {
        return {
            id: this.streamId,
            title: this.title,
            sortid: this.sortId,
            firstitemmsec: this.firstItemMsec,
            categories: this.folders.map(folder => ({
                id: `user/-/label/${folder}`,
                label: folder,
            })),
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

for (const streamId of getCannedStreamIds()) {
    const cannedStreamData = getCannedStreamData(streamId);
    const subscription = new Subscription(
        cannedStreamData["id"],
        cannedStreamData["title"],
        cannedStreamData["htmlUrl"]
    );
    for (const folder of getCannedStreamFolders(streamId)) {
        subscription.addFolder(folder);
    }
    subscriptions.add(subscription);
}

export default subscriptions;
