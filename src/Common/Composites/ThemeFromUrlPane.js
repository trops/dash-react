import { useState, useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PalettePreviewPane, ROLES } from "./PalettePreviewPane";

const URL_REGEX = /^https?:\/\/.+\..+/i;

/**
 * ThemeFromUrlPane
 *
 * Stateful component: URL input, Extract button, loading/error states,
 * palette preview with role swapping, and Generate Theme button.
 *
 * Props:
 * - onExtract: async (url) => { palette, roleAssignments, suggestedName }
 * - onGenerate: (theme) => void — called when user clicks Generate Theme
 * - onMapToTheme: async (palette, roleAssignments) => theme object
 * - onPreview: (theme) => void — called with generated theme for live preview (optional)
 * - inline: boolean — if true, omits outer padding (for embedding in wizard)
 * - className: additional CSS classes
 */
const ThemeFromUrlPane = ({
    onExtract = null,
    onGenerate = null,
    onMapToTheme = null,
    onPreview = null,
    inline = false,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.THEME_FROM_URL_PANE,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [palette, setPalette] = useState(null);
    const [roleAssignments, setRoleAssignments] = useState(null);
    const [suggestedName, setSuggestedName] = useState("");
    const [generatedTheme, setGeneratedTheme] = useState(null);

    const isValidUrl = URL_REGEX.test(url.trim());
    const canExtract = isValidUrl && !loading;
    const canGenerate = palette && roleAssignments && !loading;

    const inputId = getUUID("", "theme-url-input");

    async function handleExtract() {
        if (!onExtract || !canExtract) return;

        setLoading(true);
        setError(null);
        setPalette(null);
        setRoleAssignments(null);
        setGeneratedTheme(null);

        try {
            const result = await onExtract(url.trim());

            if (!result || !result.palette || result.palette.length === 0) {
                setError("No colors found on this page. Try a different URL.");
                return;
            }

            setPalette(result.palette);
            setRoleAssignments(
                result.roleAssignments || buildDefaultRoles(result.palette)
            );
            setSuggestedName(result.suggestedName || deriveNameFromUrl(url));

            // Auto-generate theme if mapper is available
            if (onMapToTheme) {
                const theme = await onMapToTheme(
                    result.palette,
                    result.roleAssignments || buildDefaultRoles(result.palette)
                );
                setGeneratedTheme(theme);
                if (onPreview) onPreview(theme);
            }
        } catch (err) {
            const message =
                err?.message ||
                "Failed to extract colors. Check the URL and try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    function handleSwapRole(role, currentIndex) {
        if (!palette || !roleAssignments) return;

        // Cycle to the next palette color for this role
        const nextIndex = (currentIndex + 1) % palette.length;

        const newAssignments = { ...roleAssignments, [role]: nextIndex };
        setRoleAssignments(newAssignments);
        setGeneratedTheme(null); // Invalidate generated theme

        // Re-map theme with new assignments
        if (onMapToTheme) {
            onMapToTheme(palette, newAssignments).then((theme) => {
                setGeneratedTheme(theme);
                if (onPreview) onPreview(theme);
            });
        }
    }

    function handleGenerate() {
        if (!onGenerate || !generatedTheme) return;
        const theme = {
            ...generatedTheme,
            name: suggestedName || deriveNameFromUrl(url),
        };
        onGenerate(theme);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && canExtract) {
            handleExtract();
        }
    }

    const inputStyles = getStylesForItem(
        themeObjects.INPUT_TEXT,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    const buttonStyles = getStylesForItem(themeObjects.BUTTON, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={
                inline
                    ? `flex flex-col gap-4 ${styles.string || ""} ${className}`
                    : `flex flex-col gap-4 p-6 overflow-y-auto flex-1 min-h-0 ${styles.string || ""} ${className}`
            }
        >
            <span className="text-sm font-semibold opacity-50">
                Generate from Website
            </span>

            {/* URL Input */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <input
                        id={inputId}
                        type="url"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="https://example.com"
                        disabled={loading}
                        className={`flex-1 h-10 border shadow-sm px-3 py-2 ${inputStyles.string} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${inputStyles.focusRingColor || ""}`}
                    />
                    <button
                        type="button"
                        onClick={handleExtract}
                        disabled={!canExtract}
                        className={`flex flex-row items-center gap-2 px-4 h-10 ${buttonStyles.string} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles.focusRingColor || ""} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        {loading ? (
                            <FontAwesomeIcon
                                icon="spinner"
                                className="h-3.5 w-3.5 animate-spin"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="globe"
                                className="h-3.5 w-3.5"
                            />
                        )}
                        <span className="text-sm">
                            {loading ? "Extracting..." : "Extract"}
                        </span>
                    </button>
                </div>
                {!isValidUrl && url.length > 0 && (
                    <span className="text-xs text-amber-500">
                        Enter a valid URL starting with http:// or https://
                    </span>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-row items-center gap-2 py-2">
                    <FontAwesomeIcon
                        icon="spinner"
                        className="h-4 w-4 animate-spin opacity-50"
                    />
                    <span className="text-sm opacity-50">
                        Scanning page for colors...
                    </span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex flex-row items-center gap-2 py-2 text-red-400">
                    <FontAwesomeIcon
                        icon="circle-exclamation"
                        className="h-4 w-4"
                    />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Palette Preview */}
            {palette && roleAssignments && (
                <PalettePreviewPane
                    palette={palette}
                    roleAssignments={roleAssignments}
                    onSwapRole={handleSwapRole}
                />
            )}

            {/* Generate Button */}
            {canGenerate && generatedTheme && (
                <button
                    type="button"
                    onClick={handleGenerate}
                    className={`flex flex-row items-center justify-center gap-2 h-10 w-full ${buttonStyles.string} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles.focusRingColor || ""}`}
                >
                    <FontAwesomeIcon
                        icon="wand-magic-sparkles"
                        className="h-3.5 w-3.5"
                    />
                    <span className="text-sm">Generate Theme</span>
                </button>
            )}
        </div>
    );
};

/**
 * Build default role assignments from palette indices.
 * Maps the first 4 colors to primary/secondary/tertiary/neutral.
 */
function buildDefaultRoles(palette) {
    const assignments = {};
    ROLES.forEach((role, i) => {
        assignments[role] = i < palette.length ? i : 0;
    });
    return assignments;
}

/**
 * Derive a theme name from a URL hostname.
 * e.g., "https://stripe.com/pricing" → "stripe.com theme"
 */
function deriveNameFromUrl(url) {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, "");
        return `${hostname} theme`;
    } catch {
        return "Website theme";
    }
}

export { ThemeFromUrlPane };
