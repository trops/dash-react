import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../Utils";
import { Panel, Panel2, Panel3 } from "./Panel";
import { LayoutContainer } from "@dash/Layout";

const DashPanelHeader = ({ title, ping = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER,
        currentTheme,
        {
            ...props,
            height: "h-fit",
            grow: false,
        }
    );
    return (
        <div
            className={`flex flex-row rounded-t p-2 border-b justify-between items-center ${styles.string}`}
        >
            <span className={`uppercase text-xs font-bold ${styles.textColor}`}>
                {title}
            </span>
            {ping && (
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody = ({
    children,
    height = "h-full",
    width = "w-full",
    scrollable = true,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL, currentTheme, {
        ...props,
        width,
        height: "h-full",
        scrollable,
        direction: "col",
        space: false,
    });
    return (
        <LayoutContainer
            {...props}
            className={`${styles.string} p-4`}
            scrollable={scrollable}
            width={width}
            height={height}
            space={false}
            direction="col"
        >
            {children}
        </LayoutContainer>
    );
};

const DashPanelFooter = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER,
        currentTheme,
        {
            ...props,
            height: "h-fit",
            grow: false,
        }
    );
    return (
        <div
            className={`flex flex-row rounded-b p-2 border-t justify-between items-center text-xs uppercase font-bold ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanel = ({
    children,
    height = "",
    width = "w-full",
    scrollable = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL, currentTheme, {
        ...props,
        width,
        height,
        scrollable,
    });

    console.log("DASH PANEL styles ", styles.string);

    return (
        <Panel
            padding={false}
            scrollable={scrollable}
            height={height}
            width={width}
        >
            {children}
        </Panel>
    );
};

DashPanel.Header = DashPanelHeader;
DashPanel.Body = DashPanelBody;
DashPanel.Footer = DashPanelFooter;

const DashPanelHeader2 = ({ title, ping = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER_2,
        currentTheme,
        {
            ...props,
            height: "h-fit",
            grow: false,
        }
    );
    return (
        <div
            className={`flex flex-row rounded-t p-2 border-b justify-between items-center ${styles.string}`}
        >
            <span className={`uppercase text-xs font-bold ${styles.textColor}`}>
                {title}
            </span>
            {ping && (
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody2 = ({
    children,
    height = "h-full",
    width = "w-full",
    scrollable = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, {
        ...props,
        scrollable,
        height: "h-full",
        width,
    });

    return (
        <LayoutContainer
            {...props}
            className={`${styles.string} p-4`}
            scrollable={scrollable}
            width={width}
            height={height}
            direction="col"
            space={false}
        >
            {children}
        </LayoutContainer>
    );
};

const DashPanelFooter2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER_2,
        currentTheme,
        {
            ...props,
            height: "h-fit",
            grow: false,
        }
    );
    return (
        <div
            className={`flex flex-row rounded-b p-2 border-t justify-between items-center ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanel2 = ({
    children,
    height = "h-full",
    width = "w-full",
    scrollable = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, {
        ...props,
        height,
        width,
        scrollable,
    });
    return (
        <Panel2
            // className={`justify-between overflow-hidden`}
            {...styles}
            padding={false}
        >
            <div className="flex flex-col h-full">{children}</div>
        </Panel2>
    );
};

DashPanel2.Header = DashPanelHeader2;
DashPanel2.Body = DashPanelBody2;
DashPanel2.Footer = DashPanelFooter2;

const DashPanelHeader3 = ({ title, ping = false, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER_3,
        currentTheme,
        { ...props, height: "h-fit", grow: false }
    );
    return (
        <div
            className={`flex flex-row rounded-t p-2 border-b justify-between items-center ${styles.string}`}
        >
            <span className={`uppercase text-xs font-bold ${styles.textColor}`}>
                {title}
            </span>
            {ping && (
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody3 = ({
    children,
    width = "w-full",
    height = "h-full",
    scrollable = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, {
        ...props,
        width,
        height,
        scrollable,
    });
    return (
        <LayoutContainer
            {...props}
            className={`${styles.string} p-4`}
            scrollable={scrollable}
            width={width}
            height={height}
        >
            {children}
        </LayoutContainer>
    );
};

const DashPanelFooter3 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER_3,
        currentTheme,
        {
            ...props,
            height: "h-fit",
            grow: false,
        }
    );
    return (
        <div
            className={`flex flex-row rounded-b p-2 border-t justify-between items-center text-xs uppercase font-bold ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanel3 = ({
    children,
    height = "h-full",
    width = "w-full",
    scrollable = false,
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, {
        ...props,
        width,
        height,
        scrollable,
    });
    return (
        <Panel3
            // className={`justify-between overflow-hidden`}
            {...styles}
            padding={false}
        >
            <div className="flex flex-col h-full bg-inherit">{children}</div>
        </Panel3>
    );
};

DashPanel3.Header = DashPanelHeader3;
DashPanel3.Body = DashPanelBody3;
DashPanel3.Footer = DashPanelFooter3;

export { DashPanel, DashPanel2, DashPanel3 };
