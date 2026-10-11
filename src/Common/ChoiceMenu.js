import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * ChoiceMenu — a single-choice menu behind one button: "Type: Widget ▾".
 * For a short set of options where one is always chosen (what to make, which
 * AI to use). Multi-select filters are FilterMenu; two or three always-visible
 * options are better as SegmentedControl.
 *
 * The button has aria-haspopup="menu" / aria-expanded. The menu is
 * role="menu" with a role="menuitemradio" per option (aria-checked on the
 * chosen one). Arrow keys move between options, Enter or Space picks, Escape
 * or a click outside closes and returns focus to the button.
 *
 * Props:
 *   label      — the choice's name ("Type", "AI"); the button reads
 *                "<label>: <chosen option>" (or just the option with
 *                showLabel={false})
 *   value      — the chosen option's value
 *   options    — array of strings, or { value, label, description?,
 *                disabled?, hint? }. A disabled option stays visible with its
 *                hint ("Coming later") and can't be picked.
 *   onChange   — called with the picked option's value
 *   showLabel  — prefix the button text with the label (default true)
 *   align      — "left" | "right": which edge the menu lines up with
 *   direction  — "down" | "up": open below or above the button
 *   footer     — optional content under the options (e.g. a "Set up AI…" link)
 *   className  — layout classes for the container
 *
 * Styling: reads the active theme's tokens; the Aurora design system can
 * restyle it via the `dr-choice-menu` / `dr-choice-menu-panel` /
 * `dr-choice-menu-item` hooks.
 */
const normalize = (option) =>
    typeof option === "string" || typeof option === "number"
        ? { value: option, label: String(option) }
        : { ...option, label: String(option.label ?? option.value) };

const ChoiceMenu = ({
    label = "Choose",
    value = null,
    options = [],
    onChange = null,
    showLabel = true,
    align = "left",
    direction = "down",
    footer = null,
    className = "",
}) => {
    // The default context carries `currentTheme: null` — fall back to {}.
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    const border = currentTheme["border-neutral-dark"] || "border-gray-700";
    const idleText = currentTheme["text-neutral-medium"] || "text-gray-400";
    const strongText = currentTheme["text-neutral-light"] || "text-gray-200";
    const panelBg = currentTheme["bg-neutral-very-dark"] || "bg-gray-900";
    const activeBg = currentTheme["bg-primary-very-dark"] || "bg-gray-800";

    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const itemRefs = useRef([]);

    const opts = options.map(normalize);
    const chosen = opts.find((o) => o.value === value) || null;
    const text = chosen
        ? showLabel
            ? `${label}: ${chosen.label}`
            : chosen.label
        : label;
    const enabledIndexes = opts
        .map((o, i) => (o.disabled ? -1 : i))
        .filter((i) => i >= 0);

    // Close on a click outside.
    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    // Opening focuses the chosen option (or the first one that can be picked).
    useEffect(() => {
        if (!open) return;
        const start = opts.findIndex((o) => o.value === value && !o.disabled);
        const index = start >= 0 ? start : enabledIndexes[0];
        const el = index !== undefined ? itemRefs.current[index] : null;
        if (el && typeof el.focus === "function") el.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const close = () => {
        setOpen(false);
        if (buttonRef.current) buttonRef.current.focus();
    };

    const pick = (option) => {
        if (option.disabled) return;
        if (onChange) onChange(option.value);
        close();
    };

    const moveFocus = (step) => {
        if (!enabledIndexes.length) return;
        const current = itemRefs.current.indexOf(document.activeElement);
        const pos = enabledIndexes.indexOf(current);
        const next =
            pos < 0
                ? enabledIndexes[0]
                : enabledIndexes[
                      (pos + step + enabledIndexes.length) %
                          enabledIndexes.length
                  ];
        const el = itemRefs.current[next];
        if (el) el.focus();
    };

    const onMenuKeyDown = (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            close();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveFocus(1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveFocus(-1);
        } else if (e.key === "Tab") {
            setOpen(false);
        }
    };

    const placement = `${align === "right" ? "right-0" : "left-0"} ${
        direction === "up" ? "bottom-full mb-1" : "top-full mt-1"
    }`;

    return (
        <div
            ref={rootRef}
            className={`relative inline-flex items-center ${className}`}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown" && !open) {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                className={`dr-choice-menu inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 ${border} ${strongText}`}
            >
                <span>{text}</span>
                <span aria-hidden="true">▾</span>
            </button>
            {open ? (
                <div
                    role="menu"
                    aria-label={label}
                    onKeyDown={onMenuKeyDown}
                    className={`dr-choice-menu-panel absolute ${placement} z-50 w-64 flex flex-col gap-1 p-2 rounded-lg border shadow-lg ${panelBg} ${border}`}
                >
                    {opts.map((o, i) => {
                        const isChosen = chosen && o.value === chosen.value;
                        return (
                            <button
                                key={String(o.value)}
                                ref={(el) => {
                                    itemRefs.current[i] = el;
                                }}
                                type="button"
                                role="menuitemradio"
                                aria-checked={!!isChosen}
                                aria-disabled={o.disabled ? true : undefined}
                                tabIndex={-1}
                                onClick={() => pick(o)}
                                className={`dr-choice-menu-item flex flex-col items-start text-left px-2 py-1.5 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 ${
                                    o.disabled
                                        ? `${idleText} cursor-not-allowed`
                                        : `${strongText} cursor-pointer`
                                } ${isChosen ? activeBg : ""}`}
                            >
                                <span className="flex w-full items-center gap-2">
                                    <span className="flex-1 truncate">
                                        {o.label}
                                    </span>
                                    {isChosen ? (
                                        <span aria-hidden="true">✓</span>
                                    ) : null}
                                </span>
                                {o.description || o.hint ? (
                                    <span className={`text-xs ${idleText}`}>
                                        {o.disabled && o.hint
                                            ? o.hint
                                            : o.description}
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                    {footer ? (
                        <div className={`border-t pt-1 ${border}`}>
                            {footer}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

export { ChoiceMenu };
