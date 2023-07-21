import IDashboardApi from "./IDashboardApi";
import * as apiEvents from "./events";

class WebDashboardApi implements IDashboardApi {
    /**
     * api
     * The api to be utilized for the requests (electron, react, custom ...)
     */
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
        return true;
    }

    listThemes(appId, onSuccess, onError): Boolean {
        return true;
    }

    listMenuItems(appId, onSuccess, onError): Boolean {
        return true;
    }

    listSettings(appId, onSuccess, onError): Boolean {
        return true;
    }

    saveMenuItem(appId, menuItem): Boolean {
        return true;
    }

    saveWorkspace(appId, workspaceToSave, onSuccess, onError): Boolean {
        return true;
    }

    saveSettings: (appId: string, settings: any, onSuccess: { event: string; message: any; }, onError: { event: string; e: Error; }) => Boolean;

    saveTheme(
        appId: any,
        themeKey: string,
        rawTheme: {},
        onSuccess: any,
        onError: any
    ): Boolean {
        return false;
    }
}

export { WebDashboardApi };
