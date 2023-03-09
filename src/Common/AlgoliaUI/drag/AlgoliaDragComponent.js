import React from "react";
import { useDrag } from 'react-dnd';

export default function AlgoliaDragComponent({ id, type, hitIndex, children, onDropItem }) {

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: type,
        item: { id, type, hitIndex },
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            };
        },
        monitor: () => ({ isDragging: collected.isDragging }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                // on Drop, we would like to pass this data back to the AlgoliaUIFactory component in the page preview
                // where we can then freeze the hits and not use the connectedHits, but rather the frozen hits, to reposition
                // the grid...and then prompt the user to make a rule? (if they unfreeze, it will resume to Algolia search)
                onDropItem({ 
                    sourceId: item.id, 
                    sourceIndex: item.hitIndex, 
                    dropTargetId: dropResult.id, 
                    dropIndex: dropResult.dropIndex,
                    layoutId: dropResult.type
                });
            }
          },
    }))

    return collected.isDragging ? (
        <div ref={dragPreview} className="relative h-full flex flex-col flex-1">
            {children}
        </div>
    ) : (
        <div ref={drag} id={collected.id} type={collected.type} className="relative scale-100 h-full flex flex-row w-full min-w-xl rounded"  style={{ animationDelay: '-.75s', animationDuration: '.25s' }}>
            {children}
        </div>
    );
}