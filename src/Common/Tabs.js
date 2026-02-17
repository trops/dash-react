import {
    useContext,
    useState,
    createContext,
    useContext as useCtx,
} from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const TabsContext = createContext({
    activeTab: "",
    setActiveTab: () => {},
});

// --- Tabs (variant 1) ---

const Tabs = ({
    defaultValue = "",
    value = undefined,
    onValueChange = null,
    children,
    className = "",
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (val) => {
        if (value === undefined) {
            setInternalValue(val);
        }
        if (onValueChange) {
            onValueChange(val);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

const TabsList = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_LIST, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`inline-flex items-center gap-1 ${styles.backgroundColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "p-1"} ${className}`}
            role="tablist"
        >
            {children}
        </div>
    );
};

const TabsTrigger = ({
    value,
    children,
    className = "",
    disabled = false,
    ...props
}) => {
    const { activeTab, setActiveTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_TRIGGER, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const isActive = activeTab === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap ${styles.spacing || "px-3 py-1.5"} ${styles.textSize || "text-sm"} ${styles.fontWeight || "font-medium"} ${styles.borderRadius || "rounded-sm"} ${styles.transition || "transition-all duration-150"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.focusRingColor || ""} ${
                isActive
                    ? "bg-white shadow-sm text-foreground"
                    : `${styles.textColor || ""} ${styles.hoverTextColor || ""}`
            } ${disabled ? "opacity-50 pointer-events-none" : styles.cursor || "cursor-pointer"} ${className}`}
        >
            {children}
        </button>
    );
};

const TabsContent = ({ value, children, className = "", ...props }) => {
    const { activeTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_CONTENT, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    if (activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            className={`${styles.spacing || "mt-2"} ${styles.textColor || ""} focus-visible:outline-none ${className}`}
        >
            {children}
        </div>
    );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

// --- Tabs2 (variant 2) ---

const Tabs2 = ({
    defaultValue = "",
    value = undefined,
    onValueChange = null,
    children,
    className = "",
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (val) => {
        if (value === undefined) {
            setInternalValue(val);
        }
        if (onValueChange) {
            onValueChange(val);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

const TabsList2 = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_LIST_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`inline-flex items-center gap-1 ${styles.backgroundColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "p-1"} ${className}`}
            role="tablist"
        >
            {children}
        </div>
    );
};

const TabsTrigger2 = ({
    value,
    children,
    className = "",
    disabled = false,
    ...props
}) => {
    const { activeTab, setActiveTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_TRIGGER_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const isActive = activeTab === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap ${styles.spacing || "px-3 py-1.5"} ${styles.textSize || "text-sm"} ${styles.fontWeight || "font-medium"} ${styles.borderRadius || "rounded-sm"} ${styles.transition || "transition-all duration-150"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isActive
                    ? "bg-white shadow-sm text-foreground"
                    : `${styles.textColor || ""} ${styles.hoverTextColor || ""}`
            } ${disabled ? "opacity-50 pointer-events-none" : styles.cursor || "cursor-pointer"} ${className}`}
        >
            {children}
        </button>
    );
};

const TabsContent2 = ({ value, children, className = "", ...props }) => {
    const { activeTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_CONTENT_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    if (activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            className={`${styles.spacing || "mt-2"} ${styles.textColor || ""} focus-visible:outline-none ${className}`}
        >
            {children}
        </div>
    );
};

Tabs2.List = TabsList2;
Tabs2.Trigger = TabsTrigger2;
Tabs2.Content = TabsContent2;

// --- Tabs3 (variant 3) ---

const Tabs3 = ({
    defaultValue = "",
    value = undefined,
    onValueChange = null,
    children,
    className = "",
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (val) => {
        if (value === undefined) {
            setInternalValue(val);
        }
        if (onValueChange) {
            onValueChange(val);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

const TabsList3 = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_LIST_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`inline-flex items-center gap-1 ${styles.backgroundColor || ""} ${styles.borderRadius || "rounded-md"} ${styles.spacing || "p-1"} ${className}`}
            role="tablist"
        >
            {children}
        </div>
    );
};

const TabsTrigger3 = ({
    value,
    children,
    className = "",
    disabled = false,
    ...props
}) => {
    const { activeTab, setActiveTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_TRIGGER_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const isActive = activeTab === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap ${styles.spacing || "px-2 py-1"} ${styles.textSize || "text-xs"} ${styles.fontWeight || "font-medium"} ${styles.borderRadius || "rounded-sm"} ${styles.transition || "transition-all duration-150"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isActive
                    ? "bg-white shadow-sm text-foreground"
                    : `${styles.textColor || ""} ${styles.hoverTextColor || ""}`
            } ${disabled ? "opacity-50 pointer-events-none" : styles.cursor || "cursor-pointer"} ${className}`}
        >
            {children}
        </button>
    );
};

const TabsContent3 = ({ value, children, className = "", ...props }) => {
    const { activeTab } = useCtx(TabsContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABS_CONTENT_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    if (activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            className={`${styles.spacing || "mt-2"} ${styles.textColor || ""} focus-visible:outline-none ${className}`}
        >
            {children}
        </div>
    );
};

Tabs3.List = TabsList3;
Tabs3.Trigger = TabsTrigger3;
Tabs3.Content = TabsContent3;

export { Tabs, Tabs2, Tabs3 };
