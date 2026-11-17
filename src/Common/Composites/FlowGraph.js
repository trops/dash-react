import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getDashTokens } from "@dash/Hooks/useDashTokens";
import { StatusBadge } from "./StatusBadge";

/**
 * FlowGraph — who hands work to whom (flows: loops and graphs). Steps sit in
 * rows, left to right; arrows between them carry a label; arrows that go
 * back (a check or a reviewer sending work back for another round) curve
 * underneath. Each kind of step looks different — an AI step, a code check,
 * you — with the same fixed colours in every theme (like StatusBadge), so
 * the kind reads the same whatever theme is chosen.
 *
 * Steps:  { id, kind: "source"|"bot"|"check"|"you"|"widget", name, note,
 *           badge?: { state, label }, below?: { text, state },
 *           warn?: boolean, dashed?: boolean, faded?: boolean }
 * Edges:  { from, to, kind: "next"|"fail"|"suggested", label?,
 *           state?: "warning"|"error" }
 * Rows:   [[stepId, …], …] — optional; by default one row along the
 *         "next" edges, then any steps left over in their own rows.
 *
 * `onAdd({ from, to })` shows a + on a "next" arrow when you hover it
 * (frame 11); `onSelect(stepId)` opens a step.
 */

const NODE_W = 140;
const NODE_H = 124;
const GAP_X = 64;
const ROW_GAP = 116;
const PAD_X = 24;
const PAD_TOP = 36;

const KIND_LABEL = {
    source: "Source",
    bot: "AI",
    check: "Code check",
    you: "You",
    widget: "Widget",
};

// Fixed meanings, both themes (see StatusBadge for the rationale).
const KIND_STYLES = {
    dark: {
        source: {
            chip: "bg-slate-700 text-slate-200",
            dot: "bg-slate-400",
            border: "",
        },
        bot: {
            chip: "bg-violet-900 text-violet-300",
            dot: "bg-violet-300",
            border: "",
        },
        check: {
            chip: "bg-cyan-900 text-cyan-300",
            dot: "bg-cyan-400",
            border: "border-cyan-500",
        },
        you: {
            chip: "bg-fuchsia-900 text-fuchsia-300",
            dot: "bg-fuchsia-300",
            border: "border-fuchsia-400",
        },
        widget: {
            chip: "bg-slate-800 text-slate-300",
            dot: "bg-slate-500",
            border: "",
        },
    },
    light: {
        source: {
            chip: "bg-slate-200 text-slate-800",
            dot: "bg-slate-500",
            border: "",
        },
        bot: {
            chip: "bg-violet-100 text-violet-800",
            dot: "bg-violet-500",
            border: "",
        },
        check: {
            chip: "bg-cyan-100 text-cyan-800",
            dot: "bg-cyan-600",
            border: "border-cyan-600",
        },
        you: {
            chip: "bg-fuchsia-100 text-fuchsia-800",
            dot: "bg-fuchsia-500",
            border: "border-fuchsia-500",
        },
        widget: {
            chip: "bg-slate-100 text-slate-700",
            dot: "bg-slate-400",
            border: "",
        },
    },
};

const EDGE_COLOR = {
    dark: {
        next: "text-slate-500",
        error: "text-rose-400",
        warning: "text-amber-400",
        suggested: "text-cyan-400",
        label: "text-slate-300",
    },
    light: {
        next: "text-slate-400",
        error: "text-rose-600",
        warning: "text-amber-600",
        suggested: "text-cyan-700",
        label: "text-slate-600",
    },
};

const BELOW_COLOR = {
    dark: { warning: "text-amber-400", error: "text-rose-400", neutral: "" },
    light: { warning: "text-amber-700", error: "text-rose-700", neutral: "" },
};

/** Rows of step ids: along the "next" edges, then what's left. */
export function flowRows(steps, edges) {
    const ids = steps.map((s) => s.id);
    const next = new Map();
    const hasIn = new Set();
    for (const e of edges || []) {
        if (e.kind !== "next") continue;
        if (!next.has(e.from)) next.set(e.from, e.to);
        hasIn.add(e.to);
    }
    const rows = [];
    const placed = new Set();
    for (const start of ids) {
        if (placed.has(start) || hasIn.has(start)) continue;
        const row = [];
        let cur = start;
        while (cur && !placed.has(cur) && ids.includes(cur)) {
            row.push(cur);
            placed.add(cur);
            cur = next.get(cur);
        }
        if (row.length) rows.push(row);
    }
    // A loop with no start, or steps nothing reaches.
    for (const id of ids) if (!placed.has(id)) rows.push([id]);
    return rows;
}

/**
 * Where each step sits, and how big the drawing is. A null in a row leaves
 * its place empty (a suggested step under the gap it would fill).
 */
export function flowLayout(steps, edges, rows) {
    const theRows = rows && rows.length ? rows : flowRows(steps, edges);
    const pos = {};
    let width = 0;
    theRows.forEach((row, r) => {
        row.forEach((id, c) => {
            if (id == null) return;
            const x = PAD_X + c * (NODE_W + GAP_X);
            const y = PAD_TOP + r * (NODE_H + ROW_GAP);
            pos[id] = { x, y, row: r, col: c };
            width = Math.max(width, x + NODE_W + PAD_X);
        });
    });
    const height = PAD_TOP + theRows.length * (NODE_H + ROW_GAP) - ROW_GAP / 2;
    return { pos, width, height, rows: theRows };
}

function edgePath(a, b, kind, depth) {
    if (kind === "fail") {
        // Back along the bottom: from the middle of `a` down, round to `b`.
        const x1 = a.x + NODE_W / 2;
        const y1 = a.y + NODE_H;
        const x2 = b.x + NODE_W / 2 + (depth ? 0 : 0);
        const y2 = b.y + NODE_H;
        const dip = 34 + depth * 40;
        return {
            d: `M ${x1} ${y1} C ${x1} ${y1 + dip}, ${x2} ${y2 + dip}, ${x2} ${y2 + 6}`,
            label: { x: (x1 + x2) / 2, y: Math.max(y1, y2) + dip * 0.8 + 6 },
        };
    }
    if (a.row === b.row && b.col === a.col + 1) {
        const x1 = a.x + NODE_W;
        const y = a.y + NODE_H / 2;
        const x2 = b.x - 4;
        return {
            d: `M ${x1} ${y} L ${x2} ${y}`,
            label: { x: (x1 + x2) / 2, y: y - 10 },
        };
    }
    // Anywhere else: a gentle curve from a's right (or bottom) to b's left.
    const x1 = a.x + (kind === "suggested" ? NODE_W / 2 : NODE_W);
    const y1 = a.y + (kind === "suggested" ? NODE_H : NODE_H / 2);
    const x2 = b.x - 4;
    const y2 = b.y + NODE_H / 2;
    const mx = (x1 + x2) / 2;
    return {
        d:
            kind === "suggested"
                ? `M ${x1} ${y1} C ${x1} ${y2}, ${x1} ${y2}, ${x2} ${y2}`
                : `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
        label: { x: kind === "suggested" ? x1 - 30 : mx, y: (y1 + y2) / 2 - 8 },
    };
}

const FlowGraph = ({
    steps = [],
    edges = [],
    rows = null,
    selectedId = null,
    onSelect = null,
    onAdd = null,
    className = "",
    ariaLabel = "Flow",
}) => {
    const { currentTheme, themeVariant } = useContext(ThemeContext) || {};
    const t = getDashTokens(currentTheme);
    const variant = themeVariant === "light" ? "light" : "dark";
    const kinds = KIND_STYLES[variant];
    const colors = EDGE_COLOR[variant];
    const [hoverEdge, setHoverEdge] = useState(null);

    const layout = useMemo(
        () => flowLayout(steps, edges, rows),
        [steps, edges, rows]
    );
    const byId = useMemo(
        () => Object.fromEntries(steps.map((s) => [s.id, s])),
        [steps]
    );

    // Back arrows are stacked: the longer the jump, the deeper the curve.
    const failDepth = {};
    edges
        .filter(
            (e) => e.kind === "fail" && layout.pos[e.from] && layout.pos[e.to]
        )
        .sort(
            (x, y) =>
                Math.abs(layout.pos[x.from].col - layout.pos[x.to].col) -
                Math.abs(layout.pos[y.from].col - layout.pos[y.to].col)
        )
        .forEach((e, i) => {
            failDepth[`${e.from}>${e.to}`] = i;
        });
    const maxDepth = Object.keys(failDepth).length;
    const height = layout.height + (maxDepth ? 30 + maxDepth * 40 : 0);

    const edgeKey = (e) => `${e.from}>${e.to}>${e.kind}`;

    return (
        <div
            className={`relative ${className}`}
            style={{ width: layout.width, height }}
            role="group"
            aria-label={ariaLabel}
            data-testid="flow-graph"
        >
            <svg
                className="absolute inset-0 pointer-events-none"
                width={layout.width}
                height={height}
                aria-hidden="true"
            >
                <defs>
                    <marker
                        id="flowgraph-arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                    </marker>
                </defs>
                {edges.map((e) => {
                    const a = layout.pos[e.from];
                    const b = layout.pos[e.to];
                    if (!a || !b) return null;
                    const p = edgePath(
                        a,
                        b,
                        e.kind,
                        failDepth[`${e.from}>${e.to}`] || 0
                    );
                    const tone =
                        e.state === "error" || (e.kind === "fail" && !e.state)
                            ? colors.error
                            : e.state === "warning"
                              ? colors.warning
                              : e.kind === "suggested"
                                ? colors.suggested
                                : colors.next;
                    const hovered = hoverEdge === edgeKey(e);
                    return (
                        <g key={edgeKey(e)} className={tone}>
                            <path
                                d={p.d}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={hovered ? 2.5 : 1.75}
                                strokeDasharray={
                                    e.kind === "suggested" || e.dashed
                                        ? "5 4"
                                        : undefined
                                }
                                markerEnd="url(#flowgraph-arrow)"
                            />
                            {e.label ? (
                                <text
                                    x={p.label.x}
                                    y={p.label.y}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fontWeight="600"
                                    fill="currentColor"
                                    className={
                                        e.kind === "next" && !e.state
                                            ? colors.label
                                            : ""
                                    }
                                >
                                    {e.label}
                                </text>
                            ) : null}
                        </g>
                    );
                })}
            </svg>

            {onAdd
                ? edges
                      .filter((e) => e.kind === "next")
                      .map((e) => {
                          const a = layout.pos[e.from];
                          const b = layout.pos[e.to];
                          if (!a || !b || a.row !== b.row) return null;
                          const key = edgeKey(e);
                          const x1 = a.x + NODE_W;
                          const x2 = b.x;
                          const y = a.y + NODE_H / 2;
                          const hovered = hoverEdge === key;
                          return (
                              <div
                                  key={`add-${key}`}
                                  className="absolute flex items-center justify-center"
                                  style={{
                                      left: x1,
                                      top: y - 16,
                                      width: x2 - x1,
                                      height: 32,
                                  }}
                                  onMouseEnter={() => setHoverEdge(key)}
                                  onMouseLeave={() => setHoverEdge(null)}
                                  onFocus={() => setHoverEdge(key)}
                                  onBlur={() => setHoverEdge(null)}
                              >
                                  <button
                                      type="button"
                                      aria-label={`Add a step between ${byId[e.from] ? byId[e.from].name : "this step"} and ${byId[e.to] ? byId[e.to].name : "the next"}`}
                                      onClick={() =>
                                          onAdd({ from: e.from, to: e.to })
                                      }
                                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-base font-semibold transition-opacity duration-150 ${t.surface} ${hovered ? "opacity-100" : "opacity-0"} border-violet-400 text-violet-400`}
                                  >
                                      +
                                  </button>
                              </div>
                          );
                      })
                : null}

            {steps.map((s) => {
                const p = layout.pos[s.id];
                if (!p) return null;
                const k = kinds[s.kind] || kinds.bot;
                const selected = selectedId === s.id;
                const border = selected
                    ? ""
                    : s.warn
                      ? variant === "light"
                          ? "border-amber-500"
                          : "border-amber-400"
                      : k.border || t.hairline;
                const ring = selected ? "border-2 border-violet-400" : "";
                const clickable = !!onSelect;
                const Tag = clickable ? "button" : "div";
                return (
                    <div
                        key={s.id}
                        className="absolute"
                        style={{ left: p.x, top: p.y, width: NODE_W }}
                    >
                        <Tag
                            type={clickable ? "button" : undefined}
                            onClick={
                                clickable ? () => onSelect(s.id) : undefined
                            }
                            aria-pressed={clickable ? selected : undefined}
                            aria-label={`${KIND_LABEL[s.kind] || "Step"}: ${s.name}${s.note ? `. ${s.note}` : ""}`}
                            data-testid={`flow-step-${s.id}`}
                            className={`w-full text-left flex flex-col gap-1 p-2 rounded-lg border ${s.dashed ? "border-dashed" : ""} ${border} ${ring} ${t.surface} ${t.text} ${s.faded ? "opacity-50" : ""}`}
                            style={{ height: NODE_H }}
                        >
                            <span
                                className={`self-start text-xs font-semibold px-1.5 py-0.5 rounded ${k.chip}`}
                            >
                                {KIND_LABEL[s.kind] || "Step"}
                            </span>
                            <span className="text-sm font-semibold leading-tight line-clamp-2">
                                {s.name}
                            </span>
                            {s.note ? (
                                <span
                                    className={`text-xs leading-snug line-clamp-3 ${t.muted}`}
                                >
                                    {s.note}
                                </span>
                            ) : null}
                            {s.badge ? (
                                <span className="mt-auto">
                                    <StatusBadge
                                        state={s.badge.state || "neutral"}
                                        label={s.badge.label}
                                    />
                                </span>
                            ) : null}
                        </Tag>
                        {s.below ? (
                            <div
                                className={`mt-2 text-xs font-semibold text-center ${BELOW_COLOR[variant][s.below.state || "neutral"] || ""}`}
                            >
                                {s.below.text}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

/** The key under the graph: AI, Code check, You. */
const FlowGraphLegend = ({
    kinds = ["bot", "check", "you"],
    className = "",
}) => {
    const { themeVariant, currentTheme } = useContext(ThemeContext) || {};
    const t = getDashTokens(currentTheme);
    const k = KIND_STYLES[themeVariant === "light" ? "light" : "dark"];
    return (
        <span
            className={`inline-flex items-center gap-3 text-xs ${t.muted} ${className}`}
        >
            {kinds.map((kind) => (
                <span key={kind} className="inline-flex items-center gap-1.5">
                    <span
                        aria-hidden="true"
                        className={`inline-block w-2.5 h-2.5 rounded-sm ${k[kind].dot}`}
                    />
                    {KIND_LABEL[kind]}
                </span>
            ))}
        </span>
    );
};

/** A step-kind chip on its own (lists, proposals, panels). */
const FlowKindChip = ({ kind = "bot", label = null, className = "" }) => {
    const { themeVariant } = useContext(ThemeContext) || {};
    const k = KIND_STYLES[themeVariant === "light" ? "light" : "dark"];
    return (
        <span
            className={`inline-flex text-xs font-semibold px-1.5 py-0.5 rounded ${(k[kind] || k.bot).chip} ${className}`}
        >
            {label || KIND_LABEL[kind] || "Step"}
        </span>
    );
};

export {
    FlowGraph,
    FlowGraphLegend,
    FlowKindChip,
    KIND_LABEL as FLOW_KIND_LABEL,
};
