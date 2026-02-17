# PRD: Form Input Components Polish

**Status:** Approved
**Last Updated:** 2026-02-15
**Owner:** dash-react team
**Related PRDs:** [PRD-001-theme-system-foundation](PRD-001-theme-system-foundation.md), [PRD-002-interactive-components](PRD-002-interactive-components.md)

---

## Executive Summary

Upgrades dash-react's form components (InputText, TextArea, SelectInput, SearchInput, Checkbox, RadioGroup, Switch, Slider) with focus-visible rings, disabled state support, and smooth transitions for a polished, accessible form experience. This PRD replaces the blanket `focus:ring-2` (which shows on mouse click) with `focus-visible:ring-2` (keyboard only), adds a consistent disabled prop across all inputs, and introduces `transition-colors duration-150` for smooth state changes -- all using the theme token system from PRD-001.

---

## Context & Background

### Problem Statement

**What problem are we solving?**

Input components currently use the `focus:` pseudo-class for focus rings, which means a blue ring appears on every mouse click into an input. This is visually distracting and not how modern UI libraries behave. The `focus-visible:` pseudo-class only shows focus rings during keyboard navigation, which is the expected behavior.

Additionally, no input component supports a `disabled` prop in a consistent way. Some inputs ignore it entirely; others handle it ad-hoc with inline styles. There are no transitions on focus state changes, making the ring appear/disappear abruptly.

**Who experiences this problem?**

- Primary: Library consumer developers building forms in dashboards
- Secondary: End users interacting with form inputs

**What happens if we don't solve it?**

Forms in dash-react dashboards feel unpolished compared to modern UI libraries. Mouse users see unnecessary focus rings on every click. Disabled inputs look inconsistent. The lack of transitions creates a jarring experience during keyboard navigation.

### Current State

**What exists today?**

Input components apply `focus:ring-2 focus:ring-blue-500` directly in their className. Some components have basic disabled styling via inline opacity. No component uses the theme system's focusRingColor token.

**Limitations:**

- `focus:` shows ring on mouse click (should be `focus-visible:` for keyboard only)
- No consistent disabled prop support across form components
- No transitions on focus state changes
- Focus ring color is hardcoded, not theme-driven
- Checkbox and RadioGroup lack focus indicators entirely

---

## Goals & Success Metrics

### Primary Goals

1. **Upgrade focus to focus-visible** - Replace `focus:ring-2` with `focus-visible:ring-2` across all input components
2. **Consistent disabled prop** - All form components support `disabled` with `opacity-50` + `cursor-not-allowed`
3. **Smooth transitions** - Add `transition-colors duration-150` to all inputs for polished state changes
4. **Theme-driven focus rings** - Use the focusRingColor token from PRD-001 instead of hardcoded blue

### Success Metrics

| Metric                      | Target                                   | How Measured      |
| --------------------------- | ---------------------------------------- | ----------------- |
| focus-visible adoption      | All 8 form components                    | Code review       |
| Disabled prop support       | All 8 form components                    | Storybook testing |
| Focus ring color from theme | focusRingColor token used, not hardcoded | Code review       |

### Non-Goals

- **Custom validation UI** -- form validation display is the consumer's responsibility
- **New form components** (DatePicker, ColorPicker, etc.) -- separate future PRD
- **Form state management** -- consumers use their own state management (React Hook Form, Formik, etc.)

---

## User Personas

### Library Consumer Developer

**Role:** React developer building form-heavy dashboard views

**Goals:**

- Render polished forms that match modern UI standards
- Disable inputs during async operations with a simple prop
- Customize focus ring color to match their theme

**Pain Points:**

- Focus rings appear on mouse click, looking unprofessional
- Must implement disabled state styling manually per component
- Cannot change focus ring color through theme system

**Technical Level:** Intermediate

**Success Scenario:** Developer wraps a form section in a loading state and passes `disabled` to all inputs. All inputs dim to 50% opacity with cursor-not-allowed, and focus rings only appear during keyboard Tab navigation using the theme's focus color.

### End User (Form Filler)

**Role:** Dashboard user filling out configuration forms

**Goals:**

- Clear visual feedback when navigating forms by keyboard
- Understand which fields are disabled and why

**Pain Points:**

- Blue rings flash on every input click
- Disabled fields not visually distinct from enabled ones

**Technical Level:** N/A (end user)

**Success Scenario:** User Tabs through a form, sees clear focus rings on each field, and understands that grayed-out fields are not editable.

---

## User Stories

### Must-Have (P0)

**US-001: Focus-Visible Upgrade**

> As an end user navigating forms with a keyboard,
> I want focus rings to appear only during keyboard navigation,
> so that mouse interactions are clean and keyboard focus is clearly visible.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: All text inputs (InputText, TextArea, SearchInput) use `focus-visible:ring-2` instead of `focus:ring-2`
- [x] AC2: SelectInput uses `focus-visible:ring-2`
- [x] AC3: Checkbox and RadioGroup show `focus-visible:ring-2` on their interactive elements
- [x] AC4: Switch shows `focus-visible:ring-2` on its track
- [x] AC5: Clicking an input with a mouse does NOT show a focus ring

**Edge Cases:**

- Input that receives focus programmatically (e.g., `ref.focus()`) -> shows ring (matches focus-visible behavior for programmatic focus)
- Touch input on mobile -> no ring shown

**Technical Notes:**
Replace `focus:ring-2 focus:ring-{color}` with `focus-visible:ring-2 focus-visible:ring-{focusRingColor}` where focusRingColor comes from the theme token. Requires PRD-001 Tailwind safelist for `focus-visible:` prefix.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Keyboard Tab test in Storybook -- rings appear
- [x] Mouse click test in Storybook -- no rings
- [x] Theme focusRingColor token used

---

**US-002: Disabled State Support**

> As a library consumer developer,
> I want all form components to support a `disabled` prop with consistent visual treatment,
> so that I can disable inputs during loading or permission-restricted states.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: All 8 form components accept a `disabled` prop
- [x] AC2: Disabled inputs render with `opacity-50` and `cursor-not-allowed`
- [x] AC3: Disabled inputs pass the `disabled` attribute to the underlying HTML element
- [x] AC4: Disabled inputs do not fire onChange handlers

**Edge Cases:**

- SelectInput disabled -> dropdown does not open
- Checkbox disabled in checked state -> shows checked but dimmed, not interactive

**Technical Notes:**
Use native HTML disabled attribute where possible (input, select, textarea, button). Apply theme disabledOpacity token for visual styling. Ensure onChange is not called when disabled.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] All 8 components tested with disabled prop in Storybook
- [x] Native disabled attribute verified in DevTools

---

### Should-Have (P1)

**US-003: Smooth Focus Transitions**

> As an end user,
> I want focus state changes to animate smoothly,
> so that the interface feels polished when navigating between form fields.

**Priority:** P1
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: All text inputs include `transition-colors duration-150`
- [x] AC2: Switch includes `transition-colors duration-200` on track color change
- [x] AC3: Checkbox and RadioGroup include `transition-colors duration-150`

**Technical Notes:**
Add transition utilities to className. Duration-150 for most inputs, duration-200 for Switch (slightly longer to match Toggle from PRD-002).

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Smooth transitions visible in Storybook

---

## Feature Requirements

### Functional Requirements

**FR-001: Focus-Visible Ring System**

- **Description:** Replace `focus:ring-2` with `focus-visible:ring-2` across all form components, using the theme's focusRingColor token for ring color
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Tab through form in Storybook -- rings appear on keyboard focus; click inputs with mouse -- no rings

**FR-002: Disabled Prop System**

- **Description:** All form components accept `disabled` prop, apply native disabled attribute, render with theme disabledOpacity and cursor-not-allowed
- **User Story:** US-002
- **Priority:** P0
- **Validation:** Set disabled prop in Storybook Controls; confirm visual dimming and non-interactivity

**FR-003: Transition System**

- **Description:** All form components include appropriate transition-colors classes for smooth state changes
- **User Story:** US-003
- **Priority:** P1
- **Validation:** Observe smooth color transitions during focus/blur in Storybook

### Non-Functional Requirements

**NFR-001: Accessibility**

- Focus indicators meet WCAG 2.1 AA minimum contrast requirements
- Disabled elements are not focusable via Tab (native disabled behavior)

**NFR-002: Backward Compatibility**

- Existing form components render identically when disabled prop is not passed
- focus-visible change is purely visual improvement (no behavioral change for mouse users)

**NFR-003: Consistency**

- All form components use the same disabled visual treatment (opacity-50, cursor-not-allowed)
- All form components use the same focus ring token (focusRingColor)

---

## Design Considerations

### UI/UX Requirements

- Focus rings: 2px width, theme-driven color, keyboard-only visibility
- Disabled state: 50% opacity, not-allowed cursor, no interaction
- Transitions: 150ms for standard inputs, 200ms for Switch track

### Architecture Requirements

- Components consume focusRingColor and disabledOpacity tokens from PRD-001
- Native HTML disabled attribute used wherever the underlying element supports it
- No new dependencies

### Dependencies

**Internal:**

- Requires PRD-001 theme tokens (focusRingColor, disabledOpacity)
- Requires PRD-001 Tailwind safelist (focus-visible:, disabled: variants)

**External:**

- None

---

## Open Questions & Decisions

### Decisions Made

| Date       | Decision                                           | Rationale                                                                          | Owner           |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------- |
| 2026-02-15 | focus-visible over focus                           | Modern standard; avoids distracting rings on mouse click                           | dash-react team |
| 2026-02-15 | opacity-50 for disabled (not opacity-60 or custom) | Matches Tailwind UI and shadcn/ui conventions; clearly communicates disabled state | dash-react team |
| 2026-02-15 | Slider gets minimal changes                        | Browser-native range input already handles focus and disabled well                 | dash-react team |

---

## Out of Scope

**Explicitly excluded from this PRD:**

- Custom validation UI (error messages, red borders) -- consumer responsibility
- New form components (DatePicker, TimePicker, ColorPicker, FileUpload) -- separate PRD
- Form layout components (FormGroup, FormLabel, FormDescription) -- separate PRD
- Form state management integration -- consumers choose their own library

**Future Considerations:**

- FormField wrapper component that combines label, input, description, and error message
- Validation state tokens (errorBorderColor, successBorderColor) in the theme system
- Autofill styling normalization

---

## Implementation Phases

### Phase 1: Core Form Polish (P0)

**Timeline:** Complete

**Deliverables:**

- [x] US-001: Focus-visible upgrade across all form components
- [x] US-002: Disabled prop support across all form components

**Success Criteria:** All 8 form components use focus-visible, support disabled prop with consistent styling, and use theme tokens for focus ring color.

### Phase 2: Transitions (P1)

**Timeline:** Complete

**Deliverables:**

- [x] US-003: Smooth focus transitions on all form components

**Success Criteria:** Focus and state changes animate smoothly.

---

## Technical Documentation

**Key files:**

- [src/Common/Input/InputText.js](../../src/Common/Input/InputText.js) - Text input
- [src/Common/Input/TextArea.js](../../src/Common/Input/TextArea.js) - Textarea input
- [src/Common/Input/SelectInput.js](../../src/Common/Input/SelectInput.js) - Select dropdown
- [src/Common/Input/SearchInput.js](../../src/Common/Input/SearchInput.js) - Search input
- [src/Common/Input/Checkbox.js](../../src/Common/Input/Checkbox.js) - Checkbox
- [src/Common/Input/RadioGroup.js](../../src/Common/Input/RadioGroup.js) - Radio group
- [src/Common/Toggle/Toggle.js](../../src/Common/Toggle/Toggle.js) - Switch/Toggle (shared with PRD-002)
- [src/Utils/colors.js](../../src/Utils/colors.js) - Theme token resolution

---

## Revision History

| Version | Date       | Author          | Changes                                         |
| ------- | ---------- | --------------- | ----------------------------------------------- |
| 1.0     | 2026-02-15 | dash-react team | Initial PRD (approved, implementation complete) |
