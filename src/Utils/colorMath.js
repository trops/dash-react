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
