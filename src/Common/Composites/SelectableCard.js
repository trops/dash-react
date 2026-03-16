import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SelectableCard = ({
    icon = null,
    label,
    description = null,
    selected = false,
    onSelect,
    disabled = false,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.CARD, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "selectable-card");

    const hoverBg = styles.hoverBackgroundColor || "";
    const hoverBorder = styles.hoverBorderColor || "";
    const selectedBg = selected ? hoverBg.replace(/^hover:/, "") : "";
    const selectedBorder = selected ? hoverBorder.replace(/^hover:/, "") : "";

    const hoverStyles =
        !disabled && !selected
            ? `hover:shadow-md ${hoverBg} ${hoverBorder}`
            : !disabled
              ? "hover:shadow-md"
              : "";

    const handleClick = () => {
        if (!disabled && onSelect) {
            onSelect();
        }
    };

    const handleKeyDown = (e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onSelect?.();
        }
    };

    return (
        <div
            id={uuid}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={selected}
            aria-disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`${selected ? selectedBg : styles.backgroundColor} ${selected ? selectedBorder : styles.borderColor} ${styles.textColor} p-4 rounded-lg shadow-sm transition-all duration-200 ${hoverStyles} border cursor-pointer relative flex flex-col items-center text-center gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {selected && (
                <div className="absolute top-2 right-2">
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-xs opacity-80"
                    />
                </div>
            )}
            {icon && <div className="text-2xl mb-1">{icon}</div>}
            <div className="font-medium text-sm">{label}</div>
            {description && (
                <div className="text-xs opacity-70">{description}</div>
            )}
        </div>
    );
};

export { SelectableCard };
