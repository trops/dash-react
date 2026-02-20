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

const CARD = "card";
const CARD_2 = "card-2";
const CARD_3 = "card-3";

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

const BREADCRUMBS = "breadcrumbs";
const BREADCRUMBS_2 = "breadcrumbs-2";
const BREADCRUMBS_3 = "breadcrumbs-3";

const ALERT = "alert";
const ALERT_2 = "alert-2";
const ALERT_3 = "alert-3";
const ALERT_BANNER = "alert-banner";

const PROGRESS_BAR = "progress-bar";
const PROGRESS_BAR_2 = "progress-bar-2";
const PROGRESS_BAR_3 = "progress-bar-3";

const TOAST = "toast";
const TOAST_2 = "toast-2";
const TOAST_3 = "toast-3";

const TABLE = "table";
const TABLE_2 = "table-2";
const TABLE_3 = "table-3";

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
const TEXTAREA = "textarea";
const CHECKBOX = "checkbox";
const RADIO = "radio";
const SWITCH = "switch";
const SLIDER = "slider";
const SEARCH_INPUT = "search-input";

const DASH_PANEL = "dash-panel";
const DASH_PANEL_2 = "dash-panel-2";
const DASH_PANEL_3 = "dash-panel-3";

const DASH_PANEL_HEADER = "dash-panel-header";
const DASH_PANEL_HEADER_2 = "dash-panel-header-2";
const DASH_PANEL_HEADER_3 = "dash-panel-header-3";

const DASH_PANEL_FOOTER = "dash-panel-footer";
const DASH_PANEL_FOOTER_2 = "dash-panel-footer-2";
const DASH_PANEL_FOOTER_3 = "dash-panel-footer-3";

const WIDGET_CHROME = "widget-chrome";

const TABS = "tabs";
const TABS_2 = "tabs-2";
const TABS_3 = "tabs-3";
const TABS_LIST = "tabs-list";
const TABS_LIST_2 = "tabs-list-2";
const TABS_LIST_3 = "tabs-list-3";
const TABS_TRIGGER = "tabs-trigger";
const TABS_TRIGGER_2 = "tabs-trigger-2";
const TABS_TRIGGER_3 = "tabs-trigger-3";
const TABS_CONTENT = "tabs-content";
const TABS_CONTENT_2 = "tabs-content-2";
const TABS_CONTENT_3 = "tabs-content-3";

const ACCORDION = "accordion";
const ACCORDION_2 = "accordion-2";
const ACCORDION_3 = "accordion-3";
const ACCORDION_ITEM = "accordion-item";
const ACCORDION_ITEM_2 = "accordion-item-2";
const ACCORDION_ITEM_3 = "accordion-item-3";
const ACCORDION_TRIGGER = "accordion-trigger";
const ACCORDION_TRIGGER_2 = "accordion-trigger-2";
const ACCORDION_TRIGGER_3 = "accordion-trigger-3";
const ACCORDION_CONTENT = "accordion-content";
const ACCORDION_CONTENT_2 = "accordion-content-2";
const ACCORDION_CONTENT_3 = "accordion-content-3";

const SETTINGS_MODAL_SIDEBAR = "settings-modal-sidebar";
const SETTINGS_MODAL_FOOTER = "settings-modal-footer";

const SIDEBAR = "sidebar";
const SIDEBAR_ITEM = "sidebar-item";
const NAVBAR = "navbar";
const TABBED_NAVBAR = "tabbed-navbar";

const EMPTY_STATE = "empty-state";
const STAT_CARD = "stat-card";
const STAT_CARD_LABEL = "stat-card-label";
const STAT_CARD_VALUE = "stat-card-value";
const STAT_CARD_CHANGE = "stat-card-change";
const SKELETON = "skeleton";
const COMMAND_PALETTE = "command-palette";
const COMMAND_PALETTE_INPUT = "command-palette-input";
const COMMAND_PALETTE_ITEM = "command-palette-item";
const STEPPER = "stepper";
const STEPPER_STEP = "stepper-step";
const STEPPER_CONNECTOR = "stepper-connector";
const DATA_LIST = "data-list";
const DATA_LIST_ITEM = "data-list-item";
const DRAWER = "drawer";
const DRAWER_HEADER = "drawer-header";
const DRAWER_FOOTER = "drawer-footer";
const TOOLTIP = "tooltip";
const DROPDOWN_PANEL = "dropdown-panel";
const DROPDOWN_PANEL_2 = "dropdown-panel-2";
const DROPDOWN_PANEL_3 = "dropdown-panel-3";
const DROPDOWN_PANEL_HEADER = "dropdown-panel-header";
const DROPDOWN_PANEL_HEADER_2 = "dropdown-panel-header-2";
const DROPDOWN_PANEL_HEADER_3 = "dropdown-panel-header-3";
const DROPDOWN_PANEL_DIVIDER = "dropdown-panel-divider";
const DROPDOWN_PANEL_DIVIDER_2 = "dropdown-panel-divider-2";
const DROPDOWN_PANEL_DIVIDER_3 = "dropdown-panel-divider-3";
const SCROLLBAR = "scrollbar";

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
    CARD,
    CARD_2,
    CARD_3,
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
    BREADCRUMBS,
    BREADCRUMBS_2,
    BREADCRUMBS_3,
    ALERT,
    ALERT_2,
    ALERT_3,
    ALERT_BANNER,
    PROGRESS_BAR,
    PROGRESS_BAR_2,
    PROGRESS_BAR_3,
    TOAST,
    TOAST_2,
    TOAST_3,
    TABLE,
    TABLE_2,
    TABLE_3,
    TOGGLE,
    TOGGLE_2,
    TOGGLE_3,
    DASHBOARD_FOOTER,
    DASHBOARD_FOOTER_2,
    DASHBOARD_FOOTER_3,
    SELECT_MENU,
    FORM_LABEL,
    TEXTAREA,
    CHECKBOX,
    RADIO,
    SWITCH,
    SLIDER,
    SEARCH_INPUT,
    DASH_PANEL,
    DASH_PANEL_2,
    DASH_PANEL_3,
    DASH_PANEL_HEADER,
    DASH_PANEL_HEADER_2,
    DASH_PANEL_HEADER_3,
    DASH_PANEL_FOOTER,
    DASH_PANEL_FOOTER_2,
    DASH_PANEL_FOOTER_3,
    WIDGET_CHROME,
    TABS,
    TABS_2,
    TABS_3,
    TABS_LIST,
    TABS_LIST_2,
    TABS_LIST_3,
    TABS_TRIGGER,
    TABS_TRIGGER_2,
    TABS_TRIGGER_3,
    TABS_CONTENT,
    TABS_CONTENT_2,
    TABS_CONTENT_3,
    ACCORDION,
    ACCORDION_2,
    ACCORDION_3,
    ACCORDION_ITEM,
    ACCORDION_ITEM_2,
    ACCORDION_ITEM_3,
    ACCORDION_TRIGGER,
    ACCORDION_TRIGGER_2,
    ACCORDION_TRIGGER_3,
    ACCORDION_CONTENT,
    ACCORDION_CONTENT_2,
    ACCORDION_CONTENT_3,
    SETTINGS_MODAL_SIDEBAR,
    SETTINGS_MODAL_FOOTER,
    SIDEBAR,
    SIDEBAR_ITEM,
    NAVBAR,
    TABBED_NAVBAR,
    EMPTY_STATE,
    STAT_CARD,
    STAT_CARD_LABEL,
    STAT_CARD_VALUE,
    STAT_CARD_CHANGE,
    SKELETON,
    COMMAND_PALETTE,
    COMMAND_PALETTE_INPUT,
    COMMAND_PALETTE_ITEM,
    STEPPER,
    STEPPER_STEP,
    STEPPER_CONNECTOR,
    DATA_LIST,
    DATA_LIST_ITEM,
    DRAWER,
    DRAWER_HEADER,
    DRAWER_FOOTER,
    TOOLTIP,
    DROPDOWN_PANEL,
    DROPDOWN_PANEL_2,
    DROPDOWN_PANEL_3,
    DROPDOWN_PANEL_HEADER,
    DROPDOWN_PANEL_HEADER_2,
    DROPDOWN_PANEL_HEADER_3,
    DROPDOWN_PANEL_DIVIDER,
    DROPDOWN_PANEL_DIVIDER_2,
    DROPDOWN_PANEL_DIVIDER_3,
    SCROLLBAR,
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

// Design Token Class Names (v0.2.0+)
const SHADOW = "shadow";
const BORDER_RADIUS = "borderRadius";
const SPACING = "spacing";
const TEXT_SIZE = "textSize";
const ICON_SIZE = "iconSize";
const TRANSITION = "transition";

// Interactive State Class Names (v0.3.0+)
const FOCUS_RING_COLOR = "focusRingColor";
const FOCUS_BORDER_COLOR = "focusBorderColor";
const ACTIVE_BACKGROUND_COLOR = "activeBackgroundColor";
const ACTIVE_TEXT_COLOR = "activeTextColor";
const DISABLED_OPACITY = "disabledOpacity";
const FONT_WEIGHT = "fontWeight";
const LETTER_SPACING = "letterSpacing";
const LINE_HEIGHT = "lineHeight";
const CURSOR = "cursor";
const SELECTED_BACKGROUND_COLOR = "selectedBackgroundColor";
const SELECTED_TEXT_COLOR = "selectedTextColor";

const styleClassNames = {
    BACKGROUND_COLOR,
    TEXT_COLOR,
    BORDER_COLOR,
    HOVER_BACKGROUND_COLOR,
    HOVER_BORDER_COLOR,
    HOVER_TEXT_COLOR,
    PADDING,
    // Design Tokens
    SHADOW,
    BORDER_RADIUS,
    SPACING,
    TEXT_SIZE,
    ICON_SIZE,
    TRANSITION,
    // Interactive States (v0.3.0+)
    FOCUS_RING_COLOR,
    FOCUS_BORDER_COLOR,
    ACTIVE_BACKGROUND_COLOR,
    ACTIVE_TEXT_COLOR,
    DISABLED_OPACITY,
    FONT_WEIGHT,
    LETTER_SPACING,
    LINE_HEIGHT,
    CURSOR,
    SELECTED_BACKGROUND_COLOR,
    SELECTED_TEXT_COLOR,
};

export { themeObjects, styleClassNames };
