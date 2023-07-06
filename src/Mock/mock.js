import { AppWrapper, mock } from "@dash";
import { AppContext, ThemeContext } from "../Context";
import "../tailwind.css";
import { LayoutContainer, Widget, Workspace } from "..";

export const MockWrapper = ({
    apiMock = null,
    children,
    backgroundColor = "bg-transparent",
    ...props
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
            debugMode: true,
        };
    }

    return (
        <div className="flex flex-col h-screen w-full m-auto overflow-hidden">
            <AppContext.Provider value={getAppContext()}>
                <ThemeContext.Provider value={mock.theme.context}>
                    <div
                        className={`flex flex-col space-y-2 w-full p-2 border rounded-lg overflow-hidden rounded border-1 border-gray-700 bg-gray-300`}
                    >
                        <span className="uppercase text-gray-800 font-bold text-sm">
                            WIDGET - Item is a child of the Widget component
                        </span>
                        <LayoutContainer
                            scrollable={false}
                            height="h-full"
                            width="w-full"
                            // className={"bg-red-500 p-4"}
                        >
                            <Workspace scrollable={false}>
                                <Widget scrollable={false}>{children}</Widget>
                            </Workspace>
                        </LayoutContainer>
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};
