import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

function Heading({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row ${paddingStyles} text-6xl font-bold ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

function Heading2({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING_2, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row ${paddingStyles} text-5xl font-bold ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

function Heading3({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.HEADING_3, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row ${paddingStyles} text-4xl font-bold ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

function SubHeading({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    return (
        <div
            className={`flex flex-row w-full ${paddingStyles} text-3xl font-medium ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

function SubHeading2({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING_2, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row w-full ${paddingStyles} text-2xl font-medium ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

function SubHeading3({
    title,
    padding = true,
    onClick = null,
    textColor = null,
    backgroundColor = null,
}) {
    const { currentTheme } = useContext(ThemeContext);
    const paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
    const styles = getStylesForItem(themeObjects.SUBHEADING_3, currentTheme, {
        textColor,
        backgroundColor,
        width: "w-full",
        grow: false,
    });

    return (
        <div
            className={`flex flex-row w-full ${paddingStyles} text-2xl font-medium ${
                styles.string
            } ${onClick !== null && "cursor-pointer"}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

export { Heading, Heading2, Heading3, SubHeading, SubHeading2, SubHeading3 };
