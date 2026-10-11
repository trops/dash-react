import { useState } from "react";
import { ChoiceMenu } from "./ChoiceMenu";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/ChoiceMenu",
    component: ChoiceMenu,
};

const Template = (args) => {
    const [value, setValue] = useState(args.value || null);
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div style={{ padding: 24, minHeight: 360 }}>
                <ChoiceMenu {...args} value={value} onChange={setValue} />
            </div>
        </MockWrapper>
    );
};

export const Type = Template.bind({});
Type.args = {
    label: "Type",
    value: "widget",
    options: [
        {
            value: "widget",
            label: "Widget",
            description: "One widget, built with AI",
        },
        { value: "bot", label: "Bot", description: "A bot that runs for you" },
        { value: "theme", label: "Theme", description: "Colors for Dash" },
        {
            value: "dashboard",
            label: "Dashboard",
            disabled: true,
            hint: "Making whole dashboards with AI comes later",
        },
    ],
};

export const AiPicker = Template.bind({});
AiPicker.args = {
    label: "AI",
    value: "claude-code",
    align: "right",
    options: [
        { value: "claude-code", label: "Claude Code" },
        {
            value: "anthropic",
            label: "Anthropic API",
            disabled: true,
            hint: "Add an Anthropic API key in Settings",
        },
    ],
};
