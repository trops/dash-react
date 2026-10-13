// A text colour class in `className` (text-red-500, text-white…), as opposed
// to a size or alignment (text-sm, text-center).
const COLOR_CLASS =
    /(^|\s)text-(?!(xs|sm|base|lg|xl|[2-9]xl|left|right|center|justify|start|end|ellipsis|clip|wrap|nowrap|balance|pretty)(\s|$))[a-z]/;
export const hasOwnTextColor = (className = "", textColor = null) =>
    !!textColor || COLOR_CLASS.test(String(className || ""));
