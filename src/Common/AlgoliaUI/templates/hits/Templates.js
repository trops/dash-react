import { Fragment } from 'react';
import ReactMustache from 'react-mustache';
import AlgoliaDropComponent from '../../drag/AlgoliaDropComponent';
import { Tag } from '../../../Tag';
import { ButtonIcon } from '../../../ButtonIcon';
const dot = require('dot-object');

const defaultTemplate = '<div id="default" class=\"flex flex-col p-4 rounded bg-white h-full items-stretch space-y-4 rounded\">\n<div class=\"flex flex-col items-center justify-center p-4 bg-white\">\n    <img src={{image_link}} class=\"flex w-full h-full bg-white\" />\n</div>\n<div class=\"flex flex-col bg-white p-4\">\n<div class=\"text-base font-bold text-gray-800\">{{title}}</div>\n<div class=\"text-xs text-gray-600 truncate\">{{description}}</div>\n<div class=\"flex flex-row justify-between\">\n    <span class=\"font-bold\">${{price}}</span><span class=\"font-bold\">{{available}}</span>\n</div>\n</div>\n</div>';
/**
 * HitsTemplateComponent
 * 
 * - Connected to Algolia
 * - Pass in the template fields pulled from the template in the template editor component
 * - Pass in the name of the Template to render merged with the fields (algolia) selected
 * 
 * @param 
 * @returns 
 */

const translateTemplateVariables = (attributeMap = {}, hit) => {
    try {
        const translatedHit = Object.assign({}, hit);
        Object.keys(attributeMap).length > 0 && Object.keys(attributeMap).forEach(field => {
            //console.log('FIELD + MAP: ', field, attributeMap);
            const translatedFieldValue = attributeMap[field];
            //console.log('translated field ', translatedFieldValue);
            // we have to translate the dot notation here. 
            const hitValue = dot.pick(translatedFieldValue, hit);//.split('.').reduce((o,i)=> o[i], hit);
            //console.log('VALUE: ', hitValue, field);
            translatedHit[field] = hitValue;//hit[translatedFieldValue];
        });

        //console.log(translatedHit);
        return translatedHit;
    } catch (e) {
        return hit;
    }
}

const isProposedPin = (hit, pendingRules) => {
    try {

        let proposed = false;
        pendingRules.forEach(rule => {
            if('promote' in rule['consequence']) { 
                rule['consequence']['promote'].forEach(p => {
                    if (hit['objectID'] === p['objectID']) {
                        proposed = true;
                    }
                });
            }
        });

        return proposed;

    } catch(e) {
        return false;
    }
}

const isProposedHide = (hit, pendingRules) => {
    try {

        let proposed = false;
        pendingRules.forEach(rule => {
            if('hide' in rule['consequence']) { 
                rule['consequence']['hide'].forEach(p => {
                    if (hit['objectID'] === p['objectID']) {
                        proposed = true;
                    }
                });
            }
        });

        return proposed;

    } catch(e) {
        return false;
    }
}

const HitsTemplateComponent = ({ hits, fields = [], limit, template = defaultTemplate, layoutId, isDraggable = false, onDrop = null, dropData, analytics, onItemClick, onMarkExpected, onBoostItem, onHideItem, queryString, indexName, pendingRules }) => {
    try {
        const data = limit === null ? hits : hits.slice(0, limit);
        return data && fields && data.map((hit, index) => {

            // translate the fields the user entered into the actual values from the algolia hit
            const translatedHit = translateTemplateVariables(fields, hit);
            // todo
            const mustacheTemplate = template !== null ? template : defaultTemplate;
            const parsedTemplate = typeof mustacheTemplate !== 'string' ? JSON.stringify(mustacheTemplate) : mustacheTemplate;

            // we have to translate the object to push the values for the template fields
            // so that when pushed to the template the ALGOLIA values will be used.

            // check to see if this item had been pinned
            const rankingInfo = '_rankingInfo' in hit ? hit['_rankingInfo'] : null;
            const promoted = rankingInfo !== null 
                ? ('promoted' in rankingInfo ? true : false)
                : false;
            const promotedFromReRanking = rankingInfo !== null 
                ? ('promotedByReRanking' in rankingInfo ? true : false)
                : false;
            
            const isPendingPin = isProposedPin(hit, pendingRules);
            const isPendingHide = isProposedHide(hit, pendingRules);

            const analyticsForHit = analytics ? (hit.objectID in analytics ? analytics[hit.objectID] : null) : null;
            try {
                return isDraggable === true && isPendingHide === false ? ( 
                    <AlgoliaDropComponent key={`template-${hit.objectID}-${layoutId}`} id={hit.objectID} type={layoutId} onDropItem={onDrop} hitIndex={index} promoted={promoted}>
                        <div className='flex flex-col flex-1 w-full space-y-2 rounded overflow-hidden p-2'>
                            
                            <div className='flex flex-col w-full min-h-lg h-full'>
                                <div className="relative h-full flex flex-col flex-1">
                                    <ReactMustache Component="div" key={hit.objectID} template={parsedTemplate} data={translatedHit} />
                                    <div className="absolute inset-0 flex justify-start items-start z-10 w-full  rounded p-2 m-2 opacity-75 space-x-2 overflow-hidden">
                                        {promoted && <Tag text="Pinned" />}
                                        {promotedFromReRanking && <Tag text="Re-Ranked" color={'bg-red-600'} />}
                                        {isPendingPin && <Tag text="Pending Pin" color="bg-yellow-600" />}
                                        {isPendingHide && <Tag text="Pending Hide" color="bg-red-600" />}
                                    </div>
                                </div>
                            </div>
                            {/* footer */}
                            <div className='flex flex-col space-y-2 h-full justify-end'>
                                {analyticsForHit !== null && (
                                    <div className="flex flex-row justify-start items-start z-10 w-full h-full rounded space-x-2 cursor-pointer">
                                        <Fragment>
                                            <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                                <p>Count</p>
                                                <p className="text-lg font-bold">{analyticsForHit['count']}</p>
                                            </div>
                                            <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                                <p>CTR</p>
                                                <p className="text-lg font-bold">{analyticsForHit['clickThroughRate'] || 'NA'}</p>
                                            </div>
                                            <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                                <p>CR</p>
                                                <p className="text-lg font-bold">{analyticsForHit['conversionRate'] || 'NA'}</p>
                                            </div>
                                        </Fragment>
                                    </div>
                                )}
                                {/* <div className='flex flex-row space-x-2 hidden'>
                                    <ButtonIcon icon="check" text="Expected" bgColor='bg-gray-900' block onClick={() => onMarkExpected({ objectId: hit.objectID, queryString, position: hit.__position, indexName })}/>
                                    <ButtonIcon icon="rocket" text="Boost Similar" bgColor='bg-gray-900' block />
                                    <ButtonIcon icon="info-circle" text="Details" bgColor='bg-gray-900' block
                                        onClick={() => onItemClick({ hit, fields, limit, template, layoutId, isDraggable, onDrop, dropData, analytics, onItemClick })}
                                    />
                                </div> */}
                                <div className='flex flex-row space-x-2'>
                                    <ButtonIcon icon="check" text="" bgColor='bg-gray-900' hoverBackgroundColor='hover:bg-green-500' block 
                                        onClick={() => onMarkExpected({ objectId: hit.objectID, queryString, position: hit.__position, indexName })}
                                    />
                                    {/* <ButtonIcon icon="rocket" text="" bgColor='bg-gray-900' block 
                                        onClick={() => onBoostItem({ hit, fields, limit, template, layoutId, isDraggable, onDrop, dropData, analytics, onItemClick })}
                                    /> */}
                                    <ButtonIcon icon="info-circle" text="" bgColor='bg-gray-900' block
                                        onClick={() => onItemClick({ hit, fields, limit, template, layoutId, isDraggable, onDrop, dropData, analytics, onItemClick })}
                                    />
                                    <ButtonIcon icon="xmark" text="" bgColor='bg-gray-900' hoverBackgroundColor='hover:bg-red-500' block
                                        onClick={() => onHideItem({ hit, fields, limit, template, layoutId, isDraggable, onDrop, dropData, analytics, onItemClick })}
                                    />
                                </div>
                            </div>
                        </div>

                    </AlgoliaDropComponent>
                ) : (
                   
                    
                    <div className='flex flex-col flex-1 w-full space-y-2 rounded overflow-hidden p-2'>
                        
                        <div className='flex flex-col w-full min-h-lg h-full'>
                            <div className="relative h-full flex flex-col flex-1">
                                <ReactMustache Component="div" key={hit.objectID} template={parsedTemplate} data={translatedHit} />
                                <div className="absolute inset-0 flex justify-start items-start z-10 w-full  rounded p-2 m-2 opacity-75 space-x-2 overflow-hidden">
                                    {promoted && <Tag text="Pinned" />}
                                    {promotedFromReRanking && <Tag text="Re-Ranked" color={'bg-red-600'} />}
                                    {isPendingPin && <Tag text="Pending Pin" color="bg-yellow-600" />}
                                    {isPendingHide && <Tag text="Pending Hide" color="bg-red-600" />}
                                </div>
                            </div>
                        </div>
                        {/* footer */}
                        <div className='flex flex-col space-y-2 h-full justify-end'>
                            {analyticsForHit !== null && (
                                <div className="flex flex-row justify-start items-start z-10 w-full h-full rounded space-x-2 cursor-pointer">
                                    <Fragment>
                                        <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                            <p>Count</p>
                                            <p className="text-lg font-bold">{analyticsForHit['count']}</p>
                                        </div>
                                        <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                            <p>CTR</p>
                                            <p className="text-lg font-bold">{analyticsForHit['clickThroughRate'] || 'NA'}</p>
                                        </div>
                                        <div className='flex-col w-full h-full p-2 items-center justify-center bg-gray-900 text-gray-200 text-sm text-center rounded'>
                                            <p>CR</p>
                                            <p className="text-lg font-bold">{analyticsForHit['conversionRate'] || 'NA'}</p>
                                        </div>
                                    </Fragment>
                                </div>
                            )}
                            {/* <div className='flex flex-row space-x-2 hidden'>
                                <ButtonIcon icon="check" text="Expected" bgColor='bg-gray-900' block onClick={() => onMarkExpected({ objectId: hit.objectID, queryString, position: hit.__position, indexName })}/>
                                <ButtonIcon icon="rocket" text="Boost Similar" bgColor='bg-gray-900' block />
                                <ButtonIcon icon="info-circle" text="Details" bgColor='bg-gray-900' block
                                    onClick={() => onItemClick({ hit, fields, limit, template, layoutId, isDraggable, onDrop, dropData, analytics, onItemClick })}
                                />
                            </div> */}
                            <div className='flex flex-row space-x-2'>
                                {/* <ButtonIcon icon="check" text="" bgColor='bg-gray-900' hoverBackgroundColor='hover:bg-gray-700' block />
                                <ButtonIcon icon="rocket" text="" bgColor='bg-gray-900' block hoverBackgroundColor='hover:bg-gray-700'/>
                                <ButtonIcon icon="info-circle" text="" bgColor='bg-gray-900' block hoverBackgroundColor='hover:bg-gray-700'/>
                                <ButtonIcon icon="xmark" text="" bgColor='bg-gray-900' hoverBackgroundColor='hover:bg-gray-700' block/> */}
                            </div>
                        </div>
                    </div>

              

                );
            } catch(e) {
                return null;
            }
        });
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const CarouselTemplateComponent = ({ hits, fields = [], limit, template, layoutId, isDraggable = false, onDrop, dropData, analytics}) => {
    try {
        const data = limit === null ? hits : hits.slice(0,limit);
        return data && fields && data.map((hit, index) => {
            // translate the fields the user entered into the actual values from the algolia hit
            const translatedHit = translateTemplateVariables(fields, hit);
            const mustacheTemplate = template !== null ? template : defaultTemplate;
            const parsedTemplate = typeof mustacheTemplate !== 'string' ? JSON.stringify(mustacheTemplate) : mustacheTemplate;
            const promoted = 'promoted' in hit['_rankingInfo'];
            const isDropped = isProposedPin(hit, dropData);
            const analyticsForHit = analytics !== null ? (hit.objectID in analytics ? analytics[hit.objectID] : null) : null;
            // we have to translate the object to push the values for the template fields
            // so that when pushed to the template the ALGOLIA values will be used.
            try {
                return isDraggable === true ? ( 
                    <div class="flex flex-col rounded h-full items-stretch rounded max-w-xl justify-between flex-shrink-0 w-1/4 h-full">
                        <AlgoliaDropComponent key={hit.objectID} id={hit.objectID} type={layoutId} onDropItem={onDrop} hitIndex={index} promoted={promoted}>
                            <div className="flex flex-col justify-start items-start z-10  h-full rounded opacity-75 space-x-2">
                                {analyticsForHit !== null && (
                                    <Fragment>
                                        <Tag text={`CTR ${analyticsForHit['clickThroughRate']}`} color="bg-green-600" />
                                        <Tag text={`CR ${analyticsForHit['conversionRate']}`} color="bg-green-600" />
                                    </Fragment>
                                )}
                            </div>
                            <div className="relative h-full flex-grow flex flex-col w-full">
                                <ReactMustache Component="div" key={hit.objectID} template={parsedTemplate} data={translatedHit} />
                                <div className="absolute inset-0 flex justify-start items-start z-10 w-full h-full rounded p-4 m-4 mt-8 opacity-75 space-x-2 min-w-lg">
                                    {promoted && <Tag text="Pinned" />}
                                    {isDropped && <Tag text="Pending Pin" color="bg-yellow-600" />}
                                </div>
                            </div>
                        </AlgoliaDropComponent>
                    </div>
                ) : (
                    <ReactMustache Component="div" key={hit.objectID} template={parsedTemplate} data={translatedHit} />
                );
            } catch(e) {
                console.log(e.message);
                return null;
            }
        });
    } catch(e) {
        console.log(e.message);
        return null;
    }
};

export {
    CarouselTemplateComponent,
    HitsTemplateComponent,
}