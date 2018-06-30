import * as cannedData from "./cannedData";
import tags from "./tags";
import subscriptions from "./subscriptions";

class Streams {
    getStreamJson(streamId: string): any {
        if (streamId.startsWith("feed/")) {
            return cannedData.getCannedStreamData(streamId);
        }

        let expandedSubscriptions;
        if (streamId == tags.readingList.streamId) {
            expandedSubscriptions = subscriptions.all();
        } else {
            expandedSubscriptions = subscriptions
                .all()
                .filter(s => s.folders.some(f => f.streamId == streamId));
        }
        if (!expandedSubscriptions) {
            return null;
        }

        const mergedStreamData = {items: []};
        for (let subscription of expandedSubscriptions) {
            const streamId = subscription.streamId;
            const streamData = cannedData.getCannedStreamData(streamId);
            mergedStreamData.items = mergedStreamData.items.concat(
                streamData.items
            );
        }
        mergedStreamData.items.sort((item1: any, item2: any) => {
            return item2.published - item1.published;
        });

        return mergedStreamData;
    }
}

const streams = new Streams();
export default streams;
