/**
 * useLazyEnrichment
 *
 * Fan out one async fetch per item to backfill information that's
 * missing from a list payload — without blocking initial render,
 * without N+1-storming the network, and without painting stale data
 * if the caller switches context mid-fetch.
 *
 * Originally extracted from `@ai-built/slack-pack`'s SlackWidget,
 * where channel-history messages arrive without `replyCount` so the
 * widget enriches per parent via `conversations_replies`. The same
 * pattern applies anywhere a list endpoint omits per-item details
 * that a secondary endpoint can fill in.
 *
 * @example
 *   const { enrichments, loading, errors } = useLazyEnrichment({
 *       items: messages,
 *       keyOf: (m) => m.msgID,
 *       shouldEnrich: (m) => !!m.threadTs,
 *       fetcher: (m) =>
 *           callTool("conversations_replies", {
 *               channel_id: channelId,
 *               thread_ts: m.threadTs,
 *           }),
 *       deps: [channelId],
 *   });
 *
 *   // Render enrichments.get(msg.msgID) per row.
 *
 * Guarantees:
 *   1. Each unique key is fetched at most once per `deps` window.
 *   2. Caller-provided `keyOf` / `shouldEnrich` / `fetcher` do NOT
 *      need useCallback memoization — internal refs always use the
 *      latest version.
 *   3. When `deps` change, the result Map is cleared AND any
 *      in-flight fetches' results are dropped on arrival (stale-write
 *      guard via a depsRef snapshot).
 *   4. Concurrency is bounded (default 6 parallel fetches) so we
 *      don't hammer rate-limited providers.
 */
import { useState, useEffect, useRef } from "react";

async function runWithConcurrency(items, worker, concurrency) {
    const out = new Array(items.length);
    let next = 0;
    async function run() {
        while (next < items.length) {
            const idx = next++;
            try {
                out[idx] = {
                    status: "fulfilled",
                    value: await worker(items[idx]),
                };
            } catch (err) {
                out[idx] = { status: "rejected", reason: err };
            }
        }
    }
    const workerCount = Math.max(1, Math.min(concurrency, items.length));
    const workers = Array.from({ length: workerCount }, run);
    await Promise.all(workers);
    return out;
}

export function useLazyEnrichment({
    items,
    keyOf,
    shouldEnrich,
    fetcher,
    concurrency = 6,
    deps = [],
}) {
    const [enrichments, setEnrichments] = useState(() => new Map());
    const [errors, setErrors] = useState(() => new Map());
    const [loading, setLoading] = useState(() => new Set());

    // Callback refs — callers don't need to useCallback.
    const keyOfRef = useRef(keyOf);
    keyOfRef.current = keyOf;
    const shouldEnrichRef = useRef(shouldEnrich);
    shouldEnrichRef.current = shouldEnrich;
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    // Stringify deps so the comparison is a single primitive. Callers
    // who pass complex objects in deps should expect JSON-stringify
    // semantics — primitives + plain objects compare fine, functions
    // and class instances don't.
    const depsKey = JSON.stringify(deps);
    const depsRef = useRef(depsKey);

    // Reset everything when deps change.
    useEffect(() => {
        depsRef.current = depsKey;
        setEnrichments(new Map());
        setErrors(new Map());
        setLoading(new Set());
    }, [depsKey]);

    useEffect(() => {
        if (!Array.isArray(items) || items.length === 0) return undefined;
        if (typeof keyOfRef.current !== "function") return undefined;
        if (typeof fetcherRef.current !== "function") return undefined;

        const filter =
            typeof shouldEnrichRef.current === "function"
                ? shouldEnrichRef.current
                : () => true;

        const myDeps = depsRef.current;

        const toFetch = items.filter((item) => {
            try {
                if (!filter(item)) return false;
            } catch {
                return false;
            }
            let k;
            try {
                k = keyOfRef.current(item);
            } catch {
                return false;
            }
            if (k === null || k === undefined) return false;
            if (enrichments.has(k)) return false;
            if (loading.has(k)) return false;
            return true;
        });
        if (toFetch.length === 0) return undefined;

        setLoading((prev) => {
            const next = new Set(prev);
            for (const item of toFetch) {
                try {
                    next.add(keyOfRef.current(item));
                } catch {
                    /* skip */
                }
            }
            return next;
        });

        let cancelled = false;
        (async () => {
            const results = await runWithConcurrency(
                toFetch,
                (item) => fetcherRef.current(item),
                concurrency
            );
            if (cancelled) return;
            // Stale-write guard: a deps change while we were fetching
            // means a previous-context's result; drop it.
            if (depsRef.current !== myDeps) return;

            const okMap = new Map();
            const errMap = new Map();
            for (let i = 0; i < toFetch.length; i++) {
                let k;
                try {
                    k = keyOfRef.current(toFetch[i]);
                } catch {
                    continue;
                }
                const r = results[i];
                if (r.status === "fulfilled") okMap.set(k, r.value);
                else errMap.set(k, r.reason);
            }

            if (okMap.size > 0) {
                setEnrichments((prev) => {
                    const next = new Map(prev);
                    for (const [k, v] of okMap) next.set(k, v);
                    return next;
                });
            }
            if (errMap.size > 0) {
                setErrors((prev) => {
                    const next = new Map(prev);
                    for (const [k, v] of errMap) next.set(k, v);
                    return next;
                });
            }
            setLoading((prev) => {
                const next = new Set(prev);
                for (const item of toFetch) {
                    try {
                        next.delete(keyOfRef.current(item));
                    } catch {
                        /* skip */
                    }
                }
                return next;
            });
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, depsKey, concurrency]);

    return { enrichments, loading, errors };
}
