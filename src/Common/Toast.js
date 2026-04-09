import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

/**
 * Type-specific styling for Toast notifications.
 * Used when the `type` prop is set ("success" | "error" | "warning" | "info").
 * When `type` is not set, the Toast falls back to the theme-driven styles.
 */
const TOAST_TYPE_STYLES = {
    success: {
        bg: "bg-emerald-950/95",
        border: "border-emerald-500",
        accent: "text-emerald-400",
        icon: "circle-check",
    },
    error: {
        bg: "bg-rose-950/95",
        border: "border-rose-500",
        accent: "text-rose-400",
        icon: "circle-xmark",
    },
    warning: {
        bg: "bg-amber-950/95",
        border: "border-amber-500",
        accent: "text-amber-400",
        icon: "triangle-exclamation",
    },
    info: {
        bg: "bg-sky-950/95",
        border: "border-sky-500",
        accent: "text-sky-400",
        icon: "circle-info",
    },
};

const Toast = ({
    title = "",
    message = "",
    duration = null,
    onClose = null,
    className = "",
    children = null,
    type = null,
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

    // Type-specific rendering: colored border, icon, and accent text
    if (type && TOAST_TYPE_STYLES[type]) {
        const t = TOAST_TYPE_STYLES[type];
        return (
            <div
                id={uuid}
                className={`rounded-md border-l-4 ${t.border} ${t.bg} shadow-lg p-3 text-white ${className}`}
                role="status"
            >
                <div className="flex items-start gap-3">
                    <FontAwesomeIcon
                        icon={t.icon}
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${t.accent}`}
                    />
                    <div className="flex-1 min-w-0">
                        {title && (
                            <div
                                className={`font-semibold text-sm ${t.accent}`}
                            >
                                {title}
                            </div>
                        )}
                        {message && (
                            <div className="text-sm text-white/90 break-words">
                                {message}
                            </div>
                        )}
                        {children}
                    </div>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white/60 hover:text-white text-lg leading-none flex-shrink-0"
                            aria-label="Close toast"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Default theme-driven rendering (backward compatible)
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
