import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";
import { AppContext } from "./App/AppContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";

export const DashboardWrapper = ({ children }) => {
    const { api } = useContext(AppContext);

    function buildWidgetApi() {
        const w = WidgetApi;
        w.setPublisher(DashboardPublisher);
        w.setElectronApi(api);
        return w;
    }

    function getValue() {
        return {
            widgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
        };
    }

    return (
        <DashboardContext.Provider value={getValue()}>
            {children}
        </DashboardContext.Provider>
    );
};
