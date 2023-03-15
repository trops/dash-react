import { CodeEditorInline } from "./CodeEditorInline";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "CodeEditorInline",
    component: CodeEditorInline,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <CodeEditorInline {...args} setCode={(code) => console.log(code)} />
        </MockWrapper>
    );
};

export const JS = Template.bind({});
export const HTML = Template.bind({});

const sampleJSObject = {
    test: 123,
    again: 456,
};

JS.args = {
    //👇 The args you need here will depend on your component
    code: JSON.stringify(sampleJSObject, null, 4),
    uniqueKey: 12345,
    language: "js",
};

HTML.args = {
    //👇 The args you need here will depend on your component
    code: `<html>\n\t<head>Title</head>\n\t<body>Hello, I am HTML</body>\n</html>`,
    uniqueKey: "html-editor-123",
    language: "html",
};
