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
 * Each entry pairs a pill fill (background + text), a dot color, and
 * the text color for the compact (dot + label) variant, which sits
 * directly on the surrounding panel.
 */
// Pill colors use solid shades (no /N opacity modifiers) so the
// classes stay inside dash-electron's safelist guarantee. On dark
// themes the "900 background, 300 text" pairing gives a subtle
// saturated pill; on light themes it flips to "100 background, 800
// text" (and 700 for compact labels) so the text stays readable on
// pale surfaces.
const STATE_STYLES = {
    dark: {
        success: {
            bg: "bg-emerald-900",
            text: "text-emerald-300",
            dot: "bg-emerald-500",
            compactText: "text-emerald-300",
        },
        open: {
            bg: "bg-emerald-900",
            text: "text-emerald-300",
            dot: "bg-emerald-500",
            compactText: "text-emerald-300",
        },
        pending: {
            bg: "bg-amber-900",
            text: "text-amber-300",
            dot: "bg-amber-500",
            compactText: "text-amber-300",
            dotAnimation: "animate-pulse",
        },
        warning: {
            bg: "bg-amber-900",
            text: "text-amber-300",
            dot: "bg-amber-500",
            compactText: "text-amber-300",
        },
        error: {
            bg: "bg-rose-900",
            text: "text-rose-300",
            dot: "bg-rose-500",
            compactText: "text-rose-300",
        },
        closed: {
            bg: "bg-violet-900",
            text: "text-violet-300",
            dot: "bg-violet-500",
            compactText: "text-violet-300",
        },
        info: {
            bg: "bg-sky-900",
            text: "text-sky-300",
            dot: "bg-sky-500",
            compactText: "text-sky-300",
        },
        neutral: {
            bg: "bg-slate-800",
            text: "text-slate-300",
            dot: "bg-slate-500",
            compactText: "text-slate-300",
        },
    },
    light: {
        success: {
            bg: "bg-emerald-100",
            text: "text-emerald-800",
            dot: "bg-emerald-500",
            compactText: "text-emerald-700",
        },
        open: {
            bg: "bg-emerald-100",
            text: "text-emerald-800",
            dot: "bg-emerald-500",
            compactText: "text-emerald-700",
        },
        pending: {
            bg: "bg-amber-100",
            text: "text-amber-800",
            dot: "bg-amber-500",
            compactText: "text-amber-700",
            dotAnimation: "animate-pulse",
        },
        warning: {
            bg: "bg-amber-100",
            text: "text-amber-800",
            dot: "bg-amber-500",
            compactText: "text-amber-700",
        },
        error: {
            bg: "bg-rose-100",
            text: "text-rose-800",
            dot: "bg-rose-500",
            compactText: "text-rose-700",
        },
        closed: {
            bg: "bg-violet-100",
            text: "text-violet-800",
            dot: "bg-violet-500",
            compactText: "text-violet-700",
        },
        info: {
            bg: "bg-sky-100",
            text: "text-sky-800",
            dot: "bg-sky-500",
            compactText: "text-sky-700",
        },
        neutral: {
            bg: "bg-slate-200",
            text: "text-slate-800",
            dot: "bg-slate-500",
            compactText: "text-slate-700",
        },
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
    const { currentTheme, themeVariant } = useContext(ThemeContext);
    // Pull spacing + border-radius defaults from the theme so the
    // badge respects the same shape language as siblings (Tag,
    // EmptyState). Color is overridden by STATE_STYLES below — see
    // the file-level comment for the rationale.
    const styles = getStylesForItem(themeObjects.STATUS_BADGE, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const palette =
        themeVariant === "light" ? STATE_STYLES.light : STATE_STYLES.dark;
    const stateStyle = palette[state] || palette.neutral;
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
                    <span className={`text-xs ${stateStyle.compactText}`}>
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
