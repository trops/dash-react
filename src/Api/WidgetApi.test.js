/**
 * WidgetApi.test.js
 *
 */

import { WidgetApi } from "./WidgetApi";
import { DashboardPublisher } from "../Dashboard/DashboardPublisher.js";

describe("WidgetApi tests ", () => {
    // Mock
    const uuid = "12345";
    let api;
    const listeners = {
        handleSearchChange: ["CustomSearchbar[10].searchQueryChanged"],
    };

    test("initialize the api", () => {
        api = WidgetApi;
        api.init(uuid);
        const uuidOut = WidgetApi.uuid();
        expect(uuidOut).toBe(uuid);
    });

    test("set the publisher", () => {
        api.setPublisher(DashboardPublisher);
        expect(api.pub).not.toBe(null);
    });

    test("register listeners ", () => {
        const handlerMap = {
            handleSearchChange: (data) => console.log(data),
        };
        api.registerListeners(listeners, handlerMap);
        console.log(api.pub().listeners());
        expect(api.pub().listeners).not.toBe(null);
    });

    test("register listeners duplicate listener ", () => {
        const handlerMap = {
            handleSearchChange: (data) => console.log(data),
        };
        api.registerListeners(listeners, handlerMap);

        // holds them as an array
        const eventType = listeners[Object.keys(listeners)[0]][0];

        const handlersForKey = api.pub().listeners().get(eventType)[uuid];

        expect(handlersForKey.length).not.toEqual(2);
    });

    test("emit event from pub ", () => {
        // holds them as an array
        const eventType = listeners[Object.keys(listeners)[0]][0];
        api.publishEvent(eventType, { test: "hello" });

        expect();
    });
});
