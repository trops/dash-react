import { useState } from "react";
import { Toggle, Toggle2, Toggle3 } from "./Toggle";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Toggle",
    component: Toggle,
};

const Template = (args) => {
    const [enabled, setEnabled] = useState(args.enabled || false);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Toggle {...args} enabled={enabled} setEnabled={setEnabled} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    const [enabled, setEnabled] = useState(args.enabled || false);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Toggle2 {...args} enabled={enabled} setEnabled={setEnabled} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    const [enabled, setEnabled] = useState(args.enabled || false);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Toggle3 {...args} enabled={enabled} setEnabled={setEnabled} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    text: "Enable feature",
    enabled: false,
};

export const Secondary = Template2.bind({});
Secondary.args = {
    text: "Enable feature",
    enabled: false,
};

export const Tertiary = Template3.bind({});
Tertiary.args = {
    text: "Enable feature",
    enabled: false,
};

export const AllVariants = () => {
    const [t1, setT1] = useState(true);
    const [t2, setT2] = useState(false);
    const [t3, setT3] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="space-y-8 p-4">
                <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Toggle (Large)
                    </h3>
                    <div className="space-y-3">
                        <Toggle
                            text="Enabled"
                            enabled={t1}
                            setEnabled={setT1}
                        />
                        <Toggle
                            text="Disabled state"
                            enabled={false}
                            setEnabled={() => {}}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Toggle2 (Medium)
                    </h3>
                    <div className="space-y-3">
                        <Toggle2
                            text="Off state"
                            enabled={t2}
                            setEnabled={setT2}
                        />
                        <Toggle2
                            text="Disabled state"
                            enabled={true}
                            setEnabled={() => {}}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="pb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Toggle3 (Small)
                    </h3>
                    <div className="space-y-3">
                        <Toggle3
                            text="Enabled"
                            enabled={t3}
                            setEnabled={setT3}
                        />
                        <Toggle3
                            text="No label"
                            enabled={false}
                            setEnabled={() => {}}
                        />
                    </div>
                </div>
            </div>
        </MockWrapper>
    );
};
