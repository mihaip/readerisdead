function s4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generateSortId(): string {
    return s4() + s4();
}
