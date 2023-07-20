import { Dashboard } from "./Dashboard";
import { MockDashboard, mock } from "@dash";
import "@dash/tailwind.css";
import { MockDashboardApi } from "../Api/MockDashboardApi";

/**
 * NOTE
 *
 * To instantiate the Dashboard, you MUST pass in a flavor of the API
 * - ElectronDashboardApi
 * - MockDashboardApi
 * - WebDashboardApi
 */
//
//👇 This default export determines where your story goes in the story list
export default {
    title: "Dashboard",
    component: Dashboard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <div className="flex flex-col h-full w-full">
            <MockDashboard args={args} backgroundColor={"bg-gray-900"}>
                <Dashboard
                    dashApi={new MockDashboardApi(mock.api)}
                    credentials={{ appId: "ZHSCSP4LMX" }}
                    {...args}
                />
            </MockDashboard>
        </div>
    );
};

export const DashboardTest = Template.bind({});

DashboardTest.args = {
    preview: true,
    backgroundColor: "bg-gray-800",
    height: "h-full",
};

DashboardTest.parameters = {
    layout: "fullscreen",
};
