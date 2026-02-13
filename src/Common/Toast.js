import { useContext, useEffect } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Toast = ({
    title = "",
    message = "",
    duration = null,
    onClose = null,
    className = "",
    children = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOAST, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "toast");

    useEffect(() => {
        if (!duration || !onClose) return;
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            id={uuid}
            className={`border ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-md p-4 shadow-lg ${className}`}
            role="status"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {title && <div className="font-semibold">{title}</div>}
                    {message && <div className="opacity-90">{message}</div>}
                    {children}
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100"
                        aria-label="Close toast"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

const Toast2 = (props) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOAST_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "toast-2");

    useEffect(() => {
        if (!props.duration || !props.onClose) return;
        const timer = setTimeout(() => props.onClose(), props.duration);
        return () => clearTimeout(timer);
    }, [props.duration, props.onClose]);

    return (
        <div
            id={uuid}
            className={`border ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-md p-3 shadow-lg ${props.className || ""}`}
            role="status"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {props.title && (
                        <div className="font-semibold">{props.title}</div>
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
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100"
                        aria-label="Close toast"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

const Toast3 = (props) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOAST_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "toast-3");

    useEffect(() => {
        if (!props.duration || !props.onClose) return;
        const timer = setTimeout(() => props.onClose(), props.duration);
        return () => clearTimeout(timer);
    }, [props.duration, props.onClose]);

    return (
        <div
            id={uuid}
            className={`border ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-md p-2 shadow-lg ${props.className || ""}`}
            role="status"
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    {props.title && (
                        <div className="font-semibold">{props.title}</div>
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
                        className="ml-4 text-lg leading-none opacity-70 hover:opacity-100"
                        aria-label="Close toast"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export { Toast, Toast2, Toast3 };
