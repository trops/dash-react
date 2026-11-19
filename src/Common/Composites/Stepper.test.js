/**
 * Stepper in a narrow space (DASH-22): every step's name when they fit;
 * when they don't, only the current one's — the others keep their circle,
 * with the name on hover.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { Stepper } from "./Stepper";

const NAMES = [
    "Account",
    "Details",
    "Tags",
    "Icon",
    "Dependencies",
    "Defaults",
    "Publish",
];

const renderSteps = () =>
    render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            <Stepper activeStep={5} showNavigation={false}>
                {NAMES.map((n) => (
                    <Stepper.Step key={n} label={n} />
                ))}
            </Stepper>
        </ThemeContext.Provider>
    );

// jsdom has no layout: say how wide the row is and how wide it needs to be.
const widths = (scroll, client) => {
    const s = jest
        .spyOn(HTMLElement.prototype, "scrollWidth", "get")
        .mockReturnValue(scroll);
    const c = jest
        .spyOn(HTMLElement.prototype, "clientWidth", "get")
        .mockReturnValue(client);
    return () => {
        s.mockRestore();
        c.mockRestore();
    };
};

describe("Stepper in a narrow space", () => {
    test("every name shows when they fit", () => {
        const restore = widths(600, 800);
        renderSteps();
        for (const n of NAMES) expect(screen.getByText(n)).toBeInTheDocument();
        restore();
    });

    test("too many to fit: only the current step's name, the rest on hover", () => {
        const restore = widths(1100, 640);
        renderSteps();
        expect(screen.getByText("Defaults")).toBeInTheDocument();
        expect(screen.queryByText("Account")).toBeNull();
        expect(screen.queryByText("Publish")).toBeNull();
        // The others are still there, named for hover and screen readers.
        expect(screen.getByRole("button", { name: "Account" })).toHaveAttribute(
            "title",
            "Account"
        );
        expect(screen.getByRole("button", { name: "Publish" })).toHaveAttribute(
            "title",
            "Publish"
        );
        restore();
    });
});
