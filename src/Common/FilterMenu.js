import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * FilterMenu — a searchable multi-select filter for open-ended lists (orgs,
 * teams, folders). One button keeps the filter bar to a single line however
 * many options there are; small fixed sets (status, in use / not used) are
 * better as SegmentedControl or chips.
 *
 * The button reads "Org", "Org: @acme" or "Org: 3 selected", with a clear
 * button while anything is selected. The menu has its own search, a checkbox
 * per option with its count, and closes on Escape or a click outside.
 *
 * Props:
 *   label             — the filter's name ("Org", "Team", "Folder")
 *   options           — array of strings, or `{ value, label, count? }`
 *   selected          — array of selected values
 *   onChange          — called with the new array of selected values
 *   searchPlaceholder — placeholder for the menu's search box
 *   className         — layout classes for the container
 *
 * Styling: reads the active theme's tokens; the Aurora design system can
 * restyle it via the `dr-filter-menu` / `dr-filter-menu-active` /
 * `dr-filter-menu-panel` hooks.
 */
const normalize = (option) =>
    typeof option === "string" || typeof option === "number"
        ? { value: option, label: String(option), count: null }
        : {
              count: null,
              ...option,
              label: String(option.label ?? option.value),
          };

const FilterMenu = ({
    label = "Filter",
    options = [],
    selected = [],
    onChange = null,
    searchPlaceholder = null,
    className = "",
}) => {
    // The default context carries `currentTheme: null` — fall back to {}.
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    const border = currentTheme["border-neutral-dark"] || "border-gray-700";
    const idleText = currentTheme["text-neutral-medium"] || "text-gray-400";
    const strongText = currentTheme["text-neutral-light"] || "text-gray-200";
    const activeBg = currentTheme["bg-primary-very-dark"] || "bg-gray-800";
    const activeBorder =
        currentTheme["border-primary-medium"] || "border-gray-500";
    const panelBg = currentTheme["bg-neutral-very-dark"] || "bg-gray-900";

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const rootRef = useRef(null);

    const opts = options.map(normalize);
    const chosen = Array.isArray(selected) ? selected : [];
    const active = chosen.length > 0;
    const chosenLabel =
        chosen.length === 1
            ? (
                  opts.find((o) => o.value === chosen[0]) || {
                      label: String(chosen[0]),
                  }
              ).label
            : null;
    const text = !active
        ? label
        : chosenLabel
          ? `${label}: ${chosenLabel}`
          : `${label}: ${chosen.length} selected`;

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

    const toggleOpen = () => {
        setQuery("");
        setOpen((v) => !v);
    };

    const toggle = (value) => {
        if (!onChange) return;
        onChange(
            chosen.includes(value)
                ? chosen.filter((v) => v !== value)
                : [...chosen, value]
        );
    };

    const q = query.trim().toLowerCase();
    const visible = q
        ? opts.filter((o) => o.label.toLowerCase().includes(q))
        : opts;

    return (
        <div
            ref={rootRef}
            className={`relative inline-flex items-center gap-1 ${className}`}
        >
            <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={toggleOpen}
                className={`dr-filter-menu ${active ? "dr-filter-menu-active" : ""} inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                    active
                        ? `${activeBg} ${activeBorder} ${strongText}`
                        : `${border} ${idleText}`
                }`}
            >
                <span>{text}</span>
                <span aria-hidden="true">▾</span>
            </button>
            {active ? (
                <button
                    type="button"
                    aria-label={`Clear ${label} filter`}
                    onClick={() => onChange && onChange([])}
                    className={`inline-flex items-center justify-center h-6 w-6 rounded-full border text-xs ${border} ${idleText}`}
                >
                    ✕
                </button>
            ) : null}
            {open ? (
                <div
                    role="dialog"
                    aria-label={`${label} filter`}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            e.stopPropagation();
                            setOpen(false);
                        }
                    }}
                    className={`dr-filter-menu-panel absolute left-0 top-full mt-1 z-50 w-64 flex flex-col gap-1 p-2 rounded-lg border shadow-lg ${panelBg} ${border}`}
                >
                    <input
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={
                            searchPlaceholder || `Find ${label.toLowerCase()}…`
                        }
                        aria-label={
                            searchPlaceholder || `Find ${label.toLowerCase()}`
                        }
                        className={`w-full px-2 py-1.5 rounded-md border bg-transparent text-sm outline-none ${border} ${strongText}`}
                    />
                    <div className="flex flex-col max-h-60 overflow-y-auto">
                        {visible.length === 0 ? (
                            <div className={`px-2 py-2 text-sm ${idleText}`}>
                                No match
                            </div>
                        ) : (
                            visible.map((o) => (
                                <label
                                    key={String(o.value)}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer ${strongText}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={chosen.includes(o.value)}
                                        onChange={() => toggle(o.value)}
                                    />
                                    <span className="flex-1 truncate">
                                        {o.label}
                                    </span>
                                    {o.count !== null &&
                                    o.count !== undefined ? (
                                        <span className={`text-xs ${idleText}`}>
                                            {o.count}
                                        </span>
                                    ) : null}
                                </label>
                            ))
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export { FilterMenu };
