import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../../Utils";
import React, { Fragment, useContext } from "react";

export const SelectMenu = ({
    name,
    onChange,
    selectedValue,
    children,
    textSize = "text-base 2xl:text-lg",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, {
        ...props,
        height: "h-fit",
    });
    return (
        <select
            className={`p-2 rounded ${textSize} font-bold ${styles.string} focus:outline-none cursor-pointer min-w-lg w-full`}
            name={name}
            onChange={onChange}
            value={selectedValue}
        >
            {children}
        </select>
    );
};
