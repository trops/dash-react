import { CodeEditorVS } from "./CodeEditorVS";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "CodeEditorVS",
    component: CodeEditorVS,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <CodeEditorVS
                {...args}
                setCode={(code) => console.log(code)}
                height="h-full"
                width="w-full"
                theme="vs-dark"
            />
            <CodeEditorVS
                {...args}
                setCode={(code) => console.log(code)}
                height="h-full"
                width="w-full"
                theme="vs-dark"
            />
        </MockWrapper>
    );
};

export const JS = Template.bind({});
export const HTML = Template.bind({});

const sampleJSObject = {
    test: 123,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,

    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
    again: 456,
};

JS.args = {
    //👇 The args you need here will depend on your component
    code: JSON.stringify(sampleJSObject, null, 4),
    uniqueKey: 12345,
    language: "js",
    scrollable: true,
    // className: "text-2xl",
};

HTML.args = {
    //👇 The args you need here will depend on your component
    code: `<html>\n\t<head>Title</head>\n\t<body>Hello, I am HTML</body>\n</html>`,
    uniqueKey: "html-editor-123",
    language: "html",
};
