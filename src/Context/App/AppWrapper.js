import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { SettingsModel } from "@dash/Models";
import { deepCopy } from "@dash/Utils";

// TODO
// make theme files or have a Theme context which we can populate with a plugin or config
// color theme (coming soon)
const debugStyles = {
    workspace: {
        classes: "bg-gray-800 border border-red-900 rounded p-4",
    },
    "workspace-menu": {
        classes: "bg-gray-800 border border-orange-900 rounded p-4",
    },
    "workspace-footer": {
        classes: "bg-gray-800 border-t border-orange-900 rounded p-4",
    },
    layout: {
        classes: "border border-green-900 bg-gray-800 rounded p-4",
    },
    widget: {
        classes: "border border-blue-700 bg-gray-800 rounded p-4",
    },
};

export const AppWrapper = ({ children, credentials = null, dashApi }) => {
    const [creds, setCreds] = useState(credentials);
    const [debugMode, setDebugmode] = useState(false);
    const [searchClient, setSearchClient] = useState(null);
    const [settings, setSettings] = useState(null);
    const [isLoadingSettings, setIsLoadingSettings] = useState(false);
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [providers, setProviders] = useState({});
    const [isLoadingProviders, setIsLoadingProviders] = useState(false);

    useEffect(() => {
        console.log("App Wrapper ", settings, isLoadingSettings);
        if (settings === null && isLoadingSettings === false) {
            loadSettings();
        }
    }, [credentials, settings]);

    useEffect(() => {
        // Load providers on mount
        if (
            providers &&
            Object.keys(providers).length === 0 &&
            isLoadingProviders === false
        ) {
            loadProviders();
        }
    }, [credentials]);

    function changeSearchClient(searchClientTo) {
        setSearchClient(() => searchClientTo);
    }

    function changeCreds(appId, apiKey) {
        const credentialsTemp = { appId, apiKey };
        const s = deepCopy(settings);
        s["creds"] = credentialsTemp;
        setCreds(() => credentialsTemp);
        changeSettings(s);
    }

    function changeDebugMode(to) {
        setDebugmode(to);
        const s = deepCopy(settings);
        s["debugMode"] = to;
        changeSettings(s);
    }

    function changeSettings(settingsObject) {
        setSettings(() => settingsObject);
        saveSettings();
    }

    function changeApplicationTheme(themeKey) {
        try {
            let s = deepCopy(settings);
            if (s) {
                if ("theme" in s && themeKey) {
                    s["theme"] = themeKey;
                }
                changeSettings(s);
            }
        } catch (e) {
            console.log("error changing theme ", e, themeKey);
        }
    }

    function loadSettings() {
        // Here is where we have to add this theme to the themes available
        // and save to the themes file.
        console.log("loading settings ", settings, dashApi, credentials);
        if (dashApi && credentials) {
            dashApi.listSettings(
                credentials.appId,
                handleGetSettingsComplete,
                handleGetSettingsError
            );
        }
    }

    function handleGetSettingsComplete(e, message) {
        console.log("loaded settings ", message);
        if ("settings" in message) {
            let settingsObject;
            if (Object.keys(message["settings"]).length === 0) {
                // nothing in settings so we should set some things....
                // set a default theme for the user
                settingsObject = SettingsModel({ theme: "theme-1" });
            } else {
                settingsObject = SettingsModel(message["settings"]);
            }
            setSettings(() => settingsObject);
        }
        // set the settings model to the context
        setIsLoadingSettings(() => false);
        // forceUpdate();
    }

    function handleGetSettingsError(e, error) {
        console.log("settings load error ", error.message);
        setIsLoadingSettings(() => false);
    }

    function loadProviders() {
        // Load providers from the main app
        console.log("loading providers ", dashApi, credentials);
        if (dashApi && credentials) {
            setIsLoadingProviders(() => true);
            dashApi.listProviders(
                credentials.appId,
                handleGetProvidersComplete,
                handleGetProvidersError
            );
        }
    }

    function handleGetProvidersComplete(e, message) {
        console.log("loaded providers ", message);
        if ("providers" in message) {
            // message.providers is an array of { name, type, credentials }
            // Convert to object keyed by provider name for easy lookup
            const providersObj = {};
            message.providers.forEach((provider) => {
                providersObj[provider.name] = provider;
            });
            setProviders(() => providersObj);
        }
        setIsLoadingProviders(() => false);
    }

    function handleGetProvidersError(e, error) {
        console.log("providers load error ", error.message);
        setIsLoadingProviders(() => false);
        // Set empty providers object so app continues to work
        setProviders(() => ({}));
    }

    function saveSettings() {
        // Here is where we have to add this theme to the themes available
        // and save to the themes file.
        if (dashApi) {
            dashApi.saveSettings(
                credentials.appId,
                settings,
                handleGetSettingsComplete,
                handleGetSettingsError
            );
        }
    }

    // function handleSaveSettingsComplete(e, message) {
    //     if ('settings' in message) {
    //         let settingsObject;
    //         if (Object.keys(message['settings']).length === 0) {
    //             // nothing in settings so we should set some things....
    //             // set a default theme for the user
    //             settingsObject = SettingsModel({ theme: 'theme-1' });
    //         } else {
    //             settingsObject = SettingsModel(message['settings']);
    //         }
    //         setSettings(() => settingsObject);
    //     }
    //     // set the settings model to the context
    //     setIsSavingSettings(() => false);
    // }

    // function handleSaveSettingsError(e, message) {
    //     console.log('settings load error ', e, message);
    //     setIsSavingSettings(() => false);
    // }

    function getValue() {
        try {
            return {
                key: Date.now(),
                debugMode: debugMode,
                debugStyles: debugStyles,
                creds: creds,
                credentials,
                searchClient: searchClient,
                api: dashApi,
                dashApi,
                settings: settings,
                providers: providers,
                changeSearchClient,
                changeCreds,
                changeDebugMode,
                changeSettings,
                changeApplicationTheme,
            };
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    return (
        <AppContext.Provider value={getValue()}>{children}</AppContext.Provider>
    );
};
