import { MenuItem, MenuItem2, MenuItem3 } from "./MenuItem";
import { mock, MockWrapper } from "@dash";

import "../tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/MenuItem",
    component: MenuItem,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <MenuItem {...args}>text</MenuItem>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <MenuItem2 {...args}>text</MenuItem2>
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <MenuItem3 {...args}>text</MenuItem3>
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: "MenuItem",
    scrollable: false,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    title: "MenuItem 2",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    title: "MenuItem 3",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    MenuItem (Primary Variant)
                </h3>
                <MenuItem onClick={() => {}}>Primary Menu Item</MenuItem>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-lg
                    <br />
                    Padding: p-4
                    <br />
                    Font: font-bold
                    <br />
                    Spacing: space-x-2
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive size/padding/weight hierarchy
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    MenuItem2 (Secondary Variant)
                </h3>
                <MenuItem2 onClick={() => {}}>Secondary Menu Item</MenuItem2>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-base
                    <br />
                    Padding: p-2 px-4
                    <br />
                    Font: font-medium
                    <br />
                    Spacing: space-x-2
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    MenuItem3 (Tertiary Variant)
                </h3>
                <MenuItem3 onClick={() => {}}>Tertiary Menu Item</MenuItem3>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-sm
                    <br />
                    Padding: p-2 px-4 (same as secondary)
                    <br />
                    Font: font-normal
                    <br />
                    Spacing: space-x-2
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest text and lightest font
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
