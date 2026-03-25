# dash-react — Dashboard UI Component Library

> **THIS FILE IS A PROTOCOL, NOT DOCUMENTATION.**
> Every section marked MANDATORY must be followed in order, without exception.
> If anything is unclear — requirements, file locations, which repo to change —
> **ASK before proceeding. Do not infer. Do not improvise.**

---

## MANDATORY: Before Any Code Changes

These steps are NON-NEGOTIABLE and must happen in this exact order before writing any code:

1. Sync dash-react (this repo):

    ```bash
    git checkout main && git pull origin main
    ```

2. Locate and sync sibling repos:

    ```bash
    REPO_ROOT="$(git rev-parse --show-toplevel)"
    DASH_CORE="$(find "$(dirname "$REPO_ROOT")" -maxdepth 3 -name "package.json" | xargs grep -l '"name": "@trops/dash-core"' 2>/dev/null | head -1 | xargs dirname)"
    DASH_ELECTRON="$(find "$(dirname "$REPO_ROOT")" -maxdepth 3 -name "package.json" | xargs grep -l '"name": "dash-electron"' 2>/dev/null | head -1 | xargs dirname)"
    echo "dash-core:     $DASH_CORE"
    echo "dash-electron: $DASH_ELECTRON"
    ```

    If either is not found, **STOP and ask the user where the repo is cloned.** Do not assume a path.

3. Pull latest in each found sibling repo:

    ```bash
    cd "$DASH_CORE" && git pull origin master
    cd "$DASH_ELECTRON" && git pull origin master
    ```

4. Return to this repo and create a feature branch:
    ```bash
    cd "$REPO_ROOT"
    git checkout -b feat/<TICKET-KEY>-<slug>
    ```

**If any pull fails: STOP. Report the exact error. Do not proceed.**

---

## MANDATORY: PRD Gate

Before writing any code for a feature:

1. Run:
    ```bash
    ls docs/requirements/prd/
    ```
2. If a relevant PRD exists, read it fully before proceeding.
3. For framework features, also check dash-core PRDs by discovering dash-core using the repo discovery protocol above.
4. Confirm to the user: "Read PRD: `<filename>`" or "No relevant PRD found."
5. Do not start implementation until this confirmation is given.

---

## MANDATORY: PRD Management

When implementing a new feature or significant enhancement:

1. **Check for existing PRD:** Check `docs/requirements/prd/` in this repo. For framework
   features, also check dash-core's `docs/requirements/prd/`.
2. **If a PRD exists:** Read it fully. Update its status, acceptance criteria, and implementation
   notes to reflect the current work. Do not create a duplicate.
3. **If no PRD exists:** Create one manually from the template at `docs/requirements/PRD-TEMPLATE.md`.
   At minimum, fill in: Executive Summary, Problem Statement, and User Stories with acceptance criteria.
4. **After implementation:** Update the PRD with implementation notes, lessons learned,
   and correct status (Draft -> In Progress -> Implemented).

Bug fixes and single-file changes do not require a PRD.
Cross-repo features: the PRD lives in the repo that owns the primary implementation.

### Documentation Hierarchy

```
PRDs (requirements) -> Architecture Docs (design) -> Implementation Guides (code)
```

**PRDs answer:**

- **Why** are we building this component? (Consumer needs, design goals)
- **Who** is it for? (Library consumers, use cases)
- **What** defines success? (API design criteria, adoption metrics)
- **When** should it be prioritized? (Implementation phases)

**Technical docs answer:**

- **How** is it built? (Implementation patterns, code structure)
- **Where** is the code? (Source file locations)
- **What** are the APIs? (Component props, hooks, utilities)

### Creating New PRDs (Library Context)

PRDs for dash-react focus on component API design and consumer needs:

- Component families (e.g., new Chart components)
- Theme system enhancements
- Breaking API changes requiring migration

See [docs/requirements/README.md](docs/requirements/README.md) for:

- When to create library PRDs
- Library-specific PRD considerations
- API design goals and success metrics

**Note:** For application-level PRDs (features in Dash app), see the [dash-electron project requirements](../../dash-electron/dash-electron/docs/requirements/).

---

## MANDATORY: Development Phases

These four phases are sequential and cannot be skipped, combined, or reordered.

### Phase 1 — PLAN

1. State the task in one sentence.
2. List every file that will be created or modified.
3. List any dependencies that will be added.
4. Identify risks, ambiguities, or cross-repo implications.
5. Explicitly state whether this change has downstream effects on dash-core or dash-electron.
6. **Wait for explicit user approval before writing a single line of code.**
   Acceptable approvals: "proceed", "looks good", "go ahead".
   Silence is NOT approval.

### Phase 2 — IMPLEMENT

1. Make only the changes listed in the approved plan.
2. Do not refactor, rename, or "improve" anything outside the plan.
3. Do not add dependencies not listed in the plan.
4. Run Prettier when done:
    ```bash
    npm run prettify
    ```
5. Fix any Prettier errors before proceeding.
6. Stage any new (untracked) files created in this phase before proceeding to Phase 3:
    ```bash
    git add <each new file explicitly by path>
    ```

### Phase 3 — VALIDATE

1. Run the full CI validation:
    ```bash
    npm run ci
    ```
2. If it fails, fix the errors and re-run. Do not proceed with a failing build.
3. Do not mark this phase complete until `npm run ci` exits cleanly.
4. Verify build output files exist:
    ```bash
    ls dist/index.js dist/tailwind.css
    ```
    If any file is missing, the build silently failed — treat this as a CI failure.
5. **If you cannot make CI pass: STOP. Report the exact output. Do not proceed.**

### Phase 4 — RELEASE

1. Use the CI script — **this is the only approved release path**:
    ```bash
    npm run ci:release -- -m "type(scope): description"
    ```
2. Do not manually construct `git commit`, `git push`, `git tag`, or `gh pr` commands.
   Manual git commands outside of `ci.sh` are not permitted.
3. Confirm to the user: "Released. Commit: `<hash>` pushed to `<branch>`."

---

## MANDATORY: Cross-Repo Changes

dash-react is a peer dependency of dash-core and consumed by dash-electron. Changes here
have downstream consequences. The mandatory order is:

1. Sync ALL repos first (see Mandatory Pre-Work above).
2. Make and validate changes in dash-react **first**.
3. Run `npm run ci` in dash-react and confirm it passes.
4. If the change affects dash-core, apply and validate those changes next.
5. Only then update dash-electron to consume the new version.
6. Never modify dash-core or dash-electron to work around a missing dash-react change — fix it at the source.

---

## NON-NEGOTIABLE RULES

- **Never skip a phase.** Even if the task "seems simple."
- **Never combine phases.** Do not implement and validate in the same step.
- **Never push directly to main.** Always use feature branches and PRs via `ci:release`.
- **Never use `git push --force` or `git reset --hard`.**
- **Never use `git add .` or `git add -A`.** Stage only the files changed in Phase 2.
- **When in doubt, ask.** Do not infer requirements. Do not improvise solutions.
- **If a command fails, stop.** Report the exact error output. Do not attempt workarounds.

---

## ci.sh — The Only Approved Release Path

The `scripts/ci.sh` script handles the full pipeline: Node 20 via nvm, Prettier,
Tailwind CSS, Rollup build, output verification, package creation, commit, version bump,
push, PR, merge, tag, and cleanup.

```bash
# Validate only
npm run ci

# Validate + commit + version bump
npm run ci:commit -- -m "Your commit message"

# Above + push branch
npm run ci:push -- -m "Your commit message"

# Above + create PR
npm run ci:pr -- -m "Your commit message"

# Above + merge PR + tag + cleanup
npm run ci:release -- -m "Your commit message"
```

Each flag is cumulative. `--release` runs all prior steps automatically.

---

## ThemeContext Import Rule

**ThemeContext** must ALWAYS be imported from `@trops/dash-react`, never from a local file.
Importing from a local file creates a duplicate React context instance that won't receive
theme updates from consuming applications.

```javascript
// CORRECT — consuming apps import from the package
import { ThemeContext } from "@trops/dash-react";

// WRONG — creates separate context
import { ThemeContext } from "./Context/ThemeContext";
```

---

### Visual Inspection

When changes affect rendered UI, validate visually using Storybook:

```bash
npm run storybook
```

Verify components render correctly with proper theming, interactive states, and no console errors.

---

## Code Style

- **Formatting:** Prettier (`.prettierrc`), 4-space indentation
- **Components:** PascalCase (`Panel.js`)
- **Utilities:** camelCase (`colors.js`)
- **Constants:** SCREAMING_SNAKE_CASE (`PANEL_HEADER`)
- **Contexts:** PascalCase with suffix (`ThemeContext.js`)

---

## Reference

For architecture, component reference, theme system, build process, and troubleshooting,
see [README.md](README.md).
