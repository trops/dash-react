import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

/**
 * Semantic state → fixed colors. These intentionally bypass the
 * theme contract because the meaning ("green = success", "red =
 * error") needs to read the same way no matter which theme the user
 * selects. Encapsulating the choice here means widget authors call
 * `<StatusBadge state="success" />` and never reach for raw Tailwind
 * color utilities themselves — which was the cohesion gap this
 * primitive is closing.
 *
 * Each entry pairs a fill (background + text) tuned for both dark
 * and light surfaces (using ~/30 opacity so the badge integrates
 * with any surrounding panel without clobbering theme bg) and a dot
 * color for the compact variant.
 */
// Pill colors use solid shades (no /N opacity modifiers) so the
// classes stay inside dash-electron's safelist guarantee. The "900
// background, 300 text" pairing mirrors what the chrome's Alert
// component does for its error / warning states (subtle saturated
// background, brighter foreground) and reads well on every theme
// the chrome currently ships.
const STATE_STYLES = {
    success: {
        bg: "bg-emerald-900",
        text: "text-emerald-300",
        dot: "bg-emerald-500",
    },
    open: {
        bg: "bg-emerald-900",
        text: "text-emerald-300",
        dot: "bg-emerald-500",
    },
    pending: {
        bg: "bg-amber-900",
        text: "text-amber-300",
        dot: "bg-amber-500",
        dotAnimation: "animate-pulse",
    },
    warning: {
        bg: "bg-amber-900",
        text: "text-amber-300",
        dot: "bg-amber-500",
    },
    error: {
        bg: "bg-rose-900",
        text: "text-rose-300",
        dot: "bg-rose-500",
    },
    closed: {
        bg: "bg-violet-900",
        text: "text-violet-300",
        dot: "bg-violet-500",
    },
    info: {
        bg: "bg-sky-900",
        text: "text-sky-300",
        dot: "bg-sky-500",
    },
    neutral: {
        bg: "bg-slate-800",
        text: "text-slate-300",
        dot: "bg-slate-500",
    },
};

const StatusBadge = ({
    state = "neutral",
    label = null,
    compact = false,
    className = "",
    children = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    // Pull spacing + border-radius defaults from the theme so the
    // badge respects the same shape language as siblings (Tag,
    // EmptyState). Color is overridden by STATE_STYLES below — see
    // the file-level comment for the rationale.
    const styles = getStylesForItem(themeObjects.STATUS_BADGE, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const stateStyle = STATE_STYLES[state] || STATE_STYLES.neutral;
    const borderRadius = styles.borderRadius || "rounded-full";

    if (compact) {
        return (
            <span
                className={`inline-flex items-center gap-1.5 ${className}`}
                role="status"
                aria-label={label || state}
            >
                <span
                    className={`inline-block w-2 h-2 rounded-full ${stateStyle.dot} ${stateStyle.dotAnimation || ""}`}
                    aria-hidden="true"
                />
                {(label || children) && (
                    <span className={`text-xs ${stateStyle.text}`}>
                        {children !== null ? children : label}
                    </span>
                )}
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${borderRadius} ${stateStyle.bg} ${stateStyle.text} ${className}`}
            role="status"
        >
            <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${stateStyle.dot} ${stateStyle.dotAnimation || ""}`}
                aria-hidden="true"
            />
            {children !== null ? children : label}
        </span>
    );
};

export { StatusBadge };
