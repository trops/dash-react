/**
 * utils/colors.js
 * This file contains utility functions and values to be used for Themeing
 */

import { themeObjects, styleClassNames } from "@dash/Utils";

const objectTypes = ["bg", "text", "hover-bg", "hover-text", "border"];

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
    [themeObjects.PANEL_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
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
};

/**
 * getStylesForItem
 * @param {string} itemName the name of the component (button, panel, etc)
 *
 */
const getStylesForItem = (itemName = null, theme = null, overrides = {}) => {
    if (itemName !== null) {
        // get the colors from the theme by default
        // this is a MAP like "bg-primary-dark" which needs to
        // fetch its value from the actual theme based on this key mapping
        const defaultStyles = itemName in colorMap ? colorMap[itemName] : null;

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
            console.log(
                "trying to set ",
                key,
                defaultStyles[key],
                theme[defaultStyles[key]]
            );
            styles[key] = theme[defaultStyles[key]];
        });

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

                // check theme override
                if (className in themeOverrides) {
                    const themeOverrideKey = themeOverrides[className];
                    styles[className] = theme[themeOverrideKey];
                }
            });
        }

        console.log(
            "final",
            itemName,
            Object.keys(styles)
                .map((key) => styles[key])
                .join(" ")
        );

        return {
            string:
                Object.keys(styles).length > 0
                    ? Object.keys(styles)
                          .map((key) => styles[key])
                          .join(" ")
                    : "",
            ...styles,
        };
    }
    return null;
};

/**
 * getStyleForClass
 * @param {string} className the name of the css class i.e. - textColor, backgroundColor
 * @param {object} customStyles any custom styles that the user has for the component (button, panel, etc)
 * @param {object} overrides any user overrides above and beyond what is in the theme
 * @param {*} fallbackStyle
 * @returns
 */
const getStyleForClass = (
    className,
    customStyles,
    overrides,
    fallbackStyle = ""
) => {
    const style =
        className in overrides && overrides[className] !== null
            ? overrides[className]
            : customStyles !== null
            ? className in customStyles
                ? customStyles[className]
                : fallbackStyle
            : fallbackStyle;

    return style;
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
