import React, { useContext } from "react";
import { Button } from "@dash/Common";
import { ThemeContext } from "@dash/Context";

export const DashboardFooter = ({ workspace, preview, onClickEdit, onSaveChanges }) => {
    const { theme, currentTheme } = useContext(ThemeContext);
    return workspace !== null && (
        <div className={`flex flex-row p-2 justify-end ${theme['bg-primary-very-dark']} border-t ${currentTheme['border-primary-very-dark']}`}>
            <div className="flex flex-row space-x-1">
                    {preview === true && (
                        <div className="flex flex-row space-x-2">
                            <Button title={'Edit'} bgColor={'bg-gray-800'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} />
                        </div>
                    )}
                    {preview === false && (
                        <div className="flex flex-row space-x-2">
                            <Button theme={theme} title={'Cancel'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} />
                            <Button theme={theme} title={'Save Changes'} hoverBackgroundColor={'hover:bg-green-700'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onSaveChanges} />
                        </div>
                    )}
            </div>
        </div>
    )
}