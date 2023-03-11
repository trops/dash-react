import React from "react";
import { InputText } from "@dash/Common/Form";

const ThemePane = ({
    children,
    searchTerm,
    inputValue = null,
    onInputChange = null,
    inputPlaceholder = "",
    scroll = true,
}) => {
    return (
        <div
            className={`flex flex-col text-xs h-full p-1 space-y-2 ${
                scroll === true ? "overflow-y-scroll" : "overflow-hidden"
            } rounded w-full`}
        >
            {inputValue !== null && onInputChange !== null && (
                <div className="flex flex-row">
                    <InputText
                        value={searchTerm}
                        textSize="text-sm"
                        onChange={onInputChange}
                        placeholder={inputPlaceholder}
                    />
                </div>
            )}
            <div className="flex flex-col text-xs break-all h-full space-y-2 w-full">
                {children}
            </div>
        </div>
    );
};

export default ThemePane;
