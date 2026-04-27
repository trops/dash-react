/**
 * Dispatch an onChange callback in a way that supports both signatures:
 *
 *   - dash-style:        (value, event) => ...
 *   - React-idiomatic:   (event) => event.target.value
 *
 * The dash inputs (InputText / TextArea / SearchInput) historically passed
 * the unwrapped string value as the first arg. AI-generated widget code,
 * trained on plain React, almost always writes `(e) => e.target.value`
 * instead — which throws "Cannot read properties of undefined (reading
 * 'value')" because `e` is the string and `e.target` is undefined.
 *
 * To support both without a breaking change we inspect the handler's
 * source once per call: if it accesses `.target`, route the raw event
 * (React-idiomatic); otherwise pass `(value, event)` (legacy dash style).
 * Property names survive minification, so the check works on bundled
 * code too.
 */
export function dispatchInputChange(handler, event) {
    if (typeof handler !== "function") return;
    let source = "";
    try {
        source = handler.toString();
    } catch {
        // Bound or native functions throw — fall through as value-style.
    }
    if (/\.target\b/.test(source)) {
        handler(event);
    } else {
        handler(event.target.value, event);
    }
}
