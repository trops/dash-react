import { useContext, useState, useRef } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const ROLES = ["primary", "secondary", "tertiary", "neutral"];

const ROLE_LABELS = {
    primary: "Primary",
    secondary: "Secondary",
    tertiary: "Tertiary",
    neutral: "Neutral",
};

const ColorSwatch = ({
    color,
    role,
    onClick,
    isDragOver = false,
    isDragging = false,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onKeyDown,
    focused = false,
    className = "",
}) => {
    const hex = color?.hex || color?.value || "#888";
    const label = color?.family || color?.name || hex;

    return (
        <div
            className={`flex flex-col items-center gap-1.5 flex-1 cursor-pointer group transition-all ${
                isDragOver ? "scale-110 ring-2 ring-blue-400 rounded-lg" : ""
            } ${isDragging ? "opacity-40 scale-95" : ""} ${
                focused ? "ring-2 ring-white/50 rounded-lg" : ""
            } ${className}`}
            onClick={onClick}
            title={`${ROLE_LABELS[role] || role} — drag to reorder or click to cycle`}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`${ROLE_LABELS[role]} color: ${label}. Drag to reorder or use arrow keys.`}
            aria-grabbed={isDragging}
        >
            <div
                className={`h-12 w-full rounded-lg transition-all group-hover:scale-105 group-hover:shadow-lg ring-1 ring-white/10 ${
                    isDragOver ? "shadow-lg shadow-blue-400/30" : ""
                }`}
                style={{ backgroundColor: hex }}
            />
            <span className="text-[10px] opacity-60 font-medium uppercase tracking-wide">
                {ROLE_LABELS[role] || role}
            </span>
            <span className="text-[10px] opacity-40 truncate max-w-full">
                {label}
            </span>
        </div>
    );
};

/**
 * PalettePreviewPane
 *
 * Displays extracted colors mapped to 4 roles (primary, secondary, tertiary, neutral).
 * Users can:
 * - Click a swatch to cycle it to the next role
 * - Drag a swatch to another role position to swap
 * - Use arrow keys + Enter for keyboard reordering
 *
 * Props:
 * - palette: Array of color objects [{ hex, family, name, role }]
 * - roleAssignments: Object mapping role → palette index { primary: 0, secondary: 1, ... }
 * - onSwapRole: (role, currentIndex) => void — callback when user clicks to cycle a role
 * - onReorderRoles: (sourceRole, targetRole) => void — callback when user drags to swap two roles
 * - className: additional CSS classes
 */
const PalettePreviewPane = ({
    palette = [],
    roleAssignments = {},
    onSwapRole = null,
    onReorderRoles = null,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.PALETTE_PREVIEW_PANE,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    const [dragSourceRole, setDragSourceRole] = useState(null);
    const [dragOverRole, setDragOverRole] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [keyboardSelectedRole, setKeyboardSelectedRole] = useState(null);
    const swatchRefs = useRef({});

    if (!palette || palette.length === 0) return null;

    const activeRoles = ROLES.filter(
        (role) =>
            roleAssignments[role] != null &&
            palette[roleAssignments[role]] != null
    );

    function handleSwatchClick(role) {
        if (keyboardSelectedRole) {
            // If a role was keyboard-selected, complete the swap
            if (keyboardSelectedRole !== role && onReorderRoles) {
                onReorderRoles(keyboardSelectedRole, role);
            }
            setKeyboardSelectedRole(null);
            return;
        }
        if (onSwapRole) {
            const currentIndex = roleAssignments[role];
            onSwapRole(role, currentIndex);
        }
    }

    function handleDragStart(e, role) {
        setDragSourceRole(role);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", role);
    }

    function handleDragOver(e, role) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (role !== dragSourceRole) {
            setDragOverRole(role);
        }
    }

    function handleDragLeave(e, role) {
        if (dragOverRole === role) {
            setDragOverRole(null);
        }
    }

    function handleDrop(e, targetRole) {
        e.preventDefault();
        setDragOverRole(null);
        const sourceRole = dragSourceRole;
        setDragSourceRole(null);

        if (sourceRole && sourceRole !== targetRole && onReorderRoles) {
            onReorderRoles(sourceRole, targetRole);
        }
    }

    function handleDragEnd() {
        setDragSourceRole(null);
        setDragOverRole(null);
    }

    function handleKeyDown(e, role, index) {
        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown": {
                e.preventDefault();
                const nextIndex = (index + 1) % activeRoles.length;
                setFocusedIndex(nextIndex);
                swatchRefs.current[activeRoles[nextIndex]]?.focus();
                break;
            }
            case "ArrowLeft":
            case "ArrowUp": {
                e.preventDefault();
                const prevIndex =
                    (index - 1 + activeRoles.length) % activeRoles.length;
                setFocusedIndex(prevIndex);
                swatchRefs.current[activeRoles[prevIndex]]?.focus();
                break;
            }
            case "Enter":
            case " ": {
                e.preventDefault();
                if (keyboardSelectedRole == null) {
                    // First press: select this swatch for swapping
                    setKeyboardSelectedRole(role);
                } else if (keyboardSelectedRole === role) {
                    // Same swatch: cancel selection
                    setKeyboardSelectedRole(null);
                } else {
                    // Different swatch: complete the swap
                    if (onReorderRoles) {
                        onReorderRoles(keyboardSelectedRole, role);
                    }
                    setKeyboardSelectedRole(null);
                }
                break;
            }
            case "Escape": {
                e.preventDefault();
                setKeyboardSelectedRole(null);
                break;
            }
            default:
                break;
        }
    }

    const hasReorder = onReorderRoles != null;
    const helpText = hasReorder
        ? "Drag colors to swap roles, or use arrow keys + Enter"
        : "Click a color to cycle its role assignment";

    return (
        <div
            className={`flex flex-col gap-3 ${styles.string || ""} ${className}`}
            role="group"
            aria-label="Color role assignments"
        >
            <span className="text-sm font-semibold opacity-50">
                Color Roles
            </span>
            <div className="flex flex-row gap-3" role="listbox">
                {activeRoles.map((role, index) => {
                    const colorIndex = roleAssignments[role];
                    const color = palette[colorIndex];
                    return (
                        <div
                            key={role}
                            ref={(el) => (swatchRefs.current[role] = el)}
                        >
                            <ColorSwatch
                                color={color}
                                role={role}
                                onClick={() => handleSwatchClick(role)}
                                isDragOver={dragOverRole === role}
                                isDragging={dragSourceRole === role}
                                onDragStart={(e) => handleDragStart(e, role)}
                                onDragOver={(e) => handleDragOver(e, role)}
                                onDragLeave={(e) => handleDragLeave(e, role)}
                                onDrop={(e) => handleDrop(e, role)}
                                onDragEnd={handleDragEnd}
                                onKeyDown={(e) => handleKeyDown(e, role, index)}
                                focused={keyboardSelectedRole === role}
                            />
                        </div>
                    );
                })}
            </div>
            {(onSwapRole || hasReorder) && (
                <span className="text-[10px] opacity-30 text-center">
                    {helpText}
                </span>
            )}
        </div>
    );
};

export { PalettePreviewPane, ROLES };
