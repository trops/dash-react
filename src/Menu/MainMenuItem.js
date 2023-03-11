import React from "react";
import { useDrag } from "react-dnd";
import { MenuItem3 } from "@dash/Common";

const MainMenuItem = ({ id, name, onDropItem, onClick, title }) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: "menu-item",
        item: { name, id },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
                sourceIndex: monitor.sourceIndex,
            };
        },
        hover: (item, monitor) => {},
        monitor: () => ({ isDragging: collected.isDragging }),
        end: (item, monitor) => {
            console.log("end ", item);
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
                // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
                // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
                onDropItem({
                    workspaceId: item.id,
                    menuItemId: dropResult.id,
                });
            }
        },
    }));

    return collected.isDragging ? (
        <div
            ref={dragPreview}
            onClick={onClick}
            className={`flex w-full flex-col cursor-pointer space-y-1 p-2 h-full rounded font-hind text-sm opacity-20`}
        >
            <div className="text-sm">{title}</div>
        </div>
    ) : (
        <MenuItem3
            ref={drag}
            id={collected.id}
            type={collected.type}
            onClick={onClick}
        >
            {/* <div 
            ref={drag}
            id={collected.id}
            type={collected.type}
            onClick={onClick} 
            className={`flex w-full flex-col cursor-pointer space-y-1 p-2 h-full rounded font-hind text-sm ${highlight === true && currentTheme['bgSecondary']}`}
        > */}
            <div className="text-sm">{title}</div>
        </MenuItem3>
    );
};

export { MainMenuItem };
