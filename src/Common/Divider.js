import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

/**
 * Divider — themed horizontal/vertical separator.
 *
 * The pre-existing border-color tokens (PRIMARY/SECONDARY/TERTIARY)
 * already drive divider colors throughout the app via raw
 * `border-{token}` classes; Divider centralizes that pattern so a
 * theme switch propagates automatically and consumers don't have
 * to remember which token / opacity to use for "subtle separator."
 *
 * Usage:
 *   <Divider />                              // default horizontal
 *   <Divider orientation="vertical" />        // vertical between columns
 *   <Divider2 />, <Divider3 />                // alternative token tiers
 *
 * Props:
 *   orientation = "horizontal" | "vertical"
 *   className   — extra Tailwind classes (margins, etc.)
 */
function Divider({ orientation = "horizontal", className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DIVIDER, currentTheme, props);
    const borderClass = styles.borderColor || "border-primary-medium";
    const orientClass =
        orientation === "vertical"
            ? `border-l ${borderClass} h-full`
            : `border-t ${borderClass} w-full`;
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={`${orientClass} ${className}`}
        />
    );
}

function Divider2({ orientation = "horizontal", className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DIVIDER_2,
        currentTheme,
        props
    );
    const borderClass = styles.borderColor || "border-secondary-medium";
    const orientClass =
        orientation === "vertical"
            ? `border-l ${borderClass} h-full`
            : `border-t ${borderClass} w-full`;
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={`${orientClass} ${className}`}
        />
    );
}

function Divider3({ orientation = "horizontal", className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DIVIDER_3,
        currentTheme,
        props
    );
    const borderClass = styles.borderColor || "border-tertiary-medium";
    const orientClass =
        orientation === "vertical"
            ? `border-l ${borderClass} h-full`
            : `border-t ${borderClass} w-full`;
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={`${orientClass} ${className}`}
        />
    );
}

export { Divider, Divider2, Divider3 };
