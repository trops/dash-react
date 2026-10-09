import { useCallback, useState } from "react";

const STEP = 16;

function readStored(storageKey) {
    if (!storageKey) return null;
    try {
        const raw = window.localStorage.getItem(storageKey);
        const n = raw == null ? NaN : Number(raw);
        return Number.isFinite(n) ? n : null;
    } catch (_e) {
        return null;
    }
}

function writeStored(storageKey, value) {
    if (!storageKey) return;
    try {
        if (value == null) window.localStorage.removeItem(storageKey);
        else window.localStorage.setItem(storageKey, String(Math.round(value)));
    } catch (_e) {
        // Storage can be unavailable (private window); the width still works.
    }
}

/**
 * useResizableWidth — the width of a panel sized by a ResizeHandle.
 *
 * The width starts at the remembered value (under `storageKey`), else
 * `defaultWidth`, and is always clamped to [min, max] — so a remembered
 * width that no longer fits (a smaller window) shrinks to fit. Spread
 * `handleProps` onto <ResizeHandle />.
 *
 * Usage:
 *   const { width, handleProps } = useResizableWidth({
 *       defaultWidth: 384, min: 320, max: 700,
 *       edge: "left",                 // the handle sits on the panel's left edge
 *       storageKey: "dash:assistant:width",
 *   });
 *   <ResizeHandle {...handleProps} ariaLabel="Resize assistant" />
 *   <aside style={{ width }}>…</aside>
 *
 * @param {object} opts
 * @param {number} opts.defaultWidth  width before the user resizes (and after a reset)
 * @param {number} opts.min
 * @param {number} opts.max
 * @param {"left"|"right"} [opts.edge="left"]  which edge of the panel the handle is on
 * @param {string} [opts.storageKey]  remember the width (localStorage) under this key
 */
export function useResizableWidth({
    defaultWidth,
    min = 0,
    max = Infinity,
    edge = "left",
    storageKey = null,
}) {
    const [stored, setStored] = useState(() => readStored(storageKey));
    const hi = Math.max(min, max);
    const clamp = useCallback((w) => Math.min(Math.max(w, min), hi), [min, hi]);
    const width = clamp(stored == null ? defaultWidth : stored);
    // Dragging toward the panel's outside edge widens it.
    const sign = edge === "left" ? -1 : 1;

    const set = useCallback(
        (w) => {
            const next = clamp(w);
            setStored(next);
            writeStored(storageKey, next);
        },
        [clamp, storageKey]
    );

    const reset = useCallback(() => {
        setStored(null);
        writeStored(storageKey, null);
    }, [storageKey]);

    return {
        width,
        setWidth: set,
        reset,
        handleProps: {
            value: width,
            min,
            max: hi,
            // `start` is the width when the drag began; `dx` the pointer's travel.
            onResize: (start, dx) => set(start + sign * dx),
            onStep: (dir) => set(width + sign * dir * STEP),
            onReset: reset,
        },
    };
}
