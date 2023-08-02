import React, { useState } from "react";
import { useDrop } from "react-dnd";
// import './styles.css';

export default function DropComponent({
    item,
    id,
    type = "layout-widget",
    children = null,
    onDropItem,
    width,
}) {
    const [hasDropped, setHasDropped] = useState(false);
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

    const [{ isOver, isOverCurrent, canDrop }, drop] = useDrop(
        {
            accept: type,
            drop: (_item, monitor) => {
                const didDrop = monitor.didDrop();
                if (didDrop) {
                    return;
                }
                setHasDropped(true);
                setHasDroppedOnChild(didDrop);
                return { id, type, dropIndex: id, obj: item };
            }, // the id and the type AGAIN of the item for dropping
            canDrop: (obj) => {
                return obj.id !== 1 && item.canHaveChildren === true;
            }, // this will cause the elements that are droppable to be styles (if we choose!)

            collect: (monitor) => {
                // console.log(monitor);
                return {
                    isOver: monitor.isOver(),
                    // canDrop: monitor.canDrop(),
                    isDragging: monitor.isDragging,
                    isOverCurrent: monitor.isOver({ shallow: true }),
                };
            },
        },
        [setHasDropped, setHasDroppedOnChild]
    );

    return (
        <div
            ref={drop}
            id={id}
            className={`drop-component relative cursor-pointer rounded min-w-lg ${width} ${
                isOverCurrent
                    ? "opacity-50 border-2 border-yellow-500"
                    : "opacity-100 border-2 border-none"
            } `}
        >
            {children}
            {canDrop === true && isOverCurrent === true && isOver === true && (
                <div className="absolute inset-0 flex justify-center items-center z-10 bg-green-600 w-full h-full rounded opacity-100">
                    <p className="text-2xl font-bold">Drop Me</p>
                </div>
            )}
        </div>
    );
}
