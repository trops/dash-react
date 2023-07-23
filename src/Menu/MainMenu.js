import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "@dash/Common/WrappedComponent";

import { MainMenuItem, MainMenuSection } from "@dash/Menu";
import { ButtonIcon } from "@dash/Common";

// Drag
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "@dash/Context";
import { deepCopy } from "@dash/Utils";
import { InputText } from "@dash/Common/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context";
import { LayoutContainer, MenuSlideOverlay } from "..";
import { useDrop } from "react-dnd";

const MainMenuConst = ({
    onClickNewWorkspace = null,
    onCreateNewFolder,
    active,
    menuItems,
    workspaces,
    selectedMainItem = null,
    onWorkspaceMenuChange,
    onClick,
}) => {
    const { dashApi, credentials } = useContext(AppContext);
    const { currentTheme } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");

    // Force Update
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    /**
     * useEffect
     * We can use the useEffect lifecycle to load the init for the plugins
     * and any other methods
     */
    useEffect(() => {
        setSearchTerm("");
    }, [active, selectedMainItem]);

    useEffect(() => {
        forceUpdate();
    }, [workspaces]);

    function handleClickMenuItem(ws) {
        onWorkspaceMenuChange && onWorkspaceMenuChange(ws);
    }

    function handleCreateNewFolder() {
        onCreateNewFolder && onCreateNewFolder();
    }

    function renderWorkspaces(workspaces) {
        // We need to do this TWICE...
        // Once for the items that have a organized folder,
        // and once for the ones that do NOT....
        const m =
            workspaces &&
            menuItems
                .sort(function (a, b) {
                    return a["name"]
                        .toLowerCase()
                        .localeCompare(b["name"].toLowerCase());
                })
                .map((menuItem) => {
                    // let's check to see if the user has applied any filters...
                    // const folderSelected =
                    //     selectedMainItem !== null
                    //         ? menuItem.id === selectedMainItem.id
                    //         : false;
                    return (
                        <MainMenuSection
                            key={`menu-item-${menuItem.id}`}
                            id={menuItem.id}
                            name={menuItem.name}
                            menuItem={menuItem}
                            onCreateNew={handleCreateNew}
                        >
                            {workspaces
                                .sort(function (a, b) {
                                    return a["name"]
                                        .toLowerCase()
                                        .localeCompare(b["name"].toLowerCase());
                                })
                                .filter(
                                    (w) =>
                                        "menuItem" in w &&
                                        w.menuItem.id === menuItem.id
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
                                        menuItem={menuItem}
                                        highlight={searchTerm !== ""}
                                        id={ws.id}
                                        workspaceId={ws.id}
                                        workspaceMenuId={ws.menuId}
                                        name={ws.name}
                                        key={`main-menu-item-ws-${ws.id}`}
                                        onClick={(e) => handleClickMenuItem(ws)}
                                        title={ws.name}
                                        onDropItem={(e) =>
                                            handleDropMenuItem({
                                                workspaceId: ws.id,
                                                menuItemId: e.dropIndex,
                                            })
                                        }
                                    />
                                ))}
                        </MainMenuSection>
                    );
                });

        return m;
    }

    function renderOrphanedWorkspaces(workspaces) {
        // We need to do this TWICE...
        // Once for the items that have a organized folder,
        // and once for the ones that do NOT....

        const menuItem = {
            id: 1,
            name: "Uncategorized",
            icon: "folder",
        };

        return (
            currentTheme &&
            workspaces && (
                <div key={`menu-item-orphan`}>
                    <MainMenuSection
                        key={`menu-item-${menuItem.id}`}
                        id={menuItem.id}
                        name={menuItem.name}
                        menuItem={menuItem}
                        onCreateNew={handleCreateNew}
                    >
                        {workspaces
                            .sort(function (a, b) {
                                return a["name"]
                                    .toLowerCase()
                                    .localeCompare(b["name"].toLowerCase());
                            })
                            .filter((w) => workspaceIsOrphan(w) === true)
                            .filter((ws) =>
                                searchTerm !== ""
                                    ? ws.name
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase())
                                    : true
                            )
                            .sort((a, b) => a["name"] - b["name"])
                            .map((ws) => (
                                <MainMenuItem
                                    highlight={searchTerm !== ""}
                                    menuItem={menuItem}
                                    workspaceId={ws.id}
                                    workspaceMenuId={ws.menuId}
                                    id={ws.id}
                                    name={ws.name}
                                    key={`main-menu-item-ws-${ws.id}`}
                                    onClick={(e) => handleClickMenuItem(ws)}
                                    title={ws.name}
                                    onDropItem={(e) => {
                                        handleDropMenuItem({
                                            workspaceId: ws.id,
                                            menuItemId: e.dropIndex,
                                        });
                                    }}
                                />
                            ))}
                    </MainMenuSection>
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
        try {
            console.log("handle drop menu item ", dropData);
            const { workspaceId, menuItemId } = dropData;

            let workspaceSelected = null;
            const workspaceArray = workspaces.filter(
                (ws) => ws.id === workspaceId
            );

            if (workspaceArray.length > 0) {
                workspaceSelected = workspaceArray[0];
            }

            if (workspaceSelected) {
                const newWorkspace = deepCopy(workspaceSelected);
                // we have to update the workspace menu id
                newWorkspace["menuId"] = menuItemId;

                if (dashApi && credentials) {
                    dashApi.saveWorkspace(
                        credentials.appId,
                        newWorkspace,
                        handleSaveWorkspaceMenuIdComplete,
                        handleSaveWorkspaceError
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    function handleSaveWorkspaceMenuIdComplete(e, message) {
        console.log("workspace save complete ", message);
    }

    function handleSaveWorkspaceComplete(e, message) {
        console.log("workspace save complete ", message);
        onWorkspaceMenuChange();
    }

    function handleSaveWorkspaceError(e, message) {
        console.log(message);
    }

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

        onClickNewWorkspace &&
            onClickNewWorkspace({
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
        <div className="flex flex-col min-w-64 w-full h-full">
            <div className="flex flex-col space-y-2 w-full h-full">
                <div className="flex flex-row justify-between items-center space-x-2">
                    <InputText
                        name="search-workspaces"
                        value={searchTerm}
                        placeholder="Search Dashboards"
                        onChange={handleChangeSearch}
                        textSize="text-lg"
                        className="border-transparent focus:border-transparent focus:ring-0"
                        hasBorder={false}
                    />
                    {/* <ButtonIcon
                        icon="folder-plus"
                        textSize={"text-xs"}
                        onClick={() => handleCreateNewFolder()}
                        hoverBackgroundColor={"hover:bg-green-500"}
                        backgroundColor={"bg-blue-700"}
                    /> */}
                </div>
                <DndProvider backend={HTML5Backend}>
                    <LayoutContainer
                        direction="col"
                        scrollable={true}
                        space={true}
                        className="py-2"
                    >
                        {renderWorkspaces(workspaces)}
                        {renderOrphanedWorkspaces(workspaces)}
                    </LayoutContainer>
                </DndProvider>
            </div>
        </div>
    );
};
const MainMenu = withRouter(MainMenuConst);

export { MainMenu };
