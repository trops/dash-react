// Tailwind for the design guide's live gallery: dash-react's own config,
// minus preflight (the guide page keeps its own type) and with a safelist of
// only the color classes the gallery's mock theme generates — the full
// package safelist makes a 28 MB stylesheet.
const base = require("../../tailwind.config.js");

const families = "gray|blue|indigo|violet|purple|emerald|amber|red|sky|slate";
const shades = "50|100|200|300|400|500|600|700|800|900|950";

module.exports = {
    ...base,
    content: ["./src/**/*.js", "./docs/gallery/**/*.{js,jsx}"],
    corePlugins: { preflight: false },
    safelist: [
        {
            pattern: new RegExp(`^(bg|text|border)-(${families})-(${shades})$`),
            variants: ["hover"],
        },
        "bg-transparent",
        "border-transparent",
        "hover:bg-transparent",
        "hover:border-transparent",
        "hover:text-transparent",
    ],
};
