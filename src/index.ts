// tsc src/index.ts --target ES2017 --module commonjs

import {getParams} from "./utils";
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const resolve = require('rollup-plugin-node-resolve');

const rollup = require("rollup");

const Path = require("path");

(async function () {
    const params = getParams();
    const input: string = params.has("input") ? params.get("input") as string : (params.get("default") as string[])[0];
    let output: string = params.has("output") ? params.get("output") as string : (params.get("default") as string[])[1];

    const currentPath = Path.resolve("./");
    console.log("执行命令所在目录", currentPath);
    console.log("入口", input);

    const libraryName = params.get("libraryName") || 'utils';
    const plugins = [terser()];

    if (params.has("babel")) {
        plugins.unshift(babel({
            extensions: [".js"],
            exclude: "node_modules/*",
            babelHelpers: "bundled",
            plugins: []
        }));
        plugins.unshift(resolve());
    }

    try {
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
    }
})();