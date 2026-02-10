import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const InputText = ({
    label = "",
    value = "",
    onChange = () => {},
    placeholder = "",
    type = "text",
    id = null,
    className = "",
    inputClassName = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.INPUT_TEXT, currentTheme, {
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

    const inputId = id || getUUID("", "input-text");

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
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value, event)}
                placeholder={placeholder}
                className={`w-full rounded-md border px-3 py-2 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus:outline-none focus:ring-2 focus:ring-offset-0 ${inputClassName}`}
            />
        </div>
    );
};

export { InputText };
