import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/Checkbox",
    component: Checkbox,
};

const Template = (args) => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Checkbox
                {...args}
                checked={checked}
                onChange={(value) => setChecked(value)}
            />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Enable notifications",
    checked: true,
};

Secondary.args = {
    label: "Enable notifications",
    checked: false,
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Enable notifications",
    checked: true,
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
