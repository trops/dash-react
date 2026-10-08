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

describe("TextArea autoGrow", () => {
    // jsdom does no layout: make scrollHeight follow the number of lines.
    let descriptor;
    beforeAll(() => {
        descriptor = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            "scrollHeight"
        );
        Object.defineProperty(
            window.HTMLTextAreaElement.prototype,
            "scrollHeight",
            {
                configurable: true,
                get() {
                    return String(this.value).split("\n").length * 20;
                },
            }
        );
    });
    afterAll(() => {
        if (descriptor) {
            Object.defineProperty(
                window.HTMLTextAreaElement.prototype,
                "scrollHeight",
                descriptor
            );
        } else {
            delete window.HTMLTextAreaElement.prototype.scrollHeight;
        }
    });

    test("sizes the box to its content, with no inner scroll or resize", () => {
        const { container } = renderWithTheme(
            <TextArea autoGrow value={"a\nb\nc"} onChange={() => {}} />
        );
        const ta = container.querySelector("textarea");
        expect(ta.style.height).toBe("60px");
        expect(ta.style.overflowY).toBe("hidden");
        expect(ta.style.resize).toBe("none");
    });

    test("grows when the value changes from outside", () => {
        const { container, rerender } = renderWithTheme(
            <TextArea autoGrow value={"one"} onChange={() => {}} />
        );
        const ta = container.querySelector("textarea");
        expect(ta.style.height).toBe("20px");
        rerender(
            <ThemeContext.Provider value={{ currentTheme: {} }}>
                <TextArea
                    autoGrow
                    value={"one\ntwo\nthree\nfour"}
                    onChange={() => {}}
                />
            </ThemeContext.Provider>
        );
        expect(ta.style.height).toBe("80px");
    });

    test("keeps rows as the minimum height", () => {
        const { container } = renderWithTheme(
            <TextArea autoGrow rows={5} value="" onChange={() => {}} />
        );
        expect(container.querySelector("textarea").getAttribute("rows")).toBe(
            "5"
        );
    });

    test("without autoGrow nothing changes", () => {
        const { container } = renderWithTheme(
            <TextArea value={"a\nb\nc"} onChange={() => {}} />
        );
        const ta = container.querySelector("textarea");
        expect(ta.style.height).toBe("");
        expect(ta.style.overflowY).toBe("");
    });
});
