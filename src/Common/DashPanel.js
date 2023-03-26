import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects } from "../Utils";
import { Panel, Panel2, Panel3 } from "./Panel";

const DashPanelHeader = ({ title, ping = true, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER,
        currentTheme,
        {
            ...props,
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
                <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`rounded-b p-4 h-full overflow-y-scroll space-y-1 ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanelFooter = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER,
        currentTheme,
        {
            ...props,
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

const DashPanel = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL, currentTheme, {
        ...props,
    });
    return (
        <Panel
            className={`justify-between overflow-hidden`}
            {...styles}
            padding={false}
        >
            <div className="flex flex-col h-full bg-inherit">{children}</div>
        </Panel>
    );
};

DashPanel.Header = DashPanelHeader;
DashPanel.Body = DashPanelBody;
DashPanel.Footer = DashPanelFooter;

const DashPanelHeader2 = ({ title, ping = true, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER_2,
        currentTheme,
        {
            ...props,
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
                <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`rounded-b p-4 h-full overflow-y-scroll space-y-1 ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanelFooter2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER_2,
        currentTheme,
        {
            ...props,
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

const DashPanel2 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_2, currentTheme, {
        ...props,
    });
    return (
        <Panel2
            className={`justify-between overflow-hidden`}
            {...styles}
            padding={false}
        >
            <div className="flex flex-col h-full bg-inherit">{children}</div>
        </Panel2>
    );
};

DashPanel2.Header = DashPanelHeader2;
DashPanel2.Body = DashPanelBody2;
DashPanel2.Footer = DashPanelFooter2;

const DashPanelHeader3 = ({ title, ping = true, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_HEADER_3,
        currentTheme,
        {
            ...props,
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
                <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
            )}
        </div>
    );
};

const DashPanelBody3 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, {
        ...props,
    });
    return (
        <div
            className={`p-4 h-full overflow-y-scroll space-y-1 ${styles.string}`}
        >
            {children}
        </div>
    );
};

const DashPanelFooter3 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(
        themeObjects.DASH_PANEL_FOOTER_3,
        currentTheme,
        {
            ...props,
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

const DashPanel3 = ({ children, ...props }) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.DASH_PANEL_3, currentTheme, {
        ...props,
    });
    return (
        <Panel3
            className={`justify-between overflow-hidden`}
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
