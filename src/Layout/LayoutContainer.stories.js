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
            <LayoutContainer direction="col" grow={false} scrollable={true}>
                <LayoutContainer
                    direction="row"
                    className="p-4 bg-green-500"
                    grow={false}
                >
                    TEST ROW
                </LayoutContainer>
                <LayoutContainer
                    direction="row"
                    grow={false}
                    scrollable={true}
                    height="h-full"
                    className="bg-orange-500 p-4 flex-grow overflow-auto"
                >
                    <Workspace
                        direction="col"
                        className={"p-4 bg-blue-500 rounded"}
                        grow={true}
                        scrollable={true}
                    >
                        <Widget
                            {...args.widgetArgs}
                            className="p-4 bg-blue-300 rounded"
                        >
                            {mockText.paragraph}
                        </Widget>

                        <Widget
                            {...args.widgetArgs}
                            className="p-4 bg-blue-300 rounded"
                        >
                            {mockText.paragraph}
                        </Widget>

                        <Widget
                            {...args.widgetArgs}
                            className="p-4 bg-blue-300 rounded"
                        >
                            {mockText.paragraph}
                        </Widget>
                    </Workspace>
                    <Workspace
                        direction="col"
                        className={"p-4 bg-green-500"}
                        grow={false}
                        scrollable={true}
                    >
                        <LayoutContainer {...args.layoutArgs} direction="col">
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                    </Workspace>
                    <Workspace
                        direction="col"
                        className={"p-4 bg-green-500"}
                        grow={false}
                    >
                        <LayoutContainer {...args.layoutArgs}>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                        <LayoutContainer {...args.layoutArgs}>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                        <LayoutContainer {...args.layoutArgs}>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                    </Workspace>
                </LayoutContainer>
            </LayoutContainer>
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
        grow: false,
        height: "h-full",
    },
    widgetArgs: {
        scrollable: false,
        grow: true,
        height: "h-full",
    },
};
