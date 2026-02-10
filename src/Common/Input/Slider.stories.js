import { useState } from "react";
import { Slider } from "./Slider";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/Slider",
    component: Slider,
};

const Template = (args) => {
    const [value, setValue] = useState(args.value || 50);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Slider {...args} value={value} onChange={setValue} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Volume",
    value: 50,
    min: 0,
    max: 100,
};

Secondary.args = {
    label: "Volume",
    value: 30,
    min: 0,
    max: 100,
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Volume",
    value: 80,
    min: 0,
    max: 100,
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
