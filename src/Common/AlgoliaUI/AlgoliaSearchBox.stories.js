import { AlgoliaSearchBox } from "./AlgoliaSearchBox";
import { mock, MockAlgolia } from "@dash";
import { Hits } from "react-instantsearch-hooks-web";
import { Tag } from "../Tag";

console.log("MOCK: ", mock);
//👇 This default export determines where your story goes in the story list
export default {
    title: "Common/AlgoliaUI/AlgoliaSearchBox",
    component: AlgoliaSearchBox,
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
            <Hits hitComponent={Hit} />
        </MockAlgolia>
    );
};

export const Primary = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
    placeholder: "Search",
    disabled: false,
    scrollable: false,
    space: true,
    grow: true,
};

Disabled.args = {
    placeholder: "Search",
    disabled: true,
};
