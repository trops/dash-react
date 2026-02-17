import { Button, Button2, Button3 } from "./Button";
import { mock, MockWrapper } from "../Mock";

import "../tailwind.css";

export default {
    title: "Common/Button",
    component: Button,
};

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
    title: "Button",
    scrollable: false,
};

Secondary.args = {
    title: "Button 2",
};

Tertiary.args = {
    title: "Button 3",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button (Primary Variant)
                </h3>
                <div className="flex gap-2 items-center">
                    <Button title="Primary Button" onClick={() => {}} />
                    <Button title="Small" onClick={() => {}} size="sm" />
                    <Button title="Large" onClick={() => {}} size="lg" />
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button2 (Secondary Variant)
                </h3>
                <div className="flex gap-2 items-center">
                    <Button2 title="Secondary Button" onClick={() => {}} />
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Button3 (Tertiary Variant)
                </h3>
                <div className="flex gap-2 items-center">
                    <Button3 title="Tertiary Button" onClick={() => {}} />
                </div>
            </div>
        </div>
    </MockWrapper>
);
