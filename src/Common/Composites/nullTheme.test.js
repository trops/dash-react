/**
 * Before the app's theme loads, ThemeContext carries `currentTheme: null`.
 * Shared chrome (dock panel headers, list rows, chat) renders then too, so
 * it must not read colours off a null theme.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { PanelHeader } from "./PanelHeader";
import { ListRow } from "./ListRow";
import { EmptyState } from "./EmptyState";
import { ChatMessage, ChatComposer } from "./Chat";
import { SectionLabel } from "../Text/SectionLabel";
import { SegmentedControl } from "../SegmentedControl";

test("renders with currentTheme: null", () => {
    render(
        <ThemeContext.Provider value={{ currentTheme: null }}>
            <PanelHeader title="Bot activity" />
            <ListRow title="Row" meta="meta" onClick={() => {}} />
            <EmptyState title="Nothing yet" />
            <ChatMessage role="reply" label="Dash">
                Hi
            </ChatMessage>
            <ChatComposer value="" ariaLabel="Message" />
            <SectionLabel text="Group" />
            <SegmentedControl options={["A", "B"]} value="A" />
        </ThemeContext.Provider>
    );
    expect(screen.getByText("Bot activity")).toBeInTheDocument();
    expect(screen.getByText("Row")).toBeInTheDocument();
    expect(
        screen.getByRole("textbox", { name: "Message" })
    ).toBeInTheDocument();
});
