import { useEffect, useState } from "react"
import { AppContext } from "./AppContext";
import algoliasearch from 'algoliasearch/lite';
import { SettingsModel } from "@dash/Models";
import { deepCopy } from "@dash/Utils";

// const debugMode = process.env.REACT_APP_DEBUG === "false" ? true : false;

// TODO
// make theme files or have a Theme context which we can populate with a plugin or config
// color theme (coming soon)
const debugStyles = {
    'workspace': {
        'classes': 'bg-gray-800 border border-red-900 rounded p-4'
    },
    'workspace-menu': {
        'classes': 'bg-gray-800 border border-orange-900 rounded p-4'
    },
    'workspace-footer': {
        'classes': 'bg-gray-800 border-t border-orange-900 rounded p-4'
    },
    'layout': {
        'classes': 'border border-green-900 bg-gray-800 rounded p-4'
    },
    'widget': {
        'classes': 'border border-blue-700 bg-gray-800 rounded p-4'
    }
}

const searchClientAlgolia = algoliasearch(process.env.REACT_APP_APP_ID, process.env.REACT_APP_ALGOLIA_KEY);

export const AppWrapper = ({ children, api }) => {

    const [creds, setCreds] = useState({ appId: process.env.REACT_APP_APP_ID, apiKey: process.env.REACT_APP_ALGOLIA_KEY });
    const [debugMode, setDebugmode] = useState(process.env.REACT_APP_DEBUG === "false" ? true : false);
    const [searchClient, setSearchClient] = useState(searchClientAlgolia);

    const [settings, setSettings] = useState(null);
    const [isLoadingSettings, setIsLoadingSettings] = useState(false);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    useEffect(() => {
        if (settings === null && isLoadingSettings === false) {
            loadSettings();
        }
    }, [settings]);

    function changeSearchClient (searchClientTo) {
        setSearchClient(() => searchClientTo);
    }

    function changeCreds(appId, apiKey) {
        const credentials = { appId, apiKey };
        const s = deepCopy(settings);
        s['creds'] = credentials;
        setCreds(() => credentials);
        changeSettings(s);
    }

    function changeDebugMode(to) {
        setDebugmode(to);
        const s = deepCopy(settings);
        s['debugMode'] = to;
       changeSettings(s);
    }

    function changeSettings(settingsObject) {
        setSettings(() => settingsObject);
        saveSettings();
    }

    function changeApplicationTheme(themeKey) {
        const s = deepCopy(settings);
        s['theme'] = themeKey;
        changeSettings(s);
    }

    function loadSettings() {
        // Here is where we have to add this theme to the themes available
        // and save to the themes file.
        api.removeAllListeners();
        api.on(api.events.SETTINGS_GET_COMPLETE, handleGetSettingsComplete);
        api.on(api.events.SETTINGS_GET_ERROR, handleGetSettingsError);
        api.settings.getSettingsForApplication();
    }

    function handleGetSettingsComplete(e, message) {
        if ('settings' in message) {
            let settingsObject;
            if (Object.keys(message['settings']).length === 0) {
                // nothing in settings so we should set some things....
                // set a default theme for the user
                settingsObject = SettingsModel({ theme: 'theme-1' });
            } else {
                settingsObject = SettingsModel(message['settings']);
            }
            setSettings(() => settingsObject);
        }
        // set the settings model to the context
        setIsLoadingSettings(() => false);
    }

    function handleGetSettingsError(e, message) {
        console.log('settings load error ', e, message);
        setIsLoadingSettings(() => false);
    }    

    function saveSettings() {
        // Here is where we have to add this theme to the themes available
        // and save to the themes file.
        api.removeAllListeners();
        api.on(api.events.SETTINGS_GET_COMPLETE, handleGetSettingsComplete);
        api.on(api.events.SETTINGS_GET_ERROR, handleGetSettingsError);
        api.settings.saveSettingsForApplication(settings);
    }

    function handleSaveSettingsComplete(e, message) {
        if ('settings' in message) {
            let settingsObject;
            if (Object.keys(message['settings']).length === 0) {
                // nothing in settings so we should set some things....
                // set a default theme for the user
                settingsObject = SettingsModel({ theme: 'theme-1' });
            } else {
                settingsObject = SettingsModel(message['settings']);
            }
            setSettings(() => settingsObject);
        }
        // set the settings model to the context
        setIsSavingSettings(() => false);
    }

    function handleSaveSettingsError(e, message) {
        console.log('settings load error ', e, message);
        setIsSavingSettings(() => false);
    }    

    function getValue() {
        return { 
            key: Date.now(),
            debugMode,
            debugStyles,
            creds,
            searchClient,
            api,
            settings,
            changeSearchClient,
            changeCreds,
            changeDebugMode,
            changeSettings,
            changeApplicationTheme
        };
    }

    return (
        <AppContext.Provider value={getValue()}>
            {children}
        </AppContext.Provider>
    );
}