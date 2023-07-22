import { DashboardContext } from "./DashboardContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";
import { AppWrapper } from "./App/AppWrapper";
import { ThemeWrapper } from "./ThemeWrapper";
import { MainSection } from "../Common";

export const DashboardWrapper = ({ dashApi, credentials, children }) => {
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
            <ThemeWrapper dashApi={dashApi} credentials={credentials}>
                <div className="flex flex-col w-screen h-screen overflow-hidden justify-between p-0">
                    <MainSection>
                        <DashboardContext.Provider value={getValue()}>
                            {children}
                        </DashboardContext.Provider>
                    </MainSection>
                </div>
            </ThemeWrapper>
        </AppWrapper>
    );
};
