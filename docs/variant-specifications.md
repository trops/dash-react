# Component Variant Specifications

**Version:** 1.0
**Last Updated:** 2026-02-13

## Table of Contents
1. [Design Principles](#design-principles)
2. [Text Size Patterns](#text-size-patterns)
3. [Padding Patterns](#padding-patterns)
4. [Font Weight Patterns](#font-weight-patterns)
5. [Border Radius & Shadow Patterns](#border-radius--shadow-patterns)
6. [Component Development Guidelines](#component-development-guidelines)
7. [Validation Checklist](#validation-checklist)
8. [Reference Examples](#reference-examples)

---

## Design Principles

The dash-react library implements a **3-variant design system** for components:
- **Primary (Component)**: Largest, most prominent variant
- **Secondary (Component2)**: Medium variant
- **Tertiary (Component3)**: Smallest, most subtle variant

### Core Philosophy

**Progressive Visual Hierarchy**: Each variant should be visually distinct and progressively smaller/lighter from primary to tertiary. This creates clear visual hierarchy and allows developers to choose the appropriate emphasis level for their use case.

**Key Principles:**
1. **Decreasing Size**: Primary > Secondary > Tertiary
2. **Decreasing Padding**: More internal space → Less internal space
3. **Decreasing Font Weight**: Bolder → Medium → Normal/Light
4. **Consistent Purpose**: All three variants serve the same functional purpose, differing only in visual emphasis

**Why 3 Variants?**
- Provides flexibility for different contexts and emphasis levels
- Maintains consistency across the design system
- Prevents arbitrary sizing decisions in application code
- Creates predictable, reusable patterns

---

## Text Size Patterns

Text size should decrease progressively from primary to tertiary variants.

### Recommended Progressions

| Component Family | Primary | Secondary | Tertiary | Notes |
|-----------------|---------|-----------|----------|-------|
| **Heading** | `text-6xl` | `text-5xl` | `text-4xl` | Large, bold hierarchy |
| **SubHeading** | `text-3xl` | `text-2xl` | `text-xl` | Medium hierarchy |
| **Paragraph** | `text-base` / `text-lg` | `text-sm` / `text-base` | `text-xs` / `text-sm` | Body text sizes |
| **Button** | `text-lg` / `text-xl` / `text-2xl` (responsive) | `text-base` / `text-lg` | `text-sm` / `text-base` | Button text |
| **Tag** | `text-sm` | `text-xs` | `text-xs` | Small labels (padding differentiates) |
| **Alert** | `text-base` | `text-sm` | `text-sm` | Notification text |
| **MenuItem** | `text-lg` | `text-base` | `text-sm` | Navigation items |

### Guidelines

- **Minimum 1 step difference**: Primary and secondary should differ by at least one Tailwind size step
- **Responsive sizing**: Larger components (Heading, Button) may use responsive text sizes (e.g., `text-lg lg:text-xl`)
- **Same size acceptable for Tertiary**: If Secondary and Tertiary share text size, differentiate with font weight and padding
- **Context matters**: Body text components use smaller base sizes than display text components

---

## Padding Patterns

Padding should decrease progressively to create visual density hierarchy.

### Recommended Progressions

| Component Family | Primary | Secondary | Tertiary | Notes |
|-----------------|---------|-----------|----------|-------|
| **Card** | `p-6` | `p-4` | `p-2` | Container padding |
| **Panel** | `p-6` | `p-4` | `p-2` | Layout panels |
| **Alert** | `p-4` | `p-3` | `p-2` | Notification boxes |
| **Toast** | `p-4` | `p-3` | `p-2` | Toast notifications |
| **Button** | `px-6 py-3` | `px-4 py-2` | `px-3 py-1.5` | Button padding |
| **Tag** | `px-3 py-1.5` | `px-2 py-1` | `px-1.5 py-0.5` | Compact labels |
| **MenuItem** | `p-4` | `p-2 px-4` | `p-2 px-4` | Navigation (vertical padding differs) |

### Guidelines

- **2-4-6 pattern**: For larger components, use `p-2`, `p-4`, `p-6` progression
- **Asymmetric padding**: Buttons and menu items may use different horizontal/vertical padding
- **Minimum p-2**: Don't go below `p-2` (8px) for most components - ensures touch targets remain accessible
- **Compact components**: Tags and badges can use `py-0.5` (2px) for tertiary variants
- **Responsive exceptions**: Some components (Heading, SubHeading) may keep consistent padding for layout stability

---

## Font Weight Patterns

Font weight should decrease to create typographic hierarchy.

### Recommended Progressions

| Component Family | Primary | Secondary | Tertiary | Notes |
|-----------------|---------|-----------|----------|-------|
| **Heading** | `font-bold` | `font-bold` | `font-bold` | Headlines stay bold |
| **SubHeading** | `font-medium` | `font-medium` | `font-normal` | Subheadings can vary |
| **Paragraph** | `font-normal` | `font-normal` | `font-normal` | Body text stays normal |
| **Button** | `font-bold` | `font-medium` | `font-normal` | Strong → Medium → Light |
| **Tag** | `font-medium` | `font-medium` | `font-normal` | Labels get lighter |
| **Alert** | `font-semibold` | `font-medium` | `font-normal` | Alert titles |
| **MenuItem** | `font-bold` | `font-medium` | `font-normal` | Navigation hierarchy |

### Guidelines

- **Display text stays bold**: Headings should remain bold across variants
- **Interactive elements vary**: Buttons and menu items benefit from weight progression
- **Body text stays normal**: Paragraphs typically use `font-normal` across all variants
- **Title elements**: Component titles (Alert, Toast) follow weight progression

### Tailwind Font Weight Values
- `font-normal`: 400
- `font-medium`: 500
- `font-semibold`: 600
- `font-bold`: 700

---

## Border Radius & Shadow Patterns

Visual polish elements should also follow progressive patterns.

### Border Radius Progression

| Component Family | Primary | Secondary | Tertiary | Notes |
|-----------------|---------|-----------|----------|-------|
| **Card** | `rounded-lg` | `rounded-md` | `rounded` | Container rounding |
| **Panel** | `rounded-lg` | `rounded-md` | `rounded` | Layout panels |
| **Button** | `rounded-md` | `rounded-md` | `rounded` | Interactive elements |
| **Tag** | `rounded` | `rounded` | `rounded` | Consistent small radius |
| **Alert/Toast** | `rounded-md` | `rounded-md` | `rounded-md` | Notifications (consistent) |

**Tailwind Values:**
- `rounded`: 0.25rem (4px)
- `rounded-md`: 0.375rem (6px)
- `rounded-lg`: 0.5rem (8px)

### Shadow Progression

| Component Family | Primary | Secondary | Tertiary | Notes |
|-----------------|---------|-----------|----------|-------|
| **Card** | `shadow-md` | `shadow` | `shadow-sm` | Elevation levels |
| **Toast** | `shadow-lg` | `shadow-lg` | `shadow-lg` | Always elevated |
| **Button (hover)** | `hover:shadow-lg` | `hover:shadow-md` | `hover:shadow` | Interactive feedback |

**Tailwind Values:**
- `shadow-sm`: Subtle shadow
- `shadow`: Default shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow

---

## Component Development Guidelines

Follow these guidelines when creating new component variants.

### 1. Create All Three Variants

Always implement all three variants (Component, Component2, Component3) when creating a new component family.

### 2. Establish Progressive Patterns

Before coding, decide on the progression for:
- Text size
- Padding
- Font weight
- Border radius
- Shadow

Document these decisions in comments at the top of the component file.

### 3. Component Template Structure

```javascript
import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

// Component Variant Specifications:
// Primary: text-lg, p-6, font-bold, rounded-lg, shadow-md
// Secondary: text-base, p-4, font-medium, rounded-md, shadow
// Tertiary: text-sm, p-2, font-normal, rounded, shadow-sm

const ComponentName = ({
    // props
    padding = "p-6",  // PRIMARY: Largest padding
    rounded = "rounded-lg",
    shadow = "shadow-md",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME, currentTheme, {
        ...props,
    });

    const uuid = getUUID("", "component-name");

    return (
        <div
            id={uuid}
            className={`${styles.string} ${padding} ${rounded} ${shadow} text-lg font-bold ${className}`}
        >
            {/* Component content */}
        </div>
    );
};

const ComponentName2 = ({
    padding = "p-4",  // SECONDARY: Medium padding
    rounded = "rounded-md",
    shadow = "shadow",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME_2, currentTheme, {
        ...props,
    });

    const uuid = getUUID("", "component-name-2");

    return (
        <div
            id={uuid}
            className={`${styles.string} ${padding} ${rounded} ${shadow} text-base font-medium ${className}`}
        >
            {/* Component content */}
        </div>
    );
};

const ComponentName3 = ({
    padding = "p-2",  // TERTIARY: Smallest padding
    rounded = "rounded",
    shadow = "shadow-sm",
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.COMPONENT_NAME_3, currentTheme, {
        ...props,
    });

    const uuid = getUUID("", "component-name-3");

    return (
        <div
            id={uuid}
            className={`${styles.string} ${padding} ${rounded} ${shadow} text-sm font-normal ${className}`}
        >
            {/* Component content */}
        </div>
    );
};

export { ComponentName, ComponentName2, ComponentName3 };
```

### 4. Create Storybook AllVariants Story

Every component family MUST include an `AllVariants` story for visual validation:

```javascript
export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ComponentName (Primary Variant)
                </h3>
                <ComponentName {...exampleProps} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-lg
                    <br />
                    Padding: p-6
                    <br />
                    Font: font-bold
                    <br />
                    Rounded: rounded-lg
                    <br />
                    Shadow: shadow-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Largest variant with clear hierarchy
                    </span>
                </div>
            </div>
            {/* Repeat for Secondary and Tertiary */}
        </div>
    </MockWrapper>
);
```

### 5. Register Theme Objects

Add theme keys to `src/Utils/themeObjects.js`:

```javascript
COMPONENT_NAME: "COMPONENT_NAME",
COMPONENT_NAME_2: "COMPONENT_NAME_2",
COMPONENT_NAME_3: "COMPONENT_NAME_3",
```

---

## Validation Checklist

Use this checklist when creating or reviewing component variants.

### Design Review

- [ ] All three variants (Primary, Secondary, Tertiary) are implemented
- [ ] Text size decreases progressively (or is intentionally consistent)
- [ ] Padding decreases progressively
- [ ] Font weight progression is appropriate for component type
- [ ] Border radius follows pattern (or is intentionally consistent)
- [ ] Shadow progression creates appropriate elevation (if applicable)

### Visual Hierarchy Check

- [ ] Visual difference is clear when viewing all three variants side-by-side
- [ ] Primary variant is noticeably larger/bolder than secondary
- [ ] Tertiary variant is noticeably smaller/lighter than secondary
- [ ] Variants maintain same functional purpose across all sizes

### Code Quality

- [ ] Component specifications documented in comments at top of file
- [ ] Default props match variant progression
- [ ] Theme objects registered in `themeObjects.js`
- [ ] Components exported from appropriate index.js files

### Storybook Documentation

- [ ] `AllVariants` story exists and displays all three variants
- [ ] Story includes inline documentation showing Tailwind classes used
- [ ] Story includes status indicators (✅ GOOD or ⚠️ ISSUE)
- [ ] Individual variant stories exist (Primary, Secondary, Tertiary)

### Accessibility

- [ ] Touch targets remain at least 44x44px (check smallest variant)
- [ ] Text remains readable at smallest size (check contrast ratios)
- [ ] Padding doesn't compress content to point of illegibility

### Testing

- [ ] Visual review in Storybook completed
- [ ] Component renders correctly with different themes
- [ ] Responsive behavior verified (if applicable)
- [ ] No console errors or warnings

---

## Reference Examples

### ✅ Good Examples (Follow These Patterns)

**Button** (`src/Common/Button.js`)
- Progressive text size: `text-lg/xl/2xl` → `text-base/lg` → `text-sm/base`
- Progressive padding: Complex responsive padding decreases across variants
- Progressive font weight: `font-bold` → `font-medium` → `font-normal`
- **Why it's good**: Clear visual hierarchy with multiple progressive properties

**Panel** (`src/Common/Panel.js`)
- Progressive padding: `p-6` → `p-4` → `p-2`
- Progressive border radius: `rounded-lg` → `rounded-md` → `rounded`
- **Why it's good**: Simple, predictable pattern that's easy to understand

**MenuItem** (`src/Common/MenuItem.js`)
- Progressive text size: `text-lg` → `text-base` → `text-sm`
- Progressive padding: `p-4` → `p-2 px-4` → `p-2 px-4`
- Progressive font weight: `font-bold` → `font-medium` → `font-normal`
- **Why it's good**: Combines multiple properties for clear hierarchy

**Heading** (`src/Common/Text/Heading.js`)
- Progressive text size: `text-6xl` → `text-5xl` → `text-4xl`
- Consistent padding: `p-4 2xl:px-6 2xl:py-4` (acceptable for layout stability)
- Consistent font weight: `font-bold` (appropriate for headlines)
- **Why it's good**: Text size alone creates strong hierarchy for display text

### Component Implementation Files

| Component | File Path | Status |
|-----------|-----------|--------|
| Button | `src/Common/Button.js` | ✅ Good |
| Panel | `src/Common/Panel.js` | ✅ Good |
| Heading | `src/Common/Text/Heading.js` | ✅ Good |
| Paragraph | `src/Common/Text/Paragraph.js` | ✅ Good |
| ButtonIcon | `src/Common/ButtonIcon.js` | ✅ Good |
| MenuItem | `src/Common/MenuItem.js` | ✅ Good |
| Card | `src/Common/Card.js` | ✅ Fixed |
| Alert | `src/Common/Alert.js` | ✅ Fixed |
| Tag | `src/Common/Tag.js` | ✅ Fixed |
| Toast | `src/Common/Toast.js` | ✅ Fixed |
| SubHeading | `src/Common/Text/Heading.js` | ✅ Fixed |

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-13 | Initial documentation created after Phase 3 fixes |

---

## Questions or Feedback?

If you have questions about variant patterns or need clarification on specifications:
1. Check the AllVariants stories in Storybook for visual reference
2. Review reference example components listed above
3. Consult this document for general patterns
4. Open an issue for discussion if a new pattern is needed
