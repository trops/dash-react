/**
 * WidgetApi
 * Include developer methods to easily access the Electron bridge
 *
 * NOTE: This MUST be a class to avoid the Singleton pattern
 * This gets initialized and injected into each Widget initialized with
 * the UUID of the widget.
 * The UUID is then used for filenames, etc and MUST be unique.
 */

import { deepCopy } from "@dash/Utils/objects";

export const WidgetApi = {
    // constructor(uuid) {
    //     this._uuid = uuid;
    //     this._pub = null;
    //     this._electronApi = null;
    //     this._settings = null;
    // }

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
    // init(uuidInput) {
    //     try {
    //         this._uuid = uuidInput;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    setPublisher: function (publisher) {
        this._pub = publisher;
    },

    setElectronApi: function (api) {
        try {
            /**
             * include the main electron apis that we want to expose ONLY
             */
            if (api !== undefined && api !== null) {
                // set the mainApi to electron inside the widget.
                this._electronApi = {
                    on: api.on,
                    removeAllListeners: api.removeAllListeners,
                    data: api.data,
                    algolia: api.algolia,
                    events: api.publicEvents,
                };
            }
        } catch (e) {
            console.log("Error Setting Electron API ", e.message);
        }
    },

    setSettings: function (settings) {
        this._settings = settings;
    },

    settings: function () {
        return this._settings;
    },

    /**
     * uuid
     * @returns string the UUID for this Widget
     */
    // uuid() {
    //     return this._uuid;
    // }

    electronApi: function () {
        return this._electronApi;
    },

    pub: function () {
        return this._pub;
    },

    /**
     * publishEvent
     * @param {string} name the name of the widget (TODO - uuid + handler)
     * @param {object} events the payload for the event published
     */
    publishEvent: function (name, events) {
        if (this.pub() !== null && name !== null && events !== null) {
            if ("pub" in this.pub()) {
                console.log("event published ", name, events);
                this.pub().pub(name, events);
            }
        }
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
    registerListeners: function (listeners, handlers, uuid) {
        if (this.pub() !== null && uuid !== null) {
            if ("registerListeners" in this.pub()) {
                if (this.pub()["registerListeners"] !== null) {
                    this.pub().registerListeners(listeners, handlers, uuid);
                }
            }
        }
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
    storeData: function ({
        data,
        filename = null,
        callbackComplete = null,
        callbackError = null,
        append = true,
        returnEmpty = {},
        uuid,
    }) {
        try {
            // set the filename
            const toFilename = filename !== null ? filename : `${uuid}.json`;

            // grab the electron api
            const eApi = this.electronApi();
            if (eApi) {
                // remove the listeners (reset)
                if ("removeAllListeners" in eApi) {
                    eApi.removeAllListeners();
                    if (callbackComplete !== null) {
                        eApi.on(
                            eApi.events.DATA_SAVE_TO_FILE_COMPLETE,
                            callbackComplete
                        );
                    }
                    if (callbackError !== null) {
                        eApi.on(
                            eApi.events.DATA_SAVE_TO_FILE_ERROR,
                            callbackError
                        );
                    }
                    // request.
                    eApi.data.saveData(data, toFilename, append, returnEmpty);
                }
            }
        } catch (e) {
            console.log("Error store data ", e.message);
            if (callbackError !== null) {
                callbackError(e, e.message);
            }
        }
    },

    /**
     *
     * @param {object} options
     * - filename - the name of the file if you want to override the default uuid as filename
     * - callbackComplete - the handler for dealing with the complete callback data
     * - callbackError - the handler for dealing with the error callback data
     * - uuid - the UUID for the widget/workspace
     */
    readData: function ({
        filename = null,
        callbackComplete = null,
        callbackError = null,
        uuid,
    }) {
        try {
            const toFilename = filename !== null ? filename : `${uuid}.json`;
            const eApi = this.electronApi();
            if ("removeAllListeners" in eApi) {
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
                eApi.data.readData(toFilename);
            }
        } catch (e) {
            console.log(e);
        }
    },
};
