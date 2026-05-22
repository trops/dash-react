/**
 * Alert — override-prop pins.
 *
 * Pins `padding`, `rounded`, and `divider` (`border-l-4` accent)
 * overrides on Alert / Alert2 / Alert3. `divider={false}` is the
 * load-bearing one: inline error contexts shouldn't show the
 * accent stripe.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Alert, Alert2, Alert3 } from "./Alert";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        backgroundColor: "",
        borderColor: "",
        textColor: "",
    }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { ALERT: "alert", ALERT_2: "alert-2", ALERT_3: "alert-3" },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe.each([
    ["Alert", Alert, "p-4"],
    ["Alert2", Alert2, "p-3"],
    ["Alert3", Alert3, "p-2"],
])("%s override props", (label, Component, defaultPadding) => {
    test(`${label} applies the default padding`, () => {
        const { container } = renderWithTheme(<Component title="boom" />);
        expect(container.firstChild.className).toMatch(defaultPadding);
    });

    test(`${label} honors a custom padding override`, () => {
        const { container } = renderWithTheme(
            <Component title="boom" padding="p-1" />
        );
        expect(container.firstChild.className).toMatch(/(^| )p-1( |$)/);
    });

    test(`${label} renders the left-accent divider by default`, () => {
        const { container } = renderWithTheme(<Component title="boom" />);
        expect(container.firstChild.className).toMatch(/border-l-4/);
    });

    test(`${label} omits the left-accent divider when divider={false}`, () => {
        const { container } = renderWithTheme(
            <Component title="boom" divider={false} />
        );
        expect(container.firstChild.className).not.toMatch(/border-l-4/);
    });

    test(`${label} honors a custom rounded override`, () => {
        const { container } = renderWithTheme(
            <Component title="boom" rounded="rounded-none" />
        );
        expect(container.firstChild.className).toMatch(/rounded-none/);
    });
});
