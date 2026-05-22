import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "@dash/Utils";

const Tag = ({
    text,
    textSize = "text-sm",
    onClick = null,
    className = "",
    children,
    // Density overrides — pass alternate Tailwind class strings to opt
    // out of the default chrome (e.g. `padding="px-1.5 py-0"`,
    // `rounded="rounded-full"`, `border={false}` for a fillless chip).
    padding = "px-3 py-1.5",
    rounded = "rounded",
    border = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG, currentTheme, {
        ...props,
        grow: false,
    });

    const stylesCalculated = `${styles.string} font-medium ${rounded} ${
        border ? "border" : ""
    } ${onClick !== null ? "cursor-pointer" : ""} ${textSize} ${className}`;

    const uuid = getUUID("", "tag");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} ${padding} whitespace-nowrap items-center justify-center transition-colors duration-150`}
        >
            {children !== undefined ? children : text}
        </span>
    );
};

const Tag2 = ({
    text,
    textSize = "text-xs",
    onClick = null,
    className = "",
    active = false,
    children,
    padding = "px-2 py-1",
    rounded = "rounded",
    border = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_2, currentTheme, {
        ...props,
        grow: false,
    });

    const colorClasses = active
        ? `${styles.activeBackgroundColor || styles.backgroundColor || ""} ${styles.activeTextColor || styles.textColor || ""}`
        : `${styles.backgroundColor || ""} ${styles.textColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""}`;

    const stylesCalculated = `${colorClasses} ${styles.borderColor || ""} font-medium ${rounded} ${
        border ? "border" : ""
    } ${onClick !== null ? "cursor-pointer" : ""} ${textSize} ${className}`;

    const uuid = getUUID("", "tag-2");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} ${padding} whitespace-nowrap items-center justify-center transition-colors duration-150`}
        >
            {children !== undefined ? children : text}
        </span>
    );
};

const Tag3 = ({
    text,
    textSize = "text-xs",
    onClick = null,
    className = "",
    children,
    padding = "px-1.5 py-0.5",
    rounded = "rounded",
    border = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_3, currentTheme, {
        ...props,
        grow: false,
    });

    const stylesCalculated = `${styles.string} font-normal ${rounded} ${
        border ? "border" : ""
    } ${onClick !== null ? "cursor-pointer" : ""} ${textSize} ${className}`;
    const uuid = getUUID("", "tag-3");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} ${padding} whitespace-nowrap items-center justify-center transition-colors duration-150`}
        >
            {children !== undefined ? children : text}
        </span>
    );
};

export { Tag, Tag2, Tag3 };
