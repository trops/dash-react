import React from "react";
import { useDrop } from 'react-dnd';
import AlgoliaDragComponent from "./AlgoliaDragComponent";
import './styles.css';

export default function AlgoliaDropComponent({ id, type, children, onDropItem, hitIndex }) {
    const [{ isOver, canDrop }, drop] = useDrop({
            accept: type,
            drop: () => ({ id, type, dropIndex: hitIndex }), // the id and the type AGAIN of the item for dropping 
            canDrop: () => true, // this will cause the elements that are droppable to be styles (if we choose!)
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                isDragging: monitor.isDragging
            }),
        });

    //console.log('is dragging ', isDragging, canDrop, isOver);
    return (
        <div 
            ref={drop} 
            id={id} 
            className={`drop-component relative cursor-pointer h-full ${canDrop && !isOver ? 'opacity-50':'opacity-100'} rounded min-w-lg max-w-2xl`} 
            style={ canDrop ? { animationDelay: '-.75s', animationDuration: '.25s' } : {}} // jiggle it, just a little bit.
        >
            <AlgoliaDragComponent onDropItem={onDropItem} hitIndex={hitIndex} id={id} type={type}>
                {children}
                {canDrop && isOver && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 bg-green-600 w-full h-full rounded opacity-50">
                        <p className="text-2xl font-bold">Drop Here</p>
                    </div>
                )}
            </AlgoliaDragComponent>
        </div>
    );
}