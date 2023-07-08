/**
 * Workspace
 *
 * The Workspace is comprised of the Layout, and Widgets that are configured by the User.
 * There may be multiple Workspaces of "Pages" that the user can create by dragging widgets into the Layout,
 * also defined by the user.
 */
import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "../Utils";
import { LayoutContainer } from "@dash/Layout";
import { WorkspaceContext } from "@dash/Context";

export const Workspace = ({
    uuid,
    theme = false,
    workspaceData = null,
    children = null,
    width = "w-full",
    height = "h-auto",
    direction = "col",
    scrollable = false,
    space = false,
    className = "",
    ...props
}) => {
    // const { currentTheme } = useContext(ThemeContext);
    // const styles = getStylesForItem(themeObjects.WORKSPACE, currentTheme, {
    //     ...props,
    //     scrollable,
    //     grow: false,
    //     space,
    //     direction,
    // });

    const uuidString = getUUID(uuid);
    return (
        <WorkspaceContext.Provider value={workspaceData}>
            <LayoutContainer
                id={`workspace-${uuidString}`}
                theme={theme}
                direction={direction}
                scrollable={scrollable}
                width={width}
                height={height}
                className={`${className}`}
                grow={false}
                space={space}
            >
                {children}
            </LayoutContainer>
        </WorkspaceContext.Provider>
    );
};
