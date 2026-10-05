/**
 * SelectInput — option groups.
 *
 * Options may carry a `group`; consecutive options with the same group render
 * inside an <optgroup label>. Options without a group render as before.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectInput } from "./SelectInput";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({ string: "", textColor: "", focusRingColor: "" }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
}));
jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: {
        SELECT_MENU: "select-menu",
        FORM_LABEL: "form-label",
        MENU_ITEM: "menu-item",
    },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe("SelectInput option groups", () => {
    it("renders grouped options inside labelled optgroups", () => {
        const { container } = renderWithTheme(
            <SelectInput
                label="Runs when"
                options={[
                    {
                        value: "w1",
                        label: "Upcoming Events › eventSelected",
                        group: "Widgets on Daily Brief",
                    },
                    {
                        value: "b1",
                        label: "Agenda › Completed",
                        group: "Bots on this team",
                    },
                    {
                        value: "b2",
                        label: "Agenda › Failed",
                        group: "Bots on this team",
                    },
                ]}
            />
        );
        const groups = container.querySelectorAll("optgroup");
        expect(Array.from(groups).map((g) => g.label)).toEqual([
            "Widgets on Daily Brief",
            "Bots on this team",
        ]);
        expect(groups[1].querySelectorAll("option")).toHaveLength(2);
        expect(groups[0]).toHaveTextContent("Upcoming Events › eventSelected");
    });

    it("leaves options without a group as plain options", () => {
        const { container } = renderWithTheme(
            <SelectInput
                options={[
                    { value: "a", label: "A" },
                    { value: "b", label: "B", group: "G" },
                ]}
            />
        );
        expect(container.querySelectorAll("optgroup")).toHaveLength(1);
        const select = container.querySelector("select");
        // placeholder, A (top level), then the G group
        expect(select.children[1].tagName).toBe("OPTION");
        expect(select.children[1]).toHaveTextContent("A");
        expect(select.children[2].tagName).toBe("OPTGROUP");
    });

    it("selects a grouped option like any other", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SelectInput
                label="Runs when"
                onChange={onChange}
                options={[
                    { value: "b1", label: "Agenda › Completed", group: "Bots" },
                ]}
            />
        );
        fireEvent.change(screen.getByLabelText("Runs when"), {
            target: { value: "b1" },
        });
        expect(onChange.mock.calls[0][0]).toBe("b1");
    });

    it("renders ungrouped selects exactly as before", () => {
        const { container } = renderWithTheme(
            <SelectInput options={[{ value: "x", label: "X" }]} />
        );
        expect(container.querySelectorAll("optgroup")).toHaveLength(0);
        expect(container.querySelectorAll("option")).toHaveLength(2);
    });
});
