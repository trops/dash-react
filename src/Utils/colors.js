/**
 * utils/colors.js
 * This file contains utility functions and values to be used for Themeing
 */

import { themeObjects, styleClassNames } from "@dash/Utils";

const objectTypes = [
    "bg",
    "text",
    "hover-bg",
    "hover-text",
    "border",
    // "p",
    // "m",
    // "textSize",
];

const objectTypeClasses = {
    bg: {
        class: "backgroundColor",
    },
    border: {
        class: "borderColor",
    },
    text: {
        class: "textColor",
    },
    "hover-text": {
        class: "hoverTextColor",
    },
    "hover-bg": {
        class: "hoverBackgroundColor",
    },
    "hover-border": {
        class: "hoverBorderColor",
    },
    // p: {
    //     class: "padding",
    // },
    // m: {
    //     class: "margin",
    // },
    // "text-size": {
    //     class: "textSize",
    // },
};

const themeVariants = ["very-light", "light", "medium", "dark", "very-dark"];

const colorTypes = ["primary", "secondary", "tertiary", "neutral"];

const colorNames = [
    "zinc",
    "neutral",
    "stone",
    "red",
    "gray",
    "blue",
    "slate",
    "indigo",
    "yellow",
    "orange",
    "amber",
    "lime",
    "emerald",
    "green",
    "teal",
    "cyan",
    "sky",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const colorMap = {
    [themeObjects.BUTTON]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.PADDING]: "padding-primary",
    },
    [themeObjects.BUTTON_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.BUTTON_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-dark",
    },
    [themeObjects.PANEL]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-very-dark",
    },
    [themeObjects.PANEL_HEADER]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-very-dark",
    },
    [themeObjects.PANEL_FOOTER]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-very-dark",
    },
    [themeObjects.PANEL_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.PANEL_HEADER_2]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.PANEL_FOOTER_2]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.PANEL_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-very-dark",
    },
    [themeObjects.PANEL_HEADER_3]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-very-dark",
    },
    [themeObjects.PANEL_FOOTER_3]: {
        // [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-very-dark",
    },
    [themeObjects.BUTTON_ICON]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-dark",
    },
    [themeObjects.BUTTON_ICON_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.BUTTON_ICON_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-dark",
    },
    [themeObjects.HEADING]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.HEADING_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.HEADING_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.SUBHEADING]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.SUBHEADING_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.SUBHEADING_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.PARAGRAPH]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.PARAGRAPH_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.PARAGRAPH_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.MENU_ITEM]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.MENU_ITEM_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.MENU_ITEM_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.TAG]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.TAG_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.TAG_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
    },
    [themeObjects.TOGGLE]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
    },
    [themeObjects.DASHBOARD_FOOTER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
    },
    [themeObjects.DASHBOARD_FOOTER_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.DASHBOARD_FOOTER_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
    },
    [themeObjects.CODE_EDITOR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.INPUT_TEXT]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.SELECT_MENU]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.FORM_LABEL]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.DASH_PANEL]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-very-dark",
    },
    [themeObjects.DASH_PANEL_HEADER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.DASH_PANEL_FOOTER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.DASH_PANEL_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-very-dark",
    },
    [themeObjects.DASH_PANEL_HEADER_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
    },
    [themeObjects.DASH_PANEL_FOOTER_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
    },
    [themeObjects.DASH_PANEL_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-very-dark",
    },
    [themeObjects.DASH_PANEL_HEADER_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
    },
    [themeObjects.DASH_PANEL_FOOTER_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
    },
    [themeObjects.WIDGET]: {},
    [themeObjects.WORKSPACE]: {},
    [themeObjects.LAYOUT_CONTAINER]: {},
};

console.log(colorMap);

/**
 * getStylesForItem
 * @param {string} itemName the name of the component (button, panel, etc)
 *
 */
const getStylesForItem = (itemName = null, theme = null, overrides = {}) => {
    try {
        if (itemName !== null) {
            // get the colors from the theme by default
            // this is a MAP like "bg-primary-dark" which needs to
            // fetch its value from the actual theme based on this key mapping
            const defaultStyles =
                itemName in colorMap ? colorMap[itemName] : null;

            // then we have to determine if this item has any theme overrides

            const themeOverrides =
                theme !== null && itemName in theme ? theme[itemName] : {};

            // then we have to determine if the component has any MANUAL overrides
            const manualOverrides =
                Object.keys(overrides).length > 0 ? overrides : {};

            // and this is the styles we shall return
            let styles = {};

            // First set all of the defaults
            Object.keys(defaultStyles).forEach((key) => {
                styles[key] = theme[defaultStyles[key]];
            });

            // scrollbars?

            const grow =
                "grow" in overrides && overrides["grow"] === false
                    ? "flex-shrink"
                    : "flex-grow";

            console.log("grow styles ", grow);

            const scrollbarStyles =
                "scrollable" in overrides && overrides["scrollable"] === true
                    ? `overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800 ${grow}`
                    : `overlflow-visible ${grow}`;

            // we have to begin with the defaults for the theme so we have access
            // and knowledge of what keys in the theme to return.
            // the trick is applying the overrides to those theme keys
            // if they exist.

            if (defaultStyles !== null) {
                // now we have to handle the overrides
                // if the user has passed in any
                Object.keys(defaultStyles).forEach((className) => {
                    // check manual override
                    if (
                        className in manualOverrides &&
                        manualOverrides[className] !== null
                    ) {
                        styles[className] = manualOverrides[className];
                    }

                    if (className in themeOverrides) {
                        const themeClass = themeOverrides[className];
                        styles[className] = themeClass;
                    }
                });
            }

            // generate the final styles object including the string
            // that can be used in the className variable of the component
            const stylesObject = {
                string:
                    Object.keys(styles).length > 0
                        ? Object.keys(styles)
                              .map((key) => styles[key])
                              .join(" ")
                              .concat(" ")
                              .concat(scrollbarStyles)
                        : scrollbarStyles,
                ...styles,
            };

            console.log(stylesObject);
            console.log(stylesObject.string);

            return stylesObject;
        }
    } catch (e) {
        console.log(e);
        return {
            string: "",
        };
    }
    return {
        string: null,
    };
};

const getClassForObjectType = (objectType) => {
    return objectTypeClasses[objectType]["class"];
};

function getStyleName(objectType) {
    let s = null;
    switch (objectType) {
        case "bg":
            s = "background";
            break;
        case "text":
            s = "text";
            break;
        case "hover:text":
            s = "hover-text";
            break;
        case "hover:bg":
            s = "hover-background";
            break;
        case "p":
            s = "padding";
            break;
        default:
            s = objectType;
            break;
    }
    return s;
}

export {
    colorTypes,
    colorNames,
    shades,
    themeVariants,
    objectTypes,
    getStylesForItem,
    getClassForObjectType,
    getStyleName,
};
