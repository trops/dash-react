import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Modal } from "../Modal";
import { Button, Button2 } from "../Button";

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

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="w-full max-w-md"
            height="h-auto"
        >
            <div
                // Raised above the dimmed page (design guide rule 2).
                className={`dr-modal-surface flex flex-col rounded-lg overflow-clip border ${panelStyles.backgroundColor || ""} ${panelStyles.borderColor || ""} ${className}`}
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
                            className={`dr-confirm-message text-sm leading-relaxed ${paragraphStyles.textColor || ""}`}
                        >
                            {message}
                        </p>
                    ) : null}
                </div>

                {/* Footer */}
                <div
                    // The footer shares the dialog's surface (no separate fill).
                    className={`flex flex-row justify-end items-center gap-2 px-4 py-3 border-t ${footerStyles.borderColor || ""}`}
                >
                    {/* One primary per pane: cancel is secondary; confirm is the
                        primary, red when it destroys something. */}
                    <Button2 title={cancelLabel} onClick={handleCancel} />
                    <Button
                        title={confirmLabel}
                        onClick={handleConfirm}
                        danger={variant === "danger"}
                    />
                </div>
            </div>
        </Modal>
    );
};

export { ConfirmationModal };
