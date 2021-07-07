const childProcess = require("child_process");
const util = require("util");
const exec = util.promisify(childProcess.exec);
export function typeOf(target: any): string {
    const tp = typeof target;
    if (tp !== "object") return tp;
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

/**
 * 获取命令行的参数
 * @param prefix 前缀 --d --f 前缀是"--"
 * @param defaultKey 如果前面没有变量名那么使用默认
 */
export function getParams(prefix = "-", defaultKey = "default"): Map<string, string[] | string | boolean> {
    let currentKey = defaultKey;
    const keyReg = new RegExp(`^${prefix}`);
    const map: ReturnType<typeof getParams> = new Map();
    process.argv.slice(2).forEach((it) => {
        if (keyReg.test(it)) {
            currentKey = it.replace(keyReg, "");
            if (map.has(currentKey)) return;
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
                (currentValue as Array<string>).push(it);
                break;
            default:
                map.set(currentKey, [currentValue as string, it]);
        }
    });
    return map;
}

export async function execute(cmd: string): Promise<string> {
    // try {
    const {stdout} = await exec(cmd);
    console.log("success!");
    // console.log('\n\n*************************命令输出start*************************');
    console.log(stdout);
    return stdout;
}