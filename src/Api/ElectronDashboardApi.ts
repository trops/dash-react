import IDashboardApi from "./IDashboardApi";

class ElectronDashboardApi implements IDashboardApi {

    api:any

    constructor(api?:any){
        this.api = api;
    }

    listWorkspaces(appId, onSuccess, onError):Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(
                        this.api.events.WORKSPACE_LIST_COMPLETE,
                        onSuccess
                    );
                this.api.on(this.api.events.WORKSPACE_LIST_ERROR, onError);
                this.api.workspace.listWorkspacesForApplication(appId);
                return true;
            } catch(e) {
                return false;
            }
        }
        return false;
    }

    listMenuItems(appId, onSuccess, onError):Boolean {
        if (this.api !== null) {
            try {
                this.api.on(
                    this.api.events.MENU_ITEMS_LIST_COMPLETE,
                    onSuccess
                );
                this.api.on(this.api.events.MENU_ITEMS_LIST_ERROR, onError);
                this.api.menuItems.listMenuItems(appId);
            } catch(e) {
                return false;
            }
        }
        return false;
    }

    listThemes(appId, onSuccess, onError): Boolean {
        return true;
    }

    saveMenuItem(appId, menuItem, onSuccess, onError):Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(this.api.events.MENU_ITEMS_SAVE_COMPLETE, onSuccess);
                this.api.on(this.api.events.MENU_ITEMS_SAVE_ERROR, onError);
                this.api.menuItems.saveMenuItem(appId, menuItem);
            } catch(e) {
                return false;
            }
        }
        return true;    
    }

    saveWorkspace(appId, workspaceToSave, onSuccess, onError): Boolean {
        if (this.api !== null) {
            try {
                this.api.removeAllListeners();
                this.api.on(
                    this.api.events.WORKSPACE_SAVE_COMPLETE,
                    onSuccess
                );
                this.api.on(this.api.events.WORKSPACE_SAVE_ERROR, onError);
                this.api.workspace.saveWorkspaceForApplication(
                    appId,
                    workspaceToSave
                );
                return true;
            } catch(e) {
                return false;
            }
        }
        return false;
    }
    
};

export { ElectronDashboardApi };