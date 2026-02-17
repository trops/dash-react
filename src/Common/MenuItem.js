import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const MenuItem = ({
    onClick = null,
    theme = true,
    border = false,
    backgroundColor = null,
    selectedBackgroundColor = null,
    borderColor = null,
    textColor = null,
    selectedTextColor = null,
    hoverTextColor = null,
    hoverBackgroundColor = null,
    children,
    selected = false,
    grow = false,
    className = "",
    id,
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.MENU_ITEM, currentTheme, {
        backgroundColor,
        borderColor,
        textColor,
        hoverBackgroundColor,
        hoverTextColor,
        selectedBackgroundColor,
        selectedTextColor,
        selected,
        grow,
    });

    const uuid = getUUID(id, "menu-item");

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row ${styles.string} ${
                border === true && "border-4"
            } px-3 py-2 rounded-md items-center space-x-2 text-sm transition-colors duration-150 focus-visible:outline-none ${className}`}
        >
            {children}
        </div>
    );
};

const MenuItem2 = ({
    onClick = null,
    border = false,
    backgroundColor = null,
    selectedBackgroundColor = null,
    borderColor = null,
    textColor = null,
    selectedTextColor = null,
    hoverTextColor = null,
    hoverBackgroundColor = null,
    children,
    selected = false,
    className = "",
    grow = false,
    id,
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.MENU_ITEM_2, currentTheme, {
        backgroundColor,
        borderColor,
        textColor,
        hoverBackgroundColor,
        hoverTextColor,
        selectedBackgroundColor,
        selectedTextColor,
        selected,
        grow,
    });

    const baseStyles = `${
        onClick && "cursor-pointer"
    } px-3 py-1.5 rounded-md items-center space-x-2 ${
        border === true && "border-2"
    }`;

    const baseTextStyles = `text-sm font-medium`;

    const uuid = getUUID(id, "menu-item");

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row ${baseStyles} ${
                className !== "" ? className : baseTextStyles
            } ${styles.string} transition-colors duration-150`}
        >
            {children}
        </div>
    );
};

const MenuItem3 = ({
    innerRef = null,
    onClick = null,
    theme = true,
    border = false,
    borderColor = null,
    backgroundColor = null,
    selectedBackgroundColor = null,
    textColor = null,
    selectedTextColor = null,
    hoverTextColor = null,
    hoverBackgroundColor = null,
    children,
    selected = false,
    className = "",
    grow = false,
    id,
    type,
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.MENU_ITEM_3, currentTheme, {
        backgroundColor,
        borderColor,
        textColor,
        hoverBackgroundColor,
        hoverTextColor,
        selectedBackgroundColor,
        selectedTextColor,
        selected,
        grow,
    });

    const baseStyles = `${
        onClick && "cursor-pointer"
    } px-2 py-1 rounded-md items-center space-x-2 ${
        border === true && "border-2"
    }`;

    const baseTextStyles = `text-sm font-normal`;
    const uuid = getUUID(id, "menu-item");

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row ${baseStyles} ${
                className !== "" ? className : baseTextStyles
            } ${styles.string} transition-colors duration-150`}
        >
            {children}
        </div>
    );
};

export { MenuItem, MenuItem2, MenuItem3 };
