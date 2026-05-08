import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

/**
 * Caption — extra-small de-emphasized text for badges, IDs,
 * metadata, secondary descriptions. Smaller and more muted than
 * Paragraph_3.
 *
 * Renders a <span> so it composes inline with surrounding flex /
 * inline-block content (which is the dominant use case for
 * "small label next to a control"). Use the `block` prop or
 * className overrides if you need block-level layout.
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
 *   <Caption3 block>Block-level secondary description</Caption3>
 */
function Caption({
    text = null,
    className = "",
    block = false,
    onClick = null,
    children,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION, currentTheme, {});
    const Tag = block ? "div" : "span";
    return (
        <Tag
            {...props}
            onClick={onClick}
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
        >
            {text !== null ? text : children}
        </Tag>
    );
}

function Caption2({
    text = null,
    className = "",
    block = false,
    onClick = null,
    children,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION_2, currentTheme, {});
    const Tag = block ? "div" : "span";
    return (
        <Tag
            {...props}
            onClick={onClick}
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
        >
            {text !== null ? text : children}
        </Tag>
    );
}

function Caption3({
    text = null,
    className = "",
    block = false,
    onClick = null,
    children,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CAPTION_3, currentTheme, {});
    const Tag = block ? "div" : "span";
    return (
        <Tag
            {...props}
            onClick={onClick}
            className={`${styles.textSize || "text-xs"} ${styles.lineHeight || "leading-tight"} ${styles.textColor || ""} ${styles.fontWeight || "font-normal"} ${className}`}
        >
            {text !== null ? text : children}
        </Tag>
    );
}

export { Caption, Caption2, Caption3 };
