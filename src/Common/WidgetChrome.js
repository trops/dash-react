import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { ButtonIcon } from "./ButtonIcon";

const WidgetChrome = ({
    title = "",
    children,
    footer = null,
    actions = null,
    onRemove = null,
    onSettings = null,
    onRefresh = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.WIDGET_CHROME, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "widget-chrome");

    return (
        <div
            id={uuid}
            className={`border ${styles.backgroundColor} ${styles.borderColor} ${styles.textColor} rounded-lg ${className}`}
        >
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <div className="font-semibold truncate">{title}</div>
                <div className="flex items-center space-x-2">
                    {actions}
                    {onRefresh && (
                        <ButtonIcon icon="arrows-up-down" onClick={onRefresh} />
                    )}
                    {onSettings && (
                        <ButtonIcon icon="cog" onClick={onSettings} />
                    )}
                    {onRemove && <ButtonIcon icon="xmark" onClick={onRemove} />}
                </div>
            </div>
            <div className="p-4">{children}</div>
            {footer && <div className="border-t px-4 py-2">{footer}</div>}
        </div>
    );
};

export { WidgetChrome };
