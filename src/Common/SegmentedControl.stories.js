import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/SegmentedControl",
    component: SegmentedControl,
};

const Template = (args) => {
    const [value, setValue] = useState(args.value);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <SegmentedControl {...args} value={value} onChange={setValue} />
        </MockWrapper>
    );
};

export const Views = Template.bind({});
Views.args = {
    ariaLabel: "Calendar view",
    options: ["Today", "Week", "Create"],
    value: "Today",
};

export const WithValuesAndDisabled = Template.bind({});
WithValuesAndDisabled.args = {
    ariaLabel: "Export format",
    options: [
        { value: "json", label: "JSON" },
        { value: "csv", label: "CSV" },
        { value: "ndjson", label: "NDJSON", disabled: true },
    ],
    value: "json",
};

export const Medium = Template.bind({});
Medium.args = {
    ariaLabel: "Range",
    options: ["Day", "Week", "Month", "Year"],
    value: "Week",
    size: "md",
};
