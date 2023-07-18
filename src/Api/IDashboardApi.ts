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
    api?:any,

    /**
     * constructor
     * @param api Object the api that is to be utilized 
     */
    // constructor(api?:any):void;

    /**
     * listWorkspaces
     * Get the workspaces for the Dashboard application
     * 
     * @param appId string the application id for the Dashboard
     * @param onSuccess function the callback function on success
     * @param onError function the callback function on error
     * @returns Object the resulting workspaces object
     */
    listWorkspaces:(appId:string, onSuccess?:{workspaces:[]}, onError?:Error) => Boolean,

    listThemes:(appId:string, onSuccess?:any, onError?:Error) => Boolean,

    /**
     * saveWorkspace
     * @param appId 
     * @param workspaceToSave 
     * @returns 
     */
    saveWorkspace:(appId:string,workspaceToSave:any, onSuccess?:any, onError?:Error) => Boolean,

    /**
     * listMenuItems
     * Get the menu items for the Dashboard application
     * 
     * @param appId string the application id for the Dashboard
     * @param onSuccess function the callback function on success
     * @param onError function the callback function on error
     * @returns Object the resulting menu items object
     */
    listMenuItems:(appId:string, onSuccess?:{menuItems:[]}, onError?:Error) => Boolean

    /**
     * saveMenuItem
     * @param appId 
     * @param menuItem 
     * @returns 
     */
    saveMenuItem:(appId:string, menuItem:any, onSuccess?:any, onError?:Error) => any
};

export default IDashboardApi;