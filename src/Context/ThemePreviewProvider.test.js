/**
 * ThemePreviewProvider — CSS-variable injection pins.
 *
 * Backs `arbitrary-color-themes` PRD FR-003. When the active theme
 * has a `cssVars` map (emitted by ThemeModel for hex-color themes),
 * the provider must write those custom properties to
 * `document.documentElement.style`. On transition, stale vars must
 * be removed without leaving residue.
 */
import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "./ThemeContext";
import { ThemePreviewProvider, useThemePreview } from "./ThemePreviewProvider";

function Inner() {
    const { setPreviewTheme, clearPreview } = useThemePreview();
    Inner.set = setPreviewTheme;
    Inner.clear = clearPreview;
    return null;
}

function renderWithBase(currentTheme = {}) {
    return render(
        <ThemeContext.Provider value={{ currentTheme }}>
            <ThemePreviewProvider>
                <Inner />
            </ThemePreviewProvider>
        </ThemeContext.Provider>
    );
}

const getVar = (name) => document.documentElement.style.getPropertyValue(name);

describe("ThemePreviewProvider — cssVars injection", () => {
    afterEach(() => {
        // Strip any custom properties that survived a test.
        const style = document.documentElement.style;
        for (let i = style.length - 1; i >= 0; i--) {
            const name = style[i];
            if (name.startsWith("--")) style.removeProperty(name);
        }
    });

    test("writes cssVars from the parent theme on mount", () => {
        renderWithBase({
            cssVars: {
                "--primary-500": "#4a154b",
                "--primary-700": "#2a0c2a",
            },
        });
        expect(getVar("--primary-500")).toBe("#4a154b");
        expect(getVar("--primary-700")).toBe("#2a0c2a");
    });

    test("writes cssVars when a preview theme with cssVars is set", () => {
        renderWithBase({});
        expect(getVar("--primary-500")).toBe("");
        act(() => {
            Inner.set({
                cssVars: {
                    "--primary-500": "#0d1117",
                },
            });
        });
        expect(getVar("--primary-500")).toBe("#0d1117");
    });

    test("removes stale vars when switching to a theme without cssVars", () => {
        renderWithBase({
            cssVars: { "--primary-500": "#4a154b" },
        });
        expect(getVar("--primary-500")).toBe("#4a154b");
        act(() => {
            Inner.set({});
        });
        expect(getVar("--primary-500")).toBe("");
    });

    test("removes stale vars when switching to a different cssVars set", () => {
        renderWithBase({
            cssVars: {
                "--primary-500": "#4a154b",
                "--primary-700": "#2a0c2a",
            },
        });
        act(() => {
            Inner.set({
                cssVars: {
                    "--primary-500": "#0d1117",
                    // note: --primary-700 absent in new set
                },
            });
        });
        expect(getVar("--primary-500")).toBe("#0d1117");
        expect(getVar("--primary-700")).toBe("");
    });

    test("clearPreview reverts to the parent theme's cssVars", () => {
        renderWithBase({
            cssVars: { "--primary-500": "#4a154b" },
        });
        act(() => {
            Inner.set({
                cssVars: { "--primary-500": "#0d1117" },
            });
        });
        expect(getVar("--primary-500")).toBe("#0d1117");
        act(() => {
            Inner.clear();
        });
        expect(getVar("--primary-500")).toBe("#4a154b");
    });

    test("themes without cssVars are a no-op (named-color path)", () => {
        renderWithBase({
            // Mimic a named-color theme: token strings, no cssVars.
            "bg-primary-medium": "bg-blue-700",
        });
        expect(getVar("--primary-500")).toBe("");
    });
});
