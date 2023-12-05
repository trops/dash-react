/**
 * WidgetHelpers
 *
 * Class created to act as a proxy for the widgetApi
 * to pass in the widget params do the developer
 * doesnt have to.
 */
export class WidgetHelpers {
    params = null;

    // the widget api that will be called by the helper function
    // default to empty functions
    api = {
        publishEvent: () => {},
        registerListeners: () => {},
    };

    constructor(params, api) {
        this.params = params;
        this.api = api;
    }

    listen(listeners, handlers) {
        this.api.registerListeners(listeners, handlers, this.params.uuid);
    }

    publishEvent(eventName, payload) {
        this.api.publishEvent(
            `${this.params.component}[${this.params.id}].${eventName}`,
            payload
        );
    }
}
