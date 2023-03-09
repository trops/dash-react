import React from "react"

class SubHeader extends React.Component {
    render() {
        const { title, buttonTitle, onClick, buttonColor, buttonTextColor } = this.props;
        return (
            <div className="flex flex-row items-center justify-between p-2 px-4 text-gray-200 text-sm font-bold bg-gray-800 border-b border-gray-900">
                <span className="">{title}</span>
                { buttonTitle !== '' && (<button onClick={onClick} className={`${buttonColor} ${buttonTextColor} rounded px-2 py-1 text-xs font-bold`}>{buttonTitle}</button>)}
            </div>
        )
    };
}

SubHeader.defaultProps = {
    onClick(){},
    onClickCreate(){},
    title: '',
    buttonTitle: '',
    buttonColor: 'bg-gray-700',
    buttonTextColor: 'text-gray-200'
}

export default SubHeader;