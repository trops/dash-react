/**
 * Pin (DASH-163): the release commits only named files, never `git add -u`.
 * ci.sh records the files changed before validation runs and hands them to
 * scripts/release.js with --files-from, so nothing validation rewrites can
 * slip into a release commit. Same rule as dash-core's and dash-electron's
 * test-untracked-sources-pin.js.
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const read = (f) => fs.readFileSync(path.join(__dirname, f), "utf8");

test("release.js stages named files, never `git add -u`", () => {
    const src = read("release.js");
    assert.ok(
        /run\("git",\s*\["add",\s*"--",\s*\.\.\.files\]\)/.test(src),
        "release.js must stage its named files with `git add -- ...files`"
    );
    assert.ok(
        !/\["add",\s*"-u"\]/.test(src),
        "release.js must not stage with `git add -u`"
    );
});

test("ci.sh passes the files changed before validation as --files-from", () => {
    const ci = read("ci.sh");
    const listAt = ci.search(
        /git diff --name-only --no-renames HEAD > "\$CHANGED_LIST"/
    );
    const validateAt = ci.indexOf("# VALIDATION STEPS");
    assert.ok(listAt !== -1, "ci.sh must write $CHANGED_LIST");
    assert.ok(
        listAt < validateAt,
        "ci.sh must write $CHANGED_LIST before validating"
    );
    assert.ok(
        /node scripts\/release\.js[^\n]*\\\n\s*--files-from "\$CHANGED_LIST"/.test(
            ci
        ),
        'ci.sh must call release.js with --files-from "$CHANGED_LIST"'
    );
    assert.ok(
        !/git add -u\b/.test(ci.replace(/^#.*$/gm, "")),
        "ci.sh must not run `git add -u`"
    );
});
