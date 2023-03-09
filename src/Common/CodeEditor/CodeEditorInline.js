import React, { useContext } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ThemeContext } from '@dash/Context/ThemeContext';

export function CodeEditorInline({ code, setCode, uniqueKey = '12345' }) {

  const { currentTheme } = useContext(ThemeContext);

  return (
    <div key={`code-editor-${uniqueKey}`} className="flex flex-1 flex-col w-full h-full space-y-4 rounded bg-gray-900 overflow-hidden">
        <div className="flex flex-col rounded w-full h-full bg-gray-900 overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900">
            <div className="bg-gray-900 text-indigo-600 h-full">
            <CodeEditor
                value={code}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    caretColor: '#eeeeee',
                    fontSize: '16px',
                    backgroundColor: "#000000",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    minHeight: '100%'
                }}
            />
            </div>
        </div>
    </div>
  );
}
