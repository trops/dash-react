import { DashPanel, DashPanel2, DashPanel3 } from "./DashPanel";
import { MockWrapper, MockLayout, mock, mockText } from "../Mock";
import { Paragraph, Paragraph2, Paragraph3 } from "./Text";

export default {
    title: "Common/DashPanel",
    component: DashPanel,
};

const Template = (args) => {
    console.log("dash panel args ", args);
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel>
                <DashPanel.Header title={args.title}>
                    {args.title}
                </DashPanel.Header>
                <DashPanel.Body>TESTING</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-128",
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel2>
                <DashPanel2.Header title={args.title}>
                    {args.title}
                </DashPanel2.Header>
                <DashPanel2.Body>
                    <Paragraph2 text={mockText.paragraph} />
                </DashPanel2.Body>
                <DashPanel2.Footer>Footer</DashPanel2.Footer>
            </DashPanel2>
        </MockWrapper>
    );
};

export const Secondary = Template2.bind({});

Secondary.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel3>
                <DashPanel3.Header title={args.title} />
                <DashPanel3.Body>
                    {/* <Paragraph3 text={mockText.paragraph} /> */}
                </DashPanel3.Body>
                <DashPanel3.Footer>Footer</DashPanel3.Footer>
            </DashPanel3>
        </MockWrapper>
    );
};

export const Tertiary = Template3.bind({});

Tertiary.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-full",
};

// No Header or Footer
const TemplateNoHeader = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
        </MockWrapper>
    );
};

export const PrimaryNoHeader = TemplateNoHeader.bind({});

PrimaryNoHeader.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

// No Header or Footer
const TemplateNoHeaderFooter = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
            </DashPanel>
        </MockWrapper>
    );
};

export const PrimaryNoHeaderFooter = TemplateNoHeaderFooter.bind({});

PrimaryNoHeaderFooter.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

const TemplatePrimaryMultiple = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} {...args}>
            <DashPanel>
                <DashPanel.Header title={args.title}>
                    {args.title}
                </DashPanel.Header>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
            <DashPanel>
                <DashPanel.Header title={args.title}>
                    {args.title}
                </DashPanel.Header>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
            <DashPanel>
                <DashPanel.Header title={args.title}>
                    {args.title}
                </DashPanel.Header>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
            <DashPanel>
                <DashPanel.Header title={args.title}>
                    {args.title}
                </DashPanel.Header>
                <DashPanel.Body>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
        </MockWrapper>
    );
};

export const PrimaryMultiple = TemplatePrimaryMultiple.bind({});

PrimaryMultiple.args = {
    title: "DashPanel",
    scrollable: false,
    height: "h-3/4",
    width: "w-full",
    direction: "col",
    space: "true",
};
