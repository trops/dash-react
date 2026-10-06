/**
 * statusColors — light/dark status palette pins.
 *
 * Status colors (error/success/warning/info) must stay readable on
 * both light and dark themes, and must only use solid shade classes
 * — the prebuilt CSS bundle doesn't reliably carry opacity-modifier
 * (`bg-red-900/30`) or arbitrary-value classes.
 */
import { getStatusColors, STATUS_VARIANTS } from "./statusColors";

const KEYS = [
    "bg",
    "text",
    "strongText",
    "border",
    "accentBorder",
    "icon",
    "solidBg",
    "hoverBg",
    "hoverText",
];

describe("getStatusColors", () => {
    test("exposes the four status variants", () => {
        expect(STATUS_VARIANTS).toEqual([
            "error",
            "success",
            "warning",
            "info",
        ]);
    });

    test.each(["light", "dark"])(
        "%s palette has every key for every status",
        (mode) => {
            const colors = getStatusColors(mode);
            for (const status of STATUS_VARIANTS) {
                for (const key of KEYS) {
                    expect(typeof colors[status][key]).toBe("string");
                    expect(colors[status][key].length).toBeGreaterThan(0);
                }
            }
        }
    );

    test.each(["light", "dark"])(
        "%s palette uses only solid shade classes",
        (mode) => {
            const colors = getStatusColors(mode);
            for (const status of STATUS_VARIANTS) {
                for (const cls of Object.values(colors[status])) {
                    expect(cls).not.toMatch(/\/\d+/);
                    expect(cls).not.toMatch(/\[/);
                }
            }
        }
    );

    test("light mode pairs a pale background with dark text", () => {
        const { error } = getStatusColors("light");
        expect(error.bg).toBe("bg-red-50");
        expect(error.text).toBe("text-red-800");
    });

    test("dark mode pairs a dark background with light text", () => {
        const { error } = getStatusColors("dark");
        expect(error.bg).toBe("bg-red-950");
        expect(error.text).toBe("text-red-200");
    });

    test("hover classes are prefixed", () => {
        for (const mode of ["light", "dark"]) {
            const { info } = getStatusColors(mode);
            expect(info.hoverBg).toMatch(/^hover:bg-/);
            expect(info.hoverText).toMatch(/^hover:text-/);
        }
    });

    test("unknown variant falls back to dark", () => {
        expect(getStatusColors("sepia")).toEqual(getStatusColors("dark"));
        expect(getStatusColors(undefined)).toEqual(getStatusColors("dark"));
    });
});
