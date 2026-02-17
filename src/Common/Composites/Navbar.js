import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const NavbarBrand = ({ children, className = "" }) => {
    return (
        <div className={`flex items-center flex-shrink-0 gap-2 ${className}`}>
            {children}
        </div>
    );
};

const NavbarContent = ({ children, className = "", align = "center" }) => {
    const alignClass =
        align === "start"
            ? "justify-start"
            : align === "end"
              ? "justify-end"
              : "justify-center";

    return (
        <div
            className={`flex flex-1 items-center gap-1 ${alignClass} ${className}`}
        >
            {children}
        </div>
    );
};

const NavbarActions = ({ children, className = "" }) => {
    return (
        <div className={`flex items-center flex-shrink-0 gap-2 ${className}`}>
            {children}
        </div>
    );
};

const NavbarDivider = ({ className = "" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.NAVBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`w-px h-5 self-center ${styles.borderColor || ""} bg-current opacity-20 ${className}`}
        />
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const Navbar = ({
    children,
    border = true,
    padding = "px-4 py-2",
    height = "h-14",
    className = "",
    position = "top", // "top" | "bottom"
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.NAVBAR, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const borderClass = border
        ? position === "top"
            ? "border-b"
            : "border-t"
        : "";

    return (
        <nav
            className={`flex flex-row items-center flex-shrink-0 ${height} ${padding} ${borderClass} ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} ${className}`}
        >
            {children}
        </nav>
    );
};

Navbar.Brand = NavbarBrand;
Navbar.Content = NavbarContent;
Navbar.Actions = NavbarActions;
Navbar.Divider = NavbarDivider;

export { Navbar };
