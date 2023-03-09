import { useContext} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from '@dash/Utils/themeObjects';

const ButtonIcon = ({ theme = true, onClick, backgroundColor = null,  borderColor= null, textColor = null, hoverTextColor = null, hoverBackgroundColor = null, icon = 'xmark', text = null, block = false, textSize = 'text-xs lg:text-base 2xl:text-base', iconSize = 'h-4 w-4' }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON, currentTheme, { backgroundColor, hoverBackgroundColor, borderColor, textColor, hoverTextColor });

    return theme === true ? (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${styles.string} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    ) : (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${backgroundColor} ${textColor} ${hoverBackgroundColor} ${hoverTextColor} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    )
} 

const ButtonIcon2 = ({ theme = true, onClick, backgroundColor = null,  borderColor= null, textColor = null, hoverTextColor = null, hoverBackgroundColor = null, icon = 'xmark', text = null, block = false, textSize = 'text-xs lg:text-base 2xl:text-base', iconSize = 'h-4 w-4' }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_2, currentTheme, { backgroundColor, hoverBackgroundColor, borderColor, textColor, hoverTextColor });

    return theme === true ? (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${styles.string} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    ) : (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${backgroundColor} ${textColor} ${hoverBackgroundColor} ${hoverTextColor} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    )
} 

const ButtonIcon3 = ({ theme = true, onClick, backgroundColor = null, borderColor= null, textColor = null, hoverTextColor = null, hoverBackgroundColor = null, icon = 'xmark', text = null, block = false, textSize = 'text-xs lg:text-base 2xl:text-base', iconSize = 'h-4 w-4' }) => {

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.BUTTON_ICON_3, currentTheme, { backgroundColor, hoverBackgroundColor, borderColor, textColor, hoverTextColor });

    return theme === true ? (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${styles.string} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    ) : (
        <div 
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`flex flex-row  ${backgroundColor} ${textColor} ${hoverBackgroundColor} ${hoverTextColor} rounded font-medium items-center justify-center cursor-pointer p-2 ${textSize} ${block && 'w-full'} whitespace-nowrap`}
        >
            <FontAwesomeIcon icon={icon} className={`${iconSize}`} />{text !== null && (<span className={text === '' ? 'ml-0':'ml-2'}>{text}</span>)}
        </div>
    )
} 

export {
    ButtonIcon,
    ButtonIcon2,
    ButtonIcon3
}