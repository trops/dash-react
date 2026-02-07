import React, { useState, useEffect, useContext } from "react";
import { Panel, SelectMenu, InputText } from "@dash/Common";
import { getContainerColor, renderLayout, replaceItemInLayout } from "@dash/Utils";
import { WidgetConfigPanel } from "@dash/Layout";
import { LayoutModel, WorkspaceModel } from "@dash/Models";
import deepEqual from "deep-equal";
import { ThemeContext } from "@dash/Context";
import { ComponentManager } from "@dash/index";
import { DashboardModel } from "@dash/Models";

export const PanelEditItem = ({ workspace, onUpdate, item = null }) => {
    const { theme } = useContext(ThemeContext);

    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log("panel edit item");
        if (deepEqual(item, itemSelected) === false) {
            console.log("COMPARE CHECK DIFFERENT!");
            setItemSelected(() => item);
            forceUpdate();
        }

        if (deepEqual(workspace, workspaceSelected) === false) {
            setWorkspaceSelected(() => workspace);
            forceUpdate();
        }

        // if (open === false) {
        //     setItemSelected(null);
        //     setWorkspaceSelected(null);
        // }
    }, [workspace, item]);

    function handleSaveChanges(itemData) {
        if (itemData !== null) {
            console.log("handleSaveChanges ", itemData);
            onUpdate(itemData, workspaceSelected);
            setItemSelected(null);
            //setIsOpen(false);
        }
    }

    function handleUpdate(e, data) {
        console.log("handling update ", e, data);

        const workspaceTemp = WorkspaceModel(workspaceSelected);
        const newLayout = replaceItemInLayout(
            workspaceTemp.layout,
            data["id"],
            data
        );
        workspaceTemp.layout = newLayout;

        // setWorkspaceSelected(() => workspaceTemp);
        // setItemSelected(() => data);
        onUpdate(data, workspaceTemp);
        forceUpdate();
    }

    function renderEditContainer() {
        try {
            console.log("RENDERING EDIT CONTAINER ", itemSelected);
            if (itemSelected !== null && workspaceSelected !== null) {
                const workspaceSelectedTemp = JSON.parse(
                    JSON.stringify(workspaceSelected)
                );

                if (
                    itemSelected.parentWorkspace !== undefined &&
                    itemSelected.parentWorkspace !== null
                ) {
                    // let's make a custom layout with the parent workspace and the itemSelected
                    // need the workspace for the functionality...
                    let parentWorkspaceTemp = JSON.parse(
                        JSON.stringify(itemSelected.parentWorkspace)
                    );
                    let layout = JSON.parse(
                        JSON.stringify(workspaceSelectedTemp["layout"])
                    );
                    let itemTemp = JSON.parse(JSON.stringify(itemSelected));

                    // VERY IMPORTANT TO CHECK THE WORKSPACES!!!!
                    // otherwise the workspace will crash as the widget doesnt belong...
                    if (
                        itemSelected["workspace"] ===
                        parentWorkspaceTemp["workspace"]
                    ) {
                        if (item.parentWorkspace) {
                            // set the id's to work appropriately.
                            parentWorkspaceTemp["id"] = 1;
                            parentWorkspaceTemp["parent"] = 0;

                            itemTemp["parent"] = 1; //parentWorkspaceTemp['id'];
                            // set the new layout
                            layout = [parentWorkspaceTemp, itemTemp];
                        }

                        return (
                            itemSelected.parentWorkspace &&
                            renderLayout({
                                workspace: workspaceSelected,
                                layout,
                                parentKey: 0,
                                previewMode: true,
                                isDraggable: false,
                            })
                        );
                    } else {
                        // workspace mismatch!
                        return null;
                    }
                }
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function onChangeWorkspace(workspaceName) {
        try {
        console.log("onChangeWorkspace ", workspaceName, itemSelected, workspaceSelected);
        if (workspaceName === "layout") {
            // do nothing here, or we should set the component to layout
             // we have to set the itemSelected and change it to the new workspace
                // but maintain the layout...
                const itemTemp = JSON.parse(JSON.stringify(itemSelected));
                itemTemp["component"] = "Container";
                itemTemp["workspace"] = "layout";

                const newItem = LayoutModel(itemTemp, workspaceSelected, itemTemp["dashboardId"]);
                const dashboard = new DashboardModel(workspaceSelected);
                dashboard.updateLayoutItem(newItem);
                setWorkspaceSelected(() => dashboard.workspace());
                setItemSelected(() => newItem);
                onUpdate(newItem, dashboard.workspace());
                forceUpdate();
        } else {
            const workspace = ComponentManager.getWorkspaceByName(workspaceName);
            if (workspace) {

                // we have to set the itemSelected and change it to the new workspace
                // but maintain the layout...
                const itemTemp = JSON.parse(JSON.stringify(itemSelected));
                itemTemp["component"] = workspace["component"];
                itemTemp["workspace"] = workspace["workspace"];
                
                // pass this through the layout model to validate the data
                const newItem = LayoutModel(itemTemp, workspaceSelected, itemTemp["dashboardId"]);
                console.log("itemTemp ", newItem);

                const dashboard = new DashboardModel(workspaceSelected);
                dashboard.updateLayoutItem(newItem);
                setWorkspaceSelected(() => dashboard.workspace());
                setItemSelected(() => newItem);


                onUpdate(newItem, dashboard.workspace());
                forceUpdate();
            }  
        }
    } catch(e) {
        console.log(e);     
    }
    }

    

     function renderCustomSettings() {
        if (itemSelected) {
            console.log("renderCustomSettings ", itemSelected);
            const componentConfig = ComponentManager.getComponent(itemSelected.component);
            if (componentConfig === null || componentConfig === undefined) {
                return null;
            }
            if ("userConfig" in componentConfig) {
                const userConfig = componentConfig["userConfig"];
                // get the user prefs for the key
                const layoutItem = LayoutModel(itemSelected, workspaceSelected);
                const userPrefs = layoutItem.userPrefs;

                return Object.keys(userConfig).map((key) => {

                    if (key in userPrefs) {
                        // depending on the type...
                        const configItem = userConfig[key];
                        const { instructions, displayName, required, type } =
                            configItem;

                        // console.log("widget config", configItem);

                        return renderFormItem(
                            displayName,
                            key,
                            instructions,
                            required,
                            userPrefs[key],
                            handleTextChangeCustom,
                            configItem
                        );
                    }
                });
            }
        }
        return null;
    }

    function handleTextChangeCustom(e, config) {
        const newItem = JSON.parse(JSON.stringify(itemSelected));
        if ("userPrefs" in itemSelected === false) {
            newItem["userPrefs"] = {};
        }
        newItem["userPrefs"][e.target.name] = e.target.value;
        //setItemSelected(() => newItem);
        handleUpdate(e, newItem);
    }

     function renderFormItem(
            displayName,
            key,
            instructions,
            required,
            value,
            onChange,
            configItem
        ) {
            return (
                <div
                    key={`config-item-${key}`}
                    className={`rounded flex flex-col p-2 space-y-1`}
                >
                    <span className="text-gray-400 font-bold text-sm">
                        {displayName}{" "}
                        {required === true && (
                            <span className="text-red-500">*</span>
                        )}
                    </span>
                    <div className="text-xs text-gray-400 pb-1">{instructions}</div>
                    {configItem["type"] === "text" && (
                        <InputText
                            type="text"
                            name={key}
                            value={value}
                            onChange={(e) => onChange(e, configItem)}
                            textSize="text-sm"
                        />
                    )}
                    {configItem["type"] === "secret" && (
                        <InputText
                            type="password"
                            name={key}
                            value={value}
                            onChange={(e) => onChange(e, configItem)}
                            textSize="text-sm"
                        />
                    )}
                    {configItem["type"] === "select" && (
                        <SelectMenu
                            name={key}
                            selectedValue={value}
                            onChange={(e) => onChange(e, configItem)}
                            textSize="text-xs"
                            className="font-normal"
                        >
                            {"options" in configItem &&
                                configItem.options.map((option) => {
                                    return (
                                        <option value={option.value} className={"text-sm"}>
                                            {option.displayName}
                                        </option>
                                    );
                                })}
                            {"optionsValues" in configItem && (
                                <option>{configItem["optionsValues"]}</option>
                            )}
                        </SelectMenu>
                    )}
                </div>
            );
        }
    

    return (
        itemSelected &&
        workspaceSelected && (
            <Panel>
                 <div className={`flex flex-col w-full h-full overflow-clip`}>
                    <div className="flex flex-col w-full h-full overflow-clip">
                        <div className="flex flex-row w-full h-full overflow-clip space-x-4 justify-between">

                     <div className="flex-col h-full rounded font-medium text-gray-400 w-full hidden xl:flex lg:w-1/3">
                     <div className="flex flex-col rounded p-4 py-10 space-y-4">
                        <p
                            className={`text-5xl font-bold ${theme["text-secondary-very-light"]}`}
                        >
                            Settings
                        </p>
                        <p
                            className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                        >
                            Some widgets may have additional configuration settings that you can change here.
                        </p>
                        <p
                            className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                        >
                            You may be required to enter some additional information e.g, API Keys, etc.    
                        </p>
    
                    </div>
                    </div>

                    <div
                        className={`flex flex-col w-2/3  ${getContainerColor(itemSelected)} h-full rounded p-2 space-y-2`}
                    >
                        <div className="flex flex-col w-full space-y-2 h-full overflow-y-auto">

                        <div className={`flex flex-col rounded p-4 space-y-2`}>
                            {/* <div className="text-xs text-gray-400 pb-1">{itemSelected.component}</div> */}
                            <SelectMenu name="power_container" className="p-2" textSize="text-sm" onChange={(e) => onChangeWorkspace(e.target.value)} selectedValue={itemSelected.component}>
                                {/* <option value="layout">Layout Only</option> */}
                                <option value="">---Widgets--</option>
                                {ComponentManager.getWidgets().map((workspace) => {
                                    return (
                                        <option
                                            key={workspace}
                                            value={workspace}
                                        >
                                            {workspace}
                                        </option>
                                    );
                                })}
                            </SelectMenu>
                        </div>

                        <div className="flex flex-col w-full">
                            {renderCustomSettings()}
                            </div>
                        {/* {itemSelected && (
                            <WidgetConfigPanel
                                item={itemSelected}
                                onChange={handleUpdate}
                                onSave={null}
                                disabled={itemSelected === null}
                                workspace={workspaceSelected}
                                parentWorkspace={itemSelected.parentWorkspace}
                                scrollable={false}
                            />
                        )} */}
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </Panel>
        )
    );
};

export default PanelEditItem;
