/**
 * RichText — render formatted text from various provider flavors.
 *
 * Pure transform primitive: accepts a string + a `format` flag, returns
 * a `<span>` of properly-formatted React children. No theme tokens
 * are consumed — colors cascade from the parent so RichText drops into
 * any chrome context (light theme, dark theme, panels, tooltips, etc.)
 * without configuration.
 *
 * Why this is a primitive instead of a per-widget util:
 *
 *   - Slack-style widget packs ALL need to render Slack mrkdwn +
 *     emoji shortcodes the way the Slack client does, or message
 *     bodies show up as `:thumbsup: *hello* &gt; quoted` raw garbage
 *     to anyone who uses Slack.
 *   - GitHub / Linear / Notion provider packs will hit the same gap
 *     when they ship widgets that consume markdown-like text.
 *   - Duplicating the tokenizer per pack is a maintenance time bomb;
 *     the self-contained-widget-package rule applies to runtime
 *     dependencies, not primitives — primitives are exactly the right
 *     place for shared rendering logic that themes correctly.
 *
 * v1 ships only `format="slack"` since that's the only flavor we have
 * a real caller for. The `format` prop reserves room for `"markdown"`,
 * `"plaintext"`, etc. later without an API break.
 *
 * Slack mrkdwn supported:
 *
 *   - HTML entities (`&gt;` → `>`, `&amp;` → `&`, `&lt;`, `&quot;`,
 *     `&#39;`, `&#x27;`) — the Slack API HTML-escapes these on the wire.
 *   - `:emoji_name:` → Unicode glyph via a built-in ~80-entry table of
 *     the most common reactions. Unknown shortcodes fall through as
 *     literal `:name:` so callers can see what's missing and ask for
 *     a table extension.
 *   - `*bold*` / `_italic_` / `` `code` `` / `~strike~` inline
 *     formatting.
 *   - `<@U123|name>` / `<#C123|name>` → labeled spans.
 *   - `<https://example.com|click here>` / `<https://example.com>` →
 *     anchor tags.
 *
 * Out of scope for v1 (track separately if a caller needs them):
 *
 *   - Block-quote (`>quoted` lines) — rarely emitted by tool output.
 *   - Triple-backtick code blocks — same.
 *   - Workspace-custom emoji — needs a `resolver` prop hook.
 *   - HTML output (we return React; if anyone needs an HTML string,
 *     add a separate exported helper later).
 */

import React from "react";

const SLACK_EMOJI = {
    thumbsup: "👍",
    "+1": "👍",
    thumbsdown: "👎",
    "-1": "👎",
    raised_hands: "🙌",
    clap: "👏",
    pray: "🙏",
    muscle: "💪",
    ok_hand: "👌",
    point_up: "👆",
    point_down: "👇",
    point_left: "👈",
    point_right: "👉",
    wave: "👋",
    heart: "❤️",
    red_heart: "❤️",
    blue_heart: "💙",
    green_heart: "💚",
    yellow_heart: "💛",
    purple_heart: "💜",
    orange_heart: "🧡",
    black_heart: "🖤",
    tada: "🎉",
    confetti_ball: "🎊",
    sparkles: "✨",
    star: "⭐",
    star2: "🌟",
    fire: "🔥",
    rocket: "🚀",
    zap: "⚡",
    boom: "💥",
    white_check_mark: "✅",
    check: "✅",
    heavy_check_mark: "✔️",
    x: "❌",
    no_entry: "⛔",
    warning: "⚠️",
    bulb: "💡",
    eyes: "👀",
    thinking_face: "🤔",
    thinking: "🤔",
    shrug: "🤷",
    smile: "😄",
    smiley: "😃",
    grin: "😁",
    laughing: "😆",
    joy: "😂",
    rofl: "🤣",
    wink: "😉",
    blush: "😊",
    sunglasses: "😎",
    cool: "😎",
    cry: "😢",
    sob: "😭",
    confused: "😕",
    expressionless: "😑",
    neutral_face: "😐",
    upside_down_face: "🙃",
    angry: "😠",
    rage: "😡",
    sleeping: "😴",
    clipboard: "📋",
    computer: "💻",
    bug: "🐛",
    ship: "🚢",
    tools: "🛠️",
    hammer: "🔨",
    wrench: "🔧",
    gear: "⚙️",
    package: "📦",
    email: "📧",
    envelope: "✉️",
    bell: "🔔",
    mega: "📣",
    speech_balloon: "💬",
    loudspeaker: "📢",
    coffee: "☕",
    pizza: "🍕",
    cake: "🍰",
    beer: "🍺",
    bookmark: "🔖",
    book: "📖",
    chart_with_upwards_trend: "📈",
    chart_with_downwards_trend: "📉",
    moneybag: "💰",
    lock: "🔒",
    unlock: "🔓",
    key: "🔑",
    calendar: "📅",
    clock: "🕐",
    100: "💯",
};

function decodeEntitiesAndEmoji(text, emojiTable) {
    if (typeof text !== "string") return "";
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/:([a-z0-9_+\-]+):/gi, (match, name) => {
            return emojiTable[name.toLowerCase()] || match;
        });
}

// Two-pass tokenizer. Angle-bracket Slack escapes (mentions, channels,
// URLs) come out of Slack as literal `<@U123>` / `<#C123>` /
// `<https://…>` and we resolve them first so the inline pass below
// doesn't accidentally treat the angle brackets as anything else.
// Then inline formatting (`*bold*` etc) runs on the remaining text
// segments. Nested formatting (`*bold _italic_ bold*`) renders as the
// outer formatting only — matches Slack's actual mrkdwn behavior.

const INLINE_PATTERNS = [
    { type: "bold", regex: /\*([^*\n]+)\*/ },
    { type: "italic", regex: /(?<![\w])_([^_\n]+)_(?![\w])/ },
    { type: "code", regex: /`([^`\n]+)`/ },
    { type: "strike", regex: /~([^~\n]+)~/ },
];

const ANGLE_PATTERN = /<([@#!])?([^|>]+?)(?:\|([^>]+))?>/g;

function tokenizeAngles(text) {
    const tokens = [];
    let last = 0;
    for (const match of text.matchAll(ANGLE_PATTERN)) {
        const whole = match[0];
        const prefix = match[1];
        const target = match[2];
        const label = match[3];
        if (match.index > last) {
            tokens.push({ type: "text", value: text.slice(last, match.index) });
        }
        if (prefix === "@") {
            tokens.push({
                type: "mention",
                value: label ? `@${label}` : `@${target}`,
            });
        } else if (prefix === "#") {
            tokens.push({
                type: "channel",
                value: label ? `#${label}` : `#${target}`,
            });
        } else if (prefix === "!") {
            tokens.push({ type: "mention", value: `@${target}` });
        } else {
            tokens.push({
                type: "link",
                value: label || target,
                href: target,
            });
        }
        last = match.index + whole.length;
    }
    if (last < text.length) {
        tokens.push({ type: "text", value: text.slice(last) });
    }
    return tokens.length > 0 ? tokens : [{ type: "text", value: text }];
}

function tokenizeInline(text) {
    let earliest = null;
    for (const { type, regex } of INLINE_PATTERNS) {
        const m = text.match(regex);
        if (m && (earliest === null || m.index < earliest.match.index)) {
            earliest = { type, match: m };
        }
    }
    if (!earliest) return [{ type: "text", value: text }];
    const { type, match } = earliest;
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + match[0].length);
    return [
        ...(before ? tokenizeInline(before) : []),
        { type, value: match[1] },
        ...(after ? tokenizeInline(after) : []),
    ];
}

function tokenize(text) {
    const angles = tokenizeAngles(text);
    const flat = [];
    for (const tok of angles) {
        if (tok.type === "text") {
            flat.push(...tokenizeInline(tok.value));
        } else {
            flat.push(tok);
        }
    }
    return flat;
}

function renderToken(tok, i) {
    switch (tok.type) {
        case "bold":
            return (
                <strong key={i} className="font-semibold">
                    {tok.value}
                </strong>
            );
        case "italic":
            return (
                <em key={i} className="italic">
                    {tok.value}
                </em>
            );
        case "strike":
            return (
                <span key={i} className="line-through">
                    {tok.value}
                </span>
            );
        case "code":
            return (
                <code key={i} className="font-mono text-xs px-1 py-0.5 rounded">
                    {tok.value}
                </code>
            );
        case "mention":
        case "channel":
            return (
                <span key={i} className="font-medium">
                    {tok.value}
                </span>
            );
        case "link":
            return (
                <a key={i} href={tok.href || tok.value} className="underline">
                    {tok.value}
                </a>
            );
        default:
            return <span key={i}>{tok.value}</span>;
    }
}

/**
 * Render formatted text.
 *
 * @param {string} text — the raw text to render
 * @param {"slack"} [format="slack"] — flavor; only "slack" ships in v1
 * @param {string} [className] — passed through to the wrapping `<span>`
 *
 * Returns a `<span>` so the rendered text inlines into surrounding
 * prose rather than starting a block.
 */
export function RichText({ text, format = "slack", className }) {
    if (format !== "slack") {
        // Reserved for future flavors. Pass through as-is until those
        // exist so callers don't blow up if they preemptively set the
        // prop in anticipation.
        return <span className={className}>{text}</span>;
    }
    const decoded = decodeEntitiesAndEmoji(text || "", SLACK_EMOJI);
    const tokens = tokenize(decoded);
    return (
        <span className={className}>
            {tokens.map((tok, i) => renderToken(tok, i))}
        </span>
    );
}

/**
 * Resolve a Slack emoji shortcode to its Unicode glyph, or null if the
 * shortcode isn't in our table. Useful for picker UIs (e.g. reaction
 * palettes) that render the glyph at button size with the name as a
 * label or aria-label.
 */
export function slackEmojiForName(name) {
    if (typeof name !== "string") return null;
    return SLACK_EMOJI[name.toLowerCase()] || null;
}

/**
 * The default set of Slack emoji shortcodes for quick-reaction
 * pickers. Tuned to the set people actually use as Slack reactions —
 * not a random sample of the emoji table.
 */
export const SLACK_QUICK_REACTION_SHORTCODES = [
    "thumbsup",
    "heart",
    "tada",
    "rocket",
    "eyes",
    "thinking_face",
    "fire",
    "white_check_mark",
];
