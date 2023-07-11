/**
 * Workspace
 *
 * The Workspace is comprised of the Layout, and Widgets that are configured by the User.
 * There may be multiple Workspaces of "Pages" that the user can create by dragging widgets into the Layout,
 * also defined by the user.
 */
import React from "react";
import { getUUID } from "../Utils";
import { LayoutContainer } from "@dash/Layout";
import { WorkspaceContext } from "@dash/Context";

export const Workspace = ({
    uuid,
    theme = false,
    workspaceData = null,
    children = null,
    width = "w-full",
    height = "",
    direction = "col",
    scrollable = false,
    space = true,
    className = "",
    ...props // what should we do with the props here...
}) => {
    // Generate the UUID for the Workspace to identify
    const uuidString = getUUID(uuid);
    return (
        <WorkspaceContext.Provider value={{ workspaceData: props }}>
            <LayoutContainer
                id={`${uuidString}`}
                theme={theme}
                direction={direction}
                scrollable={scrollable}
                width={width}
                height={height}
                className={`${className}`}
                grow={false}
                space={space}
            >
                {/* {React.Children.map(children, (child) => {
                    // child.props["workspaceProps"] = props;
                    return React.cloneElement(child, {
                        workspaceProps: props,
                    });
                    // return child;
                })} */}
                {children}
            </LayoutContainer>
        </WorkspaceContext.Provider>
    );
};
