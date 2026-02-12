import React, { useContext } from "react";
import { ThemeContext, WidgetContext } from "@dash/Context";
import { getStylesForItem, getUUID } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { LayoutContainer } from "@dash/Layout";
/**
 * Panel
 */

const PanelHeader = ({
    children,
    border = false,
    className = "",
    padding = true,
    defaultPadding = "p-6",
    direction = "horizontal",
    ...props
}) => {
    const { widgetData } = useContext(WidgetContext);
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER, currentTheme, {
        ...props,
        grow: false,
    });
    // since we do not have a layout container we can create an id like so
    const id = getUUID("", "panel-header");
    return (
        <div
            id={id}
            className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} rounded-t ${
                border === true ? "border-b" : ""
            } justify-between items-center ${
                padding === true ? defaultPadding : "p-0"
            } ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

// PanelBody should not be scrollable, because the parent Panel container IS scrollable.

const PanelBody = ({
    children,
    scrollable = false,
    className = "",
    onClick = undefined,
    defaultPadding = "p-6",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
        scrollable: false,
    });

    return (
        <LayoutContainer
            {...props}
            prefix="panel-body"
            className={`${className} ${styles.string} ${
                padding === true ? defaultPadding : "p-0"
            }`}
            scrollable={scrollable}
            width={"w-full"}
            height={"h-full"}
            direction={props.horizontal === true ? "row" : "col"}
            space={false}
            onClick={onClick}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter = ({
    children,
    className = "",
    defaultPadding = "p-6",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER, currentTheme, {
        ...props,
        height: "h-fit",
        grow: false,
    });

    console.log("PanelFooter styles", styles);
    return (
        <div
            className={`flex flex-row rounded-b justify-between items-center ${className} ${
                styles.string
            } ${padding === true ? defaultPadding : "p-0"}`}
        >
            {children}
        </div>
    );
};

const Panel = ({
    horizontal = false,
    children,
    onClick = undefined,
    width = "w-full",
    height = "h-full", // leave as blank so the panel will not take up full height if not warranted
    padding = true,
    scrollable = true, // this is the default for a panel
    grow = true,
    className = "",
    direction = "col",
    defaultPadding = "p-6",
    border = true,
    ...props
}) => {
    // Fetch the Styles from the utility
    const { currentTheme } = useContext(ThemeContext);
    console.log("[Panel] themeObjects:", themeObjects);
    console.log("[Panel] themeObjects.PANEL:", themeObjects.PANEL);
    console.log(
        "[Panel] currentTheme:",
        currentTheme
            ? "OBJECT with " + Object.keys(currentTheme).length + " keys"
            : "NULL"
    );

    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
        direction: horizontal === true ? "row" : "col",
        scrollable,
        grow,
        width,
        height,
    });

    console.log("[Panel] styles:", {
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        textColor: styles.textColor,
        fullString: styles.string,
        currentThemeKeys: currentTheme
            ? Object.keys(currentTheme)
                  .filter((k) => k.includes("bg-primary"))
                  .slice(0, 10)
            : "NO THEME",
    });

    return (
        <LayoutContainer
            prefix="panel"
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${
                styles.string
            } ${height} ${width} rounded-lg ${border === true ? "border" : ""} ${
                padding === true ? defaultPadding : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable} // must include this here as we separated props
            space={false}
            width={width}
            height={height}
        >
            {children}
        </LayoutContainer>
    );
};

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

/**
 *
 * Panel2
 */

const PanelHeader2 = ({
    children,
    border = false,
    className = "",
    padding = true,
    defaultPadding = "p-4",
    direction = "horizontal",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER_2, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} rounded-t ${
                border === true ? "border-b" : ""
            } justify-between items-center ${
                padding === true ? defaultPadding : "p-0"
            } ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const PanelBody2 = ({
    children,
    scrollable = false,
    className = "",
    onClick = undefined,
    defaultPadding = "p-4",
    padding = true,
    height = "h-full",
    width = "w-full",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
        scrollable: false,
        scrollable,
        padding,
        width: "w-full",
        height,
    });

    return (
        <LayoutContainer
            {...props}
            className={`${className} ${styles.string} ${
                padding === true ? defaultPadding : "p-0"
            }`}
            scrollable={scrollable}
            width={"w-full"}
            height={"h-full"}
            direction={props.horizontal === true ? "row" : "col"}
            space={false}
            onClick={onClick}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter2 = ({
    children,
    className = "",
    defaultPadding = "p-4",
    padding = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_2, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b justify-between items-center ${className} ${
                styles.string
            } ${padding === true ? defaultPadding : "p-0"}`}
        >
            {children}
        </div>
    );
};

const Panel2 = ({
    horizontal,
    children,
    onClick = undefined,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
    className = "",
    direction = "col",
    grow = true,
    defaultPadding = "p-4",
    border = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
        direction: horizontal === true ? "row" : "col",
        scrollable,
        width,
        height,
        grow,
    });

    return (
        <LayoutContainer
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${
                styles.string
            } ${height} ${width} rounded-md ${border === true ? "border" : ""} ${
                padding === true ? defaultPadding : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable}
            space={false}
            {...props}
        >
            {children}
        </LayoutContainer>
    );
};

Panel2.Header = PanelHeader2;
Panel2.Body = PanelBody2;
Panel2.Footer = PanelFooter2;

/**
 * Panel3
 *
 *
 */

const PanelHeader3 = ({
    children,
    border = false,
    className = "",
    padding = true,
    defaultPadding = "p-2",
    direction = "horizontal",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER_3, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });

    return (
        <div
            className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} rounded-t ${
                border === true ? "border-b" : ""
            } justify-between items-center ${
                padding === true ? defaultPadding : "p-0"
            } ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const PanelBody3 = ({
    children,
    scrollable = false,
    className = "",
    space = true,
    onClick = undefined,
    defaultPadding = "p-2",
    padding = true,
    height = "h-full",
    width = "w-full",
    ...props
}) => {
    try {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
            ...props,
            direction: props.horizontal === true ? "row" : "col",
            scrollable,
            padding,
            width: "w-full",
            height,
        });

        return (
            <LayoutContainer
                {...props}
                className={`${className} ${styles.string} ${
                    padding === true ? defaultPadding : "p-0"
                }`}
                scrollable={scrollable}
                width={"w-full"}
                height={height}
                direction={props.horizontal === true ? "row" : "col"}
                space={false}
                onClick={onClick}
            >
                {children}
            </LayoutContainer>
        );
    } catch (e) {
        return null;
    }
};

const PanelFooter3 = ({
    children,
    className = "",
    padding = true,
    defaultPadding = "p-2",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_3, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b justify-between items-center ${
                padding === true ? defaultPadding : "p-0"
            } ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel3 = ({
    horizontal,
    children,
    onClick = undefined,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
    className = "",
    grow = true,
    defaultPadding = "p-2",
    border = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
        ...props,
        direction: horizontal === true ? "row" : "col",
        scrollable,
        padding,
        width,
        height,
        grow,
    });

    return (
        <LayoutContainer
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${
                styles.string
            } ${height} ${width} rounded ${border === true ? "border" : ""} ${
                padding === true ? defaultPadding : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable}
            space={false}
            {...props}
        >
            {children}
        </LayoutContainer>
    );
};

Panel3.Header = PanelHeader3;
Panel3.Body = PanelBody3;
Panel3.Footer = PanelFooter3;

export { Panel, Panel2, Panel3 };
