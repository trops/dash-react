import React, { useContext, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

export function CodeEditorVS({
    code,
    onChange,
    uniqueKey = "12345",
    language = "js",
    placeholder = null,
    scrollable = true,
    padding = "p-2",
    ...props
}) {
    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            console.log("here is the monaco isntance:", monaco);
            import("monaco-themes/themes/Monokai Bright.json").then((data) => {
                console.log("theme", data);
                monaco.editor.defineTheme("monokai-bright", data);
                monaco.editor.setTheme("monokai-bright");
            });
        }
    }, [monaco]);

    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, {
        ...props,
        scrollable,
    });

    console.log("code editor ", styles.string);

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
                    />
                </div>
            </div>
        </div>
    );
}
