/**
 * Workspace
 *
 * The Workspace is comprised of the Layout, and Widgets that are configured by the User.
 * There may be multiple Workspaces of "Pages" that the user can create by dragging widgets into the Layout,
 * also defined by the user.
 */
import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../Utils";
import { LayoutContainer } from "@dash/Layout";
import { AppContext, WorkspaceContext } from "@dash/Context";

export const Workspace = ({
    theme = false,
    workspaceData = null,
    children = null,
    width = "w-full",
    height = "h-auto",
    direction = "col",
    scrollable = false,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.WORKSPACE, currentTheme, {
        ...props,
        scrollable,
        grow: false,
    });

    console.log("Workspace props ", props);
    return (
        <WorkspaceContext.Provider value={workspaceData}>
            <LayoutContainer
                theme={theme}
                direction={direction}
                scrollable={scrollable}
                width={width}
                height={height}
                className={`${className} ${styles.string}`}
                grow={false}
                {...styles}
            >
                {children}
            </LayoutContainer>
        </WorkspaceContext.Provider>
    );
};
