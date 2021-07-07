"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.getParams = exports.typeOf = void 0;
const childProcess = require("child_process");
const util = require("util");
const exec = util.promisify(childProcess.exec);
function typeOf(target) {
    const tp = typeof target;
    if (tp !== "object")
        return tp;
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}
exports.typeOf = typeOf;
/**
 * 获取命令行的参数
 * @param prefix 前缀 --d --f 前缀是"--"
 * @param defaultKey 如果前面没有变量名那么使用默认
 */
function getParams(prefix = "-", defaultKey = "default") {
    let currentKey = defaultKey;
    const keyReg = new RegExp(`^${prefix}`);
    const map = new Map();
    process.argv.slice(2).forEach((it) => {
        if (keyReg.test(it)) {
            currentKey = it.replace(keyReg, "");
            if (map.has(currentKey))
                return;
            map.set(currentKey, true);
            return;
        }
        const currentValue = map.get(currentKey);
        switch (typeOf(currentValue)) {
            case "undefined":
            case "boolean":
                map.set(currentKey, it);
                break;
            case "array":
                currentValue.push(it);
                break;
            default:
                map.set(currentKey, [currentValue, it]);
        }
    });
    return map;
}
exports.getParams = getParams;
async function execute(cmd) {
    // try {
    const { stdout } = await exec(cmd);
    console.log("success!");
    // console.log('\n\n*************************命令输出start*************************');
    console.log(stdout);
    return stdout;
}
exports.execute = execute;
