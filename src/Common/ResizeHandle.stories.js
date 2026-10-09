import { ResizeHandle } from "./ResizeHandle";
import { useResizableWidth } from "@dash/Hooks/useResizableWidth";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/ResizeHandle",
    component: ResizeHandle,
};

// A main area with a right-hand panel whose left edge is the handle.
const SidePanel = () => {
    const { width, handleProps } = useResizableWidth({
        defaultWidth: 360,
        min: 280,
        max: 640,
        edge: "left",
        storageKey: "storybook:resize-handle",
    });
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="flex flex-row h-96 p-4 gap-1">
                <div className="flex-1 min-w-0 rounded-lg border border-gray-700 p-4 text-sm">
                    Main area
                </div>
                <ResizeHandle {...handleProps} ariaLabel="Resize panel" />
                <aside
                    className="rounded-lg border border-gray-700 p-4 text-sm"
                    style={{ width }}
                >
                    Panel — {Math.round(width)}px. Drag the handle, use ← / →
                    when it's focused, or double-click it to reset.
                </aside>
            </div>
        </MockWrapper>
    );
};

export const RightPanel = () => <SidePanel />;
