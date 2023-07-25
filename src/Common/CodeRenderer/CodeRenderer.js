import React, { Component } from "react";
import ReactMustache from "react-mustache";
// const Mustache = require("mustache");
import Mustache from "mustache";

export const CodeRenderer = ({ template, data, Component = "div" }) => {
    const parsedTemplate =
        typeof template !== "string" ? JSON.stringify(template) : template;

    /**
     * sanitize any args, params that need to be updated/translated
     */
    function sanitizeTemplate(template) {
        // remove the escaped double quotes if any
        const t = template.replace(/\\"/g, '"');
        return translateClassName(t);
    }

    function translateClassName(template) {
        return template.replaceAll("className=", "class=");
    }

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
            console.log(template);
            // lazy template compiling
            const __html = Mustache.render(sanitizeTemplate(template), data);
            console.log(__html);
            return <Component dangerouslySetInnerHTML={{ __html }} />;
        } catch (e) {
            console.log(e);
            return (
                <Component
                    dangerouslySetInnerHTML={{
                        __html: sanitizeTemplate(
                            '<div className="text-red-600 font-bold">Something is wonky...</div>',
                            {}
                        ),
                    }}
                />
            );
        }
    }

    return compileTemplate(parsedTemplate, data);
};
