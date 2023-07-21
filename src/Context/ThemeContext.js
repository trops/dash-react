import { createContext } from "react";

export const ThemeContext = createContext({
    key: Date.now(),
    currentTheme: "theme-1",
    currentThemeKey: null,
    theme: null,
    themeKey: null,
    themeVariant: "dark",
    changeCurrentTheme: null,
    changeThemeVariant: null,
    changeThemesForApplication: null,
    loadThemes: null,
    themes: null,
    rawThemes: null,
});
