/**
 * colorMath — pure-function helpers for working with hex colors.
 *
 * Used by the theme system to support arbitrary-color themes (PRD:
 * `dash-electron/docs/requirements/prd/arbitrary-color-themes.md`).
 * Standalone — no React, no dependencies beyond JavaScript primitives.
 *
 * Exports:
 *   - isHexColor(value)         → boolean
 *   - normalizeHex(input)       → "#rrggbb" or null
 *   - hexToRgb(hex)             → { r, g, b } or null
 *   - rgbToHex({r,g,b})         → "#rrggbb"
 *   - rgbToHsl({r,g,b})         → { h, s, l }  (h 0..360, s/l 0..1)
 *   - hslToRgb({h,s,l})         → { r, g, b }  (0..255)
 *   - deriveShades(hex)         → { 50, 100, 200, ..., 950 } hex map
 *   - contrastRatio(hexA, hexB) → 1..21
 */

const HEX_REGEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export function isHexColor(value) {
    return typeof value === "string" && HEX_REGEX.test(value.trim());
}

/**
 * Normalize a user-supplied hex string. Accepts `4A154B`, `#4A154B`,
 * `#abc`, `#abcd`, `#aabbccdd`. Returns lowercase `#rrggbb` (alpha
 * dropped) or null if invalid.
 */
export function normalizeHex(input) {
    if (typeof input !== "string") return null;
    let s = input.trim().toLowerCase();
    if (!s.startsWith("#")) s = `#${s}`;
    if (!HEX_REGEX.test(s)) return null;
    if (s.length === 4) {
        // #rgb → #rrggbb
        s = `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`;
    } else if (s.length === 5) {
        // #rgba → #rrggbb (drop alpha)
        s = `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`;
    } else if (s.length === 9) {
        // #rrggbbaa → #rrggbb
        s = s.slice(0, 7);
    }
    return s;
}

export function hexToRgb(hex) {
    const normalized = normalizeHex(hex);
    if (!normalized) return null;
    const n = parseInt(normalized.slice(1), 16);
    return {
        r: (n >> 16) & 0xff,
        g: (n >> 8) & 0xff,
        b: n & 0xff,
    };
}

export function rgbToHex({ r, g, b }) {
    const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
    const toHex = (v) => clamp(v).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }) {
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case R:
                h = (G - B) / d + (G < B ? 6 : 0);
                break;
            case G:
                h = (B - R) / d + 2;
                break;
            default:
                h = (R - G) / d + 4;
                break;
        }
        h *= 60;
    }
    return { h, s, l };
}

export function hslToRgb({ h, s, l }) {
    if (s === 0) {
        const v = l * 255;
        return { r: v, g: v, b: v };
    }
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let rp;
    let gp;
    let bp;
    if (h < 60) {
        rp = c;
        gp = x;
        bp = 0;
    } else if (h < 120) {
        rp = x;
        gp = c;
        bp = 0;
    } else if (h < 180) {
        rp = 0;
        gp = c;
        bp = x;
    } else if (h < 240) {
        rp = 0;
        gp = x;
        bp = c;
    } else if (h < 300) {
        rp = x;
        gp = 0;
        bp = c;
    } else {
        rp = c;
        gp = 0;
        bp = x;
    }
    return {
        r: (rp + m) * 255,
        g: (gp + m) * 255,
        b: (bp + m) * 255,
    };
}

/**
 * Derive an 11-shade Tailwind-like palette from a base hex.
 *
 * Returns `{ "50": "#…", "100": "#…", …, "900": "#…", "950": "#…" }`.
 *
 * Strategy: keep the input's hue + saturation; vary lightness across
 * fixed targets that approximate Tailwind's stock palette structure.
 * Shade `500` preserves the user's lightness (so picking a known
 * Tailwind hex like `#3b82f6` produces a `500` close to Tailwind
 * `blue-500`). Lighter shades approach white; darker approach black.
 *
 * For very dark (`l < 0.20`) or very light (`l > 0.80`) inputs we
 * snap shade `500` to `0.50` so the ramp stays balanced — otherwise
 * the input might land at e.g. shade `900` and produce no visible
 * darker steps.
 */
export function deriveShades(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const { h, s, l } = rgbToHsl(rgb);
    const baseL = l < 0.2 || l > 0.8 ? 0.5 : l;
    const targets = {
        50: 0.96,
        100: 0.9,
        200: 0.8,
        300: 0.68,
        400: 0.55,
        500: baseL,
        600: 0.42,
        700: 0.32,
        800: 0.22,
        900: 0.13,
        950: 0.08,
    };
    // Slight saturation curve: lighter shades fade saturation toward
    // white-ish; darker shades fade toward black-ish. Mirrors how
    // Tailwind's stock palette feels.
    const satFor = (targetL) => {
        if (targetL > 0.85) return s * 0.4;
        if (targetL < 0.15) return s * 0.7;
        return s;
    };
    const out = {};
    for (const [shade, targetL] of Object.entries(targets)) {
        const rgbOut = hslToRgb({ h, s: satFor(targetL), l: targetL });
        out[shade] = rgbToHex(rgbOut);
    }
    return out;
}

/**
 * WCAG-relative luminance (0..1). Used by `contrastRatio`.
 */
function relativeLuminance({ r, g, b }) {
    const channel = (v) => {
        const sRGB = v / 255;
        return sRGB <= 0.03928
            ? sRGB / 12.92
            : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * WCAG contrast ratio between two hex colors. Returns a value in
 * [1, 21]. WCAG AA target is 4.5 for normal text; AAA is 7.
 */
export function contrastRatio(hexA, hexB) {
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(hexB);
    if (!rgbA || !rgbB) return null;
    const lA = relativeLuminance(rgbA);
    const lB = relativeLuminance(rgbB);
    const lighter = Math.max(lA, lB);
    const darker = Math.min(lA, lB);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Color harmony helpers — emit hex partners for a base hex using
 * classic hue-rotation rules. Saturation + lightness are preserved
 * from the base, so the generated palette has consistent intensity.
 * `null` is returned when the input hex is invalid.
 */
function rotateHex(hex, deltaH) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const { h, s, l } = rgbToHsl(rgb);
    const newH = (((h + deltaH) % 360) + 360) % 360;
    return rgbToHex(hslToRgb({ h: newH, s, l }));
}

export function complementHex(hex) {
    return rotateHex(hex, 180);
}

export function analogousHexes(hex) {
    const a = rotateHex(hex, -30);
    const b = rotateHex(hex, 30);
    if (!a || !b) return null;
    return [a, b];
}

export function triadicHexes(hex) {
    const a = rotateHex(hex, 120);
    const b = rotateHex(hex, 240);
    if (!a || !b) return null;
    return [a, b];
}

export function splitComplementaryHexes(hex) {
    const a = rotateHex(hex, 150);
    const b = rotateHex(hex, 210);
    if (!a || !b) return null;
    return [a, b];
}

export function tetradicHexes(hex) {
    const a = rotateHex(hex, 90);
    const b = rotateHex(hex, 180);
    const c = rotateHex(hex, 270);
    if (!a || !b || !c) return null;
    return [a, b, c];
}

/**
 * Monochromatic palette: same hue as the base, varied saturation +
 * lightness. Returns `count` hexes evenly distributed across the
 * lightness band (0.15..0.85) with mild saturation variation.
 * Useful for single-hue brand palettes.
 */
export function monochromaticHexes(hex, count = 3) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const { h, s } = rgbToHsl(rgb);
    const out = [];
    for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const l = 0.15 + t * 0.7;
        // Slightly dampen saturation at the extremes so the lightest
        // and darkest mono shades don't feel oversaturated.
        const sAdj = s * (1 - 0.3 * Math.abs(t - 0.5) * 2);
        out.push(rgbToHex(hslToRgb({ h, s: sAdj, l })));
    }
    return out;
}

/**
 * Apply an HSL nudge to a hex color. Accepts deltas in:
 *   - dH: degrees [-360..360], wraps through 0/360
 *   - dS: fraction [-1..1], clamped to [0..1] after add
 *   - dL: fraction [-1..1], clamped to [0..1] after add
 */
export function adjustHsl(hex, dH = 0, dS = 0, dL = 0) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb);
    const h = (((hsl.h + dH) % 360) + 360) % 360;
    const s = Math.max(0, Math.min(1, hsl.s + dS));
    const l = Math.max(0, Math.min(1, hsl.l + dL));
    return rgbToHex(hslToRgb({ h, s, l }));
}

/**
 * Color families for the categorized picker grid. Each chromatic
 * family declares a hue range (inclusive, may wrap through 0/360);
 * Neutrals has `hueRange: null` and is handled specially.
 *
 * Used by `getCuratedColorGrid(familyName)` to derive a curated set
 * of ~36 swatches per family — varied lightness + saturation across
 * the family's hue range. Discoverable for users who don't think in
 * hex but want more colors than Tailwind's 22 named families.
 *
 * The grid is generated, not hand-curated, so it stays consistent
 * if we tune the lightness/saturation curve later.
 */
const COLOR_FAMILIES = [
    { name: "Reds & Pinks", hueRange: [340, 20] }, // wraps through 0
    { name: "Oranges & Yellows", hueRange: [20, 65] },
    { name: "Greens", hueRange: [80, 170] },
    { name: "Blues & Cyans", hueRange: [180, 250] },
    { name: "Purples & Magentas", hueRange: [260, 320] },
    { name: "Neutrals", hueRange: null },
];

export function getColorFamilies() {
    return COLOR_FAMILIES.map((f) => f.name);
}

/**
 * Return a curated array of hex colors for the given family name.
 * Chromatic families produce 6 hues × 6 lightnesses (36 swatches),
 * with saturation lowered at the extremes for legibility.
 * Neutrals produce 3 tints (pure, warm, cool) × 6 lightnesses
 * (18 swatches).
 *
 * Returns [] if the family name isn't recognized.
 */
export function getCuratedColorGrid(familyName) {
    const family = COLOR_FAMILIES.find((f) => f.name === familyName);
    if (!family) return [];

    if (family.hueRange === null) {
        // Neutrals: vary the tint × lightness. Pure / warm / cool
        // mirror the bands designers tend to reach for.
        const tints = [
            { h: 0, s: 0 }, // pure gray
            { h: 30, s: 0.08 }, // warm
            { h: 215, s: 0.08 }, // cool
        ];
        const lightnesses = [0.1, 0.25, 0.4, 0.55, 0.7, 0.88];
        const out = [];
        for (const l of lightnesses) {
            for (const tint of tints) {
                out.push(rgbToHex(hslToRgb({ h: tint.h, s: tint.s, l })));
            }
        }
        return out;
    }

    const [hMin, hMax] = family.hueRange;
    const hues = [];
    if (hMin > hMax) {
        // Wraps through 0/360.
        const span = 360 - hMin + hMax;
        for (let i = 0; i < 6; i++) {
            hues.push((hMin + (i * span) / 5) % 360);
        }
    } else {
        const span = hMax - hMin;
        for (let i = 0; i < 6; i++) {
            hues.push(hMin + (i * span) / 5);
        }
    }

    const lightnesses = [0.2, 0.35, 0.5, 0.65, 0.8, 0.9];
    const out = [];
    for (const l of lightnesses) {
        for (const h of hues) {
            // Saturation curve: full at mid-lightness, lower at extremes.
            const s = l < 0.3 || l > 0.85 ? 0.5 : 0.85;
            out.push(rgbToHex(hslToRgb({ h, s, l })));
        }
    }
    return out;
}
