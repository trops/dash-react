import React, { useContext } from "react";
import { WorkspaceContext, WidgetContext } from "@dash/Context";
import { getUUID } from "../Utils";
import { LayoutContainer } from "@dash/Layout";

export const Widget = ({
    uuid,
    children,
    version = 1,
    direction = "col",
    scrollable = false,
    className = "",
    width = "w-full",
    height = "",
    space = true,
    grow = true,
    componentName = "",
    api = {},
    ...props
}) => {
    const uuidString = getUUID(uuid);

    return (
        <WidgetContext.Provider value={{ widgetData: { uuid, ...props } }}>
            <LayoutContainer
                id={`WIDGET-${uuidString}`}
                version={version}
                key={`WIDGET'-${uuidString}`}
                direction={direction}
                height={height}
                width={width}
                className={`${className}`}
                grow={grow}
                space={space}
                scrollable={scrollable}
            >
                {children}
            </LayoutContainer>
        </WidgetContext.Provider>
    );
};
