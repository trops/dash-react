import { useContext, useMemo } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const BreadcrumbsBase = ({
    items = [],
    separator = "/",
    maxItems = null,
    className = "",
    onItemClick = null,
    themeKey,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeKey, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });

    const uuid = getUUID("", "breadcrumbs");

    const displayItems = useMemo(() => {
        if (!maxItems || items.length <= maxItems) return items;
        if (maxItems < 2) return items.slice(-1);
        const head = items[0];
        const tail = items.slice(-(maxItems - 1));
        return [head, { label: "...", isEllipsis: true }, ...tail];
    }, [items, maxItems]);

    const handleClick = (item, event) => {
        if (item.onClick) {
            event.preventDefault();
            item.onClick(item, event);
            return;
        }
        if (onItemClick) {
            event.preventDefault();
            onItemClick(item, event);
        }
    };

    return (
        <nav id={uuid} className={className} aria-label="Breadcrumb">
            <ol className={`flex items-center space-x-2 ${styles.textColor} ${styles.textSize || ""}`}>
                {displayItems.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className="flex items-center"
                    >
                        {index > 0 && (
                            <span className="mx-2 opacity-60">{separator}</span>
                        )}
                        {item.isEllipsis ? (
                            <span className="opacity-60">{item.label}</span>
                        ) : item.href ? (
                            <a
                                href={item.href}
                                onClick={(event) => handleClick(item, event)}
                                className="hover:underline transition-colors duration-150"
                            >
                                {item.label}
                            </a>
                        ) : item.onClick || onItemClick ? (
                            <button
                                type="button"
                                onClick={(event) => handleClick(item, event)}
                                className="hover:underline transition-colors duration-150"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

const Breadcrumbs = (props) => (
    <BreadcrumbsBase themeKey={themeObjects.BREADCRUMBS} {...props} />
);

const Breadcrumbs2 = (props) => (
    <BreadcrumbsBase themeKey={themeObjects.BREADCRUMBS_2} {...props} />
);

const Breadcrumbs3 = (props) => (
    <BreadcrumbsBase themeKey={themeObjects.BREADCRUMBS_3} {...props} />
);

export { Breadcrumbs, Breadcrumbs2, Breadcrumbs3 };
