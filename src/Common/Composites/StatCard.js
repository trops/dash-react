import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { SubHeading } from "../Text/Heading";
import { Paragraph3 } from "../Text/Paragraph";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const StatCardLabel = ({ children, className = "" }) => {
    return (
        <Paragraph3
            text={children}
            padding={false}
            fontWeight="font-semibold"
            width=""
            className={`uppercase tracking-wider opacity-60 ${className}`}
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
    const trendColor =
        trend === "up"
            ? "text-emerald-500"
            : trend === "down"
              ? "text-red-500"
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
                                className={`text-xs ${styles.textColor || ""} opacity-50`}
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
