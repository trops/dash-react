import { DashboardContext } from "./DashboardContext";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";

export const DashboardWrapper = () => {
    const { api } = useContext(AppContext);

    function buildWidgetApi() {
        const w = WidgetApi;
        w.setPublisher(DashboardPublisher);
        return w;
    }

    function getValue() {
        return {
            WidgetApi: buildWidgetApi(),
            pub: DashboardPublisher,
        };
    }

    return (
        <DashboardContext.Provider value={getValue()}>
            {children}
        </DashboardContext.Provider>
    );
};
