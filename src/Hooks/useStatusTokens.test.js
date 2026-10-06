/**
 * useStatusTokens — reads themeVariant from the nearest ThemeContext
 * and returns the matching status palette.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { useStatusTokens } from "./useStatusTokens";
import { getStatusColors } from "@dash/Utils/statusColors";

function Probe({ onTokens }) {
    onTokens(useStatusTokens());
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

describe("useStatusTokens", () => {
    test("returns the light palette on a light theme", () => {
        expect(tokensFor({ themeVariant: "light" })).toEqual(
            getStatusColors("light")
        );
    });

    test("returns the dark palette on a dark theme", () => {
        expect(tokensFor({ themeVariant: "dark" })).toEqual(
            getStatusColors("dark")
        );
    });

    test("defaults to dark without a provider", () => {
        expect(tokensFor(undefined)).toEqual(getStatusColors("dark"));
    });
});
