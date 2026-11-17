import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DiffView, diffLines, foldLines } from "./DiffView";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        backgroundColor: "bg-card",
        textColor: "text-card",
        borderColor: "border-card",
        string: "",
    }),
    getUUID: (uuid, prefix) => `${prefix}-test-id`,
}));

jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { CARD: "card" },
}));

const before = [
    "const pr = input.input.pr;",
    'const ok = pr.checks.conclusion === "success";',
    "process.exit(ok ? 0 : 1);",
].join("\n");
const after = [
    "const pr = input.input.pr;",
    'const ok = pr.checks.conclusion === "success"',
    "  && pr.head.sha === input.input.commit;",
    "process.exit(ok ? 0 : 1);",
].join("\n");

describe("diffLines", () => {
    test("marks the removed and added lines, keeps the rest", () => {
        expect(diffLines(before, after).map((l) => l.type)).toEqual([
            "same",
            "remove",
            "add",
            "add",
            "same",
        ]);
    });

    test("same text: nothing changed", () => {
        expect(diffLines("a\nb", "a\nb").every((l) => l.type === "same")).toBe(
            true
        );
    });
});

describe("foldLines", () => {
    test("folds long unchanged runs away from the changes", () => {
        const lines = [
            ...Array.from({ length: 10 }, (_, i) => ({
                type: "same",
                text: `l${i}`,
            })),
            { type: "add", text: "new" },
        ];
        const out = foldLines(lines, 2);
        expect(out[0]).toEqual({ type: "fold", count: 8 });
        expect(out.at(-1)).toEqual({ type: "add", text: "new" });
    });
});

describe("DiffView", () => {
    test("shows each changed line with its mark and colour", () => {
        render(
            <ThemeContext.Provider
                value={{ currentTheme: {}, themeVariant: "dark" }}
            >
                <DiffView
                    before={before}
                    after={after}
                    title="scripts/check-pr.js"
                />
            </ThemeContext.Provider>
        );
        expect(screen.getByText("scripts/check-pr.js")).toBeInTheDocument();
        const removed = document.querySelector('[data-diff="remove"]');
        expect(removed.className).toMatch(/bg-rose-900/);
        expect(document.querySelectorAll('[data-diff="add"]')).toHaveLength(2);
        expect(screen.getByLabelText("3 changed lines")).toBeInTheDocument();
    });
});
