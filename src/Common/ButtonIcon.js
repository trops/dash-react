import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const ButtonIcon = ({
    onClick,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const width = block === true ? "w-full" : "";
    const styles = getStylesForItem(themeObjects.BUTTON_ICON, currentTheme, {
        ...props,
        scrollable: false,
        width: "",
        height: "h-full",
    });

    console.log("button icon styles ", styles.string);
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row ${styles.string} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />
            {text !== null && (
                <span className={text === "" ? "ml-0" : "ml-2"}>{text}</span>
            )}
        </div>
    );
};

const ButtonIcon2 = ({
    onClick,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_2, currentTheme, {
        ...props,
    });
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${
                styles.string
            } rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${
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
    onClick,
    icon = "xmark",
    text = null,
    block = false,
    textSize = "text-xs lg:text-base 2xl:text-base",
    iconSize = "h-4 w-4",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_3, currentTheme, {
        ...props,
    });
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${
                styles.string
            } rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${
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

export { ButtonIcon, ButtonIcon2, ButtonIcon3 };
