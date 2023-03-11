import React from "react";
import { useCurrentRefinements } from "react-instantsearch-hooks-web";
import { Tag } from "../Tag";

const AlgoliaCurrentRefinements = (props) => {
    const { items } = useCurrentRefinements(props);
    return (
        <ul className="flex flex-row space-x-2">
            {items.map((item) => {
                return (
                    <li key={item.label}>
                        {item.refinements ? (
                            <React.Fragment>
                                <ul className="flex flex-row space-x-2 text-xs">
                                    <span className="text-gray-300">
                                        {item.label}
                                    </span>
                                    {item.refinements.map((nested) => (
                                        <Tag
                                            key={`current-nested-${nested.label}`}
                                            text={nested.label}
                                            color="bg-green-700"
                                            textSize="text-xs"
                                        />
                                    ))}
                                </ul>
                            </React.Fragment>
                        ) : (
                            <Tag
                                text={item.label}
                                color="bg-indigo-900"
                                textSize="text-xs"
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default AlgoliaCurrentRefinements;
