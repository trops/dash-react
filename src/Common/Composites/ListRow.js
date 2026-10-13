import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * A clickable list item (design guide: "List rows"): icon, title, then what
 * it is and when — left-aligned, full width. Row actions (`trailing`, usually
 * ButtonIcon3s) sit outside the row's button and show on hover or focus.
 *
 * @param {{ title: React.ReactNode, meta?: React.ReactNode,
 *           icon?: string|React.ReactNode, trailing?: React.ReactNode,
 *           selected?: boolean, mono?: boolean, onClick?: () => void,
 *           ariaLabel?: string }} props
 */
export const ListRow = ({
    title,
    meta = null,
    icon = null,
    trailing = null,
    selected = false,
    mono = false,
    onClick = null,
    ariaLabel = null,
    testId,
    className = "",
}) => {
    const { currentTheme = {} } = useContext(ThemeContext) || {};
    const muted = currentTheme["text-neutral-medium"] || "";
    const strong = currentTheme["text-neutral-light"] || "";
    const selectedBg = currentTheme["bg-neutral-very-dark"] || "";
    const Main = onClick ? "button" : "div";
    return (
        <div
            className={`dr-list-row group flex flex-row items-center gap-1 rounded-md ${selected ? `dr-list-row-selected ${selectedBg}` : ""} ${className}`}
            data-testid={testId}
        >
            <Main
                {...(onClick ? { type: "button", onClick } : {})}
                aria-current={selected ? "true" : undefined}
                aria-label={ariaLabel || undefined}
                className="dr-list-row-main flex-1 min-w-0 flex flex-row items-start gap-2.5 px-2 py-2 text-left"
            >
                {icon ? (
                    <span
                        className={`dr-list-row-icon shrink-0 mt-0.5 ${muted}`}
                        aria-hidden="true"
                    >
                        {typeof icon === "string" ? (
                            <FontAwesomeIcon
                                icon={icon}
                                className="h-3.5 w-3.5"
                            />
                        ) : (
                            icon
                        )}
                    </span>
                ) : null}
                <span className="flex flex-col min-w-0">
                    <span
                        className={`dr-list-row-title text-sm font-medium truncate ${mono ? "font-mono" : ""} ${strong}`}
                        // A truncated title stays reachable (guide checklist).
                        title={typeof title === "string" ? title : undefined}
                    >
                        {title}
                    </span>
                    {meta ? (
                        <span className={`dr-list-row-meta text-xs ${muted}`}>
                            {meta}
                        </span>
                    ) : null}
                </span>
            </Main>
            {trailing ? (
                <div className="dr-list-row-trail flex flex-row items-center gap-1 pr-1">
                    {trailing}
                </div>
            ) : null}
        </div>
    );
};

export default ListRow;
