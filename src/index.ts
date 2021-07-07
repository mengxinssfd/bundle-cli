// tsc src/index.ts --target ES2017 --module commonjs

import {getParams} from "./utils";
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const resolve = require('rollup-plugin-node-resolve');

const rollup = require("rollup");

const Path = require("path");
const Fs = require("fs");

(async function () {
    const params = getParams();
    const ipt = params.get("input") || params.get("default");
    const input: string = Array.isArray(ipt) ? ipt[0] : ipt as string;
    let output: string = params.get("output") as string || (Array.isArray(ipt) ? ipt[1] : "");

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

    const libraryName = params.get("libraryName") as string || String(Date.now());
    const plugins = [];
    try {
        if (params.has("terser")) {
            plugins.push(terser());
        }
        if (params.has("babel")) {
            plugins.unshift(babel({
                extensions: [".js"],
                exclude: "node_modules/*",
                babelHelpers: "bundled",
            }));
            plugins.unshift(resolve());
            !isExistBabelRc && await Fs.copyFileSync(babelRcPathFrom, babelRcPathTo);
        }


        const rs = await rollup.rollup({
            input,  // 入口文件
            plugins
        });
        const {output: outputs} = await rs.write({
            name: libraryName, // umd 模式必须要有 name  此属性作为全局变量访问打包结果
            file: output,
            format: 'umd',
            sourcemap: false,
        });
        // console.log(outputs[0].code);
    } finally {
        if (params.has("babel") && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
})();