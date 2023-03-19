import React from "react";

export const Container = ({
    id,
    children,
    direction = "row",
    className = "",
    scrollable = true,
    width = "w-full",
    height = "h-full min-h-fit",
    debug = false,
    onMouseOver = null,
    onMouseOut = null,
}) => {
    // determine the classes based on the props...
    const directionStyle =
        direction === "row" ? "flex-row space-x-2" : "flex-col space-y-2";
    const scrollStyle =
        scrollable === true ? "overflow-y-scroll" : "overflow-hidden";
    const widthStyle = width;
    const heightStyle = scrollable === true ? height : height;

    return (
        <div
            id={`container-${id}`}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={`flex ${directionStyle} ${scrollStyle} ${widthStyle} ${heightStyle} ${className}`}
        >
            {children}
        </div>
    );
};
