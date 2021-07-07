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
    const input: string = params.has("input") ? params.get("input") as string : (params.get("default") as string[])[0];
    let output: string = params.has("output") ? params.get("output") as string : (params.get("default") as string[])[1];

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
        console.log(outputs[0].code);
    } finally {
        if (params.has("babel") && !isExistBabelRc) {
            Fs.rmSync(babelRcPathTo);
        }
    }
})();