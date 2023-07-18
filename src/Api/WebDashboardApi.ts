import IDashboardApi from "./IDashboardApi";

class WebDashboardApi implements IDashboardApi {
    api:any

    constructor(api?:any){
        this.api = api;
    }

    listWorkspaces(appId, onSuccess, onError):Boolean {
        return true;
    }

    listThemes(appId, onSuccess, onError):Boolean {
        return true;
    }

    listMenuItems(appId, onSuccess, onError):Boolean {
        return true;
    }

    saveMenuItem(appId, menuItem):Boolean {
        return true;
    }

    saveWorkspace(appId, workspaceToSave, onSuccess, onError):Boolean {
        return true;
    }
    
};

export { WebDashboardApi }