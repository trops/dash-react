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

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ProgressBar (Primary Variant)
                </h3>
                <ProgressBar value={65} showLabel={true} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Height: Variable based on size prop
                    <br />
                    Structure: w-full, rounded-full overflow-hidden
                    <br />
                    Label: mt-2 text-sm
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Variants may differ only in theme colors - check implementation
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ProgressBar2 (Secondary Variant)
                </h3>
                <ProgressBar2 value={45} showLabel={true} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Height: Variable based on size prop
                    <br />
                    Structure: w-full, rounded-full overflow-hidden
                    <br />
                    Label: mt-2 text-sm
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: May use same structure as primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ProgressBar3 (Tertiary Variant)
                </h3>
                <ProgressBar3 value={85} showLabel={true} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Height: Variable based on size prop
                    <br />
                    Structure: w-full, rounded-full overflow-hidden
                    <br />
                    Label: mt-2 text-sm
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: May use same structure as primary and secondary
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
