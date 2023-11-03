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
            backgroundColor={"bg-gray-600"}
        >
            <Paragraph {...args} className={args.className} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Paragraph2 {...args} className={args.className} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-600"}
        >
            <Paragraph3 {...args} className={args.className} />
            <Paragraph3 {...args} className={args.className} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    height: "h-full",
    scrollable: true,
    // className: "bg-green-900 text-gray-200 p-6",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    height: "h-full",
    scrollable: false,
    // className: "bg-gray-800 text-gray-200 p-4",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: mockText.paragraph,
    grow: false,
    space: true,
    height: "h-full",
    className: "bg-gray-800 text-gray-300",
};
