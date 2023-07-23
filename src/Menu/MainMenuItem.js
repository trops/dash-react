import React from "react";
import { MenuItem } from "@dash/Common";
import { DragDropWidget } from "./DragDropWidget";

const MainMenuItem = ({ workspaceMenuId, onDropItem, onClick, title }) => {
    return (
        <DragDropWidget
            id={workspaceMenuId}
            width={"w-full"}
            type={"menu-item"}
            onDropItem={onDropItem}
        >
            <MenuItem onClick={onClick} className={"p-4 font-bold rounded"}>
                {title}
            </MenuItem>
        </DragDropWidget>
    );
};

export { MainMenuItem };
