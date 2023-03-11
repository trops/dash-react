import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
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
    });

    return theme === true ? (
        <div
            onClick={onClick}
            className={`flex flex-row font-bold ${styles.string} ${
                border === true && "border-4"
            } p-4 rounded items-center space-x-2 cursor-pointer text-lg`}
        >
            {children}
        </div>
    ) : (
        <div
            onClick={onClick}
            className={`flex flex-row font-bold ${backgroundColor} ${borderColor} ${textColor} ${
                border === true && "border-4"
            } p-4 rounded items-center space-x-2 cursor-pointer text-lg`}
        >
            {children}
        </div>
    );
};

const MenuItem2 = ({
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
    });

    return theme === true ? (
        <div
            onClick={onClick}
            className={`flex flex-row font-medium ${styles.string} ${
                border === true && "border-2"
            } ${
                border === true && "border-2"
            } p-2 px-4 rounded items-center space-x-2 cursor-pointer text-base`}
        >
            {children}
        </div>
    ) : (
        <div
            onClick={onClick}
            className={`flex flex-row font-medium ${backgroundColor} ${borderColor} ${textColor} ${
                border === true && "border"
            } p-2 rounded items-center space-x-2 cursor-pointer text-base`}
        >
            {children}
        </div>
    );
};

const MenuItem3 = ({
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
    });

    return theme === true ? (
        <div
            onClick={onClick}
            className={`flex flex-row font-normal ${styles.string} ${
                border === true && "border"
            } p-2 px-4 rounded items-center space-x-2 cursor-pointer text-sm`}
        >
            {children}
        </div>
    ) : (
        <div
            onClick={onClick}
            className={`flex flex-row font-normal ${backgroundColor} ${borderColor} ${textColor} ${
                border === true && "border"
            } p-2 px-4 rounded items-center space-x-2 cursor-pointer text-sm`}
        >
            {children}
        </div>
    );
};

export { MenuItem, MenuItem2, MenuItem3 };
