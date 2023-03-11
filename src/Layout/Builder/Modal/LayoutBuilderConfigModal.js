import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonIcon, Panel, Modal } from "@dash/Common";

import PanelEditItem from "./Panel/PanelEditItem";
import PanelEditItemHandlers from "./Panel/PanelEditItemHandlers";
import PanelCode from "./Panel/PanelCode";
import { ThemeContext } from "@dash/Context";

export const LayoutBuilderConfigModal = ({
    workspace,
    open,
    setIsOpen,
    onSaveWorkspace,
    item = null,
}) => {
    const { theme } = useContext(ThemeContext);

    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [configMenuItemSelected, setConfigMenuItemSelected] =
        useState("edit");

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if (item !== itemSelected) {
            setItemSelected(() => item);
        }

        if (workspace !== workspaceSelected) {
            setWorkspaceSelected(() => workspace);
        }

        if (open === false) {
            setItemSelected(null);
            setConfigMenuItemSelected("edit");
            setWorkspaceSelected(null);
        }
    }, [open]);

    /**
     * handleEditChange
     * This method will receive the item and workspace
     * but not SAVE it...only update the data.
     *
     * @param {} itemChanged the LaoutItem
     * @param {*} workspaceChanged the Workspace item
     */
    function handleEditChange(itemChanged, workspaceChanged) {
        console.log("handle edit ", itemChanged, workspaceChanged);
        setItemSelected(() => itemChanged);
        setWorkspaceSelected(() => workspaceChanged);
        forceUpdate();
    }

    return (
        itemSelected !== null && (
            <Modal
                isOpen={open}
                setIsOpen={setIsOpen}
                width={"w-11/12 xl:w-5/6"}
                height="h-5/6"
            >
                <Panel>
                    <div
                        className={`flex flex-col w-full h-full overflow-hidden`}
                    >
                        <div className="flex flex-row w-full h-full overflow-hidden">
                            <div
                                className={`flex flex-col h-full ${theme["bg-secondary-very-dark"]} p-2 px-4 pt-4 space-y-2`}
                            >
                                <ButtonIcon
                                    icon="cog"
                                    iconSize={"w-6 h-6"}
                                    onClick={() =>
                                        setConfigMenuItemSelected("edit")
                                    }
                                    bgColor={
                                        configMenuItemSelected === "edit"
                                            ? "bg-blue-700"
                                            : "bg-blue-900"
                                    }
                                />
                                {itemSelected["workspace"] !== "layout" && (
                                    <ButtonIcon
                                        icon="phone"
                                        iconSize={"w-6 h-6"}
                                        onClick={() =>
                                            setConfigMenuItemSelected(
                                                "handlers"
                                            )
                                        }
                                        bgColor={
                                            configMenuItemSelected ===
                                            "handlers"
                                                ? "bg-blue-700"
                                                : "bg-blue-900"
                                        }
                                    />
                                )}
                                <ButtonIcon
                                    icon="code"
                                    iconSize={"w-6 h-6"}
                                    onClick={() =>
                                        setConfigMenuItemSelected("code")
                                    }
                                    bgColor={
                                        configMenuItemSelected === "code"
                                            ? "bg-blue-700"
                                            : "bg-blue-900"
                                    }
                                />
                            </div>
                            <div
                                className={`flex flex-row w-full h-full space-x-4 overflow-hidden p-4 ${theme["bg-secondary-dark"]}`}
                            >
                                {configMenuItemSelected === "edit" && (
                                    <PanelEditItem
                                        item={itemSelected}
                                        onUpdate={handleEditChange}
                                        workspace={workspaceSelected}
                                    />
                                )}

                                {configMenuItemSelected === "handlers" && (
                                    <PanelEditItemHandlers
                                        item={itemSelected}
                                        onUpdate={handleEditChange}
                                        workspace={workspaceSelected}
                                    />
                                )}

                                {configMenuItemSelected === "code" && (
                                    <PanelCode
                                        item={itemSelected}
                                        onUpdate={handleEditChange}
                                        workspace={workspaceSelected}
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            className={`flex flex-row justify-end ${theme["bg-primary-very-dark"]} p-4 rounded-br rounded-bl border-t border-gray-800 justify-between items-center`}
                        >
                            <div
                                className={`flex flex-row font-bold text-xl ${theme["text-secondary-light"]} px-2`}
                            >
                                {itemSelected["component"]}
                            </div>
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
                                    onClick={() =>
                                        onSaveWorkspace(workspaceSelected)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Panel>
            </Modal>
        )
    );
};
