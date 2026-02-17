import {
    useContext,
    useState,
    createContext,
    useContext as useCtx,
    useRef,
    useEffect,
} from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const AccordionContext = createContext({
    openItems: [],
    toggleItem: () => {},
    type: "single",
});

// --- Accordion (variant 1) ---

const Accordion = ({
    type = "single", // "single" | "multiple"
    defaultValue = [],
    children,
    className = "",
}) => {
    const [openItems, setOpenItems] = useState(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    );

    const toggleItem = (value) => {
        setOpenItems((prev) => {
            if (type === "single") {
                return prev.includes(value) ? [] : [value];
            }
            return prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value];
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div className={className}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = ({ value, children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ACCORDION_ITEM, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`border-b ${styles.borderColor || ""} ${className}`}
            data-value={value}
        >
            {typeof children === "function" ? children({ value }) : children}
        </div>
    );
};

const AccordionTrigger = ({ value, children, className = "", ...props }) => {
    const { openItems, toggleItem } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_TRIGGER,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);

    return (
        <button
            type="button"
            onClick={() => toggleItem(value)}
            aria-expanded={isOpen}
            className={`flex w-full items-center justify-between py-4 ${styles.fontWeight || "font-medium"} ${styles.textColor || ""} ${styles.hoverTextColor || ""} ${styles.transition || "transition-all duration-200"} hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} ${styles.cursor || "cursor-pointer"} ${className}`}
        >
            <span>{children}</span>
            <svg
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    );
};

const AccordionContent = ({ value, children, className = "", ...props }) => {
    const { openItems } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_CONTENT,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [children, isOpen]);

    return (
        <div
            className="overflow-hidden transition-all duration-200 ease-in-out"
            style={{ height: isOpen ? height : 0 }}
        >
            <div
                ref={contentRef}
                className={`pb-4 ${styles.textColor || ""} ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// --- Accordion2 (variant 2) ---

const Accordion2 = ({
    type = "single",
    defaultValue = [],
    children,
    className = "",
}) => {
    const [openItems, setOpenItems] = useState(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    );

    const toggleItem = (value) => {
        setOpenItems((prev) => {
            if (type === "single") {
                return prev.includes(value) ? [] : [value];
            }
            return prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value];
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div className={className}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionItem2 = ({ value, children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_ITEM_2,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    return (
        <div
            className={`border-b ${styles.borderColor || ""} ${className}`}
            data-value={value}
        >
            {typeof children === "function" ? children({ value }) : children}
        </div>
    );
};

const AccordionTrigger2 = ({ value, children, className = "", ...props }) => {
    const { openItems, toggleItem } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_TRIGGER_2,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);

    return (
        <button
            type="button"
            onClick={() => toggleItem(value)}
            aria-expanded={isOpen}
            className={`flex w-full items-center justify-between py-3 ${styles.fontWeight || "font-medium"} ${styles.textColor || ""} ${styles.hoverTextColor || ""} ${styles.transition || "transition-all duration-200"} hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm ${styles.cursor || "cursor-pointer"} ${className}`}
        >
            <span>{children}</span>
            <svg
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    );
};

const AccordionContent2 = ({ value, children, className = "", ...props }) => {
    const { openItems } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_CONTENT_2,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [children, isOpen]);

    return (
        <div
            className="overflow-hidden transition-all duration-200 ease-in-out"
            style={{ height: isOpen ? height : 0 }}
        >
            <div
                ref={contentRef}
                className={`pb-3 text-sm ${styles.textColor || ""} ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

Accordion2.Item = AccordionItem2;
Accordion2.Trigger = AccordionTrigger2;
Accordion2.Content = AccordionContent2;

// --- Accordion3 (variant 3) ---

const Accordion3 = ({
    type = "single",
    defaultValue = [],
    children,
    className = "",
}) => {
    const [openItems, setOpenItems] = useState(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    );

    const toggleItem = (value) => {
        setOpenItems((prev) => {
            if (type === "single") {
                return prev.includes(value) ? [] : [value];
            }
            return prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value];
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div className={className}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionItem3 = ({ value, children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_ITEM_3,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    return (
        <div
            className={`border-b ${styles.borderColor || ""} ${className}`}
            data-value={value}
        >
            {typeof children === "function" ? children({ value }) : children}
        </div>
    );
};

const AccordionTrigger3 = ({ value, children, className = "", ...props }) => {
    const { openItems, toggleItem } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_TRIGGER_3,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);

    return (
        <button
            type="button"
            onClick={() => toggleItem(value)}
            aria-expanded={isOpen}
            className={`flex w-full items-center justify-between py-2 ${styles.fontWeight || "font-normal"} ${styles.textColor || ""} ${styles.hoverTextColor || ""} ${styles.transition || "transition-all duration-200"} hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-xs ${styles.cursor || "cursor-pointer"} ${className}`}
        >
            <span>{children}</span>
            <svg
                className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    );
};

const AccordionContent3 = ({ value, children, className = "", ...props }) => {
    const { openItems } = useCtx(AccordionContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.ACCORDION_CONTENT_3,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const isOpen = openItems.includes(value);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [children, isOpen]);

    return (
        <div
            className="overflow-hidden transition-all duration-200 ease-in-out"
            style={{ height: isOpen ? height : 0 }}
        >
            <div
                ref={contentRef}
                className={`pb-2 text-xs ${styles.textColor || ""} ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

Accordion3.Item = AccordionItem3;
Accordion3.Trigger = AccordionTrigger3;
Accordion3.Content = AccordionContent3;

export { Accordion, Accordion2, Accordion3 };
