import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * The design guide's seven color roles. Each role is the theme key that
 * applies outside Aurora plus a `dr-role-*` class that Aurora maps to its
 * CSS variable (designSystem.css), so under Aurora the variable wins.
 *
 * Faint uses the muted key outside Aurora: the theme's "dark" text shade is
 * lighter than "light" in dark mode, so it can't be the fainter one.
 */
export const DASH_ROLES = {
    text: { key: "text-neutral-light", role: "dr-role-text" },
    muted: { key: "text-neutral-medium", role: "dr-role-muted" },
    faint: { key: "text-neutral-medium", role: "dr-role-faint" },
    surface: { key: "bg-neutral-very-dark", role: "dr-role-surface" },
    well: { key: "bg-neutral-very-dark", role: "dr-role-well" },
    hairline: { key: "border-neutral-dark", role: "dr-role-hairline" },
    accent: { key: "text-primary-medium", role: "dr-role-accent" },
    accentSoft: { key: "bg-primary-very-dark", role: "dr-role-accent-soft" },
};

/** Role → class string for a theme (currentTheme may be null). */
export function getDashTokens(currentTheme) {
    const theme = currentTheme || {};
    const out = {};
    for (const [name, { key, role }] of Object.entries(DASH_ROLES)) {
        out[name] = theme[key] ? `${theme[key]} ${role}` : role;
    }
    return out;
}

/**
 * useDashTokens — color roles for the active theme, so no screen picks
 * theme keys or Tailwind shades itself.
 *
 *   const t = useDashTokens();
 *   <p className={`text-xs ${t.muted}`}>Updated 2 minutes ago</p>
 *   <div className={`border ${t.hairline} ${t.surface}`}>…</div>
 *
 * Returns { text, muted, faint, surface, well, hairline, accent,
 * accentSoft }. Muted text is a role, never opacity. Status colors come
 * from useStatusTokens().
 */
export const useDashTokens = () => {
    const { currentTheme } = useContext(ThemeContext) || {};
    return getDashTokens(currentTheme);
};
