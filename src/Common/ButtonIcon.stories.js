import { ButtonIcon, ButtonIcon2, ButtonIcon3 } from "./ButtonIcon";
import { mock, MockWrapper } from "@dash";

import "../tailwind.css";

export default {
    title: "Common/ButtonIcon",
    component: ButtonIcon,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <ButtonIcon {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <ButtonIcon2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <ButtonIcon3 {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    text: "ButtonIcon",
    icon: "pencil",
    block: false,
};

Secondary.args = {
    text: "ButtonIcon 2",
    icon: "pencil",
    block: false,
};

Tertiary.args = {
    text: "ButtonIcon 3",
    icon: "cog",
    block: false,
};

export const IconOnly = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon — Icon Only (Large)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon icon="pencil" onClick={() => {}} />
                    <ButtonIcon icon="cog" onClick={() => {}} />
                    <ButtonIcon icon="trash" onClick={() => {}} />
                    <ButtonIcon icon="plus" onClick={() => {}} />
                    <ButtonIcon icon="xmark" onClick={() => {}} />
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon2 — Icon Only (Medium)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon2 icon="pencil" onClick={() => {}} />
                    <ButtonIcon2 icon="cog" onClick={() => {}} />
                    <ButtonIcon2 icon="trash" onClick={() => {}} />
                    <ButtonIcon2 icon="plus" onClick={() => {}} />
                    <ButtonIcon2 icon="xmark" onClick={() => {}} />
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon3 — Icon Only (Small)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon3 icon="pencil" onClick={() => {}} />
                    <ButtonIcon3 icon="cog" onClick={() => {}} />
                    <ButtonIcon3 icon="trash" onClick={() => {}} />
                    <ButtonIcon3 icon="plus" onClick={() => {}} />
                    <ButtonIcon3 icon="xmark" onClick={() => {}} />
                </div>
            </div>
        </div>
    </MockWrapper>
);

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon (Large)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon text="Edit" icon="pencil" onClick={() => {}} />
                    <ButtonIcon icon="pencil" onClick={() => {}} />
                    <ButtonIcon text="Disabled" icon="pencil" disabled={true} />
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon2 (Medium)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon2 text="Edit" icon="pencil" onClick={() => {}} />
                    <ButtonIcon2 icon="pencil" onClick={() => {}} />
                    <ButtonIcon2
                        text="Disabled"
                        icon="pencil"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon3 (Small)
                </h3>
                <div className="flex flex-row items-center gap-4">
                    <ButtonIcon3 text="Edit" icon="pencil" onClick={() => {}} />
                    <ButtonIcon3 icon="pencil" onClick={() => {}} />
                    <ButtonIcon3
                        text="Disabled"
                        icon="pencil"
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    </MockWrapper>
);
