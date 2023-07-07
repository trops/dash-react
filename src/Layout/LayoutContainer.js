import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../Utils";

export const LayoutContainer = ({
    id = null,
    children,
    direction = "row",
    className = "",
    scrollable = false,
    width = "w-full",
    height = "h-auto",
    space = true,
}) => {
    // get the styles
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.WIDGET, currentTheme, {
        scrollable,
        width: "w-full",
        height: "h-auto",
    });

    const containerId = id === null ? Math.random(0, 1000) : id;

    // determine the classes based on the props...
    const directionStyle =
        direction === "row"
            ? space === true
                ? "flex-row space-x-2"
                : "flex-row"
            : space === true
            ? "flex-col space-y-2"
            : "flex-col";

    const widthStyle = width;
    const heightStyle = height === "" ? "h-auto" : height;

    return (
        <div
            id={`LayoutContainer-${containerId}`}
            className={`flex ${directionStyle} ${widthStyle} ${heightStyle} ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};
