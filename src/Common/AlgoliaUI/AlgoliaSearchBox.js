import React, { useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { InputText } from "@dash";
import { LayoutContainer } from "@dash/Layout";

export const AlgoliaSearchBox = ({
    id,
    placeholder = "Search",
    disabled = false,
    onQueryChange = null,
    ...props
}) => {
    const { currentRefinement, refine, queryHook, query } = useSearchBox(props);

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
