import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const ButtonIcon = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = "text-xs lg:text-base",
    textColor = "",
    iconSize = "h-4 w-4",
    backgroundColor = null,
    disabled = false,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON, currentTheme, {
        ...props,
        backgroundColor,
        scrollable: false,
        grow: false,
    });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const disabledStyles =
        onClick !== null && disabled === false && "cursor-pointer";

    const spaceBetweenStyles =
        icon !== "" && text !== ""
            ? "space-x-1 px-4"
            : text === ""
              ? "space-x-0 px-0"
              : "space-x-0 px-4";

    // since we do not have a layout container we can create an id like so
    const uuid = getUUID("", "button-icon");

    return (
        <div
            id={uuid}
            onClick={handleOnClick}
            className={`flex flex-row ${className} ${styles.string} rounded font-medium items-center justify-center ${spaceBetweenStyles} ${textSize} ${disabledStyles} whitespace-nowrap`}
        >
            {icon !== "" && (
                <span className={`${text === "" && "p-2"}`}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={`${iconSize} justify-center items-center`}
                    />
                </span>
            )}
            {text !== null && (
                <span className={icon === "" ? "mx-0" : "mx-0"}>{text}</span>
            )}
        </div>
    );
};

const ButtonIcon2 = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    backgroundColor = null,
    disabled = false,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_2, currentTheme, {
        ...props,
        backgroundColor,
        scrollable: false,
        grow: false,
    });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const disabledStyles =
        onClick !== null && disabled === false && "cursor-pointer";

    const spaceBetweenStyles =
        icon !== "" && text !== "" ? "space-x-1 px-4" : "space-x-0 px-0";

    // since we do not have a layout container we can create an id like so
    const uuid = getUUID("", "button-icon-2");

    return (
        <div
            id={uuid}
            onClick={handleOnClick}
            className={`flex flex-row  ${
                styles.string
            } ${className} rounded font-medium items-center justify-center ${spaceBetweenStyles} ${disabledStyles} p-1 ${textSize} ${
                block && "w-full"
            } whitespace-nowrap`}
        >
            {icon !== "" && (
                <span className={`${text === "" && "p-1"}`}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={`${iconSize} justify-center items-center`}
                    />
                </span>
            )}
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

const ButtonIcon3 = ({
    onClick = null,
    icon = "",
    text = "",
    block = false,
    textSize = "text-xs lg:text-sm 2xl:text-sm",
    iconSize = "h-3 w-3",
    backgroundColor = null,
    disabled = false,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_3, currentTheme, {
        ...props,
        backgroundColor,
        scrollable: false,
        grow: false,
    });
    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const disabledStyles =
        onClick !== null && disabled === false && "cursor-pointer";

    const spaceBetweenStyles =
        icon !== "" && text !== "" ? "space-x-1 px-1" : "space-x-0 px-0";

    // center styles
    const center = "justify-center items-center cursor-pointer";

    // since we do not have a layout container we can create an id like so
    const uuid = getUUID("", "button-icon-3");
    return (
        <div
            id={uuid}
            onClick={handleOnClick}
            className={`flex flex-row ${className} ${
                styles.string
            } rounded font-medium ${center} ${spaceBetweenStyles} ${disabledStyles} ${textSize} ${
                block === true && "w-full"
            } ${styles.string} whitespace-nowrap`}
        >
            {icon !== "" && (
                <span className={`${text === "" && "p-1"}`}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={`${iconSize} justify-center items-center`}
                    />
                </span>
            )}
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

export { ButtonIcon, ButtonIcon2, ButtonIcon3 };
