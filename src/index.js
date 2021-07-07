"use strict";
// tsc src/index.ts --target ES2017 --module commonjs
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const plugin_babel_1 = require("@rollup/plugin-babel");
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
const resolve = require('rollup-plugin-node-resolve');
const rollup = require("rollup");
const Path = require("path");
(async function () {
    const params = utils_1.getParams();
    const input = params.has("input") ? params.get("input") : params.get("default")[0];
    let output = params.has("output") ? params.get("output") : params.get("default")[1];
    const currentPath = Path.resolve("./");
    console.log("执行命令所在目录", currentPath);
    console.log("入口", input);
    const libraryName = params.get("libraryName") || 'utils';
    const plugins = [rollup_plugin_terser_1.terser()];
    if (params.has("babel")) {
        plugins.unshift(plugin_babel_1.default({
            extensions: [".js"],
            exclude: "node_modules/*",
            babelHelpers: "bundled",
            plugins: []
        }));
        plugins.unshift(resolve());
    }
    try {
        const rs = await rollup.rollup({
            input,
            plugins
        });
        const { output: outputs } = await rs.write({
            name: libraryName,
            file: output,
            format: 'umd',
            sourcemap: false,
        });
        console.log(outputs[0].code);
    }
    finally {
    }
})();
