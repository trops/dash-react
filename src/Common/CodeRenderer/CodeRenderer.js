import React from "react";
import ReactMustache from "react-mustache";

export const CodeRenderer = ({ template, data }) => {
    const parsedTemplate =
        typeof template !== "string" ? JSON.stringify(template) : template;
    return (
        <ReactMustache Component="div" template={parsedTemplate} data={data} />
    );
};
