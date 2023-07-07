import { LayoutContainer } from "./LayoutContainer";
import { MockWrapper, MockLayout, mock, mockText } from "../Mock";
import { Workspace } from "..";
import { Widget } from "..";

export default {
    title: "LayoutContainer",
    component: LayoutContainer,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <LayoutContainer {...args}>{mockText.paragraph}</LayoutContainer>
        </MockWrapper>
    );
};

const TemplateLayoutThreeColumn = (args) => {
    return (
        <MockLayout
            api={mock.api}
            theme={mock.themes}
            args={{ direction: "row", ...args }}
        >
            <Workspace
                direction="col"
                scrollable={true}
                className={"p-4 bg-blue-500 rounded"}
            >
                <LayoutContainer {...args.layoutArgs}>
                    <Widget
                        {...args.widgetArgs}
                        className="p-4 bg-blue-300 rounded"
                    >
                        {mockText.paragraph}
                    </Widget>
                </LayoutContainer>
                <LayoutContainer {...args.layoutArgs}>
                    <Widget
                        {...args.widgetArgs}
                        className="p-4 bg-blue-300 rounded"
                    >
                        {mockText.paragraph}
                    </Widget>
                </LayoutContainer>
                <LayoutContainer {...args.layoutArgs}>
                    <Widget
                        {...args.widgetArgs}
                        className="p-4 bg-blue-300 rounded"
                    >
                        {mockText.paragraph}
                    </Widget>
                </LayoutContainer>
            </Workspace>
            <Workspace direction="col" className={"p-4 bg-green-500"}>
                <LayoutContainer {...args.layoutArgs}>
                    <Widget {...args.widgetArgs}>{mockText.paragraph}</Widget>
                </LayoutContainer>
                <LayoutContainer {...args.layoutArgs}>
                    <Widget {...args.widgetArgs}>{mockText.paragraph}</Widget>
                </LayoutContainer>
                <LayoutContainer {...args.layoutArgs}>
                    <Widget {...args.widgetArgs}>{mockText.paragraph}</Widget>
                </LayoutContainer>
            </Workspace>
        </MockLayout>
    );
};

export const Primary = Template.bind({});
export const ThreeColumn = TemplateLayoutThreeColumn.bind({});

Primary.args = {
    title: "LayoutContainer",
    scrollable: true,
    height: "h-60",
    variant: "light",
};

ThreeColumn.args = {
    title: "LayoutContainer",
    scrollable: true,
    height: "h-60",
    variant: "light",
    layoutArgs: {
        scrollable: false,
        height: "h-full",
    },
    widgetArgs: {
        scrollable: false,
        height: "h-full",
    },
};
