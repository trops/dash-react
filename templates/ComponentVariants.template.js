import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

/**
 * ComponentName - Component variants following dash-react design system
 *
 * VARIANT SPECIFICATIONS:
 * - Primary:   text-lg, p-6, font-bold, rounded-lg, shadow-md
 * - Secondary: text-base, p-4, font-medium, rounded-md, shadow
 * - Tertiary:  text-sm, p-2, font-normal, rounded, shadow-sm
 *
 * IMPORTANT: All three variants must follow progressive patterns.
 * See docs/variant-specifications.md for detailed guidelines.
 */

const ComponentName = ({
    children,
    // Add component-specific props here
    padding = "p-6",      // PRIMARY: Largest padding
    rounded = "rounded-lg",
    shadow = "shadow-md",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME, currentTheme, {
        ...props,
        // Add theme-specific props if needed
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "component-name");

    return (
        <div
            id={uuid}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} text-lg font-bold ${className}`}
        >
            {children}
        </div>
    );
};

const ComponentName2 = ({
    children,
    padding = "p-4",      // SECONDARY: Medium padding
    rounded = "rounded-md",
    shadow = "shadow",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "component-name-2");

    return (
        <div
            id={uuid}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} text-base font-medium ${className}`}
        >
            {children}
        </div>
    );
};

const ComponentName3 = ({
    children,
    padding = "p-2",      // TERTIARY: Smallest padding
    rounded = "rounded",
    shadow = "shadow-sm",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "component-name-3");

    return (
        <div
            id={uuid}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} text-sm font-normal ${className}`}
        >
            {children}
        </div>
    );
};

// If component has subcomponents (Header, Body, Footer, etc.), add them here:
// ComponentName.Header = ({ children, className = "" }) => (
//     <div className={`border-b pb-2 mb-3 ${className}`}>{children}</div>
// );

// ComponentName.Body = ({ children, className = "" }) => (
//     <div className={className}>{children}</div>
// );

// ComponentName.Footer = ({ children, className = "" }) => (
//     <div className={`border-t pt-2 mt-3 ${className}`}>{children}</div>
// );

// // Apply subcomponents to all variants
// ComponentName2.Header = ComponentName.Header;
// ComponentName2.Body = ComponentName.Body;
// ComponentName2.Footer = ComponentName.Footer;

// ComponentName3.Header = ComponentName.Header;
// ComponentName3.Body = ComponentName.Body;
// ComponentName3.Footer = ComponentName.Footer;

export { ComponentName, ComponentName2, ComponentName3 };
