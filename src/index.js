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
        option.output = Path.resolve(fileDir, Path.basename(option.input, Path.extname(option.input)) + ".min.js");
        console.log("default output path: ", option.output);
    }
    const isExistBabelRc = Fs.existsSync(babelRcPathTo);
    const plugins = [];
    try {
        const isTs = Path.extname(option.input) === ".ts";
        // ts
        if (isTs) {
            const typescript = require("rollup-plugin-typescript2");
            plugins.push(typescript({
                // tsconfig:"tsconfig.webpack.json",
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        module: "ESNext",
                        target: "ES6"
                    }
                }
            }));
        }
        // babel
        if (option.babel) {
            plugins.push(resolve());
            const extensions = [".js"];
            if (isTs) {
                extensions.push("ts");
            }
            plugins.push(plugin_babel_1.default({
                extensions,
                exclude: "node_modules/*",
                babelHelpers: "bundled"
            }));
            if (!isExistBabelRc) {
                const envPath = Path.resolve(__dirname, "../node_modules/@babel/preset-env");
                // console.log("env path: ", envPath);
                const tpl = `{"presets": [["${envPath}", {"modules": false, "loose": true}]]}`;
                Fs.writeFileSync(babelRcPathTo, tpl.replace(/\\/g, "/"));
            }
        }
        // 压缩
        if (option.terser) {
            plugins.push(rollup_plugin_terser_1.terser());
        }
        // uglify-js 包含terser和部分babel的效果
        if (option.uglify) {
            plugins.push(uglify({
                compress: {
                    drop_console: option.dropConsole,
                    drop_debugger: option.dropDebugger
                }
            }, uglify_js_1.minify));
        }
        const date = new Date();
        const banner = "/*!\n" +
            ` * ${option.libraryName}\n` +
            ` * Date: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}\n` +
            ` */\n`;
        if (option.eval) {
            // plugin顺序是从0开始到最后
            plugins.push({
                name: "",
                renderChunk(code) {
                    const packer = require("../packer");
                    return banner + packer.pack(code, true);
                }
            });
        }
        const rs = await rollup.rollup({
            input: option.input,
            plugins
        });
        /*const {output: outputs} = */
        await rs.write({
            name: option.libraryName,
            file: option.output,
            banner,
            format: typeof option.module === "string" ? option.module : "umd",
            sourcemap: false
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
