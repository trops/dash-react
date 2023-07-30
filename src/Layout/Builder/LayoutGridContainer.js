import React from "react";
import { ButtonIcon, ButtonIcon3, Tag } from "@dash/Common";
import DropComponent from "@dash/Common/Draggable/DropComponent";
import DragComponent from "@dash/Common/Draggable/DragComponent";
import { WidgetFactory } from "@dash/Widget";
import { LayoutContainer } from "@dash/Layout";
import { LayoutQuickAddMenu } from "@dash/Layout";
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
import { getLayoutItemForWorkspace } from "../../Utils";

export const LayoutGridContainer = ({
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
    onOpenConfig,
    onOpenEvents,
    width,
    direction,
    height = "h-full",
    onDropItem,
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
                className={`flex flex-row px-2 p-2 space-x-1 text-sm font-bold ${getContainerColor(
                    item
                )} text-gray-300 w-full justify-between items-center`}
            >
                <span className="">{`${item["component"]}`}</span>
                <div id="quick-add-menu" className="flex flex-row">
                    <LayoutQuickAddMenu
                        className={`text-gray-200 ${getContainerColor(item)}`}
                        item={item}
                        onClickItem={(i) => handleQuickAdd(i, item)}
                    />
                </div>
            </div>
        ) : (
            <div
                className={`flex flex-row px-2 space-x-1 text-xs ${getContainerColor(
                    item
                )} text-gray-300 font-medium w-full justify-end`}
            >
                <div
                    id="quick-add-menu"
                    className="flex flex-row justify-end py-1 px-1"
                >
                    <LayoutQuickAddMenu
                        className={`text-gray-200 ${getContainerColor(item)}`}
                        item={item}
                        onClickItem={(i) => handleQuickAdd(i, item)}
                    />
                </div>
            </div>
        );
    }

    function renderEditFooter() {
        const config = ComponentManager.config(item["component"], item);
        const canHaveChildren = config ? config["canHaveChildren"] : false;
        const numChildren = numChildrenForLayout(item, workspace["layout"]);

        // determine the parent layout direction...
        const parentLayout = getLayoutItemById(
            workspace["layout"],
            item["parent"]
        );
        const parentDirection = parentLayout
            ? parentLayout["direction"]
            : item["parentWorkspace"]["direction"];

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
        if (
            item["type"] === "workspace" &&
            item["component"] !== "Container" &&
            item["component"] !== "LayoutContainer"
        ) {
            return ["layout", item["parentWorkspaceName"]];
        }
        if (
            item["component"] === "Container" ||
            item["component"] === "LayoutContainer"
        ) {
            return getAllWorkspaceNames();
        }
        return ["layout", item["parentWorkspaceName"]];
    }

    function dragType(item) {
        if (
            item["type"] === "workspace" &&
            item["component"] !== "Container" &&
            item["component"] !== "LayoutContainer"
        ) {
            return item["parentWorkspaceName"];
        }
        if (
            item["component"] === "Container" ||
            item["component"] === "LayoutContainer"
        ) {
            return "layout";
        }
        return item["parentWorkspaceName"];
    }

    return preview === false ? (
        <DropComponent
            item={item}
            id={id}
            type={dropType(item)}
            onDropItem={handleDropItem}
            width={width}
        >
            <DragComponent
                id={id}
                type={dragType(item)}
                onDropItem={handleDropItem}
                width={"w-full"}
            >
                <LayoutContainer
                    id={`grid-container-parent-${id}`}
                    direction={"col"}
                    width={"w-full"}
                    height={"h-fit"}
                    scrollable={false}
                    className={`rounded overflow-x-hidden ${
                        preview === false && "border-2 rounded"
                    } ${preview === false && getContainerBorderColor(item)} ${
                        preview === false && getBorderStyle()
                    } min-h-24`}
                    space={preview}
                >
                    {preview === false && renderEditHeader()}
                    <LayoutContainer
                        id={`grid-container-${id}`}
                        direction={direction}
                        scrollable={scrollable}
                        width={"w-full"}
                        height={`${height} min-h-24`}
                        space={preview}
                        grow={grow}
                        className={`${preview === false && "p-3"} ${
                            direction === "col" ? "space-y-2" : "space-x-2"
                        }`}
                    >
                        {children !== null && children}
                    </LayoutContainer>
                    {preview === false && renderEditFooter()}
                </LayoutContainer>
            </DragComponent>
        </DropComponent>
    ) : (
        renderComponentContainer(children)
    );
};
