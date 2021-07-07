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
    const ipt = params.get("input") || params.get("default");
    const input = Array.isArray(ipt) ? ipt[0] : ipt;
    let output = params.get("output") || (Array.isArray(ipt) ? ipt[1] : "");
    const currentPath = Path.resolve("./");
    console.log("command dir：", currentPath);
    console.log("entry：", input);
    if (!Fs.existsSync(input)) {
        throw new Error(`entry：${input} is not exists`);
    }
    const fileDir = Path.dirname(input);
    // 默认输出文件名为输入文件名.min.js
    if (!output) {
        output = Path.resolve(fileDir, Path.basename(input, ".js") + ".min.js");
        console.log("default output path：", output);
    }
    const babelRcPathFrom = Path.resolve(__dirname, "../.babelrc");
    const babelRcPathTo = Path.resolve(fileDir, ".babelrc");
    const isExistBabelRc = Fs.existsSync(babelRcPathTo);
    const libraryName = params.get("libraryName") || String(Date.now());
    const plugins = [];
    try {
        if (params.has("terser")) {
            plugins.push(rollup_plugin_terser_1.terser());
        }
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
        // console.log(outputs[0].code);
    }
    finally {
        if (params.has("babel") && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
})();
