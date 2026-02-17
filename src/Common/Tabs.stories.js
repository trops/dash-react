import { useState } from "react";
import { Tabs, Tabs2, Tabs3 } from "./Tabs";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Tabs",
    component: Tabs,
};

export const Primary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Tabs defaultValue="account">
                <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">
                    <p>Manage your account settings and preferences.</p>
                </Tabs.Content>
                <Tabs.Content value="password">
                    <p>Change your password and security options.</p>
                </Tabs.Content>
                <Tabs.Content value="settings">
                    <p>Configure application settings.</p>
                </Tabs.Content>
            </Tabs>
        </div>
    </MockWrapper>
);

export const Secondary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Tabs2 defaultValue="overview">
                <Tabs2.List>
                    <Tabs2.Trigger value="overview">Overview</Tabs2.Trigger>
                    <Tabs2.Trigger value="analytics">Analytics</Tabs2.Trigger>
                    <Tabs2.Trigger value="reports">Reports</Tabs2.Trigger>
                </Tabs2.List>
                <Tabs2.Content value="overview">
                    <p>Dashboard overview with key metrics.</p>
                </Tabs2.Content>
                <Tabs2.Content value="analytics">
                    <p>Detailed analytics and charts.</p>
                </Tabs2.Content>
                <Tabs2.Content value="reports">
                    <p>Generated reports and exports.</p>
                </Tabs2.Content>
            </Tabs2>
        </div>
    </MockWrapper>
);

export const Tertiary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Tabs3 defaultValue="tab1">
                <Tabs3.List>
                    <Tabs3.Trigger value="tab1">Tab 1</Tabs3.Trigger>
                    <Tabs3.Trigger value="tab2">Tab 2</Tabs3.Trigger>
                    <Tabs3.Trigger value="tab3">Tab 3</Tabs3.Trigger>
                </Tabs3.List>
                <Tabs3.Content value="tab1">
                    <p>Compact tab content for dense layouts.</p>
                </Tabs3.Content>
                <Tabs3.Content value="tab2">
                    <p>Second tab content panel.</p>
                </Tabs3.Content>
                <Tabs3.Content value="tab3">
                    <p>Third tab content panel.</p>
                </Tabs3.Content>
            </Tabs3>
        </div>
    </MockWrapper>
);

export const Controlled = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="p-4 max-w-lg">
                <p className="text-sm mb-2">
                    Active tab: <strong>{activeTab}</strong>
                </p>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">First</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Second</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Third</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">
                        <p>Controlled tab 1 content.</p>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <p>Controlled tab 2 content.</p>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <p>Controlled tab 3 content.</p>
                    </Tabs.Content>
                </Tabs>
            </div>
        </MockWrapper>
    );
};

export const WithDisabledTab = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Tabs defaultValue="active">
                <Tabs.List>
                    <Tabs.Trigger value="active">Active</Tabs.Trigger>
                    <Tabs.Trigger value="disabled" disabled>
                        Disabled
                    </Tabs.Trigger>
                    <Tabs.Trigger value="another">Another</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="active">
                    <p>This tab is active.</p>
                </Tabs.Content>
                <Tabs.Content value="another">
                    <p>Another active tab.</p>
                </Tabs.Content>
            </Tabs>
        </div>
    </MockWrapper>
);

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4 max-w-lg">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">Tabs (Large)</h3>
                <Tabs defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">
                        <p>Large variant tab content.</p>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <p>Password settings here.</p>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <p>Application settings.</p>
                    </Tabs.Content>
                </Tabs>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">Tabs2 (Medium)</h3>
                <Tabs2 defaultValue="tab1">
                    <Tabs2.List>
                        <Tabs2.Trigger value="tab1">Overview</Tabs2.Trigger>
                        <Tabs2.Trigger value="tab2">Details</Tabs2.Trigger>
                        <Tabs2.Trigger value="tab3">History</Tabs2.Trigger>
                    </Tabs2.List>
                    <Tabs2.Content value="tab1">
                        <p>Medium variant tab content.</p>
                    </Tabs2.Content>
                    <Tabs2.Content value="tab2">
                        <p>Detail information.</p>
                    </Tabs2.Content>
                    <Tabs2.Content value="tab3">
                        <p>History log.</p>
                    </Tabs2.Content>
                </Tabs2>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">Tabs3 (Small)</h3>
                <Tabs3 defaultValue="tab1">
                    <Tabs3.List>
                        <Tabs3.Trigger value="tab1">A</Tabs3.Trigger>
                        <Tabs3.Trigger value="tab2">B</Tabs3.Trigger>
                        <Tabs3.Trigger value="tab3">C</Tabs3.Trigger>
                    </Tabs3.List>
                    <Tabs3.Content value="tab1">
                        <p>Small compact variant.</p>
                    </Tabs3.Content>
                    <Tabs3.Content value="tab2">
                        <p>Tab B content.</p>
                    </Tabs3.Content>
                    <Tabs3.Content value="tab3">
                        <p>Tab C content.</p>
                    </Tabs3.Content>
                </Tabs3>
            </div>
        </div>
    </MockWrapper>
);
