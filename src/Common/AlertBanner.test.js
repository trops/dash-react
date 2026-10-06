/**
 * AlertBanner — theme-variant and size pins.
 *
 * The banner must follow the active light/dark variant so error text
 * stays readable on both, and offer a compact size for small widgets.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AlertBanner } from "./AlertBanner";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));

function renderWithVariant(themeVariant, node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {}, themeVariant }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("AlertBanner", () => {
    test("light theme renders a pale background with dark text", () => {
        renderWithVariant(
            "light",
            <AlertBanner variant="error" message="Boom" />
        );
        const alert = screen.getByRole("alert");
        expect(alert.className).toMatch(/bg-red-50/);
        expect(screen.getByText("Boom").className).toMatch(/text-red-800/);
    });

    test("dark theme renders a dark background with light text", () => {
        renderWithVariant(
            "dark",
            <AlertBanner variant="error" message="Boom" />
        );
        const alert = screen.getByRole("alert");
        expect(alert.className).toMatch(/bg-red-950/);
        expect(screen.getByText("Boom").className).toMatch(/text-red-200/);
    });

    test("never emits opacity-modifier classes", () => {
        for (const v of ["light", "dark"]) {
            const { unmount } = renderWithVariant(
                v,
                <AlertBanner variant="warning" title="T" message="M" />
            );
            expect(screen.getByRole("alert").outerHTML).not.toMatch(
                /\b[a-z-]+-\d{2,3}\/\d+/
            );
            unmount();
        }
    });

    test("unknown variant falls back to info", () => {
        renderWithVariant("light", <AlertBanner variant="nope" message="M" />);
        expect(screen.getByRole("alert").className).toMatch(/bg-blue-50/);
    });

    test("default size uses roomy padding", () => {
        renderWithVariant("dark", <AlertBanner message="M" />);
        expect(screen.getByRole("alert").className).toMatch(/\bp-4\b/);
    });

    test("compact size uses tight padding and small text", () => {
        renderWithVariant("dark", <AlertBanner size="compact" message="M" />);
        expect(screen.getByRole("alert").className).toMatch(/\bp-2\b/);
        expect(screen.getByText("M").className).toMatch(/text-xs/);
    });

    test("renders children and the close button", () => {
        const onClose = jest.fn();
        renderWithVariant(
            "light",
            <AlertBanner variant="success" onClose={onClose}>
                <span>Child</span>
            </AlertBanner>
        );
        expect(screen.getByText("Child")).toBeInTheDocument();
        screen.getByLabelText("Dismiss alert").click();
        expect(onClose).toHaveBeenCalled();
    });
});
