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
}

export default IDashboardApi;
