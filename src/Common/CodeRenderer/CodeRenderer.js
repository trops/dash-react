import React, { Component } from "react";
import ReactMustache from "react-mustache";
// const Mustache = require("mustache");
import Mustache from "mustache";

export const CodeRenderer = ({ template, data, Component = "div" }) => {
    const parsedTemplate =
        typeof template !== "string" ? JSON.stringify(template) : template;

    // function renderTemplate(parsedTemplate) {
    //     try {
    //         return (
    //             <ReactMustache
    //                 Component="div"
    //                 template={parsedTemplate}
    //                 data={data}
    //             />
    //         );
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // return renderTemplate(parsedTemplate);

    function compileTemplate(template, data) {
        try {
            // lazy template compiling
            const __html = Mustache.render(template, data);
            return <Component dangerouslySetInnerHTML={{ __html }} />;
        } catch (e) {
            console.log(e);
            return (
                <Component
                    dangerouslySetInnerHTML={{ __html: "One moment please" }}
                />
            );
        }
    }

    return compileTemplate(parsedTemplate, data);
};
