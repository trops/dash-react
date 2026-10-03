/**
 * FilterMenu — a searchable multi-select filter for open-ended lists (orgs,
 * teams, folders): one button, a menu with its own search, a checkbox per
 * option with its count, and a clear button.
 *
 * Pins: button text for none / one / several selected, toggling, clear,
 * search, empty state, closing on Escape and outside click, and the
 * design-system hooks (dr-filter-menu / dr-filter-menu-active).
 */
import React, { useState } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterMenu } from "./FilterMenu";
import { ThemeContext } from "@dash/Context/ThemeContext";

const OPTIONS = [
    { value: "@acme", label: "@acme", count: 2 },
    { value: "@globex", label: "@globex", count: 1 },
    { value: "@trops", label: "@trops", count: 5 },
];

function Controlled({ initial = [], onChange = () => {}, ...rest }) {
    const [selected, setSelected] = useState(initial);
    return (
        <FilterMenu
            label="Org"
            options={OPTIONS}
            selected={selected}
            onChange={(next) => {
                setSelected(next);
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

const trigger = () => screen.getByRole("button", { name: /^Org/ });
const menu = () => screen.getByRole("dialog", { name: "Org filter" });

describe("FilterMenu", () => {
    test("shows the label and opens a menu with each option and its count", () => {
        renderWithTheme(<Controlled />);
        expect(trigger()).toHaveTextContent("Org");
        expect(trigger()).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByRole("dialog")).toBeNull();
        fireEvent.click(trigger());
        expect(trigger()).toHaveAttribute("aria-expanded", "true");
        const boxes = within(menu()).getAllByRole("checkbox");
        expect(boxes).toHaveLength(3);
        expect(within(menu()).getByText("@trops")).toBeInTheDocument();
        expect(within(menu()).getByText("5")).toBeInTheDocument();
    });

    test("toggling options reports the new selection", () => {
        const onChange = jest.fn();
        renderWithTheme(<Controlled onChange={onChange} />);
        fireEvent.click(trigger());
        fireEvent.click(within(menu()).getByLabelText(/@acme/));
        expect(onChange).toHaveBeenLastCalledWith(["@acme"]);
        fireEvent.click(within(menu()).getByLabelText(/@trops/));
        expect(onChange).toHaveBeenLastCalledWith(["@acme", "@trops"]);
        fireEvent.click(within(menu()).getByLabelText(/@acme/));
        expect(onChange).toHaveBeenLastCalledWith(["@trops"]);
    });

    test("the button names one selection, or counts several", () => {
        const { unmount } = renderWithTheme(<Controlled initial={["@acme"]} />);
        expect(trigger()).toHaveTextContent("Org: @acme");
        expect(trigger()).toHaveClass(
            "dr-filter-menu",
            "dr-filter-menu-active"
        );
        unmount();
        renderWithTheme(<Controlled initial={["@acme", "@trops"]} />);
        expect(trigger()).toHaveTextContent("Org: 2 selected");
    });

    test("clear empties the selection; it only shows when something is selected", () => {
        const onChange = jest.fn();
        renderWithTheme(<Controlled initial={["@acme"]} onChange={onChange} />);
        fireEvent.click(
            screen.getByRole("button", { name: "Clear Org filter" })
        );
        expect(onChange).toHaveBeenLastCalledWith([]);
        expect(
            screen.queryByRole("button", { name: "Clear Org filter" })
        ).toBeNull();
        expect(trigger()).not.toHaveClass("dr-filter-menu-active");
    });

    test("search narrows the options; nothing matching says so", () => {
        renderWithTheme(<Controlled searchPlaceholder="Find org…" />);
        fireEvent.click(trigger());
        const search = within(menu()).getByPlaceholderText("Find org…");
        fireEvent.change(search, { target: { value: "glo" } });
        expect(within(menu()).getAllByRole("checkbox")).toHaveLength(1);
        expect(within(menu()).getByText("@globex")).toBeInTheDocument();
        fireEvent.change(search, { target: { value: "zzz" } });
        expect(within(menu()).queryAllByRole("checkbox")).toHaveLength(0);
        expect(within(menu()).getByText("No match")).toBeInTheDocument();
    });

    test("closes on Escape and on a click outside", () => {
        renderWithTheme(<Controlled />);
        fireEvent.click(trigger());
        fireEvent.keyDown(menu(), { key: "Escape" });
        expect(screen.queryByRole("dialog")).toBeNull();
        fireEvent.click(trigger());
        fireEvent.mouseDown(screen.getByText("outside"));
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    test("accepts plain string options", () => {
        render(
            <FilterMenu
                label="Team"
                options={["Kitchen Sinkq", "Slack Pack"]}
                selected={[]}
                onChange={() => {}}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: /^Team/ }));
        expect(
            within(
                screen.getByRole("dialog", { name: "Team filter" })
            ).getAllByRole("checkbox")
        ).toHaveLength(2);
    });
});
