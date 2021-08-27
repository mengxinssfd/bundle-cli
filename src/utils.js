"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDateFormat = exports.formatDate = exports.createEnumByObj = exports.parseCmdParams = exports.getParams = exports.typeOf = void 0;
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
    return parseCmdParams(process.argv.slice(2), prefix, defaultKey);
}
exports.getParams = getParams;
/**
 * 命令行的参数转为Map
 * @param arr 命令行参数数组
 * @param prefix 前缀 --d --f 前缀是"--"
 * @param defaultKey 如果前面没有变量名那么使用默认
 */
function parseCmdParams(arr, prefix = "-", defaultKey = "default") {
    const list = arr.slice();
    let currentKey = defaultKey;
    const isKeyReg = new RegExp(`^${prefix}`);
    const eqReg = /([^=]+)=([\s\S]+)?/;
    const map = new Map();
    function getKey(key) {
        if (eqReg.test(key)) {
            key = RegExp.$1;
            const value = RegExp.$2;
            value && list.unshift(value);
        }
        return key;
    }
    function setValue(currentValue) {
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
    }
    let it;
    while (it = list.shift()) {
        if (isKeyReg.test(it)) {
            currentKey = getKey(it.replace(isKeyReg, ""));
            if (!map.has(currentKey)) {
                map.set(currentKey, true);
            }
            continue;
        }
        setValue(map.get(currentKey));
    }
    return map;
}
exports.parseCmdParams = parseCmdParams;
function createEnumByObj(obj) {
    const res = {};
    for (let k in obj) {
        if (res.hasOwnProperty(k))
            throw new Error("key multiple");
        res[res[k] = obj[k]] = k;
    }
    Object.freeze(res); // freeze值不可变
    // Object.seal(result); // seal值可以变
    return res;
}
exports.createEnumByObj = createEnumByObj;
/**
 * 格式化日期  到date原型上用 不能import导入调用 或者用call apply
 * @param [format="yyyy-MM-dd hh:mm:ss"]
 * @returns String
 */
function formatDate(format = "yyyy-MM-dd hh:mm:ss") {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(), //秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            const s1 = RegExp.$1;
            const v = o[k];
            const value = s1.length === 1 ? v : ("00" + v).substr(String(v).length);
            format = format.replace(s1, value);
        }
    }
    return format;
}
exports.formatDate = formatDate;
// 挂载到Date原型
function useDateFormat(force = false) {
    (!Date.prototype.format || force) && (Date.prototype.format = formatDate);
}
exports.useDateFormat = useDateFormat;
