/**
 * LayoutModel
 *
 */
import { ComponentManager } from "@dash";
import { getNearestParentWorkspace, deepCopy } from "@dash/Utils";
import { WidgetApi } from "@dash/Api";

export const LayoutModel = (layoutItem, workspaceLayout, dashboardId) => {
    try {
        if (layoutItem === null || layoutItem === undefined) {
            return null;
        }
        console.log("Object in Layout Model OG", obj);
        const obj = deepCopy(layoutItem);
        console.log("Object in Layout Model ", obj);
        const layout = {};

        layout.id = "id" in obj ? obj["id"] : null;
        layout.order = "order" in obj ? obj.order : null;
        layout.scrollable =
            "scrollable" in obj
                ? obj["scrollable"] === "false" || obj["scrollable"] === false
                    ? false
                    : true
                : false;
        layout.component = "component" in obj ? obj.component : null;
        layout.direction = "direction" in obj ? obj.direction : "col";
        layout.hasChildren = "hasChildren" in obj ? obj.hasChildren : 0;
        layout.canHaveChildren =
            "canHaveChildren" in obj ? obj.canHaveChildren : true;
        layout.width = "width" in obj ? obj.width : "";
        layout.height = "height" in obj ? obj.height : "h-full";
        layout.parent = "parent" in obj ? obj.parent : 0;
        layout.type = "type" in obj ? obj.type : "widget";
        layout.workspace = "workspace" in obj ? obj.workspace : "layout";

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
                console.log("LayoutModel key", key);
                layout[key] = widgetConfig[key];
            });
        }

        // last check for this being a container...
        if ("workspace" in layout) {
            if (layout.workspace === "layout") {
                if (layout.width === "") {
                    layout.width = "w-full";
                }
                if (layout.scrollable === "") {
                    layout.scrollable = true;
                }
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

        // can we include the API?

        layout.widgetApi = new WidgetApi(layout.uuid);

        console.log(
            "layout model widget api ",
            layout.id,
            layout.component,
            layout.uuid,
            layout.dashboardId,
            layout.widgetApi
            // layout.api.uuid()
        );

        return layout;
    } catch (e) {
        console.log("layout model ", e.message);
        return null;
    }
};
