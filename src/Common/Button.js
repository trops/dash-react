import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const Button = ({
    title = "Cancel",
    onClick = null,
    disabled = false,
    padding = null,
    textSize = null,
    block = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
        space: false,
    });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const width = block === true ? "w-full" : "";
    const textSizeComputed =
        textSize !== null
            ? textSize
            : "text-lg lg:text-xl xl:text-xl 2xl:text-2xl";
    const paddingComputed =
        padding !== null
            ? padding
            : "p-2 py-1 px-2 lg:px-4 lg:py-2 xl:px-6 xl:py-4";

    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-nowrap whitespace-nowrap flex-row justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-bold`}
        >
            {title}
        </div>
    );
};

const Button2 = ({
    title = "Cancel",
    onClick = null,
    disabled = false,
    textSize = null,
    padding = null,
    block = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_2, currentTheme, {
        ...props,
        height: "",
        grow: false,
    });
    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }
    const width = block === true ? "w-full" : "";
    const textSizeComputed =
        textSize !== null ? textSize : "text-base lg:text-lg 2xl:text-xl";
    const paddingComputed = padding !== null ? padding : "p-1 lg:p-2 xl:p-4";

    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-row flex-shrink justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-medium`}
        >
            {title}
        </div>
    );
};

const Button3 = ({
    title = "Cancel",
    onClick = null,
    disabled = false,
    textSize = null,
    padding = null,
    block = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_3, currentTheme, {
        ...props,
        textSize,
        padding,
        grow: false,
    });
    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }
    const width = block === true ? "w-full" : "";
    const textSizeComputed =
        textSize !== null ? textSize : "text-sm xl:text-base 2xl:text-base";
    const paddingComputed = padding !== null ? padding : "p-1 lg:p-1 xl:p-2";
    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-row justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-normal`}
        >
            {title}
        </div>
    );
};

export { Button, Button2, Button3 };
