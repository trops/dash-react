/**
 * ConfirmationModal (screen audit, October 2026): dash-react's own buttons —
 * cancel secondary, one primary confirm (red when it destroys something) — on
 * the raised modal surface.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { ConfirmationModal } from "./ConfirmationModal";

// The Modal is Headless UI's Dialog, which needs IntersectionObserver.
beforeAll(() => {
    global.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

const wrap = (node) =>
    render(
        <ThemeContext.Provider
            value={{ currentTheme: {}, themeVariant: "dark" }}
        >
            {node}
        </ThemeContext.Provider>
    );

describe("ConfirmationModal", () => {
    test("says what will happen; Keep it cancels, the action confirms", () => {
        const onConfirm = jest.fn();
        const onCancel = jest.fn();
        wrap(
            <ConfirmationModal
                isOpen
                setIsOpen={() => {}}
                variant="danger"
                title="Discard “PR Review”?"
                message="Nothing has been built."
                confirmLabel="Discard plan"
                cancelLabel="Keep it"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );
        expect(screen.getByText("Discard “PR Review”?")).toBeInTheDocument();
        expect(screen.getByText("Nothing has been built.")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Keep it" }));
        expect(onCancel).toHaveBeenCalled();
        fireEvent.click(screen.getByRole("button", { name: "Discard plan" }));
        expect(onConfirm).toHaveBeenCalled();
    });

    test("one primary: cancel is secondary; danger confirm is the red primary", () => {
        wrap(
            <ConfirmationModal
                isOpen
                setIsOpen={() => {}}
                variant="danger"
                confirmLabel="Remove"
                cancelLabel="Cancel"
            />
        );
        const confirm = screen.getByRole("button", { name: "Remove" });
        const cancel = screen.getByRole("button", { name: "Cancel" });
        expect(confirm.className).toMatch(/dr-btn-primary/);
        expect(confirm.className).toMatch(/dr-btn-danger/);
        expect(cancel.className).not.toMatch(/dr-btn-primary/);
    });

    test("sits on the raised modal surface", () => {
        wrap(<ConfirmationModal isOpen setIsOpen={() => {}} title="Sure?" />);
        expect(
            screen.getByText("Sure?").closest(".dr-modal-surface")
        ).not.toBeNull();
    });
});
