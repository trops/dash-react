import { SearchInput } from "./SearchInput";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/SearchInput",
    component: SearchInput,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <SearchInput {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Search",
    placeholder: "Search widgets",
    value: "",
};

Secondary.args = {
    label: "Search",
    placeholder: "Search widgets",
    value: "",
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Search",
    placeholder: "Search widgets",
    value: "",
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
