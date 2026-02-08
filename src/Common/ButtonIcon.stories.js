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
    backgroundColor: "bg-yellow-800",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 2",
    icon: "pencil",
    block: false,
    backgroundColor: "bg-yellow-800",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 3",
    icon: "cog",
    block: false,
    backgroundColor: "bg-yellow-800",
};

TertiaryWithHeading.args = {
    //👇 The args you need here will depend on your component
    text: "ButtonIcon 3",
    icon: "cog",
    block: false,
    backgroundColor: "bg-yellow-800",
    direction: "row",
};
