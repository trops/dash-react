import { isObject } from "@dash/Utils";

const event = {
    list: new Map(),

    // register the event types to listen for...
    on(eventType, eventAction, widgetId = null) {
        console.log("subscribing check ", eventType);
        this.list.has(eventType) || this.list.set(eventType, []);
        if (this.list.get(eventType)) {
            //const eventActions = this.list.get(eventType);
            this.list.get(`${eventType}`).push(eventAction);
        }
        return this;
    },

    // publish events...
    emit(eventType, ...args) {
        this.list.get(`${eventType}`) &&
            this.list.get(`${eventType}`).forEach((cb) => {
                console.log("emitting ", eventType, cb);
                // if (typeof cb === 'Function') {
                cb(...args);
                // }
            });
    },
};

export const DashboardPublisher = {
    sub: (eventType, action) => {
        event.on(eventType, action);
    },
    pub: (eventType, content) => {
        event.emit(eventType, content);
        // send to ALL
        event.emit("DashboardPublisher.monitor", { eventType, content });
    },

    registerListeners: (listeners, handlerMap) => {
        if (listeners !== undefined) {
            if (isObject(listeners) === true) {
                Object.keys(listeners).forEach((handlerKey) => {
                    if (handlerKey in listeners) {
                        listeners[handlerKey].forEach((event) => {
                            // subscribe our listeners
                            DashboardPublisher.sub(
                                event,
                                handlerMap[handlerKey]
                            );
                        });
                    }
                });
            }
        }
    },

    removeAllListeners: () => {
        // we want to begin fresh when we switch workspaces...
        console.log("CURRENT LISTENERS ", event.list);
        Array(event.list).forEach((event) => {
            console.log("remove event ", event);
        });
        // this.list.get(`${eventType}`) && this.list.get(`${eventType}`).forEach((cb) => {
        //     // lets only remove the workspace and widget listeners
        //     // not the main application dashboard listeners
        //     console.log('remove listeners ', eventType, cb);
        // });
    },
    clearAllMessage: () => {
        event.emit("clearAllMessage");
    },
};
