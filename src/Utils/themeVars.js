/**
 * The theme's CSS variables as an inline style, for whatever renders at the
 * end of <body> (dialogs, drawers, menus). A dashboard's theme sets its
 * colours on the dashboard's own box, which a portal can't see — so a
 * portal carries the colours of the theme it was opened in: a widget's
 * dialog on a dashboard shows that dashboard's theme, the app's dialogs
 * the app's.
 *
 * @param {object|null} currentTheme  from ThemeContext
 * @returns {object|undefined} style
 */
export function themeVarsStyle(currentTheme) {
    const vars = currentTheme && currentTheme.cssVars;
    return vars && typeof vars === "object" ? { ...vars } : undefined;
}
