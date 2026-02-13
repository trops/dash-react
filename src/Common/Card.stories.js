import { Card, Card2, Card3 } from "./Card";
import { mock, MockWrapper } from "@dash";
import { Heading, Heading2, Heading3 } from "./Text/Heading";
import { Paragraph } from "./Text/Paragraph";
import "@dash/tailwind.css";

export default {
    title: "Common/Card",
    component: Card,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Card {...args}>
                <Card.Header>
                    <Heading title="Card Header" padding={false} />
                </Card.Header>
                <Card.Body>
                    <Paragraph
                        text={
                            mock.mockText ||
                            "This is the card body content. Cards are lighter weight containers perfect for dashboard widgets and content display."
                        }
                    />
                </Card.Body>
                <Card.Footer>
                    <span className="text-sm opacity-75">Card Footer</span>
                </Card.Footer>
            </Card>
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Card2 {...args}>
                <Card2.Header>
                    <Heading2 title="Card Header 2" padding={false} />
                </Card2.Header>
                <Card2.Body>
                    <Paragraph
                        text={
                            mock.mockText ||
                            "This is the card body content with secondary theme colors."
                        }
                    />
                </Card2.Body>
                <Card2.Footer>
                    <span className="text-sm opacity-75">Card Footer 2</span>
                </Card2.Footer>
            </Card2>
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Card3 {...args}>
                <Card3.Header>
                    <Heading3 title="Card Header 3" padding={false} />
                </Card3.Header>
                <Card3.Body>
                    <Paragraph
                        text={
                            mock.mockText ||
                            "This is the card body content with tertiary theme colors."
                        }
                    />
                </Card3.Body>
                <Card3.Footer>
                    <span className="text-sm opacity-75">Card Footer 3</span>
                </Card3.Footer>
            </Card3>
        </MockWrapper>
    );
};

const TemplateSimple = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Card {...args}>
                <Paragraph text="Simple card without header or footer" />
            </Card>
        </MockWrapper>
    );
};

const TemplateClickable = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Card {...args} onClick={() => alert("Card clicked!")} hover={true}>
                <Card.Header>
                    <Heading title="Clickable Card" padding={false} />
                </Card.Header>
                <Card.Body>
                    <Paragraph text="This card is clickable and has hover effects." />
                </Card.Body>
            </Card>
        </MockWrapper>
    );
};

const TemplateGrid = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="grid grid-cols-3 gap-4">
                <Card {...args}>
                    <Card.Header>
                        <Heading title="Card 1" padding={false} />
                    </Card.Header>
                    <Card.Body>
                        <Paragraph text="Card in a grid layout" />
                    </Card.Body>
                </Card>
                <Card2 {...args}>
                    <Card2.Header>
                        <Heading2 title="Card 2" padding={false} />
                    </Card2.Header>
                    <Card2.Body>
                        <Paragraph text="Card in a grid layout" />
                    </Card2.Body>
                </Card2>
                <Card3 {...args}>
                    <Card3.Header>
                        <Heading3 title="Card 3" padding={false} />
                    </Card3.Header>
                    <Card3.Body>
                        <Paragraph text="Card in a grid layout" />
                    </Card3.Body>
                </Card3>
            </div>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const Simple = TemplateSimple.bind({});
export const Clickable = TemplateClickable.bind({});
export const Grid = TemplateGrid.bind({});

Primary.args = {
    padding: "p-4",
    rounded: "rounded-lg",
    shadow: "shadow-md",
};

Secondary.args = {
    padding: "p-4",
    rounded: "rounded-lg",
    shadow: "shadow-md",
};

Tertiary.args = {
    padding: "p-4",
    rounded: "rounded-lg",
    shadow: "shadow-md",
};

Simple.args = {
    padding: "p-6",
    rounded: "rounded-xl",
    shadow: "shadow-lg",
};

Clickable.args = {
    padding: "p-4",
    rounded: "rounded-lg",
    shadow: "shadow-md",
};

Grid.args = {
    padding: "p-4",
    rounded: "rounded-lg",
    shadow: "shadow-sm",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Card (Primary Variant)
                </h3>
                <Card>
                    <Card.Header>
                        <Heading title="Card Header" padding={false} />
                    </Card.Header>
                    <Card.Body>
                        <Paragraph text="This is the primary card variant with default theme colors." />
                    </Card.Body>
                    <Card.Footer>
                        <span className="text-sm opacity-75">Card Footer</span>
                    </Card.Footer>
                </Card>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-6 (default)
                    <br />
                    Rounded: rounded-lg (default)
                    <br />
                    Shadow: shadow-md (default)
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive sizing hierarchy established
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Card2 (Secondary Variant)
                </h3>
                <Card2>
                    <Card2.Header>
                        <Heading2 title="Card Header 2" padding={false} />
                    </Card2.Header>
                    <Card2.Body>
                        <Paragraph text="This is the secondary card variant with theme colors." />
                    </Card2.Body>
                    <Card2.Footer>
                        <span className="text-sm opacity-75">Card Footer 2</span>
                    </Card2.Footer>
                </Card2>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-4 (default)
                    <br />
                    Rounded: rounded-md (default)
                    <br />
                    Shadow: shadow (default)
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Medium sizing, smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Card3 (Tertiary Variant)
                </h3>
                <Card3>
                    <Card3.Header>
                        <Heading3 title="Card Header 3" padding={false} />
                    </Card3.Header>
                    <Card3.Body>
                        <Paragraph text="This is the tertiary card variant with theme colors." />
                    </Card3.Body>
                    <Card3.Footer>
                        <span className="text-sm opacity-75">Card Footer 3</span>
                    </Card3.Footer>
                </Card3>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: p-2 (default)
                    <br />
                    Rounded: rounded (default)
                    <br />
                    Shadow: shadow-sm (default)
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest variant, clear hierarchy
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
