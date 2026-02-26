import { useContext, Children } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Modal } from "../Modal";

const SettingsModalSidebar = ({ children, className = "", width = "w-56" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.SETTINGS_MODAL_SIDEBAR,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    return (
        <div
            className={`flex flex-col flex-shrink-0 ${width} border-r ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} p-2 space-y-1 overflow-y-auto ${className}`}
        >
            {children}
        </div>
    );
};

const SettingsModalHeader = ({
    children,
    className = "",
    border = true,
    padding = "p-4",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER, currentTheme, {
        grow: false,
    });

    return (
        <div
            className={`flex flex-row justify-between items-center flex-shrink-0 ${padding} ${border ? "border-b" : ""} ${styles.borderColor || ""} ${styles.textColor || ""} ${className}`}
        >
            {children}
        </div>
    );
};

const SettingsModalBody = ({
    children,
    className = "",
    padding = "p-4",
    scrollable = true,
}) => {
    const scrollClasses = scrollable
        ? "overflow-y-auto scrollbar scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-transparent"
        : "";

    return (
        <div className={`flex-1 ${padding} ${scrollClasses} ${className}`}>
            {children}
        </div>
    );
};

const SettingsModalFooter = ({
    children,
    leftContent = null,
    className = "",
    padding = "px-4 py-3",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.SETTINGS_MODAL_FOOTER,
        currentTheme,
        {
            scrollable: false,
            grow: false,
        }
    );

    return (
        <div
            className={`flex flex-row items-center flex-shrink-0 border-t ${padding} ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${styles.textColor || ""} rounded-b-lg ${leftContent ? "justify-between" : "justify-end"} ${className}`}
        >
            {leftContent && (
                <div className="flex items-center text-sm opacity-70">
                    {leftContent}
                </div>
            )}
            <div className="flex flex-row items-center space-x-2">
                {children}
            </div>
        </div>
    );
};

const SettingsModal = ({
    isOpen,
    setIsOpen,
    width = "w-11/12 xl:w-5/6",
    height = "h-5/6",
    children,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const panelStyles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        scrollable: false,
        grow: false,
    });

    // Separate sidebar from other children
    let sidebar = null;
    const otherChildren = [];

    Children.forEach(children, (child) => {
        if (child && child.type === SettingsModalSidebar) {
            sidebar = child;
        } else {
            otherChildren.push(child);
        }
    });

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width={width}
            height={height}
        >
            <div
                className={`flex flex-row h-full w-full rounded-lg overflow-clip ${panelStyles.backgroundColor || ""} ${panelStyles.borderColor || ""} ${panelStyles.textColor || ""} border ${className}`}
            >
                {sidebar}
                <div className="flex flex-col flex-1 min-w-0">
                    {otherChildren}
                </div>
            </div>
        </Modal>
    );
};

SettingsModal.Sidebar = SettingsModalSidebar;
SettingsModal.Header = SettingsModalHeader;
SettingsModal.Body = SettingsModalBody;
SettingsModal.Footer = SettingsModalFooter;

export { SettingsModal };
