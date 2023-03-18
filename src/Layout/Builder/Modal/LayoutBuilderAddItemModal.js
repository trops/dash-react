import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    Panel,
    Heading,
    SubHeading3,
    Paragraph,
    MenuItem3,
    Modal,
    InputText,
} from "@dash/Common";
import {
    renderLayout,
    getNextHighestId,
    getNextHighestOrder,
    getBorderStyle,
} from "@dash/Utils";
import { WidgetConfigPanel } from "@dash/Layout";
import { ComponentManager } from "@dash";
import { LayoutModel } from "@dash/Models";
import { ThemeContext } from "@dash/Context";

export const LayoutBuilderAddItemModal = ({
    workspace,
    open,
    setIsOpen,
    item = null,
    onSaveItem = null,
}) => {
    const { theme } = useContext(ThemeContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [menuItemSelected, setMenuItemSelected] = useState(null);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [parentWorkspace, setParentWorkspace] = useState(null);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if (open === false) {
            setMenuItemSelected(null);
            setWorkspaceSelected(null);
        } else {
            if (workspaceSelected !== workspace)
                setWorkspaceSelected(() => workspace);
        }
    }, [open]);

    useEffect(() => {
        if (workspace !== workspaceSelected && workspace !== null) {
            setWorkspaceSelected(() => workspace);
        }
    }, [item, open, workspace]);

    useEffect(() => {
        console.log("menu item selected ", menuItemSelected);
    }, [menuItemSelected]);

    function renderWidgets() {
        const componentMap = ComponentManager.map();
        const workspaceType = item ? item["workspace"] : null;
        const canAddChildren = item ? item["canHaveChildren"] : true;

        const parentWorkspaceType =
            item["parentWorkspaceName"] !== null &&
            item["parentWorkspaceName"] !== undefined
                ? item["parentWorkspaceName"]
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
                    .map((w) => renderMenuItem("widget", w));

            return (
                <div className="flex flex-col rounded space-y-1">{options}</div>
            );
        } else {
            return <div className="flex flex-col rounded"></div>;
        }
    }

    function renderWorkspaces() {
        const componentMap = ComponentManager.map();
        const canAddChildren = item ? item.canHaveChildren : true;

        // We want to make sure the item (parent) can have children from the config
        // We also want to limit the workspaces to layout only
        // if the parent workspace is NOT layout, we only allow "layout" components

        const options =
            canAddChildren === true && item["parentWorkspaceName"] === "layout"
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
                      .map((w) => renderMenuItem("workspace", w))
                : Object.keys(componentMap)
                      .sort()
                      .filter((i) =>
                          searchTerm !== ""
                              ? i.toLowerCase().includes(searchTerm)
                              : true
                      )
                      .filter((c) => componentMap[c]["workspace"] === "layout")
                      .map((w) => renderMenuItem("workspace", w));

        return <div className="flex flex-col rounded space-y-1">{options}</div>;
    }

    function handleClickItem(data) {
        try {
            const layoutModel = LayoutModel(data, workspace, workspace["id"]);

            // we have to give the widget an ID
            const nextId = getNextHighestId(workspace["layout"]);
            const nextOrderData = getNextHighestOrder(workspace["layout"]);
            const nextOrder = nextOrderData["highest"];
            // data['id'] = nextId;

            layoutModel.id = nextId;
            layoutModel.order = nextOrder;

            layoutModel["parent"] =
                parentWorkspace !== null && parentWorkspace !== undefined
                    ? "id" in parentWorkspace
                        ? parentWorkspace["id"]
                        : 0
                    : 0; // unsure if this is ok

            layoutModel["parentWorkspace"] = item["parentWorkspace"];
            layoutModel["parentWorkspaceName"] = item["parentWorkspaceName"];
            layoutModel["parent"] = item["id"];
            // nearest parent workspace (use the original widget/workspace clicked
            // to begin looking...

            // lets add the data to the original workspace...
            const newWorkspace = JSON.parse(JSON.stringify(workspace));
            newWorkspace["layout"] = [
                layoutModel["parentWorkspace"],
                layoutModel,
            ];

            setMenuItemSelected(() => layoutModel);
            setWorkspaceSelected(() => newWorkspace);
            forceUpdate();
        } catch (e) {
            console.log(e);
        }
    }

    function handleAddItem(data) {
        console.log("HANDLE ADD ITEM ", data);
        // The "item" is the item we selected in the layout to add TO
        // The menuItemSelected is the item we chose from the list...
        console.log("adding item", menuItemSelected, item);

        onSaveItem(menuItemSelected, item);
    }

    function renderMenuItem(type, componentName) {
        return (
            <MenuItem3
                onClick={() =>
                    handleClickItem({ type, component: componentName })
                }
            >
                {componentName}
            </MenuItem3>
        );
    }

    // function handleUpdateMenuItem(data) {
    //     console.log('changed ', data);
    //     setMenuItemSelected(() => data);
    //     forceUpdate();
    // }

    function handleUpdate(e, layoutItem) {
        try {
            console.log("widget data changed ", layoutItem);

            // let configItem = ComponentManager.config(data['component'], data);

            // // we have to give the widget an ID
            const nextId = getNextHighestId(workspaceSelected["layout"]);
            // const nextOrder = getNextHighestOrder(workspaceSelected['layout']);

            layoutItem["id"] = nextId;
            // data['widgetConfig'] = configItem;

            // // lets add the data to the original workspace...
            layoutItem["parent"] =
                parentWorkspace !== null ? parentWorkspace["id"] : 0; // unsure if this is ok

            // // lets add the data to the original workspace...
            const newWorkspace = JSON.parse(JSON.stringify(workspace));
            newWorkspace["layout"] = [parentWorkspace, layoutItem];

            setMenuItemSelected(() => layoutItem);
            setWorkspaceSelected(() => newWorkspace);
            // forceUpdate();
        } catch (e) {
            console.log("ERROR ", e.message);
        }
    }

    function renderAddContainer(itemData) {
        try {
            const workspaceSelectedTemp = JSON.parse(
                JSON.stringify(workspaceSelected)
            );

            if (
                item.parentWorkspace !== undefined &&
                item.parentWorkspace !== null
            ) {
                // let's make a custom layout with the parent workspace and the item selected
                // need the workspace for the functionality...
                let parentWorkspaceTemp = JSON.parse(
                    JSON.stringify(item.parentWorkspace)
                );
                let layout = JSON.parse(
                    JSON.stringify(workspaceSelectedTemp["layout"])
                );
                let itemTemp = JSON.parse(JSON.stringify(itemData));

                if (item.parentWorkspace) {
                    // set the id's to work appropriately.
                    itemTemp["parent"] = parentWorkspaceTemp["id"];
                    // set the new layout
                    layout = [parentWorkspaceTemp, itemTemp];

                    // let's determine the order...
                    // const layoutItems = parentWorkspaceTemp.layout.map(li => li.order);
                    // console.log('ORDER OF ITEMS ', layoutItems);
                }

                return (
                    item.parentWorkspace &&
                    renderLayout({
                        workspaceSelected,
                        layout,
                        parentKey: item.parentWorkspace["parent"],
                        previewMode: true,
                        isDraggable: false,
                    })
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        item && (
            <Modal
                isOpen={open}
                setIsOpen={setIsOpen}
                width={"w-5/6"}
                height={"h-5/6"}
            >
                <Panel>
                    <div
                        className={`flex flex-col w-full h-full overflow-hidden`}
                    >
                        <div className="flex flex-row w-full h-full space-x-4 overflow-hidden rounded">
                            <div className="flex flex-col h-full rounded p-4 text-gray-200 overflow-y-scroll w-1/4 space-y-4">
                                {/* render the widget item here. */}
                                <div className="flex flex-row pb-4">
                                    <InputText
                                        textSize="text-sm"
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        value={searchTerm}
                                        placeholder="Widgetize"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <span className="text-xs uppercase font-bold px-2 text-gray-400">
                                        Layout/Function
                                    </span>
                                    <div className="flex flex-col rounded space-y-2">
                                        {renderWorkspaces()}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <span className="text-xs uppercase font-bold px-2 text-gray-400">
                                        Widgets
                                    </span>
                                    <div className="flex flex-col rounded space-y-2">
                                        {renderWidgets()}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`flex flex-row h-full text-gray-200 overflow-y-scroll w-full rounded p-4 space-x-4 ${theme["bg-secondary-dark"]}`}
                            >
                                {/* render the widget item here. */}
                                {menuItemSelected === null && (
                                    <div className="flex-col h-full rounded font-medium text-gray-400 w-full xl:w-1/2 p-10">
                                        {/* render the widget item here. */}
                                        <div className="flex flex-col rounded p-4 py-10 space-y-4">
                                            <Heading
                                                title="Build."
                                                padding={false}
                                            />
                                            <SubHeading3
                                                title={
                                                    "Choose a Workspace or Widget from the Available Components."
                                                }
                                                padding={false}
                                            />
                                            <Paragraph
                                                text={
                                                    "Don't worry, you can't mess this up."
                                                }
                                                padding={false}
                                            />
                                        </div>
                                    </div>
                                )}
                                {menuItemSelected !== null && (
                                    <div
                                        className={`flex flex-col rounded border-2 border-gray-800 ${getBorderStyle(
                                            menuItemSelected
                                        )} overflow-hidden h-full w-3/4 bg-gray-900`}
                                    >
                                        <div
                                            className={`flex flex-col p-2 space-x-1 uppercase text-xs text-gray-200 font-bold bg-gray-800`}
                                        >
                                            {menuItemSelected !== null && (
                                                <div className="flex flex-row">
                                                    Preview:{" "}
                                                    {
                                                        menuItemSelected[
                                                            "component"
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden justify-between h-full">
                                            <div className="flex flex-col grow p-2">
                                                {renderAddContainer(
                                                    menuItemSelected
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {menuItemSelected && (
                                    <div className="flex flex-col w-1/4">
                                        <WidgetConfigPanel
                                            item={menuItemSelected}
                                            onChange={handleUpdate}
                                            // onSave={handleAddItem}
                                            disabled={false}
                                            workspace={workspaceSelected}
                                            parentWorkspace={parentWorkspace}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className={`flex flex-row justify-end ${theme["bg-primary-very-dark"]} p-4 rounded-br rounded-bl border-t ${theme["border-primary-dark"]}`}
                        >
                            <div className="flex flex-row space-x-2">
                                <Button
                                    title={"Cancel"}
                                    bgColor={"bg-gray-800"}
                                    textSize={"text-lg"}
                                    padding={"py-2 px-4"}
                                    onClick={() => setIsOpen(false)}
                                />
                                <Button
                                    title={"Save Changes"}
                                    bgColor={"bg-gray-800"}
                                    hoverBackgroundColor={"hover:bg-green-700"}
                                    textSize={"text-lg"}
                                    padding={"py-2 px-4"}
                                    onClick={handleAddItem}
                                />
                            </div>
                        </div>
                    </div>
                </Panel>
            </Modal>
        )
    );
};
