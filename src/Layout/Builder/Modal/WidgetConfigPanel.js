import React, { useState, useEffect } from "react";
import { SelectMenu, InputText, Button } from "@dash/Common";

export const WidgetConfigPanel = ({
    onSave = null,
    onChange,
    item = null,
    disabled = false,
}) => {
    const [itemSelected, setItemSelected] = useState(item);

    useEffect(() => {
        if (item !== itemSelected) {
            setItemSelected(() => item);
        }
    }, [item]);

    function handleSaveChanges() {
        // setItemSelected(null);
        console.log("SAVE ", itemSelected);
        onSave && onSave(itemSelected);
        // setItemSelected(null);
    }

    function generateFractions() {
        const numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const denominators = [2, 3, 4, 5, 6, 12];
        const fractions = [];
        return numerators.map((v) => {
            return denominators
                .map((vv) => {
                    const fraction = v / vv;
                    if (
                        v % vv > 0 &&
                        v < vv &&
                        fractions.indexOf(fraction) < 0
                    ) {
                        fractions.push(fraction);
                        return (
                            <option
                                key={`${v}-${vv}`}
                                value={`w-${v}/${vv} min-w-${v}/${vv}`}
                            >
                                {v}/{vv}
                            </option>
                        );
                    } else {
                        return null;
                    }
                })
                .filter((p) => p !== null);
        });
    }

    function handleUpdate(e) {
        try {
            let newItem = JSON.parse(JSON.stringify(itemSelected));
            const { name, value } = e.target;
            newItem[name] = value;

            if (value === "false") newItem[name] = false;
            if (value === "true") newItem[name] = true;

            console.log("new item ", newItem);

            setItemSelected(() => newItem);
            onChange(e, newItem);
        } catch (e) {
            console.log(e);
        }
    }

    function handleTextChangeCustom(e, config) {
        const newItem = JSON.parse(JSON.stringify(itemSelected));
        if ("userPrefs" in itemSelected === false) {
            newItem["userPrefs"] = {};
        }
        newItem["userPrefs"][e.target.name] = e.target.value;
        //setItemSelected(() => newItem);
        onChange(e, newItem);
    }

    function renderCustomSettings() {
        if (itemSelected) {
            if ("userConfig" in itemSelected) {
                const userConfig = itemSelected["userConfig"];
                return Object.keys(userConfig).map((key) => {
                    // depending on the type...
                    const configItem = userConfig[key];
                    const { instructions, displayName, required, type } =
                        configItem;

                    // get the user prefs for the key
                    const userPrefs = itemSelected.userPrefs;

                    return renderFormItem(
                        displayName,
                        key,
                        instructions,
                        required,
                        userPrefs[key],
                        handleTextChangeCustom,
                        configItem
                    );
                });
            }
        }
        return null;
    }

    function renderFormItem(
        displayName,
        key,
        instructions,
        required,
        value,
        onChange,
        configItem
    ) {
        return (
            <div
                key={`config-item-${key}`}
                className={`rounded flex flex-col p-2 space-y-1`}
            >
                <span className="uppercase text-gray-300 font-bold text-sm">
                    {displayName}{" "}
                    {required === true && (
                        <span className="text-red-500">*</span>
                    )}
                </span>
                <div className="text-xs text-gray-400 pb-2">{instructions}</div>
                {configItem["type"] === "text" && (
                    <InputText
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) => onChange(e, configItem)}
                        textSize="text-base"
                    />
                )}
                {configItem["type"] === "secret" && (
                    <InputText
                        type="password"
                        name={key}
                        value={value}
                        onChange={(e) => onChange(e, configItem)}
                        textSize="text-base"
                    />
                )}
                {configItem["type"] === "select" && (
                    <SelectMenu
                        name={key}
                        selectedValue={value}
                        onChange={(e) => onChange(e, configItem)}
                        textSize="text-base"
                    >
                        {"options" in configItem &&
                            configItem.options.map((option) => {
                                return (
                                    <option value={option.value}>
                                        {option.displayName}
                                    </option>
                                );
                            })}
                    </SelectMenu>
                )}
            </div>
        );
    }

    return (
        itemSelected && (
            <div className="flex flex-col w-full bg-gray-900 p-4 text-2xl rounded text-gray-400 h-full">
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <div className="flex flex-col space-y-2 w-full overflow-y-scroll">
                        {renderCustomSettings()}

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Width"}{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                The width of your Widget in the Layout.
                            </div>
                            <SelectMenu
                                name={"width"}
                                onChange={handleUpdate}
                                selectedValue={itemSelected.width}
                                textSize="text-base"
                            >
                                <option key={"width-full"} value="w-full">
                                    Full
                                </option>
                                {generateFractions()}
                            </SelectMenu>
                        </div>

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Height"}{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                The height of your Widget in the Layout.
                            </div>
                            <SelectMenu
                                name={"height"}
                                onChange={handleUpdate}
                                selectedValue={itemSelected.height}
                                textSize="text-base"
                            >
                                <option key={"height-full"} value="h-full">
                                    Full Height
                                </option>
                                <option
                                    key={"height-1-4"}
                                    value="h-1/4 min-h-1/4"
                                >
                                    1/4
                                </option>
                                <option
                                    key={"height-1-3"}
                                    value="h-1/3 min-h-1/3"
                                >
                                    1/3
                                </option>
                                <option
                                    key={"height-1-2"}
                                    value="h-1/2 min-h-1/2"
                                >
                                    1/2
                                </option>
                                <option
                                    key={"height-3-4"}
                                    value="h-3/4 min-h-3/4"
                                >
                                    3/4
                                </option>
                                <option key={"height-fit"} value="h-fit">
                                    Fit Content
                                </option>
                            </SelectMenu>
                        </div>

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Scrolling"}{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                If this widget allows vertical scrolling.
                            </div>
                            <SelectMenu
                                name={"scrollable"}
                                onChange={handleUpdate}
                                selectedValue={itemSelected.scrollable}
                                textSize="text-base"
                            >
                                <option key={"scrollable-yes"} value={true}>
                                    Scrollable
                                </option>
                                <option key={"scrollable-no"} value={false}>
                                    Fixed (No Scrolling)
                                </option>
                            </SelectMenu>
                        </div>

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Spacing"}{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                If this item will be space child items evenly.
                            </div>
                            <SelectMenu
                                name={"space"}
                                onChange={handleUpdate}
                                selectedValue={itemSelected.scrollable}
                                textSize="text-base"
                            >
                                <option key={"space-yes"} value={true}>
                                    Allow Spacing
                                </option>
                                <option key={"space-no"} value={false}>
                                    No Spacing
                                </option>
                            </SelectMenu>
                        </div>

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Grow"} <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                If this item will grow to fit the space.
                            </div>
                            <SelectMenu
                                name={"grow"}
                                onChange={handleUpdate}
                                selectedValue={itemSelected.scrollable}
                                textSize="text-base"
                            >
                                <option key={"grow-yes"} value={true}>
                                    Allow Growing
                                </option>
                                <option key={"grow-no"} value={false}>
                                    No Growing Allowed
                                </option>
                            </SelectMenu>
                        </div>

                        <div className={`rounded flex flex-col p-2`}>
                            <span className="uppercase text-gray-300 font-bold text-sm">
                                {"Direction"}{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <div className="text-xs text-gray-400 pb-2">
                                The layout direction for the widget content.
                            </div>
                            <SelectMenu
                                name={"direction"}
                                onChange={handleUpdate}
                                selectedValue={
                                    itemSelected && itemSelected.direction
                                }
                                textSize="text-base"
                            >
                                <option key={"direction-col"} value="col">
                                    Vertical
                                </option>
                                <option key={"direction-row"} value="row">
                                    Horizontal
                                </option>
                            </SelectMenu>
                        </div>

                        <div className="text-xs p-4 break-all">
                            <pre>{JSON.stringify(itemSelected, null, 2)}</pre>
                        </div>
                    </div>
                </div>

                {onSave !== null && (
                    <div className="flex flex-row w-full">
                        <Button
                            title="Save Changes"
                            onClick={handleSaveChanges}
                            block
                            disabled={disabled}
                        />
                    </div>
                )}
            </div>
        )
    );
};
