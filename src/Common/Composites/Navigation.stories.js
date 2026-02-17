import { useState } from "react";
import { mock, MockWrapper } from "../../Mock";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { TabbedNavbar } from "./TabbedNavbar";
import { Panel2 } from "../Panel";
import { Button2, Button3 } from "../Button";
import { SubHeading2, SubHeading3 } from "../Text/Heading";
import { Paragraph2, Paragraph3 } from "../Text/Paragraph";
import { InputText } from "../Input/InputText";
import { SearchInput } from "../Input/SearchInput";
import { Tag2 } from "../Tag";
import { FormField } from "./FormField";

import "../../tailwind.css";

export default {
    title: "Composites/Navigation",
};

// ─── SVG Icons (inline to avoid FontAwesome dependency in stories) ──────────────

const IconHome = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

const IconLayout = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
    </svg>
);

const IconChart = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
    </svg>
);

const IconSettings = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const IconUsers = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const IconBell = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
    </svg>
);

const IconPlug = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
    </svg>
);

const IconUser = () => (
    <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);

// ─── Story 1: Sidebar ──────────────────────────────────────────────────────────

export const SidebarDemo = () => {
    const [active, setActive] = useState("dashboard");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex flex-row" style={{ height: 500 }}>
                <Sidebar>
                    <Sidebar.Header>
                        <div className="flex items-center gap-2 px-1">
                            <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                D
                            </div>
                            <span className="font-semibold text-sm">
                                Dash App
                            </span>
                        </div>
                    </Sidebar.Header>

                    <Sidebar.Content>
                        <Sidebar.Group label="Navigation">
                            <Sidebar.Item
                                icon={<IconHome />}
                                active={active === "dashboard"}
                                onClick={() => setActive("dashboard")}
                            >
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconLayout />}
                                active={active === "widgets"}
                                onClick={() => setActive("widgets")}
                                badge="12"
                            >
                                Widgets
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconChart />}
                                active={active === "analytics"}
                                onClick={() => setActive("analytics")}
                            >
                                Analytics
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconPlug />}
                                active={active === "providers"}
                                onClick={() => setActive("providers")}
                                badge="3"
                            >
                                Providers
                            </Sidebar.Item>
                        </Sidebar.Group>

                        <Sidebar.Group label="System">
                            <Sidebar.Item
                                icon={<IconUsers />}
                                active={active === "users"}
                                onClick={() => setActive("users")}
                            >
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconSettings />}
                                active={active === "settings"}
                                onClick={() => setActive("settings")}
                            >
                                Settings
                            </Sidebar.Item>
                        </Sidebar.Group>
                    </Sidebar.Content>

                    <Sidebar.Footer>
                        <Sidebar.Item icon={<IconUser />}>John G.</Sidebar.Item>
                    </Sidebar.Footer>
                </Sidebar>

                {/* Main content */}
                <div className="flex-1 p-6">
                    <SubHeading2
                        title={active.charAt(0).toUpperCase() + active.slice(1)}
                        padding={false}
                    />
                    <Paragraph2
                        text={`You are viewing the ${active} section.`}
                        className="mt-2 opacity-60"
                    />
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story 2: Collapsible Sidebar ──────────────────────────────────────────────

export const SidebarCollapsible = () => {
    const [active, setActive] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex flex-row" style={{ height: 500 }}>
                <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
                    <Sidebar.Header>
                        <div className="flex items-center justify-between">
                            {!collapsed && (
                                <div className="flex items-center gap-2 px-1">
                                    <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                        D
                                    </div>
                                    <span className="font-semibold text-sm">
                                        Dash
                                    </span>
                                </div>
                            )}
                            <Sidebar.Trigger />
                        </div>
                    </Sidebar.Header>

                    <Sidebar.Content>
                        <Sidebar.Item
                            icon={<IconHome />}
                            active={active === "dashboard"}
                            onClick={() => setActive("dashboard")}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={<IconLayout />}
                            active={active === "widgets"}
                            onClick={() => setActive("widgets")}
                            badge="12"
                        >
                            Widgets
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={<IconChart />}
                            active={active === "analytics"}
                            onClick={() => setActive("analytics")}
                        >
                            Analytics
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={<IconPlug />}
                            active={active === "providers"}
                            onClick={() => setActive("providers")}
                        >
                            Providers
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={<IconSettings />}
                            active={active === "settings"}
                            onClick={() => setActive("settings")}
                        >
                            Settings
                        </Sidebar.Item>
                    </Sidebar.Content>

                    <Sidebar.Footer>
                        <Sidebar.Item icon={<IconUser />}>John G.</Sidebar.Item>
                    </Sidebar.Footer>
                </Sidebar>

                <div className="flex-1 p-6">
                    <SubHeading2
                        title={active.charAt(0).toUpperCase() + active.slice(1)}
                        padding={false}
                    />
                    <Paragraph2
                        text="Click the collapse toggle in the sidebar header to see it shrink to icon-only mode."
                        className="mt-2 opacity-60"
                    />
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story 3: Navbar ────────────────────────────────────────────────────────────

export const NavbarDemo = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ width: "100%" }}>
                <Navbar>
                    <Navbar.Brand>
                        <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            D
                        </div>
                        <span className="font-semibold text-sm">Dash</span>
                    </Navbar.Brand>

                    <Navbar.Content>
                        <Button3 title="Dashboard" onClick={() => {}} />
                        <Button3 title="Widgets" onClick={() => {}} />
                        <Button3 title="Analytics" onClick={() => {}} />
                        <Button3 title="Providers" onClick={() => {}} />
                    </Navbar.Content>

                    <Navbar.Actions>
                        <SearchInput placeholder="Search..." className="w-48" />
                        <Navbar.Divider />
                        <button
                            type="button"
                            className="p-2 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <IconBell />
                        </button>
                        <div className="h-7 w-7 rounded-full bg-gray-600 flex items-center justify-center">
                            <IconUser />
                        </div>
                    </Navbar.Actions>
                </Navbar>

                {/* Page content below */}
                <div className="p-6">
                    <SubHeading2 title="Dashboard" padding={false} />
                    <Paragraph2
                        text="Navbar provides Brand (left), Content (center), and Actions (right) slots."
                        className="mt-2 opacity-60"
                    />
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story 4: Navbar with Sidebar ───────────────────────────────────────────────

export const NavbarWithSidebar = () => {
    const [active, setActive] = useState("dashboard");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div
                className="flex flex-col"
                style={{ height: 500, width: "100%" }}
            >
                <Navbar height="h-12">
                    <Navbar.Brand>
                        <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            D
                        </div>
                        <span className="font-semibold text-sm">Dash</span>
                        <Tag2 text="v2.1" />
                    </Navbar.Brand>

                    <Navbar.Content align="end">
                        <SearchInput
                            placeholder="Search widgets..."
                            className="w-56"
                        />
                    </Navbar.Content>

                    <Navbar.Actions>
                        <button
                            type="button"
                            className="p-1.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <IconBell />
                        </button>
                        <button
                            type="button"
                            className="p-1.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <IconSettings />
                        </button>
                    </Navbar.Actions>
                </Navbar>

                <div className="flex flex-row flex-1 overflow-hidden">
                    <Sidebar width="w-48">
                        <Sidebar.Content>
                            <Sidebar.Item
                                icon={<IconHome />}
                                active={active === "dashboard"}
                                onClick={() => setActive("dashboard")}
                            >
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconLayout />}
                                active={active === "widgets"}
                                onClick={() => setActive("widgets")}
                            >
                                Widgets
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconChart />}
                                active={active === "analytics"}
                                onClick={() => setActive("analytics")}
                            >
                                Analytics
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconPlug />}
                                active={active === "providers"}
                                onClick={() => setActive("providers")}
                            >
                                Providers
                            </Sidebar.Item>
                        </Sidebar.Content>
                    </Sidebar>

                    <div className="flex-1 p-6 overflow-y-auto">
                        <SubHeading2
                            title={
                                active.charAt(0).toUpperCase() + active.slice(1)
                            }
                            padding={false}
                        />
                        <Paragraph2
                            text="A common dashboard layout: top Navbar for global actions + side Sidebar for navigation."
                            className="mt-2 opacity-60"
                        />
                    </div>
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story 5: Tabbed Navbar ─────────────────────────────────────────────────────

export const TabbedNavbarDemo = () => {
    const [name, setName] = useState("CPU Monitor");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ width: "100%" }}>
                <TabbedNavbar defaultValue="overview">
                    <TabbedNavbar.Brand>
                        <span className="font-semibold text-sm px-2">
                            Widget Editor
                        </span>
                    </TabbedNavbar.Brand>

                    <TabbedNavbar.Tab value="overview">
                        Overview
                    </TabbedNavbar.Tab>
                    <TabbedNavbar.Tab value="config">
                        Configuration
                    </TabbedNavbar.Tab>
                    <TabbedNavbar.Tab value="data">
                        Data Sources
                    </TabbedNavbar.Tab>
                    <TabbedNavbar.Tab value="style" disabled>
                        Styling
                    </TabbedNavbar.Tab>

                    <TabbedNavbar.Actions>
                        <Button3 title="Discard" onClick={() => {}} />
                        <Button2 title="Save" onClick={() => {}} />
                    </TabbedNavbar.Actions>

                    <TabbedNavbar.Content value="overview">
                        <div className="p-6 space-y-4">
                            <SubHeading3
                                title="Widget Overview"
                                padding={false}
                            />
                            <Paragraph2 text="The CPU Monitor widget tracks real-time CPU utilization across all connected providers. It supports sparkline charts, threshold alerts, and historical data export." />
                            <div className="flex gap-4">
                                <Panel2
                                    border={true}
                                    scrollable={false}
                                    height="h-auto"
                                    className="w-40"
                                >
                                    <Paragraph3
                                        text="AVG USAGE"
                                        className="font-semibold uppercase tracking-wider opacity-60"
                                        padding={false}
                                    />
                                    <div className="text-2xl font-bold mt-2">
                                        42%
                                    </div>
                                </Panel2>
                                <Panel2
                                    border={true}
                                    scrollable={false}
                                    height="h-auto"
                                    className="w-40"
                                >
                                    <Paragraph3
                                        text="PEAK"
                                        className="font-semibold uppercase tracking-wider opacity-60"
                                        padding={false}
                                    />
                                    <div className="text-2xl font-bold mt-2">
                                        87%
                                    </div>
                                </Panel2>
                            </div>
                        </div>
                    </TabbedNavbar.Content>

                    <TabbedNavbar.Content value="config">
                        <div
                            className="p-6 space-y-4"
                            style={{ maxWidth: 480 }}
                        >
                            <SubHeading3
                                title="Configuration"
                                padding={false}
                            />
                            <FormField label="Widget Name" required={true}>
                                <InputText
                                    value={name}
                                    onChange={setName}
                                    placeholder="Widget name"
                                />
                            </FormField>
                            <FormField label="Refresh Interval">
                                <InputText
                                    value="30"
                                    onChange={() => {}}
                                    placeholder="Seconds"
                                    type="number"
                                />
                            </FormField>
                        </div>
                    </TabbedNavbar.Content>

                    <TabbedNavbar.Content value="data">
                        <div className="p-6 space-y-3">
                            <SubHeading3
                                title="Connected Data Sources"
                                padding={false}
                            />
                            <Paragraph2
                                text="No data sources configured yet. Add a provider to start collecting CPU metrics."
                                className="opacity-60"
                            />
                            <Button2 title="Add Provider" onClick={() => {}} />
                        </div>
                    </TabbedNavbar.Content>
                </TabbedNavbar>
            </div>
        </MockWrapper>
    );
};

// ─── Story 6: Full App Layout ──────────────────────────────────────────────────

export const FullAppLayout = () => {
    const [active, setActive] = useState("widgets");
    const [tab, setTab] = useState("all");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div
                className="flex flex-col"
                style={{ height: 550, width: "100%" }}
            >
                {/* Top navbar */}
                <Navbar height="h-11">
                    <Navbar.Brand>
                        <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            D
                        </div>
                        <span className="font-semibold text-sm">Dash</span>
                    </Navbar.Brand>
                    <Navbar.Content align="end">
                        <SearchInput placeholder="Search..." className="w-48" />
                    </Navbar.Content>
                    <Navbar.Actions>
                        <button
                            type="button"
                            className="p-1.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <IconBell />
                        </button>
                    </Navbar.Actions>
                </Navbar>

                <div className="flex flex-row flex-1 overflow-hidden">
                    {/* Left sidebar */}
                    <Sidebar width="w-44">
                        <Sidebar.Content>
                            <Sidebar.Item
                                icon={<IconHome />}
                                active={active === "home"}
                                onClick={() => setActive("home")}
                            >
                                Home
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconLayout />}
                                active={active === "widgets"}
                                onClick={() => setActive("widgets")}
                            >
                                Widgets
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconPlug />}
                                active={active === "providers"}
                                onClick={() => setActive("providers")}
                            >
                                Providers
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={<IconSettings />}
                                active={active === "settings"}
                                onClick={() => setActive("settings")}
                            >
                                Settings
                            </Sidebar.Item>
                        </Sidebar.Content>
                    </Sidebar>

                    {/* Main content with tabbed sub-nav */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <TabbedNavbar
                            value={tab}
                            onValueChange={setTab}
                            height="h-10"
                            padding="px-4"
                        >
                            <TabbedNavbar.Tab value="all">
                                All Widgets
                            </TabbedNavbar.Tab>
                            <TabbedNavbar.Tab value="active">
                                Active
                            </TabbedNavbar.Tab>
                            <TabbedNavbar.Tab value="drafts">
                                Drafts
                            </TabbedNavbar.Tab>

                            <TabbedNavbar.Actions>
                                <Button2
                                    title="New Widget"
                                    size="sm"
                                    onClick={() => {}}
                                />
                            </TabbedNavbar.Actions>

                            <TabbedNavbar.Content value="all">
                                <div className="p-4 space-y-3">
                                    <Paragraph2
                                        text="Showing all 12 widgets across your dashboards."
                                        className="opacity-60"
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            "CPU Monitor",
                                            "Memory Usage",
                                            "Network I/O",
                                            "Disk Space",
                                            "API Latency",
                                            "Error Rate",
                                        ].map((name) => (
                                            <Panel2
                                                key={name}
                                                border={true}
                                                scrollable={false}
                                                height="h-auto"
                                            >
                                                <Paragraph3
                                                    text={name}
                                                    className="font-medium"
                                                    padding={false}
                                                />
                                            </Panel2>
                                        ))}
                                    </div>
                                </div>
                            </TabbedNavbar.Content>

                            <TabbedNavbar.Content value="active">
                                <div className="p-4">
                                    <Paragraph2
                                        text="8 widgets currently running."
                                        className="opacity-60"
                                    />
                                </div>
                            </TabbedNavbar.Content>

                            <TabbedNavbar.Content value="drafts">
                                <div className="p-4">
                                    <Paragraph2
                                        text="4 draft widgets waiting to be published."
                                        className="opacity-60"
                                    />
                                </div>
                            </TabbedNavbar.Content>
                        </TabbedNavbar>
                    </div>
                </div>
            </div>
        </MockWrapper>
    );
};
