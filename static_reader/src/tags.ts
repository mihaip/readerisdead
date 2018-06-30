import {generateSortId} from "./sortIds";
import {getCannedFolders} from "./cannedData";

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

export class FolderTag extends Tag {
    public readonly name: string;

    constructor(name: string) {
        super(`user/-/label/${name}`);
        this.name = name;
    }
}

class Tags {
    public readonly readingList: Tag;
    private data_: Map<string, Tag> = new Map();

    constructor() {
        const stateTag: (name: string) => Tag = name =>
            new Tag(`user/-/state/com.google/${name}`);

        this.readingList = stateTag("reading-list");
        this.add(this.readingList);
        this.add(stateTag("starred"));
        this.add(stateTag("read"));
        this.add(stateTag("kept-unread"));
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

for (const folder of getCannedFolders()) {
    tags.add(new FolderTag(folder));
}

export default tags;
