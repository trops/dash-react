import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

const LayoutContainer = ({ theme = false, id, children, direction = "row", className = '', scrollable = true, width = 'w-full', height = 'min-h-fit', debug = false, onMouseOver = null, onMouseOut = null, space = true}) => {

    const { currentTheme } = useContext(ThemeContext);

    // determine the classes based on the props...
    const directionStyle = direction === 'row' 
        ? (space === true ? 'flex-row space-x-2':'flex-row') 
        : (space === true ? 'flex-col space-y-2':'flex-col');
    const scrollStyle = scrollable === true ? 'overflow-y-scroll' : '';
    const widthStyle = width;
    const heightStyle = height === "" ? 'h-full' : height;//'h-full';//scrollable === true ? height : height;

    // to theme or not to theme...
    let backgroundColorStyle = '';
    let borderColorStyle = '';
    // if (theme === true) {
    //     backgroundColorStyle = currentTheme['bg-primary-very-dark'];
    //     borderColorStyle = `${currentTheme['border-primary-very-dark']}`;
    // }

    return (
        <div 
            id={`LayoutContainer-${id}`}
            className={`flex border-1 rounded ${backgroundColorStyle} ${borderColorStyle} ${directionStyle} ${scrollStyle} ${widthStyle} ${heightStyle} ${className} ${debug === true && 'border border-green-500 border-dotted'}`}
        >
            {children}
        </div>
    )
}
export { LayoutContainer };