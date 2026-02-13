import { Heading, Heading2, Heading3, SubHeading, Paragraph } from "@dash";
import { mock, mockText, MockWrapper } from "@dash";

import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/Text/Heading",
    component: Heading,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Heading {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Heading2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Heading3 {...args} />
        </MockWrapper>
    );
};

const TemplateJoin = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Heading {...args} />
            <SubHeading
                title={args.subtitle}
                backgroundColor={args.backgroundColor}
            />
            <Paragraph backgroundColor={args.backgroundColor}>
                {mockText.paragraph}
            </Paragraph>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const Joined = TemplateJoin.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    title: "Heading",
    backgroundColor: "bg-red-500",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    title: "Heading 2",
    backgroundColor: "bg-red-500",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    title: "Heading 3",
    backgroundColor: "bg-red-500",
};

Joined.args = {
    //👇 The args you need here will depend on your component
    title: "Heading",
    subtitle: "Subheading",
    backgroundColor: "bg-red-500",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Heading (Primary Variant)
                </h3>
                <Heading title="Primary Heading" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-6xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4
                    <br />
                    Font: font-bold
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Clear progressive text size hierarchy
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Heading2 (Secondary Variant)
                </h3>
                <Heading2 title="Secondary Heading" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-5xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4 (same as primary)
                    <br />
                    Font: font-bold
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller text size than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Heading3 (Tertiary Variant)
                </h3>
                <Heading3 title="Tertiary Heading" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-4xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4 (same as primary)
                    <br />
                    Font: font-bold
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest text size
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
