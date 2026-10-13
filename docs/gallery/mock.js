/**
 * Gallery stand-in for src/Mock (aliased in by scripts/build-gallery.js).
 *
 * Stories wrap themselves in <MockWrapper>; here it takes its mode from the
 * gallery frame (dark or light) instead of always rendering dark, and the
 * theme has every color family the real ThemeModel provides — including
 * neutral and darkest, which Storybook's mock leaves out.
 */
import React, { createContext, useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

export const GalleryMode = createContext("dark");

const FAMILIES = {
    primary: "gray",
    secondary: "gray",
    tertiary: "gray",
    neutral: "gray",
};
const SHADES = {
    dark: {
        "very-light": 500,
        light: 600,
        medium: 700,
        dark: 800,
        "very-dark": 900,
    },
    light: {
        "very-light": 100,
        light: 200,
        medium: 300,
        dark: 200,
        "very-dark": 100,
    },
};

function variantTheme(variant) {
    const t = { name: variant === "dark" ? "Dark" : "Light", ...FAMILIES };
    for (const [type, color] of Object.entries(FAMILIES)) {
        for (const [shade, n] of Object.entries(SHADES[variant])) {
            const up = n + 100 <= 900 ? n + 100 : n;
            const inv = 900 - n;
            const invUp = inv - 100 >= 100 ? inv - 100 : inv;
            t[`bg-${type}-${shade}`] = `bg-${color}-${n}`;
            t[`hover-bg-${type}-${shade}`] = `hover:bg-${color}-${up}`;
            t[`border-${type}-${shade}`] = `border-${color}-${n}`;
            t[`hover-border-${type}-${shade}`] = `hover:border-${color}-${up}`;
            t[`text-${type}-${shade}`] = `text-${color}-${inv}`;
            t[`hover-text-${type}-${shade}`] = `hover:text-${color}-${invUp}`;
        }
        t[`bg-${type}-darkest`] =
            `bg-${color}-${variant === "dark" ? 950 : 50}`;
    }
    t["bg-none"] = "bg-transparent";
    t["border-none"] = "border-transparent";
    t["hover-bg-none"] = "hover:bg-transparent";
    t["hover-border-none"] = "hover:border-transparent";
    t["hover-text-none"] = "hover:text-transparent";
    return t;
}

const themes = {
    primary: FAMILIES.primary,
    secondary: FAMILIES.secondary,
    tertiary: FAMILIES.tertiary,
    neutral: FAMILIES.neutral,
    dark: variantTheme("dark"),
    light: variantTheme("light"),
};

export const mock = {
    api: {
        getWidgets: async () => [],
        getLayout: async () => ({}),
        saveDashboard: async () => ({}),
        getDashboard: async () => ({}),
    },
    themes,
};

export const mockText = {
    paragraph:
        "Morning Briefer reads today's calendar and unread mail, then writes a short brief every weekday at 8.",
    short: "Morning Brief",
    long: "Morning Briefer reads today's calendar and unread mail, then writes a short brief every weekday at 8. It asks before each tool call and shows its result in a Bot results widget on the Morning Brief dashboard.",
};

/** The theme for one gallery frame. */
export function GalleryTheme({ mode, children }) {
    return (
        <GalleryMode.Provider value={mode}>
            <ThemeContext.Provider
                value={{
                    currentTheme: themes[mode],
                    theme: themes,
                    themeVariant: mode,
                }}
            >
                {children}
            </ThemeContext.Provider>
        </GalleryMode.Provider>
    );
}

export const MockWrapper = ({ children }) => {
    const mode = useContext(GalleryMode);
    return <GalleryTheme mode={mode}>{children}</GalleryTheme>;
};

export const MockLayout = () => null;
export const MockAlgolia = null;
