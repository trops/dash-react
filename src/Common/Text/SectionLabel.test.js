/**
 * SectionLabel — the small uppercase label above a group of content
 * ("TASK STATES", "LISTENER STATUS"). Replaces the hand-rolled
 * `text-xs uppercase tracking-wide text-gray-500` idiom in widgets.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SectionLabel } from "./SectionLabel";
import { ThemeContext } from "@dash/Context/ThemeContext";

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("SectionLabel", () => {
    test("renders children", () => {
        renderWithTheme(<SectionLabel>Task States</SectionLabel>);
        expect(screen.getByText("Task States")).toBeInTheDocument();
    });

    test("renders the `text` prop when no children", () => {
        renderWithTheme(<SectionLabel text="Event Log" />);
        expect(screen.getByText("Event Log")).toBeInTheDocument();
    });

    test("carries the design-system hook and the uppercase label style", () => {
        renderWithTheme(<SectionLabel>Declared Tasks</SectionLabel>);
        const el = screen.getByText("Declared Tasks");
        expect(el).toHaveClass(
            "dr-section-label",
            "uppercase",
            "tracking-wide"
        );
    });

    test("is a div by default and honors `as`", () => {
        const { rerender } = renderWithTheme(<SectionLabel>A</SectionLabel>);
        expect(screen.getByText("A").tagName).toBe("DIV");
        rerender(
            <ThemeContext.Provider value={{ currentTheme: {} }}>
                <SectionLabel as="h4">A</SectionLabel>
            </ThemeContext.Provider>
        );
        expect(screen.getByText("A").tagName).toBe("H4");
    });

    test("appends className (layout overrides like margins)", () => {
        renderWithTheme(<SectionLabel className="mb-2">A</SectionLabel>);
        expect(screen.getByText("A")).toHaveClass("mb-2");
    });
});
