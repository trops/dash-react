/**
 * Buttons accept the accessible name as `ariaLabel` or plain `aria-label`.
 *
 * AI-built widgets write `aria-label="Increment"` (the HTML spelling). It
 * used to fall into the style props and come out as a CSS class, so
 * icon-only buttons had no accessible name.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button, Button2, Button3 } from "./Button";
import { ThemeContext } from "@dash/Context/ThemeContext";

function renderWithTheme(ui) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {ui}
        </ThemeContext.Provider>
    );
}

describe.each([
    ["Button", Button],
    ["Button2", Button2],
    ["Button3", Button3],
])("%s", (_name, Component) => {
    it("uses aria-label as the accessible name, not as a class", () => {
        renderWithTheme(<Component aria-label="Increment">+</Component>);
        const button = screen.getByRole("button", { name: "Increment" });
        expect(button.className).not.toMatch(/\bIncrement\b/);
    });

    it("still accepts ariaLabel", () => {
        renderWithTheme(<Component ariaLabel="Decrement">-</Component>);
        expect(
            screen.getByRole("button", { name: "Decrement" })
        ).toBeInTheDocument();
    });
});
