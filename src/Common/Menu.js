import React from "react";
import { Panel, Panel2, Panel3 } from "./Panel";
/**
 * Menu
 */

const Menu = ({
    children,
    border = false,
    className = "space-y-2",
    ...props
}) => {
    return (
        <Panel {...props} className={className}>
            {children}
        </Panel>
    );
};

const Menu2 = ({
    children,
    border = false,
    className = "space-y-2",
    ...props
}) => {
    return (
        <Panel2 {...props} className={className}>
            {children}
        </Panel2>
    );
};

const Menu3 = ({
    children,
    border = false,
    className = "space-y-2",
    ...props
}) => {
    return (
        <Panel3 {...props} className={className}>
            {children}
        </Panel3>
    );
};

export { Menu, Menu2, Menu3 };
