/**
 * resolveEditorTheme — picks the Monaco color theme for CodeEditorVS.
 *
 * An explicit themeName always wins; otherwise the editor follows the
 * active light/dark variant instead of being stuck on GitHub Dark.
 */
import { resolveEditorTheme, colorSchemeFor } from "./editorTheme";

describe("resolveEditorTheme", () => {
    test("light variant → GitHub Light", () => {
        expect(resolveEditorTheme(null, "light")).toBe("GitHub Light");
    });

    test("dark variant → GitHub Dark", () => {
        expect(resolveEditorTheme(null, "dark")).toBe("GitHub Dark");
    });

    test("unknown / missing variant → GitHub Dark (ThemeContext default)", () => {
        expect(resolveEditorTheme(undefined, undefined)).toBe("GitHub Dark");
    });

    test("explicit themeName wins over the variant", () => {
        expect(resolveEditorTheme("Monokai", "light")).toBe("Monokai");
    });
});

describe("colorSchemeFor", () => {
    test("maps the variant to a CSS color-scheme", () => {
        expect(colorSchemeFor("light")).toBe("light");
        expect(colorSchemeFor("dark")).toBe("dark");
        expect(colorSchemeFor(undefined)).toBe("dark");
    });
});
