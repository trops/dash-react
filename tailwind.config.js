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
        variants: ["hover"],
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
        variants: ["hover"],
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
    },
    {
        pattern: /border-(.+)-(.+)/,
        variants: ["hover"],
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
        },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
