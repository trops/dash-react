import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
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
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER, currentTheme, {
        ...props,
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-t ${
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
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b border-t justify-between items-center ${className} ${
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
    ...props
}) => {
    // Fetch the Styles from the utility
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
        direction: horizontal === true ? "row" : "col",
        scrollable,
        grow,
        width,
        height,
    });
    console.log("Panel styles ", styles.string, width, height);
    return (
        <LayoutContainer
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${
                styles.string
            } ${height} ${width} rounded-lg overflow-hidden border ${
                padding === true ? defaultPadding : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable} // must include this here as we separated props
            space={false}
            width={width}
            height={height}
            // {...props}
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
            className={`flex flex-row rounded-t ${
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
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
        scrollable: false,
        height: "h-full",
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
            } ${height} ${width} rounded-md overflow-hidden border ${
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
            className={`flex flex-row rounded-t ${
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
    ...props
}) => {
    try {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
            ...props,
            scrollable: false,
            height: "h-full",
            width: "w-full",
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
    } catch (e) {
        console.log(e.message);
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
            } ${height} ${width} rounded overflow-hidden border ${
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
