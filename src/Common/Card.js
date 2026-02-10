import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Card = ({
    children,
    onClick = null,
    padding = "p-4",
    rounded = "rounded-lg",
    shadow = "shadow-md",
    className = "",
    hover = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CARD, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "card");

    const hoverStyles = hover
        ? "hover:shadow-lg transition-shadow duration-200"
        : "";
    const clickableStyles = onClick ? "cursor-pointer" : "";

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} ${hoverStyles} ${clickableStyles} border ${className}`}
        >
            {children}
        </div>
    );
};

const Card2 = ({
    children,
    onClick = null,
    padding = "p-4",
    rounded = "rounded-lg",
    shadow = "shadow-md",
    className = "",
    hover = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CARD_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "card-2");

    const hoverStyles = hover
        ? "hover:shadow-lg transition-shadow duration-200"
        : "";
    const clickableStyles = onClick ? "cursor-pointer" : "";

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} ${hoverStyles} ${clickableStyles} border ${className}`}
        >
            {children}
        </div>
    );
};

const Card3 = ({
    children,
    onClick = null,
    padding = "p-4",
    rounded = "rounded-lg",
    shadow = "shadow-md",
    className = "",
    hover = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CARD_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "card-3");

    const hoverStyles = hover
        ? "hover:shadow-lg transition-shadow duration-200"
        : "";
    const clickableStyles = onClick ? "cursor-pointer" : "";

    return (
        <div
            id={uuid}
            onClick={onClick}
            className={`${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} ${padding} ${rounded} ${shadow} ${hoverStyles} ${clickableStyles} border ${className}`}
        >
            {children}
        </div>
    );
};

// Subcomponents for Card structure
Card.Header = ({ children, className = "" }) => (
    <div className={`border-b pb-2 mb-3 ${className}`}>{children}</div>
);

Card.Body = ({ children, className = "" }) => (
    <div className={className}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
    <div className={`border-t pt-2 mt-3 ${className}`}>{children}</div>
);

// Apply same subcomponents to Card2 and Card3
Card2.Header = Card.Header;
Card2.Body = Card.Body;
Card2.Footer = Card.Footer;

Card3.Header = Card.Header;
Card3.Body = Card.Body;
Card3.Footer = Card.Footer;

export { Card, Card2, Card3 };
