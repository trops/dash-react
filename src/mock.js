import { ThemeWrapper, AppWrapper, ThemeModel } from "@dash";
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

export const MockWrapper = ({
    apiMock = null,
    theme = mock.themes["theme-1"],
    children,
    backgroundColor = "bg-transparent",
}) => {
    const themeObject = ThemeModel(theme);
    console.log("mock wrapper", apiMock, themeObject);
    return (
        <div className="flex flex-col h-full w-full m-auto justify-center items-center">
            <AppWrapper api={apiMock}>
                <ThemeWrapper theme={themeObject}>
                    <div
                        className={`flex flex-col space-y-2 w-full h-full p-6 border rounded-lg ${backgroundColor}`}
                    >
                        {children}
                    </div>
                </ThemeWrapper>
            </AppWrapper>
        </div>
    );
};
