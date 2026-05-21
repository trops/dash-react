/**
 * RichText — formatter pins.
 *
 * Pure transform primitive: input text + format flag → React span.
 * No theme tokens consumed, so no ThemeContext mock needed (unlike
 * StatusBadge.test.js / SelectableCard.test.js sitting under
 * Composites/). Tests focus on the tokenizer + emoji + entity decode,
 * which is where the value (and the regression risk) lives.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    RichText,
    slackEmojiForName,
    SLACK_QUICK_REACTION_SHORTCODES,
} from "./RichText";

function renderText(text, props = {}) {
    return render(<RichText text={text} {...props} />);
}

describe("RichText — Slack mrkdwn rendering", () => {
    test("plain text passes through unchanged", () => {
        const { container } = renderText("hello world");
        expect(container.textContent).toBe("hello world");
    });

    test("renders bold via *...*", () => {
        const { container } = renderText("a *bold* word");
        expect(container.querySelector("strong")).toHaveTextContent("bold");
        expect(container.textContent).toBe("a bold word");
    });

    test("renders italic via _..._", () => {
        const { container } = renderText("an _italic_ word");
        expect(container.querySelector("em")).toHaveTextContent("italic");
    });

    test("does NOT treat underscores inside identifiers as italic", () => {
        // `snake_case_name` shouldn't render italic — would mangle
        // every Slack mention of a code identifier. The italic regex
        // requires word boundaries either side of the underscores.
        const { container } = renderText("see snake_case_name handler");
        expect(container.querySelector("em")).toBeNull();
        expect(container.textContent).toBe("see snake_case_name handler");
    });

    test("renders code via `...`", () => {
        const { container } = renderText("run `npm ci` first");
        expect(container.querySelector("code")).toHaveTextContent("npm ci");
    });

    test("renders strike via ~...~", () => {
        const { container } = renderText("~old~ new");
        const struck = container.querySelector("span.line-through");
        expect(struck).not.toBeNull();
        expect(struck).toHaveTextContent("old");
    });
});

describe("RichText — Slack angle-bracket escapes", () => {
    test("mention <@U123|name> renders as @name", () => {
        const { container } = renderText("hi <@U03H9MLC5|alice>!");
        expect(container.textContent).toBe("hi @alice!");
    });

    test("mention <@U123> without label falls back to @id", () => {
        const { container } = renderText("hi <@U03H9MLC5>");
        expect(container.textContent).toBe("hi @U03H9MLC5");
    });

    test("channel <#C123|general> renders as #general", () => {
        const { container } = renderText("see <#C0AG43RV3S7|project-ideas>");
        expect(container.textContent).toBe("see #project-ideas");
    });

    test("link <https://x|click> renders as anchor with label", () => {
        const { container } = renderText("read <https://example.com|the docs>");
        const link = container.querySelector("a");
        expect(link).not.toBeNull();
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveTextContent("the docs");
    });

    test("link <https://x> without label uses URL as both href and text", () => {
        const { container } = renderText("see <https://example.com>");
        const link = container.querySelector("a");
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveTextContent("https://example.com");
    });

    test("special !channel-style mentions render as @channel", () => {
        const { container } = renderText("attn <!channel>");
        expect(container.textContent).toBe("attn @channel");
    });
});

describe("RichText — HTML entity decoding", () => {
    test("&gt; decodes to >", () => {
        const { container } = renderText("a &gt; b");
        expect(container.textContent).toBe("a > b");
    });

    test("&lt;, &amp;, &quot;, &#39; decode to their characters", () => {
        const { container } = renderText("&lt;&amp;&quot;&#39;");
        expect(container.textContent).toBe("<&\"'");
    });
});

describe("RichText — emoji shortcode resolution", () => {
    test(":thumbsup: → 👍", () => {
        const { container } = renderText("nice :thumbsup:");
        expect(container.textContent).toBe("nice 👍");
    });

    test(":clipboard: → 📋", () => {
        const { container } = renderText(":clipboard: notes");
        expect(container.textContent).toBe("📋 notes");
    });

    test("+1 / -1 shortcuts map to thumb glyphs", () => {
        const a = renderText(":+1:");
        expect(a.container.textContent).toBe("👍");
        const b = renderText(":-1:");
        expect(b.container.textContent).toBe("👎");
    });

    test("unknown shortcodes fall through unchanged", () => {
        const { container } = renderText(":partyparrot: time");
        expect(container.textContent).toBe(":partyparrot: time");
    });

    test("multiple emojis on one line all resolve", () => {
        const { container } = renderText(":fire: :rocket: :tada:");
        expect(container.textContent).toBe("🔥 🚀 🎉");
    });
});

describe("RichText — combined real-world Slack messages", () => {
    test("the message from the user's screenshot renders correctly", () => {
        // Captured from the slack-pack test session:
        const raw =
            "claude_comms: :clipboard: Found Feature *DASH-202* — _wizard icon in wrong spot in the settings &gt; dashboard_";
        const { container } = renderText(raw);
        // Bold + italic + emoji + entity all in one rendering.
        expect(container.textContent).toBe(
            "claude_comms: 📋 Found Feature DASH-202 — wizard icon in wrong spot in the settings > dashboard"
        );
        expect(container.querySelector("strong")).toHaveTextContent("DASH-202");
        expect(container.querySelector("em")).toHaveTextContent(
            "wizard icon in wrong spot in the settings > dashboard"
        );
    });
});

describe("RichText — format flag", () => {
    test("format='slack' is the default", () => {
        const { container } = renderText(":fire:");
        expect(container.textContent).toBe("🔥");
    });

    test("unknown format passes text through unchanged (forward-compat)", () => {
        // Reserves room for future flavors (markdown, plaintext, …)
        // without exploding when a caller preemptively sets the prop.
        const { container } = renderText(":fire: *bold*", {
            format: "future-format",
        });
        expect(container.textContent).toBe(":fire: *bold*");
    });
});

describe("RichText — exported helpers", () => {
    test("slackEmojiForName resolves known shortcodes", () => {
        expect(slackEmojiForName("thumbsup")).toBe("👍");
        expect(slackEmojiForName("HEART")).toBe("❤️"); // case-insensitive
    });

    test("slackEmojiForName returns null for unknown shortcodes", () => {
        expect(slackEmojiForName("partyparrot")).toBeNull();
        expect(slackEmojiForName(null)).toBeNull();
        expect(slackEmojiForName(42)).toBeNull();
    });

    test("SLACK_QUICK_REACTION_SHORTCODES contains pickable defaults", () => {
        expect(SLACK_QUICK_REACTION_SHORTCODES).toContain("thumbsup");
        expect(SLACK_QUICK_REACTION_SHORTCODES).toContain("heart");
        expect(SLACK_QUICK_REACTION_SHORTCODES).toContain("tada");
        // Every shortcode in the quick list must resolve to a glyph.
        for (const shortcode of SLACK_QUICK_REACTION_SHORTCODES) {
            expect(slackEmojiForName(shortcode)).not.toBeNull();
        }
    });
});

describe("RichText — defensive input handling", () => {
    test("undefined text renders empty (no crash)", () => {
        const { container } = render(<RichText />);
        expect(container.textContent).toBe("");
    });

    test("null text renders empty", () => {
        const { container } = render(<RichText text={null} />);
        expect(container.textContent).toBe("");
    });

    test("empty string renders empty", () => {
        const { container } = render(<RichText text="" />);
        expect(container.textContent).toBe("");
    });

    test("className passes through to wrapping span", () => {
        const { container } = render(
            <RichText text="hi" className="custom-class" />
        );
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
