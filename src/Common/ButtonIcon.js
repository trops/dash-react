import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const ButtonIcon = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = null,
    textColor = "",
    iconSize = null,
    backgroundColor = null,
    disabled = false,
    className = "",
    size = "md",
    ariaLabel = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON_ICON,
        currentTheme,
        {
            ...props,
            backgroundColor,
            scrollable: false,
            grow: false,
        },
        null,
        size
    );

    const uuid = getUUID("", "button-icon");
    const computedIconSize = iconSize || styles.iconSize || "h-5 w-5";
    const hasIcon = icon !== "";
    const hasText = text !== "" && text !== null;

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`inline-flex items-center justify-center ${hasIcon && hasText ? "gap-2" : ""} ${block ? "w-full" : ""} ${styles.backgroundColor || ""} ${styles.textColor || ""} ${styles.borderColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""} ${styles.hoverBorderColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "px-3 py-2"} ${styles.textSize || "text-base"} ${styles.shadow || ""} ${styles.transition || "transition-colors duration-150"} ${styles.fontWeight || ""} ${styles.cursor || "cursor-pointer"} ${styles.disabledOpacity || ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} whitespace-nowrap ${className}`}
        >
            {hasIcon && (
                <FontAwesomeIcon icon={icon} className={computedIconSize} />
            )}
            {hasText && <span>{text}</span>}
        </button>
    );
};

const ButtonIcon2 = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = null,
    iconSize = null,
    backgroundColor = null,
    disabled = false,
    className = "",
    size = "md",
    ariaLabel = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON_ICON_2,
        currentTheme,
        {
            ...props,
            backgroundColor,
            scrollable: false,
            grow: false,
        },
        null,
        size
    );

    const uuid = getUUID("", "button-icon-2");
    const computedIconSize = iconSize || styles.iconSize || "h-4 w-4";
    const hasIcon = icon !== "";
    const hasText = text !== "" && text !== null;

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`inline-flex items-center justify-center ${hasIcon && hasText ? "gap-1.5" : ""} ${block ? "w-full" : ""} ${styles.backgroundColor || ""} ${styles.textColor || ""} ${styles.borderColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""} ${styles.hoverBorderColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "px-2.5 py-1.5"} ${styles.textSize || "text-sm"} ${styles.shadow || ""} ${styles.transition || "transition-colors duration-150"} ${styles.fontWeight || ""} ${styles.cursor || "cursor-pointer"} ${styles.disabledOpacity || ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} whitespace-nowrap ${className}`}
        >
            {hasIcon && (
                <FontAwesomeIcon icon={icon} className={computedIconSize} />
            )}
            {hasText && <span>{text}</span>}
        </button>
    );
};

const ButtonIcon3 = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = null,
    iconSize = null,
    disabled = false,
    className = "",
    size = "md",
    ariaLabel = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.BUTTON_ICON_3,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        },
        null,
        size
    );

    const uuid = getUUID("", "button-icon-3");
    const computedIconSize = iconSize || styles.iconSize || "h-3 w-3";
    const hasIcon = icon !== "";
    const hasText = text !== "" && text !== null;

    return (
        <button
            type="button"
            id={uuid}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`inline-flex items-center justify-center ${hasIcon && hasText ? "gap-1" : ""} ${block ? "w-full" : ""} ${styles.backgroundColor || ""} ${styles.textColor || ""} ${styles.borderColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""} ${styles.hoverBorderColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "px-2 py-1"} ${styles.textSize || "text-xs"} ${styles.shadow || ""} ${styles.transition || "transition-colors duration-150"} ${styles.fontWeight || ""} ${styles.cursor || "cursor-pointer"} ${styles.disabledOpacity || ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} whitespace-nowrap ${className}`}
        >
            {hasIcon && (
                <FontAwesomeIcon icon={icon} className={computedIconSize} />
            )}
            {hasText && <span>{text}</span>}
        </button>
    );
};

export { ButtonIcon, ButtonIcon2, ButtonIcon3 };
