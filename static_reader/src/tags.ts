import {generateSortId} from "./sortIds";

class Tag {
    public readonly streamId: string;
    public readonly sortId: string;

    constructor(streamId: string) {
        this.streamId = streamId;
        this.sortId = generateSortId();
    }

    toJson(): Object {
        return {
            id: this.streamId,
            sortid: this.sortId,
        };
    }
}

class Tags {
    private data_: Map<string, Tag> = new Map();

    constructor() {
        const stateTag: (name: string) => Tag = name =>
            new Tag(`user/-/state/com.google/${name}`);
        const labelTag: (name: string) => Tag = name =>
            new Tag(`user/-/label/${name}`);

        this.add(stateTag("reading-list"));
        this.add(stateTag("starred"));
        this.add(stateTag("read"));
        this.add(stateTag("kept-unread"));
        this.add(labelTag("Reader Team"));
    }

    streamIds(): string[] {
        return Array.from(this.data_.values()).map(tag => tag.streamId);
    }

    add(tag: Tag): void {
        this.data_.set(tag.streamId, tag);
    }

    remove(tag: Tag): void {
        this.data_.delete(tag.streamId);
    }

    all(): Tag[] {
        return Array.from(this.data_.values());
    }
}

const tags = new Tags();
export default tags;
