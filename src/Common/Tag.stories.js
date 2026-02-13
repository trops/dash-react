import { Tag, Tag2, Tag3 } from "./Tag";
import { mock, MockWrapper } from "@dash";

import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/Tag",
    component: Tag,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Tag {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Tag2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Tag3 {...args} />
        </MockWrapper>
    );
};

const Template4 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Tag3 {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const TertiaryClassName = Template4.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: "Tag",
    textColor: "text-gray-200",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: "Tag 2",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "Tag 3",
};

TertiaryClassName.args = {
    //👇 The args you need here will depend on your component
    text: "Tag 3 Custom",
    className: "bg-red-500 text-xl text-yellow-200 uppercase font-bold",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Tag (Primary Variant)
                </h3>
                <Tag text="Primary Tag" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-sm (default)
                    <br />
                    Padding: px-3 py-1.5
                    <br />
                    Font: font-medium
                    <br />
                    Rounded: rounded
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive text/padding/font hierarchy established
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Tag2 (Secondary Variant)
                </h3>
                <Tag2 text="Secondary Tag" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xs (default)
                    <br />
                    Padding: px-2 py-1
                    <br />
                    Font: font-medium
                    <br />
                    Rounded: rounded
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Tag3 (Tertiary Variant)
                </h3>
                <Tag3 text="Tertiary Tag" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xs (default)
                    <br />
                    Padding: px-1.5 py-0.5
                    <br />
                    Font: font-normal
                    <br />
                    Rounded: rounded
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest variant, clear hierarchy
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
