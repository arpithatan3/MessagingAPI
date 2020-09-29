import * as Constants from './utils/constants';
import WindowHandler from './windowHandler';
import StatusUtil from './utils/statusUtil';

export default class EventHandler {
    private windowHandler: WindowHandler;

    constructor(windowHandler) {
        this.windowHandler = windowHandler;
    }

    public subscribe(event: string, handler: Function): Status {
        if (!window.registry[event]) {
            window.registry[event] = [handler];
        }
        else {
            window.registry[event].push(handler);
        }
        // publishGlobalRegistryChangeEvent();
        return StatusUtil(Constants.EVENT_REGISTERED);
    }

    private removeEventHandler(event: string, handler: Function): Array<Function> {
        const allHandlers = window.registry[event];
        const newHandlerList = allHandlers.filter(i => i !== handler);
        return newHandlerList;
    }

    public unSubscribe(event: string, handler: Function): Status {
        if (!event || !window.registry[event]) {
            return StatusUtil(Constants.EVENT_NOT_FOUND);
        }
        if (handler && window.registry[event].length) {
            const newHandlerList = this.removeEventHandler(event, handler);
            if (newHandlerList.length < window.registry[event].length) { //handler is removed from the list
                // publishGlobalRegistryChangeEvent([topic], 'UPDATE');
                return StatusUtil(Constants.HANDLER_UPDATED);
            }
            return StatusUtil(Constants.HANDLER_NOT_FOUND);
        }
        return this.unSubscribeAll(event);
    }

    public unSubscribeAll(event: string): Status {
        if (!event || !window.registry[event]) {
            return StatusUtil(Constants.EVENT_NOT_FOUND);
        }
        delete window.registry[event];
        // publishGlobalRegistryChangeEvent([topic], 'DELETE');
        return StatusUtil(Constants.EVENT_DELETED);
    }

    public getAllHandlers(event: string): Array<Function> {
        if (event && window.registry[event]) {
            return registry[event];
        }
    }

    public publish(event: string, data: any, sourceWindow?: Window | MessageEventSource): Status {
        if (event) {
            this.windowHandler.publishToOtherWindows(event, data, sourceWindow || window);
            if (!window.registry[event]) {
                return StatusUtil(Constants.EVENT_NOT_FOUND);
            }
            window.registry[event].forEach(item => item(data));
        }
    }
}