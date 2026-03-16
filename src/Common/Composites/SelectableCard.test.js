import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectableCard } from "./SelectableCard";
import { ThemeContext } from "@dash/Context/ThemeContext";

// Mock getStylesForItem to return predictable style classes
jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        backgroundColor: "bg-gray-800",
        textColor: "text-white",
        borderColor: "border-gray-600",
        hoverBackgroundColor: "hover:bg-gray-700",
        hoverBorderColor: "hover:border-gray-500",
        string: "bg-gray-800 text-white border-gray-600",
    }),
    getUUID: (uuid, prefix) => `${prefix}-test-id`,
}));

jest.mock("@dash/Utils/themeObjects", () => ({
    themeObjects: { CARD: "card" },
}));

// Mock FontAwesome
jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: ({ icon }) => {
        const name =
            typeof icon === "string"
                ? icon
                : icon && icon.iconName
                  ? icon.iconName
                  : "unknown";
        return <span data-testid={`icon-${name}`} />;
    },
}));

jest.mock("@fortawesome/free-solid-svg-icons", () => ({
    faCheck: { iconName: "check", prefix: "fas" },
}));

function renderCard(props = {}) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            <SelectableCard label="Test Card" onSelect={jest.fn()} {...props} />
        </ThemeContext.Provider>
    );
}

describe("SelectableCard", () => {
    test("renders with label", () => {
        renderCard();
        expect(screen.getByText("Test Card")).toBeInTheDocument();
    });

    test("renders with description when provided", () => {
        renderCard({ description: "Card description" });
        expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    test("does not render description when null", () => {
        const { container } = renderCard();
        expect(
            container.querySelector(".text-xs.opacity-70")
        ).not.toBeInTheDocument();
    });

    test("renders icon when provided", () => {
        renderCard({ icon: <span data-testid="custom-icon">🔧</span> });
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    test("does not render icon when null", () => {
        const { container } = renderCard({ icon: null });
        expect(
            container.querySelector(".text-2xl.mb-1")
        ).not.toBeInTheDocument();
    });

    // --- Accessibility ---

    test('has role="button"', () => {
        renderCard();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("has tabIndex 0 when not disabled", () => {
        renderCard();
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "0");
    });

    test("has tabIndex -1 when disabled", () => {
        renderCard({ disabled: true });
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });

    test("aria-pressed is false when not selected", () => {
        renderCard({ selected: false });
        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-pressed",
            "false"
        );
    });

    test("aria-pressed is true when selected", () => {
        renderCard({ selected: true });
        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-pressed",
            "true"
        );
    });

    test("aria-disabled is true when disabled", () => {
        renderCard({ disabled: true });
        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-disabled",
            "true"
        );
    });

    // --- Selection state ---

    test("shows check icon when selected", () => {
        renderCard({ selected: true });
        expect(screen.getByTestId("icon-check")).toBeInTheDocument();
    });

    test("does not show check icon when not selected", () => {
        renderCard({ selected: false });
        expect(screen.queryByTestId("icon-check")).not.toBeInTheDocument();
    });

    // --- Click behavior ---

    test("calls onSelect when clicked", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect });
        fireEvent.click(screen.getByRole("button"));
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    test("does not call onSelect when disabled", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect, disabled: true });
        fireEvent.click(screen.getByRole("button"));
        expect(onSelect).not.toHaveBeenCalled();
    });

    // --- Keyboard behavior ---

    test("calls onSelect on Enter key", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect });
        fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    test("calls onSelect on Space key", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect });
        fireEvent.keyDown(screen.getByRole("button"), { key: " " });
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    test("does not call onSelect on Enter when disabled", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect, disabled: true });
        fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
        expect(onSelect).not.toHaveBeenCalled();
    });

    test("does not call onSelect on other keys", () => {
        const onSelect = jest.fn();
        renderCard({ onSelect });
        fireEvent.keyDown(screen.getByRole("button"), { key: "Tab" });
        expect(onSelect).not.toHaveBeenCalled();
    });

    // --- Disabled styling ---

    test("applies disabled styles when disabled", () => {
        renderCard({ disabled: true });
        const el = screen.getByRole("button");
        expect(el.className).toContain("opacity-50");
        expect(el.className).toContain("cursor-not-allowed");
    });

    test("does not apply disabled styles when not disabled", () => {
        renderCard({ disabled: false });
        const el = screen.getByRole("button");
        expect(el.className).not.toContain("opacity-50");
        expect(el.className).not.toContain("cursor-not-allowed");
    });

    // --- Custom className ---

    test("appends custom className", () => {
        renderCard({ className: "my-custom-class" });
        expect(screen.getByRole("button").className).toContain(
            "my-custom-class"
        );
    });
});
