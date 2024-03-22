import React from "react";
import { InputText } from "@dash/Common/Form";
import { Layout, LayoutContainer } from "../../../Layout";
import { Button } from "../../../Common";
const ThemePane = ({
    children,
    searchTerm,
    inputValue = null,
    onInputChange = null,
    inputPlaceholder = "",
    scroll = true,
}) => {
    return (
        <LayoutContainer direction="col" scrollable={false} width="w-full">
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
        </LayoutContainer>
    );
};

export default ThemePane;
