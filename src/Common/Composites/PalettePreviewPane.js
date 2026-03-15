import { useContext } from "react";
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

const ColorSwatch = ({ color, role, onClick, className = "" }) => {
    const hex = color?.hex || color?.value || "#888";
    const label = color?.family || color?.name || hex;

    return (
        <div
            className={`flex flex-col items-center gap-1.5 flex-1 cursor-pointer group ${className}`}
            onClick={onClick}
            title={`Click to change role — currently ${role}`}
        >
            <div
                className="h-12 w-full rounded-lg transition-all group-hover:scale-105 group-hover:shadow-lg ring-1 ring-white/10"
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
 * Users can click a swatch to cycle it to the next role.
 *
 * Props:
 * - palette: Array of color objects [{ hex, family, name, role }]
 * - roleAssignments: Object mapping role → palette index { primary: 0, secondary: 1, ... }
 * - onSwapRole: (role, currentIndex) => void — callback when user clicks to swap a role
 * - className: additional CSS classes
 */
const PalettePreviewPane = ({
    palette = [],
    roleAssignments = {},
    onSwapRole = null,
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

    if (!palette || palette.length === 0) return null;

    function handleSwatchClick(role) {
        if (onSwapRole) {
            const currentIndex = roleAssignments[role];
            onSwapRole(role, currentIndex);
        }
    }

    return (
        <div
            className={`flex flex-col gap-3 ${styles.string || ""} ${className}`}
        >
            <span className="text-sm font-semibold opacity-50">
                Color Roles
            </span>
            <div className="flex flex-row gap-3">
                {ROLES.map((role) => {
                    const colorIndex = roleAssignments[role];
                    const color =
                        colorIndex != null ? palette[colorIndex] : null;
                    if (!color) return null;
                    return (
                        <ColorSwatch
                            key={role}
                            color={color}
                            role={role}
                            onClick={() => handleSwatchClick(role)}
                        />
                    );
                })}
            </div>
            {onSwapRole && (
                <span className="text-[10px] opacity-30 text-center">
                    Click a color to cycle its role assignment
                </span>
            )}
        </div>
    );
};

export { PalettePreviewPane, ROLES };
