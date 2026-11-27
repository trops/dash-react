#!/bin/bash
set -euo pipefail

# ============================================================================
# Local CI Script
# Runs the full validation pipeline and optionally handles git workflow.
#
# Usage:
#   ./scripts/ci.sh                           # validate only
#   ./scripts/ci.sh --commit -m "message"     # validate + commit + bump
#   ./scripts/ci.sh --push -m "message"       # above + push
#   ./scripts/ci.sh --pr -m "message"         # above + create PR
#   ./scripts/ci.sh --release -m "message"    # above + merge + tag + cleanup
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

# --- Parse arguments ---
MODE="validate"
COMMIT_MSG=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --commit) MODE="commit"; shift ;;
        --push)   MODE="push";   shift ;;
        --pr)     MODE="pr";     shift ;;
        --release) MODE="release"; shift ;;
        -m)
            shift
            COMMIT_MSG="$*"
            break
            ;;
        *)
            echo "Unknown argument: $1"
            exit 1
            ;;
    esac
done

if [[ "$MODE" != "validate" && -z "$COMMIT_MSG" ]]; then
    echo "Error: -m \"message\" is required with --commit, --push, --pr, or --release"
    exit 1
fi

# --- Helper ---
step() {
    echo ""
    echo "=====> $1"
    echo ""
}

# ============================================================================
# VALIDATION STEPS
# ============================================================================

# 1. Ensure Node 20 via nvm (on GitHub Actions the workflow sets up Node)
if [[ -n "${GITHUB_ACTIONS:-}" ]]; then
    step "Using the runner's Node (GitHub Actions)"
else
    step "Ensuring Node 20 via nvm"
    unset npm_config_prefix
    export NVM_DIR="$HOME/.nvm"
    if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
        echo "Error: nvm not found at $NVM_DIR/nvm.sh"
        exit 1
    fi
    source "$NVM_DIR/nvm.sh" --no-use
    nvm use --delete-prefix v20.20.0
fi
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# 2. Formatting check (DASH-155). Validation must not rewrite tracked files:
# the release step commits with `git add -u`, so a `--write` here used to
# sweep reformatted, out-of-plan files into the commit. Fix with
# `npm run prettify`, then run again.
step "Checking formatting (Prettier)"
if ! npx prettier --check .; then
    echo ""
    echo "Error: the files above aren't Prettier-formatted. Run \`npm run prettify\` and commit the result."
    exit 1
fi

# 2a. ESLint (react, react-hooks) against scripts/eslint-baseline.json
# (DASH-159): only problems the baseline doesn't already count fail.
step "Running ESLint (new problems only)"
npm run lint
node --test scripts/lint.test.js

# 2b. Unit tests (DASH-155: `npm test` now runs jest, so dash-check's
# node.testsPass and plain `npm test` see the real suite).
step "Running Jest tests"
npm test

# 2c. The release script (DASH-48): resumable, worktree-safe git workflow.
step "Testing the release script"
node --test scripts/release.test.js

# 3. Build with Rollup, then copy in the rest of the published files, the
# same steps the release workflow runs before `npm publish`. dist/ isn't
# tracked (DASH-155), so this is the only thing that makes it.
step "Building library with Rollup"
npm run clean-dist
NODE_ENV=prod npx rollup -c
npm run copy

# 4. Verify the published files
step "Verifying build output"
for f in dist/index.js dist/index.css dist/tailwind.css dist/designSystem.css dist/aurora-palette.cjs dist/package.json; do
    if [[ ! -s "$f" ]]; then
        echo "Error: $f not found or empty"
        exit 1
    fi
    echo "OK: $f ($(ls -lh "$f" | awk '{print $5}'))"
done

# 5. Pin: dist must be pure ESM (no inline require()).
# Node 22+/24's syntax-detected ESM rejects inline require() in modules
# with top-level import syntax. Catch at build time.
step "Verifying dist is pure ESM"
node --test scripts/test-no-cjs-require-in-dist.js

# 6. Create package. Start from an empty package/ so the check below sees
# this run's tarball, not one left over from an earlier run (a stale
# package/trops-dash-react.tgz made this pass while npm pack actually writes
# trops-dash-react-<version>.tgz; a fresh checkout, like PR CI, failed).
step "Creating npm package"
rm -rf package
npm run pack-local-esm

# 6. Verify package
PACKED="$(ls package/trops-dash-react-*.tgz 2>/dev/null | head -1)"
if [[ -z "$PACKED" || ! -s "$PACKED" ]]; then
    echo "Error: npm pack wrote no package/trops-dash-react-*.tgz"
    exit 1
fi
echo "OK: $PACKED ($(ls -lh "$PACKED" | awk '{print $5}'))"

echo ""
echo "All validation steps passed."

# If validate-only, we're done
if [[ "$MODE" == "validate" ]]; then
    exit 0
fi

# ============================================================================
# GIT WORKFLOW (DASH-48: scripts/release.js)
# ============================================================================
# Resumable: after --pr, run --release on the same branch to merge, tag and
# clean up. Safe to run again. Works in a git worktree.

export RELEASE_PR_BODY="## Summary
$COMMIT_MSG

Version: {{VERSION}}

## Validation
- Prettier check: passed
- ESLint (vs baseline): passed
- Jest tests: passed
- Rollup build: passed
- Output verification: passed
- Package creation: passed"

node scripts/release.js --mode "$MODE" -m "$COMMIT_MSG" --main main
