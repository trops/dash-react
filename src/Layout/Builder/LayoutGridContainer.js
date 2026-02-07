import React, { memo } from "react";
import { ButtonIcon, ButtonIcon3, Tag } from "@dash/Common";
import DropComponent from "@dash/Common/Draggable/DropComponent";
import DragComponent from "@dash/Common/Draggable/DragComponent";
import { WidgetFactory } from "@dash/Widget";
import { LayoutContainer } from "@dash/Layout";
import { LayoutQuickAddMenu } from "@dash/Layout";
import { GridItemLayoutContainer } from "./GridItem/GridItemLayoutContainer";
import { GridItemWorkspaceContainer } from "./GridItem/GridItemWorkspaceContainer";
import { GridItemWidgetContainer } from "./GridItem/GridItemWidgetContainer";

import {
    getContainerBorderColor,
    getContainerColor,
    getLayoutItemById,
    isMaxOrderForItem,
    isMinOrderForItem,
    numChildrenForLayout,
    renderComponent,
} from "@dash/Utils";
import { ComponentManager } from "@dash";
import {
    getLayoutItemForWorkspace,
    getRandomInt,
    isContainer,
    isWorkspace,
} from "../../Utils";

import { LayoutItemEditHeader } from "./Menu/LayoutItemEditHeader";
import { DashboardModel } from "@dash/Models";


// uuid={uuid}
// id={id}
// item={childLayout}
// parent={parent}
// onChangeDirection={onChangeDirection}
// onChangeOrder={onChangeOrder}
// onClickRemove={onClickRemove}
// isContainer={true}
// direction={direction}
// scrollable={scrollable}
// onClickAdd={onClickAdd}
// onClickQuickAdd={onClickQuickAdd}
// order={order}
// preview={previewMode}
// editMode={editMode}
// onOpenConfig={onOpenConfig}
// onOpenEvents={onOpenEvents}
// onDropItem={onDropItem}
// onDragItem={onDragItem}
// width={width}
// isDraggable={isDraggable}
// workspace={workspace}
// height={height}
// space={space}
// grow={grow}

export const LayoutGridContainer = memo(({
    item,
    workspace,
    preview = false,
    id,
    parent,
    scrollable,
    space,
    grow,
    order,
    children = null,
    onClickAdd,
    onClickQuickAdd,
    onClickRemove,
    onChangeDirection,
    onChangeOrder,
    onClickExpand,
    onClickShrink,
    onOpenConfig,
    onOpenEvents,
    width,
    height = "h-full",
    direction,
    onDropItem,
    onDragItem,
    editMode,
    uuid,
    layout,
    component,
    isDraggable
}) => {
    function handleClickAdd() {
        onClickAdd(item);
    }

    function handleClickRemove(item) {
        onClickRemove(id);
    }

    function handleChangeDirection(item) {
        onChangeDirection(id, direction);
    }

    function handleOpenConfig() {
        onOpenConfig(item);
    }

    function handleDropItem(item) {
        if (onDropItem) {
            onDropItem(item);
        }
    }

    function handleDragItem(item) {
        console.log("dragging item ", item);
        // if (onDragItem) {
        //     onDragItem(item);
        // }
    }

    function handleChangeOrder(direction) {
        onChangeOrder(item, direction);
    }

    function handleQuickAdd(item, toItem) {
        try {
            console.log(item, toItem, workspace);
            // set the component
            item.component = item["name"];
            const layoutItem = getLayoutItemForWorkspace(
                item,
                workspace,
                toItem
            );

            console.log("layout item ", layoutItem);
            onClickQuickAdd(layoutItem.layout, toItem);
        } catch (e) {
            console.log(e);
        }
    }

    function renderEditHeader() {
        return item["workspace"] !== "layout" ? (
            <div
                id={`${item["component"]}-heading-${getRandomInt(10000)}`}
                className={`flex flex-row px-2 py-1 space-x-1 text-xs font-bold ${getContainerColor(
                    item
                )} text-gray-300 w-full justify-between items-center`}
            >
                <span className="text-xs">{`${item["component"]}`} - workspace</span>
                <div id="quick-add-menu" className="flex flex-row">
                    {/* <LayoutQuickAddMenu
                        className={`text-gray-200 ${getContainerColor(item)}`}
                        item={item}
                        onClickItem={(i) => handleQuickAdd(i, item)}
                    /> */}
                </div>
            </div>
        ) : (
            <div
                className={`flex flex-row px-2 py-1 space-x-1 mt-1 ml-1 mr-1 rounded text-xs text-gray-300 font-medium w-full justify-between items-center bg-gray-800`}
            >
                <span className="text-xs font-medium text-gray-500">{`${item["component"]}`}</span>
                <div
                    id="quick-add-menu"
                    className="flex flex-row justify-end py-1 px-1"
                >
                    {/* <LayoutQuickAddMenu
                        className={`text-gray-200 ${getContainerColor(item)}`}
                        item={item}
                        onClickItem={(i) => handleQuickAdd(i, item)}
                    /> */}
                </div>
            </div>
        );
    }

    function renderEditFooter() {
        const config = ComponentManager.config(item["component"], item);
        const canHaveChildren = config ? config["canHaveChildren"] : false;
        const numChildren = numChildrenForLayout(item, workspace["layout"]);

        // get the parent workspace
        const dashboard = new DashboardModel(workspace);
        const parentWorkspace = dashboard.getComponentById(item["parent"]);

        // determine the parent layout direction...
        const parentLayout = getLayoutItemById(
            workspace["layout"],
            item["parent"]
        );
        const parentDirection = parentLayout
            ? parentLayout["direction"]
            : parentWorkspace["direction"];

        // determine if the item is at the "start/end" of the col/row
        const isMaxOrder = isMaxOrderForItem(
            workspace["layout"],
            item,
            item["parent"]
        );
        const isMinOrder = isMinOrderForItem(
            workspace["layout"],
            item,
            item["parent"]
        );

        return (
            <div
                className={`flex flex-row space-x-1 justify-between w-full px-2 pb-1`}
            >
                {/* {item && "workspace" in item && (
                    <div className="flex flex-row space-x-1">
                        <Tag
                            text={dragType(item)}
                            textSize={"text-xs"}
                            backgroundColor={"bg-transparent"}
                        />
                    </div>
                )} */}
                <div className={`flex flex-row space-x-1 text-indigo-700`}>
                    {canHaveChildren === true && (
                        <ButtonIcon
                            textColor="text-gray-700"
                            hoverTextColor="hover:text-gray-300"
                            icon="plus"
                            onClick={handleClickAdd}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-green-700"
                        />
                    )}
                    <ButtonIcon
                        textColor="text-gray-700"
                        hoverTextColor="hover:text-gray-300"
                        icon={`${
                            direction === "col"
                                ? "arrows-left-right"
                                : "arrows-up-down"
                        }`}
                        onClick={handleChangeDirection}
                        backgroundColor="bg-transparent"
                        hoverBackgroundColor="hover:bg-blue-700"
                    />
                    <ButtonIcon
                        textColor="text-gray-700"
                        hoverTextColor="hover:text-gray-300"
                        icon={"cog"}
                        onClick={handleOpenConfig}
                        backgroundColor="bg-transparent"
                        hoverBackgroundColor="hover:bg-blue-700"
                    />
                    {order > 1 && numChildren > 1 && isMinOrder === false && (
                        <ButtonIcon
                            icon={`${
                                parentDirection === "col"
                                    ? "arrow-up"
                                    : "arrow-left"
                            }`}
                            onClick={() => handleChangeOrder("down")}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-blue-700"
                        />
                    )}
                    {order > 1 && numChildren > 1 && isMaxOrder === false && (
                        <ButtonIcon
                            icon={`${
                                parentDirection === "col"
                                    ? "arrow-down"
                                    : "arrow-right"
                            }`}
                            onClick={() => handleChangeOrder("up")}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-blue-700"
                        />
                    )}
                    {parent > 0 && (
                        <ButtonIcon
                            textColor="text-gray-700"
                            hoverTextColor="hover:text-gray-300"
                            icon="trash"
                            onClick={handleClickRemove}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-red-900"
                        />
                    )}
                </div>
            </div>
        );
    }

    function getBorderStyle() {
        try {
            return WidgetFactory.workspace(item["component"]) === "layout"
                ? "border-dashed"
                : "border-4";
        } catch (e) {
            return "";
        }
    }

    function renderComponentContainer(children) {
        return item
            ? renderComponent(item["component"], id, item, children)
            : null;
    }

    function getAllWorkspaceNames() {
        if (workspace !== null) {
            const names = workspace.layout.map((layout) => {
                return "workspace" in layout ? layout.workspace : null;
            });
            return names
                .filter((value, index, array) => array.indexOf(value) === index)
                .filter((i) => i !== null);
        }
        return null;
    }

    function dropType(item) {
        // if item is a Workspace, and NOT a container, can only drop into a Container (layout)
        if (isWorkspace(item) === true) {
            return ["layout", item["parentWorkspaceName"]];
        }
        // if a container, we can place this into ANY other container or workspace
        if (isContainer(item) === true) {
            return getAllWorkspaceNames();
        }
        return ["layout", item["parentWorkspaceName"]];
    }

    function dragType(item) {
        if (isWorkspace(item) === true) {
            return item["parentWorkspaceName"];
        }
        if (isContainer(item)) {
            return "layout";
        }
        return item["parentWorkspaceName"];
    }

    // function renderEditModeView() {
    //     if (editMode === "layout") return renderLayoutGridItem();
    //     if (editMode === "workspace") return renderWorkspaceGridItem();
    //     if (editMode === "widget") return renderWidgetGridItem();
    //     if (editMode === "all") return renderEditItem();
    // }

    // function renderLayoutGridItem() {
    //     return (
    //         <GridItemLayoutContainer 
    //             key={`container-grid-item-${uuid}-${
    //                 preview === true ? "view" : "edit"
    //             }`}
    //             uuid={uuid}
    //             item={item}
    //             layout={layout}
    //             id={id}
    //             parent={parent}
    //             row={order}
    //             col={order}
    //             order={order}
    //             onClickAdd={onClickAdd}
    //             onClickQuickAdd={onClickQuickAdd}
    //             onClickRemove={onClickRemove}
    //             onClickExpand={onClickExpand}
    //             onClickShrink={onClickShrink}
    //             onChangeDirection={onChangeDirection}
    //             onChangeOrder={onChangeOrder}
    //             onDropItem={onDropItem}
    //             onDragItem={onDragItem}
    //             name={id}
    //             width={width}
    //             height={height}
    //             direction={direction}
    //             scrollable={scrollable}
    //             space={space}
    //             grow={grow}
    //             preview={preview}
    //             editMode={editMode}
    //             component={component}
    //             onOpenConfig={onOpenConfig}
    //             onOpenEvents={onOpenEvents}
    //             isDraggable={isDraggable}
    //             workspace={workspace}
    //         >
    //             {children}
    //         </GridItemLayoutContainer>
    //     );
    // }

    // function renderWorkspaceGridItem() {
    //     return (
    //         <GridItemWorkspaceContainer 
    //             key={`container-grid-item-${uuid}-${
    //                 preview === true ? "view" : "edit"
    //             }`}
    //             uuid={uuid}
    //             item={item}
    //             layout={layout}
    //             id={id}
    //             parent={parent}
    //             row={order}
    //             col={order}
    //             order={order}
    //             onClickAdd={onClickAdd}
    //             onClickQuickAdd={onClickQuickAdd}
    //             onClickRemove={onClickRemove}
    //             onClickExpand={onClickExpand}
    //             onClickShrink={onClickShrink}
    //             onChangeDirection={onChangeDirection}
    //             onChangeOrder={onChangeOrder}
    //             onDropItem={onDropItem}
    //             onDragItem={onDragItem}
    //             name={id}
    //             width={width}
    //             height={height}
    //             direction={direction}
    //             scrollable={scrollable}
    //             space={space}
    //             grow={grow}
    //             preview={preview}
    //             editMode={editMode}
    //             component={component}
    //             onOpenConfig={onOpenConfig}
    //             onOpenEvents={onOpenEvents}
    //             isDraggable={isDraggable}
    //             workspace={workspace}
    //         >
    //             {children}
    //         </GridItemWorkspaceContainer>
    //     )
    // }

    // function renderWidgetGridItem() {
    //     return (
    //         <GridItemWidgetContainer 
    //             key={`container-grid-item-${uuid}-${
    //                 preview === true ? "view" : "edit"
    //             }`}
    //             uuid={uuid}
    //             item={item}
    //             layout={layout}
    //             id={id}
    //             parent={parent}
    //             row={order}
    //             col={order}
    //             order={order}
    //             onClickAdd={onClickAdd}
    //             onClickQuickAdd={onClickQuickAdd}
    //             onClickRemove={onClickRemove}
    //             onClickExpand={onClickExpand}
    //             onClickShrink={onClickShrink}
    //             onChangeDirection={onChangeDirection}
    //             onChangeOrder={onChangeOrder}
    //             onDropItem={onDropItem}
    //             onDragItem={onDragItem}
    //             name={id}
    //             width={width}
    //             height={height}
    //             direction={direction}
    //             scrollable={scrollable}
    //             space={space}
    //             grow={grow}
    //             preview={preview}
    //             editMode={editMode}
    //             component={component}
    //             onOpenConfig={onOpenConfig}
    //             onOpenEvents={onOpenEvents}
    //             isDraggable={isDraggable}
    //             workspace={workspace}
    //         >
    //             {children}
    //         </GridItemWidgetContainer>
    //     )
    // }
    


    // function renderEditItem() {
    //     return (
    //         <DropComponent
    //             item={item}
    //             id={id}
    //             type={dropType(item)}
    //             onDropItem={handleDropItem}
    //             width={item.width}
    //             height={item.height}
    //         >
    //         <DragComponent
    //             id={id}
    //             type={dragType(item)}
    //             onDropItem={handleDropItem}
    //             onDragItem={handleDragItem}
    //             width={"w-full"}
    //             height={"h-full"}
    //         >
    //             <LayoutContainer
    //                 id={`grid-container-parent-${id}`}
    //                 direction={"col"}
    //                 width={"w-full"}
    //                 height={"h-full"}
    //                 scrollable={false}
    //                 className={`rounded overflow-x-clip ${
    //                     preview === false && "border-2 rounded"
    //                 } ${preview === false && getContainerBorderColor(item)} ${
    //                     preview === false && getBorderStyle()
    //                 } min-h-24 ${item["component"] === "Container" && ""} z-10`}
    //                 space={preview}
    //             >
    //                 {/* {preview === false && renderEditFooter()} */}
    //                 {/* {preview === false && renderEditHeader()} */}
    //                 {preview === false && (
    //                     <LayoutItemEditHeader
    //                         layoutItem={item}
    //                         workspace={workspace}
    //                         direction={direction}
    //                         order={order}
    //                         parent={parent}
    //                         onChangeOrder={handleChangeOrder}
    //                         onChangeDirection={handleChangeDirection}
    //                         onRemove={handleClickRemove}
    //                         onClickAdd={handleClickAdd}
    //                         onOpenConfig={handleOpenConfig}
    //                     />
    //                 )}
    //                 <LayoutContainer
    //                     id={`grid-container-${id}`}
    //                     direction={direction}
    //                     scrollable={scrollable}
    //                     width={"w-full"}
    //                     height={`${height} min-h-24`}
    //                     space={preview}
    //                     grow={grow}
    //                     className={`${
    //                         preview === false &&
    //                         item["component"] !== "Container"
    //                             ? "p-3"
    //                             : "p-3"
    //                     } ${direction === "row" ? "my-4 space-x-4" : "space-y-4"} ${item.hasChildren === true ? "justify-between" : ""}`}
    //                 >
    //                     {children !== null && children}
    //                 </LayoutContainer>
    //                 {/* {preview === false && renderEditFooter()} */}
    //             </LayoutContainer>
    //         </DragComponent>
    //     </DropComponent>
    //     )
    // }


    return preview === false ? (
         <DropComponent
                item={item}
                id={id}
                type={dropType(item)}
                onDropItem={handleDropItem}
                width={item.width}
                height={item.height}
            >
            <DragComponent
                id={id}
                type={dragType(item)}
                onDropItem={handleDropItem}
                onDragItem={handleDragItem}
                width={"w-full"}
                height={"h-full"}
            >
                <LayoutContainer
                    id={`grid-container-parent-${id}`}
                    direction={"col"}
                    width={"w-full"}
                    height={"h-full"}
                    scrollable={false}
                    className={`rounded overflow-x-clip ${
                        preview === false && "border-2 rounded"
                    } ${preview === false && getContainerBorderColor(item)} ${
                        preview === false && getBorderStyle()
                    } min-h-24 ${item["component"] === "Container" && ""} z-10`}
                    space={preview}
                >
                    {/* {preview === false && renderEditFooter()} */}
                    {/* {preview === false && renderEditHeader()} */}
                    
                    {preview === false && (
                        <LayoutItemEditHeader
                            layoutItem={item}
                            workspace={workspace}
                            direction={direction}
                            order={order}
                            parent={parent}
                            onChangeOrder={handleChangeOrder}
                            onChangeDirection={handleChangeDirection}
                            onRemove={handleClickRemove}
                            onClickAdd={handleClickAdd}
                            onOpenConfig={handleOpenConfig}
                        />
                    )}
                    <LayoutContainer
                        id={`grid-container-${id}`}
                        direction={direction}
                        scrollable={scrollable}
                        width={"w-full"}
                        height={`${height} min-h-24`}
                        space={preview}
                        grow={grow}
                        className={`${
                            preview === false &&
                            item["component"] !== "Container"
                                ? "p-3"
                                : "p-3"
                        } ${direction === "row" ? "my-4 space-x-4" : "space-y-4"} ${item.hasChildren === true ? "justify-between" : ""}`}
                    >
                        {children !== null && children}
                    </LayoutContainer>
                    {/* {preview === false && renderEditFooter()} */}
                </LayoutContainer>
            </DragComponent>
        </DropComponent>
    ) : (
        renderComponentContainer(children)
    );
});
