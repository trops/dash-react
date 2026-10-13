import React, { useContext, useId } from "react";
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
    // Tie the label, description and error to the field (WCAG 1.3.1 / 3.3.1):
    // a single child element gets an id (unless it has one) plus
    // aria-describedby, aria-invalid and aria-required.
    const autoId = useId();
    const only =
        React.Children.count(children) === 1 && React.isValidElement(children)
            ? children
            : null;
    const fieldId = (only && only.props.id) || `field-${autoId}`;
    const descId = description ? `${fieldId}-desc` : null;
    const errId = error ? `${fieldId}-error` : null;
    const describedBy = [descId, errId].filter(Boolean).join(" ") || undefined;
    const field = only
        ? React.cloneElement(only, {
              id: fieldId,
              "aria-describedby": describedBy,
              ...(error ? { "aria-invalid": true } : {}),
              ...(required ? { "aria-required": true } : {}),
          })
        : children;
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
                    htmlFor={only ? fieldId : undefined}
                    className={`text-sm font-medium ${labelStyles.textColor || ""}`}
                >
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
            )}
            {description && (
                <p
                    id={descId}
                    className={`text-xs ${labelStyles.textColor || ""} opacity-60`}
                >
                    {description}
                </p>
            )}
            {field}
            {error && (
                <p id={errId} className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export { FormField };
