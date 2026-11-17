import React, { useState } from "react";
import { FlowGraph, FlowGraphLegend } from "./FlowGraph";
import { DiffView } from "./DiffView";

export default {
    title: "Composites/FlowGraph",
    component: FlowGraph,
};

const ticketSteps = [
    {
        id: "src",
        kind: "source",
        name: "Ticket reader",
        note: "Every 15 min · label auto",
        badge: { state: "neutral", label: "1 queued" },
    },
    {
        id: "b",
        kind: "bot",
        name: "Builder",
        note: "Builds in its own copy of the repo",
        badge: { state: "info", label: "1 goal · round 2" },
    },
    {
        id: "ci",
        kind: "check",
        name: "GitHub CI",
        note: "Passes only if CI passed for that commit",
    },
    {
        id: "r",
        kind: "bot",
        name: "Reviewer",
        note: "Checks every criterion has proof",
    },
    {
        id: "you",
        kind: "you",
        name: "You",
        note: "Merge the PR",
        badge: { state: "warning", label: "1 ready" },
        below: { text: "or stopped at round 3", state: "warning" },
    },
];
const ticketEdges = [
    { from: "src", to: "b", kind: "next", label: "new" },
    { from: "b", to: "ci", kind: "next", label: "built" },
    { from: "ci", to: "r", kind: "next", label: "passed" },
    { from: "r", to: "you", kind: "next", label: "ready" },
    { from: "ci", to: "b", kind: "fail", label: "CI failed → fix list" },
    {
        from: "r",
        to: "b",
        kind: "fail",
        label: "Review fix list · round under 3",
        state: "warning",
    },
];

/** A flow with fix rounds, a selected step and the + on its arrows. */
export const TicketToPr = () => {
    const [selected, setSelected] = useState("r");
    return (
        <div style={{ overflowX: "auto" }}>
            <FlowGraphLegend />
            <FlowGraph
                steps={ticketSteps}
                edges={ticketEdges}
                selectedId={selected}
                onSelect={setSelected}
                onAdd={() => {}}
            />
        </div>
    );
};

/**
 * The same flow in a narrow space: the chain wraps onto the next row, the
 * line running back under the first row; the reviewer's fix list goes round
 * by the left margin.
 */
export const Wrapped = () => (
    <div style={{ width: 760 }}>
        <FlowGraph
            steps={ticketSteps}
            edges={ticketEdges}
            onSelect={() => {}}
            onAdd={() => {}}
        />
    </div>
);

/** A setup with a gap: Sender takes the draft unchecked (frame 7). */
export const Warnings = () => (
    <FlowGraph
        steps={[
            {
                id: "n",
                kind: "source",
                name: "Notes reader",
                note: "Daily · notes tagged newsletter",
            },
            {
                id: "w",
                kind: "bot",
                name: "Writer",
                note: "Writes the week's newsletter",
            },
            {
                id: "s",
                kind: "bot",
                name: "Sender",
                note: "Sends to the list",
                warn: true,
            },
            {
                id: "add",
                kind: "check",
                name: "+ Add a check",
                note: "Links work · length · nothing banned",
                dashed: true,
            },
        ]}
        edges={[
            { from: "n", to: "w", kind: "next", label: "notes" },
            {
                from: "w",
                to: "s",
                kind: "next",
                label: "draft (no status)",
                state: "warning",
            },
            { from: "w", to: "add", kind: "suggested", label: "suggested" },
        ]}
        rows={[
            ["n", "w", "s"],
            [null, null, "add"],
        ]}
    />
);

/** A dashboard with no flows: what its bots read and show (frame 21). */
export const NoFlows = () => (
    <FlowGraph
        steps={[
            {
                id: "g",
                kind: "source",
                name: "Gmail",
                note: "Claude connector",
            },
            {
                id: "e",
                kind: "bot",
                name: "Email Reader",
                note: "Every day 7:00",
            },
            {
                id: "w1",
                kind: "widget",
                name: "Email results",
                note: "Shows who needs a reply",
                dashed: true,
            },
            {
                id: "r",
                kind: "source",
                name: "Recipes site",
                note: "Web search",
            },
            {
                id: "f",
                kind: "bot",
                name: "Recipe Finder",
                note: "When you ask",
            },
        ]}
        edges={[
            { from: "g", to: "e", kind: "next", label: "reads" },
            { from: "e", to: "w1", kind: "next", label: "result" },
            { from: "r", to: "f", kind: "next", label: "reads" },
        ]}
    />
);

/** A script's changes in an update (frame 35). */
export const Diff = () => (
    <DiffView
        title="scripts/check-pr.js"
        before={[
            "const pr = input.input.pr;",
            'const ok = pr.checks.conclusion === "success";',
            "process.exit(ok ? 0 : 1);",
        ].join("\n")}
        after={[
            "const pr = input.input.pr;",
            'const ok = pr.checks.conclusion === "success"',
            "  && pr.head.sha === input.input.commit;",
            "process.exit(ok ? 0 : 1);",
        ].join("\n")}
    />
);
