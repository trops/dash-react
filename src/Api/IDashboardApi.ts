/**
 * DashboardApiInterface
 * An Interface that may be extended in order to provide different abstractions for functionality (Electron, JS, etc)
 */

import * as apiEvents from "./events";

interface IDashboardApi {
    /**
     * @param api Object
     * If passing in an api from another source/vendor to facilitate the calls
     * @example Electron api
     */
    api: any;
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
        onSuccess?: { workspaces: [] },
        onError?: Error
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
        onSuccess?: { themes: [] },
        onError?: Error
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
        onSuccess: { settings: [] },
        onError: Error
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
        onSuccess: { menuItems: [] },
        onError: Error
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
        onSuccess: any,
        onError: Error
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
        onError: Error
    ) => Boolean;

    saveSettings: (
        appId: string,
        settings: any,
        onSuccess: any,
        onError: Error
    ) => Boolean;

    saveTheme(
        appId,
        themeKey: string,
        rawTheme: {},
        onSuccess: any,
        onError: any
    ): Boolean;
}

export default IDashboardApi;
