import { AppWrapper, mock } from "@dash";
import { AppContext, ThemeContext } from "../Context";
// import "../tailwind.css";
import { LayoutContainer, Widget, Workspace } from "..";

import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch";

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

    console.log("Mock theme context", mock.theme.context);

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
                            scrollable={false}
                            className={""}
                            space={true}
                            grow={true}
                            height={"h-full"}
                        >
                            <Widget
                                uuid="MockWrapperWidget"
                                space={true}
                                direction="col"
                                grow={true}
                                height="h-full"
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
                            className="bg-gray-900"
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

const MockWorkspace = ({
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
                        <Workspace {...props}>{children}</Workspace>
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};

/**
 * MockAlgolia
 *
 */
const MockAlgolia = ({
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

    const searchClient = algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID,
        process.env.REACT_APP_ALGOLIA_API_KEY
    );

    return (
        <div className="flex flex-col h-screen w-full m-auto overflow-hidden">
            <AppContext.Provider value={getAppContext()}>
                <ThemeContext.Provider value={mock.theme.context}>
                    <div
                        className={`flex flex-col space-y-2 w-full h-7/8 p-2 border rounded-lg overflow-y-auto flex-shrink rounded border-1 border-gray-300 bg-gray-200`}
                    >
                        <Workspace {...props} test="Algolia Workspace">
                            <InstantSearch
                                indexName={
                                    process.env.REACT_APP_ALGOLIA_INDEX_NAME
                                }
                                searchClient={searchClient}
                            >
                                <LayoutContainer
                                    direction="col"
                                    scrollable={false}
                                >
                                    {children}
                                </LayoutContainer>
                            </InstantSearch>
                        </Workspace>
                    </div>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </div>
    );
};

export { MockLayout, MockWrapper, MockWorkspace, MockAlgolia };
