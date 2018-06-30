declare var _CANNED_FOLDER_DATA: {[key: string]: string[]};
declare var _CANNED_FEED_DATA: {[key: string]: any};

export function getCannedStreamIds(): string[] {
    return Object.keys(_CANNED_FEED_DATA);
}

export function getCannedStreamData(streamId: string): {[key: string]: any} {
    return _CANNED_FEED_DATA[streamId];
}

export function getCannedFolders(): string[] {
    return Object.keys(_CANNED_FOLDER_DATA);
}

export function getCannedStreamFolders(streamId: string): string[] {
    return getCannedFolders().filter(
        folder => _CANNED_FOLDER_DATA[folder].indexOf(streamId) != -1
    );
}
