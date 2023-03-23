import { ThemeManagerModal } from "./ThemeManagerModal";
import { mock, MockWrapper } from "@dash";
import "../tailwind.css";

export default {
    title: "ThemeManagerModal",
    component: ThemeManagerModal,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <ThemeManagerModal {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    open: true,
};
