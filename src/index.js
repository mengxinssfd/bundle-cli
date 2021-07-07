"use strict";
// tsc src/index.ts --target ES2017 --module commonjs
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const Fs = require("fs");
const Path = require("path");
const params = utils_1.getParams();
const input = params.has("input") ? params.get("input") : params.get("default")[0];
let output = params.has("output") ? params.get("output") : params.get("default")[1];
const currentPath = Path.resolve("./");
console.log("执行命令所在目录", currentPath);
console.log("入口", input);
const rollupConfig = `
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const libraryName = "${params.get("libraryName") || 'utils'}";

export default {
  input: '${input}',  // 入口文件
  output: {
    name: libraryName, // umd 模式必须要有 name  此属性作为全局变量访问打包结果
    file: '${output}',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    ${params.has("babel") ? `babel({
      extensions: [".js"],
      exclude: "node_modules/*",
      babelHelpers: "bundled"
    }),` : ''}
    terser(), // 压缩
  ]
};
`;
const configPath = Path.resolve(__dirname, "../rollup.config.js");
console.log(configPath);
Fs.writeFileSync(configPath, rollupConfig);
(async function () {
    try {
        const command = "rollup -c " + configPath;
        console.log("command", command);
        const result = await utils_1.execute(command);
        console.log(result);
    }
    finally {
        setTimeout(() => {
            Fs.rmdirSync(configPath);
        }, 500);
    }
})();
