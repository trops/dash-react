/**
 * DashboardApiInterface
 * An Interface that may be extended in order to provide different abstractions for functionality (Electron, JS, etc)
 */

interface IDashboardApi {
    /**
     * @param api Object
     * If passing in an api from another source/vendor to facilitate the calls
     * @example Electron api
     */
    api: any;

    appId: String;

    /**
     * events
     * The events that will be used throughout the API
     */
    events: any;

    /**
     * listWorkspaces
     * Get the workspaces for the Dashboard application
     *
     * @param appId string the application id for the Dashboard
     * @param onSuccess function the callback function on success
     * @param onError function the callback function on error
     * @returns Object the resulting workspaces object
     */
    listWorkspaces: (
        appId: string,
        onSuccess: { event: string; workspaces: [] },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * listThemes
     * List the themes for the application
     *
     * @param appId
     * @param onSuccess
     * @param onError
     * @returns
     */
    listThemes: (
        appId: string,
        onSuccess: { event: string; themes: [] },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * listSettings
     * List the settings for the application (or all of the applications)
     * @param appId
     * @param onSuccess
     * @param onError
     * @returns
     */
    listSettings: (
        appId: string,
        onSuccess: { event: string; settings: [] },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * listMenuItems
     * Get the menu items for the Dashboard application
     *
     * @param appId string the application id for the Dashboard
     * @param onSuccess function the callback function on success
     * @param onError function the callback function on error
     * @returns Object the resulting menu items object
     */
    listMenuItems: (
        appId: string,
        onSuccess: { event: string; menuItems: [] },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * saveWorkspace
     * @param appId
     * @param workspaceToSave
     * @returns
     */
    saveWorkspace: (
        appId: string,
        workspaceToSave: any,
        onSuccess: { event: string; m: string },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * saveMenuItem
     * @param appId
     * @param menuItem
     * @returns
     */
    saveMenuItem: (
        appId: string,
        menuItem: any,
        onSuccess: any,
        onError: { event: string; e: Error }
    ) => Boolean;

    saveSettings: (
        appId: string,
        settings: any,
        onSuccess: any,
        onError: { event: string; e: Error }
    ) => Boolean;

    saveTheme(
        appId,
        themeKey: string,
        rawTheme: {},
        onSuccess: any,
        onError: { event: string; e: Error }
    ): Boolean;

    chooseFile(
        allowFile: Boolean,
        extensions: Array<String>,
        onSuccess: any
    ): Boolean;

    /**
     * listProviders
     * List all registered providers (API clients, credentials, etc.) for the application
     *
     * @param appId
     * @param onSuccess callback with { event: string; providers: Array }
     * @param onError callback with { event: string; e: Error }
     * @returns Boolean
     */
    listProviders: (
        appId: string,
        onSuccess: { event: string; providers: [] },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * getProvider
     * Get a specific provider by name
     *
     * @param appId
     * @param providerName unique provider identifier (e.g., "algolia-prod")
     * @param onSuccess callback with { event: string; provider: Object }
     * @param onError callback with { event: string; e: Error }
     * @returns Boolean
     */
    getProvider: (
        appId: string,
        providerName: string,
        onSuccess: { event: string; provider: any },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * saveProvider
     * Save or update a provider (credentials will be encrypted by Electron app)
     *
     * @param appId
     * @param providerName unique provider identifier
     * @param providerData { type: string, credentials: Object }
     * @param onSuccess callback with { event: string; message: string }
     * @param onError callback with { event: string; e: Error }
     * @returns Boolean
     */
    saveProvider: (
        appId: string,
        providerName: string,
        providerData: any,
        onSuccess: { event: string; message: string },
        onError: { event: string; e: Error }
    ) => Boolean;

    /**
     * deleteProvider
     * Delete a provider from the registry
     *
     * @param appId
     * @param providerName
     * @param onSuccess callback with { event: string; message: string }
     * @param onError callback with { event: string; e: Error }
     * @returns Boolean
     */
    deleteProvider: (
        appId: string,
        providerName: string,
        onSuccess: { event: string; message: string },
        onError: { event: string; e: Error }
    ) => Boolean;
}

export default IDashboardApi;
