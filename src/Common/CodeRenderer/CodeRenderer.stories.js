import { CodeRenderer } from "./CodeRenderer";

export default {
    title: "CodeRenderer",
    component: CodeRenderer,
};

const Template = (args) => {
    return <CodeRenderer {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
    title: "CodeRenderer",
    template: "<div>{{something}}</div>",
    data: { something: "test" },
};

export const PrimaryError = Template.bind({});

PrimaryError.args = {
    title: "CodeRenderer",
    template: "<div>{{something</div>",
    data: { something: "test" },
};
