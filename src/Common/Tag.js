import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "@dash/Utils";

const Tag = ({
    text,
    textSize = "text-xs xl:text-sm 2xl:text-sm",
    onClick = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG, currentTheme, {
        ...props,
    });

    return (
        <span
            onClick={onClick}
            className={`flex flex-row w-fit rounded ${
                onClick !== null && "cursor-pointer"
            } ${
                styles.string
            } px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

const Tag2 = ({
    text,
    textSize = "text-xs xl:text-sm 2xl:text-sm",
    onClick = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_2, currentTheme, {
        ...props,
    });
    return (
        <span
            onClick={onClick}
            className={`flex flex-row w-fit rounded ${
                onClick !== null && "cursor-pointer"
            } ${
                styles.string
            } px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

const Tag3 = ({
    text,
    textSize = "text-xs xl:text-sm 2xl:text-sm",
    onClick = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_3, currentTheme, {
        ...props,
    });
    return (
        <span
            onClick={onClick}
            className={`flex flex-row w-fit rounded ${
                onClick !== null && "cursor-pointer"
            } ${
                styles.string
            } px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

export { Tag, Tag2, Tag3 };
