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
export function getParams(prefix = "-", defaultKey = "default"): ReturnType<typeof parseCmdParams> {
    return parseCmdParams(process.argv.slice(2), prefix, defaultKey);
}

/**
 * 命令行的参数转为Map
 * @param arr 命令行参数数组
 * @param prefix 前缀 --d --f 前缀是"--"
 * @param defaultKey 如果前面没有变量名那么使用默认
 */
export function parseCmdParams(arr: string[], prefix = "-", defaultKey = "default"): Map<string, string[] | string | boolean> {
    const list = arr.slice();
    let currentKey = defaultKey;
    const isKeyReg = new RegExp(`^${prefix}`);
    const eqReg = /([^=]+)=([\s\S]+)?/;
    const map: ReturnType<typeof parseCmdParams> = new Map();

    function getKey(key: string): string {
        if (eqReg.test(key)) {
            key = RegExp.$1;
            const value = RegExp.$2;
            value && list.unshift(value);
        }
        return key;
    }

    function setValue(currentValue?: string[] | string | boolean) {
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
    }

    let it: string;
    while (it = list.shift() as string) {
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

export function createEnumByObj<T extends object, K extends keyof T, O extends { [k: string]: K }>(obj: T): T & { [k: string]: K } {
    const res: any = {};
    for (let k in obj) {
        if (res.hasOwnProperty(k)) throw new Error("key multiple");
        res[res[k] = obj[k]] = k;
    }

    Object.freeze(res); // freeze值不可变
    // Object.seal(result); // seal值可以变
    return res;
}


/**
 * 格式化日期  到date原型上用 不能import导入调用 或者用call apply
 * @param [format="yyyy-MM-dd hh:mm:ss"]
 * @returns String
 */
export function formatDate(this: Date, format = "yyyy-MM-dd hh:mm:ss"): string {
    let o: any = {
        "M+": this.getMonth() + 1,                    //月份
        "d+": this.getDate(),                         //日
        "h+": this.getHours(),                        //小时
        "m+": this.getMinutes(),                      //分
        "s+": this.getSeconds(),                      //秒
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

declare global {
    interface Date {
        /**
         * @param [format="yyyy-MM-dd hh:mm:ss"]
         */
        format(format?: string): string;
    }
}
// 挂载到Date原型
export function useDateFormat(force = false) {
    (!Date.prototype.format || force) && (Date.prototype.format = formatDate);
}
