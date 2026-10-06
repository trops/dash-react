/**
 * Light/dark helpers for native and embedded editors.
 *
 * Monaco and native form controls (date picker icon, <select> popup,
 * scrollbars) don't read Tailwind classes, so they need the active
 * theme variant translated into their own terms.
 */

/**
 * Monaco color theme for CodeEditorVS. An explicit themeName wins;
 * otherwise follow the light/dark variant (anything but "light" gets
 * the dark theme, matching ThemeContext's "dark" default).
 */
export const resolveEditorTheme = (themeName, themeVariant) =>
    themeName || (themeVariant === "light" ? "GitHub Light" : "GitHub Dark");

/** CSS `color-scheme` value for native controls. */
export const colorSchemeFor = (themeVariant) =>
    themeVariant === "light" ? "light" : "dark";
