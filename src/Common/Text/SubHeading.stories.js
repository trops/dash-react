import { SubHeading, SubHeading2, SubHeading3 } from "@dash";
import { mock, MockWrapper } from "@dash";

import "@dash/tailwind.css";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Common/Text/SubHeading",
    component: SubHeading,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading2 {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper
            api={mock.api}
            theme={mock.themes}
            args={args}
            backgroundColor={"bg-gray-900"}
        >
            <SubHeading3 {...args} />
        </MockWrapper>
    );
};
export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading",
    backgroundColor: "bg-red-400",
};

Secondary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading 2",
    backgroundColor: "bg-red-400",
};

Tertiary.args = {
    //👇 The args you need here will depend on your component
    title: "SubHeading 3",
    backgroundColor: "bg-red-400",
};

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    SubHeading (Primary Variant)
                </h3>
                <SubHeading title="Dashboard Overview" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-3xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4
                    <br />
                    Font: font-medium
                    <br />
                    Structure: flex flex-row w-full
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Progressive text size hierarchy
                    </span>
                    <br />
                    <span className="text-amber-600">
                        ⚠️ NOTE: All variants use same padding (could be improved)
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    SubHeading2 (Secondary Variant)
                </h3>
                <SubHeading2 title="Dashboard Overview" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-2xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4
                    <br />
                    Font: font-medium
                    <br />
                    Structure: flex flex-row w-full
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smaller text than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    SubHeading3 (Tertiary Variant)
                </h3>
                <SubHeading3 title="Dashboard Overview" />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-xl
                    <br />
                    Padding: p-4 2xl:px-6 2xl:py-4
                    <br />
                    Font: (default weight, lighter than primary/secondary)
                    <br />
                    Structure: flex flex-row w-full
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest text, clear hierarchy with font-weight
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
