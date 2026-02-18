import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Dialog } from "@headlessui/react";
import { Paragraph3 } from "../Text/Paragraph";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const CommandPaletteGroup = ({ label = null, children, className = "" }) => {
    return (
        <div className={`${className}`}>
            {label && (
                <Paragraph3
                    text={label}
                    padding={false}
                    fontWeight="font-semibold"
                    width=""
                    className="uppercase tracking-wider opacity-40 px-3 py-1.5"
                />
            )}
            <div className="space-y-0.5">{children}</div>
        </div>
    );
};

const CommandPaletteItem = ({
    children,
    icon = null,
    onSelect = null,
    shortcut = null,
    active = false,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.COMMAND_PALETTE_ITEM,
        currentTheme,
        { scrollable: false, grow: false }
    );

    const activeClasses = active
        ? `${styles.activeBackgroundColor || ""} ${styles.activeTextColor || ""}`
        : `${styles.textColor || ""} ${styles.hoverBackgroundColor || ""} ${styles.hoverTextColor || ""}`;

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`flex items-center w-full px-3 py-2 gap-3 text-sm ${styles.borderRadius || "rounded-md"} ${styles.transition || "transition-colors duration-100"} ${styles.cursor || "cursor-pointer"} ${activeClasses} ${className}`}
        >
            {icon && <span className="flex-shrink-0 opacity-60">{icon}</span>}
            <span className="flex-1 text-left truncate">{children}</span>
            {shortcut && (
                <kbd className="flex-shrink-0 text-xs opacity-40 font-mono">
                    {shortcut}
                </kbd>
            )}
        </button>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const CommandPalette = ({
    isOpen,
    setIsOpen,
    placeholder = "Search commands...",
    children = null,
    onQueryChange = null,
    className = "",
}) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const panelRef = useRef(null);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.COMMAND_PALETTE,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const inputStyles = getStylesForItem(
        themeObjects.COMMAND_PALETTE_INPUT,
        currentTheme,
        { scrollable: false, grow: false }
    );

    const handleQueryChange = useCallback(
        (value) => {
            setQuery(value);
            if (onQueryChange) {
                onQueryChange(value);
            }
        },
        [onQueryChange]
    );

    useEffect(() => {
        if (!isOpen) {
            setQuery("");
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [setIsOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
            initialFocus={inputRef}
        >
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
            />
            <div
                className="fixed inset-0 flex items-start justify-center pt-[20vh]"
                onMouseDown={() => setIsOpen(false)}
            >
                <div
                    ref={panelRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`w-full max-w-lg border overflow-clip ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.borderRadius || "rounded-xl"} ${styles.shadow || "shadow-2xl"} ${className}`}
                >
                    {/* Search input */}
                    <div
                        className={`flex items-center px-4 border-b ${inputStyles.borderColor || ""}`}
                    >
                        <svg
                            className={`h-4 w-4 flex-shrink-0 ${inputStyles.textColor || ""} opacity-40`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => handleQueryChange(e.target.value)}
                            placeholder={placeholder}
                            className={`w-full bg-transparent border-none outline-none px-3 py-3 ${inputStyles.textSize || "text-base"} ${inputStyles.textColor || ""} placeholder:opacity-40`}
                        />
                        <kbd
                            className={`flex-shrink-0 text-xs opacity-30 border px-1.5 py-0.5 rounded ${styles.borderColor || ""} ${styles.textColor || ""}`}
                        >
                            esc
                        </kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-72 overflow-y-auto p-2 space-y-2 scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-transparent">
                        {children}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

CommandPalette.Group = CommandPaletteGroup;
CommandPalette.Item = CommandPaletteItem;

export { CommandPalette };
