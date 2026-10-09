/**
 * readableError — turn whatever a failed call produced into one plain
 * sentence for the user.
 *
 *   setError(readableError(err, "Search failed"));
 *
 * Accepts an Error, a string (a raw JSON response body is parsed), an
 * `{ error: true, status, message }` result, an MCP tool error
 * (`{ isError, content: [{ text }] }`), or a nested API error object
 * (`message`, `error`, `error_description`, `detail`, `errors[0]`). Common
 * HTTP statuses get a short reason: "… — this key doesn't have permission
 * (403)".
 */

const STATUS_REASONS = {
    400: "the request wasn't accepted",
    401: "check the key and its permissions",
    403: "this key doesn't have permission",
    404: "not found",
    408: "the request timed out",
    409: "it conflicts with the current state",
    413: "the request is too large",
    422: "the request wasn't accepted",
    429: "too many requests, try again shortly",
};

const MAX_LENGTH = 300;

function parseJson(text) {
    const t = text.trim();
    if (!(t.startsWith("{") || t.startsWith("["))) return undefined;
    try {
        return JSON.parse(t);
    } catch {
        return undefined;
    }
}

function statusOf(value) {
    if (!value || typeof value !== "object") return null;
    const s = value.status ?? value.statusCode ?? value.code;
    const n = Number(s);
    return Number.isInteger(n) && n >= 100 && n < 600 ? n : null;
}

// Find the most specific message and status in a value (depth-limited).
function extract(value, depth = 0) {
    if (value == null || depth > 4) return { message: null, status: null };
    if (typeof value === "string") {
        const parsed = parseJson(value);
        if (parsed !== undefined) return extract(parsed, depth + 1);
        return { message: value.trim() || null, status: null };
    }
    if (value instanceof Error) {
        const inner = extract(value.message, depth + 1);
        return {
            message: inner.message,
            status: inner.status ?? statusOf(value),
        };
    }
    if (Array.isArray(value)) {
        return value.length
            ? extract(value[0], depth + 1)
            : { message: null, status: null };
    }
    if (typeof value !== "object")
        return { message: String(value), status: null };

    const status = statusOf(value);
    // MCP tool error: { isError, content: [{ type: "text", text }] }
    if (Array.isArray(value.content)) {
        const text = value.content
            .filter((c) => c && typeof c.text === "string")
            .map((c) => c.text)
            .join(" ");
        if (text) {
            const inner = extract(text, depth + 1);
            return { message: inner.message, status: inner.status ?? status };
        }
    }
    const candidates = [
        value.error_description,
        typeof value.error === "object" ? value.error : null,
        value.message,
        value.detail,
        value.errors,
        typeof value.error === "string" ? value.error : null,
    ];
    for (const c of candidates) {
        if (c == null || c === "") continue;
        const inner = extract(c, depth + 1);
        if (inner.message)
            return { message: inner.message, status: inner.status ?? status };
    }
    return { message: null, status };
}

export function readableError(error, fallback = "Something went wrong") {
    const { message, status } = extract(error);
    const reason =
        status == null
            ? null
            : STATUS_REASONS[status] ||
              (status >= 500
                  ? "the service had an error — try again later"
                  : null);
    let text;
    if (message && reason) text = `${message} — ${reason}`;
    else if (message) text = message;
    else if (reason) text = reason.charAt(0).toUpperCase() + reason.slice(1);
    else return fallback;
    if (status != null && reason) text = `${text} (${status})`;
    return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;
}
