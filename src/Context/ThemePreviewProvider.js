import {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
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

    // Inject CSS custom properties when the active theme has a
    // `cssVars` map. ThemeModel emits this for themes with
    // arbitrary-color (hex) channels — see PRD
    // `arbitrary-color-themes.md`, FR-003. Tracks which variables we
    // wrote so a transition theme-with-cssVars → theme-without
    // cleanly removes them (no flash: we set the new set before
    // removing the stale ones).
    const writtenVarsRef = useRef(new Set());
    useEffect(() => {
        const cssVars = ctxValue?.currentTheme?.cssVars;
        const root =
            typeof document !== "undefined" ? document.documentElement : null;
        if (!root) return undefined;
        const newSet = new Set();
        if (cssVars && typeof cssVars === "object") {
            for (const [varName, value] of Object.entries(cssVars)) {
                root.style.setProperty(varName, value);
                newSet.add(varName);
            }
        }
        // Remove any vars from a prior theme that aren't in the new set.
        for (const varName of writtenVarsRef.current) {
            if (!newSet.has(varName)) {
                root.style.removeProperty(varName);
            }
        }
        writtenVarsRef.current = newSet;
        return undefined;
    }, [ctxValue]);

    // Final cleanup on unmount — remove any vars still attached to
    // :root so the theme system leaves no stylesheet residue.
    useEffect(() => {
        return () => {
            const root =
                typeof document !== "undefined"
                    ? document.documentElement
                    : null;
            if (!root) return;
            for (const varName of writtenVarsRef.current) {
                root.style.removeProperty(varName);
            }
            writtenVarsRef.current = new Set();
        };
    }, []);

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
