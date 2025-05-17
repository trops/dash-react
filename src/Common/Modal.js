import { Dialog } from "@headlessui/react";

const ModalFooter = ({ children }) => {
    return <div className="flex flex-row justify-end p-4">{children}</div>;
};

const Modal = ({
    children,
    isOpen,
    setIsOpen,
    width = "w-5/6",
    height = "5/6",
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-40 overflow-clip rounded"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div
                className="fixed inset-0 bg-black/90"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
            />
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center h-full w-full rounded overflow-clip">
                {/* The actual dialog panel  */}
                <div
                    className={`mx-auto ${width} ${height} flex flex-col shadow overflow-clip rounded`}
                >
                    {children}
                </div>
            </div>
        </Dialog>
    );
};

Modal.Footer = ModalFooter;

export { Modal };
