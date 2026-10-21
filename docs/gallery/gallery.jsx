/**
 * Live component gallery for docs/design-guide.html.
 *
 * Every `[data-gallery="Key"]` element on the page gets the real dash-react
 * component(s) for that key, rendered twice — Aurora dark and Aurora light —
 * from the component's own Storybook stories where they exist, otherwise from
 * a sample below. Built by `npm run build:gallery`.
 */
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { GalleryTheme } from "./mock";
// Direct paths: the package root exports two components named InputText.
import { Caption, Caption2, Caption3 } from "@dash/Common/Text/Caption";
import { Code, Code2, Code3 } from "@dash/Common/Code";
import { Divider, Divider2, Divider3 } from "@dash/Common/Divider";
import { ErrorMessage } from "@dash/Common/ErrorMessage";
import { FormField } from "@dash/Common/Composites/FormField";
import { Icon, Icon2, Icon3 } from "@dash/Common/Icon";
import { InputText } from "@dash/Common/Input/InputText";
import { RichText } from "@dash/Common/RichText";
import { SelectableCard } from "@dash/Common/Composites/SelectableCard";
import { StatusBadge } from "@dash/Common/Composites/StatusBadge";
import { WebSocketStatus, WS_STATES } from "@dash/Common/WebSocketStatus";
import { CommandPalette } from "@dash/Common/Composites/CommandPalette";
import { Button2 } from "@dash/Common/Button";
import { useStatusTokens } from "@dash/Hooks/useStatusTokens";

import * as AccordionS from "@dash/Common/Accordion.stories";
import * as AlertS from "@dash/Common/Alert.stories";
import * as AlertBannerS from "@dash/Common/AlertBanner.stories";
import * as BreadcrumbsS from "@dash/Common/Breadcrumbs.stories";
import * as ButtonS from "@dash/Common/Button.stories";
import * as ButtonIconS from "@dash/Common/ButtonIcon.stories";
import * as CardS from "@dash/Common/Card.stories";
import * as ChoiceMenuS from "@dash/Common/ChoiceMenu.stories";
import * as ActionMenuS from "@dash/Common/ActionMenu.stories";
import * as CodeEditorInlineS from "@dash/Common/CodeEditor/CodeEditorInline.stories";
import * as CodeRendererS from "@dash/Common/CodeRenderer/CodeRenderer.stories";
import * as CompositesS from "@dash/Common/Composites/Composites.stories";
import * as NavigationS from "@dash/Common/Composites/Navigation.stories";
import * as NewCompositesS from "@dash/Common/Composites/NewComposites.stories";
import * as DashPanelS from "@dash/Common/DashPanel.stories";
import * as DropdownPanelS from "@dash/Common/DropdownPanel.stories";
import * as FilterMenuS from "@dash/Common/FilterMenu.stories";
import * as FormInputTextS from "@dash/Common/Form/InputText.stories";
import * as SelectMenuS from "@dash/Common/Form/SelectMenu.stories";
import * as CheckboxS from "@dash/Common/Input/Checkbox.stories";
import * as InputTextS from "@dash/Common/Input/InputText.stories";
import * as RadioGroupS from "@dash/Common/Input/RadioGroup.stories";
import * as SearchInputS from "@dash/Common/Input/SearchInput.stories";
import * as SelectInputS from "@dash/Common/Input/SelectInput.stories";
import * as SliderS from "@dash/Common/Input/Slider.stories";
import * as SwitchS from "@dash/Common/Input/Switch.stories";
import * as TextAreaS from "@dash/Common/Input/TextArea.stories";
import * as MenuS from "@dash/Common/Menu.stories";
import * as MenuItemS from "@dash/Common/MenuItem.stories";
import * as PanelS from "@dash/Common/Panel.stories";
import * as ProgressBarS from "@dash/Common/ProgressBar.stories";
import * as ResizeHandleS from "@dash/Common/ResizeHandle.stories";
import * as SegmentedControlS from "@dash/Common/SegmentedControl.stories";
import * as TableS from "@dash/Common/Table.stories";
import * as TabsS from "@dash/Common/Tabs.stories";
import * as TagS from "@dash/Common/Tag.stories";
import * as HeadingS from "@dash/Common/Text/Heading.stories";
import * as ParagraphS from "@dash/Common/Text/Paragraph.stories";
import * as SectionLabelS from "@dash/Common/Text/SectionLabel.stories";
import * as SubHeadingS from "@dash/Common/Text/SubHeading.stories";
import * as ToastS from "@dash/Common/Toast.stories";
import * as ToggleS from "@dash/Common/Toggle.stories";
import * as WidgetChromeS from "@dash/Common/WidgetChrome.stories";
import * as ChatS from "@dash/Common/Composites/ChatListHeader.stories";

library.add(
    ...Object.keys(SolidIcons)
        .filter((k) => k !== "fas" && k !== "prefix")
        .map((k) => SolidIcons[k])
);

// ---- Rendering a story ---------------------------------------------------

const DEMO_ONLY = ["debug", "backgroundColor", "textColor", "borderColor"];

/** One named story from a CSF module, rendered with its args. */
function StoryHost({ mod, name }) {
    const meta = mod.default || {};
    const S = mod[name];
    if (!S) throw new Error(`No story "${name}"`);
    // Stories pass demo overrides (debug outlines, forced colors); the gallery
    // shows each component as it ships, so those are dropped.
    const args = { ...(meta.args || {}), ...(S.args || {}) };
    for (const k of DEMO_ONLY) delete args[k];
    if (typeof S === "function") return S(args) || null;
    if (S.render) return S.render(args) || null;
    if (meta.component) return React.createElement(meta.component, args);
    throw new Error(`Story "${name}" has nothing to render`);
}
const stories =
    (mod, ...names) =>
    () => (
        <div className="gx-stack">
            {names.map((n) => (
                <StoryHost key={n} mod={mod} name={n} />
            ))}
        </div>
    );

// ---- Samples for components without stories ------------------------------

function StatusTokensDemo() {
    const tokens = useStatusTokens();
    return (
        <div className="gx-row">
            {["success", "warning", "error", "info"].map((k) => (
                <span
                    key={k}
                    className={`px-2 py-1 rounded border text-xs ${tokens[k].bg} ${tokens[k].text} ${tokens[k].border}`}
                >
                    {k}
                </span>
            ))}
        </div>
    );
}

// The palette's own story opens on load into a full-screen dialog; here it
// opens on click and closes with Esc or a pick.
function CommandPaletteDemo() {
    const [open, setOpen] = useState(false);
    const pick = () => setOpen(false);
    return (
        <div>
            <Button2
                title="Open the command palette"
                onClick={() => setOpen(true)}
            />
            <CommandPalette
                isOpen={open}
                setIsOpen={setOpen}
                placeholder="Search commands..."
            >
                <CommandPalette.Group label="Go to">
                    <CommandPalette.Item shortcut="G D" onSelect={pick}>
                        Dashboards
                    </CommandPalette.Item>
                    <CommandPalette.Item shortcut="G B" onSelect={pick}>
                        Bots
                    </CommandPalette.Item>
                </CommandPalette.Group>
                <CommandPalette.Group label="Make">
                    <CommandPalette.Item onSelect={pick}>
                        Make something new…
                    </CommandPalette.Item>
                </CommandPalette.Group>
            </CommandPalette>
        </div>
    );
}

const samples = {
    Caption: () => (
        <div className="gx-stack">
            <Caption text="Caption · Answered · 2m ago" />
            <Caption2 text="Caption2 · Answered · 2m ago" />
            <Caption3 text="Caption3 · Answered · 2m ago" />
        </div>
    ),
    Code: () => (
        <div className="gx-row">
            <Code>@trops/gmail</Code>
            <Code2>bot_results</Code2>
            <Code3>plan_k3x9</Code3>
        </div>
    ),
    RichText: () => (
        <RichText
            text={
                "*Morning brief* — 2 meetings, _1 email needs you_. Run `npm test` :tada:"
            }
        />
    ),
    Divider: () => (
        <div className="gx-stack">
            <Divider />
            <Divider2 />
            <Divider3 />
        </div>
    ),
    Icon: () => (
        <div className="gx-row">
            <Icon icon="robot" />
            <Icon2 icon="table-cells-large" />
            <Icon3 icon="comment" />
        </div>
    ),
    FormField: () => (
        <div className="gx-stack">
            <FormField
                label="Dashboard name"
                description="Shown in the tab bar."
                required
            >
                <InputText value="Morning Brief" onChange={() => {}} />
            </FormField>
            <FormField label="Schedule" error="Pick at least one day.">
                <InputText
                    value=""
                    placeholder="Every weekday at 8:00"
                    onChange={() => {}}
                />
            </FormField>
        </div>
    ),
    SelectableCard: () => (
        <div className="gx-grid">
            <SelectableCard
                icon="table-cells-large"
                label="Dashboard"
                description="Widgets, bots and a layout"
                selected
                onSelect={() => {}}
            />
            <SelectableCard
                icon="robot"
                label="Bot"
                description="Runs on a schedule or an event"
                onSelect={() => {}}
            />
            <SelectableCard
                icon="palette"
                label="Theme"
                description="Colors for every dashboard"
                disabled
                onSelect={() => {}}
            />
        </div>
    ),
    StatusBadge: () => (
        <div className="gx-row">
            <StatusBadge state="success" label="Running" />
            <StatusBadge state="warning" label="Waiting for Gmail" />
            <StatusBadge state="error" label="Failed" />
            <StatusBadge state="neutral" label="Paused" />
            <StatusBadge state="success" label="Built" compact />
        </div>
    ),
    WebSocketStatus: () => (
        <div className="gx-stack">
            <WebSocketStatus
                status={WS_STATES.CONNECTED}
                providerName="Slack"
            />
            <WebSocketStatus
                status={WS_STATES.CONNECTING}
                providerName="Slack"
            />
            <WebSocketStatus
                status={WS_STATES.ERROR}
                variant="full"
                providerName="Slack"
            />
        </div>
    ),
    ErrorMessage: () => (
        <ErrorMessage title="Couldn't reach the registry." onClose={() => {}} />
    ),
    useStatusTokens: () => <StatusTokensDemo />,
};

// ---- The registry: catalog key → what to render ---------------------------

const REGISTRY = {
    Button: stories(ButtonS, "Primary", "Secondary", "Tertiary"),
    ButtonIcon: stories(
        ButtonIconS,
        "Primary",
        "Secondary",
        "Tertiary",
        "IconOnly"
    ),
    Heading: stories(HeadingS, "Primary", "Secondary", "Tertiary"),
    SubHeading: stories(SubHeadingS, "Primary", "Secondary", "Tertiary"),
    Paragraph: stories(ParagraphS, "Primary", "Secondary", "Tertiary"),
    Caption: samples.Caption,
    SectionLabel: stories(SectionLabelS, "Default"),
    Code: samples.Code,
    RichText: samples.RichText,
    InputText: stories(InputTextS, "Primary", "Secondary", "Tertiary"),
    TextArea: stories(TextAreaS, "Primary"),
    SelectInput: stories(SelectInputS, "Primary", "Grouped"),
    SearchInput: stories(SearchInputS, "Primary"),
    Checkbox: stories(CheckboxS, "Primary", "Secondary", "Tertiary"),
    RadioGroup: stories(RadioGroupS, "Primary"),
    Switch: stories(SwitchS, "Primary", "Secondary", "Tertiary"),
    Slider: stories(SliderS, "Primary"),
    SegmentedControl: stories(
        SegmentedControlS,
        "Views",
        "WithValuesAndDisabled"
    ),
    ChoiceMenu: stories(ChoiceMenuS, "Type"),
    ActionMenu: stories(ActionMenuS, "WidgetCard"),
    FilterMenu: stories(FilterMenuS, "Orgs"),
    FormField: samples.FormField,
    Toggle: stories(ToggleS, "Primary", "Secondary", "Tertiary"),
    FormLegacy: () => (
        <div className="gx-stack">
            <StoryHost mod={FormInputTextS} name="Value" />
            <StoryHost mod={SelectMenuS} name="Value" />
        </div>
    ),
    Tabs: stories(TabsS, "Primary", "Secondary", "Tertiary"),
    Menu: () => (
        <div className="gx-stack">
            <StoryHost mod={MenuS} name="Primary" />
            <StoryHost mod={MenuItemS} name="Primary" />
            <StoryHost mod={MenuItemS} name="Secondary" />
            <StoryHost mod={MenuItemS} name="Tertiary" />
        </div>
    ),
    DropdownPanel: stories(DropdownPanelS, "Primary"),
    Breadcrumbs: stories(BreadcrumbsS, "Primary", "Secondary", "Tertiary"),
    CommandPalette: () => <CommandPaletteDemo />,
    Stepper: stories(NewCompositesS, "StepperExample"),
    Sidebar: stories(NavigationS, "SidebarDemo"),
    Navbar: () => (
        <div className="gx-stack">
            <StoryHost mod={NavigationS} name="NavbarDemo" />
            <StoryHost mod={NavigationS} name="TabbedNavbarDemo" />
        </div>
    ),
    Panel: stories(PanelS, "Primary", "Secondary", "Tertiary"),
    Card: stories(CardS, "Primary", "Secondary", "Tertiary"),
    SelectableCard: samples.SelectableCard,
    Accordion: stories(AccordionS, "Primary", "Secondary", "Tertiary"),
    ConfirmationModal: stories(CompositesS, "ConfirmationModalStatic"),
    Drawer: stories(NewCompositesS, "DrawerExample"),
    Tooltip: stories(NewCompositesS, "Tooltips"),
    Divider: samples.Divider,
    ResizeHandle: stories(ResizeHandleS, "RightPanel"),
    SettingsModal: stories(CompositesS, "SettingsModalStatic"),
    DashPanel: stories(DashPanelS, "Primary"),
    WidgetChrome: stories(WidgetChromeS, "Primary", "WithFooter"),
    Alert: stories(AlertS, "Primary", "Secondary", "Tertiary"),
    AlertBanner: stories(AlertBannerS, "Info", "Success", "Warning", "Error"),
    Toast: stories(ToastS, "Primary", "Secondary", "Tertiary"),
    ProgressBar: stories(ProgressBarS, "Primary", "Secondary", "Tertiary"),
    Skeleton: stories(NewCompositesS, "Skeletons"),
    EmptyState: stories(NewCompositesS, "EmptyStates"),
    StatusBadge: samples.StatusBadge,
    WebSocketStatus: samples.WebSocketStatus,
    ErrorMessage: samples.ErrorMessage,
    Table: stories(TableS, "Primary", "Empty"),
    DataList: stories(NewCompositesS, "DataListExample"),
    StatCard: stories(NewCompositesS, "StatCards"),
    Tag: stories(TagS, "Primary", "Secondary", "Tertiary"),
    Icon: samples.Icon,
    CodeRenderer: () => (
        <div className="gx-stack">
            <StoryHost mod={CodeRendererS} name="Primary" />
            <StoryHost mod={CodeEditorInlineS} name="JS" />
        </div>
    ),
    useStatusTokens: samples.useStatusTokens,
    Chat: stories(ChatS, "Conversation", "ToolCalls"),
    ListRow: stories(ChatS, "Rows"),
    PanelHeader: stories(ChatS, "Headers"),
};

// ---- Mounting -------------------------------------------------------------

const TALL = new Set([
    "Drawer",
    "ConfirmationModal",
    "SettingsModal",
    "DropdownPanel",
    "ChoiceMenu",
    "FilterMenu",
]);

class Boundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (
                <div className="gx-error">
                    Couldn't render here:{" "}
                    {String(this.state.error.message || this.state.error)}
                </div>
            );
        }
        return this.props.children;
    }
}

function Preview({ Render, mode }) {
    return (
        <div className="gx-frame" data-design="aurora" data-mode={mode}>
            <div className="gx-cap">
                {mode === "dark" ? "Aurora dark" : "Aurora light"}
            </div>
            <div className="gx-body">
                <GalleryTheme mode={mode}>
                    <Boundary>
                        <Render />
                    </Boundary>
                </GalleryTheme>
            </div>
        </div>
    );
}

function mountAll() {
    const missing = [];
    for (const el of document.querySelectorAll("[data-gallery]")) {
        const key = el.getAttribute("data-gallery");
        const Render = REGISTRY[key];
        if (!Render) {
            missing.push(key);
            continue;
        }
        el.classList.add("gx-pair");
        // Overlay components need room inside their frame.
        if (TALL.has(key)) el.classList.add("gx-tall");
        createRoot(el).render(
            <>
                <Preview Render={Render} mode="dark" />
                <Preview Render={Render} mode="light" />
            </>
        );
    }
    window.__galleryMissing = missing;
    window.__galleryKeys = Object.keys(REGISTRY);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll);
} else {
    mountAll();
}
