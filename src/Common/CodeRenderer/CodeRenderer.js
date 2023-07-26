import React from "react";
import Mustache from "mustache";

export const CodeRenderer = ({ template, data, Component = "div" }) => {
    const parsedTemplate =
        typeof template !== "string" ? JSON.stringify(template) : template;

    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    /**
     * sanitize any args, params that need to be updated/translated
     */
    function sanitizeTemplate(template) {
        // remove the escaped double quotes if any
        let t = template.replace(/\\"/g, '"');
        t = translateClassName(`${t}`);
        return `${t}`;
    }

    function translateClassName(template) {
        return template.replaceAll("className=", "class=");
    }

    function compileTemplate(template, data) {
        try {
            // lazy template compiling
            const __html = Mustache.render(sanitizeTemplate(template), data);
            console.log(__html);
            return (
                <Component dangerouslySetInnerHTML={{ __html: `${__html}` }} />
            );
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

    return compileTemplate(parsedTemplate, parsedData);
};
