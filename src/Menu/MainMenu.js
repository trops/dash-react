import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "@dash/Common/WrappedComponent";
import { MainMenuItem } from "@dash/Menu";
import { ButtonIcon } from "@dash/Common";

// Drag
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "@dash/Context";
import { deepCopy } from "@dash/Utils";
import { InputText } from "@dash/Common/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context";

const MainMenuConst = ({
    onClick = null,
    active,
    menuItems,
    workspaces,
    selectedMainItem = null,
    onWorkspaceMenuChange,
}) => {
    const { api, creds } = useContext(AppContext);
    const { currentTheme } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * useEffect
     * We can use the useEffect lifecycle to load the init for the plugins
     * and any other methods
     */
    useEffect(() => {
        setSearchTerm("");
    }, [active, selectedMainItem]);

    function handleClickMenuItem(ws) {
        onClick && onClick(ws);
    }

    function renderWorkspaces(workspaces) {
        // We need to do this TWICE...
        // Once for the items that have a organized folder,
        // and once for the ones that do NOT....

        return (
            workspaces &&
            menuItems
                // .filter(mi => searchTerm !== '' ? true : (selectedMainItem !== null ? mi.id === selectedMainItem.id : true))
                .filter((mi) => (searchTerm !== "" ? true : true))
                .map((menuItem) => {
                    // let's check to see if the user has applied any filters...
                    const folderSelected =
                        selectedMainItem !== null
                            ? menuItem.id === selectedMainItem.id
                            : false;
                    return (
                        <div
                            className={`${folderSelected && "rounded"}`}
                            key={`menu-item-${menuItem.id}`}
                        >
                            <div
                                className={`flex flex-row justify-between border-b ${currentTheme["border-secondary-medium"]} mb-2 p-2`}
                            >
                                <div className="flex flex-row text-xs items-center">
                                    <FontAwesomeIcon icon={menuItem.icon} />
                                    <span className="p-2 uppercase font-bold">
                                        {menuItem.name}
                                    </span>
                                </div>
                                <ButtonIcon
                                    icon="plus"
                                    textSize={"text-xs"}
                                    onClick={() => handleCreateNew(menuItem)}
                                />
                            </div>
                            <div className="flex flex-col pb-4 space-y-1">
                                {workspaces
                                    .filter(
                                        (w) =>
                                            "menuId" in w &&
                                            w.menuId === menuItem.id
                                    )
                                    .filter((ws) =>
                                        searchTerm !== ""
                                            ? ws.name
                                                  .toLowerCase()
                                                  .includes(
                                                      searchTerm.toLowerCase()
                                                  )
                                            : true
                                    )
                                    .map((ws) => (
                                        <MainMenuItem
                                            highlight={searchTerm !== ""}
                                            id={ws.id}
                                            name={ws.name}
                                            key={`main-menu-item-ws-${ws.id}`}
                                            onClick={(e) =>
                                                handleClickMenuItem(ws)
                                            }
                                            title={ws.name}
                                            onDropItem={(e) =>
                                                handleDropMenuItem(e)
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    );
                })
        );
    }

    function renderOrphanedWorkspaces(workspaces) {
        // We need to do this TWICE...
        // Once for the items that have a organized folder,
        // and once for the ones that do NOT....

        return (
            workspaces && (
                <div key={`menu-item-orphan`}>
                    {selectedMainItem === null && (
                        <div
                            className={`flex flex-row justify-between border-b border-blue-700 mb-2 p-2 ${currentTheme["textSecondary"]}`}
                        >
                            <div className="flex flex-row text-xs items-center">
                                <FontAwesomeIcon icon={"folder"} />
                                <span className="p-2 uppercase font-bold">
                                    Uncategorized
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col pb-4 space-y-1">
                        {workspaces
                            .filter((mi) =>
                                searchTerm !== ""
                                    ? true
                                    : selectedMainItem !== null
                                    ? mi.menuId === selectedMainItem.id
                                    : true
                            )
                            .filter((w) => workspaceIsOrphan(w) === true)
                            .filter((ws) =>
                                searchTerm !== ""
                                    ? ws.name
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase())
                                    : true
                            )
                            .map((ws) => (
                                <MainMenuItem
                                    highlight={searchTerm !== ""}
                                    id={ws.id}
                                    name={ws.name}
                                    key={`main-menu-item-ws-${ws.id}`}
                                    onClick={(e) => handleClickMenuItem(ws)}
                                    title={ws.name}
                                    onDropItem={(e) => handleDropMenuItem(e)}
                                />
                            ))}
                    </div>
                </div>
            )
        );
    }

    /**
     * workspaceIsOrphan
     * Check to see if the menuItem that is associated with the workspace no longer exists.
     * @param {Object} workspaceToCheck
     */
    function workspaceIsOrphan(workspaceToCheck) {
        return (
            menuItems.filter((menuItem) => {
                return menuItem.id === workspaceToCheck.menuId;
            }).length === 0
        );
    }

    function handleDropMenuItem(dropData) {
        const { workspaceId, menuItemId } = dropData;

        let workspaceSelected = null;
        const workspaceArray = workspaces.filter((ws) => ws.id === workspaceId);
        if (workspaceArray.length > 0) {
            workspaceSelected = workspaceArray[0];
        }

        if (workspaceSelected) {
            const newWorkspace = deepCopy(workspaceSelected);
            // we have to update the workspace menu id
            newWorkspace["menuId"] = menuItemId;

            api.removeAllListeners();
            api.on(
                api.events.WORKSPACE_SAVE_COMPLETE,
                handleSaveWorkspaceComplete
            );
            api.on(api.events.WORKSPACE_SAVE_ERROR, handleSaveWorkspaceError);

            api.workspace.saveWorkspaceForApplication(
                creds.appId,
                newWorkspace
            );
        }
    }

    function handleSaveWorkspaceComplete(e, message) {
        onWorkspaceMenuChange();
    }

    function handleSaveWorkspaceError(e, message) {}

    function handleCreateNew(menuItem) {
        const newLayout = [
            {
                id: 1,
                order: 1,
                direction: "col",
                width: "w-full",
                component: "Container",
                hasChildren: 1,
                scrollable: true,
                parent: 0,
                menuId: selectedMainItem["id"],
            },
        ];

        onClick &&
            onClick({
                id: Date.now(),
                name: "New Workspace",
                label: "New",
                type: selectedMainItem,
                layout: newLayout,
                menuId: menuItem["id"],
            });
    }

    function handleChangeSearch(e) {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="flex flex-col min-w-64 w-64 h-screen">
            <div className="flex flex-col space-y-2 w-full h-full">
                <div className="flex flex-row justify-between">
                    <InputText
                        name="search-workspaces"
                        value={searchTerm}
                        placeholder="Search Workspaces"
                        onChange={handleChangeSearch}
                        textSize="text-sm"
                    />
                </div>
                <div className="flex flex-col pb-4 overflow-y-scroll h-full space-y-2">
                    <DndProvider backend={HTML5Backend}>
                        {renderWorkspaces(workspaces)}
                        {renderOrphanedWorkspaces(workspaces)}
                    </DndProvider>
                </div>
            </div>
        </div>
    );
};
const MainMenu = withRouter(MainMenuConst);

export { MainMenu };
