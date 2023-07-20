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
import { LayoutContainer } from "..";

const MainMenuConst = ({
    onClickNewWorkspace = null,
    onCreateNewFolder,
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
                                className={`flex flex-row justify-between border-b ${currentTheme["border-secondary-medium"]} mb-2 py-2 pl-2`}
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
                                    padding={false}
                                    onClick={() => handleCreateNew(menuItem)}
                                    className="hover:bg-green-500"
                                />
                            </div>
                            <div className="flex flex-col pb-4 space-y-1">
                                {workspaces
                                    .sort(function (a, b) {
                                        return a["name"]
                                            .toLowerCase()
                                            .localeCompare(
                                                b["name"].toLowerCase()
                                            );
                                    })
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
                });

        return m;
    }

    function renderOrphanedWorkspaces(workspaces) {
        // We need to do this TWICE...
        // Once for the items that have a organized folder,
        // and once for the ones that do NOT....

        return (
            currentTheme &&
            workspaces && (
                <div key={`menu-item-orphan`}>
                    <div
                        className={`flex flex-row justify-between border-b border-gray-700 mb-2 py-2 ${currentTheme["textSecondary"]}`}
                    >
                        <div className="flex flex-row text-xs items-center">
                            <FontAwesomeIcon icon={"folder"} />
                            <span className="p-2 uppercase font-bold">
                                Uncategorized
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col pb-4 space-y-1">
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
                            .sort(function (a, b) {
                                console.log(a["name"], b["name"]);
                                return a["name"] - b["name"];
                            })
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
        console.log("handle drop menu item ", dropData);
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

            // api.removeAllListeners();
            // api.on(
            //     api.events.WORKSPACE_SAVE_COMPLETE,
            //     handleSaveWorkspaceComplete
            // );
            // api.on(api.events.WORKSPACE_SAVE_ERROR, handleSaveWorkspaceError);

            // api.workspace.saveWorkspaceForApplication(
            //     creds.appId,
            //     newWorkspace
            // );
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
                    <ButtonIcon
                        icon="folder-plus"
                        textSize={"text-xs"}
                        onClick={() => handleCreateNewFolder()}
                        hoverBackgroundColor={"hover:bg-green-500"}
                        backgroundColor={"bg-blue-700"}
                    />
                </div>
                <LayoutContainer
                    direction="col"
                    scrollable={true}
                    space={false}
                >
                    <DndProvider backend={HTML5Backend}>
                        {renderWorkspaces(workspaces)}
                        {renderOrphanedWorkspaces(workspaces)}
                    </DndProvider>
                </LayoutContainer>
            </div>
        </div>
    );
};
const MainMenu = withRouter(MainMenuConst);

export { MainMenu };
