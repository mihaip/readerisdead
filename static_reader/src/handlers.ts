
import {ApiHandler, HandlerConstuctor} from "./Handler";
import preferences from "./preferences";

class PreferenceListHandler extends ApiHandler {
    handleApi() {

        const responseJson = {
            "prefs": preferences.keys().map(key => ({
                "id": key,
                "value": preferences.get(key),
            })),
        }
        return {responseJson};
    }
}

class PreferenceSetHandler extends ApiHandler {
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

class StreamPreferenceListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            "streamprefs": {},
        };
        return {responseJson};
    }
}

class UnreadCountHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            "max": 1000000,
            "unreadcounts": [],
        };
        return {responseJson};
    }
}

class RecommendationListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            "recs": [],
        };
        return {responseJson};
    }
}

class TagListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            "tags": [],
        };
        return {responseJson};
    }
}

class SubscriptionListHandler extends ApiHandler {
    handleApi() {
        const responseJson = {
            "subscriptions": [],
        };
        return {responseJson};
    }
}

const HANDLERS: { [key: string]: HandlerConstuctor } = {
    '/reader/api/0/preference/list': PreferenceListHandler,
    '/reader/api/0/preference/set': PreferenceSetHandler,
    '/reader/api/0/preference/stream/list': StreamPreferenceListHandler,
    '/reader/api/0/unread-count': UnreadCountHandler,
    '/reader/api/0/recommendation/list': RecommendationListHandler,
    '/reader/api/0/tag/list': TagListHandler,
    '/reader/api/0/subscription/list': SubscriptionListHandler,
};

export const handlerFn = (url: URL, body?: string): { responseText: string, status: number } => {
    if (url.pathname in HANDLERS) {
        const handler = new HANDLERS[url.pathname](url, body);
        const {responseText, status} = handler.handle();
        return {responseText, status: status !== undefined ? status : 200};
    }
    console.warn(`Unhandled path: ${url.pathname}`);
    return {responseText: "", status: 404};
}
