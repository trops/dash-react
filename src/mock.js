import { ThemeWrapper, AppWrapper } from "@dash";
import "./tailwind.css";

export const mock = {
    themes: {
        "theme-1": {
            name: "Default 1",
            primary: "gray",
            secondary: "indigo",
            tertiary: "blue",
        },
    },

    api: {
        on: function () {},
        removeAllListeners: function () {},
        events: {},
        themes: {
            listThemesForApplication: function () {
                return this.themes;
            },
        },
        settings: {
            getSettingsForApplication: function () {
                return { theme: "theme-1" };
            },
        },
        loadThemes: function () {
            return this.themes;
        },
    },
};

export const MockWrapper = ({ apiMock = null, theme = null, children }) => {
    console.log("mock wrapper", apiMock, theme);
    return (
        <div className="flex flex-col h-full w-full m-auto justify-center items-center">
            <AppWrapper api={apiMock}>
                <ThemeWrapper theme={theme}>
                    <div className="flex flex-col space-y-2 w-full h-full bg-gray-50 p-6 border border-gray-100 rounded-lg">
                        {children}
                    </div>
                </ThemeWrapper>
            </AppWrapper>
        </div>
    );
};
