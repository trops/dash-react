/**
 * Menu — border-forwarding pin.
 *
 * Menu / Menu2 / Menu3 are thin Panel wrappers that previously
 * destructured the `border` prop without forwarding it, making
 * `<Menu border={false}>` a silent no-op (the underlying Panel kept
 * its default `border={true}` and rendered a card). These tests pin
 * the forwarding so the silent failure can't return.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu, Menu2, Menu3 } from "./Menu";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "" }),
    getUUID: (uuid, prefix) => `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { PANEL: "panel", PANEL_2: "panel-2", PANEL_3: "panel-3" },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe.each([
    ["Menu", Menu],
    ["Menu2", Menu2],
    ["Menu3", Menu3],
])("%s — border prop forwarding", (label, Component) => {
    test(`${label} renders the bordered class when border is true`, () => {
        const { container } = renderWithTheme(
            <Component border={true}>
                <div>item</div>
            </Component>
        );
        const root = container.firstChild;
        expect(root.className).toMatch(/(^| )border( |$)/);
    });

    test(`${label} omits the bordered class when border is false`, () => {
        const { container } = renderWithTheme(
            <Component border={false}>
                <div>item</div>
            </Component>
        );
        const root = container.firstChild;
        expect(root.className).not.toMatch(/(^| )border( |$)/);
    });

    test(`${label} defaults to chromeless (border={false}) so sidebar/rail callers don't need to opt out`, () => {
        // Confirms the Menu wrapper's stated default — `border = false`
        // in the destructure — is what actually reaches Panel.
        const { container } = renderWithTheme(
            <Component>
                <div>item</div>
            </Component>
        );
        const root = container.firstChild;
        expect(root.className).not.toMatch(/(^| )border( |$)/);
    });
});
