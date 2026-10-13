import React, { useState } from "react";
import { mock, MockWrapper } from "../../Mock";
import { ChatMessage, ChatToolCall, ChatComposer } from "./Chat";
import { ListRow } from "./ListRow";
import { PanelHeader } from "./PanelHeader";
import { ButtonIcon3 } from "../ButtonIcon";

export default {
    title: "Composites/Chat, list rows, panel header",
};

export const Conversation = () => {
    const [value, setValue] = useState("");
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    maxWidth: 560,
                }}
            >
                <ChatMessage role="you">
                    What did my bots find today?
                </ChatMessage>
                <ChatToolCall
                    name="bot_results"
                    source="Dash team"
                    status="done"
                >
                    <pre style={{ fontSize: 12 }}>{'{ "finds": 2 }'}</pre>
                </ChatToolCall>
                <ChatMessage
                    role="reply"
                    label="Planner"
                    meta="Opus · 7.4k tokens"
                    footer={<button type="button">Open as a plan</button>}
                >
                    Morning Briefer sent a brief at 7:02 AM: the server bill
                    went up 18%, and two PRs are waiting on your review.
                </ChatMessage>
                <ChatMessage role="note">New conversation</ChatMessage>
                <ChatMessage role="reply" label="Planner" streaming>
                    Looking…
                </ChatMessage>
                <ChatComposer
                    value={value}
                    onChange={setValue}
                    onSend={() => setValue("")}
                    placeholder="Ask a follow-up…"
                />
            </div>
        </MockWrapper>
    );
};

export const ToolCalls = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxWidth: 420,
            }}
        >
            <ChatToolCall
                name="team_recent_runs"
                source="bot-team"
                status="running"
            />
            <ChatToolCall
                name="team_list_bots"
                source="bot-team"
                status="done"
            />
            <ChatToolCall name="gmail_search" source="Gmail" status="error" />
        </div>
    </MockWrapper>
);

export const Rows = () => {
    const [sel, setSel] = useState("q");
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    maxWidth: 420,
                }}
            >
                <ListRow
                    icon="comment"
                    title="What did my bots find today?"
                    meta="Answered · 2m ago"
                    selected={sel === "q"}
                    onClick={() => setSel("q")}
                    trailing={
                        <ButtonIcon3
                            icon="xmark"
                            ariaLabel="Remove from Recent"
                        />
                    }
                />
                <ListRow
                    icon="table-cells-large"
                    title="Morning Brief"
                    meta="Waiting for Gmail · 1h ago"
                    selected={sel === "p"}
                    onClick={() => setSel("p")}
                />
                <ListRow
                    icon="pen-to-square"
                    title="Tokyo clock"
                    meta="Continue in Widget Builder · 8d ago"
                    selected={sel === "d"}
                    onClick={() => setSel("d")}
                />
            </div>
        </MockWrapper>
    );
};

export const Headers = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: 420,
            }}
        >
            <PanelHeader
                glyph="plus"
                title="Create"
                actions={<ButtonIcon3 icon="xmark" ariaLabel="Close" />}
            />
            <PanelHeader
                title="What did my bots find today?"
                onBack={() => {}}
                actions={
                    <>
                        <ButtonIcon3
                            icon="up-right-and-down-left-from-center"
                            ariaLabel="Open full size"
                        />
                        <ButtonIcon3 icon="xmark" ariaLabel="Close" />
                    </>
                }
            />
        </div>
    </MockWrapper>
);

export const AllVariants = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Headers />
        <Rows />
        <ToolCalls />
        <Conversation />
    </div>
);
