/**
 * WorkspaceModel
 *
 */
import { deepCopy } from "@dash/Utils";

export const WorkspaceModel = (workspaceItem) => {
    const obj = deepCopy(workspaceItem);

    const workspace = {};

    workspace.id = "id" in obj ? obj["id"] : null;
    workspace.name = "name" in obj ? obj["name"] : "My Workspace";
    workspace.type = "type" in obj ? obj["type"] : "layout";
    workspace.label = "label" in obj ? obj["label"] : "Workspace";
    workspace.layout = "layout" in obj ? obj["layout"] : [];
    workspace.menuItem = { id: 1, name: "Uncategorized" };

    return workspace;
};
