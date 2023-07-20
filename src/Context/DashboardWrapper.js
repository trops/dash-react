import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";
import { AppContext } from "./App/AppContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";
import { AppWrapper } from "./App/AppWrapper";
import { ThemeWrapper } from "./ThemeWrapper";

export const DashboardWrapper = ({ dashApi, credentials, children }) => {
    //const { api } = useContext(AppContext);

    function buildWidgetApi() {
        const w = WidgetApi;
        w.setPublisher(DashboardPublisher);
        w.setElectronApi(dashApi);
        return w;
    }

    function getValue() {
        console.log({
            widgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
            dashApi,
            credentials,
        });
        return {
            widgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
            dashApi,
            credentials,
        };
    }

    return (
        <AppWrapper dashApi={dashApi} credentials={credentials}>
            <ThemeWrapper>
                <DashboardContext.Provider value={getValue()}>
                    {children}
                </DashboardContext.Provider>
            </ThemeWrapper>
        </AppWrapper>
    );
};
