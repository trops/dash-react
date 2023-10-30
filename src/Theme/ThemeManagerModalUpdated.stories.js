import { ThemeManagerModalUpdated } from "./ThemeManagerModalUpdated";
import { mock, MockWrapper } from "@dash";
import "../tailwind.css";

export default {
    title: "ThemeManagerModalUpdated",
    component: ThemeManagerModalUpdated,
};

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.theme} args={args}>
            <ThemeManagerModalUpdated {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    open: true,
};
