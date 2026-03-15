import {
    createContext,
    useState,
    useCallback,
    useContext,
    useMemo,
} from "react";
import { ThemeContext } from "./ThemeContext";

/**
 * ThemePreviewProvider
 *
 * Wraps children in a ThemeContext override that temporarily replaces
 * `currentTheme` with a preview theme. All downstream components that
 * read ThemeContext will render with the preview theme while it is active.
 *
 * The real theme is never mutated — preview is purely visual.
 *
 * Usage (in the consuming app):
 *
 *   <ThemePreviewProvider>
 *     {({ isPreview, previewTheme, setPreviewTheme, clearPreview, togglePreview }) => (
 *       <>
 *         <ThemePreviewBanner ... />
 *         <Dashboard />
 *       </>
 *     )}
 *   </ThemePreviewProvider>
 *
 * Or with the useThemePreview hook:
 *
 *   function MyComponent() {
 *     const { setPreviewTheme, clearPreview, ... } = useThemePreview();
 *   }
 */
const ThemePreviewProvider = ({ children }) => {
    const parentCtx = useContext(ThemeContext);

    const [previewTheme, setPreviewThemeState] = useState(null);
    const [showPreview, setShowPreview] = useState(true);

    const isPreview = previewTheme !== null && showPreview;

    const setPreviewTheme = useCallback((theme) => {
        setPreviewThemeState(theme);
        setShowPreview(true);
    }, []);

    const clearPreview = useCallback(() => {
        setPreviewThemeState(null);
        setShowPreview(true);
    }, []);

    const togglePreview = useCallback(() => {
        setShowPreview((prev) => !prev);
    }, []);

    // Build the overridden context value
    const ctxValue = useMemo(() => {
        if (!isPreview) return parentCtx;

        return {
            ...parentCtx,
            currentTheme: previewTheme,
        };
    }, [parentCtx, isPreview, previewTheme]);

    // Preview control bag — passed to render-prop children and available via useThemePreview
    const previewControls = useMemo(
        () => ({
            isPreview,
            showPreview,
            previewTheme,
            setPreviewTheme,
            clearPreview,
            togglePreview,
        }),
        [
            isPreview,
            showPreview,
            previewTheme,
            setPreviewTheme,
            clearPreview,
            togglePreview,
        ]
    );

    const content =
        typeof children === "function" ? children(previewControls) : children;

    return (
        <ThemePreviewContext.Provider value={previewControls}>
            <ThemeContext.Provider value={ctxValue}>
                {content}
            </ThemeContext.Provider>
        </ThemePreviewContext.Provider>
    );
};

/**
 * Separate context for preview controls so components can access
 * preview state without re-creating the ThemeContext provider.
 */
const ThemePreviewContext = createContext({
    isPreview: false,
    showPreview: true,
    previewTheme: null,
    setPreviewTheme: () => {},
    clearPreview: () => {},
    togglePreview: () => {},
});

/**
 * useThemePreview — access preview controls from any descendant.
 */
const useThemePreview = () => useContext(ThemePreviewContext);

export { ThemePreviewProvider, ThemePreviewContext, useThemePreview };
