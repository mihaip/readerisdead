import {ApiHandler, HandlerConstuctor} from "./Handler";
import getCannedData from "./cannedData";
import preferences from "./preferences";
import streamPreferences from "./streamPreferences";
import subscriptions from "./subscriptions";
import tags from "./tags";

const handlersByPath: Map<string, HandlerConstuctor> = new Map();
const handlersByRegExp: Map<RegExp, HandlerConstuctor> = new Map();

function Path(pathPattern: string | RegExp) {
    return function(handlerConstuctor: HandlerConstuctor) {
        if (typeof pathPattern === "string") {
            handlersByPath.set(pathPattern, handlerConstuctor);
        } else {
            handlersByRegExp.set(pathPattern, handlerConstuctor);
        }
    };
}

@Path("/reader/api/0/preference/list")
export class PreferenceListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            prefs: preferences.toJson(),
        };
        return {responseJson};
    }
}

@Path("/reader/api/0/preference/set")
export class PreferenceSetHandler extends ApiHandler {
    handleApi() {
        const key = this.params.get("k");
        const value = this.params.get("v");
        if (key === null || value === null) {
            return {status: 400};
        }
        preferences.set(key, value);
        return {responseJson: "OK"};
    }
}

@Path("/reader/api/0/preference/stream/list")
export class StreamPreferenceListHandler extends ApiHandler {
    handleApi() {
        const streamIds = tags.streamIds().concat(subscriptions.streamIds());
        const streamPreferencesJson: {[key: string]: Object} = {};
        streamIds.forEach(streamId => {
            streamPreferencesJson[streamId] = streamPreferences
                .get(streamId)
                .toJson();
        });
        const responseJson = {
            streamprefs: streamPreferencesJson,
        };
        return {responseJson};
    }
}

@Path("/reader/api/0/unread-count")
export class UnreadCountHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            max: 1000000,
            unreadcounts: [],
        };
        return {responseJson};
    }
}

@Path("/reader/api/0/recommendation/list")
export class RecommendationListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            recs: [],
        };
        return {responseJson};
    }
}

@Path("/reader/api/0/tag/list")
export class TagListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            tags: tags.all().map(tag => tag.toJson()),
        };
        return {responseJson};
    }
}

@Path("/reader/api/0/subscription/list")
export class SubscriptionListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            subscriptions: subscriptions.all().map(s => s.toJson()),
        };
        return {responseJson};
    }
}

@Path(new RegExp("/reader/api/0/stream/contents/(.+)"))
export class StreamContentsHandler extends ApiHandler {
    handleApi() {
        const streamId = decodeURIComponent(this.urlPathMatchResult[1]);
        const streamJson = getCannedData()[streamId];
        if (streamJson) {
            return {responseJson: streamJson};
        }
        return {responseJson: "", status: 404};
    }
}

export const handlerFn = (
    url: URL,
    body?: string
): {responseText: string; status: number} => {
    let handlerConstructor = handlersByPath.get(url.pathname);
    let handlerPathMatchResult;
    if (handlerConstructor) {
        handlerPathMatchResult = [url.pathname];
    } else {
        for (let [pathRexp, pathHandlerConstructor] of handlersByRegExp) {
            const result = pathRexp.exec(url.pathname);
            if (result) {
                handlerConstructor = pathHandlerConstructor;
                handlerPathMatchResult = result;
                break;
            }
        }
    }
    if (handlerConstructor && handlerPathMatchResult) {
        const handler = new handlerConstructor(
            url,
            handlerPathMatchResult,
            body
        );
        const {responseText, status} = handler.handle();
        return {responseText, status: status !== undefined ? status : 200};
    }
    console.warn(`Unhandled path: ${url.pathname}`);
    return {responseText: "", status: 404};
};
