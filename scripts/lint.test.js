// Tests for scripts/lint.js's baseline logic (DASH-159). Run: node --test scripts/lint.test.js
const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const { countProblems, compare } = require("./lint.js");

const root = path.resolve("/repo");
const result = (file, rules) => ({
    filePath: path.join(root, file),
    messages: rules.map((ruleId) => ({ ruleId })),
});

test("countProblems counts per file and rule", () => {
    const counts = countProblems(
        [
            result("src/B.js", ["react/display-name", "react/display-name"]),
            result("src/A.js", ["react-hooks/exhaustive-deps"]),
            result("src/C.js", []),
        ],
        root
    );
    assert.deepStrictEqual(counts, {
        "src/A.js": { "react-hooks/exhaustive-deps": 1 },
        "src/B.js": { "react/display-name": 2 },
    });
});

test("countProblems names parse errors", () => {
    const counts = countProblems(
        [
            {
                filePath: path.join(root, "src/X.js"),
                messages: [{ ruleId: null, fatal: true }],
            },
        ],
        root
    );
    assert.deepStrictEqual(counts, { "src/X.js": { "fatal-parse-error": 1 } });
});

test("compare: same counts pass", () => {
    const b = { "src/A.js": { r: 2 } };
    assert.deepStrictEqual(compare(b, { "src/A.js": { r: 2 } }), {
        added: [],
        fixed: [],
    });
});

test("compare: a count above the baseline is new", () => {
    const { added } = compare(
        { "src/A.js": { r: 1 } },
        { "src/A.js": { r: 2 } }
    );
    assert.deepStrictEqual(added, [
        { file: "src/A.js", rule: "r", baseline: 1, now: 2 },
    ]);
});

test("compare: a new rule or file is new", () => {
    const { added } = compare(
        { "src/A.js": { r: 1 } },
        { "src/A.js": { r: 1, s: 1 }, "src/B.js": { r: 1 } }
    );
    assert.strictEqual(added.length, 2);
});

test("compare: fewer problems are reported as fixed, not failed", () => {
    const { added, fixed } = compare({ "src/A.js": { r: 3 } }, {});
    assert.strictEqual(added.length, 0);
    assert.deepStrictEqual(fixed, [
        { file: "src/A.js", rule: "r", baseline: 3, now: 0 },
    ]);
});
