import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@dash/Context";
import {
    addItemToItemLayout,
    changeDirectionForLayoutItem,
    getNextHighestItemInLayout,
    getNextLowestItemInLayout,
    removeItemFromLayout,
    updateLayoutItem,
    updateParentForItem,
} from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";
import { LayoutDragBuilder } from "@dash/Layout/Builder";
import {
    LayoutBuilderEventModal,
    LayoutBuilderAddItemModal,
    LayoutBuilderConfigModal,
    LayoutBuilderEditItemModal,
} from "@dash/Layout/Builder/Modal";

// import LayoutBuilderEditItemModal from "./Modal/LayoutBuilderEditItemModal";
// import LayoutBuilderEventModal from "./Modal/LayoutBuilderEventModal";
// import LayoutBuilderConfigModal from "./Modal/LayoutBuilderConfigModal";
// import LayoutBuilderAddItemModal from "./Modal/LayoutBuilderAddItemModal";

/**
 * sampleLayout
 * A test to see if this will be more condusive to iterating over a layout configuration
 */

const sampleLayout = [
    {
        id: 1,
        order: 1,
        direction: "row",
        width: "w-full",
        component: "Container",
        hasChildren: 1,
        scrollable: true,
        parent: 0,
    },
];

export const LayoutBuilder = ({
    workspace,
    preview = false,
    onTogglePreview,
    onWorkspaceChange = null,
    dashboardId,
}) => {
    const { debugMode } = useContext(AppContext);

    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
    const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [currentWorkspace, setCurrentWorkspace] = useState(workspace);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // IMPORTANT DO NOT REMOVE!!!!
        // We have to check the diff in the layout and set
        // We also have to "reset" the layout upon a new layout...

        if (
            currentWorkspace["layout"] !== workspace["layout"] &&
            workspace !== null &&
            currentWorkspace["layout"] !== sampleLayout
        ) {
            setCurrentWorkspace(workspace);
        }

        if (currentWorkspace["layout"] === null) {
            setCurrentWorkspace({
                name: "Workspace " + Date.now(),
                layout: sampleLayout,
            });
        }
    }, [workspace]);

    /**
     * onClickAdd
     * From the Widget or Container, clicked plus button to add a widget
     */
    function onClickAdd(item) {
        setItemSelected(item);
        setIsAddWidgetModalOpen(true);
        forceUpdate();
    }

    function handleClickConfirmAdd(itemChosen, toItem) {
        const layout = currentWorkspace["layout"];
        const hasChildren = itemChosen["type"] === "workspace";
        const newLayout = addItemToItemLayout(
            layout,
            toItem["id"],
            itemChosen,
            hasChildren
        );
        const newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
        newWorkspace["layout"] = newLayout;

        setCurrentWorkspace(newWorkspace);
        setIsAddWidgetModalOpen(false);
        forceUpdate();
    }

    function handleSaveNewWorkspace(newWorkspace) {
        console.log(" new workspace ", newWorkspace);
        setCurrentWorkspace(() => newWorkspace);
        setIsConfigModalOpen(false);
        onWorkspaceChange(newWorkspace);
        forceUpdate();
    }

    function onClickRemove(id) {
        const layout = currentWorkspace["layout"];
        const newLayout = removeItemFromLayout(layout, id);
        const newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
        newWorkspace["layout"] = newLayout;
        setCurrentWorkspace(newWorkspace);
        forceUpdate();
    }

    function onDropItem(item) {
        try {
            const { sourceIndex, dropIndex } = item;
            // we have to find the item
            // then we have to set the parent id to a different id
            const layout = currentWorkspace["layout"];
            const newLayout = updateParentForItem(
                layout,
                sourceIndex,
                dropIndex
            );
            const newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
            newWorkspace["layout"] = newLayout;
            setCurrentWorkspace(() => newWorkspace);
            forceUpdate();
        } catch (e) {
            console.log(e);
        }
    }

    function onClickShrink(id, currentWidth) {
        console.log("shrink ", id, currentWidth);
    }

    function onClickExpand(id, currentWidth) {
        console.log("expand ", id, currentWidth);
    }

    function onChangeDirection(id, currentDirection) {
        const layout = currentWorkspace["layout"];
        const newLayout = changeDirectionForLayoutItem(
            layout,
            id,
            currentDirection
        );
        const newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
        newWorkspace["layout"] = newLayout;
        setCurrentWorkspace(newWorkspace);
        forceUpdate();
    }

    function onChangeOrder(item, direction) {
        console.log("changing order ", item["order"], direction);

        const currentOrder = parseInt(item["order"], 10);
        const layout = currentWorkspace["layout"];
        let nextItem = null;
        let layoutFiltered = {};
        Object.keys(layout)
            .filter((li) => layout[li]["parent"] === item["parent"])
            .forEach((fli) => {
                layoutFiltered[fli] = layout[fli];
            });

        // Add 1 to the selected item's order, and then loop and find the new order value item and increase
        if (direction === "up") {
            // increase current item by 1 (1,2 3 ...2 moves "down" to 1 and 1 to 2)
            // increase the existing item with this new order (check) by 1
            nextItem = getNextHighestItemInLayout(layoutFiltered, currentOrder);
            console.log("next highest item ", nextItem);
            // item['order'] = nextItem['order'];
            // nextItem['order'] = currentOrder;
        }

        if (direction === "down") {
            // decrease current item by 1 (1,2 3 ...2 moves "down" to 1 and 1 to 2)
            // decrease the existing item with this new order (check) by 1
            nextItem = getNextLowestItemInLayout(layoutFiltered, currentOrder);
            // item['order'] = nextItem['order'];
            // nextItem['order'] = currentOrder;
            console.log("next lowest item ", nextItem);
        }

        // we have to loop through and set the new items...

        // // const newLayout = changeDirectionForLayoutItem(layout, id, currentDirection);
        let newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
        if (nextItem) {
            Object.keys(currentWorkspace.layout).forEach((li) => {
                if (currentWorkspace.layout[li]["id"] === nextItem["id"]) {
                    console.log(
                        "setting to current",
                        currentWorkspace.layout[li]["id"]
                    );
                    newWorkspace.layout[li]["order"] = currentOrder;
                }

                if (newWorkspace.layout[li]["id"] === item["id"]) {
                    console.log(
                        "setting to next",
                        currentWorkspace.layout[li]["id"]
                    );
                    newWorkspace.layout[li]["order"] = nextItem["order"];
                }
            });
        }

        // // newWorkspace['layout'] = newLayout;
        setCurrentWorkspace(() => newWorkspace);
        forceUpdate();
    }

    function handleSaveConfiguration(data) {
        console.log("SAVING CONFIG ", data);

        const newWorkspace = saveItemToWorkspace(data);
        setCurrentWorkspace(newWorkspace);
        setIsConfigOpen(false);
        setIsWidgetModalOpen(false);
        setSelectedItem(null);
        forceUpdate();
        // onTogglePreview();
    }

    function handleSaveWidgetChanges(data) {
        console.log("LayoutBuilder SAVE WIDGET CHANGES ", data);
        const newWorkspace = saveItemToWorkspace(data);
        console.log("NEW WORKSPACE ", newWorkspace);

        setCurrentWorkspace(() => newWorkspace);
        setItemSelected(() => null);
        setIsConfigOpen(false);
        setIsWidgetModalOpen(false);

        // forceUpdate();
        // onTogglePreview();
    }

    function saveItemToWorkspace(data) {
        const layout = JSON.parse(JSON.stringify(currentWorkspace["layout"]));
        const newLayout = updateLayoutItem(layout, data);
        const newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
        newWorkspace["layout"] = newLayout;
        return newWorkspace;
    }

    function handleClickEditItem(newItem) {
        console.log("edit item ", newItem);
        delete newItem["api"];
        delete newItem["componentData"];

        setItemSelected(() => newItem);
        // setIsWidgetModalOpen(() => true);
        setIsConfigModalOpen(() => true);
        forceUpdate();
    }

    function handleClickEvents(d) {
        console.log(d);
        setItemSelected(() => d);
        // setIsEventModalOpen(() => true);
        setIsConfigModalOpen(true);
    }

    return (
        <div className={`flex flex-col w-full h-full overflow-hidden p-2`}>
            <div className="flex flex-row w-full h-full overflow-hidden p-2 space-x-2">
                <LayoutContainer
                    id="search-layout-builder"
                    scrollable={true}
                    direction={"col"}
                    width={"w-full"}
                    height={"h-full"}
                    className={"overflow-x-hidden"}
                >
                    <LayoutDragBuilder
                        dashboardId={dashboardId}
                        isDraggable={true}
                        workspace={currentWorkspace}
                        header={currentWorkspace["name"]}
                        layout={currentWorkspace["layout"]}
                        parentKey={0}
                        debugMode={debugMode}
                        previewMode={preview}
                        onClickAdd={onClickAdd}
                        onClickRemove={onClickRemove}
                        onClickShrink={onClickShrink}
                        onClickExpand={onClickExpand}
                        onChangeDirection={onChangeDirection}
                        onChangeOrder={onChangeOrder}
                        onDropItem={onDropItem}
                        onOpenConfig={handleClickEditItem} //{handleClickConfigure}
                        onOpenEvents={handleClickEvents}
                        onSaveConfiguration={handleSaveConfiguration}
                        onClickEdit={onTogglePreview}
                    />
                </LayoutContainer>
                {/* {preview === false && (
                    <div className="flex flex-col p-2 text-xs text-green-700 h-full hidden xl:flex xl:w-1/4 bg-slate-900 rounded">
                        <LayoutBuilderConfigPanel 
                            workspace={currentWorkspace} 
                            onComplete={handleClickSaveWorkspace} 
                            onClickEdit={handleClickEditItem}
                        />
                    </div>
                )} */}
            </div>
            {itemSelected !== null && (
                <LayoutBuilderEditItemModal
                    open={isWidgetModalOpen}
                    setIsOpen={setIsWidgetModalOpen}
                    item={itemSelected}
                    onUpdate={handleSaveWidgetChanges}
                    workspace={currentWorkspace}
                />
            )}
            {itemSelected !== null && (
                <LayoutBuilderAddItemModal
                    open={isAddWidgetModalOpen}
                    setIsOpen={setIsAddWidgetModalOpen}
                    item={isAddWidgetModalOpen === true ? itemSelected : null}
                    onSaveItem={handleClickConfirmAdd}
                    workspace={
                        isAddWidgetModalOpen === true ? currentWorkspace : null
                    }
                />
            )}
            {itemSelected !== null && (
                <LayoutBuilderEventModal
                    open={isEventModalOpen}
                    setIsOpen={setIsEventModalOpen}
                    item={isEventModalOpen === true ? itemSelected : null}
                    onSave={handleSaveNewWorkspace}
                    workspace={
                        isEventModalOpen === true ? currentWorkspace : null
                    }
                />
            )}
            {itemSelected !== null && (
                <LayoutBuilderConfigModal
                    open={isConfigModalOpen}
                    setIsOpen={setIsConfigModalOpen}
                    item={isConfigModalOpen === true ? itemSelected : null}
                    onSaveWorkspace={handleSaveNewWorkspace}
                    // onSaveWidgetChanges={handleSaveWidgetChanges}
                    workspace={
                        isConfigModalOpen === true ? currentWorkspace : null
                    }
                />
            )}
        </div>
    );
};
