# Contributing to dash-react

Thank you for contributing to dash-react! This guide will help you understand our development practices and component variant system.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Component Variant System](#component-variant-system)
3. [Development Workflow](#development-workflow)
4. [Pull Request Guidelines](#pull-request-guidelines)
5. [Testing](#testing)
6. [Code Style](#code-style)

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/dash-react.git
cd dash-react

# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build the library
npm run build
```

---

## Component Variant System

dash-react implements a **3-variant design system** for visual hierarchy:
- **Primary (Component)**: Largest, most prominent
- **Secondary (Component2)**: Medium emphasis
- **Tertiary (Component3)**: Smallest, most subtle

### Required Reading
Before creating or modifying component variants, please read:
- [Variant Specifications Documentation](./variant-specifications.md)

### Key Principles
✅ **DO:**
- Implement all three variants when creating new components
- Follow progressive patterns (decreasing size, padding, font weight)
- Create an `AllVariants` story in Storybook for validation
- Document variant specifications in component file comments
- Test visual hierarchy by viewing AllVariants story

❌ **DON'T:**
- Create identical styling across all three variants
- Skip implementing any of the three variants
- Use arbitrary sizing without following patterns
- Forget to register theme objects for all variants

---

## Development Workflow

### Creating a New Component

1. **Use the component template**
   ```bash
   cp templates/ComponentVariants.template.js src/Common/YourComponent.js
   cp templates/ComponentVariants.stories.template.js src/Common/YourComponent.stories.js
   ```

2. **Customize the template**
   - Replace `ComponentName` with your component name
   - Define variant specifications in comments
   - Implement component logic
   - Follow progressive patterns from [variant specifications](./variant-specifications.md)

3. **Register theme objects**
   Add to `src/Utils/themeObjects.js`:
   ```javascript
   YOUR_COMPONENT: "YOUR_COMPONENT",
   YOUR_COMPONENT_2: "YOUR_COMPONENT_2",
   YOUR_COMPONENT_3: "YOUR_COMPONENT_3",
   ```

4. **Create Storybook stories**
   - Primary, Secondary, Tertiary individual stories
   - **Required:** `AllVariants` story for side-by-side comparison
   - Add inline documentation showing Tailwind classes

5. **Visual validation**
   - Start Storybook: `npm run storybook`
   - Navigate to your component's `AllVariants` story
   - Verify clear visual hierarchy across all three variants
   - Check that patterns match [variant specifications](./variant-specifications.md)

### Modifying Existing Components

1. **Read the component first**
   - Check variant specifications in component comments
   - View current `AllVariants` story in Storybook
   - Understand existing patterns before changing

2. **Maintain progressive patterns**
   - Don't break the visual hierarchy
   - If changing one variant, consider impact on others
   - Update `AllVariants` story documentation if patterns change

3. **Update documentation**
   - Update component comments if specifications change
   - Update `AllVariants` story status indicators
   - Update [variant specifications](./variant-specifications.md) if establishing new patterns

---

## Pull Request Guidelines

### Before Submitting

Run through this checklist before opening a PR:

#### For New Components
- [ ] All three variants (Primary, Secondary, Tertiary) are implemented
- [ ] Variant specifications documented in component file comments
- [ ] Theme objects registered in `themeObjects.js`
- [ ] Component exported from appropriate `index.js`
- [ ] Storybook stories created (Primary, Secondary, Tertiary, **AllVariants**)
- [ ] `AllVariants` story shows clear visual hierarchy
- [ ] Variants follow progressive patterns (text size, padding, font weight)
- [ ] Visual validation completed in Storybook
- [ ] Build passes: `npm run build`
- [ ] No console errors or warnings

#### For Component Variant Modifications
- [ ] Visual hierarchy maintained or intentionally improved
- [ ] `AllVariants` story updated with new documentation
- [ ] Changes follow patterns in [variant specifications](./variant-specifications.md)
- [ ] If establishing new pattern, specifications doc is updated
- [ ] Visual validation completed in Storybook
- [ ] Build passes: `npm run build`
- [ ] No regressions in other components

#### For All Changes
- [ ] Code follows existing style and patterns
- [ ] No unnecessary files added (avoid file bloat)
- [ ] Git commits are clear and descriptive
- [ ] Changes are scoped to the task (no unrelated changes)

### PR Description Template

Use this template for your PR description:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] New component
- [ ] Component variant modification
- [ ] Bug fix
- [ ] Documentation update
- [ ] Other (please describe)

## Component Variant Checklist
(For component-related changes only)

- [ ] All three variants implemented/updated
- [ ] `AllVariants` story updated
- [ ] Visual hierarchy validated in Storybook
- [ ] Follows progressive patterns
- [ ] Theme objects registered

## Screenshots
(If applicable, add screenshots showing AllVariants story)

## Testing
- [ ] Visually tested in Storybook
- [ ] Build passes
- [ ] No console errors

## Additional Notes
Any other context or notes for reviewers.
```

---

## Testing

### Visual Testing in Storybook

This is the primary testing method for component variants:

1. **Start Storybook**
   ```bash
   npm run storybook
   ```

2. **Navigate to your component**
   - Go to the component in the Storybook sidebar
   - Click on the `AllVariants` story

3. **Visual validation**
   - Verify all three variants display correctly
   - Check that visual hierarchy is clear
   - Confirm progressive patterns are applied
   - Review inline documentation for accuracy

### Build Validation

Always run a build before submitting PRs:

```bash
npm run build
```

This ensures:
- No TypeScript/syntax errors
- All imports resolve correctly
- Library can be packaged successfully

---

## Code Style

### General Guidelines

- Use functional components with hooks
- Follow existing patterns in the codebase
- Use destructuring for props
- Keep components focused and single-purpose
- Avoid over-engineering

### Component Structure

```javascript
// 1. Imports
import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";

// 2. Component documentation
/**
 * ComponentName - Brief description
 *
 * VARIANT SPECIFICATIONS:
 * - Primary: ...
 * - Secondary: ...
 * - Tertiary: ...
 */

// 3. Component implementation
const ComponentName = ({
    children,
    prop1,
    prop2 = "defaultValue",
    className = "",
    ...props
}) => {
    // 4. Hooks
    const { currentTheme } = useContext(ThemeContext);

    // 5. Styles and logic
    const styles = getStylesForItem(...);

    // 6. Render
    return (
        <div className={`${styles.string} ${className}`}>
            {children}
        </div>
    );
};

// 7. Export
export { ComponentName };
```

### Naming Conventions

- Components: PascalCase (`ComponentName`)
- Files: PascalCase (`ComponentName.js`)
- Props: camelCase (`backgroundColor`)
- CSS Classes: Use Tailwind utilities
- Theme Objects: UPPER_SNAKE_CASE (`COMPONENT_NAME`)

### Comments

- Document variant specifications at the top of component files
- Use inline comments sparingly (prefer self-documenting code)
- Add comments for complex logic or non-obvious patterns
- Keep comments up-to-date with code changes

---

## Questions?

If you have questions about:
- **Variant patterns**: See [variant-specifications.md](./variant-specifications.md)
- **Existing components**: Check the `AllVariants` stories in Storybook
- **Getting started**: Open an issue for help

Thank you for contributing to dash-react! 🎉
