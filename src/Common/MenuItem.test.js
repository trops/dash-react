/**
 * MenuItem — override-prop pins.
 *
 * Pins the new `padding` and `rounded` props (string-default) for
 * MenuItem / MenuItem2 / MenuItem3. The baked-in `px-3 py-2`
 * (MenuItem) / `px-3 py-1.5` (MenuItem2/3) and `rounded-md` were
 * blocking sidebar-rail density; these tests make sure consumers can
 * override them without dropping to a raw div.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MenuItem, MenuItem2, MenuItem3 } from "./MenuItem";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: {
        MENU_ITEM: "menu-item",
        MENU_ITEM_2: "menu-item-2",
        MENU_ITEM_3: "menu-item-3",
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
    ["MenuItem", MenuItem, "px-3 py-2"],
    ["MenuItem2", MenuItem2, "px-3 py-1.5"],
    ["MenuItem3", MenuItem3, "px-3 py-1.5"],
])("%s override props", (label, Component, defaultPadding) => {
    test(`${label} applies the default padding when none is passed`, () => {
        const { container } = renderWithTheme(<Component>row</Component>);
        expect(container.firstChild.className).toMatch(defaultPadding);
    });

    test(`${label} honors a custom padding override`, () => {
        const { container } = renderWithTheme(
            <Component padding="px-1 py-0.5">row</Component>
        );
        expect(container.firstChild.className).toMatch(/px-1 py-0\.5/);
        expect(container.firstChild.className).not.toMatch(defaultPadding);
    });

    test(`${label} applies rounded-md by default`, () => {
        const { container } = renderWithTheme(<Component>row</Component>);
        expect(container.firstChild.className).toMatch(/rounded-md/);
    });

    test(`${label} honors a custom rounded override (chromeless sidebar row)`, () => {
        const { container } = renderWithTheme(
            <Component rounded="">row</Component>
        );
        expect(container.firstChild.className).not.toMatch(/rounded-md/);
    });
});
