import React, { useContext } from "react";
import { Panel } from "@dash/Common";
import { ThemeContext } from "@dash/Context/ThemeContext";
import ThemePickerGridPane from "./Pane/ThemePickerGridPane";
import ThemeTitlePane from "./Pane/ThemeTitlePane";

export const PanelThemePicker = ({
    onUpdate,
    onCreateNew,
    onChangeVariant,
    theme = null,
    themeKey,
}) => {
    const { themeVariant, rawThemes } = useContext(ThemeContext);

    function handleSelectTheme(themeKey) {
        onUpdate(rawThemes[themeKey], themeKey);
    }

    function handleCreateNewTheme() {
        // lets generate a new Key, and a new theme
        onCreateNew(`theme-${Date.now()}`);
    }

    return (
        <Panel theme={false} backgroundColor={"bg-transparent"}>
            <div className="flex flex-col w-full h-full xl:space-x-4 overflow-hidden">
                <div className="flex flex-row h-full rounded xl:space-x-4 w-full">
                    <ThemeTitlePane
                        theme={theme}
                        themeKey={themeKey}
                        onClickNewTheme={handleCreateNewTheme}
                        onChooseVariant={onChangeVariant}
                    />

                    <div className="flex flex-col w-full w-1/2 xl:w-3/4">
                        {theme !== null && (
                            <div
                                className={`flex flex-row h-full rounded w-full overflow-hidden bg-gray-900 xl:space-x-2 p-2`}
                            >
                                <ThemePickerGridPane
                                    theme={theme}
                                    themeKey={themeKey}
                                    onClickNewTheme={handleCreateNewTheme}
                                    onChooseTheme={handleSelectTheme}
                                    onChooseVariant={onChangeVariant}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default PanelThemePicker;
