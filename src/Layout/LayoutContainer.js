import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

export const LayoutContainer = ({
    id = 1,
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

    // scrollbars?
    // put this CSS in the Util/colors.js function
    const scrollbarStyles =
        scrollable === true
            ? `overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800`
            : "overflow-hidden"; // scrollbar scrollbar-thumb-gray-700 scrollbar-track-red-800";

    return (
        <div
            id={`LayoutContainer-${id}`}
            className={`flex border-1 justify-between ${scrollbarStyles} ${backgroundColorStyle} ${borderColorStyle} ${directionStyle} ${scrollStyle} ${widthStyle} ${heightStyle} ${className}`}
        >
            {children}
        </div>
    );
};
