/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SlidePanelOverlay({
    open,
    setOpen,
    title = null,
    children,
}) {
    //   const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-clip"
                onClose={setOpen}
            >
                <div className="absolute inset-0 overflow-clip">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pr-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-2xl xl:max-w-3xl overflow-clip">
                                <div className="flex h-full flex-col shadow-xl bg-gray-900 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-900 overflow-clip">
                                    {title !== null && (
                                        <div className="px-4 sm:px-6 py-6">
                                            <div className="flex items-start justify-between px-2">
                                                <Dialog.Title className="text-xl font-bold text-gray-200">
                                                    {" "}
                                                    {title}{" "}
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-200 focus:outline-none text-xl"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <FontAwesomeIcon icon="xmark" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-clip h-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
