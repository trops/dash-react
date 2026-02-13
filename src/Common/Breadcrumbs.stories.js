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

const items2 = [
    { label: "Home", href: "#" },
    { label: "Category", href: "#" },
    { label: "Current Page", href: "#" },
];

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Breadcrumbs (Primary Variant)
                </h3>
                <Breadcrumbs items={items2} separator="/" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Structure: flex items-center space-x-2
                    <br />
                    Separator: opacity-60 (no size specified)
                    <br />
                    Links: hover:underline (no size specified)
                    <br />
                    <span className="text-amber-600">
                        ⚠️ ISSUE: All 3 variants use identical structure - only theme colors differ
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Breadcrumbs2 (Secondary Variant)
                </h3>
                <Breadcrumbs2 items={items2} separator=">" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Structure: flex items-center space-x-2 (same)
                    <br />
                    Separator: opacity-60 (same)
                    <br />
                    Links: hover:underline (same)
                    <br />
                    <span className="text-amber-600">
                        ⚠️ ISSUE: No size/padding differentiation from primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Breadcrumbs3 (Tertiary Variant)
                </h3>
                <Breadcrumbs3 items={items2} separator="/" maxItems={2} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Structure: flex items-center space-x-2 (same)
                    <br />
                    Separator: opacity-60 (same)
                    <br />
                    Links: hover:underline (same)
                    <br />
                    <span className="text-amber-600">
                        ⚠️ ISSUE: No size/padding differentiation from primary and secondary
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
