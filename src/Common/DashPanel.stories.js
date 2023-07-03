import { DashPanel, DashPanel2, DashPanel3 } from "./DashPanel";
import { MockWrapper, mock, mockText } from "../Mock";

export default {
    title: "DashPanel",
    component: DashPanel,
};

const Template = (args) => {
    console.log("dash panel args ", args);
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel {...args}>
                <DashPanel.Header title={args.title} />
                <DashPanel.Body {...args}>{mockText.paragraph}</DashPanel.Body>
                <DashPanel.Footer>Footer</DashPanel.Footer>
            </DashPanel>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel2 {...args}>
                <DashPanel2.Header title={args.title}>
                    {args.title}
                </DashPanel2.Header>
                <DashPanel2.Body {...args}>
                    {mockText.paragraph}
                </DashPanel2.Body>
                <DashPanel2.Footer>Footer</DashPanel2.Footer>
            </DashPanel2>
        </MockWrapper>
    );
};

export const Primary2 = Template2.bind({});

Primary2.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel3>
                <DashPanel3.Header title={args.title}>
                    {args.title}
                </DashPanel3.Header>
                <DashPanel3.Body {...args}>
                    {mockText.paragraph}
                </DashPanel3.Body>
                <DashPanel3.Footer>Footer</DashPanel3.Footer>
            </DashPanel3>
        </MockWrapper>
    );
};

export const Primary3 = Template3.bind({});

Primary3.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};

// No Header or Footer
const TemplateNoHeader = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashPanel3>
                <DashPanel3.Body {...args}>
                    {mockText.paragraph}
                </DashPanel3.Body>
                <DashPanel2.Footer>Footer</DashPanel2.Footer>
            </DashPanel3>
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
            <DashPanel3>
                <DashPanel3.Body {...args}>
                    {mockText.paragraph}
                </DashPanel3.Body>
            </DashPanel3>
        </MockWrapper>
    );
};

export const PrimaryNoHeaderFooter = TemplateNoHeaderFooter.bind({});

PrimaryNoHeaderFooter.args = {
    title: "DashPanel",
    scrollable: true,
    height: "h-60",
};
