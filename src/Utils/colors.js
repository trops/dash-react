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
    "hover-border",
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
    [themeObjects.CARD]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-primary-light",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-primary-medium",
    },
    [themeObjects.CARD_2]: {
        [themeObjects.BREADCRUMBS]: {
            [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        },
        [themeObjects.BREADCRUMBS_2]: {
            [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        },
        [themeObjects.BREADCRUMBS_3]: {
            [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        },
        [themeObjects.ALERT]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-primary-light",
            [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        },
        [themeObjects.ALERT_2]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-secondary-light",
            [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        },
        [themeObjects.ALERT_3]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-tertiary-light",
            [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        },
        [themeObjects.PROGRESS_BAR]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
            [styleClassNames.BORDER_COLOR]: "border-primary-dark",
            [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        },
        [themeObjects.PROGRESS_BAR_2]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-dark",
            [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
            [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        },
        [themeObjects.PROGRESS_BAR_3]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-dark",
            [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
            [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        },
        [themeObjects.TOAST]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-primary-light",
            [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        },
        [themeObjects.TOAST_2]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-secondary-light",
            [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        },
        [themeObjects.TOAST_3]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-light",
            [styleClassNames.BORDER_COLOR]: "border-tertiary-light",
            [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        },
        [themeObjects.WIDGET_CHROME]: {
            [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
            [styleClassNames.BORDER_COLOR]: "border-primary-very-dark",
            [styleClassNames.TEXT_COLOR]: "text-primary-light",
        },
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-secondary-light",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-secondary-medium",
    },
    [themeObjects.CARD_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-light",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-tertiary-medium",
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
    [themeObjects.TABLE]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-light",
    },
    [themeObjects.TABLE_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-medium",
        [styleClassNames.TEXT_COLOR]: "text-secondary-light",
    },
    [themeObjects.TABLE_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-medium",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-light",
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
    [themeObjects.TEXTAREA]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.SEARCH_INPUT]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.CHECKBOX]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.RADIO]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.SWITCH]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.SLIDER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
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

const getCSSStyleForClassname = (className, itemName) => {
    return colorMap[itemName][className];
};

const uniqueClasses = [
    "grow",
    "scrollable",
    "width",
    "height",
    "padding",
    "backgroundColor",
    "borderColor",
    "direction",
    "textColor",
];

/**
 * Remove the classes from the low priority object
 * @param {Object} high The array that is
 * @param {Object} low
 */
const prioritizeClasses = (high, low) => {
    try {
        Object.keys(high).forEach((k) => {
            if (high[k]) {
                if (k in low) {
                    delete low[k];
                }
            }
        });
        return { ...high, ...low };
    } catch (e) {
        console.log(e);
        return null;
    }
};

const getValueFromTheme = (key, theme) => {
    return theme[key];
};

/**
 * Generate the styles for the element based on the theme, themeOverrides and manual overrides
 * Reduce overlap/override of styles for example overflow-scroll-y, and overflow-clip, etc etc
 * Need to mrege what is default and what is an override
 *
 * @param {string} itemName the name of the component (button, panel, etc)
 * @returns {Object} the object containing the style information
 */
const getStylesForItem = (
    itemName = null,
    theme = null,
    overrides = {},
    id = null
) => {
    try {
        if (itemName !== null) {
            // get the colors from the theme by default
            // this is a MAP like "bg-primary-dark" which needs to
            // fetch its value from the actual theme based on this key mapping
            const defaultStyles =
                itemName in colorMap ? colorMap[itemName] : null;

            // then we have to determine if this item has any theme overrides
            // this uses the THEME LANGUAGE to override
            const themeOverrides =
                theme !== null && itemName in theme ? theme[itemName] : {};

            // then we have to determine if the component has any MANUAL overrides
            // this uses CSS CLASSES to override, no need to translate
            const manualOverrides =
                Object.keys(overrides).length > 0 ? overrides : {};

            // Prioritizing ClassNames here
            const prioritizeThemeOverrides = prioritizeClasses(
                themeOverrides,
                defaultStyles
            );

            // now we have to get the TRUE value from the class from the theme...
            const prioritizeThemeValues = {};
            Object.keys(prioritizeThemeOverrides).forEach((k) => {
                if (prioritizeThemeOverrides[k] in theme) {
                    prioritizeThemeValues[k] =
                        theme[prioritizeThemeOverrides[k]];
                } else {
                    prioritizeThemeValues[k] = prioritizeThemeOverrides[k];
                }
            });

            // now we can prioritize the manual overrides if there are any
            const prioritizedStyles = prioritizeClasses(
                manualOverrides,
                prioritizeThemeValues
            );

            // and this is the styles we shall return
            let styles = {};
            // grab the theme values out of the theme (color, etc)
            Object.keys(prioritizedStyles).forEach((key) => {
                styles[key] = getStyleValueVariant(key, prioritizedStyles);
            });

            // console.log("value check final styles ", styles);
            // scrollbars?

            const grow =
                "grow" in prioritizedStyles &&
                prioritizedStyles["grow"] === false
                    ? "flex-shrink"
                    : "flex-grow";

            const scrollbarStyles =
                "scrollable" in prioritizedStyles &&
                prioritizedStyles["scrollable"] === true
                    ? `overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-800 ${grow}`
                    : ` ${grow} mr-0`;

            const hasChildren =
                "hasChildren" in prioritizedStyles
                    ? prioritizedStyles["hasChildren"]
                    : false;

            const childCount =
                "childCount" in prioritizedStyles
                    ? prioritizedStyles["childCount"]
                    : null;

            const directionValue =
                "direction" in prioritizedStyles
                    ? prioritizedStyles["direction"]
                    : null;

            const widthValue =
                "width" in prioritizedStyles
                    ? prioritizedStyles["width"]
                    : null;

            const heightValue =
                "height" in prioritizedStyles
                    ? prioritizedStyles["height"]
                    : null;

            const paddingValue =
                "padding" in prioritizedStyles
                    ? prioritizedStyles["padding"]
                    : null;

            const directionStyles =
                directionValue !== null
                    ? directionValue === "col"
                        ? "flex-col"
                        : "flex-row"
                    : "";

            const paddingStyles =
                (itemName === themeObjects.LAYOUT_CONTAINER ||
                    itemName === themeObjects.WORKSPACE) &&
                hasChildren === true &&
                childCount > 1 &&
                directionValue !== null
                    ? "space" in prioritizedStyles &&
                      prioritizedStyles["space"] !== false
                        ? directionValue === "col"
                            ? "space-y-4"
                            : "space-x-4"
                        : null
                    : null; // not layout container

            let additionalStyles = scrollbarStyles
                .concat(" ")
                .concat(directionStyles);

            if (paddingStyles !== null) {
                additionalStyles = additionalStyles.concat(" ", paddingStyles);
            }

            if (widthValue !== null) {
                additionalStyles = additionalStyles.concat(" ", widthValue);
            }
            if (heightValue !== null) {
                additionalStyles = additionalStyles.concat(" ", heightValue);
            }

            if (paddingValue !== null) {
                additionalStyles = additionalStyles.concat(" ", paddingValue);
            }

            // we have to begin with the defaults for the theme so we have access
            // and knowledge of what keys in the theme to return.
            // the trick is applying the overrides to those theme keys
            // if they exist.

            // if (prioritizedStyles !== null) {
            //     // now we have to handle the overrides
            //     // if the user has passed in any
            //     Object.keys(prioritizedStyles).forEach((className) => {
            //         // Order of operations...
            //         // Default
            //         // Theme
            //         // Manual (in component itself)
            //         // if (className in themeOverrides) {
            //         //     const themeClass = getStyleValueVariant(
            //         //         className,
            //         //         themeOverrides
            //         //     );
            //         //     styles[className] = themeClass;
            //         // }

            //         // Manual Overrides
            //         // in props of component itself (custom deepest level)
            //         // if (
            //         //     className in manualOverrides &&
            //         //     manualOverrides[className] !== null
            //         // ) {
            //             styles[className] = getStyleValueVariant(
            //                 className,
            //                 prioritizedStyles
            //             );
            //         // }
            //     });
            // }

            // generate the final styles object including the string
            // that can be used in the className variable of the component
            // we want to make sure that we remove duplicates

            const finalStyles = {};
            Object.keys(styles).forEach((k) => {
                if (k in finalStyles === false) {
                    finalStyles[k] = styles[k].replaceAll(
                        "overflow-hidden",
                        "overflow-clip"
                    );
                }
            });

            const styleSet = [
                ...new Set(
                    additionalStyles
                        .split(" ")
                        .filter((v) => v !== " " && v !== false && v !== true)
                ),
            ].join(" ");

            // console.log("FINAL KEYS ", Object.keys(finalStyles), Object.keys(styles), t.join(" "));

            const finalString =
                Object.keys(finalStyles).length > 0
                    ? Object.keys(finalStyles)
                          .map((key) => finalStyles[key])
                          .join(" ")
                          .concat(" ", styleSet)
                    : styleSet;

            const removeValues = [
                true,
                false,
                "col",
                "row",
                " ",
                "false",
                "true",
                1,
                "1",
            ];
            const stylesObject = {
                string: [
                    ...new Set(
                        finalString
                            .split(" ")
                            .filter(
                                (v) =>
                                    removeValues.includes(v) === false &&
                                    v !== " "
                            )
                            .map((v) =>
                                v.replaceAll("overflow-hidden", "overflow-clip")
                            )
                    ),
                ]
                    .map((v) =>
                        v.trim().replaceAll("overflow-hidden", "overflow-clip")
                    )
                    .join(" "),
                ...finalStyles,
            };

            // console.log("STYLES OBJECT ", itemName, stylesObject);
            return stylesObject;
        }
    } catch (e) {
        console.log("getStylesforItem", e.message);
        return {
            string: "",
        };
    }
    return {
        string: null,
    };
};

const getStyleValueVariant = (className, obj) => {
    try {
        switch (className) {
            case "hoverBorderColor":
            case "hoverBackgroundColor":
                const val = obj[className].replaceAll("hover:", "");
                return "hover:" + val;
            default:
                return obj[className].replaceAll(
                    "overflow-hidden",
                    "overflow-clip"
                );
        }
    } catch (e) {
        return "";
    }
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
    getCSSStyleForClassname,
};
