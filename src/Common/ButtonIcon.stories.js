import { ButtonIcon, ButtonIcon2, ButtonIcon3 } from "./ButtonIcon";
import { mock, MockWrapper } from "@dash";

import "../tailwind.css";
import { Tag } from "./Tag";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/ButtonIcon",
    component: ButtonIcon,
};

//👇 We create a “template” of how args map to rendering
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

const TemplateWithHeading = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Tag text={"Button Icon 3"} />
            <ButtonIcon3 {...args} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const TertiaryWithHeading = TemplateWithHeading.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon",
    icon: "pencil",
    block: false,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 2",
    icon: "pencil",
    block: false,
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 3",
    icon: "cog",
    block: false,
};

TertiaryWithHeading.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 3",
    icon: "cog",
    block: false,
    direction: "row",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon (Primary Variant)
                </h3>
                <ButtonIcon text="Edit" icon="pencil" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xs lg:text-base
                    <br />
                    Icon size: h-4 w-4
                    <br />
                    Padding: space-x-1 px-4 (with text)
                    <br />
                    Font: font-medium
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive icon size hierarchy
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon2 (Secondary Variant)
                </h3>
                <ButtonIcon2 text="Edit" icon="pencil" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xs lg:text-base 2xl:text-base
                    <br />
                    Icon size: h-4 w-4 (same as primary)
                    <br />
                    Padding: p-1, space-x-1 px-4
                    <br />
                    Font: font-medium
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller padding than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ButtonIcon3 (Tertiary Variant)
                </h3>
                <ButtonIcon3 text="Edit" icon="pencil" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xs lg:text-sm 2xl:text-sm
                    <br />
                    Icon size: h-3 w-3 (smaller)
                    <br />
                    Padding: space-x-1 px-1
                    <br />
                    Font: font-medium
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest icon and padding
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
