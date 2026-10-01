import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * SegmentedControl — a compact single-choice value picker, e.g.
 * `Today | Week | Create` or an export-format switch.
 *
 * Use it when the user picks ONE of a few mutually-exclusive views/modes
 * in place. (Use Tabs when each choice owns a content panel; use Button
 * for actions.)
 *
 * Props:
 *   options   — array of strings, or `{ value, label, disabled? }`
 *   value     — the selected option's value
 *   onChange  — called with the newly selected value (not called when the
 *               already-selected option is clicked)
 *   size      — "sm" (default) | "md"
 *   ariaLabel — accessible name for the group
 *   className — layout classes for the container
 *
 * Styling: reads the active theme's tokens; the Aurora design system
 * restyles it via the `dr-segmented` / `dr-segment` / `dr-segment-active`
 * hooks.
 */
const normalize = (option) =>
    typeof option === "string" || typeof option === "number"
        ? { value: option, label: String(option), disabled: false }
        : { disabled: false, ...option };

const SIZE_CLASSES = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
};

const SegmentedControl = ({
    options = [],
    value = null,
    onChange = null,
    size = "sm",
    ariaLabel = undefined,
    className = "",
}) => {
    const { currentTheme = {} } = useContext(ThemeContext) || {};
    const trackBg = currentTheme["bg-neutral-very-dark"] || "bg-gray-900";
    const trackBorder =
        currentTheme["border-neutral-dark"] || "border-gray-700";
    const activeBg = currentTheme["bg-primary-medium"] || "bg-gray-700";
    const activeText = currentTheme["text-primary-very-light"] || "text-white";
    const idleText = currentTheme["text-neutral-medium"] || "text-gray-400";
    const sizeClasses = SIZE_CLASSES[size] || SIZE_CLASSES.sm;

    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            className={`dr-segmented inline-flex items-center gap-0.5 p-0.5 rounded-md border ${trackBg} ${trackBorder} ${className}`}
        >
            {options.map(normalize).map((opt) => {
                const active = opt.value === value;
                return (
                    <button
                        key={String(opt.value)}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        disabled={opt.disabled}
                        onClick={() => {
                            if (active || opt.disabled) return;
                            if (onChange) onChange(opt.value);
                        }}
                        className={`dr-segment ${active ? "dr-segment-active" : ""} ${sizeClasses} rounded font-medium whitespace-nowrap transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
                            active ? `${activeBg} ${activeText}` : idleText
                        }`}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
};

export { SegmentedControl };
