import React, { useState, useEffect, useContext, Profiler } from "react";
import { LayoutContainer } from "@dash/Layout";
import { LayoutBuilder } from "@dash/Layout";
import {
    DashboardContext,
    ThemeContext,
    DashboardWrapper,
} from "@dash/Context";
import { deepCopy } from "@dash/Utils";
import { LayoutModel } from "@dash/Models";
import { AddMenuItemModal } from "@dash/Menu";
import { ThemeManagerModal } from "@dash/Theme";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DashboardHeader, DashboardFooter } from "@dash/Dashboard";
import { PanelWelcome } from "./Panel/PanelWelcome";
import { WorkspaceModel, MenuItemModel } from "../Models";

// import { LayoutManagerModal } from "@dash/Layout";

// import Notification from "../../Dashboard/common/Notification";
import { ApplicationSettingsModal } from "./Modal/ApplicationSettingsModal";
import { DashboardLoaderModal } from "./Modal/DashboardLoaderModal";
import { LayoutBuilderWidgetConfigPanel } from "@dash/Layout/Builder/LayoutBuilderWidgetConfigPanel";

export const Dashboard = ({
    dashApi, // use this API for the Dashboard (JS|Electron)
    credentials,
    workspace = null,
    preview = true,
    backgroundColor = null,
}) => {
    // const { api, settings, creds } = useContext(AppContext);
    const { pub } = useContext(DashboardContext);

    /**
     * ThemeContext
     */
    const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);

    const [workspaceSelected, setWorkspaceSelected] = useState(
        null //WorkspaceModel(workspace)
    );
    const [isShowing, setIsShowing] = useState(false);
    const [selectedMainItem, setSelectedMainItem] = useState({
        name: "home",
        id: 1,
    });

    /**
     * @param {Boolean} previewMode this is a toggle telling the dash we are editing
     */
    const [previewMode, setPreviewMode] = useState(preview);

    /**
     * @param {String["layout", "workspace", "widget"]} editMode this is the actual mode we are in
     */
    const [editMode, setEditMode] = useState("all"); // for the time being use "all" as our "old" way


    // Workspace Management (loading)
    const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
    const [isLoadingMenuItems, setIsLoadingMenuItems] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [workspaceConfig, setWorkspaceConfig] = useState([]);

    // Add Menu Item Modal
    const [isAddItemModalOpen, setIsAddWidgetModalOpen] = useState(false);
    const [isThemeManagerOpen, setIsThemeManagerOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isDashboardLoaderOpen, setIsDashboardLoaderOpen] = useState(false);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log(
            "DASHBOARD ",
            menuItems,
            dashApi,
            pub,
            // settings,
            workspaceConfig,
            workspaceSelected,
            workspace
        );
        console.log("dashboard use effect", workspaceSelected, workspace);
        isLoadingWorkspaces === false && loadWorkspaces();
        isLoadingMenuItems === false && loadMenuItems();
    }, [workspace]);

    // useEffect(() => {
    //     forceUpdate();
    // }, [workspaceConfig]);

    // useEffect(() => {
    //     // forceUpdate();
    // }, [themesForApplication]);

    // useEffect(() => {
    //     console.log("dashboard settings ", settings);
    //     if (!settings) {
    //         console.log("loading settings");
    //         setIsSettingsModalOpen(true);
    //     }
    // }, [settings]);

    function loadWorkspaces() {
        try {
            console.log("1. Loading Workspaces =========================");
            setIsLoadingWorkspaces(() => true);

            if (dashApi && credentials) {
                dashApi.listWorkspaces(
                    credentials.appId,
                    handleLoadWorkspacesComplete,
                    handleLoadWorkspacesError
                );
            }
        } catch (e) {
            console.log("failed loadWorkspaces ", e.message);
        }
    }

    function handleLoadWorkspacesComplete(e, message) {
        // console.log(
        //     "2. Handle Load Workspaces Complete ======================",
        //     message
        // );
        try {
            // let's make sure we have the entire component configuration for each item?
            const workspaces = deepCopy(message["workspaces"]);
            const workspacesTemp = workspaces.map((ws) => {
                // const layout = ws['layout'];
                // push the LayoutModel back into the Widget here... (inflate)
                const tempLayout = ws["layout"].map((layoutOG) => {
                    //console.log("layout OG ", layoutOG);
                    return LayoutModel(layoutOG, workspaces, ws["id"]); //workspaces);
                });
                ws["layout"] = tempLayout;
                return WorkspaceModel(ws);
            });

            // test the emit
            // pub.pub("dashboard.workspaceChange", {
            //     workspaces: workspacesTemp,
            // });

            setWorkspaceConfig(() => workspacesTemp);
            setIsLoadingWorkspaces(false);
            forceUpdate();
        } catch (e) {
            console.log("handle load workspaces complete ERROR", e.message);
        }
    }

    function handleLoadWorkspacesError(e, message) {
        setWorkspaceConfig([]);
    }
    // Sub Menu
    // The user has chosen a workspace and we need to load that workspace data
    // into the workspace component.
    function handleClick(workspaceItem) {
        console.log(
            "3. workspace change from PanelWelcome Click ==================",
            workspaceItem
        );
        // pub.removeAllListeners();
        setWorkspaceSelected(() => workspaceItem);
        setIsShowing(() => false);
    }

    function handleClickNew(workspaceItem) {
        try {
            console.log("clicked add new ", workspaceItem, previewMode);
            setPreviewMode(() => false);
            setWorkspaceSelected(() => workspaceItem);
        } catch (e) {
            console.log("handle click new ", e);
        }
    }

    function handleWorkspaceChange(ws) {
        console.log(" dashboard workspace change", ws);
        if (ws) {
            setPreviewMode(() => false);
            setWorkspaceSelected(() => null);
            setWorkspaceSelected(() => WorkspaceModel(ws));
        }
    }

    function renderComponent(workspaceItem) {
        try {
            return workspaceItem !== undefined ? (
                <LayoutBuilder
                    dashboardId={workspaceItem["id"]}
                    preview={previewMode}
                    workspace={workspaceItem}
                    onWorkspaceChange={handleWorkspaceChange} // for when we save a workspace change! fetch new ones!
                    onTogglePreview={() => setPreviewMode(!previewMode)}
                    key={`LayoutBuilder-${workspaceItem["id"]}`}
                    editMode={editMode}
                />
            ) : null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function handleAddNewMenuItem() {
        setIsAddWidgetModalOpen(true);
    }

    function loadMenuItems() {
        try {
            console.log("loading menu items", credentials);
            setIsLoadingMenuItems(() => true);
            // we have to remove the widgetConfig which contains the component
            // sanitize the workspace layout remove widgetConfig items
            if (dashApi && credentials) {
                dashApi.listMenuItems(
                    credentials.appId,
                    handleListMenuItemComplete,
                    handleListMenuItemError
                );
            }
        } catch (e) {
            console.log("Error loading menu items", e.message);
        }
    }

    function handleListMenuItemComplete(e, message) {
        try {
            console.log("list menu items complete ", message);
            setMenuItems(() => message.menuItems);
            setIsLoadingMenuItems(() => false);
            if (message.menuItems.length === 0) setIsAddWidgetModalOpen(true);
            forceUpdate();
        } catch (e) {
            console.log("handle list menu items error ", e.message);
        }
    }

    function handleListMenuItemError(e, message) {
        setMenuItems(() => []);
        setIsLoadingMenuItems(() => false);
    }

    function handleSaveNewMenuItem(menuItem) {
        // we have to remove the widgetConfig which contains the component
        // sanitize the workspace layout remove widgetConfig items

        if (dashApi && credentials) {
            dashApi.saveMenuItem(
                credentials.appId,
                MenuItemModel(menuItem),
                handleSaveMenuItemComplete,
                handleSaveMenuItemError
            );
        }
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
        try {
            console.log("dashboard clicked save workspace ", workspaceSelected);
            // we have to remove the widgetConfig which contains the component
            // sanitize the workspace layout remove widgetConfig items
            const workspaceToSave = deepCopy(workspaceSelected); //JSON.parse(JSON.stringify(workspaceSelected));
            const layout = workspaceToSave["layout"].map((layoutItem) => {
                delete layoutItem["widgetConfig"];
                // delete layoutItem["api"];
                return layoutItem;
            });
            workspaceToSave["layout"] = layout;

            // lets set a version so that we can compare...
            workspaceToSave["version"] = Date.now();

            if (dashApi && credentials) {
                dashApi.saveWorkspace(
                    credentials.appId,
                    workspaceToSave,
                    handleSaveWorkspaceComplete,
                    handleSaveWorkspaceError
                );
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    function handleSaveWorkspaceComplete(e, message) {
        console.log("handle save complete ", e, message);
        // setPreviewMode(true);
        // onTogglePreview();
        // onWorkspaceChange();
        // changeThemesForApplication(message['workspace'])

        // Set the overall workspaces.
        // test the emit
        pub.pub("dashboard.workspaceChange", {
            workspaces: message["workspaces"],
        });

        setWorkspaceConfig(() => message["workspaces"]);
        setIsLoadingWorkspaces(false);

        handleWorkspaceChange(workspaceSelected);
        setPreviewMode(() => true);
    }

    function handleSaveWorkspaceError(e, message) {
        console.log(e, message);
    }

    function handleOpenThemeManager() {
        setIsThemeManagerOpen(true);
    }

    // function handleSelectLoadDashboard(dashboardSelected) {
    //     console.log(dashboardSelected);
    // }

    function handleSelectLoadDashboard(dashboardSelected) {
        try {
            // if (dashboardSelected === undefined) {
            //     selectedMainItem = 1;
            // } else {
            //     selectedMainItem = data.id;
            // }

            // if we have no data, we have to create a layout
            // const newLayout = {
            //     id: 1,
            //     order: 1,
            //     direction: "col",
            //     width: "w-full",
            //     component: "Container",
            //     hasChildren: 1,
            //     scrollable: false,
            //     parent: 0,
            //     menuId: selectedMainItem, // default menu item id is 1
            // };

            const newLayout = dashboardSelected.layout;
            const workspaceItem = new WorkspaceModel({ layout: newLayout });

            console.log("clicked load workspace item", workspaceItem);
            setPreviewMode(() => false);
            setWorkspaceSelected(() => workspaceItem);
            setIsDashboardLoaderOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    function handleCloseDashboardLoader() {
        setIsDashboardLoaderOpen(false);
    }

    {
        /* <LayoutManagerModal
                            open={isThemeManagerOpen}
                            setIsOpen={() =>
                                setIsThemeManagerOpen(!isThemeManagerOpen)
                            }
                        /> */
    }

    return (
        <Profiler id="myapp">
        <DashboardWrapper
            dashApi={dashApi}
            credentials={credentials}
            backgroundColor={backgroundColor}
        >
            {menuItems && (
                <LayoutContainer
                    padding={false}
                    space={true}
                    height="h-full"
                    width="w-full"
                    direction="row"
                    scrollable={false}
                    grow={true}
                >
                    <DndProvider backend={HTML5Backend}>
                        {workspaceSelected !== null && (
                            <LayoutContainer
                                padding={false}
                                space={true}
                                height="h-full"
                                width="w-full"
                                direction="col"
                                scrollable={false}
                                grow={true}
                            >
                                {workspaceSelected !== null && (
                                    <DashboardHeader
                                        workspace={workspaceSelected}
                                        preview={previewMode}
                                        onNameChange={handleWorkspaceNameChange}
                                    />
                                )}
                                <div
                                    className={`flex flex-col w-full h-full ${
                                        previewMode === true
                                            ? "overflow-y-auto"
                                            : "overflow-clip"
                                    }`}
                                >
                                    {workspaceSelected !== null
                                        ? renderComponent(workspaceSelected)
                                        : null}
                                </div>
                                {workspaceSelected !== null && (
                                    <DashboardFooter
                                        onClickEdit={() =>
                                            setPreviewMode(!previewMode)
                                        }
                                        workspace={workspaceSelected}
                                        preview={previewMode}
                                        editMode={editMode}
                                        onSaveChanges={handleClickSaveWorkspace}
                                        onNewMenuItem={handleAddNewMenuItem}
                                        onOpenThemeManager={
                                            handleOpenThemeManager
                                        }
                                        onHome={() =>
                                            setWorkspaceSelected(null)
                                        }
                                        onOpenSettings={() =>
                                            setIsSettingsModalOpen(true)
                                        }
                                        onChangeEditMode={(mode) => setEditMode(mode)}
                                    />
                                )}
                            </LayoutContainer>
                        )}

                        {workspaceSelected === null && workspaceConfig && (
                            <PanelWelcome
                                menuItems={menuItems}
                                workspaces={workspaceConfig}
                                onClickWorkspace={handleClick}
                                onClickCreateMenuItem={() =>
                                    setIsAddWidgetModalOpen(true)
                                }
                                onNewMenuItem={handleAddNewMenuItem}
                                onOpenThemeManager={handleOpenThemeManager}
                                onHome={() => setWorkspaceSelected(null)}
                                onOpenSettings={() =>
                                    setIsSettingsModalOpen(true)
                                }
                                //onClickNew={handleClickNew}
                                onClickNewWorkspace={handleClickNew}
                                selectedMainItem={selectedMainItem}
                                onOpenDashboardLoader={() =>
                                    setIsDashboardLoaderOpen(true)
                                }
                            />
                        )}

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

                        <DashboardLoaderModal
                            open={isDashboardLoaderOpen}
                            setIsOpen={setIsDashboardLoaderOpen}
                            workspaces={workspaceConfig}
                            onSelecDashboard={handleSelectLoadDashboard}
                            onClose={() => handleCloseDashboardLoader()}
                        />

                    </DndProvider>
                </LayoutContainer>
            )}
        </DashboardWrapper>
        </Profiler>
    );
};
