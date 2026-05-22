/**
 * TextArea — override-prop pin.
 *
 * Pins the `padding` override. Default preserves `px-3 py-2`; compact
 * composer rows can opt for tighter padding without dropping to a raw
 * <textarea>.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextArea } from "./TextArea";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "", textColor: "", focusRingColor: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { TEXTAREA: "textarea", FORM_LABEL: "form-label" },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("TextArea override props", () => {
    test("applies the default px-3 py-2", () => {
        const { container } = renderWithTheme(<TextArea />);
        const ta = container.querySelector("textarea");
        expect(ta.className).toMatch(/px-3 py-2/);
    });

    test("honors a custom padding override", () => {
        const { container } = renderWithTheme(<TextArea padding="px-2 py-1" />);
        const ta = container.querySelector("textarea");
        expect(ta.className).toMatch(/px-2 py-1/);
        expect(ta.className).not.toMatch(/px-3 py-2/);
    });
});
