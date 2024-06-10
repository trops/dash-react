import React, { useContext } from "react";
import { Panel, Modal } from "@dash/Common";
import { PanelDashboardLoader } from "../Panel/PanelDashboardLoader";

export const DashboardLoaderModal = ({
    open,
    setIsOpen,
    onSelecDashboard,
    onClose,
}) => {
    return (
        <Modal
            isOpen={open}
            setIsOpen={setIsOpen}
            width={"w-11/12 xl:w-5/6"}
            height="h-5/6"
        >
            <Panel padding={false}>
                <div className={`flex flex-col w-full h-full overflow-hidden`}>
                    <div className="flex flex-row w-full h-full overflow-hidden">
                        <div className="flex flex-row w-full h-full space-x-4 overflow-hidden p-4">
                            <PanelDashboardLoader
                                onSelecDashboard={onSelecDashboard}
                                onClose={onClose}
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </Modal>
    );
};
