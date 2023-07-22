import React, { useEffect, useContext } from "react";
import {
    ButtonIcon,
    Panel2,
    Panel3,
    Heading,
    SubHeading3,
    Paragraph3,
    Paragraph2,
    Paragraph,
    MenuItem,
    Toggle,
    Tag,
} from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutContainer } from "@dash/Layout";
import { MainMenu } from "@dash/Menu";

export const PanelWelcome = ({
    menuItems = [],
    workspaces = [],
    selectedMainItem = null,
    onClickWorkspace = null,
    onClickNewWorkspace,
    onClickCreateMenuItem = null,
    onNewMenuItem = null,
    onHome = null,
    onOpenThemeManager = null,
    onOpenSettings = null,
    onClickNew = null,
}) => {
    const { theme, currentTheme, changeThemeVariant, themeVariant } =
        useContext(ThemeContext);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log("Panel Welcome use effect", currentTheme);
        forceUpdate();
    }, [theme, currentTheme, forceUpdate]);

    function renderWorkspaces() {
        return (
            workspaces &&
            workspaces.map((ws) => {
                const isOrphan = workspaceIsOrphan(ws);
                const icon = iconForMenuItem(ws.menuId);
                return (
                    <MenuItem
                        key={`workspace-${ws.id}`}
                        onClick={() => onClickWorkspace(ws)}
                    >
                        <Paragraph2 text={ws.name} />
                        {isOrphan === true && (
                            <FontAwesomeIcon icon="folder" className="pr-2" />
                        )}
                        {isOrphan === false && icon !== null && (
                            <FontAwesomeIcon icon={icon} className="pr-2" />
                        )}
                    </MenuItem>
                );
            })
        );
    }

    function workspaceIsOrphan(workspaceToCheck) {
        return (
            menuItems.filter(
                (menuItem) => menuItem.id === workspaceToCheck.menuId
            ).length === 0
        );
    }

    function iconForMenuItem(menuId) {
        try {
            const matches = menuItems.filter(
                (menuItem) =>
                    parseInt(menuItem["id"], 10) === parseInt(menuId, 10)
            );
            return matches.length > 0 ? matches[0]["icon"] : null;
        } catch (e) {
            return null;
        }
    }

    const handleAddNewMenuItem = () => {
        onNewMenuItem && onNewMenuItem();
    };

    const handleOpenThemeManager = () => {
        onOpenThemeManager && onOpenThemeManager();
    };

    const handleOpenSettings = () => {
        onOpenSettings && onOpenSettings();
    };

    const handleHome = () => {
        onHome && onHome();
    };

    const handleClickNewDashboard = () => {
        onClickNew && onClickNew();
    };

    const handleClickNewFolder = () => {};

    const handleClickNewWorkspace = (data) => {
        selectedMainItem && onClickNewWorkspace && onClickNewWorkspace(data);
    };

    const handleClickWorkspace = (data) => {
        onClickWorkspace && onClickWorkspace(data);
    };

    return (
        currentTheme && (
            <div
                className={`flex flex-row w-full h-full overflow-hidden items-center justify-center`}
            >
                <div
                    className={`flex flex-col w-5/6 h-5/6 overflow-hidden rounded-lg items-center justify-center`}
                >
                    <Panel2 horizontal={true} padding={false}>
                        <div
                            className={`flex flex-col space-y-1 p-2 h-full justify-between ${
                                currentTheme &&
                                currentTheme["bg-primary-very-dark"]
                            }`}
                        >
                            {/* <div className="w-10 h-10 items-center justify-center">
                            <ButtonIcon icon="home" onClick={handleHome} />
                        </div> */}
                            <div className="w-10 h-10 items-center justify-center">
                                <ButtonIcon
                                    icon="plus"
                                    onClick={handleClickNewDashboard}
                                    hoverBackgroundColor={"hover:bg-green-700"}
                                    backgroundColor={"bg-blue-600"}
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="w-10 h-10 items-center justify-center">
                                    <ButtonIcon
                                        icon="folder-plus"
                                        onClick={handleAddNewMenuItem}
                                        hoverBackgroundColor={
                                            "hover:bg-green-700"
                                        }
                                    />
                                </div>
                                <div className="w-10 h-10 items-center justify-center">
                                    <ButtonIcon
                                        icon={
                                            themeVariant === "dark"
                                                ? "sun"
                                                : "moon"
                                        }
                                        onClick={() =>
                                            changeThemeVariant(
                                                themeVariant === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-10 h-10 items-center justify-center">
                                    <ButtonIcon
                                        icon="palette"
                                        onClick={handleOpenThemeManager}
                                        hoverBackgroundColor={
                                            "hover:bg-orange-700"
                                        }
                                    />
                                </div>
                                <div className="w-10 h-10 items-center justify-center">
                                    <ButtonIcon
                                        icon="computer"
                                        onClick={handleOpenSettings}
                                        hoverBackgroundColor={
                                            "hover:bg-orange-700"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full h-full overflow-hidden p-4">
                            <div className="flex flex-row w-full h-full overflow-hidden xl:justify-between xl:space-x-4">
                                <div
                                    className={`flex-col h-full rounded font-medium w-full hidden xl:flex xl:w-1/3 p-10 justify-between`}
                                >
                                    <div className="flex flex-col rounded py-10 space-y-4">
                                        <Heading
                                            title={"Dash."}
                                            padding={false}
                                        />
                                        <div className="flex-row hidden 2xl:flex w-full ">
                                            <SubHeading3
                                                title={"Dashboard Generator."}
                                                padding={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-2 items-center">
                                        {theme !== null &&
                                            theme !== undefined && (
                                                <Tag
                                                    text={`${theme["name"]}`}
                                                    onClick={null}
                                                />
                                            )}
                                    </div>
                                </div>
                                <Panel3
                                    scrollable={false}
                                    space={true}
                                    direction={"col"}
                                >
                                    <Panel3.Body>
                                        <LayoutContainer
                                            direction="col"
                                            space={false}
                                            className="space-y-1"
                                            scrollable={true}
                                        >
                                            <MainMenu
                                                menuItems={menuItems}
                                                workspaces={workspaces}
                                                onClickNewWorkspace={
                                                    handleClickNewWorkspace
                                                }
                                                selectedMainItem={
                                                    selectedMainItem
                                                }
                                                onWorkspaceMenuChange={
                                                    onClickWorkspace
                                                }
                                                onCreateNewFolder={
                                                    handleAddNewMenuItem
                                                }
                                            />
                                        </LayoutContainer>
                                    </Panel3.Body>
                                </Panel3>
                            </div>
                        </div>
                    </Panel2>
                </div>
            </div>
        )
    );
};
