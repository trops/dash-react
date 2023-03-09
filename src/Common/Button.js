import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const Button = ({ theme = true, title = 'Cancel', onClick = null, disabled = false, backgroundColor = null, borderColor = null, hoverBackgroundColor = null, hoverTextColor = null, padding = null, textColor = null, textSize = null, block = false }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON, currentTheme, { backgroundColor, textColor, hoverBackgroundColor, hoverTextColor, borderColor });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const width = block === true ? 'w-full' : '';
    const textSizeComputed = textSize !== null ? textSize : 'text-lg lg:text-xl xl:text-xl 2xl:text-2xl';
    const paddingComputed = padding !== null ? padding : 'p-2 lg:p-4 xl:p-6';

    return theme ? (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-bold`}>{title}</div>
    ) : (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${backgroundColor} ${textColor} ${hoverBackgroundColor} rounded ${width} cursor-pointer ${textSizeComputed} font-bold`}>{title}</div>
    );
}

const Button2 = ({ theme = true, title = 'Cancel', onClick = null, disabled = false, backgroundColor = null, borderColor = null, hoverBackgroundColor = null, hoverTextColor = null, textColor = null, textSize = null, padding = null, block = false }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_2, currentTheme, { backgroundColor, textColor, hoverBackgroundColor, hoverTextColor, borderColor });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const width = block === true ? 'w-full' : '';
    const textSizeComputed = textSize !== null ? textSize : 'text-base lg:text-lg 2xl:text-xl';
    const paddingComputed = padding !== null ? padding : 'p-1 lg:p-2 xl:p-4';

    return theme ? (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-medium`}>{title}</div>
    ) : (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${backgroundColor} ${textColor} ${hoverBackgroundColor} rounded ${width} cursor-pointer ${textSizeComputed} font-medium`}>{title}</div>
    );
}

const Button3 = ({ theme = true, title = 'Cancel', onClick = null, disabled = false, backgroundColor = null, borderColor = null, hoverBackgroundColor = null, hoverTextColor = null, textColor = null, textSize = null, padding = null, block = false }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_3, currentTheme, { backgroundColor, textColor, hoverBackgroundColor, hoverTextColor, borderColor });

    function handleOnClick(e) {
        if (disabled === false) {
            onClick !== null && onClick(e);
        }
    }

    const width = block === true ? 'w-full' : '';
    const textSizeComputed = textSize !== null ? textSize : 'text-sm xl:text-base 2xl:text-base';
    const paddingComputed = padding !== null ? padding : 'p-1 lg:p-1 xl:p-2';

    return theme ? (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${styles.string} rounded ${width} cursor-pointer ${textSizeComputed} font-normal`}>{title}</div>
    ) : (
        <div onClick={handleOnClick} className={`flex flex-row justify-center items-center ${paddingComputed} ${backgroundColor} ${textColor} ${hoverBackgroundColor} rounded ${width} cursor-pointer ${textSizeComputed} font-normal`}>{title}</div>
    );
}

export {
    Button,
    Button2,
    Button3
} 