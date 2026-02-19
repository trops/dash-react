import { createContext } from "react";

export const ThemeContext = createContext({
    currentTheme: null,
    currentThemeKey: null,
    theme: null,
    themeKey: null,
    themeVariant: "dark",
    changeCurrentTheme: () => {},
    changeThemeVariant: () => {},
    changeThemesForApplication: () => {},
    loadThemes: () => {},
    themes: null,
    rawThemes: null,
});
