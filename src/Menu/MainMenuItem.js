import React from "react";
import { MenuItem3, MenuItem2 } from "@dash/Common";
import { DragDropWidget } from "./DragDropWidget";

const MainMenuItem = ({ workspaceMenuId, onDropItem, onClick, title }) => {
    return (
        <DragDropWidget
            id={workspaceMenuId}
            width={"w-full"}
            type={"menu-item"}
            onDropItem={onDropItem}
        >
            <MenuItem2 onClick={onClick}>{title}</MenuItem2>
        </DragDropWidget>
    );
};

export { MainMenuItem };
