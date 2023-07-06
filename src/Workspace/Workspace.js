/**
 * Workspace
 *
 * The Workspace is comprised of the Layout, and Widgets that are configured by the User.
 * There may be multiple Workspaces of "Pages" that the user can create by dragging widgets into the Layout,
 * also defined by the user.
 */
import React, { useContext } from "react";
import { LayoutContainer } from "@dash/Layout";
import { AppContext, WorkspaceContext } from "@dash/Context";

export const Workspace = ({
    theme = false,
    workspaceData,
    children = null,
    width = "w-full",
    height = "h-full",
    direction = "col",
    scrollable = true,
    ...props
}) => {
    // const { debugMode, debugStyles } = useContext(AppContext);

    // console.log('workspace ', debugMode);

    function debugClasses() {
        // const styles = debugStyles['workspace']['classes'];
        return ""; //debug === true && `space-y-4 ${styles}`
    }

    // console.log('Workspace props ', { theme, workspaceData, children, width, height, direction, scrollable, ...props })

    return (
        <WorkspaceContext.Provider value={workspaceData}>
            <LayoutContainer
                theme={theme}
                direction={direction}
                scrollable={scrollable}
                width={width}
                height={height}
                // className={`${debugClasses()}`}
                {...props}
            >
                {/* {debugMode === true && (<span className="text-white uppercase text-xs">WORKSPACE {children && 'children'}</span>)} */}
                {children}
            </LayoutContainer>
        </WorkspaceContext.Provider>
    );
};
