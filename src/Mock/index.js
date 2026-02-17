// Mock utilities for Storybook
// This is a minimal mock for UI component stories

import { ThemeContext } from "@dash/Context";

// Generate a realistic theme object similar to what ThemeModel produces
// This mimics the structure from dash/src/Models/ThemeModel.js
const generateMockTheme = () => {
    const colorTypes = ["primary", "secondary", "tertiary"];
    const defaultColors = {
        primary: "gray",
        secondary: "blue",
        tertiary: "indigo",
    };

    const variants = {
        light: {
            "very-light": 100,
            light: 200,
            medium: 300,
            dark: 400,
            "very-dark": 500,
        },
        dark: {
            "very-light": 500,
            light: 600,
            medium: 700,
            dark: 800,
            "very-dark": 900,
        },
    };

    const theme = {
        primary: defaultColors.primary,
        secondary: defaultColors.secondary,
        tertiary: defaultColors.tertiary,
        light: {
            name: "Light Theme",
            primary: defaultColors.primary,
            secondary: defaultColors.secondary,
            tertiary: defaultColors.tertiary,
        },
        dark: {
            name: "Dark Theme",
            primary: defaultColors.primary,
            secondary: defaultColors.secondary,
            tertiary: defaultColors.tertiary,
        },
    };

    // Generate color variants for light and dark themes
    colorTypes.forEach((type) => {
        Object.keys(variants).forEach((variant) => {
            Object.keys(variants[variant]).forEach((shade) => {
                const shadeValue = variants[variant][shade];
                const color = defaultColors[type];

                // Background colors
                theme[variant][`bg-${type}-${shade}`] =
                    `bg-${color}-${shadeValue}`;
                theme[variant][`hover-bg-${type}-${shade}`] =
                    `hover:bg-${color}-${
                        shadeValue + 100 <= 900 ? shadeValue + 100 : shadeValue
                    }`;

                // Border colors
                theme[variant][`border-${type}-${shade}`] =
                    `border-${color}-${shadeValue}`;
                theme[variant][`hover-border-${type}-${shade}`] =
                    `hover:border-${color}-${
                        shadeValue + 100 <= 900 ? shadeValue + 100 : shadeValue
                    }`;

                // Text colors (inverted)
                const invertedShade = 900 - shadeValue;
                theme[variant][`text-${type}-${shade}`] =
                    `text-${color}-${invertedShade}`;
                theme[variant][`hover-text-${type}-${shade}`] =
                    `hover:text-${color}-${
                        invertedShade - 100 >= 100
                            ? invertedShade - 100
                            : invertedShade
                    }`;
            });
        });
    });

    // Add transparent variants
    ["light", "dark"].forEach((variant) => {
        theme[variant]["bg-none"] = "bg-transparent";
        theme[variant]["border-none"] = "border-transparent";
        theme[variant]["hover-border-none"] = "hover:border-transparent";
        theme[variant]["hover-bg-none"] = "hover:bg-transparent";
        theme[variant]["hover-text-none"] = "hover:text-transparent";
    });

    return theme;
};

export const mock = {
    api: {
        getWidgets: async () => [],
        getLayout: async () => ({}),
        saveDashboard: async () => ({}),
        getDashboard: async () => ({}),
    },
    themes: generateMockTheme(),
};

export const mockText = {
    paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    short: "Sample text",
    long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export const MockWrapper = ({
    children,
    api = mock.api,
    theme = mock.themes,
    variant = "dark",
}) => {
    // The currentTheme should be either the light or dark variant, not the whole theme object
    const currentTheme = theme && variant in theme ? theme[variant] : theme;

    return (
        <ThemeContext.Provider value={{ currentTheme }}>
            <div
                style={{
                    padding: "20px",
                    backgroundColor: variant === "dark" ? "#0a0a0a" : "#fafafa",
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const MockLayout = () => null;
export const MockAlgolia = null;
