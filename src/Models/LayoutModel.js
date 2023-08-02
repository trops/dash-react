/**
 * LayoutModel
 *
 */
import { ComponentManager } from "@dash";
import { getNearestParentWorkspace, deepCopy } from "@dash/Utils";

export const LayoutModel = (layoutItem, workspaceLayout, dashboardId) => {
    try {
        if (layoutItem === null || layoutItem === undefined) {
            return null;
        }
        const obj = deepCopy(layoutItem);
        const layout = {};

        layout.id = "id" in obj ? obj["id"] : 1;
        layout.order = "order" in obj ? obj.order : 1;
        layout.scrollable =
            "scrollable" in obj
                ? obj["scrollable"] === "false" || obj["scrollable"] === false
                    ? false
                    : true
                : false;

        layout.space =
            "space" in obj
                ? obj["space"] === "false" || obj["space"] === false
                    ? false
                    : true
                : false;

        layout.grow =
            "grow" in obj
                ? obj["grow"] === "false" || obj["grow"] === false
                    ? false
                    : true
                : false;

        layout.component = "component" in obj ? obj.component : "Container";
        layout.direction = "direction" in obj ? obj.direction : "col";
        layout.hasChildren = "hasChildren" in obj ? obj.hasChildren : 0;
        layout.canHaveChildren =
            "canHaveChildren" in obj
                ? obj.canHaveChildren !== undefined
                    ? obj.canHaveChildren
                    : false
                : true;
        layout.width = "width" in obj ? obj.width : "w-full";
        layout.height = "height" in obj ? obj.height : "h-full";
        layout.parent = "parent" in obj ? obj.parent : 0;

        /**
         * type
         * The type of the component
         * @example widget, workspace, layout
         */
        layout.type = "type" in obj ? obj.type : "layout";

        /**
         * workspace
         * The name of the Workspace the component belongs to (can exist in as a child)
         */
        layout.workspace = "workspace" in obj ? obj.workspace : "layout";

        // Space and Grow

        // Add the MAIN workspace that
        layout.dashboardId = dashboardId;

        // Event listeners and corresponding handlers exposed by the developer in the configuration
        layout.listeners = "listeners" in obj ? obj["listeners"] : {};
        layout.eventHandlers =
            "eventHandlers" in obj ? obj["eventHandlers"] : [];

        layout.siblingCount = "siblingCount" in obj ? obj["siblingCount"] : 0;

        // let's get some specifics from the configuration file
        // just in case these were missing

        // layout.componentData = ComponentManager.getComponent(layout.component);

        // generate a unique name so that we can store files, publish events etc
        // all with this very specific identifier

        layout.uuid =
            dashboardId !== undefined
                ? `${dashboardId}-${layout["component"]}-${layout.id}`
                : `${layout["component"]}-${layout.id}`;

        // if (layout.componentData !== undefined) {
        //     if ("type" in layout.componentData)
        //         layout.type = layout.componentData.type;
        //     if ("workspace" in layout.componentData)
        //         layout.workspace = layout.componentData.workspace;
        // }

        /// widget configuration
        const widgetConfig = ComponentManager.config(obj["component"], obj);

        if (widgetConfig !== null && widgetConfig !== undefined) {
            Object.keys(widgetConfig).forEach((key) => {
                // console.log("LayoutModel key", key);
                layout[key] = widgetConfig[key];
            });
        }

        // last check for this being a container...
        if ("workspace" in layout) {
            if (layout.workspace === "layout") {
                // if (layout.width === "") {
                //     layout.width = "w-full";
                // }
                // if (layout.scrollable === "") {
                //     layout.scrollable = true;
                // }
                if (layout.direction === "") {
                    layout.direction = "col";
                }
            }
        }

        // lets check to see if we already have the parent workspace?
        if (
            layout.parentWorkspaceName === undefined ||
            Object.keys(layout.parentWorkspace).length === 0
        ) {
            // get the nearest workspace and assign this as the parent for rendering
            const tempLayout = deepCopy(layout);
            const parentWS = getNearestParentWorkspace(
                workspaceLayout,
                tempLayout,
                tempLayout
            );

            let parentWorkspaceName = "layout";
            if (parentWS) {
                if ("workspace" in parentWS) {
                    parentWorkspaceName = parentWS["workspace"];
                }
            }
            layout.parentWorkspaceName = parentWorkspaceName;
            layout.parentWorkspace = parentWS || {};
        }

        return layout;
    } catch (e) {
        console.log("layout model ", e.message);
        return null;
    }
};
