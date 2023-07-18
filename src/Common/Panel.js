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
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_HEADER, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-t p-6 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${className} ${styles.string}`}
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
            className={`${className} ${styles.string} p-6`}
            scrollable={scrollable}
            width={"w-full"}
            height={"h-full"}
            direction={props.horizontal === true ? "row" : "col"}
            space={false}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-6 border-t justify-between items-center ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel = ({
    horizontal = false,
    children,
    onClick = null,
    width = "w-full",
    height = "h-full", // leave as blank so the panel will not take up full height if not warranted
    padding = true,
    scrollable = true, // this is the default for a panel
    grow = true,
    className = "",
    ...props
}) => {
    // Fetch the Styles from the utility
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
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
            } ${height} rounded-lg overflow-hidden${
                padding === true ? "p-6" : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable} // must include this here as we separated props
            space={false}
            {...props}
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
            className={`flex flex-row rounded-t p-4 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const PanelBody2 = ({
    children,
    scrollable = false,
    className = "",
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
            className={`${className} ${styles.string} p-4`}
            scrollable={scrollable}
            width={"w-full"}
            height={"h-full"}
            direction={props.horizontal === true ? "row" : "col"}
            space={false}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter2 = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_2, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-4 justify-between items-center ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel2 = ({
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
        scrollable,
        width,
        height,
    });

    return (
        <LayoutContainer
            {...props}
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${styles.string} ${
                padding === true ? "p-4" : "p-0"
            } ${height} rounded-md`}
            onClick={onClick}
            scrollable={scrollable}
            space={false}
        >
            {/* <div className="h-full w-full">{children}</div> */}
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
            className={`flex flex-row rounded-t p-2 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${className} ${styles.string}`}
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
    ...props
}) => {
    try {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
            ...props,
            scrollable,
        });
        return (
            <LayoutContainer
                {...props}
                className={`${className} ${styles.string} p-2`}
                scrollable={scrollable}
                width={"w-full"}
                height={"h-full"}
                direction={props.horizontal === true ? "row" : "col"}
                space={false}
            >
                {children}
            </LayoutContainer>
        );
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const PanelFooter3 = ({ children, className = "", ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_3, currentTheme, {
        ...props,
        height: "h-auto",
        grow: false,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-2 justify-between items-center ${className} ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel3 = ({
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
        ...props,
        scrollable,
        width,
        height,
    });

    return (
        <LayoutContainer
            {...props}
            direction={horizontal === true ? "row" : "col"}
            className={`${className} ${styles.string} ${
                padding === true ? "p-2" : "p-0"
            } ${height} rounded`}
            onClick={onClick}
            scrollable={scrollable}
            space={false}
        >
            {children}
        </LayoutContainer>
    );
};

Panel3.Header = PanelHeader3;
Panel3.Body = PanelBody3;
Panel3.Footer = PanelFooter3;

export { Panel, Panel2, Panel3 };
