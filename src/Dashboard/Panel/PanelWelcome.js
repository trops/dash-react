import React, { useEffect, useContext } from "react";
import {
    ButtonIcon,
    Panel2,
    Panel3,
    Heading,
    SubHeading3,
    Paragraph3,
    Paragraph2,
    MenuItem,
    Toggle,
} from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PanelWelcome = ({
    menuItems = [],
    workspaces = [],
    onClickWorkspace = null,
    onClickCreateMenuItem = null,
}) => {
    const { theme, currentTheme, changeThemeVariant, themeVariant, themeKey } =
        useContext(ThemeContext);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate();
    }, [theme, currentTheme, forceUpdate]);

    function renderWorkspaces() {
        return workspaces.map((ws) => {
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
        });
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

    return (
        <div
            className={`flex flex-col w-full h-full overflow-hidden items-center justify-center`}
        >
            <div
                className={`flex flex-col w-5/6 h-5/6 overflow-hidden rounded-lg items-center justify-center`}
            >
                <Panel2
                    className={
                        "items-center justify-center border-2 rounded-lg shadow"
                    }
                >
                    <div className="flex flex-col w-full h-full overflow-hidden p-4">
                        <div className="flex flex-row w-full h-full overflow-hidden xl:justify-between xl:space-x-4">
                            <div
                                className={`flex-col h-full rounded font-medium w-full hidden xl:flex xl:w-1/3 p-10 justify-between`}
                            >
                                <div className="flex flex-col rounded py-10 space-y-4">
                                    <Heading title={"Dash."} padding={false} />
                                    <SubHeading3
                                        title={"Dashboard Generator."}
                                        padding={false}
                                    />
                                </div>
                                <div className="flex flex-row space-x-2 items-center">
                                    {theme !== null && theme !== undefined && (
                                        <Paragraph3
                                            text={`${theme["name"]} ${themeVariant}`}
                                            padding={false}
                                        />
                                    )}
                                    <Toggle
                                        enabled={
                                            themeVariant === "dark"
                                                ? true
                                                : false
                                        }
                                        setEnabled={() =>
                                            changeThemeVariant(
                                                themeVariant === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }
                                        text={"Dark"}
                                    />
                                </div>
                            </div>
                            <Panel3
                                className={`flex flex-col h-full rounded xl:rounded-0 w-full lg:w-full p-10`}
                            >
                                <div className="flex flex-row overflow-y-scroll p-2 font-bold mb-4 justify-between items-center">
                                    <SubHeading3
                                        title={`You have ${menuItems.length} folders and ${workspaces.length} Dashboards created.`}
                                        padding={false}
                                    />
                                    <ButtonIcon
                                        icon="plus"
                                        textSize={"text-lg"}
                                        onClick={() => onClickCreateMenuItem()}
                                    />
                                </div>
                                <div className="flex flex-col space-y-4 overflow-y-scroll py-4">
                                    {renderWorkspaces()}
                                </div>
                            </Panel3>
                        </div>
                    </div>
                </Panel2>
            </div>
        </div>
    );
};
