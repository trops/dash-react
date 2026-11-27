#!/usr/bin/env node
/**
 * ESLint with a baseline (DASH-159).
 *
 * Runs ESLint (.eslintrc.json: react + react-hooks) over src/ and compares
 * the problems with scripts/eslint-baseline.json, a count per file and rule
 * of the ones that were already there. Only NEW problems fail: a file/rule
 * count above its baseline, or one that isn't in the baseline at all.
 *
 *   npm run lint                 # check (ci.sh runs this)
 *   npm run lint -- --update     # rewrite the baseline after you FIX problems
 *
 * Never raise the baseline to make a change pass: fix the new problem, or
 * add an `eslint-disable-next-line <rule> -- <why>` comment saying why.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(__dirname, "eslint-baseline.json");
const TARGETS = ["src"];
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

/** ESLint results -> { "src/x.js": { "rule": n } }, sorted. */
function countProblems(results, root = ROOT) {
    const counts = {};
    for (const r of results) {
        for (const m of r.messages) {
            const file = path
                .relative(root, r.filePath)
                .split(path.sep)
                .join("/");
            const rule =
                m.ruleId || (m.fatal ? "fatal-parse-error" : "unknown");
            counts[file] = counts[file] || {};
            counts[file][rule] = (counts[file][rule] || 0) + 1;
        }
    }
    const sorted = {};
    for (const f of Object.keys(counts).sort()) {
        sorted[f] = {};
        for (const k of Object.keys(counts[f]).sort())
            sorted[f][k] = counts[f][k];
    }
    return sorted;
}

/** -> { added: [{file, rule, baseline, now}], fixed: [...] } */
function compare(baseline, current) {
    const added = [];
    const fixed = [];
    const files = new Set([...Object.keys(baseline), ...Object.keys(current)]);
    for (const file of files) {
        const b = baseline[file] || {};
        const c = current[file] || {};
        for (const rule of new Set([...Object.keys(b), ...Object.keys(c)])) {
            const was = b[rule] || 0;
            const now = c[rule] || 0;
            if (now > was) added.push({ file, rule, baseline: was, now });
            else if (now < was) fixed.push({ file, rule, baseline: was, now });
        }
    }
    return { added, fixed };
}

async function main() {
    const update = process.argv.includes("--update");
    const { ESLint } = require("eslint");
    const eslint = new ESLint({ cwd: ROOT, extensions: EXTENSIONS });
    const results = await eslint.lintFiles(TARGETS);
    const current = countProblems(results);

    if (update) {
        fs.writeFileSync(BASELINE, JSON.stringify(current, null, 4) + "\n");
        const total = Object.values(current).reduce(
            (s, r) => s + Object.values(r).reduce((a, b) => a + b, 0),
            0
        );
        console.log(
            `Wrote ${path.relative(ROOT, BASELINE)} (${total} problems).`
        );
        return 0;
    }

    const baseline = fs.existsSync(BASELINE)
        ? JSON.parse(fs.readFileSync(BASELINE, "utf8"))
        : {};
    const { added, fixed } = compare(baseline, current);

    if (added.length) {
        const formatter = await eslint.loadFormatter("stylish");
        const addedFiles = new Set(added.map((a) => a.file));
        const shown = results.filter((r) =>
            addedFiles.has(
                path.relative(ROOT, r.filePath).split(path.sep).join("/")
            )
        );
        console.log(formatter.format(shown));
        console.error(
            "New ESLint problems (more than scripts/eslint-baseline.json allows):"
        );
        for (const a of added) {
            console.error(
                `  ${a.file}  ${a.rule}: ${a.now} (baseline ${a.baseline})`
            );
        }
        console.error(
            "\nFix them (the full list for those files is above). Don't raise the baseline."
        );
        return 1;
    }
    if (fixed.length) {
        console.log(
            `ESLint: ${fixed.length} file/rule count(s) are below the baseline. ` +
                "Run `npm run lint -- --update` and commit scripts/eslint-baseline.json to lock that in."
        );
    }
    console.log("ESLint: no new problems.");
    return 0;
}

module.exports = { countProblems, compare };

if (require.main === module) {
    main().then(
        (code) => process.exit(code),
        (err) => {
            console.error(err);
            process.exit(1);
        }
    );
}
