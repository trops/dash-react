import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "@dash/Utils";

const Tag = ({
    text,
    textSize = "text-sm",
    onClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG, currentTheme, {
        ...props,
        grow: false,
    });

    // maybe we need to apply the className IF this exists?
    // only allow the user to change the "style" not the structure
    const stylesCalculated =
        className !== ""
            ? className
            : `${styles.string} font-medium rounded ${
                  onClick !== null && "cursor-pointer"
              } ${textSize}`;

    const uuid = getUUID("", "tag");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} px-3 py-1.5 whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

const Tag2 = ({
    text,
    textSize = "text-xs",
    onClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_2, currentTheme, {
        ...props,
        grow: false,
    });

    // maybe we need to apply the className IF this exists?
    // only allow the user to change the "style" not the structure
    // maybe we need to apply the className IF this exists?
    // only allow the user to change the "style" not the structure
    const stylesCalculated =
        className !== ""
            ? className
            : `${styles.string} font-medium rounded ${
                  onClick !== null && "cursor-pointer"
              } ${textSize}`;

    const uuid = getUUID("", "tag-2");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} px-2 py-1 whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

const Tag3 = ({
    text,
    textSize = "text-xs",
    onClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_3, currentTheme, {
        ...props,
        grow: false,
    });

    // maybe we need to apply the className IF this exists?
    // only allow the user to change the "style" not the structure
    const stylesCalculated =
        className !== ""
            ? className
            : `${styles.string} font-normal rounded ${
                  onClick !== null && "cursor-pointer"
              } ${textSize}`;
    const uuid = getUUID("", "tag-3");
    return (
        <span
            id={uuid}
            onClick={onClick}
            className={`flex flex-row w-fit ${stylesCalculated} px-1.5 py-0.5 whitespace-nowrap items-center justify-center`}
        >
            {text}
        </span>
    );
};

export { Tag, Tag2, Tag3 };
