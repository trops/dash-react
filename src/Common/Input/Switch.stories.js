import { useState } from "react";
import { Switch } from "./Switch";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/Switch",
    component: Switch,
};

const Template = (args) => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Switch {...args} checked={checked} onChange={setChecked} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Enable dark mode",
    checked: true,
};

Secondary.args = {
    label: "Enable dark mode",
    checked: false,
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Enable dark mode",
    checked: true,
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
