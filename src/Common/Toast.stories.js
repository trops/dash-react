import { Toast, Toast2, Toast3 } from "./Toast";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Toast",
    component: Toast,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-4">
            <Toast {...args} />
        </div>
    </MockWrapper>
);

const Template2 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-4">
            <Toast2 {...args} />
        </div>
    </MockWrapper>
);

const Template3 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-4">
            <Toast3 {...args} />
        </div>
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    title: "Update available",
    message: "A new version of the dashboard is ready to install.",
};

Secondary.args = {
    title: "Saved",
    message: "Your changes were saved successfully.",
};

Tertiary.args = {
    title: "Warning",
    message: "Connection is unstable. Changes may not be saved.",
};
