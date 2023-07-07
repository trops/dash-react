import { SubHeading, SubHeading2, SubHeading3 } from "@dash";
import { mock, MockWrapper } from "@dash";

import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "SubHeading",
    component: SubHeading,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading3 {...args} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading",
    backgroundColor: "bg-red-400",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading 2",
    backgroundColor: "bg-red-400",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading 3",
    backgroundColor: "bg-red-400",
};
