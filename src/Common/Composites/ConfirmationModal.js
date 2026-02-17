import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Modal } from "../Modal";

const ConfirmationModal = ({
    isOpen,
    setIsOpen,
    title = "Confirm",
    message = null,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm = null,
    onCancel = null,
    variant = "default", // "default" | "danger"
    children = null,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const panelStyles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        scrollable: false,
        grow: false,
    });
    const headerStyles = getStylesForItem(
        themeObjects.PANEL_HEADER,
        currentTheme,
        { grow: false }
    );
    const footerStyles = getStylesForItem(
        themeObjects.SETTINGS_MODAL_FOOTER,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const buttonPrimaryStyles = getStylesForItem(
        themeObjects.BUTTON_2,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const buttonSecondaryStyles = getStylesForItem(
        themeObjects.BUTTON_3,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const paragraphStyles = getStylesForItem(
        themeObjects.PARAGRAPH_2,
        currentTheme,
        { scrollable: false, grow: false }
    );

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setIsOpen(false);
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    const confirmButtonClasses =
        variant === "danger"
            ? "bg-red-600 hover:bg-red-700 text-white border-red-700"
            : `${buttonPrimaryStyles.backgroundColor || ""} ${buttonPrimaryStyles.hoverBackgroundColor || ""} ${buttonPrimaryStyles.textColor || ""} ${buttonPrimaryStyles.borderColor || ""}`;

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="w-full max-w-md"
            height="h-auto"
        >
            <div
                className={`flex flex-col rounded-lg overflow-clip border ${panelStyles.backgroundColor || ""} ${panelStyles.borderColor || ""} ${className}`}
            >
                {/* Header */}
                <div
                    className={`flex flex-row items-center p-4 border-b ${headerStyles.borderColor || ""} ${headerStyles.textColor || ""}`}
                >
                    <span className="text-lg font-semibold">{title}</span>
                </div>

                {/* Body */}
                <div className="p-4">
                    {children ? (
                        children
                    ) : message ? (
                        <p
                            className={`text-sm leading-relaxed ${paragraphStyles.textColor || ""}`}
                        >
                            {message}
                        </p>
                    ) : null}
                </div>

                {/* Footer */}
                <div
                    className={`flex flex-row justify-end items-center space-x-2 px-4 py-3 border-t rounded-b-lg ${footerStyles.backgroundColor || ""} ${footerStyles.borderColor || ""}`}
                >
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={`flex flex-row justify-center items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${buttonSecondaryStyles.backgroundColor || ""} ${buttonSecondaryStyles.hoverBackgroundColor || ""} ${buttonSecondaryStyles.textColor || ""} ${buttonSecondaryStyles.borderColor || ""}`}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={`flex flex-row justify-center items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${confirmButtonClasses}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export { ConfirmationModal };
