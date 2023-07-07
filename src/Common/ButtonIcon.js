import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const ButtonIcon = ({
    onClick = null,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    backgroundColor = null,
    disabled = false,
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

    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-row ${styles.string} rounded font-medium items-center justify-center p-2 ${textSize} ${disabledStyles} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

const ButtonIcon2 = ({
    onClick = null,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    backgroundColor = null,
    disabled = false,
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

    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-row  ${
                styles.string
            } rounded font-medium items-center justify-center ${disabledStyles} p-2 ${textSize} ${
                block && "w-full"
            } whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

const ButtonIcon3 = ({
    onClick = null,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    backgroundColor = null,
    disabled = false,
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

    // center styles
    const center = "justify-center items-center cursor-pointer";

    return (
        <div
            onClick={handleOnClick}
            className={`flex flex-row ${
                styles.string
            } rounded font-medium ${center} ${disabledStyles} p-2 ${textSize} ${
                block === true && "w-full"
            } ${styles.string} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

export { ButtonIcon, ButtonIcon2, ButtonIcon3 };
