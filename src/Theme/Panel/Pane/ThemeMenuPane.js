import React, { useState, useContext } from "react";
import { colorTypes, themeVariants } from "@dash/Utils/colors";
import ColorTile from "../MenuItem/ColorTile";
import AvailableColorsGridPane from "./AvailableColorsGridPane";
import ThemePane from "./ThemePane";
import { ThemeContext } from "@dash/Context";
import { ColorModel } from "@dash/Models";

const ThemeMenuPane = ({ theme, onChooseColor, onChooseReplacementColor }) => {
    const [selectedColor, setSelectedColor] = useState(null);

    const { themeVariant } = useContext(ThemeContext);
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);

    // useEffect(() => {
    //     forceUpdate();
    // }, [theme]);

    function handleSelectColor(c, colorType) {
        setSelectedColor({
            color: c,
            colorType,
            type: c["objectType"],
            itemType: c["itemType"],
        });
        onChooseColor(c);
    }

    // function handleSelectColorTemp(c, colorType) {
    //     setSelectedColor({ color: c, colorType, type: c['objectType'], itemType: c['itemType'] });
    //     onChooseColor(c);
    // }

    function handleReplaceColor({
        panelType = "main",
        colorType,
        colorName,
        shade = 500,
    }) {
        if (selectedColor !== null) {
            const colorReplacement = { colorName, colorType, shade, panelType };
            const r = ColorModel(colorReplacement);
            onChooseReplacementColor(selectedColor, r);
            setSelectedColor(null);
        }
    }

    function handleReplaceColorTemp({
        panelType = "main",
        colorType,
        colorName,
        shade = 500,
    }) {
        if (selectedColor !== null) {
            const colorReplacement = { colorName, colorType, shade, panelType };
            const r = ColorModel(colorReplacement);
            onChooseReplacementColor(selectedColor, r);
        }
    }

    return (
        <ThemePane className={"space-y-2"}>
            {(selectedColor === null ||
                selectedColor["color"]["panelType"] === "main") && (
                <div className="flex flex-col rounded w-full bg-gray-800 space-y-2">
                    <div className="flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700">
                        Main
                    </div>
                    <div className="flex flex-row w-full space-x-2 p-4">
                        {colorTypes
                            .filter((ct) =>
                                selectedColor !== null
                                    ? selectedColor["color"]["panelType"] ===
                                          "main" &&
                                      selectedColor["color"]["colorType"] === ct
                                    : true
                            )
                            .map((colorType) => {
                                const bgColor = theme[themeVariant][colorType];
                                // const selected = selectedColor !== null
                                //     ? colorType === selectedColor['color']['colorType'] && bgColor === selectedColor['color']['colorName'] && selectedColor['color']['panelType'] === 'main'
                                //     : false;
                                return (
                                    <ColorTile
                                        colorName={bgColor}
                                        colorType={colorType}
                                        colorLevelName={null}
                                        selected={false}
                                        panelType="main"
                                        shade={500}
                                        onClick={(c) =>
                                            handleSelectColor(c, colorType)
                                        }
                                        width={"w-full"}
                                    />
                                );
                            })}
                    </div>
                </div>
            )}

            {(selectedColor === null ||
                selectedColor["color"]["panelType"] === "sub") && (
                <div
                    className={`flex flex-col rounded w-full space-y-2 min-h-1/4 overflow-y-scroll ${
                        selectedColor !== null ? "h-1/4" : "h-full"
                    }`}
                >
                    {colorTypes
                        .filter((ct) =>
                            selectedColor !== null
                                ? selectedColor["color"]["panelType"] ===
                                      "sub" &&
                                  selectedColor["color"]["colorType"] === ct
                                : true
                        )
                        .map((colorType) => {
                            return (
                                <div className="flex flex-col w-full h-full rounded bg-gray-800">
                                    <div className="flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700">
                                        {colorType}
                                    </div>
                                    <div className="flex flex-col p-2">
                                        {themeVariants
                                            .filter((v) =>
                                                selectedColor !== null
                                                    ? selectedColor["color"][
                                                          "level"
                                                      ] === v
                                                    : true
                                            )
                                            .map((colorLevelName) => {
                                                // console.log('color level name ', colorLevelName, selectedColor['color']['level']);
                                                const stringToCheck = `bg-${colorType}-${colorLevelName}`;
                                                // const bgColor = theme[themeVariant][colorType];
                                                const themeColor =
                                                    theme[themeVariant][
                                                        stringToCheck
                                                    ];

                                                const parts =
                                                    themeColor.split("-");

                                                const colorName = parts[1];
                                                const shade =
                                                    parts[parts.length - 1];
                                                const selected =
                                                    selectedColor !== null
                                                        ? colorType ===
                                                              selectedColor[
                                                                  "color"
                                                              ]["colorType"] &&
                                                          colorLevelName ===
                                                              selectedColor[
                                                                  "color"
                                                              ]["level"] &&
                                                          selectedColor[
                                                              "color"
                                                          ]["panelType"] ===
                                                              "sub"
                                                        : false;
                                                return (
                                                    <div className="flex flex-row justify-between py-2 items-center border-b border-gray-700 px-2">
                                                        <span className="text-sm font-bold text-gray-300">
                                                            {colorLevelName}
                                                        </span>
                                                        <ColorTile
                                                            colorFromTheme={
                                                                themeColor
                                                            }
                                                            colorName={
                                                                colorName
                                                            }
                                                            colorType={
                                                                colorType
                                                            }
                                                            colorLevelName={
                                                                colorLevelName
                                                            }
                                                            variant={
                                                                themeVariant
                                                            }
                                                            selected={selected}
                                                            panelType="sub"
                                                            shade={shade}
                                                            onClick={
                                                                handleSelectColor
                                                            }
                                                            // onHover={handleSelectColorTemp}
                                                            // height={'h-5'}
                                                            width={"w-1/2"}
                                                        />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
            {selectedColor !== null && (
                <div className="flex flex-col roundedw-full bg-gray-800 space-y-4 overflow-hidden h-full">
                    <div className="flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700">
                        Available Colors
                    </div>
                    <div className="flex flex-col p-2 h-full overflow-y-scroll">
                        <AvailableColorsGridPane
                            colorType={selectedColor["color"]["colorType"]}
                            onClick={handleReplaceColor}
                            onMouseOver={handleReplaceColorTemp}
                            shade={
                                selectedColor["color"]["panelType"] === "main"
                                    ? 500
                                    : null
                            }
                        />
                    </div>
                </div>
            )}
        </ThemePane>
    );
};

export default ThemeMenuPane;
