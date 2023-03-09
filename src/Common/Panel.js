import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

const Panel = ({ className, horizontal, children, theme = true, backgroundColor = null, textColor = null, borderColor = null, onClick = null, width = 'w-full', height = 'h-full'}) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {backgroundColor, borderColor, textColor});

    return theme === true ? (
        <div className={`flex ${className !== '' && className} ${styles.string} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`} onClick={onClick}>
            {children}
        </div>
    ) : (
        <div className={`flex ${className !== '' && className} ${backgroundColor} ${textColor} ${borderColor} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`}  onClick={onClick}>
            {children}
        </div>
    );
}

const Panel2 = ({ className, horizontal, children, theme = true, backgroundColor = null, textColor = null, borderColor = null, onClick = null, width = 'w-full', height = 'h-full' }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {backgroundColor, borderColor, textColor});

    return theme === true ? (
        <div className={`flex ${className !== '' && className} ${styles.string} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`} onClick={onClick}>
            {children}
        </div>
    ) : (
        <div className={`flex ${className !== '' && className} ${backgroundColor} ${textColor} ${borderColor} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`} onClick={onClick}>
            {children}
        </div>
    );
}

const Panel3 = ({ className, horizontal, children, theme = true, backgroundColor = null, textColor = null, borderColor = null, onClick = null, width = 'w-full', height = 'h-full' }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {backgroundColor, borderColor, textColor});

    return theme === true ? (
        <div className={`flex ${className !== '' && className} ${styles.string} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`} onClick={onClick}>
            {children}
        </div>
    ) : (
        <div className={`flex ${className !== '' && className} ${backgroundColor} ${textColor} ${borderColor} ${horizontal === true ? 'flex-row' : 'flex-col'} ${width} ${height}`} onClick={onClick}>
            {children}
        </div>
    );
}

export {
    Panel,
    Panel2,
    Panel3
}