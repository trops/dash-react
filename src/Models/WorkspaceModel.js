import { deepCopy } from "@dash/Utils";
import { LayoutModel } from "./LayoutModel";

/**
 * A Model for a Workspace (Dashboard)
 * The Workspace in this instance is the entire Dashboard Layout inclusive of the workspaces and widgets
 * When the user selects a Dashboard, this is the model that stores that information.
 */
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
    const validWorkspaceTypes = ["layout", "widget", "workspace"];

    function sanitizeType(t) {
        return validWorkspaceTypes.includes(t) === true ? t : "workspace";
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
            if (validWorkspaceProperties.includes(workspaceKey) === false) {
                // delete w[workspaceKey];
            }
        });
        return w;
    }

    function sanitizeLayout(layout, workspaceId) {
        if (layout) {
            if (layout.length > 0) {
                return layout;
            } else {
                return [
                    LayoutModel(
                        {
                            workspace: "layout",
                            type: "workspace",
                            dashboardId: workspaceId,
                        },
                        [],
                        workspaceId
                    ),
                ];
            }
        }
    }

    workspace.id = "id" in obj ? obj["id"] : Date.now();
    workspace.name = "name" in obj ? obj["name"] : "New Workspace";
    workspace.type = "type" in obj ? sanitizeType(obj["type"]) : "workspace";
    workspace.label = "label" in obj ? obj["label"] : "New Workspace";
    workspace.version = "version" in obj ? obj["version"] : 1;
    workspace.layout = "layout" in obj ? obj["layout"] : [];
    // workspace.layout =
    //     "layout" in obj
    //         ? sanitizeLayout(obj["layout"], workspace.id)
    //         : [
    //               LayoutModel(
    //                   {
    //                       workspace: "layout",
    //                       type: "workspace",
    //                       dashboardId: workspace.id,
    //                       parent: 0,
    //                       id: 1,
    //                   },
    //                   [],
    //                   workspace.id
    //               ),
    //               LayoutModel(
    //                   {
    //                       id: 2,
    //                       workspace: workspace.name,
    //                       type: "layout",
    //                       dashboardId: workspace.id,
    //                       parent: 1,
    //                   },
    //                   [],
    //                   workspace.id
    //               ),
    //           ];
    workspace.menuId = "menuId" in obj ? obj["menuId"] : 1;

    return sanitizeWorkspaceObject(workspace);
    // return workspace;
};
