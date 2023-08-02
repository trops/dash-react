import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "../Utils";

export const LayoutContainer = ({
    id,
    children,
    direction = "row",
    className = "",
    scrollable = false,
    width = "w-full",
    height = "",
    space = true,
    grow = false,
    debug = false,
    onClick = undefined,
    ...props
}) => {
    const containerId = getUUID(id);
    // get the styles
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.LAYOUT_CONTAINER,
        currentTheme,
        {
            scrollable,
            width,
            height,
            grow,
            hasChildren: children !== undefined,
            childCount: React.Children.count(children),
            direction,
            space,
        },
        containerId
    );

    function renderDebugger(children, styleString) {
        return (
            debug === true && (
                <div
                    className={`flex flex-col bg-inherit space-y-1 flex-shrink`}
                >
                    <span className="flex flex-row flex-shrink text-xs bg-gray-900 uppercase text-gray-200 rounded">
                        {containerId} {styleString}
                    </span>
                    {children}
                </div>
            )
        );
    }

    return (
        <div
            id={`LayoutContainer-${containerId}`}
            className={`flex ${styles.string} ${width} ${height} ${className}`}
            onClick={onClick}
        >
            {debug === false && children}
            {debug === true && renderDebugger(children, styles.string)}
        </div>
    );
};
