// TODO, move this into a argument as opposed to a file...
import { LayoutContainer } from "@dash/Layout";
import { deepCopy } from "@dash/Utils";
import { ComponentConfigModel } from "@dash/Models";

let _componentMap = {};

export const ComponentManager = {
    // _componentMap: {},

    /**
     * init
     * @param {object} configs
     */
    init: function (configs) {
        if (configs) {
            Object.keys(configs).forEach((key) => {
                this.registerWidget(configs[key], key);
            });
        }
    },

    setComponentMap: function (cm) {
        _componentMap = cm;
    },

    componentMap: function () {
        return _componentMap;
    },

    registerWidget: function (widgetConfig, widgetKey) {
        const tempComponentMap = this.componentMap();
        console.log("register widget ", widgetConfig, widgetKey);
        tempComponentMap[widgetKey] = ComponentConfigModel(
            widgetConfig.default
        );
        this.setComponentMap(tempComponentMap);
    },

    /**
     * map
     * Get a map of all of the registered components in the application
     * @returns object
     */
    map: function () {
        // copy
        let componentsCopy = deepCopy(this.componentMap());
        if (componentsCopy) {
            // additional INTERNAL components that we need
            componentsCopy["Container"] = {
                component: LayoutContainer,
                canHaveChildren: true,
                userConfig: {},
                workspace: "layout",
                type: "workspace",
                width: "w-full",
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
    getComponent: function (component, data = {}) {
        try {
            if (component && this.componentMap()) {
                if (ComponentManager.isLayoutContainer(component) === false) {
                    const m = this.componentMap();
                    const cmp = component in m ? m[component] : null;
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
                        width: "w-full",
                    };
                }
            }
        } catch (e) {
            return null;
        }
    },
    config: function (component, data = {}) {
        if (component) {
            const requiredFields = {
                type: { value: "text" },
                required: { value: false },
                options: { value: [] },
                defaultValue: { value: "" },
            };

            // get the component configuration from the map
            const components = ComponentManager.map();
            if (component in components) {
                // let c = deepCopy(components['component']);
                let c = JSON.parse(JSON.stringify(components[component]));

                // tack on the component name
                c["component"] = component;

                // if no userConfig key. let's add it for the next step
                if ("userConfig" in c === false) {
                    c["userConfig"] = {};
                }

                // if (isLayout === false) {
                let userPrefs = {};
                // now we can make sure the configuration is "complete"
                if ("userConfig" in c) {
                    Object.keys(c["userConfig"]).forEach((key) => {
                        // check the required fields!
                        Object.keys(requiredFields).forEach((k) => {
                            if (k in c["userConfig"][key]) {
                                if (k in c["userConfig"][key] === false) {
                                    c["userConfig"][key] =
                                        requiredFields[k]["value"];
                                }
                            }
                        });
                        // set the user preferences
                        userPrefs[key] = ComponentManager.userPrefsForItem(
                            "userPrefs" in data ? data : c,
                            key,
                            c["userConfig"][key]
                        );
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
                    eventHandlers:
                        "eventHandlers" in c ? c["eventHandlers"] : [],
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
    userPrefsForItem: function (item, key, config) {
        try {
            let prefsForItem = {};
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
                prefsForItem =
                    "defaultValue" in config ? config["defaultValue"] : "";
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
    isLayoutContainer: function (component) {
        return component === "LayoutContainer" || component === "Container";
    },
};
