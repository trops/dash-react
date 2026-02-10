import { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/RadioGroup",
    component: RadioGroup,
};

const options = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
];

const Template = (args) => {
    const [value, setValue] = useState(args.value || "daily");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <RadioGroup
                {...args}
                value={value}
                onChange={(next) => setValue(next)}
                options={options}
            />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Report frequency",
    value: "daily",
};

Secondary.args = {
    label: "Report frequency",
    value: "weekly",
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Report frequency",
    value: "monthly",
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
