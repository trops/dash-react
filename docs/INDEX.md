# dash-react Documentation

**dash-react** is a React UI component library for building dashboards. This documentation covers the component library, theming, and core utilities.

For comprehensive provider system and application architecture documentation, see the [dash application docs](../../dash/docs/).

## Library Overview

See [../README.md](../README.md) for:

- Component overview and usage
- Installation and setup
- Theming and styling
- Development and publishing workflow

## Core Features

- **UI Components** - Themed components for building dashboards
- **Layout System** - Flexible layout containers and structure primitives
- **Theming** - Built-in theme tokens and Tailwind CSS integration
- **Context Hooks** - ThemeContext and WidgetContext for component communication
- **Utilities** - Colors, strings, CSS helpers, and other shared utilities

## Component Library Reference

### Layout Components

- `LayoutContainer` - Flexible row/column layouts
- `MainLayout`, `MainSection`, `MainContent` - Page structure
- `Panel`, `DashPanel` - Card/panel containers
- `Container` - Generic container with spacing

### Interactive Components

- `Button`, `ButtonIcon` - Action buttons
- `Modal` - Modal dialogs
- `Menu`, `MenuItem` - Dropdown menus
- `Toggle` - Toggle switches
- `Tag` - Labels and tags

### Context Hooks

- `useTheme()` - Access theme tokens
- `useWidgetContext()` - Widget metadata and state

See [../README.md](../README.md#component-overview) for complete component list.

## Using This Library

To use dash-react in your own Electron application, see the complete example:

- [@trops/dash](https://github.com/trops/dash) - Full-featured Electron dashboard application
- [Dash Widget Development](https://github.com/trops/dash/tree/main/docs/WIDGET_DEVELOPMENT.md)
- [Provider System](https://github.com/trops/dash/tree/main/docs/PROVIDER_ARCHITECTURE.md)

---

**Last Updated:** February 2026
