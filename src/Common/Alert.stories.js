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

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Alert (Primary Variant)
                </h3>
                <Alert
                    title="Info"
                    message="This is the primary alert variant."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-4
                    <br />
                    Text: text-base
                    <br />
                    Font: font-semibold (title), opacity-90 (message)
                    <br />
                    Rounded: rounded-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive padding/text hierarchy established
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Alert2 (Secondary Variant)
                </h3>
                <Alert2
                    title="Success"
                    message="This is the secondary alert variant."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-3
                    <br />
                    Text: text-sm
                    <br />
                    Font: font-medium (title), opacity-90 (message)
                    <br />
                    Rounded: rounded-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Alert3 (Tertiary Variant)
                </h3>
                <Alert3
                    title="Warning"
                    message="This is the tertiary alert variant."
                    onClose={() => {}}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-2
                    <br />
                    Text: text-sm
                    <br />
                    Font: font-normal (title), opacity-90 (message)
                    <br />
                    Rounded: rounded-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest variant, clear hierarchy
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
