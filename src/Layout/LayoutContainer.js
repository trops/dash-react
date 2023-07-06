import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

export const LayoutContainer = ({
    id = null,
    children,
    direction = "row",
    className = "",
    scrollable = false,
    width = "w-full",
    height = "",
    space = true,
}) => {
    const { currentTheme } = useContext(ThemeContext);

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
    // const scrollStyle =
    //     scrollable === true ? "overflow-y-scroll" : "overflow-hidden";
    const widthStyle = width;
    const heightStyle = height === "" ? "h-full" : height; //'h-full';//scrollable === true ? height : height;

    // to theme or not to theme...
    let backgroundColorStyle = "";
    let borderColorStyle = "";

    // scrollbars?
    // put this CSS in the Util/colors.js function
    const scrollbarStyles =
        scrollable === true
            ? `overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800`
            : "overflow-hidden";

    return (
        <div
            id={`LayoutContainer-${containerId}`}
            className={`flex ${scrollbarStyles} ${backgroundColorStyle} ${borderColorStyle} ${directionStyle} ${widthStyle} ${heightStyle} ${className}`}
        >
            {children}
        </div>
    );
};
