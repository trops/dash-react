import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const Panel = ({
    className,
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "h-full",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`flex ${className !== "" && className} ${
                styles.string
            } ${
                horizontal === true ? "flex-row" : "flex-col"
            } ${width} ${height}  ${padding !== false && "p-6"} rounded`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const Panel2 = ({
    className,
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "h-full",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
    });

    return (
        <div
            className={`flex ${className !== "" && className} ${
                styles.string
            } ${
                horizontal === true ? "flex-row" : "flex-col"
            } ${width} ${height}  ${padding !== false && "p-6"} rounded`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const Panel3 = ({
    className,
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "h-full",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
        ...props,
    });
    console.log("panel 3 styles ", styles);

    return (
        <div
            className={`flex ${className !== "" && className} ${
                styles.string
            } ${
                horizontal === true ? "flex-row" : "flex-col"
            } ${width} ${height} ${padding !== false && "p-6"} rounded`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export { Panel, Panel2, Panel3 };
