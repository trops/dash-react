import { Dashboard } from "./Dashboard";
import { MockDashboard, mock } from "@dash";
import "@dash/tailwind.css";
import { MockDashboardApi } from "../Api/MockDashboardApi";

//👇 This default export determines where your story goes in the story list
export default {
    title: "Dashboard",
    component: Dashboard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    // const workspaces = mock.api.workspace.listWorkspacesForApplication();
    // console.log("workspaces ", workspaces["workspaces"][0]);
    return (
        <div className="flex flex-col h-full w-full">
            <MockDashboard
                api={mock.api}
                theme={mock.theme}
                args={args}
                backgroundColor={"bg-gray-900"}
            >
                <Dashboard dashApi={new MockDashboardApi(mock.api)} {...args} />
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
