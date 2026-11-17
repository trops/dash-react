import { useContext, useMemo } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getDashTokens } from "@dash/Hooks/useDashTokens";

/**
 * DiffView — a file's changes, line by line (updating a flow: "Script
 * changes", frame 35). Removed lines are red with a "-", added lines green
 * with a "+", unchanged lines plain; long runs of unchanged lines fold to a
 * "… N unchanged lines" row. Red and green are fixed meanings, the same in
 * every theme (like StatusBadge); the rest follows the theme.
 *
 * Give `before` and `after` (text), or `lines` already diffed
 * ([{ type: "same"|"add"|"remove", text }]).
 */

const MAX_LINES = 2000;
const CONTEXT = 3;

const TONES = {
    dark: {
        add: "bg-emerald-900 text-emerald-200",
        remove: "bg-rose-900 text-rose-200",
    },
    light: {
        add: "bg-emerald-100 text-emerald-900",
        remove: "bg-rose-100 text-rose-900",
    },
};

/** Line diff by longest common subsequence: [{ type, text }]. */
export function diffLines(before, after) {
    const a = String(before == null ? "" : before)
        .split("\n")
        .slice(0, MAX_LINES);
    const b = String(after == null ? "" : after)
        .split("\n")
        .slice(0, MAX_LINES);
    const n = a.length;
    const m = b.length;
    // lcs[i][j]: common lines in a[i..] and b[j..]
    const lcs = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            lcs[i][j] =
                a[i] === b[j]
                    ? lcs[i + 1][j + 1] + 1
                    : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
        }
    }
    const out = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (a[i] === b[j]) {
            out.push({ type: "same", text: a[i] });
            i++;
            j++;
        } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
            out.push({ type: "remove", text: a[i++] });
        } else {
            out.push({ type: "add", text: b[j++] });
        }
    }
    while (i < n) out.push({ type: "remove", text: a[i++] });
    while (j < m) out.push({ type: "add", text: b[j++] });
    return out;
}

/** Unchanged runs longer than the context around changes fold away. */
export function foldLines(lines, context = CONTEXT) {
    const keep = lines.map((l) => l.type !== "same");
    const near = lines.map((_, i) => {
        for (let d = -context; d <= context; d++) {
            if (keep[i + d]) return true;
        }
        return false;
    });
    const out = [];
    let hidden = 0;
    lines.forEach((l, i) => {
        if (near[i]) {
            if (hidden) out.push({ type: "fold", count: hidden });
            hidden = 0;
            out.push(l);
        } else {
            hidden++;
        }
    });
    if (hidden) out.push({ type: "fold", count: hidden });
    return out;
}

const DiffView = ({
    before = null,
    after = null,
    lines = null,
    fold = true,
    title = null,
    className = "",
}) => {
    const { currentTheme, themeVariant } = useContext(ThemeContext) || {};
    const t = getDashTokens(currentTheme);
    const tones = TONES[themeVariant === "light" ? "light" : "dark"];
    const rows = useMemo(() => {
        const all = lines || diffLines(before, after);
        return fold ? foldLines(all) : all;
    }, [before, after, lines, fold]);
    const changed = rows.filter(
        (r) => r.type === "add" || r.type === "remove"
    ).length;

    return (
        <div
            className={`rounded-lg border overflow-hidden ${t.well} ${t.hairline} ${t.text} ${className}`}
            data-testid="diff-view"
        >
            {title ? (
                <div
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide ${t.muted}`}
                >
                    {title}
                </div>
            ) : null}
            <pre
                className="m-0 py-2 text-xs leading-relaxed overflow-x-auto font-mono"
                aria-label={`${changed} changed line${changed === 1 ? "" : "s"}`}
            >
                {rows.map((r, i) => {
                    if (r.type === "fold") {
                        return (
                            <div
                                key={`f${i}`}
                                className={`px-3 italic ${t.faint}`}
                            >
                                … {r.count} unchanged line
                                {r.count === 1 ? "" : "s"}
                            </div>
                        );
                    }
                    const tone =
                        r.type === "add"
                            ? tones.add
                            : r.type === "remove"
                              ? tones.remove
                              : "";
                    const mark =
                        r.type === "add"
                            ? "+"
                            : r.type === "remove"
                              ? "-"
                              : " ";
                    return (
                        <div
                            key={i}
                            className={`px-3 whitespace-pre ${tone}`}
                            data-diff={r.type}
                        >
                            <span aria-hidden="true">{mark} </span>
                            <span className="sr-only">
                                {r.type === "add"
                                    ? "Added: "
                                    : r.type === "remove"
                                      ? "Removed: "
                                      : ""}
                            </span>
                            {r.text}
                        </div>
                    );
                })}
            </pre>
        </div>
    );
};

export { DiffView };
