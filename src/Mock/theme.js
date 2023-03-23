export const themes = {
    "theme-1": {
        name: "Default 1",
        primary: "gray",
        secondary: "indigo",
        tertiary: "blue",
        shadeBackgroundFrom: 600,
        shadeBorderFrom: 600,
        shadeTextFrom: 100,
        dark: {
            "bg-primary-very-dark": "bg-black", // override test
        },
        light: {
            "bg-primary-very-light": "bg-white", // override test
            "bg-primary-very-dark": "bg-gray-600", // override test
        },
    },
    "theme-2": {
        name: "Default 2",
        primary: "gray",
        secondary: "slate",
        tertiary: "orange",
        shadeBackgroundFrom: 200,
        shadeBorderFrom: 300,
        shadeTextFrom: 700,
        dark: {
            "bg-primary-very-dark": "bg-black", // override test
        },
        light: {
            "bg-primary-very-light": "bg-white", // override test
            "bg-primary-very-dark": "bg-gray-600", // override test
        },
    },
};

export const mockThemeContext = {
    key: Date.now(),
    currentTheme: themes["theme-1"]["dark"],
    currentThemeKey: "theme-1",
    theme: themes["theme-1"]["dark"],
    themeKey: "theme-1",
    themeVariant: "dark",
    changeCurrentTheme: function () {},
    changeThemeVariant: function () {},
    changeThemesForApplication: function () {},
    loadThemes: function () {},
    themes,
    rawThemes: themes,
};
