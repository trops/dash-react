/**
 * Tag — override-prop pins.
 *
 * Pins `padding`, `rounded`, and `border` overrides on Tag / Tag2 /
 * Tag3. Defaults preserve the prior baked-in shape so existing call
 * sites are byte-identical.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tag, Tag2, Tag3 } from "./Tag";
import { ThemeContext } from "@dash/Context/ThemeContext";

jest.mock("@dash/Utils", () => ({
    getStylesForItem: () => ({
        string: "",
        backgroundColor: "",
        textColor: "",
        hoverBackgroundColor: "",
        hoverTextColor: "",
        activeBackgroundColor: "",
        activeTextColor: "",
        borderColor: "",
    }),
    getUUID: (id, prefix) => id || `${prefix}-test-id`,
    themeObjects: { TAG: "tag", TAG_2: "tag-2", TAG_3: "tag-3" },
}));

function renderWithTheme(node) {
    return render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {node}
        </ThemeContext.Provider>
    );
}

describe.each([
    ["Tag", Tag, "px-3 py-1.5"],
    ["Tag2", Tag2, "px-2 py-1"],
    ["Tag3", Tag3, "px-1.5 py-0.5"],
])("%s override props", (label, Component, defaultPadding) => {
    test(`${label} applies the default padding`, () => {
        const { container } = renderWithTheme(<Component text="hi" />);
        expect(container.firstChild.className).toMatch(defaultPadding);
    });

    test(`${label} honors a custom padding override`, () => {
        const { container } = renderWithTheme(
            <Component text="hi" padding="px-1 py-0" />
        );
        expect(container.firstChild.className).toMatch(/px-1 py-0/);
    });

    test(`${label} applies the border by default`, () => {
        const { container } = renderWithTheme(<Component text="hi" />);
        expect(container.firstChild.className).toMatch(/(^| )border( |$)/);
    });

    test(`${label} omits the border when border={false}`, () => {
        const { container } = renderWithTheme(
            <Component text="hi" border={false} />
        );
        expect(container.firstChild.className).not.toMatch(/(^| )border( |$)/);
    });

    test(`${label} honors a custom rounded override`, () => {
        const { container } = renderWithTheme(
            <Component text="hi" rounded="rounded-full" />
        );
        expect(container.firstChild.className).toMatch(/rounded-full/);
    });
});
