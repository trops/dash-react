import React from "react";
import { AlertBanner } from "./AlertBanner";

export default {
    title: "Common/AlertBanner",
    component: AlertBanner,
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["info", "success", "warning", "error"],
            description: "Visual variant of the alert",
        },
        title: {
            control: "text",
            description: "Alert title (bold)",
        },
        message: {
            control: "text",
            description: "Alert message",
        },
        showIcon: {
            control: "boolean",
            description: "Show/hide the icon",
        },
        animate: {
            control: "boolean",
            description: "Enable entrance animation",
        },
        onClose: {
            action: "closed",
            description: "Close button click handler",
        },
    },
};

// Template for stories
const Template = (args) => <AlertBanner {...args} />;

// Info variant (default)
export const Info = Template.bind({});
Info.args = {
    variant: "info",
    title: "Info",
    message: "This is an informational alert message.",
    showIcon: true,
    animate: true,
};

// Success variant
export const Success = Template.bind({});
Success.args = {
    variant: "success",
    title: "Success",
    message: "Your changes have been saved successfully!",
    showIcon: true,
    animate: true,
};

// Warning variant
export const Warning = Template.bind({});
Warning.args = {
    variant: "warning",
    title: "Warning",
    message: "Please review your settings before continuing.",
    showIcon: true,
    animate: true,
};

// Error variant
export const Error = Template.bind({});
Error.args = {
    variant: "error",
    title: "Error",
    message: "Something went wrong. Please try again later.",
    showIcon: true,
    animate: true,
};

// With close button
export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
    variant: "info",
    title: "Dismissible Alert",
    message: "You can close this alert by clicking the × button.",
    showIcon: true,
    animate: true,
    onClose: () => alert("Alert closed!"),
};

// Without icon
export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
    variant: "success",
    title: "No Icon",
    message: "This alert doesn't show an icon.",
    showIcon: false,
    animate: true,
};

// Message only (no title)
export const MessageOnly = Template.bind({});
MessageOnly.args = {
    variant: "warning",
    message: "This is a simple warning message without a title.",
    showIcon: true,
    animate: true,
};

// With custom children
export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
    variant: "info",
    title: "Update Available",
    showIcon: true,
    animate: true,
    children: (
        <div className="mt-2">
            <p className="mb-2">A new version of the dashboard is available.</p>
            <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                    Update Now
                </button>
                <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-50">
                    Later
                </button>
            </div>
        </div>
    ),
};

// All variants showcase
export const AllVariants = () => (
    <div className="space-y-4">
        <AlertBanner
            variant="info"
            title="Information"
            message="This is an informational alert with important details."
            showIcon={true}
        />
        <AlertBanner
            variant="success"
            title="Success"
            message="Your operation completed successfully!"
            showIcon={true}
        />
        <AlertBanner
            variant="warning"
            title="Warning"
            message="Please be careful with this action."
            showIcon={true}
        />
        <AlertBanner
            variant="error"
            title="Error"
            message="An error occurred while processing your request."
            showIcon={true}
        />
    </div>
);
AllVariants.parameters = {
    docs: {
        description: {
            story: "A showcase of all AlertBanner variants side by side.",
        },
    },
};
