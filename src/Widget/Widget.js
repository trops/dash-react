import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../Utils";
import { AppContext } from "@dash/Context";
import { LayoutContainer } from "@dash/Layout";

export const Widget = ({
    uuid,
    children,
    version = 1,
    direction = "col",
    scrollable = false,
    className = "",
    ...props
}) => {
    // get the styles
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.WIDGET, currentTheme, {
        ...props,
        scrollable,
        width: "w-full",
        height: "h-auto",
        grow: true,
    });

    console.log("Widget styles ", styles, props);

    return (
        <LayoutContainer
            id={`widget-container-${
                uuid === undefined ? "uuid-" + Math.random(1, 1000) : uuid
            }`}
            version={version}
            key={`widget-container'-${uuid}`}
            direction={direction}
            height={"h-full"}
            width={"w-full"}
            className={`${className} ${styles.string}`}
            grow={true}
        >
            {children}
        </LayoutContainer>
    );
};
