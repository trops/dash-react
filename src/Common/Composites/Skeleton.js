import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const SkeletonText = ({ lines = 3, className = "" }) => {
    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === lines - 1 ? "w-3/4" : "w-full"}
                    height="h-3"
                />
            ))}
        </div>
    );
};

const SkeletonCard = ({ className = "" }) => {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <Skeleton width="w-full" height="h-32" />
            <Skeleton width="w-3/4" height="h-4" />
            <Skeleton width="w-1/2" height="h-3" />
        </div>
    );
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const Skeleton = ({
    width = "w-full",
    height = "h-4",
    rounded = null,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SKELETON, currentTheme, {
        scrollable: false,
        grow: false,
    });

    const borderRadius = rounded || styles.borderRadius || "rounded-md";

    return (
        <div
            className={`animate-pulse ${styles.backgroundColor || ""} opacity-30 ${width} ${height} ${borderRadius} ${className}`}
        />
    );
};

Skeleton.Text = SkeletonText;
Skeleton.Card = SkeletonCard;

export { Skeleton };
