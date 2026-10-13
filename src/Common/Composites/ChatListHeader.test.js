/**
 * ChatMessage / ChatToolCall / ChatComposer / ListRow / PanelHeader — the
 * shared chat, list and header components from the design guide.
 */
import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { ChatMessage, ChatToolCall, ChatComposer } from "./Chat";
import { ListRow } from "./ListRow";
import { PanelHeader } from "./PanelHeader";

jest.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: () => null,
}));

const wrap = (node) =>
    render(
        <ThemeContext.Provider
            value={{ currentTheme: {}, themeVariant: "dark" }}
        >
            {node}
        </ThemeContext.Provider>
    );

describe("ChatMessage", () => {
    test("yours: right-aligned, no label", () => {
        const { container } = wrap(
            <ChatMessage role="you">What ran?</ChatMessage>
        );
        expect(container.querySelector(".dr-chat-row-you")).toHaveTextContent(
            "What ran?"
        );
        expect(container.querySelector(".dr-chat-label")).toBeNull();
    });

    test("reply: label, meta, content and footer", () => {
        wrap(
            <ChatMessage
                role="reply"
                label="Planner"
                meta="Opus · 7.4k tokens"
                footer={<button>Open as a plan</button>}
                testId="ans"
            >
                Two bots ran.
            </ChatMessage>
        );
        const el = screen.getByTestId("ans");
        expect(el).toHaveTextContent("Planner");
        expect(el).toHaveTextContent("Opus · 7.4k tokens");
        expect(el).toHaveTextContent("Two bots ran.");
        expect(
            screen.getByRole("button", { name: "Open as a plan" })
        ).toBeInTheDocument();
    });

    test("streaming marks the reply busy", () => {
        wrap(
            <ChatMessage role="reply" streaming testId="s">
                Looking…
            </ChatMessage>
        );
        expect(screen.getByTestId("s")).toHaveAttribute("aria-busy", "true");
    });

    test("note is a separator", () => {
        wrap(<ChatMessage role="note">New conversation</ChatMessage>);
        expect(screen.getByRole("separator")).toHaveTextContent(
            "New conversation"
        );
    });
});

describe("ChatToolCall", () => {
    test("names the tool and its status; details open on click", () => {
        wrap(
            <ChatToolCall
                name="bot_results"
                source="Dash team"
                status="running"
            >
                <pre>{"{}"}</pre>
            </ChatToolCall>
        );
        const head = screen.getByRole("button", { name: /bot_results/ });
        expect(head).toHaveTextContent("Running");
        expect(head).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(head);
        expect(head).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("{}")).toBeInTheDocument();
    });

    test("without details it isn't a button", () => {
        wrap(<ChatToolCall name="team_list_bots" status="error" />);
        expect(screen.queryByRole("button")).toBeNull();
        expect(screen.getByText("Failed")).toBeInTheDocument();
    });
});

function Composer(props) {
    const [v, setV] = useState(props.initial || "");
    return <ChatComposer value={v} onChange={setV} {...props} />;
}

describe("ChatComposer", () => {
    test("Enter sends, Shift+Enter doesn't, empty doesn't", () => {
        const onSend = jest.fn();
        wrap(<Composer onSend={onSend} placeholder="Ask a follow-up…" />);
        const box = screen.getByRole("textbox", { name: "Ask a follow-up…" });
        fireEvent.keyDown(box, { key: "Enter" });
        expect(onSend).not.toHaveBeenCalled();
        fireEvent.change(box, { target: { value: "Which failed?" } });
        fireEvent.keyDown(box, { key: "Enter", shiftKey: true });
        expect(onSend).not.toHaveBeenCalled();
        fireEvent.keyDown(box, { key: "Enter" });
        expect(onSend).toHaveBeenCalledWith("Which failed?");
    });

    test("a caller's onKeyDown can stop the send", () => {
        const onSend = jest.fn();
        wrap(
            <Composer
                initial="@lead"
                onSend={onSend}
                onKeyDown={(e) => e.preventDefault()}
            />
        );
        fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
        expect(onSend).not.toHaveBeenCalled();
    });

    test("busy shows Stop", () => {
        const onStop = jest.fn();
        wrap(<Composer initial="x" busy onStop={onStop} />);
        fireEvent.click(screen.getByRole("button", { name: "Stop" }));
        expect(onStop).toHaveBeenCalled();
        expect(screen.queryByRole("button", { name: "Send" })).toBeNull();
    });

    test("shows the hint", () => {
        wrap(<Composer />);
        expect(
            screen.getByText("Enter to send · Shift+Enter for a new line")
        ).toBeInTheDocument();
    });
});

describe("ListRow", () => {
    test("title and meta; click; actions sit outside the row button", () => {
        const onClick = jest.fn();
        wrap(
            <ListRow
                icon="comment"
                title="What did my bots find today?"
                meta="Answered · 2m ago"
                onClick={onClick}
                selected
                trailing={<button aria-label="Remove from Recent">x</button>}
            />
        );
        const row = screen.getByRole("button", {
            name: /What did my bots find today\?/,
        });
        expect(row).toHaveTextContent("Answered · 2m ago");
        expect(row).toHaveAttribute("aria-current", "true");
        fireEvent.click(row);
        expect(onClick).toHaveBeenCalled();
        const remove = screen.getByRole("button", {
            name: "Remove from Recent",
        });
        expect(row.contains(remove)).toBe(false);
    });

    test("without onClick it's not a button", () => {
        wrap(<ListRow title="Static" />);
        expect(screen.queryByRole("button")).toBeNull();
    });
});

describe("PanelHeader", () => {
    test("title, back button and actions", () => {
        const onBack = jest.fn();
        wrap(
            <PanelHeader
                title="What did my bots find today?"
                onBack={onBack}
                actions={<button aria-label="Close">x</button>}
            />
        );
        expect(
            screen.getByText("What did my bots find today?")
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Back" }));
        expect(onBack).toHaveBeenCalled();
        expect(
            screen.getByRole("button", { name: "Close" })
        ).toBeInTheDocument();
    });
});
