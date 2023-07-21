import IDashboardApi from "./IDashboardApi";
import * as apiEvents from "./events";

class ElectronDashboardApi implements IDashboardApi {
    api: any;

    /**
     * events
     * Events to be used for the api calls (call, success, error)
     */
    events: apiEvents;

    constructor(api: any, events?: any) {
        console.log("constructor events ", events);
        this.api = api;
        if (events) {
            this.events = events;
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
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }

    listMenuItems(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.on(
                    this.api.events.MENU_ITEMS_LIST_COMPLETE,
                    onSuccess
                );
                this.api.on(this.api.events.MENU_ITEMS_LIST_ERROR, onError);
                this.api.menuItems.listMenuItems(appId);
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }

    listThemes(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.THEME_LIST_COMPLETE, onSuccess);
                this.api.on(this.api.events.THEME_LIST_ERROR, onError);
                this.api.themes.listThemesForApplication(appId);
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return true;
    }

    listSettings(appId, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.SETTINGS_GET_COMPLETE, onSuccess);
                this.api.on(this.api.events.SETTINGS_GET_ERROR, onError);
                this.api.settings.getSettingsForApplication(appId);
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }

    saveMenuItem(appId, menuItem, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(
                    this.api.events.MENU_ITEMS_SAVE_COMPLETE,
                    onSuccess
                );
                this.api.on(this.api.events.MENU_ITEMS_SAVE_ERROR, onError);
                this.api.menuItems.saveMenuItem(appId, menuItem);
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return true;
    }

    saveWorkspace(appId, workspaceToSave, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.WORKSPACE_SAVE_COMPLETE, onSuccess);
                this.api.on(this.api.events.WORKSPACE_SAVE_ERROR, onError);
                this.api.workspace.saveWorkspaceForApplication(
                    appId,
                    workspaceToSave
                );
                return true;
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }

    saveSettings(appId, settings, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.SETTINGS_GET_COMPLETE, onSuccess);
                this.api.on(this.api.events.SETTINGS_GET_ERROR, onError);
                this.api.settings.saveSettingsForApplication(appId, settings);
                return true;
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }

    saveTheme(appId, themeKey, rawTheme, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.THEME_SAVE_COMPLETE, onSuccess);
                this.api.on(this.api.events.THEME_SAVE_ERROR, onError);
                this.api.themes.saveThemeForApplication(
                    appId,
                    themeKey,
                    rawTheme
                );
                return true;
            } catch (e) {
                onError(e);
                return false;
            }
        } else {
            onError(new Error("No Api found"));
        }
        return false;
    }
}

export { ElectronDashboardApi };
