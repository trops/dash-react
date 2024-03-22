import { DashboardContext } from "./DashboardContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";
import { AppWrapper } from "./App/AppWrapper";
import { ThemeWrapper } from "./ThemeWrapper";
import { MainSection } from "../Common";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const DashboardWrapper = ({ dashApi, credentials, children }) => {
    // use the contexts to pass through any information
    const { currentTheme } = useContext(ThemeContext);

    function buildWidgetApi() {
        console.log("building widget api ", dashApi);

        const w = WidgetApi;
        w.setPublisher(DashboardPublisher);
        w.setElectronApi(dashApi);
        return w;
    }

    function getValue() {
        // console.log("dashboard wrapper ", {
        //     widgetApi: buildWidgetApi(),
        //     pub: DashboardPublisher,
        //     dashApi,
        //     credentials,
        // });
        return {
            widgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
            dashApi,
            credentials,
        };
    }

    return (
        <AppWrapper dashApi={dashApi} credentials={credentials}>
            <ThemeWrapper dashApi={dashApi} credentials={credentials}>
                <div className="flex flex-col w-screen h-screen overflow-hidden justify-between p-0">
                    <MainSection>
                        <DashboardContext.Provider value={getValue()}>
                            {children}
                            {currentTheme && JSON.stringify(currentTheme)}
                        </DashboardContext.Provider>
                    </MainSection>
                </div>
            </ThemeWrapper>
        </AppWrapper>
    );
};
