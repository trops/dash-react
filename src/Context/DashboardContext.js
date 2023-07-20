import { createContext } from "react";
import { DashboardPublisher } from "@dash/Dashboard";
import { WidgetApi } from "@dash/Api";

function buildWidgetApi() {
    const w = WidgetApi;
    w.setPublisher(DashboardPublisher);
    return w;
}

export const DashboardContext = createContext({
    pub: DashboardPublisher,
    widgetApi: buildWidgetApi(),
    dashApi: null,
});
