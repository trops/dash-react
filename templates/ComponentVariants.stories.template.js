import { ComponentName, ComponentName2, ComponentName3 } from "./ComponentName";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/ComponentName",
    component: ComponentName,
};

// Primary variant story
const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ComponentName {...args}>Primary Content</ComponentName>
    </MockWrapper>
);

// Secondary variant story
const Template2 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ComponentName2 {...args}>Secondary Content</ComponentName2>
    </MockWrapper>
);

// Tertiary variant story
const Template3 = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <ComponentName3 {...args}>Tertiary Content</ComponentName3>
    </MockWrapper>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});

Primary.args = {
    // Add component-specific args
};

Secondary.args = {
    // Add component-specific args
};

Tertiary.args = {
    // Add component-specific args
};

/**
 * AllVariants Story - REQUIRED for variant validation
 *
 * This story displays all three variants side-by-side with documentation
 * showing the Tailwind classes used for each variant. Include status
 * indicators (✅ GOOD or ⚠️ ISSUE) to document the current state.
 */
export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ComponentName (Primary Variant)
                </h3>
                <ComponentName>
                    This is the primary variant with the largest size and
                    boldest styling.
                </ComponentName>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-lg
                    <br />
                    Padding: p-6
                    <br />
                    Font: font-bold
                    <br />
                    Rounded: rounded-lg
                    <br />
                    Shadow: shadow-md
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Largest variant with clear hierarchy
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ComponentName2 (Secondary Variant)
                </h3>
                <ComponentName2>
                    This is the secondary variant with medium size and moderate
                    styling.
                </ComponentName2>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-base
                    <br />
                    Padding: p-4
                    <br />
                    Font: font-medium
                    <br />
                    Rounded: rounded-md
                    <br />
                    Shadow: shadow
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Medium variant, smaller than primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ComponentName3 (Tertiary Variant)
                </h3>
                <ComponentName3>
                    This is the tertiary variant with the smallest size and
                    lightest styling.
                </ComponentName3>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Text size: text-sm
                    <br />
                    Padding: p-2
                    <br />
                    Font: font-normal
                    <br />
                    Rounded: rounded
                    <br />
                    Shadow: shadow-sm
                    <br />
                    <span className="text-green-600">
                        ✅ GOOD: Smallest variant, clear hierarchy
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
