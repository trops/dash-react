/**
 * Panel — `rounded` override-prop pin.
 *
 * Panel / Panel2 / Panel3 (and their Headers + Footers) previously
 * baked in `rounded-lg` / `rounded-md` / `rounded` (and `rounded-t` /
 * `rounded-b` for the children). These pins make sure the new
 * `rounded` prop (string-default) lets flat/sharp design systems
 * opt out without dropping to raw markup.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Panel, Panel2, Panel3 } from "./Panel";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: {
        PANEL: "panel",
        PANEL_2: "panel-2",
        PANEL_3: "panel-3",
        PANEL_HEADER: "panel-header",
        PANEL_HEADER_2: "panel-header-2",
        PANEL_HEADER_3: "panel-header-3",
        PANEL_FOOTER: "panel-footer",
        PANEL_FOOTER_2: "panel-footer-2",
        PANEL_FOOTER_3: "panel-footer-3",
    },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe.each([
    ["Panel", Panel, "rounded-lg"],
    ["Panel2", Panel2, "rounded-md"],
    ["Panel3", Panel3, /(^| )rounded( |$)/],
])("%s rounded override", (label, Component, defaultMatch) => {
    test(`${label} applies the default rounded class`, () => {
        const { container } = renderWithTheme(<Component>body</Component>);
        expect(container.firstChild.className).toMatch(defaultMatch);
    });

    test(`${label} honors a custom rounded override`, () => {
        const { container } = renderWithTheme(
            <Component rounded="rounded-none">body</Component>
        );
        expect(container.firstChild.className).toMatch(/rounded-none/);
    });
});

describe("PanelHeader / PanelFooter rounded override", () => {
    test("PanelHeader honors rounded='' for flush headers", () => {
        const { container } = renderWithTheme(
            <Panel.Header rounded="">header</Panel.Header>
        );
        // No `rounded-t` token — but the test allows `rounded-b` etc. to coexist if Panel
        expect(container.firstChild.className).not.toMatch(/rounded-t/);
    });

    test("PanelFooter honors a custom rounded override", () => {
        const { container } = renderWithTheme(
            <Panel.Footer rounded="rounded-none">footer</Panel.Footer>
        );
        expect(container.firstChild.className).toMatch(/rounded-none/);
    });
});
