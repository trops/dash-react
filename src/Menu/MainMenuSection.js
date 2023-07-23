import React, { useContext } from "react";
import { ThemeContext } from "../Context";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonIcon } from "@dash/Common";
import { LayoutContainer } from "../Layout";

export const MainMenuSection = ({
    id,
    type = "menu-item",
    menuItem,
    children,
    onCreateNew,
}) => {
    const { currentTheme } = useContext(ThemeContext);

    // Drop Functionality
    const [{ isOver, isOverCurrent, canDrop }, drop] = useDrop({
        accept: type,
        drop: (_item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
            return { id, type, dropIndex: id };
        },
        canDrop: (obj) => {
            return obj.id !== menuItem.id;
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging,
                isOverCurrent: monitor.isOver({ shallow: true }),
                canDrop: monitor.canDrop(),
            };
        },
    });

    function handleCreateNew(menuItem) {
        onCreateNew && onCreateNew(menuItem);
    }

    return (
        <div
            ref={drop}
            id={menuItem.id}
            className={`flex flex-col p-1 rounded ${
                isOverCurrent && canDrop
                    ? `${currentTheme["bg-primary-very-dark"]} opacity-70`
                    : `${currentTheme["bg-tertiary-dark"]} opacity-100`
            } px-1`}
        >
            <div
                className={`flex flex-row justify-between border-b ${
                    currentTheme && currentTheme["border-secondary-medium"]
                } p-2 pl-2 mb-2`}
            >
                <div className="flex flex-row text-xs items-center">
                    <FontAwesomeIcon icon={menuItem.icon} />
                    <span className="p-2 uppercase font-bold text-gray-500">
                        {menuItem.name}
                    </span>
                </div>
                <ButtonIcon
                    icon="plus"
                    textSize={"text-xs"}
                    padding={false}
                    onClick={() => handleCreateNew(menuItem)}
                    className="hover:bg-green-500 bg-transparent"
                />
            </div>
            <LayoutContainer
                direction="col"
                space={false}
                className="space-y-1"
            >
                {children}
            </LayoutContainer>
        </div>
    );
};
