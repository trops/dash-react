#!/usr/bin/env node
/**
 * test-no-cjs-require-in-dist.js
 *
 * Regression pin: dist/index.js must be pure ESM. Any inline `require(`
 * in the bundled output gets rejected by Node 22+/24's syntax-detected
 * ESM loader with `ReferenceError: require is not defined in ES module
 * scope`. This breaks any consumer that loads the package from a CJS
 * caller (which then triggers Node's loadESMFromCJS path).
 *
 * Source-side fix: convert `require("foo")` → `import ... from "foo"`
 * in any src/ file that ends up in the rolled-up bundle. This test
 * catches regressions before they hit the registry.
 *
 * Run: `node scripts/test-no-cjs-require-in-dist.js`
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert");

const DIST_INDEX = path.join(__dirname, "..", "dist", "index.js");

test("dist/index.js exists (build must run before this test)", () => {
    assert.ok(
        fs.existsSync(DIST_INDEX),
        "dist/index.js missing — run `npm run build` first"
    );
});

test("dist/index.js has no inline require() — must be pure ESM", () => {
    const dist = fs.readFileSync(DIST_INDEX, "utf8");
    // Match `require(` not preceded by a word char so we don't catch
    // `prerequire(`, identifier suffixes, etc. Anything inside string
    // literals is a false positive in principle, but in this codebase
    // the only string-literal `require(` we'd care about would itself
    // be a smell — flag it.
    const matches = dist.match(/(^|[^\w$])require\s*\(/g) || [];
    assert.strictEqual(
        matches.length,
        0,
        `Found ${matches.length} inline require() call(s) in dist/index.js. ` +
            `dash-react bundles must be pure ESM — convert source to ESM ` +
            `imports. Node 22+/24's syntax-detected ESM rejects inline ` +
            `require() with "require is not defined in ES module scope".`
    );
});
