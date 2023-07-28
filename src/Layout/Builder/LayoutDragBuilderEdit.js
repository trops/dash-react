import { renderLayout } from "@dash/Utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const LayoutDragBuilderEdit = ({
    layout,
    dashboardId,
    parentKey,
    debugMode,
    previewMode,
    onClickAdd,
    onClickQuickAdd,
    onDropItem,
    onClickRemove,
    onClickShrink,
    onClickExpand,
    onChangeDirection,
    onChangeOrder,
    onOpenConfig,
    onOpenEvents,
    onSaveConfiguration,
    workspace,
    isDraggable = true,
}) => {
    return isDraggable === true ? (
        <DndProvider backend={HTML5Backend} key={"dnd-provider-edit"}>
            {renderLayout({
                dashboardId,
                layout,
                parentKey,
                debugMode,
                previewMode,
                onClickAdd,
                onClickQuickAdd,
                onClickRemove,
                onClickShrink,
                onClickExpand,
                onChangeDirection,
                onChangeOrder,
                onOpenConfig,
                onOpenEvents,
                onSaveConfiguration,
                onDropItem,
                workspace,
            })}
        </DndProvider>
    ) : (
        renderLayout({
            dashboardId,
            layout,
            parentKey,
            debugMode,
            previewMode,
            onClickAdd,
            onClickQuickAdd,
            onClickRemove,
            onClickShrink,
            onClickExpand,
            onChangeDirection,
            onChangeOrder,
            onOpenConfig,
            onOpenEvents,
            onSaveConfiguration,
            onDropItem,
            workspace,
        })
    );
};
