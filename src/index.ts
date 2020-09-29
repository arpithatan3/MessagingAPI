import EventHandler from './eventHandler';
import WindowHandler from './windowHandler';

let windowHandler: WindowHandler;
let eventHandler: EventHandler;

(function init() {
    windowHandler = new WindowHandler(window.opener);
    eventHandler = new EventHandler(windowHandler);
    if (!window.registry) { 
        window.childWindows = [];
        window.registry = {};
        window.addEventListener("message", (postMessage) => {
            if (postMessage?.data) {
                const msg = postMessage.data;
                eventHandler.publish(msg.event, msg.data, postMessage.source);
            }
        }, false);
        window.onbeforeunload = windowHandler.closeAllChildWindows.bind(windowHandler);
    }
})();

export default {
    eventHandler,
    windowHandler
};