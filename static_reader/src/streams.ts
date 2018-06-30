import * as cannedData from "./cannedData";

class Streams {
    getStreamJson(streamId: string): any {
        if (streamId.startsWith("feed/")) {
            return cannedData.getCannedStreamData(streamId);
        }
        return null;
    }
}

const streams = new Streams();
export default streams;
