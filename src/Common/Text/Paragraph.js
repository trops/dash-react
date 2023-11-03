import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";

function Paragraph({
    text,
    padding = true,
    onClick = null,
    scrollable = false,
    className = "text-base xl:text-lg font-normal p-4",
    grow = false,
    space = false,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.PARAGRAPH,
        currentTheme,
        props,
        space,
        grow
    );

    return (
        <LayoutContainer
            className={`${className} ${styles.string} h-full w-full`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
        >
            {text}
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
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH_2, currentTheme, {
        ...props,
        scrollable,
        space,
        grow,
    });

    return (
        <LayoutContainer
            className={`h-full w-full ${className} ${styles.string}`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
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
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH_3, currentTheme, {
        ...props,
        scrollable,
        grow,
        space,
    });

    console.log(styles.string);
    return (
        <LayoutContainer
            className={`h-full w-full ${styles.string} ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            grow={grow}
            space={space}
        >
            {text}
        </LayoutContainer>
    );
}

export { Paragraph, Paragraph2, Paragraph3 };
