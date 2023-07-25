import { MockWrapper, MockLayout, mock, mockText } from "../../Mock";
import { CodeRenderer } from "./CodeRenderer";
import "@dash/tailwind.css";

export default {
    title: "CodeRenderer",
    component: CodeRenderer,
};

const Template = (args) => {
    return (
        <MockWrapper>
            <div className="flex flex-col p-4">
                <CodeRenderer {...args} />
            </div>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    title: "CodeRenderer",
    template: '<div class="bg-green-500 p-10">{{something}}</div>',
    data: { something: "test" },
};

export const PrimaryError = Template.bind({});

PrimaryError.args = {
    title: "CodeRenderer",
    template: '<div className="bg-green-500">{{something</div>',
    data: { something: "test" },
};
