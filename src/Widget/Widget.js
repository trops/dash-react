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

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log("WIDGET - version change", version);
        updateApi();
        forceUpdate();
    }, [version]);

    useEffect(() => {
        const firstRender = ref.current;
        console.log("use effect in Widget ", props);
        // curious if we should register the listeners here?
        // inject the publisher into the api for the developer to use

        updateApi();
    }, [props, pub]);

    function updateApi() {
        const firstRender = ref.current;
        console.log("use effect in Widget ", props);
        // curious if we should register the listeners here?
        // inject the publisher into the api for the developer to use

        if ("api" in props && firstRender) {
            if (props["api"] !== null) {
                if (props["api"].pub() === null) {
                    console.log("need to set pub", props);
                    props["api"].setPublisher(pub);
                }
                if (props["api"].electronApi() === null) {
                    console.log("need to set electronApi");
                    props["api"].setElectronApi(api);
                }
                if (props["api"].settings() === null) {
                    console.log("need to set settings");
                    settings !== null && props["api"].setSettings(settings);
                }

                if (
                    firstRender &&
                    props["api"].electronApi() &&
                    props["api"].pub() !== null
                ) {
                    console.log("rendered once...");
                    ref.current = false;
                    forceUpdate();
                }
            }
        }
    }
    function debugClasses() {
        // const styles = debugStyles['widget']['classes'];
        // return debugMode === true ? `space-y-4 p-4 ${styles}` : ''
        return "";
    }

    return (
        <LayoutContainer
            id={`widget-container'-${uuid}`}
            direction={direction}
            scrollable={scrollable}
            width={width}
            height={height}
            className={`${className}`}
        >
            {debugMode === true && (
                <span className="text-white uppercase text-xs">
                    WIDGET{" "}
                    {scrollable === true ? "scrollable" : "not scrollable"}
                </span>
            )}
            {children}
        </LayoutContainer>
    );
};

export { Widget };
