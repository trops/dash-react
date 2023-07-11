import React, { useContext, useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { InputText } from "@dash";
import { LayoutContainer } from "@dash/Layout";
import { WorkspaceContext, WidgetContext } from "@dash/Context";

export const AlgoliaSearchBox = ({
    id,
    placeholder = "Search",
    disabled = false,
    onQueryChange = null,
    ...props
}) => {
    const { currentRefinement, refine, queryHook, query } = useSearchBox(props);
    const { workspaceData } = useContext(WorkspaceContext);
    const { widgetData } = useContext(WidgetContext);
    console.log("ws data", workspaceData, widgetData);

    useEffect(() => {
        onQueryChange && onQueryChange(query);
    }, [query]);

    return (
        <LayoutContainer height="" grow={false} space={false}>
            <InputText
                type="search"
                value={currentRefinement}
                onChange={(event) => refine(event.currentTarget.value)}
                disabled={disabled}
                placeholder={placeholder}
            />
        </LayoutContainer>
    );
};
