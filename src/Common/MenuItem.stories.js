import { MenuItem, MenuItem2, MenuItem3 } from "./MenuItem";
import { mock, MockWrapper } from "@dash";

import "../tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "MenuItem",
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
