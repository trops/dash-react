import { Paragraph, Paragraph2, Paragraph3 } from "@dash";
import { mock, mockText, MockWrapper } from "@dash";

import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Paragraph",
    component: Paragraph,
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
            <Paragraph {...args} />
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
            <Paragraph2 {...args} />
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
            <Paragraph3 {...args} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    height: "h-30",
    scrollable: true,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    height: "h-30",
    scrollable: true,
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    height: "h-30",
    scrollable: true,
};
