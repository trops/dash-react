import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { useThemePreview } from "@dash/Context/ThemePreviewProvider";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * ThemePreviewBanner
 *
 * A floating banner that appears when a preview theme is active.
 * Shows "Preview Mode" label with toggle, save, and cancel actions.
 *
 * Props:
 * - onSave: () => void — called when user clicks Save to persist the preview theme
 * - onCancel: () => void — optional override for cancel (defaults to clearPreview)
 * - position: "top" | "bottom" — where to place the banner (default: "bottom")
 * - className: additional CSS classes
 */
const ThemePreviewBanner = ({
    onSave = null,
    onCancel = null,
    position = "bottom",
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const { isPreview, showPreview, togglePreview, clearPreview } =
        useThemePreview();

    if (!isPreview && showPreview) return null;

    // Only show when there's a preview theme loaded (even if toggled off)
    const { previewTheme } = useThemePreview();
    if (!previewTheme) return null;

    const buttonStyles = getStylesForItem(themeObjects.BUTTON, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const positionClasses =
        position === "top" ? "top-0 left-0 right-0" : "bottom-0 left-0 right-0";

    function handleSave() {
        if (onSave) onSave();
    }

    function handleCancel() {
        if (onCancel) {
            onCancel();
        } else {
            clearPreview();
        }
    }

    return (
        <div
            className={`fixed ${positionClasses} z-50 flex items-center justify-center p-3 ${className}`}
        >
            <div className="flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg bg-amber-500/90 text-black shadow-lg backdrop-blur-sm">
                <FontAwesomeIcon icon="eye" className="h-3.5 w-3.5" />
                <span className="text-sm font-semibold">Preview Mode</span>

                <div className="w-px h-5 bg-black/20" />

                {/* Toggle */}
                <button
                    type="button"
                    onClick={togglePreview}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-black/10 hover:bg-black/20 transition-colors"
                    title={
                        showPreview
                            ? "Show original theme"
                            : "Show preview theme"
                    }
                >
                    <FontAwesomeIcon
                        icon={showPreview ? "eye-slash" : "eye"}
                        className="h-3 w-3"
                    />
                    {showPreview ? "Original" : "Preview"}
                </button>

                {/* Save */}
                {onSave && (
                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-black/20 hover:bg-black/30 transition-colors"
                    >
                        <FontAwesomeIcon icon="check" className="h-3 w-3" />
                        Save
                    </button>
                )}

                {/* Cancel */}
                <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-black/10 hover:bg-black/20 transition-colors"
                >
                    <FontAwesomeIcon icon="xmark" className="h-3 w-3" />
                    Cancel
                </button>
            </div>
        </div>
    );
};

export { ThemePreviewBanner };
