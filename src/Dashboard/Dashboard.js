import React, { useState, useEffect, useContext } from "react";
import { MainMenu, MenuSlideOverlay } from "@dash/Menu";
import { LayoutContainer } from "@dash/Layout";
import { withPlugins } from "@dash/Plugin/Plugin";
import { ButtonIcon } from "@dash/Common";
import { LayoutBuilder } from "@dash/Layout";
import { DashboardContext, AppContext, ThemeContext } from "@dash/Context";
import { deepCopy } from "@dash/Utils";
import { LayoutModel } from "@dash/Models";
import { AddMenuItemModal, DashboardMenuItem } from "@dash/Menu";
import { ThemeManagerModal } from "@dash/Theme";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DashboardHeader, DashboardFooter } from "@dash/Dashboard";
import { PanelWelcome } from "./Panel/PanelWelcome";

// import Notification from "../../Dashboard/common/Notification";
import { ApplicationSettingsModal } from "./Modal/ApplicationSettingsModal";

export const Dashboard = ({ workspace = null, preview = true }) => {
    const { api, settings, creds } = useContext(AppContext);
    const { pub } = useContext(DashboardContext);
    const { currentTheme, changeCurrentTheme, themesForApplication } =
        useContext(ThemeContext);

    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [isShowing, setIsShowing] = useState(false);
    const [selectedMainItem, setSelectedMainItem] = useState({
        name: "home",
        id: 1,
    });
    const [previewMode, setPreviewMode] = useState(preview);

    // Workspace Management (loading)
    const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
    const [isLoadingMenuItems, setIsLoadingMenuItems] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [workspaceConfig, setWorkspaceConfig] = useState([]);

    // Add Menu Item Modal
    const [isAddItemModalOpen, setIsAddWidgetModalOpen] = useState(false);
    const [isThemeManagerOpen, setIsThemeManagerOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log("DASHBOARD ", menuItems, api, settings, workspaceConfig);
        isLoadingWorkspaces === false && loadWorkspaces();
        isLoadingMenuItems === false && loadMenuItems();
    }, [workspace]);

    useEffect(() => {
        // forceUpdate();
    }, [themesForApplication]);

    useEffect(() => {
        console.log("dashboard settings ", settings);
        if (!settings) {
            setIsSettingsModalOpen(true);
        }
    }, [settings]);

    // useEffect(() => {
    //     console.log(menuItems);
    //     if (menuItems.length === 0 && isLoadingMenuItems === false) {
    //         setIsAddWidgetModalOpen(true);
    //     }
    // }, [menuItems]);

    // function handleListenWorkspaceChange(message) {
    //     console.log('workspace changed message ', message);
    // }

    function loadWorkspaces() {
        setIsLoadingWorkspaces(true);

        // api.removeAllListeners();
        api.on(
            api.events.WORKSPACE_LIST_COMPLETE,
            handleLoadWorkspacesComplete
        );
        api.on(api.events.WORKSPACE_LIST_ERROR, handleLoadWorkspacesError);

        // API
        api.workspace.listWorkspacesForApplication(creds.appId);
    }

    function handleLoadWorkspacesComplete(e, message) {
        // let's make sure we have the entire component configuration for each item?
        const workspaces = deepCopy(message["workspaces"]);
        const workspacesTemp = workspaces.map((ws) => {
            // const layout = ws['layout'];
            const tempLayout = ws["layout"].map((layoutOG) => {
                return LayoutModel(layoutOG, ws, ws["id"]);
            });
            ws["layout"] = tempLayout;
            return ws;
        });

        // test the emit
        pub.pub("dashboard.workspaceChange", { workspaces: workspacesTemp });

        setWorkspaceConfig(() => workspacesTemp);
    }

    function handleLoadWorkspacesError(e, message) {
        setWorkspaceConfig({});
    }

    function handleClickMainMenu(menuItem) {
        console.log("clicked ", menuItem, selectedMainItem);
        if (selectedMainItem === null) {
            setSelectedMainItem(() => menuItem);
        } else {
            if (menuItem.id === selectedMainItem.id) {
                setSelectedMainItem(null);
            } else {
                setSelectedMainItem(() => menuItem);
            }
        }

        if (!isShowing && menuItem.name !== "home") {
            setIsShowing(!isShowing);
        }
    }

    // Sub Menu
    // The user has chosen a workspace and we need to load that workspace data
    // into the workspace component.
    function handleClick(workspaceItem) {
        console.log("workspace change? ", workspaceItem);
        pub.removeAllListeners();
        setWorkspaceSelected(() => workspaceItem);
        setIsShowing(() => false);
    }

    function handleClickNew(workspaceItem) {
        console.log("clicked add new ", workspaceItem, previewMode);
        setPreviewMode(() => false);
        setWorkspaceSelected(() => workspaceItem);
    }

    function handleWorkspaceChange(ws) {
        console.log(" dashboard workspace change", ws);
        if (ws) setWorkspaceSelected(() => ws);
        loadWorkspaces();
        pub.removeAllListeners();
    }

    function renderComponent(workspaceItem) {
        try {
            if (workspaceItem !== undefined) {
                return (
                    <LayoutBuilder
                        dashboardId={workspaceItem["id"]}
                        preview={previewMode}
                        workspace={workspaceItem}
                        onWorkspaceChange={handleWorkspaceChange} // for when we save a workspace change! fetch new ones!
                        onTogglePreview={() => setPreviewMode(!previewMode)}
                    />
                );
            }
            return null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function renderMenuItems() {
        return (
            menuItems !== undefined &&
            menuItems.length > 0 &&
            menuItems.map((menuItem, index) => {
                const selected =
                    selectedMainItem !== null
                        ? selectedMainItem.id === menuItem.id
                        : false;
                return (
                    <DashboardMenuItem
                        key={`menu-item-${menuItem.id}`}
                        id={menuItem.id}
                        icon={menuItem.icon}
                        item={menuItem}
                        name={menuItem.name}
                        onClick={() => handleClickMainMenu(menuItem)}
                        selected={selected}
                        theme={currentTheme}
                    />
                );
            })
        );
    }

    function handleAddNewMenuItem() {
        setIsAddWidgetModalOpen(true);
    }

    function loadMenuItems() {
        setIsLoadingMenuItems(() => true);
        // we have to remove the widgetConfig which contains the component
        // sanitize the workspace layout remove widgetConfig items
        // api.removeAllListeners();
        api.on(api.events.MENU_ITEMS_LIST_COMPLETE, handleListMenuItemComplete);
        api.on(api.events.MENU_ITEMS_LIST_ERROR, handleListMenuItemError);

        api.menuItems.listMenuItems(creds.appId);
    }

    function handleListMenuItemComplete(e, message) {
        setMenuItems(() => message.menuItems);
        setIsLoadingMenuItems(() => false);
        if (message.menuItems.length === 0) setIsAddWidgetModalOpen(true);
        forceUpdate();
    }

    function handleListMenuItemError(e, message) {
        setMenuItems(() => []);
        setIsLoadingMenuItems(() => false);
    }

    function handleSaveNewMenuItem(menuItem) {
        // we have to remove the widgetConfig which contains the component
        // sanitize the workspace layout remove widgetConfig items
        api.removeAllListeners();
        api.on(api.events.MENU_ITEMS_SAVE_COMPLETE, handleSaveMenuItemComplete);
        api.on(api.events.MENU_ITEMS_SAVE_ERROR, handleSaveMenuItemError);
        api.menuItems.saveMenuItem(creds.appId, menuItem);
    }

    function handleSaveMenuItemComplete(e, message) {
        setIsAddWidgetModalOpen(false);
        loadMenuItems();
    }

    function handleSaveMenuItemError(e, message) {
        console.log(e, message);
    }

    function handleWorkspaceMenuChange() {
        console.log("reload the workspaces!");
        loadWorkspaces();
    }

    function handleWorkspaceNameChange(name) {
        console.log("workspace name change ", name);
        const tempWorkspace = deepCopy(workspaceSelected);
        tempWorkspace["name"] = name;
        setWorkspaceSelected(() => tempWorkspace);
    }

    function handleClickSaveWorkspace() {
        console.log("dashboard clicked save workspace ", workspaceSelected);
        // we have to remove the widgetConfig which contains the component
        // sanitize the workspace layout remove widgetConfig items
        const workspaceToSave = JSON.parse(JSON.stringify(workspaceSelected));
        const layout = workspaceToSave["layout"].map((layoutItem) => {
            delete layoutItem["widgetConfig"];
            delete layoutItem["api"];
            return layoutItem;
        });
        workspaceToSave["layout"] = layout;

        api.removeAllListeners();
        api.on(api.events.WORKSPACE_SAVE_COMPLETE, handleSaveWorkspaceComplete);
        api.on(api.events.WORKSPACE_SAVE_ERROR, handleSaveWorkspaceError);

        api.workspace.saveWorkspaceForApplication(creds.appId, workspaceToSave);
    }

    function handleSaveWorkspaceComplete(e, message) {
        console.log("handle save complete ", e, message);
        // setPreviewMode(true);
        // onTogglePreview();
        // onWorkspaceChange();
        handleWorkspaceChange(workspaceSelected);
        setPreviewMode(() => true);
    }

    function handleSaveWorkspaceError(e, message) {
        console.log(e, message);
    }

    function handleOpenThemeManager() {
        setIsThemeManagerOpen(true);
    }

    return (
        menuItems &&
        currentTheme && (
            <LayoutContainer
                className={
                    "flex flex-row h-full p-0 overflow-hidden w-full space-x-0"
                }
                height="h-full"
                width="w-full"
                direction="row"
                scrollable={false}
                space={false}
            >
                <DndProvider backend={HTML5Backend}>
                    <div
                        className={`flex flex-col space-y-1 ${currentTheme["bg-secondary-very-dark"]} p-2 items-center} h-full z-40 justify-between`}
                    >
                        <div className="flex flex-col">
                            <div className="w-10 h-10 items-center justify-center">
                                <ButtonIcon
                                    icon="home"
                                    onClick={() => setWorkspaceSelected(null)}
                                />
                            </div>
                            {menuItems && renderMenuItems()}
                        </div>
                        <div className="flex flex-col">
                            <div className="w-10 h-10 items-center justify-center">
                                <ButtonIcon
                                    icon="plus"
                                    onClick={handleAddNewMenuItem}
                                    hoverBackgroundColor={"hover:bg-green-700"}
                                />
                            </div>
                            <div className="w-10 h-10 items-center justify-center">
                                <ButtonIcon
                                    icon="palette"
                                    onClick={handleOpenThemeManager}
                                    hoverBackgroundColor={"hover:bg-orange-700"}
                                />
                            </div>
                            <div className="w-10 h-10 items-center justify-center">
                                <ButtonIcon
                                    icon="computer"
                                    onClick={() => setIsSettingsModalOpen(true)}
                                    hoverBackgroundColor={"hover:bg-orange-700"}
                                />
                            </div>
                        </div>
                    </div>
                    {workspaceSelected !== null && (
                        <div className="flex flex-col h-full w-full justify-between">
                            <DashboardHeader
                                workspace={workspaceSelected}
                                preview={previewMode}
                                onNameChange={handleWorkspaceNameChange}
                            />
                            <div className="flex flex-col w-full h-full overflow-y-scroll">
                                {renderComponent(workspaceSelected)}
                            </div>
                            <DashboardFooter
                                onClickEdit={() => setPreviewMode(!previewMode)}
                                workspace={workspaceSelected}
                                preview={previewMode}
                                onSaveChanges={handleClickSaveWorkspace}
                            />
                        </div>
                    )}
                    {workspaceSelected === null && (
                        <PanelWelcome
                            menuItems={menuItems}
                            workspaces={workspaceConfig}
                            onClickWorkspace={handleClick}
                            onClickCreateMenuItem={() =>
                                setIsAddWidgetModalOpen(true)
                            }
                        />
                    )}
                    <MenuSlideOverlay
                        workspaces={workspaceConfig}
                        open={isShowing}
                        setOpen={setIsShowing}
                        selectedMainItem={selectedMainItem}
                        handleClick={handleClick}
                    >
                        <MainMenu
                            menuItems={menuItems}
                            workspaces={workspaceConfig}
                            onClickNew={handleClickNew}
                            onClick={handleClick}
                            selectedMainItem={selectedMainItem}
                            onWorkspaceMenuChange={handleWorkspaceMenuChange}
                        />
                    </MenuSlideOverlay>

                    <AddMenuItemModal
                        open={isAddItemModalOpen}
                        setIsOpen={() =>
                            setIsAddWidgetModalOpen(!isAddItemModalOpen)
                        }
                        onSave={handleSaveNewMenuItem}
                    />

                    <ThemeManagerModal
                        open={isThemeManagerOpen}
                        setIsOpen={() =>
                            setIsThemeManagerOpen(!isThemeManagerOpen)
                        }
                        onSave={(themeKey) => {
                            console.log("saving and changing", themeKey);
                            changeCurrentTheme(themeKey);
                            setIsThemeManagerOpen(() => false);
                            forceUpdate();
                        }}
                    />

                    <ApplicationSettingsModal
                        open={isSettingsModalOpen}
                        setIsOpen={setIsSettingsModalOpen}
                        workspaces={workspaceConfig}
                    />
                </DndProvider>
            </LayoutContainer>
        )
    );
};
