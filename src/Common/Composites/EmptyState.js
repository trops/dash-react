import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { SubHeading3 } from "../Text/Heading";

/**
 * EmptyState (design guide: "Say what will appear and how to get it"): an
 * optional icon, a short title, one sentence naming what shows up here and
 * how to add the first one, and at most one action (children).
 *
 * Muted parts take the theme's muted text token, never opacity, so the
 * description stays readable on its surface in both modes.
 */
const EmptyState = ({
    icon = null,
    title = null,
    description = null,
    children = null,
    className = "",
    testId,
}) => {
    // The default context carries currentTheme: null — fall back to {}.
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    const styles = getStylesForItem(themeObjects.EMPTY_STATE, currentTheme, {
        scrollable: false,
        grow: false,
    });
    const muted = currentTheme["text-neutral-medium"] || "";

    return (
        <div
            className={`dr-empty flex flex-col items-center justify-center text-center gap-1 ${styles.spacing || "p-8"} ${styles.borderRadius || "rounded-lg"} ${className}`}
            data-testid={testId}
        >
            {icon && (
                <div
                    className={`dr-empty-icon mb-3 ${muted}`}
                    aria-hidden="true"
                >
                    {icon}
                </div>
            )}
            {title && (
                <SubHeading3
                    title={title}
                    padding={false}
                    className="dr-empty-title justify-center"
                />
            )}
            {description && (
                <p
                    className={`dr-empty-desc text-sm max-w-sm ${muted}`}
                    style={{ margin: 0 }}
                >
                    {description}
                </p>
            )}
            {children && <div className="mt-3">{children}</div>}
        </div>
    );
};

export { EmptyState };
