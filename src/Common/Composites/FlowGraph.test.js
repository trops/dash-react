import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    FlowGraph,
    FlowGraphLegend,
    flowRows,
    flowLayout,
    wrapRows,
    lanePoints,
    FLOW_NODE_W,
    FLOW_NODE_H,
} from "./FlowGraph";
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

describe("wrapping and room under rows", () => {
    test("cards are 208 wide; a chain that doesn't fit wraps like text", () => {
        expect(FLOW_NODE_W).toBe(208);
        // 1000px fits three cards a row.
        expect(wrapRows([["a", "b", "c", "d", "e"]], 1000)).toEqual([
            ["a", "b", "c"],
            ["d", "e"],
        ]);
        expect(wrapRows([["a", "b"]], 0)).toEqual([["a", "b"]]);
        expect(wrapRows([["a", "b", "c"]], 100)).toEqual([["a"], ["b"], ["c"]]);
    });

    test("with no width, one row as before", () => {
        const l = flowLayout(steps, edges);
        expect(l.rows).toEqual([["src", "b", "ci", "r", "you"]]);
    });

    test("rows passed in are kept, whatever the width", () => {
        const l = flowLayout(steps, edges, [["src", "b", "ci", "r", "you"]], {
            width: 500,
        });
        expect(l.rows).toHaveLength(1);
    });

    test("rows sit close when nothing runs under them", () => {
        const s = [{ id: "a1" }, { id: "a2" }, { id: "b1" }, { id: "b2" }];
        const e = [
            { from: "a1", to: "a2", kind: "next" },
            { from: "b1", to: "b2", kind: "next" },
        ];
        const l = flowLayout(s, e);
        expect(l.pos.b1.y - (l.pos.a1.y + FLOW_NODE_H)).toBe(32);
    });

    test("a wrapped chain: the line drops under the row, runs back, and goes down into the next card", () => {
        const l = flowLayout(steps, edges, null, { width: 1000 });
        expect(l.rows).toEqual([
            ["src", "b", "ci"],
            ["r", "you"],
        ]);
        const ci = l.pos.ci;
        const r = l.pos.r;
        const route = l.routes["ci>r>next"];
        const pts = lanePoints(ci, r, route);
        const lane = pts[1][1];
        // Down from the middle of ci's bottom…
        expect(pts[0]).toEqual([ci.x + FLOW_NODE_W / 2, ci.y + FLOW_NODE_H]);
        // …along a lane in the gap between the rows…
        expect(lane).toBeGreaterThan(ci.y + FLOW_NODE_H);
        expect(lane).toBeLessThan(r.y);
        expect(pts[2]).toEqual([r.x + FLOW_NODE_W / 2, lane]);
        // …and down into the top of r.
        expect(pts[3]).toEqual([r.x + FLOW_NODE_W / 2, r.y - 4]);
    });

    test("a fail arrow to an earlier row goes round by the left margin, into the bottom of its card", () => {
        const l = flowLayout(steps, edges, null, { width: 1000 });
        const route = l.routes["r>b>fail"];
        expect(route.channel).toBe(0);
        const pts = lanePoints(l.pos.r, l.pos.b, route);
        const xs = pts.map((p) => p[0]);
        expect(Math.min(...xs)).toBeLessThan(l.pos.src.x);
        expect(pts[pts.length - 1]).toEqual([
            l.pos.b.x + FLOW_NODE_W / 3,
            l.pos.b.y + FLOW_NODE_H + 4,
        ]);
        // Its lane in the upper gap is clear of the wrap line's.
        expect(route.ys[1]).not.toBe(l.routes["ci>r>next"].ys[0]);
    });

    const six = [
        { id: "t", kind: "source", name: "Ticket reader" },
        { id: "bu", kind: "bot", name: "Builder" },
        { id: "l", kind: "check", name: "Lint" },
        { id: "rv", kind: "bot", name: "Reviewer" },
        { id: "tp", kind: "check", name: "Tests pass" },
        { id: "y", kind: "you", name: "You" },
    ];
    const sixEdges = [
        { from: "t", to: "bu", kind: "next" },
        { from: "bu", to: "l", kind: "next" },
        { from: "l", to: "rv", kind: "next" },
        { from: "rv", to: "tp", kind: "next" },
        { from: "tp", to: "y", kind: "next" },
        {
            from: "l",
            to: "bu",
            kind: "fail",
            label: "failed → fix list · up to 3 rounds",
        },
    ];

    test("a line back up to a card never runs on the line leaving it for the next row", () => {
        // Two cards a row: Builder ends row 0, Lint starts row 1.
        const l = flowLayout(six, sixEdges, null, { width: 560 });
        expect(l.rows[0]).toEqual(["t", "bu"]);
        const bu = l.pos.bu;
        const wrap = lanePoints(bu, l.pos.l, l.routes["bu>l>next"]);
        const back = lanePoints(l.pos.l, bu, l.routes["l>bu>fail"]);
        // The wrap leaves the middle of Builder's bottom; the line back
        // comes into it a third of the way along.
        expect(wrap[0][0]).toBe(bu.x + FLOW_NODE_W / 2);
        const end = back[back.length - 1];
        expect(end[1]).toBe(bu.y + FLOW_NODE_H + 4);
        expect(end[0]).toBeCloseTo(bu.x + FLOW_NODE_W / 3);
        // Its lane under Builder's row is its own, nearer the row.
        const backLane = back[back.length - 2][1];
        const wrapLane = wrap[1][1];
        expect(backLane).toBeLessThan(wrapLane);
        // Its stretch along that lane stops before the wrap's way down.
        expect(
            Math.max(back[back.length - 2][0], back[back.length - 3][0])
        ).toBeLessThan(wrap[0][0]);
    });

    test("an arrow's label stays inside the drawing", () => {
        render(
            <ThemeContext.Provider
                value={{ currentTheme: {}, themeVariant: "dark" }}
            >
                <FlowGraph steps={six} edges={sixEdges} width={300} />
            </ThemeContext.Provider>
        );
        const label = screen.getByText("failed → fix list · up to 3 rounds");
        const x = parseFloat(label.getAttribute("x"));
        const half = ("failed → fix list · up to 3 rounds".length * 6.4) / 2;
        expect(x - half).toBeGreaterThanOrEqual(0);
    });

    test("a row with a fail arrow underneath gets room for it", () => {
        const l = flowLayout(steps, edges, null, { width: 1000 });
        const gap = l.pos.r.y - (l.pos.src.y + FLOW_NODE_H);
        expect(gap).toBeGreaterThan(60);
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
        expect(onAdd).toHaveBeenCalledWith(
            expect.objectContaining({ from: "b", to: "ci" })
        );
        // Where the + was, so the caller can put its menu there.
        expect(typeof onAdd.mock.calls[0][0].x).toBe("number");
    });

    test("no + without onAdd, and steps aren't buttons without onSelect", () => {
        renderGraph();
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("a long name shows in full on hover", () => {
        renderGraph();
        expect(screen.getByText("Ticket reader")).toHaveAttribute(
            "title",
            "Ticket reader"
        );
    });

    test("in a narrow space the chain wraps, and the line into the next row has its +", () => {
        const onAdd = jest.fn();
        renderGraph({ onAdd, width: 1000 });
        const top = (id) =>
            parseFloat(
                screen.getByTestId(`flow-step-${id}`).parentElement.style.top
            );
        expect(top("r")).toBeGreaterThan(top("ci"));
        fireEvent.click(
            screen.getByRole("button", {
                name: "Add a step between GitHub CI and Reviewer",
            })
        );
        expect(onAdd).toHaveBeenCalledWith(
            expect.objectContaining({ from: "ci", to: "r" })
        );
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
