import { PanelWelcome } from "./PanelWelcome";
import { MockWrapper, mock } from "@dash";
import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    title: "PanelWelcome",
    component: PanelWelcome,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.theme}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <PanelWelcome />
        </MockWrapper>
    );
};

export const ThemedPreview = Template.bind({});
export const ThemedPreviewNo = Template.bind({});

ThemedPreview.args = {
    preview: true,
    backgroundColor: "bg-gray-800",
    height: "h-full",
};

ThemedPreviewNo.args = {
    theme: true,
    preview: false,
    backgroundColor: "bg-gray-800",
};
