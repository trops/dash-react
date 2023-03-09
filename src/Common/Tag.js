import { useContext } from 'react';
import { ThemeContext } from '@dash/Context';
import { getStylesForItem, themeObjects } from '@dash/Utils';

const Tag = ({ theme = true, text, backgroundColor = null, textColor = null, textSize = 'text-xs xl:text-sm 2xl:text-sm', onClick = null }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG, currentTheme, { textColor, backgroundColor });

    return theme === true ? (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${styles.string} px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}>{text}</span>
    ) : (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${backgroundColor !== null ? backgroundColor : 'bg-indigo-700'} px-2 ${textSize} font-bold ${textColor} whitespace-nowrap items-center justify-center`}>{text}</span>
    );
}

const Tag2 = ({ theme = true, text, backgroundColor = null, textColor = null, textSize = 'text-xs xl:text-sm 2xl:text-sm', onClick = null }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_2, currentTheme, { textColor, backgroundColor });

    return theme === true ? (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${styles.string} px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}>{text}</span>
    ) : (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${backgroundColor !== null ? backgroundColor : 'bg-indigo-700'} px-2 ${textSize} font-bold ${textColor} whitespace-nowrap items-center justify-center`}>{text}</span>
    );
}

const Tag3 = ({ theme = true, text, backgroundColor = null, textColor = null, textSize = 'text-xs xl:text-sm 2xl:text-sm', onClick = null }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TAG_3, currentTheme, { textColor, backgroundColor });

    return theme === true ? (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${styles.string} px-2 py-1 ${textSize} font-bold whitespace-nowrap items-center justify-center`}>{text}</span>
    ) : (
        <span onClick={onClick} className={`flex flex-row w-fit rounded ${onClick !== null && 'cursor-pointer'} ${backgroundColor !== null ? backgroundColor : 'bg-indigo-700'} px-2 ${textSize} font-bold ${textColor} whitespace-nowrap items-center justify-center`}>{text}</span>
    );
}

export {
    Tag,
    Tag2,
    Tag3
}