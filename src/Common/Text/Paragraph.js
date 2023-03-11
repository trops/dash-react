import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

function Paragraph({
    text,
    padding = true,
    theme = true,
    onClick = null,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
    const styles = getStylesForItem(
        themeObjects.PARAGRAPH,
        currentTheme,
        props
    );

    return theme === true ? (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-base xl:text-lg font-normal ${styles.string}`}
            onClick={onClick}
        >
            {text}
        </span>
    ) : (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-base xl:text-lg font-normal text-gray-600`}
            onClick={onClick}
        >
            {text}
        </span>
    );
}

function Paragraph2({
    text,
    padding = true,
    theme = true,
    onClick = null,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
    const styles = getStylesForItem(
        themeObjects.PARAGRAPH_2,
        currentTheme,
        props
    );

    return theme === true ? (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-sm xl:text-base font-normal ${styles.string}`}
            onClick={onClick}
        >
            {text}
        </span>
    ) : (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-sm xl:text-base font-normal text-gray-600`}
            onClick={onClick}
        >
            {text}
        </span>
    );
}

function Paragraph3({
    text,
    padding = true,
    theme = true,
    onClick = null,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
    const styles = getStylesForItem(
        themeObjects.PARAGRAPH_3,
        currentTheme,
        props
    );

    return theme === true ? (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-xs xl:text-sm font-normal ${styles.string}`}
            onClick={onClick}
        >
            {text}
        </span>
    ) : (
        <span
            className={`flex flex-row w-full ${paddingStyles} text-xs xl:text-sm font-normal text-gray-600`}
            onClick={onClick}
        >
            {text}
        </span>
    );
}

export { Paragraph, Paragraph2, Paragraph3 };
