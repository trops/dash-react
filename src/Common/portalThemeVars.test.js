/**
 * Dialogs carry the colours of the theme they were opened in: rendered at
 * the end of <body>, they can't see a dashboard's own box, so a widget's
 * dialog on a dashboard still shows that dashboard's theme.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { Modal } from "./Modal";

const brown = { cssVars: { "--primary-900": "#4a2a1a" } };

// The dialog library watches its panel; jsdom has no IntersectionObserver.
beforeAll(() => {
    global.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

test("a dialog carries its theme's colours", () => {
    render(
        <ThemeContext.Provider value={{ currentTheme: brown }}>
            <Modal isOpen setIsOpen={() => {}}>
                <span>inside</span>
            </Modal>
        </ThemeContext.Provider>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.getPropertyValue("--primary-900")).toBe("#4a2a1a");
    expect(screen.getByText("inside")).toBeInTheDocument();
});

test("no theme: nothing added", () => {
    render(
        <Modal isOpen setIsOpen={() => {}}>
            <span>inside</span>
        </Modal>
    );
    expect(
        screen.getByRole("dialog").style.getPropertyValue("--primary-900")
    ).toBe("");
});
