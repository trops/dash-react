import { AlgoliaSearchBox } from "./AlgoliaSearchBox";
import { mock, MockWrapper } from "@dash";
import { InstantSearch } from "react-instantsearch-hooks-web";
import "../../tailwind.css";
import algoliasearch from "algoliasearch";

//👇 This default export determines where your story goes in the story list
export default {
    title: "AlgoliaSearchBox",
    component: AlgoliaSearchBox,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    const searchClient = algoliasearch(
        "ZHSCSP4LMX",
        "d49594f0fb42dd19944cb46dc49b6639"
    );
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <InstantSearch
                indexName="dev_find_accelerator"
                searchClient={searchClient}
            >
                <AlgoliaSearchBox {...args} />
            </InstantSearch>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
    placeholder: "Search",
    disabled: false,
};

Disabled.args = {
    placeholder: "Search",
    disabled: true,
};
