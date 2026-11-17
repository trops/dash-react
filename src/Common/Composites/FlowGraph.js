import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const NODE_W = 208;
const NODE_H = 128;
const GAP_X = 64;
// Room under a row: tight when nothing runs under it; more for a step's
// "below" text, a line through the gap, or a fail arrow curving underneath.
const ROW_GAP = 32;
const BELOW_ROOM = 24;
// Lanes under one row sit far enough apart for a label above each.
const LANE_STEP = 18;
const PAD_X = 24;
const PAD_TOP = 36;
const PAD_BOTTOM = 16;
// The left margin a line runs up or down when it joins rows that aren't
// next to each other.
const CHANNEL_X = 10;

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
 * Rows wrapped to a width, like text: a row with more steps than fit
 * carries on in the next row, from the left. No width: no wrapping.
 */
export function wrapRows(rows, width) {
    const w = Number(width) || 0;
    if (!w) return rows;
    const perRow = Math.max(
        1,
        Math.floor((w - PAD_X * 2 + GAP_X) / (NODE_W + GAP_X))
    );
    const out = [];
    for (const row of rows) {
        for (let i = 0; i < row.length; i += perRow) {
            out.push(row.slice(i, i + perRow));
        }
        if (!row.length) out.push(row);
    }
    return out;
}

/**
 * How an edge is drawn: "side" (straight across to the next step in its
 * row), "fail" (curving back underneath its row), "suggested" (down to a
 * suggested step), or "lane" (through the gaps: down under its row, along,
 * and into the other step; to a row that isn't the next one, by the left
 * margin).
 */
function edgeRoute(a, b, kind) {
    if (kind === "suggested") return "suggested";
    if (kind === "fail" && a.row === b.row) return "fail";
    if (kind !== "fail" && a.row === b.row && b.col === a.col + 1)
        return "side";
    return "lane";
}

/**
 * Where each step sits, how big the drawing is, and the room under each
 * row (for the lines that run through it). A null in a row leaves its
 * place empty (a suggested step under the gap it would fill).
 *
 * `opts.width`: the room there is; a chain that doesn't fit wraps onto the
 * next row. Rows passed in are kept as they are.
 */
export function flowLayout(steps, edges, rows, opts = {}) {
    const given = rows && rows.length;
    const theRows = given ? rows : wrapRows(flowRows(steps, edges), opts.width);
    const pos = {};
    let width = 0;
    theRows.forEach((row, r) => {
        row.forEach((id, c) => {
            if (id == null) return;
            const x = PAD_X + c * (NODE_W + GAP_X);
            pos[id] = { x, y: 0, row: r, col: c };
            width = Math.max(width, x + NODE_W + PAD_X);
        });
    });
    const n = theRows.length;
    const byId = Object.fromEntries((steps || []).map((s) => [s.id, s]));
    const below = theRows.map((row) =>
        row.some((id) => id != null && byId[id] && byId[id].below)
            ? BELOW_ROOM
            : 0
    );

    // Fail arrows in their own row curve underneath it, the longer jump
    // the deeper; lines through the gap under a row each get their own lane.
    const failDepth = {};
    const failsIn = Array(n).fill(0);
    const lanesIn = Array(n).fill(0);
    const routes = {};
    const live = (edges || []).filter((e) => pos[e.from] && pos[e.to]);
    live.filter((e) => edgeRoute(pos[e.from], pos[e.to], e.kind) === "fail")
        .sort(
            (x, y) =>
                Math.abs(pos[x.from].col - pos[x.to].col) -
                Math.abs(pos[y.from].col - pos[y.to].col)
        )
        .forEach((e) => {
            const r = pos[e.from].row;
            failDepth[`${e.from}>${e.to}`] = failsIn[r]++;
        });
    let channels = 0;
    for (const e of live) {
        const a = pos[e.from];
        const b = pos[e.to];
        if (edgeRoute(a, b, e.kind) !== "lane") continue;
        const lanes = [{ row: a.row, i: lanesIn[a.row]++ }];
        // The gap it runs along to reach b: above b going down, below b
        // going back up. The gap under a's row when that's the same one.
        const target =
            b.row > a.row ? b.row - 1 : b.row < a.row ? b.row : a.row;
        if (target !== a.row) lanes.push({ row: target, i: lanesIn[target]++ });
        routes[`${e.from}>${e.to}>${e.kind}`] = {
            lanes,
            channel: target !== a.row ? channels++ : null,
        };
    }

    // Room under each row: its "below" text, then its fail arrows, then
    // its lanes, then the way down into the next row.
    const failExtent = (k) =>
        k ? Math.round((34 + (k - 1) * 40) * 0.75) + 20 : 0;
    const laneTop = theRows.map(
        (_, r) => below[r] + failExtent(failsIn[r]) + 16
    );
    const gap = theRows.map((_, r) =>
        lanesIn[r]
            ? laneTop[r] + (lanesIn[r] - 1) * LANE_STEP + 24
            : Math.max(ROW_GAP, below[r] + failExtent(failsIn[r]) + 8)
    );
    const rowY = [];
    let y = PAD_TOP;
    theRows.forEach((_, r) => {
        rowY.push(y);
        y += NODE_H + gap[r];
    });
    for (const id of Object.keys(pos)) pos[id].y = rowY[pos[id].row];
    const last = n - 1;
    const height = n
        ? rowY[last] +
          NODE_H +
          Math.max(
              PAD_BOTTOM,
              below[last] + failExtent(failsIn[last]) + 8,
              lanesIn[last] ? gap[last] : 0
          )
        : PAD_TOP;
    const laneY = (lane) =>
        rowY[lane.row] + NODE_H + laneTop[lane.row] + lane.i * LANE_STEP;
    for (const k of Object.keys(routes)) {
        routes[k].ys = routes[k].lanes.map(laneY);
    }
    return {
        pos,
        width,
        height,
        rows: theRows,
        failDepth,
        routes,
    };
}

/** A path through these points, its corners rounded. */
export function roundedPath(points, radius = 8) {
    if (points.length < 2) return "";
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
        const [px, py] = points[i - 1];
        const [x, y] = points[i];
        const [nx, ny] = points[i + 1];
        const r = Math.min(
            radius,
            Math.hypot(x - px, y - py) / 2,
            Math.hypot(nx - x, ny - y) / 2
        );
        const inX = x - Math.sign(x - px) * r;
        const inY = y - Math.sign(y - py) * r;
        const outX = x + Math.sign(nx - x) * r;
        const outY = y + Math.sign(ny - y) * r;
        d += ` L ${inX} ${inY} Q ${x} ${y}, ${outX} ${outY}`;
    }
    const [lx, ly] = points[points.length - 1];
    return `${d} L ${lx} ${ly}`;
}

/** The points of a line through the gaps (see edgeRoute). */
export function lanePoints(a, b, route) {
    const ax = a.x + NODE_W / 2;
    const bx = b.x + NODE_W / 2;
    const [y1, y2] = route.ys;
    const start = [ax, a.y + NODE_H];
    // Into b from above when b is below the lane it arrives along, else
    // from below.
    const arriveY = route.ys[route.ys.length - 1];
    const end = b.y > arriveY ? [bx, b.y - 4] : [bx, b.y + NODE_H + 4];
    if (route.channel == null) {
        return [start, [ax, y1], [bx, y1], end];
    }
    const cx = CHANNEL_X + (route.channel % 3) * 4;
    return [start, [ax, y1], [cx, y1], [cx, y2], [bx, y2], end];
}

function edgePath(a, b, kind, depth, route) {
    const how = edgeRoute(a, b, kind);
    if (how === "fail") {
        // Back along the bottom: from the middle of `a` down, round to `b`.
        const x1 = a.x + NODE_W / 2;
        const y1 = a.y + NODE_H;
        const x2 = b.x + NODE_W / 2;
        const y2 = b.y + NODE_H;
        const dip = 34 + depth * 40;
        return {
            d: `M ${x1} ${y1} C ${x1} ${y1 + dip}, ${x2} ${y2 + dip}, ${x2} ${y2 + 6}`,
            // Its label just under the lowest point of the curve.
            label: { x: (x1 + x2) / 2, y: Math.max(y1, y2) + dip * 0.75 + 14 },
        };
    }
    if (how === "side") {
        const x1 = a.x + NODE_W;
        const y = a.y + NODE_H / 2;
        const x2 = b.x - 4;
        return {
            d: `M ${x1} ${y} L ${x2} ${y}`,
            label: { x: (x1 + x2) / 2, y: y - 10 },
        };
    }
    if (how === "lane" && route) {
        const pts = lanePoints(a, b, route);
        // The label sits on the first stretch along the gap.
        const [p1, p2] = [pts[1], pts[2]];
        return {
            d: roundedPath(pts),
            label: { x: (p1[0] + p2[0]) / 2, y: p1[1] - 5 },
            mid: { x: (p1[0] + p2[0]) / 2, y: p1[1] },
        };
    }
    // A suggested step: from a's bottom, round to its left.
    const x1 = a.x + NODE_W / 2;
    const y1 = a.y + NODE_H;
    const x2 = b.x - 4;
    const y2 = b.y + NODE_H / 2;
    return {
        d: `M ${x1} ${y1} C ${x1} ${y2}, ${x1} ${y2}, ${x2} ${y2}`,
        label: { x: x1 - 30, y: (y1 + y2) / 2 - 8 },
    };
}

/** The size of the room a FlowGraph gets: its container's width. */
function useAvailableWidth(ref, fixed) {
    const [width, setWidth] = useState(fixed || 0);
    useLayoutEffect(() => {
        if (fixed) return undefined;
        const el = ref.current;
        if (!el) return undefined;
        const measure = () => setWidth(el.clientWidth || 0);
        measure();
        if (typeof ResizeObserver === "undefined") return undefined;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref, fixed]);
    return fixed || width;
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
    // The room to lay out in (px); by default the container's width. A
    // chain longer than fits wraps onto the next row (not with `rows`).
    width = 0,
}) => {
    const { currentTheme, themeVariant } = useContext(ThemeContext) || {};
    const t = getDashTokens(currentTheme);
    const variant = themeVariant === "light" ? "light" : "dark";
    const kinds = KIND_STYLES[variant];
    const colors = EDGE_COLOR[variant];
    const [hoverEdge, setHoverEdge] = useState(null);
    const boxRef = useRef(null);
    const room = useAvailableWidth(boxRef, width);

    const layout = useMemo(
        () => flowLayout(steps, edges, rows, { width: room }),
        [steps, edges, rows, room]
    );
    const byId = useMemo(
        () => Object.fromEntries(steps.map((s) => [s.id, s])),
        [steps]
    );

    const height = layout.height;
    const edgeKey = (e) => `${e.from}>${e.to}>${e.kind}`;
    const pathOf = (e) =>
        edgePath(
            layout.pos[e.from],
            layout.pos[e.to],
            e.kind,
            layout.failDepth[`${e.from}>${e.to}`] || 0,
            layout.routes[edgeKey(e)]
        );

    const graph = (
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
                    const p = pathOf(e);
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
                          if (!a || !b) return null;
                          const key = edgeKey(e);
                          const side = a.row === b.row && b.col === a.col + 1;
                          // Along a line through the gaps: a + on its
                          // stretch under the row.
                          const mid = side ? null : pathOf(e).mid;
                          if (!side && !mid) return null;
                          const x1 = side ? a.x + NODE_W : mid.x - 24;
                          const x2 = side ? b.x : mid.x + 24;
                          const y = side ? a.y + NODE_H / 2 : mid.y;
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
                                          onAdd({
                                              from: e.from,
                                              to: e.to,
                                              x: (x1 + x2) / 2,
                                              y,
                                          })
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
                            <span
                                className="text-sm font-semibold leading-tight line-clamp-3"
                                title={s.name}
                            >
                                {s.name}
                            </span>
                            {s.note ? (
                                <span
                                    className={`text-xs leading-snug line-clamp-2 ${t.muted}`}
                                    title={s.note}
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

    // Rows passed in are drawn as they are; otherwise the graph measures
    // the room it has, to wrap a long chain.
    if (rows && rows.length) return graph;
    return (
        <div ref={boxRef} className="w-full">
            {graph}
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
    NODE_W as FLOW_NODE_W,
    NODE_H as FLOW_NODE_H,
    FlowGraphLegend,
    FlowKindChip,
    KIND_LABEL as FLOW_KIND_LABEL,
};
