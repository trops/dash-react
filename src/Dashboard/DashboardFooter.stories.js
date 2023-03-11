import { DashboardFooter } from './DashboardFooter';
import { MockWrapper, mock } from '@dash';
import '../tailwind.css';

//👇 This default export determines where your story goes in the story list
export default {
    title: "DashboardFooter",
    component: DashboardFooter,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
  return (
    <div className='flex flex-col h-full w-full'>
        <MockWrapper api={mock.api} theme={mock.themes} args={args}>
            <DashboardFooter {...args} />
        </MockWrapper>
    </div>
  );
}

export const ThemedPreview = Template.bind({});
export const NotThemedPreview = Template.bind({});
export const ThemedPreviewNo = Template.bind({});
export const NotThemedPreviewNo = Template.bind({});


ThemedPreview.args =  {
  theme: true,
  preview: true,
}

NotThemedPreview.args =  {
    theme: false,
    preview: true,
}

ThemedPreviewNo.args =  {
    theme: true,
    preview: false,
}
  
NotThemedPreviewNo.args =  {
    theme: false,
    preview: false,
}