import React, { useState, useEffect, useContext } from "react";
import { CodeEditorInline, Panel } from "@dash/Common";
import deepEqual from "deep-equal";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { LayoutContainer } from "../../../LayoutContainer";

export const PanelCode = ({ workspace, onUpdate, item = null }) => {
    const { theme } = useContext(ThemeContext);
    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if (deepEqual(item, itemSelected) === false) {
            setItemSelected(() => item);
            forceUpdate();
        }

        if (deepEqual(workspace, workspaceSelected) === false) {
            setWorkspaceSelected(() => workspace);
            forceUpdate();
        }
    }, [workspace, item]);

    function handleCodeChange(code) {
        const itemToSave = JSON.parse(code);
        onUpdate(itemToSave, workspaceSelected);
    }

    return (
        itemSelected &&
        workspaceSelected && (
            <Panel>
                <div className="flex flex-row w-full h-full space-x-4 overflow-clip">
                    <div className="flex flex-row w-full min-w-3/4 h-full rounded">
                        {/* render the widget item here. */}
                        <div
                            className={`flex-col h-full rounded font-medium ${theme["text-secondary-dark"]} w-full hidden xl:flex lg:w-1/3`}
                        >
                            {/* render the widget item here. */}
                            {itemSelected !== null && (
                                <div className="flex flex-col rounded p-4 py-10 space-y-4">
                                    <p
                                        className={`text-5xl font-bold ${theme["text-secondary-very-light"]}`}
                                    >
                                        Nerdery.
                                    </p>
                                    <p
                                        className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                                    >
                                        If this appears to be jibberish to you,
                                        please turn around.
                                    </p>
                                    <p
                                        className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                                    >
                                        If you need to manually edit the code
                                        for the Component selected, by all
                                        means.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div
                            className={`flex flex-col h-full border-2 border-gray-800 rounded ${theme["bg-secondary-very-dark"]} w-full xl:w-2/3`}
                        >
                            <div
                                className={`flex ${theme["bg-secondary-very-dark"]} p-2 text-xs text-gray-300 rounded-br uppercase font-bold`}
                            >
                                Code Editor
                            </div>
                            <LayoutContainer
                                direction="col"
                                scrollable={true}
                                className={`text-green-600 ${theme["bg-secondary-very-dark"]}`}
                            >
                                {itemSelected !== null &&
                                    workspaceSelected !== null && (
                                        <div
                                            className={`text-xs break-all h-full ${theme["bg-secondary-very-dark"]}`}
                                        >
                                            <CodeEditorInline
                                                code={JSON.stringify(
                                                    itemSelected,
                                                    null,
                                                    2
                                                )}
                                                className={`p-0 h-full ${theme["bg-secondary-very-dark"]}`}
                                                setCode={handleCodeChange}
                                            />
                                        </div>
                                    )}
                            </LayoutContainer>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    );
};

export default PanelCode;
