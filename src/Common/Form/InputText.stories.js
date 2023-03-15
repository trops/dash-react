import { InputText } from "./InputText";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "InputText",
    component: InputText,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <InputText {...args} />
        </MockWrapper>
    );
};

export const Value = Template.bind({});
export const Placeholder = Template.bind({});

Value.args = {
    //👇 The args you need here will depend on your component
    value: "Search entered here",
};

Placeholder.args = {
    //👇 The args you need here will depend on your component
    placeholder: "Enter something",
};
