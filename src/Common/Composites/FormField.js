import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const FormField = ({
    label,
    description = null,
    required = false,
    error = null,
    className = "",
    children,
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const labelStyles = getStylesForItem(
        themeObjects.FORM_LABEL,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    return (
        <div className={`flex flex-col space-y-1.5 ${className}`}>
            {label && (
                <label
                    className={`text-sm font-medium ${labelStyles.textColor || ""}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {description && (
                <p
                    className={`text-xs ${labelStyles.textColor || ""} opacity-60`}
                >
                    {description}
                </p>
            )}
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export { FormField };
