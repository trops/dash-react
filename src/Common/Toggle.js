import { useContext } from "react";
import { Switch } from "@headlessui/react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";

function Toggle({
    theme = true,
    text = "",
    enabled = false,
    setEnabled,
    backgroundColor = null,
    textColor = null,
    hoverBackgroundColor = null,
    ...props
}) {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.TOGGLE, currentTheme, {
        backgroundColor,
        textColor,
        hoverBackgroundColor,
    });

    return "toggle";
    // return theme === true ? (
    //   <div className="flex flex-row items-center">
    //     <Switch
    //       checked={enabled}
    //       onChange={setEnabled}
    //       className={`${enabled === true ? `${styles['backgroundColor']} ${styles['hoverBackgroundColor']}`: `${styles['hoverBackgroundColor']} ${styles['backgroundColor']}` }
    //         relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    //     >
    //       <span
    //         aria-hidden="true"
    //         className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
    //           pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-gray-200 shadow-lg ring-0 transition duration-200 ease-in-out`}
    //       />
    //     </Switch>
    //     <span className={`sr-only ${styles['textColor']}`}>{text}TESTING</span>
    //   </div>
    // ): (
    //   <div className="flex flex-row items-center">
    //     <Switch
    //       checked={enabled}
    //       onChange={setEnabled}
    //       className={`${enabled ? backgroundColor : hoverBackgroundColor }
    //         relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    //     >
    //       <span className={`sr-only ${textColor}`}>{text}</span>
    //       <span
    //         aria-hidden="true"
    //         className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
    //           pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
    //       />
    //     </Switch>
    //   </div>
    // )
}

export { Toggle };
