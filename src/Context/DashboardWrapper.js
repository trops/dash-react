import { DashboardContext } from "./DashboardContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";
import { AppWrapper } from "./App/AppWrapper";
import { ThemeWrapper } from "./ThemeWrapper";
import { MainSection } from "../Common";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { AppContext } from "./App/AppContext";

export const DashboardWrapper = ({
    dashApi,
    credentials,
    backgroundColor = null,
    children,
}) => {
    // use the contexts to pass through any information
    const { currentTheme } = useContext(ThemeContext);
    const appContext = useContext(AppContext);

    function buildWidgetApi() {
        console.log("building widget api ", dashApi);

        const w = WidgetApi;
        w.setPublisher(DashboardPublisher);
        w.setElectronApi(dashApi);
        return w;
    }

    function getValue() {
        return {
            widgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
            dashApi,
            credentials,
            providers: appContext?.providers || {},
        };
    }

    return (
        <AppWrapper dashApi={dashApi} credentials={credentials}>
            <ThemeWrapper dashApi={dashApi} credentials={credentials}>
                <div className="flex flex-col w-screen h-screen overflow-clip justify-between p-0">
                    <MainSection backgroundColor={backgroundColor}>
                        <DashboardContext.Provider value={getValue()}>
                            {children}
                            {/* {currentTheme && JSON.stringify(currentTheme)} */}
                        </DashboardContext.Provider>
                    </MainSection>
                </div>
            </ThemeWrapper>
        </AppWrapper>
    );
};
