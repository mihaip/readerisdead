import {Preferences} from "./preferences";

class StreamPreferences {
    private data_: Map<string, Preferences> = new Map();

    get(streamId: string): Preferences {
        let preferences = this.data_.get(streamId);
        if (!preferences) {
            preferences = new Preferences();
            this.data_.set(streamId, preferences);
        }
        return preferences;
    }
}

const streamPreferences = new StreamPreferences();
export default streamPreferences;
