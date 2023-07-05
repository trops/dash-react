import React, { useContext } from "react";
import { AppContext } from "@dash/Context";
import { LayoutContainer } from "@dash/Layout";

export const Widget = ({
    uuid,
    children,
    className = "",
    version = 1,
    direction = "col",
    height = "h-full",
    width = "w-full",
    scrollable = false,
    ...props
}) => {
    // this is the electron api we are pulling in...
    const { debugMode } = useContext(AppContext);

    return (
        <LayoutContainer
            id={`widget-container-${
                uuid === undefined ? "uuid-" + Math.random(1, 1000) : uuid
            }`}
            className={`${className}`}
            version={version}
            key={`widget-container'-${uuid}`}
            direction={direction}
            width={width}
            height={height}
            scrollable={scrollable}
            {...props}
        >
            {/* {debugMode === true && (
                <span className="text-white uppercase text-xs">WIDGET </span>
            )} */}
            {children}
        </LayoutContainer>
    );
};
