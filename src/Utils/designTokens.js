/**
 * Design Tokens for dash-react UI System
 *
 * Centralized design token definitions for typography, spacing, shadows, and radius.
 * These tokens provide a consistent design language across all components.
 *
 * Modern Design Principles (2024-2026):
 * - Refined typography with minimal responsive scaling
 * - Subtle shadows for depth
 * - Generous whitespace with consistent spacing
 * - Smooth transitions and interactions
 */

/**
 * Typography Scale
 *
 * Provides a consistent text sizing scale from xs (12px) to 4xl (36px).
 * Responsive scaling is minimal - only when space allows.
 */
export const typography = {
    xs: "text-xs", // 12px - tiny labels, captions
    sm: "text-sm", // 14px - secondary text, small buttons
    base: "text-base", // 16px - body text, default
    md: "text-base", // 16px - alias for base
    lg: "text-lg", // 18px - emphasized text, large buttons
    xl: "text-xl", // 20px - small headings
    "2xl": "text-2xl", // 24px - section headings
    "3xl": "text-3xl", // 30px - page headings
    "4xl": "text-4xl", // 36px - hero text (rare)
};

/**
 * Spacing Scale
 *
 * Consistent spacing scale aligned with TailwindCSS defaults.
 * Used for padding, margins, and gaps.
 */
export const spacing = {
    xs: "1", // 4px - p-1, m-1, gap-1
    sm: "2", // 8px - p-2, m-2, gap-2
    md: "3", // 12px - p-3, m-3, gap-3
    lg: "4", // 16px - p-4, m-4, gap-4
    xl: "6", // 24px - p-6, m-6, gap-6
    "2xl": "8", // 32px - p-8, m-8, gap-8
};

/**
 * Shadow Scale
 *
 * Subtle shadows for modern visual depth.
 * Use sparingly - most components use shadow-sm or shadow-md.
 */
export const shadows = {
    none: "shadow-none",
    sm: "shadow-sm", // Subtle lift for buttons, small cards
    md: "shadow-md", // Cards, panels, dropdowns
    lg: "shadow-lg", // Modals, popovers
    xl: "shadow-xl", // Full-screen overlays
    inner: "shadow-inner", // Inset effects
};

/**
 * Border Radius Scale
 *
 * Consistent rounding for modern, polished appearance.
 */
export const radius = {
    none: "rounded-none",
    sm: "rounded-sm", // 2px - tight corners
    md: "rounded", // 4px - default for most elements
    lg: "rounded-lg", // 8px - cards, modals
    xl: "rounded-xl", // 12px - prominent elements
    full: "rounded-full", // Pills, avatars
};

/**
 * Transition Timings
 *
 * Standardized transition durations for smooth interactions.
 */
export const transitions = {
    fast: "duration-100", // 100ms - micro-interactions
    base: "duration-200", // 200ms - default for most transitions
    slow: "duration-300", // 300ms - complex animations
};

/**
 * Component Size Presets
 *
 * Standard size configurations for common component patterns.
 * Maps size names (xs, sm, md, lg, xl) to specific token combinations.
 */
export const componentSizes = {
    button: {
        xs: {
            padding: "px-2 py-1",
            textSize: typography.xs,
            iconSize: "h-3 w-3",
        },
        sm: {
            padding: "px-3 py-1.5",
            textSize: typography.sm,
            iconSize: "h-4 w-4",
        },
        md: {
            padding: "px-4 py-2",
            textSize: typography.base,
            iconSize: "h-5 w-5",
        },
        lg: {
            padding: "px-6 py-3",
            textSize: typography.lg,
            iconSize: "h-6 w-6",
        },
        xl: {
            padding: "px-8 py-4",
            textSize: typography.xl,
            iconSize: "h-8 w-8",
        },
    },
    buttonIcon: {
        xs: {
            padding: "p-1",
            textSize: typography.xs,
            iconSize: "h-3 w-3",
        },
        sm: {
            padding: "p-1.5",
            textSize: typography.sm,
            iconSize: "h-4 w-4",
        },
        md: {
            padding: "p-2",
            textSize: typography.base,
            iconSize: "h-5 w-5",
        },
        lg: {
            padding: "p-3",
            textSize: typography.lg,
            iconSize: "h-6 w-6",
        },
        xl: {
            padding: "p-4",
            textSize: typography.xl,
            iconSize: "h-8 w-8",
        },
    },
    panel: {
        xs: {
            padding: "p-2",
            gap: "gap-2",
        },
        sm: {
            padding: "p-3",
            gap: "gap-3",
        },
        md: {
            padding: "p-4",
            gap: "gap-4",
        },
        lg: {
            padding: "p-6",
            gap: "gap-6",
        },
        xl: {
            padding: "p-8",
            gap: "gap-8",
        },
    },
    heading: {
        xs: {
            textSize: "text-lg lg:text-xl",
            fontWeight: "font-semibold",
        },
        sm: {
            textSize: "text-xl lg:text-2xl",
            fontWeight: "font-semibold",
        },
        md: {
            textSize: "text-2xl lg:text-3xl",
            fontWeight: "font-bold",
        },
        lg: {
            textSize: "text-3xl lg:text-4xl",
            fontWeight: "font-bold",
        },
        xl: {
            textSize: "text-4xl lg:text-5xl",
            fontWeight: "font-bold",
        },
    },
};

/**
 * Default Design Preferences
 *
 * Default values for components when no props are provided.
 */
export const defaults = {
    size: "md",
    shadow: shadows.md,
    radius: radius.md,
    transition: transitions.base,
};

/**
 * Utility: Get size configuration for a component type
 *
 * @param {string} componentType - Component type (button, buttonIcon, panel, heading)
 * @param {string} size - Size variant (xs, sm, md, lg, xl)
 * @returns {Object} Size configuration object
 */
export function getSizeConfig(componentType, size = "md") {
    const sizeConfig = componentSizes[componentType]?.[size];
    if (!sizeConfig) {
        console.warn(
            `Size config not found for ${componentType} size "${size}". Using "md".`
        );
        return componentSizes[componentType]?.md || {};
    }
    return sizeConfig;
}

export default {
    typography,
    spacing,
    shadows,
    radius,
    transitions,
    componentSizes,
    defaults,
    getSizeConfig,
};
