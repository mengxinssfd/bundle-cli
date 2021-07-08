import babel from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";
import {minify} from "uglify-js";

const {uglify} = require("rollup-plugin-uglify");
const resolve = require("rollup-plugin-node-resolve");
const rollup = require("rollup");
const Path = require("path");
const Fs = require("fs");

type Option = {
    input?: string;
    output?: string;
    libraryName: string;
    terser: boolean;
    babel: boolean;
    uglify: boolean;
    dropConsole: boolean;
    dropDebugger: boolean;
    module?: string;
}
export default async function bundleStart(option: Option) {
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
            plugins.push(terser());
        }
        // babel
        if (option.babel) {
            plugins.unshift(babel({
                extensions: [".js"],
                exclude: "node_modules/*",
                babelHelpers: "bundled",
            }));
            plugins.unshift(resolve());
            if (!isExistBabelRc) {
                const envPath = Path.resolve(__dirname, "../node_modules/@babel/preset-env");
                // console.log("env path: ", envPath);
                const tpl = `{"presets": [["${envPath}", {"modules": false, "loose": true}]]}`;
                Fs.writeFileSync(babelRcPathTo, tpl.replace(/\\/g, "/"));
            }
        }

        // uglify-js 包含terser和babel的效果
        if (option.uglify) {
            // eval压缩是用的http://dean.edwards.name/packer/
            plugins.unshift(uglify({
                compress: {
                    drop_console: option.dropConsole,
                    drop_debugger: option.dropDebugger,
                },
            }, minify));
        }

        const rs = await rollup.rollup({
            input: option.input,  // 入口文件
            plugins,
        });
        const {output: outputs} = await rs.write({
            name: option.libraryName, // umd 模式必须要有 name  此属性作为全局变量访问打包结果
            file: option.output,
            format: typeof option.module === "string" ? option.module : "umd",
            sourcemap: false,
        });
        // console.log(outputs[0].code);
    } finally {
        if (option.babel && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
}