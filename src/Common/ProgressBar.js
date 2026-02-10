import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const resolveThemeClass = (theme, value) => {
    if (!value) return "";
    if (theme && value in theme) return theme[value];
    return value;
};

const ProgressBarBase = ({
    value = 0,
    showLabel = false,
    size = "md",
    striped = false,
    animated = false,
    fillColor = "bg-primary-medium",
    className = "",
    themeKey,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeKey, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "progress-bar");
    const heightClass = size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3";
    const fillClass = resolveThemeClass(currentTheme, fillColor);

    return (
        <div id={uuid} className={`w-full ${className}`}>
            <div
                className={`w-full ${heightClass} rounded-full overflow-hidden ${styles.backgroundColor} ${styles.borderColor}`}
            >
                <div
                    className={`${heightClass} ${fillClass} ${
                        striped
                            ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            : ""
                    } ${animated ? "animate-pulse" : ""}`}
                    style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                />
            </div>
            {showLabel && (
                <div className={`mt-2 text-sm ${styles.textColor}`}>
                    {Math.round(value)}%
                </div>
            )}
        </div>
    );
};

const ProgressBar = (props) => (
    <ProgressBarBase
        themeKey={themeObjects.PROGRESS_BAR}
        {...props}
        fillColor={props.fillColor || "bg-primary-medium"}
    />
);

const ProgressBar2 = (props) => (
    <ProgressBarBase
        themeKey={themeObjects.PROGRESS_BAR_2}
        {...props}
        fillColor={props.fillColor || "bg-secondary-medium"}
    />
);

const ProgressBar3 = (props) => (
    <ProgressBarBase
        themeKey={themeObjects.PROGRESS_BAR_3}
        {...props}
        fillColor={props.fillColor || "bg-tertiary-medium"}
    />
);

export { ProgressBar, ProgressBar2, ProgressBar3 };
