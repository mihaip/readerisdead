export class Preferences {
    private data_: {[key: string]: string} = {
        // Disable G+ share and email actions, since they won't work.
        // Abdulla: your feature finally gets some use!
        "item-actions": JSON.stringify({
            "plusone-action": true,
            "share-action": false,
            "email-action": false,
            "tags-action": true,
        }),

        "lhn-prefs": JSON.stringify({
            // Collapse the "All Items" section by default, trends and other
            // things are not going to be populated.
            selectors: {
                ism: "true",
            },
            // Same with "Explore"
            recommendations: {
                ism: "true",
            },
        }),

        // Oldest first is no longer limited to the last 30 days, don't
        /// show the interruption that warns about that.
        "show-oldest-interrupt": "false",

        // We have no read state, and we want to show all items by default.
        "read-items-visible": "true",

        // Always start with the overview page, since that shows some
        // explanatory
        "start-page": "home",

        // Turn off more "helpful" interruptions.
        "show-scroll-help": "false",
        "show-search-clarification": "false",
        "show-blogger-following-intro": "false",
    };

    get(key: string): string {
        return this.data_[key];
    }

    set(key: string, value: string): void {
        this.data_[key] = value;
    }

    toJson(): Object[] {
        return Object.keys(this.data_).map(key => ({
            id: key,
            value: this.data_[key],
        }));
    }
}

const preferences = new Preferences();
export default preferences;
