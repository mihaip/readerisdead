export default class FakeXMLHttpRequest {
    private readyState_: ReadyState;
    private status_: number;
    private responseText_: string | null;

    private url_?: string;
    private async_?: boolean;
    private body_?: string;
    private readyStateChangeHandler_?: (ev: ProgressEvent) => any;

    static handlerFn_?: HandlerFn;

    constructor() {
        this.readyState_ = ReadyState.UNSENT;
        this.status_ = 0;
        this.responseText_ = null;
    }

    static setHandlerFn(handlerFn: HandlerFn): void {
        FakeXMLHttpRequest.handlerFn_ = handlerFn;
    }

    open(method: string, url: string, async: boolean = true): void {
        this.url_ = url;
        this.async_ = async;
        this.setReadyState_(ReadyState.OPENED);
    }

    send(body?: string) {
        this.body_ = body;
        if (this.async_) {
            setTimeout(() => this.handle_(), 0);
        } else {
            this.handle_();
        }
    }

    set onreadystatechange(handler: (ev: ProgressEvent) => any) {
        this.readyStateChangeHandler_ = handler;
    }

    get readyState() {
        return this.readyState_;
    }

    get responseText() {
        return this.responseText_;
    }

    get status() {
        return this.status_;
    }

    get statusText() {
        switch (this.status_) {
            case 0:
                return "Offline";
            case 200:
                return "OK";
            case 404:
                return "Not Found";
            case 500:
                return "Internal Server Error";
            default:
                return "Unknown";
        }
    }

    handle_() {
        if (!this.url_) {
            throw new Error("send() called before open()");
        }
        if (!FakeXMLHttpRequest.handlerFn_) {
            throw new Error("no handler function is set");
        }
        const url = new URL(this.url_, location.href);
        const {responseText, status} = FakeXMLHttpRequest.handlerFn_(
            url,
            this.body_
        );

        this.responseText_ = responseText;
        this.status_ = status;
        this.setReadyState_(ReadyState.DONE);
    }

    setReadyState_(readyState: ReadyState) {
        this.readyState_ = readyState;
        if (this.readyStateChangeHandler_) {
            this.readyStateChangeHandler_.call(this);
        }
    }

    // Remainder of minial XMLHttpRequest API required to keep things working.
    setRequestHeader() {}
    getResponseHeader(name: string): string | null {
        return null;
    }
}

enum ReadyState {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
}

type HandlerFn = (
    url: URL,
    body?: string
) => {responseText: string; status: number};
