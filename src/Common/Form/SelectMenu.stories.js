import { SelectMenu } from "./SelectMenu";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "SelectMenu",
    component: SelectMenu,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <SelectMenu {...args} onChange={(e) => console.log(e)}>
                <option value="1">I am a select option 1</option>
                <option value="2">I am a select option 2</option>
                <option value="3">I am a select option 3</option>
                <option value="4">I am a select option 4</option>
                <option value="5">I am a select option 5</option>
            </SelectMenu>
        </MockWrapper>
    );
};

export const Value = Template.bind({});

Value.args = {
    //👇 The args you need here will depend on your component
    selectedValue: "3",
    name: "my-select-menu",
};
