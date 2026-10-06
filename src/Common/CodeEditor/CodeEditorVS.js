import React, { useContext, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { resolveEditorTheme } from "./editorTheme";

// Load a monaco-themes JSON theme and apply it to the editor.
function applyEditorTheme(monaco, name) {
    if (!monaco) return;
    try {
        import(`monaco-themes/themes/${name}.json`)
            .then((data) => {
                monaco.editor.defineTheme("code-theme", data);
            })
            .then((_) => monaco.editor.setTheme("code-theme"))
            .catch((e) => console.log("error setting theme", e.message));
    } catch (e) {
        console.log("error making my theme", e.message);
    }
}

// Wrap window.ResizeObserver so callbacks fire on the next animation
// frame — avoids "ResizeObserver loop limit exceeded" warnings in
// Monaco. Guarded so this module is safe to import from a Node
// context (Electron's main process pulls dash-react via dash-core
// for shared utility exports; without the guard the top-level
// `window.ResizeObserver` reference would throw at module-load
// before any consumer actually mounts the editor).
if (typeof window !== "undefined" && window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = function (callback) {
        const wrappedCallback = (entries, observer) => {
            window.requestAnimationFrame(() => {
                callback(entries, observer);
            });
        };
        return new OriginalResizeObserver(wrappedCallback);
    };
    for (let staticMethod in OriginalResizeObserver) {
        if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
            window.ResizeObserver[staticMethod] =
                OriginalResizeObserver[staticMethod];
        }
    }
}

export function CodeEditorVS({
    code,
    onChange,
    onMount,
    uniqueKey = "12345",
    language = "js",
    placeholder = null,
    scrollable = true,
    padding = "p-2",
    themeName = null, // null → follow the light/dark theme variant
    readOnly = false,
    minimapEnabled = false,
    wordWrap = "on",
    ...props
}) {
    const { currentTheme, themeVariant } = useContext(ThemeContext);
    const editorTheme = resolveEditorTheme(themeName, themeVariant);
    // Monaco instance captured from onMount (not useMonaco(), whose
    // loader rejects with a cancelation object on early unmount).
    const monacoRef = useRef(null);

    // Re-apply when the theme variant (or explicit themeName) changes
    // after mount — e.g. the user toggles light/dark.
    useEffect(() => {
        applyEditorTheme(monacoRef.current, editorTheme);
    }, [editorTheme]);
    const styles = getStylesForItem(themeObjects.CODE_EDITOR, currentTheme, {
        ...props,
        scrollable,
    });

    console.log("code editor ", styles.string);

    function handleEditorDidMount(editor, monaco) {
        console.log("editor did mount", editor);
        editor.focus();
        if (onMount) onMount(editor, monaco);

        if (monaco) {
            monacoRef.current = monaco;
            applyEditorTheme(monaco, editorTheme);
        } else {
            console.log("monaco not loaded");
        }
    }

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
