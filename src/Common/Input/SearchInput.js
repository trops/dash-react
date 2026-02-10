import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const SearchInput = ({
    label = "",
    value = "",
    onChange = () => {},
    placeholder = "Search...",
    icon = "magnifying-glass",
    id = null,
    className = "",
    inputClassName = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SEARCH_INPUT, currentTheme, {
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

    const inputId = id || getUUID("", "search-input");

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
            <div className="relative">
                <span
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.textColor} opacity-70`}
                >
                    <FontAwesomeIcon icon={icon} />
                </span>
                <input
                    id={inputId}
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value, event)}
                    placeholder={placeholder}
                    className={`w-full rounded-md border pl-10 pr-3 py-2 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} focus:outline-none focus:ring-2 focus:ring-offset-0 ${inputClassName}`}
                />
            </div>
        </div>
    );
};

export { SearchInput };
