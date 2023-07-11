import { AlgoliaSearchBox } from "./AlgoliaSearchBox";
import { AlgoliaRefinementList } from "./AlgoliaRefinementList";
import { LayoutContainer } from "@dash/Layout";
import { mock, MockAlgolia } from "@dash";
import { Hits } from "react-instantsearch-hooks-web";
import { Tag } from "../Tag";
import { DashPanel } from "../DashPanel";

console.log("MOCK: ", mock);
//👇 This default export determines where your story goes in the story list
export default {
    title: "AlgoliaRefinementList",
    component: AlgoliaRefinementList,
};

//👇 We create a “template” of how args map to rendering
const Template = (args, ...props) => {
    const Hit = ({ hit }) => (
        <div className="flex flex-row bg-gray-900 p-2 rounded space-x-2">
            <Tag text={hit.objectID} />
            <p className="text-xs font-mono bg-green-500 p-2">{hit.title}</p>
        </div>
    );

    return (
        <MockAlgolia api={mock.api} theme={mock.themes} args={args}>
            <AlgoliaSearchBox {...args} />
            <LayoutContainer
                direction="row"
                space={true}
                scrollable={true}
                grow={false}
                width={"w-full"}
            >
                <LayoutContainer
                    direction="col"
                    scrollable={true}
                    grow={false}
                    width={"w-1/4"}
                >
                    <DashPanel>
                        <DashPanel.Header title="Tags" />
                        <DashPanel.Body>
                            <AlgoliaRefinementList attribute="tags" />
                        </DashPanel.Body>
                    </DashPanel>
                </LayoutContainer>
                <LayoutContainer
                    direction="col"
                    scrollable={false}
                    grow={true}
                    width={"w-full"}
                >
                    <Hits
                        hitComponent={Hit}
                        classNames={{ root: "space-y-1", list: "space-y-1" }}
                    />
                </LayoutContainer>
            </LayoutContainer>
            <LayoutContainer
                direction="row"
                space={true}
                scrollable={true}
                className="bg-red-500 rounded p-4"
            >
                Footer
            </LayoutContainer>
        </MockAlgolia>
    );
};

//👇 We create a “template” of how args map to rendering
const TemplateTwoRows = (args, ...props) => {
    const Hit = ({ hit }) => (
        <div className="flex flex-row bg-gray-900 p-2 rounded space-x-2">
            <Tag text={hit.objectID} />
            <p className="text-xs font-mono bg-green-500 p-2">{hit.title}</p>
        </div>
    );

    return (
        <MockAlgolia api={mock.api} theme={mock.themes} args={args}>
            <AlgoliaSearchBox {...args} />
            <LayoutContainer
                direction="row"
                space={true}
                scrollable={true}
                grow={true}
                width={"w-full"}
                height={"h-full"}
            >
                <LayoutContainer
                    direction="col"
                    scrollable={true}
                    grow={true}
                    width={"w-1/4"}
                >
                    <DashPanel>
                        <DashPanel.Header title="Tags" />
                        <DashPanel.Body>
                            <AlgoliaRefinementList attribute="tags" />
                        </DashPanel.Body>
                    </DashPanel>

                    <DashPanel>
                        <DashPanel.Header title="Tags" />
                        <DashPanel.Body>
                            <AlgoliaRefinementList attribute="tags" />
                        </DashPanel.Body>
                    </DashPanel>
                </LayoutContainer>
                <LayoutContainer
                    direction="col"
                    scrollable={false}
                    grow={true}
                    width={"w-full"}
                    height={"h-full"}
                >
                    <Hits
                        hitComponent={Hit}
                        classNames={{ root: "space-y-1", list: "space-y-1" }}
                    />
                </LayoutContainer>
            </LayoutContainer>
            <LayoutContainer
                direction="row"
                space={true}
                scrollable={true}
                className="bg-red-500 rounded p-4"
                height={"h-auto"}
            >
                Footer
            </LayoutContainer>
        </MockAlgolia>
    );
};

export const Primary = Template.bind({});
export const TwoRows = TemplateTwoRows.bind({});
export const Disabled = Template.bind({});

Primary.args = {
    placeholder: "Search",
    disabled: false,
    scrollable: false,
    space: true,
    grow: true,
    height: "h-full",
};

TwoRows.args = {
    placeholder: "Search",
    disabled: false,
    scrollable: false,
    space: true,
    grow: true,
    height: "h-1/4",
};

Disabled.args = {
    placeholder: "Search",
    disabled: true,
};
