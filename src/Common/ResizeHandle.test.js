/**
 * ResizeHandle + useResizableWidth — a vertical drag handle between two
 * columns, and the width state behind it.
 *
 * Pins: dragging resizes (in the handle's direction), the width is clamped
 * to min/max, it's remembered under storageKey and restored, double-click
 * resets to the default (and forgets the saved width), arrow keys step it,
 * and the handle is an accessible separator.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResizeHandle } from "./ResizeHandle";
import { useResizableWidth } from "@dash/Hooks/useResizableWidth";

function Panel(props) {
    const { width, handleProps } = useResizableWidth(props);
    return (
        <div>
            <ResizeHandle {...handleProps} ariaLabel="Resize panel" />
            <div data-testid="panel" style={{ width }} />
        </div>
    );
}

const handle = () => screen.getByRole("separator", { name: "Resize panel" });
const width = () => screen.getByTestId("panel").style.width;

function drag(dx) {
    fireEvent.pointerDown(handle(), { clientX: 500, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 500 + dx, pointerId: 1 });
    fireEvent.pointerUp(window, { clientX: 500 + dx, pointerId: 1 });
}

// jsdom has no PointerEvent; without one, fireEvent.pointer* drops clientX.
if (typeof window.PointerEvent === "undefined") {
    window.PointerEvent = class PointerEvent extends MouseEvent {
        constructor(type, init = {}) {
            super(type, init);
            this.pointerId = init.pointerId || 0;
        }
    };
}

beforeEach(() => {
    window.localStorage.clear();
});

describe("useResizableWidth + ResizeHandle", () => {
    test("starts at the default width", () => {
        render(<Panel defaultWidth={400} min={300} max={700} />);
        expect(width()).toBe("400px");
    });

    test("dragging left widens a panel whose handle is on its left edge", () => {
        render(<Panel defaultWidth={400} min={300} max={700} edge="left" />);
        drag(-100);
        expect(width()).toBe("500px");
    });

    test("dragging right widens a panel whose handle is on its right edge", () => {
        render(<Panel defaultWidth={400} min={300} max={700} edge="right" />);
        drag(50);
        expect(width()).toBe("450px");
    });

    test("is clamped to min and max", () => {
        render(<Panel defaultWidth={400} min={300} max={700} edge="left" />);
        drag(-1000);
        expect(width()).toBe("700px");
        drag(2000);
        expect(width()).toBe("300px");
    });

    test("is remembered under storageKey and restored", () => {
        const { unmount } = render(
            <Panel defaultWidth={400} min={300} max={700} storageKey="k" />
        );
        drag(-80);
        unmount();
        render(<Panel defaultWidth={400} min={300} max={700} storageKey="k" />);
        expect(width()).toBe("480px");
    });

    test("double-click resets to the default and forgets the saved width", () => {
        render(<Panel defaultWidth={400} min={300} max={700} storageKey="k" />);
        drag(-80);
        fireEvent.doubleClick(handle());
        expect(width()).toBe("400px");
        expect(window.localStorage.getItem("k")).toBeNull();
    });

    test("arrow keys step the width", () => {
        render(<Panel defaultWidth={400} min={300} max={700} edge="left" />);
        fireEvent.keyDown(handle(), { key: "ArrowLeft" });
        expect(width()).toBe("416px");
        fireEvent.keyDown(handle(), { key: "ArrowRight" });
        fireEvent.keyDown(handle(), { key: "ArrowRight" });
        expect(width()).toBe("384px");
    });

    test("a saved width outside a new max is clamped", () => {
        window.localStorage.setItem("k", "900");
        render(<Panel defaultWidth={400} min={300} max={700} storageKey="k" />);
        expect(width()).toBe("700px");
    });

    test("is an accessible vertical separator with its value", () => {
        render(<Panel defaultWidth={400} min={300} max={700} />);
        expect(handle()).toHaveAttribute("aria-orientation", "vertical");
        expect(handle()).toHaveAttribute("aria-valuenow", "400");
        expect(handle()).toHaveAttribute("aria-valuemin", "300");
        expect(handle()).toHaveAttribute("aria-valuemax", "700");
        expect(handle()).toHaveAttribute("tabindex", "0");
    });
});
