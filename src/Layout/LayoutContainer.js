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
    height = "h-auto",
    space = true,
    grow = true,
    debug = false,
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

    const widthStyle = width;
    const heightStyle = height === "" ? "h-full" : height;

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
            id={containerId}
            className={`flex ${styles.string} ${widthStyle} ${heightStyle} ${className}`}
        >
            {debug === false && children}
            {debug === true && renderDebugger(children, styles.string)}
        </div>
    );
};
