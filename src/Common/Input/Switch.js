import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Switch = ({
    label = "",
    checked = false,
    onChange = () => {},
    id = null,
    className = "",
    // Accessible name when there's no visible `label` (e.g. icon-flanked switches).
    ariaLabel = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SWITCH, currentTheme, {
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

    const switchId = id || getUUID("", "switch");

    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <button
                id={switchId}
                type="button"
                role="switch"
                aria-checked={checked}
                aria-labelledby={label ? `${switchId}-label` : undefined}
                aria-label={label ? undefined : ariaLabel || undefined}
                onClick={handleToggle}
                data-checked={checked ? "true" : "false"}
                className={`dr-switch relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${styles.backgroundColor} ${checked ? "opacity-100" : "opacity-60"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                <span
                    className={`dr-switch-knob inline-block h-4 w-4 transform rounded-full ${styles.activeBackgroundColor || "bg-white"} transition ${
                        checked ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
            {label && (
                <label
                    id={`${switchId}-label`}
                    htmlFor={switchId}
                    className={`text-sm cursor-pointer ${labelStyles.textColor}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export { Switch };
