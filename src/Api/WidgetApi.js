/**
 * WidgetApi
 * Include developer methods to easily access the Electron bridge
 *
 * NOTE: This MUST be a class to avoid the Singleton pattern
 * This gets initialized and injected into each Widget initialized with
 * the UUID of the widget.
 * The UUID is then used for filenames, etc and MUST be unique.
 */

import { deepCopy } from "@dash/Utils";

export class WidgetApi {
    constructor(uuid) {
        this._uuid = uuid;
        this._pub = null;
        this._electronApi = null;
        this._settings = null;
    }

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
    init(uuidInput) {
        try {
            this._uuid = uuidInput;
        } catch (e) {
            console.log(e);
        }
    }

    setPublisher(publisher) {
        this._pub = publisher;
    }

    setElectronApi(api) {
        try {
            /**
             * include the main electron apis that we want to expose ONLY
             */
            if (api !== undefined && api !== null) {
                const minified = deepCopy(api);
                // now lets delete the keys?
                const tempApi = {
                    on: minified["on"],
                    removeAllListeners: minified["removeAllListeners"],
                    data: minified["data"],
                    algolia: minified["algolia"],
                    events: minified["publicEvents"],
                };

                // (minified["on"] = "on" in api ? api.on : null),
                //     (minified["removeAllListeners"] =
                //         "removeAllListeners" in api
                //             ? api.removeAllListeners
                //             : null),
                //     (minified["data"] = "data" in api ? api.data : null);
                // minified["algolia"] = "algolia" in api ? api.algolia : null;
                // minified["events"] =
                //     "publicEvents" in api ? api.publicEvents : null;

                this._electronApi = tempApi;
            }
        } catch (e) {
            console.log("Error Setting Electron API ", e.message);
        }
    }

    setSettings(settings) {
        this._settings = settings;
    }

    /**
     * uuid
     * @returns string the UUID for this Widget
     */
    uuid() {
        return this._uuid;
    }

    electronApi() {
        return this._electronApi;
    }

    pub() {
        return this._pub;
    }

    /**
     * publishEvent
     * @param {string} name the name of the widget (TODO - uuid + handler)
     * @param {object} events the payload for the event published
     */
    publishEvent(name, events) {
        // console.log("publish event ", `${this.uuid()}-${name}`);
        // const uniqueName = `${${name}`;
        this._pub.pub(name, events);
    }

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
    registerListeners(listeners, handlers) {
        this._pub.registerListeners(listeners, handlers, this.uuid());
    }

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
    storeData(
        data,
        options = {
            filename: null,
            callbackComplete: null,
            callbackError: null,
            append: true,
        }
    ) {
        // set the filename
        const toFilename =
            options["filename"] !== null
                ? options["filename"]
                : `${this.uuid()}.json`;

        // grab the electron api
        const eApi = this.electronApi();
        if (eApi) {
            // remove the listeners (reset)
            eApi.removeAllListeners();
            if (options["callbackComplete"] !== null) {
                eApi.on(eApi.events.DATA_SAVE_TO_FILE_COMPLETE, (e, message) =>
                    options["callbackComplete"](e, message)
                );
            }
            if (options["callbackError"] !== null) {
                eApi.on(eApi.events.DATA_SAVE_TO_FILE_ERROR, (e, message) =>
                    options["callbackError"](e, message)
                );
            }
            // request.
            eApi.data.saveData(data, toFilename, options["append"]);
        }
    }

    /**
     *
     * @param {object} options
     * - filename - the name of the file if you want to override the default uuid as filename
     * - callbackComplete - the handler for dealing with the complete callback data
     * - callbackError - the handler for dealing with the error callback data
     */
    readData({
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
            eApi.data.readData(toFilename);
        } catch (e) {
            console.log(e);
        }
    }
}
