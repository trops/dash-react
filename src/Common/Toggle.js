import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

function Toggle({
    text = "",
    enabled = false,
    setEnabled,
    disabled = false,
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOGGLE, currentTheme, {
        ...props,
    });

    function handleToggle() {
        if (!disabled && setEnabled) {
            setEnabled(!enabled);
        }
    }

    return (
        <div className={`flex flex-row items-center space-x-2 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                disabled={disabled}
                onClick={handleToggle}
                className={`${
                    enabled
                        ? styles.backgroundColor || ""
                        : styles.hoverBackgroundColor
                          ? styles.hoverBackgroundColor
                                .replace("hover:", "")
                                .replace("hover-", "")
                          : ""
                } relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </button>
            {text && (
                <span className={`text-sm ${styles.textColor || ""}`}>
                    {text}
                </span>
            )}
        </div>
    );
}

function Toggle2({
    text = "",
    enabled = false,
    setEnabled,
    disabled = false,
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOGGLE_2, currentTheme, {
        ...props,
    });

    function handleToggle() {
        if (!disabled && setEnabled) {
            setEnabled(!enabled);
        }
    }

    return (
        <div className={`flex flex-row items-center space-x-2 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                disabled={disabled}
                onClick={handleToggle}
                className={`${
                    enabled
                        ? styles.backgroundColor || ""
                        : styles.hoverBackgroundColor
                          ? styles.hoverBackgroundColor
                                .replace("hover:", "")
                                .replace("hover-", "")
                          : ""
                } relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? "translate-x-4" : "translate-x-0"
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </button>
            {text && (
                <span className={`text-sm ${styles.textColor || ""}`}>
                    {text}
                </span>
            )}
        </div>
    );
}

function Toggle3({
    text = "",
    enabled = false,
    setEnabled,
    disabled = false,
    className = "",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOGGLE_3, currentTheme, {
        ...props,
    });

    function handleToggle() {
        if (!disabled && setEnabled) {
            setEnabled(!enabled);
        }
    }

    return (
        <div className={`flex flex-row items-center space-x-1.5 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                disabled={disabled}
                onClick={handleToggle}
                className={`${
                    enabled
                        ? styles.backgroundColor || ""
                        : styles.hoverBackgroundColor
                          ? styles.hoverBackgroundColor
                                .replace("hover:", "")
                                .replace("hover-", "")
                          : ""
                } relative inline-flex h-4 w-7 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? "translate-x-3" : "translate-x-0"
                    } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </button>
            {text && (
                <span className={`text-xs ${styles.textColor || ""}`}>
                    {text}
                </span>
            )}
        </div>
    );
}

export { Toggle, Toggle2, Toggle3 };
