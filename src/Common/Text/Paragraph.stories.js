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
    console.log(mockText.paragraph);
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
            scrollable={false}
        >
            <Paragraph {...args} padding="p-4">
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

const TemplatePriScrollable = (args) => {
    console.log(mockText.paragraph);
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
            scrollable={false}
        >
            <Paragraph {...args} padding="p-4">
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

const TemplateFullHeight = (args) => {
    console.log(mockText.paragraph);
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
            scrollable={false}
        >
            <Paragraph {...args} padding="p-4">
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

const TemplateMultiple = (args) => {
    console.log(mockText.paragraph);
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-700"}
            scrollable={false}
        >
            <Paragraph {...args}>
                {mockText.paragraph}
            </Paragraph>
            <Paragraph {...args}>
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

const TemplateMultipleScrollable = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-700"}
            scrollable={false}
            height="h-1/2"
        >
            <Paragraph {...args}>
                {mockText.paragraph}
            </Paragraph>
            <Paragraph {...args}>
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Paragraph2 {...args} className={args.className} />
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
export const PrimaryScrollable = TemplatePriScrollable.bind({});
export const PrimaryMultipleScrollable = TemplateMultipleScrollable.bind({});
export const PrimaryFullHeight = TemplateFullHeight.bind({});
export const PrimaryMultiple = TemplateMultiple.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    debug: true,
    scrollable: false,
    padding: "p-6",
};

PrimaryScrollable.args = {
    //👇 The args you need here will depend on your component
    debug: true,
    scrollable: true,
    padding: "p-6",
};

PrimaryFullHeight.args = {
    //👇 The args you need here will depend on your component
    debug: true,
    scrollable: true,
    padding: "p-6",
    height: "h-full"
};



PrimaryMultiple.args = {
    debug: true
};

PrimaryMultipleScrollable.args = {
    debug: true,
    scrollable: true,
    height: ""
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    debug: true,
    text: mockText.paragraph,
    scrollable: false,
    // className: "bg-gray-800 text-gray-200 p-4",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    debug: true,
    text: mockText.paragraph,
    grow: false,
    space: true,
    className: "bg-gray-800 text-gray-300",
};
