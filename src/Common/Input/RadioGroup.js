import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const RadioGroup = ({
    label = "",
    name = null,
    value = "",
    onChange = () => {},
    options = [],
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.RADIO, currentTheme, {
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

    const groupId = getUUID("", "radio-group");
    const groupName = name || groupId;

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && (
                <div className={`text-sm ${labelStyles.textColor}`}>
                    {label}
                </div>
            )}
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center space-x-2"
                >
                    <input
                        type="radio"
                        name={groupName}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(event) =>
                            onChange(event.target.value, event)
                        }
                        className={`h-4 w-4 ${styles.borderColor} ${styles.backgroundColor} focus-visible:ring-2 ${styles.focusRingColor || ""} disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <span className={`text-sm ${labelStyles.textColor}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
};

export { RadioGroup };
