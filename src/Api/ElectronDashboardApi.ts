import IDashboardApi from "./IDashboardApi";
import * as apiEvents from "./events";

class ElectronDashboardApi implements IDashboardApi {
    api: any;

    /**
     * events
     * Events to be used for the api calls (call, success, error)
     */
    events: any;

    constructor(api: any, events?: any) {
        this.api = api;
        if (events) {
            this.events = events;
        } else {
            this.events = apiEvents;
        }
    }

    chooseFile(onSuccess): Boolean {
        console.log("choose file electron api");
        try {
            this.api.removeAllListeners();
            this.api.on(this.events.CHOOSE_FILE_COMPLETE, onSuccess);
            // this.api.on(this.events.WORKSPACE_LIST_ERROR, onError);
            this.api.dialog.showDialog();
        } catch (e) {
            return false;
        }
    }

    listWorkspaces(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
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
}

export { ElectronDashboardApi };
