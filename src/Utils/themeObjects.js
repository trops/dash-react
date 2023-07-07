/**
 * themeObjects.js
 *
 * This file contains all of the components that we have available in the Dashboard
 * All of the components will be available in the theme and can be altered/customized by the user
 *
 */
const BUTTON = "button";
const BUTTON_2 = "button-2";
const BUTTON_3 = "button-3";

const PANEL = "panel";
const PANEL_2 = "panel-2";
const PANEL_3 = "panel-3";

const PANEL_HEADER = "panel-header";
const PANEL_HEADER_2 = "panel-header-2";
const PANEL_HEADER_3 = "panel-header-3";

const PANEL_FOOTER = "panel-footer";
const PANEL_FOOTER_2 = "panel-footer-2";
const PANEL_FOOTER_3 = "panel-footer-3";

const BUTTON_ICON = "button-icon";
const BUTTON_ICON_2 = "button-icon-2";
const BUTTON_ICON_3 = "button-icon-3";

const MENU_ITEM = "menu-item";
const MENU_ITEM_2 = "menu-item-2";
const MENU_ITEM_3 = "menu-item-3";

const HEADING = "heading";
const HEADING_2 = "heading-2";
const HEADING_3 = "heading-3";

const SUBHEADING = "subheading";
const SUBHEADING_2 = "subheading-2";
const SUBHEADING_3 = "subheading-3";

const PARAGRAPH = "paragraph";
const PARAGRAPH_2 = "paragraph-2";
const PARAGRAPH_3 = "paragraph-3";

const TAG = "tag";
const TAG_2 = "tag-2";
const TAG_3 = "tag-3";

const TOGGLE = "toggle";
const TOGGLE_2 = "toggle-2";
const TOGGLE_3 = "toggle-3";

const DASHBOARD_FOOTER = "dashboard-footer";
const DASHBOARD_FOOTER_2 = "dashboard-footer-2";
const DASHBOARD_FOOTER_3 = "dashboard-footer-3";

const CODE_EDITOR = "code-editor";

const INPUT_TEXT = "input-text";
const SELECT_MENU = "select-menu";
const FORM_LABEL = "form-label";

const DASH_PANEL = "dash-panel";
const DASH_PANEL_2 = "dash-panel-2";
const DASH_PANEL_3 = "dash-panel-3";

const DASH_PANEL_HEADER = "dash-panel-header";
const DASH_PANEL_HEADER_2 = "dash-panel-header-2";
const DASH_PANEL_HEADER_3 = "dash-panel-header-3";

const DASH_PANEL_FOOTER = "dash-panel-footer";
const DASH_PANEL_FOOTER_2 = "dash-panel-footer-2";
const DASH_PANEL_FOOTER_3 = "dash-panel-footer-3";

const WIDGET = "widget";
const WORKSPACE = "workspace";
const LAYOUT_CONTAINER = "layout-container";

const themeObjects = {
    BUTTON,
    BUTTON_2,
    BUTTON_3,
    BUTTON_ICON,
    BUTTON_ICON_2,
    BUTTON_ICON_3,
    CODE_EDITOR,
    INPUT_TEXT,
    PANEL,
    PANEL_2,
    PANEL_3,
    PANEL_HEADER,
    PANEL_HEADER_2,
    PANEL_HEADER_3,
    PANEL_FOOTER,
    PANEL_FOOTER_2,
    PANEL_FOOTER_3,
    HEADING,
    HEADING_2,
    HEADING_3,
    SUBHEADING,
    SUBHEADING_2,
    SUBHEADING_3,
    MENU_ITEM,
    MENU_ITEM_2,
    MENU_ITEM_3,
    PARAGRAPH,
    PARAGRAPH_2,
    PARAGRAPH_3,
    TAG,
    TAG_2,
    TAG_3,
    TOGGLE,
    TOGGLE_2,
    TOGGLE_3,
    DASHBOARD_FOOTER,
    DASHBOARD_FOOTER_2,
    DASHBOARD_FOOTER_3,
    SELECT_MENU,
    FORM_LABEL,
    DASH_PANEL,
    DASH_PANEL_2,
    DASH_PANEL_3,
    DASH_PANEL_HEADER,
    DASH_PANEL_HEADER_2,
    DASH_PANEL_HEADER_3,
    DASH_PANEL_FOOTER,
    DASH_PANEL_FOOTER_2,
    DASH_PANEL_FOOTER_3,
    WIDGET,
    WORKSPACE,
    LAYOUT_CONTAINER,
};

const BACKGROUND_COLOR = "backgroundColor";
const BORDER_COLOR = "borderColor";
const TEXT_COLOR = "textColor";
const HOVER_BACKGROUND_COLOR = "hoverBackgroundColor";
const HOVER_TEXT_COLOR = "hoverTextColor";
const HOVER_BORDER_COLOR = "hoverBorderColor";
const PADDING = "padding";

const styleClassNames = {
    BACKGROUND_COLOR,
    TEXT_COLOR,
    BORDER_COLOR,
    HOVER_BACKGROUND_COLOR,
    HOVER_BORDER_COLOR,
    HOVER_TEXT_COLOR,
    PADDING,
};

export { themeObjects, styleClassNames };
