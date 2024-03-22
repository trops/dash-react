/**
 * WidgetFactory
 * Get the "component" and params and dynamically generate the Component
 */
import React, { useContext } from "react";
import { LayoutContainer } from "@dash/Layout";
import { ComponentManager } from "@dash";
import { DashboardContext } from "../Context";
import { WidgetHelpers } from "../Api/WidgetHelpers";
import { WidgetApi } from "../Api/WidgetApi";

// const helpers = {
//     params: null,
//     init: function (params) {
//         this.params = params;
//     },
//     listen: function () {
//         console.log("hello", this.params);
//     },
//     publishEvent: function (eventName) {
//         console.log("publish helpers event ", eventName, this.params.id);
//     },
// };

const WidgetFactory = {
    getComponent: (component) => {
        try {
            return ComponentManager.getComponent(component);
        } catch (e) {
            return null;
        }
    },
    render: (component, key, params = {}, children = null) => {
        try {
            const m = ComponentManager.componentMap();

            // pull in the widgetAPI in order to initialize it
            // with the widget parameters specific to the widget being rendered
            const { dashApi } = useContext(DashboardContext);

            if (component && m) {
                const isLayout = ComponentManager.isLayoutContainer(component);
                // grab the component from the map
                const WidgetComponent =
                    isLayout === false
                        ? m[component]["component"]
                        : LayoutContainer;

                // get the config details from the .dash file
                const config = ComponentManager.config(component, params);

                // and set the styles from the config if they exist
                const styles = "styles" in config ? config["styles"] : null;

                // user input for the customization of the widget
                const userPrefs = params["userPrefs"];

                // Check to make sure this is a Component
                if (typeof WidgetComponent !== "function") return null;

                if (isLayout === false) {
                    params["width"] = "w-full";
                }

                if ("width" in params === false) {
                    params["width"] = "w-full";
                }

                params["componentName"] = component;

                // init will inject the params from the widget into the widgetAPI
                // widgetApi.init(params);

                let bgColor = "";
                if (styles !== null) {
                    bgColor =
                        "backgroundColor" in styles
                            ? styles["backgroundColor"]
                            : "";
                }

                // need to set the electron api here.
                const w = WidgetApi;
                w.setElectronApi(dashApi);

                // init the helpers
                const helpers = new WidgetHelpers(params, w);

                return children === null ? (
                    <WidgetComponent
                        id={`widget-nokids-${key}`}
                        key={`widget-nokids-${key}`}
                        listen={(listeners, handlers) =>
                            helpers.listen(listeners, handlers)
                        }
                        publishEvent={(eventName, payload) =>
                            helpers.publishEvent(eventName, payload)
                        }
                        api={w}
                        {...params}
                        {...userPrefs}
                        backgroundColor={bgColor}
                    />
                ) : (
                    <WidgetComponent
                        listen={(listeners, handlers) =>
                            helpers.listen(listeners, handlers)
                        }
                        publishEvent={(eventName, payload) =>
                            helpers.publishEvent(eventName, payload)
                        }
                        api={widgetApi}
                        id={`widget-kids-${key}`}
                        key={`widget-kids-${key}`}
                        {...params}
                        {...userPrefs}
                        backgroundColor={bgColor}
                    >
                        {children}
                        {/* {WidgetFactory.renderChildren(children)} */}
                    </WidgetComponent>
                );
            }
        } catch (e) {
            console.log(e.message);
            return null;
        }
    },
    renderChildren: (children) => {
        return React.Children.map(children, (el) => {
            return el;
            // const clonedComponent = React.cloneElement(el);
            // return clonedComponent;
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
    config: (component) => {
        if (component) {
            const isLayout = ComponentManager.isLayoutContainer(component);

            const requiredFields = {
                type: { value: "text" },
                required: { value: false },
                options: { value: [] },
                defaultValue: { value: "" },
                events: [], // events that will be published
            };

            // get the component configuration from the map
            const components = ComponentManager.map();

            // let c = deepCopy(components['component']);
            let c = JSON.parse(JSON.stringify(components[component]));
            c["component"] = component;

            if ("userConfig" in c === false) {
                c["userConfig"] = {};
                return c;
            }

            let userPrefs = {};
            // now we can make sure the configuration is "complete"
            Object.keys(c["userConfig"]).forEach((key) => {
                // check the required fields!
                Object.keys(requiredFields).forEach((k) => {
                    if (k in c["userConfig"][key] === false) {
                        c["userConfig"][key][k] = requiredFields[k]["value"];
                    }
                });
                // tack on the user preferences
                userPrefs[key] = WidgetFactory.userPrefsForItem(
                    c,
                    key,
                    c["userConfig"][key]
                );
            });

            c["userPrefs"] = userPrefs;

            return c;
        }
        return null;
    },

    workspace: (component) => {
        const components = WidgetFactory.map();
        if (component !== undefined && components) {
            if (component in components) {
                const c = components[component];
                if ("workspace" in c) {
                    return c["workspace"];
                }
            }
        }
        return null;
    },

    map: () => ComponentManager.map(),

    /**
     * userConfig
     * We want to make sure all of the keys are available, and if not, set defaults...
     * @param {object} config the current configuration object
     * @returns
     */
    userPrefsForItem: (item, key, config) => {
        try {
            // console.log('value: ', item['userPrefs'][key]);
            // console.log('user prefs config item ', item, key, config);

            let prefsForItem = {};
            if ("userPrefs" in item) {
                if (key in item["userPrefs"]) {
                    prefsForItem = { [key]: item["userPrefs"][key] };
                } else {
                    if ("defaultValue" in config) {
                        prefsForItem = { [key]: config["defaultValue"] };
                    }
                }
            } else {
                // no user preferences in the item yet so we can try and set the defaults.
                // console.log('config item ', config);
                prefsForItem[key] =
                    "defaultValue" in config ? config["defaultValue"] : "";
            }

            // console.log('config item prefs ', prefsForItem);
            return prefsForItem;
        } catch (e) {
            return {};
        }
    },
};

export { WidgetFactory };
