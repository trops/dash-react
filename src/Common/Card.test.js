/**
 * Card: with `onClick` it's a button — focusable, Enter/Space activate it,
 * named by `ariaLabel`, inert when `disabled` (WCAG 2.1.1 / 4.1.2; screen
 * audit, October 2026). Without `onClick` it's plain content.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { Card, Card2, Card3 } from "./Card";

const wrap = (node) =>
    render(
        <ThemeContext.Provider
            value={{ currentTheme: {}, themeVariant: "dark" }}
        >
            {node}
        </ThemeContext.Provider>
    );

describe.each([
    ["Card", Card],
    ["Card2", Card2],
    ["Card3", Card3],
])("%s", (_name, C) => {
    test("with onClick: a named button that Enter and Space activate", () => {
        const onClick = jest.fn();
        wrap(
            <C onClick={onClick} ariaLabel="Inbox Triage starter">
                Inbox Triage
            </C>
        );
        const card = screen.getByRole("button", {
            name: "Inbox Triage starter",
        });
        expect(card).toHaveAttribute("tabindex", "0");
        fireEvent.click(card);
        fireEvent.keyDown(card, { key: "Enter" });
        fireEvent.keyDown(card, { key: " " });
        expect(onClick).toHaveBeenCalledTimes(3);
    });

    test("disabled: not focusable, does nothing, says so", () => {
        const onClick = jest.fn();
        wrap(
            <C onClick={onClick} disabled ariaLabel="Loading starter">
                Loading
            </C>
        );
        const card = screen.getByRole("button", { name: "Loading starter" });
        expect(card).toHaveAttribute("aria-disabled", "true");
        expect(card).toHaveAttribute("tabindex", "-1");
        fireEvent.click(card);
        fireEvent.keyDown(card, { key: "Enter" });
        expect(onClick).not.toHaveBeenCalled();
    });

    test("without onClick: plain content, not a button", () => {
        wrap(<C testId="plain">Just text</C>);
        expect(screen.queryByRole("button")).toBeNull();
        expect(screen.getByTestId("plain")).toHaveTextContent("Just text");
    });

    test("a key on a control inside the card doesn't trigger the card", () => {
        const onClick = jest.fn();
        wrap(
            <C onClick={onClick} ariaLabel="Card">
                <input aria-label="Inside" />
            </C>
        );
        fireEvent.keyDown(screen.getByLabelText("Inside"), { key: "Enter" });
        expect(onClick).not.toHaveBeenCalled();
    });
});
