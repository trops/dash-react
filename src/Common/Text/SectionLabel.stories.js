import { SectionLabel } from "./SectionLabel";
import { Paragraph3 } from "./Paragraph";
import { mock, MockWrapper } from "@dash";
import "@dash/tailwind.css";

export default {
    title: "Common/Text/SectionLabel",
    component: SectionLabel,
};

const Template = (args) => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="flex flex-col gap-1">
            <SectionLabel {...args} />
            <Paragraph3 text="No tasks configured. Open Settings > Schedule to add one." />
        </div>
    </MockWrapper>
);

export const Default = Template.bind({});
Default.args = { text: "Task States" };

export const AsHeading = Template.bind({});
AsHeading.args = { text: "Listener Status", as: "h4" };
