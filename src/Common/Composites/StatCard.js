import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { getStatusColors } from "@dash/Utils/statusColors";
import { useDashTokens, getDashTokens } from "@dash/Hooks/useDashTokens";
import { SubHeading } from "../Text/Heading";
import { Paragraph3 } from "../Text/Paragraph";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const StatCardLabel = ({ children, className = "" }) => {
    const tokens = useDashTokens();
    return (
        <Paragraph3
            text={children}
            padding={false}
            fontWeight="font-semibold"
            width=""
            className={`uppercase tracking-wider ${tokens.muted} ${className}`}
        />
    );
};

const StatCardValue = ({ children, className = "" }) => {
    return (
        <SubHeading title={children} padding={false} className={className} />
    );
};

const StatCardChange = ({
    children,
    trend = "neutral", // "up" | "down" | "neutral"
    className = "",
}) => {
    const { themeVariant } = useContext(ThemeContext);
    const status = getStatusColors(themeVariant);
    const trendColor =
        trend === "up"
            ? status.success.text
            : trend === "down"
              ? status.error.text
              : "";

    const trendIcon =
        trend === "up" ? "\u2191 " : trend === "down" ? "\u2193 " : "";

    return (
        <span className={`text-sm font-medium ${trendColor} ${className}`}>
            {trendIcon}
            {children}
        </span>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const StatCard = ({
    label = null,
    value = null,
    change = null,
    trend = "neutral",
    helpText = null,
    badge = null,
    children = null,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.STAT_CARD, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-col ${styles.spacing || "p-4"} ${styles.borderRadius || "rounded-lg"} border ${styles.backgroundColor || ""} ${styles.borderColor || ""} ${className}`}
        >
            {children ? (
                children
            ) : (
                <>
                    <div className="flex flex-row justify-between items-start mb-2">
                        {label && <StatCardLabel>{label}</StatCardLabel>}
                        {badge && (
                            <span className="flex-shrink-0">{badge}</span>
                        )}
                    </div>
                    {value !== null && <StatCardValue>{value}</StatCardValue>}
                    <div className="flex flex-row items-center gap-2 mt-1">
                        {change !== null && (
                            <StatCardChange trend={trend}>
                                {change}
                            </StatCardChange>
                        )}
                        {helpText && (
                            <span
                                className={`text-xs ${getDashTokens(currentTheme).muted}`}
                            >
                                {helpText}
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

StatCard.Label = StatCardLabel;
StatCard.Value = StatCardValue;
StatCard.Change = StatCardChange;

export { StatCard };
