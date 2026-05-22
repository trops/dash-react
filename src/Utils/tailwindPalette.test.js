/**
 * tailwindPalette — class-name → hex resolution pins.
 *
 * Used by ThemeModel to emit `cssValue` maps for named-color tokens
 * (PRD: arbitrary-color-themes.md US-007).
 */
import { TAILWIND_PALETTE, hexForTailwindClass } from "./tailwindPalette";

describe("TAILWIND_PALETTE", () => {
    test("includes all 22 expected color families", () => {
        const expected = [
            "gray",
            "slate",
            "zinc",
            "neutral",
            "stone",
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
            "blue",
            "indigo",
            "violet",
            "purple",
            "fuchsia",
            "pink",
            "rose",
        ];
        for (const family of expected) {
            expect(TAILWIND_PALETTE[family]).toBeDefined();
        }
    });

    test("each family has all 11 standard shades", () => {
        const shades = [
            "50",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "950",
        ];
        for (const family of Object.keys(TAILWIND_PALETTE)) {
            for (const shade of shades) {
                expect(TAILWIND_PALETTE[family][shade]).toMatch(
                    /^#[0-9a-f]{6}$/
                );
            }
        }
    });

    test("known canonical values are intact", () => {
        expect(TAILWIND_PALETTE.blue["500"]).toBe("#3b82f6");
        expect(TAILWIND_PALETTE.blue["700"]).toBe("#1d4ed8");
        expect(TAILWIND_PALETTE.gray["50"]).toBe("#f9fafb");
        expect(TAILWIND_PALETTE.gray["950"]).toBe("#030712");
    });
});

describe("hexForTailwindClass", () => {
    test.each([
        ["bg-blue-700", "#1d4ed8"],
        ["text-blue-200", "#bfdbfe"],
        ["border-rose-500", "#f43f5e"],
        ["hover:bg-blue-800", "#1e40af"],
        ["from-emerald-500", "#10b981"],
        ["via-emerald-500", "#10b981"],
        ["to-emerald-700", "#047857"],
    ])("%s → %s", (input, expected) => {
        expect(hexForTailwindClass(input)).toBe(expected);
    });

    test("returns null for arbitrary-value classes", () => {
        expect(hexForTailwindClass("bg-[var(--primary-700)]")).toBeNull();
        expect(hexForTailwindClass("bg-[#abc]")).toBeNull();
    });

    test("returns null for unknown color families", () => {
        expect(hexForTailwindClass("bg-tomato-500")).toBeNull();
    });

    test("returns null for unknown shades", () => {
        expect(hexForTailwindClass("bg-blue-650")).toBeNull();
    });

    test("returns null for non-string input", () => {
        expect(hexForTailwindClass(null)).toBeNull();
        expect(hexForTailwindClass(undefined)).toBeNull();
        expect(hexForTailwindClass(123)).toBeNull();
    });
});
