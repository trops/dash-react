# Provider Context Integration - Complete Implementation

## Architecture Overview

Providers are now fully integrated into the dashboard context system, making them accessible to widgets through the `useDashboard()` hook.

## Data Flow

### Initialization (App Startup)

1. **Dash.js** (main app) - Renders Dashboard with ElectronDashboardApi
2. **DashboardWrapper** (dash-react) - Wraps children with contexts
3. **AppWrapper** (dash-react) - Initializes:
    - Settings via `dashApi.listSettings()`
    - **Providers via `dashApi.listProviders()`** ← NEW
4. **Provider List Complete** - AppWrapper receives decrypted providers
    - Main app's `providerApi.listProvidersForApplication()` calls IPC handler
    - Main process's `providerController.listProviders()` decrypts all providers
    - Returns array: `[{ name, type, credentials }, ...]`
5. **Store in AppContext** - AppWrapper stores providers in state
6. **Pass to DashboardContext** - DashboardWrapper reads from AppContext
7. **Widget Access** - Widgets can now use:
    ```javascript
    const { dashboard } = useDashboard();
    const providers = dashboard.providers; // { "Algolia Production": {...}, ... }
    const myProvider = providers["Algolia Production"];
    const { credentials } = myProvider;
    ```

## Files Modified

### dash-react Library

#### 1. `src/Context/DashboardContext.js`

- Added `providers: {}` to context default value
- Widgets and components can now access `useDashboard().dashboard.providers`

#### 2. `src/Context/DashboardWrapper.js`

- Added import of `AppContext`
- In `getValue()`, now reads `appContext?.providers` and passes to DashboardContext
- Providers flow through: AppContext → DashboardContext → Dashboard/Widgets

#### 3. `src/Context/App/AppWrapper.js`

- Added `providers` state: `const [providers, setProviders] = useState({})`
- Added `isLoadingProviders` state to track loading status
- Added `useEffect` to load providers on mount (after settings)
- Implemented `loadProviders()` - Calls `dashApi.listProviders()`
- Implemented `handleGetProvidersComplete()` - Converts array to object keyed by name
- Implemented `handleGetProvidersError()` - Gracefully handles errors
- Updated `getValue()` to include `providers: providers`
- Providers now available to child components via AppContext

### Main App (dash/dash)

#### 1. `public/lib/api/providerApi.js`

- Added dual-method approach:
    - **Promise-based**: `listProviders()`, `saveProvider()`, `getProvider()`, `deleteProvider()`
    - **Event-based**: `listProvidersForApplication()`, etc. (for ElectronDashboardApi compatibility)
- Event-based methods use `ipcRenderer.invoke()` internally, then emit events via `ipcRenderer.send()`
- This bridges the old event-listener pattern with modern IPC approach

## How Widgets Access Providers

### Method 1: Via Dashboard Context Hook

```javascript
import { useDashboard } from "@trops/dash-react";

function MyWidget() {
    const { dashboard, app } = useDashboard();
    const providers = dashboard.providers;

    // Widget has access to:
    // - Its own selectedProviders (from workspace)
    // - Decrypted credentials for all providers (from DashboardContext)

    const selectedProviderName = selectedProviders.algolia; // "Algolia Production"
    const provider = providers[selectedProviderName]; // Full provider object with credentials
    const { appId, apiKey } = provider.credentials;

    // Use credentials to initialize Algolia client
    return <AlgoliaSearch appId={appId} apiKey={apiKey} />;
}
```

### Method 2: Combining with Widget Props

Widget receives:

- `selectedProviders` - Provider NAMES selected for this widget (from workspace)
- Access to `providers` via `useDashboard()` - Provider objects with credentials

```javascript
function MyWidget({ selectedProviders }) {
    const { dashboard } = useDashboard();

    // Look up the actual credentials
    const providerName = selectedProviders?.algolia;
    const provider = dashboard.providers[providerName];

    if (!provider) {
        return <MissingProviderMessage />;
    }

    return <WidgetContent credentials={provider.credentials} />;
}
```

## Initialization Sequence Diagram

```
App Startup
    ↓
Dash.js renders Dashboard
    ↓
Dashboard wraps with DashboardWrapper
    ↓
DashboardWrapper wraps with AppWrapper
    ↓
AppWrapper.useEffect (on mount)
    ├─ loadSettings() → dashApi.listSettings()
    └─ loadProviders() → dashApi.listProviders()
    ↓
Main app receives IPC:
    ├─ WORKSPACE_LIST → settings
    └─ PROVIDER_LIST → providers from providerController
    ↓
Main process (electron.js):
    └─ providerController.listProviders()
        ├─ Reads providers.json
        ├─ Decrypts all credentials
        └─ Returns: { providers: [...] }
    ↓
AppWrapper receives data:
    ├─ setSettings()
    └─ setProviders()
    ↓
DashboardWrapper reads AppContext
    └─ Passes providers to DashboardContext
    ↓
Widgets render with providers available
```

## State Management

### AppContext (from AppWrapper)

```javascript
{
  providers: {
    "Algolia Production": {
      name: "Algolia Production",
      type: "algolia",
      credentials: { appId: "...", apiKey: "..." }
    },
    "Slack Dev": {
      name: "Slack Dev",
      type: "slack",
      credentials: { webhook: "...", token: "..." }
    }
  }
}
```

### DashboardContext (from DashboardWrapper)

```javascript
{
  providers: { /* same as above */ },
  dashApi: ElectronDashboardApi,
  widgetApi: WidgetApi,
  // ... other properties
}
```

## Error Handling

- If `listProviders()` fails, AppWrapper catches error and sets empty providers object
- Widget rendering continues but shows no providers available
- Can be enhanced to show error message to user

## Next Steps for Main App

1. ✅ Provider API created with event-listener methods
2. ✅ IPC handlers registered in electron.js
3. ✅ AppWrapper loads providers on startup
4. ✅ Providers stored in DashboardContext
5. ⏳ Test end-to-end: Create provider → Save → Load at startup → Widget access

## Testing Checklist

- [ ] Create a new provider via ProviderForm
- [ ] Verify it's saved to `~/.userData/Dashboard/{appId}/providers.json`
- [ ] Reload app
- [ ] Verify `dashboard.providers` contains the provider
- [ ] Widget can access credentials and use for API calls
- [ ] Error handling works if providers.json is missing or corrupted

## Code Quality

- All syntax validated ✓
- Event-listener and Promise patterns both supported ✓
- Graceful error handling ✓
- Follows existing patterns in codebase ✓
- No breaking changes to existing APIs ✓
