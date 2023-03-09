import React, { Fragment } from 'react';
import { withRouter } from './WrappedComponent';

const mainApi = window.mainApi;

class Header extends React.Component {

    handleClickHome = () => {
        this.props.navigate('/applications');
    }

    handleClickApplications = () => {
        this.props.navigate('/applications');
    }

    render() {
        const { current } = this.props;
        const selectedAppId = mainApi.getappId();
        const selectedIndexName = mainApi.getIndexName();
        return (
            <div className="flex flex-row p-4 bg-gray-900 w-full justify-between text-gray-100 text-xs space-x-2">
            <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <div onClick={this.handleClickHome} className="cursor-pointer px-2">
                        <svg className="flex-shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="sr-only" onClick={this.handleClickHome}>Home</span>
                    </div>
                </li>
                {selectedAppId !== undefined && (
                    <Fragment>
                    <li>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-3 w-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                        </div>
                    </li>
                    <li>
                        <div onClick={() => this.props.navigate(`/applications/${selectedAppId}`)} className="text-xs font-bold text-gray-200 cursor-pointer">{selectedAppId}</div>
                    </li>
                    </Fragment>
                )}
                {selectedIndexName !== undefined && (
                    <Fragment>
                    <li>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-3 w-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                        </div>
                    </li>
                    <li>
                        <div onClick={() => console.log('nope.')} className="text-xs font-bold text-gray-200 cursor-pointer">{selectedIndexName}</div>
                    </li>
                    </Fragment>
                )}
                <li>
                    <div className="flex items-center">
                    {current !== '' && (
                        <svg className="flex-shrink-0 h-3 w-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                    )}
                    </div>
                </li>
                
                <li>
                    <div className="text-xs font-bold text-gray-200">{current}</div>
                </li>
            </ol>
            </nav>
        </div>
        )
    }
}

export default withRouter(Header);