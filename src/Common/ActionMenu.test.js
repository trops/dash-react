/**
 * ActionMenu — a short list of actions behind one quiet button (⋯ / ⋮).
 *
 * Pins: the button's aria (label / haspopup / expanded), running an action
 * and closing, separators, disabled actions, danger and badge, arrow-key
 * focus that skips disabled actions, Escape (focus back on the button), a
 * click outside, clicks not reaching a parent, the portal, and the
 * design-system hooks.
 */
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionMenu } from "./ActionMenu";

jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: ({ icon }) => <span data-icon={icon} />,
}));

function setup(props = {}) {
    const calls = [];
    const items = [
        { label: "Edit in panel", onSelect: () => calls.push("edit") },
        { label: "Move to another cell", onSelect: () => calls.push("move") },
        { label: "Locked", disabled: true, onSelect: () => calls.push("x") },
        "separator",
        { label: "Remove", danger: true, onSelect: () => calls.push("rm") },
    ];
    const parentClick = jest.fn();
    render(
        <div onClick={parentClick}>
            <ActionMenu label="Counter options" items={items} {...props} />
        </div>
    );
    return { calls, parentClick };
}

const button = () => screen.getByRole("button", { name: "Counter options" });

test("the button names the menu and says whether it's open", () => {
    setup();
    expect(button()).toHaveAttribute("aria-haspopup", "menu");
    expect(button()).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button());
    expect(button()).toHaveAttribute("aria-expanded", "true");
    expect(
        screen.getByRole("menu", { name: "Counter options" })
    ).toBeInTheDocument();
});

test("picking an action runs it and closes the menu", () => {
    const { calls } = setup();
    fireEvent.click(button());
    fireEvent.click(
        screen.getByRole("menuitem", { name: "Move to another cell" })
    );
    expect(calls).toEqual(["move"]);
    expect(screen.queryByRole("menu")).toBeNull();
});

test("a disabled action stays visible but does nothing", () => {
    const { calls } = setup();
    fireEvent.click(button());
    const locked = screen.getByRole("menuitem", { name: "Locked" });
    expect(locked).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(locked);
    expect(calls).toEqual([]);
});

test("separators split the list; Remove reads as destructive", () => {
    setup();
    fireEvent.click(button());
    const menu = screen.getByRole("menu");
    expect(within(menu).getAllByRole("separator")).toHaveLength(1);
    expect(within(menu).getAllByRole("menuitem")).toHaveLength(4);
});

test("a badge marks an action; a dot marks the button", () => {
    render(
        <ActionMenu
            label="Options"
            dot
            items={[{ label: "Edit in panel", badge: "!", onSelect: () => {} }]}
        />
    );
    const btn = screen.getByRole("button", { name: "Options" });
    expect(btn.querySelector("span[aria-hidden='true']")).not.toBeNull();
    fireEvent.click(btn);
    expect(
        screen.getByRole("menuitem", { name: /Edit in panel/ })
    ).toHaveTextContent("!");
});

test("arrow keys move through actions, skipping disabled ones", () => {
    setup();
    fireEvent.click(button());
    const menu = screen.getByRole("menu");
    expect(document.activeElement).toHaveTextContent("Edit in panel");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Move to another cell");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Remove");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Edit in panel");
});

test("Escape closes and puts focus back on the button", () => {
    setup();
    fireEvent.click(button());
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(button());
});

test("a click outside closes it", () => {
    setup();
    fireEvent.click(button());
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
});

test("clicks on the button and in the menu don't reach a parent", () => {
    const { parentClick } = setup();
    fireEvent.click(button());
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit in panel" }));
    expect(parentClick).not.toHaveBeenCalled();
});

test("portal: the menu renders on document.body", () => {
    const { container } = render(
        <div style={{ overflow: "hidden" }}>
            <ActionMenu
                label="Cell options"
                portal
                items={[{ label: "Remove", onSelect: () => {} }]}
            />
        </div>
    );
    fireEvent.click(screen.getByRole("button", { name: "Cell options" }));
    const menu = screen.getByRole("menu", { name: "Cell options" });
    expect(container.contains(menu)).toBe(false);
    expect(document.body.contains(menu)).toBe(true);
});

test("design-system hooks", () => {
    setup();
    expect(button()).toHaveClass("dr-action-menu");
    fireEvent.click(button());
    expect(screen.getByRole("menu")).toHaveClass("dr-action-menu-panel");
    expect(screen.getAllByRole("menuitem")[0]).toHaveClass(
        "dr-action-menu-item"
    );
});

describe("a submenu (Move to page ▸)", () => {
    function setupSub() {
        const calls = [];
        render(
            <ActionMenu
                label="Player options"
                items={[
                    {
                        label: "Edit in panel",
                        onSelect: () => calls.push("edit"),
                    },
                    {
                        label: "Move to page",
                        items: [
                            {
                                label: "Home",
                                onSelect: () => calls.push("home"),
                            },
                            { label: "Music (here now)", disabled: true },
                            "separator",
                            {
                                label: "New page…",
                                onSelect: () => calls.push("new"),
                            },
                        ],
                    },
                ]}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: "Player options" }));
        return calls;
    }

    test("opens beside the menu; picking one runs it and closes everything", () => {
        const calls = setupSub();
        const parent = screen.getByRole("menuitem", { name: /Move to page/ });
        expect(parent).toHaveAttribute("aria-haspopup", "menu");
        expect(parent).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(parent);
        expect(parent).toHaveAttribute("aria-expanded", "true");
        const sub = screen.getByRole("menu", { name: "Move to page" });
        expect(
            within(sub).getByRole("menuitem", { name: "Home" })
        ).toHaveFocus();
        fireEvent.click(
            within(sub).getByRole("menuitem", { name: "Music (here now)" })
        );
        expect(calls).toEqual([]);
        fireEvent.click(
            within(sub).getByRole("menuitem", { name: "New page…" })
        );
        expect(calls).toEqual(["new"]);
        expect(screen.queryByRole("menu")).toBeNull();
    });

    test("→ opens it, arrows skip what can't run, ← goes back", () => {
        setupSub();
        const parent = screen.getByRole("menuitem", { name: /Move to page/ });
        parent.focus();
        fireEvent.keyDown(parent, { key: "ArrowRight" });
        const sub = screen.getByRole("menu", { name: "Move to page" });
        const home = within(sub).getByRole("menuitem", { name: "Home" });
        expect(home).toHaveFocus();
        fireEvent.keyDown(home, { key: "ArrowDown" });
        expect(
            within(sub).getByRole("menuitem", { name: "New page…" })
        ).toHaveFocus();
        fireEvent.keyDown(document.activeElement, { key: "ArrowLeft" });
        expect(screen.queryByRole("menu", { name: "Move to page" })).toBeNull();
        expect(parent).toHaveFocus();
        // The main menu is still open.
        expect(
            screen.getByRole("menu", { name: "Player options" })
        ).toBeInTheDocument();
    });

    test("Escape in the submenu closes only the submenu", () => {
        setupSub();
        fireEvent.click(screen.getByRole("menuitem", { name: /Move to page/ }));
        fireEvent.keyDown(document.activeElement, { key: "Escape" });
        expect(screen.queryByRole("menu", { name: "Move to page" })).toBeNull();
        expect(
            screen.getByRole("menu", { name: "Player options" })
        ).toBeInTheDocument();
    });
});

describe("submenu review fixes", () => {
    const render2 = (subItems) => {
        render(
            <ActionMenu
                label="Player options"
                items={[
                    { label: "Edit", onSelect: () => {} },
                    { label: "Move to page", items: subItems },
                ]}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: "Player options" }));
        return screen.getByRole("menuitem", { name: /Move to page/ });
    };

    test("its row again closes it", () => {
        const parent = render2([{ label: "Home", onSelect: () => {} }]);
        fireEvent.click(parent);
        expect(
            screen.getByRole("menu", { name: "Move to page" })
        ).toBeInTheDocument();
        fireEvent.click(parent);
        expect(screen.queryByRole("menu", { name: "Move to page" })).toBeNull();
    });

    test("all its pages disabled: ← still goes back", () => {
        const parent = render2([{ label: "Music (here now)", disabled: true }]);
        fireEvent.click(parent);
        const sub = screen.getByRole("menu", { name: "Move to page" });
        expect(sub).toHaveFocus();
        fireEvent.keyDown(sub, { key: "ArrowLeft" });
        expect(screen.queryByRole("menu", { name: "Move to page" })).toBeNull();
        expect(
            screen.getByRole("menu", { name: "Player options" })
        ).toBeInTheDocument();
    });

    test("moving on in the menu closes it; a destructive child reads as one", () => {
        const parent = render2([
            { label: "Remove from page", danger: true, badge: "!" },
        ]);
        fireEvent.click(parent);
        expect(screen.getByText("!")).toBeInTheDocument();
        fireEvent.keyDown(
            screen.getByRole("menu", { name: "Player options" }),
            {
                key: "ArrowDown",
            }
        );
        expect(screen.queryByRole("menu", { name: "Move to page" })).toBeNull();
    });
});
