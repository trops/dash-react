import { AppWrapper, mock } from "@dash";
import { AppContext, ThemeContext } from "../Context";
import "../tailwind.css";

export const MockWrapper = ({
    apiMock = null,
    children,
    backgroundColor = "bg-transparent",
}) => {
    function getAppContext() {
        return {
            ...mock,
            creds: {
                appId: "2345",
            },
            settings: {
                theme: "theme-1",
                debug: false,
            },
        };
    }

    return (
        <div className="flex flex-col h-full w-full m-auto justify-center items-center">
            <AppContext.Provider value={getAppContext()}>
                <ThemeContext.Provider value={mock.theme.context}>
                    <div
                        className={`flex flex-col space-y-2 w-full h-full p-6 border rounded-lg ${backgroundColor}`}
                    >
                        {children}
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};
