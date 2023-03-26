import { themes } from "./theme";
import { defaultLayouts } from "./layout";

export const mockApi = {
    on: function () {},
    removeAllListeners: function () {},
    events: {},
    themes: {
        listThemesForApplication: function () {
            return themes;
        },
    },
    settings: {
        getSettingsForApplication: function () {
            return { theme: "theme-1" };
        },
    },
    loadThemes: function () {
        return themes;
    },
    layout: {
        listLayoutsForApplication: function () {
            return defaultLayouts;
        },
    },
};
