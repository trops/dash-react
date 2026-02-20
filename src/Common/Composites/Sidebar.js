import {
    useContext,
    useState,
    createContext,
    useContext as useCtx,
} from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const SidebarContext = createContext({
    collapsed: false,
    setCollapsed: () => {},
    toggleCollapsed: () => {},
    side: "left",
});

const useSidebar = () => useCtx(SidebarContext);

// ─── Sub-components ─────────────────────────────────────────────────────────────

const SidebarHeader = ({ children, className = "" }) => {
    return (
        <div className={`flex flex-col flex-shrink-0 p-3 ${className}`}>
            {children}
        </div>
    );
};

const SidebarContent = ({ children, className = "" }) => {
    return (
        <div
            className={`flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-transparent ${className}`}
        >
            {children}
        </div>
    );
};

const SidebarGroup = ({ label = null, children, className = "" }) => {
    const { collapsed } = useCtx(SidebarContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SIDEBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {label && !collapsed && (
                <span
                    className={`px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider ${styles.textColor || ""} opacity-50`}
                >
                    {label}
                </span>
            )}
            {label && collapsed && (
                <div className="border-t border-current opacity-10 mx-2 mt-2 mb-1" />
            )}
            {children}
        </div>
    );
};

const SidebarItem = ({
    children,
    icon = null,
    active = false,
    onClick = null,
    className = "",
    badge = null,
}) => {
    const { collapsed } = useCtx(SidebarContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SIDEBAR_ITEM, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const activeClasses = active
        ? `${styles.activeBackgroundColor || ""} ${styles.activeTextColor || ""}`
        : `${styles.textColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""} opacity-80 hover:opacity-100`;

    return (
        <button
            type="button"
            onClick={onClick}
            title={
                collapsed && typeof children === "string" ? children : undefined
            }
            className={`flex items-center w-full ${collapsed ? "justify-center px-2 py-2" : "px-3 py-2"} gap-2 ${styles.borderRadius || "rounded-md"} ${styles.transition || "transition-colors duration-150"} ${styles.cursor || "cursor-pointer"} text-sm ${activeClasses} ${className}`}
        >
            {icon && (
                <span className={`flex-shrink-0 ${collapsed ? "" : ""}`}>
                    {icon}
                </span>
            )}
            {!collapsed && (
                <span className="flex-1 text-left truncate">{children}</span>
            )}
            {!collapsed && badge && (
                <span className="flex-shrink-0 text-xs opacity-60">
                    {badge}
                </span>
            )}
        </button>
    );
};

const SidebarFooter = ({ children, className = "" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SIDEBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-col flex-shrink-0 p-2 border-t ${styles.borderColor || ""} ${className}`}
        >
            {children}
        </div>
    );
};

const SidebarTrigger = ({ children = null, className = "" }) => {
    const { collapsed, toggleCollapsed, side } = useCtx(SidebarContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SIDEBAR_ITEM, currentTheme, {
        scrollable: false,
        grow: false,
    });

    // For a left sidebar: collapsed → chevrons right (>>), expanded → chevrons left (<<)
    // For a right sidebar: collapsed → chevrons left (<<), expanded → chevrons right (>>)
    const showRightChevrons = side === "left" ? collapsed : !collapsed;

    return (
        <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex items-center justify-center p-2 rounded-md ${styles.textColor || ""} ${styles.hoverBackgroundColor || ""} opacity-60 hover:opacity-100 ${styles.transition || "transition-colors duration-150"} ${styles.cursor || "cursor-pointer"} ${className}`}
        >
            {children || (
                <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    {showRightChevrons ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
                        />
                    )}
                </svg>
            )}
        </button>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const Sidebar = ({
    children,
    defaultCollapsed = false,
    collapsed: controlledCollapsed = undefined,
    onCollapsedChange = null,
    width = "w-60",
    collapsedWidth = "w-16",
    side = "left",
    className = "",
}) => {
    const [internalCollapsed, setInternalCollapsed] =
        useState(defaultCollapsed);
    const isCollapsed =
        controlledCollapsed !== undefined
            ? controlledCollapsed
            : internalCollapsed;

    const setCollapsed = (val) => {
        if (controlledCollapsed === undefined) {
            setInternalCollapsed(val);
        }
        if (onCollapsedChange) {
            onCollapsedChange(val);
        }
    };

    const toggleCollapsed = () => setCollapsed(!isCollapsed);

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SIDEBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const borderSide = side === "left" ? "border-r" : "border-l";

    return (
        <SidebarContext.Provider
            value={{
                collapsed: isCollapsed,
                setCollapsed,
                toggleCollapsed,
                side,
            }}
        >
            <aside
                className={`flex flex-col flex-shrink-0 h-full ${isCollapsed ? collapsedWidth : width} ${borderSide} ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} ${styles.transition || "transition-all duration-200"} overflow-hidden ${className}`}
            >
                {children}
            </aside>
        </SidebarContext.Provider>
    );
};

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Footer = SidebarFooter;
Sidebar.Trigger = SidebarTrigger;

export { Sidebar, useSidebar };
