import React, { useContext } from "react";
import { Button } from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "@dash/Utils";

export const DashboardFooter = ({
    preview,
    backgroundColor = null,
    borderColor = null,
    textColor = null,
    onClickEdit = null,
    onSaveChanges = null,
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const stylesFooter = getStylesForItem(
        themeObjects.DASHBOARD_FOOTER,
        currentTheme,
        { borderColor }
    );
    const stylesButton = getStylesForItem(themeObjects.BUTTON, currentTheme, {
        backgroundColor,
        borderColor,
        textColor,
    });

    return (
        <div
            className={`flex flex-row p-2 justify-end border-t w-full ${stylesFooter.string}`}
        >
            <div className="flex flex-row space-x-1 w-full justify-end h-full">
                {preview === true && (
                    <div className="flex flex-row space-x-2 h-full">
                        <Button
                            title={"Edit"}
                            textSize={"text-lg"}
                            padding={"py-2 px-4"}
                            onClick={onClickEdit}
                            {...stylesButton}
                        />
                    </div>
                )}
                {preview === false && (
                    <div className="flex flex-row space-x-2 block h-full">
                        <Button
                            title={"Cancel"}
                            textSize={"text-lg"}
                            padding={"py-2 px-4"}
                            onClick={onClickEdit}
                            {...stylesButton}
                        />
                        <Button
                            title={"Save Changes"}
                            textSize={"text-lg"}
                            padding={"py-2 px-4"}
                            onClick={onSaveChanges}
                            {...stylesButton}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
