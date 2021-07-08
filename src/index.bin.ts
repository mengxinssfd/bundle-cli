// tsc src/index.bin.ts --target ES2017 --module commonjs
import {getParams} from "./utils";
import bundleStart from "./index";

const Path = require("path");
(function () {
    const params = getParams();
    if (params.has("help") || params.has("h")) {
        console.log(`
            -input/-i               文件入口
            -output/-o              输出文件
            -help/-h                帮助
            -terser/-t              压缩
            -babel/-b               开启babel
            -libraryName/-name      打包后的名字，默认是时间戳
            -uglify/-u              开启uglify
        `);
        return;
    }

    const ipt = params.get("input") || params.get("i") || params.get("default");
    const input: string = Array.isArray(ipt) ? ipt[0] : ipt as string;
    let output: string = params.get("output") as string || params.get("o") as string || (Array.isArray(ipt) ? ipt[1] : "");

    const currentPath = Path.resolve(".");
    console.log("command dir: ", currentPath);
    console.log("entry: ", input);

    bundleStart({
        input,
        output,
        libraryName: params.get("libraryName") as string || params.get("name") as string || String(Date.now()),
        terser: params.has("terser") || params.has("t"),
        babel: params.has("babel") || params.has("b"),
        uglify: params.has("uglify") || params.has("u"),
    });
})();