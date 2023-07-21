/**
 * Events
 *
 * Sample events (constants) that are to be used for listeners
 */
import * as secureStorageEvents from "./secureStorageEvents";
import * as algoliaEvents from "./algoliaEvents";
import * as workspaceEvents from "./workspaceEvents";
import * as layoutEvents from "./layoutEvents";
import * as menuItemEvents from "./menuItemEvents";
import * as themeEvents from "./themeEvents";
import * as dataEvents from "./dataEvents";
import * as settingsEvents from "./settingsEvents";

const publicEvents = {
    algoliaEvents,
    dataEvents,
};

export {
    publicEvents,
    secureStorageEvents,
    algoliaEvents,
    workspaceEvents,
    layoutEvents,
    menuItemEvents,
    themeEvents,
    dataEvents,
    settingsEvents,
};
