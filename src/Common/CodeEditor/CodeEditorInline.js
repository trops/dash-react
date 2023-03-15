import React, { useContext } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

export function CodeEditorInline({
    code,
    setCode,
    uniqueKey = "12345",
    language = "js",
    placeholder = "Please enter JS code.",
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, {
        ...props,
    });
    return (
        <div
            key={`code-editor-${uniqueKey}`}
            className={`flex flex-1 flex-col w-full h-full space-y-4 rounded ${styles.string} overflow-hidden`}
        >
            <div
                className={`flex flex-col rounded w-full h-full ${styles.string} overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900`}
            >
                <div className={`bg-inherit h-full ${styles.textColor}`}>
                    <CodeEditor
                        value={code}
                        language={language}
                        placeholder={placeholder}
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{
                            caretColor: "#eeeeee",
                            fontSize: "16px",
                            fontFamily:
                                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                            minHeight: "100%",
                        }}
                        className={styles.string}
                    />
                </div>
            </div>
        </div>
    );
}
