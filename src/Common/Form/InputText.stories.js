import React, { useState } from "react";
import { InputText } from "./InputText";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "InputText",
    component: InputText,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    let v = "";

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");

    function onChange(e) {
        console.log(e);
        setInputValue(e.target.value);
    }

    function onChange2(e) {
        console.log(e);
        setInputValue2(e.target.value);
    }

    function onChange3(e) {
        console.log(e);
        setInputValue3(e.target.value);
    }

    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <InputText {...args} value={inputValue} onChange={onChange} />
            <InputText {...args} value={inputValue2} onChange={onChange2} />
            <InputText {...args} value={inputValue3} onChange={onChange3} />
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
