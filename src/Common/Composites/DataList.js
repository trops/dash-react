import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const DataListItem = ({
    label,
    value = null,
    children = null,
    divider = true,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DATA_LIST_ITEM, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-row items-start justify-between gap-4 ${styles.spacing || "py-2.5"} ${divider ? `border-b ${styles.borderColor || ""}` : ""} last:border-b-0 ${className}`}
        >
            <dt
                className={`flex-shrink-0 text-sm ${styles.textColor || ""} opacity-60`}
            >
                {label}
            </dt>
            <dd className={`text-sm text-right ${styles.textColor || ""}`}>
                {children || value}
            </dd>
        </div>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const DataList = ({ children, className = "" }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DATA_LIST, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <dl className={`flex flex-col ${styles.textColor || ""} ${className}`}>
            {children}
        </dl>
    );
};

DataList.Item = DataListItem;

export { DataList };
