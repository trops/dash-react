import { AlgoliaSearchBox } from "./AlgoliaSearchBox";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    title: "AlgoliaSearchBox",
    component: AlgoliaSearchBox,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            {/* <AlgoliaSearchBox {...args} /> */}
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    test: "testing",
};
