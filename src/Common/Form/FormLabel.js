import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "@dash/Utils";
import { useContext } from "react";

export const FormLabel = ({
    title,
    textSize = null,
    fontWeight = "font-medium",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.FORM_LABEL, currentTheme, {
        ...props,
    });
    const textSizeCalc = textSize !== null ? textSize : "text-base 2xl:text-lg";
    return (
        <label className={`${fontWeight} ${textSizeCalc} ${styles.string}`}>
            {title}
        </label>
    );
};
