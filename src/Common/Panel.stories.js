import { Panel, Panel2, Panel3 } from "./Panel";
import { mock, MockWrapper } from "@dash";

import "@dash/tailwind.css";
import { Heading2 } from "./Text/Heading";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Panel",
    component: Panel,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Panel
                className={"rounded p-10"}
                {...args}
                width={"w-full"}
                height={"h-full"}
            >
                <Heading2 title={args.text} />
            </Panel>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Panel2
                className={"rounded p-10"}
                {...args}
                width={"w-full"}
                height={"h-full"}
            >
                <Heading2 title={args.text} />
            </Panel2>
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Panel3
                className={"rounded p-10"}
                {...args}
                width={"w-full"}
                height={"h-full"}
            >
                <Heading2 title={args.text} />
            </Panel3>
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel 2",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel 3",
};
