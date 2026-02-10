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
