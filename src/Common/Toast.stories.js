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

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Toast (Primary Variant)
                </h3>
                <Toast
                    title="Info"
                    message="This is the primary toast notification."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-4
                    <br />
                    Rounded: rounded-md
                    <br />
                    Shadow: shadow-lg
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive padding hierarchy established
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Toast2 (Secondary Variant)
                </h3>
                <Toast2
                    title="Success"
                    message="This is the secondary toast notification."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-3
                    <br />
                    Rounded: rounded-md
                    <br />
                    Shadow: shadow-lg
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Toast3 (Tertiary Variant)
                </h3>
                <Toast3
                    title="Warning"
                    message="This is the tertiary toast notification."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-2
                    <br />
                    Rounded: rounded-md
                    <br />
                    Shadow: shadow-lg
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest variant, clear hierarchy
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
