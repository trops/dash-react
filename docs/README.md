# dash-react Documentation

Welcome to the dash-react component library documentation!

## Quick Links

- **[Variant Specifications](./variant-specifications.md)** - Complete guide to component variant patterns and design principles
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute, component development workflow, and PR guidelines
- **[Validation Process](./VALIDATION_PROCESS.md)** - Ongoing validation practices and quarterly review process

---

## Component Variant System

dash-react implements a **3-variant design system** for all components:

| Variant | Purpose | Visual Characteristics |
|---------|---------|----------------------|
| **Primary (Component)** | Largest, most prominent | Large text, generous padding, bold fonts |
| **Secondary (Component2)** | Medium emphasis | Medium text, moderate padding, medium fonts |
| **Tertiary (Component3)** | Smallest, most subtle | Small text, compact padding, light fonts |

### Progressive Patterns

All variants follow **progressive visual hierarchy**:
- **Text Size**: Decreases from primary → secondary → tertiary
- **Padding**: Decreases progressively (e.g., p-6 → p-4 → p-2)
- **Font Weight**: Gets lighter (e.g., font-bold → font-medium → font-normal)
- **Visual Clarity**: Primary is immediately distinguishable from tertiary

---

## Getting Started

### For New Contributors

1. **Read the contributing guide**: [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Review variant specifications**: [variant-specifications.md](./variant-specifications.md)
3. **Explore Storybook**: Run `npm run storybook` and view AllVariants stories
4. **Use the templates**: Copy from `templates/` directory when creating new components

### For Component Development

1. **Use component template**: `templates/ComponentVariants.template.js`
2. **Follow progressive patterns**: See [variant specifications](./variant-specifications.md)
3. **Create AllVariants story**: Use `templates/ComponentVariants.stories.template.js`
4. **Visual validation**: Review in Storybook before submitting PR
5. **PR checklist**: Follow guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Documentation Files

### Core Documentation

- **[variant-specifications.md](./variant-specifications.md)**
  - Design principles and philosophy
  - Pattern tables (text size, padding, font weight, etc.)
  - Component development guidelines
  - Validation checklist
  - Reference examples

- **[CONTRIBUTING.md](./CONTRIBUTING.md)**
  - Getting started guide
  - Component variant system overview
  - Development workflow
  - Pull request guidelines
  - Code style guide

- **[VALIDATION_PROCESS.md](./VALIDATION_PROCESS.md)**
  - Daily validation practices
  - PR review process
  - Quarterly comprehensive review
  - Storybook as living documentation
  - Maintenance schedule

### Templates

Located in `/templates/` directory:

- **ComponentVariants.template.js** - Component implementation template
- **ComponentVariants.stories.template.js** - Storybook story template

---

## Component Status

### ✅ Components with Good Patterns

These components follow proper progressive patterns and serve as reference examples:

- Button
- Panel
- Heading
- Paragraph
- ButtonIcon
- MenuItem
- Card (fixed)
- Alert (fixed)
- Tag (fixed)
- Toast (fixed)
- SubHeading (fixed)

### 📋 All Component Families

16 component families with 3 variants each (48 total components):

1. Button (Button, Button2, Button3)
2. Card (Card, Card2, Card3)
3. Panel (Panel, Panel2, Panel3)
4. Alert (Alert, Alert2, Alert3)
5. Tag (Tag, Tag2, Tag3)
6. Heading (Heading, Heading2, Heading3)
7. SubHeading (SubHeading, SubHeading2, SubHeading3)
8. Paragraph (Paragraph, Paragraph2, Paragraph3)
9. Breadcrumbs (Breadcrumbs, Breadcrumbs2, Breadcrumbs3)
10. ButtonIcon (ButtonIcon, ButtonIcon2, ButtonIcon3)
11. MenuItem (MenuItem, MenuItem2, MenuItem3)
12. ProgressBar (ProgressBar, ProgressBar2, ProgressBar3)
13. Toast (Toast, Toast2, Toast3)
14. Table (Table, Table2, Table3)
15. DashPanel (DashPanel, DashPanel2, DashPanel3)
16. AlertBanner (AlertBanner, AlertBanner2, AlertBanner3)

---

## Validation Workflow

### Daily Development

1. **Creating components**: Use templates → Implement variants → Create AllVariants story
2. **Modifying components**: Check current story → Make changes → Update documentation
3. **Visual review**: View AllVariants story in Storybook
4. **PR submission**: Include screenshots, complete checklist

### Pull Request Review

1. **Visual validation**: Reviewer opens AllVariants story
2. **Pattern verification**: Check against variant specifications
3. **Documentation check**: Ensure AllVariants story is up-to-date
4. **Approve or request changes**

### Quarterly Review

1. **Comprehensive audit**: Review all AllVariants stories
2. **Pattern analysis**: Identify inconsistencies
3. **Documentation updates**: Update specs if patterns evolved
4. **Action items**: Create issues for components needing fixes

---

## Quick Reference

### Creating a New Component

```bash
# 1. Copy templates
cp templates/ComponentVariants.template.js src/Common/MyComponent.js
cp templates/ComponentVariants.stories.template.js src/Common/MyComponent.stories.js

# 2. Update themeObjects.js
# Add: MY_COMPONENT, MY_COMPONENT_2, MY_COMPONENT_3

# 3. Implement component following progressive patterns

# 4. View in Storybook
npm run storybook
# Navigate to Common/MyComponent → AllVariants

# 5. Build and test
npm run build
```

### Progressive Pattern Quick Reference

```javascript
// PRIMARY (Largest)
padding = "p-6"
textSize = "text-lg"
fontWeight = "font-bold"
rounded = "rounded-lg"
shadow = "shadow-md"

// SECONDARY (Medium)
padding = "p-4"
textSize = "text-base"
fontWeight = "font-medium"
rounded = "rounded-md"
shadow = "shadow"

// TERTIARY (Smallest)
padding = "p-2"
textSize = "text-sm"
fontWeight = "font-normal"
rounded = "rounded"
shadow = "shadow-sm"
```

---

## Storybook Integration

All component families have **AllVariants stories** for visual comparison:

```
Common/
├── Button → AllVariants ✅
├── Card → AllVariants ✅
├── Panel → AllVariants ✅
├── Alert → AllVariants ✅
└── ... (all 16 families)
```

### Using AllVariants Stories

- **View**: Open Storybook, navigate to component, click "AllVariants"
- **Compare**: See all 3 variants side-by-side
- **Validate**: Check inline documentation for class usage
- **Reference**: Use as examples when creating new components

---

## Maintenance

### Regular Tasks

| Task | Frequency | Purpose |
|------|-----------|---------|
| Visual validation | Per change | Ensure hierarchy maintained |
| PR review | Per PR | Validate new/modified components |
| Quarterly audit | Every 3 months | Comprehensive consistency check |
| Spec updates | As needed | Keep documentation current |

### Next Quarterly Review Due

**Date**: 2026-05-13 (3 months from initial setup)

**Checklist for next review**: See [VALIDATION_PROCESS.md](./VALIDATION_PROCESS.md#quarterly-comprehensive-review)

---

## Resources

### External Links

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

### Internal Resources

- Source code: `/src/Common/`
- Theme objects: `/src/Utils/themeObjects.js`
- Templates: `/templates/`
- Storybook stories: `/src/Common/*.stories.js`

---

## Questions or Feedback?

- **Variant patterns**: See [variant-specifications.md](./variant-specifications.md)
- **Development workflow**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Validation process**: See [VALIDATION_PROCESS.md](./VALIDATION_PROCESS.md)
- **Issues or suggestions**: Open a GitHub issue

---

**Documentation Version**: 1.0
**Last Updated**: 2026-02-13
**Status**: All phases complete ✅
