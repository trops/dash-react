import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

/**
 * ResizeHandle — a vertical drag handle between two columns.
 *
 * Drag it, use ← / → when it's focused, or double-click to reset. It only
 * reports; the width lives with the caller — usually `useResizableWidth`,
 * whose `handleProps` spread straight onto it.
 *
 * Usage:
 *   const { width, handleProps } = useResizableWidth({ defaultWidth: 384, min: 320, max: 700 });
 *   <ResizeHandle {...handleProps} ariaLabel="Resize assistant" />
 *
 * Props:
 *   value              current width (px) — for aria-valuenow, and the drag start
 *   min, max           for aria-valuemin / aria-valuemax
 *   onResize(start, dx) during a drag: width at drag start, pointer travel (px)
 *   onStep(dir)        arrow key: -1 for ←, +1 for →
 *   onReset()          double-click
 *   ariaLabel          what it resizes, e.g. "Resize bot panel"
 *   className          extra classes (margins)
 */
export function ResizeHandle({
    value,
    min,
    max,
    onResize = () => {},
    onStep = () => {},
    onReset = () => {},
    ariaLabel = "Resize",
    className = "",
}) {
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    const [active, setActive] = useState(false);
    const drag = useRef(null);

    const lineIdle = currentTheme["bg-primary-medium"] || "bg-gray-700";
    const lineActive = currentTheme["bg-primary-light"] || "bg-gray-500";

    const onPointerDown = (e) => {
        if (e.button != null && e.button !== 0) return;
        e.preventDefault();
        drag.current = { x: e.clientX, start: value };
        setActive(true);
        const prevCursor = document.body.style.cursor;
        const prevSelect = document.body.style.userSelect;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        const move = (ev) => {
            if (!drag.current) return;
            onResize(drag.current.start, ev.clientX - drag.current.x);
        };
        const up = () => {
            drag.current = null;
            setActive(false);
            document.body.style.cursor = prevCursor;
            document.body.style.userSelect = prevSelect;
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", up);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            onStep(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            onStep(1);
        }
    };

    return (
        <div
            role="separator"
            aria-orientation="vertical"
            aria-label={ariaLabel}
            aria-valuenow={value != null ? Math.round(value) : undefined}
            aria-valuemin={min}
            aria-valuemax={Number.isFinite(max) ? max : undefined}
            tabIndex={0}
            title="Drag to resize · double-click to reset"
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            onDoubleClick={onReset}
            onFocus={() => setActive(true)}
            onBlur={() => !drag.current && setActive(false)}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => !drag.current && setActive(false)}
            className={`dr-resize-handle group flex flex-row justify-center flex-shrink-0 self-stretch cursor-col-resize outline-none ${className}`}
            style={{ width: 8, touchAction: "none" }}
        >
            <div
                className={`h-full rounded-full transition-colors ${
                    active ? lineActive : lineIdle
                }`}
                style={{ width: active ? 3 : 1 }}
            />
        </div>
    );
}
