import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";

const Slider = ({
    label = "",
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange = () => {},
    id = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.SLIDER, currentTheme, {
        ...props,
        scrollable: false,
        grow: false,
    });
    const labelStyles = getStylesForItem(
        themeObjects.FORM_LABEL,
        currentTheme,
        {
            ...props,
            scrollable: false,
            grow: false,
        }
    );

    const sliderId = id || getUUID("", "slider");

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && (
                <label
                    htmlFor={sliderId}
                    className={`text-sm ${labelStyles.textColor}`}
                >
                    {label}
                </label>
            )}
            <input
                id={sliderId}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) =>
                    onChange(Number(event.target.value), event)
                }
                className={`w-full ${styles.textColor}`}
            />
        </div>
    );
};

export { Slider };
