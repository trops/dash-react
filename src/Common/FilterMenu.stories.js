import { useState } from "react";
import { FilterMenu } from "./FilterMenu";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/FilterMenu",
    component: FilterMenu,
};

const Template = (args) => {
    const [selected, setSelected] = useState(args.selected || []);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ padding: 24, minHeight: 360 }}>
                <FilterMenu
                    {...args}
                    selected={selected}
                    onChange={setSelected}
                />
            </div>
        </MockWrapper>
    );
};

export const Orgs = Template.bind({});
Orgs.args = {
    label: "Org",
    searchPlaceholder: "Find org…",
    options: [
        { value: "@acme", label: "@acme", count: 2 },
        { value: "@ai-built", label: "@ai-built", count: 2 },
        { value: "@globex", label: "@globex", count: 1 },
        { value: "@hooli", label: "@hooli", count: 1 },
        { value: "@initech", label: "@initech", count: 1 },
        { value: "@northwind", label: "@northwind", count: 1 },
        { value: "@stark-labs", label: "@stark-labs", count: 1 },
        { value: "@trops", label: "@trops", count: 5 },
        { value: "@umbrella", label: "@umbrella", count: 1 },
        { value: "@wayne-data", label: "@wayne-data", count: 1 },
    ],
};

export const TeamsPreselected = Template.bind({});
TeamsPreselected.args = {
    label: "Team",
    options: ["Kitchen Sinkq", "Slack Pack", "Unassigned"],
    selected: ["Slack Pack"],
};
