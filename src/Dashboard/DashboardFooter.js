import React, { useContext } from "react";
import { Button } from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from '@dash/Utils';

export const DashboardFooter = ({ theme = true, preview, backgroundColor = null, borderColor = null, textColor = null, onClickEdit = null, onSaveChanges = null }) => {

    const { currentTheme } = useContext(ThemeContext);

    const stylesFooter = getStylesForItem(themeObjects.DASHBOARD_FOOTER, currentTheme, { backgroundColor, borderColor });
    const stylesButton = getStylesForItem(themeObjects.BUTTON, currentTheme, { backgroundColor, borderColor, textColor });

    console.log(stylesFooter, stylesButton);

    return theme === true ? (
        <div className={`flex flex-row p-2 justify-end border-t w-full ${{...stylesFooter}}`}>
            <div className="flex flex-row space-x-1">
                    {preview === true && (
                        <div className="flex flex-row space-x-2">
                            <Button title={'Edit'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} {...stylesButton} />
                        </div>
                    )}
                    {preview === false && (
                        <div className="flex flex-row space-x-2">
                            <Button theme={theme} title={'Cancel'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} {...stylesButton} />
                            <Button theme={theme} title={'Save Changes'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onSaveChanges}  {...stylesButton} />
                        </div>
                    )}
            </div>
        </div>
    ) : (
        <div className={`flex flex-row p-2 justify-end bg-gray-900 border-t border-gray-800 w-full`}>
            <div className="flex flex-row space-x-1">
                    {preview === true && (
                        <div className="flex flex-row space-x-2">
                            <Button theme={theme} title={'Edit'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} backgroundColor={'bg-gray-900'} hoverBackgroundColor={'hover:bg-gray-700'} textColor="text-gray-200" />
                        </div>
                    )}
                    {preview === false && (
                        <div className="flex flex-row space-x-2">
                            <Button theme={theme} title={'Cancel'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onClickEdit} backgroundColor={'bg-gray-900'} textColor="text-gray-200" />
                            <Button theme={theme} title={'Save Changes'} hoverBackgroundColor={'hover:bg-green-700'} textSize={'text-lg'} padding={'py-2 px-4'} onClick={onSaveChanges}  backgroundColor={'bg-gray-900'} textColor="text-gray-200" />
                        </div>
                    )}
            </div>
        </div>
    )
}