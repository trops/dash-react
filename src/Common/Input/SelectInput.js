import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

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

    const inputId = id || getUUID("", "select-input");

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
