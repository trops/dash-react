import { InputText } from "./InputText";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Input/InputText",
    component: InputText,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <InputText {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

Primary.args = {
    label: "Name",
    placeholder: "Enter your name",
    value: "",
};

Secondary.args = {
    label: "Name",
    placeholder: "Enter your name",
    value: "",
    backgroundColor: "bg-secondary-medium",
    borderColor: "border-secondary-medium",
    textColor: "text-secondary-dark",
};

Tertiary.args = {
    label: "Name",
    placeholder: "Enter your name",
    value: "",
    backgroundColor: "bg-tertiary-medium",
    borderColor: "border-tertiary-medium",
    textColor: "text-tertiary-dark",
};
