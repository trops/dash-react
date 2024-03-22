import {
    mock,
    mockText,
    MockWrapper,
    MenuItem,
    MenuItem2,
    MenuItem3,
} from "@dash";
import { Menu, Menu2, Menu3 } from "./Menu";
import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Menu",
    component: Menu,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Menu {...args}>
                <MenuItem>Test</MenuItem>
                <MenuItem>Test</MenuItem>
                <MenuItem>Test</MenuItem>
            </Menu>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Menu2 {...args}>
                <MenuItem2>Test</MenuItem2>
                <MenuItem2>Test</MenuItem2>
                <MenuItem2>Test</MenuItem2>
            </Menu2>
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Menu3 {...args}>
                <MenuItem3>Test</MenuItem3>
                <MenuItem3>Test</MenuItem3>
                <MenuItem3>Test</MenuItem3>
            </Menu3>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    scrollable: false,
    height: "h-full",
    width: "w-1/4",
    horizontal: false,
    grow: false,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    scrollable: false,
    height: "h-full",
    width: "w-1/4",
    horizontal: false,
    grow: false,
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    scrollable: false,
    height: "h-full",
    width: "w-1/4",
    horizontal: false,
    grow: false,
};
