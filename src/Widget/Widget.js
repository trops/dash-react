import React, { useContext } from "react";
import { AppContext } from "@dash/Context";
import { LayoutContainer } from "@dash/Layout";

export const Widget = ({
    uuid,
    children,
    className = "",
    version = 1,
    ...props
}) => {
    // this is the electron api we are pulling in...
    const { debugMode } = useContext(AppContext);

    return (
        <LayoutContainer
            id={`widget-container'-${uuid}`}
            className={`${className}`}
            version={version}
            key={`widget-container'-${uuid}`}
            {...props}
        >
            {debugMode === true && (
                <span className="text-white uppercase text-xs">
                    WIDGET{" "}
                    {scrollable === true ? "scrollable" : "not scrollable"}
                </span>
            )}
            {children}
        </LayoutContainer>
    );
};
