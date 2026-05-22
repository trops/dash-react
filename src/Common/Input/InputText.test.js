/**
 * InputText — override-prop pins.
 *
 * Pins `height` and `padding` overrides. Default values preserve the
 * prior baked `h-10 px-3 py-2` shape; overrides let compact form
 * contexts (sidebar filters, inline composers) opt to a denser look.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputText } from "./InputText";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "", textColor: "", focusRingColor: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { INPUT_TEXT: "input-text", FORM_LABEL: "form-label" },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("InputText override props", () => {
    test("applies the default h-10 px-3 py-2", () => {
        const { container } = renderWithTheme(<InputText />);
        const input = container.querySelector("input");
        expect(input.className).toMatch(/(^| )h-10( |$)/);
        expect(input.className).toMatch(/px-3 py-2/);
    });

    test("honors a custom height override", () => {
        const { container } = renderWithTheme(<InputText height="h-7" />);
        const input = container.querySelector("input");
        expect(input.className).toMatch(/(^| )h-7( |$)/);
        expect(input.className).not.toMatch(/(^| )h-10( |$)/);
    });

    test("honors a custom padding override", () => {
        const { container } = renderWithTheme(
            <InputText padding="px-2 py-1" />
        );
        const input = container.querySelector("input");
        expect(input.className).toMatch(/px-2 py-1/);
        expect(input.className).not.toMatch(/px-3 py-2/);
    });
});
