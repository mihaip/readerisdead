import FakeXMLHttpRequest from "./FakeXMLHttpRequest";
import {handlerFn} from "./handlers";

FakeXMLHttpRequest.setHandlerFn(handlerFn);

(window as any)["XMLHttpRequest"] = FakeXMLHttpRequest;
