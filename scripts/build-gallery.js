#!/usr/bin/env node
/**
 * Build the design guide's live gallery (docs/design-guide.html):
 *   docs/gallery/dist/gallery.js   — React + the real dash-react components
 *   docs/gallery/dist/gallery.css  — Aurora + the Tailwind utilities they use
 *
 * Stories import src/Mock; the gallery swaps in docs/gallery/mock.js so each
 * preview renders in the frame's mode (dark or light). The Algolia components
 * are stubbed (they need a live index, and AlgoliaSearchBox imports the
 * ambiguous root InputText), and CSS imports are dropped — the gallery has its
 * own stylesheet.
 */
const path = require("path");
const { execFileSync } = require("child_process");
const esbuild = require("esbuild");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "docs/gallery/dist");
const realMock = path.join(root, "src/Mock/index.js");
const galleryMock = path.join(root, "docs/gallery/mock.js");

const stubAlgolia = {
    name: "gallery-stub-algolia",
    setup(build) {
        build.onResolve({ filter: /AlgoliaUI$/ }, () => ({
            path: "algolia-stub",
            namespace: "gallery",
        }));
        build.onLoad(
            { filter: /^algolia-stub$/, namespace: "gallery" },
            () => ({
                contents:
                    "export const AlgoliaSearchBox = () => null; export const AlgoliaRefinementList = () => null;",
                loader: "js",
            })
        );
    },
};

const swapMock = {
    name: "gallery-mock",
    setup(build) {
        build.onResolve({ filter: /Mock$/ }, (args) => {
            const p = args.path.startsWith("@dash/")
                ? path.join(root, "src", args.path.slice(6))
                : path.resolve(args.resolveDir, args.path);
            return path.join(p, "index.js") === realMock ||
                p + ".js" === realMock
                ? { path: galleryMock }
                : null;
        });
    },
};

async function main() {
    await esbuild.build({
        entryPoints: [path.join(root, "docs/gallery/gallery.jsx")],
        outfile: path.join(out, "gallery.js"),
        bundle: true,
        minify: true,
        format: "iife",
        target: ["es2020"],
        jsx: "automatic",
        loader: { ".js": "jsx", ".css": "empty" },
        alias: { "@dash": path.join(root, "src") },
        define: { "process.env.NODE_ENV": '"production"' },
        plugins: [swapMock, stubAlgolia],
        logLevel: "warning",
    });
    execFileSync(
        path.join(root, "node_modules/.bin/tailwindcss"),
        [
            "-c",
            path.join(root, "docs/gallery/tailwind.gallery.config.js"),
            "-i",
            path.join(root, "docs/gallery/gallery.css"),
            "-o",
            path.join(out, "gallery.css"),
            "--minify",
        ],
        { cwd: root, stdio: "inherit" }
    );
    console.log("Built docs/gallery/dist/gallery.js and gallery.css");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
