import { useState } from "react";
import { mock, MockWrapper } from "../../Mock";
import { FormField } from "./FormField";
import { Panel2 } from "../Panel";
import { Button2, Button3 } from "../Button";
import { InputText } from "../Input/InputText";
import { SelectInput } from "../Input/SelectInput";
import { Switch } from "../Input/Switch";
import { TextArea } from "../Input/TextArea";
import { Card2 } from "../Card";
import { Tag, Tag2 } from "../Tag";
import { ProgressBar2 } from "../ProgressBar";
import { SubHeading2, SubHeading3 } from "../Text/Heading";
import { Paragraph2, Paragraph3 } from "../Text/Paragraph";
import { Breadcrumbs2 } from "../Breadcrumbs";
import { Tabs } from "../Tabs";
import { Accordion } from "../Accordion";
import { Alert, Alert2 } from "../Alert";
import { AlertBanner } from "../AlertBanner";

import "../../tailwind.css";

export default {
    title: "Composites",
};

// ─── Story 1: Form Panel ───────────────────────────────────────────────────────

export const FormPanel = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [url, setUrl] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [headers, setHeaders] = useState("");
    const [caching, setCaching] = useState(true);
    const [autoReconnect, setAutoReconnect] = useState(false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ maxWidth: 640 }}>
                <Panel2 border={true} scrollable={false} height="h-auto">
                    <Panel2.Header border={true}>
                        <SubHeading2
                            title="Provider Configuration"
                            padding={false}
                        />
                    </Panel2.Header>
                    <Panel2.Body padding={true} scrollable={false}>
                        <div className="space-y-6">
                            {/* Section 1: Provider Details */}
                            <div className="space-y-4">
                                <Paragraph3
                                    text="Provider Details"
                                    className="font-semibold uppercase tracking-wider opacity-60"
                                    padding={false}
                                />
                                <FormField
                                    label="Provider Name"
                                    description="Give this provider a descriptive name"
                                    required={true}
                                    error={
                                        name === ""
                                            ? "Provider name is required"
                                            : null
                                    }
                                >
                                    <InputText
                                        placeholder="e.g. Production API"
                                        value={name}
                                        onChange={setName}
                                    />
                                </FormField>
                                <FormField
                                    label="Provider Type"
                                    required={true}
                                >
                                    <SelectInput
                                        value={type}
                                        onChange={setType}
                                        options={[
                                            {
                                                label: "REST API",
                                                value: "rest",
                                            },
                                            {
                                                label: "GraphQL",
                                                value: "graphql",
                                            },
                                            {
                                                label: "WebSocket",
                                                value: "websocket",
                                            },
                                        ]}
                                    />
                                </FormField>
                                <FormField label="Endpoint URL" required={true}>
                                    <InputText
                                        placeholder="https://api.example.com/v1"
                                        value={url}
                                        onChange={setUrl}
                                    />
                                </FormField>
                            </div>

                            {/* Section 2: Authentication */}
                            <div className="space-y-4">
                                <Paragraph3
                                    text="Authentication"
                                    className="font-semibold uppercase tracking-wider opacity-60"
                                    padding={false}
                                />
                                <FormField
                                    label="API Key"
                                    description="Your secret API key for authentication"
                                >
                                    <InputText
                                        placeholder="sk-..."
                                        type="password"
                                        value={apiKey}
                                        onChange={setApiKey}
                                    />
                                </FormField>
                                <FormField
                                    label="Custom Headers"
                                    description="Additional headers sent with every request (JSON format)"
                                >
                                    <TextArea
                                        placeholder='{"Authorization": "Bearer ..."}'
                                        value={headers}
                                        onChange={setHeaders}
                                    />
                                </FormField>
                            </div>

                            {/* Section 3: Options */}
                            <div className="space-y-4">
                                <Paragraph3
                                    text="Options"
                                    className="font-semibold uppercase tracking-wider opacity-60"
                                    padding={false}
                                />
                                <FormField label="Enable Caching">
                                    <Switch
                                        checked={caching}
                                        onChange={setCaching}
                                        label="Cache responses for 5 minutes"
                                    />
                                </FormField>
                                <FormField label="Auto-Reconnect">
                                    <Switch
                                        checked={autoReconnect}
                                        onChange={setAutoReconnect}
                                        label="Automatically reconnect on failure"
                                    />
                                </FormField>
                            </div>
                        </div>
                    </Panel2.Body>
                    <Panel2.Footer border={false} padding={true}>
                        <div />
                        <div className="flex flex-row space-x-2">
                            <Button3 title="Cancel" onClick={() => {}} />
                            <Button2 title="Save" onClick={() => {}} />
                        </div>
                    </Panel2.Footer>
                </Panel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story 2: Settings Modal (Static) ──────────────────────────────────────────

export const SettingsModalStatic = () => {
    const [tab, setTab] = useState("general");
    const [widgetName, setWidgetName] = useState("CPU Monitor");
    const [refreshRate, setRefreshRate] = useState("30");
    const [layout, setLayout] = useState("");
    const [showBorder, setShowBorder] = useState(true);
    const [compactMode, setCompactMode] = useState(false);
    const [maxRetries, setMaxRetries] = useState("3");

    const sidebarButtons = [
        { id: "general", label: "General" },
        { id: "appearance", label: "Appearance" },
        { id: "advanced", label: "Advanced" },
    ];

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div
                style={{ height: 500, width: "100%" }}
                className="flex flex-col"
            >
                {/* Rendered as static panel structure (no Modal portal) */}
                <Panel2
                    border={true}
                    padding={false}
                    scrollable={false}
                    height="h-full"
                >
                    <div className="flex flex-row h-full">
                        {/* Sidebar */}
                        <div className="flex flex-col flex-shrink-0 w-48 border-r border-gray-700 p-2 space-y-1">
                            {sidebarButtons.map((btn) => (
                                <button
                                    key={btn.id}
                                    type="button"
                                    onClick={() => setTab(btn.id)}
                                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                                        tab === btn.id
                                            ? "bg-white/10 font-medium"
                                            : "opacity-60 hover:opacity-100 hover:bg-white/5"
                                    }`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex flex-row justify-between items-center flex-shrink-0 p-4 border-b border-gray-700">
                                <SubHeading2
                                    title={
                                        tab === "general"
                                            ? "General Settings"
                                            : tab === "appearance"
                                              ? "Appearance"
                                              : "Advanced Settings"
                                    }
                                    padding={false}
                                />
                            </div>

                            {/* Body */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                {tab === "general" && (
                                    <div className="space-y-4">
                                        <FormField
                                            label="Widget Name"
                                            required={true}
                                        >
                                            <InputText
                                                value={widgetName}
                                                onChange={setWidgetName}
                                                placeholder="Widget name"
                                            />
                                        </FormField>
                                        <FormField label="Refresh Rate">
                                            <SelectInput
                                                value={refreshRate}
                                                onChange={setRefreshRate}
                                                options={[
                                                    {
                                                        label: "10 seconds",
                                                        value: "10",
                                                    },
                                                    {
                                                        label: "30 seconds",
                                                        value: "30",
                                                    },
                                                    {
                                                        label: "1 minute",
                                                        value: "60",
                                                    },
                                                    {
                                                        label: "5 minutes",
                                                        value: "300",
                                                    },
                                                ]}
                                            />
                                        </FormField>
                                        <FormField label="Auto-Refresh">
                                            <Switch
                                                checked={true}
                                                onChange={() => {}}
                                                label="Enable automatic data refresh"
                                            />
                                        </FormField>
                                    </div>
                                )}
                                {tab === "appearance" && (
                                    <div className="space-y-4">
                                        <Paragraph2 text="Customize how this widget looks in the dashboard." />
                                        <FormField label="Layout Direction">
                                            <SelectInput
                                                value={layout}
                                                onChange={setLayout}
                                                options={[
                                                    {
                                                        label: "Horizontal",
                                                        value: "row",
                                                    },
                                                    {
                                                        label: "Vertical",
                                                        value: "col",
                                                    },
                                                ]}
                                            />
                                        </FormField>
                                        <FormField label="Show Border">
                                            <Switch
                                                checked={showBorder}
                                                onChange={setShowBorder}
                                                label="Display border around widget"
                                            />
                                        </FormField>
                                    </div>
                                )}
                                {tab === "advanced" && (
                                    <div className="space-y-4">
                                        <FormField
                                            label="Max Retries"
                                            description="Number of retry attempts on connection failure"
                                        >
                                            <InputText
                                                value={maxRetries}
                                                onChange={setMaxRetries}
                                                type="number"
                                            />
                                        </FormField>
                                        <FormField label="Compact Mode">
                                            <Switch
                                                checked={compactMode}
                                                onChange={setCompactMode}
                                                label="Use compact layout"
                                            />
                                        </FormField>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-row items-center justify-between flex-shrink-0 px-4 py-3 border-t border-gray-700 bg-black/20 rounded-b-lg">
                                <span className="text-sm opacity-50">
                                    Widget: CPU Monitor
                                </span>
                                <div className="flex flex-row items-center space-x-2">
                                    <Button3
                                        title="Cancel"
                                        onClick={() => {}}
                                    />
                                    <Button2
                                        title="Save Changes"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story 3: Confirmation Modal (Static) ───────────────────────────────────────

export const ConfirmationModalStatic = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex flex-row space-x-6">
                {/* Default variant */}
                <div style={{ width: 400 }}>
                    <Panel2 border={true} scrollable={false} height="h-auto">
                        <Panel2.Header border={true}>
                            <span className="text-lg font-semibold">
                                Merge Cells
                            </span>
                        </Panel2.Header>
                        <Panel2.Body padding={true} scrollable={false}>
                            <Paragraph2 text="This will merge 3 cells into one. The content of all cells will be combined into a single cell." />
                        </Panel2.Body>
                        <Panel2.Footer padding={true}>
                            <div />
                            <div className="flex flex-row space-x-2">
                                <Button3 title="Cancel" onClick={() => {}} />
                                <Button2 title="Merge" onClick={() => {}} />
                            </div>
                        </Panel2.Footer>
                    </Panel2>
                </div>

                {/* Danger variant */}
                <div style={{ width: 400 }}>
                    <Panel2 border={true} scrollable={false} height="h-auto">
                        <Panel2.Header border={true}>
                            <span className="text-lg font-semibold">
                                Delete Widget
                            </span>
                        </Panel2.Header>
                        <Panel2.Body padding={true} scrollable={false}>
                            <Paragraph2 text="Are you sure you want to delete this widget? This action cannot be undone." />
                        </Panel2.Body>
                        <Panel2.Footer padding={true}>
                            <div />
                            <div className="flex flex-row space-x-2">
                                <Button3 title="Cancel" onClick={() => {}} />
                                <button
                                    type="button"
                                    className="flex flex-row justify-center items-center rounded-md px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-colors duration-150"
                                    onClick={() => {}}
                                >
                                    Delete
                                </button>
                            </div>
                        </Panel2.Footer>
                    </Panel2>
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story 4: Dashboard Card Grid ───────────────────────────────────────────────

export const DashboardCardGrid = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 700 }}>
                {/* Metric card */}
                <Card2>
                    <div className="flex flex-row justify-between items-start mb-3">
                        <Paragraph3
                            text="CONNECTIONS"
                            className="font-semibold uppercase tracking-wider opacity-60"
                            padding={false}
                        />
                        <Tag text="Live" />
                    </div>
                    <div className="text-3xl font-bold mb-1">247</div>
                    <Paragraph3
                        text="+12 in the last hour"
                        className="opacity-60"
                        padding={false}
                    />
                </Card2>

                {/* Progress card */}
                <Card2>
                    <div className="flex flex-row justify-between items-start mb-3">
                        <Paragraph3
                            text="STORAGE"
                            className="font-semibold uppercase tracking-wider opacity-60"
                            padding={false}
                        />
                        <Tag2 text="72%" />
                    </div>
                    <div className="text-3xl font-bold mb-3">18.2 GB</div>
                    <ProgressBar2 value={72} size="sm" />
                </Card2>

                {/* Status card */}
                <Card2>
                    <div className="flex flex-row justify-between items-start mb-3">
                        <Paragraph3
                            text="API HEALTH"
                            className="font-semibold uppercase tracking-wider opacity-60"
                            padding={false}
                        />
                        <Tag text="Healthy" />
                    </div>
                    <div className="text-3xl font-bold mb-1">99.9%</div>
                    <Paragraph3
                        text="Uptime last 30 days"
                        className="opacity-60"
                        padding={false}
                    />
                </Card2>

                {/* Actions card */}
                <Card2>
                    <Paragraph3
                        text="QUICK ACTIONS"
                        className="font-semibold uppercase tracking-wider opacity-60 mb-3"
                        padding={false}
                    />
                    <div className="space-y-2">
                        <Button3
                            title="Restart Services"
                            onClick={() => {}}
                            block={true}
                        />
                        <Button3
                            title="Clear Cache"
                            onClick={() => {}}
                            block={true}
                        />
                        <Button3
                            title="Export Logs"
                            onClick={() => {}}
                            block={true}
                        />
                    </div>
                </Card2>
            </div>
        </MockWrapper>
    );
};

// ─── Story 5: Content Page ──────────────────────────────────────────────────────

export const ContentPage = () => {
    const [name, setName] = useState("My Dashboard");
    const [layout, setLayout] = useState("col");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ maxWidth: 800 }} className="space-y-4">
                {/* Breadcrumbs + Header */}
                <Breadcrumbs2
                    items={[
                        { label: "Home" },
                        { label: "Dashboards" },
                        { label: "CPU Monitor" },
                    ]}
                />
                <SubHeading2 title="CPU Monitor" padding={false} />
                <SubHeading3
                    title="Real-time CPU usage monitoring widget"
                    padding={false}
                />
                <div className="flex flex-row space-x-2">
                    <Tag text="Monitoring" />
                    <Tag text="System" />
                    <Tag2 text="v2.1.0" />
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview">
                    <Tabs.List>
                        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                        <Tabs.Trigger value="config">
                            Configuration
                        </Tabs.Trigger>
                        <Tabs.Trigger value="faq">FAQ</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="overview">
                        <div className="space-y-4 pt-2">
                            <Paragraph2 text="This widget displays real-time CPU utilization metrics from your connected providers. It supports multiple CPU cores and can display historical data over configurable time ranges." />
                            <div className="grid grid-cols-2 gap-4">
                                <Card2>
                                    <Paragraph3
                                        text="AVG CPU"
                                        className="font-semibold uppercase tracking-wider opacity-60"
                                        padding={false}
                                    />
                                    <div className="text-2xl font-bold mt-2">
                                        42%
                                    </div>
                                </Card2>
                                <Card2>
                                    <Paragraph3
                                        text="PEAK CPU"
                                        className="font-semibold uppercase tracking-wider opacity-60"
                                        padding={false}
                                    />
                                    <div className="text-2xl font-bold mt-2">
                                        87%
                                    </div>
                                </Card2>
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="config">
                        <div className="space-y-4 pt-2">
                            <FormField label="Display Name" required={true}>
                                <InputText
                                    value={name}
                                    onChange={setName}
                                    placeholder="Widget name"
                                />
                            </FormField>
                            <FormField label="Layout Direction">
                                <SelectInput
                                    value={layout}
                                    onChange={setLayout}
                                    options={[
                                        {
                                            label: "Vertical",
                                            value: "col",
                                        },
                                        {
                                            label: "Horizontal",
                                            value: "row",
                                        },
                                    ]}
                                />
                            </FormField>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="faq">
                        <div className="pt-2">
                            <Accordion type="single" defaultValue={["q1"]}>
                                <Accordion.Item value="q1">
                                    <Accordion.Trigger value="q1">
                                        How often does the data refresh?
                                    </Accordion.Trigger>
                                    <Accordion.Content value="q1">
                                        <Paragraph2 text="By default, the CPU widget refreshes every 10 seconds. You can configure this in the widget settings under the refresh rate option." />
                                    </Accordion.Content>
                                </Accordion.Item>
                                <Accordion.Item value="q2">
                                    <Accordion.Trigger value="q2">
                                        Can I monitor multiple machines?
                                    </Accordion.Trigger>
                                    <Accordion.Content value="q2">
                                        <Paragraph2 text="Yes, you can add multiple provider connections and the widget will aggregate data from all connected machines." />
                                    </Accordion.Content>
                                </Accordion.Item>
                                <Accordion.Item value="q3">
                                    <Accordion.Trigger value="q3">
                                        What happens when a provider
                                        disconnects?
                                    </Accordion.Trigger>
                                    <Accordion.Content value="q3">
                                        <Paragraph2 text="The widget will display the last known values and show a warning indicator. If auto-reconnect is enabled, it will attempt to reconnect automatically." />
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Tabs.Content>
                </Tabs>
            </div>
        </MockWrapper>
    );
};

// ─── Story 6: Notification Center ───────────────────────────────────────────────

export const NotificationCenter = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ maxWidth: 600 }}>
                <Panel2 border={true} scrollable={false} height="h-auto">
                    <Panel2.Header border={true}>
                        <SubHeading2 title="Notifications" padding={false} />
                    </Panel2.Header>
                    <Panel2.Body padding={true} scrollable={false}>
                        <div className="space-y-3">
                            <Paragraph3
                                text="ALERT BANNERS"
                                className="font-semibold uppercase tracking-wider opacity-60"
                                padding={false}
                            />
                            <AlertBanner
                                variant="error"
                                title="Connection Lost"
                                message="Unable to reach the API server. Retrying in 30 seconds."
                                animate={false}
                            />
                            <AlertBanner
                                variant="warning"
                                title="High Memory Usage"
                                message="Memory usage has exceeded 85%. Consider restarting services."
                                animate={false}
                            />
                            <AlertBanner
                                variant="success"
                                title="Deployment Complete"
                                message="Version 2.4.1 has been successfully deployed to production."
                                animate={false}
                            />
                            <AlertBanner
                                variant="info"
                                title="Scheduled Maintenance"
                                message="System maintenance is scheduled for Feb 20, 2026 at 2:00 AM UTC."
                                animate={false}
                            />

                            <div className="pt-4">
                                <Paragraph3
                                    text="THEME ALERTS"
                                    className="font-semibold uppercase tracking-wider opacity-60"
                                    padding={false}
                                />
                            </div>
                            <Alert
                                title="Primary Alert"
                                message="This alert uses the primary theme colors from your current theme."
                            />
                            <Alert2
                                title="Secondary Alert"
                                message="This alert uses the secondary theme colors. Good for less critical information."
                            />
                        </div>
                    </Panel2.Body>
                </Panel2>
            </div>
        </MockWrapper>
    );
};
