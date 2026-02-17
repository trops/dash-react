import { useContext, Fragment } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Dialog, Transition } from "@headlessui/react";
import { ButtonIcon2 } from "../ButtonIcon";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const DrawerHeader = ({ children, className = "" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DRAWER_HEADER, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-row items-center justify-between flex-shrink-0 ${styles.spacing || "px-4 py-3"} border-b ${styles.borderColor || ""} ${styles.textColor || ""} ${className}`}
        >
            {children}
        </div>
    );
};

const DrawerBody = ({ children, className = "" }) => {
    return (
        <div
            className={`flex-1 overflow-y-auto p-4 scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-transparent ${className}`}
        >
            {children}
        </div>
    );
};

const DrawerFooter = ({ children, className = "" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DRAWER_FOOTER, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-row items-center justify-end flex-shrink-0 ${styles.spacing || "px-4 py-3"} border-t ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} gap-2 ${className}`}
        >
            {children}
        </div>
    );
};

const DrawerCloseButton = ({ onClick, className = "" }) => {
    return (
        <ButtonIcon2
            icon="xmark"
            onClick={onClick}
            ariaLabel="Close drawer"
            className={`opacity-60 hover:opacity-100 ${className}`}
        />
    );
};

// ─── Size Map ───────────────────────────────────────────────────────────────────

const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full",
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const Drawer = ({
    isOpen,
    setIsOpen,
    side = "right", // "left" | "right"
    size = "md",
    children,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DRAWER, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const sizeClass = sizeMap[size] || sizeMap.md;
    const isLeft = side === "left";

    const positionClass = isLeft
        ? "inset-y-0 left-0 flex"
        : "inset-y-0 right-0 flex justify-end";

    const enterFrom = isLeft ? "-translate-x-full" : "translate-x-full";
    const leaveTo = isLeft ? "-translate-x-full" : "translate-x-full";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        aria-hidden="true"
                    />
                </Transition.Child>

                <div className={`fixed ${positionClass}`}>
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom={enterFrom}
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo={leaveTo}
                    >
                        <Dialog.Panel
                            className={`w-screen ${sizeClass} ${className}`}
                        >
                            <div
                                className={`flex flex-col h-full ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} ${styles.shadow || "shadow-xl"} ${isLeft ? "border-r" : "border-l"}`}
                            >
                                {children}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.CloseButton = DrawerCloseButton;

export { Drawer };
