import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStatusColors } from "@dash/Utils/statusColors";
import { themeVarsStyle } from "@dash/Utils/themeVars";

/**
 * ActionMenu — a short list of actions behind one quiet button (⋯ / ⋮):
 * "Edit in panel", "Move to another cell", "Remove". For doing things to
 * one object. Picking one of several values is ChoiceMenu; filters are
 * FilterMenu.
 *
 * The button has aria-haspopup="menu" / aria-expanded and an aria-label.
 * The menu is role="menu" with a role="menuitem" per action. Arrow keys
 * move between actions, Enter or Space runs one, Escape or a click outside
 * closes and returns focus to the button.
 *
 * Props:
 *   label      — what the menu is for ("Counter options"); the button's
 *                aria-label and the menu's name
 *   icon       — the button's icon: "ellipsis" (⋯, default) or
 *                "ellipsis-vertical" (⋮)
 *   items      — array of { key?, label, description?, onSelect, danger?,
 *                badge?, disabled?, items? } or the string "separator".
 *                `danger` colours it as destructive (Remove); `badge` is
 *                a short warning mark ("!") after the label. `items` (the
 *                same shapes, one level — a submenu has no submenus) makes
 *                it a submenu ("Move to page ▸"): click, Enter or → opens it
 *                beside the menu (on the left when there's no room on the
 *                right; growing up near the bottom); its row again, ←,
 *                Escape or moving on in the menu closes it.
 *   dot        — a warning dot on the button (something in the menu needs
 *                attention)
 *   align      — "left" | "right": which edge the menu lines up with
 *   direction  — "down" | "up"
 *   portal     — render the menu on document.body, so a clipped container
 *                (a dashboard cell) can't cut it off
 *   className  — layout classes for the container
 *
 * Styling: neutral theme tokens (the item colour fills of MenuItem don't
 * suit a quiet action list); the Aurora design system can restyle it via
 * the `dr-action-menu` / `dr-action-menu-panel` / `dr-action-menu-item`
 * hooks.
 */
const ActionMenu = ({
    label = "Actions",
    icon = "ellipsis",
    items = [],
    dot = false,
    align = "right",
    direction = "down",
    portal = false,
    className = "",
}) => {
    // The default context carries `currentTheme: null` — fall back to {}.
    const themeCtx = useContext(ThemeContext) || {};
    const currentTheme = themeCtx.currentTheme || {};
    const status = getStatusColors(themeCtx.themeVariant);
    const border = currentTheme["border-neutral-dark"] || "border-gray-700";
    const idleText = currentTheme["text-neutral-medium"] || "text-gray-400";
    const strongText = currentTheme["text-neutral-light"] || "text-gray-200";
    const panelBg = currentTheme["bg-neutral-very-dark"] || "bg-gray-900";
    const hoverBg = currentTheme["bg-neutral-dark"] || "bg-gray-800";

    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const rootRef = useRef(null);
    const panelRef = useRef(null);
    const buttonRef = useRef(null);
    const itemRefs = useRef([]);
    // An open submenu: { key, side: "right" | "left", up: boolean } — by
    // its item's key or label, so a list that changes can't move it.
    const [sub, setSub] = useState(null);
    const subRefs = useRef([]);
    const subPanelRef = useRef(null);

    const actions = items.filter((i) => i && i !== "separator");
    const enabledIndexes = actions
        .map((a, i) => (a.disabled ? -1 : i))
        .filter((i) => i >= 0);
    const keyOf = (a) => (a && (a.key || a.label)) || "";
    const subIndex = sub ? actions.findIndex((a) => keyOf(a) === sub.key) : -1;
    const subItems =
        subIndex >= 0 && Array.isArray(actions[subIndex].items)
            ? actions[subIndex].items
            : null;

    // Closed by any path (Tab, a click outside): no submenu left behind.
    useEffect(() => {
        if (!open) setSub(null);
    }, [open]);

    // Close on a click outside (the button's container or the menu).
    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => {
            const inRoot =
                rootRef.current && rootRef.current.contains(e.target);
            const inPanel =
                panelRef.current && panelRef.current.contains(e.target);
            if (!inRoot && !inPanel) setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    // A portalled menu follows its button; scrolling or resizing closes it.
    useEffect(() => {
        if (!open || !portal) return undefined;
        const onMove = () => setOpen(false);
        window.addEventListener("resize", onMove);
        window.addEventListener("scroll", onMove, true);
        return () => {
            window.removeEventListener("resize", onMove);
            window.removeEventListener("scroll", onMove, true);
        };
    }, [open, portal]);

    // Opening focuses the first action that can run.
    useEffect(() => {
        if (!open) return;
        const el =
            enabledIndexes[0] !== undefined
                ? itemRefs.current[enabledIndexes[0]]
                : null;
        if (el && typeof el.focus === "function") el.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const toggle = () => {
        if (!open && portal && buttonRef.current) {
            setRect(buttonRef.current.getBoundingClientRect());
        }
        setOpen((v) => !v);
    };

    const close = () => {
        setOpen(false);
        setSub(null);
        if (buttonRef.current) buttonRef.current.focus();
    };

    // The submenu (w-56 + its 4px gap) goes right unless it would leave the
    // window there and fits on the left; it grows up from the row's bottom
    // when it would run off the bottom.
    const SUB_WIDTH = 228;
    const openSub = (index) => {
        const el = itemRefs.current[index];
        const r =
            el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
        const w = typeof window !== "undefined" ? window.innerWidth : 0;
        const h = typeof window !== "undefined" ? window.innerHeight : 0;
        const list = actions[index].items || [];
        const tall = 12 + list.length * 38;
        const side =
            r && r.right + SUB_WIDTH > w && r.left - SUB_WIDTH >= 0
                ? "left"
                : "right";
        const up = !!(r && r.top + tall > h && r.bottom - tall >= 0);
        setSub({ key: keyOf(actions[index]), side, up });
    };

    const run = (action, index) => {
        if (action.disabled) return;
        if (Array.isArray(action.items)) {
            // Its row again closes it.
            if (sub && sub.key === keyOf(action)) setSub(null);
            else openSub(index);
            return;
        }
        close();
        if (action.onSelect) action.onSelect();
    };

    // An opened submenu focuses its first action that can run — or itself,
    // when none can, so ← and Escape still go back.
    useEffect(() => {
        if (!sub || !subItems) return;
        const first = subItems
            .filter((i) => i && i !== "separator")
            .findIndex((i) => !i.disabled);
        const el = first >= 0 ? subRefs.current[first] : subPanelRef.current;
        if (el && typeof el.focus === "function") el.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sub && sub.key]);

    const backToParent = () => {
        const at = subIndex >= 0 ? itemRefs.current[subIndex] : null;
        setSub(null);
        if (at && typeof at.focus === "function") at.focus();
    };

    // Roving focus over the enabled rows of a list (the menu or a submenu).
    const rove = (refs, enabled, step) => {
        if (!enabled.length) return;
        const cur = refs.indexOf(document.activeElement);
        const pos = enabled.indexOf(cur);
        const next =
            pos < 0
                ? enabled[0]
                : enabled[(pos + step + enabled.length) % enabled.length];
        const el = refs[next];
        if (el) el.focus();
    };

    const onSubKeyDown = (e, list) => {
        const enabled = list
            .filter((i) => i && i !== "separator")
            .map((a, i) => (a.disabled ? -1 : i))
            .filter((i) => i >= 0);
        if (e.key === "Escape" || e.key === "ArrowLeft") {
            e.preventDefault();
            e.stopPropagation();
            backToParent();
        } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();
            rove(subRefs.current, enabled, e.key === "ArrowDown" ? 1 : -1);
        }
    };

    const moveFocus = (step) => {
        // Moving on in the menu leaves a submenu behind.
        setSub(null);
        rove(itemRefs.current, enabledIndexes, step);
    };

    const onMenuKeyDown = (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            close();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveFocus(1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveFocus(-1);
        } else if (e.key === "ArrowRight") {
            const i = itemRefs.current.indexOf(document.activeElement);
            if (i >= 0 && actions[i] && Array.isArray(actions[i].items)) {
                e.preventDefault();
                if (!actions[i].disabled) openSub(i);
            }
        } else if (e.key === "Tab") {
            setOpen(false);
        }
    };

    // A row's look: disabled, destructive, or plain.
    const toneOf = (a) =>
        a.disabled
            ? `${idleText} cursor-not-allowed`
            : a.danger
              ? `${status.error.icon} cursor-pointer`
              : `${strongText} cursor-pointer`;

    const placement = portal
        ? ""
        : `absolute ${align === "right" ? "right-0" : "left-0"} ${
              direction === "up" ? "bottom-full mb-1" : "top-full mt-1"
          }`;
    const portalStyle =
        portal && rect
            ? {
                  position: "fixed",
                  top:
                      direction === "up"
                          ? undefined
                          : Math.round(rect.bottom + 4),
                  bottom:
                      direction === "up"
                          ? Math.round(window.innerHeight - rect.top + 4)
                          : undefined,
                  left: align === "right" ? undefined : Math.round(rect.left),
                  right:
                      align === "right"
                          ? Math.round(window.innerWidth - rect.right)
                          : undefined,
              }
            : undefined;

    let actionIndex = -1;
    const menu = open ? (
        <div
            ref={panelRef}
            role="menu"
            aria-label={label}
            onKeyDown={onMenuKeyDown}
            // Clicks inside don't reach a parent that selects on click (a
            // dashboard cell).
            onClick={(e) => e.stopPropagation()}
            style={
                portalStyle
                    ? { ...themeVarsStyle(currentTheme), ...portalStyle }
                    : portalStyle
            }
            className={`dr-action-menu-panel ${placement} z-50 w-60 flex flex-col gap-0.5 p-1.5 rounded-lg border shadow-lg ${panelBg} ${border}`}
        >
            {items.map((item, i) => {
                if (item === "separator") {
                    return (
                        <div
                            key={`sep-${i}`}
                            role="separator"
                            className={`my-1 border-t ${border}`}
                        />
                    );
                }
                if (!item) return null;
                actionIndex += 1;
                const index = actionIndex;
                const tone = toneOf(item);
                const hasSub = Array.isArray(item.items);
                const subOpen = hasSub && subIndex === index;
                const itemButton = (
                    <button
                        key={item.key || item.label}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        type="button"
                        role="menuitem"
                        aria-disabled={item.disabled ? true : undefined}
                        aria-haspopup={hasSub ? "menu" : undefined}
                        aria-expanded={hasSub ? !!subOpen : undefined}
                        tabIndex={-1}
                        onClick={() => run(item, index)}
                        className={`dr-action-menu-item flex flex-col items-start text-left px-2.5 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 hover:${hoverBg} ${tone}`}
                    >
                        <span className="flex w-full items-center gap-2">
                            <span className="flex-1 truncate">
                                {item.label}
                            </span>
                            {item.badge ? (
                                <span
                                    className={`text-xs font-bold ${status.warning.icon}`}
                                >
                                    {item.badge}
                                </span>
                            ) : null}
                            {hasSub ? (
                                <span aria-hidden="true" className={idleText}>
                                    ▸
                                </span>
                            ) : null}
                        </span>
                        {item.description ? (
                            <span className={`text-xs ${idleText}`}>
                                {item.description}
                            </span>
                        ) : null}
                    </button>
                );
                if (!hasSub) return itemButton;
                let childIndex = -1;
                return (
                    <div
                        key={item.key || item.label}
                        className="relative flex flex-col"
                    >
                        {itemButton}
                        {subOpen ? (
                            <div
                                ref={subPanelRef}
                                role="menu"
                                aria-label={item.label}
                                tabIndex={-1}
                                onKeyDown={(e) => onSubKeyDown(e, item.items)}
                                className={`dr-action-menu-submenu absolute ${
                                    sub.up ? "bottom-0" : "top-0"
                                } ${
                                    sub.side === "left"
                                        ? "right-full mr-1"
                                        : "left-full ml-1"
                                } z-50 w-56 flex flex-col gap-0.5 p-1.5 rounded-lg border shadow-lg ${panelBg} ${border}`}
                            >
                                {item.items.map((child, j) => {
                                    if (child === "separator") {
                                        return (
                                            <div
                                                key={`sub-sep-${j}`}
                                                role="separator"
                                                className={`my-1 border-t ${border}`}
                                            />
                                        );
                                    }
                                    if (!child) return null;
                                    childIndex += 1;
                                    const k = childIndex;
                                    return (
                                        <button
                                            key={child.key || child.label}
                                            ref={(el) => {
                                                subRefs.current[k] = el;
                                            }}
                                            type="button"
                                            role="menuitem"
                                            aria-disabled={
                                                child.disabled
                                                    ? true
                                                    : undefined
                                            }
                                            tabIndex={-1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (child.disabled) return;
                                                close();
                                                if (child.onSelect)
                                                    child.onSelect();
                                            }}
                                            className={`dr-action-menu-item flex flex-col items-start text-left px-2.5 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 hover:${hoverBg} ${toneOf(
                                                child
                                            )}`}
                                        >
                                            <span className="flex w-full items-center gap-2">
                                                <span className="flex-1 truncate">
                                                    {child.label}
                                                </span>
                                                {child.badge ? (
                                                    <span
                                                        className={`text-xs font-bold ${status.warning.icon}`}
                                                    >
                                                        {child.badge}
                                                    </span>
                                                ) : null}
                                            </span>
                                            {child.description ? (
                                                <span
                                                    className={`text-xs ${idleText}`}
                                                >
                                                    {child.description}
                                                </span>
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    ) : null;

    return (
        <div
            ref={rootRef}
            className={`relative inline-flex items-center ${className}`}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={(e) => {
                    e.stopPropagation();
                    toggle();
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown" && !open) {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className={`dr-action-menu relative inline-flex items-center justify-center h-8 w-8 rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 ${idleText} hover:${hoverBg}`}
            >
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                {dot ? (
                    <span
                        aria-hidden="true"
                        className={`absolute top-1 right-1 h-2 w-2 rounded-full ${status.warning.solidBg}`}
                    />
                ) : null}
            </button>
            {menu && portal && typeof document !== "undefined"
                ? createPortal(menu, document.body)
                : menu}
        </div>
    );
};

export { ActionMenu };
