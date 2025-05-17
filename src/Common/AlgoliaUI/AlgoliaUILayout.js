import AlgoliaNoResults from "./AlgoliaNoResults";
// import PageResultPanel from "../../RulesManager/components/pages/PageResultPanel/PageResultPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AlgoliaUILayout({
    hits,
    children,
    layoutId,
    showSearchState,
    indexName,
    indexId,
    dropData,
    onClearRules,
    onSaveRule,
    rules,
    page,
    template,
    templateData,
    fields,
    searchClient,
    configureParams,
}) {
    return hits && hits.length > 0 ? (
        <div
            key={`ui-layout-${layoutId}`}
            className={`flex flex-row ${
                showSearchState === true ? "w-full space-x-4" : "w-full"
            } rounded`}
        >
            {showSearchState === false && (
                <div className="flex flex-row w-full">
                    {/* <div className="flex flex-col p-4 bg-indigo-200 min-w-md w-1/4"> */}
                    {/* <RefinementList attribute="brand" /> */}
                    {/* <AlgoliaMenu attribute="brand" />
                        <AlgoliaMenuAlt attribute="brand" /> */}
                    {/* <AlgoliaMenuSelect attribute="brand" /> */}
                    {/* </div> */}
                    <div className="flex flex-col w-full rounded bg-gray-900 h-full overflow-clip space-x-4">
                        <DndProvider backend={HTML5Backend}>
                            {children}
                        </DndProvider>
                    </div>
                </div>
            )}
            {showSearchState === true && (
                <div className="flex flex-row w-full space-x-4">
                    {/* <div className="flex flex-col p-4 bg-indigo-200 min-w-md"> */}
                    {/* <RefinementList attribute="brand" /> */}
                    {/* <AlgoliaMenuSelect attribute="brand" /> */}
                    {/* </div> */}
                    <div className="flex flex-col w-3/4 rounded bg-gray-900 overflow-clip">
                        <DndProvider backend={HTML5Backend}>
                            {children}
                        </DndProvider>
                    </div>
                    <div className="flex flex-col w-1/4 rounded bg-gray-900 h-full">
                        {/* search state panel */}
                        {/* <PageResultPanel 
                            indexName={indexName} 
                            layoutId={layoutId} 
                            indexId={indexId} 
                            hits={hits} 
                            dropData={dropData} 
                            onClearRules={onClearRules} 
                            onSaveRule={onSaveRule}
                            rules={rules}
                            page={page}
                            template={template}
                            templateData={templateData}
                            fields={fields}
                            searchClient={searchClient}
                            configureParams={configureParams}
                        /> */}
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="p-4">
            <AlgoliaNoResults />
        </div>
    );
}
