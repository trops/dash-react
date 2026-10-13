/**
 * Switches show on or off by their track (design guide), so they carry the
 * `dr-switch` hook and `data-checked` the Aurora styles key off — Switch and
 * all three Toggles.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Switch } from "./Switch";
import { Toggle, Toggle2, Toggle3 } from "../Toggle";
import { ThemeContext } from "@dash/Context/ThemeContext";

const wrap = (ui) =>
    render(
        <ThemeContext.Provider value={{ currentTheme: {} }}>
            {ui}
        </ThemeContext.Provider>
    );

describe("switch on/off hooks", () => {
    test("Switch", () => {
        wrap(
            <>
                <Switch ariaLabel="on" checked />
                <Switch ariaLabel="off" checked={false} />
            </>
        );
        const on = screen.getByRole("switch", { name: "on" });
        const off = screen.getByRole("switch", { name: "off" });
        expect(on).toHaveClass("dr-switch");
        expect(on).toHaveAttribute("data-checked", "true");
        expect(off).toHaveAttribute("data-checked", "false");
        expect(on.querySelector(".dr-switch-knob")).not.toBeNull();
    });

    test.each([
        ["Toggle", Toggle],
        ["Toggle2", Toggle2],
        ["Toggle3", Toggle3],
    ])("%s", (_n, T) => {
        wrap(
            <>
                <T ariaLabel="on" enabled setEnabled={() => {}} />
                <T ariaLabel="off" enabled={false} setEnabled={() => {}} />
            </>
        );
        const on = screen.getByRole("switch", { name: "on" });
        expect(on).toHaveClass("dr-switch");
        expect(on).toHaveAttribute("data-checked", "true");
        expect(screen.getByRole("switch", { name: "off" })).toHaveAttribute(
            "data-checked",
            "false"
        );
        expect(on.querySelector(".dr-switch-knob")).not.toBeNull();
    });
});
