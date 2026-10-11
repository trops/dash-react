/**
 * ChoiceMenu — a single-choice menu behind one button ("Type: Widget ▾").
 *
 * Pins: button text and menu aria (haspopup / expanded / menuitemradio /
 * checked), picking, disabled options with their hint, arrow-key focus that
 * skips disabled options, closing on Escape (focus back on the button) and on
 * an outside click, the footer, and the design-system hooks.
 */
import React, { useState } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChoiceMenu } from "./ChoiceMenu";
import { ThemeContext } from "@dash/Context/ThemeContext";

const OPTIONS = [
    { value: "widget", label: "Widget", description: "One dashboard widget" },
    { value: "bot", label: "Bot" },
    {
        value: "dashboard",
        label: "Dashboard",
        disabled: true,
        hint: "Coming later",
    },
    { value: "theme", label: "Theme" },
];

function Controlled({ initial = "widget", onChange = () => {}, ...rest }) {
    const [value, setValue] = useState(initial);
    return (
        <ChoiceMenu
            label="Type"
            options={OPTIONS}
            value={value}
            onChange={(next) => {
                setValue(next);
                onChange(next);
            }}
            {...rest}
        />
    );
}

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            <div>
                {node}
                <button>outside</button>
            </div>
        </ThemeContext.Provider>
    );
}

const trigger = () => screen.getByRole("button", { name: /^Type/ });
const menu = () => screen.getByRole("menu", { name: "Type" });

describe("ChoiceMenu", () => {
    test("the button names the choice and is a menu button", () => {
        renderWithTheme(<Controlled />);
        expect(trigger()).toHaveTextContent("Type: Widget");
        expect(trigger()).toHaveAttribute("aria-haspopup", "menu");
        expect(trigger()).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByRole("menu")).toBeNull();
    });

    test("showLabel={false} shows just the chosen option", () => {
        renderWithTheme(<Controlled showLabel={false} />);
        expect(
            screen.getByRole("button", { name: /Widget/ })
        ).toHaveTextContent(/^Widget/);
    });

    test("opens a menu of radio items with the chosen one checked and focused", () => {
        renderWithTheme(<Controlled />);
        fireEvent.click(trigger());
        expect(trigger()).toHaveAttribute("aria-expanded", "true");
        const items = within(menu()).getAllByRole("menuitemradio");
        expect(items).toHaveLength(4);
        expect(items[0]).toHaveAttribute("aria-checked", "true");
        expect(items[1]).toHaveAttribute("aria-checked", "false");
        expect(items[0]).toHaveFocus();
        expect(items[0]).toHaveTextContent("One dashboard widget");
    });

    test("picking an option calls onChange, closes, and returns focus", () => {
        const onChange = jest.fn();
        renderWithTheme(<Controlled onChange={onChange} />);
        fireEvent.click(trigger());
        fireEvent.click(screen.getByRole("menuitemradio", { name: /Bot/ }));
        expect(onChange).toHaveBeenCalledWith("bot");
        expect(screen.queryByRole("menu")).toBeNull();
        expect(trigger()).toHaveTextContent("Type: Bot");
        expect(trigger()).toHaveFocus();
    });

    test("a disabled option shows its hint and can't be picked", () => {
        const onChange = jest.fn();
        renderWithTheme(<Controlled onChange={onChange} />);
        fireEvent.click(trigger());
        const dash = screen.getByRole("menuitemradio", { name: /Dashboard/ });
        expect(dash).toHaveAttribute("aria-disabled", "true");
        expect(dash).toHaveTextContent("Coming later");
        fireEvent.click(dash);
        expect(onChange).not.toHaveBeenCalled();
        expect(menu()).toBeInTheDocument();
    });

    test("arrow keys move between options and skip disabled ones", () => {
        renderWithTheme(<Controlled initial="bot" />);
        fireEvent.click(trigger());
        const items = within(menu()).getAllByRole("menuitemradio");
        expect(items[1]).toHaveFocus();
        fireEvent.keyDown(menu(), { key: "ArrowDown" });
        expect(items[3]).toHaveFocus();
        fireEvent.keyDown(menu(), { key: "ArrowDown" });
        expect(items[0]).toHaveFocus();
        fireEvent.keyDown(menu(), { key: "ArrowUp" });
        expect(items[3]).toHaveFocus();
    });

    test("ArrowDown on the button opens the menu", () => {
        renderWithTheme(<Controlled />);
        fireEvent.keyDown(trigger(), { key: "ArrowDown" });
        expect(menu()).toBeInTheDocument();
    });

    test("Escape closes and returns focus to the button", () => {
        renderWithTheme(<Controlled />);
        fireEvent.click(trigger());
        fireEvent.keyDown(menu(), { key: "Escape" });
        expect(screen.queryByRole("menu")).toBeNull();
        expect(trigger()).toHaveFocus();
    });

    test("a click outside closes", () => {
        renderWithTheme(<Controlled />);
        fireEvent.click(trigger());
        fireEvent.mouseDown(screen.getByText("outside"));
        expect(screen.queryByRole("menu")).toBeNull();
    });

    test("renders a footer under the options", () => {
        renderWithTheme(
            <Controlled footer={<a href="#setup">Set up AI…</a>} />
        );
        fireEvent.click(trigger());
        expect(
            within(menu()).getByRole("link", { name: "Set up AI…" })
        ).toBeInTheDocument();
    });

    test("carries the design-system hooks", () => {
        renderWithTheme(<Controlled />);
        expect(trigger()).toHaveClass("dr-choice-menu");
        fireEvent.click(trigger());
        expect(menu()).toHaveClass("dr-choice-menu-panel");
        expect(within(menu()).getAllByRole("menuitemradio")[0]).toHaveClass(
            "dr-choice-menu-item"
        );
    });
});
