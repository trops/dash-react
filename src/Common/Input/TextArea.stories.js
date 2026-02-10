import { TextArea } from "./TextArea";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/TextArea",
    component: TextArea,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <TextArea {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Description",
    placeholder: "Enter a description",
    value: "",
    rows: 4,
};

Secondary.args = {
    label: "Description",
    placeholder: "Enter a description",
    value: "",
    rows: 4,
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Description",
    placeholder: "Enter a description",
    value: "",
    rows: 4,
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
