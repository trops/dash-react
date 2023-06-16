import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

export const LayoutContainer = ({
    id,
    children,
    direction = "row",
    className = "",
    scrollable = true,
    width = "w-full",
    height = "min-h-fit",
    space = true,
}) => {
    const { currentTheme } = useContext(ThemeContext);

    // determine the classes based on the props...
    const directionStyle =
        direction === "row"
            ? space === true
                ? "flex-row space-x-2"
                : "flex-row"
            : space === true
            ? "flex-col space-y-2"
            : "flex-col";
    const scrollStyle =
        scrollable === true ? "overflow-y-scroll" : "overflow-hidden";
    const widthStyle = width;
    const heightStyle = height === "" ? "h-full" : height; //'h-full';//scrollable === true ? height : height;

    // to theme or not to theme...
    let backgroundColorStyle = "";
    let borderColorStyle = "";

    // TODO
    // tailwind scrollbars - scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900

    const scrollbarStyles =
        scrollable === true
            ? `scrollbar-thumb-gray-900 scrollbar-track-gray-800`
            : "";

    return (
        <div
            id={`LayoutContainer-${id}`}
            className={`flex border-1 rounded justify-between scrollbar ${scrollbarStyles} ${backgroundColorStyle} ${borderColorStyle} ${directionStyle} ${scrollStyle} ${widthStyle} ${heightStyle} ${className}`}
        >
            {children}
        </div>
    );
};
