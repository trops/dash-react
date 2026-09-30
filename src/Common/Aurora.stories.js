import React, { useState } from "react";
import { Button, Button2, Button3 } from "./Button";
import { Card } from "./Card";
import { Panel } from "./Panel";
import { mock, MockWrapper } from "../Mock";

import "../tailwind.css";

/**
 * Aurora design system showcase.
 *
 * The `.dr-*` treatment is gated behind `[data-design="aurora"]`, so this story
 * wraps everything in a container carrying that attribute (in the app,
 * dash-electron sets it on <html>). A mode toggle sets `data-mode` to preview
 * light/dark — surfaces flip, accents stay theme-driven.
 */
export default {
    title: "Design System/Aurora",
};

const Stage = ({ children }) => {
    const [mode, setMode] = useState("dark");
    return (
        <div
            data-design="aurora"
            data-mode={mode}
            style={{
                background: "var(--mesh), var(--bg)",
                color: "var(--text)",
                fontFamily: "var(--font)",
                minHeight: "100vh",
                padding: "28px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <div style={{ fontSize: "20px", fontWeight: 700 }}>
                    Aurora — dash-react primitives
                </div>
                <Button3
                    title={mode === "dark" ? "◐ Light" : "◑ Dark"}
                    onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                />
            </div>
            {children}
        </div>
    );
};

const Section = ({ label, children }) => (
    <div style={{ marginBottom: "28px" }}>
        <div
            style={{
                fontFamily: "var(--mono)",
                fontSize: "10.5px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                marginBottom: "12px",
            }}
        >
            {label}
        </div>
        {children}
    </div>
);

export const Primitives = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Stage>
            <Section label="Buttons">
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Button title="Primary" onClick={() => {}} />
                    <Button2 title="Secondary" onClick={() => {}} />
                    <Button3 title="Ghost" onClick={() => {}} />
                </div>
            </Section>

            <Section label="Cards">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                    }}
                >
                    <Card>
                        <div style={{ fontWeight: 600, marginBottom: "6px" }}>
                            Glass card
                        </div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            Translucent surface, hairline border, soft depth.
                        </div>
                    </Card>
                    <Card>
                        <div style={{ fontWeight: 600, marginBottom: "6px" }}>
                            Another card
                        </div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            Backdrop blur adapts to light/dark.
                        </div>
                    </Card>
                    <Card>
                        <div style={{ fontWeight: 600, marginBottom: "6px" }}>
                            Third card
                        </div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            Toggle the mode top-right.
                        </div>
                    </Card>
                </div>
            </Section>

            <Section label="Panel (header / body / footer)">
                <Panel height="h-auto" scrollable={false}>
                    <Panel.Header border={true}>
                        <div style={{ fontWeight: 600 }}>Panel title</div>
                        <Button3 title="Action" onClick={() => {}} />
                    </Panel.Header>
                    <Panel.Body>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            The panel is one glass surface; header and footer
                            are separated by hairlines.
                        </div>
                    </Panel.Body>
                    <Panel.Footer border={true}>
                        <span style={{ color: "var(--text-3)", fontSize: 12 }}>
                            footer
                        </span>
                        <Button title="Save" onClick={() => {}} />
                    </Panel.Footer>
                </Panel>
            </Section>

            <Section label="Panel brand — provider identity via one hex">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                    }}
                >
                    <Panel brand="#611f69" height="h-auto" scrollable={false}>
                        <div style={{ fontWeight: 600 }}>Slack</div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            brand="#611f69"
                        </div>
                    </Panel>
                    <Panel brand="#1a73e8" height="h-auto" scrollable={false}>
                        <div style={{ fontWeight: 600 }}>Google Drive</div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            brand="#1a73e8"
                        </div>
                    </Panel>
                    <Panel brand="#ea4335" height="h-auto" scrollable={false}>
                        <div style={{ fontWeight: 600 }}>Gmail</div>
                        <div style={{ color: "var(--text-2)", fontSize: 13 }}>
                            brand="#ea4335"
                        </div>
                    </Panel>
                </div>
            </Section>
        </Stage>
    </MockWrapper>
);
