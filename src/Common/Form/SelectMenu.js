import React, { Fragment } from "react";

export const SelectMenu = ({
    name,
    onChange,
    selectedValue,
    children,
    textSize = "text-base 2xl:text-lg",
    bgColor = "bg-gray-300",
    textColor = "text-gray-600",
}) => (
    <select
        className={`p-2 rounded ${textSize} ${textColor} font-bold ${bgColor} focus:outline-none cursor-pointer min-w-lg w-full`}
        name={name}
        onChange={onChange}
        value={selectedValue}
    >
        {children}
    </select>
);
