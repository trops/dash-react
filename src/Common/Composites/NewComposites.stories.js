import { useState } from "react";
import { mock, MockWrapper } from "../../Mock";
import { EmptyState } from "./EmptyState";
import { StatCard } from "./StatCard";
import { Skeleton } from "./Skeleton";
import { CommandPalette } from "./CommandPalette";
import { Stepper } from "./Stepper";
import { DataList } from "./DataList";
import { Drawer } from "./Drawer";
import { Tooltip } from "./Tooltip";
import { FormField } from "./FormField";
import { Panel2 } from "../Panel";
import { Button2, Button3 } from "../Button";
import { ButtonIcon2 } from "../ButtonIcon";
import { SubHeading2 } from "../Text/Heading";
import { Paragraph2, Paragraph3 } from "../Text/Paragraph";
import { InputText } from "../Input/InputText";
import { SelectInput } from "../Input/SelectInput";
import { Tag, Tag2 } from "../Tag";
import { ProgressBar2 } from "../ProgressBar";

import "../../tailwind.css";

export default {
    title: "Composites/New",
};

// ─── SVG Icons ──────────────────────────────────────────────────────────────────

const IconInbox = () => (
    <svg
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
    </svg>
);

const IconSearch = () => (
    <svg
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

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

const IconPlus = () => (
    <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const IconCog = () => (
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

// ─── Story: EmptyState ──────────────────────────────────────────────────────────

export const EmptyStates = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="space-y-6" style={{ maxWidth: 500 }}>
                <Panel2 border={true} scrollable={false} height="h-auto">
                    <EmptyState
                        icon={<IconInbox />}
                        title="No widgets yet"
                        description="Create your first widget to start monitoring your data."
                    >
                        <Button2 title="Create Widget" onClick={() => {}} />
                    </EmptyState>
                </Panel2>

                <Panel2 border={true} scrollable={false} height="h-auto">
                    <EmptyState
                        icon={<IconSearch />}
                        title="No results found"
                        description="Try adjusting your search or filter to find what you're looking for."
                    />
                </Panel2>

                <Panel2 border={true} scrollable={false} height="h-auto">
                    <EmptyState
                        title="All caught up!"
                        description="No new notifications at this time."
                    />
                </Panel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story: StatCard ────────────────────────────────────────────────────────────

export const StatCards = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 700 }}>
                <StatCard
                    label="Connections"
                    value="247"
                    change="+12"
                    trend="up"
                    helpText="Last 24 hours"
                />
                <StatCard
                    label="CPU Usage"
                    value="42%"
                    badge={<Tag text="Live" />}
                />
                <StatCard
                    label="Error Rate"
                    value="0.3%"
                    change="+0.1%"
                    trend="down"
                    helpText="Last hour"
                />
                <StatCard
                    label="Uptime"
                    value="99.9%"
                    change="Stable"
                    trend="neutral"
                    helpText="Last 30 days"
                />

                {/* Composable sub-component usage */}
                <StatCard>
                    <StatCard.Label>Storage</StatCard.Label>
                    <StatCard.Value>18.2 GB</StatCard.Value>
                    <div className="mt-2">
                        <ProgressBar2 value={72} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <StatCard.Change trend="up">+2.1 GB</StatCard.Change>
                        <span className="text-xs opacity-50">this week</span>
                    </div>
                </StatCard>

                <StatCard
                    label="Requests"
                    value="1.2M"
                    change="-5%"
                    trend="down"
                    badge={<Tag2 text="24h" />}
                />
            </div>
        </MockWrapper>
    );
};

// ─── Story: Skeleton ────────────────────────────────────────────────────────────

export const Skeletons = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="space-y-8" style={{ maxWidth: 500 }}>
                {/* Basic shapes */}
                <div>
                    <Paragraph3
                        text="BASIC SHAPES"
                        className="font-semibold uppercase tracking-wider opacity-60 mb-3"
                        padding={false}
                    />
                    <div className="space-y-3">
                        <Skeleton width="w-full" height="h-4" />
                        <Skeleton width="w-3/4" height="h-4" />
                        <Skeleton width="w-1/2" height="h-4" />
                        <div className="flex gap-3">
                            <Skeleton
                                width="w-10"
                                height="h-10"
                                rounded="rounded-full"
                            />
                            <div className="flex-1 space-y-2">
                                <Skeleton width="w-1/3" height="h-3" />
                                <Skeleton width="w-full" height="h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preset: Text */}
                <div>
                    <Paragraph3
                        text="SKELETON.TEXT"
                        className="font-semibold uppercase tracking-wider opacity-60 mb-3"
                        padding={false}
                    />
                    <Skeleton.Text lines={4} />
                </div>

                {/* Preset: Card */}
                <div>
                    <Paragraph3
                        text="SKELETON.CARD"
                        className="font-semibold uppercase tracking-wider opacity-60 mb-3"
                        padding={false}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton.Card />
                        <Skeleton.Card />
                    </div>
                </div>
            </div>
        </MockWrapper>
    );
};

// ─── Story: CommandPalette ───────────────────────────────────────────────────────

export const CommandPaletteExample = () => {
    const [open, setOpen] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div>
                <Button2
                    title="Open Command Palette (Cmd+K)"
                    onClick={() => setOpen(true)}
                />
                <CommandPalette
                    isOpen={open}
                    setIsOpen={setOpen}
                    placeholder="Search commands..."
                >
                    <CommandPalette.Group label="Navigation">
                        <CommandPalette.Item
                            icon={<IconHome />}
                            shortcut="G H"
                            onSelect={() => setOpen(false)}
                        >
                            Go to Dashboard
                        </CommandPalette.Item>
                        <CommandPalette.Item
                            icon={<IconSettings />}
                            shortcut="G S"
                            onSelect={() => setOpen(false)}
                        >
                            Open Settings
                        </CommandPalette.Item>
                    </CommandPalette.Group>
                    <CommandPalette.Group label="Actions">
                        <CommandPalette.Item
                            icon={<IconPlus />}
                            onSelect={() => setOpen(false)}
                        >
                            Create New Widget
                        </CommandPalette.Item>
                        <CommandPalette.Item onSelect={() => setOpen(false)}>
                            Clear Cache
                        </CommandPalette.Item>
                        <CommandPalette.Item onSelect={() => setOpen(false)}>
                            Export Dashboard
                        </CommandPalette.Item>
                    </CommandPalette.Group>
                </CommandPalette>
            </div>
        </MockWrapper>
    );
};

// ─── Story: Stepper ─────────────────────────────────────────────────────────────

export const StepperExample = () => {
    const [step, setStep] = useState(0);
    const [type, setType] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ maxWidth: 700 }}>
                <Panel2 border={true} scrollable={false} height="h-auto">
                    <Panel2.Header border={true}>
                        <SubHeading2 title="Add Provider" padding={false} />
                    </Panel2.Header>
                    <Panel2.Body padding={true} scrollable={false}>
                        <Stepper activeStep={step} onStepChange={setStep}>
                            <Stepper.Step
                                label="Provider"
                                description="Select a provider type"
                            >
                                <div className="space-y-4 py-4">
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
                                    <FormField
                                        label="Provider Name"
                                        required={true}
                                    >
                                        <InputText
                                            value={name}
                                            onChange={setName}
                                            placeholder="e.g. Production API"
                                        />
                                    </FormField>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step
                                label="Configure"
                                description="Enter connection details"
                            >
                                <div className="space-y-4 py-4">
                                    <FormField
                                        label="Endpoint URL"
                                        required={true}
                                    >
                                        <InputText
                                            value={url}
                                            onChange={setUrl}
                                            placeholder="https://api.example.com/v1"
                                        />
                                    </FormField>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step
                                label="Confirm"
                                description="Review and save"
                            >
                                <div className="space-y-2 py-4">
                                    <Paragraph2 text="Review your provider configuration before saving." />
                                    <div className="text-sm opacity-60 space-y-1">
                                        <div>
                                            Type: {type || "Not selected"}
                                        </div>
                                        <div>Name: {name || "Not set"}</div>
                                        <div>URL: {url || "Not set"}</div>
                                    </div>
                                </div>
                            </Stepper.Step>
                        </Stepper>
                    </Panel2.Body>
                </Panel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story: DataList ────────────────────────────────────────────────────────────

export const DataListExample = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ maxWidth: 500 }}>
                <Panel2 border={true} scrollable={false} height="h-auto">
                    <Panel2.Header border={true}>
                        <SubHeading2 title="Widget Details" padding={false} />
                    </Panel2.Header>
                    <Panel2.Body padding={true} scrollable={false}>
                        <DataList>
                            <DataList.Item label="Status">
                                <Tag text="Active" />
                            </DataList.Item>
                            <DataList.Item label="Provider" value="REST API" />
                            <DataList.Item
                                label="Endpoint"
                                value="https://api.example.com/v1"
                            />
                            <DataList.Item
                                label="Refresh Rate"
                                value="30 seconds"
                            />
                            <DataList.Item
                                label="Last Updated"
                                value="2 minutes ago"
                            />
                            <DataList.Item label="Version">
                                <Tag2 text="v2.1.0" />
                            </DataList.Item>
                        </DataList>
                    </Panel2.Body>
                </Panel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story: Drawer ──────────────────────────────────────────────────────────────

export const DrawerExample = () => {
    const [rightOpen, setRightOpen] = useState(false);
    const [leftOpen, setLeftOpen] = useState(false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex gap-4">
                <Button2
                    title="Open Right Drawer"
                    onClick={() => setRightOpen(true)}
                />
                <Button3
                    title="Open Left Drawer"
                    onClick={() => setLeftOpen(true)}
                />
            </div>

            <Drawer
                isOpen={rightOpen}
                setIsOpen={setRightOpen}
                side="right"
                size="md"
            >
                <Drawer.Header>
                    <SubHeading2 title="Widget Details" padding={false} />
                    <Drawer.CloseButton onClick={() => setRightOpen(false)} />
                </Drawer.Header>
                <Drawer.Body>
                    <div className="space-y-4">
                        <DataList>
                            <DataList.Item label="Status">
                                <Tag text="Active" />
                            </DataList.Item>
                            <DataList.Item label="Provider" value="REST API" />
                            <DataList.Item
                                label="Endpoint"
                                value="https://api.example.com/v1"
                            />
                        </DataList>
                        <Paragraph2 text="This drawer slides in from the right side. It uses Headless UI Transition for smooth animation and is fully theme-aware." />
                    </div>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button3
                        title="Cancel"
                        onClick={() => setRightOpen(false)}
                    />
                    <Button2 title="Save" onClick={() => setRightOpen(false)} />
                </Drawer.Footer>
            </Drawer>

            <Drawer
                isOpen={leftOpen}
                setIsOpen={setLeftOpen}
                side="left"
                size="sm"
            >
                <Drawer.Header>
                    <SubHeading2 title="Navigation" padding={false} />
                    <Drawer.CloseButton onClick={() => setLeftOpen(false)} />
                </Drawer.Header>
                <Drawer.Body>
                    <Paragraph2 text="This drawer slides in from the left. Useful for mobile navigation menus or side panels." />
                </Drawer.Body>
            </Drawer>
        </MockWrapper>
    );
};

// ─── Story: Tooltip ─────────────────────────────────────────────────────────────

export const Tooltips = () => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex flex-col items-center space-y-12 py-16">
                <div className="flex items-center gap-8">
                    <Tooltip content="This is a top tooltip" side="top">
                        <Button3 title="Top" onClick={() => {}} />
                    </Tooltip>
                    <Tooltip content="This is a bottom tooltip" side="bottom">
                        <Button3 title="Bottom" onClick={() => {}} />
                    </Tooltip>
                    <Tooltip content="Left side" side="left">
                        <Button3 title="Left" onClick={() => {}} />
                    </Tooltip>
                    <Tooltip content="Right side" side="right">
                        <Button3 title="Right" onClick={() => {}} />
                    </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                    <Tooltip content="Edit widget settings">
                        <ButtonIcon2 icon="cog" onClick={() => {}} />
                    </Tooltip>
                    <Tooltip content="Last synced 2 minutes ago" side="bottom">
                        <Tag text="Synced" />
                    </Tooltip>
                </div>
            </div>
        </MockWrapper>
    );
};
