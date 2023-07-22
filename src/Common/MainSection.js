import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";

export const MainSection = ({ children, backgroundColor = null }) => {
    const { currentTheme } = useContext(ThemeContext);

    // we have to parse out all of the color overrides if they exist.
    function backgroundColorStyle() {
        return backgroundColor !== null
            ? backgroundColor
            : currentTheme
            ? currentTheme["bg-primary-very-dark"]
            : "bg-black";
    }

    console.log("main section ", currentTheme);

    return (
        currentTheme !== null && (
            <div
                className={`flex flex-col ${backgroundColorStyle()} h-full overflow-hidden w-full p-0 m-0`}
            >
                {children}
            </div>
        )
    );
};
