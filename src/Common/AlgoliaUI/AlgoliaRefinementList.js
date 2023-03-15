import React from "react";
import { useRefinementList } from "react-instantsearch-hooks-web";
import { Tag } from "../Tag";

export const AlgoliaRefinementsList = (props) => {
    // return null;
    const { attribute } = props;
    console.log("attribute ", attribute);
    const { items, refine } = useRefinementList({
        attribute: "tags",
        ...props,
    });
    return (
        attribute &&
        attribute !== "" && (
            <ul className="flex flex-col space-y-1 w-full flex-grow">
                {items.map((item) => (
                    <li
                        key={item.label}
                        className="px-2 py-1 cursor-pointer hover:text-indigo-600 hover:bg-gray-800 rounded justify-between flex flex-row xl:flex-row w-full"
                        onClick={(event) => {
                            event.preventDefault();
                            refine(item.value);
                        }}
                    >
                        <span
                            className={`text-sm text-gray-300 hover:text-indigo-500 ${
                                item.isRefined && "font-bold text-green-500"
                            }`}
                        >
                            {item.label}
                        </span>
                        <Tag
                            text={item.count}
                            color="bg-gray-700"
                            textSize="text-xs"
                        />
                    </li>
                ))}
            </ul>
        )
    );
};
