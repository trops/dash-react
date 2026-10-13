/**
 * EmptyState (design guide: "Say what will appear and how to get it"):
 * title, one sentence, at most one action — muted by the theme's text token,
 * never by opacity (screen audit, October 2026).
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { EmptyState } from "./EmptyState";

const theme = { "text-neutral-medium": "text-gray-400" };
const renderWithTheme = (node) =>
    render(
        <ThemeContext.Provider
            value={{ currentTheme: theme, themeVariant: "dark" }}
        >
            {node}
        </ThemeContext.Provider>
    );

describe("EmptyState", () => {
    test("shows the title, the sentence and the one action", () => {
        renderWithTheme(
            <EmptyState
                title="Nothing here yet"
                description="Questions you ask show up here."
                testId="empty"
            >
                <button type="button">Make something new…</button>
            </EmptyState>
        );
        expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
        expect(
            screen.getByText("Questions you ask show up here.")
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Make something new…" })
        ).toBeInTheDocument();
        expect(screen.getByTestId("empty")).toHaveClass("dr-empty");
    });

    test("mutes the description with the theme token, not opacity", () => {
        renderWithTheme(
            <EmptyState title="Empty" description="Nothing yet." icon="*" />
        );
        const desc = screen.getByText("Nothing yet.");
        expect(desc).toHaveClass("dr-empty-desc", "text-gray-400");
        expect(desc.className).not.toMatch(/opacity-/);
        const icon = screen.getByText("*");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.className).not.toMatch(/opacity-/);
    });

    test("renders without a theme provider value", () => {
        render(
            <ThemeContext.Provider value={{}}>
                <EmptyState title="Empty" />
            </ThemeContext.Provider>
        );
        expect(screen.getByText("Empty")).toBeInTheDocument();
    });
});
