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

export const ThemeWrapper = ({ theme = null, children }) => {
    // changeApplicationTheme will save this to the settings config
    const { api, creds, changeApplicationTheme } = useContext(AppContext);

    const [chosenTheme, setChosenTheme] = useState(null);
    const [themeName, setThemeName] = useState(null);
    const [themeVariant, setThemeVariant] = useState("dark");
    const [themesForApplication, setThemesForApplication] = useState(null);
    const [rawThemes, setRawThemes] = useState({});

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        // If the user has provided a theme as a override,
        // we can skip loading the themes...

        if (chosenTheme === null) {
            //&& themesForApplication !== null) {
            if (theme !== null) {
                const defaultTheme = ThemeModel(theme);
                setThemeVariant(() => "dark");
                setChosenTheme(() => defaultTheme);
            } else {
                // if the themes for application is null...
                // we have to load the themes...
                if (themesForApplication === null) {
                    // finally
                    themesForApplication === null && loadThemes();
                } else {
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
            console.log("we have a theme!", chosenTheme);
            // setThemesForApplication([chosenTheme]);

            // themesForApplication === null && loadThemes();
        }
    });

    function loadThemes() {
        if (api && creds) {
            api.removeAllListeners();
            api.on(api.events.THEME_LIST_COMPLETE, handleLoadThemesComplete);
            api.on(api.events.THEME_LIST_ERROR, handleLoadThemesError);
            api.themes.listThemesForApplication(creds.appId);
        } else {
            console.log("no api found");
            checkThemes(api.themes.listThemesForApplication());
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
        if ("themes" in message) {
            checkThemes(message["themes"]);
            if (theme === null) {
                changeCurrentTheme(Object.keys(message["themes"])[0]);
            }
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

                setThemesForApplication(() => themesChecked);
                setRawThemes(() => rawThemes);
                forceUpdate();

                if (chosenTheme === null) {
                    changeCurrentTheme(Object.keys(themesForApplication)[0]);
                }
            }
        }
    }

    function handleLoadThemesError(e, message) {
        console.log("error loading themes ", e, message);
        setThemesForApplication(null);
    }

    const changeCurrentTheme = (themeKey) => {
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
    };

    return (
        <ThemeContext.Provider value={getValue()}>
            {children}
        </ThemeContext.Provider>
    );
};
