// tsc src/index.bin.ts --target ES2017 --module commonjs
import {createEnumByObj, getParams} from "./utils";
import bundleStart from "./index";

const Path = require("path");
(function () {
    const params = getParams();

    function has(key: keyof typeof ParamNames): boolean {
        return params.has(key as string) || params.has(ParamNames[key]);
    }

    const ParamNames = createEnumByObj({
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

    function get(k: keyof typeof ParamNames) {
        return params.get(k as string) || params.get(ParamNames[k]);
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
    const input: string = get("input") as string || (Array.isArray(def) ? def[0] : def as string);
    let output: string = get("output") as string || (Array.isArray(def) ? def[1] : "");

    const currentPath = Path.resolve(".");
    console.log("command dir: ", currentPath);
    console.log("entry: ", input);

    bundleStart({
        input,
        output,
        dropDebugger: has("uglifyDropDebugger"),
        dropConsole: has("uglifyDropConsole"),
        libraryName: get("libraryName") as string || String(Date.now()),
        terser: has("terser"),
        babel: has("babel"),
        uglify: has("uglify"),
        module: get("module") as string,
        eval: has("eval"),
    });
})();