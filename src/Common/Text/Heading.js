import { useContext, createElement } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

function Heading({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row ${className} ${paddingStyles} ${styles.textSize || "text-5xl"} ${styles.fontWeight || "font-bold"} ${styles.letterSpacing || "tracking-tight"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

function Heading2({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING_2, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row ${className} ${paddingStyles} ${styles.textSize || "text-4xl"} ${styles.fontWeight || "font-bold"} ${styles.letterSpacing || "tracking-tight"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

function Heading3({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING_3, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row ${className} ${paddingStyles} ${styles.textSize || "text-3xl"} ${styles.fontWeight || "font-semibold"} ${styles.letterSpacing || "tracking-tight"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

function SubHeading({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row w-full ${className} ${paddingStyles} ${styles.textSize || "text-2xl"} ${styles.fontWeight || "font-semibold"} ${styles.letterSpacing || "tracking-tight"} ${styles.lineHeight || "leading-snug"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

function SubHeading2({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING_2, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row w-full ${className} ${paddingStyles} ${styles.textSize || "text-xl"} ${styles.fontWeight || "font-medium"} ${styles.letterSpacing || "tracking-tight"} ${styles.lineHeight || "leading-snug"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

function SubHeading3({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
    className = "",
    as = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING_3, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    const Tag = as || "div";

    return createElement(
        Tag,
        {
            className: `flex flex-row w-full ${className} ${paddingStyles} ${styles.textSize || "text-lg"} ${styles.fontWeight || "font-medium"} ${styles.letterSpacing || "tracking-normal"} ${styles.lineHeight || "leading-snug"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${onClick !== null && "cursor-pointer"}`,
            onClick,
        },
        title
    );
}

export { Heading, Heading2, Heading3, SubHeading, SubHeading2, SubHeading3 };
