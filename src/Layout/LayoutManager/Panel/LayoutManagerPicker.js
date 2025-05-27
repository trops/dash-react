import { AppContext } from "@dash/Context";
import { useContext, useEffect, useState } from "react";
import { MenuItem, Panel } from "../../../Common";
import { LayoutTitlePane } from "./Pane/LayoutTitlePane";
import { Menu } from "@dash/Common/Menu";

/**
 * Allow the user to select a Layout from the layouts that have been saved by the user 
 * or default layouts that come with dash-react
 */
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
        console.log("layouts ", layouts);
        setLayoutTemplates(layouts);
    }

    function renderLayoutTemplates(data) {
        try {
            return data.map(layoutTemplate => {
                return (
                <MenuItem>
                    <span className="text-xs">{JSON.stringify(layoutTemplate, null, 2)}</span>
                </MenuItem>
                );
            })
        } catch(e) {
            return null;
        }
    }

    return (
        <Panel horizontal width="w-full">
            <div className="flex flex-col w-1/3">
                <LayoutTitlePane />
            </div>
            <div className="flex flex-col w-2/3">
                <Menu>{renderLayoutTemplates(layoutTemplates)}</Menu>
            </div>
        </Panel>
    );
};
