import React, { useContext, useEffect, useState } from "react";
import { ButtonIcon, InputText} from "@dash/Common";
import { ThemeContext } from "@dash/Context";
import deepEqual from "deep-equal";

export const DashboardHeader = ({ workspace, preview, onClickEdit = null, onNameChange }) => {

    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const { currentTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (deepEqual(workspace, workspaceSelected) === false) {
            setWorkspaceSelected(() => workspace);
        }
    }, [workspace, workspaceSelected]);

    return preview === false && (
         <div className={`flex flex-row p-1 justify-between shrink items-center px-4 ${currentTheme['bg-primary-dark']} py-2`}>
            <InputText name="name" value={workspaceSelected.name} onChange={(e) => onNameChange(e.target.value)} textSize={'text-lg'} placeholder="My Workspace" bgColor={'bg-gray-800'} textColor={'text-gray-400'} hasBorder={false} />
            {onClickEdit !== null && (
                <div className="flex flex-row space-x-1">
                    <ButtonIcon icon="pencil" textSize="text-xs" onClick={onClickEdit} />
                </div>
            )}
         </div>
    )
}