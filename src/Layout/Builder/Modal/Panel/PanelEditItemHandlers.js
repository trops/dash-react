import React, { useState, useEffect, useContext } from "react";
import { Panel } from "@dash/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deepCopy, replaceItemInLayout } from "@dash/Utils";
import deepEqual from "deep-equal";
import { ThemeContext } from "@dash/Context";

export const PanelEditItemHandlers = ({
    workspace,
    open,
    onUpdate,
    item = null,
}) => {
    const { theme } = useContext(ThemeContext);
    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [eventsSelected, setEventsSelected] = useState({});
    const [eventHandlerSelected, setEventHandlerSelected] = useState(null);
    const [loadedExisting, setLoadedExisting] = useState(false);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        // console.log(
        //     "event workspace ",
        //     item,
        //     itemSelected,
        //     workspace,
        //     workspaceSelected
        // );

        // if (workspaceSelected === null && deepEqual(workspaceSelected, workspace) === false) {
        //     setWorkspaceSelected(() => workspace);
        //     loadExistingListeners(workspace);
        // }

        if (deepEqual(item, itemSelected) === false) {
            setItemSelected(() => item);
            // reset the selected items
            setEventsSelected(() => {});
            setEventHandlerSelected(null);
            setLoadedExisting(false);
        }

        if (deepEqual(workspace, workspaceSelected) === false) {
            setWorkspaceSelected(() => workspace);
            // loadExistingListeners(workspace);
        }

        if (workspaceSelected === workspace && loadedExisting === false) {
            setLoadedExisting(() => true);
            // loadExistingListeners(workspaceSelected);
        }
        // if (open === false) {
        //     setItemSelected(() => null);
        //     // setComponentsSelected(() => []);
        //     setEventsSelected(() => {});
        //     setEventHandlerSelected(() => null);
        // }

        // if (Object.keys(componentsSelected).length < 1) {
        //     loadExistingListeners(workspace);
        // }
    }, [open, workspace, item]);

    useEffect(() => {
        // if (
        //     eventHandlerSelected !== null &&
        //     eventsSelected !== null &&
        //     eventsSelected !== undefined &&
        //     Object.keys(eventsSelected).length > 0
        // ) {
        //     handleSaveChanges();
        // }
    }, [eventsSelected, eventHandlerSelected]);

    function loadExistingListeners(ws) {
        console.log("loading existing ", ws);
        if (ws !== null) {
            const existingListeners = {};
            ws.layout.forEach((layoutItem) => {
                if ("listeners" in layoutItem) {
                    Object.keys(layoutItem["listeners"]).forEach((key) => {
                        const events = layoutItem["listeners"][key];
                        existingListeners[key] = events;
                    });
                }
            });

            setEventsSelected(() => existingListeners);
            console.log("existing listeners ", existingListeners);
            // let's select one for the user
            if (Object.keys(existingListeners).length > 0) {
                setEventHandlerSelected(
                    () => Object.keys(existingListeners)[0]
                );
            }
            forceUpdate();
        }
    }

    /**
     * pull the selected events out of the itemSelected
     */
    function getSelectedEvents() {}

    function handleSelectEvent(eventString) {
        try {
            if (eventString && eventHandlerSelected !== null) {
                // check if we have the hander "key" in the events object
                let tempEvents = [];
                let currentListeners = deepCopy(itemSelected["listeners"]);

                // check to see if we already have the handler in the listeners
                if (eventHandlerSelected in currentListeners) {
                    tempEvents = currentListeners[eventHandlerSelected];
                }

                tempEvents.push(eventString);
                const uniqueEventsSelected = tempEvents.filter(
                    (value, index, array) => array.indexOf(value) === index
                );

                // and now set the handler to the unique event
                currentListeners[eventHandlerSelected] = uniqueEventsSelected;
                console.log("DONE ", currentListeners);
                // setEventsSelected(() => currentListeners);
                handleSaveChanges(currentListeners);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function handleRemoveEvent(eventString) {
        try {
            console.log(
                "removing event",
                eventString,
                eventHandlerSelected,
                eventsSelected
            );
            if (eventHandlerSelected) {
                // grab the current listeners OBJECT from the itemSelected
                let currentListeners = deepCopy(itemSelected["listeners"]);
                console.log("current listeners for item ", currentListeners);

                // 1. Remove the event from the temp array of events (from current item)
                // filter out the event listener selected (eventString)
                const eventsSelectedTemp =
                    eventHandlerSelected in currentListeners
                        ? currentListeners[eventHandlerSelected].filter(
                              (event) => event !== eventString
                          )
                        : [];

                // ok we have some events, and need to set them as the value for the handler selected

                // want to update the listeners OBJECT
                // handler: [event, event]
                if (eventsSelectedTemp.length > 0) {
                    if (eventHandlerSelected in currentListeners) {
                        currentListeners[eventHandlerSelected] =
                            eventsSelectedTemp;
                    }
                } else {
                    // there are NO events for this handler, so we can remove this handler from
                    // the listeners entirely.
                    delete currentListeners[eventHandlerSelected];
                }

                console.log(
                    "New temp events ",
                    eventsSelectedTemp,
                    currentListeners
                );

                // setEventsSelected(() => currentListeners);

                handleSaveChanges(currentListeners);
            }
        } catch (e) {
            console.log("handleRemoveEvent ", eventString, e.message);
        }
    }

    function handleSelectEventHandler(handler) {
        setEventHandlerSelected(() => handler);
        // setEventsSelected(() => {});
        // handleSaveChanges();
    }

    /**
     * handleRemoveEventHandler
     * We are removing the event handler, and thus removing all of the
     * events that are associated with the handler in the listeners...
     * @param {string} handler
     */
    function handleRemoveEventHandler(handler) {
        setEventHandlerSelected(() => null);
        // setEventsSelected(() => {});

        // hmm, removing the event handler....
        // we should remove this key from the listeners then save the changes...
        let currentListeners = deepCopy(itemSelected["listeners"]);
        console.log(
            "current listeners for item remove handler ",
            handler,
            currentListeners
        );

        // ok we have some events, and need to set them as the value for the handler selected

        // want to update the listeners OBJECT
        // handler: [event, event]
        if (handler in currentListeners) {
            // there are NO events for this handler, so we can remove this handler from
            // the listeners entirely.
            delete currentListeners[handler];
        }

        handleSaveChanges(currentListeners);
    }

    function getLayoutItemById(id) {
        if (workspaceSelected !== null) {
            const layoutItems = workspaceSelected.layout.filter(
                (layoutItem) => {
                    return layoutItem["id"] === parseInt(id, 10);
                }
            );
            if (layoutItems.length > 0) {
                return layoutItems[0];
            }
        }
        return null;
    }

    function handleSaveChanges(currentListeners = {}) {
        try {
            console.log("SAVE CHANGES ", currentListeners);
            if (
                workspaceSelected !== null &&
                eventHandlerSelected !== null &&
                "id" in itemSelected &&
                itemSelected["id"] !== null
            ) {
                console.log("saving changes", currentListeners);
                // let's copy the workspace selected to replace the listeners
                const tempWorkspace = deepCopy(workspaceSelected);

                // craft the event handler + listeners
                // and add to the layout item
                const layoutItem = getLayoutItemById(itemSelected["id"]);

                // now lets add to it...
                layoutItem["listeners"] = currentListeners;
                tempWorkspace["layout"] = replaceItemInLayout(
                    tempWorkspace.layout,
                    layoutItem["id"],
                    layoutItem
                );

                // // save the new workspace
                onUpdate(layoutItem, tempWorkspace);
            }
        } catch (e) {
            console.log("handle save changes ", e);
        }
    }

    /**
     * isSelected
     * Check to see if the event for the component is selected
     *
     * @param {String} eventString the string containing {component}[{id}].{event}
     * @returns
     */

    function isSelectedEvent(event) {
        try {
            console.log(
                "listeners for selected item ",
                itemSelected["listeners"]
            );
            const listenerArray = Object.keys(workspaceSelected.layout)
                .filter((a) => a["id"] === itemSelected["id"])
                .filter((k) => {
                    return (
                        Object.keys(workspaceSelected["layout"][k]["listeners"])
                            .length > 0
                    );
                })
                .map((h) => {
                    return workspaceSelected["layout"][h]["listeners"];
                });
            console.log("listeners array from workspace ", listenerArray);
            let isSelected = false;
            listenerArray.forEach((a) => {
                Object.keys(a).forEach((handler) => {
                    if (a[handler].includes(event) === true) isSelected = true;
                });
            });

            return isSelected;
        } catch (e) {
            return false;
        }
    }

    function renderAvailableEvents() {
        if (workspaceSelected !== null) {
            return workspaceSelected.layout
                .filter((l) => l["component"] !== "Container")
                .filter((e) => e.events.length > 0)
                .filter((li) => li["component"] !== itemSelected["component"])
                .map((layout) => {
                    return (
                        <div
                            className={`flex flex-col text-base font-bold text-gray-400 p-2`}
                        >
                            <div className="flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4">
                                <span className="text-lg">
                                    {layout["component"]}&nbsp;[{layout["id"]}]
                                </span>
                            </div>
                            <div className="flex flex-col space-y-1 py-1">
                                {layout.events
                                    .filter(
                                        (value, index, array) =>
                                            array.indexOf(value) === index
                                    ) // remove any possible duplicates
                                    .map((event) => {
                                        const eventString = `${layout["component"]}[${layout["id"]}].${event}`;
                                        const selected =
                                            isSelectedEvent(eventString);
                                        console.log(
                                            "SELECTED ",
                                            eventString,
                                            selected
                                        );

                                        return (
                                            <div
                                                onClick={() =>
                                                    selected === true
                                                        ? handleRemoveEvent(
                                                              eventString
                                                          )
                                                        : handleSelectEvent(
                                                              eventString
                                                          )
                                                }
                                                className={`flex flex-row ${
                                                    selected === false &&
                                                    "hover:bg-gray-800"
                                                } rounded cursor-pointer p-2 font-bold items-center space-x-2 ${
                                                    selected === true
                                                        ? "bg-blue-800"
                                                        : ""
                                                } `}
                                            >
                                                <FontAwesomeIcon
                                                    icon={"square-check"}
                                                    className={`${
                                                        selected === true
                                                            ? "text-blue-500"
                                                            : "text-gray-700"
                                                    } text-xl`}
                                                />
                                                <div className="flex flex-col">
                                                    <span
                                                        className={`text-base hover:text-gray-300 ${
                                                            selected === true
                                                                ? "text-gray-300"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        {event}
                                                    </span>
                                                    {/* <span className="text-indigo-600 text-xs font-normal">{eventString}</span> */}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                });
        }
    }

    function renderAvailableHandlers() {
        if (workspaceSelected !== null) {
            return workspaceSelected.layout
                .filter((li) => li["id"] === itemSelected["id"])
                .map((layout) => {
                    return (
                        layout.eventHandlers.length > 0 && (
                            <div
                                className={`flex flex-col text-base font-bold text-gray-400 p-2`}
                            >
                                <div className="flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4">
                                    <span className="text-lg">
                                        {layout["component"]}&nbsp;[
                                        {layout["id"]}]
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-1 py-1">
                                    {layout.eventHandlers
                                        .filter(
                                            (value, index, array) =>
                                                array.indexOf(value) === index
                                        ) // remove any possible duplicates
                                        .map((handler) => {
                                            const selected =
                                                eventHandlerSelected !== null
                                                    ? eventHandlerSelected ===
                                                      handler
                                                    : false; //isHandlerSelected(handler);
                                            console.log(
                                                "selected handler ",
                                                selected,
                                                eventHandlerSelected
                                            );
                                            return (
                                                <div
                                                    onClick={() =>
                                                        selected
                                                            ? handleRemoveEventHandler(
                                                                  handler
                                                              )
                                                            : handleSelectEventHandler(
                                                                  handler
                                                              )
                                                    }
                                                    className={`flex flex-row ${
                                                        selected === false &&
                                                        "hover:bg-gray-800"
                                                    } rounded cursor-pointer p-2 font-bold items-center space-x-2 ${
                                                        selected === true &&
                                                        "bg-indigo-700"
                                                    }`}
                                                >
                                                    <div className="flex flex-col px-2">
                                                        <span
                                                            className={`text-base hover:text-gray-300 ${
                                                                selected ===
                                                                true
                                                                    ? "text-gray-300"
                                                                    : "text-gray-400"
                                                            }`}
                                                        >
                                                            {handler}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )
                    );
                });
        }
    }

    return (
        itemSelected !== null && (
            <Panel theme={false}>
                <div className={`flex flex-col w-full h-full overflow-hidden`}>
                    <div className="flex flex-col w-full h-full overflow-hidden">
                        <div className="flex flex-row w-full h-full overflow-hidden space-x-4 justify-between">
                            {/* <div className='flex flex-col flex-shrink h-full rounded font-medium text-gray-400 w-1/3'> */}
                            <div className="flex-col h-full rounded font-medium text-gray-400 w-full hidden xl:flex lg:w-1/3">
                                {/* render the widget item here. */}
                                {itemSelected !== null && (
                                    <div className="flex flex-col rounded p-4 py-10 space-y-4">
                                        <p
                                            className={`text-5xl font-bold ${theme["text-secondary-very-light"]}`}
                                        >
                                            Listen Up.
                                        </p>
                                        <p
                                            className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                                        >
                                            Widgets and Workspaces can talk, but
                                            we have to setup the phone wires.
                                        </p>
                                        <p
                                            className={`text-xl font-normal ${theme["text-secondary-light"]}`}
                                        >
                                            Select the method to handle the
                                            message first, then select the
                                            message it will handle.
                                        </p>

                                        {/* <p className="text-xl font-normal text-gray-300">Widgets and Workspaces can talk, but we have to setup the phone wires.</p>
                                        <p className="text-xl font-normal text-gray-300">Select the method to handle the message first, then select the message it will handle.</p> */}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col bg-gray-900 h-full rounded w-1/2 xl:w-1/3">
                                <span className="uppercase text-xs text-gray-300 font-bold p-2 bg-gray-800 rounded-t px-2">
                                    Available Handlers{" "}
                                </span>
                                <div className="flex flex-col h-full overflow-y-scroll p-2">
                                    {itemSelected.eventHandlers.length > 0 &&
                                        renderAvailableHandlers()}
                                    {itemSelected.eventHandlers.length ===
                                        0 && (
                                        <div className="flex flex-col text-yellow-600 font-bold p-4">
                                            No available Handlers found.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-900 h-full rounded w-1/2 xl:w-1/3">
                                <span className="uppercase text-xs text-gray-300 font-bold p-2 bg-gray-800 rounded-t px-2">
                                    Available Events{" "}
                                </span>
                                <div className="flex flex-col h-full overflow-y-scroll p-2">
                                    {eventHandlerSelected !== null &&
                                        renderAvailableEvents()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    );
};
