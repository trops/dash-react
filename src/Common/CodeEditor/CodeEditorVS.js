import React, { useContext, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

const parseTmTheme = require("monaco-themes").parseTmTheme;

export function CodeEditorVS({
    code,
    onChange,
    uniqueKey = "12345",
    language = "js",
    placeholder = null,
    scrollable = true,
    padding = "p-2",
    themeName = "GitHub Dark",
    ...props
}) {
    //const monaco = useMonaco();

    // useEffect(() => {
    //     if (monaco) {
    //         try {
    //             import("monaco-themes/themes/Monokai Bright.json")
    //                 .then((data) => {
    //                     console.log("theme", JSON.stringify(data));
    //                     const myTheme = parseTmTheme(data);
    //                     console.log("theme parsed ", myTheme);
    //                     //console.log("parsed theme", myTheme);
    //                     monaco.editor.defineTheme("code-theme", myTheme);
    //                     // monaco.editor.setTheme("code-theme");
    //                 })
    //                 .then((_) => monaco.editor.setTheme("code-theme"))
    //                 .catch((e) =>
    //                     console.log("error setting theme", e.message)
    //                 );

    //             // console.log("my theme", myTheme);
    //             // monaco.editor.defineTheme("myTheme", myTheme);
    //             // monaco.editor.setTheme("myTheme");
    //         } catch (e) {
    //             console.log("error making my theme", e.message);
    //         }
    //         // console.log("here is the monaco isntance:", monaco);
    //     }
    // }, [monaco]);

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, {
        ...props,
        scrollable,
    });

    console.log("code editor ", styles.string);

    function handleEditorDidMount(editor, monaco) {
        console.log("editor did mount", editor);
        editor.focus();

        if (monaco) {
            try {
                console.log("trying to load this theme");
                import(`monaco-themes/themes/${themeName}.json`)
                    .then((data) => {
                        monaco.editor.defineTheme("code-theme", data);
                        // monaco.editor.setTheme("code-theme");
                    })
                    .then((_) => monaco.editor.setTheme("code-theme"))
                    .catch((e) =>
                        console.log("error setting theme", e.message)
                    );
            } catch (e) {
                console.log("error making my theme", e.message);
            }
        } else {
            console.log("monaco not loaded");
        }
    }

    const placeholderValue =
        placeholder !== null ? placeholder : `Enter ${language} code`;

    return (
        <div
            key={`code-editor-${uniqueKey}`}
            className={`flex flex-1 flex-col w-full h-full space-y-4 rounded ${styles.string} overflow-hidden`}
        >
            <div
                className={`flex flex-col rounded w-full h-full ${styles.string}`}
            >
                <div className={`bg-inherit h-full ${styles.textColor}`}>
                    <Editor
                        value={code}
                        language={language}
                        placeholder={placeholderValue}
                        height={"90vh"}
                        width={"100%"}
                        onChange={onChange}
                        onMount={handleEditorDidMount}
                    />
                </div>
            </div>
        </div>
    );
}
