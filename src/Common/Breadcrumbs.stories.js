import { Breadcrumbs, Breadcrumbs2, Breadcrumbs3 } from "./Breadcrumbs";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Breadcrumbs",
    component: Breadcrumbs,
};

const items = [
    { label: "Home", href: "#" },
    { label: "Dashboard", href: "#" },
    { label: "Widgets", href: "#" },
    { label: "Details", href: "#" },
];

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Breadcrumbs {...args} />
    </MockWrapper>
);

const Template2 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Breadcrumbs2 {...args} />
    </MockWrapper>
);

const Template3 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <Breadcrumbs3 {...args} />
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    items,
    separator: "/",
};

Secondary.args = {
    items,
    separator: ">",
};

Tertiary.args = {
    items,
    separator: "/",
    maxItems: 3,
};
