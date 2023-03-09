import { connectHits } from 'react-instantsearch-dom';
import AlgoliaHits from './AlgoliaHits';
import AlgoliaCarousel from './AlgoliaCarousel';
import AlgoliaUILayout from './AlgoliaUILayout';

const AlgoliaUIFactoryConnected = ({ id, templateType, template, templateData, hits, hitsFrozen = null, fields, isEditing, indexName, layoutId, indexId, onDrop, dropData, onClearRules, onSaveRule, analytics = null, isDraggable = true, rules, onItemClick, onMarkExpected, onBoostItem, onHideItem, layoutSplit = false, queryString, page, searchClient, configureParams, pendingRules }) => {

    const liveHits = hitsFrozen !== null ? hitsFrozen : hits;
    switch(templateType) {
        case 'hits':
            return (
                <AlgoliaUILayout hits={liveHits} showSearchState={isEditing} indexName={indexName} layoutId={layoutId} indexId={indexId} dropData={dropData} onClearRules={onClearRules} onSaveRule={onSaveRule} analytics={analytics} rules={rules} page={page} templateData={templateData} fields={fields} searchClient={searchClient} configureParams={configureParams} pendingRules={pendingRules}>
                    <AlgoliaHits id={id} template={template} hits={liveHits} fields={fields} isEditing={isEditing} indexName={indexName} layoutId={layoutId} indexId={indexId} onDrop={onDrop} dropData={dropData} analytics={analytics} isDraggable={isDraggable} onItemClick={onItemClick} layoutSplit={layoutSplit} onMarkExpected={onMarkExpected} queryString={queryString} onBoostItem={onBoostItem} onHideItem={onHideItem} pendingRules={pendingRules} />
                </AlgoliaUILayout>
            );
        case 'carousel':
            return (
                <AlgoliaUILayout hits={liveHits} showSearchState={isEditing} indexName={indexName} layoutId={layoutId} indexId={indexId} dropData={dropData} onClearRules={onClearRules} onSaveRule={onSaveRule} analytics={analytics} rules={rules} page={page} configureParams={configureParams} pendingRules={pendingRules}>
                    <AlgoliaCarousel id={id} template={template} hits={liveHits} fields={fields} isEditing={isEditing} indexName={indexName} layoutId={layoutId} indexId={indexId} dropData={dropData} onDrop={onDrop} analytics={analytics} isDraggable={isDraggable} onItemClick={onItemClick} onMarkExpected={onMarkExpected} queryString={queryString}  onBoostItem={onBoostItem} onHideItem={onHideItem} pendingRules={pendingRules} />
                </AlgoliaUILayout>
            );
        default:
            return null;
    }
}

const AlgoliaUIFactory = connectHits(AlgoliaUIFactoryConnected);

export default AlgoliaUIFactory;