import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { SubHeading3 } from "../Text/Heading";
import { Paragraph2 } from "../Text/Paragraph";

const EmptyState = ({
    icon = null,
    title = null,
    description = null,
    children = null,
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.EMPTY_STATE, currentTheme, {
        scrollable: false,
        grow: false,
    });

    return (
        <div
            className={`flex flex-col items-center justify-center text-center ${styles.spacing || "p-8"} ${styles.borderRadius || "rounded-lg"} ${className}`}
        >
            {icon && (
                <div className={`${styles.textColor || ""} opacity-40 mb-4`}>
                    {icon}
                </div>
            )}
            {title && (
                <SubHeading3
                    title={title}
                    padding={false}
                    className="justify-center mb-1"
                />
            )}
            {description && (
                <Paragraph2
                    text={description}
                    padding={false}
                    width="max-w-sm"
                    className="opacity-60 mb-4"
                />
            )}
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
};

export { EmptyState };
