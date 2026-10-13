import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonIcon3 } from "../ButtonIcon";

/**
 * The header for dock panels, drawers and side panes (design guide: "Panel
 * header"): an optional back arrow, a glyph, the title (truncates), then quiet
 * icon actions. A nested view's title is the thing you opened, not the
 * panel's name.
 *
 * @param {{ title: React.ReactNode, glyph?: string, onBack?: () => void,
 *           backLabel?: string, actions?: React.ReactNode }} props
 */
export const PanelHeader = ({
    title,
    glyph = null,
    onBack = null,
    backLabel = "Back",
    actions = null,
    testId,
    className = "",
}) => {
    // The default context carries currentTheme: null — fall back to {}.
    const currentTheme = (useContext(ThemeContext) || {}).currentTheme || {};
    const hairline = currentTheme["border-neutral-dark"] || "";
    const strong = currentTheme["text-neutral-light"] || "";
    const muted = currentTheme["text-neutral-medium"] || "";
    return (
        <div
            className={`dr-panel-head shrink-0 flex flex-row items-center gap-2 pl-4 pr-3 py-2.5 border-b ${hairline} ${className}`}
            data-testid={testId}
        >
            {onBack ? (
                <ButtonIcon3
                    icon="arrow-left"
                    ariaLabel={backLabel}
                    onClick={onBack}
                />
            ) : null}
            {!onBack && glyph ? (
                <span
                    className={`dr-panel-head-glyph ${muted}`}
                    aria-hidden="true"
                >
                    <FontAwesomeIcon icon={glyph} className="h-3.5 w-3.5" />
                </span>
            ) : null}
            <span
                className={`dr-panel-head-title flex-1 min-w-0 truncate text-sm font-semibold ${strong}`}
            >
                {title}
            </span>
            {actions ? (
                <div className="flex flex-row items-center gap-1">
                    {actions}
                </div>
            ) : null}
        </div>
    );
};

export default PanelHeader;
