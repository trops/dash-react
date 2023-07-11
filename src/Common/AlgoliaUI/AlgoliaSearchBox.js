import React, { useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { InputText } from "@dash";
import { Widget } from "@dash/Widget";

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
        <Widget>
            <InputText
                type="search"
                value={currentRefinement}
                onChange={(event) => refine(event.currentTarget.value)}
                disabled={disabled}
                placeholder="Search"
            />
        </Widget>
    );
};
