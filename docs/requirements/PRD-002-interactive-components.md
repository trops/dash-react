# PRD: Interactive Components Modernization

**Status:** Approved
**Last Updated:** 2026-02-15
**Owner:** dash-react team
**Related PRDs:** [PRD-001-theme-system-foundation](PRD-001-theme-system-foundation.md), [PRD-003-form-input-components](PRD-003-form-input-components.md)

---

## Executive Summary

Modernizes dash-react's core interactive components (Button, ButtonIcon, Toggle, MenuItem) to use proper HTML semantics, native accessibility, and polished transitions -- achieving shadcn/ui-level interactivity while keeping all styling flowing through the theme token system. Buttons switch from `div` to `button` elements for keyboard navigation and form submission, Toggle is rebuilt from scratch with a track+knob pattern, and all components gain focus-visible rings, disabled attribute support, and smooth transitions.

---

## Context & Background

### Problem Statement

**What problem are we solving?**

The current interactive components have fundamental semantic and accessibility issues. Button and ButtonIcon render as `div` elements, which means they are not focusable via keyboard Tab, do not trigger on Enter/Space, cannot be natively disabled, and do not participate in form submission. Users relying on keyboard navigation or assistive technology cannot use these components.

The Toggle component is completely non-functional -- it returns the string literal `"toggle"` instead of rendering an interactive switch. MenuItem lacks transitions, making hover state changes feel abrupt.

Additionally, components hardcode CSS classes like `cursor-pointer`, `font-bold`, and responsive text sizes (`text-xs md:text-sm`) directly in JSX, bypassing the theme token system. This prevents theme designers from customizing these properties.

**Who experiences this problem?**

- Primary: Library consumer developers who need accessible, interactive controls
- Secondary: End users who rely on keyboard navigation or screen readers

**What happens if we don't solve it?**

Dashboard applications built with dash-react fail basic accessibility standards. Keyboard users cannot navigate buttons. Screen readers cannot identify interactive elements. The Toggle component is unusable. These issues block adoption by teams with accessibility requirements.

### Current State

**What exists today?**

Button and ButtonIcon components render as styled `div` elements with `onClick` handlers. Toggle returns `"toggle"` (placeholder). MenuItem renders with no transitions.

**Limitations:**

- Button/ButtonIcon use `div` -- not keyboard focusable, no native disabled, no form submission
- Toggle is completely broken (returns a string)
- No focus-visible rings on any interactive component
- Hardcoded `cursor-pointer`, `font-bold`, responsive text sizes bypass theme system
- No smooth transitions on state changes

---

## Goals & Success Metrics

### Primary Goals

1. **Semantic HTML** - Button and ButtonIcon render as `<button>` elements with native keyboard and form behavior
2. **Functional Toggle** - Rebuild Toggle with track+knob pattern, `role="switch"`, `aria-checked`, and translate-x animation
3. **Accessibility** - All interactive components support focus-visible rings, native disabled attribute, and appropriate ARIA attributes
4. **Theme-driven styling** - Replace hardcoded CSS with theme tokens (fontWeight, cursor, focusRingColor from PRD-001)

### Success Metrics

| Metric                   | Target                                                        | How Measured         |
| ------------------------ | ------------------------------------------------------------- | -------------------- |
| Semantic elements        | Button/ButtonIcon use `<button>`                              | Code review          |
| Toggle functional        | Renders interactive switch with aria-checked                  | Storybook test       |
| Keyboard navigation      | Tab focuses all interactive components, Enter/Space activates | Manual keyboard test |
| Hardcoded styles removed | cursor, fontWeight, text sizes use theme tokens               | Code review of JSX   |

### Non-Goals

- **Adding new button variants** (e.g., outline, ghost, destructive) -- future PRD
- **Icon library integration** -- consumers continue to pass icon children
- **Animation library dependency** -- CSS transitions only, no framer-motion or similar

---

## User Personas

### Library Consumer Developer

**Role:** React developer integrating dash-react components into a dashboard

**Goals:**

- Use Button components that work with forms and keyboard navigation out of the box
- Have a working Toggle component for boolean settings
- Customize interactive state appearance through theme tokens

**Pain Points:**

- Buttons do not submit forms because they are div elements
- Toggle component does not render anything useful
- Cannot disable buttons via a standard disabled prop

**Technical Level:** Intermediate

**Success Scenario:** Developer renders `<Button disabled>Save</Button>` and it produces a real `<button disabled>` element that is not focusable, appears dimmed per theme, and works in a `<form>`.

### End User (Keyboard Navigator)

**Role:** Dashboard user who navigates via keyboard

**Goals:**

- Tab through interactive elements in a logical order
- Activate buttons with Enter or Space
- See clear focus indicators on the currently focused element

**Pain Points:**

- Cannot Tab to buttons (they are divs)
- No visual focus indicator when tabbing
- Toggle is non-functional

**Technical Level:** N/A (end user)

**Success Scenario:** User presses Tab to reach a button, sees a focus ring, presses Enter to activate it.

---

## User Stories

### Must-Have (P0)

**US-001: Semantic Button Elements**

> As a library consumer developer,
> I want Button and ButtonIcon to render as `<button>` elements,
> so that they support keyboard navigation, form submission, and the native disabled attribute.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: Button renders as `<button>` with `type="button"` by default
- [x] AC2: ButtonIcon renders as `<button>` with `type="button"` by default
- [x] AC3: `disabled` prop maps to the native disabled attribute and applies theme disabledOpacity + cursor-not-allowed
- [x] AC4: Focus via keyboard shows a `focus-visible:ring-2` ring using the theme's focusRingColor token

**Edge Cases:**

- Button with `type="submit"` inside a form -> submits the form on Enter
- Disabled button -> not focusable, onClick not fired

**Technical Notes:**
Replace `<div onClick={...}>` with `<button type="button" onClick={...}>`. Remove manual tabIndex. Use theme tokens: fontWeight, cursor, focusRingColor, disabledOpacity.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Storybook stories updated
- [x] Keyboard navigation verified in Storybook
- [x] Backward compatibility of props verified

---

**US-002: Functional Toggle Component**

> As a library consumer developer,
> I want a working Toggle component with a track+knob pattern,
> so that I can offer boolean toggle switches in dashboard UIs.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: Toggle renders a clickable track with a sliding knob
- [x] AC2: Uses `role="switch"` and `aria-checked` for accessibility
- [x] AC3: Knob animates between on/off positions using `translate-x` with `transition-transform duration-200`
- [x] AC4: Supports `disabled` prop with appropriate visual dimming
- [x] AC5: Focus-visible ring displayed on keyboard focus

**Edge Cases:**

- Toggle with no onChange handler -> renders in uncontrolled mode
- Toggle disabled in "on" state -> shows on position but dimmed, not interactive

**Technical Notes:**
Full rebuild. Track is a `<button role="switch">`, knob is an inner `<span>` positioned with translate-x. Theme tokens: backgroundColor (track off), activeBackgroundColor (track on), focusRingColor.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Storybook story created
- [x] Keyboard toggle (Space) verified
- [x] Screen reader announces switch state

---

### Should-Have (P1)

**US-003: MenuItem Transitions**

> As an end user,
> I want menu items to transition smoothly on hover,
> so that the interface feels polished and responsive.

**Priority:** P1
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: MenuItem applies `transition-colors duration-150` for smooth hover color changes
- [x] AC2: No visual change to default/hover colors (only the transition is added)

**Technical Notes:**
Add `transition-colors duration-150` to the MenuItem className. No structural changes needed.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Hover transition visible in Storybook

---

## Feature Requirements

### Functional Requirements

**FR-001: Button Semantic Upgrade**

- **Description:** Button and ButtonIcon must render as `<button>` HTML elements with native disabled support, keyboard focus, and theme-driven fontWeight/cursor/focusRingColor
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Inspect DOM in Storybook DevTools; confirm `<button>` element; Tab to button and confirm focus ring; set disabled prop and confirm attribute present

**FR-002: Toggle Rebuild**

- **Description:** Toggle must render a track+knob switch with role="switch", aria-checked, translate-x animation, disabled support, and theme-driven colors
- **User Story:** US-002
- **Priority:** P0
- **Validation:** Click Toggle in Storybook; confirm knob slides; inspect role and aria-checked in DevTools; Tab and press Space to toggle

**FR-003: MenuItem Transition**

- **Description:** MenuItem must include transition-colors duration-150 for smooth hover state changes
- **User Story:** US-003
- **Priority:** P1
- **Validation:** Hover over MenuItem in Storybook; confirm smooth color transition

### Non-Functional Requirements

**NFR-001: Accessibility**

- All interactive components must be keyboard navigable (Tab to focus, Enter/Space to activate)
- Focus indicators must use `focus-visible:` (keyboard only, not mouse click)
- Toggle must have `role="switch"` and `aria-checked`

**NFR-002: Backward Compatibility**

- Existing onClick, className, and style props continue to work
- Visual appearance matches previous version when no new props are used (except div->button rendering difference)

**NFR-003: Performance**

- No additional JavaScript bundle size beyond the semantic HTML changes
- CSS transitions use GPU-compositable properties (transform, opacity) where possible

---

## Design Considerations

### UI/UX Requirements

- Focus rings appear only on keyboard navigation (focus-visible), not on mouse click
- Disabled components show reduced opacity and cursor-not-allowed
- Toggle knob slides smoothly (200ms transition-transform)
- MenuItem hover color fades in (150ms transition-colors)

### Architecture Requirements

- Components consume theme tokens from PRD-001 (focusRingColor, disabledOpacity, fontWeight, cursor)
- No new dependencies introduced
- Components continue to use `getStylesForItem()` for all styling

### Dependencies

**Internal:**

- Requires PRD-001 theme system tokens (focusRingColor, disabledOpacity, activeBackgroundColor, fontWeight, cursor)

**External:**

- None (standard HTML/CSS only)

---

## Open Questions & Decisions

### Decisions Made

| Date       | Decision                                        | Rationale                                                                      | Owner           |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------ | --------------- |
| 2026-02-15 | Use `<button>` instead of `<div role="button">` | Native button provides keyboard, form, and disabled behavior for free          | dash-react team |
| 2026-02-15 | Default `type="button"`                         | Prevents accidental form submission; consumers can override to `type="submit"` | dash-react team |
| 2026-02-15 | Full Toggle rebuild vs. fix                     | Existing Toggle was a string placeholder; no code worth preserving             | dash-react team |
| 2026-02-15 | CSS translate-x for Toggle knob                 | GPU-compositable, smooth 60fps animation, no JS animation library needed       | dash-react team |

---

## Out of Scope

**Explicitly excluded from this PRD:**

- Button variants (outline, ghost, destructive, link) -- future PRD for variant system
- Icon component library -- consumers pass their own icon children
- Tooltip on disabled buttons -- separate accessibility enhancement
- Loading/spinner state for buttons -- future enhancement

**Future Considerations:**

- Button variant system with size props (sm, md, lg)
- ButtonGroup component for related actions
- Toggle with label text built in

---

## Implementation Phases

### Phase 1: Core Interactive Components (P0)

**Timeline:** Complete

**Deliverables:**

- [x] US-001: Button and ButtonIcon semantic upgrade
- [x] US-002: Toggle full rebuild

**Success Criteria:** All P0 components use native HTML elements, support keyboard navigation, have focus-visible rings, and honor disabled prop.

### Phase 2: Polish (P1)

**Timeline:** Complete

**Deliverables:**

- [x] US-003: MenuItem transitions

**Success Criteria:** MenuItem hover transitions are smooth.

---

## Technical Documentation

**Key files:**

- [src/Common/Button/Button.js](../../src/Common/Button/Button.js) - Button component
- [src/Common/Button/ButtonIcon.js](../../src/Common/Button/ButtonIcon.js) - ButtonIcon component
- [src/Common/Toggle/Toggle.js](../../src/Common/Toggle/Toggle.js) - Toggle component
- [src/Common/Menu/MenuItem.js](../../src/Common/Menu/MenuItem.js) - MenuItem component
- [src/Utils/colors.js](../../src/Utils/colors.js) - Theme token resolution
- [src/Utils/themeObjects.js](../../src/Utils/themeObjects.js) - Component theme keys

---

## Revision History

| Version | Date       | Author          | Changes                                         |
| ------- | ---------- | --------------- | ----------------------------------------------- |
| 1.0     | 2026-02-15 | dash-react team | Initial PRD (approved, implementation complete) |
