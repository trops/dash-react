import { themeVarsStyle } from "./themeVars";

test("a theme's variables become an inline style; none, nothing", () => {
    expect(themeVarsStyle({ cssVars: { "--primary-900": "#4a2a1a" } })).toEqual(
        { "--primary-900": "#4a2a1a" }
    );
    expect(themeVarsStyle({})).toBeUndefined();
    expect(themeVarsStyle(null)).toBeUndefined();
});
