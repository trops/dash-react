import React, { useContext, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

const parseTmTheme = require("monaco-themes").parseTmTheme;

// Save a reference to the original ResizeObserver
const OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver constructor
window.ResizeObserver = function (callback) {
    const wrappedCallback = (entries, observer) => {
        window.requestAnimationFrame(() => {
            callback(entries, observer);
        });
    };

    // Create an instance of the original ResizeObserver
    // with the wrapped callback
    return new OriginalResizeObserver(wrappedCallback);
};

// Copy over static methods, if any
for (let staticMethod in OriginalResizeObserver) {
    if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
        window.ResizeObserver[staticMethod] =
            OriginalResizeObserver[staticMethod];
    }
}

export function CodeEditorVS({
    code,
    onChange,
    uniqueKey = "12345",
    language = "js",
    placeholder = null,
    scrollable = true,
    padding = "p-2",
    themeName = "GitHub Dark",
    readOnly = false,
    minimapEnabled = false,
    wordWrap = "on",
    ...props
}) {
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
                        options={{
                            minimap: { enabled: minimapEnabled },
                            readOnly: readOnly,
                            wordWrap: wordWrap,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
