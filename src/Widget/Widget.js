import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "../Utils";
import { LayoutContainer } from "@dash/Layout";

export const Widget = ({
    uuid,
    children,
    version = 1,
    direction = "col",
    scrollable = false,
    className = "",
    width = "w-full",
    height = "h-auto",
    space = true,
    grow = true,
}) => {
    // get the styles
    // const { currentTheme } = useContext(ThemeContext);
    // const styles = getStylesForItem(
    //     themeObjects.WIDGET,
    //     currentTheme,
    //     {
    //         ...props,
    //         scrollable: scrollable,
    //         width: "w-full",
    //         height: "h-auto",
    //         grow: true,
    //         direction: direction,
    //         space: true,
    //     },
    //     uuid
    // );

    // console.log("Widget props ", {
    //     uuid,
    //     children,
    //     version,
    //     direction,
    //     scrollable,
    //     className,
    //     space,
    //     grow,
    // });

    const uuidString = getUUID(uuid);

    return (
        <LayoutContainer
            id={`widget-container-${uuidString}`}
            version={version}
            key={`widget-container'-${uuidString}`}
            direction={direction}
            height={height}
            width={width}
            className={`${className}`}
            grow={grow}
            space={space}
            scrollable={scrollable}
        >
            {children}
        </LayoutContainer>
    );
};
