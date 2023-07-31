import React, { useState, useEffect, useContext } from "react";
import { Panel } from "@dash/Common";
import { renderLayout, replaceItemInLayout } from "@dash/Utils";
import { WidgetConfigPanel } from "@dash/Layout";
import { WorkspaceModel } from "@dash/Models";
import deepEqual from "deep-equal";
import { ThemeContext } from "@dash/Context";

export const PanelEditItem = ({ workspace, onUpdate, item = null }) => {
    const { theme } = useContext(ThemeContext);

    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        //console.log('EFFECT PanelEditItem', workspace, workspaceSelected, item['userPrefs'], itemSelected['userPrefs']);
        //console.log('COMPARE RESULT: ', deepEqual(item, itemSelected));
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

    return (
        itemSelected &&
        workspaceSelected && (
            <Panel padding={false}>
                <div className="flex flex-row w-full h-full space-x-4 overflow-hidden">
                    <div className="flex flex-col w-3/4 min-w-3/4 h-full rounded">
                        {/* render the widget item here. */}
                        <div
                            className={`flex flex-col w-full h-full rounded space-y-2 border-2 border-dashed ${theme["border-secondary-very-dark"]}`}
                        >
                            <div
                                className={`flex p-2 text-xs ${theme["text-secondary-dark"]} rounded-br uppercase font-bold `}
                            >
                                Preview
                            </div>
                            <div className={`flex flex-col p-4 h-full`}>
                                {itemSelected !== null &&
                                    workspaceSelected !== null &&
                                    renderEditContainer()}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col w-1/4 ${theme["bg-secondary-dark"]}`}
                    >
                        {itemSelected && (
                            <WidgetConfigPanel
                                item={itemSelected}
                                onChange={handleUpdate}
                                onSave={null}
                                disabled={itemSelected === null}
                                workspace={workspaceSelected}
                                parentWorkspace={itemSelected.parentWorkspace}
                            />
                        )}
                    </div>
                </div>
            </Panel>
        )
    );
};

export default PanelEditItem;
