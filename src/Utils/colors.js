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
    "placeholder-text",
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
    "placeholder-text": {
        class: "placeholderTextColor",
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
        // Colors (existing)
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.PADDING]: "padding-primary",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-sm",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-4 py-2", // Default (md) - overridden by sizeOverrides
        [styleClassNames.TEXT_SIZE]: "text-base", // Default (md) - overridden by sizeOverrides
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.BUTTON_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-sm",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-3 py-1.5",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-secondary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-secondary-light",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.BUTTON_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-sm",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-2 py-1",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-tertiary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-tertiary-light",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.FONT_WEIGHT]: "font-normal",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.CARD]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-primary-light",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-primary-medium",
    },
    [themeObjects.CARD_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-secondary-light",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-secondary-medium",
    },
    [themeObjects.BREADCRUMBS]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.TEXT_SIZE]: "text-base",
    },
    [themeObjects.BREADCRUMBS_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.TEXT_SIZE]: "text-sm",
    },
    [themeObjects.BREADCRUMBS_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.TEXT_SIZE]: "text-xs",
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
    [themeObjects.ALERT_BANNER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-blue-50",
        [styleClassNames.BORDER_COLOR]: "border-blue-500",
        [styleClassNames.TEXT_COLOR]: "text-blue-900",
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
    [themeObjects.CARD_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-light",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-light",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-light",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-tertiary-medium",
    },
    [themeObjects.PANEL]: {
        // Colors (existing)
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-very-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-md",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.SPACING]: "p-4", // Default (md) - overridden by sizeOverrides
        [styleClassNames.TRANSITION]: "transition-all duration-200",
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
        // Colors (existing)
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-primary-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-none",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-3 py-2",
        [styleClassNames.TEXT_SIZE]: "text-base",
        [styleClassNames.ICON_SIZE]: "h-5 w-5",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.CURSOR]: "cursor-pointer",
        // Selected States
        [styleClassNames.SELECTED_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.SELECTED_TEXT_COLOR]: "text-primary-light",
    },
    [themeObjects.BUTTON_ICON_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-secondary-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-none",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-2.5 py-1.5",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.ICON_SIZE]: "h-4 w-4",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-secondary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.CURSOR]: "cursor-pointer",
        // Selected States
        [styleClassNames.SELECTED_BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.SELECTED_TEXT_COLOR]: "text-secondary-light",
    },
    [themeObjects.BUTTON_ICON_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "border-tertiary-dark",
        // Design Tokens (v0.2.0+)
        [styleClassNames.SHADOW]: "shadow-none",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "px-2 py-1",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.ICON_SIZE]: "h-3 w-3",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        // Interactive States (v0.3.0+)
        [styleClassNames.FOCUS_RING_COLOR]: "ring-tertiary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.CURSOR]: "cursor-pointer",
        // Selected States
        [styleClassNames.SELECTED_BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.SELECTED_TEXT_COLOR]: "text-tertiary-light",
    },
    [themeObjects.HEADING]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-5xl",
        [styleClassNames.FONT_WEIGHT]: "font-bold",
        [styleClassNames.LETTER_SPACING]: "tracking-tight",
        [styleClassNames.LINE_HEIGHT]: "leading-tight",
    },
    [themeObjects.HEADING_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-4xl",
        [styleClassNames.FONT_WEIGHT]: "font-bold",
        [styleClassNames.LETTER_SPACING]: "tracking-tight",
        [styleClassNames.LINE_HEIGHT]: "leading-tight",
    },
    [themeObjects.HEADING_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-3xl",
        [styleClassNames.FONT_WEIGHT]: "font-semibold",
        [styleClassNames.LETTER_SPACING]: "tracking-tight",
        [styleClassNames.LINE_HEIGHT]: "leading-tight",
    },
    [themeObjects.SUBHEADING]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-2xl",
        [styleClassNames.FONT_WEIGHT]: "font-semibold",
        [styleClassNames.LETTER_SPACING]: "tracking-tight",
        [styleClassNames.LINE_HEIGHT]: "leading-snug",
    },
    [themeObjects.SUBHEADING_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-xl",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.LETTER_SPACING]: "tracking-tight",
        [styleClassNames.LINE_HEIGHT]: "leading-snug",
    },
    [themeObjects.SUBHEADING_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-lg",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.LETTER_SPACING]: "tracking-normal",
        [styleClassNames.LINE_HEIGHT]: "leading-snug",
    },
    [themeObjects.PARAGRAPH]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-base",
        [styleClassNames.LINE_HEIGHT]: "leading-relaxed",
    },
    [themeObjects.PARAGRAPH_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.LINE_HEIGHT]: "leading-relaxed",
    },
    [themeObjects.PARAGRAPH_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-none",
        [styleClassNames.BORDER_COLOR]: "border-none",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-none",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.LINE_HEIGHT]: "leading-relaxed",
    },
    [themeObjects.MENU_ITEM]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.MENU_ITEM_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.MENU_ITEM_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-medium",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-dark",
        [styleClassNames.HOVER_BORDER_COLOR]: "hover-border-none",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.CURSOR]: "cursor-pointer",
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
        [styleClassNames.TRANSITION]: "transition-colors duration-200",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:pointer-events-none",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.TOGGLE_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-medium",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-secondary-medium",
        [styleClassNames.TRANSITION]: "transition-colors duration-200",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.TOGGLE_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.TRANSITION]: "transition-colors duration-200",
        [styleClassNames.CURSOR]: "cursor-pointer",
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
        [styleClassNames.PLACEHOLDER_TEXT_COLOR]:
            "placeholder-text-primary-light",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.FOCUS_BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.SELECT_MENU]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.FORM_LABEL]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
    },
    [themeObjects.TEXTAREA]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.PLACEHOLDER_TEXT_COLOR]:
            "placeholder-text-primary-light",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.SEARCH_INPUT]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.PLACEHOLDER_TEXT_COLOR]:
            "placeholder-text-primary-light",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.CHECKBOX]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.RADIO]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.SWITCH]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.TRANSITION]: "transition-colors duration-200",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    [themeObjects.SLIDER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-dark",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.DISABLED_OPACITY]:
            "disabled:opacity-50 disabled:cursor-not-allowed",
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
    // Tabs (v0.3.0+)
    [themeObjects.TABS]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.SPACING]: "p-4",
    },
    [themeObjects.TABS_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "p-3",
    },
    [themeObjects.TABS_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded",
        [styleClassNames.SPACING]: "p-2",
    },
    [themeObjects.TABS_LIST]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "p-1",
    },
    [themeObjects.TABS_LIST_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "p-1",
    },
    [themeObjects.TABS_LIST_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.SPACING]: "p-1",
    },
    [themeObjects.TABS_TRIGGER]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-sm",
        [styleClassNames.SPACING]: "px-3 py-1.5",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.TABS_TRIGGER_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-sm",
        [styleClassNames.SPACING]: "px-3 py-1.5",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-secondary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-secondary-light",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.TABS_TRIGGER_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-sm",
        [styleClassNames.SPACING]: "px-2 py-1",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-tertiary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-tertiary-light",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.TABS_CONTENT]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SPACING]: "mt-2",
    },
    [themeObjects.TABS_CONTENT_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.SPACING]: "mt-2",
    },
    [themeObjects.TABS_CONTENT_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.SPACING]: "mt-2",
    },
    // Accordion (v0.3.0+)
    [themeObjects.ACCORDION]: {},
    [themeObjects.ACCORDION_2]: {},
    [themeObjects.ACCORDION_3]: {},
    [themeObjects.ACCORDION_ITEM]: {
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
    },
    [themeObjects.ACCORDION_ITEM_2]: {
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.ACCORDION_ITEM_3]: {
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
    },
    [themeObjects.ACCORDION_TRIGGER]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-light",
        [styleClassNames.TRANSITION]: "transition-all duration-200",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.CURSOR]: "cursor-pointer",
        [styleClassNames.FOCUS_RING_COLOR]: "ring-primary-medium",
    },
    [themeObjects.ACCORDION_TRIGGER_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-secondary-light",
        [styleClassNames.TRANSITION]: "transition-all duration-200",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.ACCORDION_TRIGGER_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-tertiary-light",
        [styleClassNames.TRANSITION]: "transition-all duration-200",
        [styleClassNames.FONT_WEIGHT]: "font-normal",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.ACCORDION_CONTENT]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.ACCORDION_CONTENT_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
    },
    [themeObjects.ACCORDION_CONTENT_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
    },
    // Composite Components (v0.4.0+)
    [themeObjects.SIDEBAR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.TRANSITION]: "transition-all duration-200",
    },
    [themeObjects.SIDEBAR_ITEM]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-dark",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.TRANSITION]: "transition-colors duration-150",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    [themeObjects.NAVBAR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.TABBED_NAVBAR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.SETTINGS_MODAL_SIDEBAR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.SETTINGS_MODAL_FOOTER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    // EmptyState (v0.5.0+)
    [themeObjects.EMPTY_STATE]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.SPACING]: "p-8",
    },
    // StatCard (v0.5.0+)
    [themeObjects.STAT_CARD]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.SPACING]: "p-4",
    },
    [themeObjects.STAT_CARD_LABEL]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.FONT_WEIGHT]: "font-semibold",
        [styleClassNames.LETTER_SPACING]: "tracking-wider",
    },
    [themeObjects.STAT_CARD_VALUE]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-light",
        [styleClassNames.TEXT_SIZE]: "text-3xl",
        [styleClassNames.FONT_WEIGHT]: "font-bold",
    },
    [themeObjects.STAT_CARD_CHANGE]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.TEXT_SIZE]: "text-sm",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
    },
    // Skeleton (v0.5.0+)
    [themeObjects.SKELETON]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
    },
    // CommandPalette (v0.5.0+)
    [themeObjects.COMMAND_PALETTE]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.BORDER_RADIUS]: "rounded-xl",
        [styleClassNames.SHADOW]: "shadow-2xl",
    },
    [themeObjects.COMMAND_PALETTE_INPUT]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-light",
        [styleClassNames.TEXT_SIZE]: "text-base",
    },
    [themeObjects.COMMAND_PALETTE_ITEM]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.HOVER_BACKGROUND_COLOR]: "hover-bg-primary-medium",
        [styleClassNames.HOVER_TEXT_COLOR]: "hover-text-primary-light",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.TRANSITION]: "transition-colors duration-100",
        [styleClassNames.CURSOR]: "cursor-pointer",
    },
    // Stepper (v0.5.0+)
    [themeObjects.STEPPER]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.STEPPER_STEP]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
        [styleClassNames.ACTIVE_TEXT_COLOR]: "text-primary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-full",
        [styleClassNames.TRANSITION]: "transition-colors duration-200",
    },
    [themeObjects.STEPPER_CONNECTOR]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-medium",
        [styleClassNames.ACTIVE_BACKGROUND_COLOR]: "bg-primary-dark",
    },
    // DataList (v0.5.0+)
    [themeObjects.DATA_LIST]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
    },
    [themeObjects.DATA_LIST_ITEM]: {
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SPACING]: "py-2.5",
    },
    // Drawer (v0.5.0+)
    [themeObjects.DRAWER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SHADOW]: "shadow-xl",
        [styleClassNames.TRANSITION]: "transition-transform duration-300",
    },
    [themeObjects.DRAWER_HEADER]: {
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SPACING]: "px-4 py-3",
    },
    [themeObjects.DRAWER_FOOTER]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SPACING]: "px-4 py-3",
    },
    // Tooltip (v0.5.0+)
    [themeObjects.TOOLTIP]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-light",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.SHADOW]: "shadow-lg",
        [styleClassNames.SPACING]: "px-2.5 py-1.5",
    },
    [themeObjects.DROPDOWN_PANEL]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-primary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
        [styleClassNames.TEXT_COLOR]: "text-primary-medium",
        [styleClassNames.SHADOW]: "shadow-xl",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
    },
    [themeObjects.DROPDOWN_PANEL_HEADER]: {
        [styleClassNames.TEXT_COLOR]: "text-primary-light",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.FONT_WEIGHT]: "font-semibold",
        [styleClassNames.SPACING]: "px-3 py-1.5",
    },
    [themeObjects.DROPDOWN_PANEL_DIVIDER]: {
        [styleClassNames.BORDER_COLOR]: "border-primary-dark",
    },
    [themeObjects.DROPDOWN_PANEL_2]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-secondary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
        [styleClassNames.TEXT_COLOR]: "text-secondary-medium",
        [styleClassNames.SHADOW]: "shadow-xl",
        [styleClassNames.BORDER_RADIUS]: "rounded-lg",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
    },
    [themeObjects.DROPDOWN_PANEL_HEADER_2]: {
        [styleClassNames.TEXT_COLOR]: "text-secondary-light",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.FONT_WEIGHT]: "font-semibold",
        [styleClassNames.SPACING]: "px-3 py-1.5",
    },
    [themeObjects.DROPDOWN_PANEL_DIVIDER_2]: {
        [styleClassNames.BORDER_COLOR]: "border-secondary-dark",
    },
    [themeObjects.DROPDOWN_PANEL_3]: {
        [styleClassNames.BACKGROUND_COLOR]: "bg-tertiary-very-dark",
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
        [styleClassNames.TEXT_COLOR]: "text-tertiary-medium",
        [styleClassNames.SHADOW]: "shadow-lg",
        [styleClassNames.BORDER_RADIUS]: "rounded-md",
        [styleClassNames.TRANSITION]: "transition-all duration-150",
    },
    [themeObjects.DROPDOWN_PANEL_HEADER_3]: {
        [styleClassNames.TEXT_COLOR]: "text-tertiary-light",
        [styleClassNames.TEXT_SIZE]: "text-xs",
        [styleClassNames.FONT_WEIGHT]: "font-medium",
        [styleClassNames.SPACING]: "px-2.5 py-1",
    },
    [themeObjects.DROPDOWN_PANEL_DIVIDER_3]: {
        [styleClassNames.BORDER_COLOR]: "border-tertiary-dark",
    },
    [themeObjects.SCROLLBAR]: {
        scrollbarThumb: "scrollbar-thumb-gray-700",
        scrollbarTrack: "scrollbar-track-transparent",
    },
    [themeObjects.WIDGET]: {},
    [themeObjects.WORKSPACE]: {},
    [themeObjects.LAYOUT_CONTAINER]: {},
};

/**
 * Size Overrides (v0.2.0+)
 *
 * Size-specific style configurations for components that support the size prop.
 * Maps size variants (xs, sm, md, lg, xl) to specific spacing, text size, and icon size values.
 *
 * Components using size overrides:
 * - BUTTON
 * - BUTTON_ICON
 * - PANEL, PANEL_HEADER, PANEL_FOOTER
 * - And more to come in future phases...
 */
const sizeOverrides = {
    [themeObjects.BUTTON]: {
        xs: {
            [styleClassNames.SPACING]: "px-2 py-1",
            [styleClassNames.TEXT_SIZE]: "text-xs",
        },
        sm: {
            [styleClassNames.SPACING]: "px-3 py-1.5",
            [styleClassNames.TEXT_SIZE]: "text-sm",
        },
        md: {
            [styleClassNames.SPACING]: "px-4 py-2",
            [styleClassNames.TEXT_SIZE]: "text-base",
        },
        lg: {
            [styleClassNames.SPACING]: "px-6 py-3",
            [styleClassNames.TEXT_SIZE]: "text-lg",
        },
        xl: {
            [styleClassNames.SPACING]: "px-8 py-4",
            [styleClassNames.TEXT_SIZE]: "text-xl",
        },
    },
    [themeObjects.BUTTON_ICON]: {
        xs: {
            [styleClassNames.SPACING]: "px-1.5 py-1",
            [styleClassNames.TEXT_SIZE]: "text-xs",
            [styleClassNames.ICON_SIZE]: "h-3 w-3",
        },
        sm: {
            [styleClassNames.SPACING]: "px-2 py-1.5",
            [styleClassNames.TEXT_SIZE]: "text-sm",
            [styleClassNames.ICON_SIZE]: "h-4 w-4",
        },
        md: {
            [styleClassNames.SPACING]: "px-3 py-2",
            [styleClassNames.TEXT_SIZE]: "text-base",
            [styleClassNames.ICON_SIZE]: "h-5 w-5",
        },
        lg: {
            [styleClassNames.SPACING]: "px-4 py-3",
            [styleClassNames.TEXT_SIZE]: "text-lg",
            [styleClassNames.ICON_SIZE]: "h-6 w-6",
        },
        xl: {
            [styleClassNames.SPACING]: "px-5 py-4",
            [styleClassNames.TEXT_SIZE]: "text-xl",
            [styleClassNames.ICON_SIZE]: "h-8 w-8",
        },
    },
    [themeObjects.PANEL]: {
        xs: {
            [styleClassNames.SPACING]: "p-2",
        },
        sm: {
            [styleClassNames.SPACING]: "p-3",
        },
        md: {
            [styleClassNames.SPACING]: "p-4",
        },
        lg: {
            [styleClassNames.SPACING]: "p-6",
        },
        xl: {
            [styleClassNames.SPACING]: "p-8",
        },
    },
    [themeObjects.PANEL_HEADER]: {
        xs: {
            [styleClassNames.SPACING]: "p-2",
        },
        sm: {
            [styleClassNames.SPACING]: "p-3",
        },
        md: {
            [styleClassNames.SPACING]: "p-4",
        },
        lg: {
            [styleClassNames.SPACING]: "p-6",
        },
        xl: {
            [styleClassNames.SPACING]: "p-8",
        },
    },
    [themeObjects.PANEL_FOOTER]: {
        xs: {
            [styleClassNames.SPACING]: "p-2",
        },
        sm: {
            [styleClassNames.SPACING]: "p-3",
        },
        md: {
            [styleClassNames.SPACING]: "p-4",
        },
        lg: {
            [styleClassNames.SPACING]: "p-6",
        },
        xl: {
            [styleClassNames.SPACING]: "p-8",
        },
    },
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
    id = null,
    size = "md" // NEW: Size parameter for design token system (v0.2.0+)
) => {
    try {
        if (itemName !== null) {
            // get the colors from the theme by default
            // this is a MAP like "bg-primary-dark" which needs to
            // fetch its value from the actual theme based on this key mapping
            let defaultStyles =
                itemName in colorMap ? { ...colorMap[itemName] } : null;

            // Apply size-specific overrides if component supports sizing
            // This merges size-aware design tokens (spacing, text size, icon size)
            // with the default color styles from colorMap
            if (
                sizeOverrides[itemName] &&
                sizeOverrides[itemName][size] &&
                defaultStyles !== null
            ) {
                defaultStyles = {
                    ...defaultStyles,
                    ...sizeOverrides[itemName][size],
                };
            }

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
                const themeKey = prioritizeThemeOverrides[k];
                if (theme && themeKey in theme) {
                    prioritizeThemeValues[k] = theme[themeKey];
                } else if (theme) {
                    // Fallback: for prefixed tokens (e.g. placeholder-text-primary-light),
                    // resolve via the base token (text-primary-light)
                    const baseKey = themeKey.replace(
                        /^(placeholder-)/,
                        ""
                    );
                    if (baseKey !== themeKey && baseKey in theme) {
                        prioritizeThemeValues[k] = theme[baseKey];
                    } else {
                        prioritizeThemeValues[k] = themeKey;
                    }
                } else {
                    prioritizeThemeValues[k] = themeKey;
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

            // Resolve scrollbar colors from theme or defaults
            const scrollbarDefaults = colorMap[themeObjects.SCROLLBAR] || {};
            const scrollbarThemeOverrides =
                (theme && theme[themeObjects.SCROLLBAR]) || {};
            const scrollbarThumb =
                scrollbarThemeOverrides.scrollbarThumb ||
                scrollbarDefaults.scrollbarThumb;
            const scrollbarTrack =
                scrollbarThemeOverrides.scrollbarTrack ||
                scrollbarDefaults.scrollbarTrack;

            const scrollbarStyles =
                "scrollable" in prioritizedStyles &&
                prioritizedStyles["scrollable"] === true
                    ? `overflow-y-scroll scrollbar ${scrollbarThumb} scrollbar-thin ${scrollbarTrack} ${grow}`
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

            return stylesObject;
        }
    } catch (e) {
        console.log("getStylesforItem", e.message);
        return {
            string: "",
            backgroundColor: "",
            textColor: "",
            borderColor: "",
            hoverBackgroundColor: "",
            hoverTextColor: "",
            hoverBorderColor: "",
        };
    }
    return {
        string: "",
        backgroundColor: "",
        textColor: "",
        borderColor: "",
        hoverBackgroundColor: "",
        hoverTextColor: "",
        hoverBorderColor: "",
    };
};

const getStyleValueVariant = (className, obj) => {
    try {
        switch (className) {
            case "hoverBorderColor":
            case "hoverBackgroundColor":
            case "hoverTextColor": {
                const val = obj[className].replaceAll("hover:", "");
                return "hover:" + val;
            }
            case "focusRingColor":
            case "focusBorderColor": {
                const val = obj[className].replaceAll("focus-visible:", "");
                return "focus-visible:" + val;
            }
            case "activeBackgroundColor":
            case "activeTextColor": {
                const val = obj[className].replaceAll("active:", "");
                return "active:" + val;
            }
            case "placeholderTextColor": {
                const val = obj[className].replaceAll("placeholder:", "");
                return "placeholder:" + val;
            }
            case "textSize":
            case "fontWeight":
            case "letterSpacing":
            case "lineHeight":
            case "cursor":
            case "disabledOpacity":
                return obj[className];
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

const getDefaultStylesForItem = (itemName) => {
    return itemName in colorMap ? { ...colorMap[itemName] } : {};
};

export {
    colorTypes,
    colorNames,
    shades,
    themeVariants,
    objectTypes,
    getStylesForItem,
    getDefaultStylesForItem,
    getClassForObjectType,
    getStyleName,
    getCSSStyleForClassname,
};
