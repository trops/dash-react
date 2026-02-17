import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { getStylesForItem, getUUID } from "../Utils";
import { themeObjects } from "../Utils";

const Button = ({
    title = "Cancel",
    onClick = undefined,
    disabled = false,
    padding = null,
    textSize = null,
    block = false,
    size = "md",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
            space: false,
        },
        null,
        size
    );

    const width = block === true ? "w-full" : "";

    const uuid = getUUID("", "button");

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-nowrap whitespace-nowrap flex-row justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} ${className}`}
        >
            {title}
        </button>
    );
};

const Button2 = ({
    title = "Cancel",
    onClick = null,
    disabled = false,
    textSize = null,
    padding = null,
    block = false,
    size = "md",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON_2,
        currentTheme,
        {
            ...props,
            height: "",
            grow: false,
        },
        null,
        size
    );

    const width = block === true ? "w-full" : "";

    const uuid = getUUID("", "button-2");

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-row flex-shrink justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        >
            {title}
        </button>
    );
};

const Button3 = ({
    title = "Cancel",
    onClick = null,
    disabled = false,
    textSize = null,
    padding = null,
    block = false,
    size = "md",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON_3,
        currentTheme,
        {
            ...props,
            grow: false,
        },
        null,
        size
    );

    const width = block === true ? "w-full" : "";

    const uuid = getUUID("", "button-3");

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-row justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        >
            {title}
        </button>
    );
};

export { Button, Button2, Button3 };
