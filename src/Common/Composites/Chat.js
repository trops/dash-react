import React, { forwardRef, useContext, useState } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button";

/**
 * The one chat (design guide: "Chat"). Every conversation in Dash — the AI
 * Assistant, Ask the lead, Create's Planner and Ask, the Widget Builder —
 * renders these, so they look and behave alike.
 *
 * Styling comes from the Aurora tokens (`.dr-chat-*` in designSystem.css);
 * the theme classes here are fallbacks outside Aurora.
 */

function useChatTokens() {
    // The default context carries currentTheme: null — fall back to {}.
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    return {
        you: currentTheme["bg-primary-medium"] || "",
        reply:
            currentTheme["bg-secondary-dark"] ||
            currentTheme["bg-primary-dark"] ||
            "",
        text: currentTheme["text-primary-medium"] || "",
        muted: currentTheme["text-neutral-medium"] || "",
        hairline: currentTheme["border-neutral-dark"] || "",
    };
}

/**
 * One message.
 *
 * - `role="you"`: what the user said — right-aligned, accent-soft fill, no label.
 * - `role="reply"`: an answer — raised surface with an edge, named by `label`
 *   ("Planner", "Algolia Search Lead") with `meta` beside it (model · tokens),
 *   and an optional `footer` (e.g. an "Open as a plan" button).
 * - `role="note"`: a centered divider ("New conversation", "Planner asked the Scout…").
 *
 * `children` is the content; callers render markdown themselves.
 * `streaming` marks a reply that's still arriving: a spinner beside the
 * label (role=status, "Working") shows it's being worked on.
 */
export const ChatMessage = ({
    role = "reply",
    label = null,
    meta = null,
    footer = null,
    streaming = false,
    testId,
    className = "",
    children,
}) => {
    const t = useChatTokens();
    if (role === "note") {
        return (
            <div
                className={`dr-chat-note flex flex-row items-center gap-3 text-xs ${t.muted} ${className}`}
                role="separator"
                data-testid={testId}
            >
                <span
                    className={`flex-1 border-t ${t.hairline}`}
                    aria-hidden="true"
                />
                <span>{children}</span>
                <span
                    className={`flex-1 border-t ${t.hairline}`}
                    aria-hidden="true"
                />
            </div>
        );
    }
    if (role === "you") {
        return (
            <div
                className={`dr-chat-row-you flex flex-row justify-end ${className}`}
                data-testid={testId}
            >
                <div
                    className={`dr-chat-you px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words leading-relaxed ${t.you} ${t.text}`}
                    style={{ maxWidth: "80%" }}
                >
                    {children}
                </div>
            </div>
        );
    }
    return (
        <div
            className={`dr-chat-row-reply flex flex-col gap-1 ${className}`}
            data-testid={testId}
            aria-busy={streaming || undefined}
        >
            {label || meta || streaming ? (
                <div className="flex flex-row items-baseline gap-2">
                    {label ? (
                        <span
                            className={`dr-chat-label text-xs font-semibold uppercase tracking-wider ${t.muted}`}
                        >
                            {label}
                        </span>
                    ) : null}
                    {meta ? (
                        <span className={`dr-chat-meta text-xs ${t.muted}`}>
                            {meta}
                        </span>
                    ) : null}
                    {streaming ? (
                        <span
                            className={`dr-chat-working self-center text-xs ${t.muted}`}
                            role="status"
                            aria-label="Working"
                        >
                            <FontAwesomeIcon
                                icon="spinner"
                                className="h-3 w-3 animate-spin"
                            />
                        </span>
                    ) : null}
                </div>
            ) : null}
            <div
                className={`dr-chat-reply px-3 py-2 rounded-lg border text-sm break-words leading-relaxed ${t.reply} ${t.text} ${t.hairline} ${
                    streaming ? "dr-chat-streaming" : ""
                }`}
            >
                {children}
            </div>
            {footer ? <div className="dr-chat-footer">{footer}</div> : null}
        </div>
    );
};

/**
 * A tool call inside a chat: status dot, the tool's name in mono, where it
 * ran (`source`), and — when `children` are given — a disclosure for the
 * input/result details.
 *
 * @param {{ name: string, source?: string, status?: "running"|"done"|"error" }} props
 */
export const ChatToolCall = ({
    name,
    source = null,
    status = "done",
    defaultOpen = false,
    children = null,
    className = "",
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const t = useChatTokens();
    const statusWord =
        { running: "Running", done: "Done", error: "Failed" }[status] || status;
    const head = (
        <>
            <span
                className={`dr-chat-tool-dot dr-chat-tool-${status} inline-block h-2 w-2 rounded-full shrink-0`}
                aria-hidden="true"
            />
            <span className="font-mono truncate">{name}</span>
            {source ? (
                <span className={`dr-chat-tool-source ${t.muted}`}>
                    · {source}
                </span>
            ) : null}
            <span className="sr-only">{statusWord}</span>
        </>
    );
    return (
        <div
            className={`dr-chat-tool rounded-md border text-xs ${t.hairline} ${className}`}
            data-status={status}
        >
            {children ? (
                <button
                    type="button"
                    className="dr-chat-tool-head w-full flex flex-row items-center gap-2 px-2.5 py-1.5 text-left"
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                >
                    {head}
                    <span className={`ml-auto ${t.muted}`} aria-hidden="true">
                        {open ? "▲" : "▼"}
                    </span>
                </button>
            ) : (
                <div className="dr-chat-tool-head flex flex-row items-center gap-2 px-2.5 py-1.5">
                    {head}
                </div>
            )}
            {children && open ? (
                <div
                    className={`dr-chat-tool-body px-2.5 py-2 border-t ${t.hairline}`}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
};

/**
 * The message box under a chat: a text area, Send (Stop while `busy`), and a
 * hint. Controlled: the caller owns `value`.
 *
 * Enter sends, Shift+Enter is a new line. `onKeyDown` runs first, so callers
 * can intercept keys (e.g. an @-mention menu) — calling `preventDefault()`
 * stops the send. `above` renders over the box (menus, recipient chips).
 */
export const ChatComposer = forwardRef(function ChatComposer(
    {
        value = "",
        onChange = () => {},
        onSend = () => {},
        onStop = null,
        busy = false,
        disabled = false,
        placeholder = "Type a message…",
        ariaLabel = null,
        hint = "Enter to send · Shift+Enter for a new line",
        sendLabel = "Send",
        rows = 2,
        onKeyDown = null,
        above = null,
        className = "",
    },
    ref
) {
    const t = useChatTokens();
    const canSend = !disabled && !busy && String(value).trim() !== "";
    const send = () => {
        if (canSend) onSend(value);
    };
    return (
        <div
            className={`dr-chat-composer flex flex-col gap-1.5 px-4 pt-3 pb-3 border-t ${t.hairline} ${className}`}
        >
            {above}
            <div className="flex flex-row items-end gap-2">
                <textarea
                    ref={ref}
                    value={value}
                    rows={rows}
                    placeholder={placeholder}
                    aria-label={ariaLabel || placeholder || "Message"}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value, e)}
                    onKeyDown={(e) => {
                        if (onKeyDown) onKeyDown(e);
                        if (e.defaultPrevented) return;
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            send();
                        }
                    }}
                    className={`dr-input flex-1 min-w-0 px-3 py-2 rounded-lg border text-sm resize-none focus:outline-none disabled:opacity-50 ${t.reply} ${t.text} ${t.hairline}`}
                />
                {busy && onStop ? (
                    <Button
                        title="Stop"
                        danger
                        onClick={onStop}
                        className="shrink-0"
                    />
                ) : (
                    <Button
                        title={sendLabel}
                        onClick={send}
                        disabled={!canSend}
                        className="shrink-0"
                    />
                )}
            </div>
            {hint ? (
                <span className={`dr-chat-hint text-xs ${t.muted}`}>
                    {hint}
                </span>
            ) : null}
        </div>
    );
});
