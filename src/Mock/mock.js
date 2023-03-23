import { ThemeWrapper, AppWrapper, ThemeModel, mock } from "@dash";
import { ThemeContext } from "../Context";
import "../tailwind.css";

export const MockWrapper = ({
    apiMock = null,
    theme = mock.theme.themes["theme-1"],
    children,
    backgroundColor = "bg-transparent",
}) => {
    const themeObject = ThemeModel(mock.theme.themes["theme-1"]);

    return (
        <div className="flex flex-col h-full w-full m-auto justify-center items-center">
            <AppWrapper api={apiMock}>
                <ThemeContext.Provider value={mock.theme.context}>
                    <div
                        className={`flex flex-col space-y-2 w-full h-full p-6 border rounded-lg ${backgroundColor}`}
                    >
                        {children}
                    </div>
                </ThemeContext.Provider>
            </AppWrapper>
        </div>
    );
};
