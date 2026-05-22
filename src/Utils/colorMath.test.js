/**
 * colorMath — pure-function pins.
 *
 * Backs `arbitrary-color-themes` PRD. Pure utility (no React, no
 * theme integration). Tests cover: hex validation + normalization,
 * RGB ↔ HSL roundtrips, shade derivation (general shape +
 * Tailwind-palette approximation), edge cases (#000, #fff), and
 * WCAG contrast ratios.
 */
import {
    isHexColor,
    normalizeHex,
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    deriveShades,
    contrastRatio,
    getColorFamilies,
    getCuratedColorGrid,
} from "./colorMath";

describe("isHexColor", () => {
    test.each([
        ["#abc", true],
        ["#aabbcc", true],
        ["#aabbccdd", true],
        ["#AABBCC", true],
        ["#fff", true],
    ])("accepts %s → %s", (input, expected) => {
        expect(isHexColor(input)).toBe(expected);
    });

    test.each([
        ["abc", false],
        ["#zzz", false],
        ["#abcd1", false],
        ["blue", false],
        ["", false],
        [null, false],
        [undefined, false],
        [123, false],
    ])("rejects %s", (input, expected) => {
        expect(isHexColor(input)).toBe(expected);
    });
});

describe("normalizeHex", () => {
    test("adds leading # when missing", () => {
        expect(normalizeHex("4a154b")).toBe("#4a154b");
    });
    test("lowercases output", () => {
        expect(normalizeHex("#4A154B")).toBe("#4a154b");
    });
    test("expands 3-digit to 6-digit", () => {
        expect(normalizeHex("#abc")).toBe("#aabbcc");
    });
    test("strips alpha from 8-digit", () => {
        expect(normalizeHex("#aabbccdd")).toBe("#aabbcc");
    });
    test("strips alpha from 4-digit", () => {
        expect(normalizeHex("#abcd")).toBe("#aabbcc");
    });
    test("returns null for invalid", () => {
        expect(normalizeHex("#zzz")).toBeNull();
        expect(normalizeHex("blue")).toBeNull();
        expect(normalizeHex(null)).toBeNull();
    });
});

describe("hexToRgb / rgbToHex roundtrip", () => {
    test.each(["#000000", "#ffffff", "#4a154b", "#3b82f6", "#1d4ed8"])(
        "%s roundtrips",
        (hex) => {
            const rgb = hexToRgb(hex);
            expect(rgb).not.toBeNull();
            expect(rgbToHex(rgb)).toBe(hex);
        }
    );

    test("clamps out-of-range RGB values", () => {
        expect(rgbToHex({ r: -1, g: 300, b: 128 })).toBe("#00ff80");
    });
});

describe("rgbToHsl / hslToRgb roundtrip", () => {
    test.each([
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        { r: 128, g: 128, b: 128 },
        { r: 74, g: 21, b: 75 }, // Slack burgundy
        { r: 59, g: 130, b: 246 }, // Tailwind blue-500-ish
    ])("%j roundtrips within 1 unit", (rgb) => {
        const hsl = rgbToHsl(rgb);
        const back = hslToRgb(hsl);
        // Allow ~1 unit slop from floating-point math
        expect(Math.abs(back.r - rgb.r)).toBeLessThanOrEqual(1);
        expect(Math.abs(back.g - rgb.g)).toBeLessThanOrEqual(1);
        expect(Math.abs(back.b - rgb.b)).toBeLessThanOrEqual(1);
    });
});

describe("deriveShades", () => {
    test("returns null for invalid input", () => {
        expect(deriveShades("nope")).toBeNull();
    });

    test("produces all 11 shades", () => {
        const shades = deriveShades("#4a154b");
        expect(Object.keys(shades).sort((a, b) => +a - +b)).toEqual([
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
        ]);
    });

    test("each shade is a valid hex", () => {
        const shades = deriveShades("#4a154b");
        for (const value of Object.values(shades)) {
            expect(isHexColor(value)).toBe(true);
        }
    });

    test("shades darken from 50 → 950 (luminance monotonic)", () => {
        const shades = deriveShades("#4a154b");
        const luminances = ["50", "100", "200", "300", "400"].map((k) => {
            const rgb = hexToRgb(shades[k]);
            return rgbToHsl(rgb).l;
        });
        // 50 should be lighter than 100, 100 lighter than 200, etc.
        for (let i = 1; i < luminances.length; i++) {
            expect(luminances[i]).toBeLessThan(luminances[i - 1]);
        }
        const darkLuminances = ["600", "700", "800", "900", "950"].map((k) => {
            const rgb = hexToRgb(shades[k]);
            return rgbToHsl(rgb).l;
        });
        for (let i = 1; i < darkLuminances.length; i++) {
            expect(darkLuminances[i]).toBeLessThan(darkLuminances[i - 1]);
        }
    });

    test("very dark input (#000) still produces a visible shade-50", () => {
        const shades = deriveShades("#000000");
        const rgb50 = hexToRgb(shades["50"]);
        // Should be well into the bright range
        expect(rgb50.r + rgb50.g + rgb50.b).toBeGreaterThan(600);
    });

    test("very light input (#fff) still produces a visible shade-900", () => {
        const shades = deriveShades("#ffffff");
        const rgb900 = hexToRgb(shades["900"]);
        // Should be well into the dark range
        expect(rgb900.r + rgb900.g + rgb900.b).toBeLessThan(150);
    });

    test("Tailwind blue-500 (#3b82f6) derives a 700 close to Tailwind blue-700 (#1d4ed8)", () => {
        const shades = deriveShades("#3b82f6");
        const derived700 = hexToRgb(shades["700"]);
        const tailwind700 = hexToRgb("#1d4ed8");
        // Within ~50 per channel is acceptable — Tailwind's palette
        // is hand-tuned per color family; we're approximating.
        expect(Math.abs(derived700.r - tailwind700.r)).toBeLessThan(50);
        expect(Math.abs(derived700.g - tailwind700.g)).toBeLessThan(50);
        expect(Math.abs(derived700.b - tailwind700.b)).toBeLessThan(50);
    });
});

describe("getColorFamilies / getCuratedColorGrid", () => {
    test("returns 6 color families", () => {
        const families = getColorFamilies();
        expect(families.length).toBe(6);
        expect(families).toContain("Reds & Pinks");
        expect(families).toContain("Neutrals");
    });

    test("each chromatic family produces 36 valid hex swatches", () => {
        const chromatic = [
            "Reds & Pinks",
            "Oranges & Yellows",
            "Greens",
            "Blues & Cyans",
            "Purples & Magentas",
        ];
        for (const name of chromatic) {
            const grid = getCuratedColorGrid(name);
            expect(grid.length).toBe(36);
            for (const hex of grid) {
                expect(isHexColor(hex)).toBe(true);
            }
        }
    });

    test("Neutrals produces 18 swatches (3 tints × 6 lightnesses)", () => {
        const grid = getCuratedColorGrid("Neutrals");
        expect(grid.length).toBe(18);
        for (const hex of grid) {
            expect(isHexColor(hex)).toBe(true);
        }
    });

    test("unknown family returns empty array", () => {
        expect(getCuratedColorGrid("Unobtainium")).toEqual([]);
    });

    test("Reds & Pinks family contains a recognizable red and a recognizable pink", () => {
        const grid = getCuratedColorGrid("Reds & Pinks");
        // Convert each swatch to HSL; at least one should be near red (hue ~0)
        // and at least one near pink (hue ~350).
        const hues = grid.map((hex) => rgbToHsl(hexToRgb(hex)).h);
        const hasRed = hues.some((h) => h < 30 || h > 350);
        const hasPink = hues.some((h) => h > 320 && h < 360);
        expect(hasRed).toBe(true);
        expect(hasPink).toBe(true);
    });
});

describe("contrastRatio", () => {
    test("black vs white = 21 (max)", () => {
        expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    });
    test("same color = 1 (min)", () => {
        expect(contrastRatio("#4a154b", "#4a154b")).toBeCloseTo(1, 5);
    });
    test("symmetric — order doesn't matter", () => {
        const a = contrastRatio("#000000", "#ffffff");
        const b = contrastRatio("#ffffff", "#000000");
        expect(a).toBeCloseTo(b, 5);
    });
    test("known low-contrast pair flags below WCAG AA (4.5)", () => {
        const ratio = contrastRatio("#777777", "#888888");
        expect(ratio).toBeLessThan(2);
    });
    test("returns null for invalid input", () => {
        expect(contrastRatio("nope", "#fff")).toBeNull();
        expect(contrastRatio("#fff", "nope")).toBeNull();
    });
});
