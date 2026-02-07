import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../../Utils";
import React, { Fragment, useContext } from "react";

export const SelectMenu = ({
    name,
    onChange,
    selectedValue,
    children,
    textSize = "text-base",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, {
        ...props,
        height: "",
        grow: false,
    });

    console.log("select menu styles ", styles.string)
    return (
        <select
            className={`p-2 rounded ${styles.string} ${textSize} font-normal focus:outline-none cursor-pointer min-w-lg w-full`}
            name={name}
            onChange={onChange}
            value={selectedValue}
        >
            {children}
        </select>
    );
};
