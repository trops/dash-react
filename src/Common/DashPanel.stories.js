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

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DashPanel (Primary Variant)
                </h3>
                <div className="h-64">
                    <DashPanel>
                        <DashPanel.Header title="Dashboard Panel">
                            Dashboard Panel Header
                        </DashPanel.Header>
                        <DashPanel.Body>
                            <Paragraph text="This is the primary dashboard panel variant." />
                        </DashPanel.Body>
                        <DashPanel.Footer>DashPanel Footer</DashPanel.Footer>
                    </DashPanel>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Similar to Panel with dashboard-specific styling
                    <br />
                    Theme keys: DASH_PANEL, DASH_PANEL_HEADER, DASH_PANEL_FOOTER
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Check if padding/sizing differs across variants
                        like Panel does
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DashPanel2 (Secondary Variant)
                </h3>
                <div className="h-64">
                    <DashPanel2>
                        <DashPanel2.Header title="Dashboard Panel 2">
                            Dashboard Panel 2 Header
                        </DashPanel2.Header>
                        <DashPanel2.Body>
                            <Paragraph2 text="This is the secondary dashboard panel variant." />
                        </DashPanel2.Body>
                        <DashPanel2.Footer>DashPanel2 Footer</DashPanel2.Footer>
                    </DashPanel2>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Similar to Panel2 with dashboard-specific styling
                    <br />
                    Theme keys: DASH_PANEL_2, DASH_PANEL_HEADER_2,
                    DASH_PANEL_FOOTER_2
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Validate sizing progression from primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DashPanel3 (Tertiary Variant)
                </h3>
                <div className="h-64">
                    <DashPanel3>
                        <DashPanel3.Header title="Dashboard Panel 3" />
                        <DashPanel3.Body>
                            <Paragraph3 text="This is the tertiary dashboard panel variant." />
                        </DashPanel3.Body>
                        <DashPanel3.Footer>DashPanel3 Footer</DashPanel3.Footer>
                    </DashPanel3>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Similar to Panel3 with dashboard-specific styling
                    <br />
                    Theme keys: DASH_PANEL_3, DASH_PANEL_HEADER_3,
                    DASH_PANEL_FOOTER_3
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Validate sizing progression from primary and
                        secondary
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
