import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "@dash/Utils";

const Icon = ({
    icon,
    size = null,
    textColor = "",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ICON, currentTheme, {
        ...props,
        textColor,
        grow: false,
    });

    const computedSize = size || styles.iconSize || "h-5 w-5";

    return (
        <span
            className={`inline-flex items-center ${styles.textColor || ""} ${className}`}
        >
            <FontAwesomeIcon icon={icon} className={computedSize} />
        </span>
    );
};

const Icon2 = ({
    icon,
    size = null,
    textColor = "",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ICON_2, currentTheme, {
        ...props,
        textColor,
        grow: false,
    });

    const computedSize = size || styles.iconSize || "h-4 w-4";

    return (
        <span
            className={`inline-flex items-center ${styles.textColor || ""} ${className}`}
        >
            <FontAwesomeIcon icon={icon} className={computedSize} />
        </span>
    );
};

const Icon3 = ({
    icon,
    size = null,
    textColor = "",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.ICON_3, currentTheme, {
        ...props,
        textColor,
        grow: false,
    });

    const computedSize = size || styles.iconSize || "h-3.5 w-3.5";

    return (
        <span
            className={`inline-flex items-center ${styles.textColor || ""} ${className}`}
        >
            <FontAwesomeIcon icon={icon} className={computedSize} />
        </span>
    );
};

export { Icon, Icon2, Icon3 };
