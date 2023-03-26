import React, { useContext } from "react";
import { Heading, ButtonIcon } from "@dash/Common";

export const LayoutTitlePane = ({ onClick }) => {
    return (
        <div className="flex flex-col rounded font-medium justify-between">
            <div className="flex flex-col rounded font-medium justify-between overflow-hidden">
                <div className="flex flex-col rounded p-6 py-10 space-y-4 w-full">
                    <div className="flex flex-row w-full">
                        <Heading
                            title={"Lay. Out."}
                            padding={false}
                            textColor={"text-gray-300"}
                        />
                        <ButtonIcon
                            icon="plus"
                            textSize="text-2xl"
                            backgroundColor={"bg-gray-800"}
                            hoverBackgroundColor={"hover:bg-green-600"}
                            iconSize="h-6 w-6"
                            textColor={"text-gray-400"}
                            // onClick={onClickNewTheme}
                        />
                    </div>
                    <p className={`text-lg font-normal text-gray-300`}>
                        Create Layout Templates to be used as starter kits for
                        your Dashboards.
                    </p>
                </div>
            </div>
        </div>
    );
};
