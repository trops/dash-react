import { useCallback, useContext, useLayoutEffect, useRef } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { dispatchInputChange } from "./dispatchInputChange";

const TextArea = ({
    label = "",
    value = "",
    onChange = () => {},
    placeholder = "",
    rows = 4,
    id = null,
    className = "",
    inputClassName = "",
    disabled = false,
    // Style override props
    backgroundColor = null,
    textColor = null,
    borderColor = null,
    placeholderTextColor = null,
    focusRingColor = null,
    focusBorderColor = null,
    // Density override — pass alternate Tailwind class string for
    // compact composer contexts.
    padding = "px-3 py-2",
    // Grow to fit the content instead of scrolling inside the box — for
    // forms that already scroll as a whole. `rows` stays the minimum.
    autoGrow = false,
    ...htmlProps
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const textareaRef = useRef(null);

    // Size the box to its content: reset to the rows-based height, then
    // take the content height plus the borders (box-sizing: border-box).
    const fitToContent = useCallback(() => {
        const el = textareaRef.current;
        if (!autoGrow || !el) return;
        el.style.height = "auto";
        const borders = el.offsetHeight - el.clientHeight;
        el.style.height = `${el.scrollHeight + Math.max(0, borders)}px`;
    }, [autoGrow]);

    // Re-fit when the value changes (typing or set from outside) and when
    // the width changes (lines re-wrap).
    useLayoutEffect(() => {
        fitToContent();
    }, [fitToContent, value]);
    useLayoutEffect(() => {
        if (!autoGrow) return undefined;
        window.addEventListener("resize", fitToContent);
        return () => window.removeEventListener("resize", fitToContent);
    }, [autoGrow, fitToContent]);
    const styles = getStylesForItem(themeObjects.TEXTAREA, currentTheme, {
        backgroundColor,
        textColor,
        borderColor,
        placeholderTextColor,
        focusRingColor,
        focusBorderColor,
        scrollable: false,
        grow: false,
    });
    const labelStyles = getStylesForItem(
        themeObjects.FORM_LABEL,
        currentTheme,
        {
            textColor,
            scrollable: false,
            grow: false,
        }
    );

    const inputId = id || getUUID("", "textarea");

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
            <textarea
                {...htmlProps}
                ref={textareaRef}
                style={
                    autoGrow
                        ? {
                              ...(htmlProps.style || {}),
                              overflowY: "hidden",
                              resize: "none",
                          }
                        : htmlProps.style
                }
                id={inputId}
                rows={rows}
                value={value}
                onChange={(event) => dispatchInputChange(onChange, event)}
                placeholder={placeholder}
                disabled={disabled}
                className={`dr-input w-full border ${padding} ${styles.string} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${styles.focusRingColor || ""} ${inputClassName}`}
            />
        </div>
    );
};

export { TextArea };
