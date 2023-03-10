import React, { useContext } from "react";
import { AppContext } from "@dash/Context/App/AppContext";
import { DashboardContext } from "@dash/Context/DashboardContext";
import { LayoutContainer } from "@dash/Layout";

const Widget = ({ id, uuid, children, height, width, scrollable = true, direction = "col", className = '', ...props}) => {

    const { debugMode, debugStyles, api } = useContext(AppContext);
    const { pub, settings } = useContext(DashboardContext);

    function debugClasses() {
        // const styles = debugStyles['widget']['classes'];
        // return debugMode === true ? `space-y-4 p-4 ${styles}` : ''
    }

    // inject the publisher into the api for the developer to use
    if ('api' in props) {
        props['api'].setPublisher(pub);
        props['api'].setElectronApi(api);
        props['api'].setSettings(settings);
    }
    
    return (
        <LayoutContainer id={`widget-container'-${uuid}`} direction={direction} scrollable={scrollable} width={width} height={height} className={`${debugClasses()} ${className}`}>
            {debugMode === true && (<span className="text-white uppercase text-xs">WIDGET {scrollable === true ? 'scrollable':'not scrollable'}</span>)}
            {children}
        </LayoutContainer>
    );
}

export { Widget };