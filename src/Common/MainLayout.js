import React from "react";
import { SideMenu } from "@dash/Menu";
import { MainContent, ErrorMessage } from ".";
import { withRouter } from "./WrappedComponent";
import { ButtonIcon } from ".";
import { SelectMenu } from "./Form";

const mainApi = window.mainApi;

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUrl: "https://www.swingbot.com",
        };
    }

    handleCreatePuppeteerWindow = () => {
        const { page } = this.props;

        if (page.pageUrl !== "") {
            const application = mainApi.getApplication();
            const indexName = mainApi.getIndexName();
            console.log(application, page);
            mainApi.removeAllListeners();
            mainApi.browser.createPuppeteerWindow(
                page.pageUrl,
                application,
                page,
                indexName
            );
        }
    };

    // handleCreateBrowserWindow = () => {
    //     mainApi.removeAllListeners();
    //     mainApi.browser.createBrowserWindow();
    // }

    handleClickUnitTest = () => {
        console.log("unit testing");
        this.props.onClickUnitTest();
    };

    handleOpenRepo = () => {
        const url = "https://github.com/algolia/hackathon-team-ram";
        mainApi.browser.openExternalWindow(url);
    };

    handleChangePage = (e) => {
        const { pageData } = this.props;
        console.log("change ", e.target.value);

        // change the page
        this.props.onPageChange(e.target.value);
    };

    renderPageDropDown = (page, pages) => {
        return (
            <SelectMenu
                name={"page-navigation-dd"}
                onChange={this.handleChangePage}
                selectedValue={page.id}
                textSize="text-xs 2xl:text-sm"
                bgColor="bg-gray-900"
                textColor="text-gray-400"
            >
                <option value="">Select Page</option>
                {pages.sort().map((page) => (
                    <option
                        key={`page-${page.id}`}
                        className="text-gray-600 text-sm"
                        value={page.id}
                    >
                        {page.displayName}
                    </option>
                ))}
            </SelectMenu>
        );
    };

    render() {
        const {
            pageData,
            templateData,
            queryData,
            padding,
            showMenu,
            errorMessage,
            page,
            indexName,
        } = this.props;

        return (
            <div className="flex flex-row w-full h-full overflow-clip p-0 2xl:space-x-4">
                {showMenu === true && (
                    <div className="flex flex-col flex-shrink 2xl:w-1/3 p-2 2xl:p-4 max-w-sm">
                        <SideMenu
                            pages={pageData}
                            templates={templateData}
                            queries={queryData}
                            showMenu={showMenu}
                        />
                    </div>
                )}
                <div
                    className={`flex flex-col ${
                        showMenu === true
                            ? "w-full 2xl:w-full 2xl:flex-1 h-full"
                            : "w-full"
                    } h-full bg-gray-800`}
                >
                    {showMenu === false && (
                        <div className="flex flex-row space-x-4 p-2 text-xs justify-between border-b border-gray-700">
                            <div className="flex flex-row space-x-4">
                                <ButtonIcon
                                    text="Home"
                                    icon="home"
                                    onClick={() =>
                                        this.props.navigate(
                                            "/rules-manager/pages"
                                        )
                                    }
                                    textSize="text-sm"
                                />
                                {this.renderPageDropDown(page, pageData)}
                            </div>
                            <div className="flex flex-row space-x-2">
                                {/* {page !== null  && 'pageUrl' in page && (
                                    <div className="flex flex-row p-2 2xl:p-2 bg-gray-800 text-gray-300 space-x-2 cursor-pointer rounded bg-indigo-800" onClick={this.handleCreatePuppeteerWindow}>
                                        Preview {page.pageUrl} (experimental)
                                    </div>
                                )}
                                <div className="flex flex-row p-2 2xl:p-2 bg-gray-800 text-gray-300 space-x-2 cursor-pointer rounded bg-indigo-800" onClick={this.handleClickUnitTest}>
                                    Compare (experimental)
                                </div> */}
                                {page !== null && "pageUrl" in page && (
                                    <ButtonIcon
                                        text="Preview"
                                        icon="eye"
                                        onClick={
                                            this.handleCreatePuppeteerWindow
                                        }
                                        textSize="text-sm"
                                    />
                                )}
                                <ButtonIcon
                                    text="Compare"
                                    icon="table-columns"
                                    onClick={this.handleClickUnitTest}
                                    textSize="text-sm"
                                />
                                <ButtonIcon
                                    text="View Code"
                                    icon="code"
                                    onClick={this.handleOpenRepo}
                                    textSize="text-sm"
                                />
                                {/* <div className="flex flex-col w-full p-2 2xl:p-2 bg-gray-800 text-gray-300 cursor-pointer" onClick={this.handleCreateBrowserWindow}>
                                    Browser
                                </div> */}
                            </div>
                        </div>
                    )}
                    <MainContent horizontal={false} padding={padding}>
                        {errorMessage !== null && (
                            <ErrorMessage title={errorMessage} />
                        )}
                        {this.props.children}
                    </MainContent>
                </div>
            </div>
        );
    }
}

MainLayout.defaultProps = {
    page: null,
    pages: [],
    pageUrl: null,
    pageData: null,
    templateData: null,
    queryData: null,
    padding: false,
    showMenu: true,
    errorMessage: null,
    onClickUnitTest() {},
    onPageChange() {},
};

export default withRouter(MainLayout);
