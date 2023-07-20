/**
 * Events
 *
 * Sample events (constants) that are to be used for listeners
 */
const secureStorageEvents = require("./secureStorageEvents");
const algoliaEvents = require("./algoliaEvents");
const workspaceEvents = require("./workspaceEvents");
const layoutEvents = require("./layoutEvents");
const menuItemEvents = require("./menuItemEvents");
const themeEvents = require("./themeEvents");
const dataEvents = require("./dataEvents");
const settingsEvents = require("./settingsEvents");

const public = {
    ...algoliaEvents,
    ...dataEvents,
};

module.exports = {
    public,
    ...secureStorageEvents,
    ...algoliaEvents,
    ...workspaceEvents,
    ...layoutEvents,
    ...menuItemEvents,
    ...themeEvents,
    ...dataEvents,
    ...settingsEvents,
};
