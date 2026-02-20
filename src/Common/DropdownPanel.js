import { useContext, useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

// ─── Sub-component Factories ────────────────────────────────────────────────────

const createHeader = (themeKey) => {
    const Header = ({ children, className = "" }) => {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeKey, currentTheme, {});

        return (
            <div
                className={`uppercase ${styles.textColor || ""} ${styles.textSize || "text-xs"} ${styles.fontWeight || "font-semibold"} ${styles.spacing || "px-3 py-1.5"} ${className}`}
            >
                {children}
            </div>
        );
    };
    return Header;
};

const createDivider = (themeKey) => {
    const Divider = ({ className = "" }) => {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeKey, currentTheme, {});

        return (
            <div
                className={`border-t ${styles.borderColor || ""} my-1 ${className}`}
            />
        );
    };
    return Divider;
};

// ─── Root Component Factory ─────────────────────────────────────────────────────

const createDropdownPanel = (panelKey, headerKey, dividerKey) => {
    const Panel = ({
        isOpen,
        onClose,
        children,
        width = "w-64",
        maxHeight = "max-h-72",
        position = "absolute top-full left-0 mt-1",
        zIndex = "z-50",
        backdropZIndex = "z-40",
        className = "",
        backgroundColor = null,
        borderColor = null,
        textColor = null,
        shadow = null,
        borderRadius = null,
        portal = false,
        align = "left",
    }) => {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(panelKey, currentTheme, {
            backgroundColor,
            borderColor,
            textColor,
            shadow,
            borderRadius,
        });

        const anchorRef = useRef(null);
        const [portalStyle, setPortalStyle] = useState(null);

        const handleKeyDown = useCallback(
            (e) => {
                if (e.key === "Escape") {
                    onClose();
                }
            },
            [onClose]
        );

        useEffect(() => {
            if (isOpen) {
                document.addEventListener("keydown", handleKeyDown);
                return () =>
                    document.removeEventListener("keydown", handleKeyDown);
            }
        }, [isOpen, handleKeyDown]);

        // Measure anchor position for portal mode
        useEffect(() => {
            if (portal && isOpen && anchorRef.current) {
                const parent = anchorRef.current.parentElement;
                if (parent) {
                    const rect = parent.getBoundingClientRect();
                    const style = { top: rect.bottom + 4 };
                    if (align === "right") {
                        style.right = window.innerWidth - rect.right;
                    } else {
                        style.left = rect.left;
                    }
                    setPortalStyle(style);
                }
            } else if (!isOpen) {
                setPortalStyle(null);
            }
        }, [portal, isOpen, align]);

        // Portal mode: always render anchor span so ref is available
        if (portal) {
            const panelClasses = `${width} ${styles.backgroundColor || ""} ${styles.borderRadius || "rounded-lg"} ${styles.shadow || "shadow-xl"} border ${styles.borderColor || ""} ${styles.textColor || ""} ${styles.transition || ""} p-1 space-y-0.5 overflow-y-auto ${maxHeight} ${className}`;

            return (
                <>
                    <span
                        ref={anchorRef}
                        style={{
                            position: "absolute",
                            width: 0,
                            height: 0,
                            overflow: "hidden",
                        }}
                    />
                    {isOpen &&
                        portalStyle &&
                        createPortal(
                            <>
                                <div
                                    className={`fixed inset-0 ${backdropZIndex}`}
                                    onClick={onClose}
                                />
                                <div
                                    className={panelClasses}
                                    style={{
                                        position: "fixed",
                                        zIndex: 9999,
                                        ...portalStyle,
                                    }}
                                >
                                    {children}
                                </div>
                            </>,
                            document.body
                        )}
                </>
            );
        }

        // Default (non-portal) mode
        if (!isOpen) return null;

        return (
            <>
                <div
                    className={`fixed inset-0 ${backdropZIndex}`}
                    onClick={onClose}
                />
                <div
                    className={`${position} ${zIndex} ${width} ${styles.backgroundColor || ""} ${styles.borderRadius || "rounded-lg"} ${styles.shadow || "shadow-xl"} border ${styles.borderColor || ""} ${styles.textColor || ""} ${styles.transition || ""} p-1 space-y-0.5 overflow-y-auto ${maxHeight} ${className}`}
                >
                    {children}
                </div>
            </>
        );
    };

    Panel.Header = createHeader(headerKey);
    Panel.Divider = createDivider(dividerKey);

    return Panel;
};

// ─── Exported Variants ──────────────────────────────────────────────────────────

const DropdownPanel = createDropdownPanel(
    themeObjects.DROPDOWN_PANEL,
    themeObjects.DROPDOWN_PANEL_HEADER,
    themeObjects.DROPDOWN_PANEL_DIVIDER
);

const DropdownPanel2 = createDropdownPanel(
    themeObjects.DROPDOWN_PANEL_2,
    themeObjects.DROPDOWN_PANEL_HEADER_2,
    themeObjects.DROPDOWN_PANEL_DIVIDER_2
);

const DropdownPanel3 = createDropdownPanel(
    themeObjects.DROPDOWN_PANEL_3,
    themeObjects.DROPDOWN_PANEL_HEADER_3,
    themeObjects.DROPDOWN_PANEL_DIVIDER_3
);

export { DropdownPanel, DropdownPanel2, DropdownPanel3 };
