# dash-react

**dash-react** is a React UI component library for building dashboards. It provides a curated set of reusable components, theming support, and essential hooks for dashboard applications.

## What's Included

- **Core UI Components**: Button, Panel, Modal, Menu, Container, and more
- **Layout Components**: LayoutContainer, MainLayout, Workspace, Widget
- **Context Hooks**: ThemeContext, WidgetContext for component communication
- **Theming**: Built-in theme tokens and customization via Tailwind CSS
- **Utilities**: Colors, strings, CSS helpers, and other shared utilities

## Requirements

- Node.js + npm

## Installation

```bash
npm install
```

## Common Commands

```bash
npm run storybook
npm run build-storybook
npm run build
npm run build:css
npm run prod
```

## Maintainer Guide

### Updating Components

1. Edit component files under:

    - `src/Common/` - Core UI components (Button, Panel, Modal, etc.)
    - `src/Layout/` - Layout primitives (LayoutContainer, etc.)
    - `src/Context/` - Context providers (ThemeContext, WidgetContext)
    - `src/Utils/` - Helper utilities (colors, strings, CSS utilities)

2. If Tailwind styles change, rebuild CSS:

```bash
npm run build:css
```

### Testing Components with Storybook

View component changes interactively:

```bash
npm run storybook
```

Build static Storybook for CI/deployment:

```bash
npm run build-storybook
```

### Publishing Updates

To release a new version:

```bash
npm version patch        # or minor/major
npm run prod             # Builds and creates package
git push origin main
```

## Component Overview

### Layout Components

- **`LayoutContainer`** - Flexible row/column container for dashboard layouts
- **`MainLayout` / `MainSection` / `MainContent`** - Page-level layout structure
- **`Container`** - Generic container with spacing utilities
- **`Header` / `SubHeader` / `Footer`** - Header and footer sections
- **`Panel`** - Styled card/panel container
- **`DashPanel`** - Dashboard-specific panel wrapper

### Interactive Components

- **`Button` / `ButtonIcon`** - Action buttons
- **`Menu` / `MenuItem`** - Dropdown and list menus
- **`Toggle`** - Toggle switch input
- **`Modal`** - Modal overlay dialogs
- **`SlidePanelOverlay`** - Side panel overlay
- **`Tag`** - Label/tag component

### Feedback & Layout

- **`Notification` / `NotificationCancel`** - Alert notifications
- **`ErrorBoundary` / `ErrorMessage`** - Error handling UI
- **`Widget`** - Base widget wrapper
- **`Workspace`** - Widget container with context support

### Content & Utilities

- **`CodeEditor` / `CodeRenderer`** - Code input and display
- **`Form`** - Form input utilities
- **`Text`** - Typography helpers
- **`Draggable`** - Drag-and-drop helpers

## Theming

Components use **ThemeContext** to access theme tokens:

```js
import { useTheme } from "@dash/Context";

const MyComponent = () => {
    const { currentTheme } = useTheme();
    return <div className={currentTheme["bg-primary"]}>{/* ... */}</div>;
};
```

Available theme tokens:

- `bg-*` - Background colors (primary, secondary, danger, etc.)
- `text-*` - Text colors
- `border-*` - Border colors
- Variants: `very-light`, `light`, `medium`, `dark`, `very-dark`

## Styling Components

Override component styles with common props:

```jsx
<Panel
    backgroundColor="bg-blue-100"
    borderColor="border-blue-300"
    padding="p-6"
/>
```

## Using Context Hooks

The library provides two context hooks:

```js
// Access theme tokens and colors
import { useTheme } from "@dash/Context";
const { currentTheme } = useTheme();

// Access widget instance metadata (when inside a widget)
import { useWidgetContext } from "@dash/Context";
const { uuid, selectedProviders } = useWidgetContext();
```

## Documentation

For component library documentation, see [docs/INDEX.md](./docs/INDEX.md).

**Using dash-react in an application?**

- See the [@trops/dash](https://github.com/trops/dash) Electron dashboard application for a complete example
- [Dash Documentation](https://github.com/trops/dash/tree/main/docs) - Widget development, provider system, and application architecture

## Support

For questions or issues: john.giatropoulos@gmail.com
