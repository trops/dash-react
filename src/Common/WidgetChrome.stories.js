import { WidgetChrome } from "./WidgetChrome";
import { mock, MockWrapper } from "@dash";
import { Paragraph } from "./Text/Paragraph";
import "@dash/tailwind.css";

export default {
    title: "Common/WidgetChrome",
    component: WidgetChrome,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <WidgetChrome {...args}>
            <Paragraph text="Widget content goes here." />
        </WidgetChrome>
    </MockWrapper>
);

const TemplateWithFooter = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <WidgetChrome
            {...args}
            footer={<div className="text-sm opacity-75">Updated 2 min ago</div>}
        >
            <Paragraph text="Widget content with footer." />
        </WidgetChrome>
    </MockWrapper>
);

export const Primary = Template.bind({});
export const WithFooter = TemplateWithFooter.bind({});

Primary.args = {
    title: "Widget Title",
    onRefresh: () => {},
    onSettings: () => {},
    onRemove: () => {},
};

WithFooter.args = {
    title: "Widget Title",
    onRefresh: () => {},
    onSettings: () => {},
    onRemove: () => {},
};
