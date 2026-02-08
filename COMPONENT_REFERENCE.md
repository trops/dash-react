/\*\*

- PROVIDER MANAGEMENT UI COMPONENTS
-
- Complete Reference Guide for dash-react Provider Selection & Creation System
- ============================================================================
  \*/

/\*\*

- COMPONENT HIERARCHY
-
- MissingProviderPrompt (shows when no provider is configured)
- ├── Displays warning with required providers count
- ├── Lists each missing provider with field count
- └── Has "Configure" button that opens ProviderSelector
-
- ProviderSelector (modal for selecting/creating providers)
- ├── Tab 1: Select Existing
- │ └── Lists existing providers filtered by type
- │ └── Click to select and close modal
- └── Tab 2: Create New
-        └── Renders ProviderForm
-
- ProviderForm (dynamic form from credentialSchema)
- ├── Renders input fields based on credentialSchema
- ├── Validates required fields
- ├── Masks secret fields with password input
- ├── Shows field-level error messages
- └── Has Cancel/Submit buttons
-
- ProviderAwareWidget (wrapper for detection)
- ├── withProviderDetection (HOC)
- └── WidgetProviderWrapper (component wrapper)
  \*/

// ============================================================================
// 1. MissingProviderPrompt
// ============================================================================

import { MissingProviderPrompt } from "@dash/Form";

/\*\*

- Displays when a widget requires a provider that isn't configured
- Shows a friendly prompt guiding users through provider setup
-
- Props:
-   - requiredProviders: Array of {type, credentialSchema} from widget config
-   - registeredProviders: Array of {name, type, credentials} already set up
-   - onProviderSelect: Callback(providerType, providerName, credentials?)
-
- Features:
-   - Shows count of missing providers
-   - Lists field count for each provider type
-   - Opens ProviderSelector modal on "Configure" click
-   - Professional yellow warning styling
      \*/

<MissingProviderPrompt
requiredProviders={[
{
type: "algolia",
credentialSchema: {
appId: { type: "text", required: true, secret: true },
apiKey: { type: "text", required: true, secret: true },
indexName: { type: "text", required: true },
},
},
]}
registeredProviders={[
{ name: "algolia-prod", type: "algolia", credentials: {} },
]}
onProviderSelect={(type, name, credentials) => {
// Called when user selects existing or creates new provider
// For new: credentials object is passed
// For existing: only type and name are passed
}}
/>;

// ============================================================================
// 2. ProviderSelector
// ============================================================================

import { ProviderSelector } from "@dash/Form";

/\*\*

- Modal dialog with two tabs for provider management
-
- Tab 1: Select Existing
-   - Shows all registered providers of the required type
-   - Click to select (closes modal)
-   - Shows provider name, type, and available fields
-
- Tab 2: Create New
-   - Renders ProviderForm with credentialSchema
-   - User fills credentials
-   - Submit creates and returns new provider
-
- Props:
-   - isOpen: Boolean - modal visibility
-   - setIsOpen: Function - toggle modal
-   - providerType: String - which provider type (e.g., "algolia")
-   - existingProviders: Array - all registered providers
-   - credentialSchema: Object - form schema from widget config
-   - onSelect: Callback(providerName) - when existing provider is selected
-   - onCreate: Callback(providerName, credentials) - when new provider created
      \*/

<ProviderSelector
isOpen={isOpen}
setIsOpen={setIsOpen}
providerType="algolia"
existingProviders={[
{
name: "algolia-prod",
type: "algolia",
credentials: { appId: "xxx", apiKey: "yyy", indexName: "zzz" },
},
{
name: "algolia-staging",
type: "algolia",
credentials: { appId: "aaa", apiKey: "bbb", indexName: "ccc" },
},
]}
credentialSchema={{
        appId: {
            type: "text",
            displayName: "Application ID",
            instructions: "Your Algolia Application ID",
            required: true,
            secret: true,
        },
        apiKey: {
            type: "text",
            displayName: "API Key",
            instructions: "Your Algolia API Key",
            required: true,
            secret: true,
        },
        indexName: {
            type: "text",
            displayName: "Index Name",
            instructions: "Default Algolia index",
            required: true,
            secret: false,
        },
    }}
onSelect={(providerName) => {
// Existing provider selected
console.log("Selected:", providerName);
}}
onCreate={(providerName, credentials) => {
// New provider created
console.log("Created:", providerName, credentials);
// Save to Electron via dashApi.saveProvider()
}}
/>;

// ============================================================================
// 3. ProviderForm
// ============================================================================

import { ProviderForm } from "@dash/Form";

/\*\*

- Dynamically renders form fields based on credentialSchema
- Used by ProviderSelector "Create New" tab
- Can also be used standalone for provider editing
-
- Features:
-   - Renders input for each schema field
-   - Required field validation
-   - Password masking for secret fields
-   - Real-time error clearing as user types
-   - Field-level help text (instructions)
-   - Submit/Cancel buttons
-
- Props:
-   - credentialSchema: Object defining form fields
-   - initialValues: Object - pre-fill values for edit mode (default: {})
-   - onSubmit: Callback(formData) - form is valid and submitted
-   - onCancel: Callback() - user clicked cancel
-   - submitLabel: String - button label (default: "Create Provider")
-
- Credential Schema Structure:
- {
- fieldName: {
-     type: "text",                  // Input type (only "text" currently)
-     displayName: "Label",           // Shown to user
-     instructions: "Help text",      // Below label
-     required: true,                 // Validation
-     secret: true,                   // Use password input, encrypt
- }
- }
  \*/

<ProviderForm
credentialSchema={{
        appId: {
            type: "text",
            displayName: "Application ID",
            instructions: "Find this in your Algolia dashboard",
            required: true,
            secret: true,
        },
        apiKey: {
            type: "text",
            displayName: "API Key",
            instructions: "Use a read-only key for security",
            required: true,
            secret: true,
        },
        indexName: {
            type: "text",
            displayName: "Default Index",
            instructions: "Which index to search by default",
            required: true,
            secret: false,
        },
    }}
initialValues={{
        // For edit mode - pre-fill existing values
        appId: "ABC123",
        apiKey: "secret-key",
        indexName: "products",
    }}
onSubmit={(formData) => {
// formData = { appId: "ABC123", apiKey: "secret", indexName: "products" }
console.log("Provider created:", formData);

        // Now save to Electron:
        dashApi.saveProvider(
            appId,
            {
                name: `algolia-${Date.now()}`,
                type: "algolia",
                credentials: formData,
            },
            onSuccess,
            onError
        );
    }}
    onCancel={() => {
        console.log("User cancelled");
        // Close modal, etc
    }}
    submitLabel="Create Provider"

/>;

// ============================================================================
// 4. ProviderAwareWidget (Wrapper/HOC)
// ============================================================================

import {
WidgetProviderWrapper,
withProviderDetection,
} from "@dash/Form";

/\*\*

- OPTION A: WidgetProviderWrapper (Component)
-
- Wraps widget content to detect missing providers
- If all required providers are registered: renders children
- If any required: shows MissingProviderPrompt instead
-
- Props:
-   - children: Widget component to wrap
-   - requiredProviders: Array from widget config
-   - registeredProviders: Array of available providers
-   - onProviderSelect: Callback when user creates provider
-   - fallback: Custom UI instead of MissingProviderPrompt (optional)
      \*/

<WidgetProviderWrapper
requiredProviders={[
{
type: "algolia",
credentialSchema: { /* ... */ },
},
]}
registeredProviders={providers}
onProviderSelect={(type, name, credentials) => {
// Save to Electron, update providers list
dashApi.saveProvider(appId, { name, type, credentials }, ...);
}}

>

    <YourActualWidget providerName="algolia-prod" />

</WidgetProviderWrapper>;

/\*\*

- OPTION B: withProviderDetection (Higher-Order Component)
-
- Wraps a component to add provider detection logic
- Returns wrapped component that handles missing providers
-
- Usage:
- const Wrapped = withProviderDetection(Component, options);
- <Wrapped {...props} />
  \*/

import { withProviderDetection } from "@dash/Form";

const YourWidgetWrapped = withProviderDetection(YourWidget, {
requiredProviders: [
{ type: "algolia", credentialSchema: { /* ... */ } },
],
registeredProviders: providers,
onProviderSelect: (type, name, credentials) => {
// Handle provider creation/selection
},
});

<YourWidgetWrapped />;

// ============================================================================
// DATA FLOW: End-to-End Example
// ============================================================================

/\*\*

-   1. User loads dashboard
- └─ DashboardWrapper loads providers via dashApi.listProviders()
-       └─ Providers decrypted by Electron, stored in ProviderRegistry
-
-   2. Widget renders (e.g., AlgoliaSearchWidget)
- └─ WidgetProviderWrapper checks: has required providers?
-       ├─ YES: Render widget normally
-       └─ NO: Show MissingProviderPrompt
-
-   3. User clicks "Configure" on MissingProviderPrompt
- └─ Opens ProviderSelector modal
-       ├─ User selects existing provider
-       │  └─ onSelect callback fires
-       │     └─ Widget re-renders with selected provider name
-       │        └─ useProvider() gets credentials from registry
-       │           └─ Widget initializes API client
-       │
-       └─ User clicks "Create New" tab
-          └─ ProviderForm renders
-             └─ User fills credentials
-                └─ Submit fires onCreate callback
-                   └─ Save to Electron via dashApi.saveProvider()
-                      └─ Electron encrypts and persists
-                         └─ Call dashApi.listProviders() again
-                            └─ Update ProviderRegistry
-                               └─ Widget re-renders with new provider
-                                  └─ useProvider() gets new credentials
-                                     └─ Widget initializes with new client
    \*/

// ============================================================================
// INTEGRATION CHECKLIST
// ============================================================================

/\*\*

- For New Widget with Providers:
-
- [ ]   1. Create widget component (src/Widgets/YourWidget/YourWidget.js)
- [ ]   2. Create config with requiresProviders and credentialSchema
-        (src/Widgets/YourWidget/YourWidget.dash.js)
- [ ]   3. Wrap widget with WidgetProviderWrapper or withProviderDetection
- [ ]   4. Use useProvider(providerName) to get credentials
- [ ]   5. Instantiate API client in useEffect (reacts to provider changes)
- [ ]   6. Set up dashApi callbacks in DashboardWrapper
- [ ]   7. Test: Add to dashboard, see MissingProviderPrompt
- [ ]   8. Test: Create provider, verify form works
- [ ]   9. Test: Select provider, verify widget initializes
- [ ]   10. Test: Switch providers, verify client re-initializes
        \*/

// ============================================================================
// FILES CREATED/MODIFIED
// ============================================================================

/\*\*

- New Components (Application-Level):
-   - src/Provider/ProviderForm.js - Dynamic form from schema
-   - src/Provider/ProviderSelector.js - Modal for select/create
-   - src/Provider/MissingProviderPrompt.js - Setup prompt UI
-   - src/Provider/ProviderAwareWidget.js - Wrapper/HOC
-   - src/Provider/ProviderComponents.stories.js - Storybook demo
-
- Documentation:
-   - README.md (section: Provider Selection UI)
-   - src/Widgets/IMPLEMENTATION_GUIDE.md - Step-by-step guide
-   - src/Widgets/EXAMPLE_ProviderWidget.dash.js - Example config
-   - COMPONENT_REFERENCE.md (this file) - API reference
-
- Updated Exports:
-   - src/Provider/index.js - Application-level provider components
-   - src/Common/Form/index.js - Form components only (InputText, FormLabel, SelectMenu)
      \*/

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

/\*\*

- All provider components have Storybook stories:
- npm run storybook
-
- Navigate to:
- Common > Form > Provider Components
-
- Available Stories:
-   - MissingProvider - Shows prompt when no provider configured
-   - FormCreate - Create mode with empty form
-   - FormEdit - Edit mode with pre-filled values
-   - SelectorSelectExisting - Modal with existing providers
-   - SelectorNoProviders - Modal with empty list
-   - CompleteFlow - Full user journey simulation
      \*/

// ============================================================================
// 5. ProviderErrorBoundary
// ============================================================================

import { ProviderErrorBoundary } from "@dash/Provider";

/\*\*

- Error boundary for automatic provider detection in widgets
-
- This is the PRIMARY mechanism for handling missing providers.
- It's automatically used inside Widget.js, but can be used directly
- for custom provider detection scenarios.
-
- Props:
-   - requiredProviders: Array of provider type strings (e.g., ["algolia", "slack"])
-   - widgetId: Unique identifier for this provider boundary (typically UUID)
-   - onProviderSelect: Callback(type, name, credentials) when provider selected
-   - children: Component tree to render if providers are available
-
- Features:
-   - Checks required providers on component mount
-   - Re-checks when requiredProviders prop changes
-   - Accesses ProviderContext to get registered providers
-   - Shows MissingProviderPrompt if any providers missing
-   - Handles provider selection callbacks
-   - Passes provider selection to parent component
-   - Gracefully handles when ProviderContext is unavailable
-
- Lifecycle:
-   1.  Mount: checkProviders() runs, compares required vs registered
-   2.  If missing: renders MissingProviderPrompt with setup UI
-   3.  If complete: renders children normally
-   4.  On provider select: handleProviderSelect() fires callback
-   5.  After save: re-checks providers, hides prompt if now complete
-
- Usage (direct, manual control):
- <ProviderErrorBoundary
-       requiredProviders={["algolia", "slack"]}
-       widgetId={widgetUUID}
-       onProviderSelect={(type, name, credentials) => {
-           // Save provider association
-           // Update widget config
-           // Refresh provider registry
-       }}
- >
-       <YourWidget />
- </ProviderErrorBoundary>
-
- How Widget.js uses it (automatic):
- Widget.js wraps WidgetErrorBoundary with ProviderErrorBoundary:
-
- <ProviderErrorBoundary
-       requiredProviders={widgetConfig.requiresProviders}
-       widgetId={widgetUUID}
-       onProviderSelect={onProviderSelect}
- >
-       <WidgetErrorBoundary widgetId={widgetUUID}>
-           {children}
-       </WidgetErrorBoundary>
- </ProviderErrorBoundary>
-
- Multiple widgets on dashboard:
-   - Widget A needs Algolia (missing) → shows MissingProviderPrompt
-   - Widget B needs Slack (registered) → renders normally
-   - Widget C needs Google Drive (missing) → shows MissingProviderPrompt
-   - Dashboard continues to function, no blocking
-
- Error handling:
-   - If ProviderContext not available: logs warning, renders children
-   - If requiredProviders is empty: renders children immediately
-   - If provider check fails: catches error, shows error message
      \*/

// Example: Custom widget with provider detection
function CustomWidget({ widgetUUID, apiClient }) {
const [selectedProviders, setSelectedProviders] = useState({});

    const handleProviderSelect = useCallback((type, name, credentials) => {
        setSelectedProviders(prev => ({
            ...prev,
            [type]: { name, credentials }
        }));

        // Persist to DashboardApi
        dashApi.saveProvider(type, { name, credentials });
    }, []);

    return (
        <ProviderErrorBoundary
            requiredProviders={["algolia", "slack"]}
            widgetId={widgetUUID}
            onProviderSelect={handleProviderSelect}
        >
            <div className="widget-content">
                {/* Widget only renders here if all providers available */}
                <SearchWithAlgolia />
                <SlackNotifications />
            </div>
        </ProviderErrorBoundary>
    );

}

// ============================================================================
// COMMON ISSUES & SOLUTIONS
// ============================================================================

/\*\*

- Q: ProviderErrorBoundary not showing MissingProviderPrompt
- A: Check that ProviderContext is wrapped around the component tree
- Verify requiredProviders array has correct provider type strings
- Check browser console for error messages
-
- Q: MissingProviderPrompt shows but provider selection doesn't save
- A: Implement onProviderSelect callback to save to DashboardApi
- Then call dashApi.listProviders() to refresh the registry
- The boundary will re-check and hide prompt automatically
-
- Q: Widget disappears when provider deselected
- A: That's expected behavior—provider is no longer registered
- MissingProviderPrompt will show again
- User must re-select or re-create the provider
-
- Q: useProvider() throws "Provider not found" error
- A: Wrap widget with ProviderErrorBoundary to show MissingProviderPrompt
- OR ensure provider is registered in ProviderContext before widget renders
-
- Q: Provider appears in selector but credentials are empty
- A: Provider hasn't been fully loaded from Electron yet
- Check dashApi.listProviders() callback in DashboardWrapper
-
- Q: Secret fields not being masked in form
- A: Ensure credentialSchema has secret: true for that field
- Check ProviderForm renders password input type
-
- Q: User selects provider but widget doesn't update
- A: Make sure onProviderSelect callback saves to Electron
- Then calls dashApi.listProviders() to reload registry
- Check that ProviderErrorBoundary re-checks after save
-
- Q: Form validation not working
- A: Ensure credentialSchema has required: true for needed fields
- Check ProviderForm validateForm() logic
-
- Q: How to allow user to edit existing provider?
- A: Create second ProviderForm with initialValues set to existing
- credentials, pass to modal as "Edit" tab
-
- Q: How do I test widgets with providers?
- A: Mock ProviderContext with test providers:
- const mockProviders = [
-        { type: "algolia", name: "prod", credentials: { appId: "test" } }
- ];
- <ProviderContext.Provider value={{ providers: mockProviders }}>
-        <YourWidget />
- </ProviderContext.Provider>
  \*/
