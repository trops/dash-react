import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

export default function DragComponent({
    obj,
    id,
    type = "layout-widget",
    parent = 0,
    width = "w-full",
    children,
    onDropItem,
    onDragItem,
}) {
    const [itemDrag, setItemDrag] = useState(false);

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: type,
        item: { id, type, parent, obj },
        collect: (monitor, props) => {
            // console.log("collect ", monitor.getItem());
            // alert the parent that we are dragging
            // onDragItem(monitor.getItem());
            return {
                isDragging: monitor.isDragging(),
                sourceIndex: monitor.sourceIndex,
                item: monitor.getItem(),
            };
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
                // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
                // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
                onDropItem({
                    itemDropped: item,
                    sourceIndex: item.id,
                    dropIndex: dropResult.id,
                    layoutId: dropResult.type,
                    parentIndex: item.parent,
                });
            }
        },
    }));

    return collected.isDragging ? (
        <div
            ref={dragPreview}
            className=" h-full flex flex-col min-h-fit w-full"
        >
            {children}
        </div>
    ) : (
        <div
            ref={drag}
            id={collected.id}
            type={collected.type}
            className={`scale-100 flex flex-col ${width} min-w-xl rounded min-h-fit z-10`}
            style={{ animationDelay: "-.75s", animationDuration: ".25s" }}
        >
            {children}
        </div>
    );
}
