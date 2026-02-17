import { useContext, useState, useRef, useCallback } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Tooltip = ({
    content,
    children,
    side = "top", // "top" | "bottom" | "left" | "right"
    delay = 200,
    className = "",
}) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOOLTIP, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const show = useCallback(() => {
        timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }, [delay]);

    const hide = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setVisible(false);
    }, []);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-current border-x-transparent border-b-transparent",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-current border-x-transparent border-t-transparent",
        left: "left-full top-1/2 -translate-y-1/2 border-l-current border-y-transparent border-r-transparent",
        right: "right-full top-1/2 -translate-y-1/2 border-r-current border-y-transparent border-l-transparent",
    };

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            {visible && content && (
                <span
                    role="tooltip"
                    className={`absolute z-50 ${positionClasses[side]} pointer-events-none whitespace-nowrap ${styles.backgroundColor || ""} ${styles.textColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.textSize || "text-xs"} ${styles.shadow || "shadow-lg"} ${styles.spacing || "px-2.5 py-1.5"} ${className}`}
                >
                    {content}
                    <span
                        className={`absolute w-0 h-0 border-4 ${arrowClasses[side]}`}
                        style={{ borderColor: "inherit" }}
                    />
                </span>
            )}
        </span>
    );
};

export { Tooltip };
