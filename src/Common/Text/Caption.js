import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { LayoutContainer } from "@dash/Layout";

/**
 * Caption — extra-small de-emphasized text for badges, IDs,
 * metadata, secondary descriptions. Smaller and more muted than
 * Paragraph_3.
 *
 * Why this exists: scattered across the app, secondary metadata
 * was rendered with raw `text-[10px] opacity-50` classes which
 * (a) silently fail to render outside the safelist and (b) bypass
 * the active theme's text-color tokens. Caption centralizes the
 * "small + muted" intent against the theme's tertiary-light text
 * color so a theme switch carries through.
 *
 * Three tiers (Caption / Caption_2 / Caption_3) follow the same
 * primary/secondary/tertiary shading convention as Heading,
 * SubHeading, Paragraph.
 *
 * Usage:
 *   <Caption>{packageId}</Caption>
 *   <Caption text="v1.2.0" />
 *   <Caption2 className="font-mono">{scopedId}</Caption2>
 */
function Caption({
    text = null,
    padding = "",
    onClick = null,
    scrollable = false,
    className = "",
    grow = false,
    space = false,
    height = "",
    width = "",
    children,
    debug = false,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION, currentTheme, {
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
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
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

function Caption2({
    text = null,
    padding = "",
    onClick = null,
    className = "",
    grow = false,
    space = false,
    height = "",
    width = "",
    children,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION_2, currentTheme, {
        ...props,
        space,
        grow,
        padding,
        height,
        width,
    });

    return (
        <LayoutContainer
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
            onClick={onClick}
            grow={grow}
            space={space}
            height={height}
            width={width}
            padding={padding}
        >
            {text !== null ? text : children}
        </LayoutContainer>
    );
}

function Caption3({
    text = null,
    padding = "",
    onClick = null,
    className = "",
    grow = false,
    space = false,
    height = "",
    width = "",
    children,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION_3, currentTheme, {
        ...props,
        space,
        grow,
        padding,
        height,
        width,
    });

    return (
        <LayoutContainer
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.backgroundColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
            onClick={onClick}
            grow={grow}
            space={space}
            height={height}
            width={width}
            padding={padding}
        >
            {text !== null ? text : children}
        </LayoutContainer>
    );
}

export { Caption, Caption2, Caption3 };
