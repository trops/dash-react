import React from "react";

class MainContent extends React.Component {
    render() {
        const { title, horizontal, padding } = this.props;
        return (
            <div className="flex flex-1 flex-col bg-gray-700 h-full w-full overflow-hidden">
                <div className={`flex ${horizontal === true ? 'flex-row space-x-4' : 'flex-col space-y-4'} w-full h-full bg-gray-900 rounded-sm overflow-y-auto ${ padding === true ? 'p-4' : 'p-0'}`}>
                    {title && (<div className="flex w-full p-2 text-gray-200">{title}</div>)}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

MainContent.defaultProps = {
    title: null,
    horizontal: false,
    padding: true
}

export default MainContent;