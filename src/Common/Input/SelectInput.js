import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectInput = ({
    label = "",
    value = "",
    onChange = () => {},
    options = [],
    placeholder = "Select an option",
    id = null,
    className = "",
    inputClassName = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
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
    const hasIcons = options.some((opt) => opt.icon);

    // Custom dropdown state (only used when options have icons)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        function handleKeyDown(e) {
            if (e.key === "Escape") setIsOpen(false);
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const selectedOption = options.find(
        (opt) => String(opt.value) === String(value)
    );

    // Custom dropdown for options with icons
    if (hasIcons) {
        return (
            <div
                className={`flex flex-col space-y-1 ${className}`}
                ref={dropdownRef}
            >
                {label && (
                    <label className={`text-sm ${labelStyles.textColor}`}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    <button
                        type="button"
                        id={inputId}
                        disabled={props.disabled}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full rounded-md border px-3 py-2 transition-colors duration-150 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center justify-between gap-2 ${inputClassName}`}
                    >
                        <span className="flex items-center gap-2 truncate">
                            {selectedOption?.icon && (
                                <FontAwesomeIcon
                                    icon={selectedOption.icon}
                                    className="h-3.5 w-3.5 shrink-0 opacity-70"
                                />
                            )}
                            <span className="truncate">
                                {selectedOption
                                    ? selectedOption.label
                                    : placeholder}
                            </span>
                        </span>
                        <FontAwesomeIcon
                            icon="chevron-down"
                            className={`h-3 w-3 shrink-0 opacity-50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    {isOpen && (
                        <div
                            className={`absolute z-50 mt-1 w-full rounded-md border shadow-lg ${styles.backgroundColor} ${styles.borderColor} overflow-hidden`}
                        >
                            <div className="max-h-60 overflow-y-auto py-1">
                                {options.map((option) => {
                                    const isSelected =
                                        String(option.value) === String(value);
                                    return (
                                        <button
                                            type="button"
                                            key={option.value}
                                            onClick={() => {
                                                onChange(option.value);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 flex items-center gap-2 text-sm transition-colors duration-150 ${
                                                isSelected
                                                    ? `${itemStyles.selectedBackgroundColor || itemStyles.hoverBackgroundColor} ${itemStyles.selectedTextColor || styles.textColor}`
                                                    : `${styles.textColor} ${itemStyles.hoverBackgroundColor} ${itemStyles.hoverTextColor}`
                                            }`}
                                        >
                                            {option.icon && (
                                                <FontAwesomeIcon
                                                    icon={option.icon}
                                                    className="h-3.5 w-3.5 shrink-0 opacity-70"
                                                />
                                            )}
                                            <span className="truncate">
                                                {option.label}
                                            </span>
                                            {isSelected && (
                                                <FontAwesomeIcon
                                                    icon="check"
                                                    className="h-3 w-3 shrink-0 ml-auto opacity-70"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
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
                value={value}
                onChange={(event) => onChange(event.target.value, event)}
                disabled={props.disabled}
                className={`w-full rounded-md border px-3 py-2 transition-colors duration-150 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { SelectInput };
