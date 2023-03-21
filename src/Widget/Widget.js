import React, { useContext, useEffect, useRef } from "react";
import { AppContext, DashboardContext } from "@dash/Context";
import { LayoutContainer } from "@dash/Layout";

const Widget = ({
    id,
    uuid,
    children,
    height = "h-full",
    width = "w-full",
    scrollable = true,
    direction = "col",
    className = "",
    version = 1,
    ...props
}) => {
    const ref = useRef(true);
    // this is the electron api we are pulling in...
    const { debugMode, debugStyles, api } = useContext(AppContext);
    const { pub, settings } = useContext(DashboardContext);
    // const { widgetApi } = props;

    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);

    // useEffect(() => {
    //     console.log("WIDGET - version change", version);
    //     //updateApi();
    // }, [version]);

    // useEffect(() => {
    //     const firstRender = ref.current;
    //     console.log("use effect in Widget ", props, widgetApi);
    //     // curious if we should register the listeners here?
    //     // inject the publisher into the api for the developer to use

    //     // updateApi();
    // }, [props, pub]);

    // function minifyElectronApi() {
    //     return {
    //         ...api,
    //     };
    // }

    // function updateApi() {
    //     const firstRender = ref.current;
    //     console.log("use effect in Widget ", props);
    //     // curious if we should register the listeners here?
    //     // inject the publisher into the api for the developer to use

    //     if (widgetApi && firstRender) {
    //         if (widgetApi !== null) {
    //             if (widgetApi.pub() === null) {
    //                 console.log("need to set pub", props);
    //                 widgetApi.setPublisher(pub);
    //             }
    //             if (widgetApi.electronApi() === null) {
    //                 console.log("need to set electronApi");
    //                 widgetApi.setElectronApi(api);
    //             }
    //             if (widgetApi.settings() === null) {
    //                 console.log("need to set settings");
    //                 settings !== null && widgetApi.setSettings(settings);
    //             }

    //             if (
    //                 firstRender &&
    //                 widgetApi.electronApi() &&
    //                 widgetApi.pub() !== null
    //             ) {
    //                 console.log("rendered once...");
    //                 ref.current = false;
    //                 forceUpdate();
    //             }
    //         }
    //     }
    // }

    function debugClasses() {
        // const styles = debugStyles['widget']['classes'];
        // return debugMode === true ? `space-y-4 p-4 ${styles}` : ''
        return "";
    }

    return (
        <LayoutContainer
            id={`widget-container'-${uuid}-${version}`}
            direction={direction}
            scrollable={scrollable}
            width={width}
            height={height}
            className={`${className}`}
            version={version}
            key={`widget-container'-${uuid}-${version}`}
        >
            {/* <WidgetContext.Provider
                value={{ widgetApi: minifyElectronApi(), pub, settings }}
            > */}
            {debugMode === true && (
                <span className="text-white uppercase text-xs">
                    WIDGET{" "}
                    {scrollable === true ? "scrollable" : "not scrollable"}
                </span>
            )}
            {children}
            {/* </WidgetContext.Provider> */}
        </LayoutContainer>
    );
};

export { Widget };
