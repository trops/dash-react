import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import autoprefixer from "autoprefixer";
import external from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";

const INPUT_FILE_PATH = "src/index.js";
const OUTPUT_NAME = "Dash";

const GLOBALS = {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
    window: "window",
};

const PLUGINS = [
    external({
        includeDependencies: true,
    }),
    postcss({
        extract: true,
        plugins: [autoprefixer],
    }),
    babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
        skipPreflightCheck: true,
    }),
    resolve({
        browser: true,
        extensions: [".cjs", ".js", ".jsx", ".json", ".ts", ".tsx", ".css"],
        /*resolveOnly: [
      /^(?!react$)/,
      /^(?!react-dom$)/,
      /^(?!prop-types)/,
    ],
  }*/
    }),
    commonjs({
        include: "node_modules/**",
    }),
    filesize(),
    typescript({ sourceMap: true, rootDir: "./src" }),
];

const EXTERNAL = ["react", "react-dom", "prop-types"];

// https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
const CJS_AND_ES_EXTERNALS = EXTERNAL.concat(/@babel\/runtime/);

const OUTPUT_DATA = [
    // {
    //   file: pkg.browser,
    //   format: 'umd',
    // },
    {
        file: pkg.main,
        format: "cjs",
    },
    {
        file: pkg.module,
        format: "es",
    },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
    input: INPUT_FILE_PATH,
    output: {
        dir: "dist",
        // preserveModules: true, // indicate not create a single-file
        // preserveModulesRoot: 'src',
        sourcemap: true,
        //file,
        //dir: "dist",
        format,
        name: OUTPUT_NAME,
        globals: GLOBALS,
        // exports: "named"
    },
    plugins: PLUGINS,
    external: ["cjs", "es"].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
}));

export default config;
