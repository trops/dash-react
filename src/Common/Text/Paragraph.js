import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";

function Paragraph({
    text = null,
    padding = "p-6",
    onClick = null,
    scrollable = false,
    className = "",
    grow = false,
    space = false,
    height = "",
    width = "w-full",
    children,
    debug = false,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH, currentTheme, {
        ...props,
        space,
        grow,
        padding,
        scrollable,
        height,
        width,
    });

    return (
        <LayoutContainer
            className={`${styles.textSize || "text-base"} ${styles.lineHeight || "leading-relaxed"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
            height={height}
            width={width}
            padding={padding}
            debug={debug}
        >
            {text !== null ? text : children}
        </LayoutContainer>
    );
}

function Paragraph2({
    text,
    padding = true,
    onClick = null,
    scrollable = false,
    className = "",
    grow = false,
    space = false,
    height = "",
    width = "w-full",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH_2, currentTheme, {
        ...props,
        scrollable,
        space,
        grow,
        height,
        width,
    });

    return (
        <LayoutContainer
            className={`${styles.textSize || "text-sm"} ${styles.lineHeight || "leading-relaxed"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
            height={height}
            width={width}
        >
            {text}
        </LayoutContainer>
    );
}

function Paragraph3({
    text,
    padding = true,
    onClick = null,
    scrollable = false,
    grow = false,
    space = false,
    className = "",
    height = "",
    width = "w-full",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH_3, currentTheme, {
        ...props,
        scrollable,
        grow,
        space,
        padding,
        height,
        width,
    });

    return (
        <LayoutContainer
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-relaxed"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
            height={height}
            width={width}
        >
            {text}
        </LayoutContainer>
    );
}

export { Paragraph, Paragraph2, Paragraph3 };
