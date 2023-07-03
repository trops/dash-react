import { Widget } from "./Widget";
import { MockWrapper, mock } from "../Mock";
import { Heading, Subheading, Paragraph } from "@dash";
import { LayoutContainer } from "../Layout/LayoutContainer";

export default {
    title: "Widget",
    component: Widget,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <Widget {...args}>
                <Heading title="Widget" />
                <LayoutContainer scrollable={true}>
                    <Paragraph
                        text="
                        Widget Here is the body of the panelHere is the body of
                        the panelHere is the body of the panelHere is the body
                        of the panelHere is the body of the panelHere is the
                        body of the panelHere is the body of the panelHere is
                        the body of the panelHere is the body of the panelHere
                        is the body of the panelHere is the body of the
                        panelHere is the body of the panelHere is the body of
                        the panelHere is the body of the panelHere is the body
                        of the panelHere is the body of the panel panelHere is
                        the body of the panelHere is the body of the panelHere
                        is the body of the panelHere is the body of the
                        panelHere is the body of the panelHere is the body of
                        the panelHere is the body of the panel panelHere is the
                        body of the panelHere is the body of the panelHere is
                        the body of the panelHere is the body of the panelHere
                        is the body of the panelHere is the body of the
                        panelHere is the body of the panel panelHere is the body
                        of the panelHere is the body of the panelHere is the
                        body of the panelHere is the body of the panelHere is
                        the body of the panelHere is the body of the panelHere
                        is the body of the panel panelHere is the body of the
                        panelHere is the body of the panelHere is the body of
                        the panelHere is the body of the panelHere is the body
                        of the panelHere is the body of the panelHere is the
                        body of the panel"
                    />
                </LayoutContainer>
            </Widget>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    title: "Widget",
    scrollable: false,
    height: "h-60",
    variant: "dark",
    backgroundColor: "bg-gray-800",
};
