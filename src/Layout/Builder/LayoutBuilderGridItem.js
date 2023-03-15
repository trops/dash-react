import React from "react";
import { ButtonIcon, Tag } from "@dash/Common";
import DragComponent from "@dash/Common/Draggable/DragComponent";
import {
    renderComponent,
    getContainerColor,
    getContainerBorderColor,
    numChildrenForLayout,
    getLayoutItemById,
    isMaxOrderForItem,
    isMinOrderForItem,
} from "@dash/Utils";

export const LayoutBuilderGridItem = ({
    item,
    workspace,
    id,
    parent,
    order,
    scrollable,
    component = null,
    preview,
    children,
    onClickRemove,
    onChangeDirection,
    onChangeOrder,
    onOpenConfig,
    onOpenEvents,
    onDropItem,
    width,
    direction,
    isDraggable,
}) => {
    function handleClickRemove(e) {
        console.log("clicked remove ", e);
        onClickRemove(id);
    }

    function handleChangeDirection() {
        onChangeDirection(id, direction);
    }

    function handleChangeOrder(direction) {
        console.log("changing order ", order);
        onChangeOrder(item, direction);
    }

    function handleOpenConfig() {
        onOpenConfig(item);
    }

    function renderArrows() {
        return (
            preview === false && (
                <div className={`flex ${direction}`}>
                    <div
                        className={`flex ${direction} w-full h-fit min-h-full text-base lg:text-lg cursor-pointer text-gray-200 pb-2`}
                        onClick={handleOpenConfig}
                    >
                        {component}
                    </div>
                </div>
            )
        );
    }

    function renderUserPreferences() {
        try {
            return (
                preview === false && (
                    <div className={`flex flex-col h-24`}>
                        <div
                            className={`flex flex-col w-full text-xs text-gray-200 justify-start`}
                            onClick={handleOpenConfig}
                        >
                            {Object.keys(item["userPrefs"]).map((userPref) => {
                                return (
                                    <span
                                        key={`user-pref-${userPref}`}
                                        className="font-normal"
                                    >{`${userPref}:${item["userPrefs"][userPref]}`}</span>
                                );
                            })}
                        </div>
                    </div>
                )
            );
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function renderComponentData() {
        return component ? renderComponent(component, id, item, null) : null;
    }

    function handleDropItem(item) {
        // we have to shuffle the parent of the source item to the drop item
        if (onDropItem) {
            onDropItem(item);
        }
    }

    function handleClickEvents() {
        onOpenEvents(item);
    }

    /**
     * renderEvents
     * If the component will emit events, we can display those events
     * in the component view
     */
    function renderEvents() {}

    function dragType(item) {
        if (item["type"] === "workspace" && item["component"] !== "Container") {
            return item["parentWorkspaceName"];
        }
        if (item["component"] === "Container") {
            return "layout";
        }
        return item["parentWorkspaceName"];
    }

    // function numChildrenForLayout() {
    //     let num = 0;
    //     if ('parentWorkspace' in item) {
    //         if ('layout' in item['parentWorkspace']) {
    //             num = Object.keys(item['parentWorkspace']['layout']).length;
    //         }
    //     }
    //     return num;
    // }

    function renderEditView() {
        const drag = dragType(item);
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

        console.log("children ", numChildren);
        return isDraggable === true ? (
            <DragComponent
                obj={item}
                id={id}
                type={drag}
                parent={parent}
                onDropItem={handleDropItem}
                width={width}
            >
                <div
                    className={`flex flex-col border-4 ${getContainerBorderColor(
                        item["parentWorkspace"]
                    )} rounded text-xs font-bold text-gray-200 z-0 min-h-64 p-2 overflow-hidden ${getContainerColor(
                        item["parentWorkspace"]
                    )}`}
                >
                    <div
                        className={`flex flex-col ${scrollable} ${
                            preview === false && "text-blue-900 rounded m-2"
                        } `}
                        onClick={handleOpenConfig}
                    >
                        {preview === false && renderArrows()}
                        {preview === false && renderUserPreferences()}
                    </div>
                    <div className="flex flex-row space-x-1 justify-between text-xs w-full">
                        {item && "workspace" in item && (
                            <Tag
                                text={`${drag}`}
                                textSize={"text-xs"}
                                backgroundColor={"bg-transparent"}
                            />
                        )}
                        <div className="flex flex-row space-x-1">
                            {item.eventHandlers.length > 0 && (
                                <ButtonIcon
                                    icon="phone"
                                    onClick={handleClickEvents}
                                    backgroundColor={getContainerColor(
                                        item["parentWorkspace"]
                                    )}
                                    hoverBackgroundColor=""
                                    text={
                                        item.eventHandlers.length > 0
                                            ? item.eventHandlers.length
                                            : ""
                                    }
                                    textSize={"text-xs"}
                                />
                            )}
                            {order > 1 &&
                                numChildren > 1 &&
                                isMinOrder === false && (
                                    <ButtonIcon
                                        theme={false}
                                        icon={`${
                                            parentDirection === "col"
                                                ? "arrow-left"
                                                : "arrow-up"
                                        }`}
                                        onClick={() =>
                                            handleChangeOrder("down")
                                        }
                                        backgroundColor="bg-transparent"
                                        hoverBackgroundColor="hover:bg-blue-700"
                                    />
                                )}
                            {order > 1 &&
                                numChildren > 1 &&
                                isMaxOrder === false && (
                                    <ButtonIcon
                                        theme={false}
                                        icon={`${
                                            parentDirection === "col"
                                                ? "arrow-right"
                                                : "arrow-down"
                                        }`}
                                        onClick={() => handleChangeOrder("up")}
                                        backgroundColor="bg-transparent"
                                        hoverBackgroundColor="hover:bg-blue-700"
                                    />
                                )}
                            <ButtonIcon
                                theme={false}
                                icon="trash"
                                onClick={handleClickRemove}
                                backgroundColor={getContainerColor(
                                    item["parentWorkspace"]
                                )}
                                hoverBackgroundColor="hover:bg-red-900"
                            />
                        </div>
                    </div>
                </div>
            </DragComponent>
        ) : (
            <div
                className={`flex flex-col border-4 rounded text-xs font-bold text-gray-200 overflow-hidden grow z-0 min-h-64 h-24`}
            >
                <div className="flex flex-row space-x-2 rounded-t justify-between w-full">
                    <div className="hidden xl:flex flex-row space-x-1 w-full justify-end p-2">
                        {numChildren > 1 && (
                            <ButtonIcon
                                icon={`${
                                    parentDirection === "col"
                                        ? "arrows-left-right"
                                        : "arrows-up-down"
                                }`}
                                onClick={handleChangeDirection}
                                backgroundColor="bg-transparent"
                                hoverBackgroundColor="hover:bg-blue-700"
                            />
                        )}
                        <ButtonIcon
                            icon={"cog"}
                            onClick={handleOpenConfig}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-blue-700"
                        />
                        <ButtonIcon
                            icon="trash"
                            onClick={handleClickRemove}
                            backgroundColor="bg-transparent"
                            hoverBackgroundColor="hover:bg-red-900"
                        />
                    </div>
                </div>
                <div
                    className={`flex ${direction} ${scrollable} text-lg ${
                        preview === false && "text-blue-900 rounded m-2"
                    }`}
                >
                    {preview === false && renderUserPreferences()}
                </div>
                <div className="flex flex-row space-x-1 w-full justify-between text-xs">
                    {item && "workspace" in item && (
                        <Tag text={`${dragType(item)}`} textSize={"text-xs"} />
                    )}
                    <div className="flex flex-row space-x-1">
                        {item.eventHandlers.length > 0 && (
                            <ButtonIcon
                                icon="phone"
                                onClick={handleClickEvents}
                                bgColor={getContainerColor(
                                    item["parentWorkspace"]
                                )}
                                hoverBackgroundColor="hover:bg-gray-900"
                                text={
                                    item.eventHandlers.length > 0
                                        ? item.eventHandlers.length
                                        : ""
                                }
                                textSize={"text-xs"}
                            />
                        )}
                        <ButtonIcon
                            icon="trash"
                            onClick={handleClickRemove}
                            backgroundColor={getContainerColor(
                                item["parentWorkspace"]
                            )}
                            hoverBackgroundColor="hover:bg-red-900"
                        />
                        {order > 1 &&
                            numChildren > 1 &&
                            isMinOrder === false && (
                                <ButtonIcon
                                    icon={`${
                                        parentDirection === "col"
                                            ? "arrow-left"
                                            : "arrow-up"
                                    }`}
                                    onClick={() => handleChangeOrder("down")}
                                    backgroundColor="bg-transparent"
                                    hoverBackgroundColor="hover:bg-blue-700"
                                />
                            )}
                        {order > 1 &&
                            numChildren > 1 &&
                            isMaxOrder === false && (
                                <ButtonIcon
                                    icon={`${
                                        parentDirection === "col"
                                            ? "arrow-right"
                                            : "arrow-down"
                                    }`}
                                    onClick={() => handleChangeOrder("up")}
                                    backgroundColor="bg-transparent"
                                    hoverBackgroundColor="hover:bg-blue-700"
                                />
                            )}
                    </div>
                </div>
            </div>
        );
    }

    return children
        ? children
        : preview === false
        ? renderEditView()
        : renderComponentData();
};
