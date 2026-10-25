/**
 * Design-guide review fixes (dash-react 1.0.83): muted text is a color role,
 * never opacity; status text comes from the status palette; landmarks and
 * tab lists are named; checkbox and radio targets are 20px; one InputText.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStatusColors } from "@dash/Utils/statusColors";
import { Stepper } from "./Composites/Stepper";
import { StatCard } from "./Composites/StatCard";
import { FormField } from "./Composites/FormField";
import { Table } from "./Table";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navbar } from "./Composites/Navbar";
import { TabbedNavbar } from "./Composites/TabbedNavbar";
import { Checkbox } from "./Input/Checkbox";
import { RadioGroup } from "./Input/RadioGroup";
import { InputText as FormInputText } from "./Form/InputText";
import { InputText } from "./Input/InputText";

jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: () => null,
}));

const renderWithTheme = (node, themeVariant = "light") =>
    render(
        <ThemeContext.Provider
            value={{
                currentTheme: { "text-neutral-medium": "text-gray-600" },
                themeVariant,
            }}
        >
            {node}
        </ThemeContext.Provider>
    );

const faded = (el) => /(^|\s)opacity-\d+/.test(el.className);

describe("muted text uses the role, not opacity", () => {
    test("Stepper: upcoming step, description and step count", () => {
        renderWithTheme(
            <Stepper activeStep={0}>
                <Stepper.Step label="Pick" description="Choose a type" />
                <Stepper.Step label="Confirm" description="Review it" />
            </Stepper>
        );
        const roles = {
            Confirm: "dr-role-muted",
            "Review it": "dr-role-faint",
            "Step 1 of 2": "dr-role-faint",
        };
        for (const [text, role] of Object.entries(roles)) {
            const el = screen.getByText(text);
            expect(el).toHaveClass(role);
            expect(faded(el)).toBe(false);
        }
    });

    test("StatCard help text", () => {
        renderWithTheme(
            <StatCard label="CPU" value="42%" helpText="Last hour" />
        );
        const el = screen.getByText("Last hour");
        expect(el).toHaveClass("dr-role-muted");
        expect(faded(el)).toBe(false);
    });

    test("Table empty state", () => {
        renderWithTheme(
            <Table columns={[{ key: "a", label: "A" }]} data={[]} />
        );
        const el = screen.getByText("No data available");
        expect(el).toHaveClass("dr-role-muted");
        expect(faded(el)).toBe(false);
    });

    test("Breadcrumb separators", () => {
        renderWithTheme(
            <Breadcrumbs
                items={[{ label: "Home", href: "#" }, { label: "Here" }]}
            />
        );
        expect(screen.getByText("/")).toHaveClass("dr-role-faint");
    });
});

describe("status text comes from the status palette", () => {
    test("StatCard trends in light mode", () => {
        const status = getStatusColors("light");
        renderWithTheme(
            <>
                <StatCard label="Up" value="1" change="+12" trend="up" />
                <StatCard label="Down" value="2" change="-5%" trend="down" />
            </>
        );
        expect(screen.getByText(/\+12/)).toHaveClass(status.success.text);
        expect(screen.getByText(/-5%/)).toHaveClass(status.error.text);
    });

    test("FormField error and required mark", () => {
        const status = getStatusColors("light");
        renderWithTheme(
            <FormField label="Name" required error="Required">
                <input />
            </FormField>
        );
        expect(screen.getByText("Required")).toHaveClass(status.error.icon);
        expect(screen.getByText("*")).toHaveClass(status.error.icon);
    });
});

describe("names", () => {
    test("Navbar landmark takes ariaLabel", () => {
        renderWithTheme(<Navbar ariaLabel="Main">x</Navbar>);
        expect(
            screen.getByRole("navigation", { name: "Main" })
        ).toBeInTheDocument();
    });

    test("TabbedNavbar tab list is named", () => {
        renderWithTheme(
            <TabbedNavbar defaultValue="a">
                <TabbedNavbar.Tab value="a">A</TabbedNavbar.Tab>
            </TabbedNavbar>
        );
        expect(
            screen.getByRole("tablist", { name: "Sections" })
        ).toBeInTheDocument();
    });
});

describe("hit areas", () => {
    test("Checkbox box sits in a 20px target", () => {
        renderWithTheme(<Checkbox label="Notify" />);
        const box = screen.getByRole("checkbox");
        expect(box.parentElement).toHaveClass("h-5", "w-5");
    });

    test("Radio sits in a 20px target", () => {
        renderWithTheme(
            <RadioGroup
                options={[{ value: "a", label: "A" }]}
                value="a"
                onChange={() => {}}
            />
        );
        expect(screen.getByRole("radio").parentElement).toHaveClass(
            "h-5",
            "w-5"
        );
    });
});

describe("review round", () => {
    test("StatCard label is muted, not faded", () => {
        renderWithTheme(<StatCard label="CPU" value="42%" />);
        const el = screen.getByText("CPU");
        expect(el.className).toMatch(/dr-role-muted/);
        expect(faded(el)).toBe(false);
    });

    test("inactive TabbedNavbar tab is muted and brightens on hover", () => {
        renderWithTheme(
            <TabbedNavbar defaultValue="a">
                <TabbedNavbar.Tab value="a">A</TabbedNavbar.Tab>
                <TabbedNavbar.Tab value="b">B</TabbedNavbar.Tab>
            </TabbedNavbar>
        );
        const tab = screen.getByRole("tab", { name: "B" });
        expect(tab).toHaveClass("dr-role-muted", "dr-hover-text");
        expect(tab.className).not.toMatch(/opacity-\d/);
    });

    test("Reduce Motion rule outranks Tailwind's !important animations", () => {
        const css = require("fs").readFileSync(
            require("path").join(__dirname, "../designSystem.css"),
            "utf8"
        );
        expect(css).toMatch(/:root \.animate-pulse/);
        expect(css).toMatch(/:root \.animate-ping/);
    });
});

test("one InputText", () => {
    expect(FormInputText).toBe(InputText);
});
