import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Checkbox = ({
    label = "",
    checked = false,
    onChange = () => {},
    id = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CHECKBOX, currentTheme, {
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

    const inputId = id || getUUID("", "checkbox");

    return (
        <label
            className={`flex items-center space-x-2 ${className}`}
            htmlFor={inputId}
        >
            <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked, event)}
                className={`h-4 w-4 rounded border ${styles.borderColor} ${styles.backgroundColor}`}
            />
            {label && (
                <span className={`text-sm ${labelStyles.textColor}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export { Checkbox };
