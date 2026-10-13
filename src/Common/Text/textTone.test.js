/**
 * Paragraph/Caption in the theme's default colour get the Aurora text-role
 * hooks; text given its own colour keeps it.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { hasOwnTextColor } from "./textTone";
import { Paragraph } from "./Paragraph";
import { Caption } from "./Caption";
import { ThemeContext } from "@dash/Context/ThemeContext";

describe("hasOwnTextColor", () => {
    test("colour classes count; sizes and alignment don't", () => {
        expect(hasOwnTextColor("text-red-500")).toBe(true);
        expect(hasOwnTextColor("font-bold text-white")).toBe(true);
        expect(hasOwnTextColor("", "text-gray-300")).toBe(true);
        expect(hasOwnTextColor("text-sm text-center truncate")).toBe(false);
        expect(hasOwnTextColor("text-2xl")).toBe(false);
        expect(hasOwnTextColor("")).toBe(false);
    });
});

describe("text tone hooks", () => {
    const wrap = (ui) =>
        render(
            <ThemeContext.Provider value={{ currentTheme: {} }}>
                {ui}
            </ThemeContext.Provider>
        );
    test("default-coloured text gets the hook, own colour doesn't", () => {
        wrap(
            <>
                <Paragraph text="plain" />
                <Paragraph text="red" className="text-red-500" />
                <Caption text="cap" />
                <Caption text="own" className="text-white" />
            </>
        );
        expect(
            screen.getByText("plain").closest(".dr-paragraph")
        ).not.toBeNull();
        expect(screen.getByText("red").closest(".dr-paragraph")).toBeNull();
        expect(screen.getByText("cap")).toHaveClass("dr-caption-text");
        expect(screen.getByText("own")).not.toHaveClass("dr-caption-text");
    });
});
