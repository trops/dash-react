/**
 * readableError — one plain sentence from whatever a failed call produced:
 * an Error, a raw JSON body, an `{ error: true, status, message }` result,
 * an MCP tool error, or a nested API error object.
 */
import { readableError } from "./readableError";

describe("readableError", () => {
    it("reads the message out of a raw JSON body and explains the status", () => {
        expect(
            readableError(
                '{"message":"Method not allowed with this API key","status":403}'
            )
        ).toBe(
            "Method not allowed with this API key — this key doesn't have permission (403)"
        );
    });

    it("handles an { error, status, message } result whose message is JSON", () => {
        expect(
            readableError({
                error: true,
                status: 404,
                message: '{"message":"Index does not exist","status":404}',
            })
        ).toBe("Index does not exist — not found (404)");
    });

    it("uses an Error's message", () => {
        expect(readableError(new Error("Network unreachable"))).toBe(
            "Network unreachable"
        );
    });

    it("unwraps an Error whose message is a JSON body", () => {
        expect(
            readableError(new Error('{"error":{"message":"Bad token"}}'))
        ).toBe("Bad token");
    });

    it("reads common API shapes", () => {
        expect(
            readableError({
                error: "invalid_grant",
                error_description: "Token expired",
            })
        ).toBe("Token expired");
        expect(readableError({ detail: "Rate limited", status: 429 })).toBe(
            "Rate limited — too many requests, try again shortly (429)"
        );
        expect(readableError({ errors: [{ message: "Field missing" }] })).toBe(
            "Field missing"
        );
        expect(readableError({ error: { message: "Nope", code: 401 } })).toBe(
            "Nope — check the key and its permissions (401)"
        );
        // Algolia sends 401 for a key missing an ACL, not just a bad key.
        expect(
            readableError(
                '{"message":"The provided API key is missing the \\"analytics\\" ACL","status":401}'
            )
        ).toBe(
            'The provided API key is missing the "analytics" ACL — check the key and its permissions (401)'
        );
    });

    it("reads an MCP tool error", () => {
        expect(
            readableError({
                isError: true,
                content: [
                    { type: "text", text: '{"message":"Unknown index"}' },
                ],
            })
        ).toBe("Unknown index");
    });

    it("explains a bare status", () => {
        expect(readableError({ status: 503 })).toBe(
            "The service had an error — try again later (503)"
        );
    });

    it("falls back when there is nothing readable", () => {
        expect(readableError(null, "Search failed")).toBe("Search failed");
        expect(readableError({}, "Search failed")).toBe("Search failed");
        expect(readableError(undefined)).toBe("Something went wrong");
    });

    it("keeps plain text as-is and shortens very long text", () => {
        expect(readableError("Timed out")).toBe("Timed out");
        const long = "x".repeat(500);
        expect(readableError(long).length).toBeLessThanOrEqual(301);
    });
});
