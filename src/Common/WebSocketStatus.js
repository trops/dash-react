import { useContext } from "react";
import { ThemeContext } from "@dash/Context";
import { getStylesForItem, themeObjects, getUUID } from "@dash/Utils";

const WS_STATES = {
    CONNECTED: "connected",
    CONNECTING: "connecting",
    DISCONNECTED: "disconnected",
    ERROR: "error",
};

const stateConfig = {
    [WS_STATES.CONNECTED]: {
        dotColor: "bg-green-500",
        pulseColor: "bg-green-400",
        label: "Connected",
        animate: false,
    },
    [WS_STATES.CONNECTING]: {
        dotColor: "bg-amber-500",
        pulseColor: "bg-amber-400",
        label: "Connecting",
        animate: true,
    },
    [WS_STATES.DISCONNECTED]: {
        dotColor: "bg-gray-400",
        pulseColor: "bg-gray-300",
        label: "Disconnected",
        animate: false,
    },
    [WS_STATES.ERROR]: {
        dotColor: "bg-red-500",
        pulseColor: "bg-red-400",
        label: "Error",
        animate: false,
    },
};

const formatTimestamp = (ts) => {
    if (!ts) return null;
    const date = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(date.getTime())) return null;
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    if (diffSecs < 60) return "just now";
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
};

/**
 * WebSocketStatus — color-coded connection state indicator.
 *
 * @param {string}  status          - One of "connected", "connecting", "disconnected", "error"
 * @param {string}  [variant]       - "compact" (dot + label) or "full" (adds provider name + timestamp)
 * @param {string}  [providerName]  - Provider display name (full variant only)
 * @param {Date|string|number} [lastConnected] - Last successful connection time (full variant only)
 * @param {string}  [className]     - Additional CSS classes
 */
const WebSocketStatus = ({
    status = WS_STATES.DISCONNECTED,
    variant = "compact",
    providerName = null,
    lastConnected = null,
    className = "",
    ...props
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const styles = getStylesForItem(themeObjects.WS_STATUS, currentTheme, {
        ...props,
        grow: false,
    });

    const config = stateConfig[status] || stateConfig[WS_STATES.DISCONNECTED];
    const uuid = getUUID("", "ws-status");
    const isCompact = variant === "compact";

    const dot = (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
            {config.animate && (
                <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.pulseColor} opacity-75`}
                />
            )}
            <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${config.dotColor}`}
            />
        </span>
    );

    if (isCompact) {
        return (
            <span
                id={uuid}
                className={`inline-flex items-center gap-1.5 ${styles.string} ${className}`}
            >
                {dot}
                <span className="text-xs font-medium">{config.label}</span>
            </span>
        );
    }

    const timestamp = formatTimestamp(lastConnected);

    return (
        <div
            id={uuid}
            className={`inline-flex items-center gap-2 ${styles.string} ${className}`}
        >
            {dot}
            <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight">
                    {providerName || config.label}
                </span>
                <span className="text-xs opacity-60 leading-tight">
                    {config.label}
                    {timestamp ? ` \u00b7 ${timestamp}` : ""}
                </span>
            </div>
        </div>
    );
};

export { WebSocketStatus, WS_STATES };
