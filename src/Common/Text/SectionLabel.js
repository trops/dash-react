import { useContext, createElement } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * SectionLabel — the small uppercase micro-label above a group of content
 * inside a widget ("TASK STATES", "LISTENER STATUS", "RESULTS").
 *
 * Replaces the hand-rolled `text-xs uppercase tracking-wide text-gray-500`
 * idiom so the label follows the active theme, and the Aurora design system
 * can render it as its mono caption via the `dr-section-label` hook.
 *
 * Not a heading: use SubHeading* for titles, Caption for inline metadata.
 *
 * Usage:
 *   <SectionLabel>Task States</SectionLabel>
 *   <SectionLabel text="Event Log" className="mb-1" />
 */
function SectionLabel({ text = null, as = null, className = "", children }) {
    const { currentTheme = {} } = useContext(ThemeContext) || {};
    const color = currentTheme["text-neutral-medium"] || "text-gray-500";
    return createElement(
        as || "div",
        {
            className: `dr-section-label text-xs font-medium uppercase tracking-wide ${color} ${className}`,
        },
        children !== undefined ? children : text
    );
}

export { SectionLabel };
