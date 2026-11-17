import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FlowGraph, FlowGraphLegend, flowRows, flowLayout } from "./FlowGraph";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        backgroundColor: "bg-card",
        textColor: "text-card",
        borderColor: "border-card",
        borderRadius: "rounded-full",
        string: "bg-card text-card border-card",
    }),
    getUUID: (uuid, prefix) => `${prefix}-test-id`,
}));

jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { CARD: "card", STATUS_BADGE: "status-badge" },
}));

const steps = [
    { id: "src", kind: "source", name: "Ticket reader", note: "Every 15 min" },
    {
        id: "b",
        kind: "bot",
        name: "Builder",
        badge: { state: "info", label: "1 goal · round 2" },
    },
    { id: "ci", kind: "check", name: "GitHub CI" },
    { id: "r", kind: "bot", name: "Reviewer" },
    {
        id: "you",
        kind: "you",
        name: "You",
        below: { text: "or stopped at round 3", state: "warning" },
    },
];
const edges = [
    { from: "src", to: "b", kind: "next", label: "new" },
    { from: "b", to: "ci", kind: "next", label: "built" },
    { from: "ci", to: "r", kind: "next", label: "passed" },
    { from: "r", to: "you", kind: "next", label: "ready" },
    { from: "ci", to: "b", kind: "fail", label: "CI failed → fix list" },
    {
        from: "r",
        to: "b",
        kind: "fail",
        label: "Review fix list",
        state: "warning",
    },
];

function renderGraph(props = {}, variant = "dark") {
    return render(
        <ThemeContext.Provider
            value={{ currentTheme: {}, themeVariant: variant }}
        >
            <FlowGraph steps={steps} edges={edges} {...props} />
        </ThemeContext.Provider>
    );
}

describe("flowRows / flowLayout", () => {
    test("one row along the next edges", () => {
        expect(flowRows(steps, edges)).toEqual([
            ["src", "b", "ci", "r", "you"],
        ]);
    });

    test("separate chains get their own rows (a dashboard with no flows)", () => {
        const s = [{ id: "a1" }, { id: "a2" }, { id: "b1" }, { id: "b2" }];
        const e = [
            { from: "a1", to: "a2", kind: "next" },
            { from: "b1", to: "b2", kind: "next" },
        ];
        expect(flowRows(s, e)).toEqual([
            ["a1", "a2"],
            ["b1", "b2"],
        ]);
        const l = flowLayout(s, e);
        expect(l.pos.b1.row).toBe(1);
        expect(l.pos.a2.x).toBeGreaterThan(l.pos.a1.x);
    });
});

describe("FlowGraph", () => {
    test("shows every step with its kind, name, badge and the note below", () => {
        renderGraph();
        expect(screen.getByText("Ticket reader")).toBeInTheDocument();
        expect(screen.getByText("Code check")).toBeInTheDocument();
        expect(screen.getAllByText("AI")).toHaveLength(2);
        expect(screen.getByText("1 goal · round 2")).toBeInTheDocument();
        expect(screen.getByText("or stopped at round 3")).toBeInTheDocument();
        expect(screen.getByText("CI failed → fix list")).toBeInTheDocument();
    });

    test("a step opens when clicked, and shows it's selected", () => {
        const onSelect = jest.fn();
        renderGraph({ onSelect, selectedId: "r" });
        const reviewer = screen.getByRole("button", { name: /^AI: Reviewer/ });
        expect(reviewer).toHaveAttribute("aria-pressed", "true");
        fireEvent.click(
            screen.getByRole("button", { name: /^Code check: GitHub CI/ })
        );
        expect(onSelect).toHaveBeenCalledWith("ci");
    });

    test("the + on an arrow adds a step between its two steps", () => {
        const onAdd = jest.fn();
        renderGraph({ onAdd });
        fireEvent.click(
            screen.getByRole("button", {
                name: "Add a step between Builder and GitHub CI",
            })
        );
        expect(onAdd).toHaveBeenCalledWith({ from: "b", to: "ci" });
    });

    test("no + without onAdd, and steps aren't buttons without onSelect", () => {
        renderGraph();
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("kind colours flip for light themes", () => {
        renderGraph({}, "light");
        expect(screen.getByText("Code check").className).toMatch(/bg-cyan-100/);
    });
});

describe("FlowGraphLegend", () => {
    test("names AI, Code check and You", () => {
        render(
            <ThemeContext.Provider
                value={{ currentTheme: {}, themeVariant: "dark" }}
            >
                <FlowGraphLegend />
            </ThemeContext.Provider>
        );
        expect(screen.getByText("AI")).toBeInTheDocument();
        expect(screen.getByText("Code check")).toBeInTheDocument();
        expect(screen.getByText("You")).toBeInTheDocument();
    });
});
