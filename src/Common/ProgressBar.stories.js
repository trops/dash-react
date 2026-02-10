import { ProgressBar, ProgressBar2, ProgressBar3 } from "./ProgressBar";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/ProgressBar",
    component: ProgressBar,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ProgressBar {...args} />
    </MockWrapper>
);

const Template2 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ProgressBar2 {...args} />
    </MockWrapper>
);

const Template3 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ProgressBar3 {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const Striped = Template.bind({});
export const Animated = Template.bind({});

Primary.args = {
    value: 45,
    showLabel: true,
};

Secondary.args = {
    value: 70,
    showLabel: true,
};

Tertiary.args = {
    value: 90,
    showLabel: true,
};

Striped.args = {
    value: 55,
    striped: true,
    showLabel: true,
};

Animated.args = {
    value: 30,
    striped: true,
    animated: true,
    showLabel: true,
};
