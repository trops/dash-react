import React, { useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { InputText } from "@dash";
import { LayoutContainer } from "@dash/Layout";

export const AlgoliaSearchBox = ({ id, props, onQueryChange = null }) => {
    const {
        currentRefinement,
        refine,
        disabled = false,
        queryHook,
        query,
    } = useSearchBox(props);

    useEffect(() => {
        onQueryChange && onQueryChange(query);
    }, [query]);

    return (
        <LayoutContainer grow={false} scrollable={false} space={false}>
            <InputText
                type="search"
                value={currentRefinement}
                onChange={(event) => refine(event.currentTarget.value)}
                disabled={disabled}
                placeholder="Search"
            />
        </LayoutContainer>
    );
};
