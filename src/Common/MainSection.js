import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

export const MainSection = ({ children, backgroundColor = null }) => {
    const { currentTheme } = useContext(ThemeContext);

    // we have to parse out all of the color overrides if they exist.
    const backgroundColorStyle =
        backgroundColor !== null
            ? backgroundColor
            : currentTheme !== null
            ? currentTheme["bg-primary-very-dark"]
            : "bg-black";
    console.log("MAIN SECTION COLOR STYLE", backgroundColorStyle);
    return (
        currentTheme !== null && (
            <div
                className={`flex flex-col ${backgroundColorStyle} h-full overflow-hidden w-full`}
            >
                {children}
            </div>
        )
    );
    //  : (
    //     <div className={`flex flex-col bg-gray-900 h-full overflow-hidden w-full`}>{children}</div>
    // )
};
