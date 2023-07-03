import { LayoutContainer } from "./LayoutContainer";
import { MockWrapper, mock } from "../Mock";

export default {
    title: "LayoutContainer",
    component: LayoutContainer,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <LayoutContainer {...args}>
                LayoutContainer Here is the body of the panelHere is the body of
                the panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the panel
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panel panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the panel
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panel panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the
                panelHere is the body of the panelHere is the body of the panel
            </LayoutContainer>
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    title: "LayoutContainer",
    scrollable: true,
    height: "h-60",
    variant: "light",
};
