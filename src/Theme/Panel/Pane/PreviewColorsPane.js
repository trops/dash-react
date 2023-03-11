import React, { useContext } from "react";
import ThemePane from "./ThemePane";
import ColorTile from "../MenuItem/ColorTile";
import { ThemeContext } from "@dash/Context";
import { deepCopy } from "@dash/Utils/objects";
import { Tag3 } from "@dash/Common";

const PreviewColorsPane = ({
    styles = null,
    theme,
    itemType = null,
    onClickItem = null,
    onResetStyles = null,
}) => {
    const { themeVariant } = useContext(ThemeContext);

    function handleClickItem(data, styleNameCss, itemType, objectType) {
        // override the object type
        data["objectType"] = objectType;
        onClickItem({ ...data, itemType, styleName: styleNameCss });
    }

    function handleResetStyles() {
        onResetStyles(itemType);
    }

    function hasCustomStyles() {
        let hasStyles = false;
        // are there any styles (custom) in the theme for this item?
        const themeStyles = theme[themeVariant][itemType];
        // do we have any custom styles in the theme?
        if (themeStyles !== undefined) {
            Object.keys(styles).forEach((styleKey) => {
                if (styleKey in themeStyles) {
                    hasStyles = true;
                }
            });
        }
        return hasStyles;
    }

    function renderAvailableColors() {
        // are there any styles (custom) in the theme for this item?
        const themeStyles = theme[themeVariant][itemType];
        // do we have any custom styles in the theme?
        let newStyles = deepCopy(styles);
        if (themeStyles !== undefined) {
            Object.keys(styles).forEach((styleKey) => {
                newStyles[styleKey] =
                    styleKey in themeStyles
                        ? themeStyles[styleKey]
                        : styles[styleKey];
            });
        }
        return Object.keys(newStyles)
            .filter((t) => t !== "string")
            .map((key) => {
                // lets get the base...
                // we also have to compare the current theme selected and the colors that are in there?
                // does the item have a default for the key? if not, abort!

                const parts =
                    key in newStyles
                        ? newStyles[key] !== undefined
                            ? newStyles[key].split("-")
                            : null
                        : null;

                if (parts !== null) {
                    const objectType = parts[0];
                    const colorName = parts[1];
                    const shade = parts[2];

                    return (
                        key !== "string" && (
                            <div
                                key={`preview-color-${key}`}
                                className="flex flex-row justify-between py-2 items-center border-b border-gray-700 px-2"
                            >
                                <span className="text-sm font-bold text-gray-300">
                                    {key}
                                </span>
                                <ColorTile
                                    width={"w-1/2"}
                                    colorFromTheme={`${parts[0]}-${parts[1]}-${parts[2]}`}
                                    shade={shade}
                                    colorName={colorName}
                                    panelType="item"
                                    itemType={itemType}
                                    objectType={"bg"}
                                    variant={"dark"}
                                    onClick={(data) =>
                                        handleClickItem(
                                            data,
                                            key,
                                            itemType,
                                            objectType
                                        )
                                    }
                                />
                            </div>
                        )
                    );
                }
                return null;
            });
    }

    return styles !== null && itemType !== null ? (
        <ThemePane>
            <div className="flex flex-col">{renderAvailableColors()}</div>
            {hasCustomStyles() === true && (
                <div className="flex flex-row justify-end">
                    <Tag3
                        theme={false}
                        text={"Reset to Default"}
                        backgroundColor={"bg-orange-700"}
                        onClick={handleResetStyles}
                        textSize={"text-xs"}
                    />
                </div>
            )}
        </ThemePane>
    ) : null;
};

export default PreviewColorsPane;
