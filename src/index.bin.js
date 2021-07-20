"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tsc src/index.bin.ts --target ES2017 --module commonjs
const utils_1 = require("./utils");
const index_1 = require("./index");
const Path = require("path");
(function () {
    const params = utils_1.getParams();
    function has(key) {
        return params.has(key) || params.has(ParamNames[key]);
    }
    const ParamNames = utils_1.createEnumByObj({
        input: "i",
        output: "o",
        help: "h",
        terser: "t",
        babel: "b",
        module: "m",
        libraryName: "name",
        uglify: "u",
        uglifyDropDebugger: "udd",
        uglifyDropConsole: "udc",
        eval: "e",
    });
    function get(k) {
        return params.get(k) || params.get(ParamNames[k]);
    }
    if (params.has("help") || params.has("h")) {
        console.log(`
            -input/-i                      文件入口
            -output/-o                     输出文件
            -module/-m                     模块类型
            -help/-h                       帮助
            -terser/-t                     压缩
            -babel/-b                      开启babel
            -libraryName/-name             打包后的名字，默认是时间戳
            -uglify/-u                     开启uglify
            -uglifyDropDebugger/-udd       移除debugger
            -uglifyDropConsole/-udc        移除console
            -eval/-e                       eval parker模式
        `);
        return;
    }
    const def = params.get("default");
    const input = get("input") || (Array.isArray(def) ? def[0] : def);
    let output = get("output") || (Array.isArray(def) ? def[1] : "");
    const currentPath = Path.resolve(".");
    console.log("command dir: ", currentPath);
    console.log("entry: ", input);
    index_1.default({
        input,
        output,
        dropDebugger: has("uglifyDropDebugger"),
        dropConsole: has("uglifyDropConsole"),
        libraryName: get("libraryName") || String(Date.now()),
        terser: has("terser"),
        babel: has("babel"),
        uglify: has("uglify"),
        module: get("module"),
        eval: has("eval"),
    });
})();
