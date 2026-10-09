import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { getStylesForItem, getUUID } from "../Utils";
import { themeObjects } from "../Utils";

/**
 * Button (primary) / Button2 (secondary) / Button3 (ghost).
 *
 * Shared DOM props:
 *   type     — "button" (default) | "submit" | "reset"
 *   tooltip  — native hover tooltip (the `title` attribute; `title` itself is
 *              the button label for backwards compatibility)
 *   ariaLabel — accessible name for icon-only buttons (plain `aria-label`
 *              works too, so it never leaks into the style props)
 *   danger   — destructive action (delete / stop / disconnect): renders the
 *              soft-red treatment regardless of tier
 */
const Button = ({
    title = "Cancel",
    onClick = undefined,
    disabled = false,
    padding = null,
    textSize = null,
    block = false,
    size = "md",
    className = "",
    type = "button",
    tooltip = undefined,
    ariaLabel = undefined,
    "aria-label": ariaLabelAttr = undefined,
    danger = false,
    children,
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
            type={type}
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            aria-label={ariaLabel ?? ariaLabelAttr}
            className={`dr-btn dr-btn-primary ${danger ? "dr-btn-danger" : ""} flex flex-nowrap whitespace-nowrap flex-row justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} ${className}`}
        >
            {children !== undefined ? children : title}
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
    type = "button",
    tooltip = undefined,
    ariaLabel = undefined,
    "aria-label": ariaLabelAttr = undefined,
    danger = false,
    children,
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
            type={type}
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            aria-label={ariaLabel ?? ariaLabelAttr}
            className={`dr-btn dr-btn-secondary ${danger ? "dr-btn-danger" : ""} flex flex-row flex-shrink whitespace-nowrap justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        >
            {children !== undefined ? children : title}
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
    type = "button",
    tooltip = undefined,
    ariaLabel = undefined,
    "aria-label": ariaLabelAttr = undefined,
    danger = false,
    children,
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
            type={type}
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            aria-label={ariaLabel ?? ariaLabelAttr}
            className={`dr-btn dr-btn-ghost ${danger ? "dr-btn-danger" : ""} flex flex-row whitespace-nowrap justify-center items-center ${styles.string} ${width} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        >
            {children !== undefined ? children : title}
        </button>
    );
};

export { Button, Button2, Button3 };
