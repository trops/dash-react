import { Panel, Panel2, Panel3 } from "./Panel";
import { mock, mockText, MockWrapper } from "@dash";
import { LayoutContainer } from "@dash/Layout";
import "@dash/tailwind.css";
import { Heading, Heading2, Heading3 } from "./Text/Heading";
import { Paragraph, Paragraph2, Paragraph3 } from "./Text/Paragraph";

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
        <MockWrapper api={mock.api} args={args}>
            <Panel {...args}>
                <Panel.Header>
                    <Heading title={args.text} padding={false} {...args} />
                </Panel.Header>
                <Panel.Body>
                    <Paragraph text={mockText.paragraph} />
                </Panel.Body>
                <Panel.Footer>Footer</Panel.Footer>
            </Panel>
        </MockWrapper>
    );
};

const TemplateScroll = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Panel {...args}>
                <Panel.Header>
                    <Heading title={args.text} padding={false} {...args} />
                </Panel.Header>
                <Panel.Body>
                    <Paragraph text={mockText.paragraph} />
                </Panel.Body>
                <Panel.Footer>Footer</Panel.Footer>
            </Panel>
        </MockWrapper>
    );
};

const TemplateHorizontal = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Panel {...args}>
                <Panel.Header>
                    <Heading title={args.text} padding={false} {...args} />
                </Panel.Header>
                <Panel.Body>
                    <Paragraph text={mockText.paragraph} />
                </Panel.Body>
                <Panel.Footer>Footer</Panel.Footer>
            </Panel>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} args={args} height="h-full">
            <Panel2 {...args}>
                <Panel2.Header>
                    <Heading2 title={args.text} padding={false} />
                </Panel2.Header>
                <Panel2.Body>
                    <Paragraph2 text={mockText.paragraph} />
                </Panel2.Body>
                <Panel2.Footer>Footer</Panel2.Footer>
            </Panel2>
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Panel3 {...args}>
                <Panel3.Header>
                    <Heading3 title={args.text} padding={false} />
                </Panel3.Header>
                <Panel3.Body>
                    <Paragraph3 text={mockText.paragraph} />
                </Panel3.Body>
                <Panel3.Footer>Footer</Panel3.Footer>
            </Panel3>
        </MockWrapper>
    );
};

const TemplateNoHeader = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Panel {...args}>
                <Panel.Body className="h-full">
                    <Paragraph text={mockText.paragraph} />
                </Panel.Body>
            </Panel>
        </MockWrapper>
    );
};

const TemplateNoScroll = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <Panel {...args}>
                <Panel.Body>
                    <Paragraph text={mockText.paragraph} scrollable={false} />
                </Panel.Body>
            </Panel>
        </MockWrapper>
    );
};

const TemplateMultiple = (args) => {
    return (
        <MockWrapper api={mock.api} args={args}>
            <LayoutContainer
                direction="col"
                scrollable={false}
                height="h-full"
                grow={false}
            >
                <Panel>
                    <Panel.Header>
                        <Heading title={args.text} padding={false} />
                    </Panel.Header>
                    <Panel.Body>
                        <Paragraph text={mockText.paragraph} />
                    </Panel.Body>
                    <Panel.Footer>Footer</Panel.Footer>
                </Panel>
                <Panel>
                    <Panel.Header>
                        <Heading title={args.text} padding={false} />
                    </Panel.Header>
                    <Panel.Body>
                        <Paragraph text={mockText.paragraph} />
                    </Panel.Body>
                    <Panel.Footer>Footer</Panel.Footer>
                </Panel>
            </LayoutContainer>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const PrimaryScroll = TemplateScroll.bind({});
export const PrimaryHorizontal = TemplateHorizontal.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const NoHeader = TemplateNoHeader.bind({});
export const NoScroll = TemplateNoScroll.bind({});
export const Multiple = TemplateMultiple.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
    scrollable: false,
    height: "h-full",
    width: "w-full",
    horizontal: false,
    grow: false,
};

PrimaryScroll.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
    scrollable: true,
    height: "h-full",
    width: "w-full",
    horizontal: false,
    grow: true,
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel 2",
    scrollable: false,
    height: "h-2/3",
    width: "w-full",
    horizontal: false,
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel 3",
    scrollable: true,
    height: "h-full",
    width: "w-full",
    horizontal: false,
    padding: true,
};

PrimaryHorizontal.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
    scrollable: true,
    height: "h-full",
    width: "w-full",
    horizontal: true,
};

NoHeader.args = {
    //👇 The args you need here will depend on your component
    text: "Panel No Header",
    scrollable: false,
    height: "h-1/2",
    width: "w-full",
    horizontal: false,
};

NoScroll.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
    scrollable: false,
    height: "h-full",
    width: "w-full",
    horizontal: false,
};

Multiple.args = {
    //👇 The args you need here will depend on your component
    text: "Panel",
    scrollable: false,
    height: "h-full",
    width: "w-full",
    horizontal: false,
    grow: false,
};
