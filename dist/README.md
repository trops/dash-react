# dash-react

**dash-react** (`@trops/dash-react`) is a React UI component library designed for building dashboard applications. It provides a complete set of themed components, layout primitives, and context providers specifically tailored for the Dash Electron framework.

**Key Features:**

- Comprehensive UI component library (50+ components)
- Built-in theme system with light/dark variants
- TailwindCSS-based styling with theme token mapping
- Context providers for theme and widget data
- Optimized for Dash Electron but usable in any React app
- Published as npm package to GitHub Packages

**Primary Consumers:** [@trops/dash-core](https://github.com/trops/dash-core) (framework) and [dash-electron](https://github.com/trops/dash-electron) (template)

---

## What's Included

- **Core UI Components**: Button, Panel, Modal, Menu, Container, and more
- **Layout Components**: LayoutContainer, MainLayout, Workspace, Widget
- **Context Hooks**: ThemeContext, WidgetContext for component communication
- **Theming**: Built-in theme tokens and customization via Tailwind CSS
- **Utilities**: Colors, strings, CSS helpers, and other shared utilities

---

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

---

## Directory Structure

```
dash-react/
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

### Key Files

| File                          | Purpose                                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| `src/index.js`                | Main export file -- all public components, contexts, and utilities |
| `src/Context/ThemeContext.js` | Theme provider (CRITICAL -- must be imported from this package)    |
| `src/Utils/colors.js`         | Theme engine -- maps tokens to CSS classes (CRITICAL)              |
| `src/Utils/themeObjects.js`   | Component theme keys used by `getStylesForItem()`                  |
| `rollup.config.js`            | Build configuration for library bundling                           |

---

## Requirements

- Node.js v18, v20, or v22
- npm

## Installation

```bash
npm install
```

---

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
npm run bump-tag               # Bump patch version with git tag
npm run pack-local-esm         # Create local .tgz package

# Utilities
npm run prettify               # Format code with Prettier
npm run clean-dist             # Clean dist directory
npm run clean-package          # Clean package directory
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

---

## Build Process

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

### Rollup Configuration

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

**Build Output:**

- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/tailwind.css` - Compiled CSS

---

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
# Patch version
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
cd ~/Development/dash-electron/dash-electron
# Update the @trops/dash-react version in package.json
npm install
```

---

## Theme System (CRITICAL)

The theme system is the backbone of dash-react's styling. All components resolve their visual appearance through theme tokens rather than hardcoded CSS classes.

### ThemeContext

**File:** [src/Context/ThemeContext.js](src/Context/ThemeContext.js)

- Exports `ThemeContext` and `ThemeProvider`
- **MUST** be imported by consuming apps from `@trops/dash-react` (not a local copy)
- Provides `currentTheme`, `themeVariant`, theme switching functions

### colors.js -- Theme Engine

**File:** [src/Utils/colors.js](src/Utils/colors.js)

- `getStylesForItem()` - Maps theme tokens to CSS classes
- `colorMap` - Defines default styles for each component type
- `prioritizeClasses()` - Merges theme overrides with defaults

### How It Works

1. Component requests styles via `getStylesForItem(themeObjects.PANEL, currentTheme, overrides)`
2. Function looks up default styles in `colorMap[themeObjects.PANEL]`
3. Merges with theme overrides from `currentTheme[themeObjects.PANEL]`
4. Merges with component-level overrides
5. Returns final CSS class string

### Theme Token Example

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

### Theme Customization Levels

Components support multiple levels of customization, applied in order of priority:

1. **Default styles** (defined in `colorMap`)
2. **Theme overrides** (defined in the theme object)
3. **Component props** (highest priority -- wins over everything)

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

### Available Theme Tokens

- `bg-*` - Background colors (primary, secondary, danger, etc.)
- `text-*` - Text colors
- `border-*` - Border colors
- Variants: `very-light`, `light`, `medium`, `dark`, `very-dark`

---

## Component Patterns

### Panel Components

**File:** [src/Common/Panel.js](src/Common/Panel.js)

Three panel variants with different padding/sizing:

| Component | Default Padding | Use Case               |
| --------- | --------------- | ---------------------- |
| `Panel`   | p-6             | Standard cards         |
| `Panel2`  | p-4             | Medium-density layouts |
| `Panel3`  | p-2             | Compact/nested layouts |

**Sub-components:** `.Header`, `.Body`, `.Footer`

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

### LayoutContainer

**File:** [src/Layout/LayoutContainer.js](src/Layout/LayoutContainer.js)

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

### Theme-Aware Components

All components use `getStylesForItem()` for theme integration:

```javascript
import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

function MyComponent(props) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
    });

    return (
        <div className={styles.string}>
            {/* styles.string contains final CSS classes */}
        </div>
    );
}
```

### Standard Component Pattern

```javascript
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

---

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

---

## Context Providers

### ThemeContext

**Provider:** [src/Context/ThemeContext.js](src/Context/ThemeContext.js)

**Values:**

```javascript
{
    currentTheme: Object,           // Current theme object with CSS mappings
    themeKey: String,               // Current theme key
    themeVariant: String,           // "light" or "dark"
    changeCurrentTheme: Function,   // Switch to a different theme
    changeThemeVariant: Function,   // Toggle light/dark variant
    themes: Object,                 // All available themes
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

---

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

Defines component theme keys used throughout the library:

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

---

## Styling Components

Override component styles with common props:

```jsx
<Panel
    backgroundColor="bg-blue-100"
    borderColor="border-blue-300"
    padding="p-6"
/>
```

---

## Testing Integration with Dash

### Local Testing Workflow

**Method 1: Local package install (recommended)**

```bash
# In dash-react
npm run prod

# In dash-electron
cd ~/Development/dash-electron/dash-electron
npm install ../dash-react/package/trops-dash-react.tgz
npm run dev
```

**Method 2: npm link** (not recommended -- can cause dual context issues)

```bash
# In dash-react
cd dist
npm link

# In dash-electron
npm link @trops/dash-react
```

### Verifying Changes

After rebuilding dash-react:

1. Check component renders correctly in Storybook
2. Install updated package in dash-electron
3. Test in dash Electron app
4. Verify theme system works
5. Check console for errors

---

## Troubleshooting

### Theme Issues

**Problem:** Components not receiving theme

**Solution:** Ensure consuming app imports ThemeContext from dash-react:

```javascript
// CORRECT
import { ThemeContext } from "@trops/dash-react";

// WRONG - creates separate context instance
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

---

## Related Projects

| Repo                 | Location                                    | Relationship                                                 |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| **@trops/dash-core** | `~/Development/dash-core/dash-core`         | Core dashboard framework -- primary consumer of this library |
| **dash-electron**    | `~/Development/dash-electron/dash-electron` | Electron app template built on dash-core + dash-react        |

**Critical:** `@trops/dash-core` MUST import `ThemeContext` from `@trops/dash-react` to avoid dual context issues.

---

## Documentation

- [Documentation Index](./docs/INDEX.md) - Component library documentation
- [Product Requirements](./docs/requirements/README.md) - PRDs for component API design and changes
- [Storybook](http://localhost:6006) - Interactive component playground (run `npm run storybook`)

---

## Support

For questions or issues: john.giatropoulos@gmail.com
