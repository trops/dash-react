import React, { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils/colors";
import { themeObjects } from "@dash/Utils/themeObjects";
import { LayoutContainer } from "@dash/Layout";
/**
 * Panel
 */

const PanelHeader = ({ children, border = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.PANEL_HEADER,
        currentTheme,
        props
    );
    return (
        <div
            className={`flex flex-row rounded-t p-6 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

// PanelBody should not be scrollable, because the parent Panel container IS scrollable.

const PanelBody = ({ children, scrollable = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
        scrollable: false,
    });
    console.log("panel body ", styles.string);
    return (
        <LayoutContainer
            {...props}
            direction={props.horizontal === true ? "row" : "col"}
            className={`p-6 ${styles.string}`}
            scrollable={scrollable}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-6 border-t justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel = ({
    className = "",
    horizontal = false,
    children,
    onClick = null,
    width = "w-full",
    height = "", // leave as blank so the panel will not take up full height if not warranted
    padding = true,
    scrollable = true, // this is the default for a panel
    ...props
}) => {
    // Fetch the Styles from the utility
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL, currentTheme, {
        ...props,
        scrollable,
    });

    return (
        <LayoutContainer
            {...props}
            direction={horizontal === true ? "row" : "col"}
            className={`${styles.string} ${height} rounded-lg ${
                padding === true ? "p-6" : "p-0"
            }`}
            onClick={onClick}
            scrollable={scrollable} // must include this here as we separated props
        >
            {/* height to take up height of the parent container */}
            {/* <div className="flex flex-row h-full w-full">{children}</div> */}
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

const PanelHeader2 = ({ children, border = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.PANEL_HEADER_2,
        currentTheme,
        props
    );
    return (
        <div
            className={`flex flex-row rounded-t p-4 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const PanelBody2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_2, currentTheme, {
        ...props,
        scrollable: false,
    });
    return (
        <LayoutContainer
            {...props}
            className={`p-4 ${styles.string}`}
            direction={props.horizontal === true ? "row" : "col"}
            scrollable={false}
        >
            {children}
        </LayoutContainer>
    );
};

const PanelFooter2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_2, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-4 justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel2 = ({
    className,
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
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
            className={`${styles.string} ${
                padding === true ? "p-4" : "p-0"
            } ${height} rounded-md`}
            onClick={onClick}
            scrollable={scrollable}
        >
            <div className="h-full w-full">{children}</div>
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

const PanelHeader3 = ({ children, border = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.PANEL_HEADER_3,
        currentTheme,
        props
    );

    return (
        <div
            className={`flex flex-row rounded-t p-2 ${
                border === true ? "border-b" : ""
            } justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const PanelBody3 = ({ children, ...props }) => {
    try {
        const { currentTheme } = useContext(ThemeContext);
        const styles = getStylesForItem(themeObjects.PANEL_3, currentTheme, {
            ...props,
            scrollable: false,
        });
        return (
            <LayoutContainer
                {...props}
                className={`p-2 ${styles.string}`}
                direction={props.horizontal === true ? "row" : "col"}
                scrollable={false}
            >
                {children}
            </LayoutContainer>
        );
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const PanelFooter3 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.PANEL_FOOTER_3, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`flex flex-row rounded-b p-2 justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const Panel3 = ({
    className,
    horizontal,
    children,
    onClick = null,
    width = "w-full",
    height = "",
    padding = true,
    scrollable = true,
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
            className={`${styles.string} ${
                padding === true ? "p-2" : "p-0"
            } ${height} rounded`}
            onClick={onClick}
            scrollable={scrollable}
        >
            <div className="h-full w-full">{children}</div>
        </LayoutContainer>
    );
};

Panel3.Header = PanelHeader3;
Panel3.Body = PanelBody3;
Panel3.Footer = PanelFooter3;

export { Panel, Panel2, Panel3 };
