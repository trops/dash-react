import React, { useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

const AlgoliaSearchBox = ({ props, onQueryChange = null }) => {
    const { currentRefinement, refine, disabled = false, queryHook, query } = useSearchBox(props);
    
    useEffect(() => {
        onQueryChange && onQueryChange(query);
    }, [query]);

    return (
        <div className="flex flex-row w-full min-h-fit">
            <input
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                className={`${disabled === true && 'bg-gray-400'} flex flex-row flex-1 w-full h-20 p-2 2xl:p-4 text-base 2xl:text-lg rounded text-indigo-800 font-bold bg-gray-200 dark:bg-indigo-300 focus:outline-none`}
                placeholder="Search"
                disabled={disabled}
            />
        </div>
    );
}

export default AlgoliaSearchBox;