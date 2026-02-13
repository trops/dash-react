import { Button, Button2, Button3 } from "./Button";
import { mock, MockWrapper } from "../Mock";

import "../tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/Button",
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Button {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Button2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Button3 {...args} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    title: "Button",
    scrollable: false,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    title: "Button 2",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    title: "Button 3",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button (Primary Variant)
                </h3>
                <Button title="Primary Button" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text: text-lg lg:text-xl xl:text-xl 2xl:text-2xl
                    <br />
                    Padding: p-2 py-1 px-2 lg:px-4 lg:py-2 xl:px-6 xl:py-4
                    <br />
                    Font: font-bold
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button2 (Secondary Variant)
                </h3>
                <Button2 title="Secondary Button" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text: text-base lg:text-lg 2xl:text-xl
                    <br />
                    Padding: p-1 lg:p-2 xl:p-4
                    <br />
                    Font: font-medium
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button3 (Tertiary Variant)
                </h3>
                <Button3 title="Tertiary Button" onClick={() => {}} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text: text-sm xl:text-base 2xl:text-base
                    <br />
                    Padding: p-1 lg:p-1 xl:p-2
                    <br />
                    Font: font-normal
                </div>
            </div>
        </div>
    </MockWrapper>
);
