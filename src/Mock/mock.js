import { AppWrapper, mock } from "@dash";
import { AppContext, ThemeContext } from "../Context";
import "../tailwind.css";
import { LayoutContainer, Widget, Workspace } from "..";

const MockWrapper = ({
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
                        className={`flex flex-col space-y-2 w-full h-7/8 p-2 border rounded-lg overflow-y-auto flex-shrink rounded border-1 border-gray-300 bg-gray-200`}
                    >
                        <span className="uppercase text-gray-800 font-bold text-sm">
                            Workspace - WIDGET - Item is a child of the Widget
                            component`
                        </span>
                        <Workspace
                            id="MockWrapperWorkspace"
                            direction="col"
                            scrollable={true}
                            className={""}
                            // space={true}
                            grow={true}
                        >
                            <Widget
                                uuid="MockWrapperWidget"
                                space={true}
                                direction="col"
                                grow={true}
                            >
                                {children}
                            </Widget>
                        </Workspace>
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};

/**
 * MockLayout
 *
 * For testing the LayoutContainer as a base component
 */
const MockLayout = ({
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
                        className={`flex flex-col space-y-4 w-full h-7/8 p-6 border rounded-lg border-1 border-gray-700 bg-gray-300 overflow-y-auto flex-grow`}
                    >
                        <span className="uppercase text-gray-800 font-bold text-sm">
                            Layout - Item is a child of the LayoutContainer
                            component
                        </span>
                        <LayoutContainer
                            id="MockLayoutContainer"
                            scrollable={false}
                            height="h-full"
                            width="w-full"
                            direction={
                                props.direction ? props.direction : "row"
                            }
                            className="bg-gray-900 rounded-lg"
                            grow={true}
                            space={true}
                        >
                            {children}
                        </LayoutContainer>
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};

export { MockLayout, MockWrapper };
