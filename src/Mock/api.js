import { themes } from "./theme";

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
};
