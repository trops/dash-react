const tailwindColors = require("./node_modules/tailwindcss/colors");
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
    "lightBlue",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
];

for (const colorName in tailwindColors) {
    if (deprecated.includes(colorName)) {
        continue;
    }

    // Define all of your desired shades
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    const pallette = tailwindColors[colorName];

    if (typeof pallette === "object") {
        shades.forEach((shade) => {
            if (shade in pallette) {
                colorSafeList.push(`text-${colorName}-${shade}`);
                colorSafeList.push(`hover:text-${colorName}-${shade}`);
                colorSafeList.push(`placeholder:text-${colorName}-${shade}`);
                colorSafeList.push(`scrollbar-thumb-${colorName}-${shade}`);
                colorSafeList.push(`scrollbar-track-${colorName}-${shade}`);
            }
        });
    }
}

// console.log(colorSafeList);

const newSafeList = colorSafeList.concat([
    {
        pattern: /bg-(.+)-(.+)/,
        variants: ["hover", "active", "disabled"],
    },
    {
        pattern: /animate-(.+)/,
    },
    {
        pattern: /top-(.+)/,
    },
    {
        pattern: /left-(.+)/,
    },
    {
        pattern: /right-(.+)/,
    },
    {
        pattern: /bottom-(.+)/,
    },
    {
        pattern: /text-(.+)/,
        variants: ["hover"],
    },
    {
        pattern: /text-(.+)-(.+)/,
        variants: ["hover", "active"],
    },
    {
        pattern: /font-(.+)/,
    },
    {
        pattern: /p-(.+)/,
    },
    {
        pattern: /z-(.+)/,
    },
    {
        pattern: /pt-(.+)/,
    },
    {
        pattern: /px-(.+)/,
        variants: ["lg", "xl", "2xl"],
    },
    {
        pattern: /py-(.+)/,
        variants: ["lg", "xl", "2xl"],
    },
    {
        pattern: /pb-(.+)/,
    },
    {
        pattern: /pl-(.+)/,
    },
    {
        pattern: /pr-(.+)/,
    },
    {
        pattern: /p-(.+)-(.+)/,
    },
    {
        pattern: /m-(.+)-(.+)/,
    },
    {
        pattern: /mt-(.+)/,
    },
    {
        pattern: /mb-(.+)/,
    },
    {
        pattern: /ml-(.+)/,
    },
    {
        pattern: /mr-(.+)/,
    },
    {
        pattern: /mx-(.+)/,
    },
    {
        pattern: /my-(.+)/,
    },
    {
        pattern: /h-(.+)/,
    },
    {
        pattern: /w-(.+)/,
    },
    {
        pattern: /flex-(.+)/,
    },
    {
        pattern: /min-(.+)-(.+)/,
    },
    {
        pattern: /min-h-(.+)/,
    },
    {
        pattern: /max-(.+)-(.+)/,
    },
    {
        pattern: /border-(.+)/,
        variants: ["hover"],
    },
    {
        pattern: /opacity-(.+)/,
        variants: ["disabled"],
    },
    {
        pattern: /border-(.+)-(.+)/,
        variants: ["hover", "focus-visible"],
    },
    {
        pattern: /space-(.+)-(.+)/,
    },
    {
        pattern: /justify-(.+)/,
    },
    {
        pattern: /items-(.+)/,
    },
    {
        pattern: /grid-(.+)-(.+)/,
        variants: ["lg", "xl", "2xl", "3xl"],
    },
    {
        pattern: /translate-(.+)-(.+)/,
    },
    {
        pattern: /scale-(.+)-(.+)/,
    },
    {
        pattern: /scale-(.+)/,
    },
    {
        pattern: /to-(.+)-(.+)/,
    },
    {
        pattern: /from-(.+)-(.+)/,
    },
    {
        pattern: /row-span-(.+)/,
    },
    {
        pattern: /col-span-(.+)/,
    },
    // Design Token Patterns (v0.2.0+)
    {
        pattern: /shadow-(none|sm|md|lg|xl|inner)/,
        variants: ["hover"],
    },
    {
        pattern: /rounded-(none|sm|md|lg|xl|full)/,
    },
    {
        pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/,
        variants: ["lg", "xl", "2xl"],
    },
    {
        pattern: /transition-(all|colors|shadow|transform|opacity)/,
    },
    {
        pattern: /duration-(100|150|200|300|500)/,
    },
    {
        pattern: /shadow/,
        variants: ["hover"],
    },
    {
        pattern: /(bg|text)-opacity-(.+)/,
        variants: ["hover"],
    },
    {
        pattern: /ring-(.+)/,
        variants: ["focus", "focus-visible"],
    },
    {
        pattern: /ring-offset-(.+)/,
        variants: ["focus-visible"],
    },
    {
        pattern: /border/,
        variants: ["focus", "focus-visible"],
    },
    {
        pattern: /pointer-events-(.+)/,
        variants: ["disabled"],
    },
    {
        pattern: /cursor-(.+)/,
        variants: ["disabled"],
    },
    // Typography tokens
    {
        pattern: /tracking-(.+)/,
    },
    {
        pattern: /leading-(.+)/,
    },
    {
        pattern: /backdrop-blur-(none|sm|md|lg|xl)/,
    },
    {
        pattern: /gap-(0|1|2|3|4|6|8|12|16)/,
    },
]);

module.exports = {
    safelist: newSafeList,
    important: true,
    darkMode: "class",
    content: ["./src/**/*.js"],
    theme: {
        extend: {
            padding: {
                "1/2": "50%",
                "1/5": "20%",
                full: "100%",
            },
            // Dark mode shadows (v0.2.0+)
            boxShadow: {
                "sm-dark": "0 1px 2px 0 rgba(255, 255, 255, 0.05)",
                "md-dark": "0 4px 6px -1px rgba(255, 255, 255, 0.1)",
                "lg-dark": "0 10px 15px -3px rgba(255, 255, 255, 0.1)",
            },
        },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
