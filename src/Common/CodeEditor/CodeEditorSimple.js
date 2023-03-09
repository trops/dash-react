import React from 'react';
// import Editor from 'react-simple-code-editor';
// // import Prism from "prismjs";
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-css';
// import './prism.css';



class CodeEditorSimple extends React.Component {
    render() {
      return (<div>test</div>);
        // const { onChange, code } = this.props;
        // const codeString = JSON.stringify(code);
        // return (
        //   <div className="">
        //     <Editor
        //         value={code}
        //         onValueChange={onChange}
        //         highlight={codeString => highlight(codeString, languages.js)}
        //         padding={10}
        //         style={{
        //             fontFamily: '"Fira code", "Fira Mono", monospace',
        //             fontSize: 14,
        //         }}
        //     />
        //     </div>
        // )
    }
}

CodeEditorSimple.defaultProps = {
    onChange(){},
    code: ''
}

export default CodeEditorSimple;
