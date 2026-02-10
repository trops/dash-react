import { useContext, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Table = ({
    columns = [],
    data = [],
    sortable = true,
    hoverable = true,
    striped = false,
    bordered = true,
    compact = false,
    onRowClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABLE, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });

    const uuid = getUUID("", "table");

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        const sorted = [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [data, sortConfig]);

    const paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
    const hoverClass = hoverable ? "hover:opacity-80" : "";
    const borderClass = bordered ? "border" : "";

    return (
        <div id={uuid} className={`overflow-x-auto ${className}`}>
            <table className={`w-full ${borderClass} ${styles.borderColor}`}>
                <thead
                    className={`${styles.backgroundColor} ${styles.borderColor}`}
                >
                    <tr className="border-b">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`${paddingClass} text-left ${styles.textColor} ${
                                    sortable && column.sortable !== false
                                        ? "cursor-pointer select-none"
                                        : ""
                                }`}
                                onClick={() =>
                                    column.sortable !== false &&
                                    handleSort(column.key)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <span>{column.label}</span>
                                    {sortable && column.sortable !== false && (
                                        <span className="text-xs opacity-50">
                                            {sortConfig.key === column.key ? (
                                                sortConfig.direction ===
                                                "asc" ? (
                                                    <FontAwesomeIcon icon="arrow-up" />
                                                ) : (
                                                    <FontAwesomeIcon icon="arrow-down" />
                                                )
                                            ) : (
                                                <FontAwesomeIcon icon="arrows-up-down" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b ${styles.borderColor} ${hoverClass} ${
                                striped && rowIndex % 2 === 1
                                    ? "opacity-90"
                                    : ""
                            } ${onRowClick ? "cursor-pointer" : ""}`}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`${paddingClass} ${styles.textColor}`}
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sortedData.length === 0 && (
                <div
                    className={`text-center ${paddingClass} ${styles.textColor} opacity-50`}
                >
                    No data available
                </div>
            )}
        </div>
    );
};

const Table2 = ({
    columns = [],
    data = [],
    sortable = true,
    hoverable = true,
    striped = false,
    bordered = true,
    compact = false,
    onRowClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABLE_2, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });

    const uuid = getUUID("", "table-2");

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        const sorted = [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [data, sortConfig]);

    const paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
    const hoverClass = hoverable ? "hover:opacity-80" : "";
    const borderClass = bordered ? "border" : "";

    return (
        <div id={uuid} className={`overflow-x-auto ${className}`}>
            <table className={`w-full ${borderClass} ${styles.borderColor}`}>
                <thead
                    className={`${styles.backgroundColor} ${styles.borderColor}`}
                >
                    <tr className="border-b">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`${paddingClass} text-left ${styles.textColor} ${
                                    sortable && column.sortable !== false
                                        ? "cursor-pointer select-none"
                                        : ""
                                }`}
                                onClick={() =>
                                    column.sortable !== false &&
                                    handleSort(column.key)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <span>{column.label}</span>
                                    {sortable && column.sortable !== false && (
                                        <span className="text-xs opacity-50">
                                            {sortConfig.key === column.key ? (
                                                sortConfig.direction ===
                                                "asc" ? (
                                                    <FontAwesomeIcon icon="arrow-up" />
                                                ) : (
                                                    <FontAwesomeIcon icon="arrow-down" />
                                                )
                                            ) : (
                                                <FontAwesomeIcon icon="arrows-up-down" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b ${styles.borderColor} ${hoverClass} ${
                                striped && rowIndex % 2 === 1
                                    ? "opacity-90"
                                    : ""
                            } ${onRowClick ? "cursor-pointer" : ""}`}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`${paddingClass} ${styles.textColor}`}
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sortedData.length === 0 && (
                <div
                    className={`text-center ${paddingClass} ${styles.textColor} opacity-50`}
                >
                    No data available
                </div>
            )}
        </div>
    );
};

const Table3 = ({
    columns = [],
    data = [],
    sortable = true,
    hoverable = true,
    striped = false,
    bordered = true,
    compact = false,
    onRowClick = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TABLE_3, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });

    const uuid = getUUID("", "table-3");

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        const sorted = [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [data, sortConfig]);

    const paddingClass = compact ? "px-2 py-1" : "px-4 py-2";
    const hoverClass = hoverable ? "hover:opacity-80" : "";
    const borderClass = bordered ? "border" : "";

    return (
        <div id={uuid} className={`overflow-x-auto ${className}`}>
            <table className={`w-full ${borderClass} ${styles.borderColor}`}>
                <thead
                    className={`${styles.backgroundColor} ${styles.borderColor}`}
                >
                    <tr className="border-b">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`${paddingClass} text-left ${styles.textColor} ${
                                    sortable && column.sortable !== false
                                        ? "cursor-pointer select-none"
                                        : ""
                                }`}
                                onClick={() =>
                                    column.sortable !== false &&
                                    handleSort(column.key)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <span>{column.label}</span>
                                    {sortable && column.sortable !== false && (
                                        <span className="text-xs opacity-50">
                                            {sortConfig.key === column.key ? (
                                                sortConfig.direction ===
                                                "asc" ? (
                                                    <FontAwesomeIcon icon="arrow-up" />
                                                ) : (
                                                    <FontAwesomeIcon icon="arrow-down" />
                                                )
                                            ) : (
                                                <FontAwesomeIcon icon="arrows-up-down" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b ${styles.borderColor} ${hoverClass} ${
                                striped && rowIndex % 2 === 1
                                    ? "opacity-90"
                                    : ""
                            } ${onRowClick ? "cursor-pointer" : ""}`}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`${paddingClass} ${styles.textColor}`}
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sortedData.length === 0 && (
                <div
                    className={`text-center ${paddingClass} ${styles.textColor} opacity-50`}
                >
                    No data available
                </div>
            )}
        </div>
    );
};

export { Table, Table2, Table3 };
