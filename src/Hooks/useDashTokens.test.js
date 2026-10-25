/**
 * useDashTokens — the design guide's color roles: theme key + Aurora role
 * class, and the role class alone when there is no theme.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { useDashTokens, DASH_ROLES } from "./useDashTokens";

function Probe({ onTokens }) {
    onTokens(useDashTokens());
    return null;
}

function tokensFor(value) {
    let out = null;
    const probe = <Probe onTokens={(t) => (out = t)} />;
    render(
        value === undefined ? (
            probe
        ) : (
            <ThemeContext.Provider value={value}>{probe}</ThemeContext.Provider>
        )
    );
    return out;
}

describe("useDashTokens", () => {
    test("returns every role", () => {
        expect(Object.keys(tokensFor({ currentTheme: {} })).sort()).toEqual(
            Object.keys(DASH_ROLES).sort()
        );
    });

    test("pairs the theme key's class with the Aurora role class", () => {
        const t = tokensFor({
            currentTheme: {
                "text-neutral-medium": "text-gray-600",
                "border-neutral-dark": "border-gray-200",
            },
        });
        expect(t.muted).toBe("text-gray-600 dr-role-muted");
        expect(t.faint).toBe("text-gray-600 dr-role-faint");
        expect(t.hairline).toBe("border-gray-200 dr-role-hairline");
    });

    test("falls back to the role class alone without a theme", () => {
        const t = tokensFor({ currentTheme: null });
        expect(t.text).toBe("dr-role-text");
        expect(t.surface).toBe("dr-role-surface");
    });

    test("works outside a ThemeContext provider", () => {
        expect(tokensFor(undefined).muted).toBe("dr-role-muted");
    });
});
