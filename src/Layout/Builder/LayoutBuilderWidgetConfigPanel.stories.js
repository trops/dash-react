import { LayoutBuilderWidgetConfigPanel } from "./LayoutBuilderWidgetConfigPanel";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "LayoutBuilderWidgetConfigPanel",
    component: LayoutBuilderWidgetConfigPanel,
};

const Template = (args) => {
    const workspaces = mock.api.workspace.listWorkspacesForApplication("2345");
    //console.log("workspaces ", workspaces.workspaces[0].layout[1]);
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <LayoutBuilderWidgetConfigPanel {...args} layoutItem={workspaces.workspaces[0].layout[1]["component"]} open={true} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    open: true,
    scrollable: true,
};
