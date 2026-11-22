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

# 2. Prettify
step "Running Prettier"
npx prettier --write .

# 2b. Unit tests. `npm test` is a no-op ("exit 0"), so call the jest script
# directly — without this step, failing jest suites shipped unnoticed.
step "Running Jest tests"
npm run test-jest

# 2c. The release script (DASH-48): resumable, worktree-safe git workflow.
step "Testing the release script"
node --test scripts/release.test.js

# 3. Build with Rollup
step "Building library with Rollup"
NODE_ENV=prod npx rollup -c

# 4. Verify dist/index.js
step "Verifying build output"
if [[ ! -s "dist/index.js" ]]; then
    echo "Error: dist/index.js not found or empty"
    exit 1
fi
echo "OK: dist/index.js ($(ls -lh dist/index.js | awk '{print $5}'))"

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
- Prettier: passed
- Jest tests: passed
- Rollup build: passed
- Output verification: passed
- Package creation: passed"

node scripts/release.js --mode "$MODE" -m "$COMMIT_MSG" --main main
