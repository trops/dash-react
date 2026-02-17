# PRD: Theme System Foundation Modernization

**Status:** Approved
**Last Updated:** 2026-02-15
**Owner:** dash-react team
**Related PRDs:** [PRD-002-interactive-components](PRD-002-interactive-components.md), [PRD-003-form-input-components](PRD-003-form-input-components.md)

---

## Executive Summary

Extends the dash-react theme token system with interactive state properties (focus, active, disabled) and typography tokens (fontWeight, letterSpacing, lineHeight), enabling shadcn/ui-level polish across all components while maintaining backward compatibility. Without these tokens, components needing focus rings, disabled states, or transitions must hardcode CSS classes, bypassing the theme system and creating visual inconsistency across themes.

---

## Context & Background

### Problem Statement

**What problem are we solving?**

The existing theme system only supports a limited set of styleClassNames: backgroundColor, textColor, borderColor, and hover variants. Components requiring focus rings, disabled states, active states, or typography control have no way to express these through the theme token pipeline. This forces component authors to hardcode CSS classes like `focus:ring-2 focus:ring-blue-500` directly in JSX, which cannot be overridden by theme designers.

Additionally, the `hoverTextColor` property has a bug in `getStyleValueVariant` where it does not receive the `hover:` prefix, causing hover text color changes to fail silently.

**Who experiences this problem?**

- Primary: Library consumer developers building themed dashboards
- Secondary: Theme designers creating custom theme variants

**What happens if we don't solve it?**

Components continue to have inconsistent interactive states. Focus rings, disabled appearances, and active states vary per component instead of being controlled by the theme. This makes it impossible to create a polished, cohesive theme and blocks PRD-002 and PRD-003 from delivering accessible interactive components.

### Current State

**What exists today?**

The theme system resolves styles through `getStylesForItem()` in `src/Utils/colors.js`, mapping theme tokens from `colorMap` defaults through theme overrides to component-level props. The `themeObjects.js` file defines component keys.

**Limitations:**

- No focus, active, or disabled state tokens in the styleClassNames system
- `hoverTextColor` bug prevents hover text color from working
- No typography tokens (fontWeight, letterSpacing, lineHeight) for fine-grained text control
- Tailwind safelist missing `focus-visible:`, `active:`, and `disabled:` variant prefixes
- No theme object keys for upcoming Tabs and Accordion components

---

## Goals & Success Metrics

### Primary Goals

1. **Expand styleClassNames** - Add 9 new token properties covering focus, active, disabled, typography, and cursor states
2. **Fix hoverTextColor bug** - Ensure `getStyleValueVariant` applies the `hover:` prefix to hoverTextColor
3. **Extend Tailwind safelist** - Add `focus-visible:`, `active:`, and `disabled:` variant prefixes so generated classes are not purged
4. **Add colorMap defaults** - Provide sensible defaults for all components needing interactive states
5. **Add new theme object keys** - Add entries for Tabs and Accordion component families

### Success Metrics

| Metric                    | Target                | How Measured                           |
| ------------------------- | --------------------- | -------------------------------------- |
| New styleClassNames added | 9 properties          | Count in colors.js                     |
| hoverTextColor bug fixed  | hover: prefix applied | Manual test in Storybook               |
| Backward compatibility    | Zero breaking changes | Existing components render identically |

### Non-Goals

- **Changing the theme resolution algorithm** - The existing priority chain (colorMap -> theme override -> component prop) stays the same
- **Adding CSS custom properties / variables** - Not converting from class-based to variable-based theming
- **Adding animation keyframes** - Transition utilities are sufficient; keyframe animations are out of scope

---

## User Personas

### Library Consumer Developer

**Role:** React developer building dashboard UIs with dash-react

**Goals:**

- Apply consistent focus, active, and disabled states across components
- Override interactive state styling per-theme without forking components

**Pain Points:**

- Must hardcode focus rings because no theme token exists
- Disabled components look different depending on which one you use
- Cannot customize interactive states through theme objects

**Technical Level:** Intermediate

**Success Scenario:** Developer uses `<Button disabled>` and the disabled appearance is controlled entirely by the theme's `disabledOpacity` and `cursor` tokens, matching all other disabled components.

### Theme Designer

**Role:** Designer creating custom light/dark theme variants

**Goals:**

- Control focus ring color, active state color, and disabled opacity per-theme
- Fine-tune typography weight and spacing through theme tokens

**Pain Points:**

- Focus rings are hardcoded blue regardless of theme palette
- No way to adjust font weight or letter spacing through theme objects

**Technical Level:** Intermediate

**Success Scenario:** Theme designer sets `focusRingColor: "ring-emerald-500"` in their theme and all focusable components use emerald focus rings.

---

## User Stories

### Must-Have (P0)

**US-001: Interactive State Tokens**

> As a library consumer developer,
> I want focus, active, and disabled states to flow through the theme token system,
> so that all interactive components have consistent, theme-customizable states.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: `getStylesForItem` resolves focusRingColor, focusBorderColor, activeBackgroundColor, activeTextColor, disabledOpacity, and cursor tokens
- [x] AC2: colorMap provides defaults for Button, ButtonIcon, Toggle, MenuItem, and all input components
- [x] AC3: Existing components render identically when no new tokens are provided (backward compatible)

**Technical Notes:**
Key files: `src/Utils/colors.js` (styleClassNames, colorMap, getStyleValueVariant), `src/Utils/themeObjects.js`, `tailwind.config.js` (safelist)

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Storybook components render with new tokens
- [x] Backward compatibility verified
- [x] Documentation updated

---

**US-002: Typography Tokens**

> As a theme designer,
> I want to control fontWeight, letterSpacing, and lineHeight through theme tokens,
> so that I can fine-tune typography across all text-bearing components per-theme.

**Priority:** P0
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: fontWeight, letterSpacing, and lineHeight are recognized styleClassNames
- [x] AC2: Heading, SubHeading, Button, and Panel components include typography token defaults in colorMap

**Technical Notes:**
Typography tokens use standard Tailwind classes: `font-bold`, `tracking-tight`, `leading-snug`, etc.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Storybook typography components verified
- [x] Backward compatibility verified

---

### Should-Have (P1)

**US-003: hoverTextColor Bug Fix**

> As a library consumer developer,
> I want hoverTextColor to actually apply a hover: prefix,
> so that text color changes on hover work correctly.

**Priority:** P1
**Status:** Complete

**Acceptance Criteria:**

- [x] AC1: `getStyleValueVariant("hoverTextColor", "text-white")` returns `"hover:text-white"`
- [x] AC2: Components using hoverTextColor show the correct text color on hover in Storybook

**Technical Notes:**
Bug is in the `getStyleValueVariant` function -- hoverTextColor was missing from the hover variant mapping.

**Definition of Done:**

- [x] Code implemented and reviewed
- [x] Manual hover test in Storybook passes

---

## Feature Requirements

### Functional Requirements

**FR-001: New styleClassNames**

- **Description:** Add focusRingColor, focusBorderColor, activeBackgroundColor, activeTextColor, disabledOpacity, fontWeight, letterSpacing, lineHeight, and cursor to the styleClassNames system
- **User Story:** US-001, US-002
- **Priority:** P0
- **Validation:** `getStylesForItem` returns these properties in the output object and string

**FR-002: Tailwind Safelist Extension**

- **Description:** Add `focus-visible:`, `active:`, and `disabled:` variant prefixes to the Tailwind safelist so generated classes survive purging
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Built tailwind.css contains focus-visible, active, and disabled variant classes

**FR-003: hoverTextColor Fix**

- **Description:** Fix getStyleValueVariant to apply `hover:` prefix to hoverTextColor values
- **User Story:** US-003
- **Priority:** P1
- **Validation:** Hover text color changes visible in Storybook

### Non-Functional Requirements

**NFR-001: Backward Compatibility**

- Zero breaking changes to existing component rendering
- All existing colorMap entries continue to produce identical output

**NFR-002: Performance**

- No measurable increase in getStylesForItem execution time (additional token lookups are O(1) map access)

---

## Design Considerations

### Architecture Requirements

- New tokens follow the same resolution pattern: colorMap default -> theme override -> component prop
- `getStyleValueVariant` must handle prefix mapping for focus-visible:, active:, and disabled: variants
- Tailwind safelist must be maintained alongside new tokens to prevent class purging

### Dependencies

**Internal:**

- Required by PRD-002 (interactive components) and PRD-003 (form input components)
- Consumed by all theme-aware components

**External:**

- TailwindCSS 3 (existing dependency, no version change needed)

---

## Open Questions & Decisions

### Decisions Made

| Date       | Decision                                     | Rationale                                                                       | Owner           |
| ---------- | -------------------------------------------- | ------------------------------------------------------------------------------- | --------------- |
| 2026-02-15 | Use focus-visible: instead of focus:         | focus-visible only shows on keyboard nav, not mouse click -- better UX          | dash-react team |
| 2026-02-15 | Add cursor as a theme token                  | Allows themes to control cursor-pointer vs cursor-default per component         | dash-react team |
| 2026-02-15 | Keep class-based approach (no CSS variables) | Maintains consistency with existing system; CSS variables can be explored later | dash-react team |

---

## Out of Scope

**Explicitly excluded from this PRD:**

- CSS custom properties / variables system -- would require fundamental architecture change
- Animation keyframes -- transition-colors is sufficient for interactive state changes
- Color palette generation -- themes continue to reference existing Tailwind color classes

**Future Considerations:**

- CSS variables system for runtime theme switching without class swapping
- Design token export format (e.g., Style Dictionary) for cross-platform use

---

## Implementation Phases

### Phase 1: Core Token Expansion (P0)

**Timeline:** Complete

**Deliverables:**

- [x] US-001: Interactive state tokens in styleClassNames and colorMap
- [x] US-002: Typography tokens in styleClassNames and colorMap
- [x] FR-002: Tailwind safelist extension

**Success Criteria:** All 9 new tokens resolve through getStylesForItem; existing components unchanged.

### Phase 2: Bug Fix and Polish (P1)

**Timeline:** Complete

**Deliverables:**

- [x] US-003: hoverTextColor bug fix

**Success Criteria:** hoverTextColor applies hover: prefix correctly.

---

## Technical Documentation

**Key files:**

- [src/Utils/colors.js](../../src/Utils/colors.js) - styleClassNames, colorMap, getStyleValueVariant
- [src/Utils/themeObjects.js](../../src/Utils/themeObjects.js) - Component theme keys
- [tailwind.config.js](../../tailwind.config.js) - Safelist configuration

---

## Revision History

| Version | Date       | Author          | Changes                                         |
| ------- | ---------- | --------------- | ----------------------------------------------- |
| 1.0     | 2026-02-15 | dash-react team | Initial PRD (approved, implementation complete) |
