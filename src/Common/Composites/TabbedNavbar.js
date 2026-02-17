import {
    useContext,
    useState,
    createContext,
    useContext as useCtx,
} from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const TabbedNavbarContext = createContext({
    activeTab: "",
    setActiveTab: () => {},
});

// ─── Sub-components ─────────────────────────────────────────────────────────────

const TabbedNavbarBrand = ({ children, className = "" }) => {
    return (
        <div className={`flex items-center flex-shrink-0 gap-2 ${className}`}>
            {children}
        </div>
    );
};

const TabbedNavbarTab = ({
    value,
    children,
    className = "",
    disabled = false,
}) => {
    const { activeTab, setActiveTab } = useCtx(TabbedNavbarContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABBED_NAVBAR, currentTheme, {
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
            className={`relative flex items-center px-3 py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                isActive
                    ? `${styles.textColor || ""} opacity-100`
                    : `${styles.textColor || ""} opacity-50 hover:opacity-80`
            } ${disabled ? "opacity-30 pointer-events-none" : "cursor-pointer"} ${className}`}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-t" />
            )}
        </button>
    );
};

const TabbedNavbarActions = ({ children, className = "" }) => {
    return (
        <div
            className={`flex items-center flex-shrink-0 gap-2 ml-auto ${className}`}
        >
            {children}
        </div>
    );
};

const TabbedNavbarContent = ({ value, children, className = "" }) => {
    const { activeTab } = useCtx(TabbedNavbarContext);

    if (activeTab !== value) return null;

    return (
        <div role="tabpanel" className={className}>
            {children}
        </div>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const TabbedNavbar = ({
    children,
    defaultValue = "",
    value = undefined,
    onValueChange = null,
    border = true,
    padding = "px-4",
    height = "h-12",
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

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABBED_NAVBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    // Separate bar children (Brand, Tab, Actions) from Content panels
    const barChildren = [];
    const contentChildren = [];

    const childArray = Array.isArray(children) ? children : [children];
    const flatChildren = childArray.flat().filter(Boolean);

    flatChildren.forEach((child) => {
        if (child && child.type === TabbedNavbarContent) {
            contentChildren.push(child);
        } else {
            barChildren.push(child);
        }
    });

    return (
        <TabbedNavbarContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="flex flex-col">
                <nav
                    role="tablist"
                    className={`flex flex-row items-end flex-shrink-0 ${height} ${padding} gap-1 ${border ? "border-b" : ""} ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} ${className}`}
                >
                    {barChildren}
                </nav>
                {contentChildren}
            </div>
        </TabbedNavbarContext.Provider>
    );
};

TabbedNavbar.Brand = TabbedNavbarBrand;
TabbedNavbar.Tab = TabbedNavbarTab;
TabbedNavbar.Actions = TabbedNavbarActions;
TabbedNavbar.Content = TabbedNavbarContent;

export { TabbedNavbar };
