export interface HandlerResponse {
    responseText: string;
    status?: number;
}

export interface HandlerConstuctor {
    new (url: URL, urlPathMatchResult: string[], body?: string): Handler;
}

export abstract class Handler {
    protected url: URL;
    protected urlPathMatchResult : string[];
    protected params: URLSearchParams;

    constructor(url: URL, urlPathMatchResult: string[], body?: string) {
        this.url = url;
        this.urlPathMatchResult = urlPathMatchResult;
        let paramsString: string = url.search;
        if (body) {
            paramsString += "&" + body;
        }
        this.params = new URLSearchParams(paramsString);
    }

    abstract handle(): HandlerResponse;
}

export interface ApiHandlerResponse {
    responseJson?: any;
    status?: number;
}

export abstract class ApiHandler extends Handler {
    handle(): HandlerResponse {
        const {responseJson, status} = this.handleApi();
        return {
            responseText: responseJson ?
                JSON.stringify(responseJson, undefined, 2) : "",
            status,
        };
    }

    abstract handleApi(): ApiHandlerResponse;
}
