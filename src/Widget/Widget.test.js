/**
 * WidgetApi.test.js
 *
 */

import renderer from "react-test-renderer";
import { Widget } from "./Widget";

const electronApiMock = {
    data: {
        saveData: (data, filename, append) => {
            return { data, filename, append };
        },
    },
};

describe("Widget tests ", () => {
    // Mock
    const uuid = "12345";
    let api, api2;
    const listeners = {
        handleSearchChange: ["CustomSearchbar[10].searchQueryChanged"],
    };

    const pub = DashboardPublisher;

    test("render a Widget", () => {
        const r = renderer.create(<Widget>test</Widget>);
        console.log(r.toJSON());
    });
});
