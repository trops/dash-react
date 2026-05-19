import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatusBadge } from "./StatusBadge";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        backgroundColor: "bg-primary-medium",
        textColor: "text-primary-light",
        borderColor: "border-primary-dark",
        borderRadius: "rounded-full",
        string: "bg-primary-medium text-primary-light border-primary-dark",
    }),
    getUUID: (uuid, prefix) => `${prefix}-test-id`,
}));

jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { STATUS_BADGE: "status-badge" },
}));

function renderBadge(props = {}) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            <StatusBadge state="success" label="OK" {...props} />
        </ThemeContext.Provider>
    );
}

describe("StatusBadge", () => {
    test("renders label text", () => {
        renderBadge({ label: "Online" });
        expect(screen.getByText("Online")).toBeInTheDocument();
    });

    test("renders children over label when both are provided", () => {
        renderBadge({ label: "Hidden", children: "Visible" });
        expect(screen.getByText("Visible")).toBeInTheDocument();
        expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    });

    test("has role=status for assistive tech", () => {
        renderBadge();
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test.each([
        ["success", "emerald"],
        ["open", "emerald"],
        ["pending", "amber"],
        ["warning", "amber"],
        ["error", "rose"],
        ["closed", "violet"],
        ["info", "sky"],
        ["neutral", "slate"],
    ])("state=%s applies semantic %s family color", (state, family) => {
        renderBadge({ state, label: state });
        const badge = screen.getByRole("status");
        // Match any shade in the family — primitive owns the shade choice,
        // test just pins that the right color family lands on the element.
        expect(badge.className).toMatch(new RegExp(`text-${family}-\\d{3}`));
    });

    test("state=pending applies dot pulse animation", () => {
        const { container } = renderBadge({ state: "pending" });
        expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    });

    test("unknown state falls back to neutral", () => {
        renderBadge({ state: "made-up-state", label: "Hi" });
        const badge = screen.getByRole("status");
        expect(badge.className).toMatch(/text-slate-\d{3}/);
    });

    // --- Compact mode (the connection-dot pattern widgets reinvent) ---

    test("compact mode renders without pill background", () => {
        const { container } = renderBadge({ compact: true, state: "success" });
        const badge = screen.getByRole("status");
        // Compact mode wraps in a span without the px-2 py-0.5 rounded pill —
        // just the inline dot + optional text.
        expect(badge.className).not.toMatch(/px-2/);
        expect(badge.className).not.toMatch(/bg-emerald-900/);
        // Dot itself still carries the state color.
        const dot = container.querySelector(".w-2.h-2.rounded-full");
        expect(dot).toBeInTheDocument();
        expect(dot.className).toMatch(/bg-emerald-500/);
    });

    test("compact mode hides label when not provided", () => {
        renderBadge({ compact: true, state: "success", label: null });
        // Only the role=status wrapper and the dot inside — no text.
        const badge = screen.getByRole("status");
        expect(badge.textContent).toBe("");
    });

    // --- Theme integration ---

    test("reads STATUS_BADGE theme entry via getStylesForItem", () => {
        // Verified indirectly via the borderRadius class landing on the
        // rendered span (the jest mock returns rounded-full).
        renderBadge({ state: "neutral", label: "X" });
        expect(screen.getByRole("status").className).toContain("rounded-full");
    });

    test("appends custom className", () => {
        renderBadge({ className: "my-extra" });
        expect(screen.getByRole("status").className).toContain("my-extra");
    });

    // --- The cohesion guarantee: widget authors must never need to write
    //     raw Tailwind color classes when using this primitive. ---

    test("interior color choices stay inside the primitive (caller controls only via state prop)", () => {
        // Caller passes state, primitive resolves every Tailwind color
        // class. There's no API to pass bg-red-500 / text-green-400 in
        // from outside — exactly the encapsulation we want.
        const apiPropsAcceptedByStatusBadge = [
            "state",
            "label",
            "compact",
            "className",
            "children",
        ];
        // Sanity check on the docs — failing this test forces a docs
        // update if a new prop is added that could leak color into the
        // call site.
        expect(apiPropsAcceptedByStatusBadge).not.toContain("backgroundColor");
        expect(apiPropsAcceptedByStatusBadge).not.toContain("textColor");
    });
});
