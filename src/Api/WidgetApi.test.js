/**
 * WidgetApi.test.js
 *
 */

import { WidgetApi } from "./WidgetApi";
import { DashboardPublisher } from "../Dashboard/DashboardPublisher.js";

const electronApiMock = {
    data: {
        saveData: (data, filename, append) => {
            return { data, filename, append };
        },
    },
};

describe("WidgetApi tests ", () => {
    // Mock
    const uuid = "12345";
    let api, api2;
    const listeners = {
        handleSearchChange: ["CustomSearchbar[10].searchQueryChanged"],
    };

    const pub = DashboardPublisher;

    test("initialize the api", () => {
        api = new WidgetApi(uuid);
        const uuidOut = api.uuid();
        expect(uuidOut).toBe(uuid);
    });

    test("set the publisher", () => {
        api.setPublisher(pub);
        expect(api.pub).not.toBe(null);
    });

    test("register listeners ", () => {
        const handlerMap = {
            handleSearchChange: (data) => console.log(data),
        };
        api.registerListeners(listeners, handlerMap);
        expect(api.pub().listeners).not.toBe(null);
    });

    test("register listeners duplicate listener ", () => {
        const handlerMap = {
            handleSearchChange: (data) => console.log(data),
        };
        api.registerListeners(listeners, handlerMap);
        // holds them as an array
        const eventType = listeners[Object.keys(listeners)[0]][0];
        const handlersForKey = api.pub().listeners().get(eventType);
        expect(handlersForKey.length).toEqual(1);
    });

    test("register listeners same event different widget ", () => {
        const uuid2 = "34567";
        api2 = new WidgetApi(uuid2);
        api2.setPublisher(pub);
        const handlerMap = {
            handleSearchChange: (data) => console.log(data),
        };
        api2.registerListeners(listeners, handlerMap);
        // holds them as an array
        const eventType = listeners[Object.keys(listeners)[0]][0];
        const handlersForKey = api2.pub().listeners().get(eventType);
        expect(handlersForKey.length).toEqual(2);
    });

    test("emit event from pub ", () => {
        // holds them as an array
        const eventType = "CustomSearchbar[10].searchQueryChanged";
        api2.publishEvent(eventType, { test: "hello" });
        expect();
    });

    test.skip("store data to test.txt", () => {
        const dataToSave = "test";
        let result = null;
        const api3 = new WidgetApi("123");
        api3.setElectronApi(electronApiMock);
        api3.storeData({
            data: dataToSave,
            filename: "test.txt",
            callbackComplete: (e, message) => {
                console.log("complete", e, message);
                result = message;
                expect(result).not.toBe(null);
            },
            callbackError: (e, message) => {
                console.log("error: ", e, message);
                result = null;
                expect(result).not.toBe(null);
            },
            append: true,
        });
    });
});
