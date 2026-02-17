# PRD: Container & Surface Component Polish

**Status:** Approved
**Last Updated:** 2026-02-15
**Owner:** dash-react team
**Related PRDs:** None

---

## Executive Summary

Polishes dash-react's container and surface components (Panel, Card, Modal, SlidePanelOverlay) with theme-driven shadow/borderRadius, improved transitions, and accessibility enhancements for a modern, cohesive dashboard UI. These components form the foundational visual layer of every dashboard built with dash-react, and aligning them to use theme tokens consistently ensures that consumers can restyle surfaces globally without touching component JSX.

---

## Context & Background

### Problem Statement

**What problem are we solving?**

Panel components already had `shadow` and `borderRadius` tokens defined in the colorMap, but the JSX still used hardcoded `rounded-lg` classes directly. This meant that theme overrides for border radius were silently ignored. Similarly, Modal used a hardcoded `bg-black/90` backdrop instead of pulling from a theme token, and SlidePanelOverlay had hardcoded gray colors throughout its implementation.

The result was an inconsistent surface treatment across container components: some respected the theme system while others bypassed it, making it impossible for consumers to achieve a unified look through theme configuration alone.

**Who experiences this problem?**

- Primary: Dash app developers building custom-themed dashboards
- Secondary: dash-react maintainers ensuring cross-component consistency

**What happens if we don't solve it?**

Consumers who customize themes will encounter inconsistent behavior where some components respond to theme changes and others do not. This erodes trust in the theme system and forces consumers to apply per-component CSS overrides, increasing maintenance burden.

### Current State

**What exists today?**

Panel, Card, Modal, and SlidePanelOverlay are all functional and shipped. Panel and Card already have colorMap entries with shadow and borderRadius tokens. Card already has a working hover transition-shadow effect.

**Limitations:**

- Panel JSX uses hardcoded `rounded-lg` instead of `styles.borderRadius`
- Modal backdrop uses hardcoded `bg-black/90` instead of a theme token
- SlidePanelOverlay uses hardcoded gray color classes throughout
- No consistent transition treatment across container components

---

## Goals & Success Metrics

### Primary Goals

1. **Theme token adoption** - All container components use `styles.shadow` and `styles.borderRadius` from theme tokens instead of hardcoded values
2. **Modal visual polish** - Modal gains `rounded-lg`, `shadow-xl`, `backdrop-blur-sm` with smooth open/close transitions via theme tokens
3. **Consistent surface treatment** - All container components share a cohesive visual language driven entirely by the theme system

### Success Metrics

| Metric                            | Target                                              | How Measured                         |
| --------------------------------- | --------------------------------------------------- | ------------------------------------ |
| Hardcoded surface classes removed | 0 remaining in Panel, Modal, SlidePanelOverlay      | Code audit of JSX files              |
| Theme token coverage              | 100% of shadow/borderRadius props use styles object | Review colorMap entries vs JSX usage |
| Card hover transition maintained  | No regression                                       | Storybook visual check               |

### Non-Goals

**What are we explicitly NOT doing?**

- Complete SlidePanelOverlay rewrite - it uses HeadlessUI patterns that work well and should be preserved
- Adding new container components - this PRD is about polishing existing ones
- Changing the external component API (props) - all changes are internal styling improvements

---

## User Personas

### Dashboard Theme Designer

**Role:** Developer customizing dash-react themes for branded dashboards

**Goals:**

- Control surface appearance (shadows, radii, colors) entirely through theme configuration
- Achieve a consistent look across all container components with a single theme object

**Pain Points:**

- Some components ignore theme tokens and use hardcoded classes
- Must apply per-component CSS overrides to work around hardcoded values

**Technical Level:** Intermediate

**Success Scenario:** Changing a single `borderRadius` token in the theme updates Panel, Modal, and Card corners consistently.

### Dash App Developer

**Role:** Developer building widgets and layouts using dash-react components

**Goals:**

- Use container components that look polished out of the box
- Trust that components will respond to theme changes without additional work

**Pain Points:**

- Modal backdrop feels flat without blur/transition
- Inconsistent shadow treatment across different containers

**Technical Level:** Intermediate

**Success Scenario:** Panels, Modals, and Cards all share a cohesive surface aesthetic with proper shadows, rounded corners, and smooth transitions.

---

## User Stories

### Must-Have (P0)

**US-001: Theme-Driven Surface Properties**

> As a dashboard theme designer,
> I want Panel, Modal, and SlidePanelOverlay to use `styles.shadow` and `styles.borderRadius` from the theme system,
> so that I can control surface appearance globally through theme configuration.

**Priority:** P0
**Status:** Backlog

**Acceptance Criteria:**

- [ ] AC1: Panel renders with `styles.borderRadius` from the theme instead of hardcoded `rounded-lg`
- [ ] AC2: Panel renders with `styles.shadow` from the theme token
- [ ] AC3: Modal content area uses theme-driven borderRadius and shadow
- [ ] AC4: Overriding `borderRadius` or `shadow` in the theme object changes the rendered output for all container components

**Edge Cases:**

- No theme provided (ThemeContext missing) -> Components fall back to colorMap defaults which include sensible borderRadius and shadow values
- Empty string override for shadow -> Component renders with no shadow class

**Technical Notes:**
Replace hardcoded `rounded-lg` in Panel JSX with `${styles.borderRadius}`. Ensure colorMap entries for PANEL, MODAL, and SLIDE_PANEL_OVERLAY include `borderRadius` and `shadow` keys with default values.

**Example Scenario:**

```
Theme designer sets theme[themeObjects.PANEL].borderRadius = "rounded-xl".
All Panel, Panel2, Panel3 instances render with rounded-xl corners.
Previously, panels always rendered with rounded-lg regardless of theme.
```

**Definition of Done:**

- [ ] Code implemented and reviewed
- [ ] Storybook stories render correctly with theme changes
- [ ] Build succeeds (`npm run build`)
- [ ] No hardcoded surface classes remain in container component JSX

---

**US-002: Modal Backdrop and Transition Polish**

> As a dash app developer,
> I want the Modal component to have a blurred backdrop with smooth open/close transitions,
> so that modal interactions feel polished and modern.

**Priority:** P0
**Status:** Backlog

**Acceptance Criteria:**

- [ ] AC1: Modal backdrop uses a theme token instead of hardcoded `bg-black/90`
- [ ] AC2: Modal backdrop includes `backdrop-blur-sm` for a frosted glass effect
- [ ] AC3: Modal content area includes `shadow-xl` (via theme token) for depth
- [ ] AC4: Modal open/close includes a CSS transition (opacity or scale)

**Edge Cases:**

- Rapid open/close toggling -> Transition handles interruption gracefully without visual glitches
- Nested modals -> Each modal's backdrop stacks correctly

**Technical Notes:**
Add `backdropColor` to Modal's colorMap entry. Replace hardcoded `bg-black/90` with `styles.backdropColor`. Add transition classes (`transition-opacity duration-200`) to the backdrop wrapper.

**Example Scenario:**

```
User clicks a button that opens a Modal.
Modal fades in with a blurred backdrop behind it.
Modal content appears with rounded corners and a shadow.
User closes modal, it fades out smoothly.
```

**Definition of Done:**

- [ ] Code implemented and reviewed
- [ ] Storybook Modal story demonstrates transition
- [ ] Build succeeds (`npm run build`)
- [ ] Accessibility: Modal still traps focus and supports Escape key

---

## Feature Requirements

### Functional Requirements

**FR-001: Theme Token Usage for Surface Properties**

- **Description:** Panel, Modal, and SlidePanelOverlay must read `borderRadius` and `shadow` from the styles object returned by `getStylesForItem()` instead of using hardcoded CSS classes
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Changing theme tokens for borderRadius/shadow updates rendered output in Storybook

**FR-002: Modal Backdrop Theming**

- **Description:** Modal backdrop must use a theme token for its background color/opacity and include `backdrop-blur-sm`
- **User Story:** US-002
- **Priority:** P0
- **Validation:** Modal backdrop renders with blur effect and responds to theme backdrop color changes

**FR-003: Card Hover Transition Preservation**

- **Description:** Card's existing `transition-shadow` hover effect must be maintained without regression
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Card hover still shows shadow transition in Storybook

### Non-Functional Requirements

**NFR-001: Performance**

- No additional JavaScript runtime overhead; all changes are CSS class swaps
- Transition durations should not exceed 300ms to maintain snappy feel

**NFR-002: Accessibility**

- Modal must continue to trap focus and support Escape key dismissal
- Backdrop transitions must respect `prefers-reduced-motion` user preference

**NFR-003: Backward Compatibility**

- No changes to component prop APIs
- Default colorMap values produce the same visual output as before for consumers who have not customized themes

---

## User Workflows

### Workflow 1: Customizing Surface Appearance via Theme

**Trigger:** Developer wants rounded-xl corners on all panels

**Steps:**

1. Developer adds `borderRadius: "rounded-xl"` to their theme object under `themeObjects.PANEL`
2. ThemeProvider propagates updated theme to all Panel instances
3. Panels re-render with `rounded-xl` instead of default `rounded-lg`
4. Developer verifies in Storybook or Dash app

**Success State:** All Panel variants (Panel, Panel2, Panel3) render with the overridden border radius

**Error Scenarios:**

- Invalid class name provided -> Component renders with the class as-is; Tailwind ignores unknown classes gracefully

**Time Estimate:** < 1 minute to configure

### Workflow 2: Using Polished Modal

**Trigger:** Developer renders a Modal component

**Steps:**

1. Developer triggers modal open via state change
2. Modal backdrop fades in with blur effect
3. Modal content appears with shadow and rounded corners
4. Developer interacts with modal content
5. Developer closes modal, backdrop fades out

**Success State:** Smooth, visually polished modal experience with no layout shift

**Error Scenarios:**

- Modal content taller than viewport -> Scrollable modal body handles overflow

**Time Estimate:** Automatic (no developer action required beyond existing Modal usage)

---

## Design Considerations

### UI/UX Requirements

- Surface shadows should provide subtle depth without being visually heavy
- Border radius should be consistent across all container components when using the same theme
- Modal backdrop blur creates visual separation without completely obscuring background content
- Transitions should be fast enough to feel responsive (150-200ms)

### Architecture Requirements

- All surface styling must flow through `getStylesForItem()` and the colorMap
- No hardcoded CSS classes for shadow, borderRadius, or backdrop colors in component JSX
- Card's existing hover transition pattern should serve as the reference implementation

### Dependencies

**Internal:**

- ThemeContext and `getStylesForItem()` utility (already exist)
- colorMap entries for PANEL, MODAL, CARD, SLIDE_PANEL_OVERLAY (already exist, may need new keys)

**External:**

- TailwindCSS (already included) for transition and backdrop-blur utility classes

---

## Open Questions & Decisions

### Decisions Made

| Date       | Decision                                   | Rationale                                                                                             | Owner           |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------- |
| 2026-02-15 | Keep SlidePanelOverlay HeadlessUI patterns | HeadlessUI provides accessible slide panel behavior that works well; only theme token adoption needed | dash-react team |
| 2026-02-15 | Use backdrop-blur-sm (not md or lg)        | Subtle blur is sufficient for depth; heavier blur impacts performance on lower-end machines           | dash-react team |

---

## Out of Scope

**Explicitly excluded from this PRD:**

- Complete SlidePanelOverlay rewrite - HeadlessUI integration is working and should be preserved
- Adding new container components (e.g., Drawer, Sheet) - separate PRD if needed
- Animation library integration (e.g., Framer Motion) - CSS transitions are sufficient for these use cases

**Future Considerations:**

- Configurable transition durations via theme tokens
- Reduced-motion theme variant that disables all transitions
- Container query support for responsive surface treatment

---

## Implementation Phases

### Phase 1: MVP (P0 Stories)

**Timeline:** 1-2 days

**Deliverables:**

- [ ] US-001: Theme-driven surface properties for Panel, Modal, SlidePanelOverlay
- [ ] US-002: Modal backdrop and transition polish

**Success Criteria:** All container components use theme tokens for shadow/borderRadius; Modal has blurred backdrop with transitions; no visual regressions in Card.

**Risks:**

- Hardcoded class removal may change default appearance - Mitigation: colorMap defaults match previous hardcoded values exactly
- Transition conflicts with HeadlessUI in SlidePanelOverlay - Mitigation: only change color tokens, not transition behavior

---

## Technical Documentation

**See related technical docs:**

- [CLAUDE.md](../../CLAUDE.md) - Theme system overview and component patterns
- [src/Utils/colors.js](../../src/Utils/colors.js) - colorMap definitions and getStylesForItem
- [src/Utils/themeObjects.js](../../src/Utils/themeObjects.js) - Theme object key constants

**Implementation Status:** Not started

---

## Testing Requirements

### Unit Tests

**Coverage Target:** Verify theme token adoption

**Test Cases:**

- [ ] Panel renders with styles.borderRadius instead of hardcoded rounded-lg
- [ ] Modal backdrop uses theme token for background color
- [ ] Card hover transition is not regressed

### Manual Testing

**Test Checklist:**

- [ ] All Panel variants render with correct shadows and border radius from theme
- [ ] Modal opens/closes with smooth transition
- [ ] Modal backdrop has blur effect
- [ ] Card hover shadow transition works
- [ ] SlidePanelOverlay uses theme colors instead of hardcoded grays
- [ ] Changing theme tokens updates all container components consistently
- [ ] Build succeeds: `npm run build`

---

## Revision History

| Version | Date       | Author          | Changes     |
| ------- | ---------- | --------------- | ----------- |
| 1.0     | 2026-02-15 | dash-react team | Initial PRD |
