import { useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorSchemeFor } from "../CodeEditor/editorTheme";

/**
 * Consecutive options with the same `group` become one <optgroup>; options
 * without a group stay top-level. Order is preserved. In the custom dropdown
 * (options with an `icon` or a `description`) each group gets a heading.
 */
function groupOptions(options) {
    const out = [];
    options.forEach((option, i) => {
        const last = out[out.length - 1];
        if (option.group && last && last.group === option.group) {
            last.options.push(option);
        } else {
            out.push({
                group: option.group || null,
                key: i,
                options: [option],
            });
        }
    });
    return out;
}

const SelectInput = ({
    label = "",
    value = "",
    onChange = () => {},
    options = [],
    placeholder = "Select an option",
    id = null,
    className = "",
    inputClassName = "",
    // Accessible name when there's no visible `label` (falls back to the placeholder).
    ariaLabel = null,
    ...props
}) => {
    const { currentTheme, themeVariant } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });
    const labelStyles = getStylesForItem(
        themeObjects.FORM_LABEL,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );
    const itemStyles = getStylesForItem(themeObjects.MENU_ITEM, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const inputId = id || getUUID("", "select-input");
    const unlabeledName = label
        ? undefined
        : ariaLabel || placeholder || undefined;
    const hasIcons = options.some((opt) => opt.icon);
    // A second line under an option ("now Haiku 5.5") needs the custom
    // dropdown too; so does dimming one (`muted`).
    const custom = hasIcons || options.some((opt) => opt.description);
    const hasEmptyOption = options.some((opt) => String(opt.value) === "");

    // Custom dropdown state (only used when options have icons or descriptions)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const listRef = useRef(null);
    // Where the open list sits on screen (it floats above everything).
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!isOpen) return;
        // Below the field, or above it when there's more room there; never
        // taller than the room it has.
        function measure() {
            const el = triggerRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const gap = 4;
            const margin = 8;
            const below = window.innerHeight - r.bottom - gap - margin;
            const above = r.top - gap - margin;
            const up = below < 240 && above > below;
            setPlace({
                left: r.left,
                minWidth: r.width,
                maxHeight: Math.max(120, Math.min(320, up ? above : below)),
                ...(up
                    ? { bottom: window.innerHeight - r.top + gap }
                    : { top: r.bottom + gap }),
            });
        }
        measure();
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        return () => {
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e) {
            const inside =
                (dropdownRef.current &&
                    dropdownRef.current.contains(e.target)) ||
                (listRef.current && listRef.current.contains(e.target));
            if (!inside) setIsOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        // Escape closes the open list, and only the list: caught first (on
        // the window, while capturing) so a Modal or panel around the select
        // doesn't close too.
        function handleKeyDown(e) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                // Up and down move between the options.
                const items = listRef.current
                    ? Array.from(
                          listRef.current.querySelectorAll('[role="option"]')
                      )
                    : [];
                if (!items.length) return;
                e.preventDefault();
                const at = items.indexOf(document.activeElement);
                const step = e.key === "ArrowDown" ? 1 : -1;
                const next =
                    at < 0
                        ? 0
                        : Math.min(items.length - 1, Math.max(0, at + step));
                items[next].focus();
                return;
            }
            if (e.key !== "Escape") return;
            // Not even other listeners on the window (a Modal may listen there).
            e.stopImmediatePropagation();
            e.stopPropagation();
            setIsOpen(false);
            if (triggerRef.current) triggerRef.current.focus();
        }
        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !place || !listRef.current) return;
        // Once the list shows, focus the chosen option (or the first) so the
        // keyboard can reach it.
        const target =
            listRef.current.querySelector('[aria-selected="true"]') ||
            listRef.current.querySelector('[role="option"]');
        if (target) target.focus({ preventScroll: false });
    }, [isOpen, !!place]);

    // The open list floats above everything. Inside a dialog it's placed in
    // the dialog itself, so the dialog doesn't treat a click on it as a
    // click outside (and close), and its focus trap lets the keyboard in.
    const listHost = () =>
        (triggerRef.current &&
            triggerRef.current.closest(
                '[role="dialog"], [aria-modal="true"]'
            )) ||
        document.body;

    const selectedOption = options.find(
        (opt) => String(opt.value) === String(value)
    );

    // Custom dropdown for options with icons or descriptions
    if (custom) {
        return (
            <div
                className={`flex flex-col space-y-1 ${className}`}
                ref={dropdownRef}
            >
                {label && (
                    <label
                        id={`${inputId}-label`}
                        className={`text-sm ${labelStyles.textColor}`}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <button
                        ref={triggerRef}
                        type="button"
                        id={inputId}
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        aria-labelledby={
                            label ? `${inputId}-label ${inputId}` : undefined
                        }
                        aria-label={unlabeledName}
                        disabled={props.disabled}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`dr-input w-full rounded-md border px-3 py-2 transition-colors duration-150 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center justify-between gap-2 ${inputClassName}`}
                    >
                        <span className="flex items-center gap-2 truncate flex-1 min-w-0">
                            {selectedOption?.icon && (
                                <FontAwesomeIcon
                                    icon={selectedOption.icon}
                                    className="h-3.5 w-3.5 shrink-0 opacity-70"
                                />
                            )}
                            <span className="flex flex-col min-w-0">
                                <span className="truncate">
                                    {selectedOption
                                        ? selectedOption.label
                                        : placeholder}
                                </span>
                                {selectedOption?.description && (
                                    <span className="truncate text-xs opacity-70">
                                        {selectedOption.description}
                                    </span>
                                )}
                            </span>
                        </span>
                        {selectedOption?.badge && (
                            <span className="flex-shrink-0">
                                {selectedOption.badge}
                            </span>
                        )}
                        <FontAwesomeIcon
                            icon="chevron-down"
                            className={`h-3 w-3 shrink-0 opacity-50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    {isOpen &&
                        createPortal(
                            <div
                                ref={listRef}
                                className={`fixed z-50 w-max rounded-md border shadow-lg ${styles.backgroundColor} ${styles.borderColor} overflow-hidden`}
                                style={
                                    place
                                        ? {
                                              left: place.left,
                                              top: place.top,
                                              bottom: place.bottom,
                                              minWidth: place.minWidth,
                                          }
                                        : { visibility: "hidden" }
                                }
                            >
                                <div
                                    role="listbox"
                                    aria-label={label || unlabeledName}
                                    className="overflow-y-auto py-1"
                                    style={{
                                        maxHeight: place
                                            ? place.maxHeight
                                            : 320,
                                    }}
                                >
                                    {groupOptions(options).map((entry) => (
                                        <div
                                            key={`group-${entry.key}`}
                                            role={
                                                entry.group
                                                    ? "group"
                                                    : undefined
                                            }
                                            aria-label={
                                                entry.group || undefined
                                            }
                                        >
                                            {entry.group && (
                                                <div
                                                    aria-hidden="true"
                                                    className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide opacity-60 ${styles.textColor}`}
                                                >
                                                    {entry.group}
                                                </div>
                                            )}
                                            {entry.options.map((option) => {
                                                const isSelected =
                                                    String(option.value) ===
                                                    String(value);
                                                return (
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={
                                                            isSelected
                                                        }
                                                        key={option.value}
                                                        onClick={() => {
                                                            onChange(
                                                                option.value
                                                            );
                                                            setIsOpen(false);
                                                        }}
                                                        className={`w-full text-left px-3 py-1.5 flex items-center gap-2 text-sm transition-colors duration-150 ${
                                                            isSelected
                                                                ? `${itemStyles.selectedBackgroundColor || itemStyles.hoverBackgroundColor} ${itemStyles.selectedTextColor || styles.textColor}`
                                                                : `${styles.textColor} ${itemStyles.hoverBackgroundColor} ${itemStyles.hoverTextColor}`
                                                        }`}
                                                    >
                                                        {option.icon ? (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    isSelected
                                                                        ? "check"
                                                                        : option.icon
                                                                }
                                                                className="h-3.5 w-3.5 shrink-0 opacity-70"
                                                            />
                                                        ) : hasIcons ? null : (
                                                            // Without icons: a check
                                                            // marks the chosen one.
                                                            <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center">
                                                                {isSelected && (
                                                                    <FontAwesomeIcon
                                                                        icon="check"
                                                                        className="h-3 w-3 opacity-80"
                                                                    />
                                                                )}
                                                            </span>
                                                        )}
                                                        <span
                                                            className={`flex flex-col min-w-0 ${option.muted ? "opacity-60" : ""}`}
                                                        >
                                                            <span className="truncate">
                                                                {option.label}
                                                            </span>
                                                            {option.description && (
                                                                <span className="truncate text-xs opacity-70">
                                                                    {
                                                                        option.description
                                                                    }
                                                                </span>
                                                            )}
                                                        </span>
                                                        {option.badge && (
                                                            <span className="flex-shrink-0 ml-auto pl-2">
                                                                {option.badge}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>,
                            listHost()
                        )}
                </div>
            </div>
        );
    }

    // Native select for plain options (no icons)
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`text-sm ${labelStyles.textColor}`}
                >
                    {label}
                </label>
            )}
            <select
                id={inputId}
                aria-label={unlabeledName}
                // Native dropdown list follows the light/dark variant.
                style={{ colorScheme: colorSchemeFor(themeVariant) }}
                value={value}
                onChange={(event) => onChange(event.target.value, event)}
                disabled={props.disabled}
                className={`dr-input w-full rounded-md border px-3 py-2 transition-colors duration-150 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
            >
                {/* An option with an empty value (e.g. "Unassigned") takes the
                    placeholder's place — sharing "" would hide it. */}
                {hasEmptyOption ? null : (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {groupOptions(options).map((entry) =>
                    entry.group ? (
                        <optgroup
                            key={`group-${entry.key}`}
                            label={entry.group}
                        >
                            {entry.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </optgroup>
                    ) : (
                        <option
                            key={entry.options[0].value}
                            value={entry.options[0].value}
                        >
                            {entry.options[0].label}
                        </option>
                    )
                )}
            </select>
        </div>
    );
};

export { SelectInput };
