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
} from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutContainer } from "@dash/Layout";

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

    return (
        <div
            className={`flex flex-col w-full h-full overflow-hidden items-center justify-center`}
        >
            <div
                className={`flex flex-col w-5/6 h-5/6 overflow-hidden rounded-lg items-center justify-center`}
            >
                <Panel2>
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
                                scrollable={false}
                                space={true}
                                direction={"col"}
                            >
                                <Panel3.Header>
                                    <Paragraph
                                        text={`You have ${menuItems.length} folders and ${workspaces.length} Dashboards created.`}
                                        padding={false}
                                    />
                                    <ButtonIcon
                                        icon="plus"
                                        textSize={"text-lg"}
                                        onClick={() => onClickCreateMenuItem()}
                                    />
                                </Panel3.Header>
                                <Panel3.Body>
                                    <LayoutContainer
                                        direction="col"
                                        space={false}
                                        className="space-y-1"
                                    >
                                        {renderWorkspaces()}
                                    </LayoutContainer>
                                </Panel3.Body>
                            </Panel3>
                        </div>
                    </div>
                </Panel2>
            </div>
        </div>
    );
};
