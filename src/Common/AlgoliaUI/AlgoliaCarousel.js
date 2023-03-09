import React from "react";
import TemplateFactory from "./templates/TemplateFactory";

class AlgoliaCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.fields
        }
    }
            
    render() {
        const { fields } = this.state;
        const { template, hits, onDrop, layoutId, dropData, analytics, isDraggable, pendingRules } = this.props;
        return (
            <div key={`carousel-${Date.now()}`} className="algolia-element flex flex-row w-full rounded space-x-4 p-4 mb-4 rounded">
                <TemplateFactory 
                    templateType="carousel"
                    isDraggable={isDraggable}
                    fields={fields} 
                    template={template} 
                    hits={hits} 
                    layoutId={layoutId} 
                    onDrop={onDrop} 
                    dropData={dropData}
                    analytics={analytics}
                    pendingRules={pendingRules}
                />
            </div>
        )
    }
}

AlgoliaCarousel.defaultProps = {
    template: null,
    fields: {},
    hits: [],
    analytics: null,
    isDraggable: true,
    onDrop(){}
}
export default AlgoliaCarousel;