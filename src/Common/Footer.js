import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <div className="flex flex-row p-4 bg-gray-200 dark:bg-gray-900 w-full justify-center mt-auto text-xs text-center items-center">
                <span className="text-gray-300 dark:text-gray-600">Team RAM @2022</span>
            </div>
        )
    }
}

export default Footer;