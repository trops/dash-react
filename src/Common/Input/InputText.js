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
    autoFocus = false,
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
                disabled={props.disabled}
                autoFocus={autoFocus}
                className={`w-full h-10 border shadow-sm px-3 py-2 ${styles.string} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} ${inputClassName}`}
            />
        </div>
    );
};

export { InputText };
