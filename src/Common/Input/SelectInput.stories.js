import { SelectInput } from "./SelectInput";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/SelectInput",
    component: SelectInput,
};

const options = [
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" },
    { label: "Viewer", value: "viewer" },
];

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <SelectInput {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Role",
    placeholder: "Select a role",
    value: "",
    options,
};

Secondary.args = {
    label: "Role",
    placeholder: "Select a role",
    value: "",
    options,
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Role",
    placeholder: "Select a role",
    value: "",
    options,
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};

// Options with a `group` render inside labelled <optgroup>s (plain selects
// only — the icon dropdown ignores groups).
export const Grouped = Template.bind({});
Grouped.args = {
    label: "Runs when",
    placeholder: "Choose what triggers this bot…",
    value: "",
    options: [
        {
            value: "w1",
            label: "Upcoming Events › eventSelected",
            group: "Widgets on Daily Brief",
        },
        {
            value: "b1",
            label: "Agenda › Completed",
            group: "Bots on this team",
        },
        { value: "b2", label: "Agenda › Failed", group: "Bots on this team" },
        {
            value: "b3",
            label: "Inbox › uses gmail search_emails",
            group: "Bots on this team",
        },
    ],
};
