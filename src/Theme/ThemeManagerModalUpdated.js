import React, { useState, useContext, useEffect } from "react";
import { Button, Panel, Modal } from "@dash/Common";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { AppContext } from "@dash/Context/App/AppContext";
import { ThemeModel } from "@dash/Models/ThemeModel";
import { deepCopy } from "@dash/Utils/objects";

import PanelSelectTheme from "./Panel/PanelSelectTheme";

import PanelThemePicker from "./Panel/PanelThemePicker";
import MainColorsPane from "./Panel/Pane/MainColorsPane";

export const ThemeManagerModalUpdated = ({ open, setIsOpen }) => {
    const {
        changeThemesForApplication,
        rawThemes,
        themes,
        changeCurrentTheme,
        changeThemeVariant,
    } = useContext(ThemeContext);
    const { dashApi, credentials, settings } = useContext(AppContext);

    const [themeSelected, setThemeSelected] = useState(null);
    const [rawThemeSelected, setRawThemeSelected] = useState(null);
    const [themeKeySelected, setThemeKeySelected] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if (open === false) {
            setThemeSelected(null);
            setRawThemeSelected(null);
            setThemeKeySelected(null);
        } else {
            console.log("Theme Manager ", settings);
            // if there is no key selected...
            if (themeKeySelected === null && themes) {
                const themeKeyTemp =
                    themeKeySelected === null && settings && "theme" in settings
                        ? settings["theme"] in themes
                            ? settings["theme"]
                            : Object.keys(themes)[0]
                        : Object.keys(themes)[0];

                const themeModel = ThemeModel(rawThemes[themeKeyTemp]);

                setThemeKeySelected(() => themeKeyTemp);
                setThemeSelected(() => themeModel);
                setRawThemeSelected(() => rawThemes[themeKeyTemp]);
            }
        }
    }, [open, themes, rawThemes, settings, themeKeySelected]);

    function handleThemeSelected(themeUpdated, themeKey) {
        // the Raw theme is the "abbreviated" version which will be stored
        // in the file. The model will inflate this to fill in the rest

        // we have to merge the dirty information into this selected item if exists...
        let newRawThemeSelected = deepCopy(rawThemeSelected);
        if (newRawThemeSelected !== null) {
            Object.keys(themeUpdated).forEach((k) => {
                newRawThemeSelected[k] = themeUpdated[k];
            });
        } else {
            newRawThemeSelected = deepCopy(themeUpdated);
        }

        setRawThemeSelected(() => newRawThemeSelected);

        const newTheme = ThemeModel(deepCopy(newRawThemeSelected));

        setThemeKeySelected(() => themeKey);
        setThemeSelected(() => newTheme);
        forceUpdate();
    }

    function handleCreateNewTheme(themeKey) {
        const newRawTheme = {
            id: themeKey,
            name: "New Theme",
            primary: "gray",
            secondary: "slate",
            tertiary: "orange",
            neutral: "gray",
            shadeBackgroundFrom: 200,
            shadeBorderFrom: 300,
            shadeTextFrom: 700,
        };

        // now we can present a new raw theme and store it...

        // // we have to merge the dirty information into this selected item if exists...
        let newRawThemes = deepCopy(rawThemes);
        newRawThemes[themeKey] = newRawTheme;

        // Here is where we have to add this theme to the themes available
        // and save to the themes file.
        // api.removeAllListeners();
        // api.on(api.events.THEME_SAVE_COMPLETE, handleSaveThemeCompleteNew);
        // api.on(api.events.THEME_SAVE_ERROR, handleSaveThemeErrorNew);

        // api.themes.saveThemeForApplication(creds.appId, themeKey, newRawTheme);

        if (dashApi) {
            dashApi.saveTheme(
                credentials.appId,
                themeKeySelected,
                newRawTheme,
                handleSaveThemeComplete,
                handleSaveThemeError
            );
        }
    }

    function handleSaveThemeCompleteNew(e, message) {
        changeThemesForApplication(message["themes"]);
        setRawThemeSelected(() => message["theme"]);
        setThemeKeySelected(() => message["key"]);
        const newTheme = ThemeModel(deepCopy(message["theme"]));
        setThemeSelected(() => newTheme);
    }

    function handleSaveThemeErrorNew(e, message) {
        console.log(e, message);
    }

    function handleSaveTheme() {
        if (themeKeySelected !== null && rawThemeSelected !== null) {
            // Here is where we have to add this theme to the themes available
            // and save to the themes file.
            // api.removeAllListeners();
            // api.on(api.events.THEME_SAVE_COMPLETE, handleSaveThemeComplete);
            // api.on(api.events.THEME_SAVE_ERROR, handleSaveThemeError);
            // api.themes.saveThemeForApplication(
            //     creds.appId,
            //     themeKeySelected,
            //     rawThemeSelected
            // );
            if (dashApi) {
                dashApi.saveTheme(
                    credentials.appId,
                    themeKeySelected,
                    rawThemeSelected,
                    handleSaveThemeComplete,
                    handleSaveThemeError
                );
            }
        }
        setIsEditing(false);
    }

    function handleSaveThemeComplete(e, message) {
        changeThemesForApplication(message["themes"]);
        setIsEditing(false);
    }

    function handleSaveThemeError(e, message) {
        console.log("theme save error ", e, message);
    }

    function handleChooseTheme(themeKey) {
        setThemeSelected(() => themes[themeKey]);
        setThemeKeySelected(() => themeKey);
        setRawThemeSelected(() => rawThemes[themeKey]);
    }

    function handleActivateTheme() {
        changeCurrentTheme(themeKeySelected);
        setIsOpen(false);
        // reset
        setThemeSelected(null);
        setIsEditing(false);
    }

    return (
        <Modal
            isOpen={open}
            setIsOpen={setIsOpen}
            width={"w-11/12 xl:w-full"}
            height="h-5/6"
        >
            <Panel backgroundColor={"bg-slate-800"} padding={false}>
                <div className={`flex flex-col w-full h-full overflow-hidden`}>
                    <div className="flex flex-row w-full h-full overflow-hidden">
                        <div className="flex flex-row w-full h-full space-x-4 overflow-hidden p-4">
                            {themeSelected && isEditing === false && (
                                <PanelThemePicker
                                    theme={themeSelected}
                                    themeKey={themeKeySelected}
                                    onUpdate={handleThemeSelected}
                                    onCreateNew={handleCreateNewTheme}
                                    onChooseTheme={handleChooseTheme}
                                    onChangeVariant={changeThemeVariant}
                                    rawTheme={rawThemeSelected}
                                />
                            )}
                            {themeSelected && isEditing === true && (
                                <PanelSelectTheme
                                    theme={themeSelected}
                                    themeKey={themeKeySelected}
                                    onUpdate={handleThemeSelected}
                                    onCreateNew={handleCreateNewTheme}
                                    rawTheme={rawThemeSelected}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`flex flex-row justify-end bg-gray-900 p-4 rounded-br rounded-bl border-t border-gray-800 justify-between items-center`}
                    >
                        {themeSelected !== null && (
                            <div className="flex flex-row">
                                <div
                                    className={`flex flex-col font-bold text-xl px-2`}
                                >
                                    {themeSelected !== null
                                        ? themeSelected["name"]
                                        : ""}
                                    <span className="text-xs text-gray-600">
                                        {themeKeySelected}
                                    </span>
                                </div>
                            </div>
                        )}
                        {isEditing === false && (
                            <div className="flex flex-row space-x-2">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    title="Cancel"
                                    textSize="text-base xl:text-lg"
                                    padding={"py-2 px-4"}
                                    backgroundColor={"bg-gray-700"}
                                    textColor={"text-gray-300"}
                                    hoverTextColor={"hover:text-gray-100"}
                                    hoverBackgroundColor={"hover:bg-gray-700"}
                                />
                                {themeSelected !== null && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        title="Edit"
                                        textSize="text-base xl:text-lg"
                                        padding={"py-2 px-4"}
                                        backgroundColor={"bg-gray-700"}
                                        textColor={"text-gray-300"}
                                        hoverTextColor={"hover:text-gray-100"}
                                        hoverBackgroundColor={
                                            "hover:bg-gray-700"
                                        }
                                    />
                                )}

                                {themeSelected !== null && (
                                    <Button
                                        onClick={handleActivateTheme}
                                        title="Activate"
                                        textSize="text-base xl:text-lg"
                                        padding={"py-2 px-4"}
                                        backgroundColor={"bg-gray-700"}
                                        textColor={"text-gray-300"}
                                        hoverTextColor={"hover:text-gray-100"}
                                        hoverBackgroundColor={
                                            "hover:bg-gray-700"
                                        }
                                    />
                                )}
                            </div>
                        )}
                        {isEditing === true && (
                            <div className="flex flex-row space-x-2">
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    title="Cancel"
                                    textSize="text-base xl:text-lg"
                                    padding={"py-2 px-4"}
                                    backgroundColor={"bg-gray-700"}
                                    textColor={"text-gray-300"}
                                    hoverTextColor={"hover:text-gray-100"}
                                    hoverBackgroundColor={"hover:bg-gray-700"}
                                />
                                <Button
                                    onClick={() =>
                                        handleSaveTheme(themeKeySelected)
                                    }
                                    title="Save Changes"
                                    textSize="text-base xl:text-lg"
                                    padding={"py-2 px-4"}
                                    backgroundColor={"bg-gray-700"}
                                    textColor={"text-gray-300"}
                                    hoverTextColor={"hover:text-gray-100"}
                                    hoverBackgroundColor={"hover:bg-gray-700"}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Panel>
        </Modal>
    );
};
