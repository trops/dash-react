import IDashboardApi from "./IDashboardApi";
import * as apiEvents from "./events";

class ElectronDashboardApi implements IDashboardApi {
    api: any;

    /**
     * @param {String} appId the application identifier
     * Also this will be appended to the path where we store the configuration files
     */
    appId: String;

    /**
     * events
     * Events to be used for the api calls (call, success, error)
     */
    events: any;

    constructor(api: any, appId = null, events?: any) {
        this.api = api;
        this.appId = appId;

        if (events) {
            this.events = events;
        } else {
            this.events = apiEvents;
        }
    }

    chooseFile(allowFile = true, extensions = ["*"], onSuccess): Boolean {
        console.log("choose file electron api");
        try {
            this.api.removeAllListeners(this.events.CHOOSE_FILE_COMPLETE);
            this.api.on(this.events.CHOOSE_FILE_COMPLETE, onSuccess);
            this.api.dialog.chooseFile(allowFile, extensions);
        } catch (e) {
            return false;
        }
    }

    listWorkspaces(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners(
                    this.events.WORKSPACE_LIST_COMPLETE
                );
                this.api.removeAllListeners(this.events.WORKSPACE_LIST_ERROR);
                this.api.on(this.events.WORKSPACE_LIST_COMPLETE, onSuccess);
                this.api.on(this.events.WORKSPACE_LIST_ERROR, onError);
                this.api.workspace.listWorkspacesForApplication(appId);
                return true;
            } catch (e) {
                onError(this.events.WORKSPACE_LIST_ERROR, e);
                return false;
            }
        } else {
            onError(
                this.events.WORKSPACE_LIST_ERROR,
                new Error("No Api found")
            );
            return false;
        }
    }

    listContexts(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners(this.events.CONTEXT_LIST_COMPLETE);
                this.api.removeAllListeners(this.events.CONTEXT_LIST_ERROR);
                this.api.on(this.events.CONTEXT_LIST_COMPLETE, onSuccess);
                this.api.on(this.events.CONTEXT_LIST_ERROR, onError);
                this.api.context.listContextForApplication(appId);
                return true;
            } catch (e) {
                onError(this.events.CONTEXT_LIST_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.CONTEXT_LIST_ERROR, new Error("No Api found"));
            return false;
        }
    }

    listMenuItems(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.on(this.events.MENU_ITEMS_LIST_COMPLETE, onSuccess);
                this.api.on(this.events.MENU_ITEMS_LIST_ERROR, onError);
                this.api.menuItems.listMenuItems(appId);
                return true;
            } catch (e) {
                onError(this.events.MENU_ITEMS_LIST_ERROR, e);
                return false;
            }
        } else {
            onError(
                this.events.MENU_ITEMS_LIST_ERROR,
                new Error("No Api found")
            );
            return false;
        }
    }

    listThemes(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.THEME_LIST_COMPLETE, onSuccess);
                this.api.on(this.events.THEME_LIST_ERROR, onError);
                this.api.themes.listThemesForApplication(appId);
                return true;
            } catch (e) {
                onError(this.events.THEME_LIST_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.THEME_LIST_ERROR, new Error("No Api found"));
            return false;
        }
    }

    listSettings(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.SETTINGS_GET_COMPLETE, onSuccess);
                this.api.on(this.events.SETTINGS_GET_ERROR, onError);
                this.api.settings.getSettingsForApplication(appId);
                return true;
            } catch (e) {
                onError(this.events.SETTINGS_GET_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.SETTINGS_GET_ERROR, new Error("No Api found"));
            return false;
        }
    }

    saveMenuItem(appId, menuItem, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.MENU_ITEMS_SAVE_COMPLETE, onSuccess);
                this.api.on(this.events.MENU_ITEMS_SAVE_ERROR, onError);
                this.api.menuItems.saveMenuItem(appId, menuItem);
                return true;
            } catch (e) {
                onError(this.events.MENU_ITEMS_SAVE_ERROR, e);
                return false;
            }
        } else {
            onError(
                this.events.MENU_ITEMS_SAVE_ERROR,
                new Error("No Api found")
            );
            return false;
        }
    }

    saveWorkspace(appId, workspaceToSave, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.WORKSPACE_SAVE_COMPLETE, onSuccess);
                this.api.on(this.events.WORKSPACE_SAVE_ERROR, onError);
                this.api.workspace.saveWorkspaceForApplication(
                    appId,
                    workspaceToSave
                );
                return true;
            } catch (e) {
                onError(this.events.WORKSPACE_SAVE_ERROR, e);
                return false;
            }
        } else {
            onError(
                this.events.WORKSPACE_SAVE_ERROR,
                new Error("No Api found")
            );
            return false;
        }
    }

    saveContext(appId, contextToSave, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.CONTEXT_SAVE_COMPLETE, onSuccess);
                this.api.on(this.events.CONTEXT_SAVE_ERROR, onError);
                this.api.context.saveContextForApplication(
                    appId,
                    contextToSave
                );
                return true;
            } catch (e) {
                onError(this.events.CONTEXT_SAVE_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.CONTEXT_SAVE_ERROR, new Error("No Api found"));
            return false;
        }
    }

    saveSettings(appId, settings, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.SETTINGS_GET_COMPLETE, onSuccess);
                this.api.on(this.events.SETTINGS_GET_ERROR, onError);
                this.api.settings.saveSettingsForApplication(appId, settings);
                return true;
            } catch (e) {
                onError(this.events.SETTINGS_GET_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.SETTINGS_GET_ERROR, new Error("No Api found"));
            return false;
        }
    }

    saveTheme(appId, themeKey, rawTheme, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.THEME_SAVE_COMPLETE, onSuccess);
                this.api.on(this.events.THEME_SAVE_ERROR, onError);
                this.api.themes.saveThemeForApplication(
                    appId,
                    themeKey,
                    rawTheme
                );
                return true;
            } catch (e) {
                onError(this.events.THEME_SAVE_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.THEME_SAVE_ERROR, new Error("No Api found"));
            return false;
        }
    }

    listProviders(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.PROVIDER_LIST_COMPLETE, onSuccess);
                this.api.on(this.events.PROVIDER_LIST_ERROR, onError);
                this.api.providers.listProvidersForApplication(appId);
                return true;
            } catch (e) {
                onError(this.events.PROVIDER_LIST_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.PROVIDER_LIST_ERROR, new Error("No Api found"));
            return false;
        }
    }

    getProvider(appId, providerName, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.PROVIDER_GET_COMPLETE, onSuccess);
                this.api.on(this.events.PROVIDER_GET_ERROR, onError);
                this.api.providers.getProvider(appId, providerName);
                return true;
            } catch (e) {
                onError(this.events.PROVIDER_GET_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.PROVIDER_GET_ERROR, new Error("No Api found"));
            return false;
        }
    }

    saveProvider(
        appId,
        providerName,
        providerData,
        onSuccess,
        onError
    ): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.PROVIDER_SAVE_COMPLETE, onSuccess);
                this.api.on(this.events.PROVIDER_SAVE_ERROR, onError);
                this.api.providers.saveProvider(
                    appId,
                    providerName,
                    providerData
                );
                return true;
            } catch (e) {
                onError(this.events.PROVIDER_SAVE_ERROR, e);
                return false;
            }
        } else {
            onError(this.events.PROVIDER_SAVE_ERROR, new Error("No Api found"));
            return false;
        }
    }

    deleteProvider(appId, providerName, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.events.PROVIDER_DELETE_COMPLETE, onSuccess);
                this.api.on(this.events.PROVIDER_DELETE_ERROR, onError);
                this.api.providers.deleteProvider(appId, providerName);
                return true;
            } catch (e) {
                onError(this.events.PROVIDER_DELETE_ERROR, e);
                return false;
            }
        } else {
            onError(
                this.events.PROVIDER_DELETE_ERROR,
                new Error("No Api found")
            );
            return false;
        }
    }
}
