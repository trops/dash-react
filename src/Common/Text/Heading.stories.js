import {
    Heading,
    Heading2,
    Heading3,
    SubHeading,
    SubHeading2,
    SubHeading3,
    Paragraph,
} from "@dash";
import { mock, mockText, MockWrapper } from "@dash";

import "@dash/tailwind.css";

export default {
    title: "Common/Text/Heading",
    component: Heading,
};

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
    title: "Heading",
};

Secondary.args = {
    title: "Heading 2",
};

Tertiary.args = {
    title: "Heading 3",
};

Joined.args = {
    title: "Heading",
    subtitle: "Subheading",
};

export const TypographyScale = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-1 p-6">
            <Heading title="Heading — text-5xl bold" padding={false} />
            <Heading2 title="Heading2 — text-4xl bold" padding={false} />
            <Heading3 title="Heading3 — text-3xl semibold" padding={false} />
            <SubHeading
                title="SubHeading — text-2xl semibold"
                padding={false}
            />
            <SubHeading2 title="SubHeading2 — text-xl medium" padding={false} />
            <SubHeading3 title="SubHeading3 — text-lg medium" padding={false} />
        </div>
    </MockWrapper>
);
