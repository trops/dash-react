import { HitsTemplateComponent, CarouselTemplateComponent } from './hits/Templates';
const TemplateFactory = ({ templateType, ...props }) => {
    switch(templateType) {
        case 'hits':
            return <HitsTemplateComponent {...props} />;
        case 'carousel':
            {/* this is the row of tiles */}
            return (
                <div className='w-full flex flex-row flex-grow overflow-y-hidden overflow-x-scroll space-x-4 h-full'>
                    <CarouselTemplateComponent {...props} />
                </div>
            );
        default:
            return null;
    }
}
export default TemplateFactory;