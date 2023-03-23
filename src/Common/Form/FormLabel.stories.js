import { FormLabel } from "./FormLabel";
import { mockThemes, mockApi, MockWrapper, Panel, InputText } from "@dash";

import "../../tailwind.css";

export default {
    title: "FormLabel",
    component: FormLabel,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mockApi} theme={mockThemes.theme} args={args}>
            <Panel className={"space-y-2 p-6 rounded"}>
                <FormLabel {...args} />
                <InputText type="text" placeholder={args.placeholder} />
            </Panel>
        </MockWrapper>
    );
};

export const Value = Template.bind({});

Value.args = {
    //👇 The args you need here will depend on your component
    title: "Email Address",
    placeholder: "Enter your email address",
};
