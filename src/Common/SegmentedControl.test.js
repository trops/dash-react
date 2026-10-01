/**
 * SegmentedControl — single-choice value picker (e.g. Today | Week | Create).
 *
 * Pins: accessible radiogroup semantics, active state, onChange contract,
 * string + object option shapes, disabled options, and the design-system
 * hooks (dr-segmented / dr-segment / dr-segment-active).
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SegmentedControl } from "./SegmentedControl";
import { ThemeContext } from "@dash/Context/ThemeContext";

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("SegmentedControl", () => {
    test("renders a radiogroup with one radio per option", () => {
        renderWithTheme(
            <SegmentedControl
                ariaLabel="View"
                options={["Today", "Week", "Create"]}
                value="Today"
                onChange={() => {}}
            />
        );
        expect(
            screen.getByRole("radiogroup", { name: "View" })
        ).toBeInTheDocument();
        expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    test("marks only the selected option as checked + active", () => {
        renderWithTheme(
            <SegmentedControl
                options={["Today", "Week"]}
                value="Week"
                onChange={() => {}}
            />
        );
        const week = screen.getByRole("radio", { name: "Week" });
        const today = screen.getByRole("radio", { name: "Today" });
        expect(week).toHaveAttribute("aria-checked", "true");
        expect(today).toHaveAttribute("aria-checked", "false");
        expect(week).toHaveClass("dr-segment", "dr-segment-active");
        expect(today).toHaveClass("dr-segment");
        expect(today).not.toHaveClass("dr-segment-active");
    });

    test("calls onChange with the option value (object options)", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SegmentedControl
                options={[
                    { value: "day", label: "Today" },
                    { value: "week", label: "Week" },
                ]}
                value="day"
                onChange={onChange}
            />
        );
        fireEvent.click(screen.getByRole("radio", { name: "Week" }));
        expect(onChange).toHaveBeenCalledWith("week");
    });

    test("does not call onChange when clicking the already-selected option", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SegmentedControl
                options={["A", "B"]}
                value="A"
                onChange={onChange}
            />
        );
        fireEvent.click(screen.getByRole("radio", { name: "A" }));
        expect(onChange).not.toHaveBeenCalled();
    });

    test("disabled options are not selectable", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SegmentedControl
                options={[
                    { value: "a", label: "A" },
                    { value: "b", label: "B", disabled: true },
                ]}
                value="a"
                onChange={onChange}
            />
        );
        const b = screen.getByRole("radio", { name: "B" });
        expect(b).toBeDisabled();
        fireEvent.click(b);
        expect(onChange).not.toHaveBeenCalled();
    });

    test("container carries the design-system hook", () => {
        renderWithTheme(
            <SegmentedControl options={["A"]} value="A" onChange={() => {}} />
        );
        expect(screen.getByRole("radiogroup")).toHaveClass("dr-segmented");
    });

    test("buttons are type=button so they never submit a parent form", () => {
        renderWithTheme(
            <SegmentedControl
                options={["A", "B"]}
                value="A"
                onChange={() => {}}
            />
        );
        screen
            .getAllByRole("radio")
            .forEach((r) => expect(r).toHaveAttribute("type", "button"));
    });
});
