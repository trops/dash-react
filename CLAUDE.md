# dash-react - Dashboard UI Component Library

## Project Overview

**dash-react** (`@trops/dash-react`) is a React UI component library designed for building dashboard applications. It provides a complete set of themed components, layout primitives, and context providers specifically tailored for the Dash Electron framework.

**Key Features:**

- Comprehensive UI component library (50+ components)
- Built-in theme system with light/dark variants
- TailwindCSS-based styling with theme token mapping
- Context providers for theme and widget data
- Optimized for Dash Electron but usable in any React app
- Published as npm package to GitHub Packages

**Primary Consumers:** [@trops/dash-core](https://github.com/trops/dash-core) (framework) and [dash-electron](https://github.com/trops/dash-electron) (template)

## Product Requirements Documentation

**Location:** `docs/requirements/`

Before implementing new components or making breaking API changes, check for relevant Product Requirements Documents (PRDs).

### Documentation Hierarchy

```
PRDs (requirements) → Architecture Docs (design) → Implementation Guides (code)
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

## Architecture

### Core Systems

1. **Component Library** - Pre-built UI components (Panel, Button, Modal, etc.)
2. **Theme System** - Dynamic theming via ThemeContext with CSS class mapping
3. **Layout System** - Flexible layout containers for dashboard layouts
4. **Context Providers** - ThemeContext and WidgetContext for data sharing
5. **Utility Functions** - Color mapping, CSS helpers, string utilities

### Technology Stack

- **Framework**: React 18
- **Styling**: TailwindCSS 3
- **Build**: Rollup (for library bundling)
- **Dev Tools**: Storybook 8 (component development/documentation)
- **Package**: npm (published to GitHub Packages)

## Directory Structure

```
/Users/johngiatropoulos/Development/dash-react/dash-react/
├── src/
│   ├── Common/                  # UI Components
│   │   ├── Button/              # Button components
│   │   ├── Panel.js             # Panel components (Panel, Panel2, Panel3)
│   │   ├── Modal/               # Modal components
│   │   ├── Menu/                # Menu components
│   │   ├── Text/                # Typography (Heading, SubHeading, etc.)
│   │   ├── Input/               # Form inputs
│   │   ├── Tag/                 # Tag/label components
│   │   ├── Toggle/              # Toggle switches
│   │   ├── Notification/        # Notification components
│   │   ├── ErrorBoundary/       # Error handling
│   │   ├── Draggable/           # Drag-and-drop utilities
│   │   └── ...                  # 40+ more components
│   ├── Layout/                  # Layout Components
│   │   ├── LayoutContainer.js   # Flexible row/col container
│   │   ├── MainLayout.js        # Page layout structure
│   │   └── ...                  # Layout primitives
│   ├── Context/                 # React Context Providers
│   │   ├── ThemeContext.js      # Theme provider (CRITICAL)
│   │   └── WidgetContext.js     # Widget metadata provider
│   ├── Utils/                   # Utilities
│   │   ├── colors.js            # Theme token mapping (CRITICAL)
│   │   ├── themeObjects.js      # Theme object definitions
│   │   ├── strings.js           # String utilities
│   │   ├── css.js               # CSS utilities
│   │   └── ...                  # Other utilities
│   ├── Mock/                    # Mock data for testing
│   ├── index.js                 # Main export file
│   └── tailwind.css             # Compiled Tailwind CSS
├── dist/                        # Build output (published)
├── package/                     # npm package output
├── rollup.config.js             # Rollup build config
├── tailwind.config.js           # TailwindCSS config
├── .storybook/                  # Storybook configuration
└── package.json
```

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Build Tailwind CSS
npm run build:css

# Start Storybook for component development
npm run storybook
```

### Development Commands

```bash
# Component Development
npm run storybook              # Interactive component playground at localhost:6006
npm run build-storybook        # Build static Storybook

# Building
npm run build:css              # Compile Tailwind CSS
npm run build                  # Full build (prettify + CSS + rollup)
npm run roll                   # Rollup bundling only
npm run prod                   # Production build (clean + build + package)

# Publishing
npm run bump                   # Bump patch version (no git tag)
npm run bump-tag              # Bump patch version with git tag
npm run pack-local-esm        # Create local .tgz package

# Utilities
npm run prettify              # Format code with Prettier
npm run clean-dist            # Clean dist directory
npm run clean-package         # Clean package directory
```

### Development with Storybook

Storybook provides an interactive playground for developing and testing components:

```bash
npm run storybook
# Opens http://localhost:6006
```

**Benefits:**

- Live component preview with hot reload
- Test components in isolation
- Document component props and usage
- Visual regression testing

### Build Process

**Full production build:**

```bash
npm run prod
```

**What happens:**

1. Runs Prettier to format code
2. Cleans `dist/` and `package/` directories
3. Runs Rollup to bundle source files
4. Copies `package.json`, `README.md`, `tailwind.css` to `dist/`
5. Creates `.tgz` package in `package/` directory

**Output:**

- `dist/` - Ready-to-publish npm package
- `package/trops-dash-react.tgz` - Installable package file

## Publishing Workflow

### 1. Make Changes

Edit components in `src/Common/`, `src/Layout/`, etc.

### 2. Test Changes

```bash
# View components in Storybook
npm run storybook

# Build and test locally
npm run build
```

### 3. Version Bump

```bash
# Patch version (0.1.X)
npm run bump

# Or with git tag
npm run bump-tag
```

### 4. Build Package

```bash
npm run prod
```

### 5. Publish

```bash
# Push to GitHub (triggers auto-publish via GitHub Actions)
git push origin main

# Or manually publish
cd dist
npm publish
```

### 6. Update Consuming Projects

In the consuming project (e.g., dash-electron):

```bash
cd /Users/johngiatropoulos/Development/dash-electron/dash-electron
# Update package.json version
# "@trops/dash-react": "^0.1.XXX"
npm install
```

## Key Files and Concepts

### Theme System (CRITICAL)

**ThemeContext** - [src/Context/ThemeContext.js](src/Context/ThemeContext.js)

- Exports `ThemeContext` and `ThemeProvider`
- **MUST** be imported by consuming apps (like dash)
- Provides `currentTheme`, `themeVariant`, theme switching functions

**colors.js** - [src/Utils/colors.js](src/Utils/colors.js)

- Core theme engine
- `getStylesForItem()` - Maps theme tokens to CSS classes
- `colorMap` - Defines default styles for each component type
- `prioritizeClasses()` - Merges theme overrides with defaults

**How it works:**

1. Component requests styles via `getStylesForItem(themeObjects.PANEL, currentTheme, overrides)`
2. Function looks up default styles in `colorMap[themeObjects.PANEL]`
3. Merges with theme overrides from `currentTheme[themeObjects.PANEL]`
4. Merges with component-level overrides
5. Returns final CSS class string

**Theme Token Example:**

```javascript
// Default mapping in colorMap
{
  backgroundColor: "bg-primary-dark",
  textColor: "text-primary-light",
  borderColor: "border-primary-medium"
}

// Theme provides actual values
currentTheme = {
  "bg-primary-dark": "bg-gray-800",
  "text-primary-light": "text-gray-100",
  "border-primary-medium": "border-gray-600"
}

// Final output
"bg-gray-800 text-gray-100 border-gray-600"
```

### Component Patterns

**Panel Components** - [src/Common/Panel.js](src/Common/Panel.js)

Three panel variants with different padding/sizing:

- `Panel` - Default padding (p-6)
- `Panel2` - Medium padding (p-4)
- `Panel3` - Minimal padding (p-2)

Each has sub-components:

- `Panel.Header` / `Panel.Body` / `Panel.Footer`

**Usage:**

```javascript
import { Panel } from "@trops/dash-react";

<Panel border={true} scrollable={true}>
    <Panel.Header border={true}>
        <h1>Header</h1>
    </Panel.Header>
    <Panel.Body>Content here</Panel.Body>
    <Panel.Footer>Footer</Panel.Footer>
</Panel>;
```

**Layout Components** - [src/Layout/LayoutContainer.js](src/Layout/LayoutContainer.js)

Flexible container for building layouts:

```javascript
import { LayoutContainer } from "@trops/dash-react";

<LayoutContainer
    direction="col" // "row" or "col"
    width="w-full"
    height="h-full"
    scrollable={true}
    space={true} // Add gap between children
    padding={true}
    grow={true}
>
    {children}
</LayoutContainer>;
```

**Theme-Aware Components**

All components use `getStylesForItem()`:

```javascript
import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

function MyComponent(props) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
        // ... other overrides
    });

    return (
        <div className={styles.string}>
            {/* styles.string contains final CSS classes */}
        </div>
    );
}
```

## Component Reference

### Layout Components

| Component              | Purpose                    | Key Props                                             |
| ---------------------- | -------------------------- | ----------------------------------------------------- |
| `LayoutContainer`      | Flexible row/col container | `direction`, `width`, `height`, `scrollable`, `space` |
| `MainLayout`           | Page-level layout          | `children`                                            |
| `MainSection`          | Layout section             | `children`                                            |
| `MainContent`          | Main content area          | `children`                                            |
| `Container`            | Generic container          | `padding`, `width`, `height`                          |
| `Header` / `SubHeader` | Header sections            | `title`, `padding`                                    |
| `Footer`               | Footer section             | `children`, `padding`                                 |

### Panel Components

| Component | Default Padding | Use Case               |
| --------- | --------------- | ---------------------- |
| `Panel`   | p-6             | Standard cards         |
| `Panel2`  | p-4             | Medium-density layouts |
| `Panel3`  | p-2             | Compact/nested layouts |

**Sub-components:** `.Header`, `.Body`, `.Footer`

### Interactive Components

| Component           | Purpose               |
| ------------------- | --------------------- |
| `Button`            | Primary action button |
| `ButtonIcon`        | Icon-only button      |
| `Menu` / `MenuItem` | Dropdown menus        |
| `Toggle`            | Toggle switch         |
| `Modal`             | Modal dialogs         |
| `Notification`      | Toast notifications   |
| `Tag`               | Labels and tags       |
| `SlidePanelOverlay` | Side panel overlay    |

### Typography Components

| Component     | Size     | Weight      |
| ------------- | -------- | ----------- |
| `Heading`     | text-6xl | font-bold   |
| `Heading2`    | text-5xl | font-bold   |
| `Heading3`    | text-4xl | font-bold   |
| `SubHeading`  | text-3xl | font-medium |
| `SubHeading2` | text-2xl | font-medium |
| `SubHeading3` | text-2xl | normal      |

### Specialized Components

| Component                         | Purpose                         |
| --------------------------------- | ------------------------------- |
| `Widget`                          | Widget wrapper container        |
| `Workspace`                       | Workspace container             |
| `ErrorBoundary`                   | Catch React errors              |
| `ErrorMessage`                    | Display errors                  |
| `CodeEditor`                      | Monaco code editor              |
| `CodeRenderer`                    | Syntax-highlighted code display |
| `DragComponent` / `DropComponent` | Drag-and-drop                   |
| `Form`                            | Form utilities                  |

## Context Providers

### ThemeContext

**Provider:** [src/Context/ThemeContext.js](src/Context/ThemeContext.js)

**Values:**

```javascript
{
    currentTheme: Object,      // Current theme object with CSS mappings
    themeKey: String,          // Current theme key
    themeVariant: String,      // "light" or "dark"
    changeCurrentTheme: Function,
    changeThemeVariant: Function,
    themes: Object,            // All available themes
}
```

**Usage:**

```javascript
import { useContext } from "react";
import { ThemeContext } from "@trops/dash-react";

function MyComponent() {
    const { currentTheme, themeVariant, changeThemeVariant } =
        useContext(ThemeContext);
    // Use currentTheme for styling
}
```

### WidgetContext

**Provider:** [src/Context/WidgetContext.js](src/Context/WidgetContext.js)

**Values:**

```javascript
{
    uuid: String,              // Widget instance ID
    widgetData: Object,        // Widget configuration data
    selectedProviders: Array,  // Selected provider IDs
    // ... other widget metadata
}
```

**Usage:**

```javascript
import { useContext } from "react";
import { WidgetContext } from "@trops/dash-react";

function MyWidget() {
    const { uuid, widgetData } = useContext(WidgetContext);
    // Access widget instance data
}
```

## Utilities Reference

### colors.js

**Key Functions:**

| Function                                           | Purpose                                  |
| -------------------------------------------------- | ---------------------------------------- |
| `getStylesForItem(itemName, theme, overrides, id)` | Generate CSS classes for component       |
| `getCSSStyleForClassname(className)`               | Convert CSS class to inline style object |
| `getClassForObjectType(type)`                      | Get CSS class for object type            |
| `getStyleName(name)`                               | Normalize style name                     |

**Key Constants:**

| Constant        | Purpose                  |
| --------------- | ------------------------ |
| `colorMap`      | Default component styles |
| `colorNames`    | Available color names    |
| `shades`        | Color shade variants     |
| `themeVariants` | "light" / "dark"         |
| `objectTypes`   | Component type names     |

### strings.js

String manipulation utilities for text processing.

### css.js

CSS utility functions for class manipulation.

### themeObjects.js

**Defines component theme keys:**

```javascript
export const themeObjects = {
    PANEL: "panel",
    PANEL_HEADER: "panel-header",
    PANEL_FOOTER: "panel-footer",
    HEADING: "heading",
    BUTTON: "button",
    // ... 50+ more
};
```

## Rollup Configuration

**File:** [rollup.config.js](rollup.config.js)

**Key Settings:**

- Input: `src/index.js`
- Output formats: CommonJS (cjs) and ES Module (es)
- Plugins:
    - `@rollup/plugin-babel` - Transpile JSX/modern JS
    - `@rollup/plugin-node-resolve` - Resolve node_modules
    - `@rollup/plugin-commonjs` - Convert CommonJS to ESM
    - `rollup-plugin-postcss` - Process CSS
    - `@rollup/plugin-strip` - Remove console.logs in production
- External dependencies: React, ReactDOM, peer dependencies

**Output:**

- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/tailwind.css` - Compiled CSS

## Important Patterns and Conventions

### Component Structure

```javascript
// Standard component pattern
import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

export const MyComponent = ({
    // Theme-overridable props
    backgroundColor = null,
    textColor = null,
    borderColor = null,
    // Layout props
    width = "w-full",
    height = "h-full",
    padding = true,
    // Content props
    children,
    className = "",
    // Event handlers
    onClick = null,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);

    const styles = getStylesForItem(themeObjects.MY_COMPONENT, currentTheme, {
        backgroundColor,
        textColor,
        borderColor,
        width,
        height,
        padding,
        ...props,
    });

    return (
        <div className={`${styles.string} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
```

### Adding New Components

1. **Create component file** in `src/Common/MyComponent.js`
2. **Add to colorMap** in `src/Utils/colors.js`:
    ```javascript
    [themeObjects.MY_COMPONENT]: {
        backgroundColor: "bg-primary-dark",
        textColor: "text-primary-light",
        // ... other defaults
    }
    ```
3. **Add theme object** in `src/Utils/themeObjects.js`:
    ```javascript
    export const themeObjects = {
        // ...
        MY_COMPONENT: "my-component",
    };
    ```
4. **Export from index** in `src/index.js` or `src/Common/index.js`:
    ```javascript
    export { MyComponent } from "./MyComponent";
    ```
5. **Create Storybook story** (optional) in `src/Common/MyComponent.stories.js`

### Theme Customization

Components support multiple levels of customization:

1. **Default styles** (in colorMap)
2. **Theme overrides** (in theme object)
3. **Component props** (highest priority)

**Example:**

```javascript
// 1. Default (colorMap)
backgroundColor: "bg-primary-dark"

// 2. Theme override
theme[themeObjects.PANEL] = {
    backgroundColor: "bg-custom-dark"
}

// 3. Component prop (wins)
<Panel backgroundColor="bg-blue-500" />
```

## Troubleshooting

### Theme Issues

**Problem:** Components not receiving theme

**Solution:** Ensure consuming app imports ThemeContext from dash-react:

```javascript
// ✅ CORRECT
import { ThemeContext } from "@trops/dash-react";

// ❌ WRONG - creates separate context
import { ThemeContext } from "./Context/ThemeContext";
```

### Build Issues

**Problem:** Rollup build fails

**Solutions:**

- Check for syntax errors in source files
- Ensure all imports are valid
- Run `npm run prettify` to fix formatting
- Check rollup.config.js for plugin errors

**Problem:** CSS not updating

**Solution:**

```bash
npm run build:css
npm run build
```

### Storybook Issues

**Problem:** Components not showing in Storybook

**Solutions:**

- Ensure `.stories.js` files are in component directories
- Restart Storybook: `npm run storybook`
- Check browser console for errors

### Package Installation Issues

**Problem:** Can't install @trops/dash-react in consuming app

**Solutions:**

- Ensure `.npmrc` is configured with GitHub PAT
- Check package is published to GitHub Packages
- Verify version number in `package.json`

## Testing Integration with Dash

### Local Testing Workflow

**Method 1: Local package install**

```bash
# In dash-react
npm run prod

# In dash
npm install ../dash-react/package/trops-dash-react.tgz
npm run dev
```

**Method 2: npm link** (not recommended, can cause dual context issues)

```bash
# In dash-react
cd dist
npm link

# In dash
npm link @trops/dash-react
```

### Verifying Changes

After rebuilding dash-react:

1. Check component renders correctly in Storybook
2. Install updated package in dash
3. Test in dash Electron app
4. Verify theme system works
5. Check console for errors

## Code Style

**Formatting:**

- Prettier enforced (`.prettierrc`)
- Run `npm run prettify` before committing
- 4-space indentation
- Trailing commas in objects/arrays

**Component Naming:**

- PascalCase for components (`Panel`, `Button`)
- camelCase for utilities (`getStylesForItem`)
- SCREAMING_SNAKE_CASE for constants (`PANEL_HEADER`)

**File Naming:**

- Components: PascalCase (`Panel.js`)
- Utilities: camelCase (`colors.js`)
- Context: PascalCase with suffix (`ThemeContext.js`)

## Version Management

**Current Version:** 0.1.187

**Versioning:**

```bash
# Patch (0.1.X)
npm run bump

# Minor (0.X.0)
npm version minor

# Major (X.0.0)
npm version major
```

**After version bump:**

```bash
npm run prod
git add .
git commit -m "Version X.X.X"
git push origin main
```

## Related Projects

### @trops/dash-core

**Location:** `/Users/johngiatropoulos/Development/dash-core/dash-core`
**Purpose:** Core dashboard framework that consumes dash-react
**Relationship:** Primary consumer of this library

### dash-electron

**Location:** `/Users/johngiatropoulos/Development/dash-electron/dash-electron`
**Purpose:** Electron app template built on dash-core + dash-react

**Critical:** `@trops/dash-core` MUST import `ThemeContext` from `@trops/dash-react` to avoid dual context issues.

## Validation and Testing

### When to Validate

**Always validate after:**

- Modifying components in `src/Common/` or `src/Layout/`
- Changing theme system (`src/Utils/colors.js`, `src/Context/ThemeContext.js`)
- Adding new components
- Updating build configuration (rollup, tailwind)
- Updating dependencies

### Pre-Commit Validation Checklist

Before committing changes:

```bash
# 1. Format code
npm run prettify

# 2. Rebuild Tailwind CSS
npm run build:css

# 3. Run build
npm run build
```

**Expected:** No errors, build completes successfully

### Build Validation

**Quick build check:**

```bash
npm run build
```

**What to check:**

- ✅ No errors in terminal
- ✅ `dist/` directory created/updated
- ✅ `dist/index.js` exists (CommonJS bundle)
- ✅ `dist/tailwind.css` exists
- ✅ `package/trops-dash-react.tgz` created

**Verify build output:**

```bash
# Check dist directory
ls -la dist/

# Should contain:
# - index.js (main bundle)
# - tailwind.css (compiled CSS)
# - package.json (copied)
# - README.md (copied)
# - .npmrc (copied)
```

**Verify package:**

```bash
# Check package was created
ls -la package/

# Should contain:
# - trops-dash-react.tgz (installable package)
```

### Component Validation with Storybook

**Start Storybook:**

```bash
npm run storybook
# Opens http://localhost:6006
```

**What to check:**

- ✅ Storybook starts without errors
- ✅ Components appear in sidebar
- ✅ Component stories render correctly
- ✅ No console errors in browser DevTools
- ✅ Components respond to prop changes

**Manual testing:**

1. Navigate to modified component in sidebar
2. Check component renders correctly
3. Test interactive features (buttons, toggles, etc.)
4. Change props in Controls panel
5. Verify styling updates

**Theme validation in Storybook:**

1. Open a component that uses themes (Panel, Button, etc.)
2. Open browser DevTools Console
3. Check for theme-related errors
4. Verify component has proper colors (not transparent)

### Integration Testing with Dash

**After making changes, test with dash app:**

**Method 1: Local package install (recommended)**

```bash
# In dash-react (this project)
npm run prod

# In dash-electron
cd /Users/johngiatropoulos/Development/dash-electron/dash-electron
npm install ../dash-react/package/trops-dash-react.tgz
npm run dev
```

**Method 2: Quick test without installing**

```bash
# In dash-react - create package
npm run prod

# Note the version number in package.json
# Then in dash, update package.json to match version
# and run: npm install
```

**Validation in dash app:**

**In Terminal:**

- ✅ dash builds without errors
- ✅ No module resolution errors
- ✅ Electron window opens

**In Electron DevTools Console:**

```javascript
// Verify dash-react version loaded
// Should see theme loading messages:
[ThemeWrapper] Loading X saved themes...
[ThemeWrapper] Loaded theme: theme-1

// Check for errors:
❌ Should NOT see "Cannot find module @trops/dash-react"
❌ Should NOT see NULL theme errors
❌ Should NOT see component render errors
```

**Visual check:**

- ✅ Components render with correct styling
- ✅ Theme colors applied (backgrounds not transparent)
- ✅ Interactive components work (buttons, menus, etc.)
- ✅ No visible layout issues

### Rollup Build Validation

**Detailed build check:**

```bash
npm run roll
```

**What to check:**

- ✅ Rollup completes without errors
- ✅ No warnings about missing dependencies
- ✅ No circular dependency warnings
- ✅ File size output shown
- ✅ `dist/index.js` created

**Common warnings (can usually ignore):**

- CSS import order warnings
- Peer dependency warnings (expected)

### Quick Validation Scripts

**Two validation scripts available:**

**1. Library validation only:**

```bash
# Validate dash-react builds correctly
./scripts/validate.sh
```

**2. Full integration validation:**

```bash
# Build dash-react AND test with dash app
./scripts/validate-integration.sh
```

**Library validation (validate.sh) does:**

1. ✅ Formats code with Prettier
2. ✅ Builds Tailwind CSS
3. ✅ Runs Rollup build
4. ✅ Verifies output files exist (dist/index.js, dist/tailwind.css)
5. ✅ Creates npm package (package/trops-dash-react.tgz)
6. ✅ Reports file sizes

**Sample output:**

```
🔍 Validating dash-react library...

📝 Step 1/5: Running Prettier...
✅ Code formatted successfully

🎨 Step 2/5: Building Tailwind CSS...
✅ Tailwind CSS built successfully

🏗️  Step 3/5: Building library with Rollup...
✅ Rollup build successful

📦 Step 4/5: Verifying build output...
✅ dist/index.js exists
✅ dist/tailwind.css exists
   dist/index.js: 245K
   dist/tailwind.css: 12M

📦 Step 5/5: Creating npm package...
✅ Package created successfully
   package/trops-dash-react.tgz: 2.1M

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All validations passed!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Integration validation (validate-integration.sh) does:**

1. ✅ Builds dash-react with `npm run prod`
2. ✅ Installs package in dash app
3. ✅ Builds dash CSS
4. ✅ Validates dash compiles successfully with new dash-react
5. ✅ Reports integration success

**Use integration validation when:**

- Making changes to components
- Modifying theme system
- Updating context providers
- Want to ensure changes work in dash

**Quick validation (without script):**

```bash
npm run prettify && npm run build:css && npm run roll && npm run pack-local-esm
```

### Component-Specific Validation

**After modifying theme system (colors.js, ThemeContext):**

1. **Build and test in Storybook:**

    ```bash
    npm run build:css
    npm run storybook
    ```

2. **Check multiple components:**

    - Panel (verify background colors)
    - Button (verify hover states)
    - Heading (verify text colors)
    - Modal (verify overlay colors)

3. **Test in dash app:**
    - Install updated package in dash
    - Run `npm run dev` in dash
    - Check console for theme loading
    - Verify components styled correctly

**After adding new component:**

1. **Create Storybook story** (optional but recommended):

    ```javascript
    // src/Common/MyComponent.stories.js
    export default {
        title: "Common/MyComponent",
        component: MyComponent,
    };

    export const Default = () => <MyComponent />;
    ```

2. **Test in Storybook:**

    ```bash
    npm run storybook
    # Navigate to Common/MyComponent
    ```

3. **Verify export in index.js:**

    ```javascript
    // src/index.js or src/Common/index.js
    export { MyComponent } from "./MyComponent";
    ```

4. **Build and test:**
    ```bash
    npm run build
    # Check dist/index.js includes export
    ```

**After modifying LayoutContainer or layout components:**

1. Test in multiple configurations:

    - Different directions (row/col)
    - Different sizes (w-full, h-full, etc.)
    - Scrollable vs non-scrollable
    - With/without spacing

2. Test nested layouts

3. Test in dash app with real widgets

### Common Validation Errors

**Error:** `'X' is not exported by 'src/index.js'`

```bash
# Fix: Add export to src/index.js
export { X } from "./Common/X";
```

**Error:** `Cannot find module '@dash/Context'`

```bash
# Fix: Check babel aliases in rollup.config.js
# Ensure @dash alias points to src/
```

**Error:** Build succeeds but component broken in dash

```bash
# Fix: Usually a context issue
# 1. Check ThemeContext is exported
# 2. Verify no duplicate React/ReactDOM
# 3. Check peerDependencies versions match
```

**Error:** CSS not included in build

```bash
# Fix:
npm run build:css
npm run build
# Ensure dist/tailwind.css exists
```

**Error:** Package install fails in dash

```bash
# Fix:
# 1. Check .npmrc exists in dist/
# 2. Verify package.json copied to dist/
# 3. Ensure version number is valid semver
```

### Automated Validation (Claude Code)

**When Claude makes changes, validate with:**

```bash
# Quick validation (30 seconds)
npm run prettify && npm run build:css && npm run roll

# Full validation with package (60 seconds)
npm run prettify && npm run build:css && npm run roll && npm run pack-local-esm
```

**Success criteria:**

- ✅ No errors in terminal output
- ✅ `dist/index.js` created
- ✅ `dist/tailwind.css` created
- ✅ `package/trops-dash-react.tgz` created
- ✅ File sizes shown in output

**Enhanced validation with dash integration:**

```bash
# 1. Build dash-react
cd /Users/johngiatropoulos/Development/dash-react/dash-react
npm run prod

# 2. Install in dash-electron and quick check
cd /Users/johngiatropoulos/Development/dash-electron/dash-electron
npm install ../dash-react/package/trops-dash-react.tgz
npm run prettify && npm run build:css

# 3. Quick dev server check (30 second timeout)
timeout 30 bash -c 'BROWSER=none npm start'
```

**Success indicators:**

- dash-react builds without errors
- dash installs package successfully
- dash dev server compiles successfully
- "Compiled successfully!" message appears

**If validation fails:**

1. Read error messages carefully
2. Check for missing exports
3. Verify imports are correct
4. Check babel/rollup configuration
5. Ensure CSS is built
6. Test in Storybook first before dash integration

### Checklist for Pull Requests / Releases

Before publishing a new version:

- [ ] Code formatted with Prettier
- [ ] Tailwind CSS rebuilt
- [ ] Rollup build successful
- [ ] Components tested in Storybook
- [ ] Integration tested with dash app
- [ ] No console errors in dash
- [ ] Theme system works correctly
- [ ] Version number bumped
- [ ] CHANGELOG updated (if applicable)
- [ ] Package created successfully

## Resources

**Documentation:**

- [README](./README.md) - Quick start and overview
- [Storybook](http://localhost:6006) - Interactive component docs
- [Dash Documentation](https://github.com/trops/dash/tree/main/docs) - Consumer app docs

**Contact:**
john.giatropoulos@gmail.com
