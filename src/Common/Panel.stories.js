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
    title: "Common/Panel",
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
    backgroundColor: "bg-green-200",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    text: "Panel 3",
    scrollable: true,
    height: "h-full",
    width: "w-full",
    direction: "vertical",
    padding: true,
    backgroundColor: "bg-red-500",
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

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Panel (Primary Variant)
                </h3>
                <div className="h-64">
                    <Panel>
                        <Panel.Header>
                            <Heading title="Panel Header" padding={false} />
                        </Panel.Header>
                        <Panel.Body>
                            <Paragraph text="This is the primary panel variant with the most spacious padding." />
                        </Panel.Body>
                        <Panel.Footer>Panel Footer</Panel.Footer>
                    </Panel>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Default padding: p-6 (Panel, Header, Body, Footer)
                    <br />
                    Rounded: rounded-lg
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive padding pattern
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Panel2 (Secondary Variant)
                </h3>
                <div className="h-64">
                    <Panel2>
                        <Panel2.Header>
                            <Heading2 title="Panel Header 2" padding={false} />
                        </Panel2.Header>
                        <Panel2.Body>
                            <Paragraph2 text="This is the secondary panel variant with moderate padding." />
                        </Panel2.Body>
                        <Panel2.Footer>Panel Footer 2</Panel2.Footer>
                    </Panel2>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Default padding: p-4 (Panel, Header, Body, Footer)
                    <br />
                    Rounded: rounded-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Medium padding, less rounded
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Panel3 (Tertiary Variant)
                </h3>
                <div className="h-64">
                    <Panel3>
                        <Panel3.Header>
                            <Heading3 title="Panel Header 3" padding={false} />
                        </Panel3.Header>
                        <Panel3.Body>
                            <Paragraph3 text="This is the tertiary panel variant with compact padding." />
                        </Panel3.Body>
                        <Panel3.Footer>Panel Footer 3</Panel3.Footer>
                    </Panel3>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Default padding: p-2 (Panel, Header, Body, Footer)
                    <br />
                    Rounded: rounded
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Compact padding, minimal rounding
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
