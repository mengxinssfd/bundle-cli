"use strict";
// tsc src/index.ts --target ES2017 --module commonjs
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const plugin_babel_1 = require("@rollup/plugin-babel");
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
const resolve = require('rollup-plugin-node-resolve');
const rollup = require("rollup");
const Path = require("path");
const Fs = require("fs");
(async function () {
    const params = utils_1.getParams();
    const input = params.has("input") ? params.get("input") : params.get("default")[0];
    let output = params.has("output") ? params.get("output") : params.get("default")[1];
    const currentPath = Path.resolve("./");
    console.log("执行命令所在目录", currentPath);
    console.log("入口", input);
    if (!Fs.existsSync(input)) {
        throw new Error(`入口：${input} 不存在`);
    }
    const fileDir = Path.dirname(input);
    const babelRcPathFrom = Path.resolve(__dirname, "../.babelrc");
    const babelRcPathTo = Path.resolve(fileDir, ".babelrc");
    const isExistBabelRc = Fs.existsSync(babelRcPathTo);
    const libraryName = params.get("libraryName") || String(Date.now());
    const plugins = [rollup_plugin_terser_1.terser()];
    try {
        if (params.has("babel")) {
            plugins.unshift(plugin_babel_1.default({
                extensions: [".js"],
                exclude: "node_modules/*",
                babelHelpers: "bundled",
            }));
            plugins.unshift(resolve());
            !isExistBabelRc && await Fs.copyFileSync(babelRcPathFrom, babelRcPathTo);
        }
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
        if (params.has("babel") && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
})();
