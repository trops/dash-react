import { LayoutManagerModal } from "./LayoutManagerModal";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "LayoutManagerModal",
    component: LayoutManagerModal,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <LayoutManagerModal {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    open: true,
};
