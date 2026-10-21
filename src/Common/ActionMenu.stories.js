import { ActionMenu } from "./ActionMenu";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/ActionMenu",
    component: ActionMenu,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div style={{ padding: 24, minHeight: 360, display: "flex" }}>
            <ActionMenu {...args} />
        </div>
    </MockWrapper>
);

export const WidgetCard = Template.bind({});
WidgetCard.args = {
    label: "Counter options",
    icon: "ellipsis-vertical",
    align: "left",
    items: [
        {
            label: "Edit in panel",
            description: "Its settings, connections and listeners",
            onSelect: () => {},
        },
        { label: "Change Counter", onSelect: () => {} },
        "separator",
        { label: "Move to another cell", onSelect: () => {} },
        { label: "Split side by side", onSelect: () => {} },
        { label: "Split top and bottom", onSelect: () => {} },
        "separator",
        { label: "Remove", danger: true, onSelect: () => {} },
    ],
};

export const NeedsAttention = Template.bind({});
NeedsAttention.args = {
    label: "Inbox options",
    dot: true,
    align: "left",
    items: [
        { label: "Edit in panel", badge: "!", onSelect: () => {} },
        { label: "Remove", danger: true, onSelect: () => {} },
    ],
};
