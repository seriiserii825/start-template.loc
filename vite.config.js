import {defineConfig} from "vite";
import liveReload from "vite-plugin-live-reload";
import vue from "@vitejs/plugin-vue";
// import { chunkSplitPlugin } from "vite-plugin-chunk-split";
const {resolve} = require("path");
const fs = require("fs");
const path = require("path");
// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        vue(),
        liveReload([
            __dirname + "/**/*.pug",
            __dirname + "/assets/js/custom-jquery.js",
            __dirname + "/style.css"
        ]),
    ],
    // config
    root: "",
    base: process.env.NODE_ENV === "development" ? "/" : "/dist/",
    build: {
        // output dir for production build
        outDir: resolve(__dirname, "./dist"),
        emptyOutDir: true,
        // emit manifest so PHP can find the hashed files
        // manifest: true,
        manifest: false,
        // esbuild target
        target: "esnext",
        // our entry
        rollupOptions: {
            input: {
							main: resolve(__dirname + "main.js"),
            },
            output: {
                entryFileNames: `[name]-build.js`,
                chunkFileNames: `[name]-build.js`,
                assetFileNames: `[name]-build.[ext]`,
            },
        },
        // minifying switch
        minify: true,
        write: true,
    },
    css: {
        devSourcemap: true,
    },
    server: {
        // required to load scripts from custom host
        cors: true,
        // we need a strict port to match on PHP side
        // change freely, but update in your functions.php to match the same port
        strictPort: true,
        port: 3000,
        https: false,
        hmr: {
            host: "localhost",
            //port: 443
        },
    },
    resolve: {
        alias: {
            // vue: 'vue/dist/vue.esm-bundler.js'
            // "@": path.resolve(__dirname, "./src"),
        },
    },
});

