import {
    LayoutBuilderGridItem,
    LayoutGridContainer,
    LayoutBuilderConfigMenuItem,
    LayoutBuilderConfigContainerMenuItem,
} from "@dash/Layout";
// import LayoutGridContainer from "@dash/LayoutLayoutGridContainer";// ../Layout/Builder/LayoutGridContainer";
// import LayoutBuilderConfigMenuItem from "../Layout/Builder/Menu/LayoutBuilderConfigMenuItem";
import { WidgetFactory } from "@dash/Widget";
// import LayoutBuilderConfigContainerMenuItem from "../Layout/Builder/Menu/LayoutBuilderConfigContainerMenuItem";
import { LayoutModel } from "@dash/Models";
import { deepCopy } from "@dash/Utils";

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
 * renderLayout
 * @param {*} tempLayout
 * @param {*} parentKey
 * @param {*} debugMode
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
    onClickAdd = null,
    onClickRemove = null,
    onClickShrink = null,
    onClickExpand = null,
    onChangeDirection = null,
    onChangeOrder = null,
    onOpenConfig = null,
    onOpenEvents = null,
    onDropItem = null,
    dashboardId,
}) => {
    try {
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
                    const childLayout = child; //LayoutModel(child, layout, dashboardId);

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
                    } = childLayout;

                    return hasChildren === 1 && canHaveChildren === true ? (
                        <LayoutGridContainer
                            key={id}
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
                            order={order}
                            preview={previewMode}
                            onOpenConfig={onOpenConfig}
                            onOpenEvents={onOpenEvents}
                            onDropItem={onDropItem}
                            width={width}
                            isDraggable={isDraggable}
                            workspace={workspace}
                            height={height}
                        >
                            {id > 0 &&
                                renderLayout({
                                    dashboardId,
                                    item: childLayout,
                                    layout,
                                    parentKey: id,
                                    debugMode,
                                    previewMode,
                                    onClickAdd,
                                    onClickRemove,
                                    onClickShrink,
                                    onClickExpand,
                                    onChangeDirection,
                                    onChangeOrder,
                                    order,
                                    onOpenConfig,
                                    onOpenEvents,
                                    onDropItem,
                                    workspace,
                                    isDraggable,
                                })}
                        </LayoutGridContainer>
                    ) : (
                        <LayoutBuilderGridItem
                            key={id}
                            item={childLayout}
                            layout={layout}
                            id={id}
                            parent={parent}
                            row={order}
                            col={order}
                            order={order}
                            onClickAdd={onClickAdd}
                            onClickRemove={onClickRemove}
                            onClickExpand={onClickExpand}
                            onClickShrink={onClickShrink}
                            onChangeDirection={onChangeDirection}
                            onChangeOrder={onChangeOrder}
                            onDropItem={onDropItem}
                            name={id}
                            width={width}
                            height={height}
                            direction={direction}
                            scrollable={scrollable}
                            preview={previewMode}
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
            console.log("RENDER COMPONENT", params);
            // tack on the id
            // params['id'] = id;
            // params['component'] = 'component' in params ? params['component'] : component;

            const WidgetToRender = WidgetFactory.render(
                component,
                `widget-${id}`,
                params,
                children
            );
            return WidgetToRender ? (
                WidgetToRender
            ) : (
                <div className={`flex flex-col h-full`}>No</div>
            );
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

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
    const match = tempLayout.filter((t) => t["id"] === id);
    let parentId = null;
    if (match.length > 0) {
        parentId = match[0]["parent"];
    }
    return parentId ? getLayoutItemById(tempLayout, parentId) : null;
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
    console.log("Index of item to replace", indexOfItem);
    if (indexOfItem > -1) {
        tempLayout[indexOfItem] = item;
    }
    console.log("replace with ", item, tempLayout);
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
    let color = "border-gray-800";
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
