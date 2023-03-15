import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot, faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faPalette, faComputer } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useState, useContext as useContext$1, useEffect, Fragment, useRef } from 'react';
import { useDrop, DndProvider, useDrag } from 'react-dnd';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Transition, Dialog, Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { useSearchBox, useRefinementList } from 'react-instantsearch-hooks-web';
import { plugins, activationPoints, extensionPoints } from 'pluggable-electron/renderer';
import colors from 'tailwindcss/colors';
import deepEqual from 'deep-equal';
import { HTML5Backend } from 'react-dnd-html5-backend';
import parseArgs from 'minimist';

/**
 * WidgetApi
 * Include developer methods to easily access the Electron bridge
 *
 */

var WidgetApi = {
  _uuid: null,
  _pub: null,
  _electronApi: null,
  _settings: null,
  /**
   * init
   *
   * This will initialize the API
   * We do this automatically from the LayoutModel using the UUID generated
   * for the widget.
   *
   * We need this UUID for filenames, publishing events, etc.
   *
   * @param {string} uuid
   */
  init: function init(uuidInput) {
    try {
      this._uuid = uuidInput;
    } catch (e) {
      console.log(e);
    }
  },
  setPublisher: function setPublisher(publisher) {
    this._pub = publisher;
  },
  setElectronApi: function setElectronApi(api) {
    try {
      /**
       * include the main electron apis that we want to expose ONLY
       */
      if (api !== undefined && api !== null) {
        var minified = {};
        minified["data"] = "data" in api ? api.data : null;
        minified["algolia"] = "algolia" in api ? api.algolia : null;
        minified["events"] = "publicEvents" in api ? api.publicEvents : null;
        this._electronApi = minified;
      }
    } catch (e) {
      console.log("Error Setting Electron API ", e.message);
    }
  },
  setSettings: function setSettings(settings) {
    this._settings = settings;
  },
  /**
   * uuid
   * @returns string the UUID for this Widget
   */
  uuid: function uuid() {
    return this._uuid;
  },
  electronApi: function electronApi() {
    return this._electronApi;
  },
  pub: function pub() {
    return this._pub;
  },
  /**
   * publishEvent
   * @param {string} name the name of the widget (TODO - uuid + handler)
   * @param {object} events the payload for the event published
   */
  publishEvent: function publishEvent(name, events) {
    // console.log("publish event ", `${this.uuid()}-${name}`);
    // const uniqueName = `${${name}`;
    this._pub.pub(name, events);
  },
  /**
   * registerListeners
   *
   * Register an array of listeners (strings) and set the handler (object)
   * Each handler has a key and Component named the same so we can use the handler
   * methods in code.
   *
   * @param {array} listeners
   * @param {object} handlers
   */
  registerListeners: function registerListeners(listeners, handlers) {
    this._pub.registerListeners(listeners, handlers, this.uuid());
  },
  /**
   * storeData
   *
   * Allow the widget to have access to "local storage"
   * Store any object data to the filesystem in a predetermined filepath
   * based on the widget information (dashboard.workspace.widget...)
   *
   * @param {object} data
   * @param {object} options filename - name of the file, callbacks for complete and error
   */
  storeData: function storeData(data, _ref) {
    var _ref$filename = _ref.filename,
      filename = _ref$filename === void 0 ? null : _ref$filename,
      _ref$callbackComplete = _ref.callbackComplete,
      callbackComplete = _ref$callbackComplete === void 0 ? null : _ref$callbackComplete,
      _ref$callbackError = _ref.callbackError,
      callbackError = _ref$callbackError === void 0 ? null : _ref$callbackError;
    // set the filename
    var toFilename = filename !== null ? filename : "".concat(this.uuid(), ".json");
    // grab the electron api
    var eApi = this.electronApi();
    if (eApi) {
      // remove the listeners (reset)
      eApi.removeAllListeners();
      if (callbackComplete !== null) {
        eApi.on(eApi.events.DATA_SAVE_TO_FILE_COMPLETE, function (e, message) {
          return callbackComplete(e, message);
        });
      }
      if (callbackError !== null) {
        eApi.on(eApi.events.DATA_SAVE_TO_FILE_ERROR, function (e, message) {
          return callbackError(e, message);
        });
      }
      // request.
      eApi.data.saveToFile(data, toFilename);
    }
  },
  /**
   *
   * @param {object} options
   * - filename - the name of the file if you want to override the default uuid as filename
   * - callbackComplete - the handler for dealing with the complete callback data
   * - callbackError - the handler for dealing with the error callback data
   */
  readData: function readData(_ref2) {
    var _ref2$filename = _ref2.filename,
      filename = _ref2$filename === void 0 ? null : _ref2$filename,
      _ref2$callbackComplet = _ref2.callbackComplete,
      callbackComplete = _ref2$callbackComplet === void 0 ? null : _ref2$callbackComplet,
      _ref2$callbackError = _ref2.callbackError,
      callbackError = _ref2$callbackError === void 0 ? null : _ref2$callbackError;
    try {
      var toFilename = filename !== null ? filename : "".concat(this.uuid(), ".json");
      var eApi = this.electronApi();
      eApi.removeAllListeners();
      if (callbackComplete !== null) {
        eApi.on(eApi.events.DATA_READ_FROM_FILE_COMPLETE, function (e, message) {
          return callbackComplete(e, message);
        });
      }
      if (callbackError !== null) {
        callbackError !== null && eApi.on(eApi.events.DATA_READ_FROM_FILE_ERROR, function (e, message) {
          return callbackError(e, message);
        });
      }
      eApi.data.readFromFile(toFilename);
    } catch (e) {
      console.log(e);
    }
  }
};

/**
 * ThemeApi
 * Wrapper for the Electron Bridge for themes
 *
 * @description Developers can use this wrapper to change the "api" from Electron to another source abstraction
 */

var ThemeApi = {
  /**
   * @var {object} _api to the api methods events
   * @description The api interface (see /public/lib/api/ for structure in electron-skeleton..)
   */
  _api: null,
  /**
   * @var {object} _themes an array of available themes for the dashboard
   */
  _themes: null,
  /**
   * uuid
   * @returns string the UUID for this Widget
   */
  uuid: function uuid() {
    return this._uuid;
  },
  setUuid: function setUuid(data) {
    this._uuid = data;
  },
  api: function api() {
    return this._api;
  },
  /**
   * setApi
   * Set the interface to be used as the api
   * @param {object} myApi the interface for the theme methods
   */
  setApi: function setApi(myApi) {
    // we should trim this to only the bare essentials that a dev would need.
    // the developer can also pass in their own API such that we can switch
    // out Electron for another API (node etc)
    var minified = {};
    minified["data"] = myApi.data;
    // minified['algolia'] = myApi.algolia;
    minified["events"] = myApi.publicEvents;
    this._api = minified;
  },
  setThemes: function setThemes(data) {
    this._themes = data;
  },
  themes: function themes() {
    return this._themes;
  },
  /**
   * init
   *
   * @description Initialize the ThemeAPI
   * @param {string} uuidInput the unique identifier for the dashboard (or whatever you wish to use)
   * @param {object} apiInput the api for accessing outside data and performing operations
   */
  init: function init(uuidInput, apiInput) {
    try {
      this.setUuid(uuidInput);
      this.setApi(apiInput);
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * loadThemes
   * @param {int} id the unique identifier to associate with the themes
   * @param {object} args the optional arguments (callbacks)
   */
  loadThemes: function loadThemes(id, _ref) {
    var _ref$callbackComplete = _ref.callbackComplete,
      callbackComplete = _ref$callbackComplete === void 0 ? null : _ref$callbackComplete,
      _ref$callbackError = _ref.callbackError,
      callbackError = _ref$callbackError === void 0 ? null : _ref$callbackError;
    try {
      var _a = this.api();
      if (_a) {
        _a.removeAllListeners();
        callbackComplete !== null && _a.on(_a.events.THEME_LIST_COMPLETE, callbackComplete);
        callbackError !== null && _a.on(_a.events.THEME_LIST_ERROR, callbackError);
        _a.themes.listThemesForApplication(id);
      }
    } catch (e) {
      callbackError !== null && a.on(a.events.THEME_LIST_ERROR, function (e, message) {
        return callbackError(e, message);
      });
    }
  }
};

/**
 * DashboardApi
 * Wrapper for the Electron Bridge
 *
 * @description Developers can use this wrapper to change the "api" from Electron to another source abstraction
 */
var DashboardApi = {
  /**
   * @var {string} _uuid the unique identifier for the dashboard we are using
   * @description We will store the information/config files in a folder with this uuid
   */
  _uuid: null,
  /**
   * @var {object} _api to the api methods events
   * @description The api interface (see /public/lib/api/ for structure in electron-skeleton..)
   */
  _api: null,
  _theme: null,
  // apis
  _settings: null,
  _themes: null,
  /**
   * init
   *
   * This will initialize the API
   * We do this automatically from the LayoutModel using the UUID generated
   * for the widget.
   *
   * We need this UUID for filenames, publishing events, etc.
   *
   * @param {string} uuid
   */
  init: function init(uuidInput) {
    try {
      this._uuid = uuidInput;

      // initialize the apis
      this._theme = ThemeApi;
    } catch (e) {
      console.log(e);
    }
  },
  setApi: function setApi(myApi) {
    // we should trim this to only the bare essentials that a dev would need.
    // the developer can also pass in their own API such that we can switch
    // out Electron for another API (node etc)
    var minified = {};
    minified["data"] = myApi.data;
    minified["algolia"] = myApi.algolia;
    minified["events"] = myApi.publicEvents;
    this._api = minified;
  },
  setSettings: function setSettings(settings) {
    this._settings = settings;
  },
  /**
   * uuid
   * @returns string the UUID for this Widget
   */
  uuid: function uuid() {
    return this._uuid;
  },
  electronApi: function electronApi() {
    return this._electronApi;
  }
};

var ThemeContext = /*#__PURE__*/createContext("dark");

function _typeof$o(obj) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$o(obj); }
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
  return objValue && _typeof$o(objValue) === "object" && objValue.constructor === Object;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var WorkspaceContext = /*#__PURE__*/createContext(null);

/**
 * AppContext
 *
 * {
 *      seearchClient,
 *      api
 * }
 */
var AppContext = /*#__PURE__*/createContext({
  debugMode: false
});

function _slicedToArray$q(arr, i) { return _arrayWithHoles$q(arr) || _iterableToArrayLimit$q(arr, i) || _unsupportedIterableToArray$r(arr, i) || _nonIterableRest$q(); }
function _nonIterableRest$q() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$r(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$r(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$r(o, minLen); }
function _arrayLikeToArray$r(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$q(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$q(arr) { if (Array.isArray(arr)) return arr; }
function DashboardMenuItem(_ref) {
  _ref.theme;
    var item = _ref.item,
    id = _ref.id,
    icon = _ref.icon,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "menu-item" : _ref$type,
    onClick = _ref.onClick;
    _ref.selected;
  var _useState = useState(false),
    _useState2 = _slicedToArray$q(_useState, 2);
    _useState2[0];
    var setHasDropped = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$q(_useState3, 2);
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
        console.log("dropped ", {
          id: id,
          type: type,
          dropIndex: id,
          obj: item
        });
        return {
          id: id,
          type: type,
          dropIndex: id,
          obj: item
        };
      },
      // the id and the type AGAIN of the item for dropping
      // canDrop: (obj) => {
      //     return id !== 1 && (item.canHaveChildren === true);// && obj.parent !== id; // cant drop in these places
      // }, // this will cause the elements that are droppable to be styles (if we choose!)
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          isDragging: monitor.isDragging,
          isOverCurrent: monitor.isOver({
            shallow: true
          })
        };
      }
    }, [setHasDropped, setHasDroppedOnChild]),
    _useDrop2 = _slicedToArray$q(_useDrop, 2),
    _useDrop2$ = _useDrop2[0];
    _useDrop2$.isOver;
    var isOverCurrent = _useDrop2$.isOverCurrent;
    _useDrop2$.canDrop;
    var drop = _useDrop2[1];
  return /*#__PURE__*/jsx("div", {
    ref: drop,
    id: id,
    className: "drop-component relative cursor-pointer rounded min-w-lg ".concat(isOverCurrent ? "w-10 h-10 opacity-100 animate-pulse" : "w-10 h-10 opacity-100", " "),
    children: /*#__PURE__*/jsx("div", {
      className: "w-full- h-full items-center justify-center",
      children: /*#__PURE__*/jsx(ButtonIcon, {
        icon: icon,
        onClick: onClick
      })
    })
  });
}

function _typeof$n(obj) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$n(obj); }
function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty$j(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$j(obj, key, value) { key = _toPropertyKey$n(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$n(arg) { var key = _toPrimitive$n(arg, "string"); return _typeof$n(key) === "symbol" ? key : String(key); }
function _toPrimitive$n(input, hint) { if (_typeof$n(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$n(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withRouter = function withRouter(Component) {
  var Wrapper = function Wrapper(props) {
    var navigate = useNavigate();
    var location = useLocation();
    var params = useParams();
    return /*#__PURE__*/jsx(Component, _objectSpread$h({
      navigate: navigate,
      location: location,
      params: params
    }, props));
  };
  return Wrapper;
};

function _typeof$m(obj) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$m(obj); }
function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty$i(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$i(obj, key, value) { key = _toPropertyKey$m(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$m(descriptor.key), descriptor); } }
function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$m(arg) { var key = _toPrimitive$m(arg, "string"); return _typeof$m(key) === "symbol" ? key : String(key); }
function _toPrimitive$m(input, hint) { if (_typeof$m(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$m(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$6(subClass, superClass); }
function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }
function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf$6(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$6(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$6(this, result); }; }
function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$m(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$6(self); }
function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }
var withPlugins = function withPlugins(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits$6(_class, _React$Component);
    var _super = _createSuper$6(_class);
    function _class(props) {
      var _this;
      _classCallCheck$6(this, _class);
      _this = _super.call(this, props);
      _this.state = {
        isActivated: false
      };
      return _this;
    }
    _createClass$6(_class, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        // activate the plugins
        if (this.state.isActivated === false) {
          plugins.registerActive().then(function (d) {
            _this2.state.isActivated === false && activationPoints.trigger("init");
            _this2.setState({
              isActivated: true
            });
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        //console.log('did update HOC');
        // if (this.state.isActivated === false) {
        //     plugins.registerActive().then(d => {
        //         console.log('inside now activate');
        //         this.state.isActivated === false && activationPoints.trigger('init');
        //         this.setState({ isActivated: true });
        //     });
        // }
      }
    }, {
      key: "render",
      value: function render() {
        // Notice that we pass through any additional props
        // pass in th3e extensionPoints
        return /*#__PURE__*/jsx(WrappedComponent, _objectSpread$g(_objectSpread$g({
          active: this.state.isActivated
        }, this.props), {}, {
          extensionPoints: extensionPoints
        }));
      }
    }]);
    return _class;
  }(React.Component);
};

var _excluded$d = ["theme", "workspaceData", "children", "width", "height", "direction", "scrollable"];
function _objectWithoutProperties$d(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$d(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$d(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Workspace = function Workspace(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? false : _ref$theme,
    workspaceData = _ref.workspaceData,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "" : _ref$height,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "col" : _ref$direction,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable;
    _objectWithoutProperties$d(_ref, _excluded$d);
  // const { debugMode, debugStyles } = useContext(AppContext);

  // console.log('workspace ', debugMode);

  function debugClasses() {
    // const styles = debugStyles['workspace']['classes'];
    return ""; //debug === true && `space-y-4 ${styles}`
  }

  // console.log('Workspace props ', { theme, workspaceData, children, width, height, direction, scrollable, ...props })

  return /*#__PURE__*/jsx(WorkspaceContext.Provider, {
    value: workspaceData,
    children: /*#__PURE__*/jsx(LayoutContainer, {
      theme: theme,
      direction: direction,
      scrollable: scrollable,
      width: width,
      height: height,
      className: "".concat(debugClasses()),
      children: children
    })
  });
};

var WorkspaceFooter = function WorkspaceFooter(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Footer Title" : _ref$title;
    _ref.onClick;
    _ref.children;
  var _useContext = useContext$1(AppContext),
    debugMode = _useContext.debugMode;
    _useContext.debugStyles;
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  function debugClasses() {
    // const styles = debugStyles['workspace-footer']['classes'];
    // return debugMode === true && `space-y-4 ${styles}`
    return "";
  }
  return /*#__PURE__*/jsxs("div", {
    className: "".concat(debugClasses(), " flex flex-col flex-0 w-full"),
    children: [debugMode === true && /*#__PURE__*/jsx("span", {
      className: "text-xs uppercase text-white",
      children: "Footer"
    }), /*#__PURE__*/jsx("div", {
      className: "flex flex-row flex-0 w-full p-4 ".concat(currentTheme["bgPrimary"], " rounded-b uppercase font-bold text-xs text-gray-300 border-indigo-900 border-t"),
      children: title
    })]
  });
};

var WorkspaceMenu = function WorkspaceMenu(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Menu Title" : _ref$title;
    _ref.onClick;
    var children = _ref.children;
  var _useContext = useContext$1(AppContext),
    debugMode = _useContext.debugMode;
    _useContext.debugStyles;
  function debugClasses() {
    // const styles = debugStyles['workspace-menu']['classes'];
    // return debugMode === true && `space-y-4 ${styles}`
    return "";
  }
  return /*#__PURE__*/jsxs("div", {
    className: "".concat(debugClasses(), " flex flex-col flex-0 w-full"),
    children: [debugMode === true && /*#__PURE__*/jsx("span", {
      className: "text-xs uppercase text-white",
      children: "Menu"
    }), /*#__PURE__*/jsxs("div", {
      className: "flex flex-row flex-0 w-full p-4 bg-gray-900 rounded-t uppercase font-bold text-xs text-gray-300 border-indigo-900 border-b justify-between",
      children: [title, /*#__PURE__*/jsx("div", {
        className: "flex flex-row space-x-1",
        children: children
      })]
    })]
  });
};

function _slicedToArray$p(arr, i) { return _arrayWithHoles$p(arr) || _iterableToArrayLimit$p(arr, i) || _unsupportedIterableToArray$q(arr, i) || _nonIterableRest$p(); }
function _nonIterableRest$p() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$q(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$q(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$q(o, minLen); }
function _arrayLikeToArray$q(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$p(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$p(arr) { if (Array.isArray(arr)) return arr; }
var mainApi$2 = window.mainApi;

// console.log('path ', remote.app.getPath('userData'));
// Enable the activation points
// setup({
//   // Provide the import function
//   importer: async (pluginPath) => import( /* webpackIgnore: true */ pluginPath)
//   // False is the default for presetEPs
// })

var PluginsC = function PluginsC(_ref) {
  var navigate = _ref.navigate;
  var _useState = useState(""),
    _useState2 = _slicedToArray$p(_useState, 2),
    filepathChosen = _useState2[0],
    setFilepathChosen = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray$p(_useState3, 2);
    _useState4[0];
    var setFilenameChosen = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$p(_useState5, 2),
    activePlugins = _useState6[0],
    setActivePlugins = _useState6[1];
  useEffect(function () {
    console.log("Plugins use effect");
    // plugins.registerActive();
    // activationPoints.trigger('init');
    if (activePlugins === null) fetchActivePlugins();
  });
  function handleChooseFile(e) {
    // set the filepath for the plugin we are going to install
    console.log(e.target.files[0].name);
    setFilepathChosen(e.target.files[0].path);
    setFilenameChosen(e.target.files[0].name);
  }
  function handleClickInstall(e) {
    try {
      if (filepathChosen !== "") {
        console.log("file path chosen to install ", filepathChosen);
        // console.log('PATH ', mainApi.pathPlugins);

        mainApi$2.removeAllListeners();
        mainApi$2.on("plugin-install-complete", handleInstallComplete);
        mainApi$2.on("plugin-install-error", handleInstallError);
        plugins.install([filepathChosen]).then(function (data) {
          console.log("package installed ", data[0]);

          // install the plugin..
          mainApi$2.plugins.install(data[0].name, filepathChosen);

          // test to see what plugins are loaded...
          plugins.getActive().then(function (d) {
            return console.log("ACTIVE ", d);
          });
          plugins.registerActive();

          // Insert this in your code when you are ready to activate the plugins
          activationPoints.trigger("init");

          // render the list of active plugins
          fetchActivePlugins();
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  function handleInstallComplete(e, message) {
    console.log(e, message);

    // const mainJs = message.root + "/index.js";
    // console.log(mainJs);
    // const test = '/Users/johngiatropoulos/Library/Application Support/Electron Skeleton Accelerator/plugins/test-moment/index.js';
    // const OtherComponent = React.lazy(() => import('/Users/johngiatropoulos/Library/Application Support/Electron Skeleton Accelerator/plugins/test-moment/index.js'));

    activationPoints.trigger("init");

    // and now we can fetch them to render on the screen
    fetchActivePlugins();
  }
  function handleInstallError(e, message) {
    console.log(e, message);
    // const moment = require(message.root);

    activationPoints.trigger("init");
    // const manager = new PluginManager(config);
    // manager.require('test-moment');
  }

  function handleClickUninstall(e) {
    console.log("uninstall plugin", e);
    // if (filepathChosen !== '') {
    //     console.log('file path chosen to install ', filepathChosen);
    //     plugins.uninstall(['demo-plugin']).then(data => {
    //         //console.log(data);

    //         // test to see what plugins are loaded...
    //         plugins.getActive().then(d => console.log(d));

    //     });
    // }
  }
  function fetchActivePlugins() {
    plugins.getActive().then(function (p) {
      setActivePlugins(p);
    });
  }
  function renderActivePlugins() {
    return activePlugins !== null && activePlugins.map(function (p) {
      return /*#__PURE__*/jsx(MainMenuItem, {
        title: p.name,
        onClick: function onClick() {
          return handleUninstallPlugin(p);
        }
      });
    });
  }
  function handleUninstallPlugin(plugin) {
    console.log(plugin);
    plugins.uninstall([plugin.name]).then(function (result) {
      console.log(result);
    })["catch"](function (e) {
      return console.log(e);
    });
  }
  return /*#__PURE__*/jsx(Workspace, {
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-col w-full h-full justify-center items-center space-y-4",
      children: [/*#__PURE__*/jsx(Button, {
        onClick: function onClick() {
          return navigate("/");
        },
        title: "Go Home"
      }), /*#__PURE__*/jsx("div", {
        className: "flex text-2xl font-bold text-gray-200",
        children: "Manage Plugins"
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-row bg-gray-800 p-2 rounded",
        children: /*#__PURE__*/jsx("form", {
          id: "install-file",
          children: /*#__PURE__*/jsxs("div", {
            className: "flex flex-row items-end",
            children: [/*#__PURE__*/jsx("div", {
              "class": "col-8",
              children: /*#__PURE__*/jsxs("label", {
                "class": "form-label",
                children: ["Package file:", /*#__PURE__*/jsx("input", {
                  type: "file",
                  name: "plugin-file",
                  "class": "form-control",
                  onChange: handleChooseFile
                })]
              })
            }), /*#__PURE__*/jsxs("div", {
              children: [/*#__PURE__*/jsx(Button, {
                onClick: handleClickInstall,
                title: "Install"
              }), /*#__PURE__*/jsx(Button, {
                onClick: handleClickUninstall,
                title: "Un-Install"
              })]
            })]
          })
        })
      }), renderActivePlugins()]
    })
  });
};
var Plugins = withPlugins(PluginsC);

function _typeof$l(obj) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$l(obj); }
var _excluded$c = ["title", "textSize", "fontWeight"];
function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty$h(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$h(obj, key, value) { key = _toPropertyKey$l(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$l(arg) { var key = _toPrimitive$l(arg, "string"); return _typeof$l(key) === "symbol" ? key : String(key); }
function _toPrimitive$l(input, hint) { if (_typeof$l(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$l(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$c(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$c(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$c(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var FormLabel = function FormLabel(_ref) {
  var title = _ref.title,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? null : _ref$textSize,
    _ref$fontWeight = _ref.fontWeight,
    fontWeight = _ref$fontWeight === void 0 ? "font-medium" : _ref$fontWeight,
    props = _objectWithoutProperties$c(_ref, _excluded$c);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, _objectSpread$f({}, props));
  var textSizeCalc = textSize !== null ? textSize : "text-base 2xl:text-lg";
  return /*#__PURE__*/jsx("label", {
    className: "".concat(fontWeight, " ").concat(textSizeCalc, " ").concat(styles.string),
    children: title
  });
};

function _typeof$k(obj) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$k(obj); }
var _excluded$b = ["onChange", "onKeyDown", "onClick", "name", "value", "type", "padding", "placeholder", "hasBorder", "disabled", "textSize"];
function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty$g(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$g(obj, key, value) { key = _toPropertyKey$k(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$k(arg) { var key = _toPrimitive$k(arg, "string"); return _typeof$k(key) === "symbol" ? key : String(key); }
function _toPrimitive$k(input, hint) { if (_typeof$k(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$k(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$b(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$b(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$b(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var InputText = function InputText(_ref) {
  var onChange = _ref.onChange,
    onKeyDown = _ref.onKeyDown,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    name = _ref.name,
    value = _ref.value,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "text" : _ref$type,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "p-2" : _ref$padding,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$hasBorder = _ref.hasBorder,
    hasBorder = _ref$hasBorder === void 0 ? true : _ref$hasBorder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-sm lg:text-base 2xl:text-lg" : _ref$textSize,
    props = _objectWithoutProperties$b(_ref, _excluded$b);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.INPUT_TEXT, currentTheme, _objectSpread$e({}, props));
  return /*#__PURE__*/jsx("input", {
    type: type,
    name: name,
    value: value !== null ? value : "",
    onChange: onChange,
    onKeyDown: onKeyDown,
    onClick: onClick,
    placeholder: placeholder,
    className: "".concat(padding, " rounded focus:outline-none outline-none border-0 ").concat(styles.string, " font-bold ").concat(textSize, " w-full ").concat(hasBorder === false && "border-none"),
    disabled: disabled
  });
};

function _typeof$j(obj) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$j(obj); }
var _excluded$a = ["name", "onChange", "selectedValue", "children", "textSize"];
function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty$f(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$f(obj, key, value) { key = _toPropertyKey$j(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$j(arg) { var key = _toPrimitive$j(arg, "string"); return _typeof$j(key) === "symbol" ? key : String(key); }
function _toPrimitive$j(input, hint) { if (_typeof$j(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$j(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$a(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$a(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$a(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SelectMenu = function SelectMenu(_ref) {
  var name = _ref.name,
    onChange = _ref.onChange,
    selectedValue = _ref.selectedValue,
    children = _ref.children,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-base 2xl:text-lg" : _ref$textSize,
    props = _objectWithoutProperties$a(_ref, _excluded$a);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.SELECT_MENU, currentTheme, _objectSpread$d({}, props));
  return /*#__PURE__*/jsx("select", {
    className: "p-2 rounded ".concat(textSize, " font-bold ").concat(styles.string, " focus:outline-none cursor-pointer min-w-lg w-full"),
    name: name,
    onChange: onChange,
    value: selectedValue,
    children: children
  });
};

function _slicedToArray$o(arr, i) { return _arrayWithHoles$o(arr) || _iterableToArrayLimit$o(arr, i) || _unsupportedIterableToArray$p(arr, i) || _nonIterableRest$o(); }
function _nonIterableRest$o() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$p(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$p(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$p(o, minLen); }
function _arrayLikeToArray$p(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$o(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$o(arr) { if (Array.isArray(arr)) return arr; }
var MainMenuConst = function MainMenuConst(_ref) {
  var _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    active = _ref.active,
    menuItems = _ref.menuItems,
    workspaces = _ref.workspaces,
    _ref$selectedMainItem = _ref.selectedMainItem,
    selectedMainItem = _ref$selectedMainItem === void 0 ? null : _ref$selectedMainItem,
    onWorkspaceMenuChange = _ref.onWorkspaceMenuChange;
  var _useContext = useContext$1(AppContext),
    api = _useContext.api,
    creds = _useContext.creds;
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var _useState = useState(""),
    _useState2 = _slicedToArray$o(_useState, 2),
    searchTerm = _useState2[0],
    setSearchTerm = _useState2[1];

  /**
   * useEffect
   * We can use the useEffect lifecycle to load the init for the plugins
   * and any other methods
   */
  useEffect(function () {
    setSearchTerm("");
  }, [active, selectedMainItem]);
  function handleClickMenuItem(ws) {
    onClick && onClick(ws);
  }
  function renderPluginMenuItems() {
    return menuItems.map(function (item) {
      return /*#__PURE__*/jsx(MainMenuItem, {
        onClick: function onClick(e) {
          return handleClickMenuItem(item);
        },
        title: item.label
      }, "main-menu-item-".concat(item.id));
    });
  }
  function renderWorkspaces(workspaces) {
    // We need to do this TWICE...
    // Once for the items that have a organized folder,
    // and once for the ones that do NOT....

    return workspaces && menuItems
    // .filter(mi => searchTerm !== '' ? true : (selectedMainItem !== null ? mi.id === selectedMainItem.id : true))
    .filter(function (mi) {
      return searchTerm !== "" ? true : true;
    }).map(function (menuItem) {
      // let's check to see if the user has applied any filters...
      var folderSelected = selectedMainItem !== null ? menuItem.id === selectedMainItem.id : false;
      return /*#__PURE__*/jsxs("div", {
        className: "".concat(folderSelected && "rounded"),
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-row justify-between border-b ".concat(currentTheme["border-secondary-medium"], " mb-2 p-2"),
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row text-xs items-center",
            children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
              icon: menuItem.icon
            }), /*#__PURE__*/jsx("span", {
              className: "p-2 uppercase font-bold",
              children: menuItem.name
            })]
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "plus",
            textSize: "text-xs",
            onClick: function onClick() {
              return handleCreateNew(menuItem);
            }
          })]
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-col pb-4 space-y-1",
          children: workspaces.filter(function (w) {
            return "menuId" in w && w.menuId === menuItem.id;
          }).filter(function (ws) {
            return searchTerm !== "" ? ws.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
          }).map(function (ws) {
            return /*#__PURE__*/jsx(MainMenuItem, {
              highlight: searchTerm !== "",
              id: ws.id,
              name: ws.name,
              onClick: function onClick(e) {
                return handleClickMenuItem(ws);
              },
              title: ws.name,
              onDropItem: function onDropItem(e) {
                return handleDropMenuItem(e);
              }
            }, "main-menu-item-ws-".concat(ws.id));
          })
        })]
      }, "menu-item-".concat(menuItem.id));
    });
  }
  function renderOrphanedWorkspaces(workspaces) {
    // We need to do this TWICE...
    // Once for the items that have a organized folder,
    // and once for the ones that do NOT....

    return workspaces && /*#__PURE__*/jsxs("div", {
      children: [selectedMainItem === null && /*#__PURE__*/jsx("div", {
        className: "flex flex-row justify-between border-b border-blue-700 mb-2 p-2 ".concat(currentTheme["textSecondary"]),
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-row text-xs items-center",
          children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
            icon: "folder"
          }), /*#__PURE__*/jsx("span", {
            className: "p-2 uppercase font-bold",
            children: "Uncategorized"
          })]
        })
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-col pb-4 space-y-1",
        children: workspaces.filter(function (mi) {
          return searchTerm !== "" ? true : selectedMainItem !== null ? mi.menuId === selectedMainItem.id : true;
        }).filter(function (w) {
          return workspaceIsOrphan(w) === true;
        }).filter(function (ws) {
          return searchTerm !== "" ? ws.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        }).map(function (ws) {
          return /*#__PURE__*/jsx(MainMenuItem, {
            highlight: searchTerm !== "",
            id: ws.id,
            name: ws.name,
            onClick: function onClick(e) {
              return handleClickMenuItem(ws);
            },
            title: ws.name,
            onDropItem: function onDropItem(e) {
              return handleDropMenuItem(e);
            }
          }, "main-menu-item-ws-".concat(ws.id));
        })
      })]
    }, "menu-item-orphan");
  }

  /**
   * workspaceIsOrphan
   * Check to see if the menuItem that is associated with the workspace no longer exists.
   * @param {Object} workspaceToCheck
   */
  function workspaceIsOrphan(workspaceToCheck) {
    return menuItems.filter(function (menuItem) {
      return menuItem.id === workspaceToCheck.menuId;
    }).length === 0;
  }
  function handleDropMenuItem(dropData) {
    var workspaceId = dropData.workspaceId,
      menuItemId = dropData.menuItemId;
    var workspaceSelected = null;
    var workspaceArray = workspaces.filter(function (ws) {
      return ws.id === workspaceId;
    });
    if (workspaceArray.length > 0) {
      workspaceSelected = workspaceArray[0];
    }
    if (workspaceSelected) {
      var newWorkspace = deepCopy(workspaceSelected);
      // we have to update the workspace menu id
      newWorkspace["menuId"] = menuItemId;
      api.removeAllListeners();
      api.on(api.events.WORKSPACE_SAVE_COMPLETE, handleSaveWorkspaceComplete);
      api.on(api.events.WORKSPACE_SAVE_ERROR, handleSaveWorkspaceError);
      api.workspace.saveWorkspaceForApplication(creds.appId, newWorkspace);
    }
  }
  function handleSaveWorkspaceComplete(e, message) {
    onWorkspaceMenuChange();
  }
  function handleSaveWorkspaceError(e, message) {}
  function handleCreateNew(menuItem) {
    var newLayout = [{
      id: 1,
      order: 1,
      direction: "col",
      width: "w-full",
      component: "Container",
      hasChildren: 1,
      scrollable: true,
      parent: 0,
      menuId: selectedMainItem["id"]
    }];
    onClick && onClick({
      id: Date.now(),
      name: "New Workspace",
      label: "New",
      type: selectedMainItem,
      layout: newLayout,
      menuId: menuItem["id"]
    });
  }
  function handleChangeSearch(e) {
    setSearchTerm(e.target.value);
  }
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col min-w-64 w-64 h-screen",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-col space-y-2 w-full h-full",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex flex-row justify-between",
        children: /*#__PURE__*/jsx(InputText, {
          name: "search-workspaces",
          value: searchTerm,
          placeholder: "Search Workspaces",
          onChange: handleChangeSearch,
          textSize: "text-sm"
        })
      }), /*#__PURE__*/jsxs("div", {
        className: "flex flex-col pb-4 overflow-y-scroll h-full space-y-2",
        children: [/*#__PURE__*/jsxs(DndProvider, {
          backend: HTML5Backend,
          children: [renderWorkspaces(workspaces), renderOrphanedWorkspaces(workspaces)]
        }), selectedMainItem === "plugins" && renderPluginMenuItems()]
      })]
    })
  });
};
var MainMenu = withRouter(withPlugins(MainMenuConst));

function _slicedToArray$n(arr, i) { return _arrayWithHoles$n(arr) || _iterableToArrayLimit$n(arr, i) || _unsupportedIterableToArray$o(arr, i) || _nonIterableRest$n(); }
function _nonIterableRest$n() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$o(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$o(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$o(o, minLen); }
function _arrayLikeToArray$o(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$n(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$n(arr) { if (Array.isArray(arr)) return arr; }
var MainMenuItem = function MainMenuItem(_ref) {
  var id = _ref.id,
    name = _ref.name,
    onDropItem = _ref.onDropItem,
    onClick = _ref.onClick,
    title = _ref.title;
  var _useDrag = useDrag(function () {
      return {
        type: "menu-item",
        item: {
          name: name,
          id: id
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging(),
            sourceIndex: monitor.sourceIndex
          };
        },
        hover: function hover(item, monitor) {},
        monitor: function monitor() {
          return {
            isDragging: collected.isDragging
          };
        },
        end: function end(item, monitor) {
          console.log("end ", item);
          var dropResult = monitor.getDropResult();
          if (item && dropResult) {
            // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
            // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
            // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
            onDropItem({
              workspaceId: item.id,
              menuItemId: dropResult.id
            });
          }
        }
      };
    }),
    _useDrag2 = _slicedToArray$n(_useDrag, 3),
    collected = _useDrag2[0],
    drag = _useDrag2[1],
    dragPreview = _useDrag2[2];
  return collected.isDragging ? /*#__PURE__*/jsx("div", {
    ref: dragPreview,
    onClick: onClick,
    className: "flex w-full flex-col cursor-pointer space-y-1 p-2 h-full rounded font-hind text-sm opacity-20",
    children: /*#__PURE__*/jsx("div", {
      className: "text-sm",
      children: title
    })
  }) : /*#__PURE__*/jsx(MenuItem3, {
    ref: drag,
    id: collected.id,
    type: collected.type,
    onClick: onClick,
    children: /*#__PURE__*/jsx("div", {
      className: "text-sm",
      children: title
    })
  });
};

var MenuSlideOverlay = function MenuSlideOverlay(_ref) {
  var open = _ref.open,
    setOpen = _ref.setOpen,
    children = _ref.children;
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  return /*#__PURE__*/jsx(Transition.Root, {
    show: open,
    as: Fragment,
    children: /*#__PURE__*/jsx(Dialog, {
      as: "div",
      className: "fixed inset-0 overflow-hidden",
      onClose: setOpen,
      children: /*#__PURE__*/jsxs("div", {
        className: "absolute inset-0 overflow-hidden z-30",
        children: [/*#__PURE__*/jsx(Transition.Child, {
          as: Fragment,
          enter: "ease-in-out duration-400",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in-out duration-300",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /*#__PURE__*/jsx(Dialog.Overlay, {
            className: "absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          })
        }), /*#__PURE__*/jsx("div", {
          className: "pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-12",
          children: /*#__PURE__*/jsx(Transition.Child, {
            as: Fragment,
            enter: "transform transition ease-in-out duration-400 sm:duration-700",
            enterFrom: "-translate-x-full",
            enterTo: "translate-x-0",
            leave: "transform transition ease-in-out duration-300 sm:duration-700",
            leaveFrom: "translate-x-0",
            leaveTo: "-translate-x-full",
            children: /*#__PURE__*/jsx("div", {
              className: "pointer-events-auto max-w-2xl xl:max-w-3xl overflow-hidden",
              children: /*#__PURE__*/jsx("div", {
                className: "flex h-full flex-col shadow-xl ".concat(currentTheme["bg-secondary-very-dark"], " ").concat(currentTheme["text-secondary-light"], " scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900 overflow-hidden"),
                children: /*#__PURE__*/jsx("div", {
                  className: "relative mt-6 flex-1 px-6 sm:px-6 overflow-hidden h-full",
                  children: children
                })
              })
            })
          })
        })]
      })
    })
  });
};

function _typeof$i(obj) { "@babel/helpers - typeof"; return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$i(obj); }
function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$i(descriptor.key), descriptor); } }
function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$5(subClass, superClass); }
function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$5(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$5(this, result); }; }
function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$i(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$5(self); }
function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }
function _defineProperty$e(obj, key, value) { key = _toPropertyKey$i(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$i(arg) { var key = _toPrimitive$i(arg, "string"); return _typeof$i(key) === "symbol" ? key : String(key); }
function _toPrimitive$i(input, hint) { if (_typeof$i(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$i(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var mainApi$1 = window.mainApi;
function classNames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(" ");
}
var SideMenu = /*#__PURE__*/function (_React$Component) {
  _inherits$5(SideMenu, _React$Component);
  var _super = _createSuper$5(SideMenu);
  function SideMenu() {
    var _this;
    _classCallCheck$5(this, SideMenu);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$e(_assertThisInitialized$5(_this), "handlePath", function (path) {
      console.log("PATH ", path);
      _this.props.navigate(path);
    });
    _defineProperty$e(_assertThisInitialized$5(_this), "generatePageChildren", function (pages, indexName) {
      var pathname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      return pages !== null ? pages.length > 0 ? pages.filter(function (p) {
        return p.indexName === indexName;
      }).map(function (page) {
        return {
          icon: "file",
          name: page.displayName,
          href: "/rules-manager/pages/" + page.id,
          current: pathname === "/rules-manager/pages/" + page.id
        };
      }) : null : null;
    });
    _defineProperty$e(_assertThisInitialized$5(_this), "generateTemplateChildren", function (templates, indexName) {
      var pathname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      return templates !== null ? templates.length > 0 ? templates.filter(function (p) {
        return p.index === indexName;
      }).map(function (t) {
        return {
          icon: "file",
          name: t.name,
          href: "/rules-manager/templates/" + t.name,
          current: pathname === "/rules-manager/templates/" + t.name
        };
      }) : null : null;
    });
    _defineProperty$e(_assertThisInitialized$5(_this), "generateApplicationChildren", function (pages, templates, queries, indexName) {
      var children = [];
      children.push({
        name: indexName
        // href: '/rules-manager/pages',
        // current: pages !== null,
        // icon: 'code'
      });

      children.push({
        name: "Pages",
        href: "/rules-manager/pages",
        current: pages !== null,
        icon: "file"
      });
      children.push({
        name: "Display Templates",
        href: "/rules-manager/templates",
        current: templates !== null,
        icon: "palette"
      });
      children.push({
        name: "Queries",
        href: "/rules-manager/query-test",
        current: queries !== null,
        icon: "vial-circle-check"
      });
      return children;
    });
    _defineProperty$e(_assertThisInitialized$5(_this), "generateNavigation", function () {
      var _this$props = _this.props,
        pages = _this$props.pages,
        templates = _this$props.templates,
        location = _this$props.location,
        queries = _this$props.queries;
      var application = mainApi$1.getApplication();
      var indexName = mainApi$1.getIndexName();
      var currentPath = "pathname" in location ? location["pathname"] : "";
      var navigation = [{
        name: "Home",
        href: "/applications",
        icon: "home"
      }];
      application !== undefined && navigation.push({
        name: application["appId"],
        href: "/applications/" + application["appId"],
        current: currentPath === "/applications/" + application["appId"],
        icon: "server",
        children: indexName && _this.generateApplicationChildren(pages, templates, queries, indexName)
      });

      // indexName && navigation.push({
      //   name: indexName,
      //   href: '/applications/' + application['appId'],
      //   // current: currentPath === '/applications/' + application['appId'],
      //   icon: 'server',
      //   // children: indexName && this.generateApplicationChildren(pages, templates, queries, indexName)
      // });

      // application !== undefined && indexName && navigation.push({
      //   name: 'Pages',
      //   href: '/rules-manager/pages',
      //   current: pages !== null,
      //   icon: 'file'
      //   // children: this.generatePageChildren(pages, indexName, currentPath),

      // });

      // application !== undefined && indexName && navigation.push({
      //   name: 'Display Templates',
      //   href: '/rules-manager/templates',
      //   current: templates !== null,
      //   icon: 'palette'
      //   // children: this.generateTemplateChildren(templates, indexName, currentPath),

      // });

      // application !== undefined && indexName && navigation.push({
      //   name: 'Queries',
      //   href: '/rules-manager/query-test',
      //   current: queries !== null,
      //   icon: 'vial-circle-check'
      // });
      return navigation;
    });
    return _this;
  }
  _createClass$5(SideMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        location = _this$props2.location;
        _this$props2.showMenu;
      var navigation = this.generateNavigation();
      var isSettingsSelected = "pathname" in location && (location["pathname"] === "/settings" ? true : false);
      return /*#__PURE__*/jsxs("div", {
        className: "flex flex-col border-r border-gray-800 pb-4 overflow-y-scroll h-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900",
        children: [/*#__PURE__*/jsx("div", {
          className: "flex-grow flex flex-col bg-gray-900 p-2",
          children: /*#__PURE__*/jsx("nav", {
            className: "flex flex-col px-0 2xl:px-2 space-y-2",
            "aria-label": "Sidebar",
            children: navigation.map(function (item) {
              return !item.children ? /*#__PURE__*/jsxs(Link, {
                to: item.href,
                className: classNames(item.current ? "bg-gray-800 text-indigo-400 font-bold" : "bg-gray-900 text-gray-500 hover:bg-gray-700 hover:text-gray-200", "group w-full flex items-center justify-center pl-3 pr-2 py-2 text-lg 2xl:text-xl 2xl:justify-start font-bold rounded-md space-x-2"),
                children: [item.icon !== undefined && /*#__PURE__*/jsx(FontAwesomeIcon, {
                  icon: item.icon,
                  className: "text-gray-400"
                }), /*#__PURE__*/jsx("span", {
                  className: "hidden 2xl:inline-flex ml-2",
                  children: item.name
                })]
              }, item.href) : /*#__PURE__*/jsx(Disclosure, {
                as: "div",
                className: "space-y-2",
                children: function children(_ref) {
                  _ref.open;
                  return /*#__PURE__*/jsxs(Fragment, {
                    children: [/*#__PURE__*/jsx(Disclosure.Button, {
                      className: classNames(item.current ? "text-indigo-300" : "text-gray-300 hover:bg-gray-700 hover:text-gray-200", "w-full flex items-center justify-center pl-3 pr-2 py-2 text-lg 2xl:text-xl 2xl:justify-start font-bold rounded-md space-x-2"),
                      children: /*#__PURE__*/jsxs(Link, {
                        to: item.href,
                        className: "flex flex-row space-x-2 items-center justify-center",
                        children: [item.icon !== undefined && /*#__PURE__*/jsx(FontAwesomeIcon, {
                          icon: item.icon,
                          className: "text-gray-400"
                        }), /*#__PURE__*/jsx("span", {
                          className: "hidden 2xl:inline-flex",
                          children: item.name
                        })]
                      })
                    }), /*#__PURE__*/jsx(Disclosure.Panel, {
                      className: "space-y-2 bg-slate-900 rounded-lg p-2 2xl:p-2 border border-gray-800",
                      "static": true,
                      children: item.children.map(function (subItem) {
                        return /*#__PURE__*/jsxs(Disclosure.Button, {
                          as: "a",
                          onClick: function onClick() {
                            return _this2.handlePath(subItem.href);
                          },
                          className: classNames(subItem.current ? "bg-gray-800 text-indigo-300" : "text-gray-500 hover:bg-indigo-800 hover:text-gray-200", "group w-full flex items-center justify-start pl-3 pr-2 py-2 text-sm lg:text-base 2xl:text-base font-medium rounded-md hover:text-gray-200 hover:bg-gray-700 cursor-pointer space-x-2"),
                          children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
                            icon: subItem.icon
                          }), /*#__PURE__*/jsx("span", {
                            className: "hidden 2xl:inline-flex ml-2",
                            children: subItem.name
                          })]
                        }, subItem.name);
                      })
                    })]
                  });
                }
              }, item.name);
            })
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx(Disclosure, {
            as: "div",
            className: "px-4 2xl:px-4",
            children: /*#__PURE__*/jsxs(Disclosure.Button, {
              as: "a",
              onClick: function onClick() {
                return _this2.handlePath("/settings");
              },
              className: classNames(isSettingsSelected ? "text-indigo-300" : "text-gray-500 hover:bg-gray-800 hover:text-gray-200", "group w-full flex items-center p-0 pl-0 2xl:p-2 2xl:pl-3 text-left text-lg 2xl:text-xl font-bold rounded-md focus:outline-none space-x-2 cursor-pointer"),
              children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
                icon: "gear",
                className: "text-gray-500"
              }), /*#__PURE__*/jsx("span", {
                className: "hidden 2xl:inline-flex",
                children: "Settings"
              })]
            }, "menu-settings")
          }, "menu-settings")
        })]
      });
    }
  }]);
  return SideMenu;
}(React.Component);
SideMenu.defaultProps = {
  pages: [],
  templates: null,
  queries: null,
  showMenu: true
};

function _slicedToArray$m(arr, i) { return _arrayWithHoles$m(arr) || _iterableToArrayLimit$m(arr, i) || _unsupportedIterableToArray$n(arr, i) || _nonIterableRest$m(); }
function _nonIterableRest$m() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$n(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$n(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$n(o, minLen); }
function _arrayLikeToArray$n(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$m(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$m(arr) { if (Array.isArray(arr)) return arr; }
var AddMenuItemModal = function AddMenuItemModal(_ref) {
  var menuItems = _ref.menuItems,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen,
    onSave = _ref.onSave;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(menuItems),
    _useState2 = _slicedToArray$m(_useState, 2),
    menuItemsSelected = _useState2[0],
    setMenuItemsSelected = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray$m(_useState3, 2),
    menuItemNameSelected = _useState4[0],
    setMenuItemNameSelected = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$m(_useState5, 2),
    menuIconSelected = _useState6[0],
    setMenuIconSelected = _useState6[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$m(_React$useState, 2),
    updateState = _React$useState2[1];
  React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (open === true && menuItemsSelected === null && menuItemsSelected !== menuItems) {
      setMenuItemsSelected(function () {
        return menuItems;
      });
    }
    if (menuItems !== menuItemsSelected) {
      setMenuItemsSelected(function () {
        return menuItems;
      });
    }
    if (open === false) {
      setMenuItemsSelected(function () {
        return null;
      });
      setMenuIconSelected(null);
      setMenuItemNameSelected(null);
    }
  }, [open, menuItems]);
  function handleMenuNameChange(e) {
    console.log("name change ", e.target.value);
    setMenuItemNameSelected(function () {
      return e.target.value;
    });
  }
  function handleSaveChanges(itemData) {
    try {
      if (menuIconSelected && menuItemNameSelected) {
        var menuItem = {
          id: Date.now(),
          name: menuItemNameSelected,
          icon: menuIconSelected
        };
        onSave(menuItem);
      }
      // if (workspaceSelected !== null) {

      //     const tempWorkspace = deepCopy(workspaceSelected);

      //     // craft the event handler + listeners
      //     // and add to the layout item
      //     const layoutItem = getLayoutItemById(itemSelected['id']);

      //     // now lets add to it...
      //     layoutItem['listeners'] = eventsSelected;
      //     tempWorkspace['layout'] = replaceItemInLayout(tempWorkspace.layout, layoutItem['id'], layoutItem);

      //     // save the new workspace
      //     onSave(tempWorkspace);

      //     // reset the component
      //     setItemSelected(() => null);
      //     setWorkspaceSelected(() => null);
      //     setEventsSelected(() => {});
      //     setEventHandlerSelected(() => null);
      //     setIsOpen(false);
      // }
    } catch (e) {
      console.log(e);
    }
  }
  function renderAvailableIcons() {
    var icons = ["phone", "clone", "home", "plug", "magnifying-glass", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "minus", "arrows-up-down", "arrows-left-right", "square", "eye", "pencil", "folder", "signal", "hammer", "seedling", "trophy", "robot", "leaf", "baby", "baby-carriage", "database"];
    return icons.map(function (icon) {
      var selected = icon === menuIconSelected;
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-col text-5xl p-4 ".concat(selected === true ? "".concat(theme["bg-secondary-very-dark"], " ").concat(theme["border-secondary-very-dark"]) : theme["bg-secondary-medium"], " h-fit w-full rounded border-4 ").concat(theme["border-secondary-medium"], " ").concat(selected === false && "".concat(theme["hover-bg-secondary-medium"], " ").concat(theme["hover-border-secondary-dark"]), " cursor-pointer text-gray-200"),
        onClick: function onClick() {
          return setMenuIconSelected(icon);
        },
        children: /*#__PURE__*/jsx(FontAwesomeIcon, {
          icon: icon
        })
      }, "icon-".concat(icon));
    });
  }
  return menuItemsSelected !== null &&
  /*#__PURE__*/
  // <Modal isOpen={open} setIsOpen={setIsOpen} width={'w-5/6 2xl:w-3/4'} height="h-5/6">
  jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-11/12 xl:w-5/6",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsx("div", {
        className: "flex flex-col w-full h-full  overflow-hidden",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-col w-full h-full overflow-hidden",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row w-full h-full space-x-4 overflow-hidden p-6",
            children: [/*#__PURE__*/jsx("div", {
              className: "flex flex-col flex-shrink h-full rounded font-medium text-gray-400 w-1/3",
              children: menuItemsSelected !== null && /*#__PURE__*/jsxs("div", {
                className: "flex flex-col rounded p-6 py-10 space-y-4",
                children: [/*#__PURE__*/jsx(Heading, {
                  title: "Get Organized",
                  padding: false
                }), /*#__PURE__*/jsx(SubHeading3, {
                  title: "Add new \"folders\" to organize all of your dashboards.",
                  padding: false
                })]
              })
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col w-2/3 space-y-4 py-10",
              children: [/*#__PURE__*/jsx("div", {
                className: "flex flex-col rounded w-full",
                children: /*#__PURE__*/jsx(InputText, {
                  value: menuItemNameSelected,
                  onChange: handleMenuNameChange,
                  placeholder: "My Folder"
                })
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-row rounded overflow-hidden justify-center items-center align-center w-full",
                children: /*#__PURE__*/jsx("div", {
                  className: "grid grid-cols-5 gap-4 w-full h-full overflow-y-scroll",
                  children: renderAvailableIcons()
                })
              })]
            })]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row justify-between bg-gray-900 p-4 rounded-br rounded-bl border-t border-gray-800",
            children: [/*#__PURE__*/jsxs("div", {
              className: "flex flex-row text-lg text-gray-600 items-center font-bold px-4",
              children: ["Click the", " ", /*#__PURE__*/jsx(FontAwesomeIcon, {
                icon: "plus",
                className: "px-2"
              }), " ", "button to open this window."]
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-row space-x-2",
              children: [/*#__PURE__*/jsx(Button, {
                title: "Cancel",
                bgColor: "bg-gray-800",
                textSize: "text-lg",
                padding: "py-2 px-4",
                onClick: function onClick() {
                  return setIsOpen(false);
                }
              }), /*#__PURE__*/jsx(Button, {
                title: "Save Changes",
                bgColor: "bg-gray-800",
                hoverBackgroundColor: "hover:bg-green-700",
                textSize: "text-lg",
                padding: "py-2 px-4",
                onClick: handleSaveChanges
              })]
            })]
          })]
        })
      })
    })
  });
};

/**
 * LayoutModel
 *
 */
var LayoutModel = function LayoutModel(layoutItem, workspaceLayout, dashboardId) {
  try {
    if (layoutItem === null || layoutItem === undefined) {
      return null;
    }
    var obj = deepCopy(layoutItem);
    var layout = {};
    layout.id = "id" in obj ? obj["id"] : null;
    layout.order = "order" in obj ? obj.order : null;
    layout.scrollable = "scrollable" in obj ? obj["scrollable"] === "false" || obj["scrollable"] === false ? false : true : false;
    layout.component = "component" in obj ? obj.component : null;
    layout.direction = "direction" in obj ? obj.direction : "col";
    layout.hasChildren = "hasChildren" in obj ? obj.hasChildren : 0;
    layout.canHaveChildren = "canHaveChildren" in obj ? obj.canHaveChildren : true;
    layout.width = "width" in obj ? obj.width : "";
    layout.height = "height" in obj ? obj.height : "h-full";
    layout.parent = "parent" in obj ? obj.parent : 0;
    layout.type = "type" in obj ? obj.type : "widget";
    layout.workspace = "workspace" in obj ? obj.workspace : "layout";

    // Add the MAIN workspace that
    layout.dashboardId = dashboardId;

    // Event listeners and corresponding handlers exposed by the developer in the configuration
    layout.listeners = "listeners" in obj ? obj["listeners"] : {};
    layout.eventHandlers = "eventHandlers" in obj ? obj["eventHandlers"] : [];
    layout.siblingCount = "siblingCount" in obj ? obj["siblingCount"] : 0;

    // let's get some specifics from the configuration file
    // just in case these were missing
    layout.componentData = ComponentManager.getComponent(layout.component);

    // generate a unique name so that we can store files, publish events etc
    // all with this very specific identifier

    layout.uuid = "".concat(dashboardId, "-").concat(layout["component"], "-").concat(layout.id);
    if (layout.componentData !== undefined) {
      if ("type" in layout.componentData) layout.type = layout.componentData.type;
      if ("workspace" in layout.componentData) layout.workspace = layout.componentData.workspace;
    }

    /// widget configuration
    var widgetConfig = ComponentManager.config(obj["component"], obj);
    if (widgetConfig !== null && widgetConfig !== undefined) {
      Object.keys(widgetConfig).forEach(function (key) {
        layout[key] = widgetConfig[key];
      });
    }

    // last check for this being a container...
    if ("workspace" in layout) {
      if (layout.workspace === "layout") {
        if (layout.width === "") {
          layout.width = "w-full";
        }
        if (layout.scrollable === "") {
          layout.scrollable = true;
        }
        if (layout.direction === "") {
          layout.direction = "col";
        }
      }
    }

    // lets check to see if we already have the parent workspace?
    if (layout.parentWorkspaceName === undefined || Object.keys(layout.parentWorkspace).length === 0) {
      // get the nearest workspace and assign this as the parent for rendering
      var tempLayout = deepCopy(layout);
      var parentWS = getNearestParentWorkspace(workspaceLayout, tempLayout, tempLayout);
      var parentWorkspaceName = "layout";
      if (parentWS) {
        if ("workspace" in parentWS) {
          parentWorkspaceName = parentWS["workspace"];
        }
      }
      layout.parentWorkspaceName = parentWorkspaceName;
      layout.parentWorkspace = parentWS || {};
    }

    // can we include the API?
    var widgetApi = WidgetApi;
    widgetApi.init(layout.uuid);
    layout.api = widgetApi;
    return layout;
  } catch (e) {
    return null;
  }
};

/**
 * ColorModel
 *
 * Handle all of the data for a color (theme)
 */

/**
 *
 * @param {Object} obj
 * @returns
 */
var ColorModel = function ColorModel() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  try {
    if (obj) {
      console.log("cm: ", obj);
      var temp = deepCopy(obj);
      var color = {};
      color.panelType = "panelType" in temp ? temp.panelType : "main";
      color.colorName = "colorName" in temp ? temp.colorName : "white";
      color.colorType = "colorType" in temp ? temp.colorType : "primary";
      color.shade = "shade" in temp ? temp.shade : 500;
      color.variant = "variant" in temp ? temp.variant : "dark";
      color.level = "level" in temp ? temp.level : "light";
      color.objectType = "objectType" in temp ? temp.objectType : "bg";
      color.styleName = getStyleName(color.objectType); //'background';

      /**
       * generate the display name
       */
      color.displayName = "displayName" in temp ? temp.name : capitalizeFirstLetter(color.colorName);

      /**
       * Strings for the theme class name and the class to be used in className
       */
      color.themeClass = "".concat(color.objectType, "-").concat(color.colorType, "-").concat(color.level);
      color["class"] = "".concat(color.objectType, "-").concat(color.colorName, "-").concat(color.shade);

      /**
       * Grab the hex code via tailwind for the tailwind color
       * This may change as we move to hex codes for selection
       */
      color.hex = colors[color.colorName];
      return color;
    }
    return null;
  } catch (e) {
    console.log(e.message);
    return obj;
  }
};

var SettingsModel = function SettingsModel() {
  var settingsObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj = deepCopy(settingsObject);
  obj["debug"] = "debug" in obj ? obj["debug"] : false;
  return obj;
};

/**
 * WorkspaceModel
 *
 */
var WorkspaceModel = function WorkspaceModel(workspaceItem) {
  var obj = deepCopy(workspaceItem);
  var workspace = {};
  workspace.id = "id" in obj ? obj["id"] : null;
  workspace.name = "name" in obj ? obj["name"] : "My Workspace";
  workspace.type = "type" in obj ? obj["type"] : "layout";
  workspace.label = "label" in obj ? obj["label"] : "Workspace";
  workspace.layout = "layout" in obj ? obj["layout"] : [];
  return workspace;
};

/**
 * ThemeModel
 *
 */

/**
 * getNextLevel
 * Need to generate the levels for tailwind
 * @param {int} currentLevel
 */
function getNextLevel(currentLevel) {
  var next = currentLevel + 100;
  return next <= 900 ? next : currentLevel;
}
function invert(shade) {
  return 900 - parseInt(shade, 10);
}
var ThemeModel = function ThemeModel() {
  var themeItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj = deepCopy(themeItem);
  var overrideDark = "dark" in themeItem ? themeItem["dark"] : null;
  var overrideLight = "light" in themeItem ? themeItem["light"] : null;
  var theme = {};
  theme.id = "id" in obj ? obj["id"] : null;
  theme.name = "name" in obj ? obj["name"] : "My Theme";

  // for each of the color types we should set...
  colorTypes.forEach(function (type) {
    theme[type] = type in obj ? obj[type] : "gray";
  });

  // theme.primary = 'primary' in obj ? obj['primary'] : 'gray';
  // theme.secondary = 'secondary' in obj ? obj['secondary'] : 'blue';
  // theme.tertiary = 'tertiary' in obj ? obj['tertiary'] : 'indigo';

  theme.shadeFrom = "shadeFrom" in obj ? obj["shadeFrom"] : 100;

  // unused from
  theme.shadeBackgroundFrom = "shadeBackgroundFrom" in obj ? obj["shadeBackgroundFrom"] : 100;
  theme.shadeTextFrom = "shadeTextFrom" in obj ? obj["shadeTextFrom"] : 100;
  theme.shadeBorderFrom = "shadeBorderFrom" in obj ? obj["shadeBorderFrom"] : 100;
  theme.shadeTo = "shadeTo" in obj ? obj["shadeTo"] : 700;

  // somehow generate the colors based on the theme inputs...
  // light, medium, dark for each?
  // example: bg-primary-light, bg-primary-medium, bg-primary-dark,

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

  // iterate over each color type "primary, secondary, tertiary ..."
  // and generate the colors necessary (shades) based on tailwind
  colorTypes.forEach(function (type) {
    Object.keys(variants).forEach(function (variant) {
      if (variant in theme === false) {
        theme[variant] = {};
      }
      Object.keys(variants[variant]).forEach(function (shade) {
        theme[variant]["bg-".concat(type, "-").concat(shade)] = "bg-".concat(theme[type], "-").concat(variants[variant][shade]);
        theme[variant]["hover-bg-".concat(type, "-").concat(shade)] = "hover:bg-".concat(theme[type], "-").concat(getNextLevel(variants[variant][shade]));
        theme[variant]["hover-border-".concat(type, "-").concat(shade)] = "hover:border-".concat(theme[type], "-").concat(getNextLevel(variants[variant][shade]));
        theme[variant]["border-".concat(type, "-").concat(shade)] = "border-".concat(theme[type], "-").concat(variants[variant][shade]);
        // we should be "flipping" these so dark text on light and light on dark...
        theme[variant]["text-".concat(type, "-").concat(shade)] = "text-".concat(theme[type], "-").concat(invert(variants[variant][shade]));
        theme[variant]["hover-text-".concat(type, "-").concat(shade)] = "hover:text-".concat(theme[type], "-").concat(invert(variants[variant][shade]));
      });
    });
  });

  // lets try gradients

  // Primary

  theme["dark"]["bg-primary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-primary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.primary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.primary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.primary, "-").concat(variants["dark"]["dark"]);
  theme["light"]["bg-primary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-primary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.primary, "-").concat(variants["light"]["medium"], " via-").concat(theme.primary, "-").concat(variants["light"]["medium"], " to-").concat(theme.primary, "-").concat(variants["light"]["dark"]);

  // Secondary

  theme["dark"]["bg-secondary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-secondary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.secondary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["dark"]["dark"]);
  theme["light"]["bg-secondary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], "  via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-secondary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.secondary, "-").concat(variants["light"]["medium"], " via-").concat(theme.secondary, "-").concat(variants["light"]["medium"], " to-").concat(theme.secondary, "-").concat(variants["light"]["dark"]);

  // Tertiary

  theme["dark"]["bg-tertiary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["dark"]["bg-tertiary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["dark"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["dark"]["dark"]);
  theme["light"]["bg-tertiary-gradient-right"] = "bg-gradient-to-r from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-bottom"] = "bg-gradient-to-b from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-left"] = "bg-gradient-to-l from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-top"] = "bg-gradient-to-t from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-top-right"] = "bg-gradient-to-tr from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-bottom-right"] = "bg-gradient-to-br from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-top-left"] = "bg-gradient-to-tl from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);
  theme["light"]["bg-tertiary-gradient-bottom-left"] = "bg-gradient-to-bl from-".concat(theme.tertiary, "-").concat(variants["light"]["medium"], " via-").concat(theme.tertiary, "-").concat(variants["light"]["medium"], " to-").concat(theme.tertiary, "-").concat(variants["light"]["dark"]);

  // now for the overrides!
  if (overrideDark !== null) {
    Object.keys(overrideDark).forEach(function (key) {
      theme["dark"][key] = overrideDark[key];
    });
  }
  if (overrideLight !== null) {
    Object.keys(overrideLight).forEach(function (key) {
      theme["light"][key] = overrideLight[key];
    });
  }

  // Primary, secondary, etc..
  theme["light"]["name"] = theme.name;
  colorTypes.forEach(function (type) {
    theme["light"][type] = theme[type];
  });
  colorTypes.forEach(function (type) {
    theme["dark"][type] = theme[type];
  });
  theme["dark"]["name"] = theme.name;

  // transparent colors
  theme["dark"]["bg-none"] = "bg-transparent";
  theme["dark"]["border-none"] = "border-transparent";
  theme["dark"]["hover-border-none"] = "hover:border-transparent";
  theme["dark"]["hover-bg-none"] = "hover:bg-transparent";
  theme["dark"]["hover-text-none"] = "hover:text-transparent";
  theme["light"]["bg-none"] = "bg-transparent";
  theme["light"]["border-none"] = "border-transparent";
  theme["light"]["hover-border-none"] = "hover:border-transparent";
  theme["light"]["hover-bg-none"] = "hover:bg-transparent";
  theme["light"]["hover-text-none"] = "hover:text-transparent";
  return theme;
};

/*
 "component": AnalyticsReportsWidget,
    "type":"widget",
    "workspace":"algolia-analytics",
    "canHaveChildren": false,
    "userConfig": {
        "report": { type: 'select', displayName: "Report Type", instructions: "Select the report from the list", options: [
            {
                value: '',
                displayName: 'User Select'
            },
            {
                value: 'top-searches',
                displayName: 'Top Searches'
            },
            {
                value: 'top-searches-count',
                displayName: 'Top Searches Count',
            },
            {
                value: 'no-results',
                displayName: 'No Results',
            },
            {
                value: 'query-analytics',
                displayName: 'Query Analytics',
            }
        ], required: false },
        "indexName": { type: "text", defaultValue: "dev_find_accelerator", instructions: "Type the name of the index you wish to search", options: [], displayName: "Index Name", required: true },
        "appId": { type: "text", defaultValue: process.env.REACT_APP_APP_ID, instructions: "Type the name of the appId", options: [], displayName: "App Id", required: true },
        "apiKey": { type: "secret", defaultValue: process.env.REACT_APP_ALGOLIA_KEY, instructions: "Type the api key for this appId", options: [], displayName: "Api Key", required: true },
    },
    "styles": {
        "backgroundColor": "bg-blue-900",
        "borderColor": "border-blue-900"
    },
    "events": ["fetchAnalyticsComplete"],
    "eventHandlers":['handleSearchChange','handleRefinementChange']
*/
/**
 * ComponentConfigModel
 * @param {object} o the data passed in to generate the model
 * @returns <ComponentConfigModel>Object
 */
var ComponentConfigModel = function ComponentConfigModel() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  console.log("config model in ", obj);
  // const obj = deepCopy(o);

  /**
   * id
   * The unique identifer for the component
   */
  obj.id = "id" in obj ? obj["id"] : null;

  /**
   * name
   * The name of the component for display purposes
   */
  obj.name = "name" in obj ? obj["name"] : "My Workspace";

  /**
   * type
   * The type of component (widget|workspace)
   */
  obj.type = "type" in obj ? obj["type"] : "workspace";

  /**
   * workspace
   * The workspace this component belongs to
   */
  obj.workspace = "workspace" in obj ? obj["workspace"] : "workspace-dash";

  /**
   * userConfig
   * Allow the end users to edit/input parameters into the edit widget layout panel
   */
  obj.userConfig = "userConfig" in obj ? obj["userConfig"] : {};

  /**
   * layout builder styles
   */
  obj.styles = "styles" in obj ? obj["styles"] : {
    backgroundColor: "bg-blue-800",
    borderColor: "border-blue-900"
  };

  // console.log("config: ", obj);

  return obj;
};

var ThemePane = function ThemePane(_ref) {
  var children = _ref.children,
    searchTerm = _ref.searchTerm,
    _ref$inputValue = _ref.inputValue,
    inputValue = _ref$inputValue === void 0 ? null : _ref$inputValue,
    _ref$onInputChange = _ref.onInputChange,
    onInputChange = _ref$onInputChange === void 0 ? null : _ref$onInputChange,
    _ref$inputPlaceholder = _ref.inputPlaceholder,
    inputPlaceholder = _ref$inputPlaceholder === void 0 ? "" : _ref$inputPlaceholder,
    _ref$scroll = _ref.scroll,
    scroll = _ref$scroll === void 0 ? true : _ref$scroll;
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col text-xs h-full p-1 space-y-2 ".concat(scroll === true ? "overflow-y-scroll" : "overflow-hidden", " rounded w-full"),
    children: [inputValue !== null && onInputChange !== null && /*#__PURE__*/jsx("div", {
      className: "flex flex-row",
      children: /*#__PURE__*/jsx(InputText, {
        value: searchTerm,
        textSize: "text-sm",
        onChange: onInputChange,
        placeholder: inputPlaceholder
      })
    }), /*#__PURE__*/jsx("div", {
      className: "flex flex-col text-xs break-all h-full space-y-2 w-full",
      children: children
    })]
  });
};

var BUTTON = "button";
var BUTTON_2 = "button-2";
var BUTTON_3 = "button-3";
var PANEL = "panel";
var PANEL_2 = "panel-2";
var PANEL_3 = "panel-3";
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
var themeObjects = {
  BUTTON: BUTTON,
  BUTTON_2: BUTTON_2,
  BUTTON_3: BUTTON_3,
  BUTTON_ICON: BUTTON_ICON,
  BUTTON_ICON_2: BUTTON_ICON_2,
  BUTTON_ICON_3: BUTTON_ICON_3,
  CODE_EDITOR: CODE_EDITOR,
  INPUT_TEXT: INPUT_TEXT,
  PANEL: PANEL,
  PANEL_2: PANEL_2,
  PANEL_3: PANEL_3,
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
  TOGGLE: TOGGLE,
  TOGGLE_2: TOGGLE_2,
  TOGGLE_3: TOGGLE_3,
  DASHBOARD_FOOTER: DASHBOARD_FOOTER,
  DASHBOARD_FOOTER_2: DASHBOARD_FOOTER_2,
  DASHBOARD_FOOTER_3: DASHBOARD_FOOTER_3,
  SELECT_MENU: SELECT_MENU,
  FORM_LABEL: FORM_LABEL
};
var BACKGROUND_COLOR = "backgroundColor";
var BORDER_COLOR = "borderColor";
var TEXT_COLOR = "textColor";
var HOVER_BACKGROUND_COLOR = "hoverBackgroundColor";
var HOVER_TEXT_COLOR = "hoverTextColor";
var HOVER_BORDER_COLOR = "hoverBorderColor";
var styleClassNames = {
  BACKGROUND_COLOR: BACKGROUND_COLOR,
  TEXT_COLOR: TEXT_COLOR,
  BORDER_COLOR: BORDER_COLOR,
  HOVER_BACKGROUND_COLOR: HOVER_BACKGROUND_COLOR,
  HOVER_BORDER_COLOR: HOVER_BORDER_COLOR,
  HOVER_TEXT_COLOR: HOVER_TEXT_COLOR
};

function _typeof$h(obj) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$h(obj); }
function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty$d(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$d(obj, key, value) { key = _toPropertyKey$h(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$h(arg) { var key = _toPrimitive$h(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$h(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PreviewComponentsPane = function PreviewComponentsPane(_ref) {
  var theme = _ref.theme,
    themeVariant = _ref.themeVariant,
    onClick = _ref.onClick;
  useEffect(function () {
    console.log("EFFECT ", theme[themeVariant]);
  }, [theme]);
  function handleClickItem(itemType, styles) {
    // get the styles for the item and display...
    var temp = {
      item: itemType,
      styles: styles
    };
    // setItemSelected(() => temp);
    // setItemColorSelected(null);
    onClick(temp);
  }
  function renderText() {
    var headingStyles = getStylesForItem(themeObjects.HEADING, theme[themeVariant]);
    var heading2Styles = getStylesForItem(themeObjects.HEADING_2, theme[themeVariant]);
    var heading3Styles = getStylesForItem(themeObjects.HEADING_3, theme[themeVariant]);
    var subHeadingStyles = getStylesForItem(themeObjects.SUBHEADING, theme[themeVariant]);
    var subHeading2Styles = getStylesForItem(themeObjects.SUBHEADING_2, theme[themeVariant]);
    var subHeading3Styles = getStylesForItem(themeObjects.SUBHEADING_3, theme[themeVariant]);
    var paragraphStyles = getStylesForItem(themeObjects.PARAGRAPH, theme[themeVariant]);
    var paragraph2Styles = getStylesForItem(themeObjects.PARAGRAPH_2, theme[themeVariant]);
    var paragraph3Styles = getStylesForItem(themeObjects.PARAGRAPH_3, theme[themeVariant]);
    var inputTextStyles = getStylesForItem(themeObjects.INPUT_TEXT, theme[themeVariant]);
    return /*#__PURE__*/jsxs("div", {
      className: "flex flex-col space-y-4 p-4",
      children: [/*#__PURE__*/jsx(Heading, _objectSpread$c(_objectSpread$c({
        title: "Heading"
      }, headingStyles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.HEADING, headingStyles);
        }
      })), /*#__PURE__*/jsx(Heading2, _objectSpread$c(_objectSpread$c({
        title: "Heading 2"
      }, heading2Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.HEADING_2, heading2Styles);
        }
      })), /*#__PURE__*/jsx(Heading3, _objectSpread$c(_objectSpread$c({
        title: "Heading 3"
      }, heading3Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.HEADING_3, heading3Styles);
        }
      })), /*#__PURE__*/jsx(SubHeading, _objectSpread$c(_objectSpread$c({
        title: "Subheading"
      }, subHeadingStyles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.SUBHEADING, subHeadingStyles);
        }
      })), /*#__PURE__*/jsx(SubHeading2, _objectSpread$c(_objectSpread$c({
        title: "Subheading 2"
      }, subHeading2Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.SUBHEADING_2, subHeading2Styles);
        }
      })), /*#__PURE__*/jsx(SubHeading3, _objectSpread$c(_objectSpread$c({
        title: "Subheading 3"
      }, subHeading3Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.SUBHEADING_3, subHeading3Styles);
        }
      })), /*#__PURE__*/jsx(Paragraph, _objectSpread$c(_objectSpread$c({
        text: "The quick brown fox jumps over the lazy dog."
      }, paragraphStyles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.PARAGRAPH, paragraphStyles);
        }
      })), /*#__PURE__*/jsx(Paragraph2, _objectSpread$c(_objectSpread$c({
        text: "The quick brown fox jumps over the lazy dog."
      }, paragraph2Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.PARAGRAPH_2, paragraph2Styles);
        }
      })), /*#__PURE__*/jsx(Paragraph3, _objectSpread$c(_objectSpread$c({
        text: "The quick brown fox jumps over the lazy dog."
      }, paragraph3Styles), {}, {
        padding: false,
        onClick: function onClick() {
          return handleClickItem(themeObjects.PARAGRAPH_3, paragraph3Styles);
        }
      })), /*#__PURE__*/jsx(InputText, _objectSpread$c(_objectSpread$c({
        value: "value"
      }, inputTextStyles), {}, {
        onClick: function onClick() {
          return handleClickItem(themeObjects.INPUT_TEXT, inputTextStyles);
        }
      }))]
    });
  }
  function renderPanels() {
    var styles = getStylesForItem(themeObjects.PANEL, theme[themeVariant]);
    var styles2 = getStylesForItem(themeObjects.PANEL_2, theme[themeVariant]);
    var styles3 = getStylesForItem(themeObjects.PANEL_3, theme[themeVariant]);

    // Panel 1
    var headingStyles = getStylesForItem(themeObjects.HEADING, theme[themeVariant]);
    var subHeadingStyles = getStylesForItem(themeObjects.SUBHEADING, theme[themeVariant]);
    var paragraphStyles = getStylesForItem(themeObjects.PARAGRAPH, theme[themeVariant]);
    var buttonStyles = getStylesForItem(themeObjects.BUTTON, theme[themeVariant]);
    var buttonIconStyles = getStylesForItem(themeObjects.BUTTON_ICON, theme[themeVariant]);
    var menuItemStyles = getStylesForItem(themeObjects.MENU_ITEM, theme[themeVariant]);
    var tagStyles = getStylesForItem(themeObjects.TAG, theme[themeVariant]);
    var heading2Styles = getStylesForItem(themeObjects.HEADING_2, theme[themeVariant]);
    var subHeading2Styles = getStylesForItem(themeObjects.SUBHEADING_2, theme[themeVariant]);
    var paragraph2Styles = getStylesForItem(themeObjects.PARAGRAPH_2, theme[themeVariant]);
    var button2Styles = getStylesForItem(themeObjects.BUTTON_2, theme[themeVariant]);
    var buttonIcon2Styles = getStylesForItem(themeObjects.BUTTON_ICON_2, theme[themeVariant]);
    var menuItem2Styles = getStylesForItem(themeObjects.MENU_ITEM_2, theme[themeVariant]);
    var tag2Styles = getStylesForItem(themeObjects.TAG_2, theme[themeVariant]);
    var heading3Styles = getStylesForItem(themeObjects.HEADING_3, theme[themeVariant]);
    var subHeading3Styles = getStylesForItem(themeObjects.SUBHEADING_3, theme[themeVariant]);
    var paragraph3Styles = getStylesForItem(themeObjects.PARAGRAPH_3, theme[themeVariant]);
    var button3Styles = getStylesForItem(themeObjects.BUTTON_3, theme[themeVariant]);
    var buttonIcon3Styles = getStylesForItem(themeObjects.BUTTON_ICON_3, theme[themeVariant]);
    var menuItem3Styles = getStylesForItem(themeObjects.MENU_ITEM_3, theme[themeVariant]);
    var tag3Styles = getStylesForItem(themeObjects.TAG_3, theme[themeVariant]);
    return /*#__PURE__*/jsxs("div", {
      className: "flex flex-col space-y-4 h-100 p-4",
      children: [/*#__PURE__*/jsxs("div", {
        className: "flex flex-row bg-gray-900 p-6 space-x-4 rounded justify-between",
        children: [/*#__PURE__*/jsx(Panel, _objectSpread$c(_objectSpread$c({
          className: "p-6 rounded border-4 space-y-4 cursor-pointer",
          height: "h-40"
        }, styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.PANEL, styles);
          },
          children: /*#__PURE__*/jsx("span", {
            className: "uppercase text-gray-50 font-bold",
            children: "Panel"
          })
        })), /*#__PURE__*/jsx(Panel2, _objectSpread$c(_objectSpread$c({
          className: "p-6 rounded border-4 space-y-4 cursor-pointer"
        }, styles2), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.PANEL_2, styles2);
          },
          children: /*#__PURE__*/jsx("span", {
            className: "uppercase text-gray-50 font-bold",
            children: "Panel 2"
          })
        })), /*#__PURE__*/jsx(Panel3, _objectSpread$c(_objectSpread$c({
          className: "p-6 rounded border-4 space-y-4 w-full cursor-pointer"
        }, styles3), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.PANEL_3, styles3);
          },
          children: /*#__PURE__*/jsx("span", {
            className: "uppercase text-gray-50 font-bold",
            children: "Panel 3"
          })
        }))]
      }), /*#__PURE__*/jsxs(Panel, _objectSpread$c(_objectSpread$c({
        className: "p-6 rounded border-4 space-y-4"
      }, styles), {}, {
        children: [/*#__PURE__*/jsx(Heading, _objectSpread$c(_objectSpread$c({
          title: "Heading"
        }, headingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING, headingStyles);
          }
        })), /*#__PURE__*/jsx(Heading2, _objectSpread$c(_objectSpread$c({
          title: "Heading 2"
        }, heading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_2, heading2Styles);
          }
        })), /*#__PURE__*/jsx(Heading3, _objectSpread$c(_objectSpread$c({
          title: "Heading 3"
        }, heading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_3, heading3Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeadingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING, subHeadingStyles);
          }
        })), /*#__PURE__*/jsx(SubHeading2, _objectSpread$c(_objectSpread$c({
          title: "Subheading 2"
        }, subHeading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_2, subHeading2Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading3, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_3, subHeading3Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraphStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH, paragraphStyles);
          }
        })), /*#__PURE__*/jsx(Paragraph2, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_2, paragraph2Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph3, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_3, paragraph3Styles);
          }
        })), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Button, _objectSpread$c(_objectSpread$c({
            title: "Button"
          }, buttonStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON, buttonStyles);
            }
          })), /*#__PURE__*/jsx(Button2, _objectSpread$c(_objectSpread$c({
            title: "Button 2"
          }, button2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_2, button2Styles);
            }
          })), /*#__PURE__*/jsx(Button3, _objectSpread$c(_objectSpread$c({
            title: "Button 3"
          }, button3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_3, button3Styles);
            }
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-4 w-full",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 2",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 3",
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            }))]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-col space-y-2 w-full",
          children: [/*#__PURE__*/jsx(MenuItem, _objectSpread$c(_objectSpread$c({}, menuItemStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM, menuItemStyles);
            },
            children: "Menu Item"
          })), /*#__PURE__*/jsx(MenuItem2, _objectSpread$c(_objectSpread$c({}, menuItem2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_2, menuItem2Styles);
            },
            children: "Menu Item 2"
          })), /*#__PURE__*/jsx(MenuItem3, _objectSpread$c(_objectSpread$c({}, menuItem3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_3, menuItem3Styles);
            },
            children: "Menu Item 3"
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Tag, _objectSpread$c(_objectSpread$c({
            text: "Tag",
            icon: "pencil"
          }, tagStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG, tagStyles);
            }
          })), /*#__PURE__*/jsx(Tag2, _objectSpread$c(_objectSpread$c({
            text: "Tag 2",
            icon: "pencil"
          }, tag2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_2, tag2Styles);
            }
          })), /*#__PURE__*/jsx(Tag3, _objectSpread$c(_objectSpread$c({
            text: "Tag 3",
            icon: "pencil"
          }, tag3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_3, tag3Styles);
            }
          }))]
        })]
      })), /*#__PURE__*/jsxs(Panel2, _objectSpread$c(_objectSpread$c({
        className: "p-6 rounded border-4 space-y-4"
      }, styles2), {}, {
        children: [/*#__PURE__*/jsx(Heading, _objectSpread$c(_objectSpread$c({
          title: "Heading"
        }, headingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING, headingStyles);
          }
        })), /*#__PURE__*/jsx(Heading2, _objectSpread$c(_objectSpread$c({
          title: "Heading 2"
        }, heading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_2, heading2Styles);
          }
        })), /*#__PURE__*/jsx(Heading3, _objectSpread$c(_objectSpread$c({
          title: "Heading 3"
        }, heading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_3, heading3Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeadingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING, subHeadingStyles);
          }
        })), /*#__PURE__*/jsx(SubHeading2, _objectSpread$c(_objectSpread$c({
          title: "Subheading 2"
        }, subHeading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_2, subHeading2Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading3, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_3, subHeading3Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraphStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH, paragraphStyles);
          }
        })), /*#__PURE__*/jsx(Paragraph2, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_2, paragraph2Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph3, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_3, paragraph3Styles);
          }
        })), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Button, _objectSpread$c(_objectSpread$c({
            title: "Button"
          }, buttonStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON, buttonStyles);
            }
          })), /*#__PURE__*/jsx(Button2, _objectSpread$c(_objectSpread$c({
            title: "Button 2"
          }, button2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_2, button2Styles);
            }
          })), /*#__PURE__*/jsx(Button3, _objectSpread$c(_objectSpread$c({
            title: "Button 3"
          }, button3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_3, button3Styles);
            }
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-4 w-full",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 2",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 3",
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            }))]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-col space-y-2 w-full",
          children: [/*#__PURE__*/jsx(MenuItem, _objectSpread$c(_objectSpread$c({}, menuItemStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM, menuItemStyles);
            },
            children: "Menu Item"
          })), /*#__PURE__*/jsx(MenuItem2, _objectSpread$c(_objectSpread$c({}, menuItem2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_2, menuItem2Styles);
            },
            children: "Menu Item 2"
          })), /*#__PURE__*/jsx(MenuItem3, _objectSpread$c(_objectSpread$c({}, menuItem3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_3, menuItem3Styles);
            },
            children: "Menu Item 3"
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Tag, _objectSpread$c(_objectSpread$c({
            text: "Tag",
            icon: "pencil"
          }, tagStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG, tagStyles);
            }
          })), /*#__PURE__*/jsx(Tag2, _objectSpread$c(_objectSpread$c({
            text: "Tag 2",
            icon: "pencil"
          }, tag2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_2, tag2Styles);
            }
          })), /*#__PURE__*/jsx(Tag3, _objectSpread$c(_objectSpread$c({
            text: "Tag 3",
            icon: "pencil"
          }, tag3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_3, tag3Styles);
            }
          }))]
        })]
      })), /*#__PURE__*/jsxs(Panel3, _objectSpread$c(_objectSpread$c({
        className: "p-6 rounded border-4 space-y-4"
      }, styles3), {}, {
        children: [/*#__PURE__*/jsx(Heading, _objectSpread$c(_objectSpread$c({
          title: "Heading"
        }, headingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING, headingStyles);
          }
        })), /*#__PURE__*/jsx(Heading2, _objectSpread$c(_objectSpread$c({
          title: "Heading 2"
        }, heading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_2, heading2Styles);
          }
        })), /*#__PURE__*/jsx(Heading3, _objectSpread$c(_objectSpread$c({
          title: "Heading 3"
        }, heading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_3, heading3Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeadingStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING, subHeadingStyles);
          }
        })), /*#__PURE__*/jsx(SubHeading2, _objectSpread$c(_objectSpread$c({
          title: "Subheading 2"
        }, subHeading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_2, subHeading2Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading3, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_3, subHeading3Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraphStyles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH, paragraphStyles);
          }
        })), /*#__PURE__*/jsx(Paragraph2, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH, paragraph2Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph3, _objectSpread$c(_objectSpread$c({
          text: "The quick brown fox jumps over the lazy dog."
        }, paragraph3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_3, paragraph3Styles);
          }
        })), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Button, _objectSpread$c(_objectSpread$c({
            title: "Button"
          }, buttonStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON, buttonStyles);
            }
          })), /*#__PURE__*/jsx(Button2, _objectSpread$c(_objectSpread$c({
            title: "Button 2"
          }, button2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_2, button2Styles);
            }
          })), /*#__PURE__*/jsx(Button3, _objectSpread$c(_objectSpread$c({
            title: "Button 3"
          }, button3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.BUTTON_3, button3Styles);
            }
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-4 w-full",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON, buttonIconStyles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 2",
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIconStyles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
              }
            }))]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              text: "Button Icon 3",
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            })), /*#__PURE__*/jsx(ButtonIcon, _objectSpread$c(_objectSpread$c({
              icon: "pencil"
            }, buttonIcon3Styles), {}, {
              onClick: function onClick() {
                return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
              }
            }))]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-col space-y-2 w-full",
          children: [/*#__PURE__*/jsx(MenuItem, _objectSpread$c(_objectSpread$c({}, menuItemStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM, menuItemStyles);
            },
            children: "Menu Item"
          })), /*#__PURE__*/jsx(MenuItem2, _objectSpread$c(_objectSpread$c({}, menuItem2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_2, menuItem2Styles);
            },
            children: "Menu Item 2"
          })), /*#__PURE__*/jsx(MenuItem3, _objectSpread$c(_objectSpread$c({}, menuItem3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.MENU_ITEM_3, menuItem3Styles);
            },
            children: "Menu Item 3"
          }))]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-2 w-full",
          children: [/*#__PURE__*/jsx(Tag, _objectSpread$c(_objectSpread$c({
            text: "Tag",
            icon: "pencil"
          }, tagStyles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG, tagStyles);
            }
          })), /*#__PURE__*/jsx(Tag2, _objectSpread$c(_objectSpread$c({
            text: "Tag 2",
            icon: "pencil"
          }, tag2Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_2, tag2Styles);
            }
          })), /*#__PURE__*/jsx(Tag3, _objectSpread$c(_objectSpread$c({
            text: "Tag 3",
            icon: "pencil"
          }, tag3Styles), {}, {
            onClick: function onClick() {
              return handleClickItem(themeObjects.TAG_3, tag3Styles);
            }
          }))]
        })]
      })), /*#__PURE__*/jsxs(Panel2, _objectSpread$c(_objectSpread$c({
        className: "p-6 rounded border-4 space-y-4"
      }, styles2), {}, {
        children: [/*#__PURE__*/jsx(Heading2, _objectSpread$c(_objectSpread$c({
          title: "Heading 2"
        }, heading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_2, heading2Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading2, _objectSpread$c(_objectSpread$c({
          title: "Subheading 2"
        }, subHeading2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_2, subHeading2Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph2, _objectSpread$c(_objectSpread$c({
          text: "Paragraph 2 - The quick brown fox jumps over the lazy dog."
        }, paragraph2Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_2, paragraph2Styles);
          }
        })), /*#__PURE__*/jsx(Button2, _objectSpread$c(_objectSpread$c({
          title: "Button"
        }, button2Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_2, button2Styles);
          }
        })), /*#__PURE__*/jsx(ButtonIcon2, _objectSpread$c(_objectSpread$c({
          text: "Button Icon",
          icon: "pencil"
        }, buttonIcon2Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIcon2Styles);
          }
        })), /*#__PURE__*/jsx(ButtonIcon2, _objectSpread$c(_objectSpread$c({
          icon: "pencil"
        }, buttonIcon2Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_ICON_2, buttonIconStyles);
          }
        })), /*#__PURE__*/jsx(MenuItem2, _objectSpread$c(_objectSpread$c({}, menuItem2Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.MENU_ITEM_2, menuItem2Styles);
          },
          children: "Menu Item"
        })), /*#__PURE__*/jsx(Tag2, _objectSpread$c(_objectSpread$c({
          text: "Tag 2",
          icon: "pencil"
        }, tag2Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.TAG_2, tag2Styles);
          }
        }))]
      })), /*#__PURE__*/jsxs(Panel3, _objectSpread$c(_objectSpread$c({
        className: "p-6 rounded border-4 space-y-4"
      }, styles3), {}, {
        children: [/*#__PURE__*/jsx(Heading3, _objectSpread$c(_objectSpread$c({
          title: "Heading 3"
        }, heading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.HEADING_3, heading3Styles);
          }
        })), /*#__PURE__*/jsx(SubHeading3, _objectSpread$c(_objectSpread$c({
          title: "Subheading"
        }, subHeading3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.SUBHEADING_3, subHeading3Styles);
          }
        })), /*#__PURE__*/jsx(Paragraph3, _objectSpread$c(_objectSpread$c({
          text: "Paragraph 3 - The quick brown fox jumps over the lazy dog."
        }, paragraph3Styles), {}, {
          padding: false,
          onClick: function onClick() {
            return handleClickItem(themeObjects.PARAGRAPH_3, paragraph3Styles);
          }
        })), /*#__PURE__*/jsx(Button3, _objectSpread$c(_objectSpread$c({
          title: "Button"
        }, button3Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_3, button3Styles);
          }
        })), /*#__PURE__*/jsx(ButtonIcon3, _objectSpread$c(_objectSpread$c({
          text: "Button Icon 3",
          icon: "pencil"
        }, buttonIcon3Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
          }
        })), /*#__PURE__*/jsx(ButtonIcon3, _objectSpread$c(_objectSpread$c({
          icon: "pencil"
        }, buttonIcon3Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.BUTTON_ICON_3, buttonIcon3Styles);
          }
        })), /*#__PURE__*/jsx(MenuItem3, _objectSpread$c(_objectSpread$c({}, menuItem3Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.MENU_ITEM_3, menuItem3Styles);
          },
          children: "Menu Item"
        })), /*#__PURE__*/jsx(Tag3, _objectSpread$c(_objectSpread$c({
          text: "Tag",
          icon: "pencil"
        }, tag3Styles), {}, {
          onClick: function onClick() {
            return handleClickItem(themeObjects.TAG_3, tag3Styles);
          }
        }))]
      }))]
    });
  }
  return /*#__PURE__*/jsxs(ThemePane, {
    children: [renderPanels(), /*#__PURE__*/jsx(Panel, {
      className: "p-10 rounded space-y-4 h-fit",
      children: renderText()
    })]
  });
};

function _typeof$g(obj) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$g(obj); }
var _excluded$9 = ["colorFromTheme", "colorName", "shade", "variant", "colorType", "colorLevelName", "selected", "onClick", "onMouseOver", "width", "height"];
function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty$c(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$g(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$g(arg) { var key = _toPrimitive$g(arg, "string"); return _typeof$g(key) === "symbol" ? key : String(key); }
function _toPrimitive$g(input, hint) { if (_typeof$g(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$g(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$9(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$9(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$9(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ColorTile = function ColorTile(_ref) {
  var _ref$colorFromTheme = _ref.colorFromTheme,
    colorFromTheme = _ref$colorFromTheme === void 0 ? null : _ref$colorFromTheme,
    _ref$colorName = _ref.colorName,
    colorName = _ref$colorName === void 0 ? null : _ref$colorName,
    _ref$shade = _ref.shade,
    shade = _ref$shade === void 0 ? null : _ref$shade,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "dark" : _ref$variant,
    _ref$colorType = _ref.colorType,
    colorType = _ref$colorType === void 0 ? null : _ref$colorType,
    _ref$colorLevelName = _ref.colorLevelName,
    colorLevelName = _ref$colorLevelName === void 0 ? null : _ref$colorLevelName,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    _ref$onClick = _ref.onClick,
    _onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$onMouseOver = _ref.onMouseOver,
    _onMouseOver = _ref$onMouseOver === void 0 ? null : _ref$onMouseOver,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-10" : _ref$height,
    rest = _objectWithoutProperties$9(_ref, _excluded$9);
  var c = ColorModel(_objectSpread$b({
    colorFromTheme: colorFromTheme,
    colorName: colorName,
    colorType: colorType,
    shade: shade,
    variant: variant,
    level: colorLevelName
  }, rest));

  // console.log('Color Model Tile ', c);

  // const stringColor = colorFromTheme === null ? `bg-${colorName}${shade !== null ? `-${shade}` : ''}` : colorFromTheme;
  // const parts = colorFromTheme !== null ? colorFromTheme.split('-') : null;

  // const derivedShade = parts !== null ? parts[parts.length -1] : null;
  // const derivedColorName = parts !== null ? parts[parts.length - 2] : null;

  // const stringThemeColorName = '';
  // const objToSend = {
  //     colorName: colorName !== null ? colorName : colorFromTheme !== null && derivedColorName,
  //     shade: shade !== null ? shade : colorFromTheme !== null && derivedShade,
  //     stringColor,
  //     ...rest
  // };

  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col rounded-lg cursor-pointer items-center justify-center border-2 ".concat(selected === true ? "border-yellow-500" : "border-gray-800", " hover:border-yellow-500 border-gray-800 ").concat(c["class"], " ").concat(width, " ").concat(height),
    onClick: function onClick() {
      return _onClick !== null ? _onClick(_objectSpread$b(_objectSpread$b({}, c), rest)) : null;
    },
    onMouseOver: function onMouseOver() {
      return _onMouseOver !== null ? _onMouseOver(_objectSpread$b(_objectSpread$b({}, c), rest)) : null;
    },
    children: c.hex[shade]
  });
};

function _typeof$f(obj) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$f(obj); }
function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$b(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$f(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$f(arg) { var key = _toPrimitive$f(arg, "string"); return _typeof$f(key) === "symbol" ? key : String(key); }
function _toPrimitive$f(input, hint) { if (_typeof$f(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$f(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PreviewColorsPane = function PreviewColorsPane(_ref) {
  var _ref$styles = _ref.styles,
    styles = _ref$styles === void 0 ? null : _ref$styles,
    theme = _ref.theme,
    _ref$itemType = _ref.itemType,
    itemType = _ref$itemType === void 0 ? null : _ref$itemType,
    _ref$onClickItem = _ref.onClickItem,
    onClickItem = _ref$onClickItem === void 0 ? null : _ref$onClickItem,
    _ref$onResetStyles = _ref.onResetStyles,
    onResetStyles = _ref$onResetStyles === void 0 ? null : _ref$onResetStyles;
  var _useContext = useContext$1(ThemeContext),
    themeVariant = _useContext.themeVariant;
  function handleClickItem(data, styleNameCss, itemType, objectType) {
    // override the object type
    data["objectType"] = objectType;
    onClickItem(_objectSpread$a(_objectSpread$a({}, data), {}, {
      itemType: itemType,
      styleName: styleNameCss
    }));
  }
  function handleResetStyles() {
    onResetStyles(itemType);
  }
  function hasCustomStyles() {
    var hasStyles = false;
    // are there any styles (custom) in the theme for this item?
    var themeStyles = theme[themeVariant][itemType];
    // do we have any custom styles in the theme?
    if (themeStyles !== undefined) {
      Object.keys(styles).forEach(function (styleKey) {
        if (styleKey in themeStyles) {
          hasStyles = true;
        }
      });
    }
    return hasStyles;
  }
  function renderAvailableColors() {
    // are there any styles (custom) in the theme for this item?
    var themeStyles = theme[themeVariant][itemType];
    // do we have any custom styles in the theme?
    var newStyles = deepCopy(styles);
    if (themeStyles !== undefined) {
      Object.keys(styles).forEach(function (styleKey) {
        newStyles[styleKey] = styleKey in themeStyles ? themeStyles[styleKey] : styles[styleKey];
      });
    }
    return Object.keys(newStyles).filter(function (t) {
      return t !== "string";
    }).map(function (key) {
      // lets get the base...
      // we also have to compare the current theme selected and the colors that are in there?
      // does the item have a default for the key? if not, abort!

      var parts = key in newStyles ? newStyles[key] !== undefined ? newStyles[key].split("-") : null : null;
      if (parts !== null) {
        var objectType = parts[0];
        var colorName = parts[1];
        var shade = parts[2];
        return key !== "string" && /*#__PURE__*/jsxs("div", {
          className: "flex flex-row justify-between py-2 items-center border-b border-gray-700 px-2",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-col space-y-1",
            children: /*#__PURE__*/jsx("span", {
              className: "text-sm font-bold text-gray-300",
              children: key
            })
          }), /*#__PURE__*/jsx(ColorTile, {
            width: "w-1/2",
            colorFromTheme: "".concat(parts[0], "-").concat(parts[1], "-").concat(parts[2]),
            shade: shade,
            colorName: colorName,
            panelType: "item",
            itemType: itemType,
            objectType: "bg",
            variant: "dark",
            onClick: function onClick(data) {
              return handleClickItem(data, key, itemType, objectType);
            }
          })]
        }, "preview-color-".concat(key));
      }
      return null;
    });
  }
  return styles !== null && itemType !== null ? /*#__PURE__*/jsxs(ThemePane, {
    children: [/*#__PURE__*/jsx("div", {
      className: "flex flex-col",
      children: renderAvailableColors()
    }), hasCustomStyles() === true && /*#__PURE__*/jsx("div", {
      className: "flex flex-row justify-end",
      children: /*#__PURE__*/jsx(Tag3, {
        theme: false,
        text: "Reset to Default",
        backgroundColor: "bg-orange-700",
        onClick: handleResetStyles,
        textSize: "text-xs"
      })
    })]
  }) : null;
};

var AvailableColorsGridPane = function AvailableColorsGridPane(_ref) {
  var colorType = _ref.colorType,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$onMouseOver = _ref.onMouseOver,
    onMouseOver = _ref$onMouseOver === void 0 ? null : _ref$onMouseOver,
    _ref$shade = _ref.shade,
    shade = _ref$shade === void 0 ? null : _ref$shade;
  function handleChooseColor(data) {
    onClick !== null && onClick(data);
  }
  function handleChooseColorTemp(data) {
    onMouseOver !== null && onMouseOver(data);
  }
  function renderAvailableColors() {
    return colorNames.sort().map(function (colorName) {
      return shades.filter(function (c) {
        return shade === null ? true : c === shade;
      }).map(function (shadeLevel) {
        return /*#__PURE__*/jsxs("div", {
          className: "flex flex-row justify-between items-center",
          children: [/*#__PURE__*/jsxs("span", {
            className: "font-bold",
            children: [colorName, " ", shadeLevel]
          }), /*#__PURE__*/jsx(ColorTile, {
            width: "w-2/3",
            colorType: colorType,
            colorName: colorName,
            shade: shadeLevel,
            onClick: handleChooseColor,
            onMouseOver: handleChooseColorTemp
          })]
        });
      });
    });
  }
  return /*#__PURE__*/jsx(ThemePane, {
    children: /*#__PURE__*/jsx("div", {
      className: "grid grid-cols-1 gap-1",
      children: renderAvailableColors()
    })
  });
};

function _slicedToArray$l(arr, i) { return _arrayWithHoles$l(arr) || _iterableToArrayLimit$l(arr, i) || _unsupportedIterableToArray$m(arr, i) || _nonIterableRest$l(); }
function _nonIterableRest$l() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$m(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$m(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$m(o, minLen); }
function _arrayLikeToArray$m(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$l(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$l(arr) { if (Array.isArray(arr)) return arr; }
var ThemeMenuPane = function ThemeMenuPane(_ref) {
  var theme = _ref.theme,
    onChooseColor = _ref.onChooseColor,
    onChooseReplacementColor = _ref.onChooseReplacementColor;
  var _useState = useState(null),
    _useState2 = _slicedToArray$l(_useState, 2),
    selectedColor = _useState2[0],
    setSelectedColor = _useState2[1];
  var _useContext = useContext$1(ThemeContext),
    themeVariant = _useContext.themeVariant;
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  // useEffect(() => {
  //     forceUpdate();
  // }, [theme]);

  function handleSelectColor(c, colorType) {
    setSelectedColor({
      color: c,
      colorType: colorType,
      type: c["objectType"],
      itemType: c["itemType"]
    });
    onChooseColor(c);
  }

  // function handleSelectColorTemp(c, colorType) {
  //     setSelectedColor({ color: c, colorType, type: c['objectType'], itemType: c['itemType'] });
  //     onChooseColor(c);
  // }

  function handleReplaceColor(_ref2) {
    var _ref2$panelType = _ref2.panelType,
      panelType = _ref2$panelType === void 0 ? "main" : _ref2$panelType,
      colorType = _ref2.colorType,
      colorName = _ref2.colorName,
      _ref2$shade = _ref2.shade,
      shade = _ref2$shade === void 0 ? 500 : _ref2$shade;
    if (selectedColor !== null) {
      var colorReplacement = {
        colorName: colorName,
        colorType: colorType,
        shade: shade,
        panelType: panelType
      };
      var r = ColorModel(colorReplacement);
      onChooseReplacementColor(selectedColor, r);
      setSelectedColor(null);
    }
  }
  function handleReplaceColorTemp(_ref3) {
    var _ref3$panelType = _ref3.panelType,
      panelType = _ref3$panelType === void 0 ? "main" : _ref3$panelType,
      colorType = _ref3.colorType,
      colorName = _ref3.colorName,
      _ref3$shade = _ref3.shade,
      shade = _ref3$shade === void 0 ? 500 : _ref3$shade;
    if (selectedColor !== null) {
      var colorReplacement = {
        colorName: colorName,
        colorType: colorType,
        shade: shade,
        panelType: panelType
      };
      var r = ColorModel(colorReplacement);
      onChooseReplacementColor(selectedColor, r);
    }
  }
  return /*#__PURE__*/jsxs(ThemePane, {
    className: "space-y-2",
    children: [(selectedColor === null || selectedColor["color"]["panelType"] === "main") && /*#__PURE__*/jsxs("div", {
      className: "flex flex-col rounded w-full bg-gray-800 space-y-2",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
        children: "Main"
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-row w-full space-x-2 p-4",
        children: colorTypes.filter(function (ct) {
          return selectedColor !== null ? selectedColor["color"]["panelType"] === "main" && selectedColor["color"]["colorType"] === ct : true;
        }).map(function (colorType) {
          var bgColor = theme[themeVariant][colorType];
          // const selected = selectedColor !== null
          //     ? colorType === selectedColor['color']['colorType'] && bgColor === selectedColor['color']['colorName'] && selectedColor['color']['panelType'] === 'main'
          //     : false;
          return /*#__PURE__*/jsx(ColorTile, {
            colorName: bgColor,
            colorType: colorType,
            colorLevelName: null,
            selected: false,
            panelType: "main",
            shade: 500,
            onClick: function onClick(c) {
              return handleSelectColor(c, colorType);
            },
            width: "w-full"
          });
        })
      })]
    }), (selectedColor === null || selectedColor["color"]["panelType"] === "sub") && /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded w-full space-y-2 min-h-1/4 overflow-y-scroll ".concat(selectedColor !== null ? "h-1/4" : "h-full"),
      children: colorTypes.filter(function (ct) {
        return selectedColor !== null ? selectedColor["color"]["panelType"] === "sub" && selectedColor["color"]["colorType"] === ct : true;
      }).map(function (colorType) {
        return /*#__PURE__*/jsxs("div", {
          className: "flex flex-col w-full h-full rounded bg-gray-800",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
            children: colorType
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col p-2",
            children: themeVariants.filter(function (v) {
              return selectedColor !== null ? selectedColor["color"]["level"] === v : true;
            }).map(function (colorLevelName) {
              // console.log('color level name ', colorLevelName, selectedColor['color']['level']);
              var stringToCheck = "bg-".concat(colorType, "-").concat(colorLevelName);
              // const bgColor = theme[themeVariant][colorType];
              var themeColor = theme[themeVariant][stringToCheck];
              var parts = themeColor.split("-");
              var colorName = parts[1];
              var shade = parts[parts.length - 1];
              var selected = selectedColor !== null ? colorType === selectedColor["color"]["colorType"] && colorLevelName === selectedColor["color"]["level"] && selectedColor["color"]["panelType"] === "sub" : false;
              return /*#__PURE__*/jsxs("div", {
                className: "flex flex-row justify-between py-2 items-center border-b border-gray-700 px-2",
                children: [/*#__PURE__*/jsx("span", {
                  className: "text-sm font-bold text-gray-300",
                  children: colorLevelName
                }), /*#__PURE__*/jsx(ColorTile, {
                  colorFromTheme: themeColor,
                  colorName: colorName,
                  colorType: colorType,
                  colorLevelName: colorLevelName,
                  variant: themeVariant,
                  selected: selected,
                  panelType: "sub",
                  shade: shade,
                  onClick: handleSelectColor
                  // onHover={handleSelectColorTemp}
                  // height={'h-5'}
                  ,
                  width: "w-1/2"
                })]
              });
            })
          })]
        });
      })
    }), selectedColor !== null && /*#__PURE__*/jsxs("div", {
      className: "flex flex-col roundedw-full bg-gray-800 space-y-4 overflow-hidden h-full",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
        children: "Available Colors"
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-col p-2 h-full overflow-y-scroll",
        children: /*#__PURE__*/jsx(AvailableColorsGridPane, {
          colorType: selectedColor["color"]["colorType"],
          onClick: handleReplaceColor,
          onMouseOver: handleReplaceColorTemp,
          shade: selectedColor["color"]["panelType"] === "main" ? 500 : null
        })
      })]
    })]
  });
};

function _slicedToArray$k(arr, i) { return _arrayWithHoles$k(arr) || _iterableToArrayLimit$k(arr, i) || _unsupportedIterableToArray$l(arr, i) || _nonIterableRest$k(); }
function _nonIterableRest$k() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$l(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$l(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$l(o, minLen); }
function _arrayLikeToArray$l(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$k(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$k(arr) { if (Array.isArray(arr)) return arr; }
var PanelSelectTheme = function PanelSelectTheme(_ref) {
  var onUpdate = _ref.onUpdate,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? null : _ref$theme,
    themeKey = _ref.themeKey,
    rawTheme = _ref.rawTheme;
  var _useContext = useContext$1(ThemeContext),
    themeVariant = _useContext.themeVariant,
    rawThemes = _useContext.rawThemes;
  var _useState = useState(theme),
    _useState2 = _slicedToArray$k(_useState, 2),
    themeSelected = _useState2[0],
    setThemeSelected = _useState2[1];
  // const [themeMainColor, setThemeMainColor] = useState(null);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$k(_useState3, 2),
    themeNameToEdit = _useState4[0],
    setThemeNameToEdit = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$k(_useState5, 2),
    itemSelected = _useState6[0],
    setItemSelected = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$k(_useState7, 2),
    itemColorSelected = _useState8[0],
    setItemColorSelected = _useState8[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$k(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (deepEqual(theme, themeSelected) === false) {
      setThemeSelected(function () {
        return theme;
      });
      forceUpdate();
    }
  }, [theme, rawThemes, themeSelected, forceUpdate]);

  // function handleSelectThemeColor(colorType, variant, objectType) {
  //     const themeToEdit = { colorType, variant, objectType };
  //     setThemeNameToEdit(() => themeToEdit);
  // }

  function handleSelectColor(color) {
    // const c = ColorModel(color);
    // if (color['panelType'] === 'main') {
    //     setThemeMainColor(c);
    // }
    // if (color['panelType'] === 'sub') {
    //     console.log('color selected SUB ', color);
    // }
    setThemeNameToEdit(color);
  }
  function handleSelectReplacementColor(color, colorReplacement) {
    var newTheme = deepCopy(rawTheme);
    var replacementColorModel = ColorModel(colorReplacement);
    // set the MAIN color
    if (themeNameToEdit["panelType"] === "main") {
      // use the type we added on in the main panel, not from the model
      newTheme[color["colorType"]] = replacementColorModel["colorName"];
      onUpdate(newTheme, themeKey);
      // setThemeMainColor(() => null);
      forceUpdate();
    }

    // set the generated value (override)
    if (themeNameToEdit["panelType"] === "sub") {
      // make sure we have the variant in the RAW THEME
      if (themeVariant in newTheme === false) {
        newTheme[themeVariant] = {};
      }
      newTheme[themeVariant][themeNameToEdit["themeClass"]] = replacementColorModel["class"];
      onUpdate(newTheme, themeKey);
      // setThemeMainColor(() => null);
      forceUpdate();
    }
  }
  function handleThemeNameChange(e) {
    try {
      if (rawTheme) {
        var newTheme = deepCopy(rawTheme);
        newTheme["name"] = e.target.value;
        // push the new color change to the theme manager modal
        onUpdate(newTheme, themeKey);
      }
    } catch (e) {
      console.log("error selecting ", e.message);
    }
  }
  function handleSelectComponent(data) {
    setItemSelected(function () {
      return data;
    });
    setItemColorSelected(null);
  }
  function handleSelectColorForItem(data) {
    try {
      if (rawTheme) {
        var newTheme = deepCopy(rawTheme);
        var itemType = itemColorSelected.itemType,
          styleName = itemColorSelected.styleName,
          objectType = itemColorSelected.objectType;
        var colorName = data.colorName,
          shade = data.shade;
        if (itemType in newTheme[themeVariant] === false) {
          newTheme[themeVariant][itemType] = {};
        }
        newTheme[themeVariant][itemType][styleName] = "".concat(objectType, "-").concat(colorName, "-").concat(shade);
        // push the new color change to the theme manager modal
        onUpdate(newTheme, themeKey);
        setItemColorSelected(null);
      }
    } catch (e) {
      console.log("error selecting ", e.message);
    }
  }
  function handleSelectColorForItemTemp(data) {
    try {
      if (rawTheme !== null && rawTheme !== undefined) {
        var newTheme = deepCopy(rawTheme);
        var itemType = itemColorSelected.itemType,
          styleName = itemColorSelected.styleName,
          objectType = itemColorSelected.objectType;
        var colorName = data.colorName,
          shade = data.shade;
        // check if light|dark exists in the raw theme
        if (themeVariant && themeVariant in newTheme === false) {
          newTheme[themeVariant] = {};
        }
        // now check within the variant type for the item (button, etc...)
        if (itemType && itemType in newTheme[themeVariant] === false) {
          newTheme[themeVariant][itemType] = {};
        }
        newTheme[themeVariant][itemType][styleName] = "".concat(objectType, "-").concat(colorName, "-").concat(shade);
        // push the new color change to the theme manager modal
        onUpdate(newTheme, themeKey);
      }
    } catch (e) {
      console.log("error selecting ", e.message);
    }
  }
  function handleResetStylesForItem(itemType) {
    try {
      if (rawTheme !== null && rawTheme !== undefined) {
        var newTheme = deepCopy(rawTheme);
        // check if light|dark exists in the raw theme
        if (themeVariant && themeVariant in newTheme === false) {
          newTheme[themeVariant] = {};
        }
        newTheme[themeVariant][itemType] = {};
        // push the new color change to the theme manager modal
        onUpdate(newTheme, themeKey);
      }
    } catch (e) {
      console.log("error selecting ", e.message);
    }
  }
  function handleResetStylesForTheme(itemType) {
    try {
      if (rawTheme !== null && rawTheme !== undefined) {
        var newTheme = deepCopy(rawTheme);

        // remove all of the custom colors for each variant...
        newTheme["dark"] = {};
        newTheme["light"] = {};

        // push the new color change to the theme manager modal
        onUpdate(newTheme, themeKey);
      }
    } catch (e) {
      console.log("error selecting ", e.message);
    }
  }
  return /*#__PURE__*/jsx(Panel, {
    theme: false,
    backgroundColor: "",
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-row w-full h-full space-x-4 overflow-hidden",
      children: /*#__PURE__*/jsx("div", {
        className: "flex flex-row h-full rounded space-x-2 w-full",
        children: /*#__PURE__*/jsx("div", {
          className: "flex flex-row w-full space-x-2",
          children: /*#__PURE__*/jsxs("div", {
            className: "flex flex-col h-full rounded w-full overflow-hidden space-y-2",
            children: [/*#__PURE__*/jsxs("div", {
              className: "flex flex-row space-x-2",
              children: [themeSelected !== null && /*#__PURE__*/jsx(InputText, {
                name: "name",
                padding: "p-4",
                value: themeSelected.name,
                onChange: handleThemeNameChange,
                textSize: "text-lg",
                placeholder: "Colorama ;-)",
                bgColor: "bg-gray-900",
                textColor: "text-gray-400",
                hasBorder: false
              }), /*#__PURE__*/jsx(ButtonIcon, {
                onClick: handleResetStylesForTheme,
                icon: "trash",
                text: "Reset Theme"
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-row overflow-hidden space-x-1 h-full rounded bg-black w-full p-1",
              children: [/*#__PURE__*/jsx("div", {
                className: "flex flex-col min-w-1/4 w-1/4",
                children: /*#__PURE__*/jsx(ThemeMenuPane, {
                  theme: themeSelected,
                  onChooseColor: handleSelectColor,
                  onChooseReplacementColor: handleSelectReplacementColor
                })
              }), themeSelected && /*#__PURE__*/jsx("div", {
                className: "flex flex-col ".concat(itemSelected === null ? "w-3/4" : "w-1/2"),
                children: /*#__PURE__*/jsx(PreviewComponentsPane, {
                  theme: themeSelected,
                  themeVariant: themeVariant,
                  onClick: handleSelectComponent
                })
              }), /*#__PURE__*/jsxs("div", {
                className: "flex flex-col w-1/4 min-w-1/4 p-1 space-y-1",
                children: [itemSelected !== null && /*#__PURE__*/jsxs("div", {
                  className: "flex flex-col rounded bg-gray-800 space-y-4 overflow-hidden ".concat(itemColorSelected !== null ? "h-1/2" : "h-full"),
                  children: [/*#__PURE__*/jsx("div", {
                    className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
                    children: itemSelected["item"]
                  }), /*#__PURE__*/jsx("div", {
                    className: "flex flex-col p-2 overflow-y-scroll",
                    children: /*#__PURE__*/jsx(PreviewColorsPane, {
                      styles: itemSelected["styles"],
                      theme: themeSelected,
                      itemType: itemSelected["item"],
                      onClickItem: function onClickItem(i) {
                        setItemColorSelected(i);
                        forceUpdate();
                      },
                      onResetStyles: handleResetStylesForItem
                    })
                  })]
                }), itemSelected === null && /*#__PURE__*/jsxs("div", {
                  className: "flex flex-col rounded bg-gray-800 space-y-4 overflow-hidden ".concat(itemColorSelected !== null ? "h-1/2" : "h-full"),
                  children: [/*#__PURE__*/jsx("div", {
                    className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
                    children: "Inspector"
                  }), /*#__PURE__*/jsx("div", {
                    className: "flex flex-col p-2 overflow-y-scroll"
                  })]
                }), itemColorSelected !== null && /*#__PURE__*/jsxs("div", {
                  className: "flex flex-col rounded bg-gray-800 space-y-4 overflow-hidden h-1/2",
                  children: [/*#__PURE__*/jsx("div", {
                    className: "flex flex-row text-xs uppercase font-bold w-full text-gray-200 bg-gray-900 p-2 rounded-t border-b border-gray-700",
                    children: "Available Colors"
                  }), /*#__PURE__*/jsx("div", {
                    className: "flex flex-col overflow-y-scroll",
                    children: /*#__PURE__*/jsx(AvailableColorsGridPane, {
                      itemType: itemSelected,
                      onMouseOver: handleSelectColorForItemTemp,
                      onClick: handleSelectColorForItem
                    })
                  })]
                })]
              })]
            })]
          })
        })
      })
    })
  });
};

var ThemePickerGridPane = function ThemePickerGridPane(_ref) {
  var themeKey = _ref.themeKey,
    onChooseTheme = _ref.onChooseTheme;
  var _useContext = useContext$1(ThemeContext),
    themes = _useContext.themes,
    themeVariant = _useContext.themeVariant;
  function renderMenuItem(tk) {
    var displayTheme = themes[tk][themeVariant];
    var colors = [{
      colorName: displayTheme["secondary"],
      type: "secondary",
      color: displayTheme["bg-secondary-medium"]
    }, {
      colorName: displayTheme["tertiary"],
      type: "tertiary",
      color: displayTheme["bg-tertiary-medium"]
    }, {
      colorName: displayTheme["neutral"],
      type: "neutral",
      color: displayTheme["bg-neutral-light"]
    }];
    return colors.map(function (color) {
      return /*#__PURE__*/jsx("div", {
        className: "rounded ".concat(color["color"], " h-20 w-full")
      }, "theme-grid-".concat(color));
    });
  }
  function renderCurrentThemes() {
    return Object.keys(themes).map(function (tk) {
      // is this selected
      var selected = tk === themeKey;
      var current = themes[tk][themeVariant];
      return /*#__PURE__*/jsxs("div", {
        className: "flex flex-col text-xs p-4 space-y-4 h-48 w-full rounded justify-between border-2 ".concat(selected === true ? "border-yellow-600 hover:border-yellow-600" : "hover:border-yellow-600 border-gray-800", " cursor-pointer text-gray-200 ").concat(themes[tk][themeVariant]["bg-primary-dark"]),
        onClick: function onClick() {
          return onChooseTheme(tk);
        },
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-col w-full",
          children: [/*#__PURE__*/jsx("span", {
            className: "font-bold text-xl word-break-all",
            children: current["name"]
          }), /*#__PURE__*/jsx("span", {
            className: "font-bold text-xs text-gray-500",
            children: tk
          })]
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-row space-x-2",
          children: renderMenuItem(tk)
        })]
      }, "icon-".concat(tk));
    });
  }
  return /*#__PURE__*/jsx(ThemePane, {
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-row rounded overflow-hidden justify-center items-center align-center w-full",
      children: /*#__PURE__*/jsx("div", {
        className: "grid grid-cols-3 gap-4 w-full h-full overflow-y-scroll",
        children: renderCurrentThemes()
      })
    })
  });
};

var ThemeTitlePane = function ThemeTitlePane(_ref) {
  var onChooseVariant = _ref.onChooseVariant,
    onClickNewTheme = _ref.onClickNewTheme;
  var _useContext = useContext$1(ThemeContext),
    themeVariant = _useContext.themeVariant;
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col rounded font-medium hidden xl:flex w-1/3 justify-between",
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded font-medium justify-between overflow-hidden",
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col rounded p-6 py-10 space-y-4 w-full hidden xl:flex",
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-row",
          children: [/*#__PURE__*/jsx(Heading, {
            title: "Color.",
            padding: false,
            textColor: "text-gray-300"
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "plus",
            textSize: "text-2xl",
            backgroundColor: "bg-gray-800",
            hoverBackgroundColor: "hover:bg-green-600",
            iconSize: "h-6 w-6",
            textColor: "text-gray-400",
            onClick: onClickNewTheme
          })]
        }), /*#__PURE__*/jsxs("p", {
          className: "text-lg font-normal text-gray-300",
          children: ["We all know dark is best, but if you", " ", /*#__PURE__*/jsx("span", {
            className: "italic",
            children: "have"
          }), " to change colors, we'll allow it."]
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-col space-y-2 w-full",
          children: /*#__PURE__*/jsx(Toggle, {
            enabled: themeVariant === "dark" ? true : false,
            setEnabled: function setEnabled() {
              return onChooseVariant(themeVariant === "dark" ? "light" : "dark");
            },
            text: "Dark",
            theme: false,
            backgroundColor: "bg-gray-900",
            hoverBackgroundColor: "hover:bg-gray-900"
          })
        })]
      })
    })
  });
};

var PanelThemePicker = function PanelThemePicker(_ref) {
  var onUpdate = _ref.onUpdate,
    onCreateNew = _ref.onCreateNew,
    onChangeVariant = _ref.onChangeVariant,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? null : _ref$theme,
    themeKey = _ref.themeKey;
  var _useContext = useContext$1(ThemeContext);
    _useContext.themeVariant;
    var rawThemes = _useContext.rawThemes;
  function handleSelectTheme(themeKey) {
    onUpdate(rawThemes[themeKey], themeKey);
  }
  function handleCreateNewTheme() {
    // lets generate a new Key, and a new theme
    onCreateNew("theme-".concat(Date.now()));
  }
  return /*#__PURE__*/jsx(Panel, {
    theme: false,
    backgroundColor: "bg-transparent",
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col w-full h-full xl:space-x-4 overflow-hidden",
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-row h-full rounded xl:space-x-4 w-full",
        children: [/*#__PURE__*/jsx(ThemeTitlePane, {
          theme: theme,
          themeKey: themeKey,
          onClickNewTheme: handleCreateNewTheme,
          onChooseVariant: onChangeVariant
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-col w-full w-1/2 xl:w-3/4",
          children: theme !== null && /*#__PURE__*/jsx("div", {
            className: "flex flex-row h-full rounded w-full overflow-hidden bg-gray-900 xl:space-x-2 p-2",
            children: /*#__PURE__*/jsx(ThemePickerGridPane, {
              theme: theme,
              themeKey: themeKey,
              onClickNewTheme: handleCreateNewTheme,
              onChooseTheme: handleSelectTheme,
              onChooseVariant: onChangeVariant
            })
          })
        })]
      })
    })
  });
};

function _slicedToArray$j(arr, i) { return _arrayWithHoles$j(arr) || _iterableToArrayLimit$j(arr, i) || _unsupportedIterableToArray$k(arr, i) || _nonIterableRest$j(); }
function _nonIterableRest$j() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$k(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$k(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$k(o, minLen); }
function _arrayLikeToArray$k(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$j(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$j(arr) { if (Array.isArray(arr)) return arr; }
var ThemeManagerModal = function ThemeManagerModal(_ref) {
  var open = _ref.open,
    setIsOpen = _ref.setIsOpen;
  var _useContext = useContext$1(ThemeContext),
    changeThemesForApplication = _useContext.changeThemesForApplication,
    rawThemes = _useContext.rawThemes,
    themes = _useContext.themes,
    changeCurrentTheme = _useContext.changeCurrentTheme,
    changeThemeVariant = _useContext.changeThemeVariant;
  var _useContext2 = useContext$1(AppContext),
    api = _useContext2.api,
    creds = _useContext2.creds,
    settings = _useContext2.settings;
  var _useState = useState(null),
    _useState2 = _slicedToArray$j(_useState, 2),
    themeSelected = _useState2[0],
    setThemeSelected = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$j(_useState3, 2),
    rawThemeSelected = _useState4[0],
    setRawThemeSelected = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$j(_useState5, 2),
    themeKeySelected = _useState6[0],
    setThemeKeySelected = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$j(_useState7, 2),
    isEditing = _useState8[0],
    setIsEditing = _useState8[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$j(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (open === false) {
      setThemeSelected(null);
      setRawThemeSelected(null);
      setThemeKeySelected(null);
    } else {
      // if there is no key selected...
      if (themeKeySelected === null) {
        var themeKeyTemp = themeKeySelected === null && settings !== null && "theme" in settings ? settings["theme"] in themes ? settings["theme"] : Object.keys(themes)[0] : Object.keys(themes)[0];
        var themeModel = ThemeModel(rawThemes[themeKeyTemp]);
        setThemeKeySelected(function () {
          return themeKeyTemp;
        });
        setThemeSelected(function () {
          return themeModel;
        });
        setRawThemeSelected(function () {
          return rawThemes[themeKeyTemp];
        });
      }
    }
  }, [open, themes, rawThemes, settings, themeKeySelected]);
  function handleThemeSelected(themeUpdated, themeKey) {
    // the Raw theme is the "abbreviated" version which will be stored
    // in the file. The model will inflate this to fill in the rest

    // we have to merge the dirty information into this selected item if exists...
    var newRawThemeSelected = deepCopy(rawThemeSelected);
    if (newRawThemeSelected !== null) {
      Object.keys(themeUpdated).forEach(function (k) {
        newRawThemeSelected[k] = themeUpdated[k];
      });
    } else {
      newRawThemeSelected = deepCopy(themeUpdated);
    }
    setRawThemeSelected(function () {
      return newRawThemeSelected;
    });
    var newTheme = ThemeModel(deepCopy(newRawThemeSelected));
    setThemeKeySelected(function () {
      return themeKey;
    });
    setThemeSelected(function () {
      return newTheme;
    });
    // setIsEditing(true)
    forceUpdate();
  }
  function handleCreateNewTheme(themeKey) {
    var newRawTheme = {
      id: themeKey,
      name: "New Theme",
      primary: "gray",
      secondary: "slate",
      tertiary: "orange",
      neutral: "gray",
      shadeBackgroundFrom: 200,
      shadeBorderFrom: 300,
      shadeTextFrom: 700
    };

    // now we can present a new raw theme and store it...

    // // we have to merge the dirty information into this selected item if exists...
    var newRawThemes = deepCopy(rawThemes);
    newRawThemes[themeKey] = newRawTheme;

    // Here is where we have to add this theme to the themes available
    // and save to the themes file.
    api.removeAllListeners();
    api.on(api.events.THEME_SAVE_COMPLETE, handleSaveThemeCompleteNew);
    api.on(api.events.THEME_SAVE_ERROR, handleSaveThemeErrorNew);
    api.themes.saveThemeForApplication(creds.appId, themeKey, newRawTheme);
  }
  function handleSaveThemeCompleteNew(e, message) {
    changeThemesForApplication(message["themes"]);
    setRawThemeSelected(function () {
      return message["theme"];
    });
    setThemeKeySelected(function () {
      return message["key"];
    });
    var newTheme = ThemeModel(deepCopy(message["theme"]));
    setThemeSelected(function () {
      return newTheme;
    });
  }
  function handleSaveThemeErrorNew(e, message) {
    console.log(e, message);
  }
  function handleSaveTheme() {
    if (themeKeySelected !== null && rawThemeSelected !== null) {
      // Here is where we have to add this theme to the themes available
      // and save to the themes file.
      api.removeAllListeners();
      api.on(api.events.THEME_SAVE_COMPLETE, handleSaveThemeComplete);
      api.on(api.events.THEME_SAVE_ERROR, handleSaveThemeError);
      api.themes.saveThemeForApplication(creds.appId, themeKeySelected, rawThemeSelected);
    }
    setIsEditing(false);
  }
  function handleSaveThemeComplete(e, message) {
    changeThemesForApplication(message["themes"]);
    setIsEditing(false);
  }
  function handleSaveThemeError(e, message) {
    console.log("theme save error ", e, message);
  }
  function handleChooseTheme(themeKey) {
    setThemeSelected(function () {
      return themes[themeKey];
    });
    setThemeKeySelected(function () {
      return themeKey;
    });
    setRawThemeSelected(function () {
      return rawThemes[themeKey];
    });
  }
  function handleActivateTheme() {
    changeCurrentTheme(themeKeySelected);
    setIsOpen(false);
    // reset
    setThemeSelected(null);
    setIsEditing(false);
  }
  return /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-11/12 xl:w-5/6",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      backgroundColor: "bg-slate-800",
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col w-full h-full overflow-hidden",
        children: [/*#__PURE__*/jsx("div", {
          className: "flex flex-row w-full h-full overflow-hidden",
          children: /*#__PURE__*/jsxs("div", {
            className: "flex flex-row w-full h-full space-x-4 overflow-hidden p-4",
            children: [themeSelected && isEditing === false && /*#__PURE__*/jsx(PanelThemePicker, {
              theme: themeSelected,
              themeKey: themeKeySelected,
              onUpdate: handleThemeSelected,
              onCreateNew: handleCreateNewTheme,
              onChooseTheme: handleChooseTheme,
              onChangeVariant: changeThemeVariant,
              rawTheme: rawThemeSelected
            }), themeSelected && isEditing === true && /*#__PURE__*/jsx(PanelSelectTheme, {
              theme: themeSelected,
              themeKey: themeKeySelected,
              onUpdate: handleThemeSelected,
              onCreateNew: handleCreateNewTheme,
              rawTheme: rawThemeSelected
            })]
          })
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row justify-end bg-gray-900 p-4 rounded-br rounded-bl border-t border-gray-800 justify-between items-center",
          children: [themeSelected !== null && /*#__PURE__*/jsx("div", {
            className: "flex flex-row",
            children: /*#__PURE__*/jsxs("div", {
              className: "flex flex-col font-bold text-xl px-2",
              children: [themeSelected !== null ? themeSelected["name"] : "", /*#__PURE__*/jsx("span", {
                className: "text-xs text-gray-600",
                children: themeKeySelected
              })]
            })
          }), isEditing === false && /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(Button, {
              onClick: function onClick() {
                return setIsOpen(false);
              },
              title: "Cancel",
              textSize: "text-base xl:text-lg",
              padding: "py-2 px-4",
              backgroundColor: "bg-gray-700",
              textColor: "text-gray-300",
              hoverTextColor: "hover:text-gray-100",
              hoverBackgroundColor: "hover:bg-gray-700"
            }), themeSelected !== null && /*#__PURE__*/jsx(Button, {
              onClick: function onClick() {
                return setIsEditing(true);
              },
              title: "Edit",
              textSize: "text-base xl:text-lg",
              padding: "py-2 px-4",
              backgroundColor: "bg-gray-700",
              textColor: "text-gray-300",
              hoverTextColor: "hover:text-gray-100",
              hoverBackgroundColor: "hover:bg-gray-700"
            }), themeSelected !== null && /*#__PURE__*/jsx(Button, {
              onClick: handleActivateTheme,
              title: "Activate",
              textSize: "text-base xl:text-lg",
              padding: "py-2 px-4",
              backgroundColor: "bg-gray-700",
              textColor: "text-gray-300",
              hoverTextColor: "hover:text-gray-100",
              hoverBackgroundColor: "hover:bg-gray-700"
            })]
          }), isEditing === true && /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(Button, {
              onClick: function onClick() {
                return setIsEditing(false);
              },
              title: "Cancel",
              textSize: "text-base xl:text-lg",
              padding: "py-2 px-4",
              backgroundColor: "bg-gray-700",
              textColor: "text-gray-300",
              hoverTextColor: "hover:text-gray-100",
              hoverBackgroundColor: "hover:bg-gray-700"
            }), /*#__PURE__*/jsx(Button, {
              onClick: function onClick() {
                return handleSaveTheme();
              },
              title: "Save Changes",
              textSize: "text-base xl:text-lg",
              padding: "py-2 px-4",
              backgroundColor: "bg-gray-700",
              textColor: "text-gray-300",
              hoverTextColor: "hover:text-gray-100",
              hoverBackgroundColor: "hover:bg-gray-700"
            })]
          })]
        })]
      })
    })
  });
};

function _slicedToArray$i(arr, i) { return _arrayWithHoles$i(arr) || _iterableToArrayLimit$i(arr, i) || _unsupportedIterableToArray$j(arr, i) || _nonIterableRest$i(); }
function _nonIterableRest$i() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$j(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$j(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$j(o, minLen); }
function _arrayLikeToArray$j(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$i(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$i(arr) { if (Array.isArray(arr)) return arr; }
var PanelWelcome = function PanelWelcome(_ref) {
  var _ref$menuItems = _ref.menuItems,
    menuItems = _ref$menuItems === void 0 ? [] : _ref$menuItems,
    _ref$workspaces = _ref.workspaces,
    workspaces = _ref$workspaces === void 0 ? [] : _ref$workspaces,
    _ref$onClickWorkspace = _ref.onClickWorkspace,
    onClickWorkspace = _ref$onClickWorkspace === void 0 ? null : _ref$onClickWorkspace,
    _ref$onClickCreateMen = _ref.onClickCreateMenuItem,
    onClickCreateMenuItem = _ref$onClickCreateMen === void 0 ? null : _ref$onClickCreateMen;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme,
    currentTheme = _useContext.currentTheme,
    changeThemeVariant = _useContext.changeThemeVariant,
    themeVariant = _useContext.themeVariant;
    _useContext.themeKey;
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$i(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    forceUpdate();
  }, [theme, currentTheme, forceUpdate]);
  function renderWorkspaces() {
    return workspaces.map(function (ws) {
      var isOrphan = workspaceIsOrphan(ws);
      var icon = iconForMenuItem(ws.menuId);
      return /*#__PURE__*/jsxs(MenuItem, {
        onClick: function onClick() {
          return onClickWorkspace(ws);
        },
        children: [/*#__PURE__*/jsx(Paragraph2, {
          text: ws.name
        }), isOrphan === true && /*#__PURE__*/jsx(FontAwesomeIcon, {
          icon: "folder",
          className: "pr-2"
        }), isOrphan === false && icon !== null && /*#__PURE__*/jsx(FontAwesomeIcon, {
          icon: icon,
          className: "pr-2"
        })]
      }, "workspace-".concat(ws.id));
    });
  }
  function workspaceIsOrphan(workspaceToCheck) {
    return menuItems.filter(function (menuItem) {
      return menuItem.id === workspaceToCheck.menuId;
    }).length === 0;
  }
  function iconForMenuItem(menuId) {
    try {
      var matches = menuItems.filter(function (menuItem) {
        return parseInt(menuItem["id"], 10) === parseInt(menuId, 10);
      });
      return matches.length > 0 ? matches[0]["icon"] : null;
    } catch (e) {
      return null;
    }
  }
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col w-full h-full overflow-hidden items-center justify-center",
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col w-5/6 h-5/6 overflow-hidden rounded-lg items-center justify-center",
      children: /*#__PURE__*/jsx(Panel2, {
        className: "items-center justify-center border-2 rounded-lg shadow",
        children: /*#__PURE__*/jsx("div", {
          className: "flex flex-col w-full h-full overflow-hidden p-4",
          children: /*#__PURE__*/jsxs("div", {
            className: "flex flex-row w-full h-full overflow-hidden xl:justify-between xl:space-x-4",
            children: [/*#__PURE__*/jsxs("div", {
              className: "flex-col h-full rounded font-medium w-full hidden xl:flex xl:w-1/3 p-10 justify-between",
              children: [/*#__PURE__*/jsxs("div", {
                className: "flex flex-col rounded py-10 space-y-4",
                children: [/*#__PURE__*/jsx(Heading, {
                  title: "Dash.",
                  padding: false
                }), /*#__PURE__*/jsx(SubHeading3, {
                  title: "Dashboard Generator.",
                  padding: false
                })]
              }), /*#__PURE__*/jsxs("div", {
                className: "flex flex-row space-x-2 items-center",
                children: [theme !== null && theme !== undefined && /*#__PURE__*/jsx(Paragraph3, {
                  text: "".concat(theme["name"], " ").concat(themeVariant),
                  padding: false
                }), /*#__PURE__*/jsx(Toggle, {
                  enabled: themeVariant === "dark" ? true : false,
                  setEnabled: function setEnabled() {
                    return changeThemeVariant(themeVariant === "dark" ? "light" : "dark");
                  },
                  text: "Dark"
                })]
              })]
            }), /*#__PURE__*/jsxs(Panel3, {
              className: "flex flex-col h-full rounded xl:rounded-0 w-full lg:w-full p-10",
              children: [/*#__PURE__*/jsxs("div", {
                className: "flex flex-row overflow-y-scroll p-2 font-bold mb-4 justify-between items-center",
                children: [/*#__PURE__*/jsx(SubHeading3, {
                  title: "You have ".concat(menuItems.length, " folders and ").concat(workspaces.length, " Dashboards created."),
                  padding: false
                }), /*#__PURE__*/jsx(ButtonIcon, {
                  icon: "plus",
                  textSize: "text-lg",
                  onClick: function onClick() {
                    return onClickCreateMenuItem();
                  }
                })]
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col space-y-4 overflow-y-scroll py-4",
                children: renderWorkspaces()
              })]
            })]
          })
        })
      })
    })
  });
};

function _slicedToArray$h(arr, i) { return _arrayWithHoles$h(arr) || _iterableToArrayLimit$h(arr, i) || _unsupportedIterableToArray$i(arr, i) || _nonIterableRest$h(); }
function _nonIterableRest$h() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$i(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$i(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$i(o, minLen); }
function _arrayLikeToArray$i(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$h(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$h(arr) { if (Array.isArray(arr)) return arr; }
var PanelApplicationSettings = function PanelApplicationSettings(_ref) {
  var settings = _ref.settings,
    workspaces = _ref.workspaces,
    setIsOpen = _ref.setIsOpen;
  var messagesEnd = useRef(null);
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme,
    themes = _useContext.themes,
    changeCurrentTheme = _useContext.changeCurrentTheme;
  var _useContext2 = useContext$1(AppContext),
    creds = _useContext2.creds,
    api = _useContext2.api;
    _useContext2.debugMode;
    var changeDebugMode = _useContext2.changeDebugMode;
  var _useState = useState(""),
    _useState2 = _slicedToArray$h(_useState, 2),
    userInput = _useState2[0],
    setUserInput = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray$h(_useState3, 2),
    userInputIndex = _useState4[0],
    setUserInputIndex = _useState4[1];

  // store the "chat"
  var _useState5 = useState([]),
    _useState6 = _slicedToArray$h(_useState5, 2),
    applicationInput = _useState6[0],
    setApplicationInput = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray$h(_useState7, 2),
    userInputs = _useState8[0],
    setUserInputs = _useState8[1];
  useEffect(function () {
    if (applicationInput.length === 0) {
      addDashInput("Talk robot to me.");
    }
    scrollToBottom();
  });
  function handleUserInput(e) {
    // only add when the user presses enter
    setUserInput(function () {
      return "".concat(e.target.value);
    });
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addUserInput(userInput);
      evaluateUserInput(userInput);
      setUserInput(function () {
        return "";
      });
    }
    if (e.key === "ArrowUp") {
      var currentIndex = deepCopy(userInputIndex);
      var newIndex = currentIndex - 1;
      var text = userInputs[newIndex];
      if (text !== undefined && text !== null) {
        setUserInput(function () {
          return text;
        });
        setUserInputIndex(function () {
          return newIndex;
        });
      }
    }
    if (e.key === "ArrowDown") {
      var _currentIndex = deepCopy(userInputIndex);
      var _newIndex = _currentIndex + 1;
      var _text = userInputs[_newIndex];
      if (_text !== undefined && _text !== null) {
        setUserInput(function () {
          return _text;
        });
        setUserInputIndex(function () {
          return _newIndex;
        });
      }
    }
  }
  function evaluateUserInput(input) {
    // in some cases we have to get the substring and
    // use the rest of the string to "change" the configuration

    var newInput = input;
    if (input.indexOf("/") > -1) {
      newInput = input.substring(1);
    }

    // break up the command line statement into parts split by spaces
    var parts = newInput.split(" ");
    var command = parts[0];
    var args = {};
    if (parts.length > 1) {
      var tempParts = deepCopy(parts);
      tempParts.shift();
      args = tempParts.length > 1 ? parseArgs(tempParts) : null;
      if (args === null && parts.length > 1) {
        args = tempParts;
      }
    }
    var stringObject = "";
    switch (command.toLowerCase()) {
      case "exit":
        setIsOpen(false);
        break;
      case "debug":
        // either true or false!
        if (args[0] === "true" || args[0] === "false") {
          changeDebugMode(args[0]);
          stringObject = "Changing debugMode to ".concat(args[0]);
        }
        break;
      case "history":
        var inputs = userInputs.join("\n");
        stringObject = inputs;
        break;
      case "settings":
        stringObject = "".concat(JSON.stringify(settings, null, 2));
        break;
      case "creds":
        stringObject = "".concat(JSON.stringify(creds, null, 2));
        break;
      case "api":
        stringObject = "".concat(JSON.stringify(api, null, 2));
        break;
      case "widget":
        if (Object.keys(args).length > 0) {
          if (args[0] === "list") {
            var m = ComponentManager.map();
            var widgets = Object.keys(m).filter(function (key) {
              return m[key]["type"] === "widget";
            });
            stringObject = "".concat(JSON.stringify(widgets, null, 2));
          }
        }
        break;
      case "workspace":
        if (Object.keys(args).length > 0) {
          if (args[0] === "list") {
            stringObject = "".concat(JSON.stringify(workspaces.map(function (ws) {
              return ws["name"];
            }), null, 2));
          }
        }
        break;
      case "theme":
        if (Object.keys(args).length > 0) {
          // -c (change theme)
          if ("c" in args) {
            changeCurrentTheme(args["c"]);
            stringObject = "Changing theme to ".concat(args["c"]);
          }

          // list
          if (args[0] === "list") {
            // theme keys list
            var themeKeys = Object.keys(themes).map(function (themeKey) {
              return {
                name: themes[themeKey]["name"],
                key: themeKey
              }; //join('\n');
            });

            stringObject = "".concat(JSON.stringify(themeKeys, null, 2));
          }
        } else {
          console.log("theme list?");
          if (args[0] === "list") {
            // theme keys list
            var _themeKeys = Object.keys(themes).join("\n");
            stringObject = "".concat(_themeKeys);
          } else {
            stringObject = "".concat(JSON.stringify(theme, null, 2));
          }
        }
        break;
      case "help":
        var helpObject = ["settings - list application setting configuration", "creds - list application credentials (appId, apiKey)", "api - list the Electron api information", "widget list", "workspace list", "theme list  - list the theme 'keys'", "theme [-c <themeKey>] - change the theme", "exit - close the Nerd.", "debug [true|false] - set debugMode"];
        stringObject = JSON.stringify(helpObject, null, 2);
        break;
    }
    var o = [{
      message: input,
      author: "human",
      textType: "string"
    }];
    if (stringObject !== "") {
      o.push({
        message: stringObject,
        author: "dash",
        textType: "code"
      });
    }
    addInputs(o);
  }
  function addInputs() {
    var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var applicationInputCurrent = deepCopy(applicationInput);
    var newArray = applicationInputCurrent.concat(inputs);
    setApplicationInput(function () {
      return newArray;
    });
  }
  function addDashInput(input) {
    var textType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "string";
    var applicationInputCurrent = deepCopy(applicationInput);
    applicationInputCurrent.push({
      author: "dash",
      message: input,
      textType: textType
    });
    setApplicationInput(function () {
      return applicationInputCurrent;
    });
  }
  function addUserInput(input) {
    var applicationInputCurrent = deepCopy(applicationInput);
    applicationInputCurrent.push({
      author: "human",
      message: input
    });
    var userInputsCurrent = deepCopy(userInputs);
    userInputsCurrent.push(input);
    setApplicationInput(function () {
      return applicationInputCurrent;
    });
    setUserInputs(function () {
      return userInputsCurrent;
    });
    setUserInputIndex(function () {
      return userInputs.length;
    });
  }
  function writeInput(input, author, textType) {
    return author === "dash" ? writeApplicationInput(input, textType) : writeUserInput(input);
  }
  function writeUserInput(input) {
    return /*#__PURE__*/jsx("div", {
      className: "flex flex-row shadow w-full",
      children: /*#__PURE__*/jsx("span", {
        className: "text-blue-500 bg-gray-800 px-4 py-2 rounded w-full shadow text-xs",
        children: input
      })
    });
  }
  function writeApplicationInput(input) {
    var textType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "string";
    return textType === "string" ? /*#__PURE__*/jsx("div", {
      className: "flex flex-row shadow w-full",
      children: /*#__PURE__*/jsx("span", {
        className: "text-green-500 bg-slate-900 px-4 py-2 rounded w-full shadow text-xs",
        children: input
      })
    }) : /*#__PURE__*/jsx("div", {
      className: "flex flex-row w-full shadow",
      children: /*#__PURE__*/jsx("span", {
        className: "text-green-500 bg-slate-900 px-4 py-2 rounded w-full shadow text-xs",
        children: /*#__PURE__*/jsx("pre", {
          children: input
        })
      })
    });
  }
  function renderApplicationInput() {
    return applicationInput.map(function (input, index) {
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-row w-full py-1 font-mono text-green font-normal text-xs xl:text-sm",
        children: writeInput(input["message"], input["author"], input["textType"])
      }, "input-".concat(index));
    });
  }
  function scrollToBottom() {
    var _messagesEnd$current;
    (_messagesEnd$current = messagesEnd.current) === null || _messagesEnd$current === void 0 ? void 0 : _messagesEnd$current.scrollIntoView({
      behavior: "smooth"
    });
  }
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col w-full h-full overflow-hidden",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-row w-full h-full overflow-hidden xl:justify-between xl:space-x-4",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex-col h-full rounded font-medium w-full hidden xl:flex xl:w-1/3 p-10 justify-between",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-col rounded py-10 space-y-4 w-full overflow-hidden",
          children: [/*#__PURE__*/jsx(Heading, {
            title: "Hello",
            padding: false
          }), /*#__PURE__*/jsx(SubHeading3, {
            title: "01001000 01100101 01101100 01101100 01101111",
            padding: false
          })]
        })
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-col h-full rounded xl:rounded-0 w-full lg:w-full",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-col bg-gradient-to-tr from-gray-900 to-gray-800 text-green-600 h-full w-full rounded-lg p-6 overflow-hidden border border-gray-900",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-col py-4 text-sm font-mono overflow-hidden h-full",
            children: /*#__PURE__*/jsxs("div", {
              className: "flex flex-col py-4 text-xs font-mono h-full overflow-y-scroll",
              children: [/*#__PURE__*/jsx("div", {
                className: "flex flex-1 flex-col h-full"
              }), renderApplicationInput(), /*#__PURE__*/jsx("div", {
                ref: messagesEnd,
                style: {
                  "float": "left",
                  clear: "both"
                }
              })]
            })
          }), /*#__PURE__*/jsxs("div", {
            className: "text-xs text-gray-400 space-y-1",
            children: [/*#__PURE__*/jsx("div", {
              className: "flex flex-row text-xs text-gray-400",
              children: "Type 'help' for more information"
            }), /*#__PURE__*/jsx(InputText, {
              name: "name",
              padding: "p-4",
              value: userInput,
              onKeyDown: handleKeyDown,
              onChange: handleUserInput,
              textSize: "text-lg",
              placeholder: "",
              bgColor: "bg-gray-400",
              textColor: "text-gray-800",
              hasBorder: false
            })]
          })]
        })
      })]
    })
  });
};

var ApplicationSettingsModal = function ApplicationSettingsModal(_ref) {
  var workspaces = _ref.workspaces,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen;
    _ref.onSave;
  var _useContext = useContext$1(AppContext),
    settings = _useContext.settings;
  return /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-11/12 xl:w-5/6",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col w-full h-full overflow-hidden",
        children: [/*#__PURE__*/jsx("div", {
          className: "flex flex-row w-full h-full overflow-hidden",
          children: /*#__PURE__*/jsx("div", {
            className: "flex flex-row w-full h-full space-x-4 overflow-hidden p-4",
            children: /*#__PURE__*/jsx(PanelApplicationSettings, {
              settings: settings,
              setIsOpen: setIsOpen,
              workspaces: workspaces
            })
          })
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-row justify-end bg-gray-900 p-4 rounded-br rounded-bl border-t border-gray-800 justify-between items-center"
        })]
      })
    })
  });
};

function _slicedToArray$g(arr, i) { return _arrayWithHoles$g(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$g(); }
function _nonIterableRest$g() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }
function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$g(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$g(arr) { if (Array.isArray(arr)) return arr; }
var Dashboard = function Dashboard(_ref) {
  var _ref$workspace = _ref.workspace,
    workspace = _ref$workspace === void 0 ? null : _ref$workspace,
    _ref$preview = _ref.preview,
    preview = _ref$preview === void 0 ? true : _ref$preview;
  var _useContext = useContext$1(AppContext),
    api = _useContext.api,
    settings = _useContext.settings,
    creds = _useContext.creds;
  var _useContext2 = useContext$1(DashboardContext),
    pub = _useContext2.pub;
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme,
    changeCurrentTheme = _useContext3.changeCurrentTheme,
    themesForApplication = _useContext3.themesForApplication;
  var _useState = useState(workspace),
    _useState2 = _slicedToArray$g(_useState, 2),
    workspaceSelected = _useState2[0],
    setWorkspaceSelected = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$g(_useState3, 2),
    isShowing = _useState4[0],
    setIsShowing = _useState4[1];
  var _useState5 = useState({
      name: "home",
      id: 1
    }),
    _useState6 = _slicedToArray$g(_useState5, 2),
    selectedMainItem = _useState6[0],
    setSelectedMainItem = _useState6[1];
  var _useState7 = useState(preview),
    _useState8 = _slicedToArray$g(_useState7, 2),
    previewMode = _useState8[0],
    setPreviewMode = _useState8[1];

  // Workspace Management (loading)
  var _useState9 = useState(false),
    _useState10 = _slicedToArray$g(_useState9, 2),
    isLoadingWorkspaces = _useState10[0],
    setIsLoadingWorkspaces = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray$g(_useState11, 2),
    isLoadingMenuItems = _useState12[0],
    setIsLoadingMenuItems = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray$g(_useState13, 2),
    menuItems = _useState14[0],
    setMenuItems = _useState14[1];
  var _useState15 = useState([]),
    _useState16 = _slicedToArray$g(_useState15, 2),
    workspaceConfig = _useState16[0],
    setWorkspaceConfig = _useState16[1];

  // Add Menu Item Modal
  var _useState17 = useState(false),
    _useState18 = _slicedToArray$g(_useState17, 2),
    isAddItemModalOpen = _useState18[0],
    setIsAddWidgetModalOpen = _useState18[1];
  var _useState19 = useState(false),
    _useState20 = _slicedToArray$g(_useState19, 2),
    isThemeManagerOpen = _useState20[0],
    setIsThemeManagerOpen = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray$g(_useState21, 2),
    isSettingsModalOpen = _useState22[0],
    setIsSettingsModalOpen = _useState22[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$g(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    console.log("DASHBOARD ", menuItems, api, settings, workspaceConfig);
    isLoadingWorkspaces === false && loadWorkspaces();
    isLoadingMenuItems === false && loadMenuItems();
  }, [workspace]);
  useEffect(function () {
    // forceUpdate();
  }, [themesForApplication]);
  useEffect(function () {
    console.log("dashboard settings ", settings);
    if (!settings) {
      setIsSettingsModalOpen(true);
    }
  }, [settings]);

  // useEffect(() => {
  //     console.log(menuItems);
  //     if (menuItems.length === 0 && isLoadingMenuItems === false) {
  //         setIsAddWidgetModalOpen(true);
  //     }
  // }, [menuItems]);

  // function handleListenWorkspaceChange(message) {
  //     console.log('workspace changed message ', message);
  // }

  function loadWorkspaces() {
    setIsLoadingWorkspaces(true);

    // api.removeAllListeners();
    api.on(api.events.WORKSPACE_LIST_COMPLETE, handleLoadWorkspacesComplete);
    api.on(api.events.WORKSPACE_LIST_ERROR, handleLoadWorkspacesError);

    // API
    api.workspace.listWorkspacesForApplication(creds.appId);
  }
  function handleLoadWorkspacesComplete(e, message) {
    // let's make sure we have the entire component configuration for each item?
    var workspaces = deepCopy(message["workspaces"]);
    var workspacesTemp = workspaces.map(function (ws) {
      // const layout = ws['layout'];
      var tempLayout = ws["layout"].map(function (layoutOG) {
        return LayoutModel(layoutOG, workspaces);
      });
      ws["layout"] = tempLayout;
      return ws;
    });

    // test the emit
    pub.pub("dashboard.workspaceChange", {
      workspaces: workspacesTemp
    });
    setWorkspaceConfig(function () {
      return workspacesTemp;
    });
  }
  function handleLoadWorkspacesError(e, message) {
    setWorkspaceConfig({});
  }
  function handleClickMainMenu(menuItem) {
    console.log("clicked ", menuItem, selectedMainItem);
    if (selectedMainItem === null) {
      setSelectedMainItem(function () {
        return menuItem;
      });
    } else {
      if (menuItem.id === selectedMainItem.id) {
        setSelectedMainItem(null);
      } else {
        setSelectedMainItem(function () {
          return menuItem;
        });
      }
    }
    if (!isShowing && menuItem.name !== "home") {
      setIsShowing(!isShowing);
    }
  }

  // Sub Menu
  // The user has chosen a workspace and we need to load that workspace data
  // into the workspace component.
  function handleClick(workspaceItem) {
    console.log("workspace change? ", workspaceItem);
    pub.removeAllListeners();
    setWorkspaceSelected(function () {
      return workspaceItem;
    });
    setIsShowing(function () {
      return false;
    });
  }
  function handleClickNew(workspaceItem) {
    console.log("clicked add new ", workspaceItem, previewMode);
    setPreviewMode(function () {
      return false;
    });
    setWorkspaceSelected(function () {
      return workspaceItem;
    });
  }
  function handleWorkspaceChange(ws) {
    console.log(" dashboard workspace change", ws);
    if (ws) setWorkspaceSelected(function () {
      return ws;
    });
    loadWorkspaces();
    pub.removeAllListeners();
  }
  function renderComponent(workspaceItem) {
    try {
      if (workspaceItem !== undefined) {
        return /*#__PURE__*/jsx(LayoutBuilder, {
          dashboardId: workspaceItem["id"],
          preview: previewMode,
          workspace: workspaceItem,
          onWorkspaceChange: handleWorkspaceChange // for when we save a workspace change! fetch new ones!
          ,
          onTogglePreview: function onTogglePreview() {
            return setPreviewMode(!previewMode);
          }
        });
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  function renderMenuItems() {
    return menuItems !== undefined && menuItems.length > 0 && menuItems.map(function (menuItem, index) {
      var selected = selectedMainItem !== null ? selectedMainItem.id === menuItem.id : false;
      return /*#__PURE__*/jsx(DashboardMenuItem, {
        id: menuItem.id,
        icon: menuItem.icon,
        item: menuItem,
        name: menuItem.name,
        onClick: function onClick() {
          return handleClickMainMenu(menuItem);
        },
        selected: selected,
        theme: currentTheme
      }, "menu-item-".concat(menuItem.id));
    });
  }
  function handleAddNewMenuItem() {
    setIsAddWidgetModalOpen(true);
  }
  function loadMenuItems() {
    setIsLoadingMenuItems(function () {
      return true;
    });
    // we have to remove the widgetConfig which contains the component
    // sanitize the workspace layout remove widgetConfig items
    // api.removeAllListeners();
    api.on(api.events.MENU_ITEMS_LIST_COMPLETE, handleListMenuItemComplete);
    api.on(api.events.MENU_ITEMS_LIST_ERROR, handleListMenuItemError);
    api.menuItems.listMenuItems(creds.appId);
  }
  function handleListMenuItemComplete(e, message) {
    setMenuItems(function () {
      return message.menuItems;
    });
    setIsLoadingMenuItems(function () {
      return false;
    });
    if (message.menuItems.length === 0) setIsAddWidgetModalOpen(true);
    forceUpdate();
  }
  function handleListMenuItemError(e, message) {
    setMenuItems(function () {
      return [];
    });
    setIsLoadingMenuItems(function () {
      return false;
    });
  }
  function handleSaveNewMenuItem(menuItem) {
    // we have to remove the widgetConfig which contains the component
    // sanitize the workspace layout remove widgetConfig items
    api.removeAllListeners();
    api.on(api.events.MENU_ITEMS_SAVE_COMPLETE, handleSaveMenuItemComplete);
    api.on(api.events.MENU_ITEMS_SAVE_ERROR, handleSaveMenuItemError);
    api.menuItems.saveMenuItem(creds.appId, menuItem);
  }
  function handleSaveMenuItemComplete(e, message) {
    setIsAddWidgetModalOpen(false);
    loadMenuItems();
  }
  function handleSaveMenuItemError(e, message) {
    console.log(e, message);
  }
  function handleWorkspaceMenuChange() {
    console.log("reload the workspaces!");
    loadWorkspaces();
  }
  function handleWorkspaceNameChange(name) {
    console.log("workspace name change ", name);
    var tempWorkspace = deepCopy(workspaceSelected);
    tempWorkspace["name"] = name;
    setWorkspaceSelected(function () {
      return tempWorkspace;
    });
  }
  function handleClickSaveWorkspace() {
    console.log("dashboard clicked save workspace ", workspaceSelected);
    // we have to remove the widgetConfig which contains the component
    // sanitize the workspace layout remove widgetConfig items
    var workspaceToSave = JSON.parse(JSON.stringify(workspaceSelected));
    var layout = workspaceToSave["layout"].map(function (layoutItem) {
      delete layoutItem["widgetConfig"];
      delete layoutItem["api"];
      return layoutItem;
    });
    workspaceToSave["layout"] = layout;
    api.removeAllListeners();
    api.on(api.events.WORKSPACE_SAVE_COMPLETE, handleSaveWorkspaceComplete);
    api.on(api.events.WORKSPACE_SAVE_ERROR, handleSaveWorkspaceError);
    api.workspace.saveWorkspaceForApplication(creds.appId, workspaceToSave);
  }
  function handleSaveWorkspaceComplete(e, message) {
    console.log("handle save complete ", e, message);
    // setPreviewMode(true);
    // onTogglePreview();
    // onWorkspaceChange();
    handleWorkspaceChange(workspaceSelected);
    setPreviewMode(function () {
      return true;
    });
  }
  function handleSaveWorkspaceError(e, message) {
    console.log(e, message);
  }
  function handleOpenThemeManager() {
    setIsThemeManagerOpen(true);
  }
  return menuItems && currentTheme && /*#__PURE__*/jsx(LayoutContainer, {
    className: "flex flex-row h-full p-0 overflow-hidden w-full space-x-0",
    height: "h-full",
    width: "w-full",
    direction: "row",
    scrollable: false,
    space: false,
    children: /*#__PURE__*/jsxs(DndProvider, {
      backend: HTML5Backend,
      children: [/*#__PURE__*/jsxs("div", {
        className: "flex flex-col space-y-1 ".concat(currentTheme["bg-secondary-very-dark"], " p-2 items-center} h-full z-40 justify-between"),
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/jsx("div", {
            className: "w-10 h-10 items-center justify-center",
            children: /*#__PURE__*/jsx(ButtonIcon, {
              icon: "home",
              onClick: function onClick() {
                return setWorkspaceSelected(null);
              }
            })
          }), menuItems && renderMenuItems()]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/jsx("div", {
            className: "w-10 h-10 items-center justify-center",
            children: /*#__PURE__*/jsx(ButtonIcon, {
              icon: "plus",
              onClick: handleAddNewMenuItem,
              hoverBackgroundColor: "hover:bg-green-700"
            })
          }), /*#__PURE__*/jsx("div", {
            className: "w-10 h-10 items-center justify-center",
            children: /*#__PURE__*/jsx(ButtonIcon, {
              icon: "palette",
              onClick: handleOpenThemeManager,
              hoverBackgroundColor: "hover:bg-orange-700"
            })
          }), /*#__PURE__*/jsx("div", {
            className: "w-10 h-10 items-center justify-center",
            children: /*#__PURE__*/jsx(ButtonIcon, {
              icon: "computer",
              onClick: function onClick() {
                return setIsSettingsModalOpen(true);
              },
              hoverBackgroundColor: "hover:bg-orange-700"
            })
          })]
        })]
      }), workspaceSelected !== null && /*#__PURE__*/jsxs("div", {
        className: "flex flex-col h-full w-full justify-between",
        children: [/*#__PURE__*/jsx(DashboardHeader, {
          workspace: workspaceSelected,
          preview: previewMode,
          onNameChange: handleWorkspaceNameChange
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-col w-full h-full overflow-y-scroll",
          children: renderComponent(workspaceSelected)
        }), /*#__PURE__*/jsx(DashboardFooter, {
          onClickEdit: function onClickEdit() {
            return setPreviewMode(!previewMode);
          },
          workspace: workspaceSelected,
          preview: previewMode,
          onSaveChanges: handleClickSaveWorkspace
        })]
      }), workspaceSelected === null && /*#__PURE__*/jsx(PanelWelcome, {
        menuItems: menuItems,
        workspaces: workspaceConfig,
        onClickWorkspace: handleClick,
        onClickCreateMenuItem: function onClickCreateMenuItem() {
          return setIsAddWidgetModalOpen(true);
        }
      }), /*#__PURE__*/jsx(MenuSlideOverlay, {
        workspaces: workspaceConfig,
        open: isShowing,
        setOpen: setIsShowing,
        selectedMainItem: selectedMainItem,
        handleClick: handleClick,
        children: /*#__PURE__*/jsx(MainMenu, {
          menuItems: menuItems,
          workspaces: workspaceConfig,
          onClickNew: handleClickNew,
          onClick: handleClick,
          selectedMainItem: selectedMainItem,
          onWorkspaceMenuChange: handleWorkspaceMenuChange
        })
      }), /*#__PURE__*/jsx(AddMenuItemModal, {
        open: isAddItemModalOpen,
        setIsOpen: function setIsOpen() {
          return setIsAddWidgetModalOpen(!isAddItemModalOpen);
        },
        onSave: handleSaveNewMenuItem
      }), /*#__PURE__*/jsx(ThemeManagerModal, {
        open: isThemeManagerOpen,
        setIsOpen: function setIsOpen() {
          return setIsThemeManagerOpen(!isThemeManagerOpen);
        },
        onSave: function onSave(themeKey) {
          console.log("saving and changing", themeKey);
          changeCurrentTheme(themeKey);
          setIsThemeManagerOpen(function () {
            return false;
          });
          forceUpdate();
        }
      }), /*#__PURE__*/jsx(ApplicationSettingsModal, {
        open: isSettingsModalOpen,
        setIsOpen: setIsSettingsModalOpen,
        workspaces: workspaceConfig
      })]
    })
  });
};

function _typeof$e(obj) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$e(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$e(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$e(arg) { var key = _toPrimitive$e(arg, "string"); return _typeof$e(key) === "symbol" ? key : String(key); }
function _toPrimitive$e(input, hint) { if (_typeof$e(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$e(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DashboardFooter = function DashboardFooter(_ref) {
  var preview = _ref.preview,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor,
    _ref$borderColor = _ref.borderColor,
    borderColor = _ref$borderColor === void 0 ? null : _ref$borderColor,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? null : _ref$textColor,
    _ref$onClickEdit = _ref.onClickEdit,
    onClickEdit = _ref$onClickEdit === void 0 ? null : _ref$onClickEdit,
    _ref$onSaveChanges = _ref.onSaveChanges,
    onSaveChanges = _ref$onSaveChanges === void 0 ? null : _ref$onSaveChanges;
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var stylesFooter = getStylesForItem(themeObjects.DASHBOARD_FOOTER, currentTheme, {
    borderColor: borderColor
  });
  var stylesButton = getStylesForItem(themeObjects.BUTTON, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row p-2 justify-end border-t w-full ".concat(stylesFooter.string),
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-row space-x-1",
      children: [preview === true && /*#__PURE__*/jsx("div", {
        className: "flex flex-row space-x-2",
        children: /*#__PURE__*/jsx(Button, _objectSpread$9({
          title: "Edit",
          textSize: "text-lg",
          padding: "py-2 px-4",
          onClick: onClickEdit
        }, stylesButton))
      }), preview === false && /*#__PURE__*/jsxs("div", {
        className: "flex flex-row space-x-2",
        children: [/*#__PURE__*/jsx(Button, _objectSpread$9({
          title: "Cancel",
          textSize: "text-lg",
          padding: "py-2 px-4",
          onClick: onClickEdit
        }, stylesButton)), /*#__PURE__*/jsx(Button, _objectSpread$9({
          title: "Save Changes",
          textSize: "text-lg",
          padding: "py-2 px-4",
          onClick: onSaveChanges
        }, stylesButton))]
      })]
    })
  });
};

function _slicedToArray$f(arr, i) { return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$f(); }
function _nonIterableRest$f() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }
function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$f(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$f(arr) { if (Array.isArray(arr)) return arr; }
var DashboardHeader = function DashboardHeader(_ref) {
  var workspace = _ref.workspace,
    preview = _ref.preview,
    _ref$onClickEdit = _ref.onClickEdit,
    onClickEdit = _ref$onClickEdit === void 0 ? null : _ref$onClickEdit,
    onNameChange = _ref.onNameChange;
  var _useState = useState(workspace),
    _useState2 = _slicedToArray$f(_useState, 2),
    workspaceSelected = _useState2[0],
    setWorkspaceSelected = _useState2[1];
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  useEffect(function () {
    if (deepEqual(workspace, workspaceSelected) === false) {
      setWorkspaceSelected(function () {
        return workspace;
      });
    }
  }, [workspace, workspaceSelected]);
  return preview === false && /*#__PURE__*/jsxs("div", {
    className: "flex flex-row p-1 justify-between shrink items-center px-4 ".concat(currentTheme["bg-primary-dark"], " py-2"),
    children: [/*#__PURE__*/jsx(InputText, {
      name: "name",
      value: workspaceSelected.name,
      onChange: function onChange(e) {
        return onNameChange(e.target.value);
      },
      textSize: "text-lg",
      placeholder: "My Workspace",
      bgColor: "bg-gray-800",
      textColor: "text-gray-400",
      hasBorder: false
    }), onClickEdit !== null && /*#__PURE__*/jsx("div", {
      className: "flex flex-row space-x-1",
      children: /*#__PURE__*/jsx(ButtonIcon, {
        icon: "pencil",
        textSize: "text-xs",
        onClick: onClickEdit
      })
    })]
  });
};

var DashboardMonitor = function DashboardMonitor() {
  var _useContext = useContext(DashboardContext);
    _useContext.pub;
  useEffect(function () {});
  return /*#__PURE__*/jsx(LayoutContainer, {
    direction: "col",
    scrollable: true
  });
};

var event = {
  list: new Map(),
  //  Map(1) { '<widget-UUID>' => { 'CustomSearchbar[10].searchQueryChanged': [] } }
  /**
   * on
   *
   * Register a unique event to a unique widget
   * Widgets can ONLY listen to an event ONCE, you cannot have
   * multiple handlers in the same widget.
   *
   * @param {string} eventType the unique event type for a widget
   * @param {*} eventAction the handler for the event type
   * @param {*} uuid the UUID of the widget listening
   * @returns
   */
  on: function on(eventType, eventAction) {
    var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.list.has(eventType) || this.list.set(eventType, {});
    // this.list.has(uuid) || this.list.set(uuid, {});
    if (this.list.get(eventType)) {
      // this is key:value pair mapping
      // each key is a widget UUID
      var currentActionsForEvent = this.list.get(eventType);
      if (uuid in currentActionsForEvent === false) {
        currentActionsForEvent[uuid] = eventAction;
        this.list.set(eventType, currentActionsForEvent);
      }
    }
    return this;
  },
  // publish events...
  emit: function emit(eventType) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var subscriptionsToEvent = this.list.get(eventType);
    if (subscriptionsToEvent && Object.keys(subscriptionsToEvent).length > 0) {
      Object.keys(subscriptionsToEvent).forEach(function (subscriber) {
        subscriptionsToEvent[subscriber].apply(subscriptionsToEvent, args);
      });
    }
  },
  clear: function clear() {
    this.list = new Map();
  }
};
var DashboardPublisher = {
  sub: function sub(eventType, action, uuid) {
    event.on(eventType, action, uuid);
  },
  pub: function pub(eventType, content) {
    event.emit(eventType, content);
    // send to ALL
    event.emit("DashboardPublisher.monitor", {
      eventType: eventType,
      content: content
    });
  },
  listeners: function listeners() {
    return event.list;
  },
  registerListeners: function registerListeners(listeners, handlerMap, uuid) {
    if (listeners !== undefined) {
      if (isObject(listeners) === true) {
        Object.keys(listeners).forEach(function (handlerKey) {
          if (handlerKey in listeners) {
            listeners[handlerKey].forEach(function (event) {
              // subscribe our listeners
              DashboardPublisher.sub(event, handlerMap[handlerKey], uuid);
            });
          }
        });
      }
    }
  },
  removeAllListeners: function removeAllListeners() {
    // we want to begin fresh when we switch workspaces...
    // event = new Map();
    event.clear();
  },
  clearAllMessage: function clearAllMessage() {
    event.emit("clearAllMessage");
  }
};

var DashboardContext = /*#__PURE__*/createContext({
  pub: DashboardPublisher
});

function _slicedToArray$e(arr, i) { return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$e(); }
function _nonIterableRest$e() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }
function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$e(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$e(arr) { if (Array.isArray(arr)) return arr; }
var themes = {
  "theme-1": {
    name: "Default 1",
    primary: "gray",
    secondary: "indigo",
    tertiary: "blue",
    shadeBackgroundFrom: 600,
    shadeBorderFrom: 600,
    shadeTextFrom: 100,
    dark: {
      "bg-primary-very-dark": "bg-black" // override test
    },

    light: {
      "bg-primary-very-light": "bg-white",
      // override test
      "bg-primary-very-dark": "bg-gray-600" // override test
    }
  },

  "theme-2": {
    name: "Default 2",
    primary: "gray",
    secondary: "slate",
    tertiary: "orange",
    shadeBackgroundFrom: 200,
    shadeBorderFrom: 300,
    shadeTextFrom: 700,
    dark: {
      "bg-primary-very-dark": "bg-black" // override test
    },

    light: {
      "bg-primary-very-light": "bg-white",
      // override test
      "bg-primary-very-dark": "bg-gray-600" // override test
    }
  }
};

var ThemeWrapper = function ThemeWrapper(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? null : _ref$theme,
    children = _ref.children;
  // changeApplicationTheme will save this to the settings config
  var _useContext = useContext$1(AppContext),
    api = _useContext.api,
    creds = _useContext.creds,
    changeApplicationTheme = _useContext.changeApplicationTheme;
  var _useState = useState(theme),
    _useState2 = _slicedToArray$e(_useState, 2),
    chosenTheme = _useState2[0],
    setChosenTheme = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$e(_useState3, 2),
    themeName = _useState4[0],
    setThemeName = _useState4[1];
  var _useState5 = useState("dark"),
    _useState6 = _slicedToArray$e(_useState5, 2),
    themeVariant = _useState6[0],
    setThemeVariant = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$e(_useState7, 2),
    themesForApplication = _useState8[0],
    setThemesForApplication = _useState8[1];
  var _useState9 = useState({}),
    _useState10 = _slicedToArray$e(_useState9, 2),
    rawThemes = _useState10[0],
    setRawThemes = _useState10[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$e(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    // If the user has provided a theme as a override,
    // we can skip loading the themes...

    if (chosenTheme === null) {
      //&& themesForApplication !== null) {
      if (theme !== null) {
        var defaultTheme = ThemeModel(theme);
        setThemeVariant(function () {
          return "dark";
        });
        setChosenTheme(function () {
          return defaultTheme;
        });
      } else {
        // if the themes for application is null...
        // we have to load the themes...
        if (themesForApplication === null) {
          // finally
          themesForApplication === null && loadThemes();
        } else {
          var themeKeyDefault = themesForApplication !== null ? Object.keys(themesForApplication)[0] : "theme-1";
          var _defaultTheme = ThemeModel(themesForApplication !== null ? themesForApplication[themeKeyDefault] : themes[themeKeyDefault]);
          setThemeVariant(function () {
            return "dark";
          });
          setChosenTheme(function () {
            return _defaultTheme;
          });
        }
      }
    }
  });
  function loadThemes() {
    if (api && creds) {
      api.removeAllListeners();
      api.on(api.events.THEME_LIST_COMPLETE, handleLoadThemesComplete);
      api.on(api.events.THEME_LIST_ERROR, handleLoadThemesError);
      api.themes.listThemesForApplication(creds.appId);
    } else {
      console.log("no api found");
      checkThemes(api.themes.listThemesForApplication());
    }
  }

  /**
   * handleLoadThemesComplete
   * Load in the themes saved to the configuration, if no themes
   * exist, then use the default themes provided.
   * @param {*} e
   * @param {*} message
   */
  function handleLoadThemesComplete(e, message) {
    if ("themes" in message) {
      checkThemes(message["themes"]);
      if (theme === null) {
        changeCurrentTheme(Object.keys(message["themes"])[0]);
      }
    }
  }
  function checkThemes(themesToCheck) {
    var themesChecked = {};
    var rawThemes = {};
    if (themesToCheck !== null) {
      if (Object.keys(themesToCheck).length === 0) {
        Object.keys(themes).forEach(function (themeKey) {
          var themeObject = ThemeModel(themes[themeKey]);
          rawThemes[themeKey] = themes[themeKey];
          themesChecked[themeKey] = themeObject;
        });
        setThemesForApplication(function () {
          return themesChecked;
        });
        setRawThemes(function () {
          return rawThemes;
        });
      } else {
        // let's make sure all of the information is there!
        Object.keys(themesToCheck).forEach(function (themeKey) {
          var themeObject = ThemeModel(themesToCheck[themeKey]);
          rawThemes[themeKey] = themesToCheck[themeKey];
          themesChecked[themeKey] = themeObject;
        });

        // console.log('themes to check AFTER had keys', themesChecked);

        // now let's add our default themes as well
        // if ('theme-1' in themesChecked === false) {
        //     themesChecked['theme-1'] = ThemeModel(themes['theme-1']);
        // }
        // if ('theme-2' in themesChecked === false) {
        //     themesChecked['theme-2'] = ThemeModel(themes['theme-2']);
        // }

        setThemesForApplication(function () {
          return themesChecked;
        });
        setRawThemes(function () {
          return rawThemes;
        });
        forceUpdate();
        if (chosenTheme === null) {
          changeCurrentTheme(Object.keys(themesForApplication)[0]);
        }
      }
    }
  }
  function handleLoadThemesError(e, message) {
    console.log("error loading themes ", e, message);
    setThemesForApplication(null);
  }
  var changeCurrentTheme = function changeCurrentTheme(themeKey) {
    if (rawThemes !== null) {
      console.log("changing theme to ", themeKey);
      var themeData = ThemeModel(rawThemes[themeKey]);
      if (themeKey !== null) {
        setChosenTheme(function () {
          return themeData;
        });
        setThemeName(function () {
          return themeKey;
        });
        changeApplicationTheme(themeKey);
        forceUpdate();
      }
    }
  };
  var changeThemesForApplication = function changeThemesForApplication(themes) {
    checkThemes(themes);
  };
  var changeThemeVariant = function changeThemeVariant(variant) {
    setThemeVariant(function () {
      return variant;
    });
  };
  var getValue = function getValue() {
    return {
      key: Date.now(),
      currentTheme: chosenTheme !== null ? themeVariant in chosenTheme ? chosenTheme[themeVariant] : null : null,
      currentThemeKey: themeName,
      theme: chosenTheme !== null ? themeVariant in chosenTheme ? chosenTheme[themeVariant] : null : null,
      themeKey: themeName,
      themeVariant: themeVariant,
      changeCurrentTheme: changeCurrentTheme,
      changeThemeVariant: changeThemeVariant,
      changeThemesForApplication: changeThemesForApplication,
      loadThemes: loadThemes,
      themes: themesForApplication,
      rawThemes: rawThemes
    };
  };
  return /*#__PURE__*/jsx(ThemeContext.Provider, {
    value: getValue(),
    children: children
  });
};

var _excluded$8 = ["children", "credentials", "api"];
function _slicedToArray$d(arr, i) { return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$d(); }
function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$e(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$e(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen); }
function _arrayLikeToArray$e(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$d(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties$8(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$8(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$8(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var debugStyles = {
  workspace: {
    classes: "bg-gray-800 border border-red-900 rounded p-4"
  },
  "workspace-menu": {
    classes: "bg-gray-800 border border-orange-900 rounded p-4"
  },
  "workspace-footer": {
    classes: "bg-gray-800 border-t border-orange-900 rounded p-4"
  },
  layout: {
    classes: "border border-green-900 bg-gray-800 rounded p-4"
  },
  widget: {
    classes: "border border-blue-700 bg-gray-800 rounded p-4"
  }
};
var AppWrapper = function AppWrapper(_ref) {
  var children = _ref.children,
    _ref$credentials = _ref.credentials,
    credentials = _ref$credentials === void 0 ? {
      appId: "my-app-id"
    } : _ref$credentials,
    api = _ref.api;
    _objectWithoutProperties$8(_ref, _excluded$8);
  var _useState = useState(credentials),
    _useState2 = _slicedToArray$d(_useState, 2),
    creds = _useState2[0],
    setCreds = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$d(_useState3, 2),
    debugMode = _useState4[0],
    setDebugmode = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$d(_useState5, 2),
    searchClient = _useState6[0],
    setSearchClient = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$d(_useState7, 2),
    settings = _useState8[0],
    setSettings = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray$d(_useState9, 2),
    isLoadingSettings = _useState10[0],
    setIsLoadingSettings = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray$d(_useState11, 2);
    _useState12[0];
    _useState12[1];
  useEffect(function () {
    if (settings === null && isLoadingSettings === false) {
      loadSettings();
    }
  }, [settings]);
  function changeSearchClient(searchClientTo) {
    setSearchClient(function () {
      return searchClientTo;
    });
  }
  function changeCreds(appId, apiKey) {
    var credentialsTemp = {
      appId: appId,
      apiKey: apiKey
    };
    var s = deepCopy(settings);
    s["creds"] = credentialsTemp;
    setCreds(function () {
      return credentialsTemp;
    });
    changeSettings(s);
  }
  function changeDebugMode(to) {
    setDebugmode(to);
    var s = deepCopy(settings);
    s["debugMode"] = to;
    changeSettings(s);
  }
  function changeSettings(settingsObject) {
    setSettings(function () {
      return settingsObject;
    });
    saveSettings();
  }
  function changeApplicationTheme(themeKey) {
    var s = deepCopy(settings);
    s["theme"] = themeKey;
    changeSettings(s);
  }
  function loadSettings() {
    // Here is where we have to add this theme to the themes available
    // and save to the themes file.
    if (api) {
      api.removeAllListeners();
      api.on(api.events.SETTINGS_GET_COMPLETE, handleGetSettingsComplete);
      api.on(api.events.SETTINGS_GET_ERROR, handleGetSettingsError);
      api.settings.getSettingsForApplication();
    }
  }
  function handleGetSettingsComplete(e, message) {
    if ("settings" in message) {
      var settingsObject;
      if (Object.keys(message["settings"]).length === 0) {
        // nothing in settings so we should set some things....
        // set a default theme for the user
        settingsObject = SettingsModel({
          theme: "theme-1"
        });
      } else {
        settingsObject = SettingsModel(message["settings"]);
      }
      setSettings(function () {
        return settingsObject;
      });
    }
    // set the settings model to the context
    setIsLoadingSettings(function () {
      return false;
    });
  }
  function handleGetSettingsError(e, message) {
    console.log("settings load error ", e, message);
    setIsLoadingSettings(function () {
      return false;
    });
  }
  function saveSettings() {
    // Here is where we have to add this theme to the themes available
    // and save to the themes file.
    api.removeAllListeners();
    api.on(api.events.SETTINGS_GET_COMPLETE, handleGetSettingsComplete);
    api.on(api.events.SETTINGS_GET_ERROR, handleGetSettingsError);
    api.settings.saveSettingsForApplication(settings);
  }

  // function handleSaveSettingsComplete(e, message) {
  //     if ('settings' in message) {
  //         let settingsObject;
  //         if (Object.keys(message['settings']).length === 0) {
  //             // nothing in settings so we should set some things....
  //             // set a default theme for the user
  //             settingsObject = SettingsModel({ theme: 'theme-1' });
  //         } else {
  //             settingsObject = SettingsModel(message['settings']);
  //         }
  //         setSettings(() => settingsObject);
  //     }
  //     // set the settings model to the context
  //     setIsSavingSettings(() => false);
  // }

  // function handleSaveSettingsError(e, message) {
  //     console.log('settings load error ', e, message);
  //     setIsSavingSettings(() => false);
  // }

  function getValue() {
    // console.log("app context value ", {
    //     debugMode: debugMode,
    //     debugStyles: debugStyles,
    //     creds: creds,
    //     searchClient: searchClient,
    //     api: api,
    //     settings: settings,
    // });

    return {
      key: Date.now(),
      debugMode: debugMode,
      debugStyles: debugStyles,
      creds: creds,
      searchClient: searchClient,
      api: api,
      settings: settings,
      changeSearchClient: changeSearchClient,
      changeCreds: changeCreds,
      changeDebugMode: changeDebugMode,
      changeSettings: changeSettings,
      changeApplicationTheme: changeApplicationTheme
    };
  }
  return /*#__PURE__*/jsx(AppContext.Provider, {
    value: getValue(),
    children: children
  });
};

/**
 * Layout
 *
 * Manage the Layout of Workspaces
 */
var Layout = function Layout(_ref) {
  var children = _ref.children,
    preview = _ref.preview,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? false : _ref$scrollable;
  var _useContext = useContext$1(AppContext),
    debugMode = _useContext.debugMode;
    _useContext.debugStyles;
  var workspaceDataFromContext = useContext$1(WorkspaceContext);
  useEffect(function () {
    console.log("LAYOUT effect", workspaceDataFromContext);
  });
  function debugClasses() {
    // const styles = debugStyles !== null && debugStyles !== undefined
    //     ? ('layout' in debugStyles ? debugStyles['layout']['classes'] : null) : null;
    return debugMode === true && "space-y-4"; // ${styles}`
  }

  return !children && workspaceDataFromContext ? /*#__PURE__*/jsx(LayoutBuilder, {
    workspace: workspaceDataFromContext,
    preview: preview,
    type: workspaceDataFromContext["type"],
    controls: false
  }) : /*#__PURE__*/jsxs("div", {
    className: "flex flex-col w-full space-y-4 ".concat(scrollable === true ? "overflow-y-auto h-full" : "overflow-hidden h-full", " ").concat(debugClasses(), " p-4"),
    children: [debugMode && /*#__PURE__*/jsxs("span", {
      className: "text-white uppercase text-xs",
      children: ["LAYOUT has children and", " ", scrollable === true ? "is scrollable" : "is not scrollable"]
    }), /*#__PURE__*/jsx("div", {
      className: "flex flex-col w-full space-y-4 p-0 h-full ".concat(scrollable === false ? "overflow-hidden" : ""),
      children: children
    })]
  });
};

var LayoutContainer = function LayoutContainer(_ref) {
  _ref.theme;
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
    height = _ref$height === void 0 ? "min-h-fit" : _ref$height,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
    _ref.onMouseOver;
    _ref.onMouseOut;
    var _ref$space = _ref.space,
    space = _ref$space === void 0 ? true : _ref$space;
  var _useContext = useContext$1(ThemeContext);
    _useContext.currentTheme;

  // determine the classes based on the props...
  var directionStyle = direction === "row" ? space === true ? "flex-row space-x-2" : "flex-row" : space === true ? "flex-col space-y-2" : "flex-col";
  var scrollStyle = scrollable === true ? "overflow-y-scroll" : "";
  var widthStyle = width;
  var heightStyle = height === "" ? "h-full" : height; //'h-full';//scrollable === true ? height : height;

  // to theme or not to theme...
  var backgroundColorStyle = "";
  var borderColorStyle = "";
  // if (theme === true) {
  //     backgroundColorStyle = currentTheme['bg-primary-very-dark'];
  //     borderColorStyle = `${currentTheme['border-primary-very-dark']}`;
  // }

  return /*#__PURE__*/jsx("div", {
    id: "LayoutContainer-".concat(id),
    className: "flex border-1 rounded ".concat(backgroundColorStyle, " ").concat(borderColorStyle, " ").concat(directionStyle, " ").concat(scrollStyle, " ").concat(widthStyle, " ").concat(heightStyle, " ").concat(className, " ").concat(debug === true && "border border-green-500 border-dotted"),
    children: children
  });
};

function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderAddItemModal = function LayoutBuilderAddItemModal(_ref) {
  var workspace = _ref.workspace,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item,
    _ref$onSaveItem = _ref.onSaveItem,
    onSaveItem = _ref$onSaveItem === void 0 ? null : _ref$onSaveItem;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(""),
    _useState2 = _slicedToArray$c(_useState, 2),
    searchTerm = _useState2[0],
    setSearchTerm = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$c(_useState3, 2),
    menuItemSelected = _useState4[0],
    setMenuItemSelected = _useState4[1];
  var _useState5 = useState(workspace),
    _useState6 = _slicedToArray$c(_useState5, 2),
    workspaceSelected = _useState6[0],
    setWorkspaceSelected = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$c(_useState7, 2),
    parentWorkspace = _useState8[0];
    _useState8[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$c(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (open === false) {
      setMenuItemSelected(null);
      setWorkspaceSelected(null);
    } else {
      if (workspaceSelected !== workspace) setWorkspaceSelected(function () {
        return workspace;
      });
    }
  }, [open]);
  useEffect(function () {
    if (workspace !== workspaceSelected && workspace !== null) {
      setWorkspaceSelected(function () {
        return workspace;
      });
    }
  }, [item, open, workspace]);
  useEffect(function () {
    console.log("menu item selected ", menuItemSelected);
  }, [menuItemSelected]);
  function renderWidgets() {
    var componentMap = ComponentManager.map();
    var workspaceType = item ? item["workspace"] : null;
    var canAddChildren = item ? item["canHaveChildren"] : true;
    var parentWorkspaceType = item["parentWorkspaceName"] !== null && item["parentWorkspaceName"] !== undefined ? item["parentWorkspaceName"] : "layout";
    if (parentWorkspaceType !== null) {
      var options = workspaceType !== null && canAddChildren && Object.keys(componentMap).sort().filter(function (c) {
        return componentMap[c]["type"] === "widget";
      }).filter(function (c) {
        return workspaceType !== null ? componentMap[c]["workspace"] === parentWorkspaceType : true;
      }).map(function (w) {
        return renderMenuItem("widget", w);
      });
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-col rounded space-y-1",
        children: options
      });
    } else {
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-col rounded"
      });
    }
  }
  function renderWorkspaces() {
    var componentMap = ComponentManager.map();
    var canAddChildren = item ? item.canHaveChildren : true;

    // We want to make sure the item (parent) can have children from the config
    // We also want to limit the workspaces to layout only
    // if the parent workspace is NOT layout, we only allow "layout" components

    var options = canAddChildren === true && item["parentWorkspaceName"] === "layout" ? Object.keys(componentMap).sort().filter(function (i) {
      return searchTerm !== "" ? i.toLowerCase().includes(searchTerm) : true;
    }).filter(function (c) {
      return componentMap[c]["type"] === "workspace" || componentMap[c]["workspace"] === "layout";
    }).map(function (w) {
      return renderMenuItem("workspace", w);
    }) : Object.keys(componentMap).sort().filter(function (i) {
      return searchTerm !== "" ? i.toLowerCase().includes(searchTerm) : true;
    }).filter(function (c) {
      return componentMap[c]["workspace"] === "layout";
    }).map(function (w) {
      return renderMenuItem("workspace", w);
    });
    return /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded space-y-1",
      children: options
    });
  }
  function handleClickItem(data) {
    try {
      var layoutModel = LayoutModel(data, workspace);

      // we have to give the widget an ID
      var nextId = getNextHighestId(workspace["layout"]);
      var nextOrderData = getNextHighestOrder(workspace["layout"]);
      var nextOrder = nextOrderData["highest"];
      // data['id'] = nextId;

      layoutModel.id = nextId;
      layoutModel.order = nextOrder;
      layoutModel["parent"] = parentWorkspace !== null && parentWorkspace !== undefined ? "id" in parentWorkspace ? parentWorkspace["id"] : 0 : 0; // unsure if this is ok

      layoutModel["parentWorkspace"] = item["parentWorkspace"];
      layoutModel["parentWorkspaceName"] = item["parentWorkspaceName"];
      layoutModel["parent"] = item["id"];
      // nearest parent workspace (use the original widget/workspace clicked
      // to begin looking...

      // lets add the data to the original workspace...
      var newWorkspace = JSON.parse(JSON.stringify(workspace));
      newWorkspace["layout"] = [layoutModel["parentWorkspace"], layoutModel];
      setMenuItemSelected(function () {
        return layoutModel;
      });
      setWorkspaceSelected(function () {
        return newWorkspace;
      });
      forceUpdate();
    } catch (e) {
      console.log(e);
    }
  }
  function handleAddItem(data) {
    console.log("HANDLE ADD ITEM ", data);
    // The "item" is the item we selected in the layout to add TO
    // The menuItemSelected is the item we chose from the list...
    console.log("adding item", menuItemSelected, item);
    onSaveItem(menuItemSelected, item);
  }
  function renderMenuItem(type, componentName) {
    return /*#__PURE__*/jsx(MenuItem3, {
      onClick: function onClick() {
        return handleClickItem({
          type: type,
          component: componentName
        });
      },
      children: componentName
    });
  }

  // function handleUpdateMenuItem(data) {
  //     console.log('changed ', data);
  //     setMenuItemSelected(() => data);
  //     forceUpdate();
  // }

  function handleUpdate(e, layoutItem) {
    try {
      console.log("widget data changed ", layoutItem);

      // let configItem = ComponentManager.config(data['component'], data);

      // // we have to give the widget an ID
      var nextId = getNextHighestId(workspaceSelected["layout"]);
      // const nextOrder = getNextHighestOrder(workspaceSelected['layout']);

      layoutItem["id"] = nextId;
      // data['widgetConfig'] = configItem;

      // // lets add the data to the original workspace...
      layoutItem["parent"] = parentWorkspace !== null ? parentWorkspace["id"] : 0; // unsure if this is ok

      // // lets add the data to the original workspace...
      var newWorkspace = JSON.parse(JSON.stringify(workspace));
      newWorkspace["layout"] = [parentWorkspace, layoutItem];
      setMenuItemSelected(function () {
        return layoutItem;
      });
      setWorkspaceSelected(function () {
        return newWorkspace;
      });
      // forceUpdate();
    } catch (e) {
      console.log("ERROR ", e.message);
    }
  }
  function renderAddContainer(itemData) {
    try {
      var workspaceSelectedTemp = JSON.parse(JSON.stringify(workspaceSelected));
      if (item.parentWorkspace !== undefined && item.parentWorkspace !== null) {
        // let's make a custom layout with the parent workspace and the item selected
        // need the workspace for the functionality...
        var parentWorkspaceTemp = JSON.parse(JSON.stringify(item.parentWorkspace));
        var layout = JSON.parse(JSON.stringify(workspaceSelectedTemp["layout"]));
        var itemTemp = JSON.parse(JSON.stringify(itemData));
        if (item.parentWorkspace) {
          // set the id's to work appropriately.
          itemTemp["parent"] = parentWorkspaceTemp["id"];
          // set the new layout
          layout = [parentWorkspaceTemp, itemTemp];

          // let's determine the order...
          // const layoutItems = parentWorkspaceTemp.layout.map(li => li.order);
          // console.log('ORDER OF ITEMS ', layoutItems);
        }

        return item.parentWorkspace && renderLayout({
          workspaceSelected: workspaceSelected,
          layout: layout,
          parentKey: item.parentWorkspace["parent"],
          previewMode: true,
          isDraggable: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return item && /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-5/6",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col w-full h-full overflow-hidden",
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-row w-full h-full space-x-4 overflow-hidden rounded",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-col h-full rounded p-4 text-gray-200 overflow-y-scroll w-1/4 space-y-4",
            children: [/*#__PURE__*/jsx("div", {
              className: "flex flex-row pb-4",
              children: /*#__PURE__*/jsx(InputText, {
                textSize: "text-sm",
                onChange: function onChange(e) {
                  return setSearchTerm(e.target.value);
                },
                value: searchTerm,
                placeholder: "Widgetize"
              })
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col space-y-2",
              children: [/*#__PURE__*/jsx("span", {
                className: "text-xs uppercase font-bold px-2 text-gray-400",
                children: "Layout/Function"
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col rounded space-y-2",
                children: renderWorkspaces()
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col space-y-2",
              children: [/*#__PURE__*/jsx("span", {
                className: "text-xs uppercase font-bold px-2 text-gray-400",
                children: "Widgets"
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col rounded space-y-2",
                children: renderWidgets()
              })]
            })]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row h-full text-gray-200 overflow-y-scroll w-full rounded p-4 space-x-4 ".concat(theme["bg-secondary-dark"]),
            children: [menuItemSelected === null && /*#__PURE__*/jsx("div", {
              className: "flex-col h-full rounded font-medium text-gray-400 w-full xl:w-1/2 p-10",
              children: /*#__PURE__*/jsxs("div", {
                className: "flex flex-col rounded p-4 py-10 space-y-4",
                children: [/*#__PURE__*/jsx(Heading, {
                  title: "Build.",
                  padding: false
                }), /*#__PURE__*/jsx(SubHeading3, {
                  title: "Choose a Workspace or Widget from the Available Components.",
                  padding: false
                }), /*#__PURE__*/jsx(Paragraph, {
                  text: "Don't worry, you can't mess this up.",
                  padding: false
                })]
              })
            }), menuItemSelected !== null && /*#__PURE__*/jsxs("div", {
              className: "flex flex-col rounded border-2 border-gray-800 ".concat(getBorderStyle(menuItemSelected), " overflow-hidden h-full w-3/4 bg-gray-900"),
              children: [/*#__PURE__*/jsx("div", {
                className: "flex flex-col p-2 space-x-1 uppercase text-xs text-gray-200 font-bold bg-gray-800",
                children: menuItemSelected !== null && /*#__PURE__*/jsxs("div", {
                  className: "flex flex-row",
                  children: ["Preview:", " ", menuItemSelected["component"]]
                })
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col overflow-hidden justify-between h-full",
                children: /*#__PURE__*/jsx("div", {
                  className: "flex flex-col grow p-2",
                  children: renderAddContainer(menuItemSelected)
                })
              })]
            }), menuItemSelected && /*#__PURE__*/jsx("div", {
              className: "flex flex-col w-1/4",
              children: /*#__PURE__*/jsx(WidgetConfigPanel, {
                item: menuItemSelected,
                onChange: handleUpdate
                // onSave={handleAddItem}
                ,
                disabled: false,
                workspace: workspaceSelected,
                parentWorkspace: parentWorkspace
              })
            })]
          })]
        }), /*#__PURE__*/jsx("div", {
          className: "flex flex-row justify-end ".concat(theme["bg-primary-very-dark"], " p-4 rounded-br rounded-bl border-t ").concat(theme["border-primary-dark"]),
          children: /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(Button, {
              title: "Cancel",
              bgColor: "bg-gray-800",
              textSize: "text-lg",
              padding: "py-2 px-4",
              onClick: function onClick() {
                return setIsOpen(false);
              }
            }), /*#__PURE__*/jsx(Button, {
              title: "Save Changes",
              bgColor: "bg-gray-800",
              hoverBackgroundColor: "hover:bg-green-700",
              textSize: "text-lg",
              padding: "py-2 px-4",
              onClick: handleAddItem
            })]
          })
        })]
      })
    })
  });
};

function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
var PanelEditItem = function PanelEditItem(_ref) {
  var workspace = _ref.workspace,
    onUpdate = _ref.onUpdate,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(item),
    _useState2 = _slicedToArray$b(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$b(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$b(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    //console.log('EFFECT PanelEditItem', workspace, workspaceSelected, item['userPrefs'], itemSelected['userPrefs']);
    //console.log('COMPARE RESULT: ', deepEqual(item, itemSelected));
    if (deepEqual(item, itemSelected) === false) {
      console.log("COMPARE CHECK DIFFERENT!");
      setItemSelected(function () {
        return item;
      });
      forceUpdate();
    }
    if (deepEqual(workspace, workspaceSelected) === false) {
      setWorkspaceSelected(function () {
        return workspace;
      });
      forceUpdate();
    }

    // if (open === false) {
    //     setItemSelected(null);
    //     setWorkspaceSelected(null);
    // }
  }, [workspace, item]);

  function handleUpdate(e, data) {
    console.log("handling update ", e, data);
    var workspaceTemp = WorkspaceModel(workspaceSelected);
    var newLayout = replaceItemInLayout(workspaceTemp.layout, data["id"], data);
    workspaceTemp.layout = newLayout;

    // setWorkspaceSelected(() => workspaceTemp);
    // setItemSelected(() => data);
    onUpdate(data, workspaceTemp);
    forceUpdate();
  }
  function renderEditContainer() {
    try {
      console.log("RENDERING EDIT CONTAINER ", itemSelected);
      if (itemSelected !== null && workspaceSelected !== null) {
        var workspaceSelectedTemp = JSON.parse(JSON.stringify(workspaceSelected));
        if (itemSelected.parentWorkspace !== undefined && itemSelected.parentWorkspace !== null) {
          // let's make a custom layout with the parent workspace and the itemSelected
          // need the workspace for the functionality...
          var parentWorkspaceTemp = JSON.parse(JSON.stringify(itemSelected.parentWorkspace));
          var layout = JSON.parse(JSON.stringify(workspaceSelectedTemp["layout"]));
          var itemTemp = JSON.parse(JSON.stringify(itemSelected));

          // VERY IMPORTANT TO CHECK THE WORKSPACES!!!!
          // otherwise the workspace will crash as the widget doesnt belong...
          if (itemSelected["workspace"] === parentWorkspaceTemp["workspace"]) {
            if (item.parentWorkspace) {
              // set the id's to work appropriately.
              parentWorkspaceTemp["id"] = 1;
              parentWorkspaceTemp["parent"] = 0;
              itemTemp["parent"] = 1; //parentWorkspaceTemp['id'];
              // set the new layout
              layout = [parentWorkspaceTemp, itemTemp];
            }
            return itemSelected.parentWorkspace && renderLayout({
              workspace: workspaceSelected,
              layout: layout,
              parentKey: 0,
              previewMode: true,
              isDraggable: false
            });
          } else {
            // workspace mismatch!
            return null;
          }
        }
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return itemSelected && workspaceSelected && /*#__PURE__*/jsx(Panel, {
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-row w-full h-full space-x-4 overflow-hidden",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex flex-col w-3/4 min-w-3/4 h-full rounded",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-col w-full h-full rounded space-y-2 border-2 border-dashed ".concat(theme["border-secondary-very-dark"]),
          children: [/*#__PURE__*/jsx("div", {
            className: "flex p-2 text-xs ".concat(theme["text-secondary-dark"], " rounded-br uppercase font-bold "),
            children: "Preview"
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col p-4",
            children: itemSelected !== null && workspaceSelected !== null && renderEditContainer()
          })]
        })
      }), /*#__PURE__*/jsx("div", {
        className: "flex flex-col w-1/4 ".concat(theme["bg-secondary-dark"]),
        children: itemSelected && /*#__PURE__*/jsx(WidgetConfigPanel, {
          item: itemSelected,
          onChange: handleUpdate,
          onSave: null,
          disabled: itemSelected === null,
          workspace: workspaceSelected,
          parentWorkspace: itemSelected.parentWorkspace
        })
      })]
    })
  });
};

function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
var PanelEditItemHandlers = function PanelEditItemHandlers(_ref) {
  var workspace = _ref.workspace,
    open = _ref.open,
    onUpdate = _ref.onUpdate,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(item),
    _useState2 = _slicedToArray$a(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$a(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray$a(_useState5, 2),
    eventsSelected = _useState6[0],
    setEventsSelected = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$a(_useState7, 2),
    eventHandlerSelected = _useState8[0],
    setEventHandlerSelected = _useState8[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$a(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    console.log("event workspace ", item, itemSelected, workspace, workspaceSelected);

    // if (workspaceSelected === null && deepEqual(workspaceSelected, workspace) === false) {
    //     setWorkspaceSelected(() => workspace);
    //     loadExistingListeners(workspace);
    // }

    if (deepEqual(item, itemSelected) === false) {
      setItemSelected(function () {
        return item;
      });
      // loadExistingListeners(workspace);
    }

    if (deepEqual(workspace, workspaceSelected) === false) {
      setWorkspaceSelected(function () {
        return workspace;
      });
      loadExistingListeners(workspace);
    }
    if (open === true && item && workspace) {
      loadExistingListeners(workspace);
    }
    // if (open === false) {
    //     setItemSelected(() => null);
    //     // setComponentsSelected(() => []);
    //     setEventsSelected(() => {});
    //     setEventHandlerSelected(() => null);
    // }

    // if (Object.keys(componentsSelected).length < 1) {
    //     loadExistingListeners(workspace);
    // }
  }, [open, workspace, item]);
  useEffect(function () {
    console.log("event and handler change effect", eventHandlerSelected, eventsSelected);
    handleSaveChanges();
  }, [eventsSelected, eventHandlerSelected]);
  function loadExistingListeners(ws) {
    console.log("loading existing ");
    if (ws !== null) {
      var existingListeners = {};
      ws.layout.forEach(function (layoutItem) {
        if ("listeners" in layoutItem) {
          Object.keys(layoutItem["listeners"]).forEach(function (key) {
            var events = layoutItem["listeners"][key];
            existingListeners[key] = events;
          });
        }
      });
      setEventsSelected(function () {
        return existingListeners;
      });
      console.log("existing listeners ", existingListeners);
      // let's select one for the user
      if (Object.keys(existingListeners).length > 0) {
        setEventHandlerSelected(function () {
          return Object.keys(existingListeners)[0];
        });
      }
      forceUpdate();
    }
  }
  function handleSelectEvent(eventString) {
    try {
      console.log("event selected ", eventString, eventHandlerSelected);
      if (eventsSelected && eventHandlerSelected !== null) {
        // check if we have the hander "key" in the events object
        var tempEvents = [];
        var tempEventsSelected = deepCopy(eventsSelected);
        console.log("temp events selected ", tempEventsSelected);
        if (eventHandlerSelected in tempEventsSelected) {
          tempEvents = tempEventsSelected[eventHandlerSelected];
        }
        console.log("temp events selected ", tempEvents);
        tempEvents.push(eventString);
        var uniqueEventsSelected = tempEvents.filter(function (value, index, array) {
          return array.indexOf(value) === index;
        }); // remove any possible duplicates;
        tempEventsSelected[eventHandlerSelected] = uniqueEventsSelected;
        setEventsSelected(function () {
          return tempEventsSelected;
        });
        console.log("DONE ", tempEventsSelected);
        handleSaveChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  function handleRemoveEvent(eventString) {
    var eventsSelectedTemp = eventsSelected[eventHandlerSelected].filter(function (event) {
      return event !== eventString;
    });
    setEventsSelected(function () {
      return eventsSelectedTemp;
    });
    handleSaveChanges();
  }
  function handleSelectEventHandler(handler) {
    setEventHandlerSelected(function () {
      return handler;
    });
    handleSaveChanges();
  }
  function handleRemoveEventHandler() {
    setEventHandlerSelected(function () {
      return null;
    });
    setEventsSelected(function () {});
    handleSaveChanges();
  }
  function getLayoutItemById(id) {
    if (workspaceSelected !== null) {
      var layoutItems = workspaceSelected.layout.filter(function (layoutItem) {
        return layoutItem["id"] === parseInt(id, 10);
      });
      if (layoutItems.length > 0) {
        return layoutItems[0];
      }
    }
    return null;
  }
  function handleSaveChanges() {
    try {
      if (workspaceSelected !== null && eventHandlerSelected !== null && Object.keys(eventsSelected).length > 0) {
        console.log("saving changes");
        var tempWorkspace = deepCopy(workspaceSelected);

        // craft the event handler + listeners
        // and add to the layout item
        var layoutItem = getLayoutItemById(itemSelected["id"]);

        // now lets add to it...
        layoutItem["listeners"] = eventsSelected;
        tempWorkspace["layout"] = replaceItemInLayout(tempWorkspace.layout, layoutItem["id"], layoutItem);

        // save the new workspace
        onUpdate(layoutItem, tempWorkspace);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * isSelected
   * Check to see if the event for the component is selected
   *
   * @param {String} eventString the string containing {component}[{id}].{event}
   * @returns
   */

  function isSelectedEvent(event) {
    try {
      if (eventsSelected !== null && eventHandlerSelected) {
        console.log("checking is event selected ", eventsSelected, eventsSelected[eventHandlerSelected], event);
        return eventsSelected[eventHandlerSelected].includes(event);
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  function renderAvailableEvents() {
    if (workspaceSelected !== null) {
      console.log("available events ", workspaceSelected);
      return workspaceSelected.layout.filter(function (l) {
        return l["component"] !== "Container";
      }).filter(function (e) {
        return e.events.length > 0;
      }).filter(function (li) {
        return li["component"] !== itemSelected["component"];
      }).map(function (layout) {
        return /*#__PURE__*/jsxs("div", {
          className: "flex flex-col text-base font-bold text-gray-400 p-2",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4",
            children: /*#__PURE__*/jsxs("span", {
              className: "text-lg",
              children: [layout["component"], "\xA0[", layout["id"], "]"]
            })
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col space-y-1 py-1",
            children: layout.events.filter(function (value, index, array) {
              return array.indexOf(value) === index;
            }) // remove any possible duplicates
            .map(function (event) {
              var eventString = "".concat(layout["component"], "[").concat(layout["id"], "].").concat(event);
              var selected = isSelectedEvent(eventString);
              console.log("SELECTED ", eventString, selected);
              return /*#__PURE__*/jsxs("div", {
                onClick: function onClick() {
                  return selected === true ? handleRemoveEvent(eventString) : handleSelectEvent(eventString);
                },
                className: "flex flex-row ".concat(selected === false && "hover:bg-gray-800", " rounded cursor-pointer p-2 font-bold items-center space-x-2 ").concat(selected === true ? "bg-blue-800" : "", " "),
                children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
                  icon: "square-check",
                  className: "".concat(selected === true ? "text-blue-500" : "text-gray-700", " text-xl")
                }), /*#__PURE__*/jsx("div", {
                  className: "flex flex-col",
                  children: /*#__PURE__*/jsx("span", {
                    className: "text-base hover:text-gray-300 ".concat(selected === true ? "text-gray-300" : "text-gray-400"),
                    children: event
                  })
                })]
              });
            })
          })]
        });
      });
    }
  }
  function renderAvailableHandlers() {
    if (workspaceSelected !== null) {
      return workspaceSelected.layout.filter(function (li) {
        return li["id"] === itemSelected["id"];
      }).map(function (layout) {
        return layout.eventHandlers.length > 0 && /*#__PURE__*/jsxs("div", {
          className: "flex flex-col text-base font-bold text-gray-400 p-2",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4",
            children: /*#__PURE__*/jsxs("span", {
              className: "text-lg",
              children: [layout["component"], "\xA0[", layout["id"], "]"]
            })
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col space-y-1 py-1",
            children: layout.eventHandlers.filter(function (value, index, array) {
              return array.indexOf(value) === index;
            }) // remove any possible duplicates
            .map(function (handler) {
              var selected = eventHandlerSelected !== null ? eventHandlerSelected === handler : false; //isHandlerSelected(handler);
              console.log("selected handler ", selected, eventHandlerSelected);
              return /*#__PURE__*/jsx("div", {
                onClick: function onClick() {
                  return selected ? handleRemoveEventHandler() : handleSelectEventHandler(handler);
                },
                className: "flex flex-row ".concat(selected === false && "hover:bg-gray-800", " rounded cursor-pointer p-2 font-bold items-center space-x-2 ").concat(selected === true && "bg-indigo-700"),
                children: /*#__PURE__*/jsx("div", {
                  className: "flex flex-col px-2",
                  children: /*#__PURE__*/jsx("span", {
                    className: "text-base hover:text-gray-300 ".concat(selected === true ? "text-gray-300" : "text-gray-400"),
                    children: handler
                  })
                })
              });
            })
          })]
        });
      });
    }
  }
  return itemSelected !== null && /*#__PURE__*/jsx(Panel, {
    theme: false,
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col w-full h-full overflow-hidden",
      children: /*#__PURE__*/jsx("div", {
        className: "flex flex-col w-full h-full overflow-hidden",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-row w-full h-full overflow-hidden space-x-4 justify-between",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex-col h-full rounded font-medium text-gray-400 w-full hidden xl:flex lg:w-1/3",
            children: itemSelected !== null && /*#__PURE__*/jsxs("div", {
              className: "flex flex-col rounded p-4 py-10 space-y-4",
              children: [/*#__PURE__*/jsx("p", {
                className: "text-5xl font-bold ".concat(theme["text-secondary-very-light"]),
                children: "Listen Up."
              }), /*#__PURE__*/jsx("p", {
                className: "text-xl font-normal ".concat(theme["text-secondary-light"]),
                children: "Widgets and Workspaces can talk, but we have to setup the phone wires."
              }), /*#__PURE__*/jsx("p", {
                className: "text-xl font-normal ".concat(theme["text-secondary-light"]),
                children: "Select the method to handle the message first, then select the message it will handle."
              })]
            })
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-col bg-gray-900 h-full rounded w-1/2 xl:w-1/3",
            children: [/*#__PURE__*/jsxs("span", {
              className: "uppercase text-xs text-gray-300 font-bold p-2 bg-gray-800 rounded-t px-2",
              children: ["Available Handlers", " "]
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col h-full overflow-y-scroll p-2",
              children: [itemSelected.eventHandlers.length > 0 && renderAvailableHandlers(), itemSelected.eventHandlers.length === 0 && /*#__PURE__*/jsx("div", {
                className: "flex flex-col text-yellow-600 font-bold p-4",
                children: "No available Handlers found."
              })]
            })]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-col bg-gray-900 h-full rounded w-1/2 xl:w-1/3",
            children: [/*#__PURE__*/jsxs("span", {
              className: "uppercase text-xs text-gray-300 font-bold p-2 bg-gray-800 rounded-t px-2",
              children: ["Available Events", " "]
            }), /*#__PURE__*/jsx("div", {
              className: "flex flex-col h-full overflow-y-scroll p-2",
              children: eventHandlerSelected !== null && renderAvailableEvents()
            })]
          })]
        })
      })
    })
  });
};

function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var PanelCode = function PanelCode(_ref) {
  var workspace = _ref.workspace,
    onUpdate = _ref.onUpdate,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(item),
    _useState2 = _slicedToArray$9(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$9(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$9(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (deepEqual(item, itemSelected) === false) {
      setItemSelected(function () {
        return item;
      });
      forceUpdate();
    }
    if (deepEqual(workspace, workspaceSelected) === false) {
      setWorkspaceSelected(function () {
        return workspace;
      });
      forceUpdate();
    }
  }, [workspace, item]);
  function handleCodeChange(code) {
    var itemToSave = JSON.parse(code);
    onUpdate(itemToSave, workspaceSelected);
  }
  return itemSelected && workspaceSelected && /*#__PURE__*/jsx(Panel, {
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-row w-full h-full space-x-4 overflow-hidden",
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-row w-full min-w-3/4 h-full rounded",
        children: [/*#__PURE__*/jsx("div", {
          className: "flex-col h-full rounded font-medium ".concat(theme["text-secondary-dark"], " w-full hidden xl:flex lg:w-1/3"),
          children: itemSelected !== null && /*#__PURE__*/jsxs("div", {
            className: "flex flex-col rounded p-4 py-10 space-y-4",
            children: [/*#__PURE__*/jsx("p", {
              className: "text-5xl font-bold ".concat(theme["text-secondary-very-light"]),
              children: "Nerdery."
            }), /*#__PURE__*/jsx("p", {
              className: "text-xl font-normal ".concat(theme["text-secondary-light"]),
              children: "If this appears to be jibberish to you, please turn around."
            }), /*#__PURE__*/jsx("p", {
              className: "text-xl font-normal ".concat(theme["text-secondary-light"]),
              children: "If you need to manually edit the code for the Component selected, by all means."
            })]
          })
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-col h-full border-2 border-gray-800 rounded ".concat(theme["bg-secondary-very-dark"], " w-full xl:w-2/3"),
          children: [/*#__PURE__*/jsx("div", {
            className: "flex ".concat(theme["bg-secondary-very-dark"], " p-2 text-xs text-gray-300 rounded-br uppercase font-bold"),
            children: "Code Editor"
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col text-green-600 overflow-y-scroll ".concat(theme["bg-secondary-very-dark"]),
            children: itemSelected !== null && workspaceSelected !== null && /*#__PURE__*/jsx("div", {
              className: "text-xs break-all h-full ".concat(theme["bg-secondary-very-dark"]),
              children: /*#__PURE__*/jsx(CodeEditorInline, {
                code: JSON.stringify(itemSelected, null, 2),
                className: "p-0 h-full ".concat(theme["bg-secondary-very-dark"]),
                setCode: handleCodeChange
              })
            })
          })]
        })]
      })
    })
  });
};

function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderConfigModal = function LayoutBuilderConfigModal(_ref) {
  var workspace = _ref.workspace,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen,
    onSaveWorkspace = _ref.onSaveWorkspace,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useContext = useContext$1(ThemeContext),
    theme = _useContext.theme;
  var _useState = useState(item),
    _useState2 = _slicedToArray$8(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$8(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _useState5 = useState("edit"),
    _useState6 = _slicedToArray$8(_useState5, 2),
    configMenuItemSelected = _useState6[0],
    setConfigMenuItemSelected = _useState6[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$8(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (item !== itemSelected) {
      setItemSelected(function () {
        return item;
      });
    }
    if (workspace !== workspaceSelected) {
      setWorkspaceSelected(function () {
        return workspace;
      });
    }
    if (open === false) {
      setItemSelected(null);
      setConfigMenuItemSelected("edit");
      setWorkspaceSelected(null);
    }
  }, [open]);

  /**
   * handleEditChange
   * This method will receive the item and workspace
   * but not SAVE it...only update the data.
   *
   * @param {} itemChanged the LaoutItem
   * @param {*} workspaceChanged the Workspace item
   */
  function handleEditChange(itemChanged, workspaceChanged) {
    console.log("handle edit ", itemChanged, workspaceChanged);
    setItemSelected(function () {
      return itemChanged;
    });
    setWorkspaceSelected(function () {
      return workspaceChanged;
    });
    // onSaveWorkspace(workspaceChanged);
    forceUpdate();
  }
  function handleSaveConfig() {
    console.log("saving from config panel ", workspaceSelected);
    onSaveWorkspace(workspaceSelected);
  }
  return itemSelected !== null && /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-11/12 xl:w-5/6",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col w-full h-full overflow-hidden",
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-row w-full h-full overflow-hidden",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-col h-full ".concat(theme["bg-secondary-very-dark"], " p-2 px-4 pt-4 space-y-2"),
            children: [/*#__PURE__*/jsx(ButtonIcon, {
              icon: "cog",
              iconSize: "w-6 h-6",
              onClick: function onClick() {
                return setConfigMenuItemSelected("edit");
              },
              bgColor: configMenuItemSelected === "edit" ? "bg-blue-700" : "bg-blue-900"
            }), itemSelected["workspace"] !== "layout" && /*#__PURE__*/jsx(ButtonIcon, {
              icon: "phone",
              iconSize: "w-6 h-6",
              onClick: function onClick() {
                return setConfigMenuItemSelected("handlers");
              },
              bgColor: configMenuItemSelected === "handlers" ? "bg-blue-700" : "bg-blue-900"
            }), /*#__PURE__*/jsx(ButtonIcon, {
              icon: "code",
              iconSize: "w-6 h-6",
              onClick: function onClick() {
                return setConfigMenuItemSelected("code");
              },
              bgColor: configMenuItemSelected === "code" ? "bg-blue-700" : "bg-blue-900"
            })]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row w-full h-full space-x-4 overflow-hidden p-4 ".concat(theme["bg-secondary-dark"]),
            children: [configMenuItemSelected === "edit" && /*#__PURE__*/jsx(PanelEditItem, {
              item: itemSelected,
              onUpdate: handleEditChange,
              workspace: workspaceSelected
            }), configMenuItemSelected === "handlers" && /*#__PURE__*/jsx(PanelEditItemHandlers, {
              item: itemSelected,
              onUpdate: handleEditChange,
              workspace: workspaceSelected
            }), configMenuItemSelected === "code" && /*#__PURE__*/jsx(PanelCode, {
              item: itemSelected,
              onUpdate: handleEditChange,
              workspace: workspaceSelected
            })]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row justify-end ".concat(theme["bg-primary-very-dark"], " p-4 rounded-br rounded-bl border-t border-gray-800 justify-between items-center"),
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row font-bold text-xl ".concat(theme["text-secondary-light"], " px-2"),
            children: itemSelected["component"]
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-2",
            children: [/*#__PURE__*/jsx(Button, {
              title: "Cancel",
              bgColor: "bg-gray-800",
              textSize: "text-lg",
              padding: "py-2 px-4",
              onClick: function onClick() {
                return setIsOpen(false);
              }
            }), /*#__PURE__*/jsx(Button, {
              title: "Save Changes",
              bgColor: "bg-gray-800",
              hoverBackgroundColor: "hover:bg-green-700",
              textSize: "text-lg",
              padding: "py-2 px-4",
              onClick: handleSaveConfig
            })]
          })]
        })]
      })
    })
  });
};

function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderEditItemModal = function LayoutBuilderEditItemModal(_ref) {
  var workspace = _ref.workspace,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen,
    onUpdate = _ref.onUpdate,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useContext = useContext$1(ThemeContext);
    _useContext.theme;
  var _useState = useState(item),
    _useState2 = _slicedToArray$7(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$7(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$7(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    if (item !== itemSelected) {
      setItemSelected(function () {
        return item;
      });
    }
    if (workspace !== workspaceSelected) {
      setWorkspaceSelected(function () {
        return workspace;
      });
    }
    if (open === false) {
      setItemSelected(null);
      setWorkspaceSelected(null);
    }
  }, [open, workspace, item]);
  function handleSaveChanges(itemData) {
    console.log("edit modal save changes ", itemData);
    if (itemData !== null) {
      console.log("handleSaveChanges ", itemData);
      onUpdate(itemData);
      setItemSelected(null);
      setIsOpen(false);
    }
  }
  function handleUpdate(data) {
    console.log("handle update widget panel ", data);
    var workspaceTemp = WorkspaceModel(workspaceSelected);
    var newLayout = replaceItemInLayout(workspaceTemp.layout, data["id"], data);
    console.log("new layout ", newLayout);
    workspaceTemp.layout = newLayout;
    setWorkspaceSelected(function () {
      return workspaceTemp;
    });
    setItemSelected(function () {
      return data;
    });
    forceUpdate();
  }
  function renderEditContainer() {
    try {
      if (itemSelected !== null && workspaceSelected !== null) {
        var workspaceSelectedTemp = JSON.parse(JSON.stringify(workspaceSelected));
        if (itemSelected.parentWorkspace !== undefined && itemSelected.parentWorkspace !== null) {
          // let's make a custom layout with the parent workspace and the itemSelected
          // need the workspace for the functionality...
          var parentWorkspaceTemp = JSON.parse(JSON.stringify(item.parentWorkspace));
          var layout = JSON.parse(JSON.stringify(workspaceSelectedTemp["layout"]));
          var itemTemp = JSON.parse(JSON.stringify(itemSelected));

          // VERY IMPORTANT TO CHECK THE WORKSPACES!!!!
          // otherwise the workspace will crash as the widget doesnt belong...
          if (itemSelected["workspace"] === parentWorkspaceTemp["workspace"]) {
            if (itemSelected.parentWorkspace) {
              // set the id's to work appropriately.
              parentWorkspaceTemp["id"] = 1;
              parentWorkspaceTemp["parent"] = 0;
              itemTemp["parent"] = 1; //parentWorkspaceTemp['id'];
              // set the new layout
              layout = [parentWorkspaceTemp, itemTemp];
            }
            return itemSelected.parentWorkspace && renderLayout({
              workspaceSelected: workspaceSelected,
              layout: layout,
              parentKey: 0,
              previewMode: true,
              isDraggable: false
            });
          } else {
            // workspace mismatch!
            return null;
          }
        }
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  function getTitle() {
    try {
      if (itemSelected.parentWorkspace) {
        if ("component" in itemSelected.parentWorkspace) {
          return "".concat(itemSelected.parentWorkspace["component"], ": ").concat(itemSelected["component"]);
        } else {
          return itemSelected["component"];
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  return itemSelected && /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-5/6 2xl:w-3/4",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col w-full h-full space-y-2 overflow-hidden p-4",
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-row text-xl font-bold text-white justify-between",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row text-xl font-bold text-white p-2 space-x-2 justify-center items-center",
            children: itemSelected && /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
                icon: "folder"
              }), /*#__PURE__*/jsx("span", {
                className: "text-xl font-bold text-gray-200",
                children: getTitle()
              })]
            })
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "xmark",
            onClick: function onClick() {
              return setIsOpen(false);
            },
            bgColor: "".concat(getContainerColor(itemSelected["parentWorkspace"]))
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row w-full h-full space-x-4 overflow-hidden",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-col w-3/4 min-w-3/4 bg-gray-900 h-full rounded p-2",
            children: /*#__PURE__*/jsxs("div", {
              className: "flex flex-col w-full h-full border-2 border-gray-800 rounded space-y-2",
              children: [/*#__PURE__*/jsx("div", {
                className: "flex bg-gray-800 p-2 text-xs text-gray-300 rounded-br uppercase font-bold",
                children: "Preview"
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col p-2",
                children: itemSelected !== null && workspaceSelected !== null && renderEditContainer()
              })]
            })
          }), itemSelected && /*#__PURE__*/jsx("div", {
            className: "flex flex-col w-1/4",
            children: /*#__PURE__*/jsx(WidgetConfigPanel, {
              item: itemSelected,
              onChange: handleUpdate,
              onSave: handleSaveChanges,
              disabled: itemSelected === null,
              workspace: workspaceSelected,
              parentWorkspace: itemSelected.parentWorkspace
            })
          })]
        })]
      })
    })
  });
};

function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderEventModal = function LayoutBuilderEventModal(_ref) {
  var workspace = _ref.workspace,
    open = _ref.open,
    setIsOpen = _ref.setIsOpen,
    onSave = _ref.onSave,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item;
  var _useState = useState(item),
    _useState2 = _slicedToArray$6(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  var _useState3 = useState(workspace),
    _useState4 = _slicedToArray$6(_useState3, 2),
    workspaceSelected = _useState4[0],
    setWorkspaceSelected = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray$6(_useState5, 2),
    componentsSelected = _useState6[0];
    _useState6[1];
  // const [eventSelected, setEventSelected] = useState(null);
  var _useState7 = useState({}),
    _useState8 = _slicedToArray$6(_useState7, 2),
    eventsSelected = _useState8[0],
    setEventsSelected = _useState8[1];
  var _useState9 = useState(null),
    _useState10 = _slicedToArray$6(_useState9, 2),
    eventHandlerSelected = _useState10[0],
    setEventHandlerSelected = _useState10[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$6(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  useEffect(function () {
    console.log("event workspace ", workspaceSelected, workspace);
    if (open === true && workspaceSelected === null && workspaceSelected !== workspace) {
      setWorkspaceSelected(function () {
        return workspace;
      });
      loadExistingListeners(workspace);
    }
    if (item !== itemSelected) {
      setItemSelected(function () {
        return item;
      });
      loadExistingListeners(workspace);
    }
    if (workspace !== workspaceSelected) {
      setWorkspaceSelected(function () {
        return workspace;
      });
      loadExistingListeners(workspace);
    }
    if (open === false) {
      setItemSelected(function () {
        return null;
      });
      // setComponentsSelected(() => []);
      setEventsSelected(function () {});
      setEventHandlerSelected(function () {
        return null;
      });
    }
    if (Object.keys(componentsSelected).length < 1) {
      loadExistingListeners(workspace);
    }
  }, [open, workspace, item]);
  function loadExistingListeners(ws) {
    if (ws !== null) {
      var existingListeners = {};
      ws.layout.forEach(function (layoutItem) {
        if ("listeners" in layoutItem) {
          Object.keys(layoutItem["listeners"]).forEach(function (key) {
            var events = layoutItem["listeners"][key];
            existingListeners[key] = events;
          });
        }
      });
      setEventsSelected(function () {
        return existingListeners;
      });

      // let's select one for the user
      if (Object.keys(existingListeners).length > 0) {
        setEventHandlerSelected(function () {
          return Object.keys(existingListeners)[0];
        });
      }
      forceUpdate();
    }
  }

  // function loadExistingListenersForComponent(ws) {
  //     if (ws !== null) {
  //         const existingListeners = {};
  //         ws.layout.forEach(layoutItem => {
  //             existingListeners[layoutItem['id']] = layoutItem['listeners'];
  //         });
  //         console.log('EXISTING LISTENERS ', existingListeners);
  //         setComponentsSelected(() => existingListeners);
  //         forceUpdate();
  //     }
  // }

  // function handleSelectWorkspaceItem(workspaceItem) {
  //     setItemSelected(() => workspaceItem);
  //     forceUpdate();
  // }

  // function handleToggleSelectItem(selectedItem, event, eventString) {
  //     const selected = componentsSelected;
  //     if (selectedItem && event && itemSelected) {
  //         if (itemSelected['id'] in selected === false) {
  //             selected[`${itemSelected['id']}`] = [];
  //         }
  //         // add the event "string" to the listeners for the id of the item selected
  //         selected[`${itemSelected['id']}`].push(eventString);
  //         selected[`${itemSelected['id']}`].filter((value, index, array) => array.indexOf(value) === index);

  //         // let's set the current event selected so that we can tie this to the handler
  //         // when the user chooses that as well...
  //         const payload = { event, eventString };
  //         setEventSelected(() => payload);

  //         // now update the component selections
  //         setComponentsSelected(() => selected);
  //         handleUpdate();
  //     }
  // }

  function handleSelectEvent(eventString) {
    try {
      if (eventsSelected) {
        // check if we have the hander "key" in the events object
        var tempEvents = [];
        var tempEventsSelected = deepCopy(eventsSelected);
        console.log("temp events selected ", tempEventsSelected);
        if (eventHandlerSelected in tempEventsSelected) {
          tempEvents = tempEventsSelected[eventHandlerSelected];
        }
        console.log("temp events selected ", tempEvents);
        tempEvents.push(eventString);
        var uniqueEventsSelected = tempEvents.filter(function (value, index, array) {
          return array.indexOf(value) === index;
        }); // remove any possible duplicates;
        tempEventsSelected[eventHandlerSelected] = uniqueEventsSelected;
        setEventsSelected(function () {
          return tempEventsSelected;
        });
        console.log("DONE ", tempEventsSelected);
      }
    } catch (e) {
      console.log(e);
    }
  }
  function handleRemoveEvent(eventString) {
    var eventsSelectedTemp = eventsSelected[eventHandlerSelected].filter(function (event) {
      return event !== eventString;
    });
    setEventsSelected(function () {
      return eventsSelectedTemp;
    });
  }
  function handleSelectEventHandler(handler) {
    setEventHandlerSelected(function () {
      return handler;
    });
  }
  function handleRemoveEventHandler(handler) {
    setEventHandlerSelected(function () {
      return null;
    });
    setEventsSelected(function () {});
  }
  function getLayoutItemById(id) {
    if (workspaceSelected !== null) {
      var layoutItems = workspaceSelected.layout.filter(function (layoutItem) {
        return layoutItem["id"] === parseInt(id, 10);
      });
      if (layoutItems.length > 0) {
        return layoutItems[0];
      }
    }
    return null;
  }

  // function replaceLayoutItemInWorkspace(layoutItem, tempWorkspace) {
  //     if (tempWorkspace !== null && workspaceSelected !== null) {
  //         tempWorkspace.layout.forEach((li, index) => {
  //             if (li['id'] === layoutItem['id']) {
  //                 console.log('replacing item', layoutItem['listeners']);
  //                 //tempWorkspace.layout[index] = layoutItem;
  //                 li['listeners'] = layoutItem['listeners'];
  //             }
  //         });
  //         return tempWorkspace;
  //     }
  // }

  function handleSaveChanges(itemData) {
    try {
      if (workspaceSelected !== null) {
        var tempWorkspace = deepCopy(workspaceSelected);

        // craft the event handler + listeners
        // and add to the layout item
        var layoutItem = getLayoutItemById(itemSelected["id"]);

        // now lets add to it...
        layoutItem["listeners"] = eventsSelected;
        tempWorkspace["layout"] = replaceItemInLayout(tempWorkspace.layout, layoutItem["id"], layoutItem);

        // save the new workspace
        onSave(tempWorkspace);

        // reset the component
        setItemSelected(function () {
          return null;
        });
        setWorkspaceSelected(function () {
          return null;
        });
        setEventsSelected(function () {});
        setEventHandlerSelected(function () {
          return null;
        });
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // function handleUpdate() {
  //     if (workspaceSelected !== null) {
  //         const tempWorkspace = deepCopy(workspaceSelected);
  //         Object.keys(componentsSelected).map(key => {
  //             // the item doing the listening...
  //             const layoutItem = getLayoutItemById(key); // source item
  //             if (layoutItem !== null) {
  //                 const listnersForItem = componentsSelected[layoutItem['id']];
  //                 layoutItem['listeners'] = listnersForItem;
  //                 replaceLayoutItemInWorkspace(layoutItem, tempWorkspace);
  //             }
  //         });
  //         // set the new workspace
  //         setWorkspaceSelected(() => tempWorkspace);
  //         forceUpdate();
  //     }
  // }

  // function getTitle() {
  //     try {
  //         if (itemSelected.parentWorkspace) {
  //             if ('component' in itemSelected.parentWorkspace) {
  //                 return <span className="flex flex-row">{itemSelected['component']}</span>// in the&nbsp; <span className="flex flex-row underline">{itemSelected['parentWorkspaceName']}</span> &nbsp;workspace</span>;
  //             } else {
  //                 return itemSelected['component'];
  //             }
  //         }
  //         return null;
  //     } catch(e) {
  //         return null;
  //     }
  // }

  /**
   * isSelected
   * Check to see if the event for the component is selected
   *
   * @param {String} eventString the string containing {component}[{id}].{event}
   * @returns
   */
  // function isSelected(eventString) {
  //     let selected = false;
  //     if (itemSelected !== null) {
  //         // first lets check to see if it is in our components array as "Selected" but pending save.
  //         if (itemSelected['id'] in componentsSelected) {
  //             componentsSelected[itemSelected['id']].forEach(event => {
  //                 if (event === eventString) selected = true;
  //             });
  //         }
  //     }
  //     return selected;
  // }

  function isSelectedEvent(event) {
    try {
      if (eventsSelected !== null && eventHandlerSelected) {
        console.log("checking is event selected ", eventsSelected, eventsSelected[eventHandlerSelected], event);
        return eventsSelected[eventHandlerSelected].includes(event);
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // function renderWorkspaceLayoutItems() {
  //     return workspaceSelected !== null && itemSelected !== null && workspaceSelected.layout
  //         .filter(i => i['component'] !== 'Container')
  //         .map(li => {
  //             const selected = itemSelected['id'] === li['id'];
  //             return (
  //                 <div
  //                     onClick={() => handleSelectWorkspaceItem(li)}
  //                     className={`flex flex-row ${selected === false && 'hover:bg-gray-800'} rounded cursor-pointer p-2 px-4 font-bold items-center space-x-2 ${selected === true ? 'bg-blue-800 text-gray-300' : 'text-gray-400'} hover:text-gray-300`}
  //                 >
  //                     <div className={`flex flex-col w-full space-y-1`}>
  //                         <span className={`text-lg flex flex-row ${selected === true && 'text-gray-300'}`}>
  //                             {li['component']}&nbsp;[{li['id']}]
  //                         </span>
  //                         <span className="text-indigo-500 text-sm font-normal">{li['listeners'].length} listeners connected</span>
  //                     </div>
  //                 </div>);
  //         });
  // }

  function renderAvailableEvents() {
    if (workspaceSelected !== null) {
      return workspaceSelected.layout.filter(function (l) {
        return l["component"] !== "Container";
      }).filter(function (e) {
        return e.events.length > 0;
      }).filter(function (li) {
        return li["component"] !== itemSelected["component"];
      }).map(function (layout) {
        return /*#__PURE__*/jsxs("div", {
          className: "flex flex-col text-base font-bold text-gray-400 p-2",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4",
            children: /*#__PURE__*/jsxs("span", {
              className: "text-lg",
              children: [layout["component"], "\xA0[", layout["id"], "]"]
            })
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col space-y-1 py-1",
            children: layout.events.filter(function (value, index, array) {
              return array.indexOf(value) === index;
            }) // remove any possible duplicates
            .map(function (event) {
              var eventString = "".concat(layout["component"], "[").concat(layout["id"], "].").concat(event);
              var selected = isSelectedEvent(eventString);
              return /*#__PURE__*/jsxs("div", {
                onClick: function onClick() {
                  return selected === true ? handleRemoveEvent(eventString) : handleSelectEvent(eventString);
                },
                className: "flex flex-row ".concat(selected === false && "hover:bg-gray-800", " rounded cursor-pointer p-2 font-bold items-center space-x-2 ").concat(selected === true ? "bg-blue-800" : "", " "),
                children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
                  icon: "square-check",
                  className: "".concat(selected === true ? "text-blue-500" : "text-gray-700", " text-xl")
                }), /*#__PURE__*/jsx("div", {
                  className: "flex flex-col",
                  children: /*#__PURE__*/jsx("span", {
                    className: "text-base hover:text-gray-300 ".concat(selected === true ? "text-gray-300" : "text-gray-400"),
                    children: event
                  })
                })]
              });
            })
          })]
        });
      });
    }
  }
  function renderAvailableHandlers() {
    if (workspaceSelected !== null) {
      return workspaceSelected.layout.filter(function (li) {
        return li["id"] === itemSelected["id"];
      }).map(function (layout) {
        return /*#__PURE__*/jsxs("div", {
          className: "flex flex-col text-base font-bold text-gray-400 p-2",
          children: [/*#__PURE__*/jsx("div", {
            className: "flex flex-row border-b border-indigo-800 p-2 space-x-2 justify-between mb-4",
            children: /*#__PURE__*/jsxs("span", {
              className: "text-lg",
              children: [layout["component"], "\xA0[", layout["id"], "]"]
            })
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-col space-y-1 py-1",
            children: layout.eventHandlers.filter(function (value, index, array) {
              return array.indexOf(value) === index;
            }) // remove any possible duplicates
            .map(function (handler) {
              var selected = eventHandlerSelected !== null ? eventHandlerSelected === handler : false; //isHandlerSelected(handler);
              return /*#__PURE__*/jsx("div", {
                onClick: function onClick() {
                  return selected ? handleRemoveEventHandler() : handleSelectEventHandler(handler);
                },
                className: "flex flex-row ".concat(selected === false && "hover:bg-gray-800", " rounded cursor-pointer p-2 font-bold items-center space-x-2 ").concat(selected === true && "bg-indigo-700"),
                children: /*#__PURE__*/jsx("div", {
                  className: "flex flex-col px-2",
                  children: /*#__PURE__*/jsx("span", {
                    className: "text-base hover:text-gray-300 ".concat(selected === true ? "text-gray-300" : "text-gray-400"),
                    children: handler
                  })
                })
              });
            })
          })]
        });
      });
    }
  }
  return itemSelected !== null && /*#__PURE__*/jsx(Modal, {
    isOpen: open,
    setIsOpen: setIsOpen,
    width: "w-5/6 2xl:w-3/4",
    height: "h-5/6",
    children: /*#__PURE__*/jsx(Panel, {
      children: /*#__PURE__*/jsx("div", {
        className: "flex flex-col w-full h-full  overflow-hidden bg-blue-800",
        children: /*#__PURE__*/jsxs("div", {
          className: "flex flex-col w-full h-full overflow-hidden",
          children: [/*#__PURE__*/jsxs("div", {
            className: "flex flex-row w-full h-full space-x-4 overflow-hidden p-6",
            children: [/*#__PURE__*/jsx("div", {
              className: "flex flex-col flex-shrink h-full rounded font-medium text-gray-400 w-1/3",
              children: itemSelected !== null && /*#__PURE__*/jsxs("div", {
                className: "flex flex-col border border-blue-800 rounded p-4 py-10 space-y-4",
                children: [/*#__PURE__*/jsx("p", {
                  className: "text-5xl font-bold text-gray-200",
                  children: "Listen Up."
                }), /*#__PURE__*/jsx("p", {
                  className: "text-xl font-normal text-gray-300",
                  children: "Widgets and Workspaces can talk, but we have to setup the phone wires."
                }), /*#__PURE__*/jsx("p", {
                  className: "text-xl font-normal text-gray-300",
                  children: "Select the method to handle the message first, then select the message it will handle."
                })]
              })
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col bg-gray-900 h-full rounded w-1/3",
              children: [/*#__PURE__*/jsxs("span", {
                className: "uppercase text-xs text-gray-400 font-bold p-2 bg-gray-800 rounded-t px-4",
                children: ["Available Handlers", " "]
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col h-full overflow-y-scroll p-4",
                children: renderAvailableHandlers()
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: "flex flex-col bg-gray-900 h-full rounded w-1/3",
              children: [/*#__PURE__*/jsxs("span", {
                className: "uppercase text-xs text-gray-400 font-bold p-2 bg-gray-800 rounded-t px-4",
                children: ["Available Events", " "]
              }), /*#__PURE__*/jsx("div", {
                className: "flex flex-col h-full overflow-y-scroll p-4",
                children: eventHandlerSelected && renderAvailableEvents()
              })]
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "flex flex-row justify-end bg-gray-900 p-4 rounded-br rounded-bl border-t border-gray-800",
            children: /*#__PURE__*/jsxs("div", {
              className: "flex flex-row space-x-2",
              children: [/*#__PURE__*/jsx(Button, {
                title: "Cancel",
                bgColor: "bg-gray-800",
                textSize: "text-lg",
                padding: "py-2 px-4",
                onClick: function onClick() {
                  return setIsOpen(false);
                }
              }), /*#__PURE__*/jsx(Button, {
                title: "Save Changes",
                bgColor: "bg-gray-800",
                hoverBackgroundColor: "hover:bg-green-700",
                textSize: "text-lg",
                padding: "py-2 px-4",
                onClick: handleSaveChanges
              })]
            })
          })]
        })
      })
    })
  });
};

function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var WidgetConfigPanel = function WidgetConfigPanel(_ref) {
  var _ref$onSave = _ref.onSave,
    onSave = _ref$onSave === void 0 ? null : _ref$onSave,
    onChange = _ref.onChange,
    _ref$item = _ref.item,
    item = _ref$item === void 0 ? null : _ref$item,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var _useState = useState(item),
    _useState2 = _slicedToArray$5(_useState, 2),
    itemSelected = _useState2[0],
    setItemSelected = _useState2[1];
  useEffect(function () {
    if (item !== itemSelected) {
      setItemSelected(function () {
        return item;
      });
    }
  }, [item]);
  function handleSaveChanges() {
    // setItemSelected(null);
    console.log("SAVE ", itemSelected);
    onSave && onSave(itemSelected);
    // setItemSelected(null);
  }

  function generateFractions() {
    var numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var denominators = [2, 3, 4, 5, 6, 12];
    var fractions = [];
    return numerators.map(function (v) {
      return denominators.map(function (vv) {
        var fraction = v / vv;
        if (v % vv > 0 && v < vv && fractions.indexOf(fraction) < 0) {
          fractions.push(fraction);
          return /*#__PURE__*/jsxs("option", {
            value: "w-".concat(v, "/").concat(vv, " min-w-").concat(v, "/").concat(vv),
            children: [v, "/", vv]
          }, "".concat(v, "-").concat(vv));
        } else {
          return null;
        }
      }).filter(function (p) {
        return p !== null;
      });
    });
  }
  function handleUpdate(e) {
    try {
      var newItem = JSON.parse(JSON.stringify(itemSelected));
      var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;
      newItem[name] = value;
      if (value === "false") newItem[name] = false;
      if (value === "true") newItem[name] = true;
      console.log("new item ", newItem);
      setItemSelected(function () {
        return newItem;
      });
      onChange(e, newItem);
    } catch (e) {
      console.log(e);
    }
  }
  function handleTextChangeCustom(e, config) {
    var newItem = JSON.parse(JSON.stringify(itemSelected));
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
        var userConfig = itemSelected["userConfig"];
        return Object.keys(userConfig).map(function (key) {
          // depending on the type...
          var configItem = userConfig[key];
          var instructions = configItem.instructions,
            displayName = configItem.displayName,
            required = configItem.required;
            configItem.type;

          // get the user prefs for the key
          var userPrefs = itemSelected.userPrefs;
          return renderFormItem(displayName, key, instructions, required, userPrefs[key], handleTextChangeCustom, configItem);
        });
      }
    }
    return null;
  }
  function renderFormItem(displayName, key, instructions, required, value, _onChange, configItem) {
    return /*#__PURE__*/jsxs("div", {
      className: "rounded flex flex-col p-2 space-y-1",
      children: [/*#__PURE__*/jsxs("span", {
        className: "uppercase text-gray-300 font-bold text-sm",
        children: [displayName, " ", required === true && /*#__PURE__*/jsx("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), /*#__PURE__*/jsx("div", {
        className: "text-xs text-gray-400 pb-2",
        children: instructions
      }), configItem["type"] === "text" && /*#__PURE__*/jsx(InputText, {
        type: "text",
        name: key,
        value: value,
        onChange: function onChange(e) {
          return _onChange(e, configItem);
        },
        textSize: "text-base"
      }), configItem["type"] === "secret" && /*#__PURE__*/jsx(InputText, {
        type: "password",
        name: key,
        value: value,
        onChange: function onChange(e) {
          return _onChange(e, configItem);
        },
        textSize: "text-base"
      }), configItem["type"] === "select" && /*#__PURE__*/jsx(SelectMenu, {
        name: key,
        selectedValue: value,
        onChange: function onChange(e) {
          return _onChange(e, configItem);
        },
        textSize: "text-base",
        children: "options" in configItem && configItem.options.map(function (option) {
          return /*#__PURE__*/jsx("option", {
            value: option.value,
            children: option.displayName
          });
        })
      })]
    }, "config-item-".concat(key));
  }
  return itemSelected && /*#__PURE__*/jsxs("div", {
    className: "flex flex-col w-full bg-gray-900 p-4 text-2xl rounded text-gray-400 h-full",
    children: [/*#__PURE__*/jsx("div", {
      className: "flex flex-col w-full h-full overflow-hidden",
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col space-y-2 w-full overflow-y-scroll",
        children: [renderCustomSettings(), /*#__PURE__*/jsxs("div", {
          className: "rounded flex flex-col p-2",
          children: [/*#__PURE__*/jsxs("span", {
            className: "uppercase text-gray-300 font-bold text-sm",
            children: ["Width", " ", /*#__PURE__*/jsx("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "text-xs text-gray-400 pb-2",
            children: "The width of your Widget in the Layout."
          }), /*#__PURE__*/jsxs(SelectMenu, {
            name: "width",
            onChange: handleUpdate,
            selectedValue: itemSelected.width,
            textSize: "text-base",
            children: [/*#__PURE__*/jsx("option", {
              value: "w-full",
              children: "Full"
            }, "width-full"), generateFractions()]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "rounded flex flex-col p-2",
          children: [/*#__PURE__*/jsxs("span", {
            className: "uppercase text-gray-300 font-bold text-sm",
            children: ["Height", " ", /*#__PURE__*/jsx("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "text-xs text-gray-400 pb-2",
            children: "The height of your Widget in the Layout."
          }), /*#__PURE__*/jsxs(SelectMenu, {
            name: "height",
            onChange: handleUpdate,
            selectedValue: itemSelected.height,
            textSize: "text-base",
            children: [/*#__PURE__*/jsx("option", {
              value: "h-full",
              children: "Maximize Height"
            }, "height-full"), /*#__PURE__*/jsx("option", {
              value: "h-fit",
              children: "Fit Content"
            }, "height-fit")]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "rounded flex flex-col p-2",
          children: [/*#__PURE__*/jsxs("span", {
            className: "uppercase text-gray-300 font-bold text-sm",
            children: ["Scrolling", " ", /*#__PURE__*/jsx("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "text-xs text-gray-400 pb-2",
            children: "If this widget allows vertical scrolling."
          }), /*#__PURE__*/jsxs(SelectMenu, {
            name: "scrollable",
            onChange: handleUpdate,
            selectedValue: itemSelected.scrollable,
            textSize: "text-base",
            children: [/*#__PURE__*/jsx("option", {
              value: true,
              children: "Scrollable"
            }, "scrollable-yes"), /*#__PURE__*/jsx("option", {
              value: false,
              children: "Fixed (No Scrolling)"
            }, "scrollable-no")]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: "rounded flex flex-col p-2",
          children: [/*#__PURE__*/jsxs("span", {
            className: "uppercase text-gray-300 font-bold text-sm",
            children: ["Direction", " ", /*#__PURE__*/jsx("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "text-xs text-gray-400 pb-2",
            children: "The layout direction for the widget content."
          }), /*#__PURE__*/jsxs(SelectMenu, {
            name: "direction",
            onChange: handleUpdate,
            selectedValue: itemSelected && itemSelected.direction,
            textSize: "text-base",
            children: [/*#__PURE__*/jsx("option", {
              value: "col",
              children: "Vertical"
            }, "direction-col"), /*#__PURE__*/jsx("option", {
              value: "row",
              children: "Horizontal"
            }, "direction-row")]
          })]
        }), /*#__PURE__*/jsx("div", {
          className: "text-xs p-4 break-all",
          children: /*#__PURE__*/jsx("pre", {
            children: JSON.stringify(itemSelected, null, 2)
          })
        })]
      })
    }), onSave !== null && /*#__PURE__*/jsx("div", {
      className: "flex flex-row w-full",
      children: /*#__PURE__*/jsx(Button, {
        title: "Save Changes",
        onClick: handleSaveChanges,
        block: true,
        disabled: disabled
      })
    })]
  });
};

function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderConfigContainerMenuItem = function LayoutBuilderConfigContainerMenuItem(_ref) {
  var id = _ref.id,
    component = _ref.component,
    onClick = _ref.onClick,
    onMouseOver = _ref.onMouseOver,
    item = _ref.item,
    children = _ref.children;
  useEffect(function () {
    // const color = getContainerColor(item['parentWorkspace']);
  }, [item]);
  var _useState = useState(false),
    _useState2 = _slicedToArray$4(_useState, 2),
    isMouseOver = _useState2[0],
    setIsMouseOver = _useState2[1];
  function handleMouseOver(e) {
    setIsMouseOver(true);
    onMouseOver(e);
  }
  function handleMouseOut(e) {
    setIsMouseOver(false);
  }
  function handleClick(e) {
    onClick(item);
  }
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col border-dashed border border-indigo-800 rounded p-2 space-y-2",
    children: [/*#__PURE__*/jsxs("div", {
      className: "flex flex-row p-2 space-x-2 cursor-pointer ".concat(isMouseOver === true ? "bg-indigo-600" : "", " rounded"),
      onClick: handleClick,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      children: [/*#__PURE__*/jsx(Tag, {
        text: "".concat(id),
        textSize: "text-xs",
        color: getContainerColor(item)
      }), /*#__PURE__*/jsx("span", {
        className: "text-sm font-medium text-gray-200",
        children: component
      })]
    }), children]
  });
};

function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var LayoutBuilderConfigMenuItem = function LayoutBuilderConfigMenuItem(_ref) {
  var id = _ref.id,
    component = _ref.component,
    onClick = _ref.onClick,
    onMouseOver = _ref.onMouseOver,
    item = _ref.item;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    isMouseOver = _useState2[0],
    setIsMouseOver = _useState2[1];
  function handleMouseOver(e) {
    setIsMouseOver(true);
    onMouseOver(e);
  }
  function handleMouseOut(e) {
    setIsMouseOver(false);
  }
  function handleClick(e) {
    onClick(item);
  }
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full border border-gray-900 space-x-2 p-2 cursor-pointer justify-between items-center ".concat(isMouseOver === true ? "bg-green-600" : "", " rounded"),
    onClick: handleClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    children: /*#__PURE__*/jsxs("div", {
      className: "flex flex-row space-x-2",
      children: [/*#__PURE__*/jsx(Tag, {
        textSize: "text-xs",
        text: "".concat(id),
        color: getContainerColor(item["parentWorkspace"])
      }), /*#__PURE__*/jsx("span", {
        className: "text-sm font-medium ".concat(isMouseOver === true ? "text-gray-200" : "text-gray-200"),
        children: component
      })]
    })
  });
};

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var sampleLayout = [{
  id: 1,
  order: 1,
  direction: "row",
  width: "w-full",
  component: "Container",
  hasChildren: 1,
  scrollable: true,
  parent: 0
}];
var LayoutBuilder = function LayoutBuilder(_ref) {
  var workspace = _ref.workspace,
    _ref$preview = _ref.preview,
    preview = _ref$preview === void 0 ? false : _ref$preview,
    onTogglePreview = _ref.onTogglePreview,
    _ref$onWorkspaceChang = _ref.onWorkspaceChange,
    onWorkspaceChange = _ref$onWorkspaceChang === void 0 ? null : _ref$onWorkspaceChang,
    dashboardId = _ref.dashboardId;
  var _useContext = useContext$1(AppContext),
    debugMode = _useContext.debugMode;
  var _useState = useState(false),
    _useState2 = _slicedToArray$2(_useState, 2);
    _useState2[0];
    var setIsConfigOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$2(_useState3, 2),
    isWidgetModalOpen = _useState4[0],
    setIsWidgetModalOpen = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$2(_useState5, 2),
    isAddWidgetModalOpen = _useState6[0],
    setIsAddWidgetModalOpen = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$2(_useState7, 2),
    isEventModalOpen = _useState8[0],
    setIsEventModalOpen = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray$2(_useState9, 2),
    isConfigModalOpen = _useState10[0],
    setIsConfigModalOpen = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray$2(_useState11, 2),
    itemSelected = _useState12[0],
    setItemSelected = _useState12[1];
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$2(_React$useState, 2),
    updateState = _React$useState2[1];
  var forceUpdate = React.useCallback(function () {
    return updateState({});
  }, []);
  var _useState13 = useState(workspace),
    _useState14 = _slicedToArray$2(_useState13, 2),
    currentWorkspace = _useState14[0],
    setCurrentWorkspace = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray$2(_useState15, 2);
    _useState16[0];
    var setSelectedItem = _useState16[1];
  useEffect(function () {
    // IMPORTANT DO NOT REMOVE!!!!
    // We have to check the diff in the layout and set
    // We also have to "reset" the layout upon a new layout...

    if (currentWorkspace["layout"] !== workspace["layout"] && workspace !== null && currentWorkspace["layout"] !== sampleLayout) {
      setCurrentWorkspace(workspace);
    }
    if (currentWorkspace["layout"] === null) {
      setCurrentWorkspace({
        name: "Workspace " + Date.now(),
        layout: sampleLayout
      });
    }
  }, [workspace]);

  /**
   * onClickAdd
   * From the Widget or Container, clicked plus button to add a widget
   */
  function onClickAdd(item) {
    setItemSelected(item);
    setIsAddWidgetModalOpen(true);
    forceUpdate();
  }
  function handleClickConfirmAdd(itemChosen, toItem) {
    var layout = currentWorkspace["layout"];
    var hasChildren = itemChosen["type"] === "workspace";
    var newLayout = addItemToItemLayout(layout, toItem["id"], itemChosen, hasChildren);
    var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
    newWorkspace["layout"] = newLayout;
    setCurrentWorkspace(newWorkspace);
    setIsAddWidgetModalOpen(false);
    forceUpdate();
  }
  function handleSaveNewWorkspace(newWorkspace) {
    console.log("builder save workspace ", newWorkspace);
    setCurrentWorkspace(function () {
      return newWorkspace;
    });
    setIsConfigModalOpen(false);
    onWorkspaceChange(newWorkspace);
    //forceUpdate();
  }

  function onClickRemove(id) {
    var layout = currentWorkspace["layout"];
    var newLayout = removeItemFromLayout(layout, id);
    var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
    newWorkspace["layout"] = newLayout;
    setCurrentWorkspace(newWorkspace);
    forceUpdate();
  }
  function onDropItem(item) {
    try {
      var sourceIndex = item.sourceIndex,
        dropIndex = item.dropIndex;
      // we have to find the item
      // then we have to set the parent id to a different id
      var layout = currentWorkspace["layout"];
      var newLayout = updateParentForItem(layout, sourceIndex, dropIndex);
      var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
      newWorkspace["layout"] = newLayout;
      setCurrentWorkspace(function () {
        return newWorkspace;
      });
      forceUpdate();
    } catch (e) {
      console.log(e);
    }
  }
  function onClickShrink(id, currentWidth) {
    console.log("shrink ", id, currentWidth);
  }
  function onClickExpand(id, currentWidth) {
    console.log("expand ", id, currentWidth);
  }
  function onChangeDirection(id, currentDirection) {
    var layout = currentWorkspace["layout"];
    var newLayout = changeDirectionForLayoutItem(layout, id);
    var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
    newWorkspace["layout"] = newLayout;
    setCurrentWorkspace(newWorkspace);
    forceUpdate();
  }
  function onChangeOrder(item, direction) {
    console.log("changing order ", item["order"], direction);
    var currentOrder = parseInt(item["order"], 10);
    var layout = currentWorkspace["layout"];
    var nextItem = null;
    var layoutFiltered = {};
    Object.keys(layout).filter(function (li) {
      return layout[li]["parent"] === item["parent"];
    }).forEach(function (fli) {
      layoutFiltered[fli] = layout[fli];
    });

    // Add 1 to the selected item's order, and then loop and find the new order value item and increase
    if (direction === "up") {
      // increase current item by 1 (1,2 3 ...2 moves "down" to 1 and 1 to 2)
      // increase the existing item with this new order (check) by 1
      nextItem = getNextHighestItemInLayout(layoutFiltered, currentOrder);
      console.log("next highest item ", nextItem);
      // item['order'] = nextItem['order'];
      // nextItem['order'] = currentOrder;
    }

    if (direction === "down") {
      // decrease current item by 1 (1,2 3 ...2 moves "down" to 1 and 1 to 2)
      // decrease the existing item with this new order (check) by 1
      nextItem = getNextLowestItemInLayout(layoutFiltered, currentOrder);
      // item['order'] = nextItem['order'];
      // nextItem['order'] = currentOrder;
      console.log("next lowest item ", nextItem);
    }

    // we have to loop through and set the new items...

    // // const newLayout = changeDirectionForLayoutItem(layout, id, currentDirection);
    var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
    if (nextItem) {
      Object.keys(currentWorkspace.layout).forEach(function (li) {
        if (currentWorkspace.layout[li]["id"] === nextItem["id"]) {
          console.log("setting to current", currentWorkspace.layout[li]["id"]);
          newWorkspace.layout[li]["order"] = currentOrder;
        }
        if (newWorkspace.layout[li]["id"] === item["id"]) {
          console.log("setting to next", currentWorkspace.layout[li]["id"]);
          newWorkspace.layout[li]["order"] = nextItem["order"];
        }
      });
    }

    // // newWorkspace['layout'] = newLayout;
    setCurrentWorkspace(function () {
      return newWorkspace;
    });
    forceUpdate();
  }
  function handleSaveConfiguration(data) {
    console.log("SAVING CONFIG ", data);
    var newWorkspace = saveItemToWorkspace(data);
    setCurrentWorkspace(newWorkspace);
    setIsConfigOpen(false);
    setIsWidgetModalOpen(false);
    setSelectedItem(null);
    forceUpdate();
    // onTogglePreview();
  }

  function handleSaveWidgetChanges(data) {
    console.log("LayoutBuilder SAVE WIDGET CHANGES ", data);
    var newWorkspace = saveItemToWorkspace(data);
    console.log("NEW WORKSPACE ", newWorkspace);
    setCurrentWorkspace(function () {
      return newWorkspace;
    });
    setItemSelected(function () {
      return null;
    });
    setIsConfigOpen(false);
    setIsWidgetModalOpen(false);

    // forceUpdate();
    // onTogglePreview();
  }

  function saveItemToWorkspace(data) {
    var layout = JSON.parse(JSON.stringify(currentWorkspace["layout"]));
    var newLayout = updateLayoutItem(layout, data);
    var newWorkspace = JSON.parse(JSON.stringify(currentWorkspace));
    newWorkspace["layout"] = newLayout;
    return newWorkspace;
  }
  function handleClickEditItem(newItem) {
    console.log("edit item ", newItem);
    delete newItem["api"];
    delete newItem["componentData"];
    setItemSelected(function () {
      return newItem;
    });
    // setIsWidgetModalOpen(() => true);
    setIsConfigModalOpen(function () {
      return true;
    });
    forceUpdate();
  }
  function handleClickEvents(d) {
    console.log(d);
    setItemSelected(function () {
      return d;
    });
    // setIsEventModalOpen(() => true);
    setIsConfigModalOpen(true);
  }
  return /*#__PURE__*/jsxs("div", {
    className: "flex flex-col w-full h-full overflow-hidden p-2",
    children: [/*#__PURE__*/jsx("div", {
      className: "flex flex-row w-full h-full overflow-hidden p-2 space-x-2",
      children: /*#__PURE__*/jsx(LayoutContainer, {
        id: "search-layout-builder",
        scrollable: true,
        direction: "col",
        width: "w-full",
        height: "h-full",
        className: "overflow-x-hidden",
        children: /*#__PURE__*/jsx(LayoutDragBuilder, {
          dashboardId: dashboardId,
          isDraggable: true,
          workspace: currentWorkspace,
          header: currentWorkspace["name"],
          layout: currentWorkspace["layout"],
          parentKey: 0,
          debugMode: debugMode,
          previewMode: preview,
          onClickAdd: onClickAdd,
          onClickRemove: onClickRemove,
          onClickShrink: onClickShrink,
          onClickExpand: onClickExpand,
          onChangeDirection: onChangeDirection,
          onChangeOrder: onChangeOrder,
          onDropItem: onDropItem,
          onOpenConfig: handleClickEditItem //{handleClickConfigure}
          ,
          onOpenEvents: handleClickEvents,
          onSaveConfiguration: handleSaveConfiguration,
          onClickEdit: onTogglePreview
        })
      })
    }), itemSelected !== null && /*#__PURE__*/jsx(LayoutBuilderEditItemModal, {
      open: isWidgetModalOpen,
      setIsOpen: setIsWidgetModalOpen,
      item: itemSelected,
      onUpdate: handleSaveWidgetChanges,
      workspace: currentWorkspace
    }), itemSelected !== null && /*#__PURE__*/jsx(LayoutBuilderAddItemModal, {
      open: isAddWidgetModalOpen,
      setIsOpen: setIsAddWidgetModalOpen,
      item: isAddWidgetModalOpen === true ? itemSelected : null,
      onSaveItem: handleClickConfirmAdd,
      workspace: isAddWidgetModalOpen === true ? currentWorkspace : null
    }), itemSelected !== null && /*#__PURE__*/jsx(LayoutBuilderEventModal, {
      open: isEventModalOpen,
      setIsOpen: setIsEventModalOpen,
      item: isEventModalOpen === true ? itemSelected : null,
      onSave: handleSaveNewWorkspace,
      workspace: isEventModalOpen === true ? currentWorkspace : null
    }), itemSelected !== null && /*#__PURE__*/jsx(LayoutBuilderConfigModal, {
      open: isConfigModalOpen,
      setIsOpen: setIsConfigModalOpen,
      item: isConfigModalOpen === true ? itemSelected : null,
      onSaveWorkspace: handleSaveNewWorkspace
      // onSaveWidgetChanges={handleSaveWidgetChanges}
      ,
      workspace: isConfigModalOpen === true ? currentWorkspace : null
    })]
  });
};

var LayoutDragBuilder = function LayoutDragBuilder(_ref) {
  var layout = _ref.layout,
    dashboardId = _ref.dashboardId,
    parentKey = _ref.parentKey,
    debugMode = _ref.debugMode,
    previewMode = _ref.previewMode,
    onClickAdd = _ref.onClickAdd,
    onDropItem = _ref.onDropItem,
    onClickRemove = _ref.onClickRemove,
    onClickShrink = _ref.onClickShrink,
    onClickExpand = _ref.onClickExpand,
    onChangeDirection = _ref.onChangeDirection,
    onChangeOrder = _ref.onChangeOrder,
    onOpenConfig = _ref.onOpenConfig,
    onOpenEvents = _ref.onOpenEvents,
    onSaveConfiguration = _ref.onSaveConfiguration,
    workspace = _ref.workspace,
    _ref$isDraggable = _ref.isDraggable,
    isDraggable = _ref$isDraggable === void 0 ? true : _ref$isDraggable;
  return isDraggable === true ? /*#__PURE__*/jsx(DndProvider, {
    backend: HTML5Backend,
    children: renderLayout({
      dashboardId: dashboardId,
      layout: layout,
      parentKey: parentKey,
      debugMode: debugMode,
      previewMode: previewMode,
      onClickAdd: onClickAdd,
      onClickRemove: onClickRemove,
      onClickShrink: onClickShrink,
      onClickExpand: onClickExpand,
      onChangeDirection: onChangeDirection,
      onChangeOrder: onChangeOrder,
      onOpenConfig: onOpenConfig,
      onOpenEvents: onOpenEvents,
      onSaveConfiguration: onSaveConfiguration,
      onDropItem: onDropItem,
      workspace: workspace
    })
  }) : renderLayout({
    dashboardId: dashboardId,
    layout: layout,
    parentKey: parentKey,
    debugMode: debugMode,
    previewMode: previewMode,
    onClickAdd: onClickAdd,
    onClickRemove: onClickRemove,
    onClickShrink: onClickShrink,
    onClickExpand: onClickExpand,
    onChangeDirection: onChangeDirection,
    onChangeOrder: onChangeOrder,
    onOpenConfig: onOpenConfig,
    onOpenEvents: onOpenEvents,
    onSaveConfiguration: onSaveConfiguration,
    onDropItem: onDropItem,
    workspace: workspace
  });
};

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function DragComponent(_ref) {
  var obj = _ref.obj,
    id = _ref.id,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "layout-widget" : _ref$type,
    _ref$parent = _ref.parent,
    parent = _ref$parent === void 0 ? 0 : _ref$parent,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    children = _ref.children,
    onDropItem = _ref.onDropItem;
    _ref.onDragItem;
  var _useDrag = useDrag(function () {
      return {
        type: type,
        item: {
          id: id,
          type: type,
          parent: parent,
          obj: obj
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging(),
            sourceIndex: monitor.sourceIndex
          };
        },
        hover: function hover(item, monitor) {},
        monitor: function monitor() {
          return {
            isDragging: collected.isDragging
          };
        },
        end: function end(item, monitor) {
          var dropResult = monitor.getDropResult();
          if (item && dropResult) {
            // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
            // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
            // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
            onDropItem({
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
    className: " h-full flex flex-col min-h-fit w-full",
    children: children
  }) : /*#__PURE__*/jsx("div", {
    ref: drag,
    id: collected.id,
    type: collected.type,
    className: "scale-100 flex flex-col ".concat(width, " min-w-xl rounded min-h-fit"),
    style: {
      animationDelay: "-.75s",
      animationDuration: ".25s"
    },
    children: children
  });
}

var LayoutBuilderGridItem = function LayoutBuilderGridItem(_ref) {
  var item = _ref.item,
    workspace = _ref.workspace,
    id = _ref.id,
    parent = _ref.parent,
    order = _ref.order,
    scrollable = _ref.scrollable,
    _ref$component = _ref.component,
    component = _ref$component === void 0 ? null : _ref$component,
    preview = _ref.preview,
    children = _ref.children,
    onClickRemove = _ref.onClickRemove,
    onChangeDirection = _ref.onChangeDirection,
    onChangeOrder = _ref.onChangeOrder,
    onOpenConfig = _ref.onOpenConfig,
    onOpenEvents = _ref.onOpenEvents,
    onDropItem = _ref.onDropItem,
    width = _ref.width,
    direction = _ref.direction,
    isDraggable = _ref.isDraggable;
  function handleClickRemove(e) {
    console.log("clicked remove ", e);
    onClickRemove(id);
  }
  function handleChangeDirection() {
    onChangeDirection(id, direction);
  }
  function handleChangeOrder(direction) {
    console.log("changing order ", order);
    onChangeOrder(item, direction);
  }
  function handleOpenConfig() {
    onOpenConfig(item);
  }
  function renderArrows() {
    return preview === false && /*#__PURE__*/jsx("div", {
      className: "flex ".concat(direction),
      children: /*#__PURE__*/jsx("div", {
        className: "flex ".concat(direction, " w-full h-fit min-h-full text-base lg:text-lg cursor-pointer text-gray-200 pb-2"),
        onClick: handleOpenConfig,
        children: component
      })
    });
  }
  function renderUserPreferences() {
    try {
      return preview === false && /*#__PURE__*/jsx("div", {
        className: "flex flex-col h-24",
        children: /*#__PURE__*/jsx("div", {
          className: "flex flex-col w-full text-xs text-gray-200 justify-start",
          onClick: handleOpenConfig,
          children: Object.keys(item["userPrefs"]).map(function (userPref) {
            return /*#__PURE__*/jsx("span", {
              className: "font-normal",
              children: "".concat(userPref, ":").concat(item["userPrefs"][userPref])
            }, "user-pref-".concat(userPref));
          })
        })
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  function renderComponentData() {
    return component ? renderComponent(component, id, item, null) : null;
  }
  function handleDropItem(item) {
    // we have to shuffle the parent of the source item to the drop item
    if (onDropItem) {
      onDropItem(item);
    }
  }
  function handleClickEvents() {
    onOpenEvents(item);
  }
  function dragType(item) {
    if (item["type"] === "workspace" && item["component"] !== "Container") {
      return item["parentWorkspaceName"];
    }
    if (item["component"] === "Container") {
      return "layout";
    }
    return item["parentWorkspaceName"];
  }

  // function numChildrenForLayout() {
  //     let num = 0;
  //     if ('parentWorkspace' in item) {
  //         if ('layout' in item['parentWorkspace']) {
  //             num = Object.keys(item['parentWorkspace']['layout']).length;
  //         }
  //     }
  //     return num;
  // }

  function renderEditView() {
    var drag = dragType(item);
    var numChildren = numChildrenForLayout(item, workspace["layout"]);

    // determine the parent layout direction...
    var parentLayout = getLayoutItemById(workspace["layout"], item["parent"]);
    var parentDirection = parentLayout ? parentLayout["direction"] : item["parentWorkspace"]["direction"];

    // determine if the item is at the "start/end" of the col/row
    var isMaxOrder = isMaxOrderForItem(workspace["layout"], item, item["parent"]);
    var isMinOrder = isMinOrderForItem(workspace["layout"], item, item["parent"]);
    console.log("children ", numChildren);
    return isDraggable === true ? /*#__PURE__*/jsx(DragComponent, {
      obj: item,
      id: id,
      type: drag,
      parent: parent,
      onDropItem: handleDropItem,
      width: width,
      children: /*#__PURE__*/jsxs("div", {
        className: "flex flex-col border-4 ".concat(getContainerBorderColor(item["parentWorkspace"]), " rounded text-xs font-bold text-gray-200 z-0 min-h-64 p-2 overflow-hidden ").concat(getContainerColor(item["parentWorkspace"])),
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex flex-col ".concat(scrollable, " ").concat(preview === false && "text-blue-900 rounded m-2", " "),
          onClick: handleOpenConfig,
          children: [preview === false && renderArrows(), preview === false && renderUserPreferences()]
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-1 justify-between text-xs w-full",
          children: [item && "workspace" in item && /*#__PURE__*/jsx(Tag, {
            text: "".concat(drag),
            textSize: "text-xs",
            backgroundColor: "bg-transparent"
          }), /*#__PURE__*/jsxs("div", {
            className: "flex flex-row space-x-1",
            children: [item.eventHandlers.length > 0 && /*#__PURE__*/jsx(ButtonIcon, {
              icon: "phone",
              onClick: handleClickEvents,
              backgroundColor: getContainerColor(item["parentWorkspace"]),
              hoverBackgroundColor: "",
              text: item.eventHandlers.length > 0 ? item.eventHandlers.length : "",
              textSize: "text-xs"
            }), order > 1 && numChildren > 1 && isMinOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
              theme: false,
              icon: "".concat(parentDirection === "col" ? "arrow-left" : "arrow-up"),
              onClick: function onClick() {
                return handleChangeOrder("down");
              },
              backgroundColor: "bg-transparent",
              hoverBackgroundColor: "hover:bg-blue-700"
            }), order > 1 && numChildren > 1 && isMaxOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
              theme: false,
              icon: "".concat(parentDirection === "col" ? "arrow-right" : "arrow-down"),
              onClick: function onClick() {
                return handleChangeOrder("up");
              },
              backgroundColor: "bg-transparent",
              hoverBackgroundColor: "hover:bg-blue-700"
            }), /*#__PURE__*/jsx(ButtonIcon, {
              theme: false,
              icon: "trash",
              onClick: handleClickRemove,
              backgroundColor: getContainerColor(item["parentWorkspace"]),
              hoverBackgroundColor: "hover:bg-red-900"
            })]
          })]
        })]
      })
    }) : /*#__PURE__*/jsxs("div", {
      className: "flex flex-col border-4 rounded text-xs font-bold text-gray-200 overflow-hidden grow z-0 min-h-64 h-24",
      children: [/*#__PURE__*/jsx("div", {
        className: "flex flex-row space-x-2 rounded-t justify-between w-full",
        children: /*#__PURE__*/jsxs("div", {
          className: "hidden xl:flex flex-row space-x-1 w-full justify-end p-2",
          children: [numChildren > 1 && /*#__PURE__*/jsx(ButtonIcon, {
            icon: "".concat(parentDirection === "col" ? "arrows-left-right" : "arrows-up-down"),
            onClick: handleChangeDirection,
            backgroundColor: "bg-transparent",
            hoverBackgroundColor: "hover:bg-blue-700"
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "cog",
            onClick: handleOpenConfig,
            backgroundColor: "bg-transparent",
            hoverBackgroundColor: "hover:bg-blue-700"
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "trash",
            onClick: handleClickRemove,
            backgroundColor: "bg-transparent",
            hoverBackgroundColor: "hover:bg-red-900"
          })]
        })
      }), /*#__PURE__*/jsx("div", {
        className: "flex ".concat(direction, " ").concat(scrollable, " text-lg ").concat(preview === false && "text-blue-900 rounded m-2"),
        children: preview === false && renderUserPreferences()
      }), /*#__PURE__*/jsxs("div", {
        className: "flex flex-row space-x-1 w-full justify-between text-xs",
        children: [item && "workspace" in item && /*#__PURE__*/jsx(Tag, {
          text: "".concat(dragType(item)),
          textSize: "text-xs"
        }), /*#__PURE__*/jsxs("div", {
          className: "flex flex-row space-x-1",
          children: [item.eventHandlers.length > 0 && /*#__PURE__*/jsx(ButtonIcon, {
            icon: "phone",
            onClick: handleClickEvents,
            bgColor: getContainerColor(item["parentWorkspace"]),
            hoverBackgroundColor: "hover:bg-gray-900",
            text: item.eventHandlers.length > 0 ? item.eventHandlers.length : "",
            textSize: "text-xs"
          }), /*#__PURE__*/jsx(ButtonIcon, {
            icon: "trash",
            onClick: handleClickRemove,
            backgroundColor: getContainerColor(item["parentWorkspace"]),
            hoverBackgroundColor: "hover:bg-red-900"
          }), order > 1 && numChildren > 1 && isMinOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
            icon: "".concat(parentDirection === "col" ? "arrow-left" : "arrow-up"),
            onClick: function onClick() {
              return handleChangeOrder("down");
            },
            backgroundColor: "bg-transparent",
            hoverBackgroundColor: "hover:bg-blue-700"
          }), order > 1 && numChildren > 1 && isMaxOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
            icon: "".concat(parentDirection === "col" ? "arrow-right" : "arrow-down"),
            onClick: function onClick() {
              return handleChangeOrder("up");
            },
            backgroundColor: "bg-transparent",
            hoverBackgroundColor: "hover:bg-blue-700"
          })]
        })]
      })]
    });
  }
  return children ? children : preview === false ? renderEditView() : renderComponentData();
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function DropComponent(_ref) {
  var item = _ref.item,
    id = _ref.id,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "layout-widget" : _ref$type,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
    _ref.onDropItem;
    var width = _ref.width;
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
        return obj.id !== 1 && item.canHaveChildren === true; // && obj.parent !== id; // cant drop in these places
      },

      // this will cause the elements that are droppable to be styles (if we choose!)
      collect: function collect(monitor) {
        return {
          // isOver: monitor.isOver(),
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
    className: "drop-component relative cursor-pointer rounded min-w-lg ".concat(width, " ").concat(isOverCurrent ? "opacity-50 border-2 border-yellow-500" : "opacity-100 border-2 border-none", " "),
    children: [children, canDrop === true && isOverCurrent === true && isOver === true && /*#__PURE__*/jsx("div", {
      className: "absolute inset-0 flex justify-center items-center z-10 bg-green-600 w-full h-full rounded opacity-100",
      children: /*#__PURE__*/jsx("p", {
        className: "text-2xl font-bold",
        children: "Drop Me"
      })
    })]
  });
}

var _excluded$7 = ["id", "uuid", "children", "height", "width", "scrollable", "direction", "className"];
function _objectWithoutProperties$7(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$7(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$7(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Widget = function Widget(_ref) {
  _ref.id;
    var uuid = _ref.uuid,
    children = _ref.children,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-full" : _ref$height,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$scrollable = _ref.scrollable,
    scrollable = _ref$scrollable === void 0 ? true : _ref$scrollable,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "col" : _ref$direction,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    props = _objectWithoutProperties$7(_ref, _excluded$7);
  var _useContext = useContext$1(AppContext),
    debugMode = _useContext.debugMode,
    debugStyles = _useContext.debugStyles,
    api = _useContext.api;
  var _useContext2 = useContext$1(DashboardContext),
    pub = _useContext2.pub,
    settings = _useContext2.settings;
  useEffect(function () {
    console.log("use effect in Widget ", api, debugMode, debugStyles);
  });
  function debugClasses() {
    // const styles = debugStyles['widget']['classes'];
    // return debugMode === true ? `space-y-4 p-4 ${styles}` : ''
    return "";
  }

  // inject the publisher into the api for the developer to use
  if ("api" in props) {
    if (props["api"] !== null) {
      props["api"].setPublisher(pub);
      props["api"].setElectronApi(api);
      props["api"].setSettings(settings);
    }
  }
  return /*#__PURE__*/jsxs(LayoutContainer, {
    id: "widget-container'-".concat(uuid),
    direction: direction,
    scrollable: scrollable,
    width: width,
    height: height,
    className: "".concat(debugClasses(), " ").concat(className),
    children: [debugMode === true && /*#__PURE__*/jsxs("span", {
      className: "text-white uppercase text-xs",
      children: ["WIDGET", " ", scrollable === true ? "scrollable" : "not scrollable"]
    }), children]
  });
};

function _typeof$d(obj) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$d(obj); }
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(arg) { var key = _toPrimitive$d(arg, "string"); return _typeof$d(key) === "symbol" ? key : String(key); }
function _toPrimitive$d(input, hint) { if (_typeof$d(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$d(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WidgetFactory = {
  getComponent: function getComponent(component) {
    try {
      return ComponentManager.getComponent(component);
    } catch (e) {
      return null;
    }
  },
  render: function render(component, key) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    try {
      var m = ComponentManager.componentMap();
      //console.log('factory ', m);
      if (component && m) {
        // grab the component from the map
        var WidgetComponent = component !== "Container" ? m[component]["component"] : Container;
        var config = ComponentManager.config(component, params);
        var styles = "styles" in config ? config["styles"] : null;

        // user input for the customization of the widget
        var userPrefs = params["userPrefs"];

        // Check to make sure this is a Component
        if (typeof WidgetComponent !== "function") return null;
        if (component !== "Container" && component !== "LayoutContainer") {
          params["width"] = "w-full";
        }
        if ("width" in params === false) {
          params["width"] = "w-full";
        }

        // params['height'] = 'h-full'

        var bgColor = "";
        if (styles !== null) {
          bgColor = "backgroundColor" in styles ? styles["backgroundColor"] : "";
        }
        return children === null ? /*#__PURE__*/jsx(WidgetComponent, _objectSpread$8(_objectSpread$8(_objectSpread$8({
          id: "widget-nokids-".concat(key)
        }, params), userPrefs), {}, {
          backgroundColor: bgColor
        }), "widget-nokids-".concat(key)) : /*#__PURE__*/jsx(WidgetComponent, _objectSpread$8(_objectSpread$8(_objectSpread$8({
          id: "widget-kids-".concat(key)
        }, params), userPrefs), {}, {
          backgroundColor: bgColor,
          children: WidgetFactory.renderChildren(children)
        }), "widget-kids-".concat(key));
      }
    } catch (e) {
      return null;
    }
  },
  renderChildren: function renderChildren(children) {
    return React.Children.map(children, function (el) {
      // const config = el.props.component !== undefined
      //     ? ComponentManager.config(el.props.component, {})
      //     : {};

      // delete(config['component']);

      var clonedComponent = /*#__PURE__*/React.cloneElement(el);
      return clonedComponent;
      // return el;
    });
  },

  /**
   * config
   * Get the developer's component configuration and enhance that configuration with
   * required fields if they are not present
   *
   * @param {object} component
   * @returns
   */
  config: function config(component) {
    if (component) {
      ComponentManager.isLayoutContainer(component);
      var requiredFields = {
        type: {
          value: "text"
        },
        required: {
          value: false
        },
        options: {
          value: []
        },
        defaultValue: {
          value: ""
        },
        events: [] // events that will be published
      };

      // get the component configuration from the map
      var components = ComponentManager.map();

      // let c = deepCopy(components['component']);
      var c = JSON.parse(JSON.stringify(components[component]));
      c["component"] = component;
      if ("userConfig" in c === false) {
        c["userConfig"] = {};
        return c;
      }
      var userPrefs = {};
      // now we can make sure the configuration is "complete"
      Object.keys(c["userConfig"]).forEach(function (key) {
        // check the required fields!
        Object.keys(requiredFields).forEach(function (k) {
          if (k in c["userConfig"][key] === false) {
            c["userConfig"][key][k] = requiredFields[k]["value"];
          }
        });
        // tack on the user preferences
        userPrefs[key] = WidgetFactory.userPrefsForItem(c, key, c["userConfig"][key]);
      });
      c["userPrefs"] = userPrefs;
      return c;
    }
    return null;
  },
  workspace: function workspace(component) {
    var components = WidgetFactory.map();
    if (component !== undefined && components) {
      if (component in components) {
        var c = components[component];
        if ("workspace" in c) {
          return c["workspace"];
        }
      }
    }
    return null;
  },
  map: function map() {
    return ComponentManager.map();
  },
  /**
   * userConfig
   * We want to make sure all of the keys are available, and if not, set defaults...
   * @param {object} config the current configuration object
   * @returns
   */
  userPrefsForItem: function userPrefsForItem(item, key, config) {
    try {
      // console.log('value: ', item['userPrefs'][key]);
      // console.log('user prefs config item ', item, key, config);

      var prefsForItem = {};
      if ("userPrefs" in item) {
        if (key in item["userPrefs"]) {
          prefsForItem = _defineProperty$9({}, key, item["userPrefs"][key]);
        } else {
          if ("defaultValue" in config) {
            prefsForItem = _defineProperty$9({}, key, config["defaultValue"]);
          }
        }
      } else {
        // no user preferences in the item yet so we can try and set the defaults.
        // console.log('config item ', config);
        prefsForItem[key] = "defaultValue" in config ? config["defaultValue"] : "";
      }

      // console.log('config item prefs ', prefsForItem);
      return prefsForItem;
    } catch (e) {
      return {};
    }
  }
};

var LayoutGridContainer = function LayoutGridContainer(_ref) {
  var item = _ref.item,
    workspace = _ref.workspace,
    _ref$preview = _ref.preview,
    preview = _ref$preview === void 0 ? false : _ref$preview,
    id = _ref.id,
    parent = _ref.parent,
    scrollable = _ref.scrollable,
    order = _ref.order,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    onClickAdd = _ref.onClickAdd,
    onClickRemove = _ref.onClickRemove,
    onChangeDirection = _ref.onChangeDirection,
    onChangeOrder = _ref.onChangeOrder,
    onOpenConfig = _ref.onOpenConfig;
    _ref.onOpenEvents;
    var width = _ref.width,
    direction = _ref.direction,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-full" : _ref$height,
    onDropItem = _ref.onDropItem;
  function handleClickAdd() {
    onClickAdd(item);
  }
  function handleClickRemove(item) {
    onClickRemove(id);
  }
  function handleChangeDirection(item) {
    onChangeDirection(id, direction);
  }
  function handleOpenConfig() {
    onOpenConfig(item);
  }
  function handleDropItem(item) {
    if (onDropItem) {
      onDropItem(item);
    }
  }
  function handleChangeOrder(direction) {
    onChangeOrder(item, direction);
  }
  function renderEditHeader() {
    return item["workspace"] !== "layout" ? /*#__PURE__*/jsx("div", {
      className: "flex flex-row px-2 p-2 space-x-1 text-sm font-bold ".concat(getContainerColor(item), " text-gray-300 w-full"),
      children: /*#__PURE__*/jsx("span", {
        className: "",
        children: "".concat(item["component"])
      })
    }) : /*#__PURE__*/jsx("div", {
      className: "flex flex-row px-2 pt-1 space-x-1 text-xs ".concat(getContainerColor(item), " text-gray-300 font-medium w-full")
    });
  }
  function renderEditFooter() {
    var config = ComponentManager.config(item["component"], item);
    var canHaveChildren = config ? config["canHaveChildren"] : false;
    var numChildren = numChildrenForLayout(item, workspace["layout"]);

    // determine the parent layout direction...
    var parentLayout = getLayoutItemById(workspace["layout"], item["parent"]);
    var parentDirection = parentLayout ? parentLayout["direction"] : item["parentWorkspace"]["direction"];

    // determine if the item is at the "start/end" of the col/row
    var isMaxOrder = isMaxOrderForItem(workspace["layout"], item, item["parent"]);
    var isMinOrder = isMinOrderForItem(workspace["layout"], item, item["parent"]);
    return /*#__PURE__*/jsxs("div", {
      className: "flex flex-row space-x-1 justify-between w-full px-2 pb-2",
      children: [item && "workspace" in item && /*#__PURE__*/jsx("div", {
        className: "flex flex-row space-x-1",
        children: /*#__PURE__*/jsx(Tag, {
          text: dragType(item),
          textSize: "text-xs",
          backgroundColor: "bg-transparent"
        })
      }), /*#__PURE__*/jsxs("div", {
        className: "flex flex-row space-x-1 text-indigo-700",
        children: [canHaveChildren === true && /*#__PURE__*/jsx(ButtonIcon, {
          textColor: "text-gray-700",
          hoverTextColor: "hover:text-gray-300",
          icon: "plus",
          onClick: handleClickAdd,
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-green-700"
        }), /*#__PURE__*/jsx(ButtonIcon, {
          textColor: "text-gray-700",
          hoverTextColor: "hover:text-gray-300",
          icon: "".concat(direction === "col" ? "arrows-left-right" : "arrows-up-down"),
          onClick: handleChangeDirection,
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-blue-700"
        }), /*#__PURE__*/jsx(ButtonIcon, {
          textColor: "text-gray-700",
          hoverTextColor: "hover:text-gray-300",
          icon: "cog",
          onClick: handleOpenConfig,
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-blue-700"
        }), order > 1 && numChildren > 1 && isMinOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
          icon: "".concat(parentDirection === "col" ? "arrow-up" : "arrow-left"),
          onClick: function onClick() {
            return handleChangeOrder("down");
          },
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-blue-700"
        }), order > 1 && numChildren > 1 && isMaxOrder === false && /*#__PURE__*/jsx(ButtonIcon, {
          icon: "".concat(parentDirection === "col" ? "arrow-down" : "arrow-right"),
          onClick: function onClick() {
            return handleChangeOrder("up");
          },
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-blue-700"
        }), parent > 0 && /*#__PURE__*/jsx(ButtonIcon, {
          textColor: "text-gray-700",
          hoverTextColor: "hover:text-gray-300",
          icon: "trash",
          onClick: handleClickRemove,
          backgroundColor: "bg-transparent",
          hoverBackgroundColor: "hover:bg-red-900"
        })]
      })]
    });
  }
  function getBorderStyle() {
    try {
      return WidgetFactory.workspace(item["component"]) === "layout" ? "border-dashed" : "border-4";
    } catch (e) {
      return "";
    }
  }
  function renderComponentContainer(children) {
    return item ? renderComponent(item["component"], id, item, children) : null;
  }
  function getAllWorkspaceNames() {
    if (workspace !== null) {
      var names = workspace.layout.map(function (layout) {
        return "workspace" in layout ? layout.workspace : null;
      });
      return names.filter(function (value, index, array) {
        return array.indexOf(value) === index;
      }).filter(function (i) {
        return i !== null;
      });
    }
    return null;
  }
  function dropType(item) {
    if (item["type"] === "workspace" && item["component"] !== "Container") {
      return ["layout", item["parentWorkspaceName"]];
    }
    if (item["component"] === "Container") {
      return getAllWorkspaceNames();
    }
    return ["layout", item["parentWorkspaceName"]];
  }
  function dragType(item) {
    if (item["type"] === "workspace" && item["component"] !== "Container") {
      return item["parentWorkspaceName"];
    }
    if (item["component"] === "Container") {
      return "layout";
    }
    return item["parentWorkspaceName"];
  }
  return preview === false ? /*#__PURE__*/jsx(DropComponent, {
    item: item,
    id: id,
    type: dropType(item),
    onDropItem: handleDropItem,
    width: width,
    children: /*#__PURE__*/jsx(DragComponent, {
      id: id,
      type: dragType(item),
      onDropItem: handleDropItem,
      width: "w-full",
      children: /*#__PURE__*/jsxs(LayoutContainer, {
        id: "grid-container-parent-".concat(id),
        direction: "col",
        width: "w-full",
        height: "min-h-24",
        scrollable: false,
        className: "rounded overflow-x-hidden ".concat(preview === false && "border-2 rounded", " ").concat(preview === false && getContainerBorderColor(item), " ").concat(preview === false && getBorderStyle(), " min-h-24"),
        children: [preview === false && renderEditHeader(), /*#__PURE__*/jsx(LayoutContainer, {
          id: "grid-container-".concat(id),
          direction: direction,
          scrollable: scrollable,
          width: "w-full",
          height: "".concat(height, " min-h-24"),
          className: "".concat(preview === false && "p-3", " ").concat(direction === "col" ? "space-y-2" : "space-x-2"),
          children: children !== null && children
        }), preview === false && renderEditFooter()]
      })
    })
  }) : renderComponentContainer(children);
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function compareChildren(a, b) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

/**
 * renderLayout
 * @param {*} tempLayout
 * @param {*} parentKey
 * @param {*} debugMode
 * @param {*} onClick
 * @param {*} onClickRemove
 * @returns
 */

var renderLayout = function renderLayout(_ref) {
  var layout = _ref.layout,
    _ref$parentKey = _ref.parentKey,
    parentKey = _ref$parentKey === void 0 ? 0 : _ref$parentKey,
    workspace = _ref.workspace,
    _ref$isDraggable = _ref.isDraggable,
    isDraggable = _ref$isDraggable === void 0 ? true : _ref$isDraggable,
    _ref$debugMode = _ref.debugMode,
    debugMode = _ref$debugMode === void 0 ? false : _ref$debugMode,
    _ref$previewMode = _ref.previewMode,
    previewMode = _ref$previewMode === void 0 ? false : _ref$previewMode,
    _ref$onClickAdd = _ref.onClickAdd,
    onClickAdd = _ref$onClickAdd === void 0 ? null : _ref$onClickAdd,
    _ref$onClickRemove = _ref.onClickRemove,
    onClickRemove = _ref$onClickRemove === void 0 ? null : _ref$onClickRemove,
    _ref$onClickShrink = _ref.onClickShrink,
    onClickShrink = _ref$onClickShrink === void 0 ? null : _ref$onClickShrink,
    _ref$onClickExpand = _ref.onClickExpand,
    onClickExpand = _ref$onClickExpand === void 0 ? null : _ref$onClickExpand,
    _ref$onChangeDirectio = _ref.onChangeDirection,
    onChangeDirection = _ref$onChangeDirectio === void 0 ? null : _ref$onChangeDirectio,
    _ref$onChangeOrder = _ref.onChangeOrder,
    onChangeOrder = _ref$onChangeOrder === void 0 ? null : _ref$onChangeOrder,
    _ref$onOpenConfig = _ref.onOpenConfig,
    onOpenConfig = _ref$onOpenConfig === void 0 ? null : _ref$onOpenConfig,
    _ref$onOpenEvents = _ref.onOpenEvents,
    onOpenEvents = _ref$onOpenEvents === void 0 ? null : _ref$onOpenEvents,
    _ref$onDropItem = _ref.onDropItem,
    onDropItem = _ref$onDropItem === void 0 ? null : _ref$onDropItem,
    dashboardId = _ref.dashboardId;
  try {
    // Go through each item in the Workspace Layout to render the items.
    return layout !== null && layout !== undefined && layout.filter(function (t) {
      return t["parent"] === parentKey && t["id"] !== parentKey;
    }) //  && t['id'] !== parentKey
    .sort(compareChildren) // set the order of the elements
    .map(function (child) {
      var childLayout = LayoutModel(child, layout, dashboardId);
      var id = childLayout.id,
        hasChildren = childLayout.hasChildren,
        parent = childLayout.parent,
        direction = childLayout.direction,
        scrollable = childLayout.scrollable,
        order = childLayout.order,
        width = childLayout.width,
        height = childLayout.height,
        component = childLayout.component,
        canHaveChildren = childLayout.canHaveChildren;
      return hasChildren === 1 && canHaveChildren === true ? /*#__PURE__*/jsx(LayoutGridContainer, {
        id: id,
        item: childLayout,
        parent: parent,
        onChangeDirection: onChangeDirection,
        onChangeOrder: onChangeOrder,
        onClickRemove: onClickRemove,
        isContainer: true,
        direction: direction,
        scrollable: scrollable,
        onClickAdd: onClickAdd,
        order: order,
        preview: previewMode,
        onOpenConfig: onOpenConfig,
        onOpenEvents: onOpenEvents,
        onDropItem: onDropItem,
        width: width,
        isDraggable: isDraggable,
        workspace: workspace,
        height: height,
        children: id > 0 && renderLayout({
          dashboardId: dashboardId,
          item: childLayout,
          layout: layout,
          parentKey: id,
          debugMode: debugMode,
          previewMode: previewMode,
          onClickAdd: onClickAdd,
          onClickRemove: onClickRemove,
          onClickShrink: onClickShrink,
          onClickExpand: onClickExpand,
          onChangeDirection: onChangeDirection,
          onChangeOrder: onChangeOrder,
          order: order,
          onOpenConfig: onOpenConfig,
          onOpenEvents: onOpenEvents,
          onDropItem: onDropItem,
          workspace: workspace,
          isDraggable: isDraggable
        })
      }, id) : /*#__PURE__*/jsx(LayoutBuilderGridItem, {
        item: childLayout,
        layout: layout,
        id: id,
        parent: parent,
        row: order,
        col: order,
        order: order,
        onClickAdd: onClickAdd,
        onClickRemove: onClickRemove,
        onClickExpand: onClickExpand,
        onClickShrink: onClickShrink,
        onChangeDirection: onChangeDirection,
        onChangeOrder: onChangeOrder,
        onDropItem: onDropItem,
        name: id,
        width: width,
        height: height,
        direction: direction,
        scrollable: scrollable,
        preview: previewMode,
        component: component,
        onOpenConfig: onOpenConfig,
        onOpenEvents: onOpenEvents,
        isDraggable: isDraggable,
        workspace: workspace
      }, id);
    });
  } catch (e) {
    console.log(e);
  }
};
function renderLayoutMenu(_ref2) {
  var currentWorkspace = _ref2.currentWorkspace,
    _ref2$parentKey = _ref2.parentKey,
    parentKey = _ref2$parentKey === void 0 ? 0 : _ref2$parentKey,
    onClick = _ref2.onClick,
    onMouseOver = _ref2.onMouseOver;
  try {
    var handleMouseOver = function handleMouseOver(e) {
      isOver = true;
      onMouseOver(e);
    };
    var isOver = false;
    return currentWorkspace !== null && currentWorkspace !== undefined && currentWorkspace["layout"].filter(function (t) {
      return t["parent"] === parentKey;
    }).sort(compareChildren).map(function (child) {
      var childLayout = LayoutModel(child, currentWorkspace["layout"]);
      // get some data to render the child...
      var component = child.component,
        id = child.id;
      var hasChildren = "hasChildren" in child ? child["hasChildren"] : 0;
      return hasChildren === 1 ? /*#__PURE__*/jsx(LayoutBuilderConfigContainerMenuItem, {
        onClick: onClick,
        onMouseOver: handleMouseOver,
        id: id,
        component: component,
        item: childLayout,
        children: id > 0 && renderLayoutMenu({
          currentWorkspace: currentWorkspace,
          parentKey: id,
          onClick: onClick,
          onMouseOver: onMouseOver
        })
      }, "layout-builder-config-container-".concat(id)) : /*#__PURE__*/jsx(LayoutBuilderConfigMenuItem, {
        onClick: onClick,
        onMouseOver: handleMouseOver,
        id: id,
        component: component,
        item: childLayout
      });
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * renderComponent
 *
 * @param {string} component the name of the component to render
 * @param {*} id the unique identifier
 * @param {*} params optional params that will be passed in as props to the component
 * @returns
 */
function renderComponent(component, id) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  try {
    if (component) {
      if ("height" in params) {
        if (params["height"] === "") {
          params["height"] = "h-full";
        }
      }

      // tack on the id
      // params['id'] = id;
      // params['component'] = 'component' in params ? params['component'] : component;

      var WidgetToRender = WidgetFactory.render(component, "widget-".concat(id), params, children);
      return WidgetToRender ? WidgetToRender : /*#__PURE__*/jsx("div", {
        className: "flex flex-col h-full",
        children: "No"
      });
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
function getNextHighestParentId(tempLayout, currentParent) {
  // loop through the layout to find the next highest parent id
  var parentId = -1;
  var newTemp = JSON.parse(JSON.stringify(tempLayout));
  var len = newTemp.length;
  for (var i = len; i > 0; i--) {
    var t = newTemp[i - 1];
    if (t.parent > currentParent) {
      if (t.parent > parentId) {
        parentId = t.parent;
      }
    }
  }
  return parentId;
}
function getNextHighestId(tempLayout) {
  var newTemp = JSON.parse(JSON.stringify(tempLayout));
  var maxId = Math.max.apply(Math, _toConsumableArray(newTemp.map(function (t) {
    return t.id;
  })));
  return maxId + 1;
}
function isMaxOrderForItem(tempLayout, itemId, parentId) {
  var newTemp = JSON.parse(JSON.stringify(tempLayout));
  var children = newTemp.filter(function (i) {
    return i.parent === parentId;
  });
  var maxOrder = 0;
  if (children.length > 0) {
    maxOrder = Math.max.apply(Math, _toConsumableArray(newTemp.filter(function (i) {
      return i.parent === parentId;
    }).map(function (t) {
      return t.order;
    })));
  }
  return itemId["order"] === maxOrder;
}
function isMinOrderForItem(tempLayout, itemId, parentId) {
  var newTemp = JSON.parse(JSON.stringify(tempLayout));
  var children = newTemp.filter(function (i) {
    return i.parent === parentId;
  });
  var maxOrder = 0;
  if (children.length > 0) {
    maxOrder = Math.min.apply(Math, _toConsumableArray(newTemp.filter(function (i) {
      return i.parent === parentId;
    }).map(function (t) {
      return t.order;
    })));
  }
  return itemId["order"] === maxOrder;
}
function getNextHighestOrder(tempLayout, parentId) {
  var newTemp = JSON.parse(JSON.stringify(tempLayout));
  var children = newTemp.filter(function (i) {
    return i.parent === parentId;
  });
  var maxOrder = 0;
  if (children.length > 0) {
    maxOrder = Math.max.apply(Math, _toConsumableArray(newTemp.filter(function (i) {
      return i.parent === parentId;
    }).map(function (t) {
      return t.order;
    })));
  }
  return {
    highest: maxOrder + 1,
    numChildren: children.length
  };
}
function getNextHighestItemInLayout(tempLayout, currentOrder) {
  var nextItem = null;
  Object.keys(tempLayout).forEach(function (t) {
    if (nextItem === null) {
      if (tempLayout[t]["order"] > currentOrder) {
        nextItem = deepCopy(tempLayout[t]);
      }
    } else {
      if (tempLayout[t]["order"] > currentOrder && nextItem["order"] > tempLayout[t]["order"]) {
        nextItem = deepCopy(tempLayout[t]);
      }
    }
  });
  return nextItem;
}
function numChildrenForLayout(item, layout) {
  var num = 0;
  if (item && layout) {
    var itemsWithParent = Object.keys(layout).filter(function (li) {
      return layout[li]["parent"] === item["parent"];
    });
    // set the number of children
    num = itemsWithParent.length;
  }
  return num;
}
function getNextLowestItemInLayout(tempLayout, currentOrder) {
  var nextItem = null;
  Object.keys(tempLayout).forEach(function (t) {
    if (nextItem === null) {
      if (tempLayout[t]["order"] < currentOrder) {
        nextItem = tempLayout[t];
      }
    } else {
      if (tempLayout[t]["order"] < currentOrder && nextItem["order"] < tempLayout[t]["order"]) {
        nextItem = tempLayout[t];
      }
    }
  });
  return nextItem;
}
function getParentForLayoutItem(tempLayout, id) {
  var match = tempLayout.filter(function (t) {
    return t["id"] === id;
  });
  var parentId = null;
  if (match.length > 0) {
    parentId = match[0]["parent"];
  }
  return parentId ? getLayoutItemById(tempLayout, parentId) : null;
}
function getLayoutItemById(tempLayout, id) {
  try {
    var match = tempLayout ? tempLayout.filter(function (t) {
      return t["id"] === parseInt(id, 10);
    }) : null;
    return match.length > 0 ? match[0] : null;
  } catch (e) {
    return null;
  }
}
function addItemToItemLayout(tempLayout, id, itemToAdd) {
  var hasChildren = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // let's get the values required to create the item
  var nextId = getNextHighestId(tempLayout);
  // const item = getLayoutItemById(tempLayout, id);
  var nextOrder = getNextHighestOrder(tempLayout, id);
  if (itemToAdd) {
    var newItem = LayoutModel(itemToAdd, tempLayout);

    // generate the new Item here...
    newItem["id"] = nextId;
    newItem["order"] = nextOrder["highest"];
    newItem["hasChildren"] = hasChildren === false ? 0 : 1;
    newItem["parent"] = id;
    newItem["scrollable"] = hasChildren === false ? true : false;
    // testing
    newItem["component"] = itemToAdd["component"];
    tempLayout.push(newItem);
  }
  return tempLayout;
}
function removeItemFromLayout(tempLayout, id) {
  if (tempLayout.length > 1) {
    var indexOfItem = getIndexOfLayoutItem(tempLayout, id);
    var indexOfChildren = getIndexOfLayoutChildrenForItem(tempLayout, id);
    // remove the children...
    indexOfChildren.length > 0 && indexOfChildren.forEach(function (index) {
      // const i = tempLayout[index];
      // i['parent'] > 0 && tempLayout.splice(index, 1);
      tempLayout.splice(index, 1);
    });
    // // remove the parent/item
    if (indexOfItem > -1) {
      tempLayout.splice(indexOfItem, 1);
    }
  }
  return tempLayout;
}
function changeDirectionForLayoutItem(tempLayout, id, currentDirection) {
  var item = getLayoutItemById(tempLayout, id);
  var newLayout = null;
  if (item) {
    var direction = item.direction;
    item.direction = direction === "col" ? "row" : "col";
    newLayout = replaceItemInLayout(tempLayout, id, item);
  }
  return newLayout;
}
function updateLayoutItem(tempLayout, itemData) {
  var item = getLayoutItemById(tempLayout, itemData["id"]);
  var id = itemData["id"];
  var newLayout = null;
  if (item) {
    Object.keys(itemData).forEach(function (key) {
      item[key] = itemData[key];
    });
    newLayout = replaceItemInLayout(tempLayout, id, item);
  }
  return newLayout;
}
function updateParentForItem(tempLayout, id, parentId) {
  var item = getLayoutItemById(tempLayout, id);
  var newLayout = null;
  if (item) {
    item.parent = parentId;
    newLayout = replaceItemInLayout(tempLayout, id, item);
  }
  return newLayout;
}
function getIndexOfLayoutItem(tempLayout, id) {
  var indexOfItem = -1;
  tempLayout.forEach(function (t, index) {
    if (t.id === id) {
      indexOfItem = index;
    }
  });
  return indexOfItem;
}
function getIndexOfLayoutChildrenForItem(tempLayout, id) {
  var indexOfItem = [];
  tempLayout.forEach(function (t, index) {
    if (t.parent === id) {
      indexOfItem.push(index);
    }
  });
  return indexOfItem;
}
function replaceItemInLayout(tempLayout, id, item) {
  var indexOfItem = getIndexOfLayoutItem(tempLayout, id);
  if (indexOfItem > -1) {
    tempLayout[indexOfItem] = item;
  }
  return tempLayout;
}

/**
 * getNearestParentWorkspace
 * Find the nearest workspace that matches the workspace type
 * that is not a layout workspace....
 *
 * This will tell us which parent "functional" workspace we are inside so we can list
 * the widgets that are available to that space....
 *
 * @param {object} layout the layout of the entire workspace
 * @param {object} item the item we have clicked on in the editor
 * @param {object} itemSelected
 */
function getNearestParentWorkspace(workspaceLayout, currentItem, parentItem) {
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  try {
    if (currentItem !== null && parentItem !== null) {
      if ("component" in currentItem) {
        if (currentItem !== null) {
          // if this item is a workspace and same type as the item selected....
          if (currentItem["type"] === "workspace" && currentItem["workspace"] !== "layout") {
            return currentItem;
          } else {
            if (currentItem["type"] === "workspace" && currentItem["workspace"] !== "layout") {
              return currentItem;
            } else {
              // if a workspace got past all the checks...
              if (currentItem["type"] === "workspace" && currentItem["workspace"] !== "layout") {
                return currentItem;
              }
              var parentId = currentItem["parent"];
              var parentItemFromLayout = getLayoutItemById(workspaceLayout, parentId);
              count++;
              return parentItemFromLayout !== null ? getNearestParentWorkspace(workspaceLayout, parentItem, parentItemFromLayout, count) : {};
            }
          }
        } else {
          // config was null so move on to the next parent?
          return {};
        }
      }
    }
    return {};
  } catch (e) {
    console.log("get nearest parent error ", e.message);
    return {};
  }
}
function getContainerBorderColor(item) {
  var color = "border-gray-800";
  try {
    if (item) {
      // const config = ComponentManager.config(item['component'], item);
      var canHaveChildren = item ? item["canHaveChildren"] : false;
      if (item) {
        if ("styles" in item) {
          color = "backgroundColor" in item["styles"] ? item["styles"]["borderColor"] : color;
        } else {
          switch (item["type"]) {
            case "workspace":
              if (item["workspace"] === "layout") {
                color = "border-gray-700 border-dashed";
              } else {
                if (canHaveChildren === true) {
                  color = "border-indigo-800";
                } else {
                  color = "border-indigo-900";
                }
              }
              break;
            case "widget":
              color = "border-green-800";
              break;
            default:
              break;
          }
        }
      }
    }
    return color;
  } catch (e) {
    console.log(e);
    return color;
  }
}
function getContainerColor(component) {
  var color = "bg-gray-900";
  try {
    if ("styles" in component && Object.keys(component["styles"]).length > 0) {
      color = "backgroundColor" in component["styles"] ? component["styles"]["backgroundColor"] : color;
    } else {
      switch (component["type"]) {
        case "workspace":
          if (component["workspace"] === "layout") {
            color = "bg-gray-900";
          } else {
            if (component["canHaveChildren"] === false) {
              color = "bg-indigo-800";
            }
          }
          break;
        case "widget":
          color = "bg-green-800";
          break;
        default:
          break;
      }
    }
    return color;
  } catch (e) {
    return color;
  }
}

// function getContainerStyles(component) {
//     let color = 'bg-gray-900';
//     try {
//         if ('styles' in component && Object.keys(component['styles']).length > 0) {
//             color = 'backgroundColor' in component['styles'] ? component['styles']['backgroundColor'] : color;
//         } else {
//             switch(component['type']) {
//                 case 'workspace':
//                     if (component['workspace'] === 'layout') {
//                         color = 'bg-gray-900';
//                     } else {
//                         if (component['canHaveChildren'] === false) {
//                             color = 'bg-indigo-800';
//                         }
//                     }
//                 break;
//                 case 'widget':
//                     color = 'bg-green-800';
//                 break;
//                 default:
//                 break;
//             }
//         }
//         return color;
//     } catch(e) {
//         return color;
//     }
// }

function getBorderStyle(item) {
  try {
    return WidgetFactory.workspace(item["component"]) === "layout" ? "border-dashed" : "border-2";
  } catch (e) {
    return "";
  }
}

// export {
//     renderLayout,
//     renderLayoutMenu,
//     renderComponent,
//     getParentForLayoutItem,
//     getNextHighestItemInLayout,
//     getNextLowestItemInLayout,
//     getLayoutItemById,
//     addItemToItemLayout,
//     removeItemFromLayout,
//     changeDirectionForLayoutItem,
//     getNextHighestParentId,
//     getNextHighestId,
//     getNextHighestOrder,
//     updateLayoutItem,
//     updateParentForItem,
//     getContainerBorderColor,
//     getContainerColor,
//     replaceItemInLayout,
//     getNearestParentWorkspace,
//     getBorderStyle,
//     numChildrenForLayout,
//     isMaxOrderForItem,
//     isMinOrderForItem
// }

var _themeObjects$BUTTON, _themeObjects$BUTTON_, _themeObjects$BUTTON_2, _themeObjects$PANEL, _themeObjects$PANEL_, _themeObjects$PANEL_2, _themeObjects$BUTTON_3, _themeObjects$BUTTON_4, _themeObjects$BUTTON_5, _themeObjects$HEADING, _themeObjects$HEADING2, _themeObjects$HEADING3, _themeObjects$SUBHEAD, _themeObjects$SUBHEAD2, _themeObjects$SUBHEAD3, _themeObjects$PARAGRA, _themeObjects$PARAGRA2, _themeObjects$PARAGRA3, _themeObjects$MENU_IT, _themeObjects$MENU_IT2, _themeObjects$MENU_IT3, _themeObjects$TAG, _themeObjects$TAG_, _themeObjects$TAG_2, _themeObjects$TOGGLE, _themeObjects$DASHBOA, _themeObjects$DASHBOA2, _themeObjects$DASHBOA3, _themeObjects$CODE_ED, _themeObjects$INPUT_T, _themeObjects$SELECT_, _colorMap;
function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$c(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$c(arg) { var key = _toPrimitive$c(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$c(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var objectTypes = ["bg", "text", "hover-bg", "hover-text", "border"];
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
};
var themeVariants = ["very-light", "light", "medium", "dark", "very-dark"];
var colorTypes = ["primary", "secondary", "tertiary", "neutral"];
var colorNames = ["zinc", "neutral", "stone", "red", "gray", "blue", "slate", "indigo", "yellow", "orange", "amber", "lime", "emerald", "green", "teal", "cyan", "sky", "violet", "purple", "fuchsia", "pink", "rose"];
var shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
var colorMap = (_colorMap = {}, _defineProperty$8(_colorMap, themeObjects.BUTTON, (_themeObjects$BUTTON = {}, _defineProperty$8(_themeObjects$BUTTON, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$BUTTON, styleClassNames.BORDER_COLOR, "border-primary-dark"), _defineProperty$8(_themeObjects$BUTTON, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$BUTTON, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), _defineProperty$8(_themeObjects$BUTTON, styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), _defineProperty$8(_themeObjects$BUTTON, styleClassNames.HOVER_BORDER_COLOR, "border-primary-dark"), _themeObjects$BUTTON)), _defineProperty$8(_colorMap, themeObjects.BUTTON_2, (_themeObjects$BUTTON_ = {}, _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.BORDER_COLOR, "border-secondary-dark"), _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), _defineProperty$8(_themeObjects$BUTTON_, styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark"), _themeObjects$BUTTON_)), _defineProperty$8(_colorMap, themeObjects.BUTTON_3, (_themeObjects$BUTTON_2 = {}, _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.BORDER_COLOR, "border-tertiary-dark"), _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), _defineProperty$8(_themeObjects$BUTTON_2, styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-dark"), _themeObjects$BUTTON_2)), _defineProperty$8(_colorMap, themeObjects.PANEL, (_themeObjects$PANEL = {}, _defineProperty$8(_themeObjects$PANEL, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), _defineProperty$8(_themeObjects$PANEL, styleClassNames.BORDER_COLOR, "border-primary-dark"), _defineProperty$8(_themeObjects$PANEL, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$PANEL, styleClassNames.HOVER_BORDER_COLOR, "border-primary-very-dark"), _themeObjects$PANEL)), _defineProperty$8(_colorMap, themeObjects.PANEL_2, (_themeObjects$PANEL_ = {}, _defineProperty$8(_themeObjects$PANEL_, styleClassNames.BACKGROUND_COLOR, "bg-secondary-dark"), _defineProperty$8(_themeObjects$PANEL_, styleClassNames.BORDER_COLOR, "border-secondary-very-dark"), _defineProperty$8(_themeObjects$PANEL_, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$PANEL_, styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark"), _themeObjects$PANEL_)), _defineProperty$8(_colorMap, themeObjects.PANEL_3, (_themeObjects$PANEL_2 = {}, _defineProperty$8(_themeObjects$PANEL_2, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-dark"), _defineProperty$8(_themeObjects$PANEL_2, styleClassNames.BORDER_COLOR, "border-tertiary-very-dark"), _defineProperty$8(_themeObjects$PANEL_2, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$PANEL_2, styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-very-dark"), _themeObjects$PANEL_2)), _defineProperty$8(_colorMap, themeObjects.BUTTON_ICON, (_themeObjects$BUTTON_3 = {}, _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.BORDER_COLOR, "border-primary-dark"), _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), _defineProperty$8(_themeObjects$BUTTON_3, styleClassNames.HOVER_BORDER_COLOR, "border-primary-dark"), _themeObjects$BUTTON_3)), _defineProperty$8(_colorMap, themeObjects.BUTTON_ICON_2, (_themeObjects$BUTTON_4 = {}, _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.BORDER_COLOR, "border-secondary-dark"), _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), _defineProperty$8(_themeObjects$BUTTON_4, styleClassNames.HOVER_BORDER_COLOR, "border-secondary-dark"), _themeObjects$BUTTON_4)), _defineProperty$8(_colorMap, themeObjects.BUTTON_ICON_3, (_themeObjects$BUTTON_5 = {}, _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.BORDER_COLOR, "border-tertiary-dark"), _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), _defineProperty$8(_themeObjects$BUTTON_5, styleClassNames.HOVER_BORDER_COLOR, "border-tertiary-dark"), _themeObjects$BUTTON_5)), _defineProperty$8(_colorMap, themeObjects.HEADING, (_themeObjects$HEADING = {}, _defineProperty$8(_themeObjects$HEADING, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$HEADING, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$HEADING, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$HEADING, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$HEADING, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$HEADING)), _defineProperty$8(_colorMap, themeObjects.HEADING_2, (_themeObjects$HEADING2 = {}, _defineProperty$8(_themeObjects$HEADING2, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$HEADING2, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$HEADING2, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$HEADING2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$HEADING2, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$HEADING2)), _defineProperty$8(_colorMap, themeObjects.HEADING_3, (_themeObjects$HEADING3 = {}, _defineProperty$8(_themeObjects$HEADING3, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$HEADING3, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$HEADING3, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$HEADING3, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$HEADING3, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$HEADING3)), _defineProperty$8(_colorMap, themeObjects.SUBHEADING, (_themeObjects$SUBHEAD = {}, _defineProperty$8(_themeObjects$SUBHEAD, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$SUBHEAD, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$SUBHEAD, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$SUBHEAD, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$SUBHEAD, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$SUBHEAD)), _defineProperty$8(_colorMap, themeObjects.SUBHEADING_2, (_themeObjects$SUBHEAD2 = {}, _defineProperty$8(_themeObjects$SUBHEAD2, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$SUBHEAD2, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$SUBHEAD2, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$SUBHEAD2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$SUBHEAD2, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$SUBHEAD2)), _defineProperty$8(_colorMap, themeObjects.SUBHEADING_3, (_themeObjects$SUBHEAD3 = {}, _defineProperty$8(_themeObjects$SUBHEAD3, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$SUBHEAD3, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$SUBHEAD3, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$SUBHEAD3, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$SUBHEAD3, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$SUBHEAD3)), _defineProperty$8(_colorMap, themeObjects.PARAGRAPH, (_themeObjects$PARAGRA = {}, _defineProperty$8(_themeObjects$PARAGRA, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$PARAGRA, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$PARAGRA, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$PARAGRA, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$PARAGRA, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$PARAGRA)), _defineProperty$8(_colorMap, themeObjects.PARAGRAPH_2, (_themeObjects$PARAGRA2 = {}, _defineProperty$8(_themeObjects$PARAGRA2, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$PARAGRA2, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$PARAGRA2, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$PARAGRA2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$PARAGRA2, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$PARAGRA2)), _defineProperty$8(_colorMap, themeObjects.PARAGRAPH_3, (_themeObjects$PARAGRA3 = {}, _defineProperty$8(_themeObjects$PARAGRA3, styleClassNames.BACKGROUND_COLOR, "bg-none"), _defineProperty$8(_themeObjects$PARAGRA3, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$PARAGRA3, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$PARAGRA3, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-none"), _defineProperty$8(_themeObjects$PARAGRA3, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$PARAGRA3)), _defineProperty$8(_colorMap, themeObjects.MENU_ITEM, (_themeObjects$MENU_IT = {}, _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.BORDER_COLOR, "border-primary-dark"), _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), _defineProperty$8(_themeObjects$MENU_IT, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$MENU_IT)), _defineProperty$8(_colorMap, themeObjects.MENU_ITEM_2, (_themeObjects$MENU_IT2 = {}, _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.BORDER_COLOR, "border-secondary-dark"), _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), _defineProperty$8(_themeObjects$MENU_IT2, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$MENU_IT2)), _defineProperty$8(_colorMap, themeObjects.MENU_ITEM_3, (_themeObjects$MENU_IT3 = {}, _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.BORDER_COLOR, "border-tertiary-dark"), _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), _defineProperty$8(_themeObjects$MENU_IT3, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$MENU_IT3)), _defineProperty$8(_colorMap, themeObjects.TAG, (_themeObjects$TAG = {}, _defineProperty$8(_themeObjects$TAG, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$TAG, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$TAG, styleClassNames.TEXT_COLOR, "text-primary-medium"), _defineProperty$8(_themeObjects$TAG, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-primary-medium"), _defineProperty$8(_themeObjects$TAG, styleClassNames.HOVER_TEXT_COLOR, "hover-text-primary-dark"), _defineProperty$8(_themeObjects$TAG, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$TAG)), _defineProperty$8(_colorMap, themeObjects.TAG_2, (_themeObjects$TAG_ = {}, _defineProperty$8(_themeObjects$TAG_, styleClassNames.BACKGROUND_COLOR, "bg-secondary-medium"), _defineProperty$8(_themeObjects$TAG_, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$TAG_, styleClassNames.TEXT_COLOR, "text-secondary-medium"), _defineProperty$8(_themeObjects$TAG_, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-secondary-medium"), _defineProperty$8(_themeObjects$TAG_, styleClassNames.HOVER_TEXT_COLOR, "hover-text-secondary-dark"), _defineProperty$8(_themeObjects$TAG_, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$TAG_)), _defineProperty$8(_colorMap, themeObjects.TAG_3, (_themeObjects$TAG_2 = {}, _defineProperty$8(_themeObjects$TAG_2, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), _defineProperty$8(_themeObjects$TAG_2, styleClassNames.BORDER_COLOR, "border-none"), _defineProperty$8(_themeObjects$TAG_2, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$TAG_2, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), _defineProperty$8(_themeObjects$TAG_2, styleClassNames.HOVER_TEXT_COLOR, "hover-text-tertiary-dark"), _defineProperty$8(_themeObjects$TAG_2, styleClassNames.HOVER_BORDER_COLOR, "hover-border-none"), _themeObjects$TAG_2)), _defineProperty$8(_colorMap, themeObjects.TOGGLE, (_themeObjects$TOGGLE = {}, _defineProperty$8(_themeObjects$TOGGLE, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-medium"), _defineProperty$8(_themeObjects$TOGGLE, styleClassNames.TEXT_COLOR, "text-tertiary-medium"), _defineProperty$8(_themeObjects$TOGGLE, styleClassNames.HOVER_BACKGROUND_COLOR, "hover-bg-tertiary-medium"), _themeObjects$TOGGLE)), _defineProperty$8(_colorMap, themeObjects.DASHBOARD_FOOTER, (_themeObjects$DASHBOA = {}, _defineProperty$8(_themeObjects$DASHBOA, styleClassNames.BACKGROUND_COLOR, "bg-primary-very-dark"), _defineProperty$8(_themeObjects$DASHBOA, styleClassNames.BORDER_COLOR, "border-primary-dark"), _themeObjects$DASHBOA)), _defineProperty$8(_colorMap, themeObjects.DASHBOARD_FOOTER_2, (_themeObjects$DASHBOA2 = {}, _defineProperty$8(_themeObjects$DASHBOA2, styleClassNames.BACKGROUND_COLOR, "bg-secondary-very-dark"), _defineProperty$8(_themeObjects$DASHBOA2, styleClassNames.BORDER_COLOR, "border-secondary-dark"), _themeObjects$DASHBOA2)), _defineProperty$8(_colorMap, themeObjects.DASHBOARD_FOOTER_3, (_themeObjects$DASHBOA3 = {}, _defineProperty$8(_themeObjects$DASHBOA3, styleClassNames.BACKGROUND_COLOR, "bg-tertiary-very-dark"), _defineProperty$8(_themeObjects$DASHBOA3, styleClassNames.BORDER_COLOR, "border-tertiary-dark"), _themeObjects$DASHBOA3)), _defineProperty$8(_colorMap, themeObjects.CODE_EDITOR, (_themeObjects$CODE_ED = {}, _defineProperty$8(_themeObjects$CODE_ED, styleClassNames.BACKGROUND_COLOR, "bg-primary-dark"), _defineProperty$8(_themeObjects$CODE_ED, styleClassNames.BORDER_COLOR, "border-primary-dark"), _defineProperty$8(_themeObjects$CODE_ED, styleClassNames.TEXT_COLOR, "text-primary-medium"), _themeObjects$CODE_ED)), _defineProperty$8(_colorMap, themeObjects.INPUT_TEXT, (_themeObjects$INPUT_T = {}, _defineProperty$8(_themeObjects$INPUT_T, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$INPUT_T, styleClassNames.BORDER_COLOR, "border-primary-medium"), _defineProperty$8(_themeObjects$INPUT_T, styleClassNames.TEXT_COLOR, "text-primary-dark"), _themeObjects$INPUT_T)), _defineProperty$8(_colorMap, themeObjects.SELECT_MENU, (_themeObjects$SELECT_ = {}, _defineProperty$8(_themeObjects$SELECT_, styleClassNames.BACKGROUND_COLOR, "bg-primary-medium"), _defineProperty$8(_themeObjects$SELECT_, styleClassNames.BORDER_COLOR, "border-primary-medium"), _defineProperty$8(_themeObjects$SELECT_, styleClassNames.TEXT_COLOR, "text-primary-dark"), _themeObjects$SELECT_)), _defineProperty$8(_colorMap, themeObjects.FORM_LABEL, _defineProperty$8({}, styleClassNames.TEXT_COLOR, "text-primary-dark")), _colorMap);

/**
 * getStylesForItem
 * @param {string} itemName the name of the component (button, panel, etc)
 *
 */
var getStylesForItem = function getStylesForItem() {
  var itemName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (itemName !== null) {
    // get the colors from the theme by default
    // this is a MAP like "bg-primary-dark" which needs to
    // fetch its value from the actual theme based on this key mapping
    var defaultStyles = itemName in colorMap ? colorMap[itemName] : null;

    // then we have to determine if this item has any theme overrides
    var themeOverrides = theme !== null && itemName in theme ? theme[itemName] : {};

    // then we have to determine if the component has any MANUAL overrides
    var manualOverrides = Object.keys(overrides).length > 0 ? overrides : {};

    // and this is the styles we shall return
    var styles = {};

    // First set all of the defaults
    Object.keys(defaultStyles).forEach(function (key) {
      styles[key] = theme[defaultStyles[key]];
    });

    // we have to begin with the defaults for the theme so we have access
    // and knowledge of what keys in the theme to return.
    // the trick is applying the overrides to those theme keys
    // if they exist.

    if (defaultStyles !== null) {
      // now we have to handle the overrides
      // if the user has passed in any
      Object.keys(defaultStyles).forEach(function (className) {
        // check manual override
        if (className in manualOverrides && manualOverrides[className] !== null) {
          styles[className] = manualOverrides[className];
        }

        // check theme override
        if (className in themeOverrides) {
          var themeOverrideKey = themeOverrides[className];
          styles[className] = theme[themeOverrideKey];
        }
      });
    }
    return _objectSpread$7({
      string: Object.keys(styles).length > 0 ? Object.keys(styles).map(function (key) {
        return styles[key];
      }).join(" ") : ""
    }, styles);
  }
  return null;
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
    default:
      s = objectType;
      break;
  }
  return s;
}

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
var _excluded$6 = ["className", "horizontal", "children", "onClick", "width", "height"],
  _excluded2$4 = ["className", "horizontal", "children", "onClick", "width", "height"],
  _excluded3$4 = ["className", "horizontal", "children", "onClick", "width", "height"];
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$6(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$6(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$6(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Panel = function Panel(_ref) {
  var className = _ref.className,
    horizontal = _ref.horizontal,
    children = _ref.children,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-full" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "h-full" : _ref$height,
    props = _objectWithoutProperties$6(_ref, _excluded$6);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL, currentTheme, _objectSpread$6({}, props));
  return /*#__PURE__*/jsx("div", {
    className: "flex ".concat(className !== "" && className, " ").concat(styles.string, " ").concat(horizontal === true ? "flex-row" : "flex-col", " ").concat(width, " ").concat(height, " p-6 rounded"),
    onClick: onClick,
    children: children
  });
};
var Panel2 = function Panel2(_ref2) {
  var className = _ref2.className,
    horizontal = _ref2.horizontal,
    children = _ref2.children,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? "w-full" : _ref2$width,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? "h-full" : _ref2$height,
    props = _objectWithoutProperties$6(_ref2, _excluded2$4);
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, _objectSpread$6({}, props));
  return /*#__PURE__*/jsx("div", {
    className: "flex ".concat(className !== "" && className, " ").concat(styles.string, " ").concat(horizontal === true ? "flex-row" : "flex-col", " ").concat(width, " ").concat(height, " p-6 rounded"),
    onClick: onClick,
    children: children
  });
};
var Panel3 = function Panel3(_ref3) {
  var className = _ref3.className,
    horizontal = _ref3.horizontal,
    children = _ref3.children,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$width = _ref3.width,
    width = _ref3$width === void 0 ? "w-full" : _ref3$width,
    _ref3$height = _ref3.height,
    height = _ref3$height === void 0 ? "h-full" : _ref3$height,
    props = _objectWithoutProperties$6(_ref3, _excluded3$4);
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, _objectSpread$6({}, props));
  return /*#__PURE__*/jsx("div", {
    className: "flex ".concat(className !== "" && className, " ").concat(styles.string, " ").concat(horizontal === true ? "flex-row" : "flex-col", " ").concat(width, " ").concat(height, " p-6 rounded"),
    onClick: onClick,
    children: children
  });
};

var Modal = function Modal(_ref) {
  var children = _ref.children,
    isOpen = _ref.isOpen,
    setIsOpen = _ref.setIsOpen,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "w-5/6" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "5/6" : _ref$height;
  return /*#__PURE__*/jsxs(Dialog, {
    open: isOpen,
    onClose: function onClose() {
      return setIsOpen(false);
    },
    className: "relative z-50 overflow-hidden rounded",
    children: [/*#__PURE__*/jsx("div", {
      className: "fixed inset-0 bg-black/90",
      "aria-hidden": "true",
      onClick: function onClick() {
        return setIsOpen(false);
      }
    }), /*#__PURE__*/jsx("div", {
      className: "fixed inset-0 flex items-center justify-center h-full w-full rounded overflow-hidden",
      children: /*#__PURE__*/jsx("div", {
        className: "mx-auto ".concat(width, " ").concat(height, " flex flex-col shadow overflow-hidden rounded"),
        children: children
      })
    })]
  });
};

var _excluded$5 = ["text", "padding", "onClick"],
  _excluded2$3 = ["text", "padding", "onClick"],
  _excluded3$3 = ["text", "padding", "onClick"];
function _objectWithoutProperties$5(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$5(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Paragraph(_ref) {
  var text = _ref.text,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? true : _ref$padding,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    props = _objectWithoutProperties$5(_ref, _excluded$5);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
  var styles = getStylesForItem(themeObjects.PARAGRAPH, currentTheme, props);
  return /*#__PURE__*/jsx("span", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-base xl:text-lg font-normal ").concat(styles.string),
    onClick: onClick,
    children: text
  });
}
function Paragraph2(_ref2) {
  var text = _ref2.text,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? true : _ref2$padding,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    props = _objectWithoutProperties$5(_ref2, _excluded2$3);
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
  var styles = getStylesForItem(themeObjects.PARAGRAPH_2, currentTheme, props);
  return /*#__PURE__*/jsx("span", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-sm xl:text-base font-normal ").concat(styles.string),
    onClick: onClick,
    children: text
  });
}
function Paragraph3(_ref3) {
  var text = _ref3.text,
    _ref3$padding = _ref3.padding,
    padding = _ref3$padding === void 0 ? true : _ref3$padding,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    props = _objectWithoutProperties$5(_ref3, _excluded3$3);
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var paddingStyles = padding === true ? "p-2 2xl:px-2 2xl:py-1" : "p-0";
  var styles = getStylesForItem(themeObjects.PARAGRAPH_3, currentTheme, props);
  return /*#__PURE__*/jsx("span", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-xs xl:text-sm font-normal ").concat(styles.string),
    onClick: onClick,
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
    selected = _ref$selected === void 0 ? false : _ref$selected;
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected
  });
  return theme === true ? /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-bold ".concat(styles.string, " ").concat(border === true && "border-4", " p-4 rounded items-center space-x-2 cursor-pointer text-lg"),
    children: children
  }) : /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-bold ".concat(backgroundColor, " ").concat(borderColor, " ").concat(textColor, " ").concat(border === true && "border-4", " p-4 rounded items-center space-x-2 cursor-pointer text-lg"),
    children: children
  });
};
var MenuItem2 = function MenuItem2(_ref2) {
  var _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    _ref2$theme = _ref2.theme,
    theme = _ref2$theme === void 0 ? true : _ref2$theme,
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
    selected = _ref2$selected === void 0 ? false : _ref2$selected;
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM_2, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected
  });
  return theme === true ? /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-medium ".concat(styles.string, " ").concat(border === true && "border-2", " ").concat(border === true && "border-2", " p-2 px-4 rounded items-center space-x-2 cursor-pointer text-base"),
    children: children
  }) : /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-medium ".concat(backgroundColor, " ").concat(borderColor, " ").concat(textColor, " ").concat(border === true && "border", " p-2 rounded items-center space-x-2 cursor-pointer text-base"),
    children: children
  });
};
var MenuItem3 = function MenuItem3(_ref3) {
  var _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    _ref3$theme = _ref3.theme,
    theme = _ref3$theme === void 0 ? true : _ref3$theme,
    _ref3$border = _ref3.border,
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
    selected = _ref3$selected === void 0 ? false : _ref3$selected;
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.MENU_ITEM_3, currentTheme, {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    textColor: textColor,
    hoverBackgroundColor: hoverBackgroundColor,
    hoverTextColor: hoverTextColor,
    selectedBackgroundColor: selectedBackgroundColor,
    selectedTextColor: selectedTextColor,
    selected: selected
  });
  return theme === true ? /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-normal ".concat(styles.string, " ").concat(border === true && "border", " p-2 px-4 rounded items-center space-x-2 cursor-pointer text-sm"),
    children: children
  }) : /*#__PURE__*/jsx("div", {
    onClick: onClick,
    className: "flex flex-row font-normal ".concat(backgroundColor, " ").concat(borderColor, " ").concat(textColor, " ").concat(border === true && "border", " p-2 px-4 rounded items-center space-x-2 cursor-pointer text-sm"),
    children: children
  });
};

function Heading(_ref) {
  var title = _ref.title,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? true : _ref$padding,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? null : _ref$textColor;
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-6xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
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
    textColor = _ref2$textColor === void 0 ? null : _ref2$textColor;
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING_2, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-5xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
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
    textColor = _ref3$textColor === void 0 ? null : _ref3$textColor;
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.HEADING_3, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-4xl font-bold ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
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
    textColor = _ref4$textColor === void 0 ? null : _ref4$textColor;
  var _useContext4 = useContext$1(ThemeContext),
    currentTheme = _useContext4.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-3xl font-medium ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
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
    textColor = _ref5$textColor === void 0 ? null : _ref5$textColor;
  var _useContext5 = useContext$1(ThemeContext),
    currentTheme = _useContext5.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING_2, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-2xl font-medium ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
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
    textColor = _ref6$textColor === void 0 ? null : _ref6$textColor;
  var _useContext6 = useContext$1(ThemeContext),
    currentTheme = _useContext6.currentTheme;
  var paddingStyles = padding === true ? "p-4 2xl:px-6 2xl:py-4" : "p-0";
  var styles = getStylesForItem(themeObjects.SUBHEADING_3, currentTheme, {
    textColor: textColor
  });
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full ".concat(paddingStyles, " text-2xl font-medium ").concat(styles.string, " ").concat(onClick !== null && "cursor-pointer"),
    onClick: onClick,
    children: title
  });
}

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
var _excluded$4 = ["title", "onClick", "disabled", "padding", "textSize", "block"],
  _excluded2$2 = ["title", "onClick", "disabled", "textSize", "padding", "block"],
  _excluded3$2 = ["title", "onClick", "disabled", "textSize", "padding", "block"];
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$4(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$4(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Button = function Button(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Cancel" : _ref$title,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? null : _ref$padding,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? null : _ref$textSize,
    _ref$block = _ref.block,
    block = _ref$block === void 0 ? false : _ref$block,
    props = _objectWithoutProperties$4(_ref, _excluded$4);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON, currentTheme, _objectSpread$5({}, props));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-lg lg:text-xl xl:text-xl 2xl:text-2xl";
  var paddingComputed = padding !== null ? padding : "p-2 lg:p-4 xl:p-6";
  return /*#__PURE__*/jsx("div", {
    onClick: handleOnClick,
    className: "flex flex-row justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-bold"),
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
    props = _objectWithoutProperties$4(_ref2, _excluded2$2);
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_2, currentTheme, _objectSpread$5({}, props));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-base lg:text-lg 2xl:text-xl";
  var paddingComputed = padding !== null ? padding : "p-1 lg:p-2 xl:p-4";
  return /*#__PURE__*/jsx("div", {
    onClick: handleOnClick,
    className: "flex flex-row justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-medium"),
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
    props = _objectWithoutProperties$4(_ref3, _excluded3$2);
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_3, currentTheme, _objectSpread$5({}, props));
  function handleOnClick(e) {
    if (disabled === false) {
      onClick !== null && onClick(e);
    }
  }
  var width = block === true ? "w-full" : "";
  var textSizeComputed = textSize !== null ? textSize : "text-sm xl:text-base 2xl:text-base";
  var paddingComputed = padding !== null ? padding : "p-1 lg:p-1 xl:p-2";
  return /*#__PURE__*/jsx("div", {
    onClick: handleOnClick,
    className: "flex flex-row justify-center items-center ".concat(paddingComputed, " ").concat(styles.string, " rounded ").concat(width, " cursor-pointer ").concat(textSizeComputed, " font-normal"),
    children: title
  });
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
var _excluded$3 = ["onClick", "icon", "text", "block", "textSize", "iconSize"],
  _excluded2$1 = ["onClick", "icon", "text", "block", "textSize", "iconSize"],
  _excluded3$1 = ["onClick", "icon", "text", "block", "textSize", "iconSize"];
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ButtonIcon = function ButtonIcon(_ref) {
  var _onClick = _ref.onClick,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? "xmark" : _ref$icon,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? null : _ref$text,
    _ref$block = _ref.block,
    block = _ref$block === void 0 ? false : _ref$block,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-xs lg:text-base 2xl:text-base" : _ref$textSize,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? "h-4 w-4" : _ref$iconSize,
    props = _objectWithoutProperties$3(_ref, _excluded$3);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON, currentTheme, _objectSpread$4({}, props));
  return /*#__PURE__*/jsxs("div", {
    onClick: function onClick(e) {
      e.preventDefault();
      _onClick(e);
    },
    className: "flex flex-row  ".concat(styles.string, " rounded font-medium items-center justify-center cursor-pointer p-2 ").concat(textSize, " ").concat(block && "w-full", " whitespace-nowrap"),
    children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
      icon: icon,
      className: "".concat(iconSize)
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: text === "" ? "ml-0" : "ml-2",
      children: text
    })]
  });
};
var ButtonIcon2 = function ButtonIcon2(_ref2) {
  var _onClick2 = _ref2.onClick,
    _ref2$icon = _ref2.icon,
    icon = _ref2$icon === void 0 ? "xmark" : _ref2$icon,
    _ref2$text = _ref2.text,
    text = _ref2$text === void 0 ? null : _ref2$text,
    _ref2$block = _ref2.block,
    block = _ref2$block === void 0 ? false : _ref2$block,
    _ref2$textSize = _ref2.textSize,
    textSize = _ref2$textSize === void 0 ? "text-xs lg:text-base 2xl:text-base" : _ref2$textSize,
    _ref2$iconSize = _ref2.iconSize,
    iconSize = _ref2$iconSize === void 0 ? "h-4 w-4" : _ref2$iconSize,
    props = _objectWithoutProperties$3(_ref2, _excluded2$1);
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON_2, currentTheme, _objectSpread$4({}, props));
  return /*#__PURE__*/jsxs("div", {
    onClick: function onClick(e) {
      e.preventDefault();
      _onClick2(e);
    },
    className: "flex flex-row  ".concat(styles.string, " rounded font-medium items-center justify-center cursor-pointer p-2 ").concat(textSize, " ").concat(block && "w-full", " whitespace-nowrap"),
    children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
      icon: icon,
      className: "".concat(iconSize)
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: text === "" ? "ml-0" : "ml-2",
      children: text
    })]
  });
};
var ButtonIcon3 = function ButtonIcon3(_ref3) {
  var _onClick3 = _ref3.onClick,
    _ref3$icon = _ref3.icon,
    icon = _ref3$icon === void 0 ? "xmark" : _ref3$icon,
    _ref3$text = _ref3.text,
    text = _ref3$text === void 0 ? null : _ref3$text,
    _ref3$block = _ref3.block,
    block = _ref3$block === void 0 ? false : _ref3$block,
    _ref3$textSize = _ref3.textSize,
    textSize = _ref3$textSize === void 0 ? "text-xs lg:text-base 2xl:text-base" : _ref3$textSize,
    _ref3$iconSize = _ref3.iconSize,
    iconSize = _ref3$iconSize === void 0 ? "h-4 w-4" : _ref3$iconSize,
    props = _objectWithoutProperties$3(_ref3, _excluded3$1);
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.BUTTON_ICON_3, currentTheme, _objectSpread$4({}, props));
  return /*#__PURE__*/jsxs("div", {
    onClick: function onClick(e) {
      e.preventDefault();
      _onClick3(e);
    },
    className: "flex flex-row  ".concat(styles.string, " rounded font-medium items-center justify-center cursor-pointer p-2 ").concat(textSize, " ").concat(block && "w-full", " whitespace-nowrap"),
    children: [/*#__PURE__*/jsx(FontAwesomeIcon, {
      icon: icon,
      className: "".concat(iconSize)
    }), text !== null && /*#__PURE__*/jsx("span", {
      className: text === "" ? "ml-0" : "ml-2",
      children: text
    })]
  });
};

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
var _excluded$2 = ["text", "enabled", "setEnabled"];
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Toggle(_ref) {
  _ref.text;
    _ref.enabled;
    _ref.setEnabled;
    var props = _objectWithoutProperties$2(_ref, _excluded$2);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  getStylesForItem(themeObjects.TOGGLE, currentTheme, _objectSpread$3({}, props));
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

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$7(descriptor.key), descriptor); } }
function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$4(subClass, superClass); }
function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf$4(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$4(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$4(this, result); }; }
function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$4(self); }
function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }
var CodeEditorSimple = /*#__PURE__*/function (_React$Component) {
  _inherits$4(CodeEditorSimple, _React$Component);
  var _super = _createSuper$4(CodeEditorSimple);
  function CodeEditorSimple() {
    _classCallCheck$4(this, CodeEditorSimple);
    return _super.apply(this, arguments);
  }
  _createClass$4(CodeEditorSimple, [{
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
  return CodeEditorSimple;
}(React.Component);
CodeEditorSimple.defaultProps = {
  onChange: function onChange() {},
  code: ""
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
var _excluded$1 = ["code", "setCode", "uniqueKey", "language", "placeholder"];
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function CodeEditorInline(_ref) {
  var code = _ref.code,
    setCode = _ref.setCode,
    _ref$uniqueKey = _ref.uniqueKey,
    uniqueKey = _ref$uniqueKey === void 0 ? "12345" : _ref$uniqueKey,
    _ref$language = _ref.language,
    language = _ref$language === void 0 ? "js" : _ref$language,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Please enter JS code." : _ref$placeholder,
    props = _objectWithoutProperties$1(_ref, _excluded$1);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, _objectSpread$2({}, props));
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-1 flex-col w-full h-full space-y-4 rounded ".concat(styles.string, " overflow-hidden"),
    children: /*#__PURE__*/jsx("div", {
      className: "flex flex-col rounded w-full h-full ".concat(styles.string, " overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900"),
      children: /*#__PURE__*/jsx("div", {
        className: "bg-inherit h-full ".concat(styles.textColor),
        children: /*#__PURE__*/jsx(CodeEditor, {
          value: code,
          language: language,
          placeholder: placeholder,
          onChange: function onChange(evn) {
            return setCode(evn.target.value);
          },
          padding: 15,
          style: {
            caretColor: "#eeeeee",
            fontSize: "16px",
            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            minHeight: "100%"
          },
          className: styles.string
        })
      })
    })
  }, "code-editor-".concat(uniqueKey));
}

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
var _excluded = ["text", "textSize", "onClick"],
  _excluded2 = ["text", "textSize", "onClick"],
  _excluded3 = ["text", "textSize", "onClick"];
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Tag = function Tag(_ref) {
  var text = _ref.text,
    _ref$textSize = _ref.textSize,
    textSize = _ref$textSize === void 0 ? "text-xs xl:text-sm 2xl:text-sm" : _ref$textSize,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? null : _ref$onClick,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG, currentTheme, _objectSpread$1({}, props));
  return /*#__PURE__*/jsx("span", {
    onClick: onClick,
    className: "flex flex-row w-fit rounded ".concat(onClick !== null && "cursor-pointer", " ").concat(styles.string, " px-2 py-1 ").concat(textSize, " font-bold whitespace-nowrap items-center justify-center"),
    children: text
  });
};
var Tag2 = function Tag2(_ref2) {
  var text = _ref2.text,
    _ref2$textSize = _ref2.textSize,
    textSize = _ref2$textSize === void 0 ? "text-xs xl:text-sm 2xl:text-sm" : _ref2$textSize,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? null : _ref2$onClick,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var _useContext2 = useContext$1(ThemeContext),
    currentTheme = _useContext2.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG_2, currentTheme, _objectSpread$1({}, props));
  return /*#__PURE__*/jsx("span", {
    onClick: onClick,
    className: "flex flex-row w-fit rounded ".concat(onClick !== null && "cursor-pointer", " ").concat(styles.string, " px-2 py-1 ").concat(textSize, " font-bold whitespace-nowrap items-center justify-center"),
    children: text
  });
};
var Tag3 = function Tag3(_ref3) {
  var text = _ref3.text,
    _ref3$textSize = _ref3.textSize,
    textSize = _ref3$textSize === void 0 ? "text-xs xl:text-sm 2xl:text-sm" : _ref3$textSize,
    _ref3$onClick = _ref3.onClick,
    onClick = _ref3$onClick === void 0 ? null : _ref3$onClick,
    props = _objectWithoutProperties(_ref3, _excluded3);
  var _useContext3 = useContext$1(ThemeContext),
    currentTheme = _useContext3.currentTheme;
  var styles = getStylesForItem(themeObjects.TAG_3, currentTheme, _objectSpread$1({}, props));
  return /*#__PURE__*/jsx("span", {
    onClick: onClick,
    className: "flex flex-row w-fit rounded ".concat(onClick !== null && "cursor-pointer", " ").concat(styles.string, " px-2 py-1 ").concat(textSize, " font-bold whitespace-nowrap items-center justify-center"),
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
    height = _ref$height === void 0 ? "h-full min-h-fit" : _ref$height,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    _ref$onMouseOver = _ref.onMouseOver,
    onMouseOver = _ref$onMouseOver === void 0 ? null : _ref$onMouseOver,
    _ref$onMouseOut = _ref.onMouseOut,
    onMouseOut = _ref$onMouseOut === void 0 ? null : _ref$onMouseOut;
  // determine the classes based on the props...
  var directionStyle = direction === "row" ? "flex-row space-x-2" : "flex-col space-y-2";
  var scrollStyle = scrollable === true ? "overflow-y-scroll" : "";
  var widthStyle = width;
  var heightStyle = scrollable === true ? height : height;
  return /*#__PURE__*/jsx("div", {
    id: "container-".concat(id),
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "flex ".concat(directionStyle, " ").concat(scrollStyle, " ").concat(widthStyle, " ").concat(heightStyle, " ").concat(className, " ").concat(debug === true && "border border-green-500 border-dotted"),
    children: children
  });
};

function ErrorMessage(_ref) {
  var title = _ref.title,
    onClose = _ref.onClose;
  console.log("error ", title);
  return /*#__PURE__*/jsx("div", {
    onClick: onClose,
    className: "flex flex-row w-full p-4 2xl:px-6 2xl:py-4 text-2xl xl:text3xl bg-indigo-700 opacity-75 rounded text-gray-300 dark:bg-indigo-800 dark:text-gray-200 font-bold",
    children: JSON.stringify(title)
  });
}

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$4(descriptor.key), descriptor); } }
function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$3(subClass, superClass); }
function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$3(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$3(this, result); }; }
function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$3(self); }
function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }
/*#__PURE__*/(function (_React$Component) {
  _inherits$3(Footer, _React$Component);
  var _super = _createSuper$3(Footer);
  function Footer() {
    _classCallCheck$3(this, Footer);
    return _super.apply(this, arguments);
  }
  _createClass$3(Footer, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-row p-4 bg-gray-200 dark:bg-gray-900 w-full justify-center mt-auto text-xs text-center items-center",
        children: /*#__PURE__*/jsx("span", {
          className: "text-gray-300 dark:text-gray-600",
          children: "Team RAM @2022"
        })
      });
    }
  }]);
  return Footer;
})(React.Component);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor); } }
function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$2(subClass, superClass); }
function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf$2(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$2(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$2(this, result); }; }
function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$2(self); }
function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var mainApi = window.mainApi;
/*#__PURE__*/(function (_React$Component) {
  _inherits$2(Header, _React$Component);
  var _super = _createSuper$2(Header);
  function Header() {
    var _this;
    _classCallCheck$2(this, Header);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty$1(_assertThisInitialized$2(_this), "handleClickHome", function () {
      _this.props.navigate("/applications");
    });
    _defineProperty$1(_assertThisInitialized$2(_this), "handleClickApplications", function () {
      _this.props.navigate("/applications");
    });
    return _this;
  }
  _createClass$2(Header, [{
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
                    return console.log("nope.");
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
  return Header;
})(React.Component);

var MainSection = function MainSection(_ref) {
  var children = _ref.children,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? null : _ref$backgroundColor;
  var _useContext = useContext$1(ThemeContext),
    currentTheme = _useContext.currentTheme;

  // we have to parse out all of the color overrides if they exist.
  var backgroundColorStyle = backgroundColor !== null ? backgroundColor : currentTheme !== null ? currentTheme["bg-primary-very-dark"] : "bg-black";
  console.log("MAIN SECTION COLOR STYLE", backgroundColorStyle);
  return currentTheme !== null && /*#__PURE__*/jsx("div", {
    className: "flex flex-col ".concat(backgroundColorStyle, " h-full overflow-hidden w-full"),
    children: children
  });
  //  : (
  //     <div className={`flex flex-col bg-gray-900 h-full overflow-hidden w-full`}>{children}</div>
  // )
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }
function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$1(self); }
function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
var SubHeader = /*#__PURE__*/function (_React$Component) {
  _inherits$1(SubHeader, _React$Component);
  var _super = _createSuper$1(SubHeader);
  function SubHeader() {
    _classCallCheck$1(this, SubHeader);
    return _super.apply(this, arguments);
  }
  _createClass$1(SubHeader, [{
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
  return SubHeader;
}(React.Component);
SubHeader.defaultProps = {
  onClick: function onClick() {},
  onClickCreate: function onClickCreate() {},
  title: "",
  buttonTitle: "",
  buttonColor: "bg-gray-700",
  buttonTextColor: "text-gray-200"
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MainContent = /*#__PURE__*/function (_React$Component) {
  _inherits(MainContent, _React$Component);
  var _super = _createSuper(MainContent);
  function MainContent() {
    _classCallCheck(this, MainContent);
    return _super.apply(this, arguments);
  }
  _createClass(MainContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        horizontal = _this$props.horizontal,
        padding = _this$props.padding;
      return /*#__PURE__*/jsx("div", {
        className: "flex flex-1 flex-col bg-gray-700 h-full w-full overflow-hidden",
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
  return MainContent;
}(React.Component);
MainContent.defaultProps = {
  title: null,
  horizontal: false,
  padding: true
};

var AlgoliaSearchBox = function AlgoliaSearchBox(_ref) {
  var props = _ref.props,
    _ref$onQueryChange = _ref.onQueryChange,
    onQueryChange = _ref$onQueryChange === void 0 ? null : _ref$onQueryChange;
  var _useSearchBox = useSearchBox(props),
    currentRefinement = _useSearchBox.currentRefinement,
    refine = _useSearchBox.refine,
    _useSearchBox$disable = _useSearchBox.disabled,
    disabled = _useSearchBox$disable === void 0 ? false : _useSearchBox$disable;
    _useSearchBox.queryHook;
    var query = _useSearchBox.query;
  useEffect(function () {
    onQueryChange && onQueryChange(query);
  }, [query]);
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-row w-full min-h-fit",
    children: /*#__PURE__*/jsx(InputText, {
      type: "search",
      value: currentRefinement,
      onChange: function onChange(event) {
        return refine(event.currentTarget.value);
      },
      disabled: disabled
      // className={`${
      //     disabled === true && "bg-gray-400"
      // } flex flex-row flex-1 w-full h-20 p-2 2xl:p-4 text-base 2xl:text-lg rounded text-indigo-800 font-bold bg-gray-200 dark:bg-indigo-300 focus:outline-none`}
      ,
      placeholder: "Search"
    })
  });
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AlgoliaRefinementList = function AlgoliaRefinementList(props) {
  // return null;
  var attribute = props.attribute;
  console.log("attribute ", attribute);
  var _useRefinementList = useRefinementList(_objectSpread({
      attribute: "tags"
    }, props)),
    items = _useRefinementList.items,
    refine = _useRefinementList.refine;
  return attribute && attribute !== "" && /*#__PURE__*/jsx("ul", {
    className: "flex flex-col space-y-1 w-full flex-grow",
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
  });
};

// TODO, move this into a argument as opposed to a file...
var _componentMap = {};
var ComponentManager = {
  // _componentMap: {},

  /**
   * init
   * @param {object} configs
   */
  init: function init(configs) {
    var _this = this;
    if (configs) {
      Object.keys(configs).forEach(function (key) {
        _this.registerWidget(configs[key], key);
      });
    }
  },
  setComponentMap: function setComponentMap(cm) {
    _componentMap = cm;
  },
  componentMap: function componentMap() {
    return _componentMap;
  },
  registerWidget: function registerWidget(widgetConfig, widgetKey) {
    var tempComponentMap = this.componentMap();
    console.log("register widget ", widgetConfig, widgetKey);
    tempComponentMap[widgetKey] = ComponentConfigModel(widgetConfig["default"]);
    this.setComponentMap(tempComponentMap);
  },
  /**
   * map
   * Get a map of all of the registered components in the application
   * @returns object
   */
  map: function map() {
    // copy
    var componentsCopy = deepCopy(this.componentMap());
    if (componentsCopy) {
      // additional INTERNAL components that we need
      componentsCopy["Container"] = {
        component: LayoutContainer,
        canHaveChildren: true,
        userConfig: {},
        workspace: "layout",
        type: "workspace",
        width: "w-full"
      };
      return componentsCopy;
    }
    return {};
  },
  /**
   * getComponent
   * Fetch the React Component from the map of registered components
   * @param {string} component
   * @returns
   */
  getComponent: function getComponent(component) {
    try {
      if (component && this.componentMap()) {
        if (ComponentManager.isLayoutContainer(component) === false) {
          var m = this.componentMap();
          var cmp = component in m ? m[component] : null;
          if (cmp !== null) {
            cmp["componentName"] = component;
            return cmp;
          }
        } else {
          return {
            component: LayoutContainer,
            canHaveChildren: true,
            userConfig: {},
            workspace: "layout",
            type: "workspace",
            width: "w-full"
          };
        }
      }
    } catch (e) {
      return null;
    }
  },
  config: function config(component) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (component) {
      var requiredFields = {
        type: {
          value: "text"
        },
        required: {
          value: false
        },
        options: {
          value: []
        },
        defaultValue: {
          value: ""
        }
      };

      // get the component configuration from the map
      var components = ComponentManager.map();
      if (component in components) {
        // let c = deepCopy(components['component']);
        var c = JSON.parse(JSON.stringify(components[component]));

        // tack on the component name
        c["component"] = component;

        // if no userConfig key. let's add it for the next step
        if ("userConfig" in c === false) {
          c["userConfig"] = {};
        }

        // if (isLayout === false) {
        var userPrefs = {};
        // now we can make sure the configuration is "complete"
        if ("userConfig" in c) {
          Object.keys(c["userConfig"]).forEach(function (key) {
            // check the required fields!
            Object.keys(requiredFields).forEach(function (k) {
              if (k in c["userConfig"][key]) {
                if (k in c["userConfig"][key] === false) {
                  c["userConfig"][key] = requiredFields[k]["value"];
                }
              }
            });
            // set the user preferences
            userPrefs[key] = ComponentManager.userPrefsForItem("userPrefs" in data ? data : c, key, c["userConfig"][key]);
          });
        }

        // set the user preferences here
        c["userPrefs"] = userPrefs;
        return {
          type: c["type"],
          workspace: c["workspace"],
          canHaveChildren: c["canHaveChildren"],
          userPrefs: c["userPrefs"],
          userConfig: c["userConfig"],
          styles: "styles" in c ? c["styles"] : {},
          events: "events" in c ? c["events"] : [],
          eventHandlers: "eventHandlers" in c ? c["eventHandlers"] : []
        };

        // } else {
        //     return c;
        // }
      }

      return null;
    }
    return null;
  },
  /**
   * userConfig
   * We want to make sure all of the keys are available, and if not, set defaults...
   * @param {object} config the current configuration object
   * @returns
   */
  userPrefsForItem: function userPrefsForItem(item, key, config) {
    try {
      var prefsForItem = {};
      if ("userPrefs" in item) {
        if (key in item["userPrefs"]) {
          prefsForItem = item["userPrefs"][key];
        } else {
          if ("defaultValue" in config) {
            prefsForItem = config["defaultValue"];
          }
        }
      } else {
        // no user preferences in the item yet so we can try and set the defaults.
        prefsForItem = "defaultValue" in config ? config["defaultValue"] : "";
      }
      return prefsForItem;
    } catch (e) {
      return {};
    }
  },
  /**
   * isLayoutContainer
   * Check if the component is a layout container
   * @param {string} component the string name of the component to be matched in the component config file
   * @returns boolean
   */
  isLayoutContainer: function isLayoutContainer(component) {
    return component === "LayoutContainer" || component === "Container";
  }
};

var mock = {
  themes: {
    "theme-1": {
      name: "Default 1",
      primary: "gray",
      secondary: "indigo",
      tertiary: "blue"
    }
  },
  api: {
    on: function on() {},
    removeAllListeners: function removeAllListeners() {},
    events: {},
    themes: {
      listThemesForApplication: function listThemesForApplication() {
        return this.themes;
      }
    },
    settings: {
      getSettingsForApplication: function getSettingsForApplication() {
        return {
          theme: "theme-1"
        };
      }
    },
    loadThemes: function loadThemes() {
      return this.themes;
    }
  }
};
var MockWrapper = function MockWrapper(_ref) {
  var _ref$apiMock = _ref.apiMock,
    apiMock = _ref$apiMock === void 0 ? null : _ref$apiMock,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? mock.themes["theme-1"] : _ref$theme,
    children = _ref.children,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? "bg-transparent" : _ref$backgroundColor;
  var themeObject = ThemeModel(theme);
  return /*#__PURE__*/jsx("div", {
    className: "flex flex-col h-full w-full m-auto justify-center items-center",
    children: /*#__PURE__*/jsx(AppWrapper, {
      api: apiMock,
      children: /*#__PURE__*/jsx(ThemeWrapper, {
        theme: themeObject,
        children: /*#__PURE__*/jsx("div", {
          className: "flex flex-col space-y-2 w-full h-full p-6 border rounded-lg ".concat(backgroundColor),
          children: children
        })
      })
    })
  });
};

library.add(faHome, faPlug, faMagnifyingGlass, faDatabase, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faTrash, faPlus, faMinus, faClone, faArrowsUpDown, faArrowsLeftRight, faCog, faXmark, faSquare, faEye, faPencil, faFolder, faEarListen, faBullhorn, faSquareCheck, faPhone, faSignal, faHammer, faSeedling, faTrophy, faRobot, faPuzzlePiece, faCode, faLeaf, faBaby, faBabyCarriage, faDatabase, faEarListen, faSignal, faPalette, faComputer);

export { AddMenuItemModal, AlgoliaRefinementList, AlgoliaSearchBox, AppContext, AppWrapper, Button, Button2, Button3, ButtonIcon, ButtonIcon2, ButtonIcon3, CodeEditorInline, ColorModel, ComponentConfigModel, ComponentManager, Container, Dashboard, DashboardApi, DashboardContext, DashboardFooter, DashboardHeader, DashboardMenuItem, DashboardMonitor, DashboardPublisher, ErrorMessage, FormLabel, Heading, Heading2, Heading3, InputText, Layout, LayoutBuilder, LayoutBuilderAddItemModal, LayoutBuilderConfigContainerMenuItem, LayoutBuilderConfigMenuItem, LayoutBuilderConfigModal, LayoutBuilderEditItemModal, LayoutBuilderEventModal, LayoutBuilderGridItem, LayoutContainer, LayoutDragBuilder, LayoutGridContainer, LayoutModel, MainMenu, MainMenuItem, MainSection, MenuItem, MenuItem2, MenuItem3, MenuSlideOverlay, MockWrapper, Modal, Panel, Panel2, Panel3, PanelCode, PanelEditItem, PanelEditItemHandlers, Paragraph, Paragraph2, Paragraph3, Plugins, SelectMenu, SettingsModel, SideMenu, SubHeading, SubHeading2, SubHeading3, Tag, Tag2, Tag3, ThemeApi, ThemeContext, ThemeModel, ThemeWrapper, Toggle, Widget, WidgetApi, WidgetConfigPanel, WidgetFactory, Workspace, WorkspaceContext, WorkspaceFooter, WorkspaceMenu, WorkspaceModel, addItemToItemLayout, capitalizeFirstLetter, changeDirectionForLayoutItem, colorNames, colorTypes, deepCopy, getBorderStyle, getClassForObjectType, getContainerBorderColor, getContainerColor, getIndexOfLayoutChildrenForItem, getIndexOfLayoutItem, getLayoutItemById, getNearestParentWorkspace, getNextHighestId, getNextHighestItemInLayout, getNextHighestOrder, getNextHighestParentId, getNextLowestItemInLayout, getParentForLayoutItem, getStyleName, getStylesForItem, isMaxOrderForItem, isMinOrderForItem, isObject, mock, numChildrenForLayout, objectTypes, removeItemFromLayout, renderComponent, renderLayout, renderLayoutMenu, replaceItemInLayout, shades, styleClassNames, themeObjects, themeVariants, updateLayoutItem, updateParentForItem, withPlugins, withRouter };
