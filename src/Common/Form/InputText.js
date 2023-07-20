import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { useContext } from "react";

export const InputText = ({
    onChange,
    onKeyDown,
    onClick = null,
    name,
    value,
    type = "text",
    padding = "p-2",
    placeholder = "",
    hasBorder = true,
    disabled = false,
    textSize = "text-sm lg:text-base 2xl:text-lg",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.INPUT_TEXT, currentTheme, {
        ...props,
    });
    return (
        <input
            type={type}
            name={name}
            value={value !== null ? value : ""}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onClick={onClick}
            placeholder={placeholder}
            className={`${padding} rounded focus:outline-0 outline-0 border-0 focus:border-0 ${
                styles.string
            } font-bold ${textSize} w-full ${
                hasBorder === false && "border-0"
            }`}
            disabled={disabled}
        />
    );
};
