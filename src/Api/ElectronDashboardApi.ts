import IDashboardApi from "./IDashboardApi";
import * as apiEvents from "./events";

class ElectronDashboardApi implements IDashboardApi {
    api: any;

    /**
     * events
     * Events to be used for the api calls (call, success, error)
     */
    events: apiEvents;

    constructor(api: any) {
        this.api = api;
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
                return false;
            }
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
                return false;
            }
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
                return false;
            }
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
                return false;
            }
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
        }
        return false;
    }
}

export { ElectronDashboardApi };
