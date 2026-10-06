/**
 * Status colors (error / success / warning / info) per theme variant.
 *
 * Theme tokens only cover the primary/secondary/tertiary/neutral
 * channels, so status colors are fixed Tailwind shades chosen per
 * light/dark variant. Every class is a solid shade — the prebuilt CSS
 * bundle doesn't reliably carry opacity modifiers (`bg-red-900/30`)
 * or arbitrary values. Class strings are written out literally so
 * Tailwind's content scan picks them up.
 *
 * Keys:
 *   bg           subtle surface for banners / callouts
 *   text         body text on `bg`
 *   strongText   titles / emphasis on `bg`
 *   border       subtle border around `bg`
 *   accentBorder saturated border (e.g. left accent bar)
 *   icon         icon / standalone status text on the theme surface
 *   solidBg      saturated fill (status dots, progress)
 *   hoverBg      hover surface for controls on `bg`
 *   hoverText    hover text for controls on `bg`
 */

const STATUS_VARIANTS = ["error", "success", "warning", "info"];

const STATUS_COLORS = {
    light: {
        error: {
            bg: "bg-red-50",
            text: "text-red-800",
            strongText: "text-red-900",
            border: "border-red-200",
            accentBorder: "border-red-500",
            icon: "text-red-600",
            solidBg: "bg-red-500",
            hoverBg: "hover:bg-red-100",
            hoverText: "hover:text-red-900",
        },
        success: {
            bg: "bg-green-50",
            text: "text-green-800",
            strongText: "text-green-900",
            border: "border-green-200",
            accentBorder: "border-green-500",
            icon: "text-green-600",
            solidBg: "bg-green-500",
            hoverBg: "hover:bg-green-100",
            hoverText: "hover:text-green-900",
        },
        warning: {
            bg: "bg-amber-50",
            text: "text-amber-800",
            strongText: "text-amber-900",
            border: "border-amber-200",
            accentBorder: "border-amber-500",
            icon: "text-amber-600",
            solidBg: "bg-amber-500",
            hoverBg: "hover:bg-amber-100",
            hoverText: "hover:text-amber-900",
        },
        info: {
            bg: "bg-blue-50",
            text: "text-blue-800",
            strongText: "text-blue-900",
            border: "border-blue-200",
            accentBorder: "border-blue-500",
            icon: "text-blue-600",
            solidBg: "bg-blue-500",
            hoverBg: "hover:bg-blue-100",
            hoverText: "hover:text-blue-900",
        },
    },
    dark: {
        error: {
            bg: "bg-red-950",
            text: "text-red-200",
            strongText: "text-red-100",
            border: "border-red-800",
            accentBorder: "border-red-500",
            icon: "text-red-400",
            solidBg: "bg-red-500",
            hoverBg: "hover:bg-red-900",
            hoverText: "hover:text-red-100",
        },
        success: {
            bg: "bg-green-950",
            text: "text-green-200",
            strongText: "text-green-100",
            border: "border-green-800",
            accentBorder: "border-green-500",
            icon: "text-green-400",
            solidBg: "bg-green-500",
            hoverBg: "hover:bg-green-900",
            hoverText: "hover:text-green-100",
        },
        warning: {
            bg: "bg-amber-950",
            text: "text-amber-200",
            strongText: "text-amber-100",
            border: "border-amber-800",
            accentBorder: "border-amber-500",
            icon: "text-amber-400",
            solidBg: "bg-amber-500",
            hoverBg: "hover:bg-amber-900",
            hoverText: "hover:text-amber-100",
        },
        info: {
            bg: "bg-blue-950",
            text: "text-blue-200",
            strongText: "text-blue-100",
            border: "border-blue-800",
            accentBorder: "border-blue-500",
            icon: "text-blue-400",
            solidBg: "bg-blue-500",
            hoverBg: "hover:bg-blue-900",
            hoverText: "hover:text-blue-100",
        },
    },
};

/**
 * Status palette for a theme variant. Anything other than "light"
 * gets the dark palette, matching ThemeContext's "dark" default.
 */
const getStatusColors = (themeVariant) =>
    themeVariant === "light" ? STATUS_COLORS.light : STATUS_COLORS.dark;

export { STATUS_VARIANTS, getStatusColors };
