/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Notification({
    show,
    setShow,
    title = "",
    message = "",
    onClick = null,
    loading = false,
}) {
    return (
        <Fragment>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="flex flex-col items-start justify-start px-4 py-2 pointer-events-none sm:p-2 sm:items-start w-full"
            >
                <div className="w-full h-90 flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
                            <div className="w-0 flex-1 p-4">
                                {loading === false && (
                                    <div className="flex items-start justify-center">
                                        <div className="flex flex-col flex-shrink-0 pt-0.5 bg-indigo-700 w-10 h-10 rounded-full text-gray-300 items-center justify-center p-2">
                                            <FontAwesomeIcon
                                                icon="check"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {loading === true && (
                                    <div className="flex items-start justify-center">
                                        <div className="flex flex-col flex-shrink-0 pt-0.5 bg-indigo-700 w-10 h-10 rounded-full text-gray-300 items-center justify-center p-2">
                                            <FontAwesomeIcon
                                                icon="check"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Saving
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Thank you for your patience
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex border-l border-gray-200">
                                <button
                                    type="button"
                                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        // setShow(false)
                                        onClick();
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Fragment>
    );
}
