import { Button, Modal, Panel } from "../../Common";
import { LayoutManagerPicker } from "./Panel/LayoutManagerPicker";

export const LayoutManagerModal = ({ open, setIsOpen }) => {
    function handleSelectLayout(data) {
        console.log(data);
    }

    return (
        <Modal
            isOpen={open}
            setIsOpen={setIsOpen}
            width={"w-11/12 xl:w-5/6"}
            height="h-5/6"
        >
            <Panel backgroundColor={"bg-slate-800"} padding={false}>
                <div className={`flex flex-col w-full h-full overflow-hidden`}>
                    <div className="flex flex-row w-full h-full overflow-hidden">
                        <LayoutManagerPicker onClick={handleSelectLayout} />
                    </div>
                </div>
            </Panel>
            <Modal.Footer>
                <div className="flex flex-row space-x-2">
                    <Button
                        onClick={() => setIsEditing(false)}
                        title="Cancel"
                        textSize="text-base xl:text-lg"
                        padding={"py-2 px-4"}
                        backgroundColor={"bg-gray-700"}
                        textColor={"text-gray-300"}
                        hoverTextColor={"hover:text-gray-100"}
                        hoverBackgroundColor={"hover:bg-gray-700"}
                    />
                    <Button
                        // onClick={() => handleSaveTheme(themeKeySelected)}
                        title="Create New"
                        textSize="text-base xl:text-lg"
                        padding={"py-2 px-4"}
                        backgroundColor={"bg-gray-700"}
                        textColor={"text-gray-300"}
                        hoverTextColor={"hover:text-gray-100"}
                        hoverBackgroundColor={"hover:bg-gray-700"}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
};
