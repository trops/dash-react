import React, { useContext } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";

export function CodeEditorInline({
    code,
    setCode,
    uniqueKey = "12345",
    language = "js",
    placeholder = null,
    scrollable = true,
    padding = "p-2",
    ...props
}) {
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
            className={`flex flex-1 flex-col w-full h-full space-y-4 rounded ${styles.string} overflow-clip`}
        >
            <div
                className={`flex flex-col rounded w-full h-full ${styles.string}`}
            >
                <div className={`bg-inherit h-full ${styles.textColor}`}>
                    <CodeEditor
                        value={code}
                        language={language}
                        placeholder={placeholderValue}
                        onChange={(evn) => setCode(evn.target.value)}
                        //padding={15}
                        style={{
                            caretColor: "#eeeeee",
                            fontSize: "12px",
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
