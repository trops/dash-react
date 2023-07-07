import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";

function Paragraph({
    text,
    padding = true,
    onClick = null,
    scrollable = false,
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    // const paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
    const styles = getStylesForItem(
        themeObjects.PARAGRAPH,
        currentTheme,
        props
    );

    console.log("styles paragraph ", styles.string, className, styles);

    return (
        <LayoutContainer
            {...props}
            className={`${className} text-base xl:text-lg font-normal h-full w-full`}
            onClick={onClick}
            scrollable={scrollable}
            {...styles}
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
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    // const paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
    const styles = getStylesForItem(themeObjects.PARAGRAPH_2, currentTheme, {
        ...props,
        scrollable,
    });

    return (
        <LayoutContainer
            className={`text-sm xl:text-base font-normal h-full w-full ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            {...styles}
            {...props}
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
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PARAGRAPH_3, currentTheme, {
        ...props,
        scrollable,
    });

    return (
        <LayoutContainer
            className={`text-xs xl:text-sm font-normal h-full w-full ${className}`}
            onClick={onClick}
            scrollable={scrollable}
            {...styles}
            {...props}
        >
            {text}
        </LayoutContainer>
    );
}

export { Paragraph, Paragraph2, Paragraph3 };
