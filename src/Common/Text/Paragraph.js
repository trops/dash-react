import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";

function Paragraph({
    text = null,
    padding = "p-6",
    onClick = null,
    scrollable = false,
    className = "text-base xl:text-lg font-normal p-4",
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
            className={`${styles.string}`}
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
    className = "text-sm xl:text-base font-normal p-2",
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
            className={`${className} ${styles.string}`}
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
    className = "text-xs xl:text-sm font-normal p-2",
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
            className={`${styles.string} ${className}`}
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
