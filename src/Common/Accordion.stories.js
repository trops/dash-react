import { Accordion, Accordion2, Accordion3 } from "./Accordion";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Accordion",
    component: Accordion,
};

export const Primary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Accordion type="single" defaultValue={["item-1"]}>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger value="item-1">
                        Is it accessible?
                    </Accordion.Trigger>
                    <Accordion.Content value="item-1">
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger value="item-2">
                        Is it styled?
                    </Accordion.Trigger>
                    <Accordion.Content value="item-2">
                        Yes. It comes with default styles that match the
                        shadcn/ui aesthetic.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger value="item-3">
                        Is it animated?
                    </Accordion.Trigger>
                    <Accordion.Content value="item-3">
                        Yes. It uses CSS height transitions for smooth
                        open/close animations.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    </MockWrapper>
);

export const Secondary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Accordion2 type="single" defaultValue={["item-1"]}>
                <Accordion2.Item value="item-1">
                    <Accordion2.Trigger value="item-1">
                        What is dash-react?
                    </Accordion2.Trigger>
                    <Accordion2.Content value="item-1">
                        A React UI component library for building dashboard
                        applications.
                    </Accordion2.Content>
                </Accordion2.Item>
                <Accordion2.Item value="item-2">
                    <Accordion2.Trigger value="item-2">
                        How does theming work?
                    </Accordion2.Trigger>
                    <Accordion2.Content value="item-2">
                        Components use a theme token system that maps semantic
                        names to Tailwind CSS classes.
                    </Accordion2.Content>
                </Accordion2.Item>
            </Accordion2>
        </div>
    </MockWrapper>
);

export const Tertiary = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <Accordion3 type="single" defaultValue={["item-1"]}>
                <Accordion3.Item value="item-1">
                    <Accordion3.Trigger value="item-1">
                        Compact item 1
                    </Accordion3.Trigger>
                    <Accordion3.Content value="item-1">
                        Small variant for dense layouts.
                    </Accordion3.Content>
                </Accordion3.Item>
                <Accordion3.Item value="item-2">
                    <Accordion3.Trigger value="item-2">
                        Compact item 2
                    </Accordion3.Trigger>
                    <Accordion3.Content value="item-2">
                        Another compact accordion section.
                    </Accordion3.Content>
                </Accordion3.Item>
            </Accordion3>
        </div>
    </MockWrapper>
);

export const MultipleOpen = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="p-4 max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
                Multiple mode (multiple items open at once)
            </h3>
            <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
                <Accordion.Item value="item-1">
                    <Accordion.Trigger value="item-1">
                        Section One
                    </Accordion.Trigger>
                    <Accordion.Content value="item-1">
                        This section starts open along with Section Three.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger value="item-2">
                        Section Two
                    </Accordion.Trigger>
                    <Accordion.Content value="item-2">
                        Click to open this independently.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger value="item-3">
                        Section Three
                    </Accordion.Trigger>
                    <Accordion.Content value="item-3">
                        This section also starts open.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    </MockWrapper>
);

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4 max-w-lg">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Accordion (Large)
                </h3>
                <Accordion type="single" defaultValue={["item-1"]}>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger value="item-1">
                            Large accordion item
                        </Accordion.Trigger>
                        <Accordion.Content value="item-1">
                            Full-size accordion with default padding and font
                            weight.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                        <Accordion.Trigger value="item-2">
                            Another item
                        </Accordion.Trigger>
                        <Accordion.Content value="item-2">
                            Second item content.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Accordion2 (Medium)
                </h3>
                <Accordion2 type="single" defaultValue={["item-1"]}>
                    <Accordion2.Item value="item-1">
                        <Accordion2.Trigger value="item-1">
                            Medium accordion item
                        </Accordion2.Trigger>
                        <Accordion2.Content value="item-1">
                            Medium-size with text-sm styling.
                        </Accordion2.Content>
                    </Accordion2.Item>
                    <Accordion2.Item value="item-2">
                        <Accordion2.Trigger value="item-2">
                            Another item
                        </Accordion2.Trigger>
                        <Accordion2.Content value="item-2">
                            Second item content.
                        </Accordion2.Content>
                    </Accordion2.Item>
                </Accordion2>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Accordion3 (Small)
                </h3>
                <Accordion3 type="single" defaultValue={["item-1"]}>
                    <Accordion3.Item value="item-1">
                        <Accordion3.Trigger value="item-1">
                            Small accordion item
                        </Accordion3.Trigger>
                        <Accordion3.Content value="item-1">
                            Compact variant with text-xs styling.
                        </Accordion3.Content>
                    </Accordion3.Item>
                    <Accordion3.Item value="item-2">
                        <Accordion3.Trigger value="item-2">
                            Another item
                        </Accordion3.Trigger>
                        <Accordion3.Content value="item-2">
                            Second item content.
                        </Accordion3.Content>
                    </Accordion3.Item>
                </Accordion3>
            </div>
        </div>
    </MockWrapper>
);
