import { Alert, Alert2, Alert3 } from "./Alert";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Alert",
    component: Alert,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Alert {...args} />
    </MockWrapper>
);

const Template2 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Alert2 {...args} />
    </MockWrapper>
);

const Template3 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Alert3 {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    title: "Info",
    message: "This is a primary alert message.",
};

Secondary.args = {
    title: "Success",
    message: "This is a secondary alert message.",
};

Tertiary.args = {
    title: "Warning",
    message: "This is a tertiary alert message.",
};
