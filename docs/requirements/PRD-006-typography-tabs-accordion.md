# PRD: Typography Updates + Tabs & Accordion Components

**Status:** Approved
**Last Updated:** 2026-02-15
**Owner:** dash-react team
**Related PRDs:** [PRD-004: Container & Surface Components](./PRD-004-container-surface-components.md), [PRD-005: Feedback & Information Components](./PRD-005-feedback-information-components.md)

---

## Executive Summary

Modernizes dash-react's typography components with theme-driven font properties and introduces two new compound components -- Tabs and Accordion -- following the shadcn/ui aesthetic with full theme system integration. Typography components (Heading, SubHeading, Paragraph) currently use hardcoded font weights and lack semantic HTML control. Tabs and Accordion are essential dashboard UI patterns that the library does not yet provide, forcing consumers to build their own or pull in external dependencies.

---

## Context & Background

### Problem Statement

**What problem are we solving?**

Typography components (Heading, Heading2, Heading3, SubHeading, SubHeading2, SubHeading3, Paragraph) use hardcoded classes like `font-bold` and `font-medium` directly in JSX. This means consumers cannot adjust font weight, letter spacing, or line height through the theme system. For a library that promotes theme-driven styling, typography is a notable gap.

Additionally, dash-react lacks Tabs and Accordion components. These are fundamental UI patterns in dashboard applications -- Tabs for organizing content into switchable views, and Accordions for collapsible sections of information. Without them, consumers either build custom implementations or import third-party components that do not integrate with the dash-react theme system.

**Who experiences this problem?**

- Primary: Dash app developers who need Tabs and Accordion components
- Secondary: Theme designers who want typographic control through the theme system

**What happens if we don't solve it?**

Consumers build ad-hoc Tabs and Accordion implementations that are inconsistent across widgets, lack accessibility, and do not respond to theme changes. Typography remains a second-class citizen in the theme system, limiting the expressiveness of custom themes.

### Current State

**What exists today?**

Typography components exist with hardcoded styling. The library has no Tabs or Accordion components.

**Limitations:**

- Heading components hardcode `font-bold` -- not overridable via theme
- SubHeading components hardcode `font-medium` -- not overridable via theme
- No `as` prop for semantic HTML rendering (all headings render as divs)
- No letter-spacing or line-height theme tokens
- No Tabs component -- consumers must build their own
- No Accordion component -- consumers must build their own

---

## Goals & Success Metrics

### Primary Goals

1. **Theme-driven typography** - Use `styles.fontWeight`, `styles.letterSpacing`, `styles.lineHeight` from theme instead of hardcoded values; Headings get `tracking-tight`, `leading-tight`; Paragraphs get `leading-normal`
2. **Semantic HTML for typography** - Add optional `as` prop for rendering as h1-h6 or p elements
3. **Tabs compound component** - Tabs, Tabs.List, Tabs.Trigger, Tabs.Content with controlled/uncontrolled modes, 3 variants, shadcn/ui aesthetic, full ARIA support
4. **Accordion compound component** - Accordion, Accordion.Item, Accordion.Trigger, Accordion.Content with single/multiple mode, 3 variants, animated height transition, chevron rotation, full ARIA support

### Success Metrics

| Metric                              | Target                                            | How Measured        |
| ----------------------------------- | ------------------------------------------------- | ------------------- |
| Typography hardcoded styles removed | 0 hardcoded font-weight/spacing in typography JSX | Code audit          |
| Tabs ARIA compliance                | Full tablist/tab/tabpanel roles, aria-selected    | Accessibility audit |
| Accordion ARIA compliance           | aria-expanded on all triggers                     | Accessibility audit |
| Tabs variants                       | 3 variants (Tabs, Tabs2, Tabs3)                   | Storybook stories   |
| Accordion variants                  | 3 variants (Accordion, Accordion2, Accordion3)    | Storybook stories   |

### Non-Goals

**What are we explicitly NOT doing?**

- Vertical tabs layout -- horizontal tabs only for MVP
- Accordion nested inside Accordion -- single level only for MVP
- Drag-to-reorder tabs -- beyond scope of initial implementation

---

## User Personas

### Dash Widget Developer

**Role:** Developer building individual widgets for Dash dashboards

**Goals:**

- Organize widget content into tabs (e.g., Data / Settings / About)
- Collapse/expand sections of configuration or detail information
- Use semantic HTML for better SEO and accessibility

**Pain Points:**

- Must build custom tab implementations per widget
- No consistent accordion pattern across widgets
- Headings render as divs, hurting accessibility and SEO

**Technical Level:** Intermediate

**Success Scenario:** Import Tabs and Accordion from dash-react, drop them into a widget, and get polished, theme-aware, accessible components with zero custom CSS.

### Dashboard Theme Designer

**Role:** Developer customizing the visual language of a Dash application

**Goals:**

- Control typography weight, spacing, and line height through theme tokens
- Style Tabs and Accordion to match the overall theme

**Pain Points:**

- Cannot change heading font weight via theme (hardcoded font-bold)
- No Tabs/Accordion to style yet

**Technical Level:** Intermediate

**Success Scenario:** Adjust `fontWeight: "font-semibold"` in the theme for headings, and all Heading components update. Style Tabs active indicator and Accordion chevron through theme tokens.

### Accessibility-Conscious Developer

**Role:** Developer building accessible dashboard applications

**Goals:**

- Tabs and Accordion follow WAI-ARIA authoring practices
- Typography uses semantic HTML elements (h1-h6, p)

**Pain Points:**

- Current headings render as divs with no semantic meaning
- No accessible Tabs or Accordion components available in the library

**Technical Level:** Advanced

**Success Scenario:** Screen reader users can navigate tabs with arrow keys, understand heading hierarchy, and expand/collapse accordion sections with keyboard.

---

## User Stories

### Must-Have (P0)

**US-001: Theme-Driven Typography Properties**

> As a dashboard theme designer,
> I want Heading, SubHeading, and Paragraph components to use `styles.fontWeight`, `styles.letterSpacing`, and `styles.lineHeight` from the theme system,
> so that I can control typographic style globally through theme configuration.

**Priority:** P0
**Status:** Backlog

**Acceptance Criteria:**

- [ ] AC1: Heading components use `styles.fontWeight` instead of hardcoded `font-bold`
- [ ] AC2: SubHeading components use `styles.fontWeight` instead of hardcoded `font-medium`
- [ ] AC3: Heading components include `tracking-tight` and `leading-tight` as defaults from colorMap
- [ ] AC4: Paragraph components include `leading-normal` as default from colorMap
- [ ] AC5: All typography components accept an optional `as` prop to render as h1-h6 or p
- [ ] AC6: Default `as` value renders the same element as current behavior (div) for backward compatibility

**Edge Cases:**

- `as="h1"` with Heading3 (small size) -> Renders as h1 element with small text size; semantic level and visual size are independent
- No `as` prop provided -> Component renders as div (backward compatible)

**Technical Notes:**
Add `fontWeight`, `letterSpacing`, `lineHeight` keys to typography entries in colorMap. Replace hardcoded `font-bold` / `font-medium` in JSX with `styles.fontWeight`. Use the `as` prop with `React.createElement` or a simple variable element pattern: `const Tag = as || 'div'; return <Tag ...>`.

**Example Scenario:**

```javascript
// Before: Heading always renders font-bold div
<Heading>Dashboard</Heading>
// Renders: <div class="text-6xl font-bold ...">Dashboard</div>

// After: Theme-driven, semantic
<Heading as="h1">Dashboard</Heading>
// Renders: <h1 class="text-6xl font-bold tracking-tight leading-tight ...">Dashboard</h1>

// With theme override:
// theme[themeObjects.HEADING].fontWeight = "font-semibold"
// Renders: <h1 class="text-6xl font-semibold tracking-tight leading-tight ...">Dashboard</h1>
```

**Definition of Done:**

- [ ] Code implemented and reviewed
- [ ] Storybook stories demonstrate `as` prop and theme-driven weight
- [ ] Build succeeds (`npm run build`)
- [ ] Existing typography renders identically when no `as` prop or theme override is provided

---

**US-002: Tabs Compound Component**

> As a dash widget developer,
> I want a Tabs compound component with Tabs.List, Tabs.Trigger, and Tabs.Content sub-components,
> so that I can organize widget content into switchable views with consistent styling and accessibility.

**Priority:** P0
**Status:** Backlog

**Acceptance Criteria:**

- [ ] AC1: Tabs supports controlled mode via `value` and `onValueChange` props
- [ ] AC2: Tabs supports uncontrolled mode via `defaultValue` prop
- [ ] AC3: Three variants exist: Tabs (standard padding), Tabs2 (medium), Tabs3 (compact) following library convention
- [ ] AC4: Tabs.List renders with a muted background; active Tabs.Trigger renders with white/primary background and `shadow-sm` (shadcn/ui aesthetic)
- [ ] AC5: Tabs.List has `role="tablist"`; Tabs.Trigger has `role="tab"` and `aria-selected`
- [ ] AC6: Tabs.Content panels have `role="tabpanel"` and are shown/hidden based on active tab
- [ ] AC7: Keyboard navigation: Left/Right arrows move between tabs, Enter/Space activates a tab
- [ ] AC8: All styling flows through `getStylesForItem()` and the theme system

**Edge Cases:**

- Single tab -> Renders normally, no arrow key navigation needed
- Tab content is empty -> Content panel renders empty with correct role
- Controlled mode with no matching value -> No tab content shown

**Technical Notes:**
Use React Context internally to share active tab state between Tabs (parent) and sub-components. Follow the existing compound component pattern (similar to Panel.Header, Panel.Body, Panel.Footer). Add colorMap entries for TABS, TABS_LIST, TABS_TRIGGER, TABS_CONTENT. Create three variant components with different padding levels.

**Example Scenario:**

```javascript
import { Tabs } from "@trops/dash-react";

// Uncontrolled
<Tabs defaultValue="overview">
    <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Trigger value="logs">Logs</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">Overview content here</Tabs.Content>
    <Tabs.Content value="settings">Settings content here</Tabs.Content>
    <Tabs.Content value="logs">Logs content here</Tabs.Content>
</Tabs>;

// Controlled
const [tab, setTab] = useState("overview");
<Tabs value={tab} onValueChange={setTab}>
    ...
</Tabs>;
```

**Definition of Done:**

- [ ] Component implemented with all sub-components
- [ ] Three variants created (Tabs, Tabs2, Tabs3)
- [ ] colorMap entries added for all Tabs theme objects
- [ ] themeObjects constants added
- [ ] Exported from index.js
- [ ] Storybook stories for each variant and mode
- [ ] ARIA roles and keyboard navigation verified
- [ ] Build succeeds (`npm run build`)

---

**US-003: Accordion Compound Component**

> As a dash widget developer,
> I want an Accordion compound component with Accordion.Item, Accordion.Trigger, and Accordion.Content sub-components,
> so that I can present collapsible content sections with smooth animations and accessibility.

**Priority:** P0
**Status:** Backlog

**Acceptance Criteria:**

- [ ] AC1: Accordion supports `type="single"` (one item open at a time) and `type="multiple"` (any number of items open)
- [ ] AC2: Three variants exist: Accordion (standard padding), Accordion2 (medium), Accordion3 (compact) following library convention
- [ ] AC3: Accordion.Content animates height from 0 to auto using `scrollHeight` measurement and CSS transition
- [ ] AC4: Accordion.Trigger includes a chevron icon that rotates (0 -> 180 degrees) when the item is expanded
- [ ] AC5: Accordion.Trigger has `aria-expanded` attribute reflecting open/closed state
- [ ] AC6: Keyboard navigation: Enter/Space toggles the focused item
- [ ] AC7: All styling flows through `getStylesForItem()` and the theme system
- [ ] AC8: In `type="single"` mode, opening one item closes the previously open item

**Edge Cases:**

- All items collapsed in single mode -> Valid state, no item forced open
- Accordion with one item -> Works normally, no special casing needed
- Content height changes after open (dynamic content) -> scrollHeight recalculated on content change or use max-height approach

**Technical Notes:**
Use React Context internally to share open state between Accordion (parent) and sub-components. Height animation approach: set `max-height: 0; overflow: hidden; transition: max-height 300ms ease` on content wrapper; on open, set `max-height` to `scrollHeight` via ref measurement. Chevron rotation via `transform: rotate(180deg)` with `transition-transform duration-200`. Add colorMap entries for ACCORDION, ACCORDION_ITEM, ACCORDION_TRIGGER, ACCORDION_CONTENT.

**Example Scenario:**

```javascript
import { Accordion } from "@trops/dash-react";

// Single mode (one open at a time)
<Accordion type="single">
    <Accordion.Item value="section-1">
        <Accordion.Trigger>What is dash-react?</Accordion.Trigger>
        <Accordion.Content>
            A React UI component library for dashboard applications.
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="section-2">
        <Accordion.Trigger>How do I install it?</Accordion.Trigger>
        <Accordion.Content>
            npm install @trops/dash-react
        </Accordion.Content>
    </Accordion.Item>
</Accordion>

// Multiple mode
<Accordion type="multiple">
    ...
</Accordion>
```

**Definition of Done:**

- [ ] Component implemented with all sub-components
- [ ] Three variants created (Accordion, Accordion2, Accordion3)
- [ ] Height animation working smoothly (0 to auto)
- [ ] Chevron rotation on open/close
- [ ] colorMap entries added for all Accordion theme objects
- [ ] themeObjects constants added
- [ ] Exported from index.js
- [ ] Storybook stories for each variant and mode
- [ ] ARIA attributes and keyboard navigation verified
- [ ] Build succeeds (`npm run build`)

---

## Feature Requirements

### Functional Requirements

**FR-001: Theme-Driven Typography**

- **Description:** Typography components must read `fontWeight`, `letterSpacing`, and `lineHeight` from the styles object returned by `getStylesForItem()` instead of using hardcoded CSS classes
- **User Story:** US-001
- **Priority:** P0
- **Validation:** Changing fontWeight in theme updates all heading components in Storybook

**FR-002: Semantic HTML Typography**

- **Description:** All typography components must accept an optional `as` prop to render as a specific HTML element (h1-h6, p, span)
- **User Story:** US-001
- **Priority:** P0
- **Validation:** `<Heading as="h1">` renders an `<h1>` element in the DOM

**FR-003: Tabs Component**

- **Description:** A compound component (Tabs, Tabs.List, Tabs.Trigger, Tabs.Content) that supports controlled and uncontrolled modes with theme integration
- **User Story:** US-002
- **Priority:** P0
- **Validation:** Tabs render with correct ARIA roles and switch content when triggers are clicked

**FR-004: Accordion Component**

- **Description:** A compound component (Accordion, Accordion.Item, Accordion.Trigger, Accordion.Content) that supports single/multiple mode with animated height transitions
- **User Story:** US-003
- **Priority:** P0
- **Validation:** Accordion items expand/collapse with smooth height animation and chevron rotation

**FR-005: Tabs and Accordion Variants**

- **Description:** Both Tabs and Accordion must have 3 variants following the library's naming convention (Component, Component2, Component3) with decreasing padding levels
- **User Story:** US-002, US-003
- **Priority:** P0
- **Validation:** All 6 variant components render correctly in Storybook

### Non-Functional Requirements

**NFR-001: Performance**

- Tabs content panels should not mount/unmount on switch (use display: none for hidden panels) to preserve state
- Accordion height animation should use CSS transitions, not JavaScript animation loops
- Typography changes are CSS-only with no runtime overhead

**NFR-002: Accessibility**

- Tabs: `role="tablist"` on list, `role="tab"` and `aria-selected` on triggers, `role="tabpanel"` on content, keyboard arrow navigation
- Accordion: `aria-expanded` on triggers, `role="region"` on content, Enter/Space keyboard toggle
- Typography: `as` prop enables semantic heading hierarchy for screen readers

**NFR-003: Backward Compatibility**

- Typography components render identically when no `as` prop or theme override is provided
- New components (Tabs, Accordion) are additive and do not affect existing components
- Default colorMap values for typography match current hardcoded values

**NFR-004: Bundle Size**

- Tabs and Accordion should not import external animation libraries
- Components should be tree-shakeable for consumers who do not use them

---

## User Workflows

### Workflow 1: Adding Tabs to a Widget

**Trigger:** Developer wants to organize widget content into tabs

**Steps:**

1. Developer imports `Tabs` from `@trops/dash-react`
2. Developer wraps content in `<Tabs defaultValue="tab1">`
3. Developer adds `<Tabs.List>` with `<Tabs.Trigger>` for each tab
4. Developer adds `<Tabs.Content>` for each tab's content
5. Component renders with shadcn/ui-style active tab indicator

**Success State:** Tabs render with correct styling, switch content on click, and support keyboard navigation

**Error Scenarios:**

- Missing defaultValue and no value prop -> First tab selected by default
- Trigger value does not match any Content value -> No content panel shown

**Time Estimate:** < 5 minutes to implement basic tabs

**Example:**

```javascript
import { Tabs } from "@trops/dash-react";

<Tabs defaultValue="data">
    <Tabs.List>
        <Tabs.Trigger value="data">Data</Tabs.Trigger>
        <Tabs.Trigger value="chart">Chart</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="data">
        <DataTable rows={rows} />
    </Tabs.Content>
    <Tabs.Content value="chart">
        <LineChart data={chartData} />
    </Tabs.Content>
</Tabs>;
```

### Workflow 2: Adding Accordion to a Settings Panel

**Trigger:** Developer wants collapsible sections in a settings or FAQ panel

**Steps:**

1. Developer imports `Accordion` from `@trops/dash-react`
2. Developer wraps sections in `<Accordion type="single">`
3. Developer adds `<Accordion.Item>` with `<Accordion.Trigger>` and `<Accordion.Content>` for each section
4. Component renders with collapsed sections and chevron icons
5. User clicks a trigger; section expands with smooth height animation and chevron rotates

**Success State:** Sections expand/collapse smoothly, only one open at a time in single mode

**Error Scenarios:**

- Very tall content -> Smooth animation still works; scrollHeight accurately measured
- Empty content -> Section expands to minimal height

**Time Estimate:** < 5 minutes to implement basic accordion

**Example:**

```javascript
import { Accordion } from "@trops/dash-react";

<Accordion type="single">
    <Accordion.Item value="general">
        <Accordion.Trigger>General Settings</Accordion.Trigger>
        <Accordion.Content>
            <SettingsForm section="general" />
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="advanced">
        <Accordion.Trigger>Advanced Settings</Accordion.Trigger>
        <Accordion.Content>
            <SettingsForm section="advanced" />
        </Accordion.Content>
    </Accordion.Item>
</Accordion>;
```

### Workflow 3: Customizing Typography via Theme

**Trigger:** Developer wants to change heading weight and add semantic HTML

**Steps:**

1. Developer adds `fontWeight: "font-semibold"` to theme under `themeObjects.HEADING`
2. All Heading components update to use font-semibold instead of font-bold
3. Developer adds `as="h1"` to their main Heading for semantic markup
4. Heading renders as an `<h1>` element with theme-driven styling

**Success State:** Typography responds to theme changes and uses semantic HTML

**Error Scenarios:**

- Invalid `as` value (e.g., `as="div123"`) -> React renders it as a custom element; no crash

**Time Estimate:** < 1 minute for theme change, < 1 minute per `as` prop addition

---

## Design Considerations

### UI/UX Requirements

- **Tabs (shadcn/ui aesthetic):** Tabs.List has a muted/subtle background (e.g., `bg-muted` / `bg-gray-100` in light, `bg-gray-800` in dark). Active Tabs.Trigger has white/primary background with `shadow-sm` and slightly rounded corners. Inactive triggers are transparent with muted text.
- **Accordion:** Clean separator lines between items. Chevron icon on the right side of triggers. Smooth height animation (not jarring). Content has subtle top padding when expanded.
- **Typography:** `tracking-tight` creates a modern, dense heading appearance. `leading-tight` reduces line height for multi-line headings. `leading-normal` ensures paragraph readability.

### Architecture Requirements

- Tabs and Accordion use internal React Context for parent-child communication (same pattern as Panel sub-components)
- Both components must integrate with `getStylesForItem()` and the colorMap
- Variant creation follows the established pattern (Component/Component2/Component3 with different padding)
- Typography `as` prop implementation should use simple variable element pattern, not React.createElement string

### Dependencies

**Internal:**

- ThemeContext and `getStylesForItem()` utility
- colorMap (needs new entries for Tabs and Accordion theme objects)
- themeObjects.js (needs new constants)
- index.js (needs new exports)

**External:**

- No new external dependencies required
- Chevron icon can use inline SVG or an existing icon solution in the library

---

## Open Questions & Decisions

### Decisions Made

| Date       | Decision                                              | Rationale                                                                         | Owner           |
| ---------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- | --------------- |
| 2026-02-15 | Follow shadcn/ui aesthetic for Tabs                   | Modern, widely recognized design pattern that fits dashboard UI context           | dash-react team |
| 2026-02-15 | Use scrollHeight + max-height for Accordion animation | Pure CSS approach, no animation library dependency, performant                    | dash-react team |
| 2026-02-15 | Three variants per component                          | Follows established library convention (Panel, Panel2, Panel3) for padding tiers  | dash-react team |
| 2026-02-15 | Default `as` prop to div for backward compatibility   | Changing default render element would be a breaking change for existing consumers | dash-react team |

---

## Out of Scope

**Explicitly excluded from this PRD:**

- Vertical Tabs layout -- horizontal is sufficient for MVP; vertical can be a future enhancement
- Nested Accordions -- single level only; nesting adds complexity without clear dashboard use case
- Drag-to-reorder Tabs -- would require drag-and-drop integration, separate PRD
- Typography responsive sizing -- would require a breakpoint system, separate concern

**Future Considerations:**

- Tabs: lazy mounting option for content panels (mount on first activation)
- Tabs: closable/removable tabs for dynamic tab management
- Accordion: defaultOpen prop for items that should start expanded
- Typography: responsive text size variants based on viewport
- Shared animation utilities extracted from Accordion for use in other components

---

## Implementation Phases

### Phase 1: Typography Updates (P0)

**Timeline:** 1 day

**Deliverables:**

- [ ] US-001: Theme-driven typography with `as` prop

**Success Criteria:** All typography components use theme tokens for fontWeight, letterSpacing, lineHeight. Optional `as` prop renders semantic HTML elements. No visual regression when `as` prop is not used.

**Risks:**

- Changing Heading render output may affect existing consumer CSS selectors -> Mitigation: default element remains div when `as` is not provided
- New colorMap keys may conflict with existing theme overrides -> Mitigation: default values match current hardcoded values exactly

### Phase 2: Tabs Component (P0)

**Timeline:** 2-3 days

**Deliverables:**

- [ ] US-002: Tabs compound component with 3 variants

**Success Criteria:** Tabs component fully functional with controlled/uncontrolled modes, ARIA compliance, keyboard navigation, theme integration, and 3 padding variants.

**Risks:**

- Internal Context pattern may conflict with ThemeContext -> Mitigation: use a separate TabsContext, not ThemeContext
- Keyboard navigation edge cases -> Mitigation: follow WAI-ARIA Tabs pattern specification exactly

**Dependencies:**

- Phase 1 completion not required (independent work)

### Phase 3: Accordion Component (P0)

**Timeline:** 2-3 days

**Deliverables:**

- [ ] US-003: Accordion compound component with 3 variants

**Success Criteria:** Accordion component fully functional with single/multiple modes, animated height transitions, chevron rotation, ARIA compliance, and 3 padding variants.

**Risks:**

- Height animation from 0 to auto is a known CSS challenge -> Mitigation: use scrollHeight measurement with max-height transition as proven approach
- Dynamic content height changes after open -> Mitigation: use ResizeObserver or re-measure on content change

**Dependencies:**

- Phase 1 and 2 completion not required (independent work)

---

## Technical Documentation

**See related technical docs:**

- [CLAUDE.md](../../CLAUDE.md) - Component patterns, theme system, variant conventions
- [src/Utils/colors.js](../../src/Utils/colors.js) - colorMap definitions and getStylesForItem
- [src/Utils/themeObjects.js](../../src/Utils/themeObjects.js) - Theme object key constants
- [src/Common/Panel.js](../../src/Common/Panel.js) - Reference implementation for compound components with sub-components

**Implementation Status:** Not started

---

## Testing Requirements

### Unit Tests

**Coverage Target:** 80% minimum for new components

**Test Cases:**

- [ ] Typography renders with theme-driven fontWeight
- [ ] Typography `as` prop renders correct HTML element
- [ ] Tabs controlled mode updates on value change
- [ ] Tabs uncontrolled mode manages internal state
- [ ] Tabs keyboard navigation (arrow keys, Enter, Space)
- [ ] Tabs ARIA roles present (tablist, tab, tabpanel, aria-selected)
- [ ] Accordion single mode closes previous item when new one opens
- [ ] Accordion multiple mode allows multiple open items
- [ ] Accordion height animation triggers on open/close
- [ ] Accordion ARIA attributes present (aria-expanded)
- [ ] All 3 variants render with correct padding for both Tabs and Accordion

### Manual Testing

**Test Checklist:**

- [ ] Typography renders identically when no `as` prop provided (backward compat)
- [ ] `<Heading as="h1">` renders an h1 element in DOM inspector
- [ ] Theme fontWeight override changes heading appearance
- [ ] Tabs switch content on trigger click
- [ ] Tabs active trigger has white background with shadow-sm
- [ ] Tabs keyboard arrow navigation works
- [ ] Accordion items expand/collapse with smooth animation
- [ ] Accordion chevron rotates on open
- [ ] Accordion single mode enforces one-at-a-time
- [ ] All variants (1, 2, 3) render with decreasing padding
- [ ] Screen reader announces tab roles and accordion expanded state
- [ ] Build succeeds: `npm run build`

---

## Revision History

| Version | Date       | Author          | Changes     |
| ------- | ---------- | --------------- | ----------- |
| 1.0     | 2026-02-15 | dash-react team | Initial PRD |
