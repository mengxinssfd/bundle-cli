"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_babel_1 = require("@rollup/plugin-babel");
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
const uglify_js_1 = require("uglify-js");
const { uglify } = require("rollup-plugin-uglify");
const resolve = require("rollup-plugin-node-resolve");
const rollup = require("rollup");
const Path = require("path");
const Fs = require("fs");
async function bundleStart(option) {
    if (!option.input || !Fs.existsSync(option.input)) {
        throw new Error(`entry: ${option.input} is not exists`);
    }
    const fileDir = Path.dirname(option.input);
    const babelRcPathTo = Path.resolve(fileDir, ".babelrc");
    // 默认输出文件名为输入文件名.min.js
    if (!option.output) {
        option.output = Path.resolve(fileDir, Path.basename(option.input, ".js") + ".min.js");
        console.log("default output path: ", option.output);
    }
    const isExistBabelRc = Fs.existsSync(babelRcPathTo);
    const plugins = [];
    try {
        // 压缩
        if (option.terser) {
            plugins.push(rollup_plugin_terser_1.terser());
        }
        // babel
        if (option.babel) {
            plugins.unshift(plugin_babel_1.default({
                extensions: [".js"],
                exclude: "node_modules/*",
                babelHelpers: "bundled",
            }));
            plugins.unshift(resolve());
            if (!isExistBabelRc) {
                const envPath = Path.resolve(__dirname, "../node_modules/@babel/preset-env");
                console.log("env path: ", envPath);
                const tpl = `{"presets": [["${envPath}", {"modules": false, "loose": true}]]}`;
                Fs.writeFileSync(babelRcPathTo, tpl.replace(/\\/g, "/"));
            }
        }
        // uglify-js 包含terser和babel的效果
        if (option.uglify) {
            plugins.unshift(uglify({}, uglify_js_1.minify));
        }
        const rs = await rollup.rollup({
            input: option.input,
            plugins,
        });
        const { output: outputs } = await rs.write({
            name: option.libraryName,
            file: option.output,
            format: "umd",
            sourcemap: false,
        });
        // console.log(outputs[0].code);
    }
    finally {
        if (option.babel && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
}
exports.default = bundleStart;
