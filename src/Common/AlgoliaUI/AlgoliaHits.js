import React from "react";
import TemplateFactory from "./templates/TemplateFactory";

class AlgoliaHits extends React.Component {

    render() {
        const { fields, template, isEditing, id, hits, layoutId, onDrop, dropData, analytics, isDraggable, onItemClick, layoutSplit, onMarkExpected, onBoostItem, onHideItem, queryString, indexName, page, pendingRules } = this.props;
        const gridStyles = layoutSplit === true 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-2 3xl:grid-cols-3 gap-4'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-4';
            
        return template !== null && (
            <div key={`hits-${id}-${Date.now()}`} className={`flex ${isEditing === false ? 'flex-col flex-1 space-y-4' : 'flex-row flex-1 space-x-4'} w-full bg-gray-800 p-4 rounded flex-1`}>
                <div className={`algolia-ui-element flex-1 ${gridStyles} w-full `}>
                    <TemplateFactory 
                        templateType="hits"
                        isDraggable={isDraggable}
                        template={template} 
                        fields={fields} 
                        hits={hits} 
                        layoutId={layoutId} 
                        onDrop={onDrop} 
                        dropData={dropData} 
                        analytics={analytics}
                        onItemClick={onItemClick}
                        onMarkExpected={onMarkExpected}
                        onBoostItem={onBoostItem} 
                        onHideItem={onHideItem}
                        queryString={queryString}
                        indexName={indexName}
                        page={page}
                        pendingRules={pendingRules}
                    />
                </div>
            </div>
        )
    }
}

AlgoliaHits.defaultProps = {
    searchClient: null,
    searchResults:[],
    indexName: '',
    layoutId: null,
    query: '',
    templateName: '',
    template: null,
    templateAuthor: '',
    isEditing: true,
    fields: {},
    page: {},
    analytics: null,
    hits: [],
    onDrop(){},
    onMarkExpected(){}, // toggle add/remove from unit test
    onBoostItem(){},
    onHideItem(){},
    dropData: null,
    isDraggable: true,

}
export default AlgoliaHits;