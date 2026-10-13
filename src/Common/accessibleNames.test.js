/**
 * Accessible names and label wiring (design-guide audit, WCAG 4.1.2 / 1.3.1).
 *
 * - Icon-only ButtonIcons get a name: the caller's `ariaLabel`, else the
 *   icon's name ("xmark" → "Close").
 * - Inputs without a visible label get a name: `ariaLabel`, else the
 *   placeholder. A visible label stays the name.
 * - FormField ties its label, description and error to its field.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { ButtonIcon, ButtonIcon3, iconLabel } from "./ButtonIcon";
import { InputText } from "./Input/InputText";
import { TextArea } from "./Input/TextArea";
import { SelectInput } from "./Input/SelectInput";
import { FormField } from "./Composites/FormField";

jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: () => null,
}));

const renderWithTheme = (node) =>
    render(
        <ThemeContext.Provider
            value={{ currentTheme: {}, themeVariant: "dark" }}
        >
            {node}
        </ThemeContext.Provider>
    );

describe("ButtonIcon names", () => {
    test("icon-only falls back to the icon's name", () => {
        renderWithTheme(<ButtonIcon icon="xmark" />);
        expect(
            screen.getByRole("button", { name: "Close" })
        ).toBeInTheDocument();
    });

    test("the caller's ariaLabel wins", () => {
        renderWithTheme(
            <ButtonIcon3 icon="xmark" ariaLabel="Remove Morning Brief" />
        );
        expect(
            screen.getByRole("button", { name: "Remove Morning Brief" })
        ).toBeInTheDocument();
    });

    test("visible text is the name; no aria-label added", () => {
        renderWithTheme(<ButtonIcon icon="plus" text="New dashboard" />);
        const b = screen.getByRole("button", { name: "New dashboard" });
        expect(b).not.toHaveAttribute("aria-label");
    });

    test("iconLabel maps common icons and spaces the rest", () => {
        expect(iconLabel("trash")).toBe("Delete");
        expect(iconLabel("arrow-left")).toBe("Back");
        expect(iconLabel("table-cells-large")).toBe("Table cells large");
        expect(iconLabel(["fas", "gear"])).toBe("Settings");
        expect(iconLabel("")).toBeUndefined();
    });
});

describe("Input names", () => {
    test("no label: the placeholder names the input", () => {
        renderWithTheme(
            <InputText
                placeholder="Dashboard name"
                value=""
                onChange={() => {}}
            />
        );
        expect(
            screen.getByRole("textbox", { name: "Dashboard name" })
        ).toBeInTheDocument();
    });

    test("ariaLabel beats the placeholder", () => {
        renderWithTheme(
            <TextArea
                ariaLabel="Describe the bot"
                placeholder="e.g. …"
                value=""
                onChange={() => {}}
            />
        );
        expect(
            screen.getByRole("textbox", { name: "Describe the bot" })
        ).toBeInTheDocument();
    });

    test("a visible label stays the name", () => {
        renderWithTheme(
            <InputText
                label="Name"
                placeholder="Enter your name"
                value=""
                onChange={() => {}}
            />
        );
        const input = screen.getByRole("textbox", { name: "Name" });
        expect(input).not.toHaveAttribute("aria-label");
    });

    test("an unlabeled select is named", () => {
        renderWithTheme(
            <SelectInput
                placeholder="Pick a provider"
                options={[{ value: "gmail", label: "Gmail" }]}
                value=""
                onChange={() => {}}
            />
        );
        expect(
            screen.getByRole("combobox", { name: "Pick a provider" })
        ).toBeInTheDocument();
    });
});

describe("FormField wiring", () => {
    test("label, description and error are tied to the field", () => {
        renderWithTheme(
            <FormField
                label="Schedule"
                description="When it runs."
                error="Pick at least one day."
                required
            >
                <input type="text" />
            </FormField>
        );
        const field = screen.getByRole("textbox", { name: /Schedule/ });
        expect(field).toHaveAttribute("aria-invalid", "true");
        expect(field).toHaveAttribute("aria-required", "true");
        expect(field).toHaveAccessibleDescription(
            "When it runs. Pick at least one day."
        );
    });

    test("keeps a child's own id", () => {
        renderWithTheme(
            <FormField label="Name">
                <input id="my-name" type="text" />
            </FormField>
        );
        expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute(
            "id",
            "my-name"
        );
    });
});
