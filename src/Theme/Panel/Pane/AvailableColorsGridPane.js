import React from "react";
import { colorNames, shades } from "@dash/Utils/colors";
import ThemePane from "./ThemePane";
import ColorTile from "../MenuItem/ColorTile";
import { Button, DashPanel } from "../../../Common";
import { LayoutContainer } from "../../../Layout";

const AvailableColorsGridPane = ({
    currentColor = null,
    colorType = "primary",
    onClick = null,
    onCancel = null,
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

    function handleCancel() {
        onCancel && onCancel(currentColor);
    }

    function renderAvailableColors() {
        return colorNames.sort().map((colorName) => {
            return shades
                .filter((c) => (shade === null ? true : c === shade))
                .map((shadeLevel) => {
                    return (
                        <div className="flex flex-row justify-between items-center">
                            <span className="font-bold text-xs">
                                {colorName}
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
        // <LayoutContainer
        //     direction="col"
        //     scrollable={false}
        //     className="space-y-1"
        //     height={"h-full"}
        // >
        <DashPanel height="h-full" scrollable={true}>
            <DashPanel.Header title="AvailableColors" />
            <DashPanel.Body scrollable={true} height={"h-full"}>
                {renderAvailableColors()}
            </DashPanel.Body>
            {onCancel && (
                <DashPanel.Footer>
                    <Button
                        title="Cancel"
                        block={true}
                        onClick={handleCancel}
                    />
                </DashPanel.Footer>
            )}
        </DashPanel>
        // </LayoutContainer>
    );
};

export default AvailableColorsGridPane;
