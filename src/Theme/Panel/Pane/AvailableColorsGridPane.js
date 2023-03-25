import React from "react";
import { colorNames, shades } from "@dash/Utils/colors";
import ThemePane from "./ThemePane";
import ColorTile from "../MenuItem/ColorTile";

const AvailableColorsGridPane = ({
    colorType = "primary",
    onClick = null,
    onMouseOver = null,
    shade = null,
}) => {
    function handleChooseColor(data) {
        console.log("chose color ", data);
        onClick !== null && onClick(data);
    }

    function handleChooseColorTemp(data) {
        console.log("chose color temp ", data);
        onMouseOver !== null && onMouseOver(data);
    }

    function renderAvailableColors() {
        return colorNames.sort().map((colorName) => {
            return shades
                .filter((c) => (shade === null ? true : c === shade))
                .map((shadeLevel) => {
                    // console.log(
                    //     "available ",
                    //     colorName,
                    //     shadeLevel,
                    //     colorType,
                    //     "hello"
                    // );
                    return (
                        <div className="flex flex-row justify-between items-center">
                            <span className="font-bold">
                                {colorName} {shadeLevel}
                            </span>
                            <ColorTile
                                width={"w-2/3"}
                                colorType={colorType}
                                colorName={colorName}
                                colorLevelName={shadeLevel}
                                shade={shadeLevel}
                                onClick={handleChooseColor}
                                onMouseOver={handleChooseColorTemp}
                            />
                        </div>
                    );
                });
        });
    }

    return (
        <ThemePane>
            <div className="grid grid-cols-1 gap-1">
                {renderAvailableColors()}
            </div>
        </ThemePane>
    );
};

export default AvailableColorsGridPane;
