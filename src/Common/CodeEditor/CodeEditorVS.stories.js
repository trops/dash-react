import { CodeEditorVS } from "./CodeEditorVS";
import { mock, MockWrapper } from "@dash";

import "../../tailwind.css";

export default {
    title: "CodeEditorVS",
    component: CodeEditorVS,
};

import "monaco-themes/themes/Monokai Bright.json";

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
                readOnly={true}
                minimapEnabled={true}
            />
        </MockWrapper>
    );
};

export const JS = Template.bind({});
export const HTML = Template.bind({});

const sampleJSObject = {
    test: "this is a really long line of text that we are expecting the editor to wrap if we want the fjklj fdsjfklds fldsj fdlsjfl dsl fdsllfldslflds fd s fds lf ds lflsdl  ldlsfl sdlfl dsl fl dslfl dsfdl fl dslfl ds l fl dsl f ldsl f dsl fldsl flds lfl dldsl fsl fl l fl dsl lf ldsl flfl ds",
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
    code: `<html>\n\t<head>Title</head>\n\t<body>Hello, I am HTML</body>\n</html>jdksjkdjklsajkldjsakljdklsajkldjsalk\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
    uniqueKey: "html-editor-123",
    language: "html",
};
