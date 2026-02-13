import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faCheck, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot, faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faPalette, faComputer, faSun, faMoon, faFolderPlus, faBoltLightning, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
export { faArrowDown, faArrowLeft, faArrowRight, faArrowRightFromBracket, faArrowRightToBracket, faArrowUp, faArrowsLeftRight, faArrowsUpDown, faBaby, faBabyCarriage, faBullhorn, faCheck, faClone, faCode, faCog, faComputer, faDatabase, faEarListen, faEye, faFolder, faHammer, faHome, faLeaf, faMagnifyingGlass, faMinus, faPalette, faPencil, faPhone, faPlug, faPlus, faPuzzlePiece, faRobot, faSeedling, faSignal, faSquare, faSquareCheck, faTrash, faTrophy, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useContext, useMemo, useEffect, useState, Fragment } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Editor from '@monaco-editor/react';
import Mustache from 'mustache';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSearchBox, useRefinementList } from 'react-instantsearch-hooks-web';
import { useDrag, useDrop } from 'react-dnd';

var ThemeContext = /*#__PURE__*/createContext({
  // key: Date.now(),
  currentTheme: null
  // currentThemeKey: null,
  // theme: null,
  // themeKey: null,
  // themeVariant: "dark",
  // changeCurrentTheme: null,
  // changeThemeVariant: null,
  // changeThemesForApplication: null,
  // loadThemes: null,
  // themes: null,
  // rawThemes: null,
});

var WidgetContext = /*#__PURE__*/createContext({
  widgetData: null
});

/**
 * themeObjects.js
 *
 * This file contains all of the components that we have available in the Dashboard
 * All of the components will be available in the theme and can be altered/customized by the user
 *
 */
var BUTTON = "button";
var BUTTON_2 = "button-2";
var BUTTON_3 = "button-3";
var CARD = "card";
var CARD_2 = "card-2";
var CARD_3 = "card-3";
var PANEL = "panel";
var PANEL_2 = "panel-2";
var PANEL_3 = "panel-3";
var PANEL_HEADER = "panel-header";
var PANEL_HEADER_2 = "panel-header-2";
var PANEL_HEADER_3 = "panel-header-3";
var PANEL_FOOTER = "panel-footer";
var PANEL_FOOTER_2 = "panel-footer-2";
var PANEL_FOOTER_3 = "panel-footer-3";
var BUTTON_ICON = "button-icon";
var BUTTON_ICON_2 = "button-icon-2";
var BUTTON_ICON_3 = "button-icon-3";
var MENU_ITEM = "menu-item";
var MENU_ITEM_2 = "menu-item-2";
var MENU_ITEM_3 = "menu-item-3";
var HEADING = "heading";
var HEADING_2 = "heading-2";
var HEADING_3 = "heading-3";
var SUBHEADING = "subheading";
var SUBHEADING_2 = "subheading-2";
var SUBHEADING_3 = "subheading-3";
var PARAGRAPH = "paragraph";
var PARAGRAPH_2 = "paragraph-2";
var PARAGRAPH_3 = "paragraph-3";
var TAG = "tag";
var TAG_2 = "tag-2";
var TAG_3 = "tag-3";
var BREADCRUMBS = "breadcrumbs";
var BREADCRUMBS_2 = "breadcrumbs-2";
var BREADCRUMBS_3 = "breadcrumbs-3";
var ALERT = "alert";
var ALERT_2 = "alert-2";
var ALERT_3 = "alert-3";
var ALERT_BANNER = "alert-banner";
var PROGRESS_BAR = "progress-bar";
var PROGRESS_BAR_2 = "progress-bar-2";
var PROGRESS_BAR_3 = "progress-bar-3";
var TOAST = "toast";
var TOAST_2 = "toast-2";
var TOAST_3 = "toast-3";
var TABLE = "table";
var TABLE_2 = "table-2";
var TABLE_3 = "table-3";
var TOGGLE = "toggle";
var TOGGLE_2 = "toggle-2";
var TOGGLE_3 = "toggle-3";
var DASHBOARD_FOOTER = "dashboard-footer";
var DASHBOARD_FOOTER_2 = "dashboard-footer-2";
var DASHBOARD_FOOTER_3 = "dashboard-footer-3";
var CODE_EDITOR = "code-editor";
var INPUT_TEXT = "input-text";
var SELECT_MENU = "select-menu";
var FORM_LABEL = "form-label";
var TEXTAREA = "textarea";
var CHECKBOX = "checkbox";
var RADIO = "radio";
var SWITCH = "switch";
var SLIDER = "slider";
var SEARCH_INPUT = "search-input";
var DASH_PANEL = "dash-panel";
var DASH_PANEL_2 = "dash-panel-2";
var DASH_PANEL_3 = "dash-panel-3";
var DASH_PANEL_HEADER = "dash-panel-header";
var DASH_PANEL_HEADER_2 = "dash-panel-header-2";
var DASH_PANEL_HEADER_3 = "dash-panel-header-3";
var DASH_PANEL_FOOTER = "dash-panel-footer";
var DASH_PANEL_FOOTER_2 = "dash-panel-footer-2";
var DASH_PANEL_FOOTER_3 = "dash-panel-footer-3";
var WIDGET_CHROME = "widget-chrome";
var WIDGET = "widget";
var WORKSPACE = "workspace";
var LAYOUT_CONTAINER = "layout-container";
var themeObjects = {
  BUTTON: BUTTON,
  BUTTON_2: BUTTON_2,
  BUTTON_3: BUTTON_3,
  BUTTON_ICON: BUTTON_ICON,
  BUTTON_ICON_2: BUTTON_ICON_2,
  BUTTON_ICON_3: BUTTON_ICON_3,
  CARD: CARD,
  CARD_2: CARD_2,
  CARD_3: CARD_3,
  CODE_EDITOR: CODE_EDITOR,
  INPUT_TEXT: INPUT_TEXT,
  PANEL: PANEL,
  PANEL_2: PANEL_2,
  PANEL_3: PANEL_3,
  PANEL_HEADER: PANEL_HEADER,
  PANEL_HEADER_2: PANEL_HEADER_2,
  PANEL_HEADER_3: PANEL_HEADER_3,
  PANEL_FOOTER: PANEL_FOOTER,
  PANEL_FOOTER_2: PANEL_FOOTER_2,
  PANEL_FOOTER_3: PANEL_FOOTER_3,
  HEADING: HEADING,
  HEADING_2: HEADING_2,
  HEADING_3: HEADING_3,
  SUBHEADING: SUBHEADING,
  SUBHEADING_2: SUBHEADING_2,
  SUBHEADING_3: SUBHEADING_3,
  MENU_ITEM: MENU_ITEM,
  MENU_ITEM_2: MENU_ITEM_2,
  MENU_ITEM_3: MENU_ITEM_3,
  PARAGRAPH: PARAGRAPH,
  PARAGRAPH_2: PARAGRAPH_2,
  PARAGRAPH_3: PARAGRAPH_3,
  TAG: TAG,
  TAG_2: TAG_2,
  TAG_3: TAG_3,
  BREADCRUMBS: BREADCRUMBS,
  BREADCRUMBS_2: BREADCRUMBS_2,
  BREADCRUMBS_3: BREADCRUMBS_3,
  ALERT: ALERT,
  ALERT_2: ALERT_2,
  ALERT_3: ALERT_3,
  ALERT_BANNER: ALERT_BANNER,
  PROGRESS_BAR: PROGRESS_BAR,
  PROGRESS_BAR_2: PROGRESS_BAR_2,
  PROGRESS_BAR_3: PROGRESS_BAR_3,
  TOAST: TOAST,
  TOAST_2: TOAST_2,
  TOAST_3: TOAST_3,
  TABLE: TABLE,
  TABLE_2: TABLE_2,
  TABLE_3: TABLE_3,
  TOGGLE: TOGGLE,
  TOGGLE_2: TOGGLE_2,
  TOGGLE_3: TOGGLE_3,
  DASHBOARD_FOOTER: DASHBOARD_FOOTER,
  DASHBOARD_FOOTER_2: DASHBOARD_FOOTER_2,
  DASHBOARD_FOOTER_3: DASHBOARD_FOOTER_3,
  SELECT_MENU: SELECT_MENU,
  FORM_LABEL: FORM_LABEL,
  TEXTAREA: TEXTAREA,
  CHECKBOX: CHECKBOX,
  RADIO: RADIO,
  SWITCH: SWITCH,
  SLIDER: SLIDER,
  SEARCH_INPUT: SEARCH_INPUT,
  DASH_PANEL: DASH_PANEL,
  DASH_PANEL_2: DASH_PANEL_2,
  DASH_PANEL_3: DASH_PANEL_3,
  DASH_PANEL_HEADER: DASH_PANEL_HEADER,
  DASH_PANEL_HEADER_2: DASH_PANEL_HEADER_2,
  DASH_PANEL_HEADER_3: DASH_PANEL_HEADER_3,
  DASH_PANEL_FOOTER: DASH_PANEL_FOOTER,
  DASH_PANEL_FOOTER_2: DASH_PANEL_FOOTER_2,
  DASH_PANEL_FOOTER_3: DASH_PANEL_FOOTER_3,
  WIDGET_CHROME: WIDGET_CHROME,
  WIDGET: WIDGET,
  WORKSPACE: WORKSPACE,
  LAYOUT_CONTAINER: LAYOUT_CONTAINER
};
var BACKGROUND_COLOR = "backgroundColor";
var BORDER_COLOR = "borderColor";
var TEXT_COLOR = "textColor";
var HOVER_BACKGROUND_COLOR = "hoverBackgroundColor";
var HOVER_TEXT_COLOR = "hoverTextColor";
var HOVER_BORDER_COLOR = "hoverBorderColor";
var PADDING = "padding";
var styleClassNames = {
  BACKGROUND_COLOR: BACKGROUND_COLOR,
  TEXT_COLOR: TEXT_COLOR,
  BORDER_COLOR: BORDER_COLOR,
  HOVER_BACKGROUND_COLOR: HOVER_BACKGROUND_COLOR,
  HOVER_BORDER_COLOR: HOVER_BORDER_COLOR,
  HOVER_TEXT_COLOR: HOVER_TEXT_COLOR,
  PADDING: PADDING
};

var _themeObjects$CARD_, _colorMap;
function _typeof$B(o) { "@babel/helpers - typeof"; return _typeof$B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$B(o); }
function _toConsumableArray$2(r) { return _arrayWithoutHoles$2(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$4(r) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$4(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$4(r, a) : void 0; } }
function _iterableToArray$2(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles$2(r) { if (Array.isArray(r)) return _arrayLikeToArray$4(r); }
function _arrayLikeToArray$4(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys$u(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$u(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$u(Object(t), !0).forEach(function (r) { _defineProperty$v(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$u(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$v(e, r, t) { return (r = _toPropertyKey$z(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$z(t) { var i = _toPrimitive$z(t, "string"); return "symbol" == _typeof$B(i) ? i : i + ""; }
function _toPrimitive$z(t, r) { if ("object" != _typeof$B(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$B(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var objectTypes = ["bg", "text", "hover-bg", "hover-text", "border", "hover-border"
// "p",
// "m",
// "textSize",
];
var objectTypeClasses = {
  bg: {
    "class": "backgroundColor"
  },
  border: {
    "class": "borderColor"
  },
  text: {
    "class": "textColor"
  },
  "hover-text": {
    "class": "hoverTextColor"
  },
  "hover-bg": {
    "class": "hoverBackgroundColor"
  },
  "hover-border": {
    "class": "hoverBorderColor"
  }
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
var themeVariants = ["very-light", "light", "medium", "dark", "very-dark"];
var colorTypes = ["primary", "secondary", "tertiary", "neutral"];
var colorNames = ["zinc", "neutral", "stone", "red", "gray", "blue", "slate", "indigo", "yellow", "orange", "amber", "lime", "emerald", "green", "teal", "cyan", "sky", "violet", "purple", "fuchsia", "pink", "rose"];
var shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
var colorMap = (_colorMap = {}, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.BUTTON, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-dark"), styleClassNames.PADDING, "padding-primary")), themeObjects.BUTTON_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), styleClassNames.BORDER_COLOR, "border-secondary-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark")), themeObjects.BUTTON_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), styleClassNames.BORDER_COLOR, "border-tertiary-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-dark")), themeObjects.CARD, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-light"), styleClassNames.BORDER_COLOR, "border-primary-light"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-light"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-primary-medium")), themeObjects.CARD_2, (_themeObjects$CARD_ = {}, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_themeObjects$CARD_, themeObjects.BREADCRUMBS, _defineProperty$v({}, styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.BREADCRUMBS_2, _defineProperty$v({}, styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.BREADCRUMBS_3, _defineProperty$v({}, styleClassNames.TEXT_COLOR, "text-tertiary-medium")), themeObjects.ALERT, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-light"), styleClassNames.BORDER_COLOR, "border-primary-light"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.ALERT_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-light"), styleClassNames.BORDER_COLOR, "border-secondary-light"), styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.ALERT_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-light"), styleClassNames.BORDER_COLOR, "border-tertiary-light"), styleClassNames.TEXT_COLOR, "text-tertiary-medium")), themeObjects.ALERT_BANNER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-blue-50"), styleClassNames.BORDER_COLOR, "border-blue-500"), styleClassNames.TEXT_COLOR, "text-blue-900")), themeObjects.PROGRESS_BAR, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.PROGRESS_BAR_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-dark"), styleClassNames.BORDER_COLOR, "border-secondary-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.PROGRESS_BAR_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_themeObjects$CARD_, themeObjects.TOAST, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-light"), styleClassNames.BORDER_COLOR, "border-primary-light"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.TOAST_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-light"), styleClassNames.BORDER_COLOR, "border-secondary-light"), styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.TOAST_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-light"), styleClassNames.BORDER_COLOR, "border-tertiary-light"), styleClassNames.TEXT_COLOR, "text-tertiary-medium")), themeObjects.WIDGET_CHROME, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-dark"), styleClassNames.BORDER_COLOR, "border-primary-very-dark"), styleClassNames.TEXT_COLOR, "text-primary-light")), styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-light"), styleClassNames.BORDER_COLOR, "border-secondary-light"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-light"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-secondary-medium"))), themeObjects.CARD_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-light"), styleClassNames.BORDER_COLOR, "border-tertiary-light"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-light"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-tertiary-medium")), themeObjects.PANEL, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-very-dark")), themeObjects.PANEL_HEADER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-very-dark")), themeObjects.PANEL_FOOTER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-very-dark")), themeObjects.PANEL_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-dark"), styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.PANEL_HEADER_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark")), themeObjects.PANEL_FOOTER_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark")), themeObjects.PANEL_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-very-dark")), themeObjects.PANEL_HEADER_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-very-dark")), themeObjects.PANEL_FOOTER_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-very-dark")), themeObjects.BUTTON_ICON, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-dark")), themeObjects.BUTTON_ICON_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), styleClassNames.BORDER_COLOR, "border-secondary-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark")), themeObjects.BUTTON_ICON_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), styleClassNames.BORDER_COLOR, "border-tertiary-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-dark")), themeObjects.HEADING, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.HEADING_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.HEADING_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.SUBHEADING, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.SUBHEADING_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.SUBHEADING_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.PARAGRAPH, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.PARAGRAPH_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.PARAGRAPH_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-none"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.MENU_ITEM, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.MENU_ITEM_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), styleClassNames.BORDER_COLOR, "border-secondary-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.MENU_ITEM_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), styleClassNames.BORDER_COLOR, "border-tertiary-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.TAG, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.TAG_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.TAG_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), styleClassNames.BORDER_COLOR, "border-none"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), styleClassNames.HOVER_BORDER_COLOR, "hover-border-none")), themeObjects.TABLE, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-dark"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-light")), themeObjects.TABLE_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-dark"), styleClassNames.BORDER_COLOR, "border-secondary-medium"), styleClassNames.TEXT_COLOR, "text-secondary-light")), themeObjects.TABLE_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-medium"), styleClassNames.TEXT_COLOR, "text-tertiary-light")), themeObjects.TOGGLE, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium")), themeObjects.DASHBOARD_FOOTER, _defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), styleClassNames.BORDER_COLOR, "border-primary-dark")), themeObjects.DASHBOARD_FOOTER_2, _defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-dark"), styleClassNames.BORDER_COLOR, "border-secondary-dark")), themeObjects.DASHBOARD_FOOTER_3, _defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-dark")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.CODE_EDITOR, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-dark"), styleClassNames.BORDER_COLOR, "border-primary-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.INPUT_TEXT, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.SELECT_MENU, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.FORM_LABEL, _defineProperty$v({}, styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.TEXTAREA, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.SEARCH_INPUT, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.CHECKBOX, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.RADIO, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.SWITCH, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), themeObjects.SLIDER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), styleClassNames.BORDER_COLOR, "border-primary-medium"), styleClassNames.TEXT_COLOR, "text-primary-dark")), _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v(_colorMap, themeObjects.DASH_PANEL, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-dark"), styleClassNames.BORDER_COLOR, "border-primary-very-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-primary-very-dark")), themeObjects.DASH_PANEL_HEADER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), styleClassNames.BORDER_COLOR, "border-primary-very-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.DASH_PANEL_FOOTER, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), styleClassNames.BORDER_COLOR, "border-primary-very-dark"), styleClassNames.TEXT_COLOR, "text-primary-medium")), themeObjects.DASH_PANEL_2, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-dark"), styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-secondary-very-dark")), themeObjects.DASH_PANEL_HEADER_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-dark"), styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.DASH_PANEL_FOOTER_2, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-dark"), styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), styleClassNames.TEXT_COLOR, "text-secondary-medium")), themeObjects.DASH_PANEL_3, _defineProperty$v(_defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium"), styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-very-dark")), themeObjects.DASH_PANEL_HEADER_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium")), themeObjects.DASH_PANEL_FOOTER_3, _defineProperty$v(_defineProperty$v(_defineProperty$v({}, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-dark"), styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), styleClassNames.TEXT_COLOR, "text-tertiary-medium")), themeObjects.WIDGET, {}), _defineProperty$v(_defineProperty$v(_colorMap, themeObjects.WORKSPACE, {}), themeObjects.LAYOUT_CONTAINER, {}));
var getCSSStyleForClassname = function getCSSStyleForClassname(className, itemName) {
  return colorMap[itemName][className];
};

/**
 * Remove the classes from the low priority object
 * @param {Object} high The array that is
 * @param {Object} low
 */
var prioritizeClasses = function prioritizeClasses(high, low) {
  try {
    Object.keys(high).forEach(function (k) {
      if (high[k]) {
        if (k in low) {
          delete low[k];
        }
      }
    });
    return _objectSpread$u(_objectSpread$u({}, high), low);
  } catch (e) {
    return null;
  }
};

/**
 * Generate the styles for the element based on the theme, themeOverrides and manual overrides
 * Reduce overlap/override of styles for example overflow-scroll-y, and overflow-clip, etc etc
 * Need to mrege what is default and what is an override
 *
 * @param {string} itemName the name of the component (button, panel, etc)
 * @returns {Object} the object containing the style information
 */
var getStylesForItem = function getStylesForItem() {
  var itemName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  try {
    if (itemName !== null) {
      // get the colors from the theme by default
      // this is a MAP like "bg-primary-dark" which needs to
      // fetch its value from the actual theme based on this key mapping
      var defaultStyles = itemName in colorMap ? colorMap[itemName] : null;

      // then we have to determine if this item has any theme overrides
      // this uses the THEME LANGUAGE to override
      var themeOverrides = theme !== null && itemName in theme ? theme[itemName] : {};

      // then we have to determine if the component has any MANUAL overrides
      // this uses CSS CLASSES to override, no need to translate
      var manualOverrides = Object.keys(overrides).length > 0 ? overrides : {};

      // Prioritizing ClassNames here
      var prioritizeThemeOverrides = prioritizeClasses(themeOverrides, defaultStyles);

      // now we have to get the TRUE value from the class from the theme...
      var prioritizeThemeValues = {};
      Object.keys(prioritizeThemeOverrides).forEach(function (k) {
        var themeKey = prioritizeThemeOverrides[k];
        if (theme && themeKey in theme) {
          prioritizeThemeValues[k] = theme[themeKey];
        } else {
          prioritizeThemeValues[k] = themeKey;
        }
      });

      // now we can prioritize the manual overrides if there are any
      var prioritizedStyles = prioritizeClasses(manualOverrides, prioritizeThemeValues);

      // and this is the styles we shall return
      var styles = {};
      // grab the theme values out of the theme (color, etc)
      Object.keys(prioritizedStyles).forEach(function (key) {
        styles[key] = getStyleValueVariant(key, prioritizedStyles);
      });

      // console.log("value check final styles ", styles);
      // scrollbars?

      var grow = "grow" in prioritizedStyles && prioritizedStyles["grow"] === false ? "flex-shrink" : "flex-grow";
      var scrollbarStyles = "scrollable" in prioritizedStyles && prioritizedStyles["scrollable"] === true ? "overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-800 ".concat(grow) : " ".concat(grow, " mr-0");
      var hasChildren = "hasChildren" in prioritizedStyles ? prioritizedStyles["hasChildren"] : false;
      var childCount = "childCount" in prioritizedStyles ? prioritizedStyles["childCount"] : null;
      var directionValue = "direction" in prioritizedStyles ? prioritizedStyles["direction"] : null;
      var widthValue = "width" in prioritizedStyles ? prioritizedStyles["width"] : null;
      var heightValue = "height" in prioritizedStyles ? prioritizedStyles["height"] : null;
      var paddingValue = "padding" in prioritizedStyles ? prioritizedStyles["padding"] : null;
      var directionStyles = directionValue !== null ? directionValue === "col" ? "flex-col" : "flex-row" : "";
      var paddingStyles = (itemName === themeObjects.LAYOUT_CONTAINER || itemName === themeObjects.WORKSPACE) && hasChildren === true && childCount > 1 && directionValue !== null ? "space" in prioritizedStyles && prioritizedStyles["space"] !== false ? directionValue === "col" ? "space-y-4" : "space-x-4" : null : null; // not layout container

      var additionalStyles = scrollbarStyles.concat(" ").concat(directionStyles);
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

      var finalStyles = {};
      Object.keys(styles).forEach(function (k) {
        if (k in finalStyles === false) {
          finalStyles[k] = styles[k].replaceAll("overflow-hidden", "overflow-clip");
        }
      });
      var styleSet = _toConsumableArray$2(new Set(additionalStyles.split(" ").filter(function (v) {
        return v !== " " && v !== false && v !== true;
      }))).join(" ");

      // console.log("FINAL KEYS ", Object.keys(finalStyles), Object.keys(styles), t.join(" "));

      var finalString = Object.keys(finalStyles).length > 0 ? Object.keys(finalStyles).map(function (key) {
        return finalStyles[key];
      }).join(" ").concat(" ", styleSet) : styleSet;
      var removeValues = [true, false, "col", "row", " ", "false", "true", 1, "1"];
      var stylesObject = _objectSpread$u({
        string: _toConsumableArray$2(new Set(finalString.split(" ").filter(function (v) {
          return removeValues.includes(v) === false && v !== " ";
        }).map(function (v) {
          return v.replaceAll("overflow-hidden", "overflow-clip");
        }))).map(function (v) {
          return v.trim().replaceAll("overflow-hidden", "overflow-clip");
        }).join(" ")
      }, finalStyles);
      return stylesObject;
    }
  } catch (e) {
    return {
      string: "",
      backgroundColor: "",
      textColor: "",
      borderColor: "",
      hoverBackgroundColor: "",
      hoverTextColor: "",
      hoverBorderColor: ""
    };
  }
  return {
    string: "",
    backgroundColor: "",
    textColor: "",
    borderColor: "",
    hoverBackgroundColor: "",
    hoverTextColor: "",
    hoverBorderColor: ""
  };
};
var getStyleValueVariant = function getStyleValueVariant(className, obj) {
  try {
    switch (className) {
      case "hoverBorderColor":
      case "hoverBackgroundColor":
        var val = obj[className].replaceAll("hover:", "");
        return "hover:" + val;
      default:
        return obj[className].replaceAll("overflow-hidden", "overflow-clip");
    }
  } catch (e) {
    return "";
  }
};
var getClassForObjectType = function getClassForObjectType(objectType) {
  return objectTypeClasses[objectType]["class"];
};
function getStyleName(objectType) {
  var s = null;
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

function _typeof$A(o) { "@babel/helpers - typeof"; return _typeof$A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$A(o); }
/**
 * deepCopy
 * @param {object} obj the object to deep copy
 * @returns object
 */
var deepCopy = function deepCopy(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return null;
  }
};
var isObject = function isObject(objValue) {
  return objValue && _typeof$A(objValue) === "object" && objValue.constructor === Object;
};

/**
 * Capitalize the first letter of a string
 * @param {String} string the string to process
 * @returns {String} the resulting string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Generate a Unique identifier for the element component
 * @param {String} uuid the unique identifier for the component (hopefully)
 * @param {*} prefix a prefix to be added as part of the UUID
 * @returns {String} the resulting UUID for the element
 */
function getUUID$1(uuid) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "d";
  try {
    var r = Math.floor(Math.random() * 10000);
    return uuid === undefined || uuid === "" ? "".concat(prefix, "-").concat(r) : uuid;
  } catch (e) {
    return uuid;
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Utils/css.js
 *
 * Utility functions for handling CSS generation
 */

/**
 * tailwindHeightFractions
 * Generate the height variants in fractions for tailwind
 * @returns
 */
var tailwindHeightFractions = function tailwindHeightFractions() {
  var numerators = [1, 2, 3, 4, 5, 6];
  var denominators = [2, 3, 4, 5, 6];
  var fractions = [];
  denominators.forEach(function (denominator) {
    numerators.forEach(function (numerator) {
      if (numerator < denominator) {
        fractions.push({
          fraction: "".concat(numerator, "/").concat(denominator),
          name: "height-".concat(numerator, "-").concat(denominator),
          value: "h-".concat(numerator, "/").concat(denominator)
        });
      }
    });
  });
  return fractions;
};

var _excluded$u = ["id", "children", "direction", "className", "scrollable", "width", "height", "space", "grow", "debug", "onClick", "padding", "prefix"];
function _objectWithoutProperties$u(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$u(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$u(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var LayoutContainer = function LayoutContainer(_ref) {
  var id = _ref.id,
    children = _ref.children,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "row" : _ref$direction,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? false : _ref$scrollable,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "" : _ref$height,
    _ref$space = _ref.space,
    space = _ref$space === void 0 ? true : _ref$space,
    _ref$grow = _ref.grow,
    grow = _ref$grow === void 0 ? false : _ref$grow,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? undefined : _ref$onClick,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "" : _ref$padding,
    _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? "layout-container" : _ref$prefix,
    props = _objectWithoutProperties$u(_ref, _excluded$u);
  var containerId = "uuid" in props ? props["uuid"] : getUUID$1(id, prefix);

  // get the styles
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.LAYOUT_CONTAINER, currentTheme, {
    scrollable: scrollable,
    width: width,
    height: height,
    grow: grow,
    hasChildren: children !== undefined,
    childCount: React.Children.count(children),
    direction: direction,
    space: space,
    padding: padding
  }, containerId);

  //console.log("layout container styles ", styles);

  function renderDebugger(children, styleString) {
    return debug === true && /*#__PURE__*/jsxs("div", {
      className: "flex flex-col bg-inherit space-y-1 flex-shrink",
      children: [/*#__PURE__*/jsxs("span", {
        className: "flex flex-row flex-shrink text-xs bg-gray-900 uppercase text-gray-200 rounded",
        children: [containerId, " ", styleString]
      }), children]
    });
  }

  // const classString = className !== "" ? className : styles.string;
  var classString = styles.string;
  return /*#__PURE__*/jsxs("div", {
    // id={`LayoutContainer-${containerId}-${id}`}
    id: containerId,
    className: "flex ".concat(classString, " ").concat(className),
    onClick: onClick,
    children: [debug === false && children, debug === true && renderDebugger(children, styles.string)]
  });
};

function _typeof$z(o) { "@babel/helpers - typeof"; return _typeof$z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$z(o); }
var _excluded$t = ["children", "border", "className", "padding", "defaultPadding", "direction"],
  _excluded2$8 = ["children", "scrollable", "className", "onClick", "defaultPadding", "padding"],
  _excluded3$8 = ["children", "className", "defaultPadding", "padding"],
  _excluded4$1 = ["horizontal", "children", "onClick", "width", "height", "padding", "scrollable", "grow", "className", "direction", "defaultPadding", "border"],
  _excluded5$1 = ["children", "border", "className", "padding", "defaultPadding", "direction"],
  _excluded6$1 = ["children", "scrollable", "className", "onClick", "defaultPadding", "padding", "height", "width"],
  _excluded7$1 = ["children", "className", "defaultPadding", "padding"],
  _excluded8$1 = ["horizontal", "children", "onClick", "width", "height", "padding", "scrollable", "className", "direction", "grow", "defaultPadding", "border"],
  _excluded9$1 = ["children", "border", "className", "padding", "defaultPadding", "direction"],
  _excluded0$1 = ["children", "scrollable", "className", "space", "onClick", "defaultPadding", "padding", "height", "width"],
  _excluded1$1 = ["children", "className", "padding", "defaultPadding"],
  _excluded10$1 = ["horizontal", "children", "onClick", "width", "height", "padding", "scrollable", "className", "grow", "defaultPadding", "border"];
function ownKeys$t(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$t(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$t(Object(t), !0).forEach(function (r) { _defineProperty$u(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$t(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$u(e, r, t) { return (r = _toPropertyKey$y(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$y(t) { var i = _toPrimitive$y(t, "string"); return "symbol" == _typeof$z(i) ? i : i + ""; }
function _toPrimitive$y(t, r) { if ("object" != _typeof$z(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$z(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$t(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$t(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$t(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PanelHeader = function PanelHeader(_ref) {
  var children = _ref.children,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? false : _ref$border,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? true : _ref$padding,
    _ref$defaultPadding = _ref.defaultPadding,
    defaultPadding = _ref$defaultPadding === void 0 ? "p-6" : _ref$defaultPadding,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "horizontal" : _ref$direction,
    props = _objectWithoutProperties$t(_ref, _excluded$t);
  var _useContext = useContext(WidgetContext);
    _useContext.widgetData;
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_HEADER, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    grow: false
  }));
  // since we do not have a layout container we can create an id like so
  var id = getUUID$1("", "panel-header");
  return /*#__PURE__*/jsx("div", {
    id: id,
    className: "flex ".concat(direction === "horizontal" ? "flex-row" : "flex-col", " rounded-t ").concat(border === true ? "border-b" : "", " justify-between items-center ").concat(padding === true ? defaultPadding : "p-0", " ").concat(className, " ").concat(styles.string),
    children: children
  });
};

// PanelBody should not be scrollable, because the parent Panel container IS scrollable.

var PanelBody = function PanelBody(_ref2) {
  var children = _ref2.children,
    _ref2$scrollable = _ref2.scrollable,
    scrollable = _ref2$scrollable === void 0 ? false : _ref2$scrollable,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? undefined : _ref2$onClick,
    _ref2$defaultPadding = _ref2.defaultPadding,
    defaultPadding = _ref2$defaultPadding === void 0 ? "p-6" : _ref2$defaultPadding,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? true : _ref2$padding,
    props = _objectWithoutProperties$t(_ref2, _excluded2$8);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    scrollable: false
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$t(_objectSpread$t({}, props), {}, {
    prefix: "panel-body",
    className: "".concat(className, " ").concat(styles.string, " ").concat(padding === true ? defaultPadding : "p-0"),
    scrollable: scrollable,
    width: "w-full",
    height: "h-full",
    direction: props.horizontal === true ? "row" : "col",
    space: false,
    onClick: onClick,
    children: children
  }));
};
var PanelFooter = function PanelFooter(_ref3) {
  var children = _ref3.children,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    _ref3$defaultPadding = _ref3.defaultPadding,
    defaultPadding = _ref3$defaultPadding === void 0 ? "p-6" : _ref3$defaultPadding,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? true : _ref3$padding,
    props = _objectWithoutProperties$t(_ref3, _excluded3$8);
  var _useContext4 = useContext(ThemeContext),
    currentTheme = _useContext4.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_FOOTER, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row rounded-b justify-between items-center ".concat(className, " ").concat(styles.string, " ").concat(padding === true ? defaultPadding : "p-0"),
    children: children
  });
};
var Panel = function Panel(_ref4) {
  var _ref4$horizontal = _ref4.horizontal,
    horizontal = _ref4$horizontal === void 0 ? false : _ref4$horizontal,
    children = _ref4.children,
    _ref4$onClick = _ref4.onClick,
    onClick = _ref4$onClick === void 0 ? undefined : _ref4$onClick,
    _ref4$width = _ref4.width,
    width = _ref4$width === void 0 ? "w-full" : _ref4$width,
    _ref4$height = _ref4.height,
    height = _ref4$height === void 0 ? "h-full" : _ref4$height,
    _ref4$padding = _ref4.padding,
    padding = _ref4$padding === void 0 ? true : _ref4$padding,
    _ref4$scrollable = _ref4.scrollable,
    scrollable = _ref4$scrollable === void 0 ? true : _ref4$scrollable,
    _ref4$grow = _ref4.grow,
    grow = _ref4$grow === void 0 ? true : _ref4$grow,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? "" : _ref4$className;
    _ref4.direction;
    var _ref4$defaultPadding = _ref4.defaultPadding,
    defaultPadding = _ref4$defaultPadding === void 0 ? "p-6" : _ref4$defaultPadding,
    _ref4$border = _ref4.border,
    border = _ref4$border === void 0 ? true : _ref4$border,
    props = _objectWithoutProperties$t(_ref4, _excluded4$1);
  // Fetch the Styles from the utility
  var _useContext5 = useContext(ThemeContext),
    currentTheme = _useContext5.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    direction: horizontal === true ? "row" : "col",
    scrollable: scrollable,
    grow: grow,
    width: width,
    height: height
  }));
  return /*#__PURE__*/jsx(LayoutContainer, {
    prefix: "panel",
    direction: horizontal === true ? "row" : "col",
    className: "".concat(className, " ").concat(styles.string, " ").concat(height, " ").concat(width, " rounded-lg ").concat(border === true ? "border" : "", " ").concat(padding === true ? defaultPadding : "p-0"),
    onClick: onClick,
    scrollable: scrollable // must include this here as we separated props
    ,
    space: false,
    width: width,
    height: height,
    children: children
  });
};
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

/**
 *
 * Panel2
 */

var PanelHeader2 = function PanelHeader2(_ref5) {
  var children = _ref5.children,
    _ref5$border = _ref5.border,
    border = _ref5$border === void 0 ? false : _ref5$border,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "" : _ref5$className,
    _ref5$padding = _ref5.padding,
    padding = _ref5$padding === void 0 ? true : _ref5$padding,
    _ref5$defaultPadding = _ref5.defaultPadding,
    defaultPadding = _ref5$defaultPadding === void 0 ? "p-4" : _ref5$defaultPadding,
    _ref5$direction = _ref5.direction,
    direction = _ref5$direction === void 0 ? "horizontal" : _ref5$direction,
    props = _objectWithoutProperties$t(_ref5, _excluded5$1);
  var _useContext6 = useContext(ThemeContext),
    currentTheme = _useContext6.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_HEADER_2, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    height: "h-auto",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex ".concat(direction === "horizontal" ? "flex-row" : "flex-col", " rounded-t ").concat(border === true ? "border-b" : "", " justify-between items-center ").concat(padding === true ? defaultPadding : "p-0", " ").concat(className, " ").concat(styles.string),
    children: children
  });
};
var PanelBody2 = function PanelBody2(_ref6) {
  var children = _ref6.children,
    _ref6$scrollable = _ref6.scrollable,
    scrollable = _ref6$scrollable === void 0 ? false : _ref6$scrollable,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? "" : _ref6$className,
    _ref6$onClick = _ref6.onClick,
    onClick = _ref6$onClick === void 0 ? undefined : _ref6$onClick,
    _ref6$defaultPadding = _ref6.defaultPadding,
    defaultPadding = _ref6$defaultPadding === void 0 ? "p-4" : _ref6$defaultPadding,
    _ref6$padding = _ref6.padding,
    padding = _ref6$padding === void 0 ? true : _ref6$padding,
    _ref6$height = _ref6.height,
    height = _ref6$height === void 0 ? "h-full" : _ref6$height;
    _ref6.width;
    var props = _objectWithoutProperties$t(_ref6, _excluded6$1);
  var _useContext7 = useContext(ThemeContext),
    currentTheme = _useContext7.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, _defineProperty$u(_defineProperty$u(_defineProperty$u(_defineProperty$u({
    scrollable: false
  }, "scrollable", scrollable), "padding", padding), "width", "w-full"), "height", height)));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$t(_objectSpread$t({}, props), {}, {
    className: "".concat(className, " ").concat(styles.string, " ").concat(padding === true ? defaultPadding : "p-0"),
    scrollable: scrollable,
    width: "w-full",
    height: "h-full",
    direction: props.horizontal === true ? "row" : "col",
    space: false,
    onClick: onClick,
    children: children
  }));
};
var PanelFooter2 = function PanelFooter2(_ref7) {
  var children = _ref7.children,
    _ref7$className = _ref7.className,
    className = _ref7$className === void 0 ? "" : _ref7$className,
    _ref7$defaultPadding = _ref7.defaultPadding,
    defaultPadding = _ref7$defaultPadding === void 0 ? "p-4" : _ref7$defaultPadding,
    _ref7$padding = _ref7.padding,
    padding = _ref7$padding === void 0 ? true : _ref7$padding,
    props = _objectWithoutProperties$t(_ref7, _excluded7$1);
  var _useContext8 = useContext(ThemeContext),
    currentTheme = _useContext8.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_FOOTER_2, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    height: "h-auto",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row rounded-b justify-between items-center ".concat(className, " ").concat(styles.string, " ").concat(padding === true ? defaultPadding : "p-0"),
    children: children
  });
};
var Panel2 = function Panel2(_ref8) {
  var horizontal = _ref8.horizontal,
    children = _ref8.children,
    _ref8$onClick = _ref8.onClick,
    onClick = _ref8$onClick === void 0 ? undefined : _ref8$onClick,
    _ref8$width = _ref8.width,
    width = _ref8$width === void 0 ? "w-full" : _ref8$width,
    _ref8$height = _ref8.height,
    height = _ref8$height === void 0 ? "" : _ref8$height,
    _ref8$padding = _ref8.padding,
    padding = _ref8$padding === void 0 ? true : _ref8$padding,
    _ref8$scrollable = _ref8.scrollable,
    scrollable = _ref8$scrollable === void 0 ? true : _ref8$scrollable,
    _ref8$className = _ref8.className,
    className = _ref8$className === void 0 ? "" : _ref8$className;
    _ref8.direction;
    var _ref8$grow = _ref8.grow,
    grow = _ref8$grow === void 0 ? true : _ref8$grow,
    _ref8$defaultPadding = _ref8.defaultPadding,
    defaultPadding = _ref8$defaultPadding === void 0 ? "p-4" : _ref8$defaultPadding,
    _ref8$border = _ref8.border,
    border = _ref8$border === void 0 ? true : _ref8$border,
    props = _objectWithoutProperties$t(_ref8, _excluded8$1);
  var _useContext9 = useContext(ThemeContext),
    currentTheme = _useContext9.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    direction: horizontal === true ? "row" : "col",
    scrollable: scrollable,
    width: width,
    height: height,
    grow: grow
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$t(_objectSpread$t({
    direction: horizontal === true ? "row" : "col",
    className: "".concat(className, " ").concat(styles.string, " ").concat(height, " ").concat(width, " rounded-md ").concat(border === true ? "border" : "", " ").concat(padding === true ? defaultPadding : "p-0"),
    onClick: onClick,
    scrollable: scrollable,
    space: false
  }, props), {}, {
    children: children
  }));
};
Panel2.Header = PanelHeader2;
Panel2.Body = PanelBody2;
Panel2.Footer = PanelFooter2;

/**
 * Panel3
 *
 *
 */

var PanelHeader3 = function PanelHeader3(_ref9) {
  var children = _ref9.children,
    _ref9$border = _ref9.border,
    border = _ref9$border === void 0 ? false : _ref9$border,
    _ref9$className = _ref9.className,
    className = _ref9$className === void 0 ? "" : _ref9$className,
    _ref9$padding = _ref9.padding,
    padding = _ref9$padding === void 0 ? true : _ref9$padding,
    _ref9$defaultPadding = _ref9.defaultPadding,
    defaultPadding = _ref9$defaultPadding === void 0 ? "p-2" : _ref9$defaultPadding,
    _ref9$direction = _ref9.direction,
    direction = _ref9$direction === void 0 ? "horizontal" : _ref9$direction,
    props = _objectWithoutProperties$t(_ref9, _excluded9$1);
  var _useContext0 = useContext(ThemeContext),
    currentTheme = _useContext0.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_HEADER_3, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    height: "h-auto",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex ".concat(direction === "horizontal" ? "flex-row" : "flex-col", " rounded-t ").concat(border === true ? "border-b" : "", " justify-between items-center ").concat(padding === true ? defaultPadding : "p-0", " ").concat(className, " ").concat(styles.string),
    children: children
  });
};
var PanelBody3 = function PanelBody3(_ref0) {
  var children = _ref0.children,
    _ref0$scrollable = _ref0.scrollable,
    scrollable = _ref0$scrollable === void 0 ? false : _ref0$scrollable,
    _ref0$className = _ref0.className,
    className = _ref0$className === void 0 ? "" : _ref0$className;
    _ref0.space;
    var _ref0$onClick = _ref0.onClick,
    onClick = _ref0$onClick === void 0 ? undefined : _ref0$onClick,
    _ref0$defaultPadding = _ref0.defaultPadding,
    defaultPadding = _ref0$defaultPadding === void 0 ? "p-2" : _ref0$defaultPadding,
    _ref0$padding = _ref0.padding,
    padding = _ref0$padding === void 0 ? true : _ref0$padding,
    _ref0$height = _ref0.height,
    height = _ref0$height === void 0 ? "h-full" : _ref0$height;
    _ref0.width;
    var props = _objectWithoutProperties$t(_ref0, _excluded0$1);
  try {
    var _useContext1 = useContext(ThemeContext),
      currentTheme = _useContext1.currentTheme;
    var styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
      direction: props.horizontal === true ? "row" : "col",
      scrollable: scrollable,
      padding: padding,
      width: "w-full",
      height: height
    }));
    return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$t(_objectSpread$t({}, props), {}, {
      className: "".concat(className, " ").concat(styles.string, " ").concat(padding === true ? defaultPadding : "p-0"),
      scrollable: scrollable,
      width: "w-full",
      height: height,
      direction: props.horizontal === true ? "row" : "col",
      space: false,
      onClick: onClick,
      children: children
    }));
  } catch (e) {
    return null;
  }
};
var PanelFooter3 = function PanelFooter3(_ref1) {
  var children = _ref1.children,
    _ref1$className = _ref1.className,
    className = _ref1$className === void 0 ? "" : _ref1$className,
    _ref1$padding = _ref1.padding,
    padding = _ref1$padding === void 0 ? true : _ref1$padding,
    _ref1$defaultPadding = _ref1.defaultPadding,
    defaultPadding = _ref1$defaultPadding === void 0 ? "p-2" : _ref1$defaultPadding,
    props = _objectWithoutProperties$t(_ref1, _excluded1$1);
  var _useContext10 = useContext(ThemeContext),
    currentTheme = _useContext10.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_FOOTER_3, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    height: "h-auto",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row rounded-b justify-between items-center ".concat(padding === true ? defaultPadding : "p-0", " ").concat(className, " ").concat(styles.string),
    children: children
  });
};
var Panel3 = function Panel3(_ref10) {
  var horizontal = _ref10.horizontal,
    children = _ref10.children,
    _ref10$onClick = _ref10.onClick,
    onClick = _ref10$onClick === void 0 ? undefined : _ref10$onClick,
    _ref10$width = _ref10.width,
    width = _ref10$width === void 0 ? "w-full" : _ref10$width,
    _ref10$height = _ref10.height,
    height = _ref10$height === void 0 ? "" : _ref10$height,
    _ref10$padding = _ref10.padding,
    padding = _ref10$padding === void 0 ? true : _ref10$padding,
    _ref10$scrollable = _ref10.scrollable,
    scrollable = _ref10$scrollable === void 0 ? true : _ref10$scrollable,
    _ref10$className = _ref10.className,
    className = _ref10$className === void 0 ? "" : _ref10$className,
    _ref10$grow = _ref10.grow,
    grow = _ref10$grow === void 0 ? true : _ref10$grow,
    _ref10$defaultPadding = _ref10.defaultPadding,
    defaultPadding = _ref10$defaultPadding === void 0 ? "p-2" : _ref10$defaultPadding,
    _ref10$border = _ref10.border,
    border = _ref10$border === void 0 ? true : _ref10$border,
    props = _objectWithoutProperties$t(_ref10, _excluded10$1);
  var _useContext11 = useContext(ThemeContext),
    currentTheme = _useContext11.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, _objectSpread$t(_objectSpread$t({}, props), {}, {
    direction: horizontal === true ? "row" : "col",
    scrollable: scrollable,
    padding: padding,
    width: width,
    height: height,
    grow: grow
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$t(_objectSpread$t({
    direction: horizontal === true ? "row" : "col",
    className: "".concat(className, " ").concat(styles.string, " ").concat(height, " ").concat(width, " rounded ").concat(border === true ? "border" : "", " ").concat(padding === true ? defaultPadding : "p-0"),
    onClick: onClick,
    scrollable: scrollable,
    space: false
  }, props), {}, {
    children: children
  }));
};
Panel3.Header = PanelHeader3;
Panel3.Body = PanelBody3;
Panel3.Footer = PanelFooter3;

var ModalFooter = function ModalFooter(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row justify-end p-4",
    children: children
  });
};
var Modal = function Modal(_ref2) {
  var children = _ref2.children,
    isOpen = _ref2.isOpen,
    setIsOpen = _ref2.setIsOpen,
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? "w-5/6" : _ref2$width,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? "5/6" : _ref2$height;
  return /*#__PURE__*/jsxs(Dialog, {
    open: isOpen,
    onClose: function onClose() {
      return setIsOpen(false);
    },
    className: "relative z-40 overflow-clip rounded",
    children: [/*#__PURE__*/jsx("div", {
      className: "fixed inset-0 bg-black/90",
      "aria-hidden": "true",
      onClick: function onClick() {
        return setIsOpen(false);
      }
    }), /*#__PURE__*/jsx("div", {
      className: "fixed inset-0 flex items-center justify-center h-full w-full rounded overflow-clip",
      children: /*#__PURE__*/jsx("div", {
        className: "mx-auto ".concat(width, " ").concat(height, " flex flex-col shadow overflow-clip rounded"),
        children: children
      })
    })]
  });
};
Modal.Footer = ModalFooter;

function _typeof$y(o) { "@babel/helpers - typeof"; return _typeof$y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$y(o); }
var _excluded$s = ["text", "padding", "onClick", "scrollable", "className", "grow", "space", "height", "width", "children", "debug"],
  _excluded2$7 = ["text", "padding", "onClick", "scrollable", "className", "grow", "space", "height", "width"],
  _excluded3$7 = ["text", "padding", "onClick", "scrollable", "grow", "space", "className", "height", "width"];
function ownKeys$s(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$s(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$s(Object(t), !0).forEach(function (r) { _defineProperty$t(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$s(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$t(e, r, t) { return (r = _toPropertyKey$x(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$x(t) { var i = _toPrimitive$x(t, "string"); return "symbol" == _typeof$y(i) ? i : i + ""; }
function _toPrimitive$x(t, r) { if ("object" != _typeof$y(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$y(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$s(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$s(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$s(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function Paragraph(_ref) {
  var _ref$text = _ref.text,
    text = _ref$text === void 0 ? null : _ref$text,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "p-6" : _ref$padding,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? false : _ref$scrollable;
    _ref.className;
    var _ref$grow = _ref.grow,
    grow = _ref$grow === void 0 ? false : _ref$grow,
    _ref$space = _ref.space,
    space = _ref$space === void 0 ? false : _ref$space,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "" : _ref$height,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    children = _ref.children,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    props = _objectWithoutProperties$s(_ref, _excluded$s);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.PARAGRAPH, currentTheme, _objectSpread$s(_objectSpread$s({}, props), {}, {
    space: space,
    grow: grow,
    padding: padding,
    scrollable: scrollable,
    height: height,
    width: width
  }));
  return /*#__PURE__*/jsx(LayoutContainer, {
    className: "".concat(styles.string),
    onClick: onClick,
    scrollable: scrollable,
    grow: grow,
    space: space,
    height: height,
    width: width,
    padding: padding,
    debug: debug,
    children: text !== null ? text : children
  });
}
function Paragraph2(_ref2) {
  var text = _ref2.text;
    _ref2.padding;
    var _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$scrollable = _ref2.scrollable,
    scrollable = _ref2$scrollable === void 0 ? false : _ref2$scrollable,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "text-sm xl:text-base font-normal p-2" : _ref2$className,
    _ref2$grow = _ref2.grow,
    grow = _ref2$grow === void 0 ? false : _ref2$grow,
    _ref2$space = _ref2.space,
    space = _ref2$space === void 0 ? false : _ref2$space,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? "" : _ref2$height,
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? "w-full" : _ref2$width,
    props = _objectWithoutProperties$s(_ref2, _excluded2$7);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.PARAGRAPH_2, currentTheme, _objectSpread$s(_objectSpread$s({}, props), {}, {
    scrollable: scrollable,
    space: space,
    grow: grow,
    height: height,
    width: width
  }));
  return /*#__PURE__*/jsx(LayoutContainer, {
    className: "".concat(className, " ").concat(styles.string),
    onClick: onClick,
    scrollable: scrollable,
    grow: grow,
    space: space,
    height: height,
    width: width,
    children: text
  });
}
function Paragraph3(_ref3) {
  var text = _ref3.text,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? true : _ref3$padding,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$scrollable = _ref3.scrollable,
    scrollable = _ref3$scrollable === void 0 ? false : _ref3$scrollable,
    _ref3$grow = _ref3.grow,
    grow = _ref3$grow === void 0 ? false : _ref3$grow,
    _ref3$space = _ref3.space,
    space = _ref3$space === void 0 ? false : _ref3$space,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "text-xs xl:text-sm font-normal p-2" : _ref3$className,
    _ref3$height = _ref3.height,
    height = _ref3$height === void 0 ? "" : _ref3$height,
    _ref3$width = _ref3.width,
    width = _ref3$width === void 0 ? "w-full" : _ref3$width,
    props = _objectWithoutProperties$s(_ref3, _excluded3$7);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.PARAGRAPH_3, currentTheme, _objectSpread$s(_objectSpread$s({}, props), {}, {
    scrollable: scrollable,
    grow: grow,
    space: space,
    padding: padding,
    height: height,
    width: width
  }));
  return /*#__PURE__*/jsx(LayoutContainer, {
    className: "".concat(styles.string, " ").concat(className),
    onClick: onClick,
    scrollable: scrollable,
    grow: grow,
    space: space,
    height: height,
    width: width,
    children: text
  });
}

var MenuItem = function MenuItem(_ref) {
  var _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? true : _ref$theme,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? false : _ref$border,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor,
    _ref$selectedBackgrou = _ref.selectedBackgroundColor,
    selectedBackgroundColor = _ref$selectedBackgrou === void 0 ? null : _ref$selectedBackgrou,
    _ref$borderColor = _ref.borderColor,
    borderColor = _ref$borderColor === void 0 ? null : _ref$borderColor,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? null : _ref$textColor,
    _ref$selectedTextColo = _ref.selectedTextColor,
    selectedTextColor = _ref$selectedTextColo === void 0 ? null : _ref$selectedTextColo,
    _ref$hoverTextColor = _ref.hoverTextColor,
    hoverTextColor = _ref$hoverTextColor === void 0 ? null : _ref$hoverTextColor,
    _ref$hoverBackgroundC = _ref.hoverBackgroundColor,
    hoverBackgroundColor = _ref$hoverBackgroundC === void 0 ? null : _ref$hoverBackgroundC,
    children = _ref.children,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    _ref$grow = _ref.grow,
    grow = _ref$grow === void 0 ? false : _ref$grow,
    id = _ref.id;
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected,
    grow: grow
  });

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1(id, "menu-item");
  return theme === true ? /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row font-bold ".concat(styles.string, " ").concat(border === true && "border-4", " p-4 rounded items-center space-x-2 cursor-pointer text-lg"),
    children: children
  }) : /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row font-bold ".concat(backgroundColor, " ").concat(borderColor, " ").concat(textColor, " ").concat(border === true && "border-4", " p-4 rounded items-center space-x-2 cursor-pointer text-lg"),
    children: children
  });
};
var MenuItem2 = function MenuItem2(_ref2) {
  var _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$border = _ref2.border,
    border = _ref2$border === void 0 ? false : _ref2$border,
    _ref2$backgroundColor = _ref2.backgroundColor,
    backgroundColor = _ref2$backgroundColor === void 0 ? null : _ref2$backgroundColor,
    _ref2$selectedBackgro = _ref2.selectedBackgroundColor,
    selectedBackgroundColor = _ref2$selectedBackgro === void 0 ? null : _ref2$selectedBackgro,
    _ref2$borderColor = _ref2.borderColor,
    borderColor = _ref2$borderColor === void 0 ? null : _ref2$borderColor,
    _ref2$textColor = _ref2.textColor,
    textColor = _ref2$textColor === void 0 ? null : _ref2$textColor,
    _ref2$selectedTextCol = _ref2.selectedTextColor,
    selectedTextColor = _ref2$selectedTextCol === void 0 ? null : _ref2$selectedTextCol,
    _ref2$hoverTextColor = _ref2.hoverTextColor,
    hoverTextColor = _ref2$hoverTextColor === void 0 ? null : _ref2$hoverTextColor,
    _ref2$hoverBackground = _ref2.hoverBackgroundColor,
    hoverBackgroundColor = _ref2$hoverBackground === void 0 ? null : _ref2$hoverBackground,
    children = _ref2.children,
    _ref2$selected = _ref2.selected,
    selected = _ref2$selected === void 0 ? false : _ref2$selected,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    _ref2$grow = _ref2.grow,
    grow = _ref2$grow === void 0 ? false : _ref2$grow,
    id = _ref2.id;
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM_2, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected,
    grow: grow
  });
  var baseStyles = "".concat(onClick && "cursor-pointer", " p-2 px-4 rounded items-center space-x-2 ").concat(border === true && "border-2", " ").concat(border === true && "border-2");
  var baseTextStyles = "text-base font-medium";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1(id, "menu-item");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row ".concat(baseStyles, " ").concat(className !== "" ? className : baseTextStyles, " ").concat(styles.string, " "),
    children: children
  });
};
var MenuItem3 = function MenuItem3(_ref3) {
  _ref3.innerRef;
    var _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick;
    _ref3.theme;
    var _ref3$border = _ref3.border,
    border = _ref3$border === void 0 ? false : _ref3$border,
    _ref3$borderColor = _ref3.borderColor,
    borderColor = _ref3$borderColor === void 0 ? null : _ref3$borderColor,
    _ref3$backgroundColor = _ref3.backgroundColor,
    backgroundColor = _ref3$backgroundColor === void 0 ? null : _ref3$backgroundColor,
    _ref3$selectedBackgro = _ref3.selectedBackgroundColor,
    selectedBackgroundColor = _ref3$selectedBackgro === void 0 ? null : _ref3$selectedBackgro,
    _ref3$textColor = _ref3.textColor,
    textColor = _ref3$textColor === void 0 ? null : _ref3$textColor,
    _ref3$selectedTextCol = _ref3.selectedTextColor,
    selectedTextColor = _ref3$selectedTextCol === void 0 ? null : _ref3$selectedTextCol,
    _ref3$hoverTextColor = _ref3.hoverTextColor,
    hoverTextColor = _ref3$hoverTextColor === void 0 ? null : _ref3$hoverTextColor,
    _ref3$hoverBackground = _ref3.hoverBackgroundColor,
    hoverBackgroundColor = _ref3$hoverBackground === void 0 ? null : _ref3$hoverBackground,
    children = _ref3.children,
    _ref3$selected = _ref3.selected,
    selected = _ref3$selected === void 0 ? false : _ref3$selected,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    _ref3$grow = _ref3.grow,
    grow = _ref3$grow === void 0 ? false : _ref3$grow,
    id = _ref3.id;
    _ref3.type;
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM_3, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected,
    grow: grow
  });
  var baseStyles = "".concat(onClick && "cursor-pointer", " p-2 px-4 rounded items-center space-x-2 ").concat(border === true && "border-2", " ").concat(border === true && "border-2");
  var baseTextStyles = "text-sm font-normal";
  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1(id, "menu-item");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row ".concat(baseStyles, " ").concat(className !== "" ? className : baseTextStyles, " ").concat(styles.string, " "),
    children: children
  });

  // return (
  //     <div
  //         id={id}
  //         type={type}
  //         ref={innerRef}
  //         onClick={onClick}
  //         className={`flex flex-row font-normal ${styles.string} ${
  //             border === true && "border"
  //         } p-2 rounded items-center space-x-2 cursor-pointer text-sm`}
  //     >
  //         {children}
  //     </div>
  // );
};

function Heading(_ref) {
  var title = _ref.title,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? true : _ref$padding,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? null : _ref$textColor,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row ".concat(className, " ").concat(paddingStyles, " text-6xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}
function Heading2(_ref2) {
  var title = _ref2.title,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? true : _ref2$padding,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$textColor = _ref2.textColor,
    textColor = _ref2$textColor === void 0 ? null : _ref2$textColor,
    _ref2$backgroundColor = _ref2.backgroundColor,
    backgroundColor = _ref2$backgroundColor === void 0 ? null : _ref2$backgroundColor,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className;
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING_2, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row ".concat(className, " ").concat(paddingStyles, " text-5xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}
function Heading3(_ref3) {
  var title = _ref3.title,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? true : _ref3$padding,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$textColor = _ref3.textColor,
    textColor = _ref3$textColor === void 0 ? null : _ref3$textColor,
    _ref3$backgroundColor = _ref3.backgroundColor,
    backgroundColor = _ref3$backgroundColor === void 0 ? null : _ref3$backgroundColor,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className;
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING_3, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row ".concat(className, " ").concat(paddingStyles, " text-4xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}
function SubHeading(_ref4) {
  var title = _ref4.title,
    _ref4$padding = _ref4.padding,
    padding = _ref4$padding === void 0 ? true : _ref4$padding,
    _ref4$onClick = _ref4.onClick,
    onClick = _ref4$onClick === void 0 ? null : _ref4$onClick,
    _ref4$textColor = _ref4.textColor,
    textColor = _ref4$textColor === void 0 ? null : _ref4$textColor,
    _ref4$backgroundColor = _ref4.backgroundColor,
    backgroundColor = _ref4$backgroundColor === void 0 ? null : _ref4$backgroundColor,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? "" : _ref4$className;
  var _useContext4 = useContext(ThemeContext),
    currentTheme = _useContext4.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(className, " ").concat(paddingStyles, " text-3xl font-medium ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}
function SubHeading2(_ref5) {
  var title = _ref5.title,
    _ref5$padding = _ref5.padding,
    padding = _ref5$padding === void 0 ? true : _ref5$padding,
    _ref5$onClick = _ref5.onClick,
    onClick = _ref5$onClick === void 0 ? null : _ref5$onClick,
    _ref5$textColor = _ref5.textColor,
    textColor = _ref5$textColor === void 0 ? null : _ref5$textColor,
    _ref5$backgroundColor = _ref5.backgroundColor,
    backgroundColor = _ref5$backgroundColor === void 0 ? null : _ref5$backgroundColor,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "" : _ref5$className;
  var _useContext5 = useContext(ThemeContext),
    currentTheme = _useContext5.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING_2, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(className, " ").concat(paddingStyles, " text-2xl font-medium ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}
function SubHeading3(_ref6) {
  var title = _ref6.title,
    _ref6$padding = _ref6.padding,
    padding = _ref6$padding === void 0 ? true : _ref6$padding,
    _ref6$onClick = _ref6.onClick,
    onClick = _ref6$onClick === void 0 ? null : _ref6$onClick,
    _ref6$textColor = _ref6.textColor,
    textColor = _ref6$textColor === void 0 ? null : _ref6$textColor,
    _ref6$backgroundColor = _ref6.backgroundColor,
    backgroundColor = _ref6$backgroundColor === void 0 ? null : _ref6$backgroundColor,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? "" : _ref6$className;
  var _useContext6 = useContext(ThemeContext),
    currentTheme = _useContext6.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING_3, currentTheme, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    width: "w-full",
    grow: false
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(className, " ").concat(paddingStyles, " text-xl ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}

function _typeof$x(o) { "@babel/helpers - typeof"; return _typeof$x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$x(o); }
var _excluded$r = ["title", "onClick", "disabled", "padding", "textSize", "block"],
  _excluded2$6 = ["title", "onClick", "disabled", "textSize", "padding", "block"],
  _excluded3$6 = ["title", "onClick", "disabled", "textSize", "padding", "block"];
function ownKeys$r(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$r(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$r(Object(t), !0).forEach(function (r) { _defineProperty$s(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$r(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$s(e, r, t) { return (r = _toPropertyKey$w(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$w(t) { var i = _toPrimitive$w(t, "string"); return "symbol" == _typeof$x(i) ? i : i + ""; }
function _toPrimitive$w(t, r) { if ("object" != _typeof$x(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$x(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$r(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$r(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$r(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Button = function Button(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Cancel" : _ref$title,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? undefined : _ref$onClick,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? null : _ref$padding,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? null : _ref$textSize,
    _ref$block = _ref.block,
    block = _ref$block === void 0 ? false : _ref$block,
    props = _objectWithoutProperties$r(_ref, _excluded$r);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON, currentTheme, _objectSpread$r(_objectSpread$r({}, props), {}, {
    scrollable: false,
    grow: false,
    space: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-lg lg:text-xl xl:text-xl 2xl:text-2xl";
  var paddingComputed = padding !== null ? padding : "p-2 py-1 px-2 lg:px-4 lg:py-2 xl:px-6 xl:py-4";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-nowrap whitespace-nowrap flex-row justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-bold"),
    children: title
  });
};
var Button2 = function Button2(_ref2) {
  var _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? "Cancel" : _ref2$title,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$textSize = _ref2.textSize,
    textSize = _ref2$textSize === void 0 ? null : _ref2$textSize,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? null : _ref2$padding,
    _ref2$block = _ref2.block,
    block = _ref2$block === void 0 ? false : _ref2$block,
    props = _objectWithoutProperties$r(_ref2, _excluded2$6);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_2, currentTheme, _objectSpread$r(_objectSpread$r({}, props), {}, {
    height: "",
    grow: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-base lg:text-lg 2xl:text-xl";
  var paddingComputed = padding !== null ? padding : "p-1 lg:p-2 xl:p-4";
  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button-2");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-row flex-shrink justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-medium"),
    children: title
  });
};
var Button3 = function Button3(_ref3) {
  var _ref3$title = _ref3.title,
    title = _ref3$title === void 0 ? "Cancel" : _ref3$title,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    _ref3$textSize = _ref3.textSize,
    textSize = _ref3$textSize === void 0 ? null : _ref3$textSize,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? null : _ref3$padding,
    _ref3$block = _ref3.block,
    block = _ref3$block === void 0 ? false : _ref3$block,
    props = _objectWithoutProperties$r(_ref3, _excluded3$6);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_3, currentTheme, _objectSpread$r(_objectSpread$r({}, props), {}, {
    textSize: textSize,
    padding: padding,
    grow: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-sm xl:text-base 2xl:text-base";
  var paddingComputed = padding !== null ? padding : "p-1 lg:p-1 xl:p-2";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button-3");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-row justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-normal"),
    children: title
  });
};

function _typeof$w(o) { "@babel/helpers - typeof"; return _typeof$w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$w(o); }
var _excluded$q = ["onClick", "icon", "text", "block", "textSize", "textColor", "iconSize", "backgroundColor", "disabled", "className"],
  _excluded2$5 = ["onClick", "icon", "text", "block", "textSize", "iconSize", "backgroundColor", "disabled", "className"],
  _excluded3$5 = ["onClick", "icon", "text", "block", "textSize", "iconSize", "disabled", "className"];
function ownKeys$q(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$q(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$q(Object(t), !0).forEach(function (r) { _defineProperty$r(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$q(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$r(e, r, t) { return (r = _toPropertyKey$v(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$v(t) { var i = _toPrimitive$v(t, "string"); return "symbol" == _typeof$w(i) ? i : i + ""; }
function _toPrimitive$v(t, r) { if ("object" != _typeof$w(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$w(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$q(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$q(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$q(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ButtonIcon = function ButtonIcon(_ref) {
  var _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? "" : _ref$icon,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? "" : _ref$text;
    _ref.block;
    var _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-xs lg:text-base" : _ref$textSize;
    _ref.textColor;
    var _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? "h-4 w-4" : _ref$iconSize,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$q(_ref, _excluded$q);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON, currentTheme, _objectSpread$q(_objectSpread$q({}, props), {}, {
    backgroundColor: backgroundColor,
    scrollable: false,
    grow: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var disabledStyles = onClick !== null && disabled === false && "cursor-pointer";
  var spaceBetweenStyles = icon !== "" && text !== "" ? "space-x-1 px-4" : text === "" ? "space-x-0 px-0" : "space-x-0 px-4";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button-icon");
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-row ".concat(className, " ").concat(styles.string, " rounded font-medium items-center justify-center ").concat(spaceBetweenStyles, " ").concat(textSize, " ").concat(disabledStyles, " whitespace-nowrap"),
    children: [icon !== "" && /*#__PURE__*/jsx("span", {
      className: "".concat(text === "" && "p-2"),
      children: /*#__PURE__*/jsx(FontAwesomeIcon, {
        icon: icon,
        className: "".concat(iconSize, " justify-center items-center")
      })
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: icon === "" ? "mx-0" : "mx-0",
      children: text
    })]
  });
};
var ButtonIcon2 = function ButtonIcon2(_ref2) {
  var _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$icon = _ref2.icon,
    icon = _ref2$icon === void 0 ? "" : _ref2$icon,
    _ref2$text = _ref2.text,
    text = _ref2$text === void 0 ? "" : _ref2$text,
    _ref2$block = _ref2.block,
    block = _ref2$block === void 0 ? false : _ref2$block,
    _ref2$textSize = _ref2.textSize,
    textSize = _ref2$textSize === void 0 ? "text-xs lg:text-base 2xl:text-base" : _ref2$textSize,
    _ref2$iconSize = _ref2.iconSize,
    iconSize = _ref2$iconSize === void 0 ? "h-4 w-4" : _ref2$iconSize,
    _ref2$backgroundColor = _ref2.backgroundColor,
    backgroundColor = _ref2$backgroundColor === void 0 ? null : _ref2$backgroundColor,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    props = _objectWithoutProperties$q(_ref2, _excluded2$5);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON_2, currentTheme, _objectSpread$q(_objectSpread$q({}, props), {}, {
    backgroundColor: backgroundColor,
    scrollable: false,
    grow: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var disabledStyles = onClick !== null && disabled === false && "cursor-pointer";
  var spaceBetweenStyles = icon !== "" && text !== "" ? "space-x-1 px-4" : "space-x-0 px-0";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button-icon-2");
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-row  ".concat(styles.string, " ").concat(className, " rounded font-medium items-center justify-center ").concat(spaceBetweenStyles, " ").concat(disabledStyles, " p-1 ").concat(textSize, " ").concat(block && "w-full", " whitespace-nowrap"),
    children: [icon !== "" && /*#__PURE__*/jsx("span", {
      className: "".concat(text === "" && "p-1"),
      children: /*#__PURE__*/jsx(FontAwesomeIcon, {
        icon: icon,
        className: "".concat(iconSize, " justify-center items-center")
      })
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: text === "" ? "ml-0" : "ml-2",
      children: text
    })]
  });
};
var ButtonIcon3 = function ButtonIcon3(_ref3) {
  var _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$icon = _ref3.icon,
    icon = _ref3$icon === void 0 ? "" : _ref3$icon,
    _ref3$text = _ref3.text,
    text = _ref3$text === void 0 ? "" : _ref3$text,
    _ref3$block = _ref3.block,
    block = _ref3$block === void 0 ? false : _ref3$block,
    _ref3$textSize = _ref3.textSize,
    textSize = _ref3$textSize === void 0 ? "text-xs lg:text-sm 2xl:text-sm" : _ref3$textSize,
    _ref3$iconSize = _ref3.iconSize,
    iconSize = _ref3$iconSize === void 0 ? "h-3 w-3" : _ref3$iconSize,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    props = _objectWithoutProperties$q(_ref3, _excluded3$5);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON_3, currentTheme, _objectSpread$q(_objectSpread$q({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var disabledStyles = onClick !== null && disabled === false && "cursor-pointer";
  var spaceBetweenStyles = icon !== "" && text !== "" ? "space-x-1 px-1" : "space-x-0 px-0";

  // center styles
  var center = "justify-center items-center cursor-pointer";

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "button-icon-3");
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    onClick: handleOnClick,
    className: "flex flex-row ".concat(className, " ").concat(styles.string, " rounded font-medium ").concat(center, " ").concat(spaceBetweenStyles, " ").concat(disabledStyles, " ").concat(textSize, " ").concat(block === true && "w-full", " ").concat(styles.string, " whitespace-nowrap"),
    children: [icon !== "" && /*#__PURE__*/jsx("span", {
      className: "".concat(text === "" && "p-1"),
      children: /*#__PURE__*/jsx(FontAwesomeIcon, {
        icon: icon,
        className: "".concat(iconSize, " justify-center items-center")
      })
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: text === "" ? "ml-0" : "ml-2",
      children: text
    })]
  });
};

function _typeof$v(o) { "@babel/helpers - typeof"; return _typeof$v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$v(o); }
var _excluded$p = ["children", "onClick", "padding", "rounded", "shadow", "className", "hover"],
  _excluded2$4 = ["children", "onClick", "padding", "rounded", "shadow", "className", "hover"],
  _excluded3$4 = ["children", "onClick", "padding", "rounded", "shadow", "className", "hover"];
function ownKeys$p(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$p(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$p(Object(t), !0).forEach(function (r) { _defineProperty$q(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$p(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$q(e, r, t) { return (r = _toPropertyKey$u(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$u(t) { var i = _toPrimitive$u(t, "string"); return "symbol" == _typeof$v(i) ? i : i + ""; }
function _toPrimitive$u(t, r) { if ("object" != _typeof$v(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$v(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$p(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$p(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$p(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Card = function Card(_ref) {
  var children = _ref.children,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "p-6" : _ref$padding,
    _ref$rounded = _ref.rounded,
    rounded = _ref$rounded === void 0 ? "rounded-lg" : _ref$rounded,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? "shadow-md" : _ref$shadow,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$hover = _ref.hover,
    hover = _ref$hover === void 0 ? false : _ref$hover,
    props = _objectWithoutProperties$p(_ref, _excluded$p);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.CARD, currentTheme, _objectSpread$p(_objectSpread$p({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "card");
  var hoverStyles = hover ? "hover:shadow-lg transition-shadow duration-200" : "";
  var clickableStyles = onClick ? "cursor-pointer" : "";
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " ").concat(padding, " ").concat(rounded, " ").concat(shadow, " ").concat(hoverStyles, " ").concat(clickableStyles, " border ").concat(className),
    children: children
  });
};
var Card2 = function Card2(_ref2) {
  var children = _ref2.children,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? "p-4" : _ref2$padding,
    _ref2$rounded = _ref2.rounded,
    rounded = _ref2$rounded === void 0 ? "rounded-md" : _ref2$rounded,
    _ref2$shadow = _ref2.shadow,
    shadow = _ref2$shadow === void 0 ? "shadow" : _ref2$shadow,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    _ref2$hover = _ref2.hover,
    hover = _ref2$hover === void 0 ? false : _ref2$hover,
    props = _objectWithoutProperties$p(_ref2, _excluded2$4);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.CARD_2, currentTheme, _objectSpread$p(_objectSpread$p({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "card-2");
  var hoverStyles = hover ? "hover:shadow-lg transition-shadow duration-200" : "";
  var clickableStyles = onClick ? "cursor-pointer" : "";
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " ").concat(padding, " ").concat(rounded, " ").concat(shadow, " ").concat(hoverStyles, " ").concat(clickableStyles, " border ").concat(className),
    children: children
  });
};
var Card3 = function Card3(_ref3) {
  var children = _ref3.children,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? "p-2" : _ref3$padding,
    _ref3$rounded = _ref3.rounded,
    rounded = _ref3$rounded === void 0 ? "rounded" : _ref3$rounded,
    _ref3$shadow = _ref3.shadow,
    shadow = _ref3$shadow === void 0 ? "shadow-sm" : _ref3$shadow,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    _ref3$hover = _ref3.hover,
    hover = _ref3$hover === void 0 ? false : _ref3$hover,
    props = _objectWithoutProperties$p(_ref3, _excluded3$4);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.CARD_3, currentTheme, _objectSpread$p(_objectSpread$p({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "card-3");
  var hoverStyles = hover ? "hover:shadow-lg transition-shadow duration-200" : "";
  var clickableStyles = onClick ? "cursor-pointer" : "";
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onClick: onClick,
    className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " ").concat(padding, " ").concat(rounded, " ").concat(shadow, " ").concat(hoverStyles, " ").concat(clickableStyles, " border ").concat(className),
    children: children
  });
};

// Subcomponents for Card structure
Card.Header = function (_ref4) {
  var children = _ref4.children,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? "" : _ref4$className;
  return /*#__PURE__*/jsx("div", {
    className: "border-b pb-2 mb-3 ".concat(className),
    children: children
  });
};
Card.Body = function (_ref5) {
  var children = _ref5.children,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "" : _ref5$className;
  return /*#__PURE__*/jsx("div", {
    className: className,
    children: children
  });
};
Card.Footer = function (_ref6) {
  var children = _ref6.children,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? "" : _ref6$className;
  return /*#__PURE__*/jsx("div", {
    className: "border-t pt-2 mt-3 ".concat(className),
    children: children
  });
};

// Apply same subcomponents to Card2 and Card3
Card2.Header = Card.Header;
Card2.Body = Card.Body;
Card2.Footer = Card.Footer;
Card3.Header = Card.Header;
Card3.Body = Card.Body;
Card3.Footer = Card.Footer;

function _typeof$u(o) { "@babel/helpers - typeof"; return _typeof$u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$u(o); }
var _excluded$o = ["items", "separator", "maxItems", "className", "onItemClick", "themeKey"];
function _toConsumableArray$1(r) { return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$3(r) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$3(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0; } }
function _iterableToArray$1(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles$1(r) { if (Array.isArray(r)) return _arrayLikeToArray$3(r); }
function _arrayLikeToArray$3(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys$o(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$o(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$o(Object(t), !0).forEach(function (r) { _defineProperty$p(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$o(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$p(e, r, t) { return (r = _toPropertyKey$t(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$t(t) { var i = _toPrimitive$t(t, "string"); return "symbol" == _typeof$u(i) ? i : i + ""; }
function _toPrimitive$t(t, r) { if ("object" != _typeof$u(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$u(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$o(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$o(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$o(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var BreadcrumbsBase = function BreadcrumbsBase(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? "/" : _ref$separator,
    _ref$maxItems = _ref.maxItems,
    maxItems = _ref$maxItems === void 0 ? null : _ref$maxItems,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$onItemClick = _ref.onItemClick,
    onItemClick = _ref$onItemClick === void 0 ? null : _ref$onItemClick,
    themeKey = _ref.themeKey,
    props = _objectWithoutProperties$o(_ref, _excluded$o);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeKey, currentTheme, _objectSpread$o(_objectSpread$o({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "breadcrumbs");
  var displayItems = useMemo(function () {
    if (!maxItems || items.length <= maxItems) return items;
    if (maxItems < 2) return items.slice(-1);
    var head = items[0];
    var tail = items.slice(-(maxItems - 1));
    return [head, {
      label: "...",
      isEllipsis: true
    }].concat(_toConsumableArray$1(tail));
  }, [items, maxItems]);
  var handleClick = function handleClick(item, event) {
    if (item.onClick) {
      event.preventDefault();
      item.onClick(item, event);
      return;
    }
    if (onItemClick) {
      event.preventDefault();
      onItemClick(item, event);
    }
  };
  return /*#__PURE__*/jsx("nav", {
    id: uuid,
    className: className,
    "aria-label": "Breadcrumb",
    children: /*#__PURE__*/jsx("ol", {
      className: "flex items-center space-x-2 ".concat(styles.textColor),
      children: displayItems.map(function (item, index) {
        return /*#__PURE__*/jsxs("li", {
          className: "flex items-center",
          children: [index > 0 && /*#__PURE__*/jsx("span", {
            className: "mx-2 opacity-60",
            children: separator
          }), item.isEllipsis ? /*#__PURE__*/jsx("span", {
            className: "opacity-60",
            children: item.label
          }) : item.href ? /*#__PURE__*/jsx("a", {
            href: item.href,
            onClick: function onClick(event) {
              return handleClick(item, event);
            },
            className: "hover:underline",
            children: item.label
          }) : item.onClick || onItemClick ? /*#__PURE__*/jsx("button", {
            type: "button",
            onClick: function onClick(event) {
              return handleClick(item, event);
            },
            className: "hover:underline",
            children: item.label
          }) : /*#__PURE__*/jsx("span", {
            children: item.label
          })]
        }, "".concat(item.label, "-").concat(index));
      })
    })
  });
};
var Breadcrumbs = function Breadcrumbs(props) {
  return /*#__PURE__*/jsx(BreadcrumbsBase, _objectSpread$o({
    themeKey: themeObjects.BREADCRUMBS
  }, props));
};
var Breadcrumbs2 = function Breadcrumbs2(props) {
  return /*#__PURE__*/jsx(BreadcrumbsBase, _objectSpread$o({
    themeKey: themeObjects.BREADCRUMBS_2
  }, props));
};
var Breadcrumbs3 = function Breadcrumbs3(props) {
  return /*#__PURE__*/jsx(BreadcrumbsBase, _objectSpread$o({
    themeKey: themeObjects.BREADCRUMBS_3
  }, props));
};

function _typeof$t(o) { "@babel/helpers - typeof"; return _typeof$t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$t(o); }
var _excluded$n = ["title", "message", "children", "onClose", "className"];
function ownKeys$n(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$n(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$n(Object(t), !0).forEach(function (r) { _defineProperty$o(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$n(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$o(e, r, t) { return (r = _toPropertyKey$s(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$s(t) { var i = _toPrimitive$s(t, "string"); return "symbol" == _typeof$t(i) ? i : i + ""; }
function _toPrimitive$s(t, r) { if ("object" != _typeof$t(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$t(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$n(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$n(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$n(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Alert = function Alert(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? "" : _ref$message,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? null : _ref$onClose,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$n(_ref, _excluded$n);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.ALERT, currentTheme, _objectSpread$n(_objectSpread$n({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "alert");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-4 text-base ").concat(className),
    role: "alert",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [title && /*#__PURE__*/jsx("div", {
          className: "font-semibold text-base",
          children: title
        }), message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: message
        }), children]
      }), onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close alert",
        children: "\xD7"
      })]
    })
  });
};
var Alert2 = function Alert2(props) {
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.ALERT_2, currentTheme, _objectSpread$n(_objectSpread$n({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "alert-2");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-3 text-sm ").concat(props.className || ""),
    role: "alert",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [props.title && /*#__PURE__*/jsx("div", {
          className: "font-medium text-sm",
          children: props.title
        }), props.message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: props.message
        }), props.children]
      }), props.onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: props.onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close alert",
        children: "\xD7"
      })]
    })
  });
};
var Alert3 = function Alert3(props) {
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.ALERT_3, currentTheme, _objectSpread$n(_objectSpread$n({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "alert-3");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-2 text-sm ").concat(props.className || ""),
    role: "alert",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [props.title && /*#__PURE__*/jsx("div", {
          className: "font-normal text-sm",
          children: props.title
        }), props.message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: props.message
        }), props.children]
      }), props.onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: props.onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close alert",
        children: "\xD7"
      })]
    })
  });
};

function _typeof$s(o) { "@babel/helpers - typeof"; return _typeof$s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$s(o); }
var _excluded$m = ["variant", "title", "message", "children", "onClose", "showIcon", "className", "animate"];
function ownKeys$m(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$m(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$m(Object(t), !0).forEach(function (r) { _defineProperty$n(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$m(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$n(e, r, t) { return (r = _toPropertyKey$r(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$r(t) { var i = _toPrimitive$r(t, "string"); return "symbol" == _typeof$s(i) ? i : i + ""; }
function _toPrimitive$r(t, r) { if ("object" != _typeof$s(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$s(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$m(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$m(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$m(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var VARIANT_STYLES = {
  info: {
    container: "bg-blue-50 border-l-4 border-blue-500",
    title: "text-blue-900",
    message: "text-blue-800",
    icon: "text-blue-600",
    closeButton: "text-blue-600 hover:text-blue-900 hover:bg-blue-100"
  },
  success: {
    container: "bg-green-50 border-l-4 border-green-500",
    title: "text-green-900",
    message: "text-green-800",
    icon: "text-green-600",
    closeButton: "text-green-600 hover:text-green-900 hover:bg-green-100"
  },
  warning: {
    container: "bg-amber-50 border-l-4 border-amber-500",
    title: "text-amber-900",
    message: "text-amber-800",
    icon: "text-amber-600",
    closeButton: "text-amber-600 hover:text-amber-900 hover:bg-amber-100"
  },
  error: {
    container: "bg-red-50 border-l-4 border-red-500",
    title: "text-red-900",
    message: "text-red-800",
    icon: "text-red-600",
    closeButton: "text-red-600 hover:text-red-900 hover:bg-red-100"
  }
};

// SVG Icons for each variant
var Icons = {
  info: /*#__PURE__*/jsx("svg", {
    className: "w-6 h-6",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
      clipRule: "evenodd"
    })
  }),
  success: /*#__PURE__*/jsx("svg", {
    className: "w-6 h-6",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      clipRule: "evenodd"
    })
  }),
  warning: /*#__PURE__*/jsx("svg", {
    className: "w-6 h-6",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
      clipRule: "evenodd"
    })
  }),
  error: /*#__PURE__*/jsx("svg", {
    className: "w-6 h-6",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
      clipRule: "evenodd"
    })
  })
};
var AlertBanner = function AlertBanner(_ref) {
  var _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "info" : _ref$variant,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? "" : _ref$message,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? null : _ref$onClose,
    _ref$showIcon = _ref.showIcon,
    showIcon = _ref$showIcon === void 0 ? true : _ref$showIcon,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? true : _ref$animate,
    props = _objectWithoutProperties$m(_ref, _excluded$m);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;

  // Get theme-aware styles while allowing variant overrides
  getStylesForItem(themeObjects.ALERT_BANNER, currentTheme, _objectSpread$m({}, props));
  var uuid = getUUID$1("", "alert-banner");
  var variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.info;
  var icon = Icons[variant] || Icons.info;

  // Animation classes
  var animationClass = animate ? "animate-in slide-in-from-top-2 fade-in duration-300" : "";
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "\n                ".concat(variantStyle.container, "\n                rounded-md p-4 shadow-sm\n                ").concat(animationClass, "\n                ").concat(className, "\n            "),
    role: "alert",
    "aria-live": "polite",
    "aria-atomic": "true",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start gap-3",
      children: [showIcon && /*#__PURE__*/jsx("div", {
        className: "\n                            ".concat(variantStyle.icon, "\n                            flex-shrink-0\n                            mt-0.5\n                        "),
        "aria-hidden": "true",
        children: icon
      }), /*#__PURE__*/jsxs("div", {
        className: "flex-1 min-w-0",
        children: [title && /*#__PURE__*/jsx("h3", {
          className: "\n                                ".concat(variantStyle.title, "\n                                text-sm font-bold mb-1\n                            "),
          children: title
        }), message && /*#__PURE__*/jsx("p", {
          className: "\n                                ".concat(variantStyle.message, "\n                                text-sm leading-relaxed\n                            "),
          children: message
        }), children && /*#__PURE__*/jsx("div", {
          className: "\n                                ".concat(variantStyle.message, "\n                                text-sm\n                                ").concat(title || message ? "mt-2" : "", "\n                            "),
          children: children
        })]
      }), onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: onClose,
        className: "\n                            ".concat(variantStyle.closeButton, "\n                            flex-shrink-0\n                            rounded-md p-1.5\n                            transition-colors duration-200\n                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent\n                        "),
        "aria-label": "Dismiss alert",
        children: /*#__PURE__*/jsx("svg", {
          className: "w-4 h-4",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/jsx("path", {
            fillRule: "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            clipRule: "evenodd"
          })
        })
      })]
    })
  });
};

function _typeof$r(o) { "@babel/helpers - typeof"; return _typeof$r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$r(o); }
var _excluded$l = ["value", "showLabel", "size", "striped", "animated", "fillColor", "className", "themeKey"];
function ownKeys$l(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$l(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$l(Object(t), !0).forEach(function (r) { _defineProperty$m(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$l(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$m(e, r, t) { return (r = _toPropertyKey$q(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$q(t) { var i = _toPrimitive$q(t, "string"); return "symbol" == _typeof$r(i) ? i : i + ""; }
function _toPrimitive$q(t, r) { if ("object" != _typeof$r(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$r(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$l(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$l(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$l(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var resolveThemeClass = function resolveThemeClass(theme, value) {
  if (!value) return "";
  if (theme && value in theme) return theme[value];
  return value;
};
var ProgressBarBase = function ProgressBarBase(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    _ref$showLabel = _ref.showLabel,
    showLabel = _ref$showLabel === void 0 ? false : _ref$showLabel,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "md" : _ref$size,
    _ref$striped = _ref.striped,
    striped = _ref$striped === void 0 ? false : _ref$striped,
    _ref$animated = _ref.animated,
    animated = _ref$animated === void 0 ? false : _ref$animated,
    _ref$fillColor = _ref.fillColor,
    fillColor = _ref$fillColor === void 0 ? "bg-primary-medium" : _ref$fillColor,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    themeKey = _ref.themeKey,
    props = _objectWithoutProperties$l(_ref, _excluded$l);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeKey, currentTheme, _objectSpread$l(_objectSpread$l({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "progress-bar");
  var heightClass = size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3";
  var fillClass = resolveThemeClass(currentTheme, fillColor);
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "w-full ".concat(className),
    children: [/*#__PURE__*/jsx("div", {
      className: "w-full ".concat(heightClass, " rounded-full overflow-hidden ").concat(styles.backgroundColor, " ").concat(styles.borderColor),
      children: /*#__PURE__*/jsx("div", {
        className: "".concat(heightClass, " ").concat(fillClass, " ").concat(striped ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : "", " ").concat(animated ? "animate-pulse" : ""),
        style: {
          width: "".concat(Math.max(0, Math.min(100, value)), "%")
        }
      })
    }), showLabel && /*#__PURE__*/jsxs("div", {
      className: "mt-2 text-sm ".concat(styles.textColor),
      children: [Math.round(value), "%"]
    })]
  });
};
var ProgressBar = function ProgressBar(props) {
  return /*#__PURE__*/jsx(ProgressBarBase, _objectSpread$l(_objectSpread$l({
    themeKey: themeObjects.PROGRESS_BAR
  }, props), {}, {
    fillColor: props.fillColor || "bg-primary-medium"
  }));
};
var ProgressBar2 = function ProgressBar2(props) {
  return /*#__PURE__*/jsx(ProgressBarBase, _objectSpread$l(_objectSpread$l({
    themeKey: themeObjects.PROGRESS_BAR_2
  }, props), {}, {
    fillColor: props.fillColor || "bg-secondary-medium"
  }));
};
var ProgressBar3 = function ProgressBar3(props) {
  return /*#__PURE__*/jsx(ProgressBarBase, _objectSpread$l(_objectSpread$l({
    themeKey: themeObjects.PROGRESS_BAR_3
  }, props), {}, {
    fillColor: props.fillColor || "bg-tertiary-medium"
  }));
};

function _typeof$q(o) { "@babel/helpers - typeof"; return _typeof$q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$q(o); }
var _excluded$k = ["title", "message", "duration", "onClose", "className", "children"];
function ownKeys$k(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$k(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$k(Object(t), !0).forEach(function (r) { _defineProperty$l(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$k(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$l(e, r, t) { return (r = _toPropertyKey$p(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$p(t) { var i = _toPrimitive$p(t, "string"); return "symbol" == _typeof$q(i) ? i : i + ""; }
function _toPrimitive$p(t, r) { if ("object" != _typeof$q(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$q(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$k(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$k(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$k(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Toast = function Toast(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? "" : _ref$message,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? null : _ref$duration,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? null : _ref$onClose,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    props = _objectWithoutProperties$k(_ref, _excluded$k);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.TOAST, currentTheme, _objectSpread$k(_objectSpread$k({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "toast");
  useEffect(function () {
    if (!duration || !onClose) return;
    var timer = setTimeout(function () {
      return onClose();
    }, duration);
    return function () {
      return clearTimeout(timer);
    };
  }, [duration, onClose]);
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-4 shadow-lg ").concat(className),
    role: "status",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [title && /*#__PURE__*/jsx("div", {
          className: "font-semibold",
          children: title
        }), message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: message
        }), children]
      }), onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close toast",
        children: "\xD7"
      })]
    })
  });
};
var Toast2 = function Toast2(props) {
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.TOAST_2, currentTheme, _objectSpread$k(_objectSpread$k({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "toast-2");
  useEffect(function () {
    if (!props.duration || !props.onClose) return;
    var timer = setTimeout(function () {
      return props.onClose();
    }, props.duration);
    return function () {
      return clearTimeout(timer);
    };
  }, [props.duration, props.onClose]);
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-3 shadow-lg ").concat(props.className || ""),
    role: "status",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [props.title && /*#__PURE__*/jsx("div", {
          className: "font-semibold",
          children: props.title
        }), props.message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: props.message
        }), props.children]
      }), props.onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: props.onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close toast",
        children: "\xD7"
      })]
    })
  });
};
var Toast3 = function Toast3(props) {
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.TOAST_3, currentTheme, _objectSpread$k(_objectSpread$k({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "toast-3");
  useEffect(function () {
    if (!props.duration || !props.onClose) return;
    var timer = setTimeout(function () {
      return props.onClose();
    }, props.duration);
    return function () {
      return clearTimeout(timer);
    };
  }, [props.duration, props.onClose]);
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-md p-2 shadow-lg ").concat(props.className || ""),
    role: "status",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex items-start justify-between",
      children: [/*#__PURE__*/jsxs("div", {
        className: "space-y-1",
        children: [props.title && /*#__PURE__*/jsx("div", {
          className: "font-semibold",
          children: props.title
        }), props.message && /*#__PURE__*/jsx("div", {
          className: "opacity-90",
          children: props.message
        }), props.children]
      }), props.onClose && /*#__PURE__*/jsx("button", {
        type: "button",
        onClick: props.onClose,
        className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
        "aria-label": "Close toast",
        children: "\xD7"
      })]
    })
  });
};

function _typeof$p(o) { "@babel/helpers - typeof"; return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$p(o); }
var _excluded$j = ["title", "children", "footer", "actions", "onRemove", "onSettings", "onRefresh", "className"];
function ownKeys$j(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$j(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$j(Object(t), !0).forEach(function (r) { _defineProperty$k(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$j(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$k(e, r, t) { return (r = _toPropertyKey$o(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$o(t) { var i = _toPrimitive$o(t, "string"); return "symbol" == _typeof$p(i) ? i : i + ""; }
function _toPrimitive$o(t, r) { if ("object" != _typeof$p(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$p(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$j(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$j(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$j(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var WidgetChrome = function WidgetChrome(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    children = _ref.children,
    _ref$footer = _ref.footer,
    footer = _ref$footer === void 0 ? null : _ref$footer,
    _ref$actions = _ref.actions,
    actions = _ref$actions === void 0 ? null : _ref$actions,
    _ref$onRemove = _ref.onRemove,
    onRemove = _ref$onRemove === void 0 ? null : _ref$onRemove,
    _ref$onSettings = _ref.onSettings,
    onSettings = _ref$onSettings === void 0 ? null : _ref$onSettings,
    _ref$onRefresh = _ref.onRefresh,
    onRefresh = _ref$onRefresh === void 0 ? null : _ref$onRefresh,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$j(_ref, _excluded$j);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.WIDGET_CHROME, currentTheme, _objectSpread$j(_objectSpread$j({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var uuid = getUUID$1("", "widget-chrome");
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "border ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " rounded-lg ").concat(className),
    children: [/*#__PURE__*/jsxs("div", {
      className: "flex items-center justify-between px-4 py-2 border-b",
      children: [/*#__PURE__*/jsx("div", {
        className: "font-semibold truncate",
        children: title
      }), /*#__PURE__*/jsxs("div", {
        className: "flex items-center space-x-2",
        children: [actions, onRefresh && /*#__PURE__*/jsx(ButtonIcon, {
          icon: "arrows-up-down",
          onClick: onRefresh
        }), onSettings && /*#__PURE__*/jsx(ButtonIcon, {
          icon: "cog",
          onClick: onSettings
        }), onRemove && /*#__PURE__*/jsx(ButtonIcon, {
          icon: "xmark",
          onClick: onRemove
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: "p-4",
      children: children
    }), footer && /*#__PURE__*/jsx("div", {
      className: "border-t px-4 py-2",
      children: footer
    })]
  });
};

function _typeof$o(o) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$o(o); }
var _excluded$i = ["label", "value", "onChange", "placeholder", "type", "id", "className", "inputClassName"];
function ownKeys$i(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$i(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$i(Object(t), !0).forEach(function (r) { _defineProperty$j(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$i(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$j(e, r, t) { return (r = _toPropertyKey$n(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$n(t) { var i = _toPrimitive$n(t, "string"); return "symbol" == _typeof$o(i) ? i : i + ""; }
function _toPrimitive$n(t, r) { if ("object" != _typeof$o(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$o(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$i(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$i(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$i(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var InputText = function InputText(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "text" : _ref$type,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? "" : _ref$inputClassName,
    props = _objectWithoutProperties$i(_ref, _excluded$i);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.INPUT_TEXT, currentTheme, _objectSpread$i(_objectSpread$i({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$i(_objectSpread$i({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var inputId = id || getUUID$1("", "input-text");
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-1 ".concat(className),
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: inputId,
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), /*#__PURE__*/jsx("input", {
      id: inputId,
      type: type,
      value: value,
      onChange: function onChange(event) {
        return _onChange(event.target.value, event);
      },
      placeholder: placeholder,
      className: "w-full rounded-md border px-3 py-2 ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " focus:outline-none focus:ring-2 focus:ring-offset-0 ").concat(inputClassName)
    })]
  });
};

function _typeof$n(o) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$n(o); }
var _excluded$h = ["label", "value", "onChange", "placeholder", "rows", "id", "className", "inputClassName"];
function ownKeys$h(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$h(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$h(Object(t), !0).forEach(function (r) { _defineProperty$i(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$i(e, r, t) { return (r = _toPropertyKey$m(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$m(t) { var i = _toPrimitive$m(t, "string"); return "symbol" == _typeof$n(i) ? i : i + ""; }
function _toPrimitive$m(t, r) { if ("object" != _typeof$n(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$n(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$h(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$h(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$h(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var TextArea = function TextArea(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 4 : _ref$rows,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? "" : _ref$inputClassName,
    props = _objectWithoutProperties$h(_ref, _excluded$h);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.TEXTAREA, currentTheme, _objectSpread$h(_objectSpread$h({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$h(_objectSpread$h({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var inputId = id || getUUID$1("", "textarea");
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-1 ".concat(className),
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: inputId,
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), /*#__PURE__*/jsx("textarea", {
      id: inputId,
      rows: rows,
      value: value,
      onChange: function onChange(event) {
        return _onChange(event.target.value, event);
      },
      placeholder: placeholder,
      className: "w-full rounded-md border px-3 py-2 ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " focus:outline-none focus:ring-2 focus:ring-offset-0 ").concat(inputClassName)
    })]
  });
};

function _typeof$m(o) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$m(o); }
var _excluded$g = ["label", "value", "onChange", "options", "placeholder", "id", "className", "inputClassName"];
function ownKeys$g(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$g(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$g(Object(t), !0).forEach(function (r) { _defineProperty$h(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$h(e, r, t) { return (r = _toPropertyKey$l(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$l(t) { var i = _toPrimitive$l(t, "string"); return "symbol" == _typeof$m(i) ? i : i + ""; }
function _toPrimitive$l(t, r) { if ("object" != _typeof$m(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$m(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$g(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$g(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$g(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SelectInput = function SelectInput(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Select an option" : _ref$placeholder,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? "" : _ref$inputClassName,
    props = _objectWithoutProperties$g(_ref, _excluded$g);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, _objectSpread$g(_objectSpread$g({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$g(_objectSpread$g({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var inputId = id || getUUID$1("", "select-input");
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-1 ".concat(className),
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: inputId,
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), /*#__PURE__*/jsxs("select", {
      id: inputId,
      value: value,
      onChange: function onChange(event) {
        return _onChange(event.target.value, event);
      },
      className: "w-full rounded-md border px-3 py-2 ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " focus:outline-none focus:ring-2 focus:ring-offset-0 ").concat(inputClassName),
      children: [/*#__PURE__*/jsx("option", {
        value: "",
        disabled: true,
        children: placeholder
      }), options.map(function (option) {
        return /*#__PURE__*/jsx("option", {
          value: option.value,
          children: option.label
        }, option.value);
      })]
    })]
  });
};

function _typeof$l(o) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$l(o); }
var _excluded$f = ["label", "checked", "onChange", "id", "className"];
function ownKeys$f(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$f(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$f(Object(t), !0).forEach(function (r) { _defineProperty$g(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$g(e, r, t) { return (r = _toPropertyKey$k(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$k(t) { var i = _toPrimitive$k(t, "string"); return "symbol" == _typeof$l(i) ? i : i + ""; }
function _toPrimitive$k(t, r) { if ("object" != _typeof$l(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$l(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$f(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$f(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$f(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Checkbox = function Checkbox(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$f(_ref, _excluded$f);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.CHECKBOX, currentTheme, _objectSpread$f(_objectSpread$f({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$f(_objectSpread$f({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var inputId = id || getUUID$1("", "checkbox");
  return /*#__PURE__*/jsxs("label", {
    className: "flex items-center space-x-2 ".concat(className),
    htmlFor: inputId,
    children: [/*#__PURE__*/jsx("input", {
      id: inputId,
      type: "checkbox",
      checked: checked,
      onChange: function onChange(event) {
        return _onChange(event.target.checked, event);
      },
      className: "h-4 w-4 rounded border ".concat(styles.borderColor, " ").concat(styles.backgroundColor)
    }), label && /*#__PURE__*/jsx("span", {
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    })]
  });
};

function _typeof$k(o) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$k(o); }
var _excluded$e = ["label", "name", "value", "onChange", "options", "className"];
function ownKeys$e(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$e(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$e(Object(t), !0).forEach(function (r) { _defineProperty$f(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$f(e, r, t) { return (r = _toPropertyKey$j(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$j(t) { var i = _toPrimitive$j(t, "string"); return "symbol" == _typeof$k(i) ? i : i + ""; }
function _toPrimitive$j(t, r) { if ("object" != _typeof$k(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$k(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$e(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$e(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$e(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RadioGroup = function RadioGroup(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? null : _ref$name,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$e(_ref, _excluded$e);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.RADIO, currentTheme, _objectSpread$e(_objectSpread$e({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$e(_objectSpread$e({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var groupId = getUUID$1("", "radio-group");
  var groupName = name || groupId;
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-2 ".concat(className),
    children: [label && /*#__PURE__*/jsx("div", {
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), options.map(function (option) {
      return /*#__PURE__*/jsxs("label", {
        className: "flex items-center space-x-2",
        children: [/*#__PURE__*/jsx("input", {
          type: "radio",
          name: groupName,
          value: option.value,
          checked: value === option.value,
          onChange: function onChange(event) {
            return _onChange(event.target.value, event);
          },
          className: "h-4 w-4 ".concat(styles.borderColor, " ").concat(styles.backgroundColor)
        }), /*#__PURE__*/jsx("span", {
          className: "text-sm ".concat(labelStyles.textColor),
          children: option.label
        })]
      }, option.value);
    })]
  });
};

function _typeof$j(o) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$j(o); }
var _excluded$d = ["label", "checked", "onChange", "id", "className"];
function ownKeys$d(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$d(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$d(Object(t), !0).forEach(function (r) { _defineProperty$e(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$e(e, r, t) { return (r = _toPropertyKey$i(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$i(t) { var i = _toPrimitive$i(t, "string"); return "symbol" == _typeof$j(i) ? i : i + ""; }
function _toPrimitive$i(t, r) { if ("object" != _typeof$j(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$j(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$d(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$d(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$d(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Switch = function Switch(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$d(_ref, _excluded$d);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SWITCH, currentTheme, _objectSpread$d(_objectSpread$d({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$d(_objectSpread$d({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var switchId = id || getUUID$1("", "switch");
  var handleToggle = function handleToggle() {
    onChange(!checked);
  };
  return /*#__PURE__*/jsxs("div", {
    className: "flex items-center space-x-3 ".concat(className),
    children: [/*#__PURE__*/jsx("button", {
      id: switchId,
      type: "button",
      role: "switch",
      "aria-checked": checked,
      onClick: handleToggle,
      className: "relative inline-flex h-6 w-11 items-center rounded-full transition ".concat(styles.backgroundColor, " ").concat(checked ? "opacity-100" : "opacity-60"),
      children: /*#__PURE__*/jsx("span", {
        className: "inline-block h-4 w-4 transform rounded-full bg-white transition ".concat(checked ? "translate-x-6" : "translate-x-1")
      })
    }), label && /*#__PURE__*/jsx("span", {
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    })]
  });
};

function _typeof$i(o) { "@babel/helpers - typeof"; return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$i(o); }
var _excluded$c = ["label", "value", "min", "max", "step", "onChange", "id", "className"];
function ownKeys$c(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$c(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$c(Object(t), !0).forEach(function (r) { _defineProperty$d(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$d(e, r, t) { return (r = _toPropertyKey$h(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$h(t) { var i = _toPrimitive$h(t, "string"); return "symbol" == _typeof$i(i) ? i : i + ""; }
function _toPrimitive$h(t, r) { if ("object" != _typeof$i(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$i(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$c(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$c(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$c(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Slider = function Slider(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$c(_ref, _excluded$c);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SLIDER, currentTheme, _objectSpread$c(_objectSpread$c({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$c(_objectSpread$c({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var sliderId = id || getUUID$1("", "slider");
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-2 ".concat(className),
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: sliderId,
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), /*#__PURE__*/jsx("input", {
      id: sliderId,
      type: "range",
      min: min,
      max: max,
      step: step,
      value: value,
      onChange: function onChange(event) {
        return _onChange(Number(event.target.value), event);
      },
      className: "w-full ".concat(styles.textColor)
    })]
  });
};

function _typeof$h(o) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$h(o); }
var _excluded$b = ["label", "value", "onChange", "placeholder", "icon", "id", "className", "inputClassName"];
function ownKeys$b(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$b(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$b(Object(t), !0).forEach(function (r) { _defineProperty$c(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$c(e, r, t) { return (r = _toPropertyKey$g(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$g(t) { var i = _toPrimitive$g(t, "string"); return "symbol" == _typeof$h(i) ? i : i + ""; }
function _toPrimitive$g(t, r) { if ("object" != _typeof$h(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$h(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$b(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$b(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$b(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SearchInput = function SearchInput(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Search..." : _ref$placeholder,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? "magnifying-glass" : _ref$icon,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? "" : _ref$inputClassName,
    props = _objectWithoutProperties$b(_ref, _excluded$b);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SEARCH_INPUT, currentTheme, _objectSpread$b(_objectSpread$b({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var labelStyles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$b(_objectSpread$b({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var inputId = id || getUUID$1("", "search-input");
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col space-y-1 ".concat(className),
    children: [label && /*#__PURE__*/jsx("label", {
      htmlFor: inputId,
      className: "text-sm ".concat(labelStyles.textColor),
      children: label
    }), /*#__PURE__*/jsxs("div", {
      className: "relative",
      children: [/*#__PURE__*/jsx("span", {
        className: "absolute left-3 top-1/2 -translate-y-1/2 ".concat(styles.textColor, " opacity-70"),
        children: /*#__PURE__*/jsx(FontAwesomeIcon, {
          icon: icon
        })
      }), /*#__PURE__*/jsx("input", {
        id: inputId,
        type: "search",
        value: value,
        onChange: function onChange(event) {
          return _onChange(event.target.value, event);
        },
        placeholder: placeholder,
        className: "w-full rounded-md border pl-10 pr-3 py-2 ".concat(styles.backgroundColor, " ").concat(styles.borderColor, " ").concat(styles.textColor, " focus:outline-none focus:ring-2 focus:ring-offset-0 ").concat(inputClassName)
      })]
    })]
  });
};

function _typeof$g(o) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$g(o); }
var _excluded$a = ["text", "enabled", "setEnabled"];
function ownKeys$a(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$a(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$a(Object(t), !0).forEach(function (r) { _defineProperty$b(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$b(e, r, t) { return (r = _toPropertyKey$f(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$f(t) { var i = _toPrimitive$f(t, "string"); return "symbol" == _typeof$g(i) ? i : i + ""; }
function _toPrimitive$f(t, r) { if ("object" != _typeof$g(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$g(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$a(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$a(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$a(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function Toggle(_ref) {
  _ref.text;
    _ref.enabled;
    _ref.setEnabled;
    var props = _objectWithoutProperties$a(_ref, _excluded$a);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  getStylesForItem(themeObjects.TOGGLE, currentTheme, _objectSpread$a({}, props));
  return "toggle";
  // return theme === true ? (
  //   <div className="flex flex-row items-center">
  //     <Switch
  //       checked={enabled}
  //       onChange={setEnabled}
  //       className={`${enabled === true ? `${styles['backgroundColor']} ${styles['hoverBackgroundColor']}`: `${styles['hoverBackgroundColor']} ${styles['backgroundColor']}` }
  //         relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
  //     >
  //       <span
  //         aria-hidden="true"
  //         className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
  //           pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-gray-200 shadow-lg ring-0 transition duration-200 ease-in-out`}
  //       />
  //     </Switch>
  //     <span className={`sr-only ${styles['textColor']}`}>{text}TESTING</span>
  //   </div>
  // ): (
  //   <div className="flex flex-row items-center">
  //     <Switch
  //       checked={enabled}
  //       onChange={setEnabled}
  //       className={`${enabled ? backgroundColor : hoverBackgroundColor }
  //         relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
  //     >
  //       <span className={`sr-only ${textColor}`}>{text}</span>
  //       <span
  //         aria-hidden="true"
  //         className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
  //           pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
  //       />
  //     </Switch>
  //   </div>
  // )
}

function _typeof$f(o) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$f(o); }
var _excluded$9 = ["columns", "data", "sortable", "hoverable", "striped", "bordered", "compact", "onRowClick", "className"],
  _excluded2$3 = ["columns", "data", "sortable", "hoverable", "striped", "bordered", "compact", "onRowClick", "className"],
  _excluded3$3 = ["columns", "data", "sortable", "hoverable", "striped", "bordered", "compact", "onRowClick", "className"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray$2(r); }
function _slicedToArray$2(r, e) { return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$2(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0; } }
function _arrayLikeToArray$2(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit$2(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$2(r) { if (Array.isArray(r)) return r; }
function ownKeys$9(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$9(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$9(Object(t), !0).forEach(function (r) { _defineProperty$a(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$a(e, r, t) { return (r = _toPropertyKey$e(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$e(t) { var i = _toPrimitive$e(t, "string"); return "symbol" == _typeof$f(i) ? i : i + ""; }
function _toPrimitive$e(t, r) { if ("object" != _typeof$f(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$f(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$9(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$9(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$9(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Table = function Table(_ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$sortable = _ref.sortable,
    sortable = _ref$sortable === void 0 ? true : _ref$sortable,
    _ref$hoverable = _ref.hoverable,
    hoverable = _ref$hoverable === void 0 ? true : _ref$hoverable,
    _ref$striped = _ref.striped,
    striped = _ref$striped === void 0 ? false : _ref$striped,
    _ref$bordered = _ref.bordered,
    bordered = _ref$bordered === void 0 ? true : _ref$bordered,
    _ref$compact = _ref.compact,
    compact = _ref$compact === void 0 ? false : _ref$compact,
    _ref$onRowClick = _ref.onRowClick,
    onRowClick = _ref$onRowClick === void 0 ? null : _ref$onRowClick,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$9(_ref, _excluded$9);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.TABLE, currentTheme, _objectSpread$9(_objectSpread$9({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var _useState = useState({
      key: null,
      direction: null
    }),
    _useState2 = _slicedToArray$2(_useState, 2),
    sortConfig = _useState2[0],
    setSortConfig = _useState2[1];
  var uuid = getUUID$1("", "table");
  var handleSort = function handleSort(key) {
    if (!sortable) return;
    var direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key: key,
      direction: direction
    });
  };
  var sortedData = useMemo(function () {
    if (!sortConfig.key) return data;
    var sorted = _toConsumableArray(data).sort(function (a, b) {
      var aValue = a[sortConfig.key];
      var bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);
  var paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
  var hoverClass = hoverable ? "hover:opacity-80" : "";
  var borderClass = bordered ? "border" : "";
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "overflow-x-auto ".concat(className),
    children: [/*#__PURE__*/jsxs("table", {
      className: "w-full ".concat(borderClass, " ").concat(styles.borderColor),
      children: [/*#__PURE__*/jsx("thead", {
        className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor),
        children: /*#__PURE__*/jsx("tr", {
          className: "border-b",
          children: columns.map(function (column, index) {
            return /*#__PURE__*/jsx("th", {
              className: "".concat(paddingClass, " text-left ").concat(styles.textColor, " ").concat(sortable && column.sortable !== false ? "cursor-pointer select-none" : ""),
              onClick: function onClick() {
                return column.sortable !== false && handleSort(column.key);
              },
              children: /*#__PURE__*/jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/jsx("span", {
                  children: column.label
                }), sortable && column.sortable !== false && /*#__PURE__*/jsx("span", {
                  className: "text-xs opacity-50",
                  children: sortConfig.key === column.key ? sortConfig.direction === "asc" ? /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-up"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-down"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrows-up-down"
                  })
                })]
              })
            }, index);
          })
        })
      }), /*#__PURE__*/jsx("tbody", {
        children: sortedData.map(function (row, rowIndex) {
          return /*#__PURE__*/jsx("tr", {
            className: "border-b ".concat(styles.borderColor, " ").concat(hoverClass, " ").concat(striped && rowIndex % 2 === 1 ? "opacity-90" : "", " ").concat(onRowClick ? "cursor-pointer" : ""),
            onClick: function onClick() {
              return onRowClick && onRowClick(row);
            },
            children: columns.map(function (column, colIndex) {
              return /*#__PURE__*/jsx("td", {
                className: "".concat(paddingClass, " ").concat(styles.textColor),
                children: column.render ? column.render(row[column.key], row) : row[column.key]
              }, colIndex);
            })
          }, rowIndex);
        })
      })]
    }), sortedData.length === 0 && /*#__PURE__*/jsx("div", {
      className: "text-center ".concat(paddingClass, " ").concat(styles.textColor, " opacity-50"),
      children: "No data available"
    })]
  });
};
var Table2 = function Table2(_ref2) {
  var _ref2$columns = _ref2.columns,
    columns = _ref2$columns === void 0 ? [] : _ref2$columns,
    _ref2$data = _ref2.data,
    data = _ref2$data === void 0 ? [] : _ref2$data,
    _ref2$sortable = _ref2.sortable,
    sortable = _ref2$sortable === void 0 ? true : _ref2$sortable,
    _ref2$hoverable = _ref2.hoverable,
    hoverable = _ref2$hoverable === void 0 ? true : _ref2$hoverable,
    _ref2$striped = _ref2.striped,
    striped = _ref2$striped === void 0 ? false : _ref2$striped,
    _ref2$bordered = _ref2.bordered,
    bordered = _ref2$bordered === void 0 ? true : _ref2$bordered,
    _ref2$compact = _ref2.compact,
    compact = _ref2$compact === void 0 ? false : _ref2$compact,
    _ref2$onRowClick = _ref2.onRowClick,
    onRowClick = _ref2$onRowClick === void 0 ? null : _ref2$onRowClick,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    props = _objectWithoutProperties$9(_ref2, _excluded2$3);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.TABLE_2, currentTheme, _objectSpread$9(_objectSpread$9({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var _useState3 = useState({
      key: null,
      direction: null
    }),
    _useState4 = _slicedToArray$2(_useState3, 2),
    sortConfig = _useState4[0],
    setSortConfig = _useState4[1];
  var uuid = getUUID$1("", "table-2");
  var handleSort = function handleSort(key) {
    if (!sortable) return;
    var direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key: key,
      direction: direction
    });
  };
  var sortedData = useMemo(function () {
    if (!sortConfig.key) return data;
    var sorted = _toConsumableArray(data).sort(function (a, b) {
      var aValue = a[sortConfig.key];
      var bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);
  var paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
  var hoverClass = hoverable ? "hover:opacity-80" : "";
  var borderClass = bordered ? "border" : "";
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "overflow-x-auto ".concat(className),
    children: [/*#__PURE__*/jsxs("table", {
      className: "w-full ".concat(borderClass, " ").concat(styles.borderColor),
      children: [/*#__PURE__*/jsx("thead", {
        className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor),
        children: /*#__PURE__*/jsx("tr", {
          className: "border-b",
          children: columns.map(function (column, index) {
            return /*#__PURE__*/jsx("th", {
              className: "".concat(paddingClass, " text-left ").concat(styles.textColor, " ").concat(sortable && column.sortable !== false ? "cursor-pointer select-none" : ""),
              onClick: function onClick() {
                return column.sortable !== false && handleSort(column.key);
              },
              children: /*#__PURE__*/jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/jsx("span", {
                  children: column.label
                }), sortable && column.sortable !== false && /*#__PURE__*/jsx("span", {
                  className: "text-xs opacity-50",
                  children: sortConfig.key === column.key ? sortConfig.direction === "asc" ? /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-up"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-down"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrows-up-down"
                  })
                })]
              })
            }, index);
          })
        })
      }), /*#__PURE__*/jsx("tbody", {
        children: sortedData.map(function (row, rowIndex) {
          return /*#__PURE__*/jsx("tr", {
            className: "border-b ".concat(styles.borderColor, " ").concat(hoverClass, " ").concat(striped && rowIndex % 2 === 1 ? "opacity-90" : "", " ").concat(onRowClick ? "cursor-pointer" : ""),
            onClick: function onClick() {
              return onRowClick && onRowClick(row);
            },
            children: columns.map(function (column, colIndex) {
              return /*#__PURE__*/jsx("td", {
                className: "".concat(paddingClass, " ").concat(styles.textColor),
                children: column.render ? column.render(row[column.key], row) : row[column.key]
              }, colIndex);
            })
          }, rowIndex);
        })
      })]
    }), sortedData.length === 0 && /*#__PURE__*/jsx("div", {
      className: "text-center ".concat(paddingClass, " ").concat(styles.textColor, " opacity-50"),
      children: "No data available"
    })]
  });
};
var Table3 = function Table3(_ref3) {
  var _ref3$columns = _ref3.columns,
    columns = _ref3$columns === void 0 ? [] : _ref3$columns,
    _ref3$data = _ref3.data,
    data = _ref3$data === void 0 ? [] : _ref3$data,
    _ref3$sortable = _ref3.sortable,
    sortable = _ref3$sortable === void 0 ? true : _ref3$sortable,
    _ref3$hoverable = _ref3.hoverable,
    hoverable = _ref3$hoverable === void 0 ? true : _ref3$hoverable,
    _ref3$striped = _ref3.striped,
    striped = _ref3$striped === void 0 ? false : _ref3$striped,
    _ref3$bordered = _ref3.bordered,
    bordered = _ref3$bordered === void 0 ? true : _ref3$bordered,
    _ref3$compact = _ref3.compact,
    compact = _ref3$compact === void 0 ? false : _ref3$compact,
    _ref3$onRowClick = _ref3.onRowClick,
    onRowClick = _ref3$onRowClick === void 0 ? null : _ref3$onRowClick,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    props = _objectWithoutProperties$9(_ref3, _excluded3$3);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.TABLE_3, currentTheme, _objectSpread$9(_objectSpread$9({}, props), {}, {
    scrollable: false,
    grow: false
  }));
  var _useState5 = useState({
      key: null,
      direction: null
    }),
    _useState6 = _slicedToArray$2(_useState5, 2),
    sortConfig = _useState6[0],
    setSortConfig = _useState6[1];
  var uuid = getUUID$1("", "table-3");
  var handleSort = function handleSort(key) {
    if (!sortable) return;
    var direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key: key,
      direction: direction
    });
  };
  var sortedData = useMemo(function () {
    if (!sortConfig.key) return data;
    var sorted = _toConsumableArray(data).sort(function (a, b) {
      var aValue = a[sortConfig.key];
      var bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);
  var paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
  var hoverClass = hoverable ? "hover:opacity-80" : "";
  var borderClass = bordered ? "border" : "";
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "overflow-x-auto ".concat(className),
    children: [/*#__PURE__*/jsxs("table", {
      className: "w-full ".concat(borderClass, " ").concat(styles.borderColor),
      children: [/*#__PURE__*/jsx("thead", {
        className: "".concat(styles.backgroundColor, " ").concat(styles.borderColor),
        children: /*#__PURE__*/jsx("tr", {
          className: "border-b",
          children: columns.map(function (column, index) {
            return /*#__PURE__*/jsx("th", {
              className: "".concat(paddingClass, " text-left ").concat(styles.textColor, " ").concat(sortable && column.sortable !== false ? "cursor-pointer select-none" : ""),
              onClick: function onClick() {
                return column.sortable !== false && handleSort(column.key);
              },
              children: /*#__PURE__*/jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/jsx("span", {
                  children: column.label
                }), sortable && column.sortable !== false && /*#__PURE__*/jsx("span", {
                  className: "text-xs opacity-50",
                  children: sortConfig.key === column.key ? sortConfig.direction === "asc" ? /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-up"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrow-down"
                  }) : /*#__PURE__*/jsx(FontAwesomeIcon, {
                    icon: "arrows-up-down"
                  })
                })]
              })
            }, index);
          })
        })
      }), /*#__PURE__*/jsx("tbody", {
        children: sortedData.map(function (row, rowIndex) {
          return /*#__PURE__*/jsx("tr", {
            className: "border-b ".concat(styles.borderColor, " ").concat(hoverClass, " ").concat(striped && rowIndex % 2 === 1 ? "opacity-90" : "", " ").concat(onRowClick ? "cursor-pointer" : ""),
            onClick: function onClick() {
              return onRowClick && onRowClick(row);
            },
            children: columns.map(function (column, colIndex) {
              return /*#__PURE__*/jsx("td", {
                className: "".concat(paddingClass, " ").concat(styles.textColor),
                children: column.render ? column.render(row[column.key], row) : row[column.key]
              }, colIndex);
            })
          }, rowIndex);
        })
      })]
    }), sortedData.length === 0 && /*#__PURE__*/jsx("div", {
      className: "text-center ".concat(paddingClass, " ").concat(styles.textColor, " opacity-50"),
      children: "No data available"
    })]
  });
};

function _typeof$e(o) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$e(o); }
function _classCallCheck$4(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$4(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$d(o.key), o); } }
function _createClass$4(e, r, t) { return r && _defineProperties$4(e.prototype, r), t && _defineProperties$4(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey$d(t) { var i = _toPrimitive$d(t, "string"); return "symbol" == _typeof$e(i) ? i : i + ""; }
function _toPrimitive$d(t, r) { if ("object" != _typeof$e(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$e(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper$4(t, o, e) { return o = _getPrototypeOf$4(o), _possibleConstructorReturn$4(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf$4(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$4(t, e) { if (e && ("object" == _typeof$e(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$4(t); }
function _assertThisInitialized$4(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct$4() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$4(t) { return _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf$4(t); }
function _inherits$4(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf$4(t, e); }
function _setPrototypeOf$4(t, e) { return _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$4(t, e); }
var CodeEditorSimple = /*#__PURE__*/function (_React$Component) {
  function CodeEditorSimple() {
    _classCallCheck$4(this, CodeEditorSimple);
    return _callSuper$4(this, CodeEditorSimple, arguments);
  }
  _inherits$4(CodeEditorSimple, _React$Component);
  return _createClass$4(CodeEditorSimple, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/jsx("div", {
        children: "test"
      });
      // const { onChange, code } = this.props;
      // const codeString = JSON.stringify(code);
      // return (
      //   <div className="">
      //     <Editor
      //         value={code}
      //         onValueChange={onChange}
      //         highlight={codeString => highlight(codeString, languages.js)}
      //         padding={10}
      //         style={{
      //             fontFamily: '"Fira code", "Fira Mono", monospace',
      //             fontSize: 14,
      //         }}
      //     />
      //     </div>
      // )
    }
  }]);
}(React.Component);
CodeEditorSimple.defaultProps = {
  onChange: function onChange() {},
  code: ""
};

function _typeof$d(o) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$d(o); }
var _excluded$8 = ["code", "setCode", "uniqueKey", "language", "placeholder", "scrollable", "padding"];
function ownKeys$8(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$8(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$8(Object(t), !0).forEach(function (r) { _defineProperty$9(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$9(e, r, t) { return (r = _toPropertyKey$c(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$c(t) { var i = _toPrimitive$c(t, "string"); return "symbol" == _typeof$d(i) ? i : i + ""; }
function _toPrimitive$c(t, r) { if ("object" != _typeof$d(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$d(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$8(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$8(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$8(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function CodeEditorInline(_ref) {
  var code = _ref.code,
    setCode = _ref.setCode,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? "12345" : _ref$uniqueKey,
    _ref$language = _ref.language,
    language = _ref$language === void 0 ? "js" : _ref$language,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable;
    _ref.padding;
    var props = _objectWithoutProperties$8(_ref, _excluded$8);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, _objectSpread$8(_objectSpread$8({}, props), {}, {
    scrollable: scrollable
  }));
  var placeholderValue = placeholder !== null ? placeholder : "Enter ".concat(language, " code");
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-1 flex-col w-full h-full space-y-4 rounded ".concat(styles.string, " overflow-clip"),
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded w-full h-full ".concat(styles.string),
      children: /*#__PURE__*/jsx("div", {
        className: "bg-inherit h-full ".concat(styles.textColor),
        children: /*#__PURE__*/jsx(CodeEditor, {
          value: code,
          language: language,
          placeholder: placeholderValue,
          onChange: function onChange(evn) {
            return setCode(evn.target.value);
          }
          //padding={15}
          ,
          style: {
            caretColor: "#eeeeee",
            fontSize: "12px",
            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            minHeight: "100%"
          },
          className: styles.string
        })
      })
    })
  }, "code-editor-".concat(uniqueKey));
}

function _typeof$c(o) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$c(o); }
var _excluded$7 = ["code", "onChange", "uniqueKey", "language", "placeholder", "scrollable", "padding", "themeName", "readOnly", "minimapEnabled", "wordWrap"];
function ownKeys$7(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$7(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$7(Object(t), !0).forEach(function (r) { _defineProperty$8(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$8(e, r, t) { return (r = _toPropertyKey$b(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$b(t) { var i = _toPrimitive$b(t, "string"); return "symbol" == _typeof$c(i) ? i : i + ""; }
function _toPrimitive$b(t, r) { if ("object" != _typeof$c(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$c(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$7(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$7(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$7(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
require("monaco-themes").parseTmTheme;

// Save a reference to the original ResizeObserver
var OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver constructor
window.ResizeObserver = function (callback) {
  var wrappedCallback = function wrappedCallback(entries, observer) {
    window.requestAnimationFrame(function () {
      callback(entries, observer);
    });
  };

  // Create an instance of the original ResizeObserver
  // with the wrapped callback
  return new OriginalResizeObserver(wrappedCallback);
};

// Copy over static methods, if any
for (var staticMethod in OriginalResizeObserver) {
  if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
    window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
  }
}
function CodeEditorVS(_ref) {
  var code = _ref.code,
    onChange = _ref.onChange,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? "12345" : _ref$uniqueKey,
    _ref$language = _ref.language,
    language = _ref$language === void 0 ? "js" : _ref$language,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable;
    _ref.padding;
    var _ref$themeName = _ref.themeName,
    themeName = _ref$themeName === void 0 ? "GitHub Dark" : _ref$themeName,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$minimapEnabled = _ref.minimapEnabled,
    minimapEnabled = _ref$minimapEnabled === void 0 ? false : _ref$minimapEnabled,
    _ref$wordWrap = _ref.wordWrap,
    wordWrap = _ref$wordWrap === void 0 ? "on" : _ref$wordWrap,
    props = _objectWithoutProperties$7(_ref, _excluded$7);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, _objectSpread$7(_objectSpread$7({}, props), {}, {
    scrollable: scrollable
  }));
  function handleEditorDidMount(editor, monaco) {
    editor.focus();
    if (monaco) {
      try {
        import("monaco-themes/themes/".concat(themeName, ".json")).then(function (data) {
          monaco.editor.defineTheme("code-theme", data);
        }).then(function (_) {
          return monaco.editor.setTheme("code-theme");
        })["catch"](function (e) {
          return (void 0);
        });
      } catch (e) {
      }
    }
  }
  var placeholderValue = placeholder !== null ? placeholder : "Enter ".concat(language, " code");
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-1 flex-col w-full h-full space-y-4 rounded ".concat(styles.string, " overflow-clip"),
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded w-full h-full ".concat(styles.string),
      children: /*#__PURE__*/jsx("div", {
        className: "bg-inherit h-full ".concat(styles.textColor),
        children: /*#__PURE__*/jsx(Editor, {
          value: code,
          language: language,
          placeholder: placeholderValue,
          height: "90vh",
          width: "100%",
          onChange: onChange,
          onMount: handleEditorDidMount,
          options: {
            minimap: {
              enabled: minimapEnabled
            },
            readOnly: readOnly,
            wordWrap: wordWrap
          }
        })
      })
    })
  }, "code-editor-".concat(uniqueKey));
}

var CodeRenderer = function CodeRenderer(_ref) {
  var template = _ref.template,
    data = _ref.data,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? "div" : _ref$Component;
  var parsedTemplate = typeof template !== "string" ? JSON.stringify(template) : template;
  var parsedData = typeof data === "string" ? JSON.parse(data) : data;
  /**
   * sanitize any args, params that need to be updated/translated
   */
  function sanitizeTemplate(template) {
    // remove the escaped double quotes if any
    var t = template.replace(/\\"/g, '"');
    t = translateClassName("".concat(t));
    return "".concat(t);
  }
  function translateClassName(template) {
    return template.replaceAll("className=", "class=");
  }
  function compileTemplate(template, data) {
    try {
      // lazy template compiling
      var __html = Mustache.render(sanitizeTemplate(template), parsedData);
      return /*#__PURE__*/jsx(Component, {
        dangerouslySetInnerHTML: {
          __html: "".concat(__html)
        }
      });
    } catch (e) {
      return /*#__PURE__*/jsx(Component, {
        dangerouslySetInnerHTML: {
          __html: sanitizeTemplate('<div className="text-red-600 font-bold">Something is wonky...</div>')
        }
      });
    }
  }
  return compileTemplate(parsedTemplate);
};

function _typeof$b(o) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$b(o); }
var _excluded$6 = ["text", "textSize", "onClick", "className"],
  _excluded2$2 = ["text", "textSize", "onClick", "className"],
  _excluded3$2 = ["text", "textSize", "onClick", "className"];
function ownKeys$6(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$6(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$6(Object(t), !0).forEach(function (r) { _defineProperty$7(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$7(e, r, t) { return (r = _toPropertyKey$a(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$a(t) { var i = _toPrimitive$a(t, "string"); return "symbol" == _typeof$b(i) ? i : i + ""; }
function _toPrimitive$a(t, r) { if ("object" != _typeof$b(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$b(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$6(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$6(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$6(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Tag = function Tag(_ref) {
  var text = _ref.text,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-sm" : _ref$textSize,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$6(_ref, _excluded$6);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG, currentTheme, _objectSpread$6(_objectSpread$6({}, props), {}, {
    grow: false
  }));

  // maybe we need to apply the className IF this exists?
  // only allow the user to change the "style" not the structure
  var stylesCalculated = className !== "" ? className : "".concat(styles.string, " font-medium rounded ").concat(onClick !== null && "cursor-pointer", " ").concat(textSize);
  var uuid = getUUID$1("", "tag");
  return /*#__PURE__*/jsx("span", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row w-fit ".concat(stylesCalculated, " px-3 py-1.5 whitespace-nowrap items-center justify-center"),
    children: text
  });
};
var Tag2 = function Tag2(_ref2) {
  var text = _ref2.text,
    _ref2$textSize = _ref2.textSize,
    textSize = _ref2$textSize === void 0 ? "text-xs" : _ref2$textSize,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    props = _objectWithoutProperties$6(_ref2, _excluded2$2);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG_2, currentTheme, _objectSpread$6(_objectSpread$6({}, props), {}, {
    grow: false
  }));

  // maybe we need to apply the className IF this exists?
  // only allow the user to change the "style" not the structure
  // maybe we need to apply the className IF this exists?
  // only allow the user to change the "style" not the structure
  var stylesCalculated = className !== "" ? className : "".concat(styles.string, " font-medium rounded ").concat(onClick !== null && "cursor-pointer", " ").concat(textSize);
  var uuid = getUUID$1("", "tag-2");
  return /*#__PURE__*/jsx("span", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row w-fit ".concat(stylesCalculated, " px-2 py-1 whitespace-nowrap items-center justify-center"),
    children: text
  });
};
var Tag3 = function Tag3(_ref3) {
  var text = _ref3.text,
    _ref3$textSize = _ref3.textSize,
    textSize = _ref3$textSize === void 0 ? "text-xs" : _ref3$textSize,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    props = _objectWithoutProperties$6(_ref3, _excluded3$2);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG_3, currentTheme, _objectSpread$6(_objectSpread$6({}, props), {}, {
    grow: false
  }));

  // maybe we need to apply the className IF this exists?
  // only allow the user to change the "style" not the structure
  var stylesCalculated = className !== "" ? className : "".concat(styles.string, " font-normal rounded ").concat(onClick !== null && "cursor-pointer", " ").concat(textSize);
  var uuid = getUUID$1("", "tag-3");
  return /*#__PURE__*/jsx("span", {
    id: uuid,
    onClick: onClick,
    className: "flex flex-row w-fit ".concat(stylesCalculated, " px-1.5 py-0.5 whitespace-nowrap items-center justify-center"),
    children: text
  });
};

var Container = function Container(_ref) {
  var id = _ref.id,
    children = _ref.children,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "row" : _ref$direction,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-full min-h-fit" : _ref$height;
    _ref.debug;
    var _ref$onMouseOver = _ref.onMouseOver,
    onMouseOver = _ref$onMouseOver === void 0 ? null : _ref$onMouseOver,
    _ref$onMouseOut = _ref.onMouseOut,
    onMouseOut = _ref$onMouseOut === void 0 ? null : _ref$onMouseOut;
  // determine the classes based on the props...
  var directionStyle = direction === "row" ? "flex-row space-x-2" : "flex-col space-y-2";
  var scrollStyle = scrollable === true ? "scrollbar overflow-y-scroll" : "overflow-clip";
  var widthStyle = width;
  var heightStyle = scrollable === true ? height : height;

  // since we do not have a layout container we can create an id like so
  var uuid = getUUID(id, "container");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "flex ".concat(directionStyle, " ").concat(scrollStyle, " ").concat(widthStyle, " ").concat(heightStyle, " ").concat(className),
    children: children
  });
};

function ErrorMessage(_ref) {
  var title = _ref.title,
    onClose = _ref.onClose;
  return /*#__PURE__*/jsx("div", {
    onClick: onClose,
    className: "flex flex-row w-full p-4 2xl:px-6 2xl:py-4 text-2xl xl:text3xl bg-indigo-700 opacity-75 rounded text-gray-300 dark:bg-indigo-800 dark:text-gray-200 font-bold",
    children: JSON.stringify(title)
  });
}

function _typeof$a(o) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$a(o); }
function _classCallCheck$3(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$3(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$9(o.key), o); } }
function _createClass$3(e, r, t) { return r && _defineProperties$3(e.prototype, r), t && _defineProperties$3(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey$9(t) { var i = _toPrimitive$9(t, "string"); return "symbol" == _typeof$a(i) ? i : i + ""; }
function _toPrimitive$9(t, r) { if ("object" != _typeof$a(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$a(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper$3(t, o, e) { return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$3(t, e) { if (e && ("object" == _typeof$a(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$3(t); }
function _assertThisInitialized$3(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$3(t) { return _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf$3(t); }
function _inherits$3(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf$3(t, e); }
function _setPrototypeOf$3(t, e) { return _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$3(t, e); }
/*#__PURE__*/(function (_React$Component) {
  function Footer() {
    _classCallCheck$3(this, Footer);
    return _callSuper$3(this, Footer, arguments);
  }
  _inherits$3(Footer, _React$Component);
  return _createClass$3(Footer, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-row p-4 bg-gray-200 dark:bg-gray-900 w-full justify-center mt-auto text-xs text-center items-center",
        children: /*#__PURE__*/jsx("span", {
          className: "text-gray-300 dark:text-gray-600"
        })
      });
    }
  }]);
})(React.Component);

function _typeof$9(o) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$9(o); }
function ownKeys$5(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$5(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$5(Object(t), !0).forEach(function (r) { _defineProperty$6(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$6(e, r, t) { return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$8(t) { var i = _toPrimitive$8(t, "string"); return "symbol" == _typeof$9(i) ? i : i + ""; }
function _toPrimitive$8(t, r) { if ("object" != _typeof$9(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$9(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var withRouter = function withRouter(Component) {
  var Wrapper = function Wrapper(props) {
    var navigate = useNavigate();
    var location = useLocation();
    var params = useParams();
    return /*#__PURE__*/jsx(Component, _objectSpread$5({
      navigate: navigate,
      location: location,
      params: params
    }, props));
  };
  return Wrapper;
};

function _typeof$8(o) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$8(o); }
function _classCallCheck$2(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$2(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$7(o.key), o); } }
function _createClass$2(e, r, t) { return r && _defineProperties$2(e.prototype, r), t && _defineProperties$2(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper$2(t, o, e) { return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$2(t, e) { if (e && ("object" == _typeof$8(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$2(t); }
function _assertThisInitialized$2(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$2(t) { return _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf$2(t); }
function _inherits$2(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf$2(t, e); }
function _setPrototypeOf$2(t, e) { return _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$2(t, e); }
function _defineProperty$5(e, r, t) { return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$7(t) { var i = _toPrimitive$7(t, "string"); return "symbol" == _typeof$8(i) ? i : i + ""; }
function _toPrimitive$7(t, r) { if ("object" != _typeof$8(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$8(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var mainApi = window.mainApi;
/*#__PURE__*/(function (_React$Component) {
  function Header() {
    var _this;
    _classCallCheck$2(this, Header);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$2(this, Header, [].concat(args));
    _defineProperty$5(_this, "handleClickHome", function () {
      _this.props.navigate("/applications");
    });
    _defineProperty$5(_this, "handleClickApplications", function () {
      _this.props.navigate("/applications");
    });
    return _this;
  }
  _inherits$2(Header, _React$Component);
  return _createClass$2(Header, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var current = this.props.current;
      var selectedAppId = mainApi.getappId();
      var selectedIndexName = mainApi.getIndexName();
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-row p-4 bg-gray-900 w-full justify-between text-gray-100 text-xs space-x-2",
        children: /*#__PURE__*/jsx("nav", {
          className: "flex",
          "aria-label": "Breadcrumb",
          children: /*#__PURE__*/jsxs("ol", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/jsx("li", {
              children: /*#__PURE__*/jsxs("div", {
                onClick: this.handleClickHome,
                className: "cursor-pointer px-2",
                children: [/*#__PURE__*/jsx("svg", {
                  className: "flex-shrink-0 h-4 w-4",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /*#__PURE__*/jsx("path", {
                    d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  })
                }), /*#__PURE__*/jsx("span", {
                  className: "sr-only",
                  onClick: this.handleClickHome,
                  children: "Home"
                })]
              })
            }), selectedAppId !== undefined && /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx("li", {
                children: /*#__PURE__*/jsx("div", {
                  className: "flex items-center",
                  children: /*#__PURE__*/jsx("svg", {
                    className: "flex-shrink-0 h-3 w-3 text-gray-300",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/jsx("path", {
                      d: "M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                    })
                  })
                })
              }), /*#__PURE__*/jsx("li", {
                children: /*#__PURE__*/jsx("div", {
                  onClick: function onClick() {
                    return _this2.props.navigate("/applications/".concat(selectedAppId));
                  },
                  className: "text-xs font-bold text-gray-200 cursor-pointer",
                  children: selectedAppId
                })
              })]
            }), selectedIndexName !== undefined && /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx("li", {
                children: /*#__PURE__*/jsx("div", {
                  className: "flex items-center",
                  children: /*#__PURE__*/jsx("svg", {
                    className: "flex-shrink-0 h-3 w-3 text-gray-300",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/jsx("path", {
                      d: "M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                    })
                  })
                })
              }), /*#__PURE__*/jsx("li", {
                children: /*#__PURE__*/jsx("div", {
                  onClick: function onClick() {
                    return (void 0);
                  },
                  className: "text-xs font-bold text-gray-200 cursor-pointer",
                  children: selectedIndexName
                })
              })]
            }), /*#__PURE__*/jsx("li", {
              children: /*#__PURE__*/jsx("div", {
                className: "flex items-center",
                children: current !== "" && /*#__PURE__*/jsx("svg", {
                  className: "flex-shrink-0 h-3 w-3 text-gray-300",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  "aria-hidden": "true",
                  children: /*#__PURE__*/jsx("path", {
                    d: "M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                  })
                })
              })
            }), /*#__PURE__*/jsx("li", {
              children: /*#__PURE__*/jsx("div", {
                className: "text-xs font-bold text-gray-200",
                children: current
              })
            })]
          })
        })
      });
    }
  }]);
})(React.Component);

var MainSection = function MainSection(_ref) {
  var children = _ref.children,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor;
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;

  // we have to parse out all of the color overrides if they exist.
  function backgroundColorStyle() {
    return backgroundColor !== null ? backgroundColor : currentTheme ? currentTheme["bg-primary-very-dark"] : "bg-black";
  }
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col ".concat(backgroundColorStyle(), " h-full overflow-clip w-full p-0 m-0"),
    children: children
  });
};

function _typeof$7(o) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$7(o); }
function _classCallCheck$1(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties$1(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$6(o.key), o); } }
function _createClass$1(e, r, t) { return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey$6(t) { var i = _toPrimitive$6(t, "string"); return "symbol" == _typeof$7(i) ? i : i + ""; }
function _toPrimitive$6(t, r) { if ("object" != _typeof$7(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$7(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn$1(t, e) { if (e && ("object" == _typeof$7(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized$1(t); }
function _assertThisInitialized$1(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf$1(t) { return _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf$1(t); }
function _inherits$1(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf$1(t, e); }
function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
var SubHeader = /*#__PURE__*/function (_React$Component) {
  function SubHeader() {
    _classCallCheck$1(this, SubHeader);
    return _callSuper$1(this, SubHeader, arguments);
  }
  _inherits$1(SubHeader, _React$Component);
  return _createClass$1(SubHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        buttonTitle = _this$props.buttonTitle,
        onClick = _this$props.onClick,
        buttonColor = _this$props.buttonColor,
        buttonTextColor = _this$props.buttonTextColor;
      return /*#__PURE__*/jsxs("div", {
        className: "flex flex-row items-center justify-between p-2 px-4 text-gray-200 text-sm font-bold bg-gray-800 border-b border-gray-900",
        children: [/*#__PURE__*/jsx("span", {
          className: "",
          children: title
        }), buttonTitle !== "" && /*#__PURE__*/jsx("button", {
          onClick: onClick,
          className: "".concat(buttonColor, " ").concat(buttonTextColor, " rounded px-2 py-1 text-xs font-bold"),
          children: buttonTitle
        })]
      });
    }
  }]);
}(React.Component);
SubHeader.defaultProps = {
  onClick: function onClick() {},
  onClickCreate: function onClickCreate() {},
  title: "",
  buttonTitle: "",
  buttonColor: "bg-gray-700",
  buttonTextColor: "text-gray-200"
};

function _typeof$6(o) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$6(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$5(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$6(i) ? i : i + ""; }
function _toPrimitive$5(t, r) { if ("object" != _typeof$6(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$6(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof$6(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var MainContent = /*#__PURE__*/function (_React$Component) {
  function MainContent() {
    _classCallCheck(this, MainContent);
    return _callSuper(this, MainContent, arguments);
  }
  _inherits(MainContent, _React$Component);
  return _createClass(MainContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        horizontal = _this$props.horizontal,
        padding = _this$props.padding;
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-1 flex-col bg-gray-700 h-full w-full overflow-clip",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex ".concat(horizontal === true ? "flex-row space-x-4" : "flex-col space-y-4", " w-full h-full bg-gray-900 rounded-sm overflow-y-auto ").concat(padding === true ? "p-4" : "p-0"),
          children: [title && /*#__PURE__*/jsx("div", {
            className: "flex w-full p-2 text-gray-200",
            children: title
          }), this.props.children]
        })
      });
    }
  }]);
}(React.Component);
MainContent.defaultProps = {
  title: null,
  horizontal: false,
  padding: true
};

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
var _excluded$5 = ["title", "textSize", "fontWeight"];
function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty$4(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$4(e, r, t) { return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$5(i) ? i : i + ""; }
function _toPrimitive$4(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$5(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$5(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$5(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var FormLabel = function FormLabel(_ref) {
  var title = _ref.title,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? null : _ref$textSize,
    _ref$fontWeight = _ref.fontWeight,
    fontWeight = _ref$fontWeight === void 0 ? "font-medium" : _ref$fontWeight,
    props = _objectWithoutProperties$5(_ref, _excluded$5);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$4({}, props));
  var textSizeCalc = textSize !== null ? textSize : "text-base 2xl:text-lg";
  return /*#__PURE__*/jsx("label", {
    className: "".concat(fontWeight, " ").concat(textSizeCalc, " ").concat(styles.string),
    children: title
  });
};

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
var _excluded$4 = ["name", "onChange", "selectedValue", "children", "textSize"];
function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty$3(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$3(e, r, t) { return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$4(i) ? i : i + ""; }
function _toPrimitive$3(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$4(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$4(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$4(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SelectMenu = function SelectMenu(_ref) {
  var name = _ref.name,
    onChange = _ref.onChange,
    selectedValue = _ref.selectedValue,
    children = _ref.children,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-base" : _ref$textSize,
    props = _objectWithoutProperties$4(_ref, _excluded$4);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, _objectSpread$3(_objectSpread$3({}, props), {}, {
    height: "",
    grow: false
  }));
  return /*#__PURE__*/jsx("select", {
    className: "p-2 rounded ".concat(styles.string, " ").concat(textSize, " font-normal focus:outline-none cursor-pointer min-w-lg w-full"),
    name: name,
    onChange: onChange,
    value: selectedValue,
    children: children
  });
};

var _excluded$3 = ["id", "placeholder", "disabled", "onQueryChange"];
function _objectWithoutProperties$3(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$3(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$3(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AlgoliaSearchBox = function AlgoliaSearchBox(_ref) {
  _ref.id;
    var _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Search" : _ref$placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$onQueryChange = _ref.onQueryChange,
    onQueryChange = _ref$onQueryChange === void 0 ? null : _ref$onQueryChange,
    props = _objectWithoutProperties$3(_ref, _excluded$3);
  var _useSearchBox = useSearchBox(props),
    currentRefinement = _useSearchBox.currentRefinement,
    refine = _useSearchBox.refine;
    _useSearchBox.queryHook;
    var query = _useSearchBox.query;
  // const { workspaceData } = useContext(WorkspaceContext);
  // const { widgetData } = useContext(WidgetContext);

  useEffect(function () {
    onQueryChange && onQueryChange(query);
  }, [query]);
  return /*#__PURE__*/jsx(LayoutContainer, {
    height: "",
    grow: false,
    space: false,
    children: /*#__PURE__*/jsx(InputText, {
      type: "search",
      value: currentRefinement,
      onChange: function onChange(event) {
        return refine(event.currentTarget.value);
      },
      disabled: disabled,
      placeholder: placeholder
    })
  });
};

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
var _excluded$2 = ["width", "height", "scrollable"];
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty$2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$2(e, r, t) { return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
function _toPrimitive$2(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$2(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$2(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$2(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AlgoliaRefinementList = function AlgoliaRefinementList(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-auto" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-full" : _ref$height;
    _ref.scrollable;
    var props = _objectWithoutProperties$2(_ref, _excluded$2);
  // return null;
  var attribute = props.attribute;
  var _useRefinementList = useRefinementList(_objectSpread$2({
      attribute: "tags"
    }, props)),
    items = _useRefinementList.items,
    refine = _useRefinementList.refine;
  return attribute && attribute !== "" && /*#__PURE__*/jsx("div", {
    className: "flex flex-col ".concat(width, " ").concat(height),
    children: /*#__PURE__*/jsx("ul", {
      className: "flex flex-col space-y-1",
      children: items.map(function (item) {
        return /*#__PURE__*/jsxs("li", {
          className: "px-2 py-1 cursor-pointer hover:text-indigo-600 hover:bg-gray-800 rounded justify-between flex flex-row xl:flex-row w-full",
          onClick: function onClick(event) {
            event.preventDefault();
            refine(item.value);
          },
          children: [/*#__PURE__*/jsx("span", {
            className: "text-sm text-gray-300 hover:text-indigo-500 ".concat(item.isRefined && "font-bold text-green-500"),
            children: item.label
          }), /*#__PURE__*/jsx(Tag, {
            text: item.count,
            color: "bg-gray-700",
            textSize: "text-xs"
          })]
        }, item.label);
      })
    })
  });
};

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
var _excluded$1 = ["title", "ping"],
  _excluded2$1 = ["children", "height", "width", "scrollable"],
  _excluded3$1 = ["children"],
  _excluded4 = ["children", "height", "width", "scrollable"],
  _excluded5 = ["title", "ping"],
  _excluded6 = ["children", "height", "width", "scrollable"],
  _excluded7 = ["children"],
  _excluded8 = ["children", "height", "width", "scrollable"],
  _excluded9 = ["title", "ping"],
  _excluded0 = ["children", "width", "height", "scrollable"],
  _excluded1 = ["children"],
  _excluded10 = ["children", "height", "width", "scrollable"];
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(e, r, t) { return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
function _toPrimitive$1(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties$1(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose$1(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose$1(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DashPanelHeader = function DashPanelHeader(_ref) {
  var title = _ref.title,
    _ref$ping = _ref.ping,
    ping = _ref$ping === void 0 ? false : _ref$ping,
    props = _objectWithoutProperties$1(_ref, _excluded$1);
  var _useContext = useContext(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_HEADER, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "dash-panel-header");
  return /*#__PURE__*/jsxs("div", {
    id: uuid,
    className: "flex flex-row rounded-t p-2 border-b justify-between items-center ".concat(styles.string),
    children: [/*#__PURE__*/jsx("span", {
      className: "uppercase text-xs font-bold ".concat(styles.textColor),
      children: title
    }), ping && /*#__PURE__*/jsxs("span", {
      className: "relative flex h-3 w-3",
      children: [/*#__PURE__*/jsx("span", {
        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
      }), /*#__PURE__*/jsx("span", {
        className: "relative inline-flex rounded-full h-3 w-3 bg-green-600"
      })]
    })]
  });
};
var DashPanelBody = function DashPanelBody(_ref2) {
  var children = _ref2.children,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? "h-fit" : _ref2$height,
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? "w-full" : _ref2$width,
    _ref2$scrollable = _ref2.scrollable,
    scrollable = _ref2$scrollable === void 0 ? true : _ref2$scrollable,
    props = _objectWithoutProperties$1(_ref2, _excluded2$1);
  var _useContext2 = useContext(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    width: width,
    height: height,
    scrollable: scrollable,
    direction: "col",
    space: false
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$1(_objectSpread$1({}, props), {}, {
    prefix: "dash-panel-body",
    className: "".concat(styles.string, " p-4"),
    scrollable: scrollable,
    width: width,
    height: height,
    space: false,
    direction: "col",
    grow: true,
    children: children
  }));
};
var DashPanelFooter = function DashPanelFooter(_ref3) {
  var children = _ref3.children,
    props = _objectWithoutProperties$1(_ref3, _excluded3$1);
  var _useContext3 = useContext(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_FOOTER, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  // since we do not have a layout container we can create an id like so
  var uuid = getUUID$1("", "dash-panel-footer");
  return /*#__PURE__*/jsx("div", {
    id: uuid,
    className: "flex flex-row rounded-b p-2 border-t justify-between items-center text-xs uppercase font-bold ".concat(styles.string),
    children: children
  });
};
var DashPanel = function DashPanel(_ref4) {
  var children = _ref4.children,
    _ref4$height = _ref4.height,
    height = _ref4$height === void 0 ? "h-fit" : _ref4$height,
    _ref4$width = _ref4.width,
    width = _ref4$width === void 0 ? "w-full" : _ref4$width,
    _ref4$scrollable = _ref4.scrollable,
    scrollable = _ref4$scrollable === void 0 ? false : _ref4$scrollable,
    props = _objectWithoutProperties$1(_ref4, _excluded4);
  var _useContext4 = useContext(ThemeContext),
    currentTheme = _useContext4.currentTheme;
  getStylesForItem(themeObjects.DASH_PANEL, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    width: width,
    height: height,
    scrollable: scrollable
  }));
  return /*#__PURE__*/jsx(Panel, {
    padding: false,
    scrollable: scrollable,
    height: height,
    width: width,
    children: children
  });
};
DashPanel.Header = DashPanelHeader;
DashPanel.Body = DashPanelBody;
DashPanel.Footer = DashPanelFooter;
var DashPanelHeader2 = function DashPanelHeader2(_ref5) {
  var title = _ref5.title,
    _ref5$ping = _ref5.ping,
    ping = _ref5$ping === void 0 ? false : _ref5$ping,
    props = _objectWithoutProperties$1(_ref5, _excluded5);
  var _useContext5 = useContext(ThemeContext),
    currentTheme = _useContext5.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_HEADER_2, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-row rounded-t p-2 border-b justify-between items-center ".concat(styles.string),
    children: [/*#__PURE__*/jsx("span", {
      className: "uppercase text-xs font-bold ".concat(styles.textColor),
      children: title
    }), ping && /*#__PURE__*/jsxs("span", {
      className: "relative flex h-3 w-3",
      children: [/*#__PURE__*/jsx("span", {
        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
      }), /*#__PURE__*/jsx("span", {
        className: "relative inline-flex rounded-full h-3 w-3 bg-green-600"
      })]
    })]
  });
};
var DashPanelBody2 = function DashPanelBody2(_ref6) {
  var children = _ref6.children,
    _ref6$height = _ref6.height,
    height = _ref6$height === void 0 ? "h-full" : _ref6$height,
    _ref6$width = _ref6.width,
    width = _ref6$width === void 0 ? "w-full" : _ref6$width,
    _ref6$scrollable = _ref6.scrollable,
    scrollable = _ref6$scrollable === void 0 ? false : _ref6$scrollable,
    props = _objectWithoutProperties$1(_ref6, _excluded6);
  var _useContext6 = useContext(ThemeContext),
    currentTheme = _useContext6.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    scrollable: scrollable,
    height: "h-full",
    width: width
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$1(_objectSpread$1({}, props), {}, {
    className: "".concat(styles.string, " p-4"),
    scrollable: scrollable,
    width: width,
    height: height,
    direction: "col",
    space: false,
    children: children
  }));
};
var DashPanelFooter2 = function DashPanelFooter2(_ref7) {
  var children = _ref7.children,
    props = _objectWithoutProperties$1(_ref7, _excluded7);
  var _useContext7 = useContext(ThemeContext),
    currentTheme = _useContext7.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_FOOTER_2, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row rounded-b p-2 border-t justify-between items-center ".concat(styles.string),
    children: children
  });
};
var DashPanel2 = function DashPanel2(_ref8) {
  var children = _ref8.children,
    _ref8$height = _ref8.height,
    height = _ref8$height === void 0 ? "h-full" : _ref8$height,
    _ref8$width = _ref8.width,
    width = _ref8$width === void 0 ? "w-full" : _ref8$width,
    _ref8$scrollable = _ref8.scrollable,
    scrollable = _ref8$scrollable === void 0 ? false : _ref8$scrollable,
    props = _objectWithoutProperties$1(_ref8, _excluded8);
  var _useContext8 = useContext(ThemeContext),
    currentTheme = _useContext8.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: height,
    width: width,
    scrollable: scrollable
  }));
  return /*#__PURE__*/jsx(Panel2, _objectSpread$1(_objectSpread$1({}, styles), {}, {
    padding: false,
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col h-full",
      children: children
    })
  }));
};
DashPanel2.Header = DashPanelHeader2;
DashPanel2.Body = DashPanelBody2;
DashPanel2.Footer = DashPanelFooter2;
var DashPanelHeader3 = function DashPanelHeader3(_ref9) {
  var title = _ref9.title,
    _ref9$ping = _ref9.ping,
    ping = _ref9$ping === void 0 ? false : _ref9$ping,
    props = _objectWithoutProperties$1(_ref9, _excluded9);
  var _useContext9 = useContext(ThemeContext),
    currentTheme = _useContext9.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_HEADER_3, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-row rounded-t p-2 border-b justify-between items-center ".concat(styles.string),
    children: [/*#__PURE__*/jsx("span", {
      className: "uppercase text-xs font-bold ".concat(styles.textColor),
      children: title
    }), ping && /*#__PURE__*/jsxs("span", {
      className: "relative flex h-3 w-3",
      children: [/*#__PURE__*/jsx("span", {
        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
      }), /*#__PURE__*/jsx("span", {
        className: "relative inline-flex rounded-full h-3 w-3 bg-green-600"
      })]
    })]
  });
};
var DashPanelBody3 = function DashPanelBody3(_ref0) {
  var children = _ref0.children,
    _ref0$width = _ref0.width,
    width = _ref0$width === void 0 ? "w-full" : _ref0$width,
    _ref0$height = _ref0.height,
    height = _ref0$height === void 0 ? "h-full" : _ref0$height,
    _ref0$scrollable = _ref0.scrollable,
    scrollable = _ref0$scrollable === void 0 ? false : _ref0$scrollable,
    props = _objectWithoutProperties$1(_ref0, _excluded0);
  var _useContext0 = useContext(ThemeContext),
    currentTheme = _useContext0.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    width: width,
    height: height,
    scrollable: scrollable
  }));
  return /*#__PURE__*/jsx(LayoutContainer, _objectSpread$1(_objectSpread$1({}, props), {}, {
    className: "".concat(styles.string, " p-4"),
    scrollable: scrollable,
    width: width,
    height: height,
    children: children
  }));
};
var DashPanelFooter3 = function DashPanelFooter3(_ref1) {
  var children = _ref1.children,
    props = _objectWithoutProperties$1(_ref1, _excluded1);
  var _useContext1 = useContext(ThemeContext),
    currentTheme = _useContext1.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_FOOTER_3, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    height: "h-fit",
    grow: false
  }));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row rounded-b p-2 border-t justify-between items-center text-xs uppercase font-bold ".concat(styles.string),
    children: children
  });
};
var DashPanel3 = function DashPanel3(_ref10) {
  var children = _ref10.children,
    _ref10$height = _ref10.height,
    height = _ref10$height === void 0 ? "h-full" : _ref10$height,
    _ref10$width = _ref10.width,
    width = _ref10$width === void 0 ? "w-full" : _ref10$width,
    _ref10$scrollable = _ref10.scrollable,
    scrollable = _ref10$scrollable === void 0 ? false : _ref10$scrollable,
    props = _objectWithoutProperties$1(_ref10, _excluded10);
  var _useContext10 = useContext(ThemeContext),
    currentTheme = _useContext10.currentTheme;
  var styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, _objectSpread$1(_objectSpread$1({}, props), {}, {
    width: width,
    height: height,
    scrollable: scrollable
  }));
  return /*#__PURE__*/jsx(Panel3, _objectSpread$1(_objectSpread$1({}, styles), {}, {
    padding: false,
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col h-full bg-inherit",
      children: children
    })
  }));
};
DashPanel3.Header = DashPanelHeader3;
DashPanel3.Body = DashPanelBody3;
DashPanel3.Footer = DashPanelFooter3;

function _slicedToArray$1(r, e) { return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(r) { if (Array.isArray(r)) return r; }
function DragComponent(_ref) {
  var obj = _ref.obj,
    id = _ref.id,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "layout-widget" : _ref$type,
    _ref$parent = _ref.parent,
    parent = _ref$parent === void 0 ? 0 : _ref$parent,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    height = _ref.height,
    children = _ref.children,
    onDropItem = _ref.onDropItem;
    _ref.onDragItem;
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2);
    _useState2[0];
    _useState2[1];
  var _useDrag = useDrag(function () {
      return {
        type: type,
        item: {
          id: id,
          type: type,
          parent: parent,
          obj: obj
        },
        collect: function collect(monitor, props) {
          // console.log("collect ", monitor.getItem());
          // alert the parent that we are dragging
          // onDragItem(monitor.getItem());
          return {
            isDragging: monitor.isDragging(),
            sourceIndex: monitor.sourceIndex,
            item: monitor.getItem()
          };
        },
        end: function end(item, monitor) {
          var dropResult = monitor.getDropResult();
          //console.log("drop result ", dropResult);
          if (item && dropResult) {
            // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
            // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
            // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
            onDropItem({
              itemDropped: item,
              sourceIndex: item.id,
              dropIndex: dropResult.id,
              layoutId: dropResult.type,
              parentIndex: item.parent
            });
          }
        }
      };
    }),
    _useDrag2 = _slicedToArray$1(_useDrag, 3),
    collected = _useDrag2[0],
    drag = _useDrag2[1],
    dragPreview = _useDrag2[2];
  return collected.isDragging ? /*#__PURE__*/jsx("div", {
    ref: dragPreview,
    className: "h-full flex flex-col min-h-fit w-full",
    children: children
  }) : /*#__PURE__*/jsx("div", {
    ref: drag,
    id: collected.id,
    type: collected.type,
    className: "scale-100 flex flex-col ".concat(width, " min-w-xl rounded min-h-fit ").concat(height, " z-10"),
    style: {
      animationDelay: "-.75s",
      animationDuration: ".25s"
    },
    children: children
  });
}

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function DropComponent(_ref) {
  var item = _ref.item,
    id = _ref.id,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "layout-widget" : _ref$type,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
    _ref.onDropItem;
    var width = _ref.width,
    height = _ref.height;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    var setHasDropped = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2);
    _useState4[0];
    var setHasDroppedOnChild = _useState4[1];
  var _useDrop = useDrop({
      accept: type,
      drop: function drop(_item, monitor) {
        var didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        return {
          id: id,
          type: type,
          dropIndex: id,
          obj: item
        };
      },
      // the id and the type AGAIN of the item for dropping
      canDrop: function canDrop(obj) {
        return obj.id !== 1 && item.canHaveChildren === true;
      },
      // this will cause the elements that are droppable to be styles (if we choose!)

      collect: function collect(monitor) {
        // console.log(monitor);
        return {
          isOver: monitor.isOver(),
          // canDrop: monitor.canDrop(),
          isDragging: monitor.isDragging,
          isOverCurrent: monitor.isOver({
            shallow: true
          })
        };
      }
    }, [setHasDropped, setHasDroppedOnChild]),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    _useDrop2$ = _useDrop2[0],
    isOver = _useDrop2$.isOver,
    isOverCurrent = _useDrop2$.isOverCurrent,
    canDrop = _useDrop2$.canDrop,
    drop = _useDrop2[1];
  return /*#__PURE__*/jsxs("div", {
    ref: drop,
    id: id,
    className: "flex flex-col drop-component relative cursor-pointer rounded min-w-lg ".concat(width, " ").concat(height, " ").concat(isOverCurrent ? "opacity-50 border-2 border-yellow-500" : "opacity-100 border-2 border-none", " "),
    children: [children, canDrop === true && isOverCurrent === true && isOver === true && /*#__PURE__*/jsx("div", {
      className: "absolute inset-0 flex justify-center items-center z-10 bg-green-600 w-full h-full rounded opacity-100",
      children: /*#__PURE__*/jsx("p", {
        className: "text-2xl font-bold",
        children: "Drop Me"
      })
    })]
  });
}

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
var _excluded = ["children", "border", "className"],
  _excluded2 = ["children", "border", "className"],
  _excluded3 = ["children", "border", "className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Menu = function Menu(_ref) {
  var children = _ref.children;
    _ref.border;
    var _ref$className = _ref.className,
    className = _ref$className === void 0 ? "space-y-2" : _ref$className,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/jsx(Panel, _objectSpread(_objectSpread({}, props), {}, {
    className: className,
    children: children
  }));
};
var Menu2 = function Menu2(_ref2) {
  var children = _ref2.children;
    _ref2.border;
    var _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "space-y-2" : _ref2$className,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/jsx(Panel2, _objectSpread(_objectSpread({}, props), {}, {
    className: className,
    children: children
  }));
};
var Menu3 = function Menu3(_ref3) {
  var children = _ref3.children;
    _ref3.border;
    var _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "space-y-2" : _ref3$className,
    props = _objectWithoutProperties(_ref3, _excluded3);
  return /*#__PURE__*/jsx(Panel3, _objectSpread(_objectSpread({}, props), {}, {
    className: className,
    children: children
  }));
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var generateMockTheme = function generateMockTheme() {
  var colorTypes = ["primary", "secondary", "tertiary"];
  var defaultColors = {
    primary: "gray",
    secondary: "blue",
    tertiary: "indigo"
  };
  var variants = {
    light: {
      "very-light": 100,
      light: 200,
      medium: 300,
      dark: 400,
      "very-dark": 500
    },
    dark: {
      "very-light": 500,
      light: 600,
      medium: 700,
      dark: 800,
      "very-dark": 900
    }
  };
  var theme = {
    primary: defaultColors.primary,
    secondary: defaultColors.secondary,
    tertiary: defaultColors.tertiary,
    light: {
      name: "Light Theme",
      primary: defaultColors.primary,
      secondary: defaultColors.secondary,
      tertiary: defaultColors.tertiary
    },
    dark: {
      name: "Dark Theme",
      primary: defaultColors.primary,
      secondary: defaultColors.secondary,
      tertiary: defaultColors.tertiary
    }
  };

  // Generate color variants for light and dark themes
  colorTypes.forEach(function (type) {
    Object.keys(variants).forEach(function (variant) {
      Object.keys(variants[variant]).forEach(function (shade) {
        var shadeValue = variants[variant][shade];
        var color = defaultColors[type];

        // Background colors
        theme[variant]["bg-".concat(type, "-").concat(shade)] = "bg-".concat(color, "-").concat(shadeValue);
        theme[variant]["hover-bg-".concat(type, "-").concat(shade)] = "hover:bg-".concat(color, "-").concat(shadeValue + 100 <= 900 ? shadeValue + 100 : shadeValue);

        // Border colors
        theme[variant]["border-".concat(type, "-").concat(shade)] = "border-".concat(color, "-").concat(shadeValue);
        theme[variant]["hover-border-".concat(type, "-").concat(shade)] = "hover:border-".concat(color, "-").concat(shadeValue + 100 <= 900 ? shadeValue + 100 : shadeValue);

        // Text colors (inverted)
        var invertedShade = 900 - shadeValue;
        theme[variant]["text-".concat(type, "-").concat(shade)] = "text-".concat(color, "-").concat(invertedShade);
        theme[variant]["hover-text-".concat(type, "-").concat(shade)] = "hover:text-".concat(color, "-").concat(invertedShade - 100 >= 100 ? invertedShade - 100 : invertedShade);
      });
    });
  });

  // Add transparent variants
  ["light", "dark"].forEach(function (variant) {
    theme[variant]["bg-none"] = "bg-transparent";
    theme[variant]["border-none"] = "border-transparent";
    theme[variant]["hover-border-none"] = "hover:border-transparent";
    theme[variant]["hover-bg-none"] = "hover:bg-transparent";
    theme[variant]["hover-text-none"] = "hover:text-transparent";
  });
  return theme;
};
var mock = {
  api: {
    getWidgets: function () {
      var _getWidgets = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", []);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getWidgets() {
        return _getWidgets.apply(this, arguments);
      }
      return getWidgets;
    }(),
    getLayout: function () {
      var _getLayout = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", {});
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getLayout() {
        return _getLayout.apply(this, arguments);
      }
      return getLayout;
    }(),
    saveDashboard: function () {
      var _saveDashboard = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", {});
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function saveDashboard() {
        return _saveDashboard.apply(this, arguments);
      }
      return saveDashboard;
    }(),
    getDashboard: function () {
      var _getDashboard = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", {});
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function getDashboard() {
        return _getDashboard.apply(this, arguments);
      }
      return getDashboard;
    }()
  },
  themes: generateMockTheme()
};
var mockText = {
  paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "short": "Sample text",
  "long": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
};
var MockWrapper = function MockWrapper(_ref) {
  var children = _ref.children,
    _ref$api = _ref.api;
    _ref$api === void 0 ? mock.api : _ref$api;
    var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? mock.themes : _ref$theme,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "dark" : _ref$variant;
  // The currentTheme should be either the light or dark variant, not the whole theme object
  var currentTheme = theme && variant in theme ? theme[variant] : theme;
  return /*#__PURE__*/jsx(ThemeContext.Provider, {
    value: {
      currentTheme: currentTheme
    },
    children: /*#__PURE__*/jsx("div", {
      style: {
        padding: "20px",
        backgroundColor: "#f5f5f5"
      },
      children: children
    })
  });
};
var MockLayout = function MockLayout() {
  return null;
};
var MockAlgolia = null;

library.add(faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faCheck, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot, faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faDatabase, faEarListen, faSignal, faPalette, faComputer, faSun, faMoon, faFolderPlus, faBoltLightning, faArrowRightToBracket, faArrowRightFromBracket);
if (process.env.NODE_ENV !== "development") {
  console.log = function () {};
}

export { Alert, Alert2, Alert3, AlertBanner, AlgoliaRefinementList, AlgoliaSearchBox, Breadcrumbs, Breadcrumbs2, Breadcrumbs3, Button, Button2, Button3, ButtonIcon, ButtonIcon2, ButtonIcon3, Card, Card2, Card3, Checkbox, CodeEditorInline, CodeEditorVS, CodeRenderer, Container, DashPanel, DashPanel2, DashPanel3, DragComponent, DropComponent, ErrorMessage, FormLabel, Heading, Heading2, Heading3, InputText, LayoutContainer, MainSection, Menu, Menu2, Menu3, MenuItem, MenuItem2, MenuItem3, MockAlgolia, MockLayout, MockWrapper, Modal, Panel, Panel2, Panel3, Paragraph, Paragraph2, Paragraph3, ProgressBar, ProgressBar2, ProgressBar3, RadioGroup, SearchInput, SelectInput, SelectMenu, Slider, SubHeading, SubHeading2, SubHeading3, Switch, Table, Table2, Table3, Tag, Tag2, Tag3, TextArea, ThemeContext, Toast, Toast2, Toast3, Toggle, WidgetChrome, WidgetContext, capitalizeFirstLetter, colorNames, colorTypes, deepCopy, getCSSStyleForClassname, getClassForObjectType, getRandomInt, getStyleName, getStylesForItem, getUUID$1 as getUUID, isObject, mock, mockText, objectTypes, shades, styleClassNames, tailwindHeightFractions, themeObjects, themeVariants, withRouter };
//# sourceMappingURL=index.js.map
