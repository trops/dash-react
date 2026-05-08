import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

/**
 * Code — inline monospace highlight for ids, scoped names, and
 * snippets that appear in running prose.
 *
 * Renders a semantic `<code>` element with:
 *   - monospace font
 *   - subtle theme-driven background lift
 *   - small horizontal padding + rounded corners
 *
 * Replaces ad-hoc `bg-white/10 px-1.5 py-0.5 rounded font-mono` spans
 * scattered across the codebase. The background color comes from the
 * active theme so light/dark switches don't leave the code chips
 * mismatched against the new background.
 *
 * Three tiers (Code / Code_2 / Code_3) follow the same
 * primary/secondary/tertiary token hierarchy as the other Text
 * primitives.
 *
 * Usage:
 *   The widget id is <Code>{scopedId}</Code>.
 *   Run <Code2>npm run ci</Code2> before pushing.
 */
function Code({ children, className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE, currentTheme, props);
    return (
        <code
            className={`font-mono ${styles.textSize || "text-xs"} ${styles.textColor || ""} ${styles.backgroundColor || ""} px-1.5 py-0.5 rounded ${className}`}
        >
            {children}
        </code>
    );
}

function Code2({ children, className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE_2, currentTheme, props);
    return (
        <code
            className={`font-mono ${styles.textSize || "text-xs"} ${styles.textColor || ""} ${styles.backgroundColor || ""} px-1.5 py-0.5 rounded ${className}`}
        >
            {children}
        </code>
    );
}

function Code3({ children, className = "", ...props }) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE_3, currentTheme, props);
    return (
        <code
            className={`font-mono ${styles.textSize || "text-xs"} ${styles.textColor || ""} ${styles.backgroundColor || ""} px-1.5 py-0.5 rounded ${className}`}
        >
            {children}
        </code>
    );
}

export { Code, Code2, Code3 };
