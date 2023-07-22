import React, { useState, useEffect, useContext } from "react";
import { AppContext, ThemeContext } from "@dash/Context";
import { ThemeModel } from "@dash/Models";

/**
 * themes
 *
 * This will move into the filesystem as a configuration file
 * The user may also "create new" theme by filling in the color details
 */
const themes = {
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

export const ThemeWrapper = ({
    theme = null,
    dashApi,
    credentials,
    children,
}) => {
    // changeApplicationTheme will save this to the settings config
    // const { dashApi, credentials } = useContext(AppContext);

    const [chosenTheme, setChosenTheme] = useState(theme);
    const [themeName, setThemeName] = useState(null);
    const [themeVariant, setThemeVariant] = useState("dark");
    const [themesForApplication, setThemesForApplication] = useState(null);
    const [rawThemes, setRawThemes] = useState({});

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    console.log("THEME WRAPPER ", chosenTheme, dashApi, credentials);

    useEffect(() => {
        // If the user has provided a theme as a override,
        // we can skip loading the themes...

        console.log(
            "THEME WRAPPER ",
            chosenTheme,
            dashApi,
            credentials,
            themesForApplication
        );

        if (chosenTheme === null) {
            if (theme !== null) {
                const defaultTheme = ThemeModel(theme);
                setThemeVariant(() => "dark");
                setChosenTheme(() => defaultTheme);
            } else {
                console.log("THEME IS NULL");
                // if the themes for application is null...
                // we have to load the themes...
                if (themesForApplication === null) {
                    // finally
                    console.log("load the themes");
                    themesForApplication === null && loadThemes();
                } else {
                    console.log("THEME HERE");
                    const themeKeyDefault =
                        themesForApplication !== null
                            ? Object.keys(themesForApplication)[0]
                            : "theme-1";
                    const defaultTheme = ThemeModel(
                        themesForApplication !== null
                            ? themesForApplication[themeKeyDefault]
                            : themes[themeKeyDefault]
                    );
                    setThemeVariant(() => "dark");
                    setChosenTheme(() => defaultTheme);
                }
            }
        } else {
            // we have a theme chosen but need to load the application themes overall...
            if (themesForApplication === null) loadThemes();
        }
    }, [chosenTheme]);

    /**
     * loadThemes
     * Load in the themes for this application
     */
    function loadThemes() {
        console.log("load themes", dashApi, credentials);
        if (dashApi && credentials) {
            dashApi.listThemes(
                credentials.appId,
                handleLoadThemesComplete,
                handleLoadThemesError
            );
        } else {
            console.log("no api found");
            // checkThemes(dashA);
        }
    }

    /**
     * handleLoadThemesComplete
     * Load in the themes saved to the configuration, if no themes
     * exist, then use the default themes provided.
     * @param {*} e
     * @param {*} message
     */
    function handleLoadThemesComplete(e, message) {
        console.log("themes complete", message);
        if ("themes" in message) {
            checkThemes(message["themes"]);
            // if (theme === null) {
            //     changeCurrentTheme(Object.keys(message["themes"])[0]);
            // }
        }
    }

    function checkThemes(themesToCheck) {
        let themesChecked = {};
        let rawThemes = {};

        if (themesToCheck !== null) {
            if (Object.keys(themesToCheck).length === 0) {
                Object.keys(themes).forEach((themeKey) => {
                    const themeObject = ThemeModel(themes[themeKey]);
                    rawThemes[themeKey] = themes[themeKey];
                    themesChecked[themeKey] = themeObject;
                });

                setThemesForApplication(() => themesChecked);
                setRawThemes(() => rawThemes);
            } else {
                // let's make sure all of the information is there!
                Object.keys(themesToCheck).forEach((themeKey) => {
                    const themeObject = ThemeModel(themesToCheck[themeKey]);
                    rawThemes[themeKey] = themesToCheck[themeKey];
                    themesChecked[themeKey] = themeObject;
                });

                // console.log('themes to check AFTER had keys', themesChecked);

                // now let's add our default themes as well
                // if ('theme-1' in themesChecked === false) {
                //     themesChecked['theme-1'] = ThemeModel(themes['theme-1']);
                // }
                // if ('theme-2' in themesChecked === false) {
                //     themesChecked['theme-2'] = ThemeModel(themes['theme-2']);
                // }

                console.log(
                    "themes complete checked ",
                    themesChecked,
                    chosenTheme
                );
                setThemesForApplication(() => themesChecked);
                setRawThemes(() => rawThemes);
                forceUpdate();

                if (!chosenTheme) {
                    changeCurrentTheme(Object.keys(themesChecked)[0]);
                }
            }
        }
    }

    function handleLoadThemesError(e, message) {
        console.log("error loading themes ", e, message);
        setThemesForApplication(null);
    }

    const changeCurrentTheme = (themeKey) => {
        console.log("changing current theme ", themeKey);
        if (rawThemes !== null) {
            console.log("changing theme to ", themeKey);
            const themeData = ThemeModel(rawThemes[themeKey]);
            if (themeKey !== null) {
                setChosenTheme(() => themeData);
                setThemeName(() => themeKey);
                changeApplicationTheme(themeKey);
                forceUpdate();
            }
        }
    };

    const changeThemesForApplication = (themes) => {
        checkThemes(themes);
    };

    const changeThemeVariant = (variant) => {
        setThemeVariant(() => variant);
    };

    const getValue = () => {
        try {
            return {
                key: Date.now(),
                currentTheme:
                    chosenTheme !== null
                        ? themeVariant in chosenTheme
                            ? chosenTheme[themeVariant]
                            : null
                        : null,
                currentThemeKey: themeName,
                theme:
                    chosenTheme !== null
                        ? themeVariant in chosenTheme
                            ? chosenTheme[themeVariant]
                            : null
                        : null,
                themeKey: themeName,
                themeVariant,
                changeCurrentTheme,
                changeThemeVariant,
                changeThemesForApplication,
                loadThemes,
                themes: themesForApplication,
                rawThemes,
            };
        } catch (e) {
            console.log(e);
            return {};
        }
    };

    return (
        <ThemeContext.Provider value={getValue()}>
            {children}
        </ThemeContext.Provider>
    );
};
