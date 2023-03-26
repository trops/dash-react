import { AppContext } from "@dash/Context";
import { useContext, useEffect, useState } from "react";
import { Panel } from "../../../Common";
import { LayoutTitlePane } from "./Pane/LayoutTitlePane";

export const LayoutManagerPicker = () => {
    const { api, creds } = useContext(AppContext);
    const [layoutTemplates, setLayoutTemplates] = useState(null);

    useEffect(() => {
        if (layoutTemplates === null) {
            listLayoutTemplates();
        }
    });

    function listLayoutTemplates() {
        const layouts = api.layout.listLayoutsForApplication(creds.appId);
        setLayoutTemplates(layouts);
    }

    return (
        <Panel horizontal width="w-full">
            <div className="flex flex-col w-1/3">
                <LayoutTitlePane />
            </div>
            <div className="flex flex-col w-2/3">
                {JSON.stringify(layoutTemplates)}
            </div>
        </Panel>
    );
};
