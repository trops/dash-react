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
            args={{ direction: "col", ...args }}
        >
            <LayoutContainer
                id="outer-container"
                direction="col"
                grow={false}
                scrollable={false}
                space={true}
            >
                <LayoutContainer
                    direction="row"
                    className="bg-green-500"
                    grow={false}
                    id="top-row"
                >
                    TEST ROW
                </LayoutContainer>
                <LayoutContainer
                    direction="row"
                    grow={true}
                    scrollable={true}
                    height="h-full"
                    className="bg-orange-500"
                    id="row-2"
                    space={true}
                >
                    <Workspace
                        direction="col"
                        className={"bg-blue-500 rounded"}
                        grow={true}
                        scrollable={true}
                        space={true}
                    >
                        <Widget {...args.widgetArgs}>
                            {mockText.paragraph}
                        </Widget>

                        <Widget {...args.widgetArgs}>
                            {mockText.paragraph}
                        </Widget>

                        <Widget {...args.widgetArgs}>
                            {mockText.paragraph}
                        </Widget>
                    </Workspace>

                    <Workspace
                        direction="col"
                        className={"bg-blue-500 rounded"}
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

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                    </Workspace>

                    <Workspace
                        direction="col"
                        className={"bg-blue-500 rounded"}
                        grow={true}
                        scrollable={true}
                    >
                        <LayoutContainer direction={"col"} {...args.layoutArgs}>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

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

const TemplateLayoutThreeRow = (args) => {
    return (
        <MockLayout
            api={mock.api}
            theme={mock.themes}
            args={{ direction: "col", ...args }}
        >
            <LayoutContainer
                id="outer-container"
                direction="col"
                grow={false}
                scrollable={false}
                space={true}
            >
                <LayoutContainer
                    direction="row"
                    className="bg-green-500"
                    grow={false}
                    id="top-row"
                >
                    TEST ROW
                </LayoutContainer>
                <LayoutContainer
                    direction="col"
                    grow={true}
                    scrollable={true}
                    height="h-full"
                    className="bg-orange-500"
                    id="row-2"
                    space={true}
                >
                    <Workspace direction="row">
                        <LayoutContainer {...args.layoutArgs} direction="row">
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                    </Workspace>

                    <Workspace direction="col">
                        <LayoutContainer {...args.layoutArgs} direction="row">
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>
                        </LayoutContainer>
                    </Workspace>

                    <Workspace direction="col">
                        <LayoutContainer direction={"row"} {...args.layoutArgs}>
                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

                            <Widget {...args.widgetArgs}>
                                {mockText.paragraph}
                            </Widget>

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
export const ThreeRow = TemplateLayoutThreeRow.bind({});
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
        height: "h-full",
        backgroundColor: "bg-blue-500",
    },
};

ThreeRow.args = {
    title: "LayoutContainer",
    scrollable: true,
    height: "h-60",
    variant: "light",
    layoutArgs: {
        scrollable: false,
        grow: false,
        height: "h-full",
        space: true,
    },
    widgetArgs: {
        height: "h-full",
        className: "bg-blue-500",
        space: true,
        grow: true,
        scrollable: true,
    },
};
