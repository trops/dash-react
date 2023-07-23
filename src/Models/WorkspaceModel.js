/**
 * WorkspaceModel
 *
 */
import { deepCopy } from "@dash/Utils";
import { MenuItemModel } from "./MenuItemModel";

export const WorkspaceModel = (workspaceItem) => {
    const obj =
        workspaceItem !== null && workspaceItem !== undefined
            ? deepCopy(workspaceItem)
            : {};

    const workspace = {};
    const validWorkspaceProperties = [
        "id",
        "name",
        "type",
        "label",
        "layout",
        "menuId",
        "version",
    ];
    const validWorkspaceTypes = ["layout", "widget"];

    function sanitizeType(t) {
        return validWorkspaceTypes.includes(t) === true ? t : "layout";
    }

    /**
     * sanitize workspace model
     *
     * If this contains any properties that are NOT part of the model
     * we should remove them
     *
     * @param {object} w the workspace model
     * @returns
     */
    function sanitizeWorkspaceObject(w) {
        Object.keys(w).forEach((workspaceKey) => {
            console.log("checking key ", workspaceKey);
            if (validWorkspaceProperties.includes(workspaceKey) === false) {
                console.log("deleting key ", workspaceKey);
                delete w[workspaceKey];
            }
        });
        return w;
    }

    workspace.id = "id" in obj ? obj["id"] : null;
    workspace.name = "name" in obj ? obj["name"] : "My Workspace";
    workspace.type = "type" in obj ? sanitizeType(obj["type"]) : "layout";
    workspace.label = "label" in obj ? obj["label"] : "Workspace";
    workspace.layout = "layout" in obj ? obj["layout"] : [];
    //workspace.menuItem = MenuItemModel();
    workspace.menuId = "menuId" in obj ? obj["menuId"] : 1;

    return sanitizeWorkspaceObject(workspace);
    // return workspace;
};
