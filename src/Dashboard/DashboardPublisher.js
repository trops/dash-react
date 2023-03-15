import { isObject } from "@dash/Utils/objects";

const event = {
    list: new Map(),

    //  Map(1) { '12345' => { 'CustomSearchbar[10].searchQueryChanged': [] } }
    /**
     * on
     *
     * Register a unique event to a unique widget
     * Widgets can ONLY listen to an event ONCE, you cannot have
     * multiple handlers in the same widget.
     *
     * @param {string} eventType the unique event type for a widget
     * @param {*} eventAction the handler for the event type
     * @param {*} uuid the UUID of the widget listening
     * @returns
     */
    on(eventType, eventAction, uuid = null) {
        this.list.has(eventType) || this.list.set(eventType, {});
        // this.list.has(uuid) || this.list.set(uuid, {});
        if (this.list.get(eventType)) {
            // this is key:value pair mapping
            // each key is a widget UUID
            let currentActionsForEvent = this.list.get(eventType);
            if (uuid in currentActionsForEvent === false) {
                currentActionsForEvent[uuid] = eventAction;
                this.list.set(eventType, currentActionsForEvent);
            }
        }
        return this;
    },

    // publish events...
    emit(eventType, ...args) {
        const subscriptionsToEvent = this.list.get(eventType);
        if (
            subscriptionsToEvent &&
            Object.keys(subscriptionsToEvent).length > 0
        ) {
            console.log(subscriptionsToEvent);
            Object.keys(subscriptionsToEvent).forEach((subscriber) => {
                subscriptionsToEvent[subscriber](...args);
                //console.log("emitting ", eventType, cb);
                // if (typeof cb === 'Function') {
                // cb(...args);
                // }
            });
        }
    },
};

export const DashboardPublisher = {
    sub: (eventType, action, uuid) => {
        event.on(eventType, action, uuid);
    },
    pub: (eventType, content) => {
        event.emit(eventType, content);
        // send to ALL
        event.emit("DashboardPublisher.monitor", { eventType, content });
    },

    listeners: () => event.list,

    registerListeners: (listeners, handlerMap, uuid) => {
        if (listeners !== undefined) {
            if (isObject(listeners) === true) {
                Object.keys(listeners).forEach((handlerKey) => {
                    if (handlerKey in listeners) {
                        listeners[handlerKey].forEach((event) => {
                            // subscribe our listeners
                            DashboardPublisher.sub(
                                event,
                                handlerMap[handlerKey],
                                uuid
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
