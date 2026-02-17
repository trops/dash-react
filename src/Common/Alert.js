import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Alert = ({
    title = "",
    message = "",
    children = null,
    onClose = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ALERT, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "alert");

    return (
        <div
            id={uuid}
            className={`border border-l-4 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-lg p-4 text-base ${className}`}
            role="alert"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {title && (
                        <div className="font-semibold text-base">{title}</div>
                    )}
                    {message && <div className="opacity-90">{message}</div>}
                    {children}
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100 rounded-full hover:bg-black/10 p-1 transition-colors duration-150"
                        aria-label="Close alert"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

const Alert2 = (props) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ALERT_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "alert-2");

    return (
        <div
            id={uuid}
            className={`border border-l-4 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-lg p-3 text-sm ${props.className || ""}`}
            role="alert"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {props.title && (
                        <div className="font-medium text-sm">{props.title}</div>
                    )}
                    {props.message && (
                        <div className="opacity-90">{props.message}</div>
                    )}
                    {props.children}
                </div>
                {props.onClose && (
                    <button
                        type="button"
                        onClick={props.onClose}
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100 rounded-full hover:bg-black/10 p-1 transition-colors duration-150"
                        aria-label="Close alert"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

const Alert3 = (props) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ALERT_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "alert-3");

    return (
        <div
            id={uuid}
            className={`border border-l-4 ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-lg p-2 text-sm ${props.className || ""}`}
            role="alert"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {props.title && (
                        <div className="font-normal text-sm">{props.title}</div>
                    )}
                    {props.message && (
                        <div className="opacity-90">{props.message}</div>
                    )}
                    {props.children}
                </div>
                {props.onClose && (
                    <button
                        type="button"
                        onClick={props.onClose}
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100 rounded-full hover:bg-black/10 p-1 transition-colors duration-150"
                        aria-label="Close alert"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export { Alert, Alert2, Alert3 };
