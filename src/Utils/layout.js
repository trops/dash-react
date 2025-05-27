import {
    LayoutBuilderGridItem,
    LayoutGridContainer,
    LayoutBuilderConfigMenuItem,
    LayoutBuilderConfigContainerMenuItem,
} from "@dash/Layout";
import { WidgetFactory } from "@dash/Widget";
import { LayoutModel } from "@dash/Models";
import { deepCopy } from "@dash/Utils";
import { ComponentManager } from "../ComponentManager";

function compareChildren(a, b) {
    if (a.order < b.order) {
        return -1;
    }
    if (a.order > b.order) {
        return 1;
    }
    return 0;
}

/**
 * Render the layout of the Widgets recursively
 * If there are children in the layout we will call renderLayout again and so forth.
 *
 * @param {Object} tempLayout the layout we are rendering
 * @param {String} parentKey the key of the parent element we are rendering children into
 * @param {Boolean} debugMode if we are in debug mode
 * @param {*} onClick
 * @param {*} onClickRemove
 * @returns
 */

export const renderLayout = ({
    layout,
    parentKey = 0,
    workspace,
    isDraggable = true,
    debugMode = false,
    previewMode = false,
    editMode,
    onClickAdd = null,
    onClickQuickAdd = undefined,
    onClickRemove = null,
    onClickShrink = null,
    onClickExpand = null,
    onChangeDirection = null,
    onChangeOrder = null,
    onOpenConfig = null,
    onOpenEvents = null,
    onDropItem = null,
    onDragItem = undefined,
    dashboardId,
}) => {
    try {
        console.log("rendering layout");
        // Go through each item in the Workspace Layout to render the items.
        return (
            layout !== null &&
            layout !== undefined &&
            layout
                .filter((t) => {
                    return t["parent"] === parentKey && t["id"] !== parentKey;
                }) //  && t['id'] !== parentKey
                .sort(compareChildren) // set the order of the elements
                .map((child) => {
                    const childLayout = LayoutModel(child, layout, dashboardId);
                    const {
                        id,
                        hasChildren,
                        parent,
                        direction,
                        scrollable,
                        order,
                        width,
                        height,
                        component,
                        canHaveChildren,
                        uuid,
                        space,
                        grow,
                    } = childLayout;

                    return hasChildren === 1 && canHaveChildren === true ? (
                        <LayoutGridContainer
                            key={`grid-container-${uuid}-${
                                previewMode === true ? "view" : "edit"
                            }`}
                            uuid={uuid}
                            id={id}
                            item={childLayout}
                            parent={parent}
                            onChangeDirection={onChangeDirection}
                            onChangeOrder={onChangeOrder}
                            onClickRemove={onClickRemove}
                            isContainer={true}
                            direction={direction}
                            scrollable={scrollable}
                            onClickAdd={onClickAdd}
                            onClickQuickAdd={onClickQuickAdd}
                            order={order}
                            preview={previewMode}
                            editMode={editMode}
                            onOpenConfig={onOpenConfig}
                            onOpenEvents={onOpenEvents}
                            onDropItem={onDropItem}
                            onDragItem={onDragItem}
                            width={width}
                            isDraggable={isDraggable}
                            workspace={workspace}
                            height={height}
                            space={space}
                            grow={grow}
                        >
                            {id > 0 &&
                                renderLayout({
                                    dashboardId,
                                    item: childLayout,
                                    layout,
                                    parentKey: id,
                                    debugMode,
                                    previewMode,
                                    editMode,
                                    onClickAdd,
                                    onClickQuickAdd,
                                    onClickRemove,
                                    onClickShrink,
                                    onClickExpand,
                                    onChangeDirection,
                                    onChangeOrder,
                                    order,
                                    onOpenConfig,
                                    onOpenEvents,
                                    onDropItem,
                                    onDragItem,
                                    workspace,
                                    isDraggable,
                                })}
                        </LayoutGridContainer>
                    ) : (
                        <LayoutBuilderGridItem
                            key={`grid-item-${uuid}-${
                                previewMode === true ? "view" : "edit"
                            }`}
                            uuid={uuid}
                            item={childLayout}
                            layout={layout}
                            id={id}
                            parent={parent}
                            row={order}
                            col={order}
                            order={order}
                            onClickAdd={onClickAdd}
                            onClickQuickAdd={onClickQuickAdd}
                            onClickRemove={onClickRemove}
                            onClickExpand={onClickExpand}
                            onClickShrink={onClickShrink}
                            onChangeDirection={onChangeDirection}
                            onChangeOrder={onChangeOrder}
                            onDropItem={onDropItem}
                            onDragItem={onDragItem}
                            name={id}
                            width={width}
                            height={height}
                            direction={direction}
                            scrollable={scrollable}
                            space={space}
                            grow={grow}
                            preview={previewMode}
                            editMode={editMode}
                            component={component}
                            onOpenConfig={onOpenConfig}
                            onOpenEvents={onOpenEvents}
                            isDraggable={isDraggable}
                            workspace={workspace}
                        />
                    );
                })
        );
    } catch (e) {
        console.log(e);
    }
};

export function renderLayoutMenu({
    currentWorkspace,
    parentKey = 0,
    onClick,
    onMouseOver,
}) {
    try {
        let isOver = false;

        function handleMouseOver(e) {
            isOver = true;
            onMouseOver(e);
        }

        return (
            currentWorkspace !== null &&
            currentWorkspace !== undefined &&
            currentWorkspace["layout"]
                .filter((t) => t["parent"] === parentKey)
                .sort(compareChildren)
                .map((child) => {
                    const childLayout = LayoutModel(
                        child,
                        currentWorkspace["layout"]
                    );
                    // get some data to render the child...
                    const {
                        // direction,
                        component,
                        // order,
                        id,
                    } = child;

                    const hasChildren =
                        "hasChildren" in child ? child["hasChildren"] : 0;

                    return hasChildren === 1 ? (
                        <LayoutBuilderConfigContainerMenuItem
                            key={`layout-builder-config-container-${id}`}
                            onClick={onClick}
                            onMouseOver={handleMouseOver}
                            id={id}
                            component={component}
                            item={childLayout}
                        >
                            {id > 0 &&
                                renderLayoutMenu({
                                    currentWorkspace,
                                    parentKey: id,
                                    onClick,
                                    onMouseOver,
                                })}
                        </LayoutBuilderConfigContainerMenuItem>
                    ) : (
                        <LayoutBuilderConfigMenuItem
                            onClick={onClick}
                            onMouseOver={handleMouseOver}
                            id={id}
                            component={component}
                            item={childLayout}
                        />
                    );
                })
        );
    } catch (e) {
        console.log(e);
    }
}

/**
 * renderComponent
 *
 * @param {string} component the name of the component to render
 * @param {*} id the unique identifier
 * @param {*} params optional params that will be passed in as props to the component
 * @returns
 */
export function renderComponent(component, id, params = {}, children = null) {
    try {
        if (component) {
            if ("height" in params) {
                if (params["height"] === "") {
                    params["height"] = "h-full";
                }
            }

            //console.log("widget to render ", component);

            const WidgetToRender = WidgetFactory.render(
                component,
                `widget-${id}`,
                params,
                children
            );
            return WidgetToRender ? (
                WidgetToRender
            ) : (
                <div
                    className={`flex flex-col h-full justify-center w-full font-bold text-2xl items-center text-gray-200 z-10`}
                >
                    There was no Widget found
                </div>
            );
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

/**
 * getComponentInLayout
 * @param {int} componentId
 * @param {array} layout the array of Layout items
 * @returns
 */
export function getComponentInLayout(componentId, layout) {
    try {
        let item = null;
        layout.forEach((l) => {
            if (l.id === componentId) {
                item = l;
            }
        });
        return item;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * getParentWorkspaceForItem
 * Loop recursively through the layout until we hit a Workspace (traverse upwards for each parent)
 * DO NOT return a Container as this is NOT a workspace
 * @param {array} componentId
 * @param {object} layout
 */
export function getParentWorkspaceForItem(componentId, layout, workspaceName) {
    // The workspace we will be returning as the parent
    let workspaceFound = null;
    /**
     * recurse
     * The recursive function that will allow us to search up the parent chain for a matching workspace
     * @param {int} componentId the id of the component we are searching for in the layout
     * @param {array} layout the layout of components in the workspace
     * @param {string} workspaceName the name of the workspace we are looking for (workspace of the component)
     */
    function recurse(componentId, layout, workspaceName) {
        const componentInLayout = getComponentInLayout(componentId, layout);
        layout.forEach((layoutItem) => {
            if (layoutItem["id"] === componentInLayout["parent"]) {
                // If the component we found is NOT a Workspace...
                if (isWorkspace(layoutItem) === false) {
                    return recurse(layoutItem["id"], layout, workspaceName);
                } else {
                    // If we have a match then we are cool...else keep going!
                    if (layoutItem["workspace"] === workspaceName) {
                        // Matched, so this is our Workspace
                        workspaceFound = layoutItem;
                        return layoutItem;
                    } else {
                        return recurse(layoutItem["id"], layout, workspaceName);
                    }
                }
            }
        });
    }

    // let's light this candle.
    recurse(componentId, layout, workspaceName);

    return workspaceFound;
}

export function isWidget(item) {
    try {
        return item["canHaveChildren"] === false && item["type"] === "widget";
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function isContainer(item) {
    try {
        return (
            item["canHaveChildren"] === true &&
            (item["component"] === "Container" ||
                item["component"] === "LayoutContainer")
        );
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function isWorkspace(item) {
    try {
        return isWidget(item) === false && isContainer(item) === false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function traverseParentTree(layout, item) {
    // const componentMap = ComponentManager.map();
    return layout.map((c) => {
        console.log("tree: ", c, c["id"], item["parent"]);
        if (item["parent"] === c["id"]) {
            console.log("tree MATCH: ", c, c);
        }
    });
}

/**
 * getNExtHighestParentId
 * @param {*} tempLayout
 * @param {*} currentParent
 * @returns
 */
export function getNextHighestParentId(tempLayout, currentParent) {
    // loop through the layout to find the next highest parent id
    let parentId = -1;

    const newTemp = JSON.parse(JSON.stringify(tempLayout));
    let len = newTemp.length;

    for (let i = len; i > 0; i--) {
        const t = newTemp[i - 1];
        if (t.parent > currentParent) {
            if (t.parent > parentId) {
                parentId = t.parent;
            }
        }
    }
    return parentId;
}

export function getNextHighestId(tempLayout) {
    const newTemp = JSON.parse(JSON.stringify(tempLayout));
    let maxId = Math.max(...newTemp.map((t) => t.id));

    return maxId + 1;
}

export function isMaxOrderForItem(tempLayout, itemId, parentId) {
    const newTemp = JSON.parse(JSON.stringify(tempLayout));
    const children = newTemp.filter((i) => i.parent === parentId);
    let maxOrder = 0;
    if (children.length > 0) {
        maxOrder = Math.max(
            ...newTemp.filter((i) => i.parent === parentId).map((t) => t.order)
        );
    }
    return itemId["order"] === maxOrder;
}

export function isMinOrderForItem(tempLayout, itemId, parentId) {
    const newTemp = JSON.parse(JSON.stringify(tempLayout));
    const children = newTemp.filter((i) => i.parent === parentId);
    let maxOrder = 0;
    if (children.length > 0) {
        maxOrder = Math.min(
            ...newTemp.filter((i) => i.parent === parentId).map((t) => t.order)
        );
    }
    return itemId["order"] === maxOrder;
}

export function getNextHighestOrder(tempLayout, parentId) {
    const newTemp = JSON.parse(JSON.stringify(tempLayout));
    const children = newTemp.filter((i) => i.parent === parentId);
    let maxOrder = 0;
    if (children.length > 0) {
        maxOrder = Math.max(
            ...newTemp.filter((i) => i.parent === parentId).map((t) => t.order)
        );
    }
    return { highest: maxOrder + 1, numChildren: children.length };
}

export function getNextHighestItemInLayout(tempLayout, currentOrder) {
    var nextItem = null;
    Object.keys(tempLayout).forEach((t) => {
        if (nextItem === null) {
            if (tempLayout[t]["order"] > currentOrder) {
                nextItem = deepCopy(tempLayout[t]);
            }
        } else {
            if (
                tempLayout[t]["order"] > currentOrder &&
                nextItem["order"] > tempLayout[t]["order"]
            ) {
                nextItem = deepCopy(tempLayout[t]);
            }
        }
    });

    return nextItem;
}

export function numChildrenForLayout(item, layout) {
    let num = 0;
    if (item && layout) {
        const itemsWithParent = Object.keys(layout).filter((li) => {
            return layout[li]["parent"] === item["parent"];
        });
        // set the number of children
        num = itemsWithParent.length;
    }
    return num;
}

export function getNextLowestItemInLayout(tempLayout, currentOrder) {
    var nextItem = null;
    Object.keys(tempLayout).forEach((t) => {
        if (nextItem === null) {
            if (tempLayout[t]["order"] < currentOrder) {
                nextItem = tempLayout[t];
            }
        } else {
            if (
                tempLayout[t]["order"] < currentOrder &&
                nextItem["order"] < tempLayout[t]["order"]
            ) {
                nextItem = tempLayout[t];
            }
        }
    });

    return nextItem;
}

export function getParentForLayoutItem(tempLayout, id) {
    try {
        const match = tempLayout.filter((t) => t["id"] === id);
        let parentId = null;
        if (match.length > 0) {
            parentId = match[0]["parent"];
        }
        return parentId ? getLayoutItemById(tempLayout, parentId) : null;
    } catch (e) {
        console.log("getParentForLayoutItem ", e.message);
    }
}

export function getLayoutItemById(tempLayout, id) {
    try {
        const match = tempLayout
            ? tempLayout.filter((t) => t["id"] === parseInt(id, 10))
            : null;
        return match.length > 0 ? match[0] : null;
    } catch (e) {
        return null;
    }
}

export function addItemToItemLayout(
    tempLayout,
    id,
    itemToAdd,
    hasChildren = false
) {
    // let's get the values required to create the item
    const nextId = getNextHighestId(tempLayout, id);
    // const item = getLayoutItemById(tempLayout, id);
    const nextOrder = getNextHighestOrder(tempLayout, id);

    if (itemToAdd) {
        const newItem = LayoutModel(itemToAdd, tempLayout);

        // generate the new Item here...
        newItem["id"] = nextId;
        newItem["order"] = nextOrder["highest"];
        newItem["hasChildren"] = hasChildren === false ? 0 : 1;
        newItem["parent"] = id;
        newItem["scrollable"] = hasChildren === false ? true : false;
        // testing
        newItem["component"] = itemToAdd["component"];

        tempLayout.push(newItem);
    }
    return tempLayout;
}

export function removeItemFromLayout(tempLayout, id) {
    if (tempLayout.length > 1) {
        const indexOfItem = getIndexOfLayoutItem(tempLayout, id);
        const indexOfChildren = getIndexOfLayoutChildrenForItem(tempLayout, id);
        // remove the children...
        indexOfChildren.length > 0 &&
            indexOfChildren.forEach((index) => {
                // const i = tempLayout[index];
                // i['parent'] > 0 && tempLayout.splice(index, 1);
                tempLayout.splice(index, 1);
            });
        // // remove the parent/item
        if (indexOfItem > -1) {
            tempLayout.splice(indexOfItem, 1);
        }
    }
    return tempLayout;
}

export function changeDirectionForLayoutItem(tempLayout, id, currentDirection) {
    const item = getLayoutItemById(tempLayout, id);
    let newLayout = null;
    if (item) {
        const { direction } = item;
        item.direction = direction === "col" ? "row" : "col";
        newLayout = replaceItemInLayout(tempLayout, id, item);
    }
    return newLayout;
}

export function updateLayoutItem(tempLayout, itemData) {
    const item = getLayoutItemById(tempLayout, itemData["id"]);
    const id = itemData["id"];
    let newLayout = null;
    if (item) {
        Object.keys(itemData).forEach((key) => {
            item[key] = itemData[key];
        });
        newLayout = replaceItemInLayout(tempLayout, id, item);
    }
    return newLayout;
}

export function updateParentForItem(tempLayout, id, parentId) {
    const item = getLayoutItemById(tempLayout, id);
    let newLayout = null;
    if (item) {
        item.parent = parentId;
        newLayout = replaceItemInLayout(tempLayout, id, item);
    }
    return newLayout;
}

export function getIndexOfLayoutItem(tempLayout, id) {
    let indexOfItem = -1;
    tempLayout.forEach((t, index) => {
        if (t.id === id) {
            indexOfItem = index;
        }
    });
    return indexOfItem;
}

export function getIndexOfLayoutChildrenForItem(tempLayout, id) {
    let indexOfItem = [];
    tempLayout.forEach((t, index) => {
        if (t.parent === id) {
            indexOfItem.push(index);
        }
    });
    return indexOfItem;
}

export function replaceItemInLayout(tempLayout, id, item) {
    const indexOfItem = getIndexOfLayoutItem(tempLayout, id);
    // console.log("Index of item to replace", indexOfItem);
    if (indexOfItem > -1) {
        tempLayout[indexOfItem] = item;
    }
    // console.log("replace with ", item, tempLayout);
    return tempLayout;
}

/**
 * getNearestParentWorkspace
 * Find the nearest workspace that matches the workspace type
 * that is not a layout workspace....
 *
 * This will tell us which parent "functional" workspace we are inside so we can list
 * the widgets that are available to that space....
 *
 * @param {object} layout the layout of the entire workspace
 * @param {object} item the item we have clicked on in the editor
 * @param {object} itemSelected
 */
export function getNearestParentWorkspace(
    workspaceLayout,
    currentItem,
    parentItem,
    count = 0
) {
    try {
        if (currentItem !== null && parentItem !== null) {
            if ("component" in currentItem) {
                if (currentItem !== null) {
                    // if this item is a workspace and same type as the item selected....
                    if (
                        currentItem["type"] === "workspace" &&
                        currentItem["workspace"] !== "layout"
                    ) {
                        return currentItem;
                    } else {
                        if (
                            currentItem["type"] === "workspace" &&
                            currentItem["workspace"] !== "layout"
                        ) {
                            return currentItem;
                        } else {
                            // if a workspace got past all the checks...
                            if (
                                currentItem["type"] === "workspace" &&
                                currentItem["workspace"] !== "layout"
                            ) {
                                return currentItem;
                            }
                            const parentId = currentItem["parent"];
                            const parentItemFromLayout = getLayoutItemById(
                                workspaceLayout,
                                parentId
                            );

                            count++;

                            return parentItemFromLayout !== null
                                ? getNearestParentWorkspace(
                                      workspaceLayout,
                                      parentItem,
                                      parentItemFromLayout,
                                      count
                                  )
                                : {};
                        }
                    }
                } else {
                    // config was null so move on to the next parent?
                    return {};
                }
            }
        }
        return {};
    } catch (e) {
        console.log("get nearest parent error ", e.message);
        return {};
    }
}

export function getContainerBorderColor(item) {
    let color = "border-gray-900";
    try {
        if (item) {
            // const config = ComponentManager.config(item['component'], item);
            const canHaveChildren = item ? item["canHaveChildren"] : false;
            if (item) {
                if ("styles" in item) {
                    color =
                        "backgroundColor" in item["styles"]
                            ? item["styles"]["borderColor"]
                            : color;
                } else {
                    switch (item["type"]) {
                        case "workspace":
                            if (item["workspace"] === "layout") {
                                color = "border-gray-700 border-dashed";
                            } else {
                                if (canHaveChildren === true) {
                                    color = "border-indigo-800";
                                } else {
                                    color = "border-indigo-900";
                                }
                            }
                            break;
                        case "widget":
                            color = "border-green-800";
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return color;
    } catch (e) {
        console.log(e);
        return color;
    }
}

export function getContainerColor(component) {
    let color = "bg-gray-900";
    try {
        if (
            "styles" in component &&
            Object.keys(component["styles"]).length > 0
        ) {
            color =
                "backgroundColor" in component["styles"]
                    ? component["styles"]["backgroundColor"]
                    : color;
        } else {
            switch (component["type"]) {
                case "workspace":
                    if (component["workspace"] === "layout") {
                        color = "bg-gray-900";
                    } else {
                        if (component["canHaveChildren"] === false) {
                            color = "bg-indigo-800";
                        }
                    }
                    break;
                case "widget":
                    color = "bg-green-800";
                    break;
                default:
                    break;
            }
        }
        return color;
    } catch (e) {
        return color;
    }
}

// function getContainerStyles(component) {
//     let color = 'bg-gray-900';
//     try {
//         if ('styles' in component && Object.keys(component['styles']).length > 0) {
//             color = 'backgroundColor' in component['styles'] ? component['styles']['backgroundColor'] : color;
//         } else {
//             switch(component['type']) {
//                 case 'workspace':
//                     if (component['workspace'] === 'layout') {
//                         color = 'bg-gray-900';
//                     } else {
//                         if (component['canHaveChildren'] === false) {
//                             color = 'bg-indigo-800';
//                         }
//                     }
//                 break;
//                 case 'widget':
//                     color = 'bg-green-800';
//                 break;
//                 default:
//                 break;
//             }
//         }
//         return color;
//     } catch(e) {
//         return color;
//     }
// }

export function getBorderStyle(item) {
    try {
        return WidgetFactory.workspace(item["component"]) === "layout"
            ? "border-dashed"
            : "border-2";
    } catch (e) {
        return "";
    }
}

export function getWidgetsForWorkspace(workspaceItem) {
    try {
        const componentMap = ComponentManager.map();
        console.log("component map ", componentMap);
        const workspaceType = workspaceItem ? workspaceItem["workspace"] : null;
        const canAddChildren = workspaceItem
            ? workspaceItem["canHaveChildren"]
            : true;

        const parentWorkspaceType =
            workspaceItem["parentWorkspaceName"] !== null &&
            workspaceItem["parentWorkspaceName"] !== undefined
                ? workspaceItem["parentWorkspaceName"]
                : "layout";

        if (parentWorkspaceType !== null) {
            const options =
                workspaceType !== null &&
                canAddChildren &&
                Object.keys(componentMap)
                    .sort()
                    .filter((c) => componentMap[c]["type"] === "widget")
                    .filter((c) =>
                        workspaceType !== null
                            ? componentMap[c]["workspace"] ===
                              parentWorkspaceType
                            : true
                    )
                    .map((w) => componentMap[w]);
            // .map((w) => renderMenuItem("widget", w));

            // return <div className="flex flex-col rounded space-y-1">{options}</div>;
            return options;
        } else {
            // return <div className="flex flex-col rounded"></div>;
            return [];
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * getWorkspacesForWorkspace
 * Get the available Layout items (workspaces, containers) that may be added
 * to the workspace/container item passed in
 * @param {object} workspaceItem the layout type item
 * @param {string} searchTerm the optional search term
 * @returns Array an array of available layout objects
 */
export function getWorkspacesForWorkspace(workspaceItem, searchTerm = "") {
    const componentMap = ComponentManager.map();
    const canAddChildren = workspaceItem ? workspaceItem.canHaveChildren : true;

    // We want to make sure the workspaceItem (parent) can have children from the config
    // We also want to limit the workspaces to layout only
    // if the parent workspace is NOT layout, we only allow "layout" components

    const options =
        canAddChildren === true &&
        workspaceItem["parentWorkspaceName"] === "layout"
            ? Object.keys(componentMap)
                  .sort()
                  .filter((i) =>
                      searchTerm !== ""
                          ? i.toLowerCase().includes(searchTerm)
                          : true
                  )
                  .filter(
                      (c) =>
                          componentMap[c]["type"] === "workspace" ||
                          componentMap[c]["workspace"] === "layout"
                  )
                  .map(
                      (w) => componentMap[w] /*renderMenuItem("workspace", w) */
                  )
            : Object.keys(componentMap)
                  .sort()
                  .filter((i) =>
                      searchTerm !== ""
                          ? i.toLowerCase().includes(searchTerm)
                          : true
                  )
                  .filter((c) => componentMap[c]["workspace"] === "layout")
                  .map(
                      (w) => componentMap[w] /*renderMenuItem("workspace", w)*/
                  );

    return options;
    // return <div className="flex flex-col rounded space-y-1">{options}</div>;
}

export function getLayoutItemForWorkspace(item, workspace, parentItem = null) {
    try {
        console.log("layout", item, workspace, parentItem);

        const layoutModel = LayoutModel(
            item,
            workspace["layout"],
            workspace["id"]
        );

        // we have to give the widget an ID
        const nextId = getNextHighestId(workspace["layout"]);
        const nextOrderData = getNextHighestOrder(workspace["layout"]);
        const nextOrder = nextOrderData["highest"];

        layoutModel.id = nextId;
        layoutModel.order = nextOrder;

        parentItem && "id" in parentItem
            ? (layoutModel["parent"] = parentItem["id"])
            : 0;

        layoutModel["parentWorkspace"] = item["parentWorkspace"];
        layoutModel["parentWorkspaceName"] = item["parentWorkspaceName"];
        // layoutModel["parent"] = item["id"];
        // nearest parent workspace (use the original widget/workspace clicked
        // to begin looking...

        // lets add the data to the original workspace...
        const newWorkspace = JSON.parse(JSON.stringify(workspace));
        newWorkspace["layout"] = [layoutModel["parentWorkspace"], layoutModel];

        return { layout: layoutModel, newWorkspace };
    } catch (e) {
        console.log(e);
        return { layout: null, newWorkspace: null };
    }
}

/**
 * Get all of the children for a particular layout item
 * @param {Object} workspace the Workspace Model - use the layout
 * @param {Object} layoutItem the item (LayoutModel) we are checking
 * @returns {Array} the child layout items that are a match
 */
export function getChildrenForLayoutItem(workspace, layoutItem) {
    return workspace.layout.filter(workspaceItem => {
        return layoutItem.id === workspaceItem.parent;
    })
}
/**
 * Determine if the layout item has a workspace by the given workspace name
 * A child is denoted by having a parent id equal to the parent id of the item we 
 * are inputting
 * 
 * if parent === layoutItem.id
 */
export function layoutItemHasWorkspaceAsChild(workspace, layoutItem, workspaceName) {
    return getChildrenForLayoutItem(workspace, layoutItem).filter(workspaceItem => {
        return workspaceItem.workspace === workspaceName && workspaceItem.type === "workspace"
    })
}


/**
 * Add a component as a child of another component
 * @param {LayoutModel} childComponent the child component we want to add to the layout item
 * @param {LayoutModel} layoutItem the LayoutModel item we want to add the child component TO
 * @param {Object} workspace the entire workspace we are performing the layout changes
 * @returns {Object} workspace
 */
export function addChildToLayoutItem(childComponent, layoutItem, workspace) {
    
    const nextId = getNextHighestId(workspace["layout"]);

    // then get the next highest ORDER of the items
    const nextOrderData = getNextHighestOrder(workspace["layout"]);
    const nextOrder = nextOrderData["highest"];
    childComponent['id'] = nextId;
    childComponent["order"] = nextOrder;

    // 1. Add the layoutItem as the parentWorkspace of the childComponent
    childComponent["parentWorkspace"] = layoutItem;
    childComponent["parent"] = layoutItem["id"];

    // 2. Add the element back into the layout
    workspace.layout.push(childComponent);

    return workspace;
}



// export {
//     renderLayout,
//     renderLayoutMenu,
//     renderComponent,
//     getParentForLayoutItem,
//     getNextHighestItemInLayout,
//     getNextLowestItemInLayout,
//     getLayoutItemById,
//     addItemToItemLayout,
//     removeItemFromLayout,
//     changeDirectionForLayoutItem,
//     getNextHighestParentId,
//     getNextHighestId,
//     getNextHighestOrder,
//     updateLayoutItem,
//     updateParentForItem,
//     getContainerBorderColor,
//     getContainerColor,
//     replaceItemInLayout,
//     getNearestParentWorkspace,
//     getBorderStyle,
//     numChildrenForLayout,
//     isMaxOrderForItem,
//     isMinOrderForItem
// }
