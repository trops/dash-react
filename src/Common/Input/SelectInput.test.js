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

describe("an option whose value is empty", () => {
    const options = [
        { value: "", label: "Unassigned" },
        { value: "d1", label: "Daily Brief" },
    ];

    it("shows as selected instead of the placeholder", () => {
        renderWithTheme(
            <SelectInput label="Team" value="" options={options} />
        );
        const select = screen.getByLabelText("Team");
        expect(select.selectedOptions[0]).toHaveTextContent("Unassigned");
        expect(select.selectedOptions[0].disabled).toBe(false);
        expect(screen.queryByText("Select an option")).toBeNull();
    });

    it("can be picked", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SelectInput
                label="Team"
                value="d1"
                onChange={onChange}
                options={options}
            />
        );
        fireEvent.change(screen.getByLabelText("Team"), {
            target: { value: "" },
        });
        expect(onChange.mock.calls[0][0]).toBe("");
    });

    it("keeps the placeholder when no option is empty", () => {
        renderWithTheme(
            <SelectInput label="Team" value="" options={[options[1]]} />
        );
        expect(screen.getByText("Select an option")).toBeInTheDocument();
    });
});

describe("color-scheme follows the theme variant", () => {
    test.each([
        ["light", "light"],
        ["dark", "dark"],
    ])("%s variant sets color-scheme: %s", (variant, scheme) => {
        const { container } = render(
            <ThemeContext.Provider
                value={{ currentTheme: {}, themeVariant: variant }}
            >
                <SelectInput options={[{ value: "a", label: "A" }]} />
            </ThemeContext.Provider>
        );
        expect(container.querySelector("select").style.colorScheme).toBe(
            scheme
        );
    });
});

describe("options with a description", () => {
    const options = [
        {
            value: "latest:opus",
            label: "Latest Opus",
            description: "now Opus 5.5",
            group: "Follows the newest",
        },
        {
            value: "latest:fable",
            label: "Latest Fable",
            description: "now Fable 5.2",
            group: "Follows the newest",
            badge: <span>New</span>,
        },
        {
            value: "claude-opus-4-8",
            label: "Opus 4.8",
            description: "older",
            group: "Stays on one version",
            muted: true,
        },
    ];

    it("shows the chosen one with its second line", () => {
        renderWithTheme(
            <SelectInput
                ariaLabel="Model"
                value="latest:opus"
                options={options}
            />
        );
        const trigger = screen.getByRole("button", { name: "Model" });
        expect(trigger).toHaveTextContent("Latest Opus");
        expect(trigger).toHaveTextContent("now Opus 5.5");
    });

    it("opens a list with a heading per group, second lines and badges", () => {
        const onChange = jest.fn();
        renderWithTheme(
            <SelectInput
                ariaLabel="Model"
                value="latest:opus"
                onChange={onChange}
                options={options}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: "Model" }));
        const groups = screen.getAllByRole("group");
        expect(groups.map((g) => g.getAttribute("aria-label"))).toEqual([
            "Follows the newest",
            "Stays on one version",
        ]);
        expect(screen.getByText("Stays on one version")).toBeInTheDocument();
        const chosen = screen.getByRole("option", { selected: true });
        expect(chosen).toHaveTextContent("Latest Opus");
        expect(screen.getByText("New")).toBeInTheDocument();
        expect(screen.getByText("Opus 4.8").parentElement.className).toMatch(
            /opacity-60/
        );
        fireEvent.click(screen.getByRole("option", { name: /Latest Fable/ }));
        expect(onChange).toHaveBeenCalledWith("latest:fable");
        expect(screen.queryByRole("listbox")).toBeNull();
    });
});

test("Escape closes the open list without reaching what's around it", () => {
    const outer = jest.fn();
    document.addEventListener("keydown", outer);
    renderWithTheme(
        <SelectInput
            ariaLabel="Model"
            value="a"
            options={[{ value: "a", label: "A", description: "first" }]}
        />
    );
    fireEvent.click(screen.getByRole("button", { name: "Model" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(outer).not.toHaveBeenCalled();
    // Closed: Escape goes on as usual.
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(outer).toHaveBeenCalledTimes(1);
    document.removeEventListener("keydown", outer);
});

test("the list floats above the page, and opens upward near the bottom", () => {
    renderWithTheme(
        <div style={{ overflow: "hidden" }} data-testid="clip">
            <SelectInput
                ariaLabel="Model"
                value="a"
                options={[{ value: "a", label: "A", description: "first" }]}
            />
        </div>
    );
    const trigger = screen.getByRole("button", { name: "Model" });
    trigger.getBoundingClientRect = () => ({
        top: window.innerHeight - 60,
        bottom: window.innerHeight - 20,
        left: 40,
        width: 200,
        height: 40,
    });
    fireEvent.click(trigger);
    const list = screen.getByRole("listbox");
    // Not inside the clipping box: on the page itself.
    expect(screen.getByTestId("clip").contains(list)).toBe(false);
    const panel = list.parentElement;
    expect(panel.style.bottom).toBe("" + (60 + 4) + "px");
    expect(panel.style.top).toBe("");
    expect(panel.style.left).toBe("40px");
    // A click on the list doesn't count as outside.
    fireEvent.mouseDown(screen.getByRole("option", { name: /A/ }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
});
