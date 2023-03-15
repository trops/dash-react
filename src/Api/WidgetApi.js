/**
 * WidgetApi
 * Include developer methods to easily access the Electron bridge
 *
 */

export const WidgetApi = {
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
    init: function (uuidInput) {
        try {
            this._uuid = uuidInput;
        } catch (e) {
            console.log(e);
        }
    },

    setPublisher: function (publisher) {
        this._pub = publisher;
    },

    setElectronApi: function (api) {
        try {
            /**
             * include the main electron apis that we want to expose ONLY
             */
            if (api !== undefined && api !== null) {
                const minified = {};
                minified["data"] = "data" in api ? api.data : null;
                minified["algolia"] = "algolia" in api ? api.algolia : null;
                minified["events"] =
                    "publicEvents" in api ? api.publicEvents : null;

                this._electronApi = minified;
            }
        } catch (e) {
            console.log("Error Setting Electron API ", e.message);
        }
    },

    setSettings: function (settings) {
        this._settings = settings;
    },

    /**
     * uuid
     * @returns string the UUID for this Widget
     */
    uuid: function () {
        return this._uuid;
    },

    electronApi: function () {
        return this._electronApi;
    },

    /**
     * publishEvent
     * @param {string} name the name of the widget (TODO - uuid + handler)
     * @param {object} events the payload for the event published
     */
    publishEvent: function (name, events) {
        console.log("publish event ", `${this.uuid()}-${name}`);
        const uniqueName = `${this.uuid()}-${name}`;
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
    registerListeners: function (listeners, handlers) {
        this._pub.registerListeners(listeners, handlers);
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
    storeData: function (
        data,
        { filename = null, callbackComplete = null, callbackError = null }
    ) {
        // set the filename
        const toFilename = filename !== null ? filename : `${this.uuid()}.json`;
        // grab the electron api
        const eApi = this.electronApi();
        if (eApi) {
            // remove the listeners (reset)
            eApi.removeAllListeners();
            if (callbackComplete !== null) {
                eApi.on(eApi.events.DATA_SAVE_TO_FILE_COMPLETE, (e, message) =>
                    callbackComplete(e, message)
                );
            }
            if (callbackError !== null) {
                eApi.on(eApi.events.DATA_SAVE_TO_FILE_ERROR, (e, message) =>
                    callbackError(e, message)
                );
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
    readData: function ({
        filename = null,
        callbackComplete = null,
        callbackError = null,
    }) {
        try {
            const toFilename =
                filename !== null ? filename : `${this.uuid()}.json`;
            const eApi = this.electronApi();
            eApi.removeAllListeners();
            if (callbackComplete !== null) {
                eApi.on(
                    eApi.events.DATA_READ_FROM_FILE_COMPLETE,
                    (e, message) => callbackComplete(e, message)
                );
            }
            if (callbackError !== null) {
                callbackError !== null &&
                    eApi.on(
                        eApi.events.DATA_READ_FROM_FILE_ERROR,
                        (e, message) => callbackError(e, message)
                    );
            }
            eApi.data.readFromFile(toFilename);
        } catch (e) {
            console.log(e);
        }
    },
};
