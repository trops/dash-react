import React, { useContext } from "react";
import { ThemeContext} from "@dash/Context";
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
    id
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

     // since we do not have a layout container we can create an id like so
     const uuid = getUUID(id, "menu-item");

    return theme === true ? (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row font-bold ${styles.string} ${
                border === true && "border-4"
            } p-4 rounded items-center space-x-2 cursor-pointer text-lg`}
        >
            {children}
        </div>
    ) : (
        <div
            id={uuid}
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
    id
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
    } p-2 px-4 rounded items-center space-x-2 ${
        border === true && "border-2"
    } ${border === true && "border-2"}`;

    const baseTextStyles = `text-base font-medium`;

     // since we do not have a layout container we can create an id like so
     const uuid = getUUID(id, "menu-item");

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row ${baseStyles} ${
                className !== "" ? className : baseTextStyles
            } ${styles.string} `}
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
    } p-2 px-4 rounded items-center space-x-2 ${
        border === true && "border-2"
    } ${border === true && "border-2"}`;

    const baseTextStyles = `text-sm font-normal`;
    // since we do not have a layout container we can create an id like so
    const uuid = getUUID(id, "menu-item");

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`flex flex-row ${baseStyles} ${
                className !== "" ? className : baseTextStyles
            } ${styles.string} `}
        >
            {children}
        </div>
    );

    // return (
    //     <div
    //         id={id}
    //         type={type}
    //         ref={innerRef}
    //         onClick={onClick}
    //         className={`flex flex-row font-normal ${styles.string} ${
    //             border === true && "border"
    //         } p-2 rounded items-center space-x-2 cursor-pointer text-sm`}
    //     >
    //         {children}
    //     </div>
    // );
};

export { MenuItem, MenuItem2, MenuItem3 };
