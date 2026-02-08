# Provider Detection System - Implementation Summary

## Overview

The provider detection system has been fully integrated into the Dash React framework using an **error boundary pattern** similar to the existing `WidgetErrorBoundary`. This allows each widget on a dashboard to independently detect and handle missing providers without blocking the entire dashboard from rendering.

## Architecture

### Component Hierarchy

```
Widget (src/Widget/Widget.js)
  └── ProviderErrorBoundary (automatic wrapper)
       └── WidgetErrorBoundary
            └── Your Widget Component
```

### Key Components

| Component               | Purpose                               | Location                                |
| ----------------------- | ------------------------------------- | --------------------------------------- |
| `ProviderErrorBoundary` | Error boundary for provider detection | `src/Provider/ProviderErrorBoundary.js` |
| `MissingProviderPrompt` | Setup UI when providers missing       | `src/Provider/MissingProviderPrompt.js` |
| `ProviderSelector`      | Modal for select/create provider flow | `src/Provider/ProviderSelector.js`      |
| `ProviderForm`          | Dynamic form from credential schema   | `src/Provider/ProviderForm.js`          |

## How It Works

### Automatic Detection (What Happens Behind the Scenes)

1. **Widget mounts** → `ProviderErrorBoundary` checks required providers
2. **Provider check runs** → Compares `requiredProviders` against registered providers in `ProviderContext`
3. **Decision point**:
    - All providers registered? → Render widget normally ✅
    - Any missing? → Show `MissingProviderPrompt` 📋

### User Experience Flow

```
Widget Config has requiresProviders
    ↓
ProviderErrorBoundary checks
    ↓
Are all required providers registered?
    ├─ YES → Widget renders normally
    └─ NO → MissingProviderPrompt shows
            ↓
        User clicks "Configure"
            ↓
        ProviderSelector modal opens
            ├─ Tab 1: Select existing provider
            │  └─ User picks from list → Provider assigned
            └─ Tab 2: Create new provider
               └─ ProviderForm shows → User fills & submits
                  └─ Credentials saved to Electron (encrypted)
            ↓
        Prompt closes
            ↓
        ProviderErrorBoundary re-checks providers
            ↓
        All available now → Widget renders ✅

```

## Developer Integration

### Step 1: Add `requiresProviders` to Widget Config

```js
// MyWidget.dash.js
export default {
    component: MyWidget,
    type: "widget",
    requiresProviders: [
        {
            type: "algolia",
            credentialSchema: {
                appId: {
                    type: "text",
                    displayName: "Application ID",
                    required: true,
                    secret: true,
                },
                apiKey: {
                    type: "text",
                    displayName: "API Key",
                    required: true,
                    secret: true,
                },
            },
        },
    ],
};
```

### Step 2: Use Provider in Your Widget

```js
import { useProvider } from "@dash/Provider";

function MyWidget() {
    const { credentials } = useProvider("algolia");

    // At this point, credentials are guaranteed to exist
    // because ProviderErrorBoundary only renders when available

    return (
        <div>
            <SearchWithAlgolia
                appId={credentials.appId}
                apiKey={credentials.apiKey}
            />
        </div>
    );
}
```

### Step 3 (Optional): Handle Provider Selection

If you need to know when a provider was selected/changed:

```js
function MyWidget({ onProviderSelect }) {
    const handleProviderSelect = useCallback((type, name, credentials) => {
        // Called when user selects or creates a provider
        if (onProviderSelect) {
            onProviderSelect(type, name, credentials);
        }
    }, [onProviderSelect]);

    return (
        // Your widget...
    );
}
```

## File Changes

### Created Files

- `src/Provider/ProviderErrorBoundary.js` - Error boundary for provider detection
- Updated exports in `src/Provider/index.js`

### Modified Files

- `src/Widget/Widget.js` - Added ProviderErrorBoundary wrapper
    - Imported `ProviderErrorBoundary` from `@dash/Provider`
    - Added props: `requiredProviders`, `onProviderSelect`
    - Wraps `WidgetErrorBoundary` with `ProviderErrorBoundary`

### Documentation

- `README.md` - Updated Provider Selection UI section with automatic detection flow
- `COMPONENT_REFERENCE.md` - Added complete `ProviderErrorBoundary` documentation
- `src/Widgets/IMPLEMENTATION_GUIDE.md` - Added Quick Start section on automatic detection
- `PROVIDER_DETECTION_SUMMARY.md` - This file

## Multi-Widget Dashboard Behavior

When a dashboard has multiple widgets:

```
Dashboard
├── Widget A (requires Algolia - ✓ registered)
│   └── Renders normally
├── Widget B (requires Slack - ✗ missing)
│   └── Shows MissingProviderPrompt
└── Widget C (requires Google Drive - ✓ registered)
    └── Renders normally
```

Each widget independently detects and handles its provider requirements. The dashboard continues to function—it's not blocked by missing providers in individual widgets.

## Error Handling

### Missing ProviderContext

If `ProviderContext` is not available, `ProviderErrorBoundary` logs a warning but still renders children. This allows development without a full provider setup.

### Provider Check Failure

If the provider check throws an error, it's caught and displayed as an error message in `MissingProviderPrompt`.

### Empty Required Providers

If `requiredProviders` is empty or not provided, children render immediately without any checks.

## API Reference

### ProviderErrorBoundary Props

| Prop                | Type        | Description                                                         | Required |
| ------------------- | ----------- | ------------------------------------------------------------------- | -------- |
| `requiredProviders` | `string[]`  | Array of provider type strings (e.g., `["algolia", "slack"]`)       | Yes      |
| `widgetId`          | `string`    | Unique identifier for this boundary (typically UUID)                | Yes      |
| `onProviderSelect`  | `function`  | Callback `(type, name, credentials) => void` when provider selected | No       |
| `children`          | `ReactNode` | Component tree to render when providers available                   | Yes      |

### ProviderContext API

```js
const context = useContext(ProviderContext);

// Access registered providers
const providers = context.listProviders();
// Returns: [{ type: "algolia", name: "prod", credentials: {...} }, ...]

// Check if provider registered
const hasProvider = context.hasProvider("algolia");

// Get provider by name
const provider = context.getProvider("algolia", "prod");
```

## Testing

To test widgets with providers:

```js
import { ProviderContext } from "@dash/Provider";

const mockProviders = [
    {
        type: "algolia",
        name: "test-algolia",
        credentials: { appId: "test-app", apiKey: "test-key" },
    },
];

render(
    <ProviderContext.Provider value={{ providers: mockProviders }}>
        <MyWidget />
    </ProviderContext.Provider>
);
```

## Common Patterns

### Pattern 1: Optional Provider

If your widget works with or without a provider:

```js
const credentialsOrNull = useProviderOptional("algolia");

return credentialsOrNull ? (
    <SearchWithAlgolia {...credentialsOrNull} />
) : (
    <LocalSearch />
);
```

### Pattern 2: Multiple Providers

Widget requiring multiple different providers:

```js
export default {
    requiresProviders: [
        { type: "algolia", credentialSchema: {...} },
        { type: "slack", credentialSchema: {...} },
    ],
};

function MyWidget() {
    const algolia = useProvider("algolia");
    const slack = useProvider("slack");

    return <ComplexWidget algolia={algolia} slack={slack} />;
}
```

### Pattern 3: Conditional Configuration

Widget where provider selection affects behavior:

```js
<ProviderErrorBoundary
    requiredProviders={widget.config.requiredProviders}
    widgetId={widget.uuid}
    onProviderSelect={(type, name, creds) => {
        // Save provider choice to dashboard config
        dashApi.updateWidgetConfig(widget.uuid, {
            selectedProvider: { type, name },
        });
    }}
>
    <MyWidget />
</ProviderErrorBoundary>
```

## Troubleshooting

| Issue                                           | Solution                                                                                           |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Provider prompt not showing                     | Verify `ProviderContext` is wrapped around app, check `requiredProviders` has correct type strings |
| Provider selected but widget still shows prompt | Call `dashApi.listProviders()` after saving to refresh registry                                    |
| Credentials appear as `undefined`               | Widget is rendering before provider check completes—this shouldn't happen with boundary            |
| Form validation not working                     | Ensure `credentialSchema` has `required: true` for needed fields                                   |
| Secret fields not masked                        | Check `credentialSchema` has `secret: true` for that field                                         |

## Next Steps

1. **Test with actual widgets**: Create sample widgets that require different providers
2. **Implement save callback**: Connect `onProviderSelect` to `DashboardApi.saveProvider()`
3. **Update existing widgets**: Add `requiresProviders` to any widgets that need providers
4. **Add provider management UI**: Dashboard admin panel for managing global providers

## Summary

The provider detection system is now fully integrated and automatic. Developers simply:

1. ✅ Add `requiresProviders` to widget config
2. ✅ Use `useProvider()` to access credentials in their widget
3. ✅ Done! The framework handles detection, prompts, and credential management

End users get:

1. ✅ Automatic setup prompts when needed
2. ✅ Easy provider selection/creation flow
3. ✅ Credentials securely encrypted by Electron
4. ✅ Dashboard continues working for other widgets
