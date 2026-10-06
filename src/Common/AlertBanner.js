import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { getStatusColors } from "@dash/Utils/statusColors";

/**
 * AlertBanner - A modern, visually distinctive alert component
 *
 * Design Philosophy:
 * - Bold left border accent for immediate visual impact
 * - Color-coded variants with consistent semantics
 * - Clean typography with strong hierarchy
 * - Smooth animations for professional feel
 * - Icons for quick recognition
 *
 * Variants:
 * - info (blue): Informational messages
 * - success (green): Success confirmations
 * - warning (amber): Warning messages
 * - error (red): Error alerts
 *
 * Colors follow the active light/dark theme variant (see
 * Utils/statusColors.js) so text stays readable on both.
 *
 * Sizes:
 * - default: roomy padding, for pages and modals
 * - compact: tight padding and small text, for widgets
 */

const SIZE_STYLES = {
    default: {
        container: "rounded-md p-4 shadow-sm",
        gap: "gap-3",
        icon: "w-6 h-6",
        text: "text-sm",
        closeIcon: "w-4 h-4",
        closePadding: "p-1.5",
    },
    compact: {
        container: "rounded p-2",
        gap: "gap-2",
        icon: "w-4 h-4",
        text: "text-xs",
        closeIcon: "w-3 h-3",
        closePadding: "p-1",
    },
};

// SVG icon paths for each variant (20x20 viewBox)
const ICON_PATHS = {
    info: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
    success:
        "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    warning:
        "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
    error: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
};

const AlertBanner = ({
    variant = "info", // info | success | warning | error
    size = "default", // default | compact
    title = "",
    message = "",
    children = null,
    onClose = null,
    showIcon = true,
    className = "",
    animate = true,
    ...props
}) => {
    const { currentTheme, themeVariant } = useContext(ThemeContext);

    // Get theme-aware styles while allowing variant overrides
    const styles = getStylesForItem(themeObjects.ALERT_BANNER, currentTheme, {
        ...props,
    });

    const uuid = getUUID("", "alert-banner");
    const statusColors = getStatusColors(themeVariant);
    const key = variant in statusColors ? variant : "info";
    const colors = statusColors[key];
    const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.default;

    // Animation classes
    const animationClass = animate
        ? "animate-in slide-in-from-top-2 fade-in duration-300"
        : "";

    return (
        <div
            id={uuid}
            className={`
                ${colors.bg} border-l-4 ${colors.accentBorder}
                ${sizeStyle.container}
                ${animationClass}
                ${className}
            `}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className={`flex items-start ${sizeStyle.gap}`}>
                {/* Icon */}
                {showIcon && (
                    <div
                        className={`
                            ${colors.icon}
                            flex-shrink-0
                            mt-0.5
                        `}
                        aria-hidden="true"
                    >
                        <svg
                            className={sizeStyle.icon}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d={ICON_PATHS[key]}
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <h3
                            className={`
                                ${colors.strongText}
                                ${sizeStyle.text} font-bold mb-1
                            `}
                        >
                            {title}
                        </h3>
                    )}
                    {message && (
                        <p
                            className={`
                                ${colors.text}
                                ${sizeStyle.text} leading-relaxed break-words
                            `}
                        >
                            {message}
                        </p>
                    )}
                    {children && (
                        <div
                            className={`
                                ${colors.text}
                                ${sizeStyle.text}
                                ${title || message ? "mt-2" : ""}
                            `}
                        >
                            {children}
                        </div>
                    )}
                </div>

                {/* Close Button */}
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className={`
                            ${colors.icon} ${colors.hoverText} ${colors.hoverBg}
                            flex-shrink-0
                            rounded-md ${sizeStyle.closePadding}
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
                        `}
                        aria-label="Dismiss alert"
                    >
                        <svg
                            className={sizeStyle.closeIcon}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export { AlertBanner };
